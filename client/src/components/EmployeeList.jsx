import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Row from './Row'
import { useEmployeContext } from '../context/EmployeeContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const EmployeeList = () => {
    const rows = ["Unique id", "Image", "Name", "Email", "Mobile No", "Designation", "Gender", "Course", "Create date", "Action"]
    const { employeeData, setData } = useEmployeContext()

    const fetchData = async () => {
        try {
            console.log("fetch")
            const res = await axios.get('http://localhost:4000/api/get-employees', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            setData(res.data.employees)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <div className='py-3 px-6 '>
                <h2 className='text-xl font-bold'>EMPLOYEE LIST</h2>
                <div className='flex justify-end items-center gap-4 px-10 pb-4'>
                    <h2>Total count : {employeeData.length}</h2>

                    <Link to={'addemployee'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">ADD EMPLOYE</Link>
                    {/* <Link to={`editemployee/7676`} className="your-class">
                        Edit Employee
                    </Link> */}
                </div>
            </div>
            <div className='flex justify-center'>
                <table className="table-auto">
                    <thead className=''>
                        <tr>
                            {
                                rows.map((row, i) => <th className='border-2 boder-black py-2 px-6' key={i}>{row}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employeeData.map((employe, i) => <Row key={i} employe={employe} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default EmployeeList