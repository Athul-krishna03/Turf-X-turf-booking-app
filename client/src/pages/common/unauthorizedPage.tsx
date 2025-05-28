import { ShieldX, ArrowLeft, Home, LogIn } from 'lucide-react';

const UnauthorizedPage = () => {
    const handleGoBack = () => {
        window.history.back();
    };

    const handleGoHome = () => {
        window.location.href = '/';
    };

    const handleLogin = () => {
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 text-center">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="bg-red-500/20 p-6 rounded-full">
                        <ShieldX className="w-24 h-24 text-red-400" />
                    </div>
                </div>

                {/* Error Message */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-white">
                        403
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-300">
                        Access Denied
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        You don't have permission to access this page. Please contact your administrator if you believe this is an error.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={handleGoBack}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </button>
                        
                        <button
                            onClick={handleGoHome}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                        >
                            <Home className="w-4 h-4" />
                            Home
                        </button>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 w-full sm:w-auto mx-auto"
                    >
                        <LogIn className="w-4 h-4" />
                        Login
                    </button>
                </div>

                {/* Additional Info */}
                <div className="pt-8 border-t border-gray-800">
                    <p className="text-sm text-gray-500">
                        Need help? Contact support at{' '}
                        <a 
                            href="mailto:support@turfx.com" 
                            className="text-green-400 hover:text-green-300 transition-colors"
                        >
                            support@turfx.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;