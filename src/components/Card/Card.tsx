/* eslint-disable @typescript-eslint/ban-ts-comment */
import styles from './Card.module.css'
import { Polyline } from '../../types/types'
import { Button, Col, Row, Skeleton, Typography } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../hooks/redux.hook'
import { ModalChangePhotoInfo } from '../ModalChangePhotoInfo/ModalChangePhotoInfo'
import { openModal } from '../../redux/reducers/modalToChangePhotoInfo.reducer'
import { setActivePhoto } from '../../redux/reducers/activePhoto.reducer'

const { Paragraph } = Typography

export const Card = (props: Polyline) => {
    const { id, image, title, description, latitude, longitude } = props
    const dispatch = useAppDispatch()

    return (
        <Col className={styles.cardContainer}>
            <Row>
                <div className={styles.imageWrapper}>
                    {image ? (
                        <img src={image} alt={title} className={styles.image} />
                    ) : (
                        <Skeleton.Button
                            style={{ width: 300, height: 200 }}
                            block
                        />
                    )}

                    <Button
                        className={styles.editIcon}
                        icon={<EditOutlined />}
                        ghost
                        onClick={() => {
                            dispatch(setActivePhoto(id))
                            dispatch(openModal())
                        }}
                    />
                </div>

                <h4 className={styles.title}>{title}</h4>
                <Paragraph
                    className={styles.description}
                    ellipsis={{
                        rows: 4,
                        expandable: true,
                        symbol: 'ещё',
                    }}
                >
                    {description}
                </Paragraph>

                <div className={styles.br} />

                <Col className={styles.coordWrapper}>
                    <Row className={styles.coord}>
                        <span>Широта:</span>{' '}
                        <span>{latitude ?? 'Не указано...'} °</span>
                    </Row>
                    <Row className={styles.coord}>
                        <span>Долгота:</span>{' '}
                        <span>{longitude ?? 'Не указано...'} °</span>
                    </Row>
                </Col>
            </Row>

            <ModalChangePhotoInfo />
        </Col>
    )
}
