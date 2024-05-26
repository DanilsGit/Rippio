import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';

export function ProfilePaymentMethods(){
    const user = useAuth((state) => state.user);
    return (
        <>
            
        </>
    )
}