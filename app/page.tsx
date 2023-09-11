import AccountMenu from '@/components/AccountMenu';
import ProtectedServerRoute from '@/components/ProtectedServerRoute';
export default async function Home() {
  return (
    <ProtectedServerRoute>
      <AccountMenu visible={true} />
    </ProtectedServerRoute>
  )
}