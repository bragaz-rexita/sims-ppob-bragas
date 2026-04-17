import { Navigate, Outlet } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

import { getSessionData } from './components/Global/Formatter';

export const ProtectedRoute = () => {
    const session = getSessionData();
    const isAuthenticated = session?.auth ?? false;
    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
};
