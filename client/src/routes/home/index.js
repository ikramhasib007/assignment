import { useState } from 'react'
import InputForm from 'components/input'

const results = [
  { id: 1, title: 'First case', result: 24, file: { path: '/localhost:3001/uploads' } },
  { id: 2, title: 'Second case', result: 14, file: { path: '/localhost:3001/uploads' } },
  { id: 3, title: 'Third case', result: 22, file: { path: '/localhost:3001/uploads' } },
  { id: 4, title: 'Fourth case', result: 32, file: { path: '/localhost:3001/uploads' } },
]

function Home() {
  const [items] = useState(results)

  return (
    <div className='space-y-4'>
      <div>
        <h2 className='block text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl'>Total results: 03</h2>
        <div className='mt-4'>
          <ul role="list" className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="bg-white shadow overflow-hidden rounded-md px-4 py-4">
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
                      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      See input
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <InputForm />

    </div>
  )
}

export default Home