import { useCASList } from "../../../Hooks/useCASList";
import { List } from "../List/List";

export const CASList = (props) => {
	const [CAS] = useCASList(props.shopAddress);
	return (
		<>
			<h3>Отзывы</h3>
			<List
				items={CAS}
				Card={props.CASCard}
				additionProps={{ shopAddress: props.shopAddress }}
			/>
		</>
	);
};
