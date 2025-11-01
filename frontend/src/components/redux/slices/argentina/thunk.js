import { setCharactersCABA } from "./argentinaSlice";

export const getCharactersCABA = (characters) => (dispatch, getState) => {
  const state = getState();
  const argentina = state.argentina;

  const caba = argentina?.[0]?.provinces?.find((p) => p.acronym === "CABA");
  if (!caba) return;

  caba.districts.forEach((d) => {
    const comunaId = d.id;

    const cpTag = `CP${comunaId}`;
    const cmTag = `CM${comunaId}`;

    const cp = characters.find((c) => c.position === cpTag);
    if (cp) {
      dispatch(
        setCharactersCABA({
          provAcronym: "CABA",
          comunaId,
          role: "CP",
          character: cp,
        })
      );
    }

    const cm = characters.filter((c) => c.position === cmTag);
    cm.forEach((m) => {
      dispatch(
        setCharactersCABA({
          provAcronym: "CABA",
          comunaId,
          role: "CM",
          character: m,
        })
      );
    });
  });
};
