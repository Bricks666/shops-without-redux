import { useCASAssessment } from "../../Hooks/useCASAssessment";
import { Button } from "../Shared/Button/Button";
import { useUserContext } from "../../Hooks/useUserContext";

export const withCASAssessment = (Component) => {
	return (props) => {
		const [like, dislike] = useCASAssessment(props.shopAddress, props.id);

		const { address } = useUserContext();

		return (
			<Component {...props}>
				<Button onClick={like} disabled={props.users.includes(address)}>
					Поставить лайк
				</Button>
				<Button onClick={dislike} disabled={props.users.includes(address)}>
					Поставить дизлайк
				</Button>
				{props.children}
			</Component>
		);
	};
};
