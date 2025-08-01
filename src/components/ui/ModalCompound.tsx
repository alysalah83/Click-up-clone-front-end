"use client";

import { createContext, ReactNode, use, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ButtonIcon from "../common/ButtonIcon";

interface ModalContextTypes {
  isModalOpen: boolean;
  toggleModal: () => void;
  closeModal: () => void;
}

type ContentYPosition = "withTopMargin" | "center" | null;

const ModalContext = createContext<ModalContextTypes | null>(null);

function Modal({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((cur) => !cur);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext value={{ isModalOpen, toggleModal, closeModal }}>
      {children}
    </ModalContext>
  );
}

function ModalTrigger({ children }: { children: ReactNode }) {
  const { toggleModal } = useModal();

  return (
    <span onClick={toggleModal} aria-label="container for the modal trigger">
      {children}
    </span>
  );
}

function Overlay({
  children,
  contentYPosition,
}: {
  children: ReactNode;
  contentYPosition?: ContentYPosition;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const { toggleModal } = useModal();

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-40 flex ${contentYPosition === "center" && "items-center"} justify-center bg-neutral-950/50`}
      onClick={(e) => {
        e.stopPropagation();
        if (e.target !== e.currentTarget) return;
        toggleModal();
      }}
      aria-label="overlay for the modal"
    >
      {children}
    </div>,
    document.body,
  );
}

function ModalContent({
  children,
  contentYPosition = "center",
}: {
  children: ReactNode;
  contentYPosition?: ContentYPosition;
}) {
  const { isModalOpen, closeModal } = useModal();

  if (!isModalOpen) return null;

  return (
    <Overlay contentYPosition={contentYPosition}>
      <div
        className={`relative z-50 m-4 h-fit w-fit ${contentYPosition === "withTopMargin" && "mt-48"} rounded-lg bg-neutral-800`}
        aria-label="container for modal window"
      >
        <span className="absolute top-6 right-6">
          <ButtonIcon
            icon="close"
            ariaLabel="modal close button"
            padding="small"
            onClick={closeModal}
          />
        </span>
        {children}
      </div>
    </Overlay>
  );
}

export function useModal() {
  const values = use(ModalContext);
  if (!values)
    throw new Error("the Modal context is being used outside of his scope");
  return values;
}

export { Modal, ModalTrigger, ModalContent };

export default Modal;
