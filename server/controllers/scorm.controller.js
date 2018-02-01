import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import Xml2js from 'xml2js';
import objectId from 'bson-objectid';
import rimraf from 'rimraf';

import { checkValidRequest } from '../authorization';
import ScormData from '../models/scormdata';
import Result from '../models/result';
import GradeConfiguration from '../models/gradeconfiguration';

/**
*  @Function name : isScormPackage
*  @Purpose : Checks if the uploaded zip file is a valid Scorm package
*  @Author : Shantanu Paul
*/
export function isScormPackage(filename) {
  try {
    const zip = new AdmZip(`${process.env.PWD}/uploads/${filename}`);
    const zipEntries = zip.getEntries(); // an array of ZipEntry records

    let result = false;
    zipEntries.forEach((zipEntry) => {
      if (zipEntry.name.toString().trim() === 'imsmanifest.xml') {
        result = true;
      }
    });

    return result;
  } catch (e) {
    console.log('Invalid Zip file uploaded', e);
    return false;
  }
}

/**
*  @Function name : processScormPackage
*  @Purpose : Unzips the Scorm package and checks the Scorm version (1.2 or 2004). Inserts the data for the Scorm package in db.
*  @Author : Shantanu Paul
*/
export function processScormPackage(filename) {
  const zip = new AdmZip(`${process.env.PWD}/uploads/${filename}`);
  const zipEntries = zip.getEntries(); // an array of ZipEntry records

  let scormVersion = '';
  const packageId = objectId();
  try {
    zipEntries.forEach((zipEntry) => {
      if (zipEntry.name.toString().trim() === 'imsmanifest.xml') {
        Xml2js.parseString(zipEntry.getData().toString('utf-8'), (err, data) => {
          if (err) throw err;
          scormVersion = String(data.manifest.metadata[0].schemaversion[0]).split()[0];
        });
      }
    });

    const extractionPath = `${process.env.PWD}/uploads/scorm-packages/${packageId}`;

    zip.extractAllToAsync(extractionPath, false, () => {
      fs.unlink(`${process.env.PWD}/uploads/${filename}`, (err) => {
        if (err) throw err;
      });
    });
  } catch (e) {
    console.log('Error in process scorm package', e);
  }
  return {
    packageId,
    scormVersion,
  };
}

/**
*  @Function name : getManifest
*  @Purpose : Sends the Scorm manifest in JSON format to the player.
*  @Author : Shantanu Paul
*/
export function getManifest(req, res) {
  const id = req.params.sco;

  const imsmanifestPath = path.resolve(`./uploads/scorm-packages/${id}/imsmanifest.xml`);

  if (fs.existsSync(imsmanifestPath)) {
    let imsmanifest = fs.readFileSync(imsmanifestPath);

    Xml2js.parseString(imsmanifest, (err, result) => {
      if (!err) {
        imsmanifest = result.manifest;
        return res.json({
          id,
          imsmanifest,
        });
      }
      return res.json(err);
    });
  } else {
    res.status(404);
  }
}

/**
*  @Function name : viewScormPackage
*  @Purpose : Sends the Scorm files to the player.
*  @Author : Shantanu Paul
*/
export function viewScormPackage(req, res) {
  let url = req.url.split('/load-scorm-package/')[1];
  url = url.split('?')[0];

  const file = path.resolve(`./uploads/scorm-packages/${url}`);

  if (fs.existsSync(file)) {
    res.sendFile(file, (err) => {
      res.status(502).send(err);
    });
  } else {
    res.status(404).send({ message: 'File not found' });
  }
}

/**
*  @Function name : scormLMSInitialize
*  @Purpose : API endpoint for SCORM API LMSInitialize().
*  @Author : Shantanu Paul
*/
export function scormLMSInitialize(req, res) {
  checkValidRequest(req.headers, (person) => {
    try {
      // Verifying if request is valid or not
      if (person == null || !req.query.sco) {
        res.json({
          status: false,
          error: 'Invalid request.',
        });
      } else {
        ScormData.findOne({ packageId: req.query.sco, cmiDOTcoreDOTstudent_id: person.id }).lean().exec((err, result) => {
          if (err) { throw err; }

          const tmp = {};
          if (result) {
            for (const i in result) {
              const key = i.toString().replace(/DOT/g, '.');
              tmp[key] = result[i];
            }

            res.json({
              success: true,
              data: tmp,
            });
          } else {
            const scorm = new ScormData({
              packageId: req.query.sco,
              cmiDOTcoreDOTstudent_id: person.id,
            });
            scorm.save((saveErr) => {
              if (saveErr) { throw saveErr; }
              res.json({
                success: true,
                data: tmp,
              });
            });
          }
        });
      }
    } catch (e) {
      console.log('error in scorm LMS initialize', e);
      res.json({
        status: false,
        error: 'Internal server error.',
      });
    }
  });
}

/**
*  @Function name : scormLMSSetValue
*  @Purpose : API Endpoint for SCORM API LMSSetValue
*  @Author : Shantanu Paul
*/
export function scormLMSSetValue(req, res) {
  checkValidRequest(req.headers, (person) => {
    try {
      // Verifying if request is valid or not
      if (person == null || !req.query.sco || !req.body.obj) {
        res.json({
          status: false,
          error: 'Invalid request.',
        });
      } else {
        let key = Object.keys(req.body.obj)[0];
        const val = req.body.obj[key];

        key = key.toString().replace(/\./g, 'DOT');

        const obj = {};
        obj[key] = val;

        if (key.startsWith('cmiDOTobjectives')) {
          handleObjectives(req.query.sco, person, key, obj);
        } else if (key.startsWith('cmiDOTinteractions')) {
          handleInteractions(req.query.sco, person, key, obj);
        } else {
          if (req.query.questionnaireId && req.query.questionnaireId !== undefined) {
            updateResults(req.query, person, key, obj);
          }

          const query = ScormData.update({ packageId: req.query.sco, cmiDOTcoreDOTstudent_id: person.id }, { $set: obj }, { upsert: true });

          query.exec((err) => {
            if (err) { throw err; }

            res.json({
              success: true,
            });
          });
        }
      }
    } catch (e) {
      console.log('error in scorm LMS SetValue', e);
      res.json({
        status: false,
        error: 'Internal server error.',
      });
    }
  });

  function updateResults(query, person, key, obj) {
    const roomId = query.roomId;
    const topicId = query.topicId;
    const questionnaireId = query.questionnaireId;

    const resultObj = {
      roomId,
      topicId,
      questionnaireId,
      submittedBy: person.id,
    };

    let shouldUpdate = false;

    switch (key) {
      case 'cmiDOTcoreDOTscoreDOTmax':
        resultObj['totalMarks'] = obj[key];
        shouldUpdate = true;
        break;

      case 'cmiDOTcoreDOTscoreDOTraw':
        resultObj['obtainedMarks'] = obj[key];
        shouldUpdate = true;
        break;

      default:
        break;
    }

    if (shouldUpdate) {
      Result.findOne({ roomId, topicId, questionnaireId, submittedBy: person.id }).select('totalMarks obtainedMarks').exec((err, result) => {
        if (err) throw err;

        if (result && result.totalMarks !== undefined && result.obtainedMarks !== undefined) {
          const percentage = (result.obtainedMarks / result.totalMarks) * 100;

          const gradeCalcQuery = GradeConfiguration.findOne({ companyid: person.profile.companyid._id });

          let grades = [];
          gradeCalcQuery.exec((gradeErr, gradeResult) => {
            if (gradeErr) {
              throw gradeErr;
            } else {
              grades = [{
                from: 70,
                to: 100,
                result: 'DISTINCTION',
                grade: 'A',
              },
              {
                from: 35,
                to: 69,
                result: 'PASS',
                grade: 'B',
              },
              {
                from: 0,
                to: 34,
                result: 'FAIL',
                grade: 'C',
              }];
            }
            if (gradeResult != null) {
              grades = gradeResult.grades;
            }

            grades.forEach((item) => {
              if (percentage >= item.from && percentage <= item.to) {
                resultObj['questionnairePercentage'] = percentage;
                resultObj['grade'] = item.grade;
                resultObj['result'] = item.result;
              }
            });
            Result.update({ roomId, topicId, questionnaireId, submittedBy: person.id }, { $set: resultObj }, { upsert: true }).exec((err) => {
              if (err) { throw err; }
            });
          });
        } else {
          Result.update({ roomId, topicId, questionnaireId, submittedBy: person.id }, { $set: resultObj }, { upsert: true }).exec((err) => {
            if (err) { throw err; }
          });
        }
      });
    }
  }

  function handleObjectives(sco, person, key, obj) {
    const arrIndex = key.substring(19, key.indexOf('DOT', 19));
    const insertKey = key.substring(key.lastIndexOf('DOT') + 3);
    const insertValue = obj[key];
    const insertColumn = `cmiDOTobjectives.${arrIndex}.${insertKey}`;

    const insertObj = {};
    insertObj[insertColumn] = insertValue;

    const query = ScormData.update({ packageId: sco, cmiDOTcoreDOTstudent_id: person.id }, { $set: insertObj }, { upsert: true });

    query.exec((err) => {
      if (err) { throw err; }

      res.json({
        success: true,
      });
    });
  }

  function handleInteractions(sco, person, key, obj) {
    const arrIndex = key.substring(21, key.indexOf('DOT', 21));
    const insertKey = key.substring(key.indexOf('DOT', 21) + 3);
    const insertValue = obj[key];

    let insertColumn = '';
    const insertObj = {};

    if (insertKey.substring(0, 17) === 'correct_responses') {
      const subArrIndex = insertKey.substring(20, insertKey.indexOf('DOT', 20));

      insertColumn = `cmiDOTinteractions.${arrIndex}.correct_responses.${subArrIndex}.pattern`;
      insertObj[insertColumn] = insertValue;
    } else if (insertKey.substring(0, 10) === 'objectives') {
      const subArrIndex = insertKey.substring(13, insertKey.indexOf('DOT', 13));

      insertColumn = `cmiDOTinteractions.${arrIndex}.objectives.${subArrIndex}.id`;
      insertObj[insertColumn] = insertValue;
    } else {
      insertColumn = `cmiDOTinteractions.${arrIndex}.${insertKey}`;
      insertObj[insertColumn] = insertValue;
    }

    const query = ScormData.update({ packageId: sco, cmiDOTcoreDOTstudent_id: person.id }, { $set: insertObj }, { upsert: true });

    query.exec((err) => {
      if (err) { throw err; }

      res.json({
        success: true,
      });
    });
  }
}

/**
*  @Function name : deleteScormPackage
*  @Purpose : Deletes the uploaded SCORM package from the server
*  @Author : Shantanu Paul
*/
export function deleteScormPackage(scormId, callback) {
  const target = `${process.env.PWD}/uploads/scorm-packages/${scormId}`;

  rimraf(target, (err) => {
    if (err) return callback(false);
    return callback(true);
  });
}

