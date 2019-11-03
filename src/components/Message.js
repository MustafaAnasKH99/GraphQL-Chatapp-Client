import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import { List, ListItem, ListItemText, Paper } from '@material-ui/core'

import CreateMessage from './CreateMessage'
import MESSAGES from '../Queries/Messages'

import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      color: 'black',
    },

    listName: {
        backgroundColor: '#c51162;'
    },

    paper: {
        maxHeight: 400,
        height: '100%',
        width: '100%',
        maxWidth: 600,
        overflow: 'auto'
    },

    hideScrollBar: {
        overflow: 'hidden',
        height: '100%',
        width: '100%'
    }
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
        <div>
            <Paper className={classes.hideScrollBar}>
                <List className={classes.root && classes.paper} >
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
                <CreateMessage chatId={chatId} refetch={refetch} className={classes.root} />
            </Paper>
        </div>
     );
}
 
export default Message;