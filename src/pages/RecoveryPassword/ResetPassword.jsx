
import React, { useState } from 'react';
import { Change } from '../../components/changePassword/Change.jsx';
import './changePassword.css'

export function ResetPassword() {

    return (
            <div className='change-background-container'>
                <Change />
            </div>
    )
}