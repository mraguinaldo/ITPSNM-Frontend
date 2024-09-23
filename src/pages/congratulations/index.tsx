import { useEffect, useState } from 'react'
import { CongratulationsCard } from '../../components/cards/congratulations'
import { Footer } from '../../components/footer'
import { RegistrationNumberCopier } from '../../components/registration-number-copier'
import { UseGetData } from '../../hooks/useGetData'
import { Header } from '../../components/headers/normal'

const CongratulationsPage = () => {
  const [user, setUser] = useState<any>()

  useEffect(() => {
    const enrollmentData = UseGetData('studentData')
    const personalData = UseGetData('IdentityCard')
    const currentUser = { enrollmentData, personalData }
    if (enrollmentData && personalData) setUser(currentUser)
  }, [])

  return (
    <>
      <Header />
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
              <RegistrationNumberCopier content={user?.personalData.phone} />
              <p className="text-[#2f2f2fc6] text-[14px] md:text-[16px]">
                <span className="text-[#4F92E0] uppercase">Nota: </span>
                Este número será necessário para verificar a aprovação da sua matrícula. Recomendamos que o guarde.
              </p>
            </div>
          </div>

          <CongratulationsCard
            avatar="/men-01.png"
            course={user?.enrollmentData.course}
            fullName={user?.enrollmentData.fullName}
            level={user?.enrollmentData.level}
            phoneNumber={user?.personalData.phone}
            registrationNumber={user?.personalData.phone}
          />
        </div>
      </section>
      <Footer />
    </>
  )
}

export { CongratulationsPage }
