import { AllProgress } from '../../components/all-progress'
import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { MainForm } from '../../components/main-form'
import { Form } from './form'

const DocumentForm = () => {
  return (
    <>
      <Header />
      <MainForm
        allProgress={<AllProgress firstProcess="concluded" secondProcess="concluded" thirdProcess="inProgress" />}
        title="Documentos"
        formArea={<Form />}
      />
      <Footer />
    </>
  )
}

export { DocumentForm }
