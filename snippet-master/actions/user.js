import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import queryString from 'query-string';

let baseUrl = 'http://localhost:8000/api/v1';

export const userPublicProfile = (username) => {
    return fetch(`${baseUrl}/user/${username}`, {
        method: 'GET',
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
