import {Typography} from "@mui/material"
import {NavLink} from "react-router-dom";

function Error404(){
	return(
		<>
			<Typography variant="h1">Error404</Typography>
			<NavLink style={{textDecoration:"none"}} to={"/shop/1"}>Вернуться на главную</NavLink>
		</>
	)
}

export default Error404;