import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login();
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-400">
            <div className="bg-white p-8 rounded shadow-md">
                <h1 className="text-2xl mb-4">Login Page</h1>
                <button 
                    onClick={handleLogin}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Login as Admin
                </button>
            </div>
        </div>
    );
};
