import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import AccountMenu from '@/components/AccountMenu';
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth')
  }
  return (
    <section>
      <AccountMenu visible={true} />
      <h1>Home</h1>
      <h1>Server Side Rendered</h1>
      <pre>{JSON.stringify(session)}</pre>
    </section>
  )
}