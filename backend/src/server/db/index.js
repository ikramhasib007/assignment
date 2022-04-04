import Mongoose from 'mongoose'
const connectionURL = `mongodb://${process.env.MONGO_DB_HOSTNAME}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_DATABASE}`
Mongoose.connect(connectionURL)

export default Mongoose
