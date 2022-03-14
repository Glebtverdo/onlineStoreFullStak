import { useEffect, useState} from "react";
import MyInput from "../input/myInput";
import { myInputPropType } from "../../types";
import {useSelector} from "react-redux";
import { RootState} from "../../store/store";
import { itemsAPI } from "../../store/APIs/itemsAPI";
import {Dialog, DialogTitle, DialogContent,
	 DialogActions, Button} from "@mui/material"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import MyAlert from "../alert/myAlert";



function AddItemModal (props: {showModal: boolean, toggleShowModal: () => void}) {
	const {showModal, toggleShowModal} = props;
	const [nameValue, setNameValue] = useState("");
	const [priceValue, setPriceValue] = useState(0);
	const [restCountValue, setRestCountValue] = useState(0);
	const [imgFile, setImgFile] = useState<null | File>(null);
	const [isImgValid, setIsImgValid] = useState(false);
	const [showAlert, setShowAlert] = useState(false)
	const [errorMessadge, setErrorMessadge] = useState("");
	const [isValid, setIsValid] = useState(false);
	const {token}= useSelector((state: RootState)=> state.tokenReducer);
	const [newItem] = itemsAPI.useMakeNewItemMutation();

	useEffect(() => {
		if (nameValue !== "" && priceValue !== 0 && restCountValue !== 0 && imgFile)
		{
			setIsValid(true);
		}
		else
		{
			setIsValid(false);
		}
		if( imgFile)
		{
			setIsImgValid(true);
		}
		else
		{
			setIsImgValid(false);
		}
	}, [nameValue, priceValue, restCountValue,imgFile])

	const makeNewItem = async () => {
		if (token){
			const data = new FormData();
			data.append("name", nameValue);
			data.append("price", priceValue.toString())
			data.append("restCount", restCountValue.toString())
			data.append("img", imgFile as File)
			data.append("about", "")
			
			const item = await newItem({data, token});
			if(item.hasOwnProperty("error"))
			{
				const {error} = item as {error: any};	
				setErrorMessadge(error.data.message);
				setShowAlert(true)
			}
			else
			{
				toggleShowModal();
			}
		}
	}

	const inputsArr : myInputPropType[] = [{
			name: "Название",
			callback: setNameValue, 
			pattern: /^[a-zA-Z0-9!$()*+.<>?[\]^{|}` ]{3,20}$/,
			type:"text",
			id:"modalName"
		},
		{
			name: "Цена",
			callback:(value) => {
				let strToNum = parseInt(value);
				if(isNaN(strToNum)){
					strToNum = 0;
				}
				setPriceValue(strToNum)
			},
			pattern: /^\d+$/,
			type:"text",
			id:"modalPrice"
		},
		{
			name: "Кол-во на складе",
			callback: (value) => {
				let strToNum = parseInt(value);
				if(isNaN(strToNum)){
					strToNum = 0;
				}
				setRestCountValue(strToNum)
			}, 
			pattern: /^\d+$/,
			type:"text",
			id:"modalRestCount"
		}];

	const content = inputsArr.map(el => {
			return <MyInput key={el.name} data={el} />
	})

	return (
		<>
			<Dialog open={showModal} fullWidth maxWidth="sm" onClose={toggleShowModal}>
				<DialogTitle sx={{textAlign:"center"}}>Новый товар</DialogTitle>
				<DialogContent sx={{flexDirection:"column"}}>
					{content}
						<label htmlFor="inputImg">
							<input accept="image/*" id="inputImg" multiple type="file"
							onChange={(e) => {
								if(e.target !=null && e.target.files != null) {
								const file = e.target.files[0] ?? null
								setImgFile(file)}
							}}
							style={{display: "none"}}/>
							<Button variant="contained" component="span">
								Загрузить изображение
							</Button>
							{ isImgValid && <CheckCircleOutlineOutlinedIcon color={"success"}/>}
							{ !isImgValid && <ErrorOutlineOutlinedIcon color={"error"}/>}
						</label>
				</DialogContent>
				<DialogActions style={{justifyContent: "center"}}>
					<Button variant="contained" onClick={makeNewItem} 
					disabled={!isValid}>
						Создать товар
					</Button>
				</DialogActions>
			</Dialog>
			<MyAlert errorMessadge={errorMessadge} showAlert={showAlert}
			 toggleShowAlert={()=>{setShowAlert(false)}} />
		</>
	)
}

export default AddItemModal;