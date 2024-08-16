import { shortenUrl } from '../services/urlShortener';
jest.setTimeout(10000); // increase global timeout to 10 seconds

test('should return a shortened URL for a valid input', async () => {
  const shortUrl = await shortenUrl('https://www.google.com');
  expect(shortUrl).toBeDefined();
});

test('should throw error for invalid URL', async () => {
  await expect(shortenUrl('invalid-url')).rejects.toThrowError('Invalid URL');
});

test('should return a shortened URL with a custom URL', async () => {
  const customUrl = 'my-custom-url';
  const shortUrl = await shortenUrl('https://www.google.com', customUrl);
  expect(shortUrl).toBeDefined();
});

test('should return the same shortened URL for a previously shortened URL', async () => {
  const originalUrl = 'https://www.google.com';
  const shortUrl1 = await shortenUrl(originalUrl);
  const shortUrl2 = await shortenUrl(originalUrl);
  expect(shortUrl1).toBe(shortUrl2);
});

test('should throw error for a URL that is too long', async () => {
  const longUrl = 'https://www.google.com/this-is-a-very-long-url-that-should-fail';
  await expect(shortenUrl(longUrl)).rejects.toThrowError('URL is too long');
});