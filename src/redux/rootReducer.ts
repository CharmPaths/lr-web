import { configureStore } from '@reduxjs/toolkit'
import { photoReducer } from './reducers/photo.reducer'
import { drawerPhotoReducer } from './reducers/drawerPhoto.reducer'
import { modalToChangePhotoInfoReducer } from './reducers/modalToChangePhotoInfo.reducer'
import { activePhotoReducer } from './reducers/activePhoto.reducer'

export const store = configureStore({
    reducer: {
        photo: photoReducer,
        drawerPhoto: drawerPhotoReducer,
        modalToChangePhotoInfo: modalToChangePhotoInfoReducer,
        activePhoto: activePhotoReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
