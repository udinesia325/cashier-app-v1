import { login } from '@/features/thunk/auth'
import useAuth from '@/hooks/useAuth'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export default function Login() {
    const dispatch = useDispatch()
    const auth = useAuth()
    const { errors, message } = auth
    const [body, setBody] = useState({
        email: "",
        password: ""
    })
    const onChange = (e) => {
        setBody(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(body))
    }
    return (
        <div className='w-full h-screen flex'>
            <form className='w-96 h-max shadow-md shadow-gray-200 rounded-sm m-auto -translate-y-32 flex flex-col gap-y-3 items-center px-3 py-4' onSubmit={handleSubmit}>
                <h1 className='text-center font-semibold text-3xl'>Cashier App</h1>
                <p className='text-red-400 text-sm'>{message}</p>
                <RenderField label="Email" type="email" value={body} onChange={onChange} message={errors?.email || ''} />

                <RenderField label="Password" type="password" value={body} onChange={onChange} message={errors?.password || ''} />
                <button type="submit" className='bg-primary text-white py-2 w-40 font-semibold rounded-sm disabled:bg-opacity-60 mt-6 mb-3' disabled={auth.loading}>{auth.loading ? "Loading ..." : "Login"}</button>
            </form>
        </div >
    )
}
function RenderField({ label, type, value, onChange, message = "" }) {
    return (
        <label>
            <span className='text-gray-800 tracking-wide'>{label}</span><br />
            <input type={type || "text"} className="outline-none px-2 py-1 text-2xl rounded-sm border border-gray-100 focus:border-gray-400" name={label.toLowerCase()} value={value[label]} onChange={onChange} />
            <p className='text-red-400 text-xs'>{message}</p>
        </label>)
}
