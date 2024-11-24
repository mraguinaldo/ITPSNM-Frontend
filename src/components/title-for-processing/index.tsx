const TitleForProcessing = ({ title }: { title: string }) => {
  return (
    <h1 className="text-[24px] md:text-[32px] font-semibold w-full justify-center flex items-center h-[248px]">
      {title}
    </h1>
  )
}

export { TitleForProcessing }