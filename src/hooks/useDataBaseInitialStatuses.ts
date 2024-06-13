import { useEffect } from "react"

import { db } from "database/db"
import { useAppDispatch } from "store/hooks"
import { photoActions } from "store/slices/photos"
import { polylineActions } from "store/slices/polylines"
import { routesActions } from "store/slices/routes"
import { initStatuses } from "utils/constants"

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

                res.table("routes")
                    .toArray()
                    .then((r) => {
                        if (r?.length > 0) {
                            dispatch(routesActions.initRoutes(r))
                        }
                    })

                res.table("polylines")
                    .toArray()
                    .then((r) => {
                        if (r?.length > 0) {
                            dispatch(polylineActions.initPolylines(r))
                        }
                    })
            })
        }

        openDbConnection()
    }, [])
}
