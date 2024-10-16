import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'

interface IUseDownloadFile {
  elementId: string
}

const UseDownloadFile = async ({ elementId }: IUseDownloadFile) => {
  const gradeReport = document.getElementById(elementId)
  const grades = document.getElementById('grades')
  
  if (gradeReport) {
    try {
      gradeReport.classList.add('force_desktop_screen')
      grades?.classList.add('force')
      
      const dataUrl = await toPng(gradeReport, { skipFonts: true })
      
      const pdf = new jsPDF()

      const imgProps = pdf.getImageProperties(dataUrl)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight)

      pdf.save('RELATÓRIO_DE_NOTAS_ITPSNM.pdf')

      gradeReport.classList.remove('force_desktop_screen')
      grades?.classList.remove('force')
      
    } catch (error) {
      console.error('Erro ao fazer download do PDF', error)
    }
  }
}

export { UseDownloadFile }
