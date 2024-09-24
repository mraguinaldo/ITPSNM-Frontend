import { AllProgress } from '../all-progress'
import { MainForm } from '../main-form'
import { Form } from './form'

const DocumentForm = () => {
  return (
    <MainForm
      allProgress={<AllProgress firstProcess="concluded" secondProcess="concluded" thirdProcess="inProgress" />}
      title="Documentos"
    >
      <Form />
    </MainForm>
  )
}

export { DocumentForm }
