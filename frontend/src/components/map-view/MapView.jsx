import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl = "/maps/gadm41_ARG_1.json";

// Estilos extraídos para evitar recrearlos en cada render
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
};

const MapView = ({ onSelectRegion }) => {
  const handleSelect = (geo) => {
    // Nombre protegido por si la propiedad no existe
    const nombre =
      geo &&
      geo.properties &&
      (geo.properties.NAME_1 || geo.properties.name || "");
    if (!nombre) return;
    if (typeof onSelectRegion === "function") onSelectRegion(nombre);
  };

  const handleKeyDown = (event, geo) => {
    // Permitir selección con Enter o Space para accesibilidad
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect(geo);
    }
  };

  return (
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
                onKeyDown={(e) => handleKeyDown(e, geo)}
                role="button"
                tabIndex={0}
                aria-label={
                  geo.properties &&
                  (geo.properties.NAME_1 || geo.properties.name)
                }
                style={geographyStyles}
              />
            ))
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapView;
