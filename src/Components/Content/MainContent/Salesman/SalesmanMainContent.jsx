import { CASList } from "../../../Shared/CASList/CASList";
import { useUserContext } from "../../../../Hooks/useUserContext";
import { SalesmanCASCard } from "./Cards/SalesmanCASCard";

export const SalesmanMainContent = (props) => {
	const { address } = useUserContext();

	return (
		<section>
			<CASList CASCard={SalesmanCASCard} shopAddress={address} />
		</section>
	);
};
