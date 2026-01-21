import style from "./MainMap.module.css";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Modal } from "../../ui";
import ModalMap from "../../modal-map/ModalMap";
import DistrictMap from "../district-map/DistrictMap";

const mapRef = "/maps/gadm41_ARG_1.json";
const mapStyle = {
  default: {
    fill: "#e4c17f",
    outline: "none",
    stroke: "#141212ff",
    strokeWidth: 0.2,
    cursor: "pointer",
    pointerEvents: "all",
  },
  hover: {
    fill: "#e8b350",
    outline: "none",
    stroke: "#141212ff",
    strokeWidth: 0.2,
    pointerEvents: "all",
    cursor: "pointer",
  },
  pressed: {
    fill: "#D6D6DA",
    outline: "none",
    stroke: "#141212ff",
    pointerEvents: "all",
    cursor: "pointer",
  },
};

const MainMap = () => {
  const [contextMenu, setContextMenu] = useState({
    x: null,
    y: null,
    province: null,
    geoData: null, // obejeto completo
    isActive: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const handleSelectProvince = (event, geo) => {
    const nombre = geo?.properties?.NAME_1;
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      province: nombre,
      geoData: geo,
      isActive: true,
    });
    // console.log("Esto es lo q me trae GEO: ", geo);
    // console.log(nombre);
  };

  return (
    <div className={style.mainmap}>
      <ComposableMap
        projection="geoMercator"
        style={{ width: "100%", height: "100%" }}
        projectionConfig={{ scale: 690, center: [-63, -39] }}
      >
        <ZoomableGroup
          maxZoom={15}
          translateExtent={[
            [-200, -200],
            [1000, 800],
          ]}
        >
          <Geographies geography={mapRef}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={mapStyle}
                  onClick={(event) => handleSelectProvince(event, geo)}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      {contextMenu.isActive && (
        <ul
          className={style.contextMenu}
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li
            onClick={() => {
              setModalOpen(true);
              setContextMenu((prev) => ({ ...prev, isActive: false }));
            }}
          >
            {contextMenu.province}
          </li>
          <li>Gobierno</li>
          <li>Legislatura</li>
          <li onClick={() => console.log(contextMenu.geoData)}>
            Poder Legislativo
          </li>
        </ul>
      )}
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          menuTitle={contextMenu.province}
        >
          <DistrictMap geo={contextMenu} />
        </Modal>
      )}
    </div>
  );
};

export default MainMap;
