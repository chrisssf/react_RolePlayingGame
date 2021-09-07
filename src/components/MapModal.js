import React, { useState, useEffect, useRef, createRef } from 'react';
import './MapModal.css'

import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const MapModal = ({ 
    mapModalIsOpen, 
    setMapModalIsOpen, 
    areaUnlockTokenAvailable, 
    setAreaUnlockTokenAvailable,
}) => {


    const [ currentMapArea, setCurrentMapArea ] = useState(4)
    // everytime currentArea changes, need to check if completed, if not => populate with enemies
    const [ discoveredMapAreas, setDiscoveredMapAreas ] = useState([4])
    // if pushing new areas the last index will always be uncompleted unless .length = 9 and token is available
    // so if currentArea === last discovered index => need to populate with enemies and an upgrade


    const numberOfBattleScreensOnLevel = 9
    const arrayForMapCover = Array(numberOfBattleScreensOnLevel).fill()
    const refsArrayForMapCover = useRef(arrayForMapCover.map(() => createRef()));

    useEffect(() => {
        if(mapModalIsOpen) {
            setTimeout(() => {
                discoveredMapAreas.forEach(area => {
                    // OLD way, changed to use REFS
                    // document.getElementById("map-cover-item" + area).classList.remove("map-cover-item-black")
                    refsArrayForMapCover.current[area - 1].current.classList.remove("map-cover-item-black")
                })
            }, 5) // setTimeout is needed here because REF is null without it.
                  // Testing showed this is due to being inside the <Modal>, possibly find better solution later!
        }
    }, [mapModalIsOpen, discoveredMapAreas])


    const handleMapClick = (clickedArea) => {
        if (areaUnlockTokenAvailable) {
            setDiscoveredMapAreas([...discoveredMapAreas, clickedArea])
            setAreaUnlockTokenAvailable(false)
        }
    }

    const createMapCoverGrid = () => {
        let mapCover = arrayForMapCover.map((square, index) => {
            return <div className="map-cover-item map-cover-item-black" ref={refsArrayForMapCover.current[index]} onClick={() => handleMapClick(index + 1)}></div>
        })
        return mapCover
    }

    return (
        <>
            <p>Map Modal</p>
            <Modal
                className="map-modal"
                appElement={document.getElementById('root')}
                isOpen={mapModalIsOpen}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    }
                }}
            >
                <h1 onClick={() => setMapModalIsOpen(false)}>CLOSE</h1>
                {areaUnlockTokenAvailable && <p>Click an area to unlock</p>}
                <div className="full-map-container">
                    <div className="map-cover-container">
                        {/* OLD way, changed to use REFS */}
                        {/* <div className="map-cover-item map-cover-item-black" id="map-cover-item1" onClick={() => handleMapClick(1)}></div>
                        <div className="map-cover-item map-cover-item-black" id="map-cover-item2" onClick={() => handleMapClick(2)}></div>
                        <div className="map-cover-item map-cover-item-black" id="map-cover-item3" onClick={() => handleMapClick(3)}></div>  
                        <div className="map-cover-item map-cover-item-black" id="map-cover-item4" onClick={() => handleMapClick(4)}></div>
                        <div className="map-cover-item map-cover-item-black" id="map-cover-item5" onClick={() => handleMapClick(5)}></div>
                        <div className="map-cover-item map-cover-item-black" id="map-cover-item6" onClick={() => handleMapClick(6)}></div>  
                        <div className="map-cover-item map-cover-item-black" id="map-cover-item7" onClick={() => handleMapClick(7)}></div>
                        <div className="map-cover-item map-cover-item-black" id="map-cover-item8" onClick={() => handleMapClick(8)}></div>
                        <div className="map-cover-item map-cover-item-black" id="map-cover-item9" onClick={() => handleMapClick(9)}></div>   */}                  
                        {createMapCoverGrid()}
                    </div>
                    <img src={require('../assets/full desert.jpg').default} alt="full map" className="full-map-image"></img> 
                </div>
            </Modal>
      </>
    )
}

export default MapModal