import React,{useContext} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../state_management/AuthContext';

const useStyles = makeStyles((theme) => ({
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    margin:{
        margin: theme.spacing(1),
    }
  }));



const Navbar = ()=>{
    const classes = useStyles();
    const authContext = useContext(AuthContext);

    return(
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <IconButton component={RouterLink}
                to="/home" 
                color="primary" 
                aria-label="home" 
                className={classes.margin}>
                <LocalMallIcon fontSize="large"/>
            </IconButton>
                BigDeal 
            </Typography>
            <Link variant="button" 
                component={RouterLink} 
                to="/main"
                color="textPrimary" 
                className={classes.link}>
                Shopping Lists
            </Link>
            <Link component={RouterLink}
                to="#" 
                variant="button" 
                color="textPrimary" 
                className={classes.link}>
                Friends
            </Link>
            <Link component={RouterLink}
                to="#" 
                variant="button" 
                color="textPrimary" 
                className={classes.link}>
                Notifications
            </Link>
            {authContext.isAuthenticated?
            <Button onClick={()=>authContext.handleLogout({})} 
                color="primary" 
                variant="outlined" 
                className={classes.link}
                >
                Logout
            </Button>: ""}
            
            </Toolbar>
        </AppBar>
    )


}


export default Navbar;