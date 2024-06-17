
import { useEffect } from 'react';
import { Change } from '../../components/changePassword/Change.jsx';
import './changePassword.css'
import { useNavigate } from 'react-router-dom';
export function ResetPassword() {
    // /reset-password?token=123456
    const token = window.location.search.split('=')[1]

    const navigate = useNavigate()
    
    useEffect(() => {
        if (token === undefined) {
            navigate('/login')
        }
    }, [token, navigate])

    return (
            <div className='change-background-container'>
                <Change token={token} />
            </div>
    )
}