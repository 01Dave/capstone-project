import { Request, Response } from 'express';
import { shortenUrl } from '../services/urlShortener';

export const createShortUrl = async (req: Request, res: Response) => {
    try {
      const { originalUrl, customUrl } = req.body;
      const result = await shortenUrl(originalUrl, customUrl);
  
      if (result !== null) {
        const { shortUrl, qrCode } = result;
        res.status(200).json({ shortUrl, qrCode });
      } else {
        res.status(404).json({ error: 'Short URL could not be created.' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  