import style from "./DistrictModal.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const DistrictModal = ({ geo, onClose, db }) => {
  const partyDB = useSelector((state) => state.partys);

  const [selectedMember, setSelectedMember] = useState(null);

  const getPartyColor = (party) => {
    const partys = partyDB.find((p) => p.acronym === party);
    return partys?.partyColor || "#F0F0F0";
  };

  return (
    <div className={style.disModalContainer}>
      <button onClick={onClose} className={style.closeBtn}>
        X
      </button>
      <div className={style.headerDMC}>
        <p>Comuna {geo.properties.comuna || geo.properties.id}</p>
      </div>
      <div className={style.bodyDMC}>
        <div className={style.bodyJC}>
          <div className={style.tableJC}>
            <div className={style.tableRL}>
              <span
                className={style.memberJC}
                style={{
                  backgroundColor: getPartyColor(
                    db?.juntaComunal.CM[0].politicalAffiliation
                  ),
                }}
                onClick={() => setSelectedMember(db?.juntaComunal.CM[0])}
              />
              <span
                className={style.memberJC}
                style={{
                  backgroundColor: getPartyColor(
                    db?.juntaComunal.CM[1].politicalAffiliation
                  ),
                }}
                onClick={() => setSelectedMember(db?.juntaComunal.CM[1])}
              />
            </div>
            <div className={style.tableCenter}>
              <div className={style.tableTop}>
                <span
                  className={style.presidentJC}
                  style={{
                    backgroundColor: getPartyColor(
                      db?.juntaComunal.CP.politicalAffiliation
                    ),
                  }}
                  onClick={() => setSelectedMember(db?.juntaComunal.CP)}
                />
              </div>
              <div className={style.table}></div>
              <div className={style.tableBot}>
                <span
                  className={style.memberJC}
                  style={{
                    backgroundColor: getPartyColor(
                      db?.juntaComunal.CM[2].politicalAffiliation
                    ),
                  }}
                  onClick={() => setSelectedMember(db?.juntaComunal.CM[2])}
                />
                <span
                  className={style.memberJC}
                  style={{
                    backgroundColor: getPartyColor(
                      db?.juntaComunal.CM[3].politicalAffiliation
                    ),
                  }}
                  onClick={() => setSelectedMember(db?.juntaComunal.CM[3])}
                />
              </div>
            </div>
            <div className={style.tableRL}>
              <span
                className={style.memberJC}
                style={{
                  backgroundColor: getPartyColor(
                    db?.juntaComunal.CM[4].politicalAffiliation
                  ),
                }}
                onClick={() => setSelectedMember(db?.juntaComunal.CM[4])}
              />
              <span
                className={style.memberJC}
                style={{
                  backgroundColor: getPartyColor(
                    db?.juntaComunal.CM[5].politicalAffiliation
                  ),
                }}
                onClick={() => setSelectedMember(db?.juntaComunal.CM[5])}
              />
            </div>
          </div>
          {selectedMember ? (
            <div className={style.infoJC}>{selectedMember.fullName}</div>
          ) : (
            <p></p>
          )}
        </div>
        <div className={style.bodyActions}></div>
      </div>
    </div>
  );
};

export default DistrictModal;
