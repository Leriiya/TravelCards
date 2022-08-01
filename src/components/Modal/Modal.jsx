import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import cn from "classnames";
import s from "./Modal.module.scss";

React.useLayoutEffect = useEffect;

 const Modal = ({
  isOpen,
  onClose,
  children,
  contentClassName,
  closeButton,
}) => {
  const createModalWrapper = (wrapperId) => {
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  };

  const ReactPortal = ({ children, wrapperId = "react-portal-wrapper" }) => {
    const [wrapperElement, setWrapperElement] =
      (useState < HTMLElement) | (null > null);
    useLayoutEffect(() => {
      let element = document.getElementById(wrapperId);
      let systemCreated = false;

      if (!element) {
        systemCreated = true;
        element = createModalWrapper(wrapperId);
      }
      setWrapperElement(element);

      return () => {
        if (systemCreated && element?.parentNode) {
          element.parentNode.removeChild(element);
        }
      };
    }, [wrapperId]);

    if (wrapperElement === null) return null;

    return createPortal(children, wrapperElement);
  };

  return (
    <div wrapperId="modal__root">
      <div className={cn(s.modal, isOpen && s.active)} onClick={onClose}>
        <div
          className={cn(s.modalContent, contentClassName)}
          onClick={(event) => event.stopPropagation()}
        >
          {closeButton ? (
            <div className={s.close} onClick={onClose}>
              &#10006;
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;