import { useContext } from 'react'
import { SearchQueryContext } from '../../Components/App/App'
import { useMediaQuery } from 'react-responsive'

const useSearchClean = () =>{
    const {searchInput, setSearchInput} = useContext(SearchQueryContext)
    const isMobile = useMediaQuery({
        query: '(max-width: 720px)'
    })

    const closeMenu = () =>{
        const sidebar = document.getElementById('sidebar')
        sidebar.classList.add('collapse')
    }

    function cleanQuery(){
        setSearchInput('')
        if(isMobile){
            closeMenu()
        }
    }
    return {cleanQuery}
}

export default useSearchClean