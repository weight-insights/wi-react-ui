import { Navigate } from 'react-router-dom';
import Landing from './Landing';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';


//export function ProtectedRoute({isAuthenticated, logout} : {isAuthenticated: boolean; logout: () => void}): ReactElement {
export function ProtectedRoute(): ReactElement {
    const {isAuthenticated} = useSelector((state: RootState) => state.user);

    return (
        isAuthenticated ?
        <Landing/> : <Navigate to="/sign-in" />
        //<Layout logout={logout}/> : <Navigate to="/sign-in" />
    )
}

export default ProtectedRoute;