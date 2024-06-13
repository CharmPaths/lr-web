import { DeleteOutlined, SignatureOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Row, message } from "antd/lib"
import cn from "classnames"
import { Helmet } from "react-helmet"

import { usePolylines } from "hooks/usePolylines"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { clickType, setClickType } from "store/slices/click"
import { polylinesSelector } from "store/slices/polylines"
import { EClickType } from "utils/types"

import styles from "./PolylinesControlUnit.module.css"

export const PolylinesControlUnit = () => {
    const polylines = useAppSelector(polylinesSelector)
    const { deletePolylines } = usePolylines()
    const click = useAppSelector(clickType)
    const dispatch = useAppDispatch()

    const handlePolylineBtn = () => {
        if (click === EClickType.addPolyline) {
            dispatch(setClickType(EClickType.null))

            message.info({
                content: "Построение маршрута завершено",
                duration: 1.5,
            })
        } else {
            dispatch(setClickType(EClickType.addPolyline))

            message.info({
                content: "Вы строите маршрут по клику на карту",
                duration: 3,
            })
        }
    }

    return (
        <>
            {click === EClickType.addPolyline && (
                <Helmet title="Map App | Добавление точек на карту" />
            )}

            <Row style={{ gap: 5 }}>
                <Button
                    icon={<SignatureOutlined style={{ fontSize: 20 }} />}
                    onClick={handlePolylineBtn}
                    className={cn({
                        [styles.activeBtn]: click === EClickType.addPolyline,
                    })}
                />

                {polylines.length > 0 && (
                    <Popconfirm
                        title="Вы уверены, что хотите удалить все линии?"
                        placement="bottom"
                        okText="Да"
                        cancelText="Нет"
                        onConfirm={() => {
                            dispatch(setClickType(EClickType.null))
                            deletePolylines()
                        }}
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                )}
            </Row>
        </>
    )
}
