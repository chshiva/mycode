import { Router } from 'express';
import * as ContactsController from '../controllers/contacts.controller';

const contactRoute = new Router();

contactRoute.route('/add-contact').post(ContactsController.addContact);
contactRoute.route('/contact-response').put(ContactsController.contactResponse);
contactRoute.route('/contacts').get(ContactsController.getMyContacts);
contactRoute.route('/get-matched-user/:input').get(ContactsController.fetchMatchedUsers);
export default contactRoute;
