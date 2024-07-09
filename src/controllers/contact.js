import { getAllContacts, getContactsById, createContact, updateContact, deleteContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import createHttpError from 'http-errors';
import mongoose from "mongoose";


export const getContactsController = async (req, res) => {
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const { page, perPage } = parsePaginationParams(req.query);
    const filter = parseFilterParams(req.query);
  const contacts = await getAllContacts({ page, perPage, sortBy, sortOrder, filter });
	
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};
	
  
export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;

    if (!mongoose.isValidObjectId(contactId)) {
        return res.status(400).json({
            status: 404,
            message: 'Invalid contact Id',
        });
    };

        const contact = await getContactsById(contactId);
        if (!contact) {
           next(createHttpError(404, 'Contact not found'));
    return;
        }

        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
};
export const createContactController = async (req, res) => {
    try {
        const { name, phoneNumber, email, isFavourite, contactType } = req.body;
        if (!name || !phoneNumber) {
            return res.status(400).json({
                status: 'error',
                message: 'Name and phone number are required.',
            });
        }
    
        const newContact = await createContact({
            name,
            phoneNumber,
            email,
            isFavourite,
            contactType,
        });

        res.status(201).json({
            status: 201,
            data: newContact,
            message: 'Successfully created a contact!',
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error creating contact',
            error: error.message,
        });
    }
};

  export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched contact!`,
    data: result.contact,
  });
};


export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);
    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
         res.status(204).send();
};
