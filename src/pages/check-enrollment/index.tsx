import { useReducer } from 'react'
import { Footer } from '../../components/footer'
import { Button } from '../../components/button'
import { OptionsModal } from '../../components/modals/options-modal'
import { SelectedArea } from '../../components/selected-area'
import { initialValues, Search_Types } from './data'
import { CaretDown } from 'phosphor-react'
import { Header } from '../../components/headers/normal'
import { UseCheckEnrollment } from '../../hooks/useCheckEnrollment'
import { ProgressBar } from '../../components/progress-bar'
import { useSearchParams } from 'react-router-dom'
import { reducer } from './reducer'
import { actions } from './actions'

const CheckEnrollment = () => {
  const [, setSearchParams] = useSearchParams()
  const [state, dispatch] = useReducer(reducer, initialValues)
  const { mutate: useCheckEnrollment, data: enrollmentFound, isLoading, error } = UseCheckEnrollment()

  const { searchValue, isModalOpen, selectedSearchMode, currentSearchType } = state

  const handleSearchModeChange = (modeValue: string, modeType: string) => {
    dispatch({ type: actions.toggleSearchMode, payload: modeValue })
    dispatch({ type: actions.changeSearchType, payload: modeType })
    dispatch({ type: actions.changeModalState, payload: !isModalOpen })
  }

  const handleSearch = (event: any) => {
    event.preventDefault()
    const params = new URLSearchParams({
      [currentSearchType === 'enrollmentNumber' ? 'enrollmentNumber' : 'identityCardNumber']: searchValue,
    })
    setSearchParams(params)
    useCheckEnrollment(params)
  }

  return (
    <>
      <Header />
      {isLoading && <ProgressBar />}
      <section className="py-36 sm:py-56">
        <div className="w-full max-w-[1296px] m-auto px-6 flex flex-col items-center gap-16 justify-center">
          <div className="flex flex-col gap-8 w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-[32px] md:text-[40px] lg:text-[46px] font-medium text-center">
                Consulte o estado da sua inscrição
              </h1>
              <div className="relative w-full max-w-[320px]">
                <button
                  type="button"
                  className="text-[#1E1E1E] w-full py-3 px-6 bg-[#F4F4F4] flex gap-2 rounded-[8px] items-center justify-between cursor-pointer text-[14px] sm:text-[16px] absolute z-50"
                  onClick={() => dispatch({ type: actions.changeModalState, payload: !isModalOpen })}
                >
                  Consultar pelo {selectedSearchMode}
                  <CaretDown
                    size={18}
                    color="#2F2F2F"
                    className={`duration-100 cursor-pointer ${isModalOpen ? 'rotate-[-180deg]' : 'rotate-0'}`}
                  />
                </button>
                <OptionsModal className="top-10" modalState={state.isModalOpen}>
                  {Search_Types.map(({ id, searchType, value }) => (
                    <SelectedArea key={id} area={value} onClick={() => handleSearchModeChange(value, searchType)} />
                  ))}
                </OptionsModal>
              </div>
            </div>

            <form
              onSubmit={handleSearch}
              className="flex w-full max-w-[683px] flex-row items-center justify-between gap-3 rounded-[8px] bg-[#F8F8F8] px-3 py-3 mt-9"
            >
              <input
                id="registrationNumber"
                placeholder={`Digite o seu ${selectedSearchMode}...`}
                className="w-full max-w-[445px] rounded-[8px] border-none bg-transparent p-4 text-[14px] lg:text-[18px] leading-[130%] text-[#000] outline-none"
                onChange={(e) => dispatch({ type: actions.toggleSearchValue, payload: e.currentTarget.value })}
              />
              <div className="flex w-full items-center justify-center max-w-[150px]">
                <Button
                  type="submit"
                  content="Consultar"
                  className="bg-[#000C13] text-white text-[12px] sm:text-[16px] py-4 leading-[130%] sm:max-w-[150px] sm:px-2"
                />
              </div>
            </form>
          </div>
          {error ? <h1 className="text-[24px] text-red-400 font-semibold">Matrícula não encontrada</h1> : ''}
          {enrollmentFound?.enrollment && (
            <div className="flex flex-col gap-2 items-center">
              <h1 className="text-[24px] font-semibold border-b-blue-900">
                {enrollmentFound.enrollment.docsState === 'PENDING' &&
                enrollmentFound.enrollment.docsState === 'PENDING'
                  ? 'MATRICULA PENDENTE'
                  : 'MATRICULA APROVADA'}
              </h1>
              <h2>{enrollmentFound.enrollment.students.fullName}</h2>
              <h2>{enrollmentFound.enrollment.identityCardNumber}</h2>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export { CheckEnrollment }
