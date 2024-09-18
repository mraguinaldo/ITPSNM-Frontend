import { toast } from 'react-toastify'

import type { IToast } from './interface'

const Toast = ({ message, theme, toastType }: IToast) => {
  return toast(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
    type: toastType,
  })
}

export { Toast }
