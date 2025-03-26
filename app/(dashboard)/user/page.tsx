import { LogoutButton } from '@/lib/authism/client';
import { getUserAction } from '@/lib/authism/server';

async function page() {
    const user = await getUserAction();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>User Dashboard</h1>
      <p>Welcome, {user?.name || user?.email}</p>
      <LogoutButton />
    </div>
  )
}

export default page
