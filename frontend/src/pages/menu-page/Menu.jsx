import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <h1>estamos en el MENU</h1>
      <button>
        <Link to="/game">JUGAR</Link>
      </button>
    </>
  );
};

export default Menu;
