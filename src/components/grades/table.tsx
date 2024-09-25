import { FinalAssessment } from './final-assessment'
import { HeadLine } from './headLine'
import { TypeAssessment } from './type-assessment'
import { Table } from './data'
import { Subject } from './subject'
import type { ITableContent } from './interfaces'
import { Grade } from './grade'

const TableContent = ({ error, isLoading, notes }: ITableContent) => {
  const average = 12

  if (isLoading) {
    return (
      <h1 className="text-[24px] md:text-[32px] font-semibold justify-center flex items-center h-[248px]">
        Buscando Notas...
      </h1>
    )
  }

  if (error) {
    return <h1 className="text-red-500">Erro ao buscar notas</h1>
  }

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
            {notes
              ? notes.map((item: any) => (
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
                  </tr>
                ))
              : ''}
          </tbody>
        </table>
      </div>

      <FinalAssessment average={average} />
    </div>
  )
}

export { TableContent }
