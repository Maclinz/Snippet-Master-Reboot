import React, { useContext, useEffect, useState } from 'react'
import { getCookie } from '../actions/auth'
import { create, getCategories, removeCategory } from '../actions/category'

const CrudContext = React.createContext()

export const CrudProvider = ({ children }) => {

    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        loading: false,
        reload: false,
        categories: [],
        removed: false
    })

    const { name, error, reload, success, loading, categories, removed } = values
    const token = getCookie('token')

    const handleChange = (e) => {
        setValues({ ...values, error: false, name: e.target.value, success: false, removed: '' })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //send request to server
        create({ name }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false, loading: false })
            } else {
                setValues({ ...values, error: false, name: '', success: false, reload:!reload, removed: !removed })
            }
        })
    }
    
    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(error);
            } else {
                setValues({ ...values, error: false, success: true, loading: false, categories: data })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    

    //delete category
    const deleteCategory = (slug) => {
        removeCategory(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false,name: '', loading: false, removed: !removed, reload: !reload })
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
        loadCategories()
    },[reload])

    return (
        <CrudContext.Provider value={{ ...values, values, categories, handleChange, handleSubmit, deleteCategory, showError }}>
            {children}
        </CrudContext.Provider>
    )
}

export const useCrudContext = () => {
    return useContext(CrudContext)
}