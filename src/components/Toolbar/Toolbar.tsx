import { UploadButton } from "../UploadButton/UploadButton"
import { Footer } from "../Footer/Footer"
import { Button, Row } from "antd"
import { DeleteOutlined, PictureOutlined, RiseOutlined } from "@ant-design/icons"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { openDrawer } from "../../redux/slices/drawerPhoto."
import { Badge, Popconfirm, message } from "antd/lib"
import { photosSelector } from "../../redux/slices/photos"
import { usePhotos } from "../../hooks/usePhotos.hook"
import { clickType, setClickType } from "../../redux/slices/click"
import { EClickType } from "../../types/types"
import styles from './Toolbar.module.css'
import cl from 'classnames'
import { routesSelector } from "../../redux/slices/routes"
import { useRoutes } from "../../hooks/useRoutes.hook"

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
                {routes?.length > 0 && 
                   <Popconfirm 
                        title="Удалить маршрут?" 
                        okText="Да"
                        cancelText='Нет'
                        onConfirm={handleDeleteRoute}
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            className={styles.deleteBtn}
                        />
                   </Popconfirm>
                }
                <Button
                    icon={<RiseOutlined />}
                    onClick={handleRouteBtn}
                    className={cl(styles.routeBtn, {
                        [styles.routeBtnActive]: click === EClickType.addRoute,
                        [styles.routeBtnHasRoutes]: routes?.length > 0
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
