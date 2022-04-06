import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Modal from 'components/modal'
import { useLazyQuery } from '@apollo/client'
import { GET_CALCULATION_INPUT } from 'src/operations/calculation'
import BounceLoader from 'components/loaders/BounceLoader'

function SeeInput({ item }) {
  const [open, setOpen] = useState(false)
  const [getCalculationInput, { data, loading }] = useLazyQuery(GET_CALCULATION_INPUT, {
    variables: { id: item.id }
  })

  useEffect(() => {
    if(open) getCalculationInput()
  }, [open, getCalculationInput])

  return (
    <>
      <button
        type="button"
        className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setOpen(true)}
      >
        See input
      </button>

      <Modal
        open={open}
        close={() => setOpen(false)}
      >
        {(loading && !data) ? <BounceLoader /> : <div>
          <p className=" text-sm text-gray-600">
            {!data ? null : data.calculationInput.input}
          </p>  
        </div>}
      </Modal>

    </>
  )
}

SeeInput.propTypes = {
  item: PropTypes.object.isRequired
}

export default SeeInput