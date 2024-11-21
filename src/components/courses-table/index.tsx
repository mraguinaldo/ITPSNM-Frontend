import { Pen } from 'phosphor-react'
import { UseFetchCourses } from '../../hooks/useFetchCourses'
import { ProgressBar } from '../progress-bar'

const CoursesTable = () => {
  const { data: courses, isLoading }: any = UseFetchCourses()



  return (
    <div className="w-full px-8 py-16 lg:p-11 lg:rounded-[16px] bg-white">
      {isLoading && <ProgressBar />}
      <h1 className="text-[24px] lg:text-[32px] font-semibold leading-9">Cursos existentes ( {courses?.length} )</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 py-11">
        {courses?.map((course: any) => (
          <div
            key={course?.id}
            className="w-full bg-[#1A1C1D] rounded-lg flex items-center py-3 px-2 justify-between flex-wrap gap-2"
          >
            <div className="flex gap-2 w-fit items-center">
              <span className="bg-white flex items-center justify-center p-2 rounded-full w-[32px] h-[32px]">
                {course.id}
              </span>
              <p className="text-[14px] uppercase text-white whitespace-nowrap ">{course?.name}</p>
            </div>
            <span className="bg-white flex items-center justify-center p-2 rounded-full">
              <Pen size={14} />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { CoursesTable }
