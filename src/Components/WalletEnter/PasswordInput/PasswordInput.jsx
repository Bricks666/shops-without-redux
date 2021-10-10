import { useState } from "react";
import { Field } from "../../Shared/Field/Field";

export const PasswordInput = (props) => {
	const [value, setValue] = useState("");

	return (
		<Field
			value={value}
			input={(evt) => setValue(evt.target.value)}
			type="password"
		>
			Пароль от кошелька
		</Field>
	);
};
