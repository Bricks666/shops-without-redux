import { useCommentAssessment } from "../../Hooks/useCommentAssessment";
import { Button } from "../Shared/Button/Button";
import { useUserContext } from "../../Hooks/useUserContext";

export const withCommentAssessment = (Component) => {
	return (props) => {
		const [like, dislike] = useCommentAssessment(
			props.shopAddress,
			props.CASId,
			props.id
		);
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
