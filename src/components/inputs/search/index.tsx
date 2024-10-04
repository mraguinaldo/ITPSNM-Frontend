import type { IInputSearch } from './interface'

const InputSearch = ({ placeholder, icon, onChange, className, onKeyDown, value }: IInputSearch) => {
  return (
    <div id="input" className={`flex h-10 w-full items-center gap-2 rounded-[8px] bg-[#F4F4F4] px-4 py-2 ${className}`}>
      {icon && icon}
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value && value}
        className="w-full border-none bg-transparent outline-none placeholder:text-sm placeholder:font-normal placeholder:tracking-[1px] placeholder:text-[#363636]"
      />
    </div>
  )
}

export { InputSearch }
