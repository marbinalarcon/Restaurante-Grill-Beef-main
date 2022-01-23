import React from 'react';
import {LoginForm}  from '../../../components/Admin';
import './loginAdmin.scss';


export function LoginAdmin() {
    return (
        <div className='login-admin'>
            <div className='login-admin__content'>
                <h1>Entrar al panel</h1>
                <LoginForm></LoginForm>
            </div>
        </div>
    )
}
