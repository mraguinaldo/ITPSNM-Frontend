import { toPng } from 'html-to-image'

interface IUseDownloadFile {
  elementId: string
}

const UseDownloadFile = async ({ elementId }: IUseDownloadFile) => {
  const gradeReport = document.getElementById(elementId)
  if (gradeReport) {
    try {
      gradeReport.classList.add('force_desktop_screen')
      const dataUrl = await toPng(gradeReport, { skipFonts: true })
      const link = document.createElement('a')
      link.href = dataUrl

      link.download = 'RELATÓRIO_DE_NOTAS_ITPSNM.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      gradeReport.classList.remove('force_desktop_screen')
    } catch (error) {
      console.error('Erro ao fazer download da imagem', error)
    }
  }
}

export { UseDownloadFile }
