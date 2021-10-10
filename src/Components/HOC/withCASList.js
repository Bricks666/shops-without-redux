import { Component as ReactComponent } from "react";
import { Button } from "../Shared/Button/Button";
import { BottomWindow } from "../Shared/BottomWindow/BottomWindow";
import { CASList } from "../Shared/CASList/CASList";

export const withCASList = (CASCard) => {
	return (Component) => {
		return class ComponentWithCASList extends ReactComponent {
			constructor(props) {
				super(props);

				this.state = {
					showCAS: false,
				};

				this.toggleShowCAS = this.toggleShowCAS.bind(this);
			}
			toggleShowCAS() {

				this.setState({ showCAS: !this.state.showCAS });
			}

			render() {
				return (
					<Component {...this.props}>
						<Button onClick={this.toggleShowCAS}>Показать отзывы</Button>
						{this.props.children}
						<BottomWindow condition={this.state.showCAS}>
							<CASList shopAddress={this.props.address} CASCard={CASCard} />
						</BottomWindow>
					</Component>
				);
			}
		};
	};
};
