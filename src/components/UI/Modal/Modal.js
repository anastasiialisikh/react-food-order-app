import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onClick}></div>;
}

const Modal = (props) => {
	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onClick={props.onBackdropClick}></Backdrop>
				, document.getElementById('backdrop-root'))}
			{ReactDOM.createPortal(
				<div className={classes.modal}>{props.children}</div>
				, document.getElementById('overlay-root'))}
		</>
	);
}

export default Modal;