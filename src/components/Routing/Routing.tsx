import cl from "classnames"
import L, { LatLng } from "leaflet"
import { useEffect, useMemo } from "react"
import { useMap, useMapEvents } from "react-leaflet"

import { usePolylines } from "hooks/usePolylines"
import { useRoutes } from "hooks/useRoutes"
import { useAppSelector } from "store/hooks"
import { clickType } from "store/slices/click"
import { routesSelector } from "store/slices/routes"
import { EClickType } from "utils/types"

import styles from "./Routing.module.css"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import "leaflet-routing-machine"

L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
})

const getRoutingControl = (length: number) =>
    L.Routing.control({
        waypoints: [],
        routeWhileDragging: true,
        lineOptions: {
            extendToWaypoints: true,
            missingRouteTolerance: 1,
            styles: [{ color: "#6FA1EC", weight: 4 }],
        },
        // routeLine(route, options) {
        //     console.log(route);
        // },
        containerClassName: cl({
            [styles.displayNone]: length < 2,
        }),
        show: true,
        showAlternatives: true,
        addWaypoints: true,
        fitSelectedRoutes: true,
    })

export const Routing = () => {
    const routes = useAppSelector(routesSelector)
    const map = useMap()
    const click = useAppSelector(clickType)
    const { addRoute } = useRoutes()
    const { addPolyline } = usePolylines()

    useMapEvents({
        click(e) {
            if (click === EClickType.addRoute) {
                addRoute({
                    id: Math.random(),
                    lat: e.latlng.lat.toString(),
                    lng: e.latlng.lng.toString(),
                })
            } else if (click === EClickType.addPolyline) {
                addPolyline({
                    id: Math.random(),
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                    timeStamp: Date.now(),
                })

                // const getDistance = (
                //     lat1: number,
                //     lon1: number,
                //     lat2: number,
                //     lon2: number
                // ) => {
                //     const R = 6371 // Радиус Земли в километрах
                //     const dLat = ((lat2 - lat1) * Math.PI) / 180
                //     const dLon = ((lon2 - lon1) * Math.PI) / 180

                //     const a =
                //         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                //         Math.cos((lat1 * Math.PI) / 180) *
                //             Math.cos((lat2 * Math.PI) / 180) *
                //             Math.sin(dLon / 2) *
                //             Math.sin(dLon / 2)
                //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

                //     const distance = R * c
                //     return distance
                // }
            }
        },
    })

    const routingControl = useMemo(
        () => getRoutingControl(routes?.length),
        [routes?.length]
    )

    useEffect(() => {
        if (!map) return

        routingControl.addTo(map)

        routingControl.setWaypoints([
            ...(routes.map(
                (route) =>
                    new LatLng(parseFloat(route?.lat), parseFloat(route?.lng))
            ) ?? []),
        ])

        return () => {
            map.removeControl(routingControl)
        }
    }, [map, routes])

    return null
}
