import { useReducer, useState } from 'react'
import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { fields, initialValues } from './data'
import { reducer } from './reducer'
import { Article, IdentificationBadge, IdentificationCard, User, UserRectangle, Vault } from 'phosphor-react'
import type { FileField } from './interfaces'
import { actions } from './actions'
import { UseHandleFileChange } from '../../hooks/useHandleFileChange'
import { ImagePreview } from '../../components/Image-preview'
import { useNavigate } from 'react-router-dom'

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const [studentImage, setStudantImage] = useState<string>()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: initialValues,
  })

  const changeStudentPhoto = () => {
    const fileInput = document.getElementById('Foto') as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  const handleFileChange = async (field: FileField, actionType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = UseHandleFileChange(e)
    if (file) {
      setValue(field, file, { shouldValidate: true })
      dispatch({ type: actionType, payload: file.name })
      if (field === 'image') setStudantImage(URL.createObjectURL(file))
    }
  }

  const onSubmit = (data: any) => {
    try {
      const formData = new FormData()
      console.log(data)
      fields.map((field) => {
        formData.append(field, data[field])
      })
      navigate('/register/congratulations-page')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6 flex-col">
      <div className="flex gap-3 flex-col w-full max-w-[280px]:">
        <label htmlFor="Foto" className="cursor-pointer ">
          Foto
        </label>
        <ImagePreview Icon={User} onClick={changeStudentPhoto} studentImage={studentImage} />
        <Input
          errorMessage={errors.image?.message}
          inputType="file"
          Icon={User}
          fileName={state.image}
          placeholder={state.image}
          className="hidden"
          hiddenLabel
          label="Foto"
          {...register('image')}
          onChange={(e) => handleFileChange('image', actions.handleChangeImage, e)}
        />
      </div>
      <Input
        errorMessage={errors.certificate?.message}
        inputType="file"
        Icon={Article}
        fileName={state.certificate}
        placeholder={state.certificate}
        label="Declaração ou certificado"
        {...register('certificate')}
        onChange={(e) => handleFileChange('certificate', actions.handleChangeCertificate, e)}
      />
      <Input
        errorMessage={errors.medicalCertificate?.message}
        inputType="file"
        Icon={IdentificationBadge}
        fileName={state.medicalCertificate}
        placeholder={state.medicalCertificate}
        label="Atestado médico"
        {...register('medicalCertificate')}
        onChange={(e) => handleFileChange('medicalCertificate', actions.handleChangeMedicalCertificate, e)}
      />
      <Input
        errorMessage={errors.vaccineCard?.message}
        inputType="file"
        Icon={UserRectangle}
        fileName={state.vaccineCard}
        placeholder={state.vaccineCard}
        label="Cartão de vacina"
        {...register('vaccineCard')}
        onChange={(e) => handleFileChange('vaccineCard', actions.handleChangeVaccineCard, e)}
      />
      <Input
        errorMessage={errors.identityCard?.message}
        inputType="file"
        Icon={IdentificationCard}
        fileName={state.identityCard}
        placeholder={state.identityCard}
        label="Bilhete de identidade"
        {...register('identityCard')}
        onChange={(e) => handleFileChange('identityCard', actions.handleChangeIdentityCard, e)}
      />
      <Input
        errorMessage={errors.receiptOfPayment?.message}
        inputType="file"
        Icon={Vault}
        fileName={state.receiptOfPayment}
        placeholder={state.receiptOfPayment}
        label="Comprovativo do pagamento"
        {...register('receiptOfPayment')}
        onChange={(e) => handleFileChange('receiptOfPayment', actions.handleChangeReceiptOfPayment, e)}
      />
      <div className="pt-3 w-full">
        <Button type="submit" content="Próximo" />
      </div>
    </form>
  )
}

export { Form }
