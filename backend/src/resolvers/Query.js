import createError from "../utils/createError"
import { PrismaSelect } from '@paljs/plugins'

const Query = {
  calculations(parent, args, { prisma }, info) {
    try {
      const select = new PrismaSelect(info).value
      const opArgs = {
        take: args.take,
        skip: args.skip,
        where: {
          isDeleted: false
        },
        ...select
      };
      if(typeof args.cursor === 'string') {
        opArgs.cursor = {
          id: args.cursor
        }
      }
      if(args.query) {
        opArgs.where.OR = [{
          title: { contains: args.query, mode: 'insensitive' }
        }]
      }
      return prisma.calculation.findMany(opArgs)
    } catch (error) {
      return createError.BadRequest(error)
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
      return createError.BadRequest(error)
    }
  }
}

export default Query