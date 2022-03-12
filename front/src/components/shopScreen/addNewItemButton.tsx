import {Button} from "@mui/material"
import { useState } from "react";
import ReactDOM from 'react-dom';
import AddItemModal from "../modal/addItemModal";



function AddNewItemButton(){
	const parent = document.getElementById("portal") as HTMLElement;
	const [showModal, setShowModal] = useState(false);

	const toggleShowModal = () => {
		setShowModal(!showModal)
	}

	return(<>
		<Button 
			variant="outlined" size="large" sx={{color: "#7ca1da", borderColor: "#6385ba", mb: "2vh"}}
			onClick = {toggleShowModal} >
			Добавить новый товар
		</Button>
		{showModal && ReactDOM.createPortal(
						<AddItemModal showModal={showModal} toggleShowModal={toggleShowModal} />
						, parent) }
	</>)

}

export default AddNewItemButton;