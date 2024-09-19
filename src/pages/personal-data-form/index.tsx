import { AllProgress } from '../../components/all-progress'
import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { MainForm } from '../../components/main-form'
import { Form } from './form'

const PersonalDataForm = () => {
  return (
    <>
      <Header />
      <MainForm
        allProgress={<AllProgress firstProcess="inProgress" secondProcess="stopped" thirdProcess="stopped" />}
        title="Dados Pessoais"
      >
        <Form />
      </MainForm>
      <Footer />
    </>
  )
}

export { PersonalDataForm }
