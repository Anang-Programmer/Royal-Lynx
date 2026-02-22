import React from 'react'

const Button = ({
    children,
    onClick,
    variant = 'primary',
    className = ' ',
    disabled = false,
    icon: Icon
}) => {
    const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ease-out rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 hover:-translate-y-0.5";

    const variants = {
        primary: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:to-indigo-500 focus:ring-indigo-500",
        secondary: "bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 focus:ring-gray-200",
        danger: "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 focus:ring-rose-500",
        outline: "bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {Icon && <Icon size={18} className="stroke-[2.5px]" />}
            {children}
        </button>
    )
}

export default Button;