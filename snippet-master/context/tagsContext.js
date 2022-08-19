import React, { useContext, useEffect, useState } from 'react'
import { getCookie } from '../actions/auth'
import { create, getCategories, removeCategory } from '../actions/category'
import { createTag, getTags, removeTag } from '../actions/tags'

const CrudTagContext = React.createContext()

export const CrudTagsProvider = ({ children }) => {

    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        loading: false,
        reload: false,
        tags: [],
        removed: false
    })

    const { name, error, reload, success, loading, tags, removed } = values
    const token = getCookie('token')

    const handleChange = (e) => {
        setValues({ ...values, error: false, name: e.target.value, success: false, removed: '' })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //send request to server
        createTag({ name }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            } else {
                setValues({ ...values, error: false, name: '', success: false, reload: !reload, removed: !removed })
            }
        })
    }

    const loadTags = () => {
        getTags().then(data => {
            if (data.error) {
                console.log(error);
            } else {
                setValues({ ...values, error: false, success: true, loading: false, tags: data })
            }
        }).catch(err => {
            console.log(err)
        })
    }


    //delete category
    const deleteTag = (slug) => {
        removeTag(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, name: '', loading: false, removed: !removed, reload: !reload })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    //show error message
    const showError = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        )
    }



    useEffect(() => {
        loadTags()
    }, [reload])

    return (
        <CrudTagContext.Provider value={{ ...values, values, tags, handleChange, handleSubmit, deleteTag, showError }}>
            {children}
        </CrudTagContext.Provider>
    )
}

export const useTagContext = () => {
    return useContext(CrudTagContext)
}