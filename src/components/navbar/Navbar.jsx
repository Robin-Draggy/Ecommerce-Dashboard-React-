import { Bell, CircleUserRound, Drum, Moon, Search, Sun } from 'lucide-react'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'

export const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className='flex items-center justify-between px-2 py-3'>

            {/* LOGO */}
            <div className="flex items-center gap-1 font-semibold text-xl">
                <span> <Drum size={14} className="text-blue-800" /> </span>
                <span className="text-blue-800">Dooddle</span>
            </div>

            <div className='flex items-center gap-8'>
            {/* SEARCH BAR */}
            <div className='bg-cl-primary text-cl-primary hidden md:flex items-center gap-2 px-2 py-1 shadow rounded'>
                <Search size={14} />
                <input type="text" placeholder='search' className='focus:outline-none' />
            </div>

            {/* OPTIONS */}
            <div className='flex items-center gap-3'>
                <div className='p-2 bg-cl-primary rounded-full cursor-pointer shadow'>
                    <Bell size={20} />
                </div>
                <button onClick={toggleTheme} className='p-2 bg-cl-primary rounded-full cursor-pointer shadow'>
                    {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                <div className='p-2 bg-cl-primary rounded-full cursor-pointer shadow'>
                    <CircleUserRound size={20} />
                </div>
            </div>

            </div>

        </nav>
    )
}