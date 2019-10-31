import React, { useState } from 'react'

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
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
    div: {
        margin: theme.spacing(1)
    }
  }));
  

const CreateMessage = ({refetch, chatId}) => {
    const audio = new Audio(soundFile)

    const classes = useStyles();
    const [ message, setMessage ] = useState('Say something')

    const [ createMessage ] = useMutation(
    CREATE_MESSAGE,
    {
        onCompleted: data => {
        const { createMessage } = data
            console.log(createMessage)
        }
    }
    )

    const { data, error } = useSubscription(
        NEW_MESSAGE,
    )

    if (error) console.log(error)
    if (data) {
        if (data.newMessage){
            toast('New Message 💟')
            audio.play()
        } else {
            console.log('')
        }
        refetch()
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = async (e) => {
        console.log('message being sent')
        await createMessage({ 
            variables: { chatId: chatId, content: message },
        })
        refetch()
    }

    return ( 
        <div className={classes.div}>
            <Input onChange={(e) => handleChange(e)} className="Mui-focused MuiInput-fullWidth" placeholder="Say something" color="white"/>
            <Button onClick={(e) => handleSubmit(e)} className={classes.button} color="primary" variant="contained">
                Send!
            </Button>
        </div>
     );
}
 
export default CreateMessage;