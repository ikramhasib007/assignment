import { readFileSync } from 'fs'
import httpErrors from "../utils/httpErrors"
import { Calculation } from '../server/db/models/Calculation'
import { File } from '../server/db/models/File'

const Query = {
  async calculation(parent, args, ctx, info) {
    try {
      const calculation = await Calculation.findOne({ _id: args.id, isDeleted: false }).populate('file');
      if(!calculation) return httpErrors.NotFound()
      return calculation
    } catch (error) {
      return httpErrors.BadRequest(error)
    }
  },

  async calculationInput(parent, args, ctx, info) {
    try {
      const calculation = await Calculation.findOne({ _id: args.id, isDeleted: false }).populate('file');
      if(!calculation) return httpErrors.NotFound()
      const input = await readFileSync(calculation.file.path, 'utf8')
      return { input, calculation }
    } catch (error) {
      return httpErrors.BadRequest(error)
    }
  },

  async calculations(parent, args, ctx, info) {
    try {
      return Calculation.find({ isDeleted: false }).skip(args.skip || 0).limit(args.take || 5).sort('-createdAt')
    } catch (error) {
      return httpErrors.BadRequest(error)
    }
  },

  async calculationList(parent, args, ctx, info) {
    try {
      const count = await Calculation.count({ isDeleted: false })
      const calculations = await Calculation.find({ isDeleted: false }).skip(args.skip || 0).limit(args.take || 5).sort('-createdAt')
      return { calculations, count }
    } catch (error) {
      return httpErrors.BadRequest(error)
    }
  },

  files(parent, args, ctx, info) {
    try {
      return File.find({});
    } catch (error) {
      return httpErrors.BadRequest(error)
    }
  },
}

export default Query