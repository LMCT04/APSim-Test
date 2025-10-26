import style from "./ModalMap.module.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import partysDB from "../../../public/partys.json";
import comunaDB from "../../../public/comunas.json";
import { useState } from "react";

const ModalMap = ({ province, onClose }) => {
  const [viewMode, setViewMode] = useState("barrios"); // "barrios" o "comunas"
  const [hoveredKey, setHoveredKey] = useState(null); // para elevar el hovered

  const provinceGeo =
    viewMode === "barrios"
      ? "/maps/CABAbarrios.json"
      : "/maps/CABAcomunas.json";

  const getPartyColor = (party) => {
    const partys = partysDB.find((p) => p.acronym === party);
    return partys?.partyColor || "#F0F0F0";
  };

  const getAffiliation = (geo) => {
    if (viewMode === "barrios") {
      const subdistrictName = geo.properties.nombre;
      const comuna = comunaDB.find((c) =>
        c.subdistricts.includes(subdistrictName)
      );
      return getPartyColor(
        comuna?.juntaComunal?.presidentDistrict?.politicalAffiliation
      );
    } else {
      const districtId = geo.properties.id;
      const comuna = comunaDB.find((c) => c.id === districtId);
      return getPartyColor(
        comuna?.juntaComunal?.presidentDistrict?.politicalAffiliation
      );
    }
  };

  return (
    <div className={style.modalContainer}>
      <div className={style.modalHeader}>
        <p>{province}</p>
        <button onClick={onClose}>CLOSE</button>
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          className={style.viewSelector}
        >
          <option value="barrios">Barrios</option>
          <option value="comunas">Comunas</option>
        </select>
      </div>
      <div className={style.modalContent}>
        <ComposableMap
          projection="geoMercator"
          style={{ width: "100%", height: "100%" }}
          projectionConfig={{
            scale: 150000,
            center: [-58.45, -34.615],
          }}
        >
          <ZoomableGroup maxZoom={20}>
            <Geographies geography={provinceGeo}>
              {({ geographies }) => {
                const hoveredGeo = geographies.find(
                  (g) => g.rsmKey === hoveredKey
                );
                const otherGeos = geographies.filter(
                  (g) => g.rsmKey !== hoveredKey
                );
                const orderedGeos = [...otherGeos, hoveredGeo].filter(Boolean);

                return orderedGeos.map((geo) => {
                  const fillColor = getAffiliation(geo);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHoveredKey(geo.rsmKey)}
                      onMouseLeave={() => setHoveredKey(null)}
                      style={{
                        default: {
                          fill: fillColor,
                          stroke: "#333",
                          strokeWidth: 0.2,
                          outline: "none",
                          cursor: "pointer",
                        },
                        hover: {
                          fill: fillColor,
                          stroke: "#000",
                          strokeWidth: 0.2,
                          outline: "none",
                          filter:
                            "brightness(85%) drop-shadow(0px 2px 6px rgba(0,0,0,0.7))",
                          transform: "scale(1.02)",
                          transformBox: "fill-box",
                          transformOrigin: "center",
                          transition: "all 0.2s ease-in-out",
                          cursor: "pointer",
                        },
                      }}
                    />
                  );
                });
              }}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
};

export default ModalMap;
