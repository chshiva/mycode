import User from './models/users';
import md5 from 'md5';

export default function () {
  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    } 
    //const username = 'rp@peoplelinkvc.com'
    const password = md5('Ajarsun123');

    const objUser = new User({ 
            //username :username ,
            password: password, firstname: 'Super', 
            lastname: 'Admin', email: 'rp@peoplelinkvc.com', 
            role: 1,
            profile: {
              position: 'Super Admin',
              dept: 'Global'
            },
            deviceType: "BROWSER",
            createdby: "1",
            modifiedby : "1",
            modifiedAt: Date.now(),
            dateAdded: Date.now()
          });

    User.create([objUser], (error) => {
      if (!error) {
        console.log('ready to go....');
      }
    });
  });
}


// import User from './models/users';
// import md5 from 'md5';

// export default function () {
//      //const username = 'rp@peoplelinkvc.com'
//     const password = md5('Ajarsun123');

//     const objUser = new User({ 
//             //username :username ,
//             password: password, firstname: 'Super', 
//             lastname: 'Admin', email: 'rp@peoplelinkvc.com', 
//             role: 1,
//             profile: {
//               position: 'Super Admin',
//               dept: 'Global'
//             },
//             createdby: "1",
//             modifiedby : "1",
//           });

//     User.create([objUser], (error) => {
//       if (!error) {
//         // console.log('ready to go....');
//       }
//     });

//     const password1 = md5('Ajarsun123');

//     const objUser1 = new User({ 
//             //username :username ,
//             _id : '58f7532f1caa4809dea56f99',
//             password: password1, firstname: 'LMS', 
//             lastname: 'Admin', email: 'admin@peoplelinkvc.com', 
//             role: 12,
//             profile: {
//               position: 'Super Admin',
//               dept: 'Global'
//             },
//             createdby: "1",
//             modifiedby : "1",
//           });

//     User.create([objUser1], (error) => {
//       if (!error) {
//         // console.log('ready to go....');
//       }
//     });
//   for(let i = 0; i <= 150; i++){
//     const objStud = new User({ 
//       password : md5('123456'),
//       firstname : 'student',
//       email : 'student' +i + '@gmail.com',
//       profile: {
//         companyid: '58f7532f1caa4809dea56f99'
//       },
//       role : 14,
//       createdby: "1",
//       modifiedby : "1",
//     });
//     console.log(objStud.email)
//     User.create([objStud], (error) => {
//       if(error) console.log(error);
//     });
//   }
// }
