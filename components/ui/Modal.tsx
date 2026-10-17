"use client";

import { useEffect, useId, useRef } from "react";
import { CloseIcon } from "@/components/icons/UiIcons";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    function handleBackdropClick(event: MouseEvent) {
      if (event.target === dialog) onClose();
    }
    dialog.addEventListener("click", handleBackdropClick);
    return () => dialog.removeEventListener("click", handleBackdropClick);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-[598px] overflow-y-auto rounded-[10px] bg-white p-0 text-grey-950 backdrop:bg-grey-950/40"
    >
      <div className="relative px-6 py-12 md:px-[73px] md:py-[73px]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-lg text-grey-600 transition-colors hover:bg-grey-100 hover:text-grey-950 md:top-8 md:right-8"
        >
          <CloseIcon />
        </button>

        <h2 id={titleId} className="text-h4 text-grey-950">
          {title}
        </h2>

        <div className="mt-10">{open && children}</div>
      </div>
    </dialog>
  );
}
