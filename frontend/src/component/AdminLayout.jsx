import Sidebar  from './Sidebar';
import { Outlet } from 'react-router-dom'; 

export default function AdminLayout() { 
    return (
        <div className='d-flex w-100 h-100'>
            <Sidebar />
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    )
}