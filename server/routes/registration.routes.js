import { Router } from 'express';
import * as RegistrationController from '../controllers/registration.controller';

const registroute = new Router();

registroute.route('/search-corporate/:input').get(RegistrationController.searchCorporate);
registroute.route('/save-regist-data').post(RegistrationController.saveRegistData);

export default registroute; 