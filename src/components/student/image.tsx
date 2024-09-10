interface PropsType {
  img: string
  alt: string
}

const Image = ({ img, alt }: PropsType) => {
  return <img src={img} alt={alt} className="h-14 w-full max-w-[56px] rounded-full border-[2px] border-[#F8C40D]" />
}

export { Image }
