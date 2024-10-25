import { BrowserRouter, Route, Routes as Router } from 'react-router-dom'
import { CheckEnrollment } from '../pages/check-enrollment'
import { Login } from '../pages/login'
import { PrivateRoute } from './private-route'
import { StudentsTable } from '../components/students-table'
import { EmployeesTable } from '../components/employees-table'
import { EnrollmentsTable } from '../components/enrollment-table'
import { UsersTable } from '../components/users-table'
import { StudentGrades } from '../components/student-grades'
import { CoursesTable } from '../components/courses-table'
import { PersonalDataForm } from '../components/personal-data-form'
import { EnrollmentForm } from '../components/enrollment-form'
import { DocumentForm } from '../components/document-form'
import { Register } from '../pages/register'
import { CongratulationsPage } from '../components/congratulations-page'
import { PostNote } from '../components/post-note'
import { FormToEditEmployee } from '../components/form-to-edit-employee'
import { ShowStudentData } from '../components/show-student-data'
import { AdminDashboard } from '../pages/dashboards/admin'
import { StudentDashboard } from '../pages/dashboards/student'
import { Grades } from '../components/grades'
import { StudentSideBar } from '../pages/dashboards/student/sidebar'
import { PasswordChangePage } from '../pages/password'
import { TransactionsPage } from '../components/transactions'
import { PaymentsPage } from '../components/payments'
import { InvoicesPage } from '../components/invoices'
import { BankProofsPage } from '../components/bank-proofs-page'
import { PaymentsMenu } from '../components/payments-menu'
import { ShowStudentInvoices } from '../components/show-student-invoices'

function Routes() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Register />}>
          <Route index element={<PersonalDataForm />} />
          <Route path="formulario-para-matricula" element={<EnrollmentForm />} />
          <Route path="formulario-de-documentos" element={<DocumentForm />} />
          <Route path="pagina-de-felicitacao" element={<CongratulationsPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/consultar-estado-da-matricula" element={<CheckEnrollment />} />



        <Route
          path="/aluno/painel"
          element={
            <PrivateRoute allowedRoles={['STUDENT']} redirectTo="/login">
              <StudentDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<StudentSideBar />} />
          <Route path="relatorio-de-notas" element={<Grades />} />
          <Route path="seguranca" element={<PasswordChangePage />} />
        </Route>

        <Route
          path="/admin/painel"
          element={
            <PrivateRoute allowedRoles={['ADMIN', 'TEACHER']} redirectTo="/login">
              <AdminDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<StudentsTable />} />
          <Route path="lancar-nota" element={<PostNote />} />
          <Route path="dados-da-matricula" element={<ShowStudentData />} />

          <Route path="tabela-de-funcionarios" element={<EmployeesTable />} />
          <Route path="tabela-de-usuarios" element={<UsersTable />} />
          <Route path="tabela-de-matriculas" element={<EnrollmentsTable />} />
          <Route path="pautas-de-alunos" element={<StudentGrades />} />
          <Route path="tabela-de-cursos" element={<CoursesTable />} />
          <Route path="editar-funcionario" element={<FormToEditEmployee />} />
          <Route path="transacoes" element={<TransactionsPage />} />
          <Route path="pagamentos" element={<PaymentsMenu />} />
          <Route path="efectuar-pagamento" element={<PaymentsPage />} />
          <Route path="faturas" element={<InvoicesPage />} />
          <Route path="comprovativos" element={<BankProofsPage />} />
          <Route path="aluno-faturas" element={<ShowStudentInvoices />} />
        </Route>

        <Route path="*" element={<Login />} />
      </Router>
    </BrowserRouter>
  )
}

export default Routes
