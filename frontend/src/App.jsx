import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInComponent from './logIn/LogInComponent'
import SignUpComponent from "./signUp/SignUpComponent.jsx";
import ListOfCoursesComponent from './courses/ListOfCoursesComponent.jsx';
import EnrolledCourses from "./courses/EnrolledCourses.jsx";
import ProfileComponent from "./profile/ProfileComponent.jsx";
import Navbar from './layout/Navbar';
import ProtectedRoute from './service/ProtectedRoute';
import { useLocation } from "react-router";
import { AuthProvider } from "./service/AuthContext.jsx";
import TeacherEnrollments from './teacherEnrollments/TeacherEnrollments.jsx';
import StudentGrades from "./studentGrades/StudentGrades.jsx";
import ProviderFacilitiesComponent from "./components/provider/ProviderFacilitiesComponent.jsx";

function App() {

  return (
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path='/login' element={<LogInComponent />} />
            <Route path='/register' element={<SignUpComponent />} />

            <Route path='/provider-facilities/:id' element={<ProtectedRoute><ProviderFacilitiesComponent /></ProtectedRoute>} />
            <Route path='/list-students/:id' element={<ProtectedRoute><TeacherEnrollments /></ProtectedRoute>} />

            <Route path='/enrollments/:id' element={<ProtectedRoute><EnrolledCourses /></ProtectedRoute>} />
            <Route path='/enrollments/:id/:courseId' element={<ProtectedRoute><StudentGrades /></ProtectedRoute>} />

            <Route path='/profile' element={<ProtectedRoute><ProfileComponent /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
  );
}

export default App