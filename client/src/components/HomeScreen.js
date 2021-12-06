import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import DeleteModal from './DeleteModal';
import { IconButton } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import FunctionsIcon from '@mui/icons-material/Functions';
import { TextField } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { Box } from '@mui/system';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    let newListCard = "";
    let array = [];
    if (store) {
        newListCard =
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.allLists.map((list) => (
                    
                    <ListCard
                        key={list._id}
                        listName={list.name}
                        items={list.items}
                        listUser={list.ownerUser}
                        views = {list.views}
                        likes = {list.likes}
                        dislikes = {list.dislikes}
                        comments = {list.comments}
                        published = {list.published}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <DeleteModal/>
            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                disabled = {false}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <div id = "toolbar">
                <IconButton sx = {{color: "#111111"}}> <HomeOutlinedIcon sx = {{fontSize: 50}} /> </IconButton>
                <IconButton sx = {{color: "#111111"}}> <GroupsOutlinedIcon sx = {{fontSize: 50}} /> </IconButton>
                <IconButton sx = {{color: "#111111"}}> <PersonOutlinedIcon sx = {{fontSize: 50}} /> </IconButton>
                <IconButton sx = {{color: "#111111"}}> <FunctionsIcon sx = {{fontSize: 50}} /> </IconButton>
                <TextField label = "Search" fullWidth sx = {{height: "50%"}}/>
                <Typography variant = "h2" sx = {{fontSize: 20, margin: "5px"}}>Sort By</Typography>
                <IconButton sx = {{color: "#111111"}}> <SortIcon sx = {{fontSize: 50}} /> </IconButton>
            </div>
            <div id="list-selector-list">
                {
                    newListCard
                }
            </div>
        </div>)
}

export default HomeScreen;