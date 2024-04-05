import { Button, Input, Modal, Popover, Row } from 'antd'
import styles from './ModalChangePhotoInfo.module.css'
import TextArea from 'antd/es/input/TextArea'
import { AimOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook'
import {
    changeDescription,
    changeTitle,
    closeModal,
    resetModal,
} from '../../redux/reducers/modalToChangePhotoInfo.reducer'
import { changePhotoInfo } from '../../redux/reducers/photo.reducer'
import { closeDrawer } from '../../redux/reducers/drawerPhoto.reducer'
import { getPhotoInfo } from '../../redux/actions/getPhotoInfo.action'
import { useEffect } from 'react'

export const ModalChangePhotoInfo = () => {
    const { id } = useAppSelector((state) => state.activePhoto)
    const photo = useAppSelector((state) => state.photo.items)
    const modal = useAppSelector((state) => state.modalToChangePhotoInfo)
    const photoInfo = getPhotoInfo(photo, id)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(changeTitle(photoInfo?.title ?? ''))
        dispatch(changeDescription(photoInfo?.description ?? ''))
    }, [photoInfo?.title, photoInfo?.description])

    return (
        <Modal
            open={modal.isOpen}
            title={
                <h5 className={styles.modalTitle}>
                    Редактирование информации о фотографии
                </h5>
            }
            onCancel={() => dispatch(closeModal())}
            footer={null}
        >
            <h6 className={styles.modalInputLabel}>Название фотографии</h6>
            <Input
                value={modal.title}
                onChange={(e) => dispatch(changeTitle(e.target.value))}
                placeholder="Введите название для фотографии"
            />

            <h6 className={styles.modalInputLabel}>Описание фотографии</h6>
            <TextArea
                autoSize
                value={modal.description}
                onChange={(e) => dispatch(changeDescription(e.target.value))}
                placeholder="Введите описание для фотографии"
            />
            <Row>
                <Popover
                    content={
                        <div style={{ maxWidth: 230 }}>
                            <ExclamationCircleOutlined
                                style={{ color: '#4096ff' }}
                            />
                            &nbsp; Для того, чтобы указать точку, нажмите левую
                            кнопку мыши по карте
                        </div>
                    }
                    trigger="hover"
                    placement="top"
                >
                    <Button
                        icon={<AimOutlined />}
                        className={styles.btn}
                        onClick={() => {
                            dispatch(closeDrawer())
                            dispatch(
                                changePhotoInfo({
                                    ...photoInfo,
                                    id: id,
                                    title: modal.title,
                                    description: modal.description,
                                })
                            )
                            dispatch(resetModal())
                        }}
                    >
                        Указать точку на карте
                    </Button>
                </Popover>
            </Row>

            <Row className={styles.modalFooter}>
                <Button
                    type="primary"
                    onClick={() => {
                        dispatch(
                            changePhotoInfo({
                                ...photoInfo,
                                id: id,
                                title: modal.title,
                                description: modal.description,
                            })
                        )
                        dispatch(resetModal())
                    }}
                >
                    Сохранить изменения
                </Button>
                <Button onClick={() => dispatch(resetModal())}>Отменить</Button>
            </Row>
        </Modal>
    )
}
