import React, { useContext } from 'react'
import { useState } from 'react'

const CacheContext = React.createContext()

export const CacheProvider = ({ children }) => {
    const [cache, setCache] = useState(new Map())

    return (
        <CacheContext.Provider value={{ cache, updateCache: setCache }}>
            {children}
        </CacheContext.Provider>
    )
}


export const useSearchCache = () => {
    const { cache, updateCache } = useContext(CacheContext)
    return { cache, updateCache }
}

