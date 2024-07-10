import { Router } from "express";
import { getContactsController, getContactByIdController, createContactController, patchContactController, deleteContactController } from "../controllers/contact.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import validateMongoId from '../middlewares/validateMongoId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use('/:contactId', validateMongoId('contactId'));

router.get('/', ctrlWrapper(getContactsController));
  
router.get('/:contactId'
, ctrlWrapper(getContactByIdController));

router.post('/',
    validateBody(createContactSchema),
    ctrlWrapper(createContactController));

router.patch('/:contactId',
    validateBody(updateContactSchema),
    ctrlWrapper(patchContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

export default router;