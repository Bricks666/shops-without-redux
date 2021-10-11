import { Button } from "../Button/Button";
import { BottomWindow } from "../BottomWindow/BottomWindow";
import { useState } from "react";
import { SalesmenList } from "../SalesmenList/SalesmenList";

export const ShopCard = (props) => {
	const [condition, setCondition] = useState(false);
	console.log(props);
	return (
		<li>
			<h4>{props.address}</h4>
			<p>{props.city}</p>
			<Button onClick={() => setCondition(!condition)}>
				Показать продавцов
			</Button>
			{props.children}
			<BottomWindow condition={condition}>
				<SalesmenList
					salesmenAddresses={props.salesmen}
					shopAddress={props.address}
					SalesmanCard={props.SalesmanCard}
				/>
			</BottomWindow>
		</li>
	);
};
