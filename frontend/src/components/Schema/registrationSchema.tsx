import * as Yup from 'yup'
export const RegistratonSchema = Yup.object({
    username:Yup.string().email().required("Please enter your valid email ID"),
    password:Yup.string().min(5).required("Please enter valid password")
})