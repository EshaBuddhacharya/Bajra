// Sidebar.js
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../App.css';
import { LogOut, Coffee, ShoppingBag, LayoutDashboard, Users } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import {Box} from '@radix-ui/themes'

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
            <Box style={{ width: collapsed ? '80px' : '250px', height: '100vh' }} className='sidebar'/>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`d-flex flex-column sidebar p-3 ${collapsed ? 'collapsed' : ''}`}
                style={{ width: collapsed ? '80px' : '250px', height: '100vh', position: 'fixed', top: 0, left: 0 }}
            >
                <Link
                    className='w-100 mb-5 d-flex gap-2 align-items-center'
                    style={{ height: '5rem', padding: '1rem', color: 'black', textDecoration: 'none' }}
                    to='/'
                >
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className='d-flex gap-3 align-items-center'
                        >
                            <img
                                src="/images/b.png"
                                alt="brand logo"
                                style={{ height: '60px', width: '60px' }}
                            />
                            <h1>𑐰𑐖𑑂𑐬 <br />𑐥𑐮𑐵</h1>
                        </motion.div>)
                    }
                </Link>
                <button
                    className="btn btn-toggle mb-3"
                    onClick={toggleSidebar}
                    style={{ position: 'absolute', right: collapsed ? '10px' : '0', top: 0, transform: "rotate(180deg)" }}
                >
                    {collapsed ? '☰' : <LogOut size={21} />}
                </button>
                <motion.ul 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="nav nav-pills flex-column mb-auto gap-2"
                >
                    {/* <li>
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
                    </li> */}
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
                    <li>
                        <NavLink to="users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            {collapsed ? <Users  size={21} /> : (
                                <div className="d-flex gap-3">
                                    <Users  size={21} />
                                    Users
                                </div>
                            )}
                        </NavLink>
                    </li>
                </motion.ul>
            </motion.div>
        </>);
};

export default Sidebar;
