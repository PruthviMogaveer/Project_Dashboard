import React from 'react'

const InputField = ({ label, type, value, onChange, errorMessage }) => (
    <div className="mb-5">
        <label className="block text-gray-800 text-sm font-bold mb-2">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="appearance-none border-2 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none focus:border-gray-400"
            required
        />
        {errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
    </div>
);

export default InputField