export const Button = ({ label, onClick }) => {
    return (
        <button type='button' onClick={onClick} className="px-2 py-2 bg-blue-800 text-white rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            {label}
        </button>
    )
}