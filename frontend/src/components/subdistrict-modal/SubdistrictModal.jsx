import style from "./SubdistrictModal.module.css";

const SubdistrictModal = ({ geo, onClose }) => {
  return (
    <div className={style.subModalContainer}>
      <div className={style.modalBox}>
        <h2>Barrio {geo.properties.nombre}</h2>
        <button onClick={onClose}>Cerrar</button>
        {/* Mostrar info de barrio acá */}
      </div>
    </div>
  );
};

export default SubdistrictModal;
