import serverConfig from '../config.js';

var CopyleaksCloud = require('plagiarism-checker');
var request = require('request');

var clCloud = new CopyleaksCloud();
var config = clCloud.getConfig();
// console.log("Config--- ", config);

// var email = "pradeepyadav@peoplelinkvc.com";
// var apikey = "1E4DBC73-A734-4232-9026-EDEB5954C293";

/*
Initiate the process for Plagiarism Check
Request - 'url' which need to check, eg('https://cloud.instavc.com/uploads/VopWn5Dc_HealthcareDomainKnowledge_SoftwareTesting.pdf')
Response - ProcessId or Error
*/
export function processForPlagiarismCheck(url, cb) {
  
  /*Login in CopyLink Account*/
  clCloud.login(serverConfig.plagiarism_email,serverConfig.plagiarism_apikey,config.E_PRODUCT.PUBLISHER, function (loginRes, loginErr) {
  
    var _customHeaders = {};
    // _customHeaders[config.SANDBOX_MODE_HEADER] = true;
    
    // var url = 'http://www.refworld.org/cgi-bin/texis/vtx/rwmain/opendocpdf.pdf?reldoc=y&docid=4811c37c2';
    // var url = 'https://cloud.instavc.com/uploads/VopWn5Dc_HealthcareDomainKnowledge_SoftwareTesting.pdf';
    // var url = 'http://www.homefromhomecare.com/attachments/Hello5%20two%20page.pdf';
    // var url = process.env.PWD+'/uploads/bill.pdf';

    clCloud.createByURL(url, _customHeaders, function(urlRes, urlErr) {
      if(urlRes && urlRes.ProcessId) {
        // console.dir('API: create-by-url-- ', urlRes);
        // console.dir('Process has been created: '+ urlRes.ProcessId);
        cb(null, urlRes.ProcessId);
      } else {
        // console.dir("Error while Plagiarism - ", urlErr);
        cb(urlErr, null);
      }
    });

    // clCloud.getCreditBalance(function(resp,err){
    //   //check if we have credits
    //   if(resp && resp.Amount){
    //     console.log('You have this amount of credits left: '+resp.Amount);
    //   }
    // });

     /* Get process status exmaple */
    // clCloud.getProcessStatus(urlRes.ProcessId, function(respStatus,errStatus){
    //  console.log("respStatus---- ", respStatus);
    // });

    /* Fetch Result of a Process using package method */
    // clCloud.getProcessResults(urlRes.ProcessId, function (resultRes, err) {
    //  console.log("Process response -- ", resultRes);
    //  console.log("Process error -- ", err);
    // });

    /* Fetch Result of a Process using request package */
    // request.get( { url : 'https://api.copyleaks.com/v1/academic/' + urlRes.ProcessId + '/result' }, function(error, response, body) {
    //   if (!error) {
    //     console.dir("response processId -- ", response);
    //     console.dir("body processId -- ", body);
    //   } else{
    //     console.dir("Error processId --- ", error);
    //   };
    // });

    // clCloud.getProcessList(function(resp,err){
    //   //check if we have credits
    //   if(resp && resp.length > 0){
    //     console.log('API: processes list');
    //     console.log('There are '+resp.length+' processes running:');
    //     _.forIn(resp,function(pval,pk){
    //       console.log(pval);
    //     });
    //   }
    // });

  });
}

/*
Fetch Results of Plagiarism Check based on processId
Request - 'processId' which need to check
Response - Result Object or Error
*/
export function plagiarismProcessResult(ProcessId, cb) {
  
  /*Login in CopyLink Account*/
  clCloud.login(serverConfig.plagiarism_email,serverConfig.plagiarism_apikey,config.E_PRODUCT.PUBLISHER, function (loginRes, loginErr) {
    
      /* Get process status exmaple */
    clCloud.getProcessStatus(ProcessId, function(respStatus, errStatus){
      
      // console.log("respStatus---- ", respStatus.Status);
      if(respStatus) {
        if (respStatus.Status == 'Finished') {
          
          /* Fetch Result of a Process using package method */
          clCloud.getProcessResults(ProcessId, function (resultRes, resultErr) {
            if (resultRes && resultRes != []) {
              // console.log("Process response -- ", resultRes);
              cb(null, resultRes);
            } else{
              // console.log("Process Result error -- ", resultErr);
              cb(resultErr, null);
            };
          });
        } else{
          cb("Plagiarism check is in progress, please try after some time.", null);
        };
      } else{
          // console.log("Process  Status error -- ", errStatus);
          cb(errStatus, null);
        };
    });

  }); 
}

export function plagiarismCreditsResult(cb) {
  /*Login in CopyLink Account*/
  clCloud.login(serverConfig.plagiarism_email,serverConfig.plagiarism_apikey,config.E_PRODUCT.PUBLISHER, function (loginRes, loginErr) {
    if(loginRes) {
      clCloud.getCreditBalance(function(resp,err){
        //check if we have credits
        if(resp && resp.Amount){
          // console.log('You have this amount of credits left: '+resp.Amount);
          cb(null, resp.Amount)
        } else {
          cb(err, null)
        }
      });
    }
  })
}

/*
Delete Process of Plagiarism Check based on processId
Request - 'processId' which need to delete
Response - null
*/
export function deletePlagiarismProcess(ProcessId) {
  /* Delete process */
  clCloud.deleteProcess(ProcessId, function (resp, err) {
    if (resp) {
      // console.dir("Error while deleting plagiarism process - ", resp);
    } else{
      
    };
  });
}


/*Sample Response of Process Result*/
/*
[ { URL: 'http://earnqa.com/healthcare-domain-knowledge/',
    Percents: 33,
    NumberOfCopiedWords: 555,
    ComparisonReport: 'https://api.copyleaks.com/v1/downloads/comparison?rid=2316984',
    CachedVersion: 'https://api.copyleaks.com/v1/downloads/result-text?rid=2316984',
    Title: 'No Title',
    Introduction: 'insurance plans. 14.) Fully Insured Plan – A plan where the employer contracts with another organization to assume financial responsibility for the enrollees’ medical claims and for all incurredadministrative costs. Commercial Health Care Plans...',
    EmbededComparison: 'https://copyleaks.com/compare-embed/756dfab8-7894-4fff-925c-4c89bc9fac7c/2316984' },
  { URL: 'http://gcreddy.com/2015/06/healthcare-domain-knowledge.html',
    Percents: 33,
    NumberOfCopiedWords: 555,
    ComparisonReport: 'https://api.copyleaks.com/v1/downloads/comparison?rid=2316988',
    CachedVersion: 'https://api.copyleaks.com/v1/downloads/result-text?rid=2316988',
    Title: 'Healthcare Domain Knowledge ~ Software Testing',
    Introduction: 'Healthcare Domain Knowledge for Software Testers explains healthcare industry history, terminology and standards. How to test Software Healthcare Application?',
    EmbededComparison: 'https://copyleaks.com/compare-embed/756dfab8-7894-4fff-925c-4c89bc9fac7c/2316988' },
  { URL: 'https://studyblue.com/notes/note/n/healthcare-domain-knowledge-software-testing-pdf/file/17295079',
    Percents: 20,
    NumberOfCopiedWords: 329,
    ComparisonReport: 'https://api.copyleaks.com/v1/downloads/comparison?rid=2316972',
    CachedVersion: 'https://api.copyleaks.com/v1/downloads/result-text?rid=2316972',
    Title: 'Healthcare Domain Knowledge _ Software Testing.pdf at Medical University of South Carolina - StudyBlue',
    Introduction: 'Study online flashcards and notes for Healthcare Domain Knowledge _ Software Testing.pdf including 5/4/2016   Healthcare Domain Knowledge ~ Software Testing http://www.gcreddy.com/2015/06/healthcare­domain­knowledge.html   1/6 Software Testing A blog about',
    EmbededComparison: 'https://copyleaks.com/compare-embed/756dfab8-7894-4fff-925c-4c89bc9fac7c/2316972' } ]
*/