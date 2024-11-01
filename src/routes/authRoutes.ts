import { Router } from 'express'; 
import * as personController from '../controllers/personController';

const router = Router();

router.post('/', personController.createPerson);
router.get('/', personController.getAllPersons);
router.delete('/', personController.getPersonById);

export default router;