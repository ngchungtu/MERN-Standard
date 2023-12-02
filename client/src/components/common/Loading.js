import React, { useEffect } from 'react'
import '../../styles/loading.css'

const Loading = () => {

    // useEffect(() => {
    //     setTimeout(() => {
    //         window.location.reload()
    //     }, 2000)
    // }, [])

    return (
        <div className="loading_container">
            <div className="loader"></div>
        </div>
    )
}

export default Loading