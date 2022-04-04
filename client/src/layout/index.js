import Link from 'next/link'
import { useRouter } from 'next/router'
import { classNames } from 'src/utils'

function Layout({ children }) {
  const router = useRouter()

  return (
    <div className="relative bg-gray-50">
      <main className="lg:relative">
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:h-screen lg:py-40 lg:text-left xl:py-48">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">Senior JavaScript Engineer</span>{' '}
              <span className="block text-indigo-600 xl:inline">Assignment</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link href={'/'}>
                  <a className={classNames(
                    router.asPath.split('/')[1] === 'output' ?
                    "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10" :
                    "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  )}>
                    Get started
                  </a>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href={'/output'}>
                  <a className={classNames(
                    router.asPath.split('/')[1] !== 'output' ?
                    "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10" :
                    "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  )}>
                    Live output
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full bg-gray-100 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
          <div className='px-4 py-6 lg:px-8 xl:px-12'>
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Layout
