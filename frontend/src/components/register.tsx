// import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { RegistratonSchema } from './Schema/registrationSchema';
import { Link } from 'react-router-dom';

const initialValues = {
    username:'',
    password:''
}

const Register: React.FC = () => {

  const navigate = useNavigate()

  const {values, errors, handleChange, handleSubmit, touched, handleBlur} = useFormik({
    initialValues:initialValues,
    validationSchema:RegistratonSchema,
    onSubmit: async (values) => {
        await axios.post('https://chatroom-backend-weld.vercel.app/user/register', {...values})
        .then(response => {
            navigate('login')
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })
    }
  })

  return (
    <div className="flex flex-col justify-center items-center max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4 h-full w-full">
        <input
          type="email"
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.username && touched.username ? <p className="text-[10px] md:text-[15px] text-red-500">{errors.username}</p> : null }
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.password && touched.password ? <p className="text-[10px] md:text-[15px] text-red-500">{errors.password}</p> : null }
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Register</button>
      </form>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mt-3"><Link to="/login">Login</Link></button>
    </div>
  );
}

export default Register;
