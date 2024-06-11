import { useMapEvents } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"

import { useAppDispatch, useAppSelector } from "store/hooks"
import { activePhotoSelector, resetActivePhoto } from "store/slices/activePhoto"
import { clickType, setClickType } from "store/slices/click"
import { openDrawer } from "store/slices/drawerPhoto."
import { photoActions, photosSelector } from "store/slices/photos"
import { EClickType } from "utils/types"

import { Marker } from "./Marker/Marker"

export const ImageTags = () => {
    const photos = useAppSelector(photosSelector)
    const id = useAppSelector(activePhotoSelector)
    const click = useAppSelector(clickType)
    const dispatch = useAppDispatch()

    useMapEvents({
        click(e) {
            if (id && click === EClickType.changeLocation) {
                const { lat, lng } = e.latlng

                dispatch(
                    photoActions.changePhotoInfo({
                        id: id,
                        changes: {
                            latitude: lat,
                            longitude: lng,
                        },
                    })
                )
                dispatch(openDrawer())
                dispatch(resetActivePhoto())
                dispatch(setClickType(EClickType.null))
            }
        },
    })

    return (
        <>
            <MarkerClusterGroup>
                {photos?.map((photo) => (
                    <Marker key={photo?.id} photo={photo} />
                ))}
            </MarkerClusterGroup>
        </>
    )
}
