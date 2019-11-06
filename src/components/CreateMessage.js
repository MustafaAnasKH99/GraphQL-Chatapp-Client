import React, { useState, useEffect } from 'react'

// Material UI
import { Input, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// Apollo
import { useMutation, useSubscription } from '@apollo/react-hooks';
import CREATE_MESSAGE from '../Mutations/createMessage'
import NEW_MESSAGE from '../Subscriptions/NewMessage'

import soundFile from '../assets/notification.mp3'

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
    button: {
      margin: theme.spacing(1),
      backgroundColor: "#1de9b6",
      color: "white",
      fontWeight: "Bold"
    },
    input: {
      color: "white",
      fontWeight: "Bold"
    },
    div: {
        margin: theme.spacing(1)
    },
  }));
  

const CreateMessage = ({refetch, chatId, currentUser}) => {
    const audio = new Audio(soundFile)

    const classes = useStyles();
    const [ message, setMessage ] = useState('Say something')

    useEffect(() => {
        
    }, [])

    const [ createMessage ] = useMutation(
    CREATE_MESSAGE,
    // {
    //     onCompleted: data => {
    //     const { createMessage } = data
    //         console.log(createMessage)
    //     }
    // }
    )

    const { data, error } = useSubscription(
        NEW_MESSAGE, 
        {
            onSubscriptionComplete: () => console.log('completed'),
            onSubscriptionData: (subscriptionData) => {
                console.log('subscriptionData')
                console.log(subscriptionData.subscriptionData.data.newMessage.content)
                let new_message = subscriptionData.subscriptionData.data.newMessage.content
                toast(`${new_message} 🔔`)
                audio.play()
                refetch()
            } 
        }
    )

    if (error) toast(error.graphQLErrors, {position: "top-left"})

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = async (e) => {
        console.log('message being sent')
        await createMessage({ 
            variables: { chatId: chatId, content: message },
        })
    }

    return ( 
        <div className={classes.root}>
            <Input onChange={(e) => handleChange(e)} className={`${classes.input}`} placeholder="Say something"/>
            <Button onClick={(e) => handleSubmit(e)} className={classes.button} variant="contained">
                Send!
            </Button>
        </div>
     );
}
 
export default CreateMessage;
