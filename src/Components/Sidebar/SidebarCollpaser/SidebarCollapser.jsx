import'./SidebarCollapser.css'

function SidebarCollapser(props){

    const handleToggle = () => {
        props.collapseFunc()
    }

    return(
        <div className="collapser">
            {props.collapsed ?
                  <button onClick={handleToggle}>&#x203A;</button> 
                  : <button onClick={handleToggle}>&#x2039;</button> }
        </div>
    )
}

export default SidebarCollapser