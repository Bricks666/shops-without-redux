import { BeBuyer } from "./BeBuyer";
import { BeSalesman } from "./BeSalesman";
import { BeAdmin } from "./BeAdmin";
import { BeBuyerForever } from "./BeBuyerForever";
import { BeAdminForever } from "./BeAdminForever";

export const Buttons = (props) => {
	return props.isSalesman || props.isAdmin ? (
		<div>
			<BeBuyer role={props.role} />
			{props.isSalesman ? (
				<>
					<BeSalesman role={props.role} />
					<BeBuyerForever />{" "}
				</>
			) : (
				""
			)}
			{props.isAdmin ? <BeAdmin role={props.role} /> : ""}
		</div>
	) : [4, 5, 6].includes(props.role) === false ? (
		<BeAdminForever />
	) : (
		""
	);
};
