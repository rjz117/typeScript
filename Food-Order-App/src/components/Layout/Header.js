import mealImg from "../../assets/meals.jpg";
import "./Header.css";
import HeaderCartButton from "./HeaderCartButton";
import { Fragment } from "react";

const Header = (props) => {
  return (
      <Fragment>
      <header className="header">
        <h1>Meal</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className="main-image">
        <img src={mealImg} alt="none" />
      </div>
    </Fragment>
  );
};

export default Header;
