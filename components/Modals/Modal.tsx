"use client";

import { useEffect, useState, useCallback } from "react";
import { IoClose } from "react-icons/io5";
import Button from "../Button";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  actionLabel?: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: -200,
      transition: {
        type: "tween",
        duration: 0.2,
      },
    },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="grid align-middle overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 md:my-6 mx-auto h-full lg:h-auto md:h-auto">
        {/* ///////// CONTENT/////// */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: "spring", stiffness: 300 }}
              className="translate h-full"
            >
              <div className="translate lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*  Header */}
                <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                  <button
                    onClick={handleClose}
                    className="p-1 border-0 hover:opacity-70 transition absolute left-9 "
                  >
                    <IoClose size={18} />
                  </button>
                  <div className="text-lg font-semibold">{title}</div>
                </div>
                {/* Body */}
                <div className="relative p-6 flex-auto">{body}</div>
                {/* Footer */}

                <div className="flex flex-col gap-2 p-6">
                  <div className="flex flex-row items-center gap-4 w-full">
                    {secondaryAction && secondaryActionLabel && (
                      <Button
                        outline
                        label={secondaryActionLabel}
                        disabled={disabled}
                        onClick={handleSecondaryAction}
                      />
                    )}
                    <Button
                      label={actionLabel}
                      disabled={disabled}
                      onClick={handleSubmit}
                    />
                  </div>
                  {footer}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Modal;
