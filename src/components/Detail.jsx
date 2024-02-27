import React from 'react'

const Detail = ({ markers, selectedId }) => {
    const selectedMarker = markers.find(marker => marker.id === selectedId)
    return (
        <>
            {selectedMarker && (
                <div>{selectedMarker.id}</div>
            )}
        </>
    )
}
export default Detail