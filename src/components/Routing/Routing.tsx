import { useEffect } from "react"
import L from "leaflet"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import "leaflet-routing-machine"
import { useMap, useMapEvents } from "react-leaflet"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { routesSelector } from "../../redux/slices/routes"
import { clickType, setClickType } from "../../redux/slices/click"
import { EClickType } from "../../types/types"
import { useRoutes } from "../../hooks/useRoutes.hook"
import { message } from "antd/lib"

L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
})

export const Routing = (): null => {
    const dispatch = useAppDispatch()
    const routes = useAppSelector(routesSelector)
    const map = useMap()
    const click = useAppSelector(clickType)
    const { addRoute } = useRoutes()

    useMapEvents({
        click(e) {
            if (click === EClickType.addRoute) {
                if (routes?.length >= 2) {
                    dispatch(setClickType(EClickType.null))

                    message.info({
                        content: "Начальная и конечная точки заданы",
                        duration: 1.5,
                    })
                } else {
                    addRoute({
                        id: Math.random(),
                        lat: e.latlng.lat.toString(),
                        lng: e.latlng.lng.toString(),
                    })
                }
            }
        },
    })

    const routingControl = L.Routing.control({
        waypoints: [
            L.latLng(parseFloat("55.7522"), parseFloat("37.6156")),
            L.latLng(parseFloat("55.810767"), parseFloat("37.502876")),
        ],
        routeWhileDragging: true,
        lineOptions: {
            extendToWaypoints: true,
            missingRouteTolerance: 1,
            styles: [{ color: "#6FA1EC", weight: 4 }],
        },
        show: true,
        showAlternatives: true,
        addWaypoints: true,
        fitSelectedRoutes: true,
    })

    useEffect(() => {
        if (!map) return

        routingControl.addTo(map)

        return () => {
            map.removeControl(routingControl)
        }
    }, [map])

    useEffect(() => {
        // routingControl.setWaypoints([
        //     ...(routes.map(
        //         (route) =>
        //             new LatLng(parseFloat(route?.lat), parseFloat(route?.lng))
        //     ) ?? []),
        // ])
        console.log(routes)
    }, [routes])

    return null
}
