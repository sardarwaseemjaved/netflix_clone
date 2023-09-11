
import ProtectedServerRoute from '@/components/ProtectedServerRoute';
import UserCard from "./components/UserCard";

const App = () => {
    return (
        <ProtectedServerRoute>
            <div className="flex items-center h-full justify-center">
                <div className="flex flex-col">
                    <h1 className="text-3xl md:text-6xl text-white text-center">Who&#39;s watching?</h1>
                    <div className="flex items-center justify-center gap-8 mt-10">
                        <UserCard />
                    </div>
                </div>
            </div>
        </ProtectedServerRoute>
    );
}

export default App;