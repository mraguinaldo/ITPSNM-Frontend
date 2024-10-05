import { forwardRef } from 'react'
import type { IRadioButton } from './interface'
import { Check } from 'phosphor-react'

const RadioButton = forwardRef<HTMLInputElement, IRadioButton>((props, ref) => {
  const { onClick, checked, label, value, ...rest } = props

  return (
    <div onClick={onClick} className="flex w-fit  cursor-pointer items-center gap-2">
      <div
        className={`flex h-[24px] cursor-pointer border-2 w-full max-w-[24px] items-center justify-center rounded-full p-1
           ${checked ? 'border-[#F8C40D]' : 'border-[#D9D9D9]'}`}
      >
        <input
          type="radio"
          className="opacity-0 absolute"
          ref={ref}
          value={value}
          checked={checked}
          id={label}
          {...rest}
        />
        <Check weight="bold" color="#F8C40D" size={12} className={`${checked ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      <label htmlFor={label} className="text-[14px] w-fit whitespace-nowrap cursor-pointer text-[#2F2F2F] font-medium">
        {label}
      </label>
    </div>
  )
})

export { RadioButton }
