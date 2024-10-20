import React, { memo } from 'react';
import Logout from './Logout';
import { NavLink } from 'react-router-dom';

// Memoize the Header component to avoid unnecessary re-renders
const Header = memo(({ onLogout }) => {
    const navlink = [
        { nav: "Projects", to: "/projects" },
        { nav: "Employees", to: "/employees" }
    ];

    return (
        <header>
            <div className="bg-black text-white p-4">
                <h1 className="text-2xl font-bold">Project Management Dashboard</h1>
            </div>
            <nav className='bg-white py-2 px-16 max-sm:px-5 flex justify-between'>
                <div className='py-2 flex'>
                    {navlink.map(({ nav, to }) => (
                        <NavLink
                            to={to}
                            className={({ isActive }) =>
                                `text-gray-900 px-4 rounded font-semibold ${isActive ? 'underline underline-offset-8' : ''}`
                            }
                            key={to}
                        >
                            {nav}
                        </NavLink>
                    ))}
                </div>
                <Logout onLogout={onLogout} />
            </nav>
        </header>
    );
});

export default Header;
