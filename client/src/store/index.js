import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from '../api'
import MoveItem_Transaction from '../transactions/MoveItem_Transaction'
import UpdateItem_Transaction from '../transactions/UpdateItem_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    RETRIEVE_ALL_LISTS: "RETRIEVE_ALL_LISTS",
    CHANGE_VIEW: "CHANGE_VIEW",
    SEARCH_LIST: "SEARCH_LIST",
    SORT_LISTS: "SORT_LISTS"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
        allLists: [],
        view: "Home",
        searchBar: "",
        sort: "",
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.top5List,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    allLists: store.allLists,
                    view: store.view,
                    searchBar: "",
                    sort: "",
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    allLists: store.allLists,
                    view: store.view,
                    searchBar: "",
                    sort: "",
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    allLists: store.allLists,
                    view: store.view,
                    searchBar: "",
                    sort: "",
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload.newPairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    allLists: payload.allLists,
                    view: store.view,
                    searchBar: store.searchBar,
                    sort: store.sort,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload,
                    allLists: store.allLists,
                    view: store.view,
                    searchBar: store.searchBar,
                    sort: store.sort,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    allLists: store.allLists,
                    view: store.view,
                    searchBar: store.searchBar,
                    sort: store.sort,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    allLists: store.allLists,
                    view: store.view,
                    searchBar: store.searchBar,
                    sort: "",
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: true,
                    listMarkedForDeletion: null,
                    allLists: store.allLists,
                    view: "Home",
                    searchBar: "",
                    sort: "",
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    allLists: store.allLists,
                    view: "Home",
                    searchBar: "",
                    sort: "",
                });
            }
            //RETRIEVE ALL LISTS
            case GlobalStoreActionType.RETRIEVE_ALL_LISTS: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    allLists: payload.allLists,
                    view: store.view,
                    searchBar: "",
                    sort: "",
                })
            }

            //UPDATE VIEW
            case GlobalStoreActionType.CHANGE_VIEW: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    allLists: store.allLists,
                    view: payload,
                    searchBar: "",
                    sort: "",
                })
            }

            //SEARCH FOR LIST
            case GlobalStoreActionType.SEARCH_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    allLists: store.allLists,
                    view: store.view,
                    searchBar: payload,
                    sort: store.sort
                })
            }
            //SORT LISTS
            case GlobalStoreActionType.SORT_LISTS: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    allLists: store.allLists,
                    view: store.view,
                    searchBar: store.searchBar,
                    sort: payload
                })
            }

            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs(top5List) {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            let newPairs = []
                            for(let i = 0; i < pairsArray.length; i++) {
                                let id = pairsArray[i]._id
                                let response = await api.getTop5ListById(id);
                                if(response.data.success) {
                                    let list = response.data.top5List;
                                    if(list.ownerEmail) {
                                        if(list.ownerEmail == auth.user.email) {
                                        newPairs.push(pairsArray[i]);
                                        }
                                    }
                                }
                            }
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: newPairs,
                                    top5List: top5List
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        tps.clearAllTransactions();
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["?", "?", "?", "?", "?"],
            ownerEmail: auth.user.email,
            ownerUser: auth.user.userName,
            views: 0,
            likes: [],
            dislikes: [],
            comments: [],
            published: false,
            publishDate: "none"
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            tps.clearAllTransactions();
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {
        let newPairs = [];
        let allLists = [];
        const response = await api.getTop5Lists()
        if (response.data.success) {
           allLists = response.data.data;

           if(store.view == "Home") {
            allLists = allLists.filter(function(element) {
                return element.ownerUser == auth.user.userName
            })
                if(store.searchBar !== "") {
                    allLists = allLists.filter(function(element) {
                        return element.name.toUpperCase().startsWith(store.searchBar.toUpperCase())
                    })
                } 
            }
            else if(store.view == "User") {
                allLists = allLists.filter(function(element) {
                    return element.published == true;
                })
                if(store.searchBar == "") {
                    allLists = [];
                }
                else {
                    allLists = allLists.filter(function(element) {
                        return element.ownerUser.toUpperCase().startsWith(store.searchBar.toUpperCase())
                    })
                }
            }
            else if(store.view == "Community") {
                //const response2 = await api.getTop5CommunityLists()
                /*if(response2.data.success) {
                    allLists = response.data
                }*/
                if(store.searchBar !== "") {
                    allLists = allLists.filter(function(element) {
                        return element.name.toUpperCase().startsWith(store.searchBar.toUpperCase())
                    })
                }
            }
            else if(store.view == "All") {
                allLists = allLists.filter(function(element) {
                    return element.published == true
                })
                if(store.searchBar !== "") {
                    allLists = allLists.filter(function(element) {
                        return element.name.toUpperCase().startsWith(store.searchBar.toUpperCase())
                    })
                }
            }

            //SORT HERE
            if(store.sort == "Newest") {
                allLists.sort(function compare(a, b) {
                    if(Date.parse(a.publishDate) > Date.parse(b.publishDate)) {
                        return -1
                    }
                    else if(Date.parse(a.publishDate) < Date.parse(b.publishDate)) {
                        return 1
                    }
                    else {
                        return 0
                    }
                })
            }
            else if(store.sort =="Oldest") {
                allLists.sort(function compare(a, b) {
                    if(Date.parse(a.publishDate) > Date.parse(b.publishDate)) {
                        return 1
                    }
                    else if(Date.parse(a.publishDate) < Date.parse(b.publishDate)) {
                        return -1
                    }
                    else {
                        return 0
                    }
                })
            }
            else if(store.sort == "Views") {
                allLists.sort(function compare(a, b) {
                    if(a.views > b.views) {
                        return -1
                    }
                    else if(a.views < b.views) { 
                        return 1
                    }
                    else {
                        return 0
                    }
                })
            }
            else if(store.sort == "Likes") {
                allLists.sort(function compare(a, b) {
                    if(a.likes.length > b.likes.length) {
                        return -1
                    }
                    else if(a.likes.length < b.likes.length) {
                        return 1
                    }
                    else {
                        return 0
                    }
                })
            }
            else if(store.sort == "Dislikes") {
                allLists.sort(function compare(a, b) {
                    if(a.dislikes.length > b.dislikes.length) {
                        return -1
                    }
                    else if(a.dislikes.length < b.dislikes.length) {
                        return 1
                    }
                    else {
                        return 0
                    }
                })
            }
           
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: {
                    newPairs: newPairs,
                    allLists: allLists
                }
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    //THESE FUNCTIONS WILL MANAGE INTERACTIONS WITH THE LISTCARD

    store.Publish = async function (id, name, items) {
        let response = await api.getTop5ListById(id)
        if(response.data.success) {
            let list = response.data.top5List;
            list.published = true;
            list.name = name;
            list.items = items;
            let date = new Date();
            let publishDate = date.toDateString();
            publishDate = publishDate.substring(4);
            list.publishDate = publishDate;
            store.updateList(list, id);
            history.push("/");
        }
    }

    store.Like = async function (id, newLikes) {
        let response = await api.getTop5ListById(id)
        if(response.data.success) {
            let list = response.data.top5List;
            list.likes = newLikes;
            store.updateList(list, id)
        }
    }
    
    store.Dislike = async function (id, newDislikes) {
        let response = await api.getTop5ListById(id)
        if(response.data.success) {
            let list = response.data.top5List;
            list.dislikes = newDislikes;
            store.updateList(list, id)
        }
    }

    store.Views = async function (id, newViews) {
        let response = await api.getTop5ListById(id)
        if(response.data.success) {
            let list = response.data.top5List;
            list.views = newViews;
            store.updateList(list, id);
        }
    }

    store.Comment = async function (id, newComments) {
        let response = await api.getTop5ListById(id)
        if(response.data.success) {
            let list = response.data.top5List;
            list.comments = newComments;
            store.updateList(list, id);
        }
    }
    
    store.updateListItems = async function(id, name, items) {
        let response = await api.getTop5ListById(id)
        if(response.data.success) {
            let list = response.data.top5List;
            list.name = name;
            list.items = items;
            store.updateList(list, id);
            history.push("/");
        }
    }
    store.updateList = async function(list, id) {
        let response = await api.updateTop5ListById(id, list)
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }
    //THESE FUNCTIONS WILL FILTER THE LISTS

    store.loadAllLists = function() {
        let newView = "All"
        storeReducer({
            type: GlobalStoreActionType.CHANGE_VIEW,
            payload: newView
        });
    }

    store.loadYourLists = function() {
        let newView = "Home"
        storeReducer({
            type: GlobalStoreActionType.CHANGE_VIEW,
            payload: newView 
        });
    }

    store.loadUserLists = function() {
        let newView = "User"
        storeReducer({
            type: GlobalStoreActionType.CHANGE_VIEW,
            payload: newView
        });
    }

    store.Search = function(search) {
        storeReducer({
            type:GlobalStoreActionType.SEARCH_LIST,
            payload: search
        });
    }

    store.sortLists = function(sort) {
        storeReducer({
            type: GlobalStoreActionType.SORT_LISTS,
            payload:sort
        });
    }

    //THIS FUNCTION RETRIEVES ALL THE LISTS
    store.getAllLists =  async function () {
        let allLists = [];
        const response =  await api.getTop5Lists()
        if(response.data.success) {
            allLists = response.data.data;
            console.log(allLists[1]);
        }
        if(store.view == "Home") {
            allLists = allLists.filter(function(element) {
                return element.ownerUser == auth.user.userName
            })
            if(store.searchBar !== "") {
                allLists = allLists.filter(function(element) {
                    return element.name == store.searchBar
                })
            } 
        }
        else if(store.view == "User") {
            allLists = allLists.filter(function(element) {
                return element.ownerUser == store.searchBar
            })
        }
        else if(store.view == "Community") {
            const response2 = await api.getTop5CommunityLists()
            /*if(response2.data.success) {
                allLists = response.data
            }*/
            if(store.searchBar !== "") {
                allLists = allLists.filter(function(element) {
                    return element.name == store.searchBar
                })
            }
        }
        else if(store.view == "All") {
            if(store.searchBar !== "") {
                allLists = allLists.filter(function(element) {
                    return element.name == store.searchBar
                })
            }
        }

        //SORTS HERE

        storeReducer({
            type: GlobalStoreActionType.RETRIEVE_ALL_LISTS,
            payload: allLists
        })
        console.log(allLists);
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadIdNamePairs();
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;

            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }

    store.addMoveItemTransaction = function (start, end) {
        let transaction = new MoveItem_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    store.addUpdateItemTransaction = function (index, newText) {
        let oldText = store.currentList.items[index];
        let transaction = new UpdateItem_Transaction(store, index, oldText, newText);
        tps.addTransaction(transaction);
    }

    store.moveItem = function (start, end) {
        start -= 1;
        end -= 1;
        if (start < end) {
            let temp = store.currentList.items[start];
            for (let i = start; i < end; i++) {
                store.currentList.items[i] = store.currentList.items[i + 1];
            }
            store.currentList.items[end] = temp;
        }
        else if (start > end) {
            let temp = store.currentList.items[start];
            for (let i = start; i > end; i--) {
                store.currentList.items[i] = store.currentList.items[i - 1];
            }
            store.currentList.items[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    store.undo = function () {
        tps.undoTransaction();
    }

    store.redo = function () {
        tps.doTransaction();
    }

    store.canUndo = function() {
        return tps.hasTransactionToUndo();
    }

    store.canRedo = function() {
        return tps.hasTransactionToRedo();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };