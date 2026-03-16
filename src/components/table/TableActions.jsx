import React from 'react';
import { Pencil, Trash2, Eye } from 'lucide-react';

export const TableActions = ({ row, onEdit, onDelete, onView, customActions = [] }) => {
  const handleClick = (handler) => (e) => {
    e.stopPropagation(); 
    handler(row);
  };

  return (
    <div className="flex items-center gap-2">
      {onView && (
        <button
          onClick={handleClick(onView)}
          className="p-2 rounded-full hover:bg-white text-cl-primary transition-colors cursor-pointer"
          title="View"
        >
          <Eye size={16} />
        </button>
      )}
      {onEdit && (
        <button
          onClick={handleClick(onEdit)}
          className="p-2 rounded-full hover:bg-white text-cl-primary transition-colors cursor-pointer"
          title="Edit"
        >
          <Pencil size={16} />
        </button>
      )}
      {onDelete && (
        <button
          onClick={handleClick(onDelete)}
          className="p-2 rounded-full hover:bg-red-600 hover:text-white text-cl-primary transition-colors cursor-pointer"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      )}
      {customActions.map((action, index) => (
        <button
          key={index}
          onClick={handleClick(action.onClick)}
          className="p-2 rounded-full hover:bg-sidebar-cl text-cl-primary transition-colors cursor-pointer"
          title={action.title}
        >
          {action.icon}
        </button>
      ))}
    </div>
  );
};