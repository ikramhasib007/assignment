import { gql } from '@apollo/client'

export const CORE_FILE_FIELDS = gql`
  fragment CoreFileFields on File {
    id
    filename
    path
  }
`

export const CORE_CALCULATION_FIELDS = gql`
  fragment CoreCalculationFields on Calculation {
    id
    title
    result
    order
    isDeleted
    createdAt
    updatedAt
  }
`

export const FILE_FIELDS = gql`
  ${CORE_FILE_FIELDS}

  fragment FileFields on File {
    ...CoreFileFields
  }
`

export const CALCULATION_FIELDS = gql`
  ${CORE_CALCULATION_FIELDS}

  fragment CalculationFields on Calculation {
    ...CoreCalculationFields
  }
`
