import { User } from '@Models/user.model';
import { UserService } from '@Services/user.service';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await UserService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        await UserService.createUser({ name, email, password });
        res.status(200).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating user' });
    }
};




export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await UserService.findUserByEmail(email);
        console.log(user);
        if (user && await UserService.matchPassword(email, password)) {
            const token = jwt.sign({ email: user.email,name:user.name }, process.env.JWT_SECRET as string, {
                expiresIn: '1h'
            });
            res.status(200).json({ token, user });
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error logging in' });
    }
};
