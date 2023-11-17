import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

const GetLatLngLocation = () => {
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const [locaV2, setLocaV2] = useState([])
    const [locaV1, setLocaV1] = useState([])

    const getLatLng = () => {
        navigator.geolocation.getCurrentPosition((postion) => {
            const loaction = axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${postion.coords.latitude}&lon=${postion.coords.longitude}&lang=vi&apiKey=d8ff729883de4c979a1a272467407dfa`)
                .then((response) => {
                    setLocaV1(response.data.features);
                    // console.log(`lat: ${postion.coords.latitude} - lng: ${postion.coords.longitude}`);
                })
            return loaction
        })
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((postion) => {
            setLat(postion.coords.latitude)
            setLng(postion.coords.longitude)
        })
        getLatLng()
        // console.log(`lat: ${lat} - lng: ${lng}`);
    })

    const actionGetlatlngV2 = async () => {
        return await axios.get(`https://dev.virtualearth.net/REST/v1/Locations/${lat},${lng}?o=json&key=ApKwxlhyx8h41fRxBG7OWOYjewkbGvvWtL-_cPom8rkZYde4_8j8Kkkb4y797-p-`).then((response) => {
            const data = response.data.resourceSets.pop()
            setLocaV2(data.resources);
        })
    }

    return (
        <div>
            <h3>Get Data Location by Lat Lng</h3>
            <div>
                {
                    locaV1.map((i, index) => (
                        <h4 key={index}>API 1: {i.properties.formatted}</h4>
                    ))
                }
            </div>
            <div>
                {
                    locaV2.map((i, index) => (
                        <h4 key={index}>API 2: {i.name}</h4>
                    ))
                }
            </div>
            <button onClick={() => actionGetlatlngV2()}>Check Lat Lng V2</button>
        </div>
    )
}

export default GetLatLngLocation