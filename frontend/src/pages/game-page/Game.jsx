import { MapView } from "../../components";
import style from "./Game.module.css";
import { useState } from "react";
import ModalMap from "../../components/modal-map/ModalMap";

const Game = () => {
  const [selectedProvince, setSelectedProvince] = useState(null);

  const handleRegionSelect = (regionName) => {
    setSelectedProvince(regionName);
  };

  const closeModal = () => {
    setSelectedProvince(null);
  };

  return (
    <div className={style.mainContainer}>
      <MapView onSelectRegion={handleRegionSelect} />
      {selectedProvince && (
        <ModalMap province={selectedProvince} onClose={closeModal} />
      )}
    </div>
  );
};

export default Game;
