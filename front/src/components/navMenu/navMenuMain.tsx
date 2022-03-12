import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import Links from "./links";
import {NavLink} from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { RootState} from "../../store/store";
import { changeToken, toggleShwoModal } from "../../store/slicers/tokenSlicer";
import RegModal from '../modal/regModal';
import { userAPI } from '../../store/APIs/userAPI';
import {AppBar,Box, Toolbar, IconButton, Typography,
	Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';



function NavMenu() {
	const {token, showModal}= useSelector((state: RootState)=> state.tokenReducer);	
	const dispatch = useDispatch();
	const {data: user, isLoading, refetch, isError} = userAPI.useCheckTokenQuery(token as string);
	
	const parent = document.getElementById("portal") as HTMLElement

	const logOut = () => {
		dispatch(changeToken(null))
		localStorage.removeItem("token");
		refetch();
	}

	useEffect(() => {
		if (!user && !isLoading)
		{
			logOut();
		}
	}, [user]);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

	return(
		<>
			<AppBar position="static" sx={{backgroundColor: "#505A66"}}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<NavLink style={{textDecoration: "none", color: "#FFFAE5"}} to={"/"}><Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
						>
						DESZCOM
						</Typography></NavLink>
			
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
								display: { xs: 'block', md: 'none' },
								}}
							>
								<Links color="#505A66" close={handleCloseNavMenu}/>
							</Menu>
						</Box>

						<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: {xs: 1, md: 0}, display: { xs: 'flex', md: 'none' } }}>
							<NavLink style={{textDecoration: "none", color: "#FFFAE5"}} to={"/"}>
							DESZCOM
							</NavLink>
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							<Links color="#FFFae5" close={()=>{}}/>
						</Box>
		
						<Box sx={{ flexGrow: 0, display : "flex" }}>
						{user && !isError &&
							<>
							<Typography variant="h6" sx={{ mr: "1vw", alignItems: "center",
							 display: { xs: 'none', sm: 'flex' }, color: "#FFFAE5", cursor: "default"}}
							>{user.login}</Typography>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt={user.login}/>
								</IconButton>
							</Tooltip>
							</>
						}
						{isError && <Button sx={{color: "#FFFAE5"}} variant='text' onClick={() => dispatch(toggleShwoModal())}>Войти</Button>}	
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem onClick={() => {handleCloseUserMenu(); logOut()}} >
									<Typography sx={{color: "#505A66"}} variant="body2">	
										Выйти
									</Typography>	
								</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
		</AppBar>
		{showModal && ReactDOM.createPortal(
						<RegModal/>
						, parent) }
	  </>
	)
}

export default NavMenu;