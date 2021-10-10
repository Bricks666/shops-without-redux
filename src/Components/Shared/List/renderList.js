export const renderList = (items, Component, otherProps = {}) => {
	return items.map((item) => {
		return <Component {...item} key={item.id} {...otherProps} />;
	});
};
