interface IToast {
  theme: 'light' | 'dark' | 'colored'
  message: string
  toastType?: 'default' | 'error' | 'success' | 'warning' | 'info'
}

export type { IToast }
