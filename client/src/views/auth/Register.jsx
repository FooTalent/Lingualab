import React, { useEffect } from 'react'
import { useAppStore } from '../../store/useAppStore';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorMessage from "../../components/ErrorMessage";

export default function Register() {
    const navigate = useNavigate()
    const { userRegister, status } = useAppStore()

    const initialValues = {
        Name: '',
        Surname: '',
        Email: '',
        Password: '',
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    useEffect(() => {
        if (status) {
            navigate('/')
        }
    }, [status, navigate]);

    const handleForm = async (formData) => {
        await userRegister(formData)
    }

    const getInputType = (inputName) => {
        switch (inputName) {
            case 'Email':
                return 'email'
            case 'Password':
                return 'password'
            default:
                return 'text'
        }
    }

    return (
        <React.Fragment>
            <h1 className="text-5xl font-black text-white text-center">Sign Up</h1>

            <form
                onSubmit={handleSubmit(handleForm)}
                className="space-y-8 p-10 mt-10 bg-white"
                noValidate
            >
                <Link to={'/auth/login'}>Ya tienes usuario?</Link>
                {
                    Object.keys(initialValues).map(inputName => (
                        <div key={inputName} className="flex flex-col gap-1">
                            <label className="font-normal text-2xl">{inputName}</label>
                            <input
                                id={inputName}
                                type={getInputType(inputName)}
                                className="w-full p-2 border-gray-300 border"
                                {...register(inputName, {
                                    required: 'Campo obligatorio',
                                    pattern: {
                                        // value: true ? /\S+@\S+\.\S+/ : /\S+@\S+\.\S+/,
                                        message: `Invalid ${inputName}`,
                                    },
                                })}
                            />
                            {errors[inputName] && (
                                <ErrorMessage>{errors[inputName].message}</ErrorMessage>
                            )}
                        </div>

                    ))
                }

                <input
                    type="submit"
                    value='Register'
                    className=" bg-Purple hover:bg-PurpleHover w-full p-3  text-white font-black  text-xl cursor-pointer"
                />

            </form>
        </React.Fragment>
    )
}
