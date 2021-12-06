import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { TextField, Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import { Button } from '@mui/material';
import { Box } from '@mui/system';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);

    function handleSave() {
        store.closeCurrentList();
    }

    function handlePublish() {
        store.publish(store.currentList._id)
        store.closeCurrentList();
    }

    let editItems = "";
    let listName = "";
    if (store.currentList) {
        listName = store.currentList.name;
    }
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    }
    return (
        <div id="top5-workspace">
            <div id="workspace-edit">
                <div id ="workspace-listname">
                    <TextField defaultValue = {listName}></TextField>
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