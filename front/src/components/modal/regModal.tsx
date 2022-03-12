import { useEffect, useState} from "react";
import MyInput from "../input/myInput";
import { fullUserType, myInputPropType } from "../../types";
import { userAPI } from "../../store/APIs/userAPI";
import { changeToken, toggleShwoModal } from "../../store/slicers/tokenSlicer";
import { useDispatch,  useSelector} from "react-redux";
import { RootState} from "../../store/store";
import MyAlert from "../alert/myAlert"
import {Dialog, DialogTitle, DialogContent,
	 DialogActions, Button} from "@mui/material"



function RegModal () {
	const {showModal}= useSelector((state: RootState)=> state.tokenReducer);	
	const dispatch = useDispatch();
	const [isReg, setIsReg] = useState(false);
	const [loginValue, setloginValue] = useState("");
	const [emailValue, setEmailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [errorMessadge, setErrorMessadge] = useState("");
	const [showAlert, setShowAlert] = useState(true);
	const [isValid, setIsValid] = useState(false);

	const [tryRegistration, {isError: isRegError}] = userAPI.useRegisterNewUserMutation();
	const [logIn, {isError: isLogError}] = userAPI.useLogInUserMutation();

	const acceptButton = isReg ? "Зарегистрироваться" : "Войти"
	const changeMenuButton = isReg ? "Войти" : "Зарегистрироваться"

	useEffect(() => {
		if ((loginValue !== "" || !isReg) && emailValue !== "" && passwordValue !== "")
		{
			setIsValid(true);
		}
		else
		{
			setIsValid(false);
		}
	}, [loginValue, emailValue, passwordValue, isReg])

	const toggleReg = () =>{
		setIsReg(!isReg);
	}

	const inputsArr : myInputPropType[] = [{
			name: "Логин",
			callback: setloginValue, 
			pattern: /^[a-zA-Z1-9]{3,20}$/,
			type:"text",
			id:"modalName"
		},
		{
			name: "Почта",
			callback: setEmailValue, 
			pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
			type:"text",
			id:"modalEmail"
		},
		{
			name: "Пароль",
			callback: setPasswordValue, 
			pattern: /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/,
			type:"password",
			id:"modalPassword"
		}];

	const content = inputsArr.map(el => {
		if ((isReg && el.id === "modalName") || (el.id !== "modalName")) {
			return <MyInput key={el.name} data={el} />
		}
		return null
	})

	const logInOrSingIn = async () => {
			setShowAlert(true)
			const result = isReg ?
			await tryRegistration({login: loginValue, password: passwordValue, email: emailValue}):
			await logIn({password: passwordValue, email: emailValue});
			if(result.hasOwnProperty("data"))
			{
				const {data} = result as {data: {user: fullUserType, token: string}}
				localStorage.setItem("token", data.token)
				dispatch(changeToken(data.token))
				dispatch(toggleShwoModal())
			}else
			{
				const {error} = result as {error: any};
				setErrorMessadge(error.data.message);
			}
	}


	return (
		<>
			<Dialog open={showModal} fullWidth maxWidth="sm" onClose={() => dispatch(toggleShwoModal())}>
				<DialogTitle sx={{textAlign:"center"}}>{acceptButton}</DialogTitle>
				<DialogContent sx={{flexDirection:"column"}}>
					{content}
				</DialogContent>
				<DialogActions sx={{justifyContent: "space-between"}}>
					<Button onClick={toggleReg}>{changeMenuButton }</Button>
					<Button disabled={!isValid} onClick={logInOrSingIn}>{acceptButton}</Button>
				</DialogActions>
			</Dialog>
			<MyAlert errorMessadge={errorMessadge} showAlert={(isRegError || isLogError) && showAlert}
			 toggleShowAlert={()=>{setShowAlert(false)}} />
		</>
	)
}

export default RegModal;