import React from 'react';
import	{Button, Form} from 'semantic-ui-react';
import {useFormik} from "formik"; 
import * as Yup from "yup";
import {loginApi} from "../../../api/user";
import {useAuth} from '../../../hooks';
import {toast} from "react-toastify";
import "./LoginForm.scss";

export function LoginForm() {

    const {login} = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            try {
               const response = await loginApi(formValue); 
               const {access} = response;
               login (access);

            } catch (error) {
                toast.error(error.message)

            }

        }
    });
    return (
        <Form className='Lofin-form-admin' autoComplete="off" onSubmit={formik.handleSubmit}>
        <Form.Input 
        name= "email"
        placeholder="correo electronico"
        value= {formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email} /*para mostrar error */> 
        </Form.Input>

        <Form.Input 
        name= "password"
        type="password"
        placeholder="contraseña"
        value= {formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password} /** */> 
        </Form.Input>
        <Button type="submit"
                content="iniciar sesion"
                primary
                fluid
        />
        </Form>
    );
  
}
function initialValues(){
    return {
        email: "",
        password: ""
    };

}

function validationSchema(){
    return {
        email: Yup.string().email("El correo no es valido").required(true), /**se pone comentario en la barra de correo, si solo se desea mostrar color de error poner true*/
        password: Yup.string().required(true)

    };
}
