import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
const HomePage = () => {
    const navigate = useNavigate()
    // useEffect(() => {
    //     navigate('dashboard')
    // })
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}

export default HomePage
