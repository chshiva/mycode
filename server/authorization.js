import Users from './models/users';

/**
* @Function Name: "checkValidRequest",
* @Purpose: "To check valid request or not.",
* @Request Object: header : { authorization : "access_token" },
* @Response Object: Success- User, Failure- null,
* @Author: "Prudhvi"
*/
export function checkValidRequest(header, cb){
  try{
    let access_token = header.authorization;
    
    // check access_token
    if (access_token) {
      let userQuery = Users.findOne({ token : access_token.split("Basic ")[1], userStatus : 'Active' })
      .populate('profile.companyid', 'businessType');
      userQuery.exec( function(error, user){
        if (user) cb(user);
        else cb(null);
      });
    } else cb(null);
  } catch(e) {
    console.log("e in checkValidRequest === ", e);
    cb(null);
  }
}