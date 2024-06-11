import {
    DeleteOutlined,
    PictureOutlined,
    RiseOutlined,
} from "@ant-design/icons"
import { Button, Row } from "antd"
import { Badge, Popconfirm, message } from "antd/lib"
import cl from "classnames"

import { usePhotos } from "hooks/usePhotos"
import { useRoutes } from "hooks/useRoutes"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { clickType, setClickType } from "store/slices/click"
import { openDrawer } from "store/slices/drawerPhoto."
import { photosSelector } from "store/slices/photos"
import { routesSelector } from "store/slices/routes"
import { EClickType } from "utils/types"

import { Footer } from "../Footer/Footer"
import { UploadButton } from "../UploadButton/UploadButton"

import styles from "./Toolbar.module.css"

export const Toolbar = () => {
    const dispatch = useAppDispatch()
    const photos = useAppSelector(photosSelector)
    const routes = useAppSelector(routesSelector)
    const click = useAppSelector(clickType)

    const { viewAllPhotos } = usePhotos()
    const { deleteRoutes } = useRoutes()

    const handleRouteBtn = () => {
        if (click === EClickType.addRoute) {
            dispatch(setClickType(EClickType.null))

            message.info({
                content: "Построение маршрута завершено",
                duration: 2.5,
            })
        } else {
            dispatch(setClickType(EClickType.addRoute))

            message.info({
                content:
                    "Для построения маршрута Вам нужно выбрать начальную и конечную точки",
                duration: 3,
            })
        }
    }

    const handleDeleteRoute = () => {
        deleteRoutes()
        dispatch(setClickType(EClickType.null))
    }

    const handleViewAllPhotos = () => {
        viewAllPhotos()
        dispatch(openDrawer())
    }

    return (
        <Footer>
            <Row>
                {routes?.length > 0 && (
                    <Popconfirm
                        title="Удалить маршрут?"
                        okText="Да"
                        cancelText="Нет"
                        onConfirm={handleDeleteRoute}
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            className={styles.deleteBtn}
                        />
                    </Popconfirm>
                )}
                <Button
                    icon={<RiseOutlined />}
                    onClick={handleRouteBtn}
                    className={cl(styles.routeBtn, {
                        [styles.routeBtnActive]: click === EClickType.addRoute,
                        [styles.routeBtnHasRoutes]: routes?.length > 0,
                    })}
                />
            </Row>
            <UploadButton />
            <Badge
                count={photos.filter((photo) => !photo.viewed).length}
                overflowCount={10}
                size="small"
                color="geekblue"
            >
                <Button
                    icon={<PictureOutlined />}
                    onClick={handleViewAllPhotos}
                />
            </Badge>
        </Footer>
    )
}
