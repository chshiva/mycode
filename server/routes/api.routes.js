import { Router } from 'express';

import * as ApiController from '../controllers/api.controller';
const apiRoute = new Router();
apiRoute.route('/api/saveportaluser').post(ApiController.Saveportaluser);

export default apiRoute;