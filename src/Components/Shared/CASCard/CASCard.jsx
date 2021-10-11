export const CASCard = (props) => {
	console.log(props);
	return (
		<li>
			<p>{props.author}</p>
			<p>{props.content}</p>
			<p>
				Лайки <span>{props.likes}</span> Дизлайки{""}
				<span>{props.dislikes}</span>
			</p>
			{props.children}
		</li>
	);
};
