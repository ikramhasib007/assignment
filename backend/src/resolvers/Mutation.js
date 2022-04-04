import createError from '../utils/createError'
import { createWriteStream, unlink } from 'fs'
import * as mkdirp from 'mkdirp'
import { nanoid } from 'nanoid'
import { uploadDir } from "../utils"

const storeUpload = async ({ stream, filename }) => {
  const id = nanoid()
  const path = `${uploadDir}/${id}-${filename}`

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject),
  )
}

function deleteSingleFile(file) {
  return new Promise((resolve, reject) => {
    let filepath = `${uploadDir}/${file.id}-${file.filename}`
    unlink(filepath, function(err) {
      if (err) return reject(err);
      else return resolve(null);
    });
  })
}

const Mutation = {
  createCalculation(parent, args, { prisma }, info) {
    try {
      const select = new PrismaSelect(info).value;
      const { title, result, order, fileId } = args.data;
      const data = { title, result, order }
      if(fileId) data.file = { connect: { id: fileId } }
      return prisma.calculation.create({ data, ...select })
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  updateCalculation(parent, args, { prisma }, info) {
    try {
      const select = new PrismaSelect(info).value;
      const { title, result, order, fileId } = args.data;
      const data = { title, result, order }
      if(fileId) data.file = { connect: { id: fileId } }
      return prisma.calculation.update({ where: { id: args.id }, data, ...select })
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  deleteCalculation(parent, args, { prisma }, info) {
    try {
      const select = new PrismaSelect(info).value;
      return prisma.calculation.update({
        where: { id: args.id },
        data: { isDeleted: true },
        ...select
      })
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  async uploadFile(parent, args, { prisma }, info) {
    try {
      // Ensure upload directory exists
      mkdirp.sync(uploadDir)
      
      const recordFile = async data => {
        await prisma.file.create({ data })
        return data;
      }

      const processUpload = async upload => {
        const { createReadStream, filename, mimetype, encoding } = await upload
        const stream = createReadStream()
        const { id, path } = await storeUpload({ stream, filename })
        return recordFile({ id, filename, mimetype, encoding, path: path.substr(2) })
      }

      return processUpload(args.file)
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  async deleteFile(parent, args, { prisma }, info) {
    try {
      // Ensure upload directory exists
      mkdirp.sync(uploadDir)

      await deleteSingleFile(args.file);
      return prisma.file.delete({ where: { id: args.file.id } })

    } catch (error) {
      return createError.BadRequest(error)
    }
  },

}

export default Mutation
