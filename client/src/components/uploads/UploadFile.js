import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { UPLOAD_FILE } from 'src/operations/upload'
import { allowedFileType, classNames } from 'src/utils'
import BounceLoader from 'components/loaders/BounceLoader'


function UploadFile(props) {
  const [file, setFile] = useState(props.data)
  const [mutate, { called, loading }] = useMutation(UPLOAD_FILE)
  const [error, setError] = useState()

  function onChange({ target: { validity, files:[file] } }) {
    if(!allowedFileType.includes(file.type)) {
      setError('File type is not allowed');
      return;
    }
    if (validity.valid) {
      if(error) setError();
      mutate({ variables: { file } }).then(({data}) => {
        setFile(data.uploadFile);
        if(props.setData) props.setData(data.uploadFile)
      }).catch(e => {
        console.log('File upload fail: ', e);
        setError('Max file size exceeded')
      })
    }
  }

  return (
    <Fragment>
      <div className={classNames(
        !!error || props.error ? "border-red-300" : "border-gray-300",
        "flex justify-center px-4 py-6 border-2 border-dashed rounded-md"
      )}>
        <label className="relative block">
          {loading && <div className='absolute inset-0 top-1 flex pl-6 items-center'>
            <BounceLoader />
          </div>}
          <span className="sr-only">Choose a file</span>
          <input
            type="file"
            onChange={onChange}
            className={classNames(
              "block w-full text-sm text-slate-500 file:mr-4 file:py-2",
              "file:px-4 file:rounded-full file:border-0",
              "file:text-sm file:font-semibold",
              "file:bg-violet-200 file:text-violet-700",
              "hover:file:bg-violet-300",
              loading ? "opacity-30" : ""
            )}
          />
          {(!!error || props.error) && <p className="absolute -bottom-5 right-0 text-xs text-red-500">{error?.toString() ?? props.error?.message}</p>}
        </label>
      </div> 
    </Fragment>
  )
}

UploadFile.defaultProps = {
  setData: () => {},
}

UploadFile.propTypes = {
  setData: PropTypes.func,
  data: PropTypes.object,
}

export default UploadFile