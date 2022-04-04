import createError from '../utils/createError'
import { createWriteStream, unlink } from 'fs'
import * as mkdirp from 'mkdirp'
import { nanoid } from 'nanoid'
import { uploadDir } from "../utils"
import { Calculation } from '../server/db/models/Calculation'

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
  createCalculation(parent, args, { pubsub }, info) {
    try {
      const { title, result, order, fileId } = args.data;
      const payload = { title, result, order }
      if(fileId) payload.file = fileId
      const calculation = new Calculation(payload)
      return calculation.save();
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  updateCalculation(parent, args, { pubsub }, info) {
    try {
      const { title, result, order, fileId } = args.data;
      const payload = { title, result, order }
      if(fileId) payload.file = fileId
      return Calculation.findByIdAndUpdate(args.id, payload, { new: true })
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  deleteCalculation(parent, args, { pubsub }, info) {
    try {
      return Calculation.findByIdAndUpdate(args.id, { isDeleted: true }, { new: true });
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  async uploadFile(parent, args, { pubsub }, info) {
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

  async deleteFile(parent, args, { pubsub }, info) {
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
