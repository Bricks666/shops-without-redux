import { useContext } from "react";
import { useCASAssessment } from "../../Hooks/useCASAssessment";
import { Button } from "../Shared/Button/Button";
import { Context } from "../Content/Content";

export const withCASAssessment = (Component) => {
	return (props) => {
		const [like, dislike] = useCASAssessment(props.shopAddress, props.id);

		const { address } = useContext(Context);

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
