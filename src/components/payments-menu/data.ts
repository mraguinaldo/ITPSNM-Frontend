import { CurrencyDollar, Scroll } from "phosphor-react"

const NAVIGATION_LINKS = [
  {
    id: 1,
    content: 'Transações',
    Icon: Scroll,
    href: '/admin/painel/transacoes',
  },
  {
    id: 2,
    content: 'Pagamentos',
    Icon: CurrencyDollar,
    href: '/admin/painel/efectuar-pagamento',
  },
]

export { NAVIGATION_LINKS }
