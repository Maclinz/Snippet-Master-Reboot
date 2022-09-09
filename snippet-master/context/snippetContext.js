import React, { useContext, useEffect, useReducer, useState } from "react";
import { getCookie } from "../actions/auth";
import { listSnippetsandTags, searchSnippets, listAllSnippets, snippetDelete } from '../actions/snippet'
import reducer from '../reducers/snippet_reducer'
import { GET_SNIPPETS_SUCCESS,GET_ADMIN_SNIPPETS_SUCCESS,GET_SNIPPETS_ERROR, GET_SNIPPETS_BEGIN, LOAD_MORE, SEARCHING, INPUT_CHANGE, RELOAD_SNIPPETS, DELETE_SNIPPET, SHOW_SNIPPET_MODAL, HIDE_SNIPPET_MODAL, REMOVE_SNIPPET } from "../utils/actions";

const SnippeContext = React.createContext();

export const SnipetProvider = ({ children }) => {

    const token = getCookie('token')

    const [snippetValues, setSnippetValues] = useState({
        title: "",
        code: "",
        tags: [],
        errors: '',
        success: false,
        loading: false,

    });


    const defaultState = {
        snippets: [],
        loading: false,
        tags: [],
        limit: 6,
        skip: 0,
        totalSnippets: 0,
        loadedSnippets: [],
        snippetModal: false,
        removeSnippet: false,
        allSnippetsAdmin: [
            {
                postedBy: {},
                code: "",
            }
        ],
        searchState:{
            search: undefined,
            message: '',
            searched: false,
            results: []
        }
    }

    const [state, dispatch] = useReducer(reducer, defaultState) 

    const showSnippetModal = () => {
        dispatch({
            type: SHOW_SNIPPET_MODAL
        })
    }

    const hideSnippetModal = () => {
        dispatch({
            type: HIDE_SNIPPET_MODAL
        })
    }

    //list all snippets and tags
    const listSnippets =  () => {

        let skip = state.skip
        let limit = state.limit

        dispatch({ type: GET_SNIPPETS_BEGIN })
        listSnippetsandTags(skip, limit)
            .then(data => {
                console.log(data);
                dispatch({
                    type: GET_SNIPPETS_SUCCESS, 
                    payload: data
                })
                //reload
            })
            .catch(err => {
                dispatch({
                    type: GET_SNIPPETS_ERROR, payload: err
                })
            }
        )
    }

    //list all snippets 
    const listAllSnippetsAdmin =  () => {
        //dispatch({ type: GET_SNIPPETS_BEGIN })
        listAllSnippets()
            .then(data => {
                console.log('All Snips',data);
                dispatch({
                    type: GET_ADMIN_SNIPPETS_SUCCESS,
                    payload: data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    //delete snippet
    const deleteSnippet = (slug) => {
        //warn user before deleting
        let answer = window.confirm('Are you sure you want to delete this snippet?')
        if(answer){
            snippetDelete(slug, token)
                .then(data => {
                    console.log(data);
                    dispatch({
                        type: DELETE_SNIPPET,
                        payload: data
                    })
                    //reload
                    listAllSnippetsAdmin()
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }


    //load more snippets
    const loadMore = () => {
        let skip = state.skip
        let limit = state.limit
        skip += limit
        
        listSnippetsandTags(skip, limit)
            .then(data => {
                dispatch({
                    type: LOAD_MORE, 
                    payload: data
                })
                //reload
            }).catch(err => {
                dispatch({
                    type: GET_SNIPPETS_ERROR, payload: err
                })
            }
        )

        console.log('skip', skip)
    }
    
    //handle search
    const handleSearch = (e) => {
        e.preventDefault()
        const search = state.searchState.search
        //if search is not empty
        if(search) {
            searchSnippets({ search }).then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    dispatch({
                        type: SEARCHING,
                        payload: {
                            data,
                            message: `Found ${data.length} snippets`,
                            search: search
                        }
                    })
                }
            })
        }
    }

    //handle input change
    const handleInputChange = (e) => {
        const value = e.target.value
        dispatch({ type: INPUT_CHANGE , payload: value })

        //if input is empty, reload all snippets
        if (value === '' || value === undefined || value === null ) {
            listSnippets()
        }
    }

    useEffect(() => {
        listSnippets()
        listAllSnippetsAdmin()
    } , [])

    console.log('Snippet State', state)
    return (
        <SnippeContext.Provider value={{ 
            ...snippetValues, 
            ...state,loadMore, 
            snippetValues, 
            setSnippetValues, 
            loadMore, 
            listSnippets,
            handleSearch,
            handleInputChange,
            deleteSnippet,
            listAllSnippetsAdmin,
            hideSnippetModal,
            }}>
                {children}
        </SnippeContext.Provider>
    )
}

export const useSnippetContext = () => {
    return useContext(SnippeContext);
}
