import Mongoose from 'mongoose'
const Schema = Mongoose.Schema

const calculationSchema = new Schema({
  title: { type: String, required: true },
  result: { type: Number, required: true },
  order: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  file: { type: Schema.Types.ObjectId, ref: 'File' },
}, {
  timestamps: true
});

const Calculation = Mongoose.model('Calculation', calculationSchema);

export { Calculation }