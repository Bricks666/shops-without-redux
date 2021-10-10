export const Field = (props) => {
	return (
		<label>
			{props.children}
			<input
				value={props.value}
				onChange={props.input}
				type={props.type}
				placeholder={props.placeholder ?? ""}
				max={props.max}
				min={props.min}
				step={props.step}
			/>
		</label>
	);
};
