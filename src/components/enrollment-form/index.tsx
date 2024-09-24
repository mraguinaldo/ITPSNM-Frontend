import { AllProgress } from '../all-progress'
import { MainForm } from '../main-form'

import { Form } from './form'

const EnrollmentForm = () => {
  return (
    <MainForm
      allProgress={<AllProgress firstProcess="concluded" secondProcess="inProgress" thirdProcess="stopped" />}
      title="Matrícula"
    >
      <Form />
    </MainForm>
  )
}

export { EnrollmentForm }
