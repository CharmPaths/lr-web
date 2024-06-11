import { UploadOutlined } from "@ant-design/icons"
import { Button, Upload } from "antd"
import { message } from "antd/lib"
import type { UploadProps } from "antd/lib/upload/interface"
import exif from "exifr"
import { v4 as uuidv4 } from "uuid"

import { useFiles } from "context/FileContext"
import { usePhotos } from "hooks/usePhotos"
import { useAppDispatch } from "store/hooks"
import { setActivePhoto } from "store/slices/activePhoto"
import { openModal } from "store/slices/modalToChangePhotoInfo"
import { EStatus, IPhoto } from "utils/types"

import styles from "./UploadButton.module.css"

export const UploadButton = () => {
    const { addImage } = useFiles()
    const dispatch = useAppDispatch()
    // Берем функцию для добавления фотографии
    const { addPhoto } = usePhotos()

    // Описываем функцию для загрузки фотографии с устройства в приложение
    const onFileChange: UploadProps<File>["beforeUpload"] = async (photo) => {
        const data = await exif.gps(photo)

        if (!data || !data?.latitude || !data?.longitude) {
            message.warning({
                content: "В загруженной фотографии нет координат",
            })
        }

        const id = uuidv4()

        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            if (e.target && typeof e.target.result === "string") {
                addImage(id, e.target.result)
            }
        }
        fileReader.readAsDataURL(photo)

        // формируем объект, который запишем в redux-toolkit в photos и в indexDB
        const photoObj: IPhoto = {
            id: id,
            title: "",
            description: "",
            latitude: data?.latitude ?? null,
            longitude: data?.longitude ?? null,
            status: EStatus.success,
            viewed: false,
            altitude: 0,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
            timeStamp: Date.now(),
        }

        // Добавляем фотографию и все данные о ней в хранилища
        addPhoto(photoObj)
        dispatch(setActivePhoto(id))
        dispatch(openModal(photoObj))

        // Выводим сообщение об успешном завершении операции по добавлению фотографии в приложение
        message.success({ content: "Фотография успешно добавлена" })
    }

    return (
        <Upload<File>
            className={styles.uploadBtn}
            beforeUpload={onFileChange}
            fileList={[]}
        >
            <Button icon={<UploadOutlined />}>Загрузить фотографию</Button>
        </Upload>
    )
}
