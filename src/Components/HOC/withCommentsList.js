import { Component as ReactComponent } from "react";
import { BottomWindow } from "../Shared/BottomWindow/BottomWindow";
import { Button } from "../Shared/Button/Button";
import { CommentsList } from "../Shared/CommentsList/CommentsList";

export const withCommentsList = (CommentCard) => {
	return (Component) => {
		return class ComponentWithCommentList extends ReactComponent {
			constructor(props) {
				super(props);

				this.state = {
					showComments: false,
				};
				this.toggleShowComments = this.toggleShowComments.bind(this);
			}

			toggleShowComments() {
				this.setState({ showComments: !this.state.showComments });
			}

			render() {

				return (
					<Component {...this.props}>
						<Button onClick={this.toggleShowComments}>
							Показать комментарии
						</Button>
						{this.props.children}
						<BottomWindow condition={this.state.showComments}>
							<CommentsList
								shopAddress={this.props.shopAddress}
								CASId={this.props.id}
								CommentCard={CommentCard}
							/>
						</BottomWindow>
					</Component>
				);
			}
		};
	};
};
