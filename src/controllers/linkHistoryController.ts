import { Request, Response } from 'express';
import { getLinkHistory } from '../services/linkHistory';

export const fetchLinkHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const links = await getLinkHistory(userId);
    res.status(200).json(links);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
