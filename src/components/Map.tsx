import { Helmet } from "react-helmet"
import { MapContainer, TileLayer } from "react-leaflet"

import { ImageTags } from "components/ImageTags"
import { LocationMarker } from "components/LocationMarker"
import { Polylines } from "components/Polylines"
import { RouteDesigner } from "components/RouteDesigner"
import { Routing } from "components/Routing"
import { tileLayerAttribution, tileLayerUrl } from "utils/constants"

export function Map() {
    return (
        <MapContainer
            center={[55.7522, 37.6156]}
            zoom={13}
            doubleClickZoom={false}
        >
            <Helmet title="Map App" />
            <TileLayer attribution={tileLayerAttribution} url={tileLayerUrl} />
            <LocationMarker />
            <ImageTags />
            <RouteDesigner />
            <Routing />
            <Polylines />
        </MapContainer>
    )
}
