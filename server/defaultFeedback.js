//To be executed in mongo shell to display question as per quill compatibility in feedback view


// (function resetFeedbackData() {
//   db.feedbacks.find().map(function(feedbackData) {
//     var array = [];
//     var feedbackResponse = feedbackData.feedbacks;
//     for(var j in feedbackResponse) {
//       var regex1 = new RegExp('Unicode46','g');
//       var regex2 = new RegExp('Unicode36','g')	
//       var question = j.replace(regex1, '.');
//       question = question.replace(regex2, '$');
//       var obj = {};
//       obj['question'] = [{"insert" : question}];
//       obj['answer'] = feedbackResponse[j];
//       array.push(obj);
//     } 
//     db.feedbacks.update({
//       _id : feedbackData._id
//     },
//     {
//       $set : {
//         feedbacks : array
//       }
//     })  
//   })
// }());


