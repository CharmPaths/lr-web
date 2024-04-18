import { configureStore } from '@reduxjs/toolkit'
import { photosSlice } from './slices/photos'
import { drawerPhotoSlice } from './slices/drawerPhoto.'
import { modalToChangePhotoInfoSlice } from './slices/modalToChangePhotoInfo'
import { activePhotoSlice } from './slices/activePhoto'

export const store = configureStore({
    reducer: {
        [photosSlice.name]: photosSlice.reducer,
        [drawerPhotoSlice.name]: drawerPhotoSlice.reducer,
        [modalToChangePhotoInfoSlice.name]: modalToChangePhotoInfoSlice.reducer,
        [activePhotoSlice.name]: activePhotoSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
