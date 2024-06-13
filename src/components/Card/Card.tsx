// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})

import { EditOutlined, EyeOutlined } from "@ant-design/icons"
import { Button, Col, Row, Skeleton, Typography } from "antd"
import { Image } from "antd/lib"

import { useAppDispatch } from "store/hooks"
import { setActivePhoto } from "store/slices/activePhoto"
import { openModal } from "store/slices/modalToChangePhotoInfo"
import { IPhoto } from "utils/types"

import styles from "./Card.module.css"

const { Paragraph, Title } = Typography

export type Props = IPhoto & {
    imageSrc: string
}

export const Card = ({ imageSrc, ...polyline }: Props) => {
    const dispatch = useAppDispatch()
    const { id, title, description, latitude, longitude } = polyline

    return (
        <li className={styles.cardContainer}>
            <Row>
                <div className={styles.imageWrapper}>
                    {imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt={title}
                            className={styles.image}
                            title="Посмотреть"
                            placeholder="Посмотреть"
                            preview={{
                                mask: (
                                    <span>
                                        <EyeOutlined /> Посмотреть
                                    </span>
                                ),
                            }}
                        />
                    ) : (
                        <Skeleton.Button
                            style={{ width: 300, height: 200 }}
                            block
                            active
                        />
                    )}

                    <Button
                        className={styles.editIcon}
                        icon={<EditOutlined />}
                        ghost
                        onClick={() => {
                            dispatch(setActivePhoto(id))
                            dispatch(openModal(polyline))
                        }}
                    />
                </div>

                <Title
                    level={4}
                    ellipsis={{
                        rows: 4,
                        expandable: "collapsible",
                        symbol: (expanded) => (expanded ? "скрыть" : "ещё"),
                    }}
                    className={styles.title}
                >
                    {title}
                </Title>
                <Paragraph
                    className={styles.description}
                    ellipsis={{
                        rows: 4,
                        expandable: "collapsible",
                        symbol: (expanded) => (expanded ? "скрыть" : "ещё"),
                    }}
                >
                    {description}
                </Paragraph>

                <div className={styles.br} />

                <Col className={styles.coordWrapper}>
                    <Row className={styles.coord}>
                        <span>Широта:</span>{" "}
                        <span>{latitude ?? "Не указано..."} °</span>
                    </Row>
                    <Row className={styles.coord}>
                        <span>Долгота:</span>{" "}
                        <span>{longitude ?? "Не указано..."} °</span>
                    </Row>
                </Col>
            </Row>
        </li>
    )
}
