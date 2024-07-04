import React, { useContext } from 'react'

const loginAuth = () => {
    const [isAuthenticated, setAutheticated] = useContext()

    return (isAuthenticated)
}

// export isAuthenticated;
