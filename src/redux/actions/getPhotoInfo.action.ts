import { Polyline } from '../../types/types'

export const getPhotoInfo = (state: Polyline[], id: number | string) => {
    return state.filter((item: Polyline) => item.id === id)[0]
}
