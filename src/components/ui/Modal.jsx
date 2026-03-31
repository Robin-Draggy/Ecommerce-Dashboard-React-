export const Modal = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-xl shadow-lg flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-xl cursor-pointer"
            >
              ✕
            </button>
          </div>
  
          {/* Scrollable Body */}
          <div className="p-4 overflow-y-auto flex-1">
            {children}
          </div>
  
          {/* Footer Buttons */}
          {footer && (
            <div className="flex justify-end gap-3 p-4 border-t bg-white sticky bottom-0 z-10">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  };