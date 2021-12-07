import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    let undoStatus = true;
    if (store.canUndo() && !store.isItemEditActive) {
        undoStatus = false;
    }
    
    let redoStatus = true;
    if (store.canRedo() && !store.isItemEditActive) {
        redoStatus = false;
    }

    let closeStatus = false;
    if (store.isItemEditActive) {
        closeStatus = true;
    }
    return (
        <div id="edit-toolbar">
            
        </div>
    )
}

export default EditToolbar;