import style from "./DistrictModal.module.css";
import { useEffect, useState } from "react";
import partyDB from "../../../public/partys.json";

const DistrictModal = ({ geo, onClose, db }) => {
  useEffect(() => {
    console.log("Comuna cargada:", db);
  }, [db]);

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
                    db?.juntaComunal.members[0].politicalAffiliation
                  ),
                }}
                onClick={() => setSelectedMember(db?.juntaComunal.members[0])}
              />
              <span
                className={style.memberJC}
                style={{
                  backgroundColor: getPartyColor(
                    db?.juntaComunal.members[1].politicalAffiliation
                  ),
                }}
                onClick={() => setSelectedMember(db?.juntaComunal.members[1])}
              />
            </div>
            <div className={style.tableCenter}>
              <div className={style.tableTop}>
                <span
                  className={style.presidentJC}
                  style={{
                    backgroundColor: getPartyColor(
                      db?.juntaComunal.presidentDistrict.politicalAffiliation
                    ),
                  }}
                  onClick={() =>
                    setSelectedMember(db?.juntaComunal.presidentDistrict)
                  }
                />
              </div>
              <div className={style.table}></div>
              <div className={style.tableBot}>
                <span
                  className={style.memberJC}
                  style={{
                    backgroundColor: getPartyColor(
                      db?.juntaComunal.members[2].politicalAffiliation
                    ),
                  }}
                  onClick={() => setSelectedMember(db?.juntaComunal.members[2])}
                />
                <span
                  className={style.memberJC}
                  style={{
                    backgroundColor: getPartyColor(
                      db?.juntaComunal.members[3].politicalAffiliation
                    ),
                  }}
                  onClick={() => setSelectedMember(db?.juntaComunal.members[3])}
                />
              </div>
            </div>
            <div className={style.tableRL}>
              <span
                className={style.memberJC}
                style={{
                  backgroundColor: getPartyColor(
                    db?.juntaComunal.members[4].politicalAffiliation
                  ),
                }}
                onClick={() => setSelectedMember(db?.juntaComunal.members[4])}
              />
              <span
                className={style.memberJC}
                style={{
                  backgroundColor: getPartyColor(
                    db?.juntaComunal.members[5].politicalAffiliation
                  ),
                }}
                onClick={() => setSelectedMember(db?.juntaComunal.members[5])}
              />
            </div>
          </div>
          {selectedMember ? (
            <div className={style.infoJC}>{selectedMember.name}</div>
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
