import {Typography, Container} from "@mui/material"
import {NavLink} from "react-router-dom";

function Error404(){
	return(
		<>
			<Container style={{justifyContent: "center"}}>
				<Typography style={{textAlign:"center"}} variant="h1">Error 404</Typography>
				<NavLink style={{textDecoration:"none", textAlign:"center", display: "inherit"}} to={"/shop/1"}>Вернуться на главную</NavLink>
			</Container>
		</>
	)
}

export default Error404;