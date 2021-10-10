import { renderList } from "./renderList";

export const List = (props) => {
	return <ul>{renderList(props.items, props.Card, props.additionProps)}</ul>;
};
