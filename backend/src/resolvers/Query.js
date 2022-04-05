import httpErrors from "../utils/httpErrors"
import { Calculation } from '../server/db/models/Calculation'

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

  calculations(parent, args, ctx, info) {
    try {
      return Calculation.find({ isDeleted: false });
    } catch (error) {
      return httpErrors.BadRequest(error)
    }
  },
  
  async calculationList(parent, args, { prisma }, info) {
    try {
      const select = new PrismaSelect(info).value
      const opArgs = {
        take: args.take ? args.take + 2 : 5 + 2,
        skip: args.skip,
        where: {
          isDeleted: false,
        },
        select: {
          ...select.select.calculations.select
        }
      }
      if(typeof args.cursor === 'string') {
        opArgs.cursor = { id: args.cursor }
      }
      if(args.query) {
        opArgs.where.OR = [{
          title: { contains: args.query, mode: 'insensitive' }
        }]
      }
      
      const findCalculations = prisma.calculation.findMany(opArgs);
      const findCount = prisma.calculation.count({ where: opArgs.where });
      const [calculations, count] = await prisma.$transaction([findCalculations, findCount])
      
      const listData = {
        count,
        hasNextPage: opArgs.cursor ? calculations.length === opArgs.take : calculations.length > (opArgs.take - 2),
        calculations: opArgs.cursor ? (
          calculations.length === opArgs.take ? calculations.slice(1, -1) : calculations.slice(1)
        ) : calculations.length === opArgs.take ? calculations.slice(0, -2) : (
          calculations.length === (opArgs.take - 1) ? calculations.slice(0, -1) : calculations
        )
      }
      return listData;
    } catch (error) {
      return httpErrors.BadRequest(error)
    }
  }
}

export default Query