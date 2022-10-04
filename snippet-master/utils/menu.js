import { isAuth } from "../actions/auth";
import { bookmarkIcon, box, fire, home, users } from "./Icons";


const menu = [
    {
        id: 1,
        name: 'Home',
        url: '/',
        icon: home
    },
    {
        id: 4,
        name: 'Popular',
        url: '/popular',
        icon: fire
    },
    {
        id: 5,
        name: 'Top Creators',
        url: `${isAuth() ? '/top-creators' : '/login'}`,
        icon: users
    },
    {
        id: 2,
        name: 'Bookmarks',
        url: `${isAuth() ? '/bookmarks' : '/login'}`,
        icon: bookmarkIcon
    },
    {
        id: 3,
        name: 'My Snippets',
        url: `${isAuth() ? '/snippets': '/login'}`,
        icon: box
    },
]

export default menu