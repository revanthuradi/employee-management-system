import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { EmpolyeeDataProvider } from './context/EmployeeContext.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <EmpolyeeDataProvider>
      <App />
      <ToastContainer />
    </EmpolyeeDataProvider>
  </AuthProvider>
)
