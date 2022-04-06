import { useQuery } from "@apollo/client"
import { GET_CALCULATION_LIST } from "src/operations/calculation"
import { SUBSCRIBE_CALCULATION } from "src/operations/subscription";
import CalculationList from "./CalculationList"

export const CALCULATION_TAKE = 5;
export const CALCULATION_SKIP = 0

function Results() {
  const { subscribeToMore, ...queryResult } = useQuery(GET_CALCULATION_LIST, {
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
            const itemExistsOnCache = prev.calculationList.calculations.some(item => item.id === newCalculation.id)
            
            if(subscriptionData.data.calculation.mutation === 'CREATED') {
              return Object.assign({}, prev, {
                calculationList: {
                  ...prev.calculationList,
                  calculations: [newCalculation, ...prev.calculationList.calculations],
                  count: prev.calculationList.count > 0 ?
                    itemExistsOnCache ? prev.calculationList.count : prev.calculationList.count + 1
                    : 1
                }
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