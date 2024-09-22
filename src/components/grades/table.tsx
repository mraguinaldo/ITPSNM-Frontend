import { useContext } from 'react'
import { FinalAssessment } from './final-assessment'
import { HeadLine } from './headLine'
import { TypeAssessment } from './type-assessment'
import { Table } from './data'
import { Grade } from './grade'
import { Subject } from './subject'
import type { ITableContent } from './interfaces'
import React from 'react'
import { SelectedLevelContenxts } from '../contexts/selected-level-context'

const TableContent = ({ user }: ITableContent) => {
  const average = 12
  const { selectedLevel }: any = useContext(SelectedLevelContenxts)

  if (!selectedLevel) {
    return (
      <h1 className="text=[24px] md:text-[32px] font-semibold justify-center flex items-center h-dvh">
        Buscando Notas...
      </h1>
    )
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
            {user?.grades[selectedLevel?.ordinalFormClass].map((item: any) => (
              <tr key={item.id}>
                <Subject key={item.id} subject={item.subject} />
                {item.notes.map((currentSubject: any, index: number) => (
                  <React.Fragment key={currentSubject.id}>
                    <Grade grade={currentSubject.note} visible />
                    {(index === 3 || index === 7) && <Grade grade={0} visible={false} />}
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FinalAssessment average={average} />
    </div>
  )
}

export { TableContent }
