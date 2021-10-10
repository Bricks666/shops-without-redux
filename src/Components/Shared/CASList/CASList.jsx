import { useCASList } from "../../../Hooks/useCASList";
import { List } from "../List/List";

export const CASList = (props) => {
	const [CAS] = useCASList(props.shopAddress);
	console.log("CAS", CAS);
	return (
		<List
			items={CAS}
			Card={props.CASCard}
			additionProps={{ shopAddress: props.shopAddress }}
		/>
	);
};
