import { Book, CurrencyDollar, Receipt, Scroll } from "phosphor-react"

const NAVIGATION_LINKS = [
  {
    id: 1,
    content: 'Recibos',
    Icon: Scroll,
    href: '/admin/painel/recibos',
  },
  {
    id: 2,
    content: 'Pagamentos',
    Icon: CurrencyDollar,
    href: '/admin/painel/efectuar-pagamento',
  },
  {
    id: 3,
    content: 'Comprovativos',
    Icon: Receipt,
    href: '/admin/painel/comprovativos',
  },
  {
    id: 4,
    content: 'Faturas',
    Icon: Book,
    href: '/admin/painel/faturas',
  },
]

export { NAVIGATION_LINKS }
