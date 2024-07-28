import type { IImagePreview } from './interface'

const ImagePreview = ({ Icon, onClick, studentImage }: IImagePreview) => {
  return (
    <div onClick={onClick}>
      {studentImage ? (
        <img
          src={studentImage}
          alt={studentImage}
          onClick={onClick}
          className={
            'flex h-[134px] w-full max-w-[124px] object-cover cursor-pointer items-center justify-center rounded-[6px]'
          }
        />
      ) : (
        Icon && (
          <Icon
            size={24}
            color="#bbbb"
            onClick={onclick}
            className={
              'flex h-[134px] w-full max-w-[124px] cursor-pointer items-center justify-center rounded-[6px] border-[1px] border-[#bbbb]'
            }
          />
        )
      )}
    </div>
  )
}

export { ImagePreview }
