import { NavLink } from "react-router-dom";

export const Navigation = (props) => {
	return (
		<ul>
			<li>
				<NavLink to="/admin/adminRequests">
					Запросы на повышение до администратора
				</NavLink>
			</li>
			<li>
				<NavLink to="/admin/salesmanRequests">
					Запросы на повышение до продавца
				</NavLink>
			</li>
			<li>
				<NavLink to="/admin/buyerRequests">
					Запросы на понижение до покупателя
				</NavLink>
			</li>
			<li>
				<NavLink to="/admin/shops">Все магазины</NavLink>
			</li>
			<li>
				<NavLink to="/admin/users">Все пользователи</NavLink>
			</li>
		</ul>
	);
};
