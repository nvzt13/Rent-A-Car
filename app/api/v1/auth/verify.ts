
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    return res.status(200).json({ decoded });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
