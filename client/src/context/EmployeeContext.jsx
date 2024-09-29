import { createContext, useState, useContext } from "react";

const EmpolyeeDataContext = createContext()

export const EmpolyeeDataProvider = ({ children }) => {
  const [employeeData, setEmployeeData] = useState([])
  const setData = (data) => {
    setEmployeeData([...data])
  }
  const addEmployee = (emplopyee) => {
    setEmployeeData([...employeeData, { ...emplopyee }])
  }
  const editEmployee = (emplopyee) => {
    const index = employeeData.findIndex(obj => obj.id === emplopyee.id);
    if (index !== -1) {
      employeeData.splice(index, 1, emplopyee);
    }

  }

  const deleteEmployee = (id) => {
    const data = employeeData.filter((emp) => emp.id !== id)
    setEmployeeData(data)
  }



  return (

    <EmpolyeeDataContext.Provider
      value={{
        employeeData,
        addEmployee,
        editEmployee,
        deleteEmployee,
        setData
      }}
    >
      {children}
    </EmpolyeeDataContext.Provider>
  )
}

export const useEmployeContext = () => useContext(EmpolyeeDataContext);
