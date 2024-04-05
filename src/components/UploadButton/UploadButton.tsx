import { App, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import exif from 'exif-js'
import styles from './UploadButton.module.css'
import { useState } from 'react'
import { drawMark } from '../../helpers/drawMark'
import { useAppDispatch } from '../../hooks/redux.hook'
import { addPhoto } from '../../redux/reducers/photo.reducer'
import { openModal } from '../../redux/reducers/modalToChangePhotoInfo.reducer'
import { setActivePhoto } from '../../redux/reducers/activePhoto.reducer'

export const UploadButton = () => {
    const { notification } = App.useApp()
    const [fileList, setFileList] = useState([])
    const dispatch = useAppDispatch()

    const getPhotoLocation = (photo: File) => {
        exif.getData(photo as unknown as string, function () {
            console.log(photo)

            const latitude = exif.getTag(photo, 'GPSLatitude')
            const longitude = exif.getTag(photo, 'GPSLongitude')

            if (latitude && longitude) {
                const lat = latitude[0] + latitude[1] / 60 + latitude[2] / 3600
                const lon =
                    longitude[0] + longitude[1] / 60 + longitude[2] / 3600

                const mark = drawMark()

                const id = Math.floor(Math.random() * 999999999999999)

                dispatch(setActivePhoto(id))
                dispatch(
                    addPhoto({
                        id: id,
                        title: '',
                        description: '',
                        canvas: mark?.canvas ?? null,
                        image: mark?.image,
                        latitude: lat,
                        longitude: lon,
                        altitude: 0,
                        accuracy: null,
                        altitudeAccuracy: null,
                        heading: null,
                        speed: null,
                        timeStamp: Date.now(),
                    })
                )
                dispatch(openModal())
                setFileList([])

                return mark?.canvas
            } else {
                notification.warning({
                    message: 'В загруженной фотографии нет координат',
                })
                setFileList([])
            }
        })
    }

    return (
        <Upload
            className={styles.uploadBtn}
            customRequest={(file) => {
                if (file) {
                    getPhotoLocation(file.file as unknown as File)
                }
            }}
            fileList={fileList}
        >
            <Button icon={<UploadOutlined />}>Загрузить фотографию</Button>
        </Upload>
    )
}
