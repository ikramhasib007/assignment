import httpErrors from '../utils/httpErrors'
import { createWriteStream, unlink, readFileSync } from 'fs'
import * as mkdirp from 'mkdirp'
import { nanoid } from 'nanoid'
import { calc, uploadDir } from "../utils"
import { Calculation } from '../server/db/models/Calculation'
import { File } from '../server/db/models/File'

const storeUpload = async ({ stream, filename }) => {
  const uid = nanoid()
  const path = `${uploadDir}/${uid}-${filename}`

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ uid, path }))
      .on('error', reject),
  )
}

function deleteSingleFile(file) {
  return new Promise((resolve, reject) => {
    let filepath = `${uploadDir}/${file.uid}-${file.filename}`
    unlink(filepath, function(err) {
      if (err) return reject(err);
      else return resolve(null);
    });
  })
}

const Mutation = {
  async createCalculation(parent, args, { pubsub }, info) {
    try {
      const { title, fileId } = args.data;
      const payload = { title }
      if(fileId) {
        payload.file = fileId
        const file = await File.findById(fileId)
        const data = await readFileSync(file.path, 'utf8')
        if(data) payload.result = calc(data)
        payload.order = 0 // dummy order
      }
      const calculation = new Calculation(payload)
      await calculation.save();

      // Published through the channel
      pubsub.publish(`newCalculation`, {
        calculation: {
          mutation: 'CREATED',
          data: calculation
        }
      })
      // Publishing ends

      return calculation
    } catch (error) {
      return httpErrors.BadRequest(error)
    }
  },

  updateCalculation(parent, args, { pubsub }, info) {
    try {
      const { title, result, order, fileId } = args.data;
      const payload = { title, result, order }
      if(fileId) payload.file = fileId
      return Calculation.findByIdAndUpdate(args.id, payload, { new: true })
    } catch (error) {
      return httpErrors.BadRequest(error)
    }
  },

  deleteCalculation(parent, args, { pubsub }, info) {
    try {
      return Calculation.findByIdAndUpdate(args.id, { isDeleted: true }, { new: true });
    } catch (error) {
      return httpErrors.BadRequest(error)
    }
  },

  async uploadFile(parent, args, ctx, info) {
    try {
      // Ensure upload directory exists
      mkdirp.sync(uploadDir)
      
      const recordFile = async data => {
        const file = await File.create(data)
        return file;
      }

      const processUpload = async upload => {
        const { createReadStream, filename, mimetype, encoding } = await upload
        const stream = createReadStream()
        const { uid, path } = await storeUpload({ stream, filename })
        return recordFile({ uid, filename, mimetype, encoding, path: path.substr(2) })
      }

      return processUpload(args.file)
    } catch (error) {
      return httpErrors.BadRequest(error)
    }
  },

  async deleteFile(parent, args, ctx, info) {
    try {
      // Ensure upload directory exists
      mkdirp.sync(uploadDir)

      await deleteSingleFile(args.file);
      return File.deleteOne({ uid: args.file.uid })

    } catch (error) {
      return httpErrors.BadRequest(error)
    }
  },

}

export default Mutation
