import { useContext } from 'react'
import { SearchQueryContext } from '../../Components/App/App'


const useSearchClean = () =>{
    const {searchInput, setSearchInput} = useContext(SearchQueryContext)

    function cleanQuery(){
        setSearchInput('')
        console.log('clean')
    }
    return {cleanQuery}
}

export default useSearchClean