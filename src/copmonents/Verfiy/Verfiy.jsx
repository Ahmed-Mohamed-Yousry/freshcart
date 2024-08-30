import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

export default function Verfiy() {
  const [error, seterror] = useState(null)
  const [loading, setloading] = useState(false)  
  const navigate = useNavigate();

  async function handleResetCode(formvalues) {
    setloading(true);
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', formvalues);
      setloading(false);
      console.log(response);

      if (response.status === 200) {
        toast.success('Reset code is matched!', { duration: 2000, position: 'top-center' });

      console.log(response);
      
        navigate("/resetpassword");
        //  Redirect to reset password page or appropriate route
      } else {
        toast.error('Unexpected server error.', { duration: 2000, position: 'top-center' });
      }
    } catch (error) {
      setloading(false);
      if (error.response) {
        toast.error(error.response.data.statusMsg || 'An error occurred', { duration: 2000, position: 'top-center' });
      } else {
        toast.error('Network error or server not reachable', { duration: 2000, position: 'top-center' });
      }
    }
  }

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string().required('Reset code is required'),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema,
    onSubmit: handleResetCode,
  });

  return (
    <div className='login mt-7'>
    <div className='row flex-col text-black'>
        <h2 className='text-center pb-4 pt-20 text-4xl font-semibold dark:text-black'>Submit Verification Code</h2>
        <div className='starEditor text-center py-4 relative'>
            <div className='starEditorBeforeProtfoli'></div>
            <i className="fa-solid fa-star"></i>
            <div className='starEditorAfterProtfoli'></div>
        </div>
    </div>

    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-10">
        <div className="relative z-0 w-full mb-5 group">
            <input
                onChange={formik.handleChange}
                value={formik.values.resetCode}
                onBlur={formik.handleBlur}
                type="text"
                name="resetCode"
                id="resetCode"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                required
            />
            <label
                htmlFor="resetCode"
                className="text-1xl peer-focus:font-medium absolute text-green-600 dark:text-green-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Enter your Reset Code
            </label>
        </div>
        {formik.errors.resetCode && formik.touched.resetCode && (
            <div className="p-4 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.resetCode}
            </div>
        )}

        {error && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {error}
            </div>
        )}

        <button
            type="submit"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
            {loading ? <i className="fa-solid fa-spinner px-1 fa-spin"></i> : 'Submit Code'}
        </button>
        

        <Link to={'/forgetpass'}>
 <button type="submit"  className=" hover:underline text-green-700 focus:ring-4  font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2"> Back </button>
 </Link>
   
    </form>
</div>  );
}