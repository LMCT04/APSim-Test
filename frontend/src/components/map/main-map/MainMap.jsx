import style from "./MainMap.module.css";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

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
  },
  pressed: {
    fill: "#D6D6DA",
    outline: "none",
    stroke: "#141212ff",
    pointerEvents: "all",
  },
};

const MainMap = () => {
  const [contextMenu, setContextMenu] = useState(null);
  const handleSelectProvince = (event, geo) => {
    const nombre = geo?.properties?.NAME_1;
    setContextMenu({ x: event.clientX, y: event.clientY, province: nombre });
    console.log(nombre);
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
      {contextMenu && (
        <ul
          className={style.contextMenu}
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li>{contextMenu.province}</li>
          <li>Gobierno</li>
          <li>Legislatura</li>
          <li>Poder Legislativo</li>
        </ul>
      )}
    </div>
  );
};

export default MainMap;
