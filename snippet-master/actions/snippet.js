import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

let baseUrl = 'http://localhost:8000/api/v1';

export const snippetCreate = (snippet, token) => {
    return fetch(`${baseUrl}/create-snippet`, {
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
export const listSnippetsandTags = async () => {
    return await fetch(`${baseUrl}/snippets-tags-categories`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.log(err)
        })
}
