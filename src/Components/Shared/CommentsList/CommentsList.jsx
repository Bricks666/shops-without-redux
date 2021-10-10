import { useComments } from "../../../Hooks/useComments";
import { List } from "../List/List";

export const CommentsList = (props) => {
	const [comments] = useComments(props.shopAddress, props.CASId);

	return (
		<List
			items={comments}
			Card={props.CommentCard}
			additionProps={{ shopAddress: props.shopAddress, CASId: props.CASId }}
		/>
	);
};
