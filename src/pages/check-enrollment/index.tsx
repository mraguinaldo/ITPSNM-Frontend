import { useState } from 'react'
import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { OptionsModal } from '../../components/modals/options-modal'
import { SelectedArea } from '../../components/selected-area'
import { Search_Types } from './data'
import { CaretDown } from 'phosphor-react'

const CheckEnrollment = () => {
  const [enrollmenteData, setEnrollmenteData] = useState<string>('')
  const [modalState, setModalState] = useState<boolean>(false)
  const [selectedSearchMode, setSelectedSearchMode] = useState<string>(Search_Types[0].value)
  const [currentSearchMode, setCurrentSearchMode] = useState<string>(Search_Types[0].searchType)

  const toggleModalState = (selectMode: string, currentModeType: string) => {
    setModalState((prev) => !prev)
    setSelectedSearchMode(selectMode)
    setCurrentSearchMode(currentModeType)
  }

  const searchEnrollmentStatus = (identifier: string, value: string) => {
    alert(value + identifier)
  }

  return (
    <>
      <Header />
      <section className="py-56">
        <div className="w-full max-w-[1296px] m-auto px-6 flex flex-col lg:flex-row items-center gap-16 justify-center">
          <div className="flex flex-col gap-8 w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-[32px] md:text-[40px] lg:text-[46px] font-medium text-center">
                Consulte o estado da sua inscrição
              </h1>
              <div className="relative w-full max-w-[320px]">
                <button
                  type="button"
                  className="text-[#1E1E1E] w-full py-3 px-6 bg-[#F4F4F4] flex gap-2 rounded-[8px] items-center justify-between cursor-pointer text-[14px] sm:text-[16px] absolute z-50"
                  onClick={() => setModalState((prev) => !prev)}
                >
                  Consultar pelo {selectedSearchMode}
                  <CaretDown
                    size={18}
                    color="#2F2F2F"
                    className={`duration-100 cursor-pointer ${modalState ? 'rotate-[-180deg]' : 'rotate-0'}`}
                  />
                </button>
                <OptionsModal className="top-10" modalState={modalState}>
                  {Search_Types.map(({ id, searchType, value }) => (
                    <SelectedArea
                      key={id}
                      area={value}
                      onClick={() => {
                        toggleModalState(value, searchType)
                      }}
                    />
                  ))}
                </OptionsModal>
              </div>
            </div>

            <div className="flex w-full max-w-[683px] flex-row items-center justify-between gap-3 rounded-[8px] bg-[#F8F8F8] px-3 py-3 mt-9">
              <input
                id="registrationNumber"
                placeholder={`Digite o seu ${selectedSearchMode}...`}
                className="w-full max-w-[445px] rounded-[8px] border-none bg-transparent p-4 text-[14px] lg:text-[18px] leading-[130%] text-[#000] outline-none"
                onChange={(e) => setEnrollmenteData(e.currentTarget.value)}
              />
              <div className="flex w-full items-center justify-center max-w-[150px]">
                <Button
                  type="button"
                  content="Consultar"
                  onClick={() => searchEnrollmentStatus(currentSearchMode, enrollmenteData)}
                  className="bg-[#F8C40D] py-4 leading-[130%] sm:max-w-[150px] sm:px-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export { CheckEnrollment }
