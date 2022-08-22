import { bookmark, box, fire, home, users } from "./Icons";


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
        url: '/top-creators',
        icon: users
    },
    {
        id: 2,
        name: 'Bookmarks',
        url: '/bookmarks',
        icon: bookmark
    },
    {
        id: 3,
        name: 'My Snippets',
        url: '/snippets',
        icon: box
    },
]

export default menu