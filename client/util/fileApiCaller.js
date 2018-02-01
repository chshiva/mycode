import fetch from 'isomorphic-fetch';
import Config from '../../server/config';
import AuthClient from '../components/AuthController.js';
import Cookies from 'js-cookie';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/fileapi`) :
  '/fileapi';

export default function callfileApi(endpoint, method = 'post', data = null) {
  var csrfToken = Cookies.get('csrf');
  
  console.log("body === ", data);
  let options = {
    headers: { processData: false, contentType: false, 'Authorization': 'Basic ' + AuthClient.getSession() },
    method
  }
  options['data'] = data;
//   options['body'] = JSON.stringify({});
//   if(method != 'get' && method != 'delete') {
//     options['body'] = JSON.stringify(body);
//   }

  return fetch(endpoint, options)
  .then(response => response.json() //(Cookies.set('_csrf', response.headers.get('_csrf')), console.log("REESSS", response, response.headers.get('_csrf')), 
  .then(json => ({ json, response })))
  .then(({ json, response }) => {

    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}

