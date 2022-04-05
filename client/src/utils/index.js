
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const allowedFileType = ['text/plain'];