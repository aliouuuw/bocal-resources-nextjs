import { requireAdmin } from '@/lib/authism/core';
import { getUserAction } from '@/app/actions/auth/user';
import LogoutButton from '../../../components/authism/logout-button';

export default async function AdminPage() {
  // Check admin status on the server
  await requireAdmin();
  
  // If we get here, user is authenticated as admin
  const user = await getUserAction();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Admin Dashboard</h1>
      {/* Dashboard content */}
      <p>Welcome, {user?.name || user?.email}</p>
      <LogoutButton />
    </div>
  );
}