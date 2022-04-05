import Mongoose from 'mongoose'
export const mongodbUri = `mongodb://${process.env.MONGO_DB_HOSTNAME}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_DATABASE}`

Mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('YEAH! Database connected!'));

export default Mongoose
