
import React, { useState } from 'react';
import { SendEmail } from '../components/changePassword/sendEmail.jsx';
import { Change } from '../components/changePassword/Change.jsx';
import './changePassword.css'

export function ChangePassword() {

    const [isEmailSent, setEmailSent] = useState(true);
    return (
            <div className='change-background-container'>
                {isEmailSent ? <Change /> : <SendEmail />}
            </div>
    )
}