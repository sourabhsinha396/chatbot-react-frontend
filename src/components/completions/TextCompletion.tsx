import axios from "axios";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../config.json";

export default function TextCompletion() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message) return;
        
        const messages = document.getElementById('messages');
        const userMessage = document.createElement('div');  
        userMessage.innerHTML = message;
        userMessage.classList.add('bg-gray-800', 'text-white', 'px-4', 'py-2', 'mt-2', 'rounded-md', 'self-end');
        messages?.appendChild(userMessage);


        const token = localStorage.getItem('token');
        if (!token){
            navigate('/login');
        }
        const backendUrl = config.BACKEND_URL || 'http://127.0.0.1:8000';
        axios.post(`${backendUrl}/v1/chat/completions`, {message}, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
            if (response.status === 200 && messages) {
                const botMessage = document.createElement('div');
                botMessage.innerHTML = response.data.choices[0].message.content;
                botMessage.classList.add('bg-gray-800', 'text-teal-400', 'px-4', 'py-2', 'mt-2', 'rounded-md', 'self-start');
                messages.appendChild(botMessage);
            }
            setMessage('');
        })
        .catch((error: AxiosError) => {
            if (error.response) {
                if (error.response.status === 401) {
                    navigate('/login');
                }
            }
            console.error(error);
        });
    };

    return (
        <>
        <div className="flex h-screen">
            {/* sidebar */}
            <div className="hidden lg:block lg:w-2/12 bg-gray-700">
                <h1 className="text-white text-2xl font-bold p-4">Sidebar</h1>
            </div>
            {/* main content area */}
            <div className="flex-1 bg-gray-900 flex flex-col">
                <h1 className="text-2xl text-white font-bold p-4">GPTAPI</h1>
                <div id="messages" className="overflow-auto h-[80vh] w-full flex flex-col gap-4 mx-auto px-4 pb-4"></div>

                <div className="flex-1 flex flex-col justify-end">
                    <form className="flex flex-col mb-8 mx-8" onSubmit={handleSubmit}>
                        <input
                        type="text"
                        name="prompt"
                        placeholder="Enter a Prompt..."
                        className="px-4 py-2 rounded-md mb-2"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        />
                        <button className="bg-teal-500 text-white px-4 py-2 rounded-md">
                            Submit
                        </button>
                    </form>
                </div>                
            </div>
        </div>
        </>
    )
}