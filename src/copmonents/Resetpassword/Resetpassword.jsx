import { useContext, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import toast from 'react-hot-toast'; // Import toast

export default function ResetPassword() {
    const { setuserLogin } = useContext(UserContext); // Use consistent casing
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleResetPassword(formValues) {
        setLoading(true);
        try {
            const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', formValues);
            console.log(response);
            
            if (response.status === 200) {
                localStorage.setItem('userToken', response.data.token);
                setuserLogin(response.data.token); // Consistent casing

                toast.success('Password reset successful!', { duration: 2000, position: 'top-center' });
                navigate("/");
            } else {
                toast.error('Password reset failed. Please try again.', { duration: 2000, position: 'top-center' });
            }
        } catch (error) {
            if (error.response) {
              console.log(error.response);
              
                toast.error(error.response.data.message || 'An error occurred', { duration: 2000, position: 'top-center' });
            } else {
                toast.error('Network error or server not reachable', { duration: 2000, position: 'top-center' });
            }
        } finally {
            setLoading(false);
        }
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Invalid email'),
        newPassword: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,9}$/, 'Invalid password'),
    });

    const formik = useFormik({
        initialValues: { email: "", newPassword: "" },
        validationSchema,
        onSubmit: handleResetPassword,
    });

    return (
        <div className='login mt-7'>
            <div className='row flex-col text-black'>
                <h2 className='text-center pb-4 pt-20 text-4xl font-semibold dark:text-black'>Reset Password</h2>
                <div className='starEditor text-center py-4 relative'>
                    <div className='starEditorBeforeProtfoli'></div>
                    <i className="fa-solid fa-star"></i>
                    <div className='starEditorAfterProtfoli'></div>
                </div>
            </div>

            <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-10 ">
                <div className="relative z-0 mb-5 group">
                    <input
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        type="email"
                        name="email"
                        id="email"
                        className="block py-2.5 mx-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="email"
                        className="text-1xl peer-focus:font-medium absolute text-green-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        User Email
                    </label>
                </div>
                {formik.errors.email && formik.touched.email && (
                    <div className="p-4 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik.errors.email}
                    </div>
                )}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onChange={formik.handleChange}
                        value={formik.values.newPassword}
                        onBlur={formik.handleBlur}
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="newPassword"
                        className="text-1xl peer-focus:font-medium absolute text-green-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        New Password
                    </label>
                </div>
                {formik.errors.newPassword && formik.touched.newPassword && (
                    <div className="p-4 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik.errors.newPassword}
                    </div>
                )}

                {error && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    disabled={loading}
                >
                    {loading ? <i className="fa-solid fa-spinner px-1 fa-spin"></i> : 'Submit'}
                </button>
            
                <Link to={'/verfiy'}>
 <button type="submit"  className=" hover:underline text-green-700 focus:ring-4  font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2"> Back </button>
 </Link>
            
            </form>
        </div>
    );
}
