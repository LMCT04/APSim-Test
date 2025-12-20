import { Link } from "react-router-dom";
import style from "./Menu.module.css";
import { useState } from "react";

const Menu = () => {
  const [option, setOption] = useState(null);
  const handleOption = (value) => {
    setOption(value);
  };

  return (
    <div className={style.menu}>
      <div className={style.header}>
        <h1>Argentine Political Simulator</h1>
      </div>
      <div className={style.content}>
        <ul className={style.menuOptions}>
          {option === "JUGAR" ? (
            <>
              <li>
                <Link className={style.link} to="/setup">
                  NUEVA PARTIDA
                </Link>
              </li>
              <li>
                <button onClick={() => handleOption(null)}>VOLVER</button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={() => handleOption("JUGAR")}>JUGAR</button>
            </li>
          )}
        </ul>
      </div>
      <div className={style.footer}></div>
    </div>
  );
};

export default Menu;
