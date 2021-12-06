import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Grid, Typography } from '@mui/material';
import { List } from '@mui/material';
import Comments from './Comments.js';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;
    const [isExpanded, setExpanded] = useState(false);

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleExpand() {
        setExpanded(true);
    }

    function handleClose() {
        setExpanded(false);
    }

    let newCard =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1, border: "1px solid", borderRadius: "25px", height: "145px" }}
            style={{
            fontSize: '48pt',
            width: '100%'
            }}
        >
            <Grid container>   
                <Grid item xs = {7} >
                    <Box sx = {{flexDirection: 'column'}}>
                        <Typography variant = "h4" fontSize = "40px">{idNamePair.name}</Typography>
                        <Typography variant = "h4" fontSize = "15px">By: McKilla Gorilla</Typography>
                    </Box>
                </Grid>
                <Grid item xs = {1}> <IconButton> <ThumbUpAltOutlinedIcon sx = {{fontSize: 55}}/></IconButton>  
                </Grid>
                <Grid item xs = {1}>
                    <Typography variant = "h4" fontSize = "30px" sx = {{position: "relative", top: "40%"}}>0</Typography>
                </Grid>
                <Grid item xs = {1}> <IconButton><ThumbDownAltOutlinedIcon sx = {{fontSize: 55}}/></IconButton>
                </Grid>
                <Grid item xs = {1}>
                    <Typography variant = "h4" fontSize = "30px" sx = {{position: "relative", top: "40%"}}>0</Typography>
                </Grid>
                <Grid item xs = {1}> <IconButton><DeleteOutlineIcon sx = {{fontSize: 55}}/></IconButton>
                </Grid>

                <Grid item xs = {7} >
                    <Typography variant = "h5" fontSize = "15px" sx = {{position: "relative", top: "40%"}}>Published: </Typography>
                </Grid>
                <Grid item xs = {3}>
                    <Typography variant = "h5" fontSize = "15px" sx = {{position: "relative", top: "40%"}}> Views: 0</Typography>
                </Grid>
                <Grid item xs = {2}> <IconButton onClick = {handleExpand} sx = {{position: 'relative', bottom: "3%", left: "58%"}}><ExpandMoreIcon/></IconButton> </Grid>
            </Grid>
        </ListItem>


    let randomkey = "12312412"
    let user = "username"
    let comment = "comment here"
    if (isExpanded) {
        newCard =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1, border: "1px solid", borderRadius: "25px", height: "350px" }}
            style={{
            fontSize: '48pt',
            width: '100%'
            }}
        >
            <Grid container>   
                <Grid item xs = {7} >
                    <Box sx = {{display: "flex", flexDirection: 'column'}}>
                        <Typography variant = "h4" fontSize = "40px">{idNamePair.name}</Typography>
                        <Typography variant = "h4" fontSize = "15px">By: McKilla Gorilla</Typography>
                    </Box>
                </Grid>
                <Grid item xs = {1}> <IconButton> <ThumbUpAltOutlinedIcon sx = {{fontSize: 55}}/></IconButton>  
                </Grid>
                <Grid item xs = {1}>
                    <Typography variant = "h4" fontSize = "30px" sx = {{position: "relative", top: "40%"}}>0</Typography>
                </Grid>
                <Grid item xs = {1}> <IconButton><ThumbDownAltOutlinedIcon sx = {{fontSize: 55}}/></IconButton>
                </Grid>
                <Grid item xs = {1}>
                    <Typography variant = "h4" fontSize = "30px" sx = {{position: "relative", top: "40%"}}>0</Typography>
                </Grid>
                <Grid item xs = {1}> <IconButton><DeleteOutlineIcon sx = {{fontSize: 55}}/></IconButton>
                </Grid>

                <Grid item xs = {6}>
                    <Box sx = {{display: "flex", flexDirection: 'column'}}>
                        <Typography variant = "h4" fontSize = "20px">1. item 1</Typography>
                        <Typography variant = "h4" fontSize = "20px">2. item 2</Typography>
                        <Typography variant = "h4" fontSize = "20px">3. item 3</Typography>
                        <Typography variant = "h4" fontSize = "20px">4. item 4</Typography>
                        <Typography variant = "h4" fontSize = "20px">5. item 5</Typography>
                    </Box>
                </Grid>
                <Grid item xs = {6} >
                    <Box sx = {{flexDirection: 'column', overflowY: "scroll", height: "100px"}}>
                        <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
                            <Comments
                                key = {randomkey}
                                user = {user}
                                comment = {"super long comment aaaaa what happening bruh no waaaay"}
                            />
                            <Comments
                                key = {"12"}
                                user = {user}
                                comment = {comment}
                            />
                            <Comments
                                key = {"123"}
                                user = {user}
                                comment = {comment}
                            />
                            <Comments
                                key = {"1234"}
                                user = {user}
                                comment = {comment}
                            />
                        </List>
                    </Box>
                    <TextField label = "Add Comment" fullWidth height = "30px"/>
                </Grid>

                <Grid item xs = {7} >
                    <Typography variant = "h5" fontSize = "15px" sx = {{position: "relative", top: "40%"}}>Published: </Typography>
                </Grid>
                <Grid item xs = {3}>
                    <Typography variant = "h5" fontSize = "15px" sx = {{position: "relative", top: "40%"}}> Views: 0</Typography>
                </Grid>
                <Grid item xs = {2}> <IconButton onClick = {handleClose} sx = {{position: 'relative', bottom: "3%", left: "58%"}}><ExpandLessIcon/></IconButton> </Grid>
            </Grid>
        </ListItem> 
    }
//Use box + typography for list items and List for comments (see list-selector-list)
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1}}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }
            }
            style={{
                fontSize: '48pt',
                width: '100%',
            }}
        >
                <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        newCard
    );
}

export default ListCard;