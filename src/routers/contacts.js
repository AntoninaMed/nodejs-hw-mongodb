import { Router } from "express";
import { getContactsController, getContactByIdController, createContactController, patchContactController, deleteContactController } from "../controllers/contact.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));
  
router.get('/:contactId'
, ctrlWrapper(getContactByIdController));

router.post('/',
    upload.single('photo'),
    validateBody(createContactSchema),
    ctrlWrapper(createContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.patch('/:contactId',
    upload.single('photo'),
    validateBody(updateContactSchema),
    ctrlWrapper(patchContactController));

export default router;