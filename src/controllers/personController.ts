import { Request, Response } from 'express'; 
import * as personService from '../services/personService';

export const createPerson = async (req: Request, res: Response) => {
  const person = await personService.createPerson(req.body);
  res.status(201).json(person);
};

export const getAllPersons = async (req: Request, res: Response) => {
  const persons = await personService.getAllPersons();
  res.json(persons);
};


export const getPersonById = async (req: Request, res: Response) => {  
  const person = await personService.getPersonById(req.params.uuid);

    res.json(person);
  };
  
  export const updatePerson = async (req: Request, res: Response) => {
    const person = await personService.updatePerson(req.params.uuid, req.body);
    res.json(person);
  };
  
  export const deletePerson = async (req: Request, res: Response) => {
    await personService.deletePerson(req.params.uuid);
    res.status(204).send();
  };