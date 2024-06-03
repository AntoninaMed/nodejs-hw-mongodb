import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { getAllContacts, getContactsById } from './services/contacts.js';
import mongoose from 'mongoose';

const PORT = Number(env('PORT', '3000'));

export const setupServer = ()=> {
  const app = express();

   app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

   app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: '200',
      data: contacts,
      message: 'Successfully found contacts!',
    });
   });
  
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
     
    const contact = await getContactsById(contactId);
  
    res.status(200).json({
      status: '200',
      data: contact,
      message: `Successfully found contact with id ${contactId}!`,
    });
  } );
 

 app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
  