import Mongoose from 'mongoose'
const Schema = Mongoose.Schema

const fileSchema = new Schema({
  uid: { type: String, required: true },
  path: { type: String, required: true },
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  encoding: { type: String, required: true },
}, {
  timestamps: true
});

const File = Mongoose.model('File', fileSchema);

export { File };