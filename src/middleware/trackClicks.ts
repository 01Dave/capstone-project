import { Request, Response, NextFunction } from 'express';
import Url from '../models/Url';

export const trackClicks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { urlCode } = req.params;
    const url = await Url.findOne({ shortUrl: `http://localhost:5000/${urlCode}` });

    if (url) {
      url.clicks += 1;
      await url.save();
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json('No URL found');
    }
  } catch (err) {
    next(err);
  }
};
