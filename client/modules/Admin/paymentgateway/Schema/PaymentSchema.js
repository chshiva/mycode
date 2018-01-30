export const paymentSchema = {
	_id : "payment",
	formTitle: "PaymentDetails",
    serverCollection:"paymentGateway",
    schemas : {
      paymentDetails : {
	          paymentDetails : [
	            { type : "title", text : "Payment Details", icon : "fa fa-caret-right" },
	            { type : "hidden", _id : "_id", text : "", datafield : "uid" },
	            { type : "hidden", text : "MerchantId", _id : "merchantId", datafield : "merchantId", required : true, error : "", exp : "", errormsg : "" },
	            { type : "text", text : "Order Id", _id : "orderId", datafield : "orderId",required : true, error : "", exp : "", errormsg : "" },
	            { type : "text", text : "Amount", _id : "amount", datafield : "amount", required : true, error : "", exp : "", errormsg : "" },
	            { type : "password", text : "Currency", _id : "currency", datafield : "currency", required : true, error : "", exp : "", errormsg : "" },
	            { type : "hidden", text : "Redirect URL", _id : "redirectURL", datafield : "redirectURL", required : true, error : "", exp : "", errormsg : "",value:"http://127.0.0.1:8000/ccavResponseHandler" },
	            { type:  "hidden", text:"Cancel URL",id:"cancelURL", datafield:"cancelURL",required:true,error:"",exp:"",errormsg : "",value:"http://127.0.0.1:8000/ccavResponseHandler"},
	            { type : "text", text : "Language", _id : "language", datafield : "language", required : true, error : "", exp : "", errormsg : "" },
	            { type : "password", text : "Currency", _id : "currency", datafield : "currency", required : true, error : "", exp : "", errormsg : "" },
	            { type : "password", text : "Currency", _id : "currency", datafield : "currency", required : true, error : "", exp : "", errormsg : "" },
	            { type : "password", text : "Currency", _id : "currency", datafield : "currency", required : true, error : "", exp : "", errormsg : "" },
	            { type : "password", text : "Currency", _id : "currency", datafield : "currency", required : true, error : "", exp : "", errormsg : "" },
	            { type : "password", text : "Currency", _id : "currency", datafield : "currency", required : true, error : "", exp : "", errormsg : "" }

	          ],

       },
       col_2 : {

       }	
    }    
};	