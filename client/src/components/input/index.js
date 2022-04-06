import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { classNames } from 'src/utils'
import UploadFile from 'components/uploads/UploadFile'
import { useMutation } from '@apollo/client'
import { CREATE_CALCULATION, GET_CALCULATION_LIST } from 'src/operations/calculation'
import SubmitButton from 'components/loaders/SubmitButton'
import { CALCULATION_SKIP, CALCULATION_TAKE } from 'components/results'

const schema = yup.object().shape({
  title: yup.string().trim().label('Title').required(),
  file: yup.object().nullable().optional()
})

function InputForm() {
  const { register, handleSubmit, formState:{ errors }, setValue, reset, setError, clearErrors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      file: null
    }
  })

  const [mutate, { loading }] = useMutation(CREATE_CALCULATION, {
    update(cache, { data: { createCalculation } }) {
      const cacheData = cache.readQuery({
        query: GET_CALCULATION_LIST,
        variables: { skip: CALCULATION_SKIP, take: CALCULATION_TAKE }
      })

      const itemExistsOnCache = cacheData.calculationList.calculations.some(item => item.id === createCalculation.id)

      cache.writeQuery({
        query: GET_CALCULATION_LIST,
        variables: { skip: CALCULATION_SKIP, take: CALCULATION_TAKE },
        data: {
          calculationList: {
            ...cacheData.calculationList,
            calculations: [createCalculation, ...cacheData.calculationList.calculations],
            count: cacheData.calculationList.count > 0 ?
                itemExistsOnCache ? cacheData.calculationList.count : cacheData.calculationList.count + 1
                : 1
          }
        }
      })
    }
  })
  
  function onSubmit(formData) {
    const data = {
      title: formData.title,
      fileId: formData.file ? formData.file.id : undefined
    }
    mutate({
      variables: { data }
    }).then(() => {
      reset()
    }).catch(e => {
      setError('file', { message: 'Unexpected number or identifier' })
      console.log('e: ', e);
    })
  }
  
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

          <div className="relative col-span-4">
            <UploadFile
              setData={(file) => { setValue('file', file); clearErrors(['file']); }}
              error={errors.file}
            />

          </div>
          <p className="text-gray-500 text-base pl-3">Optional</p>
        </div>
      </div>

      <div>
        <div className="flex">
          <SubmitButton loading={loading} buttonText='Calculate' />
        </div>
      </div>
    </form>
  )
}

export default InputForm
