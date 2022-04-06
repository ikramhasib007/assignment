import { gql } from '@apollo/client'
import { CALCULATION_FIELDS, FILE_FIELDS } from './fragments'


export const GET_CALCULATIONS = gql`
  ${CALCULATION_FIELDS}

  query GetCalculations(
    $query: String,
    $skip: Int,
    $take: Int,
    $cursor: String
  ) {
    calculations(query: $query, skip: $skip, take: $take, cursor: $cursor) {
      ...CalculationFields
    }
  }
`

export const GET_CALCULATION_LIST = gql`
  ${CALCULATION_FIELDS}

  query GetCalculationList(
    $query: String,
    $skip: Int,
    $take: Int,
    $cursor: String
  ) {
    calculationList(query: $query, skip: $skip, take: $take, cursor: $cursor) @connection(key: "calculations", filter: ["query"]) {
      calculations(query: $query, skip: $skip, take: $take, cursor: $cursor) {
        ...CalculationFields
      }
      count
    }
  }
`

export const GET_CALCULATION = gql`
  ${CALCULATION_FIELDS}
  ${FILE_FIELDS}

  query GetCalculation(
    $id: ID!
  ) {
    calculation(id: $id) {
      ...CalculationFields
      file {
        ...FileFields
      }
    }
  }
`

export const GET_CALCULATION_INPUT = gql`
  ${CALCULATION_FIELDS}
  ${FILE_FIELDS}

  query GetCalculationInput(
    $id: ID!
  ) {
    calculationInput(id: $id) {
      calculation(id: $id) {
        ...CalculationFields
        file {
          ...FileFields
        }
      }
      input
    }
  }
`

export const CREATE_CALCULATION = gql`
  ${CALCULATION_FIELDS}

  mutation CreateCalculation($data: CreateCalculationInput!) {
    createCalculation(
      data: $data
    ) {
      ...CalculationFields
    }
  }
`

export const UPDATE_CALCULATION = gql`
  ${CALCULATION_FIELDS}
  
  mutation UpdateCalculation($id: ID!, $data: UpdateCalculationInput!) {
    updateCalculation(
      id: $id,
      data: $data
    ) {
      ...CalculationFields
    }
  }
`

export const DELETE_CALCULATION = gql`
  ${CALCULATION_FIELDS}

  mutation DeleteCalculation($id: ID!) {
    deleteCalculation(
      id: $id
    ) {
      ...CalculationFields
    }
  }
`