import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import style from "./MapView.module.css";

const geoUrl = "/maps/gadm41_ARG_1.json";

const geographyStyles = {
  default: {
    fill: "#D6D6DA",
    outline: "none",
    stroke: "#141212ff",
    strokeWidth: 0.05,
    cursor: "pointer",
  },
  hover: {
    fill: "rgba(16, 72, 177, 1)",
    outline: "none",
    stroke: "#141212ff",
    strokeWidth: 0.05,
  },
  pressed: {
    fill: "#D6D6DA",
    outline: "none",
    stroke: "#141212ff",
    strokeWidth: 0.05,
  },
};

const MapView = ({ onSelectRegion }) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (geo) => {
    const nombre = geo?.properties?.NAME_1 || geo?.properties?.name;
    if (nombre && typeof onSelectRegion === "function") {
      onSelectRegion(nombre);
    }
  };

  const handleRightClick = (event, geo) => {
    event.preventDefault();
    const nombre = geo?.properties?.NAME_1 || geo?.properties?.name;

    if (nombre === "CiudaddeBuenosAires") {
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        options: ["Gobierno Ejecutivo", "Legislatura", "Poder Judicial"],
      });
    } else {
      setContextMenu(null); // No mostrar menú si no es CABA
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setContextMenu(null);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <ComposableMap
        projection="geoMercator"
        style={{ width: "100%", height: "100%" }}
        projectionConfig={{ scale: 750, center: [-63, -40.5] }}
      >
        <ZoomableGroup maxZoom={15}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleSelect(geo)}
                  onContextMenu={(event) => handleRightClick(event, geo)}
                  style={geographyStyles}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {contextMenu && (
        <ul
          style={{
            position: "absolute",
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
            listStyle: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          {contextMenu.options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              style={{
                padding: "6px 12px",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {selectedOption === "Legislatura" && (
        <>
          <div className={style.legislaturaContainer}>
            <h2>Gobierno Ejecutivo de CABA</h2>
            <p>
              Aquí podrías mostrar al Jefe de Gobierno, ministerios,
              secretarías, etc.
            </p>
            <button onClick={() => setSelectedOption(null)}>Cerrar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MapView;
