//eslint-disable-next-line
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import AuthUser from './AuthUser';
import { Header } from './Header';

export const Redirect = () => {

    //eslint-disable-next-line
    const { user } = AuthUser();
    //eslint-disable-next-line
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(user)
        if(user.rol > 5) {
            navigate("/invoices")
        } else {
            navigate("/home")
        }
    });

    return (
        <div className="vertical-center bg-lighten text-black">
            <Header></Header>
            <div className="container grid place-items-center align-middle mt-80">
                <div id="notfound" className="text-center">
                    <h2><span className="redirect-loader text-center grid place-content-center place-items-center mx-auto"></span></h2>
                    <h2 className='text-2xl text-center mt-2'>Redireccionando...</h2>
                    <p className='text-xl'>¡En un momento serás redireccionado a tu destino!</p>
                </div>
            </div>
        </div>
    )
}
