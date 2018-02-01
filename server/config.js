const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/instavc_be',

  port: process.env.PORT || 8002,
  confLink : 'https://rp.instavc.com/',
  domin : process.env.DOMAIN || 'rp.instavc.com',
  language : 'en',
	location : [
							['https://localmcu.instavc.com', 'India Development'],
							['https://mcu-uk.instavc.com', 'UK Production 1'],
              ['https://gpumcu.instavc.com', 'India Production'],
              ['https://mcu-uk1.instavc.com', 'UK Production 2'],
              ['https://mcu-ge.instavc.com', 'UK-Ge Production']
						],
  ga_id : 'UA-101900941-1',
  socketServer: 'https://globalpeer.instavc.com',
  iceServers : [ {
      urls : "stun:203.196.151.150:3478"
    }, {
      urls : ["turn:turn2.instavc.com:443?transport=tcp","turn:turn1.instavc.com:443?transport=udp"],
      credential : "admin123",
      username : "admin"
    } ],
  isSignUp : true,
  isGoogleSignIn : false,
  isCaptcha: false,
  failLimit: 5,
  captcha_sitekey: "6Lc8hC4UAAAAAJFrYqExB4FE4CIy8aloD-aLO1Iq",
  googleEnable : true,
  facebookEnable : true,
  iosProduction: false,
  fullCalendar: false,
  broadCast: false,
  iosShowRoom : true,
  mail_from_address : 'no-reply@peoplelinkvc.com',
  mail_head_url : 'http://www.peoplelinkvc.com/',
  mail_head_logo : 'http://www.instavc.com/images/instavc-white-logo.png',
  mail_body_logo : 'https://global.instavc.com/images/instavc-email.jpg',
  mail_body_title : 'Welcome to InstaVC',
  mail_signature: 'InstaVC',
  mail_timezone: {
    zone : 'Asia/Calcutta',
    code : 'IST'
  },
  footer : {
    year : '2017',
    name : 'instaVC',
    company : 'PeopleLink Unified Communications Pvt. Ltd.'
  },
  bussinessType : 'LMS',    // LMS (or) Conference (or) CRM (or) Presenter
  smtp : {
    host : 'smtp.mailgun.org',
    port : 587,
    username : 'postmaster@mg.instavc.com',
    password : 'Ajarsun123'
  },
  plagiarism_email : 'pradeepyadav@peoplelinkvc.com',
  plagiarism_apikey : '1E4DBC73-A734-4232-9026-EDEB5954C293',
  android_api_key : 'a25ab04b-bb99-4fe0-9452-fd9c0ab203ee'
};
export default config;


