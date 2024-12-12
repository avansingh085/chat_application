import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setMobile,setContact ,setMessageChat} from './globalSlice';
import { useNavigate } from 'react-router-dom';
const LoginBox = ({ socket }) => {
    const [isSignIn, setIsSignIn] = useState(true); 
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        mobile: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = isSignIn
                ? 'https://ecommerce-backend1-1.onrender.com/login'
                : 'https://ecommerce-backend1-1.onrender.com/sign_up';

            const data = {
                mobile: formData.mobile.trim(),
                password: formData.password.trim(),
                ...(isSignIn
                    ? {}
                    : { email: formData.email.trim(), user: formData.username.trim() }),
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
         console.log(result)
            if (result.success) {
                dispatch(setMobile(formData.mobile.trim()));
                dispatch(setLogin(1));
                dispatch(setContact(result.Contact))
                dispatch(setMessageChat(result.Message));

                if (socket) {
                    socket.emit('new user', formData.mobile.trim());
                }

                navigate('/Chat');
            } else {
                alert(result.result || 'An error occurred.');
            }
        } catch (err) {
            console.error('Fetch Error:', err);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-gray-100 to-blue-200">
            <form
                className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg md:p-8"
                onSubmit={handleSubmit}
            >
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
                    {isSignIn ? 'Login' : 'Sign Up'}
                </h2>

                {!isSignIn && (
                    <>
                        <div className="mb-4">
                            <label className="block mb-1 text-sm text-gray-600" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 text-sm text-gray-600" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </>
                )}

                <div className="mb-4">
                    <label className="block mb-1 text-sm text-gray-600" htmlFor="mobile">
                        Mobile
                    </label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 text-sm text-gray-600" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {isSignIn ? 'Login' : 'Sign Up'}
                </button>

                <button
                    type="button"
                    className="mt-4 w-full text-sm text-center text-blue-500 hover:text-blue-700 focus:outline-none"
                    onClick={() => setIsSignIn((prev) => !prev)}
                >
                    {isSignIn ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                </button>
            </form>
          
       

    
       


        </div>
    );
};

export default LoginBox;
