import { NavLink } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
const NavBar = () => {
    const { Logout } = useAuth()
    return (
        <nav className="bg-[#03045B] flex gap-10 px-5 py-3 items-center justify-between text-white">
            <div>

                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'bg-blue-500 rounded  px-3 py-2' : ' px-3 py-62')}>
                    Dashboard
                </NavLink>
                <NavLink to="/employeeList" className={({ isActive }) => (isActive ? 'bg-blue-500 rounded  px-3 py-2' : ' px-3 py-62')}>
                    Employee List
                </NavLink>
            </div>
            <div>

                <button onClick={Logout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">logout</button>
            </div>
        </nav>
    )
}
export default NavBar
