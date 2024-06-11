import { EStatus } from "./types"

export const initStatuses = [
    {
        id: 1,
        title: EStatus.failed,
        description: "The status that shows the request failed",
    },
    {
        id: 2,
        title: EStatus.pending,
        description: "The status that shows the request pending",
    },
    {
        id: 3,
        title: EStatus.success,
        description: "The status that shows the request success",
    },
]

export const tileLayerAttribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
export const tileLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
