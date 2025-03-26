import { requireAdmin, getUserAction } from '@/lib/authism/server';
import { LogoutButton } from '@/lib/authism/client';

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