import mongoose, { Schema, Document } from 'mongoose';


interface IUrl extends Document {
    originalUrl: string;
    shortUrl: string;
    customUrl?: string;
    clicks: number;
    date: Date;
    userId: string;
  }

  const UrlSchema: Schema = new Schema({  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  customUrl: { type: String, unique: true },
  clicks: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  userId: { type: String, required: true }
});

const Url = mongoose.model<IUrl>('Url', UrlSchema);

export default Url;
