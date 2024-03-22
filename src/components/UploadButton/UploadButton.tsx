/* eslint-disable @typescript-eslint/ban-ts-comment */
import { App, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import exif from 'exif-js'
import styles from './UploadButton.module.css'
import { Polyline } from '../../types/data'
import { useState } from 'react'

interface IUploadButtonProps {
    setData: React.Dispatch<React.SetStateAction<Polyline[]>>
}

export const UploadButton = ({ setData }: IUploadButtonProps) => {
    const { notification } = App.useApp()
    const [fileList, setFileList] = useState([])

    const getPhotoLocation = (photo: File) => {
        console.log(photo)

        exif.getData(photo as unknown as string, function () {
            // @ts-ignore
            const latitude = exif.getTag(this, 'GPSLatitude')
            // @ts-ignore
            const longitude = exif.getTag(this, 'GPSLongitude')

            if (latitude && longitude) {
                const lat = latitude[0] + latitude[1] / 60 + latitude[2] / 3600
                const lon =
                    longitude[0] + longitude[1] / 60 + longitude[2] / 3600

                setData((prev: Polyline[]) => [
                    ...prev,
                    {
                        label: '',
                        title: '',
                        description: '',
                        latitude: lat,
                        longitude: lon,
                        altitude: 0,
                        accuracy: null,
                        altitudeAccuracy: null,
                        heading: null,
                        speed: null,
                        timeStamp: Date.now(),
                    },
                ])
                setFileList([])
                console.log(`Latitude: ${lat}, Longitude: ${lon}`)
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
