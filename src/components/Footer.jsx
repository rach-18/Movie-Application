import { Link } from "react-router-dom";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
    return (
        <div className='flex flex-col items-center gap-10 bg-[#020C1B] py-10'>
            <div className="text-white flex justify-evenly lg:w-[40%] w-5/6 sm:text-base text-xs">
                <Link className="transition font-medium hover:text-[#da2f68]">Terms Of Use</Link>
                <Link className="transition font-medium hover:text-[#da2f68]">Privacy-Policy</Link>
                <Link className="transition font-medium hover:text-[#da2f68]">About</Link>
                <Link className="transition font-medium hover:text-[#da2f68]">Blog</Link>
                <Link className="transition font-medium hover:text-[#da2f68]">FAQ</Link>
            </div>
            <p className="text-white xl:w-[60%] sm:w-5/6 w-[95%] sm:text-sm text-xs text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <div className="flex items-center gap-5 text-white">
                <FacebookOutlinedIcon className="icon"
                    sx={{
                        backgroundColor: '#04152D',
                        width: 50,
                        height: 50,
                        padding: 2,
                        borderRadius: 100
                    }}
                />
                <InstagramIcon className="icon"
                    sx={{
                        backgroundColor: '#04152D',
                        width: 50,
                        height: 50,
                        padding: 2,
                        borderRadius: 100
                    }}
                />
                <GitHubIcon className="icon"
                    sx={{
                        backgroundColor: '#04152D',
                        width: 50,
                        height: 50,
                        padding: 2,
                        borderRadius: 100
                    }}
                />
                <LinkedInIcon className="icon"
                    sx={{
                        backgroundColor: '#04152D',
                        width: 50,
                        height: 50,
                        padding: 2,
                        borderRadius: 100
                    }}
                />
            </div>
        </div>
    )
}

export default Footer;
