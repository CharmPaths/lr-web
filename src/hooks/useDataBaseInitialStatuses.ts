import { db } from "../database/db"
import { useEffect } from "react"
import { initStatuses } from "../constants"
import { useAppDispatch } from "../redux/hooks"
import { photoActions } from "../redux/slices/photos"

export function useDataBaseInitialStatuses() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const openDbConnection = async () => {
            await db.open().then((res) => {
                res.table("statuses")
                    .toArray()
                    .then((r) => {
                        if (r?.length === 0) {
                            res.table("statuses").bulkAdd(initStatuses)
                        }
                    })

                res.table("photos")
                    .toArray()
                    .then((r) => {
                        if (r?.length > 0) {
                            dispatch(photoActions.initPhotos(r))
                        }
                    })
            })
        }

        openDbConnection()
    }, [])
}
