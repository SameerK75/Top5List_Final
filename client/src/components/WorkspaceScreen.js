import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { TextField, Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [itemsArray, setItems] = useState([]);
    const [listTitle, setTitle] = useState(store.currentList.name)

    function handleChange(event) {
        let newItems = itemsArray;
        let index = event.target.id;
        index = index.substring(5)
        let i = index - 1;
        newItems[i] = event.target.value;
        setItems(newItems);
    }

    function handleNameChange(event) {
        setTitle(event.target.value);
    }
    function handleSave() {
        store.updateListItems(store.currentList._id, listTitle, itemsArray);
    }

    function handlePublish() {
        store.Publish(store.currentList._id, listTitle, itemsArray);
    }
    let items = [];
    let editItems = "";
    let listName = "";
    if (store.currentList) {
        listName = store.currentList.name;
        items = store.currentList.items;
    }
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
               <TextField defaultValue = {items[0]} id = "item-1" onChange = {handleChange} margin = "normal" fullWidth inputProps={{style: {fontSize: 25}}}
                InputLabelProps={{style: {fontSize: 24}}}/>
               <TextField defaultValue = {items[1]} id = "item-2" onChange = {handleChange} margin = "normal" fullWidth inputProps={{style: {fontSize: 25}}}
                InputLabelProps={{style: {fontSize: 24}}}/>
               <TextField defaultValue = {items[2]} id = "item-3" onChange = {handleChange} margin = "normal" fullWidth inputProps={{style: {fontSize: 25}}}
                InputLabelProps={{style: {fontSize: 24}}}/>
               <TextField defaultValue = {items[3]} id = "item-4" onChange = {handleChange} margin = "normal" fullWidth inputProps={{style: {fontSize: 25}}}
                InputLabelProps={{style: {fontSize: 24}}}/>
               <TextField defaultValue = {items[4]} id = "item-5" onChange = {handleChange} margin = "normal" fullWidth inputProps={{style: {fontSize: 25}}}
                InputLabelProps={{style: {fontSize: 24}}}/>
            </List>;
    }
    return (
        <div id="top5-workspace">
            <div id="workspace-edit">
                <div id ="workspace-listname">
                    <TextField defaultValue = {listName} onChange = {handleNameChange}></TextField>
                </div>
                <div id="edit-numbering">
                    <div className="item-number"><Typography variant="h3">1.</Typography></div>
                    <div className="item-number"><Typography variant="h3">2.</Typography></div>
                    <div className="item-number"><Typography variant="h3">3.</Typography></div>
                    <div className="item-number"><Typography variant="h3">4.</Typography></div>
                    <div className="item-number"><Typography variant="h3">5.</Typography></div>
                </div>
                {editItems}
            </div>
            <div id = "workspace-buttons">
                <Box>
                    <Button onClick = {handleSave}>Save</Button>
                    <Button onClick = {handlePublish}>Publish</Button>
                </Box>
            </div>
        </div>
    )
}

export default WorkspaceScreen;