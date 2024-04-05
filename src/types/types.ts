export interface Polyline {
    id: number | string
    title: string | undefined
    description: string | undefined
    canvas: HTMLCanvasElement | null
    image: string | undefined
    latitude: number // Широта
    longitude: number // Долгота
    altitude: number | undefined // Высота
    accuracy: number | null // Точность (погрешность координат?)
    altitudeAccuracy: number | null // Точность определения высоты (погрешность высоты?)
    heading: number | null // Заголовок / курс / часть света (?)
    speed: number | null // Скорость (?)
    timeStamp: number // Дата создания объекта данных
}

export interface IModalChangePhotoInfo {
    isOpen: boolean
    title: string | undefined
    description: string | undefined
    props: Polyline
}
