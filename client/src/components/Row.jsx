import { Link } from 'react-router-dom'
import { useEmployeContext } from '../context/EmployeeContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Row = ({ employe }) => {
    const { deleteEmployee } = useEmployeContext()

    const getDate = () => {
        const dateString = employe?.createdAt
        const date = new Date(dateString);
        return date.toLocaleDateString()
    }

    const handleDelete = async () => {
        console.log("handle delete")
        try {
            const res = await axios.delete(`http://localhost:4000/api/delete-employee/${employe._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            deleteEmployee(employe._id)
            toast.success(res.data.message)
            console.log(res)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <tr className=''>
            <td className='border-2 boder-black py-2 px-4'>{employe?.id}</td>
            <td className='border-2 boder-black py-2 px-4'>
                <div className='h-full w-full bg-red-100'>
                    <img src={employe?.image} alt="employee image" className='' />
                </div>
            </td>
            <td className='border-2 boder-black py-2 px-4'>{employe?.name}</td>
            <td className='border-2 boder-black py-2 px-4'>{employe?.email}</td>
            <td className='border-2 boder-black py-2 px-4'>{employe?.mobile}</td>
            <td className='border-2 boder-black py-2 px-4'>{employe?.designation}</td>
            <td className='border-2 boder-black py-2 px-4'>{employe?.gender}</td>
            <td className='border-2 boder-black py-2 px-4'>{employe?.course.join(",")}</td>
            <td className='border-2 boder-black py-2 px-4'>{getDate()}</td>
            <td className='border-2 boder-black py-2 px-4 text-blue-700'>
                <Link to={`editemployee/${employe?.id}`} className='hover:text-gray-400'>EDIT</Link>
                <button onClick={() => handleDelete()} type='button' className='ml-2 hover:text-red-500'>{" DELETE"}</button>
            </td>
        </tr>
    )
}

export default Row
