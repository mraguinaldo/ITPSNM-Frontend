import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { BiDataForm } from './pages/bi-data-form'
import { StudentFilesForm } from './pages/student-files-form'
import { StudentDataForm } from './pages/student-data-form'
import { GradeViewArea } from './pages/see-student-grade'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/bi-data-form" element={<BiDataForm />} />
        <Route path="/register/student-data-form" element={<StudentDataForm />} />
        <Route path="/register/student-files-form" element={<StudentFilesForm />} />
        <Route path="/student/grade-view-area" element={<GradeViewArea />} />
      </Routes>
    </Router>
  )
}

export default App
