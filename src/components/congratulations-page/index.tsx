import { useEffect } from 'react'
import { RegistrationNumberCopier } from '../registration-number-copier'
import { CongratulationsCard } from '../cards/congratulations'
import { UseCheckEnrollment } from '../../hooks/useCheckEnrollment'
import { ProgressBar } from '../progress-bar'
import { UseGetData } from '../../hooks/useGetData'

const CongratulationsPage = () => {
  const { data: user, mutate: useCheckEnrollment, isLoading, error: enrollmentNotFound } = UseCheckEnrollment()
  const enrollment = UseGetData('enrollment')

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchData = async () => {
      if (enrollment?.identityCardNumber) {
        const params = new URLSearchParams({
          identityCardNumber: enrollment.identityCardNumber,
        })
        useCheckEnrollment(params)
      }
    }

    fetchData()
  }, [useCheckEnrollment])

  if (isLoading) {
    return <ProgressBar />
  }

  if (enrollmentNotFound) {
    return (
      <h1 className="text-[32px] md:text-[46px] font-medium h-dvh flex items-center justify-center">
        Matrícula não encontrada
      </h1>
    )
  }

  return (
    <section className="py-36">
      <div className="w-full max-w-[1296px] m-auto px-6 flex flex-col lg:flex-row lg:items-center gap-16 justify-between">
        <div className="flex flex-col gap-8 w-full max-w-[624px]">
          <div className="flex flex-col w-full gap-2">
            <h1 className="text-[32px] md:text-[46px] font-medium">Parabéns 🥳</h1>
            <p className="text-[#1E1E1E]">
              Dados enviados com sucesso. Seus dados serão analisados e, em breve, você poderá consultar se sua
              matrícula foi aprovada.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <RegistrationNumberCopier content={user?.enrollment.id.toString() || ''} />
            <p className="text-[#2f2f2fc6] text-[14px] md:text-[16px]">
              <span className="text-[#4F92E0] uppercase">Nota: </span>
              Este número será necessário para verificar a aprovação da sua matrícula. Recomendamos que o guarde.
            </p>
          </div>
        </div>

        <CongratulationsCard
          avatar="/default.jpeg"
          course={user?.enrollment.courses.name || ''}
          fullName={user?.enrollment.students.fullName || ''}
          level={
            user?.enrollment.levels.name === 'CLASS_10'
              ? '10ª Classe'
              : user?.enrollment.levels.name === 'CLASS_11'
                ? '11ª Classe'
                : '12ª Classe'
          }
          registrationNumber={user?.enrollment.id.toString() || ''}
        />
      </div>
    </section>
  )
}

export { CongratulationsPage }
