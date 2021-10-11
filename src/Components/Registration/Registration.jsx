import { Component } from "react";
import { Link } from "react-router-dom";
import { api } from "../../API/api";
import { Button } from "../Shared/Button/Button";
import { Field } from "../Shared/Field/Field";

export class Registration extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			login: "",
			password: "",
		};

		this.inputFio = this.inputFio.bind(this);
		this.inputLogin = this.inputLogin.bind(this);
		this.inputPassword = this.inputPassword.bind(this);
		this.registration = this.registration.bind(this);
	}

	inputFio(evt) {
		this.setState({ name: evt.target.value });
	}
	inputLogin(evt) {
		this.setState({ login: evt.target.value });
	}
	inputPassword(evt) {
		this.setState({ password: evt.target.value });
	}

	async registration(evt) {
		evt.preventDefault();

		const response = await api.registration(
			this.state.name,
			this.state.login,
			this.state.password
		);

		this.setState({ name: "", login: "", password: "" });

		console.log(response);

		this.props.setRegistration(true);
	}

	render() {
		return (
			<>
				<form onSubmit={this.registration}>
					<Field value={this.state.name} required input={this.inputFio}>
						Ваш ФИО
					</Field>
					<Field value={this.state.login} required input={this.inputLogin}>
						Ваш логин
					</Field>
					<Field
						value={this.state.password}
						required
						type="password"
						input={this.inputPassword}
					>
						Ваш пароль
					</Field>
					<Button>Зарегистрироваться</Button>
				</form>
				<Link to="/login">Войти</Link>
			</>
		);
	}
}
