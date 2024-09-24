import { AllProgress } from '../all-progress'
import { MainForm } from '../main-form'
import { Form } from './form'

const PersonalDataForm = () => {
  return (
    <MainForm
      allProgress={<AllProgress firstProcess="inProgress" secondProcess="stopped" thirdProcess="stopped" />}
      title="Dados Pessoais"
    >
      <Form />
    </MainForm>
  )
}

export { PersonalDataForm }
