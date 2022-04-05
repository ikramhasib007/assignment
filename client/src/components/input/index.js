import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { classNames } from 'src/utils'
import UploadFile from 'components/uploads/UploadFile'

const schema = yup.object().shape({
  title: yup.string().trim().label('Title').required(),
  file: yup.object().nullable().optional()
})

function InputForm() {
  const { control, register, handleSubmit, formState:{ errors }, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      file: null
    }
  })
  
  function onSubmit(formData) {
    console.log('formData: ', formData);
    
  }
  
  console.log('errors: ', errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div>
        <h3 className="text-2xl leading-6 tracking-tight font-extrabold text-gray-900 sm:text-3xl">Input</h3>

        <div className="mt-4 grid gap-y-4 gap-x-4 grid-cols-6 items-center">
          <div className="col-span-4">
            <label htmlFor="title" className="sr-only">
              About
            </label>
            <input
              type="text"
              {...register("title")}
              id="title"
              placeholder="Title"
              className={classNames(
                errors.title ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500" : "border-gray-300",
                "focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
              )}
            />
          </div>
          <p className="text-gray-500 text-base pl-3">Required</p>

          <div className="col-span-4">
            <UploadFile
              setData={(file) => setValue('file', file)}
            />
          </div>
          <p className="text-gray-500 text-base pl-3">Optional</p>
        </div>
      </div>

      <div>
        <div className="flex">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Calculate
          </button>
        </div>
      </div>
    </form>
  )
}

export default InputForm
