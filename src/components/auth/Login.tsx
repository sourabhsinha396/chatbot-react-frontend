import axios from "axios";
import { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Login() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Logging in...');

        try {
            const formData = new FormData();
            formData.append('username', userData.email);
            formData.append('password', userData.password);
            
            console.log(userData);
            axios.post("http://localhost:8000/v1/token", formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                    },
            })
            .then((response) => {
                console.log("response", response.data);
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.access_token);
                    navigate('/');
                }
            })
        } catch (error) {
            console.error(error);
        }
    }


    return (
    <>
    <div className="my-48 bg-gray-200 py-8">
        <h1 className="text-2xl text-center font-bold p-4">Login</h1>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <input type="email" onChange={(event) => setUserData({...userData, email: event.target.value})} placeholder="Email" name="username" className="px-8 py-2 mt-4 rounded-md" />
            <input type="password" onChange={(event) => setUserData({...userData, password: event.target.value})} placeholder="Password" name="password" className="px-8 py-2 my-4 rounded-md" />
            <button className="bg-teal-500 text-white px-4 py-2 rounded-md">Login</button>
        </form>
    </div>
    </>
    )
}