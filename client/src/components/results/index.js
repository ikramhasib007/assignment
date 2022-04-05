import { useQuery } from "@apollo/client"
import { GET_CALCULATIONS } from "src/operations/calculation"
import { SUBSCRIBE_CALCULATION } from "src/operations/subscription";
import CalculationList from "./CalculationList"

export const CALCULATION_TAKE = 5;
export const CALCULATION_SKIP = 0

function Results() {
  const { subscribeToMore, ...queryResult } = useQuery(GET_CALCULATIONS, {
    variables: { skip: CALCULATION_SKIP, take: CALCULATION_TAKE },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-only',
    notifyOnNetworkStatusChange: true
  })

  return (
    <div>
      <CalculationList
        {...queryResult}
        subscribeToNewCalculation={() => subscribeToMore({
          document: SUBSCRIBE_CALCULATION,
          updateQuery: (prev, { subscriptionData }) => {
            // console.log('[SUBSCRIBE_CALCULATION] subscriptionData: ', subscriptionData);
            if(!subscriptionData.data) return prev;
            
            let newCalculation = subscriptionData.data.calculation.data;
            if(subscriptionData.data.calculation.mutation === 'CREATED') {
              return Object.assign({}, prev, {
                calculations: [newCalculation, ...prev.calculations]
              })
            } else {
              return prev
            }
          }
        })}
      />
    </div>
  )
}

export default Results