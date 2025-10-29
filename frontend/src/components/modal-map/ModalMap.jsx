import style from "./ModalMap.module.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import partysDB from "../../../public/partys.json";
import comunaDB from "../../../public/comunas.json";
import { useState, useMemo } from "react";
import { SubdistrictModal, DistrictModal } from "../index";

const ModalMap = ({ province, onClose }) => {
  const [viewMode, setViewMode] = useState("barrios");
  const [hoveredKey, setHoveredKey] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedGeo, setSelectedGeo] = useState(null);
  const [modalType, setModalType] = useState(null); // comuna o barrio

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

  const getDBSelectedDistrict = useMemo(() => {
    if (modalType === "district" && selectedGeo) {
      return comunaDB.find((c) => c.id === selectedGeo.properties.id);
    }
    return null;
  }, [modalType, selectedGeo]);

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
        {hoverInfo && (
          <div className={style.infoHoverContainer}>
            <p>
              {viewMode === "barrios" ? "Barrio de " : "Comuna "}
              {viewMode === "barrios"
                ? hoverInfo?.properties.nombre
                : hoverInfo?.properties.comuna}
            </p>

            {viewMode === "barrios" ? (
              <p>Comuna {hoverInfo?.properties.comuna}</p>
            ) : (
              (() => {
                const district = comunaDB.find(
                  (c) => c.id === hoverInfo?.properties?.id
                );
                if (!district) return <p>No se encontró la comuna</p>;

                const president = district.juntaComunal?.presidentDistrict;
                const party = partysDB.find(
                  (p) => p.acronym === president?.politicalAffiliation
                );
                const color = party?.partyColor || "#ccc";

                return (
                  <div className={style.presidentInfo}>
                    <div>
                      <p>
                        <strong>Pte. Jta. Comunal:</strong>
                        <p>{president?.name}</p>
                        <p>
                          <span
                            style={{
                              display: "inline-block",
                              height: "12px",
                              width: "12px",
                              borderRadius: "50%",
                              backgroundColor: color,
                              marginRight: ".5rem",
                              verticalAlign: "middle",
                            }}
                          ></span>
                          {president?.politicalAffiliation}
                        </p>
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Barrios:</strong>
                      </p>
                      <ul>
                        {district.subdistricts.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        )}
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
                      onMouseEnter={() => {
                        setHoveredKey(geo.rsmKey);
                        setHoverInfo(geo);
                      }}
                      onMouseLeave={() => {
                        setHoveredKey(null);
                        setHoverInfo(null);
                      }}
                      onClick={() => {
                        if (viewMode === "barrios") {
                          setSelectedGeo(geo);
                          setModalType("subdistrict");
                        } else {
                          setSelectedGeo(geo);
                          setModalType("district");
                        }
                      }}
                      style={{
                        default: {
                          fill: fillColor,
                          stroke: "#ffffffff",
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
        {selectedGeo && modalType === "subdistrict" && (
          <SubdistrictModal
            geo={selectedGeo}
            onClose={() => setSelectedGeo(null)}
          ></SubdistrictModal>
        )}
        {selectedGeo && modalType === "district" && (
          <DistrictModal
            geo={selectedGeo}
            onClose={() => setSelectedGeo(null)}
            db={getDBSelectedDistrict}
          ></DistrictModal>
        )}
      </div>
    </div>
  );
};

export default ModalMap;
