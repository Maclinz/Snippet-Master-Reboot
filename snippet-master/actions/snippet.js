import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import queryString from 'query-string';
import { isAuth } from './auth';

//let baseUrl = 'http://localhost:8000/api/v1';
let baseUrl = 'https://snippetmasterdemo2.herokuapp.com/api/v1';

export const snippetCreate = (snippet, token) => {

    //change url dynamically based on role
    let snippetUrl;

    if (isAuth() && isAuth().role === 1) {
        snippetUrl = `${baseUrl}/create-snippet`;
    }else if (isAuth() && isAuth().role === 0) {
        snippetUrl = `${baseUrl}/user/create-snippet`;
    }


    return fetch(`${snippetUrl}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(snippet)
    })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.log(err)
        })
}

//List all snippets
export const listSnippetsandTags = async (skip, limit) => {
    const data = {
        limit,
        skip
    }
    return await fetch(`${baseUrl}/snippets-tags-categories`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.log(err)
        })
}

//get all snippets admin
export const listAllSnippets = async () => {
    return await fetch(`${baseUrl}/snippets`, {
        method: 'GET'
    })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.log(err)
        })
}

// delete snippet admin
export const snippetDelete = (slug, token) => {
    return fetch(`${baseUrl}/snippet/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.log(err)
        })
}

//List all snippets
export const searchSnippets = async (params) => {
    console.log('search params', params)
    let query = queryString.stringify(params);
    console.log('query params', query)
    return await fetch(`${baseUrl}/snippets/search?${query}`, {
        method: 'GET',
    })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.log(err)
        })
}

//get single snippet
export const singleSnippet = async (slug) => {
    return await fetch(`${baseUrl}/snippet/${slug}`, {
        method: 'GET'
    })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.log(err)
        })
}

//bookmark snippet
export const bookmarkSnippet = (slug, token, snippetId) => {
    return fetch(`${baseUrl}/snippet/bookmark/${slug}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ snippetId })
    })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.log(err)
        })
}


//unbookmark snippet
export const unbookmarkSnippet = (slug, token, snippetId) => {
    return fetch(`${baseUrl}/snippet/unbookmark/${slug}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ snippetId })
    })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.log(err)
        })
}

//get all bookmarks
export const listBookmarks = async (token) => {
    return await fetch(`${baseUrl}/user/bookmarks`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.log(err)
        })
}


//like snippet
export const likeSnippet = (slug, token, snippetId) => {
    return fetch(`${baseUrl}/snippet/like/${snippetId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ snippetId })
    })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.log(err)
        })
}

//unlike snippet
export const unlikeSnippet = (slug, token, snippetId) => {
    return fetch(`${baseUrl}/snippet/unlike/${slug}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ snippetId })
    })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.log(err)
        })
}