import Mongoose from 'mongoose';

const ScormData = new Mongoose.Schema({
  packageId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'ScormPackage',
    required: true,
  },
  cmiDOTcoreDOTstudent_id: {
    type: String,
    required: false,
  },
  cmiDOTcoreDOTstudent_name: {
    type: String,
    required: false,
    default: '',
  },
  cmiDOTcoreDOTlesson_location: {
    type: String,
    required: false,
    default: '',
  },
  cmiDOTcoreDOTcredit: {
    type: String,
    required: false,
    enum: ['credit', 'no-credit'],
    default: 'no-credit',
  },
  cmiDOTcoreDOTlesson_status: {
    type: String,
    required: false,
    enum: ['passed', 'completed', 'failed', 'incomplete', 'browsed', 'not-attempted'],
    default: 'not-attempted',
  },
  cmiDOTcoreDOTlesson_mode: {
    type: String,
    required: false,
    enum: ['browse', 'normal', 'review'],
    default: 'normal',
  },
  cmiDOTcoreDOTentry: {
    type: String,
    required: false,
    enum: ['', 'ab-initio', 'resume'],
    default: 'ab-initio',
  },
  cmiDOTcoreDOTexit: {
    type: String,
    required: false,
    enum: ['', 'time-out', 'suspend', 'logout'],
    default: '',
  },
  cmiDOTcoreDOTscoreDOTraw: {
    type: String,
    required: false,
    default: '',
  },
  cmiDOTcoreDOTscoreDOTmax: {
    type: String,
    required: false,
    default: '',
  },
  cmiDOTcoreDOTscoreDOTmin: {
    type: String,
    required: false,
    default: '',
  },
  cmiDOTcoreDOTtotal_time: {
    type: String,
    required: false,
    default: '0000:00:00:00',
  },
  cmiDOTcoreDOTsession_time: {
    type: String,
    required: false,
    default: '',
  },
  cmiDOTsuspend_data: {
    type: String,
    required: false,
    default: '',
  },
  cmiDOTlaunch_data: {
    type: String,
    required: false,
    default: '',
  },
  cmiDOTcomments: {
    type: String,
    required: false,
    default: '',
  },
  cmiDOTcomments_from_lms: {
    type: String,
    required: false,
    default: '',
  },
  cmiDOTobjectives: [
    {
      id: {
        type: String,
        required: false,
        default: '',
      },
      scoreDOTraw: {
        type: String,
        required: false,
        default: '',
      },
      scoreDOTmax: {
        type: String,
        required: false,
        default: '',
      },
      scoreDOTmin: {
        type: String,
        required: false,
        default: '',
      },
      status: {
        type: String,
        required: false,
        enum: ['passed', 'completed', 'failed', 'incomplete', 'browsed', 'not attempted'],
        default: 'not attempted',
      },
    },
  ],
  cmiDOTstudent_dataDOTmastery_score: {
    type: Number,
    required: false,
  },
  cmiDOTstudent_dataDOTmax_time_allowed: {
    type: String,
    required: false,
    default: '',
  },
  cmiDOTstudent_dataDOTtime_limit_action: {
    type: String,
    required: false,
    enum: ['exit,message', 'exit,no message', 'failed', 'continue,message', 'continue,no message'],
    default: 'exit,message',
  },
  cmiDOTstudent_preferenceDOTaudio: {
    type: Number,
    min: 0,
    max: 100,
    required: false,
  },
  cmiDOTstudent_preferenceDOTlanguage: {
    type: String,
    required: false,
    default: '',
  },
  cmiDOTstudent_preferenceDOTspeed: {
    type: Number,
    min: -100,
    max: 100,
    required: false,
  },
  cmiDOTstudent_preferenceDOTtext: {
    type: Number,
    enum: [-1, 0, 1],
    required: false,
    default: 0,
  },
  cmiDOTinteractions: [
    {
      id: {
        type: String,
        required: false,
        default: '',
      },
      objectives: [
        {
          id: {
            type: String,
            required: false,
            default: '',
          },
        },
      ],
      time: {
        type: String,
        required: false,
        default: '',
      },
      type: {
        type: String,
        required: false,
        enum: ['true-false', 'choice', 'fill-in', 'matching', 'performance', 'sequencing', 'likert', 'numeric'],
      },
      correct_responses: [
        {
          pattern: {
            type: String,
            required: false,
            default: '',
          },
        },
      ],
      weighting: {
        type: Number,
        required: false,
      },
      student_response: {
        type: String,
        required: false,
        default: '',
      },
      result: {
        type: String,
        required: false,
      },
      latency: {
        type: String,
        required: false,
        default: '',
      },
    },
  ],
});

export default Mongoose.model('ScormData', ScormData);
