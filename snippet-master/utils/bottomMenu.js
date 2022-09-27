import { isAuth } from "../actions/auth"
import { gear, help } from "./Icons"

const bottomMenu = [
    {
        id: 1,
        name: 'Settings',
        url: `${isAuth() ? '/profile/update' : '/login'}`,
        icon: gear
    },
    {
        id: 2,
        name: 'Help',
        url: '/help',
        icon: help
    },
]

export default bottomMenu