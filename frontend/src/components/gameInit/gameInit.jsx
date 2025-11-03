import { useSelector, useDispatch } from "react-redux";
import { setSelectedParty } from "../redux/slices/game/gameSlice"; // ajustá el path si es necesario
import style from "./gameInit.module.css";

const GameInit = ({ onConfirm }) => {
  const dispatch = useDispatch();
  const partys = useSelector((state) => state.partys);
  const selected = useSelector((state) => state.game.playerParty);

  const handleSelectParty = (partyName) => {
    dispatch(setSelectedParty(partyName));
    onConfirm(); // esto activa el paso siguiente en Game.jsx
  };

  return (
    <div className={style.background}>
      <div className={style.initContainer}>
        <h2>Elegí tu partido político</h2>
        <ul>
          {partys.map((p) => (
            <li key={p.acronym}>
              <button onClick={() => handleSelectParty(p.partyName)}>
                {p.partyName}
              </button>
            </li>
          ))}
        </ul>
        {selected && <p>Partido seleccionado: {selected}, seguro?</p>}
      </div>
    </div>
  );
};

export default GameInit;
