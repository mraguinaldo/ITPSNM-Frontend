import { useEffect, useReducer, useState } from 'react'
import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { initialValues } from './data'
import { reducer } from './reducer'
import { Article, IdentificationCard, User } from 'phosphor-react'
import type { FileField } from './interfaces'
import { actions } from './actions'
import { UseHandleFileChange } from '../../hooks/useHandleFileChange'
import { ImagePreview } from '../../components/Image-preview'
import { useMutation } from 'react-query'
import { API } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { UseGetData } from '../../hooks/useGetData'

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
    defaultValues: {
      REPORT_CARD: 'Carregue a sua declaração ou certificado',
      IDENTITY_CARD: 'Carregue o seu bilhete de identidade',
      PHOTO: 'Carregue a sua foto',
      identityCardNumber: undefined,
    },
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
      if (field === 'PHOTO') setStudantImage(URL.createObjectURL(file))
    }
  }

  const mutation = useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      console.log(formData)
      const response = await API.post('/uploads/enrollments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data
    },
    onSuccess: (data: any) => {
      console.log('DATA', data)
      navigate('/pagina-de-felicitacao')
    },
    onError: (error: any) => {
      console.log('ERRO', error)
    },
  })

  useEffect(() => {
    const data = UseGetData('enrollment')
    if (data) {
      setValue('identityCardNumber', data.identityCardNumber, { shouldValidate: true })
    }
  }, [setValue])

  const onSubmit = (data: any) => {
    try {
      data.enrollmentId = 2
      const formData = new FormData()

      formData.append('REPORT_CARD', data.REPORT_CARD)
      formData.append('IDENTITY_CARD', data.IDENTITY_CARD)
      formData.append('PHOTO', data.PHOTO)
      formData.append('enrollmentId', data.enrollmentId)

      mutation.mutate({ formData })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6 flex-col">
      <div className="flex gap-3 flex-col w-full max-w-[280px]">
        <label htmlFor="Foto" className="cursor-pointer ">
          Foto
        </label>
        <ImagePreview Icon={User} onClick={changeStudentPhoto} studentImage={studentImage} />
        <Input
          errorMessage={errors.PHOTO?.message}
          inputType="file"
          Icon={User}
          fileName={state.PHOTO}
          placeholder={state.PHOTO}
          className="hidden"
          hiddenLabel
          label="Foto"
          {...register('PHOTO')}
          onChange={(e) => handleFileChange('PHOTO', actions.handleChangeImage, e)}
        />
      </div>
      <Input
        label="Nº do Bilhete de Identidade"
        errorMessage={errors.identityCardNumber?.message}
        inputType="text"
        placeholder="Nº do Bilhete de Identidade"
        {...register('identityCardNumber')}
      />
      <Input
        errorMessage={errors.REPORT_CARD?.message}
        inputType="file"
        Icon={Article}
        fileName={state.REPORT_CARD}
        placeholder={state.REPORT_CARD}
        label="Declaração ou certificado"
        {...register('REPORT_CARD')}
        onChange={(e) => handleFileChange('REPORT_CARD', actions.handleChangeCertificate, e)}
      />

      <Input
        errorMessage={errors.IDENTITY_CARD?.message}
        inputType="file"
        Icon={IdentificationCard}
        fileName={state.IDENTITY_CARD}
        placeholder={state.IDENTITY_CARD}
        label="Bilhete de identidade"
        {...register('IDENTITY_CARD')}
        onChange={(e) => handleFileChange('IDENTITY_CARD', actions.handleChangeIdentityCard, e)}
      />
      <div className="pt-3 w-full">
        <Button isLoading={false} type="submit" content="Próximo" />
      </div>
    </form>
  )
}

export { Form }
