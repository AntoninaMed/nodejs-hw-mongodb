import { Router } from "express";
import { getContactsController, getContactByIdController, createContactController, patchContactController, deleteContactController } from "../controllers/contact";
import { ctrlWrapper } from "../utils/ctrlWrapper";

const router = Router();


router.get('/contacts', ctrlWrapper(getContactsController));
  
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;