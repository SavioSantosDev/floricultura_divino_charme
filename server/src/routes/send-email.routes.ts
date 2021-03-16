import { Router } from 'express';
import sendEmailController from '../controllers/send-email.controller';

const routes = Router();

routes.post('/', (req, res) => sendEmailController.sendMail(req, res));

export default routes;
