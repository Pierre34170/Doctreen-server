import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '../interfaces/auth.interface';
import DB from '../db';

export const requireModeratorLogin = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    
}