import { BrowserRouter, Route, Routes as Router } from 'react-router-dom'
import { Home } from '../pages/home'
import { PersonalDataForm } from '../pages/personal-data-form'
import { EnrollmentForm } from '../pages/enrollment-form'
import { DocumentForm } from '../pages/document-form'
import { CongratulationsPage } from '../pages/congratulations'
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

function Routes() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Home />} />
        <Route path="/register/personal-data-form" element={<PersonalDataForm />} />
        <Route path="/register/enrollment-form" element={<EnrollmentForm />} />
        <Route path="/register/document-form" element={<DocumentForm />} />
        <Route path="/register/congratulations-page" element={<CongratulationsPage />} />
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
