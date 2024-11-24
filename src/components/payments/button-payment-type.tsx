interface IButtonPaymentType {
  content: string,
  currentPaymentType: string,
  paymentType: string,
  totalPayment: any,
  onClick: () => void
}

const ButtonPaymentType = ({ content, currentPaymentType, paymentType, totalPayment, onClick }: IButtonPaymentType) => {
  return (
    <button
      type="button"
      className={`text-[14px] uppercase border py-2 px-4 rounded-3xl hover:bg-[#dcdcdc52] hover:border-[#dcdcdc] ${currentPaymentType === paymentType ? 'border-[#dcdcdc]' : 'border-[#dcdcdc00]'}`}
      onClick={onClick}
    >
      {content} ( {totalPayment} )
    </button>
  )
}

export { ButtonPaymentType }