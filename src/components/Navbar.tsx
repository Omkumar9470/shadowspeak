'use client'

import React from "react"

// --- Mock Implementations for Self-Contained Example ---

// Mock next/link Link component
const Link = ({ href, children, ...props }: { href: string, children: React.ReactNode, [key: string]: any }) => (
    <a href={href} {...props}>{children}</a>
);

// Mock next-auth/react hooks and types
const useSession = () => {
    // To test both states, you can change this mock data
    const mockSession = {
        user: {
            username: 'TestUser',
            email: 'test@example.com'
        },
        expires: '1'
    };
    // Return null to test the logged-out state
    // return { data: null };
    return { data: mockSession };
};

const signOut = () => {
    alert('Signing out...');
};

type User = {
    username?: string | null;
    email?: string | null;
    name?: string | null;
    image?: string | null;
};

// Mock ./ui/button component
const Button = ({ children, ...props }: { children: React.ReactNode, [key: string]: any }) => (
    <button {...props} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
        {children}
    </button>
);

// --- Original Navbar Component ---

const Navbar = () => {
    const {data: session} = useSession()

    const user: User | undefined = session?.user

    return(
        <nav className="p-4 md:p-6 shadow-md bg-white">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Corrected: Used Link component for navigation */}
                <Link className="text-xl font-bold mb-4 md:mb-0" href="/">
                    Shadow Speak
                </Link>
                {
                    session ? (
                        <div className="flex items-center">
                            <span className="mr-4">Welcome, {user?.username || user?.email}</span>
                            <Button onClick={() => signOut()}>LogOut</Button>
                        </div>
                    ) : (
                        // Corrected: Used Link component for navigation
                        <Link href="/sign-in">
                            <Button className="w-full md:w-auto">Login</Button>
                        </Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar;

