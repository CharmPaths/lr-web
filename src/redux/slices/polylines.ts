import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { IPolyline } from "@/types/types"

import { RootState } from "../rootReducer"

const initialState: IPolyline[] = []

const polylineAdapter = createEntityAdapter({
    selectId: (polyline: IPolyline) => polyline.id,
    sortComparer: (a, b) => a.timeStamp - b.timeStamp,
})

export const polylinesSlice = createSlice({
    name: "polylines",
    initialState: polylineAdapter.getInitialState(initialState),
    reducers: {
        initPolylines: polylineAdapter.addMany,
        addPolyline: polylineAdapter.addOne,
        deletePolylines: polylineAdapter.removeAll,
    },
})

export const { actions: polylineActions } = polylinesSlice

export const { selectAll: polylinesSelector } = polylineAdapter.getSelectors(
    (state: RootState) => state[polylinesSlice.name]
)
