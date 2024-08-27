import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Set isScrolled to true if the user scrolls beyond 10px or if the menu is open
            if (window.scrollY > 100 || menu) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [menu]); // Adding 'menu' as a dependency to re-run effect when menu state changes

    // Toggle menu function
    const toggleMenu = () => {
        setMenu(prevMenu => !prevMenu);
        // Ensure isScrolled is true when the menu is open
        if (!menu) {
            setIsScrolled(true);
        }
    };

    return (
        <>
            <header className={`fixed top-0 left-0 w-full flex justify-between items-center px-12 py-3 z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#020C1B]' : 'bg-[rgba(0, 0, 0, 0.1)]'}`}>
                <Link to='/'><img src="https://movix-app-murex.vercel.app/assets/movix-logo-HTlvmwAF.svg" alt="logo" /></Link>
                <div className="flex gap-5">
                    <Link className="md:block hidden hover:text-[#da2f68] transition click" to='/movieslist'>Movies</Link>
                    <Link className="md:block hidden hover:text-[#da2f68] transition click" to='/tvshows'>TV Shows</Link>
                    <div className="md:hidden block">
                        {
                            menu ? 
                            <CloseOutlinedIcon 
                                onClick={toggleMenu} 
                                className="md:hidden block cursor-pointer" 
                            /> :
                            <MenuOutlinedIcon 
                                onClick={toggleMenu} 
                                className="md:hidden block cursor-pointer" 
                            />
                        }
                    </div>
                </div>
            </header>
            {
                menu && 
                <div className="flex flex-col fixed top-14 px-12 gap-5 text-lg py-4 z-50 bg-[#020C1B] w-full">
                    <Link to='/movieslist' className="hover:text-[#da2f68] transition click" onClick={toggleMenu}>Movies</Link>
                    <Link to='/tvshows' className="hover:text-[#da2f68] transition click" onClick={toggleMenu}>TV Shows</Link>
                </div>
            }
        </>
    )
}

export default Header;
