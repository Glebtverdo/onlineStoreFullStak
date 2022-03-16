import { Box, Typography, IconButton, TextField, Tooltip } from "@mui/material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { ChangeEvent, useState } from "react";
import { itemsAPI } from "../../store/APIs/itemsAPI";
import MyAlert from "../alert/myAlert";
import {useSelector} from "react-redux";

import { RootState} from "../../store/store";

function EditableInput (props: { text: string, lable: string, style: {},
	 isAdmin: boolean, prefix: string, type: string, id:number}){
	const {text, lable, style, isAdmin, prefix, type, id} = props;
	const [showInput, setShowInput] = useState(false);
	const [inputValue, setInputValue] = useState(text);
	const [changeItem, {isLoading, isError}] = itemsAPI.useChangeItemMutation();
	const [errorMessadge, setErrorMessadge] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const {token}= useSelector((state: RootState)=> state.tokenReducer);

	const chekInputValue = (event: ChangeEvent<HTMLInputElement>) =>{
			if (type === "number")
			{
				let strToNum = parseInt(event.target.value);
				if((!isNaN(strToNum)))
				{
					if (strToNum < 0)
					{
						strToNum *= -1;
					}
					setInputValue(strToNum.toString())
				} else if(event.target.value === "")
				{
					setInputValue("")
				}
			}else{
				setInputValue(event.target.value)
			}
	}

	const sendData = async () => {
		if (inputValue !== text){
			const item = await changeItem({data: {id, [lable]: inputValue}, token: token as string}) as any;
			if (isError){
				setErrorMessadge(item.error);
				setShowAlert(true);
			}else{
				setShowInput(!showInput)
			}
		}
	}

	return(<>
	<Box mb={"3vh"} style={{display: "flex", flexWrap:"nowrap"}}>
		{!showInput && 
		<Typography variant="h1" style={{textAlign: "center"}} sx={{...style}}>
			{prefix}
			{text}
		</Typography>
		}
		{showInput && <>
			<Typography variant="h1" style={{textAlign: "center", marginRight: "1vw"}}
			 sx={{...style}}>
				{prefix} 
			</Typography>
			<TextField variant="outlined" style={{textAlign: "center", padding: "0px"}} sx={{...style}}
			value={inputValue} onChange={chekInputValue}/>
		</>
		}
		{ !showInput &&
		 isAdmin && 
		 <Tooltip title="Изменить" placement="bottom">
			<IconButton onClick={()=> {setShowInput(!showInput)}} style={{alignItems: "center"}}>
				<ModeEditOutlineOutlinedIcon fontSize={"inherit"}/>	
			</IconButton>
		</Tooltip>
		}
		{ showInput && <>
			<Tooltip title="Отменить" placement="bottom">
				<IconButton disabled={isLoading}
				onClick={()=> {setShowInput(!showInput)}} style={{alignItems: "center"}}>
					<CloseOutlinedIcon fontSize={"inherit"}/>
				</IconButton>
			</Tooltip>
			<Tooltip title="Сохранить" placement="bottom">
				<IconButton disabled={isLoading}
				onClick={sendData} style={{alignItems: "center"}}>
					<SaveOutlinedIcon fontSize={"inherit"}/>
				</IconButton>
			</Tooltip>
		</>}

	</Box> 
	<MyAlert errorMessadge={errorMessadge} showAlert={showAlert}
	toggleShowAlert={()=>{setShowAlert(false)}} />
</>)
}

export default EditableInput;