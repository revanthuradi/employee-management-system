import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import EmployeeSchema from "../schema/EmployeeSchema";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEmployeContext } from '../context/EmployeeContext';
import uploadFile from '../Hooks/uploadFile.js'
import FullLoader from "./FullLoader.jsx";
import axios from 'axios';
import { toast } from 'react-toastify';
const EditEmploye = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { employeeData } = useEmployeContext();
    const [editEmployeeData, setEditEmployeeData] = useState(null);
    const { editEmployee } = useEmployeContext()
    const [profilePic, setProfilePic] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if (id) {
            const empData = employeeData.find((emp) => emp.id === id);
            if (empData) {
                setEditEmployeeData(empData);
            }
        } else {
            navigate('/employeeList');
        }
    }, [id, employeeData, navigate]);
    // Formik setup
    const formik = useFormik({
        initialValues: editEmployeeData || {
            name: "",
            email: "",
            mobile: "",
            gender: "",
            designation: "",
            course: [],
            image: null,
        },
        validationSchema: EmployeeSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log('Form Data:', values);
            console.log("hello")
        },
    });

    const { values, errors, touched, handleChange, handleBlur, setFieldValue } = formik;

    const submitData = async (e) => {
        e.preventDefault()
        console.log("editemp data : ", editEmployeeData)
        try {
            const res = await axios.put(`http://localhost:4000/api/update-employee/${editEmployeeData._id}`, editEmployeeData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log(res)
            toast.success(res.data.message)
            navigate('/employeelist')
        } catch (error) {
            console.log(error)
        }

    }

    const handlePhotoChange = async (e) => {
        console.log("handle chnage...")
        setIsLoading(true)
        const res = await uploadFile(e.target.files[0])
        setIsLoading(false)
        console.log(res?.url)
        editEmployee({ ...values, image: res.url })

    }
    return (
        <div>
            <div className=" py-3 px-6 flex justify-between">
                <h2 className='text-xl font-bold '>ADD EMLPOYEE</h2>
                <Link to={'/employeelist'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">BACK</Link>
            </div>
            <div className='flex justify-center'>
                <form onSubmit={submitData} className='px-4 flex flex-col gap-8'>
                    {/* Name */}
                    <div>
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
                        {touched.name && errors.name && <p className='block text-red-400'>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
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
                    <div>
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

                    {/* Gender */}
                    <div>
                        <div className='flex gap-9'>
                            <label className="px-2 text-lg font-medium text-gray-700">Gender</label>
                            <div role="group" aria-labelledby="gender">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="M"
                                        checked={values.gender === "M"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {" Male"}
                                </label>
                                <label className="ml-4">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="F"
                                        checked={values.gender === "F"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {" Female"}
                                </label>
                            </div>
                        </div>
                        {touched.gender && errors.gender && <p className='text-red-400 px-2 mt-2'>{errors.gender}</p>}
                    </div>

                    {/* Designation */}
                    <div>
                        <div className='flex items-center gap-14'>
                            <label htmlFor="designation" className="px-2 text-lg font-medium leading-6 text-gray-700">Designation</label>
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

                    {/* Courses */}
                    <div className='flex gap-8'>
                        <label className="px-2 text-lg font-medium leading-6 text-gray-700">Courses</label>
                        <div>
                            {['MCA', 'BCA', 'BSc'].map(course => (
                                <label key={course} className="ml-4">
                                    <input
                                        type="checkbox"
                                        name="course"
                                        value={course}
                                        checked={values.course.includes(course)}
                                        onChange={e => {
                                            const selectedCourses = e.target.checked
                                                ? [...values.course, course]
                                                : values.course.filter(c => c !== course);
                                            setFieldValue('course', selectedCourses);
                                        }}
                                        onBlur={handleBlur}
                                    />
                                    {` ${course}`}
                                </label>
                            ))}
                        </div>
                        {touched.course && errors.course && <p className='text-red-400'>{errors.course}</p>}
                    </div>

                    {/* image Upload */}
                    <div>
                        <label htmlFor="image" className="px-2 text-lg font-medium leading-6 text-gray-700">Upload image</label>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            onBlur={handleBlur}
                            className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
                    {isLoading && <FullLoader message={"Upload image..."} />}
                </form>
            </div>
        </div>
    );
};

export default EditEmploye;
