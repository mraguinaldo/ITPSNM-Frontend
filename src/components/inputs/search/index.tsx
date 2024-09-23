import type { IInputSearch } from './interface'

const InputSearch = ({ placeholder, icon, onChange }: IInputSearch) => {
  return (
    <div id="input" className="flex h-10 w-full items-center gap-2 rounded-[8px] bg-[#F4F4F4] p-2">
      {icon && icon}
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border-none bg-transparent outline-none placeholder:text-sm placeholder:font-normal placeholder:tracking-[1px] placeholder:text-[#363636]"
      />
    </div>
  )
}

export { InputSearch }
