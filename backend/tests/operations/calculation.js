import { gql } from '@apollo/client'
import { CALCULATION_FIELDS } from './fragments'


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

export const GET_CALCULATION = gql`
  ${CALCULATION_FIELDS}

  query GetCalculation(
    $id: ID!
  ) {
    calculation(id: $id) {
      ...CalculationFields
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