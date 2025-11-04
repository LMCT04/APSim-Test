export const advanceTime = (prev) => {
  const next = { ...prev, hour: prev.hour + 2, tick: prev.tick + 1 };

  if (next.hour >= 24) {
    next.hour %= 24;
    next.day += 1;
  }
  if (next.day > 30) {
    next.day = 1;
    next.month += 1;
  }
  if (next.month > 12) {
    next.month = 1;
    next.year += 1;
  }

  return next;
};

export const getTimeOfDay = (hour) =>
  hour < 6 ? "Madrugada" : hour < 12 ? "Mañana" : hour < 18 ? "Tarde" : "Noche";
