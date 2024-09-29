import React from 'react'
import { useAuth } from '../Context/AuthContext'

const Dashboard = () => {
    const { userData } = useAuth()
    return (
        <div >
            <h2 className='text-xl font-bold py-3 px-6 '>DASHBOARD</h2>
            <div>
                <h2 className='text-xl px-6'>Admin Name : {userData.userName} { }</h2>
                <h2 className='text-xl px-6'>Admin sno : {userData.sno} { }</h2>
            </div>
            <div className='text-center mt-24 '>
                <h2 className='text-xl font-bold'>WELCOME TO ADMIN PANEL</h2>
            </div>
        </div>
    )
}

export default Dashboard
