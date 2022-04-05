import { gql } from "@apollo/client";
import { CALCULATION_FIELDS } from "./fragments";

export const SUBSCRIBE_CALCULATION = gql`
  ${CALCULATION_FIELDS}

  subscription onSubscribeCalculation {
    calculation {
      mutation
      data {
        ...CalculationFields
      }
    }
  }
`
