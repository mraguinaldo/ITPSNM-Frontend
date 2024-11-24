
const UseTranslateUser = (user: string)=> {
  const userTypes: any = {
    STUDENT: "Estudante",
    EMPLOYEE: "Funcionário",
    TEACHER: "Professor",
    ADMIN: "Administrador",
  };

  return userTypes[user] || "---";
}

export { UseTranslateUser }