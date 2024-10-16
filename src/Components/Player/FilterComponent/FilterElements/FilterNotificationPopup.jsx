
const FilterNotificationPopup = ({
    visible,
    notificationText, 
    actionButtonText, 
    actionButtonCallback
}) => {
    return(
        <div className="filters-notification-popup" style={{display: visible? 'flex' : 'none'}}>
            {notificationText}
            <button onClick={actionButtonCallback}>
                {actionButtonText}
            </button>
        </div>
    )
}

export default FilterNotificationPopup