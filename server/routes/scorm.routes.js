import { Router } from 'express';

import * as ScormController from '../controllers/scorm.controller';

const scormRouter = new Router();

scormRouter.route('/fetch-manifest/:sco').get(ScormController.getManifest);
scormRouter.route('/load-scorm-package/*').get(ScormController.viewScormPackage);

scormRouter.route('/scorm-initialize').get(ScormController.scormLMSInitialize);
scormRouter.route('/scorm-set-value').put(ScormController.scormLMSSetValue);

export default scormRouter;
