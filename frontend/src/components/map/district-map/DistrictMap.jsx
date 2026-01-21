import style from "./DistrictMap.module.css"
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { useState } from "react";
import provinceName from "../../../../public/provinceNames.json"
import { getAlternativeName } from "../../../utils/altName";

const DistrictMap = ({geo}) => {
    const [mapType, setMapType] = useState("Distrito")
		const name = geo.province
		const lista = provinceName
		const altName = getAlternativeName(name, lista);
		const provincesMap = 
			mapType === "Distrito"
				? `/maps/${altName}_district.json`
				: `/maps/${altName}_subdistrict.json`;
		
    return (
        <div className={style.DistrictMap} >
					<select
						value={mapType}
						onChange={(e) => setMapType(e.target.value)}
						className={style.select}
					>
						<option value="Distrito">Distrito</option>
						<option value="Subdistrito">Subdistrito</option>
					</select>
					<ComposableMap
						projection="geoMercator"
						style={{ width: "100%", height: "100%" }}
						projectionConfig={{
							scale: 150000,
							center: [-58.45, -34.615],
						}}
					>
						<ZoomableGroup maxZoom={20}>
							<Geographies geography={provincesMap}>
      {({ geographies }) =>
        geographies.map((geo) => (
          <Geography key={geo.rsmKey} geography={geo} fill="#DDD" stroke="#333" />
        ))
      }
    </Geographies>
						</ZoomableGroup>
					</ComposableMap>
        </div>
    )
}

export default DistrictMap