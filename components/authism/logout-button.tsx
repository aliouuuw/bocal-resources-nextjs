"use client";

import { Button } from '@/components/ui/button'
import { clearSession } from '@/app/actions/auth/session'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authism/hooks/use-auth';

function LogoutButton() {
    const router = useRouter();
    const { logout } = useAuth();
    
    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            // Call the server action to clear the cookie
            const result = await clearSession();
            
            if (result.success) {
                // Update client-side auth state
                if (logout) logout();
                
                // Navigate to login page
                router.push('/admin/login');
                router.refresh();
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    
    return (
        <Button 
            onClick={handleLogout} 
            variant="secondary"
        >
            Logout
        </Button>
    );
}

export default LogoutButton;
