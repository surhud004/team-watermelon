import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
	  flexGrow: 1,
	  maxWidth: 500,
	},
  })

export default function LoginRegisterModal(props) {
	const [loginActive, setLoginActive] = useState(true);
	const [userData, setUserData] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const classes = useStyles();
	  const [value, setValue] = React.useState(0);
	  const handleChange = (event, newValue) => {
		setValue(newValue);
	  };

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: ''
	});
	const { name, email, password } = formData;
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmitForm = async (e) => {
		e.preventDefault();
		loginRegister(name, email, password, loginActive);
	};

	const loginRegister = async (name, email, password, login) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const body = { name, email, password };
		try {
			const res = await axios.post(`/auth/${login ? 'login' : 'register'}`, body, config);
			setUserData(res.data);
			setFormData({
				name: '',
				email: '',
				password: ''
			});
			setDialogOpen(false);
		} catch (err) {
			const errors = err.response.data.errors;
			console.log(errors);
			setErrorMsg(errors[0].msg);
			setTimeout(() => {
				setErrorMsg('');
			}, 4000);
		}
	};
	const error = {
		color: 'red'
	};
	const active = {
		marginTop: '0',
		color: 'red',
		borderBottom: '2px solid black',
		borderRadius: '2px'
	};
	const inactive = {
		color: 'black',
		border: 'none'
	};
	const dialog = {
		padding: '10px 40px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	};
	const appBar = {
		marginBottom: '30px'
	};
	const formStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: '30px',
		width: '100%'
	};
	const hidden = {
		visibility: "hidden",
	};
	const textField = {
		width: '70%'
	};
	// console.log(userData);
	return (
		<div>
			<Button onClick={() => setDialogOpen(true)} {...props}>
				Login
			</Button>
			<Dialog style={dialog} open={dialogOpen}>
				{/* <div style={dialog}> */}
					<AppBar style={appBar} position="static" color="default">
						<Tabs value={value} indicatorColor="primary" textColor="primary" variant="fullWidth" onChange={handleChange}>
							<Tab
								// style={loginActive ? active : inactive}
								label="login"
								onClick={() => setLoginActive(true)}
								// variant="contained"
								// color="primary"
								
							>
								Login
							</Tab>
							<Tab
								// style={loginActive ? inactive : active}
								label="register"
								onClick={() => setLoginActive(false)}
								// variant="contained"
								// color="primary"
							>
								Register
							</Tab>
						</Tabs>
					</AppBar>
					<form style={formStyle}>
						<p style={error}>{errorMsg}</p>
						<TextField
							style={loginActive ? hidden : textField}
							id="standard-basic"
							label="Name"
							name="name"
							value={name}
							onChange={(e) => onChange(e)}
						/>
						<TextField
							style={textField}
							id="standard-basic"
							label="Email"
							name="email"
							value={email}
							onChange={(e) => onChange(e)}
						/>
						<TextField
							style={textField}
							id="standard-password-input"
							type="password"
							label="Password"
							name="password"
							value={password}
							onChange={(e) => onChange(e)}
						/>
					</form>
					<DialogActions>
						<Button fullWidth onClick={onSubmitForm} variant="contained" color="primary">
							{loginActive ? 'Login' : 'Register'}
						</Button>
						<Button fullWidth onClick={() => setDialogOpen(false)} color="primary">
							Cancel
						</Button>
					</DialogActions>
				{/* </div> */}
			</Dialog>
		</div>
	);
}
