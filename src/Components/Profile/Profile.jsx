import { useProfile } from "../../Hooks/useProfile";
import { Buttons } from "./Buttons/Buttons";
import { getStringRole } from "../../Services/getStringRole";

const parseProfileInfo = (profileInfo) => {
	return Object.entries(profileInfo)
		.filter((pair) => pair[0] !== "isAdmin" && pair[0] !== "isSalesman")
		.map((pair) => {
			return (
				<>
					<dt key={pair[0]}>{pair[0]}</dt>{" "}
					<dd key={pair[1]}>
						{pair[0] === "role" ? getStringRole(pair[1]) : pair[1]}
					</dd>
				</>
			);
		});
};

export const Profile = (props) => {
	const [profileInfo] = useProfile(props.throwUser);
	console.log(profileInfo);
	return (
		<div>
			<dl>{parseProfileInfo(profileInfo)}</dl>
			<Buttons
				isAdmin={profileInfo.isAdmin}
				isSalesman={profileInfo.isSalesman}
				role={profileInfo.role}
			/>
		</div>
	);
};
