import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setSelectedParty } from "../../redux/slices/game/gameSlice"; // ajustá el path si es necesario
import style from "./gameInit.module.css";

const GameInit = ({ onConfirm }) => {
  const dispatch = useDispatch();
  const partys = useSelector((state) => state.partys);
  const [localSelected, setLocalSelected] = useState(null);

  const handleLocalSelected = (partyName) => {
    setLocalSelected(partyName);
  };

  const handleSelectParty = (partyName) => {
    dispatch(setSelectedParty(partyName));
    onConfirm(); // esto activa el paso siguiente en Game.jsx
  };

  const selectedParty = partys.find((p) => p.partyName === localSelected);
  return (
    <div className={style.initGame}>
      <div className={style.header}>
        <h2>Crear nueva partida: Argentina, Enero 2025</h2>
      </div>
      <div className={style.content}>
        <div className={style.partyList}>
          <h3>Party Select</h3>
          <ul>
            {partys.map((p) => (
              <li
                key={p.acronym}
                onClick={() => handleLocalSelected(p.partyName)}
                className={
                  localSelected === p.partyName ? style.liSelected : style.li
                }
              >
                <span>{p.partyName}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.partyDescription}>
          {selectedParty ? (
            <p>Info de {selectedParty.acronym}</p>
          ) : (
            <p>Seleccione un partido para mas Info.</p>
          )}
        </div>
      </div>
      <div className={style.footer}>
        <button
          disabled={!localSelected}
          onClick={() => handleSelectParty(localSelected)}
        >
          Iniciar partida
        </button>
        {!localSelected && (
          <p>Por favor, selecciona un partido para iniciar la partida.</p>
        )}
      </div>
    </div>
  );
};

export default GameInit;
