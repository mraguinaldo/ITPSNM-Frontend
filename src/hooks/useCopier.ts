import { Toast } from "../components/toast"

const UseCopier = ({ elementId }: {elementId: any}) => {
  const elementFound: any = document.getElementById(elementId)

  if (elementFound) {
    navigator.clipboard
      .writeText(elementFound.textContent)
      .then(() => {
        Toast({ message: 'Item copiado', theme: 'colored', toastType: 'success' })
      })
      .catch(() => {
        Toast({ message: 'Error ao copiar o item', theme: 'dark', toastType: 'error' })
      })
  }
}

export { UseCopier }



