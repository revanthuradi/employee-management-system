import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';

import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import EditEmploye from './components/EditEmploye';
import AddEmploye from './components/AddEmploye';
import { useAuth } from './Context/AuthContext';
const App = () => {
  const { isAuthenticated } = useAuth()
  return (
    <Router>
      <Routes>
        <Route path='/login' element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path='/signin' element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignupPage />} />
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employeelist" element={<EmployeeList />} />
          <Route path="employeelist/addemployee" element={<AddEmploye />} />
          <Route path="employeelist/editemployee/:id" element={<EditEmploye />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
