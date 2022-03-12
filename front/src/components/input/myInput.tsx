import { ChangeEvent, useState } from "react";
import { myInputPropType } from "../../types";
import { TextField } from "@mui/material";

function MyInput(props: {data: myInputPropType}) {
	const {name, callback, pattern, type, id} = props.data;
	
	const [isError, setIsError] = useState(false)

	const checkText = (e: ChangeEvent<HTMLInputElement>) => {
		if (pattern.test(e.target.value))
		{
			callback(e.target.value);
			setIsError(false);
		}
		else
		{
			callback("");
			setIsError(true);
		}
	}

	return(
		<>
			<TextField id={id} label={name} sx={{display:"flex"}} type={type}
			onChange={checkText} margin="normal" variant="standard" error={isError} />
		</>
	)
}

export default MyInput;