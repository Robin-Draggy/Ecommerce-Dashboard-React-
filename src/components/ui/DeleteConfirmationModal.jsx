import React from "react";
import { Modal } from "./Modal";

export const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, entityName = "item" }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Delete ${entityName}`}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </>
      }
    >
      <p>Are you sure you want to delete this {entityName}? This action cannot be undone.</p>
    </Modal>
  );
};