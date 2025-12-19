import style from "./Game.module.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { advanceTime, getTimeOfDay } from "../../utils/time";

import { ModalMap, GameInit, MapView } from "../../components";
import { setDBCharacters } from "../../redux/slices/characters/charactersSlice";
import { setDBPartys } from "../../redux/slices/partys/partysSlice";
import { setDBArgentine } from "../../redux/slices/argentina/argentinaSlice";
import { getCharactersCABA } from "../../redux/slices/argentina/thunk";
import { setDBIdeologies } from "../../redux/slices/ideologies/ideologiesSlice";
import PartyBar from "../../components/party-bar/partyBar";

const Game = () => {
  const dispatch = useDispatch();
  const selectedParty = useSelector((state) => state.game.playerParty);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [partyConfirmed, setPartyConfirmed] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [Time, setTime] = useState({
    year: 2025,
    month: 1,
    day: 1,
    hour: 0,
    tick: 0,
  });

  // Carga inicial de datos
  useEffect(() => {
    Promise.all([
      fetch("/data/characters.json").then((res) => res.json()),
      fetch("/data/partys.json").then((res) => res.json()),
      fetch("/data/argentina.json").then((res) => res.json()),
      fetch("/data/ideologies.json").then((res) => res.json()),
    ])
      .then(([characters, partys, argentina, ideologies]) => {
        dispatch(setDBCharacters(characters));
        dispatch(setDBPartys(partys));
        dispatch(setDBArgentine(argentina));
        dispatch(setDBIdeologies(ideologies));
        dispatch(getCharactersCABA(characters));
      })
      .catch((err) => console.error("Error cargando datos:", err));
  }, []);

  // Sincroniza confirmación de partido con Redux
  useEffect(() => {
    if (selectedParty) {
      setPartyConfirmed(true);
    }
  }, [selectedParty]);

  // Avance del tiempo según velocidad
  useEffect(() => {
    const getIntervalDuration = (speed) => {
      switch (speed) {
        case 1:
          return 2000;
        case 2:
          return 1000;
        case 3:
          return 500;
        default:
          return null;
      }
    };

    const duration = getIntervalDuration(speed);
    if (!duration) return;

    const interval = setInterval(() => {
      setTime((prevTime) => advanceTime(prevTime));
    }, duration);

    return () => clearInterval(interval);
  }, [speed]);

  const handleRegionSelect = (regionName) => {
    setSelectedProvince(regionName);
  };

  const closeModal = () => {
    setSelectedProvince(null);
  };

  const partyDB = useSelector((state) => state.partys);

  return (
    <div className={style.mainContainer}>
      {!partyConfirmed && (
        <GameInit onConfirm={() => setPartyConfirmed(true)} />
      )}
      <PartyBar DataBase={partyDB.find((p) => p.partyName === selectedParty)} />
      <div className={style.topBar}></div>
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
