import { createSlice } from "@reduxjs/toolkit";

const argentinaSlice = createSlice({
  name: "argentina",
  initialState: [],
  reducers: {
    setDBArgentine(state, action) {
      return action.payload;
    },
    setCharactersCABA(state, action) {
      const { provAcronym, comunaId, role, character } = action.payload;

      const province = state[0].provinces.find(
        (p) => p.acronym === provAcronym
      );
      if (!province) return;

      const comuna = province.districts.find((d) => d.id === comunaId);
      if (!comuna) return;

      if (role === "CP") {
        comuna.juntaComunal.CP = character;
      } else if (role === "CM") {
        const exists = comuna.juntaComunal.CM.some(
          (c) => c.fullName === character.fullName
        );
        if (!exists) {
          comuna.juntaComunal.CM.push(character);
        }
      }
    },
  },
});

export const { setDBArgentine, setCharactersCABA } = argentinaSlice.actions;
export default argentinaSlice.reducer;
