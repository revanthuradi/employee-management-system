import { useFormik } from "formik";
import EmployeeSchema from "../schema/EmployeeSchema";
import { useEmployeContext } from "../context/EmployeeContext";
import { useNavigate, Link } from "react-router-dom";
import uploadFile from '../Hooks/uploadFile.js'
import FullLoader from "./FullLoader.jsx";
import { useState } from "react";
import axios from "axios";
const AddEmploye = () => {
    const navigate = useNavigate()
    const [profilePic, setProfilePic] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const { addEmployee } = useEmployeContext()
    const initialValues = {
        name: "",
        email: "",
        mobile: "",
        gender: "",
        designation: "",
        course: [],
        image: ""
    };

    const { values, errors, handleChange, handleBlur, touched, setFieldValue } =
        useFormik({
            initialValues: initialValues,
            validationSchema: EmployeeSchema,
            onSubmit: (values) => {
                console.log('Form Data:', values);
                addEmployee(values)

            }
        });
    const submitData = async (e) => {
        e.preventDefault()

        const employeeData = { ...values, image: profilePic }
        console.log("data : ", employeeData)
        addEmployee(values)
        try {
            const res = await axios.post("http://localhost:4000/api/add-employee", employeeData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log(res)
            navigate('/employeelist')

        } catch (error) {
            console.log(error)
        }
    }

    const handlePhotoChange = async (e) => {
        setIsLoading(true)
        const res = await uploadFile(e.target.files[0])
        setIsLoading(false)
        console.log(res?.url)
        setProfilePic(res.url)
    }
    return (
        <div>
            <div className=" py-3 px-6 flex justify-between">
                <h2 className='text-xl font-bold '>ADD EMLPOYEE</h2>
                <Link to={'/employeelist'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">BACK</Link>
            </div>
            <div className=' flex justify-center'>
                <form onSubmit={submitData} className='px-4 flex flex-col gap-8'>
                    {/* Name */}
                    <div className=''>
                        <div className='flex items-center gap-10'>
                            <label htmlFor="name" className="px-2 text-lg font-medium leading-6 text-gray-700">Name</label>
                            <input
                                onBlur={handleBlur}
                                value={values.name}
                                onChange={handleChange}
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {touched.name && errors.name && <p className=' block text-red-400'>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className=' '>

                        <div className='flex items-center gap-11'>
                            <label htmlFor="email" className="px-2 text-lg font-medium leading-6 text-gray-700">Email</label>
                            <input
                                onBlur={handleBlur}
                                value={values.email}
                                onChange={handleChange}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {touched.email && errors.email && <p className='text-red-400 px-2 mt-2'>{errors.email}</p>}
                    </div>

                    {/* Mobile */}
                    <div className=''>
                        <div className='flex items-center gap-8'>
                            <label htmlFor="mobile" className="px-2 text-lg font-medium leading-6 text-gray-700">Mobile</label>
                            <input
                                onBlur={handleBlur}
                                value={values.mobile}
                                onChange={handleChange}
                                id="mobile"
                                name="mobile"
                                type="text"
                                autoComplete="mobile"
                                required
                                className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {touched.mobile && errors.mobile && <p className='text-red-400 px-2 mt-2'>{errors.mobile}</p>}
                    </div>

                    {/* Gender - Radio Buttons */}
                    <div className=''>
                        <div className='flex  gap-9'>
                            <label className="px-2 text-lg font-medium   text-gray-700">Gender</label>
                            <div role="group" aria-labelledby="gender">
                                <label>
                                    <input type="radio" name="gender" value="MALE" onChange={handleChange} onBlur={handleBlur} />
                                    {" MALE"}
                                </label>
                                <label className="ml-4">
                                    <input type="radio" name="gender" value="FEMALE" onChange={handleChange} onBlur={handleBlur} />
                                    {" FEMALE"}
                                </label>
                            </div>
                        </div>
                        {touched.gender && errors.gender && <p className='text-red-400 px-2 mt-2'>{errors.gender}</p>}
                    </div>

                    {/* designation - Dropdown */}
                    <div className=''>
                        <div className='flex items-center gap-14'>
                            <label htmlFor="designation" className="px-2 text-lg font-medium leading-6 text-gray-700">designation</label>
                            <select
                                id="designation"
                                name="designation"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.designation}
                                className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="" label="Select designation" />
                                <option value="HR" label="HR" />
                                <option value="Manager" label="Manager" />
                                <option value="Sales" label="Sales" />
                            </select>
                        </div>
                        {touched.designation && errors.designation && <p className='text-red-400 px-2 mt-2'>{errors.designation}</p>}
                    </div>

                    {/* course - Checkbox */}
                    <div className='flex gap-8 '>
                        <label className="px-2 text-lg font-medium leading-6 text-gray-700">course</label>
                        <div className=''>
                            <label>
                                <input
                                    type="checkbox"
                                    name="course"
                                    value="MCA"
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setFieldValue('course', [...values.course, e.target.value]);
                                        } else {
                                            setFieldValue('course', values.course.filter(degree => degree !== e.target.value));
                                        }
                                    }}
                                    onBlur={handleBlur}
                                />
                                {" MCA"}
                            </label>
                            <label className="ml-4">
                                <input
                                    type="checkbox"
                                    name="course"
                                    value="BCA"
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setFieldValue('course', [...values.course, e.target.value]);
                                        } else {
                                            setFieldValue('course', values.course.filter(degree => degree !== e.target.value));
                                        }
                                    }}
                                    onBlur={handleBlur}
                                />
                                {" BCA"}
                            </label>
                            <label className="ml-4">
                                <input
                                    type="checkbox"
                                    name="course"
                                    value="BSC"
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setFieldValue('course', [...values.course, e.target.value]);
                                        } else {
                                            setFieldValue('course', values.course.filter(degree => degree !== e.target.value));
                                        }
                                    }}
                                    onBlur={handleBlur}
                                />
                                {" BSc"}
                            </label>
                        </div>
                        {touched.course && errors.course && <p className='text-red-400'>{errors.course}</p>}
                    </div>

                    {/* Photo Upload */}
                    <div>
                        <label htmlFor="photo" className="px-2 text-lg font-medium leading-6 text-gray-700">Upload Photo</label>
                        <input
                            id="photo"
                            name="photo"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            onBlur={handleBlur}
                            className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>

                    <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
                </form>
                {
                    isLoading && <FullLoader message={"Updloading Image"} />
                }
            </div>
        </div>
    );
};

export default AddEmploye;
