import React from 'react'
import { useQuery } from '@apollo/react-hooks';

import { CircularProgress } from '@material-ui/core'

import Message from './Message'

import chats from '../Queries/Chats'

import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({
    main: {
        // backgroundColor: "#464646",
        maxWidth: "400px",
        margin: "0 auto",
    }
  }));
  

const Chat = ({currentUser}) => {
    const { loading, data} = useQuery(chats)
    const classes = useStyles();

    if(loading){
        return (
            <CircularProgress />
        )
    } else {
        return (
            <div className={`${classes.main}`}>
                <Message currentUser={currentUser} chatId={data.fetchAllChats[0].id} />
            </div>
        )
    }
}
 
export default Chat;