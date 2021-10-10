import { useState } from "react";
import { Component as ReactComponent } from "react/cjs/react.production.min";
import { useCreateCAS } from "../../Hooks/useCreateCAS";
import { Button } from "../Shared/Button/Button";
import { Field } from "../Shared/Field/Field";
import { ModalWindow } from "../Shared/ModalWindow/ModalWindow";

const CreateCAS = (props) => {
	const [comment, setComment] = useState("");
	const [mark, setMark] = useState(5);
	const [sendCAS] = useCreateCAS(props.shopAddress);

	const onSubmit = (evt) => {
		evt.preventDefault();

		sendCAS(comment, mark);
		setMark(5);
		setComment("");
	};

	return (
		<form onSubmit={onSubmit}>
			<Field
				value={comment}
				input={(evt) => setComment(evt.target.value)}
				required
			>
				Комментарий
			</Field>
			<Field
				type="range"
				value={mark}
				max={10}
				min={0}
				step={1}
				input={(evt) => setMark(evt.target.value)}
				required
			>
				Ваша оценка
			</Field>
			<Button disabled={comment === ""}>Отправить отзыв</Button>
		</form>
	);
};

export const withCreateCAS = (Component) => {
	return class ComponentWithCreateCAS extends ReactComponent {
		constructor(props) {
			super(props);

			this.state = {
				showCreateCAS: false,
			};
			this.toggleCreateCAS = this.toggleCreateCAS.bind(this);
		}

		toggleCreateCAS() {
			this.setState({ showCreateCAS: !this.state.showCreateCAS });
		}

		render() {
			return (
				<Component {...this.props}>
					<Button onClick={this.toggleCreateCAS}>Оставить отзыв</Button>
					{this.props.children}
					<ModalWindow
						condition={this.state.showCreateCAS}
						close={this.toggleCreateCAS}
					>
						<CreateCAS shopAddress={this.props.address} />
					</ModalWindow>
				</Component>
			);
		}
	};
};
