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
import AuthContext from '../auth';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;
    const [isExpanded, setExpanded] = useState(false);
    const [views, setViews] = useState(props.views);
    const [likes, updateLikes] = useState(props.likes);
    const [dislikes, updateDislikes] = useState(props.dislikes);
    const [comments, updateComments] = useState(props.comments);
    const [published, setPublished] = useState(props.published);

    const {listName, listUser, items, publishDate} = props;


    console.log(props.id);
    console.log(store.allLists); 
    console.log(comments);   
   

    function handleLike() {
        if(likes.includes(listUser)) {
            let newLikes = likes;
            let index = likes.indexOf(listUser)
            newLikes.splice(index, 1)
            store.Like(props.id, newLikes);
        }
        else if(dislikes.includes(listUser)) {
            let newDislikes = dislikes;
            let index = dislikes.indexOf(listUser)
            newDislikes.splice(index,1)
            store.Dislike(props.id, newDislikes);
            let newLikes = likes;
            newLikes.push(listUser);
            store.Like(props.id, newLikes);
        }
        else {
            let newLikes = likes;
            console.log(newLikes);
            newLikes.push(listUser);
            console.log(newLikes);
            store.Like(props.id, newLikes);
        }
    }

    function handleDislike() {
        if(dislikes.includes(listUser)) {
            let newDislikes = dislikes;
            let index = dislikes.indexOf(listUser)
            newDislikes.splice(index,1)
            store.Dislike(props.id, newDislikes);
        }
        else if(likes.includes(listUser)) {
            let newLikes = likes;
            let index = likes.indexOf(listUser)
            newLikes.splice(index, 1)
            store.Like(props.id, newLikes);
            let newDislikes = dislikes;
            newDislikes.push(listUser);
            store.Dislike(props.id, newDislikes);
        }
        else {
            let newDislikes = dislikes;
            newDislikes.push(listUser);
            store.Dislike(props.id, newDislikes);
        }
    }

    function handleComment(event) {
        if(event.code === 'Enter') {
            let user = auth.user.userName;
            let comment = event.target.value;
            console.log(comment);
            let pair = {
                user: user,
                comment: comment
            }
            let newComments = comments;
            newComments.unshift(pair);
            console.log(newComments);
            store.Comment(props.id, newComments);
            updateComments(newComments);
            event.target.value = "";
        }
        
    }

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
        let newViews = views + 1
        store.Views(props.id, newViews);
        setViews(newViews);
    }

    function handleClose() {
        setExpanded(false);
    }

    //CONDITIONALS FOR BUTTONS
    let LikeButton = "";
    let likesNum = "";
    let publishedtext ="";
    let DislikeButton = "";
    let dislikesNum = "";
    let viewstext = "";

    if(published) {
        LikeButton = 
        <IconButton onClick = {handleLike}> <ThumbUpAltOutlinedIcon sx = {{fontSize: 55}}/></IconButton>;

        likesNum = likes.length;

        publishedtext = "Published: " + publishDate;

        DislikeButton = <IconButton onClick = {handleDislike}><ThumbDownAltOutlinedIcon sx = {{fontSize: 55}}/></IconButton>;

        dislikesNum = dislikes.length;

        viewstext = "Views: " + views;

    }

    let newCard =
        <ListItem
            id={props.key}
            key={props.key}
            sx={{ marginTop: '15px', display: 'flex', p: 1, border: "1px solid", borderRadius: "25px", height: "145px" }}
            style={{
            fontSize: '48pt',
            width: '100%'
            }}
        >
            <Grid container>   
                <Grid item xs = {7} >
                    <Box sx = {{flexDirection: 'column'}}>
                        <Typography variant = "h4" fontSize = "40px">{listName}</Typography>
                        <Typography variant = "h4" fontSize = "15px">By: {listUser}</Typography>
                    </Box>
                </Grid>
                <Grid item xs = {1}> {LikeButton}  
                </Grid>
                <Grid item xs = {1}>
                    <Typography variant = "h4" fontSize = "30px" sx = {{position: "relative", top: "40%"}}>{likesNum}</Typography>
                </Grid>
                <Grid item xs = {1}> {DislikeButton}
                </Grid>
                <Grid item xs = {1}>
                    <Typography variant = "h4" fontSize = "30px" sx = {{position: "relative", top: "40%"}}>{dislikesNum}</Typography>
                </Grid>
                <Grid item xs = {1}> <IconButton onClick={(event) => {
                        handleDeleteList(event, props.id)
                    }} aria-label='delete'><DeleteOutlineIcon sx = {{fontSize: 55}}/></IconButton>
                </Grid>

                <Grid item xs = {7} >
                    <Typography variant = "h5" fontSize = "15px" sx = {{position: "relative", top: "40%"}}>{publishedtext} </Typography>
                </Grid>
                <Grid item xs = {3}>
                    <Typography variant = "h5" fontSize = "15px" sx = {{position: "relative", top: "40%"}}> {viewstext} </Typography>
                </Grid>
                <Grid item xs = {2}> <IconButton onClick = {handleExpand} sx = {{position: 'relative', bottom: "3%", left: "58%"}}><ExpandMoreIcon/></IconButton> </Grid>
            </Grid>
        </ListItem>


    let commentsOrder = comments.reverse();
    console.log(commentsOrder);
    if (isExpanded) {
        newCard =
        <ListItem
            id={props.key}
            key={props.key}
            sx={{ marginTop: '15px', display: 'flex', p: 1, border: "1px solid", borderRadius: "25px", height: "350px" }}
            style={{
            fontSize: '48pt',
            width: '100%'
            }}
        >
            <Grid container>   
                <Grid item xs = {7} >
                    <Box sx = {{display: "flex", flexDirection: 'column'}}>
                        <Typography variant = "h4" fontSize = "40px">{listName}</Typography>
                        <Typography variant = "h4" fontSize = "15px">By: {listUser}</Typography>
                    </Box>
                </Grid>
                <Grid item xs = {1}> <IconButton> <ThumbUpAltOutlinedIcon sx = {{fontSize: 55}}/></IconButton>  
                </Grid>
                <Grid item xs = {1}>
                    <Typography variant = "h4" fontSize = "30px" sx = {{position: "relative", top: "40%"}}>{likes.length}</Typography>
                </Grid>
                <Grid item xs = {1}> <IconButton><ThumbDownAltOutlinedIcon sx = {{fontSize: 55}}/></IconButton>
                </Grid>
                <Grid item xs = {1}>
                    <Typography variant = "h4" fontSize = "30px" sx = {{position: "relative", top: "40%"}}>{dislikes.length}</Typography>
                </Grid>
                <Grid item xs = {1}> <IconButton ><DeleteOutlineIcon sx = {{fontSize: 55}}/></IconButton>
                </Grid>

                <Grid item xs = {6}>
                    <Box sx = {{display: "flex", flexDirection: 'column', height: "150px"}}>
                        <Typography variant = "h4" fontSize = "20px">1. {items[0]}</Typography>
                        <Typography variant = "h4" fontSize = "20px">2. {items[1]}</Typography>
                        <Typography variant = "h4" fontSize = "20px">3. {items[2]}</Typography>
                        <Typography variant = "h4" fontSize = "20px">4. {items[3]}</Typography>
                        <Typography variant = "h4" fontSize = "20px">5. {items[4]}</Typography>
                    </Box>
                </Grid>
                <Grid item xs = {6} >
                    <Box sx = {{flexDirection: 'column', overflowY: "scroll", height: "100px"}}>
                        <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
                            {
                                comments.map((pair) => (
                                 <Comments
                                 key = {pair.comment}
                                 user = {pair.user}
                                 comment = {pair.comment}/>   
                                ))
                            }
                        </List>
                    </Box>
                    <TextField label = "Add Comment" fullWidth height = "30px" id ="comment" name = "comment" onKeyPress = {handleComment}/>
                </Grid>

                <Grid item xs = {7} >
                    <Typography variant = "h5" fontSize = "15px" sx = {{position: "relative", top: "40%"}}>Published: </Typography>
                </Grid>
                <Grid item xs = {3}>
                    <Typography variant = "h5" fontSize = "15px" sx = {{position: "relative", top: "40%"}}> Views: {views}</Typography>
                </Grid>
                <Grid item xs = {2}> <IconButton onClick = {handleClose} sx = {{position: 'relative', bottom: "3%", left: "58%"}}><ExpandLessIcon/></IconButton> </Grid>
            </Grid>
        </ListItem> 
    }
//Use box + typography for list items and List for comments (see list-selector-list)
    let cardElement =
        <ListItem
            id={props.key}
            key={props.key}
            sx={{ marginTop: '15px', display: 'flex', p: 1}}
            button
            onClick={(event) => {
                handleLoadList(event, props.key)
            }
            }
            style={{
                fontSize: '48pt',
                width: '100%',
            }}
        >
                <Box sx={{ p: 1, flexGrow: 1 }}>{listName}</Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, props.key)
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