import { Chat, MapPin, Phone } from 'phosphor-react'
import type { IFOOTERDATA } from './interface'

const FOOTER_DATA: IFOOTERDATA[] = [
  {
    id: 0,
    title: 'Menu',
    children: [
      { id: 0, content: 'Início', target: '/' },
      { id: 1, content: 'Tutoriais', target: '/' },
      { id: 2, content: 'Requisitos', target: '/' },
      { id: 3, content: 'Pagamentos', target: '/' },
    ],
  },
  {
    id: 1,
    title: 'Sobre',
    children: [
      { id: 0, content: 'Políticas de privacidade', target: '/' },
      { id: 1, content: 'Direitos autorias', target: '/' },
      { id: 2, content: 'Termos de uso', target: '/' },
      { id: 3, content: 'Transferências', target: '/' },
    ],
  },
  {
    id: 2,
    title: 'Parcerias e Afiliações',
    children: [
      { id: 0, content: 'Grupo Macambriz', target: '/' },
      { id: 1, content: 'Macambriz Angola', target: '/' },
      { id: 2, content: 'Octoplus Developers', target: '/' },
      { id: 3, content: 'ISPNM', target: '/' },
    ],
  },
  {
    id: 3,
    title: 'Localização',
    children: [
      { id: 0, content: 'Bairro panguila', target: '/', Icon: MapPin },
      { id: 1, content: 'Estrada nacional de caxito nº100', target: '/', Icon: MapPin },
      { id: 2, content: 'Entrada da burgalheira junto a sonagás', target: '/', Icon: MapPin },
    ],
  },
  {
    id: 4,
    title: 'Contatos',
    children: [
      { id: 0, content: '912 054 377', Icon: Phone },
      { id: 1, content: '922 740 447', Icon: Phone },
      { id: 2, content: '940 565 052', Icon: Phone },
      { id: 3, content: 'itpsnm@gmail.com', Icon: Chat, target: '/', element: 'email' },
    ],
  },
]

export { FOOTER_DATA }
