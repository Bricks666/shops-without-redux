import { useUserContext } from "../../../../Hooks/useUserContext";
import { Button } from "../../../Shared/Button/Button";
import { useSendedRequestBank } from "../../../../Hooks/useSendedRequestBank";

export const ShopMainContent = (props) => {
	const { haveBankMoney, id } = useUserContext();
	const [sentRequest] = useSendedRequestBank(id);
	return (
		<section>
			<Button disabled={haveBankMoney || sentRequest}>
				{haveBankMoney
					? "Мы не можем больше просить деньги"
					: sentRequest
					? "Мы уже отправили заявку"
					: "Отправить заявку на получение денег"}
			</Button>
		</section>
	);
};
