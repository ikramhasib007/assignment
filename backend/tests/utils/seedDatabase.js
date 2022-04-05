import Mongoose from 'mongoose'
import { mongodbUri } from '../../src/server/db';
import { Calculation } from '../../src/server/db/models/Calculation';

Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export const calculationOne = {
  input: {
    title: 'First case',
    result: 2.21,
    order: 1
  },
  data: undefined
}

const seedDatabase = async () => {
  // Using custom connection
  const db = await Mongoose.createConnection(mongodbUri);
  const session = await db.startSession();

  // Delete all data
  await session.withTransaction(async () => {
    await Calculation.deleteMany({})
  })
  session.endSession();

  // Create calculation
  calculationOne.data = await Calculation.create(calculationOne.input)
  
  db.close()
}

export default seedDatabase