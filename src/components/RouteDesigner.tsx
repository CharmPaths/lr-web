import {
    Cartesian3,
    Cartographic,
    Color,
    Ellipsoid,
    Math,
    ScreenSpaceEventType,
} from 'cesium'
import {
    Entity,
    ScreenSpaceEvent,
    PolylineGraphics,
    LabelGraphics,
    LabelCollection,
} from 'resium'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { photoActions } from '../redux/slices/photos'
import { openDrawer } from '../redux/slices/drawerPhoto.'
import { resetActivePhoto } from '../redux/slices/activePhoto'
import { activePhotoSelector } from '../redux/selectors'

export const RouteDesigner = () => {
    const activePhotoId = useAppSelector(activePhotoSelector)
    const dispatch = useAppDispatch()

    const [positions, setPositions] = useState<Cartesian3[]>([])

    const onAddPosition = (x: number, y: number) => {
        if (activePhotoId) {
            dispatch(
                photoActions.changePhotoInfo({
                    id: activePhotoId,
                    changes: {
                        latitude: x,
                        longitude: y,
                    },
                })
            )
            dispatch(resetActivePhoto())
            dispatch(openDrawer())
        } else {
            setPositions((prevPositions) => [
                ...prevPositions,
                new Cartesian3(x, y, 0),
            ])
        }
    }

    return (
        <>
            <ScreenSpaceEvent
                action={(e) => {
                    if (!('position' in e)) {
                        return
                    }
                    const { x, y } = e.position

                    const cartesian33 = new Cartesian3(x, y, 0)
                    const a = new Ellipsoid(x, y).cartesianToCartographic(
                        cartesian33
                    )
                    console.log(a)
                    // TODO: Есть проблема с широтой (latitude). Когда мы создаем объект типа Cartesian3 и затем из него переводим в Cartographic, чтобы получить широту и долготу, широта всегда равна 0 (какие бы я способы не применял). И у меня уже кончились догадки почему это может происходить

                    const cartographic = Cartographic.fromCartesian(cartesian33)
                    const lat = Math.toDegrees(cartographic.latitude)
                    const lng = Math.toDegrees(cartographic.longitude)

                    onAddPosition(lat, lng)
                }}
                type={ScreenSpaceEventType.LEFT_CLICK}
            />

            <LabelCollection>
                <Entity>
                    <PolylineGraphics
                        material={Color.WHITE}
                        positions={positions}
                    />
                </Entity>
                {positions.map((p, i) => (
                    <Entity key={i} position={p}>
                        <LabelGraphics text={i.toString()} />
                    </Entity>
                ))}
            </LabelCollection>
        </>
    )
}
