export const CommentCard = (props) => {
	return (
		<li>
			<h5>{props.author}</h5>
			<p>{props.content}</p>
			<p>
				Лайки <span>{props.likes}</span> Дизлайк <span>{props.dislikes}</span>
			</p>
			{props.children}
		</li>
	);
};
