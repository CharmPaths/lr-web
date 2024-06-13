import { Polyline } from "react-leaflet"
import { v4 as uuidv4 } from "uuid"

import { useAppSelector } from "store/hooks"
import { polylinesSelector } from "store/slices/polylines"

export const Polylines = () => {
    const polylines = useAppSelector(polylinesSelector)

    return (
        <Polyline
            key={uuidv4()}
            positions={polylines}
            eventHandlers={{
                mousedown: (e) => {
                    console.log(e)
                },
            }}
        />
    )
}
