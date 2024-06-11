import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { EClickType } from "utils/types"

import { RootState } from "../rootReducer"

interface IInitState {
    clickType: EClickType
}

const initialState: IInitState = {
    clickType: EClickType.null,
}

export const clickSlice = createSlice({
    name: "click",
    initialState,
    reducers: {
        getClickType: (state) => {
            state.clickType
        },
        setClickType: (state, payload: PayloadAction<EClickType>) => {
            state.clickType = payload.payload
        },
        resetClickType: (state) => {
            state.clickType = EClickType.null
        },
    },
})

export const { getClickType, setClickType, resetClickType } = clickSlice.actions
export const { reducer: clickReducer } = clickSlice
export const clickType = (state: RootState) => state.click.clickType
