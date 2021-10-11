import { useState } from "react";
import { Button } from "../../../Shared/Button/Button";
import { ModalWindow } from "../../../Shared/ModalWindow/ModalWindow";
import { Field } from "../../../Shared/Field/Field";
import { Select } from "../../../Shared/Select/Select";
import { useFreeAddresses } from "../../../../Hooks/useFreeAddresses";
import { useAddShop } from "../../../../Hooks/useAddShop";

const CreateFrom = (props) => {
	const [freeAddresses] = useFreeAddresses();
	const names = freeAddresses.map(Object.values);
	const values = freeAddresses.map(Object.keys);
	const [address, setAddress] = useState("0");
	const [city, setCity] = useState("");
	const [name, setName] = useState("");
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [addShop] = useAddShop();
	console.log(address, "asdasdasd");
	const onSubmit = (evt) => {
		evt.preventDefault();

		addShop(address, name, city, login, password);
		setName("");
		setAddress("");
		setCity("");
		setLogin("");
		setPassword("");
	};

	return (
		<form onSubmit={onSubmit}>
			<Select
				value={address}
				input={(evt) => {

					setAddress(evt.target.value);
				}}
				required
				names={names}
				values={values}
			>
				Свободные адреса
			</Select>
			<Field required value={name} input={(evt) => setName(evt.target.value)}>
				Название магазина
			</Field>
			<Field required value={city} input={(evt) => setCity(evt.target.value)}>
				Город расположения
			</Field>
			<Field required value={login} input={(evt) => setLogin(evt.target.value)}>
				Логин для магазина
			</Field>
			<Field
				required
				value={password}
				input={(evt) => setPassword(evt.target.value)}
				type="password"
			>
				Пароль магазина
			</Field>
			<Button>Создать магазин</Button>
		</form>
	);
};

export const CreateNewShop = (props) => {
	const [showCreateForm, setShow] = useState(false);

	return (
		<div>
			<Button onClick={() => setShow(!showCreateForm)}>
				Создать новый магазин
			</Button>
			<ModalWindow
				condition={showCreateForm}
				close={() => setShow(!showCreateForm)}
			>
				<CreateFrom />
			</ModalWindow>
		</div>
	);
};
