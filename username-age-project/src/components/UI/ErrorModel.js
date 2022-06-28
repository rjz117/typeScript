import "./ErrorModel.css";
import Card from "./Card";
import Button from "./Button";

const ErrorModel = (props) => {

  return (
    <div>
      <div className="backdrop" onClick={props.setError}/>
      <Card className="modal">
        <header className="header">
          <h2>{props.title}</h2>
        </header>
        <div className="content">
          <p>{props.message}</p>
        </div>
        <footer className="actions">
          <Button onClick={props.setError}>Okay</Button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModel;
