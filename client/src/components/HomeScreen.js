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
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorSort, setAnchorSort] = useState(null);
    const isMenuOpen = Boolean(anchorSort);

    useEffect(() => {
        store.loadIdNamePairs();
    }, [store.view, store.searchBar, store.sort]);

    function handleCreateNewList() {
        store.createNewList();
    }

    function handleAllLists() {
        store.loadAllLists();
    }

    function handleYourLists() {
        store.loadYourLists();
    }

    function handleUserLists() {
        store.loadUserLists();
    }

    function handleCommunityLists() {
        store.loadCommunityLists();
    }

    function handleSearch(event) {
        if(event.code === 'Enter') {
            let search = event.target.value;
            store.Search(search);
        }
    }

    function sortNewest() {
        let sort = "Newest";
        store.sortLists(sort);
    }

    function sortOldest() {
        let sort = "Oldest";
        store.sortLists(sort);
    }

    function sortViews() {
        let sort = "Views";
        store.sortLists(sort);
    }

    function sortLikes() {
        let sort = "Likes";
        store.sortLists(sort);
    }

    function sortDislikes() {
        let sort = "Dislikes";
        store.sortLists(sort);
    }

    const handleSortMenuOpen = (event) => {
        setAnchorSort(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorSort(null);
    };

    const sortMenuID = "sort-menu"
    const sortMenu = (
        <Menu
            anchorEl={anchorSort}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={sortMenuID}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick = {sortNewest} >Publish Date (Newest)</MenuItem>
            <MenuItem onClick = {sortOldest} >Publish Date (Oldest)</MenuItem>
            <MenuItem onClick = {sortViews} >Views</MenuItem>
            <MenuItem onClick = {sortLikes}>Likes</MenuItem>
            <MenuItem onClick = {sortDislikes}>Dislikes</MenuItem>
        </Menu>
    )


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
                        id = {list._id}
                        listName={list.name}
                        items={list.items}
                        listUser={list.ownerUser}
                        views = {list.views}
                        likes = {list.likes}
                        dislikes = {list.dislikes}
                        comments = {list.comments}
                        published = {list.published}
                        publishDate = {list.publishDate}
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
                <IconButton  onClick = {handleYourLists} sx = {{color: "#111111"}}> <HomeOutlinedIcon sx = {{fontSize: 50}} /> </IconButton>
                <IconButton  onClick = {handleAllLists} sx = {{color: "#111111"}}> <GroupsOutlinedIcon sx = {{fontSize: 50}} /> </IconButton>
                <IconButton  onClick = {handleUserLists} sx = {{color: "#111111"}}> <PersonOutlinedIcon sx = {{fontSize: 50}} /> </IconButton>
                <IconButton  onClick = {handleCommunityLists} sx = {{color: "#111111"}}> <FunctionsIcon sx = {{fontSize: 50}} /> </IconButton>
                <TextField label = "Search" onKeyPress = {handleSearch} fullWidth sx = {{height: "50%"}}/>
                <Typography variant = "h2" sx = {{fontSize: 20, margin: "5px"}}>Sort By</Typography>
                <IconButton aria-controls={sortMenuID}
                            aria-haspopup="true" 
                            onClick = {handleSortMenuOpen} 
                            sx = {{color: "#111111"}}> <SortIcon sx = {{fontSize: 50}} /> </IconButton>
                {sortMenu}
            </div>
            <div id="list-selector-list">
                {
                    newListCard
                }
            </div>
        </div>)
}

export default HomeScreen;