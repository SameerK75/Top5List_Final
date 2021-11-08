import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function DeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
    }
    function handleDeleteList(event) {
        store.deleteMarkedList();
        store.unmarkListForDeletion();
    }
    function handleCloseModal(event) {
        store.unmarkListForDeletion();
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return(
        <Modal
        open = {store.listMarkedForDeletion !== null}
        onClose = {handleCloseModal}
        aria-labelledby = "modal-title"
        >
            <Box sx = {style}>
                <Typography id= "modal-title" variant="h6" component="h1" >Delete the Top 5 {name} list?</Typography>
                <Button onClick = {handleCloseModal}>Close</Button>
                <Button onClick = {handleDeleteList}>Confirm</Button>
            </Box>
        </Modal>
    )
}