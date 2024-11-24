import { FinalAssessment } from './final-assessment'
import { HeadLine } from './headLine'
import { TypeAssessment } from './type-assessment'
import { Table } from './data'
import { Subject } from './subject'
import type { ITableContent } from './interfaces'
import { Grade } from './grade'
import { TitleForProcessing } from '../title-for-processing'

const TableContent = ({ isLoading, notes }: ITableContent) => {
  if (isLoading) return <TitleForProcessing title='Buscando Notas...' />

  const finalAssessment = notes?.filter((note: any) => note?.approved === 'FAILED')
  const finalAssessmentIms = notes?.filter((note: any) => note?.ims < 10)

  return (
    <div className="flex flex-row pt-12 w-full overflow-x-scroll">
      <div id="grades" className="lg:w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#000C13]">
              {Table.THEAD.map(({ content, id, visible, colSpan }) => (
                <HeadLine key={id} colSpan={colSpan} content={content} visible={visible} />
              ))}
            </tr>
            <tr>
              {Table.TEST_TYPES.map(({ id, testType, visible }) => (
                <TypeAssessment key={id} visible={visible} typeAssessment={testType} />
              ))}
            </tr>
          </thead>
          <tbody>
            {notes ? (
              notes.map((item: any) => (
                <tr key={item.id}>
                  <Subject subject={item.subjects.name} />
                  <Grade key={`${item.id}-pf1`} grade={item.pf1} visible />
                  <Grade key={`${item.id}-pf2`} grade={item.pf2} visible />
                  <Grade key={`${item.id}-pft`} grade={item.pft} visible />
                  <Grade key={`${item.id}-mt1`} grade={item.mt1} visible />
                  <Grade key={`${item.id}-empty1`} grade={0} visible={false} />
                  <Grade key={`${item.id}-ps1`} grade={item.ps1} visible />
                  <Grade key={`${item.id}-ps2`} grade={item.ps2} visible />
                  <Grade key={`${item.id}-pst`} grade={item.pst} visible />
                  <Grade key={`${item.id}-mt2`} grade={item.mt2} visible />
                  <Grade key={`${item.id}-empty2`} grade={0} visible={false} />
                  <Grade key={`${item.id}-pt1`} grade={item.pt1} visible />
                  <Grade key={`${item.id}-pt2`} grade={item.pt2} visible />
                  <Grade key={`${item.id}-ptt`} grade={item.ptt} visible />
                  <Grade key={`${item.id}-mt3`} grade={item.mt3} visible />
                  <Grade key={`${item.id}-nee`} grade={item.nee} visible />
                  <Grade key={`${item.id}-mf`} grade={item.mf} visible />
                  <Grade key={`${item.id}-mfd`} grade={item.mfd} visible />
                  <Grade key={`${item.id}-ims`} grade={item.ims} visible />
                  <Grade key={`${item.id}-resource`} grade={item.resource} visible />
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={20} className="text-center font-bold pt-3">
                  Notas não encontradas 😔
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <FinalAssessment
        average={
          finalAssessmentIms?.length === 1
            ? 'Reprovado'
            : finalAssessment?.length === 2
              ? 'Apto/Deficiência'
              : finalAssessment?.length < 2
                ? 'Apto'
                : 'Reprovado'
        }
      />
    </div>
  )
}

export { TableContent }
