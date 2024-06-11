import { configureStore } from "@reduxjs/toolkit"

import { activePhotoSlice } from "./slices/activePhoto"
import { clickSlice } from "./slices/click"
import { drawerPhotoSlice } from "./slices/drawerPhoto."
import { modalToChangePhotoInfoSlice } from "./slices/modalToChangePhotoInfo"
import { photosSlice } from "./slices/photos"
import { polylinesSlice } from "./slices/polylines"
import { routesSlice } from "./slices/routes"

export const store = configureStore({
    reducer: {
        [clickSlice.name]: clickSlice.reducer,
        [photosSlice.name]: photosSlice.reducer,
        [routesSlice.name]: routesSlice.reducer,
        [polylinesSlice.name]: polylinesSlice.reducer,
        [drawerPhotoSlice.name]: drawerPhotoSlice.reducer,
        [modalToChangePhotoInfoSlice.name]: modalToChangePhotoInfoSlice.reducer,
        [activePhotoSlice.name]: activePhotoSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
