import { useMediaQuery } from 'react-responsive'
import { useDispatch } from 'react-redux'
import { updateValue } from '../../Redux/slices/searchSlice'

const useSearchClean = () =>{
    const isMobile = useMediaQuery({
        query: '(max-width: 720px)'
    })
    const dispatch = useDispatch()
   
    const closeMenu = () =>{
        const sidebar = document.getElementById('sidebar')
        sidebar.classList.add('collapse')
    }

    function cleanQuery(){
        dispatch(updateValue(''))

        if(isMobile){
            closeMenu()
        }
    }
    return {cleanQuery}
}

export default useSearchClean