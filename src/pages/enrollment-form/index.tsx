import { AllProgress } from '../../components/all-progress'
import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { MainForm } from '../../components/main-form'
import { Form } from './form'

const EnrollmentForm = () => {
  return (
    <>
      <Header />
      <MainForm
        allProgress={<AllProgress firstProcess="concluded" secondProcess="inProgress" thirdProcess="stopped" />}
        title="Matrícula"
      >
        <Form />
      </MainForm>
      <Footer />
    </>
  )
}

export { EnrollmentForm }
