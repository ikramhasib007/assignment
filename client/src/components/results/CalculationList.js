import { useEffect, Fragment } from "react"
import { useRouter } from 'next/router'
import { Waypoint } from 'react-waypoint'
import BounceLoader from 'components/loaders/BounceLoader'
import { CALCULATION_TAKE } from '.'
import SeeInput from './SeeInput'
import { classNames } from "src/utils"


function CalculationList({
  data, loading, fetchMore,
  subscribeToNewCalculation
}) {
  const router = useRouter()

  function fetchMoreCalculations() {
    fetchMore({
      variables: {
        skip: data ? data.calculationList.calculations.length : CALCULATION_TAKE,
        take: CALCULATION_TAKE
      }
    }).catch(e => {
      console.log('e: ', e);
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
      <h2 className='block text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl'>Total results: {data.calculationList.count}</h2>
      <div className='mt-4'>
        <div className={classNames('overflow-y-auto pb-2', router.asPath.includes('output') ? 'h-screen' : 'h-96')}>
          <ul role="list" className="space-y-4">
            {data.calculationList.calculations.map((item, i) => <Fragment key={item.id}>
              <li className="bg-white shadow overflow-hidden rounded-md px-4 py-4 xl:px-6 2xl:py-6">
                <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                  <div className="ml-4 mt-2">
                    <h3 className="text-base leading-6 font-medium text-gray-500">= {item.result}</h3>
                  </div>
                  <div className="ml-4 mt-2">
                    <h3 className="text-base leading-6 font-medium text-gray-900">{item.title}</h3>
                  </div>
                  <div className="ml-4 mt-2 flex-shrink-0">
                    <SeeInput item={item} />
                  </div>
                </div>
              </li>

              {data.calculationList.calculations.length > 4 && i === data.calculationList.calculations.length - 1 && <Waypoint
                onEnter={fetchMoreCalculations}
              />}
            </Fragment>
            )}

            {loading && <div className='mt-2 flex justify-center'>
              <BounceLoader />  
            </div>}

          </ul>
        </div>
      </div>
    </div>
  )
}

export default CalculationList