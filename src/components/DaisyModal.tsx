// DaisyModal.tsx
import React from "react";

type DaisyModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void; // Se usa para cerrar el modal (y es el "No" si es confirm)
  onConfirm?: () => void; // Si existe, el modal muestra confirmación ("Sí" y "No")
  confirmText?: string; // Texto para el botón "Sí"
  cancelText?: string; // Texto para el botón "No"
};

const DaisyModal = ({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Sí",
  cancelText = "No",
}: DaisyModalProps) => {
  return isOpen ? (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/50">
      <div className="m-auto bg-white p-8 rounded-4xl">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="flex gap-4 justify-end">
          {onConfirm ? (
            <>
              <button className="btn btn-outline" onClick={onConfirm}>
                {confirmText}
              </button>
              <button className="btn btn-error" onClick={onClose}>
                {cancelText}
              </button>
            </>
          ) : (
            <button className="btn" onClick={onClose}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default DaisyModal;
