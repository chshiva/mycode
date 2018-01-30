import { Router } from 'express';
import Users from '../models/users';
import md5 from 'md5';
var mongoose = require('mongoose');
import * as PaymentController from '../controllers/payment.controller';

const router = new Router();

router.route('/payment').post(PaymentController.websitePackageSelection);
router.route('/paymentEmailValidation').post(PaymentController.websiteEmailValidation);
export default router;