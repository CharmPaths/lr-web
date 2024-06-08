import "leaflet/dist/leaflet.css"
import { MapContainer,  TileLayer } from "react-leaflet"
import { RouteDesigner } from "./components/RouteDesigner"
import { Toolbar } from "./components/Toolbar/Toolbar"
import { ImageLibrary } from "./components/ImageLibrary/ImageLibrary"
import { ImageTags } from "./components/ImageTags/ImageTags"
import { LocationMarker } from "./components/LocationMarker/LocationMarker"
import { Utils } from "./components/Utils/Utils"
import { Helmet } from "react-helmet"
import { ModalChangePhotoInfo } from "./components/ModalChangePhotoInfo/ModalChangePhotoInfo"
import { useDataBaseInitialStatuses } from "./hooks/useDataBaseInitialStatuses"
import { tileLayerAttribution, tileLayerUrl } from "./constants"
import { Routing } from "./components/Routing/Routing"
import { Polylines } from "./components/Polylines/Polylines"

function App() {
    useDataBaseInitialStatuses()

    return (
        <>
            <MapContainer
                center={[55.7522, 37.6156]}
                zoom={13}
                doubleClickZoom={false}
            >
                <Helmet title="Map App" />
                <TileLayer
                    attribution={tileLayerAttribution}
                    url={tileLayerUrl}
                />
                <LocationMarker />
                <ImageTags />
                <RouteDesigner />
                <Routing />
                <Polylines />
            </MapContainer>

            <ModalChangePhotoInfo />
            <ImageLibrary />
            <Utils />
            <Toolbar />
        </>
    )
}

export default App
