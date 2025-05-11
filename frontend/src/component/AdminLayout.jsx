import Sidebar  from './Sidebar';
import { Outlet } from 'react-router-dom'; 
import {useAuth} from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AdminLayout() { 
    const {user} = useAuth()
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!user || user.role !== 'admin'){
            navigate('/')
        }
    }, [user, navigate])

    return (
        <div className='d-flex w-100 h-100'>
            <Sidebar />
            <main className='flex-grow-1' style={{overflow: 'hidden'}}>
                <Outlet></Outlet>
            </main>
        </div>
    )
}