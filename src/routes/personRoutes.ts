import { Router } from 'express'; 
import * as personController from '../controllers/personController';

const router = Router();

router.post('/', personController.createPerson);
router.get('/', personController.getAllPersons);
router.get('/:uuid', personController.getPersonById);
router.put('/:uuid', personController.updatePerson);
router.delete('/:uuid', personController.deletePerson);

export default router;