import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, Container, Button} from '@material-ui/core';
import NotiCard from './NotiCard';
import ShListsContext from '../state_management/ShListsContext';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(5),
        backgroundColor: theme.palette.background.default,
    },
    TopContent: {
        padding: theme.spacing(8, 0, 10),
    },
    typoHeading: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(4)
    }
}));

export default function NotificationsList() {
    const classes = useStyles();
    const shListsContext = useContext(ShListsContext);
    const [notiData, setNotiData] = useState({notifications:[]});

    const getNotifications = async () => {
        console.log("get n");
		try {
            const promise = await axios.get('/notifications');
            setNotiData({notifications:promise.data.notifications});
		} catch (error) {
			alert('notification loading failed');
		}
	};
    
    useEffect(() => {
        getNotifications();
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className={classes.root}>
            <Container maxWidth="md" component="main">
                <Typography variant="h5"  color="textPrimary" component="p" style={{fontWeight: 'bold'}}>
                Notifications:
                </Typography>
                <br/>
                <Grid container spacing={1} alignItems="center">
                    {notiData.notifications.map((n) => (
                        <Grid item key={n._id} sm={12}>
                        <NotiCard 
                            notification={n} 
                        />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </section>
        );
}