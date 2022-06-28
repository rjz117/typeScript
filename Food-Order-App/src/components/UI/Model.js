import "./Model.css";
import ReactDOM from "react-dom";

const BackDrop = (props) => {
  return <div className="backdrop" onClick={props.onClick}></div>;
};

const ModelOverLay = (props) => {
  return (
    <div className="modal">
      <div className="content" >{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Model = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onClick={props.onClick}/>, portalElement)}
      {ReactDOM.createPortal(
        <ModelOverLay>{props.children}</ModelOverLay>,
        portalElement
      )}
    </>
  );
};

export default Model;
