import { Navigate } from 'react-router-dom';
import Layout from './Layout';
import { ReactElement } from 'react';


export function ProtectedRoute({isAuthenticated, logout} : {isAuthenticated: boolean; logout: () => void}): ReactElement {

    return (
        isAuthenticated ?
        <Layout logout={logout}/> : <Navigate to="/sign-in" />
    )
}

export default ProtectedRoute;