import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from '../pages/home'
import { PersonalDataForm } from '../pages/personal-data-form'
import { EnrollmentForm } from '../pages/enrollment-form'
import { DocumentForm } from '../pages/document-form'
import { CongratulationsPage } from '../pages/congratulations'
import { CheckEnrollment } from '../pages/check-enrollment'
import { GradeViewArea } from '../pages/see-student-grade'
import { StudentViewingArea } from '../pages/see-student-table'
import { Login } from '../pages/login'
import { PrivateRoute } from './private-route'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/personal-data-form" element={<PersonalDataForm />} />
        <Route path="/register/enrollment-form" element={<EnrollmentForm />} />
        <Route path="/register/document-form" element={<DocumentForm />} />
        <Route path="/register/congratulations-page" element={<CongratulationsPage />} />
        <Route path="/check-enrollment" element={<CheckEnrollment />} />
        <Route
          path="/student/grade-view-area"
          element={
            <PrivateRoute>
              <GradeViewArea />
            </PrivateRoute>
          }
        />
        <Route path="/student/student-viewing-area" element={<StudentViewingArea />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
