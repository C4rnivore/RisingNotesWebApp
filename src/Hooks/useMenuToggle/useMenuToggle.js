import { useMediaQuery } from 'react-responsive'
import { useState, useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { updateValue } from '../../Redux/slices/searchSlice'

const useMenuToggle = () =>{
    const [collapsed, setCollapsed] = useState(true)
    const isMobile = useMediaQuery({
        query: '(max-width: 720px)'
    })
    const dispatch = useDispatch()

    useEffect(()=>{
        setCollapsed(getInitState())
    },[])
  
    const getInitState = () =>{
        if(isMobile) return true
        
        const collapsed = localStorage.getItem('SIDEBAR_STATE')
        if(!collapsed){
           localStorage.setItem('SIDEBAR_STATE','1')
           return true
        }
        return collapsed==='1' ? true : false  
    }

    const updateLocalState = (value) =>{
        localStorage.setItem('SIDEBAR_STATE',value)
    }

    const toggler = () => {
        const sidebar = document.getElementById('sidebar')

        if(isMobile){//Поведение на мобилке
            if(sidebar.classList.contains('collapse')){
                sidebar.classList.remove('collapse')
                setCollapsed(false) 
            }
            else{
                sidebar.classList.add('collapse')
                dispatch(updateValue(''))
                setCollapsed(true)
            }
        }
        else{//Поведение на десктопе
            if(sidebar.classList.contains('collapse')){
                updateLocalState('0')
                setCollapsed(false) 
            }
             else{
                updateLocalState('1')
                setCollapsed(true)
            }
        }
    }

    return {collapsed, toggler}
}

export default useMenuToggle