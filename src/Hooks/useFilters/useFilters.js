import React, { useContext } from 'react'
import { useState } from 'react'
import { filtersInitial } from '../../Components/Player/FilterComponent/FIlters/Filters'

const FiltersContext = React.createContext()

export const FiltersProvider = ({ children }) => {
    const [filters, setFilters] = useState(filtersInitial)

    return (
        <FiltersContext.Provider value={{ filters, updateFilters: setFilters }}>
            {children}
        </FiltersContext.Provider>
    )
  }

export const useFilters = () => {
    const { filters, updateFilters } = useContext(FiltersContext)
    return { filters, updateFilters }
}

