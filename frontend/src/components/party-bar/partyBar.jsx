import style from "./partyBar.module.css";

import LLA from "../../assets/La-Libertad-Avanza.png";
import PJ from "../../assets/Partido-Justicialista.png";
import UCR from "../../assets/Union-Civica-Radical.png";
import CCARI from "../../assets/Coalicion-Civica-ARI.png";
import PRO from "../../assets/Propuesta-Republicana.png";

import { useSelector } from "react-redux";
import { Modal } from "../ui";
import { useState } from "react";
import IdeologySpectrumBar from "../ideology-spectrum-bar/ideologySpectrumBar";

const PartyBar = ({ DataBase }) => {
  const partyPlayer = useSelector((state) => state.game.playerParty);
  const ideologies = useSelector((state) => state.ideologies);

  const logos = {
    "Partido Justicialista": PJ,
    "La Libertad Avanza": LLA,
    "Union Civica Radical": UCR,
    "Coalicion Civica ARI": CCARI,
    "Propuesta Republicana": PRO,
  };

  const logoSrc = logos[partyPlayer];
  const [modalOpen, setModalOpen] = useState(false);

  const getValue = (section, ideology) => {
    const types = ideologies[section]?.types;

    if (!types) return null;

    for (const item of types) {
      if (item.name === ideology) {
        return item.value ?? null;
      }

      if (item.posture && item.posture[ideology] !== undefined) {
        return item.posture[ideology];
      }
    }

    return null;
  };
  console.log(getValue("social", DataBase?.ideology.social));

  return (
    <div className={style.partyBar}>
      <div className={style.imgParty}>
        {partyPlayer && (
          <img
            src={logoSrc}
            alt={`logo${partyPlayer}`}
            className={style.logo}
          />
        )}
      </div>
      <p className={style.nameParty}>{partyPlayer}</p>
      <button className={style.button} onClick={() => setModalOpen(true)}>
        +
      </button>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        menuTitle={"PARTY MENU"}
      >
        <div className={style.partyMenu}>
          <div className={style.ideologyDisplay}>
            <div className={style.ideologySection}>
              <p>Ideologia Economica</p>
              <IdeologySpectrumBar
                indicators={[getValue("economic", DataBase?.ideology.economic)]}
                division={10}
              />
            </div>
            <div className={style.ideologySection}>
              <p>Ideologia Social</p>
              <IdeologySpectrumBar
                indicators={[getValue("social", DataBase?.ideology.social)]}
                division={10}
              />
            </div>
            <div className={style.ideologySection}>
              <p>Ideologia Politica</p>
              <IdeologySpectrumBar
                indicators={[
                  getValue("political", DataBase?.ideology.political),
                ]}
                division={10}
              />
            </div>
            <div className={style.ideologySection}>
              <p>Espectro Ideologico</p>
              <IdeologySpectrumBar
                gradientType="redToBlue"
                indicators={[
                  (getValue("economic", DataBase?.ideology.economic) +
                    getValue("political", DataBase?.ideology.political) +
                    getValue("social", DataBase?.ideology.social)) /
                    3,
                ]}
                division={10}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PartyBar;
