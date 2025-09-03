import { Navigate, Outlet } from 'react-router-dom';
//import Landing from './Landing';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import Layout from './Layout';


//export function ProtectedRoute({isAuthenticated, logout} : {isAuthenticated: boolean; logout: () => void}): ReactElement {
export function ProtectedRoute(): ReactElement {
    const {isAuthenticated} = useSelector((state: RootState) => state.user);

    return (
        isAuthenticated ?
        <Layout><><Outlet /></></Layout>: <Navigate to="/sign-in" />
    )
}

export default ProtectedRoute;