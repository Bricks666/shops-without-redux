import { Button } from "../Shared/Button/Button";

export const SpecialButtons = (props) => {
	return (
		<>
			{props.isUnlock ? (
				<Button className="lock-account-button" onClick={props.lockAccount}>
					Сменить кошелек
				</Button>
			) : (
				""
			)}
			{props.isGuest ? <Button onClick={props.guestExit}>Войти</Button> : ""}
		</>
	);
};
