import shortid from 'shortid';
import validUrl from 'valid-url';
import Url from '../models/Url';
import QRCode from 'qrcode';
import {redisClient} from '../app';
import { promisify } from 'util';

const BASE_URL = 'http://localhost:5000';

// Promisify Redis methods
const getAsync = promisify(redisClient.get);
const setAsync = promisify(redisClient.set);

export const shortenUrl = async (originalUrl: string, customUrl?: string): Promise<{ shortUrl: string, qrCode: string } | null> => {
    if (!validUrl.isUri(originalUrl)) {
        throw new Error('Invalid URL');
    }

    const cachedUrl = await getAsync(originalUrl);
    if (cachedUrl) {
        return JSON.parse(cachedUrl);
    }

    const urlCode = customUrl || shortid.generate();
    const shortUrl = `${BASE_URL}/${urlCode}`;
    const qrCode = await QRCode.toDataURL(shortUrl);
    const newUrl = new Url({
        originalUrl,
        shortUrl,
        customUrl: customUrl || urlCode
    });

    await setAsync(originalUrl, JSON.stringify({ shortUrl, qrCode }));

    return { shortUrl, qrCode };
};
