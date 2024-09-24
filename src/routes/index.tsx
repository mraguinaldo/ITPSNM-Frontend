import { BrowserRouter, Route, Routes as Router } from 'react-router-dom'
import { Home } from '../pages/home'

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

function Routes() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />}>
          <Route path="personal-data-form" element={<PersonalDataForm />} />
          <Route path="enrollment-form" element={<EnrollmentForm />} />
          <Route path="document-form" element={<DocumentForm />} />
          <Route path="congratulations-page" element={<CongratulationsPage />} />
        </Route>
        <Route path="/check-enrollment" element={<CheckEnrollment />} />
        <Route
          path="/student/grade-view-area"
          element={
            <PrivateRoute path="/login">
              <GradeViewArea />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />}>
          <Route path="students-table" element={<StudentsTable />} />
          <Route path="employees-table" element={<EmployeesTable />} />
          <Route path="users-table" element={<UsersTable />} />
          <Route path="enrollments-table" element={<EnrollmentsTable />} />
          <Route path="users-table" element={<UsersTable />} />
          <Route path="student-grades" element={<StudentGrades />} />
          <Route path="courses-table" element={<CoursesTable />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Router>
    </BrowserRouter>
  )
}

export default Routes
