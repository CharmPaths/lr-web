import { db } from "../database/db"
import { useAppDispatch } from "../redux/hooks"
import { routesActions } from "../redux/slices/routes"
import { IRoute } from "../types/types"

// useRoutes - хук (функция), внутри которой описываем все функции для работы
// с маршрутом:
//  1. Добавление промежуточного пункта в маршруте в Redux-toolkit и indexDB
//  2. Удаление всех маршрутов из Redux-toolkit и indexDB

// Создаем и экспортируем хук (функцию) usePhotos для дальнейшего использования
export const useRoutes = () => {
    // Вызываем функцию из Redux-toolkit, которая возвращает функцию
    // для работы со state manager (Redux-toolkit)
    const dispatch = useAppDispatch()

    // Инициализируем и описываем функцию для добавления фотографий в
    // Redux-toolkit и в indexDB
    const addRoute = (route: IRoute) => {
        // Добавление маршрута в Redux-toolkit
        dispatch(routesActions.addRoute(route))

        // Добавление маршрута в таблицу маршрутов в базе данных
        const addRouteToDb = async () => {
            try {
                await db.routes.add({ ...route })
            } catch (e) {
                console.error(e)
            }
        }

        addRouteToDb()
    }

    // Инициализируем и описываем функцию для удаления
    // всего маршрута в Redux-toolkit и в indexDB
    const deleteRoute = () => {
        // Удаление всего маршрута из Redux-toolkit
        dispatch(routesActions.deleteRoutes())

        // Удаление всего маршрута из indexDB
        const deleteRoutesInDb = async () => {
            try {
                await db.routes.bulkUpdate([])
            } catch (e) {
                console.error(e)
            }
        }

        deleteRoutesInDb()
    }

    // Возвращаем все описанные выше функции
    // в одном объекте для удобного использования
    return {
        addRoute,
        deleteRoute,
    }
}
