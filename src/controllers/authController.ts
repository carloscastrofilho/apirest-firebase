import { Request, Response } from 'express'; 
import * as authService from '../services/authService';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const auth = await authService.loginUser( email, password);
    res.status(201).json(auth);
};

export const logout = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const auth = await authService.logoutUser(email, password);
     res.json(auth);
};

export const newUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const auth = await authService.createUser( name, email, password);
    res.json(auth);
  };