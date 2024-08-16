import Url from '../models/Url';

export const getLinkHistory = async (userId: string) => {
  return await Url.find({ userId }).sort({ date: -1 });
};
