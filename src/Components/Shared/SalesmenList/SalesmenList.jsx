import { useSalesmenList } from "../../../Hooks/useSalesmenList";
import { List } from "../List/List";

export const SalesmenList = (props) => {
	const [salesmen] = useSalesmenList(props.salesmenAddresses);

	return (
		<div>
			<h4>Продавцы</h4>
			<List
				items={salesmen}
				Card={props.SalesmanCard}
				additionProps={{ shopAddress: props.shopAddress }}
			/>
		</div>
	);
};
