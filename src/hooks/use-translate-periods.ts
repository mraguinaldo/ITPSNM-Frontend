
const UseTranslatePeriods = (period: string)=> {
  const periods: any = {
    MORNING: "Manhã",
    EVENING: "Noite",
    AFTERNOON: "Tarde"
  };

  return periods[period] || "---";
}

export { UseTranslatePeriods }