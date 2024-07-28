import { AllProgress } from '../../components/all-progress'
import { Carousel } from '../../components/carousel'
import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { Form } from './form'

const StudentDataForm = () => {
  return (
    <>
      <Header />
      <section className="py-28">
        <div className="w-full max-w-[1296px] m-auto px-6 flex flex-col lg:flex-row items-start gap-24 justify-between">
          <div className="flex items-center justify-center w-full lg:max-w-[596px] rounded-[6px] lg:sticky lg:top-28">
            <Carousel />
          </div>
          <div className="flex flex-col gap-8 w-full lg:max-w-[566px]">
            <div>
              <h2 className="text-[28px] lg:text-[32px] font-medium">Instituto Técnico Privado Nelson Mandela</h2>
            </div>
            <AllProgress firstProcess="concluded" secondProcess="inProgress" thirdProcess="stopped" />
            <Form />
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export { StudentDataForm }
