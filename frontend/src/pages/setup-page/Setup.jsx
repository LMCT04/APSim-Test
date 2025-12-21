import { GameInit } from "../../components";
import style from "./setup.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDBPartys } from "../../redux/slices/partys/partysSlice";
import { useNavigate } from "react-router-dom";

const Setup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // carga de datos para GameInit (partidos politicos default)
  useEffect(() => {
    fetch("/data/partys.json").then((res) =>
      res.json().then((partys) => {
        dispatch(setDBPartys(partys));
      })
    );
  }, [dispatch]);

  const handleConfirm = () => {
    navigate("/game");
  };

  return (
    <div className={style.setup}>
      <GameInit onConfirm={handleConfirm} />
    </div>
  );
};

export default Setup;
