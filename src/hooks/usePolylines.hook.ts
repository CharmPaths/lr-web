import { db } from "../database/db"
import { useAppDispatch } from "../redux/hooks"
import { polylineActions } from "../redux/slices/polylines"
import { IPolyline } from "../types/types"

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
