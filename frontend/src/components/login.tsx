// import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { RegistratonSchema } from './Schema/registrationSchema';


const initialValues= {
    username:'',
    password:''
}

const Login: React.FC = () => {

  const navigate = useNavigate()

  const {errors, handleChange, touched, handleBlur, handleSubmit, values} = useFormik({
    initialValues:initialValues,
    validationSchema:RegistratonSchema,
    onSubmit:async(values)=>{
        await axios.post('http://localhost:3001/user/login', values ) 
        .then(response => {
            if(response.status === 201){
              if(response.data.access_token){
                localStorage.setItem('accessToken', response.data.access_token);
                navigate("/chatroom")
              }
              else{
                alert('please provide correct password')
              }
            }
            else{
                alert('email and password are incorrect')
                console.log(response)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
  })

  return (
    <div className="flex flex-col justify-center items-center max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4 h-full w-full">
        <input
          type="email"
          name='username'
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.username && touched.username ? <p className="text-[10px] md:text-[15px] text-red-500">{errors.username}</p> : null}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.password && touched.password ? <p className="text-[10px] md:text-[15px] text-red-500">{errors.password}</p> : null}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
