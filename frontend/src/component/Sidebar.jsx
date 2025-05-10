// Sidebar.js
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../App.css';
import { LogOut, Coffee, ShoppingBag, LayoutDashboard } from 'lucide-react';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            // Set collapsed to true if screen width is less than 768px (typical mobile breakpoint)
            setCollapsed(window.innerWidth < 768);
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setCollapsed(!collapsed);

    return (
        <>
            <div style={{ width: collapsed ? '80px' : '250px', height: '100vh' }} className='sidebar'/>

            <div
                className={`d-flex flex-column sidebar p-3 ${collapsed ? 'collapsed' : ''}`}
                style={{ width: collapsed ? '80px' : '250px', height: '100vh', position: 'fixed', top: 0, left: 0 }}
            >
                <Link
                    className='w-100 mb-5 d-flex gap-2 align-items-center'
                    style={{ height: '5rem', padding: '1rem', color: 'black', textDecoration: 'none' }}
                    to='/'
                >
                    {!collapsed && (
                        <>
                            <img
                                src="/images/b.png"
                                alt="brand logo"
                                style={{ height: '60px', width: '60px' }}
                            />
                            <h1>𑐰𑐖𑑂𑐬 <br />𑐥𑐮𑐵</h1>
                        </>)
                    }
                </Link>
                <button
                    className="btn btn-toggle mb-3"
                    onClick={toggleSidebar}
                    style={{ position: 'absolute', right: collapsed ? '10px' : '0', top: 0 }}
                >
                    {collapsed ? '☰' : <LogOut size={21} />}
                </button>
                <ul className="nav nav-pills flex-column mb-auto gap-2">
                    <li>
                        <NavLink to="dashboard"
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                        >
                            {collapsed ? <LayoutDashboard size={21} /> : (
                                <div className="d-flex gap-3">
                                    <LayoutDashboard size={21} />
                                    Dashboard
                                </div>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="orders" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            {collapsed ? <ShoppingBag size={21} /> : (
                                <div className="d-flex gap-3">
                                    <ShoppingBag size={21} />
                                    Orders
                                </div>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="menu" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            {collapsed ? <Coffee size={21} /> : (
                                <div className="d-flex gap-3">
                                    <Coffee size={21} />
                                    Menu
                                </div>
                            )}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>);
};

export default Sidebar;
