import { Component } from "react";
import { Link } from "react-router-dom";
import { api } from "../../API/api";
import { Button } from "../Shared/Button/Button";
import { Field } from "../Shared/Field/Field";

export class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login: "",
			password: "",
		};

		this.inputLogin = this.inputLogin.bind(this);
		this.inputPassword = this.inputPassword.bind(this);
		this.login = this.login.bind(this);
	}

	inputLogin(evt) {
		this.setState({ login: evt.target.value });
	}

	inputPassword(evt) {
		this.setState({ password: evt.target.value });
	}

	async login(evt) {
		try {
			evt.preventDefault();

			const response = await api.login(this.state.login, this.state.password);

			this.setState({ login: "", password: "" });

			this.props.setLogin(response);
		} catch (e) {
			console.log(e.message);
		}
	}

	render() {
		return (
			<>
				<form onSubmit={this.login}>
					<Field value={this.state.login} input={this.inputLogin} required>
						Логин
					</Field>
					<Field
						value={this.state.password}
						input={this.inputPassword}
						type="password"
						required
					>
						Пароль
					</Field>
					<Button>Войти</Button>
				</form>
				<Link to="/registration">Зарегистрироваться</Link>
			</>
		);
	}
}
