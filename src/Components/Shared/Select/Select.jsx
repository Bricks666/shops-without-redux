const renderOption = (names, values) => {
	return values.map((value, index) => {
		return (
			<option key={value} value={value}>
				{names[index]}
			</option>
		);
	});
};

export const Select = (props) => {
	return (
		<label>
			{props.children}
			<select
				required={props.required}
				value={props.value}
				onChange={props.input}
			>
				{renderOption(props.names, props.values)}
			</select>
		</label>
	);
};
