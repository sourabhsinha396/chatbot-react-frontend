import { FormEvent } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../../config.json";


function Register() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: ""
    });

    function handleSubmit(event: FormEvent){
        event.preventDefault();
        console.log("Form Submitted");
        console.log(formData);

        try {
            const backendUrl = config.BACKEND_URL || 'http://127.0.0.1:8000';
            axios.post(`${backendUrl}/v1/users`, formData)
            .then((response) => {
                console.log("response", response.data);
                if (response.status === 201) {
                navigate('/login');
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="my-48 bg-gray-200 py-8">
            <h1 className="text-2xl text-center text-teal-500 font-bold mb-4">Register</h1>
            <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
                <input onChange={(event) => setFormData({...formData, full_name: event.target.value})} type="text" placeholder="Full Name" className="px-8 py-2 rounded-md" />
                <input onChange={(event) => setFormData({...formData, email: event.target.value})} type="email" placeholder="Email" className="px-8 py-2 rounded-md" />
                <input onChange={(event) => setFormData({...formData, password: event.target.value})} type="password" placeholder="Password" className="px-8 py-2 rounded-md" />
                <button className="px-8 py-2 bg-teal-500 text-white rounded-md">Register</button>
            </form>
        </div>
    );
}

export default Register;