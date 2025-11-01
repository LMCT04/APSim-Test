import { useState, useEffect } from "react";
import { MapView } from "../../components";
import ModalMap from "../../components/modal-map/ModalMap";
import style from "./Game.module.css";
import { useDispatch } from "react-redux";
import { setDBCharacters } from "../../components/redux/slices/characters/charactersSlice";
import { setDBPartys } from "../../components/redux/slices/partys/partysSlice";
import { setDBArgentine } from "../../components/redux/slices/argentina/argentinaSlice";
import { getCharactersCABA } from "../../components/redux/slices/argentina/thunk";

const Game = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([
      fetch("/data/characters.json").then((res) => res.json()),
      fetch("/data/partys.json").then((res) => res.json()),
      fetch("/data/argentina.json").then((res) => res.json()),
    ])
      .then(([characters, partys, argentina]) => {
        dispatch(setDBCharacters(characters));
        dispatch(setDBPartys(partys));
        dispatch(setDBArgentine(argentina));
        dispatch(getCharactersCABA(characters));
      })
      .catch((err) => console.error("Error cargando datos:", err));
  }, []);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [Time, setTime] = useState({
    year: 2025,
    month: 1,
    day: 1,
    hour: 0,
    tick: 0,
  });

  const [speed, setSpeed] = useState(1); // 0 = pausado, 1 = lento, 2 = medio, 3 = rápido

  const handleRegionSelect = (regionName) => {
    setSelectedProvince(regionName);
  };

  const closeModal = () => {
    setSelectedProvince(null);
  };

  // Función para determinar el momento del día
  const getTimeOfDay = (hour) => {
    if (hour >= 0 && hour < 6) return "Madrugada";
    if (hour >= 6 && hour < 12) return "Mañana";
    if (hour >= 12 && hour < 18) return "Tarde";
    return "Noche";
  };

  useEffect(() => {
    if (speed === 0) return;

    const intervalDurations = {
      1: 2000, // x1 = 2s
      2: 1000, // x2 = 1s
      3: 500, // x3 = 0.5s
    };

    const interval = setInterval(() => {
      setTime((prev) => {
        let hour = prev.hour + 2; // Avanza 2 horas por tick
        let day = prev.day;
        let month = prev.month;
        let year = prev.year;

        if (hour >= 24) {
          hour = hour % 24;
          day += 1;
        }
        if (day > 30) {
          day = 1;
          month += 1;
        }
        if (month > 12) {
          month = 1;
          year += 1;
        }

        return {
          ...prev,
          hour,
          day,
          month,
          year,
          tick: prev.tick + 1,
        };
      });
    }, intervalDurations[speed]);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className={style.mainContainer}>
      <div className={style.timeContainer}>
        <p>
          Tiempo: {Time.day}/{Time.month}/{Time.year} - {Time.hour}:00 (
          {getTimeOfDay(Time.hour)})
        </p>
        <div>
          <button onClick={() => setSpeed(1)}>x1</button>
          <button onClick={() => setSpeed(2)}>x2</button>
          <button onClick={() => setSpeed(3)}>x3</button>
          <button onClick={() => setSpeed(0)}>Pausar</button>
        </div>
      </div>

      <MapView onSelectRegion={handleRegionSelect} />
      {selectedProvince && (
        <ModalMap province={selectedProvince} onClose={closeModal} />
      )}
    </div>
  );
};

export default Game;
