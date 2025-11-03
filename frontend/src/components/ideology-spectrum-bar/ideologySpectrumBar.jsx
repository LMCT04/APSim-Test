import style from "./ideologySpectrumBar.module.css";

const IdeologySpectrumBar = ({ indicators = [], division, gradientType }) => {
  const sections = Array.from({ length: division }, (_, i) => i);
  const getGradient = (type) => {
    switch (type) {
      case "redToBlue":
        return "linear-gradient(to right, #8b0000, #ff0000, #ff9999, #ffffff, #0000ff, #00008b)";
      case "default":
      default:
        return "linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #ffffff, #90ee90, #008000)";
    }
  };

  return (
    <div className={style.barContainer}>
      <div
        className={style.spectrumBar}
        style={{ background: getGradient(gradientType) }}
      >
        {sections.map((index) => (
          <span
            key={index}
            id={`section-${index}`}
            className={style.section}
            style={{ width: `calc(${100 / division}%)` }}
          ></span>
        ))}
        {indicators?.map((value, i) =>
          value >= 0 && value <= 20 ? (
            <span
              key={`indicator-${i}`}
              className={style.indicator}
              style={{ left: `calc(${value * 5}% - 0.375rem)` }}
            ></span>
          ) : null
        )}
      </div>
    </div>
  );
};

export default IdeologySpectrumBar;
