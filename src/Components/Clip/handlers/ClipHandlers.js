export const handleVideoHover = (videoPreviewRef, src) => {
    if(videoPreviewRef.current.src === '')
        videoPreviewRef.current.src = src

    // if(videoPreviewRef.current.readyState > 2)
    //     videoPreviewRef.current.play()
}
export const handleVideoEnter = (previewRef) =>{
    previewRef.current.classList.add('preview-hover')
}
export const handleVideoLeave = (previewRef,videoPreviewRef ) =>{
    if(videoPreviewRef.current.readyState > 2)
        videoPreviewRef.current.pause()
    previewRef.current.classList.remove('preview-hover')
}

export const handleVideoMove = (videoPreviewRef) =>{
    if(videoPreviewRef.current.readyState < 2)
        return

    if(videoPreviewRef.current.paused)
        videoPreviewRef.current.play()

}
