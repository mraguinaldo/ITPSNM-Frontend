import { CaretDown } from 'phosphor-react'
import type { IMENU } from './interfaces'

const MENU: IMENU[] = [
  { id: 0, content: 'Início', target: '/' },
  { id: 1, content: 'Requisitos', target: '/', Icon: CaretDown },
  { id: 2, content: 'Tutoriais', target: '/' },
  { id: 3, content: 'Pagamentos', target: '/', Icon: CaretDown },
  { id: 4, content: 'Contatos', target: '/' },
]

export { MENU }
