import { gql } from '@apollo/client'
import { FILE_FIELDS } from './fragments'


export const UPLOAD_FILE = gql`
  ${FILE_FIELDS}
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      ...FileFields
    }
  }
`

export const DELETE_FILE = gql`
  ${FILE_FIELDS}
  mutation DeleteFile(
    $uid: String!
    $filename: String!
    ) {
    deleteFile(file: {
      uid: $uid,
      filename: $filename
    }) {
      ...FileFields
    }
  }
`