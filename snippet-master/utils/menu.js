import { bookmark, box, home } from "./Icons";


const menu = [
    {
        id: 1,
        name: 'Home',
        url: '/',
        icon: home
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