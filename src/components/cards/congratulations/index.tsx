import type { ICongratulationsCard } from './interface'

const CongratulationsCard = ({
  course,
  avatar,
  fullName,
  level,
  phoneNumber,
  registrationNumber,
}: ICongratulationsCard) => {
  const STUDENT_DATA = [
    {
      id: 0,
      field: 'Nome: ',
      content: fullName,
    },
    {
      id: 1,
      field: 'Curso: ',
      content: course,
    },
    {
      id: 2,
      field: '',
      content: level,
    },
    {
      id: 3,
      field: 'Telefone: ',
      content: phoneNumber,
    },
  ]

  return (
    <div className="w-full lg:max-w-[436px] h-[418px] flex justify-center px-11 gap-12 rounded-[18px] flex-col relative bg-black bg-opacity-80">
      <img
        src={avatar}
        alt={fullName}
        className="w-full lg:max-w-[436px] left-0 top-0 rounded-[18px] h-[418px] absolute z-[-1]"
      />
      <div className="flex flex-col gap-4">
        {STUDENT_DATA.map(({ field, content, id }) => (
          <p className="text-[14px] md:text-[16px] text-white tracking-[2px]" key={id}>
            {field}
            <span className="text-[#e6e6e6]">{content}</span>
          </p>
        ))}
      </div>
      <span className="py-3 px-6 bg-[#F8C40D] rounded-[6px] flex items-center justify-center font-bold">
        {registrationNumber}
      </span>
    </div>
  )
}

export { CongratulationsCard }
