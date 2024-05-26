import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';

export function ProfileDirections(){
    const user = useAuth((state) => state.user);
    return (
        <>
            
        </>
    )
}