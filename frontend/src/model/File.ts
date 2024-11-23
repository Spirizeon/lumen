import mongoose, { Document, Schema } from 'mongoose';

interface IFile extends Document {
  filename: string;
  filesize: number;
  created_at?: Date;
  report: string;
}

const FileSchema: Schema = new Schema({
  filename: { type: String, required: true },
  filesize: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  report: { type: String, required: true }
});

const FileModel = mongoose.models.File || mongoose.model<IFile>('File', FileSchema);

export default FileModel;
