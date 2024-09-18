import { Copyright } from './copyright'
import { Focus } from './focus'
import { FooterData } from './footer-data'

const Footer = () => {
  return (
    <footer className="pt-16 pb-6 bg-[#000C13]">
      <div className="w-full max-w-[1296px] gap-8 m-auto px-6 flex flex-col">
        <Focus />
        <FooterData />
        <Copyright />
      </div>
    </footer>
  )
}

export { Footer }
