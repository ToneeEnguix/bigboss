import React from 'react'

const UserContext = React.createContext({
    user: { name: "Log in", cart:[]},
}
)

export default UserContext