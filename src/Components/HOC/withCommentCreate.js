import { Component as ReactComponent, useState } from "react";
import { Button } from "../Shared/Button/Button";
import { ModalWindow } from "../Shared/ModalWindow/ModalWindow";
import { useCreateComment } from "../../Hooks/useCreateComment";
import { Field } from "../Shared/Field/Field";

const CreateComment = (props) => {
	const [createComment] = useCreateComment(props.shopAddress, props.CASId);
	const [comment, setComment] = useState("");

	const sendComment = (evt) => {
		evt.preventDefault();

		createComment(comment);
		setComment("");
	};

	return (
		<form onSubmit={sendComment}>
			<Field
				value={comment}
				input={(evt) => setComment(evt.target.value)}
				required
			>
				Выш комментарий
			</Field>
			<Button disabled={comment === ""}>Отправить комментарий</Button>
		</form>
	);
};

export const withCommentCreate = (Component) => {
	return class ComponentWithCommentCreate extends ReactComponent {
		constructor(props) {
			super(props);

			this.state = {
				showCommentCreate: false,
			};

			this.toggleShowCommentCreate = this.toggleShowCommentCreate.bind(this);
		}

		toggleShowCommentCreate() {
			this.setState({ showCommentCreate: !this.state.showCommentCreate });
		}

		render() {

			return (
				<Component {...this.props}>
					<Button onClick={this.toggleShowCommentCreate}>
						Написать Комментарий
					</Button>
					{this.props.children}
					<ModalWindow
						condition={this.state.showCommentCreate}
						close={this.toggleShowCommentCreate}
					>
						<CreateComment
							shopAddress={this.props.shopAddress}
							CASId={this.props.id}
						/>
					</ModalWindow>
				</Component>
			);
		}
	};
};
