import { Toast } from "../components/toast"

const UseCopier = ({ elementId, message }: {elementId: any, message: string}) => {
  const elementFound: any = document.getElementById(elementId)

  if (elementFound) {
    navigator.clipboard
      .writeText(elementFound.textContent)
      .then(() => {
        Toast({ message, theme: 'colored', toastType: 'success' })
      })
      .catch(() => {
        Toast({ message: 'Error ao copiar o item', theme: 'dark', toastType: 'error' })
      })
  }
}

export { UseCopier }



