import Paragraph from "antd/es/typography/Paragraph"
import Title from "antd/es/typography/Title"
import { Marker as MarkerRouting } from "leaflet"
import { useMemo, useRef } from "react"
import { Popup, Marker as MarkerLeaflet } from "react-leaflet"

import { Mark } from "components/Mark/Mark"
import { useFiles } from "context/FileContext"
import { useAppDispatch } from "store/hooks"
import { photoActions } from "store/slices/photos"
import { IPhoto } from "utils/types"

import styles from "../ImageTags.module.css"

interface IMarkerProps {
    photo: IPhoto
}

export const Marker = ({ photo }: IMarkerProps) => {
    const { images } = useFiles()
    const markerRef = useRef<MarkerRouting<unknown>>(null)
    const dispatch = useAppDispatch()

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    const { lat, lng } = marker.getLatLng()

                    dispatch(
                        photoActions.changePhotoInfo({
                            id: photo?.id,
                            changes: {
                                latitude: lat,
                                longitude: lng,
                            },
                        })
                    )
                }
            },
        }),
        []
    )

    return photo.latitude && photo.longitude ? (
        <MarkerLeaflet
            key={photo?.id}
            position={{
                lat: photo.latitude,
                lng: photo.longitude,
            }}
            icon={Mark()}
            shadowPane={images[0]}
            interactive
            draggable
            eventHandlers={eventHandlers}
            ref={markerRef}
        >
            <Popup>
                <Title
                    level={5}
                    ellipsis={{
                        rows: 2,
                        expandable: "collapsible",
                        symbol: (expanded) => (expanded ? "скрыть" : "ещё"),
                    }}
                    className={styles.popupTitle}
                >
                    {photo.title || "Маркер"}
                </Title>
                <Paragraph
                    ellipsis={{
                        rows: 2,
                        expandable: "collapsible",
                        symbol: (expanded) => (expanded ? "скрыть" : "ещё"),
                    }}
                    className={styles.popupDesc}
                >
                    {photo.description && photo.description}
                </Paragraph>
            </Popup>
        </MarkerLeaflet>
    ) : null
}
