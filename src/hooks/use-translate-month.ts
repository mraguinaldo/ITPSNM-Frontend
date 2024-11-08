
const UseTranslateMonth = (monthInEnglish: string)=> {
  const monthsInPortuguese: any = {
    JANUARY: "Janeiro",
    FEBRUARY: "Fevereiro",
    MARCH: "Março",
    APRIL: "Abril",
    MAY: "Maio",
    JUNE: "Junho",
    JULY: "Julho",
    AUGUST: "Agosto",
    SEPTEMBER: "Setembro",
    OCTOBER: "Outubro",
    NOVEMBER: "Novembro",
    DECEMBER: "Dezembro"
  };

  return monthsInPortuguese[monthInEnglish.toUpperCase()];
}

export { UseTranslateMonth }