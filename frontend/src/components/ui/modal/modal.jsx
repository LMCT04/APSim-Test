import style from "./modal.module.css";

const Modal = ({ isOpen, onClose, children, menuTitle }) => {
  if (!isOpen) return null;
  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={style.headModal}>
          <p>{menuTitle}</p>
          <button onClick={onClose} className={style.btnClose}>
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
