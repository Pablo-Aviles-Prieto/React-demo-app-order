import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = ({ onClick }) => {
  return <div onClick={onClick} className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalHTMLElement = document.getElementById('overlays');

export const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        portalHTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalHTMLElement
      )}
    </>
  );
};
