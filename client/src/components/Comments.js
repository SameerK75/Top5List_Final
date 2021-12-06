import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { Typography } from '@mui/material';


function Comments(props) {
    const { store } = useContext(GlobalStoreContext);
    const {user, comment} = props;
    let commentCard =
        <ListItem
        sx={{ marginTop: '15px', display: 'flex', p: 1, border: "1px solid", borderRadius: "25px", height: "100px", height: "auto", wordWrap: "break-word"}}
        style={{
            fontSize: '20pt',
            width: '100%'
            }}
        >
            <Box sx = {{display: "flex", flexDirection: "column"}}>
                <Typography sx = {{fontSize: "8pt", color: "#000FFF", textDecoration: "underline", }}>{user}</Typography>
                <Typography sx = {{fontSize: "15pt"}}>{comment}</Typography>
            </Box>
        </ListItem>

    return ( commentCard )
}

export default Comments;