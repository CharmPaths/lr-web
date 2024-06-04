import { UploadButton } from "./UploadButton/UploadButton"
import { Footer } from "./Footer/Footer"
import { Button } from "antd"
import { PictureOutlined, RiseOutlined } from "@ant-design/icons"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { openDrawer } from "../redux/slices/drawerPhoto."
import { Badge, message } from "antd/lib"
import { photosSelector } from "../redux/slices/photos"
import { usePhotos } from "../hooks/usePhotos.hook"
import { clickType, setClickType } from "../redux/slices/click"
import { EClickType } from "../types/types"

export const Toolbar = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const photos = useAppSelector(photosSelector)
    const { viewAllPhotos } = usePhotos()
    const click = useAppSelector(clickType)

    return (
        <Footer>
            <Button
                icon={<RiseOutlined />}
                onClick={() => {
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
                }}
                style={{
                    color: click === EClickType.addRoute ? "#4096ff" : "#000",
                    borderColor:
                        click === EClickType.addRoute
                            ? "#4096ff"
                            : "transparent",
                }}
            />
            <UploadButton />
            <Badge
                count={photos.filter((photo) => !photo.viewed).length}
                overflowCount={10}
                size="small"
                color="geekblue"
            >
                <Button
                    icon={<PictureOutlined />}
                    onClick={() => {
                        viewAllPhotos()
                        dispatch(openDrawer())
                    }}
                />
            </Badge>
        </Footer>
    )
}
