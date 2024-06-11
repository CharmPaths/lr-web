import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { IRoute } from "utils/types"

import { RootState } from "../rootReducer"

const initialState: IRoute[] = []

const routesAdapter = createEntityAdapter({
    selectId: (route: IRoute) => route.id,
})

export const routesSlice = createSlice({
    name: "routes",
    initialState: routesAdapter.getInitialState(initialState),
    reducers: {
        initRoutes: routesAdapter.addMany,
        addRoute: routesAdapter.addOne,
        deleteRoutes: (state) => {
            routesAdapter.setAll(state, [])
        },
    },
})

export const { actions: routesActions } = routesSlice

export const { selectAll: routesSelector } = routesAdapter.getSelectors(
    (state: RootState) => state[routesSlice.name]
)
