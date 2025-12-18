import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Header() {
    // For now, since Clerk key is not set, use basic header
    // When you set VITE_CLERK_PUBLISHABLE_KEY, uncomment the Clerk code below
    
    // const { user, isSignedIn } = useUser(); // from @clerk/clerk-react
    
    return (
        <div className='p-3 px-5 flex justify-between shadow-md'>
             <Link to={'/dashboard'}>
            <img src='/logo.svg' className='cursor-pointer' width={100} height={100} />
            </Link>
            <Link to={'/dashboard'}>
                <Button>Get Started</Button>
            </Link>
        </div>
    )
}

export default Header