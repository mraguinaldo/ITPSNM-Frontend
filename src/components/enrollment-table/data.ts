import { Scroll, UserRectangle } from 'phosphor-react'

interface PropsTypeTableHeader {
  id: number
  content: string
}

export type IInitialValues = {
  selectedStudent: string;
  studentStatus: string;
  modalStatusToConfirmEnrollment: boolean;
  modalStatusToConfirmPeriod: boolean;
  courseId: string | undefined;
  levelId: string | undefined;
  enrollmentId: string | undefined;
  identityCardNumber: string | undefined;
  currentPeriod: string;
  currentPaymentId: string | null;
};


const tableHeader: PropsTypeTableHeader[] = [
  {
    id: 0,
    content: 'Nº',
  },
  {
    id: 1,
    content: 'Nome',
  },
  {
    id: 2,
    content: 'Classe',
  },
  {
    id: 3,
    content: 'Curso',
  },
  {
    id: 4,
    content: 'Estado da matrícula',
  },
  {
    id: 5,
    content: 'Ações',
  },
]

const STUDENT_OPTIONS = [
  {
    id: 1,
    option: 'Confirmar matrícula',
    Icon: Scroll,
  },
  {
    id: 2,
    option: 'Mostrar dados',
    Icon: UserRectangle,
    href: '/admin/painel/dados-da-matricula',
  },
]

const initialValues: IInitialValues = {
  selectedStudent: '',
  studentStatus: '',
  modalStatusToConfirmEnrollment: false,
  modalStatusToConfirmPeriod: false,
  courseId: undefined,
  levelId: undefined,
  enrollmentId: undefined,
  identityCardNumber: undefined,
  currentPeriod: '',
  currentPaymentId: null
}

const PERIODS = [
  {
    id: 0,
    content: "Manhã",
    period: "MORNING"
  } ,
  {
    id: 1,
    content: "Tarde",
    period: "AFTERNOON"
  },
  // {
  //   id: 2,
  //   content: "Noite",
  //   period: "EVENING"
  // }  
]

export { tableHeader, STUDENT_OPTIONS, initialValues, PERIODS }
