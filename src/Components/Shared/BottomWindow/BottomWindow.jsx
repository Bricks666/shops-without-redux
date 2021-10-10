export const BottomWindow = (props) => {
	console.log(props, "BOTTOM");
	return props.condition ? <div>{props.children}</div> : "";
};
