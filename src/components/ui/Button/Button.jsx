export const Button = ({ label, onClick, classNames }) => {
    return (
        <button onClick={onClick} className="px-2 py-2 bg-blue-800 text-white rounded-lg">
            {label}
        </button>
    )
}