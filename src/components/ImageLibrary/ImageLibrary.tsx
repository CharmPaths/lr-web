import { CloseOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Drawer, Input, Popover, Row } from "antd"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"

import { Card } from "components/Card/Card"
import { useFiles } from "context/FileContext"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { drawerSelector } from "store/selectors"
import { resetActivePhoto } from "store/slices/activePhoto"
import { closeDrawer } from "store/slices/drawerPhoto."
import { photosSelector } from "store/slices/photos"
import { IPhoto } from "utils/types"

import styles from "./ImageLibrary.module.css"

export const ImageLibrary = () => {
    const photos = useAppSelector(photosSelector)
    const [filterPhotos, setFilterPhotos] = useState<IPhoto[]>(photos)

    const drawerPhoto = useAppSelector(drawerSelector)
    const dispatch = useAppDispatch()
    const { images } = useFiles()

    useEffect(() => {
        setFilterPhotos(photos)
    }, [photos])

    return (
        <>
            {drawerPhoto && <Helmet title="Map App | Фотографии" />}
            <Drawer
                width="100vw"
                open={drawerPhoto}
                title={
                    <div className={styles.drawerContent}>
                        <h2 className={styles.drawerTitle}>
                            Загруженные фотографии
                        </h2>
                        <Popover
                            content={
                                <div className={styles.drawerSearchWrapper}>
                                    <Row>
                                        <Input
                                            placeholder="Поиск по названию фотографии"
                                            onChange={(e) => {
                                                if (e?.target?.value === "") {
                                                    setFilterPhotos(photos)
                                                } else {
                                                    setFilterPhotos(
                                                        photos.filter((photo) =>
                                                            photo.title
                                                                ?.toLowerCase()
                                                                ?.includes(
                                                                    e?.target?.value?.toLowerCase()
                                                                )
                                                        )
                                                    )
                                                }
                                            }}
                                        />
                                    </Row>
                                </div>
                            }
                            trigger="click"
                            placement="bottomLeft"
                        >
                            <Button
                                icon={<SearchOutlined />}
                                type="text"
                                style={{ color: "#f4f4f4" }}
                            />
                        </Popover>
                    </div>
                }
                style={{ backgroundColor: "#262626", color: "#F4F4F4" }}
                closeIcon={<CloseOutlined style={{ color: "#f4f4f4" }} />}
                onClose={() => {
                    dispatch(resetActivePhoto())
                    dispatch(closeDrawer())
                }}
            >
                <ul className={styles.photoList}>
                    {filterPhotos.length > 0 ? (
                        filterPhotos.map((photo) => (
                            <Card
                                key={photo.id}
                                imageSrc={images[photo.id]}
                                {...photo}
                            />
                        ))
                    ) : (
                        <h3 className={styles.drawerEmptyContent}>
                            У Вас пока нет загруженных фотографий
                        </h3>
                    )}
                </ul>
            </Drawer>
        </>
    )
}
