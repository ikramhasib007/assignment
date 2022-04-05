import { NetworkStatus } from '@apollo/client'
import { useState, useEffect, Fragment } from "react"
import { Waypoint } from 'react-waypoint'
import BounceLoader from 'components/loaders/BounceLoader'
import { CALCULATION_TAKE } from '.'


function CalculationList({
  data, loading, fetchMore, refetch, networkStatus,
  subscribeToNewCalculation
}) {
  const [loadingMore, setLoadingMore] = useState(false)

  function fetchMoreCalculations() {
    setLoadingMore(true)
    fetchMore({
      variables: {
        skip: data ? data.calculations.length : CALCULATION_TAKE,
        take: CALCULATION_TAKE
      }
    }).then(() => {
      setLoadingMore(false)
    })
  }

  useEffect(() => {
    subscribeToNewCalculation()
  }, [subscribeToNewCalculation])

  if(!data && loading) return <div className='flex justify-center'>
    <BounceLoader />
  </div>

  return (
    <div>
      <h2 className='block text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl'>Total results: {data.calculations.length}</h2>
      <div className='mt-4'>
        <ul role="list" className="space-y-4 h-96 overflow-y-auto pb-1">
          {data.calculations.map((item, i) => <Fragment key={item.id}>
            <li className="bg-white shadow overflow-hidden rounded-md px-4 py-4 xl:px-6 2xl:py-6">
              <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                <div className="ml-4 mt-2">
                  <h3 className="text-base leading-6 font-medium text-gray-500">= {item.result}</h3>
                </div>
                <div className="ml-4 mt-2">
                  <h3 className="text-base leading-6 font-medium text-gray-900">{item.title}</h3>
                </div>
                <div className="ml-4 mt-2 flex-shrink-0">
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    See input
                  </button>
                </div>
              </div>
            </li>

            {data.calculations.length > 4 && i === data.calculations.length - 1 && <Waypoint
              onEnter={fetchMoreCalculations}
            />}
          </Fragment>
          )}

          {loadingMore && <div className='mt-2 flex justify-center'>
            <BounceLoader />  
          </div>}

        </ul>
      </div>
    </div>
  )
}

export default CalculationList