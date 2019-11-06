import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core'
import { List, ListItem, ListItemText, Paper } from '@material-ui/core'

import CreateMessage from './CreateMessage'
import MESSAGES from '../Queries/Messages'

import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: "#464646",
      color: 'red',
      fontWeight: "Bold",
      color: "#d1d1d1",
      borderRadius: 25,
    },

    main: {
        backgroundColor: "#464646",
        maxWidth: "400px",
        margin: "0 auto",
        maxHeight: "750px",
        boxSizing: "border-box",
        padding: 5,
        borderRadius: 25,
    },

    paper: {
        maxHeight: 400,
        height: '100%',
        width: '100%',
        maxWidth: 600,
        overflow: 'auto',
        backgroundColor: "#464646",
    },
}));

const Message = ({ currentUser, chatId }) => {

    const { loading, error, data, refetch } = useQuery(MESSAGES,{
        variables: { chatId },
        onCompleted: () => toast(`Messages loaded 🚀`)
    });
    
    const classes = useStyles();

    if (loading) return <CircularProgress />;
    if (error) return `Error! ${error.message}`;


    return ( 
        <div className={classes.main}>
            <Paper className={classes.root}>
                <List className={`${classes.root} ${classes.paper} ${classes.main}`} >
                    {
                        data.fetchMessagesByChatId.map((e) => {
                            return (
                                <ListItem key={e.id}>
                                {currentUser.id === e.ownerId.id ? <ListItemText classes={classes.listName} primary={e.content} secondary={"YOU"} /> : <ListItemText primary={e.content} secondary={e.ownerId.name} /> }
                                </ListItem>
                            )
                        })
                    }
                </List>
                <CreateMessage currentUser={currentUser} chatId={chatId} refetch={refetch} className={classes.root} />
            </Paper>
        </div>
     );
}
 
export default Message;