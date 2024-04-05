/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Polyline } from '../../types/types'

interface IInitState {
    items: Polyline[]
}

const initialState: IInitState = {
    items: [
        {
            id: Math.floor(Math.random() * 999999999999999),
            title: 'Какой-то заголовок к описанию фото',
            description:
                'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.',
            canvas: null,
            image: 'media/bear.jpg',
            latitude: 55.1641667,
            longitude: 37.9522222,
            altitude: 20000,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
            timeStamp: 1707153996,
        },
    ],
}

export const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        // @ts-ignore
        addPhoto: (state, action: PayloadAction<Polyline>) => {
            return { ...state, items: [...state.items, action.payload] }
        },
        // @ts-ignore
        changePhotoInfo: (state, action: PayloadAction<Polyline>) => {
            return {
                ...state,
                items: state.items.map((item) => {
                    if (item.id === action.payload.id) {
                        return { ...item, ...action.payload }
                    }

                    return item
                }),
            }
        },
    },
})

export const { addPhoto, changePhotoInfo } = photoSlice.actions
export const { reducer: photoReducer } = photoSlice
