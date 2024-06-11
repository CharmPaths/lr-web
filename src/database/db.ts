import Dexie, { Table } from "dexie"

import { IImages, IPhoto, IPolyline, IStatus } from "@/types/types"

interface ITAbleRoutes {
    id: number | string
    lat: string
    lng: string
}

export class MapAppDbClass extends Dexie {
    // Инициализация и типизация таблиц баз данных
    photos!: Table<IPhoto>
    images!: Table<IImages>
    statuses!: Table<IStatus>
    polylines!: Table<IPolyline>
    routes!: Table<ITAbleRoutes>

    constructor() {
        // В конструктор родительского класса передаем название
        // нашей базы данных. Это нужно для того, чтобы проще ориентироваться среди всех баз данных в indexDB файле
        super("MapAppDb")

        // В каждую из объявленных ранее таблиц записываем какие должны поля, и какое поле является уникальным ключом.
        // Во всех таблицах для единообразия кода было принято решение сделать поле id - primary key (&id).
        this.version(1).stores({
            photos: "&id, title, description, status, viewed, latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed, timeStamp",
            images: "&id, fileSrc",
            statuses: "&id, title, description",
            polylines: "&id, lat, lng",
            routes: "&id, lat, lng",
        })
    }
}

// Создаем и экспортируем инстанс (экземпляр) класса
// для дальнейшего использования
export const db = new MapAppDbClass()
