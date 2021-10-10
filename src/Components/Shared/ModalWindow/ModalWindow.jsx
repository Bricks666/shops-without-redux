import ModalWindowStyle from "./ModalWindow.module.css";

export const ModalWindow = (props) => {
	return props.condition ? (
		<div className={ModalWindowStyle.wrapper} onClick={props.close}>
			<button onClick={props.close}>Закрыть</button>
			<div
				className={ModalWindowStyle.inner}
				onClick={(evt) => evt.stopPropagation()}
			>
				{props.children}
			</div>
		</div>
	) : (
		""
	);
};
