import { db } from "database/db"
import { useAppDispatch } from "store/hooks"
import { polylineActions } from "store/slices/polylines"
import { IPolyline } from "utils/types"

export const usePolylines = () => {
    const dispatch = useAppDispatch()

    const addPolyline = (polyline: IPolyline) => {
        dispatch(polylineActions.addPolyline(polyline))

        const addPolylineToDb = async () => {
            try {
                await db.polylines.add({ ...polyline })
            } catch (e) {
                console.error(e)
            }
        }

        addPolylineToDb()
    }

    const deletePolylines = () => {
        dispatch(polylineActions.deletePolylines())

        const deletePolylinesInDb = async () => {
            try {
                await db.polylines.clear()
            } catch (e) {
                console.error(e)
            }
        }

        deletePolylinesInDb()
    }

    return {
        addPolyline,
        deletePolylines,
    }
}
