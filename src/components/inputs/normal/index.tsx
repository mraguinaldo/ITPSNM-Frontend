import { forwardRef } from 'react'
import { CaretDown } from 'phosphor-react'
import type { IInput } from './interface'

const Input = forwardRef<HTMLInputElement, IInput>((props, ref) => {
  const {
    className,
    inputType,
    onClick,
    Icon,
    placeholder,
    errorMessage,
    option,
    fileName,
    label,
    chevronState,
    hiddenLabel,
    value,
    iconClick,
    ...rest
  } = props

  const handleFileClick = () => {
    const fileInput = document.getElementById(label) as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  return (
    <div className="relative w-full flex flex-col gap-3">
      <label
        htmlFor={label}
        className={`text-[16px] w-fit font-medium text-[#2F2F2F] cursor-pointer ${hiddenLabel ? 'opacity-0 absolute z-[-1] pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
      >
        {label}
      </label>
      <div
        onClick={onClick}
        className={`flex h-[56px] w-full items-center gap-2 rounded-[4px] border-2 px-4 ${className} duration-200 ${errorMessage ? 'border-[#FB7373] border-opacity-100' : 'border-[#AFAFAF] border-opacity-20 focus-within:border-[#AFAFAF]'} ${option || (inputType === 'file' && 'cursor-pointer focus-within:border-[#AFAFAF]')}`}
      >
        {inputType === 'file' ? (
          <>
            <button
              type="button"
              onClick={handleFileClick}
              className={`w-full cursor-pointer border-none bg-transparent py-4 text-left text-[14px] font-medium outline-none ${errorMessage ? 'text-[#2F2F2F]' : 'text-[#AFAFAF]'}`}
            >
              {fileName && fileName.length >= 32 ? fileName?.slice(-40) : fileName}
            </button>
            <input type="file" id={label} ref={ref} className="hidden" {...rest} />
          </>
        ) : (
          <>
            <input
              type={inputType}
              ref={ref}
              placeholder={placeholder}
              className={`w-full border-none bg-transparent text-[14px] py-4 text-[#2F2F2F] outline-none placeholder:text-[14px] placeholder:font-medium placeholder:text-[#AFAFAF] ${option || placeholder === 'Escolha sua área de atuação' ? 'cursor-pointer' : ''} ${value ? 'opacity-0' : 'opacity-100'}`}
              readOnly={!!option}
              {...rest}
              id={label}
            />
            {value && <span className="absolute">{value}</span>}
          </>
        )}
        {option || placeholder === 'Escolha uma das opções' ? (
          <CaretDown
            size={24}
            color="#2F2F2F"
            className={`duration-100 cursor-pointer ${chevronState ? 'rotate-[-180deg]' : 'rotate-0'}`}
          />
        ) : null}
        {Icon && (
          <Icon size={24} color={errorMessage ? '#F03E33' : '#2F2F2F'} onClick={iconClick} className="cursor-pointer" />
        )}
      </div>

      <span
        className={`absolute bottom-[-22px] left-0 text-[12px] sm:text-[14px] font-medium text-[#FB7373] ${errorMessage ? 'opacity-100' : 'opacity-0'}`}
      >
        {errorMessage}
      </span>
    </div>
  )
})

export { Input }
