import { Button } from "../Button/Button";

export const RequestCard = (props) => {
	return (
		<li>
			<p>{props.id}</p>
			<p>{props.sender}</p>
			{props.children}
			<p>{props.isFinish ? "Запрос завершен" : "Запрос не завершен"}</p>
			{props.isFinish ? (
				""
			) : (
				<>
					<Button onClick={props.accept}>Принять</Button>
					<Button onClick={props.cancel}>Отклонить</Button>
				</>
			)}
		</li>
	);
};
