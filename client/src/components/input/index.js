function InputForm() {

  return (
    <form className="space-y-4">
      <div>
        <h3 className="text-2xl leading-6 tracking-tight font-extrabold text-gray-900 sm:text-3xl">Input</h3>

        <div className="mt-4 grid gap-y-4 gap-x-4 grid-cols-6 items-center">
          <div className="col-span-4">
            <label htmlFor="title" className="sr-only">
              About
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <p className="text-gray-500 text-base pl-3">Required</p>

          <div className="col-span-4">
            <label htmlFor="calculation-file" className="sr-only">
              Drag your calculation file
            </label>
            <div className="flex justify-center p-4 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-base pl-3">Optional</p>
        </div>
      </div>

      <div>
        <div className="flex">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Calculate
          </button>
        </div>
      </div>
    </form>
  )
}

export default InputForm
