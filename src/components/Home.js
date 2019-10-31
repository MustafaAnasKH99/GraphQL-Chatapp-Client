import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useSubscription, useQuery } from '@apollo/react-hooks';
import LOGGED_USER from '../Subscriptions/CurrentUser'
import USER from '../Queries/User'

import Chat from './Chat'
import { toast } from 'react-toastify';
import soundFile from '../assets/notification.mp3'

import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  })
);

const Home = ({ setTokenFromApp }) => {
    const audio = new Audio(soundFile)

    let _token = localStorage.getItem('token')
    const [ fetchedData, setFetchedData ] = useState(false)

    const classes = useStyles();

    const { data } = useQuery(USER,
        {
            onCompleted: () => {
                toast(`Hello ${data.fetchCurrentUser.name} 👾 `)
                audio.play()
            }
        }
    )

    const { loading, error } = useSubscription(
        LOGGED_USER,{
            onSubscriptionComplete: () => console.log('completed')
        }
    )

    if (error) console.log(error)
    if(data){
        if(!fetchedData){
            setFetchedData(true)
        }
    } 
    if(fetchedData === true){
        return ( 
            <div>
                <h1>We're honoured, {data.fetchCurrentUser.name}</h1>
                <Chat currentUser={data.fetchCurrentUser}/>
                <Button variant="contained" color="secondary" className={classes.button} onClick={() => {
                    localStorage.removeItem('token')
                    setTokenFromApp()
                }}>
                    Log Out
                </Button>
            </div>
         );
    } else {
        return <CircularProgress />
    }
}
 
export default Home;