const Header = () => {
  return (
    <header className="w-full fixed z-50 bg-white border-b border-[#f0f0f0]">
      <div className="w-full max-w-[1296px] m-auto px-6 flex items-center justify-between h-[78px]">
        <a href="/" id="logo" className="flex gap-2 items-center text-[24px] font-bold">
          <img src="/Logo.png" alt="logo" />
          ITPSNM
        </a>

        <div id="student" className="w-full max-w-[56px] h-[56px]">
          <img src="/men-00.png" alt="logo" className="w-full rounded-full border-[3px] border-[#F8C40D]" />
        </div>
      </div>
    </header>
  )
}

export { Header }
