import { BrowserRouter, Route, Routes as Router } from 'react-router-dom'
import { CheckEnrollment } from '../pages/check-enrollment'
import { GradeViewArea } from '../pages/see-student-grade'
import { Login } from '../pages/login'
import { PrivateRoute } from './private-route'
import { Dashboard } from '../pages/dashboard'
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
          path="/aluno/relatorio-de-notas"
          element={
            <PrivateRoute allowedRoles={['STUDENT']} redirectTo="/login">
              <GradeViewArea />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/painel"
          element={
            <PrivateRoute allowedRoles={['ADMIN', 'TEACHER']} redirectTo="/login">
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<StudentsTable />} />
          <Route path="lancar-nota" element={<PostNote />} />

          <Route path="tabela-de-funcionarios" element={<EmployeesTable />} />
          <Route path="tabela-de-usuarios" element={<UsersTable />} />
          <Route path="tabela-de-matriculas" element={<EnrollmentsTable />} />
          <Route path="pautas-de-alunos" element={<StudentGrades />} />
          <Route path="tabela-de-cursos" element={<CoursesTable />} />
          <Route path="editar-funcionario" element={<FormToEditEmployee />} />
        </Route>

        <Route path="*" element={<Register />} />
      </Router>
    </BrowserRouter>
  )
}

export default Routes
