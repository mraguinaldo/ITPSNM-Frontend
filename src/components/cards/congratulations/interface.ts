interface ICongratulationsCard {
  fullName: string
  avatar: string
  course: 'Farmácia' | 'Análises Clínicia' | 'Fisioterapia' | 'Enfermagem'
  level: '10ª Classe' | '11ª Classe' | '12ª Classe' | '13ª Classe'
  phoneNumber: string
  registrationNumber: string
}

export type { ICongratulationsCard }
