/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    ArcGisMapServerImageryProvider,
    Cartesian3,
    Cartographic,
    Color,
    Ellipsoid,
    HorizontalOrigin,
    Math,
    NearFarScalar,
    ScreenSpaceEventType,
    Terrain,
} from 'cesium'
import {
    Viewer,
    Entity,
    BillboardGraphics,
    EntityDescription,
    ImageryLayer,
    ScreenSpaceEventHandler,
    ScreenSpaceEvent,
    PolylineGraphics,
    LabelGraphics,
    LabelCollection,
} from 'resium'
import { useRef, useState } from 'react'
import { UploadButton } from './components/UploadButton/UploadButton'
import { Footer } from './components/Footer/Footer'
import { Button, Drawer, Input, Popover, Row } from 'antd'
import {
    CloseOutlined,
    PictureOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import { Card } from './components/Card/Card'
import styles from './App.module.css'
import { useAppDispatch, useAppSelector } from './hooks/redux.hook'
import { getPhotoInfo } from './redux/actions/getPhotoInfo.action'
import { changePhotoInfo } from './redux/reducers/photo.reducer'
import { closeDrawer, openDrawer } from './redux/reducers/drawerPhoto.reducer'
import { ModalChangePhotoInfo } from './components/ModalChangePhotoInfo/ModalChangePhotoInfo'
import { resetActivePhoto } from './redux/reducers/activePhoto.reducer'
import { parseGPX } from './helpers/parseGPX'

const geodata = `<gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" creator="Oregon 400t" version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd">
  <metadata>
    <link href="http://www.garmin.com">
      <text>Garmin International</text>
    </link>
    <time>2009-10-17T22:58:43Z</time>
  </metadata>
  <trk>
    <name>Example GPX Document</name>
    <trkseg>
      <trkpt lat="47.644548" lon="-122.326897">
        <ele>4.46</ele>
        <time>2009-10-17T18:37:26Z</time>
      </trkpt>
      <trkpt lat="47.644548" lon="-122.326897">
        <ele>4.94</ele>
        <time>2009-10-17T18:37:31Z</time>
      </trkpt>
      <trkpt lat="47.644548" lon="-122.326897">
        <ele>6.87</ele>
        <time>2009-10-17T18:37:34Z</time>
      </trkpt>
    </trkseg>
  </trk>
</gpx>
`

const App = () => {
    const photo = useAppSelector((state) => state.photo.items)
    const drawerPhoto = useAppSelector((state) => state.drawerPhoto)
    const { id: activePhoto } = useAppSelector((state) => state.activePhoto)
    const dispatch = useAppDispatch()
    const viewer = useRef(null)

    const [positions, setPositions] = useState<Cartesian3[]>([
        new Cartesian3(-75, 35, 0),
        new Cartesian3(-125, 35, 0),
        new Cartesian3(-125, 135, 0),
    ])

    const onAddPosition = (x: number, y: number) => {
        if (activePhoto) {
            const item = getPhotoInfo(photo, activePhoto)
            dispatch(
                changePhotoInfo({
                    ...item,
                    id: activePhoto,
                    latitude: x,
                    longitude: y,
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

    const n = parseGPX(geodata)
    console.log(n)

    return (
        <Viewer
            // Пытаюсь заменить глобус Cesium на глобус google
            // sceneMode={scene}
            // Отвечает за отображение звезд
            skyBox={false}
            fullscreenButton={false}
            homeButton={false}
            vrButton={false}
            baseLayerPicker={false}
            navigationHelpButton={false}
            sceneModePicker={false}
            geocoder={false}
            // globe={false} если поставить в false, то пропадет вся Земля
            // infoBox={false} Если поставить в false, то почему-то будет падать в ошибкой. Только мое предположение, что из-за отсутствия access токена
            selectionIndicator={false}
            timeline={false}
            projectionPicker={false}
            // Убирает отображение нижнего левого круглого календаря/циферблата (не знаю как называть)
            animation={false}
            clockViewModel={undefined}
            imageryProviderViewModels={undefined}
            // maximumRenderTimeChange={Infinity}
            requestRenderMode
            full
            useBrowserRecommendedResolution
            ref={viewer}
            // terrain={Terrain.fromWorldTerrain()}
        >
            <ScreenSpaceEventHandler>
                <ScreenSpaceEvent
                    action={(e) => {
                        // @ts-ignore
                        const { x, y } = e.position
                        console.log(e)

                        const cartesian33 = new Cartesian3(x, y, 0)
                        const a = new Ellipsoid(x, y).cartesianToCartographic(
                            cartesian33
                        )
                        console.log(a)
                        // TODO: Есть проблема с широтой (latitude). Когда мы создаем объект типа Cartesian3 и затем из него переводим в Cartographic, чтобы получить широту и долготу, широта всегда равна 0 (какие бы я способы не применял). И у меня уже кончились догадки почему это может происходить

                        const cartographic =
                            Cartographic.fromCartesian(cartesian33)
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

                <ImageryLayer
                    imageryProvider={ArcGisMapServerImageryProvider.fromUrl(
                        'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'
                    )}
                />

                {photo.map((info) => (
                    <Entity
                        key={info.timeStamp}
                        name={info.title}
                        position={Cartesian3.fromDegrees(
                            info.latitude,
                            info.latitude
                        )}
                    >
                        {/* Background фото */}
                        <BillboardGraphics
                            image={info.canvas ?? info.image ?? ''}
                            width={100}
                            height={100}
                            scale={1.0}
                            eyeOffset={Cartesian3.ZERO}
                            horizontalOrigin={HorizontalOrigin.CENTER}
                            color={Color.WHITE}
                            alignedAxis={Cartesian3.ZERO}
                            scaleByDistance={
                                new NearFarScalar(1.5e2, 1.0, 1.5e7, 0.5)
                            }
                        />
                        <EntityDescription>
                            <div>{info.description}</div>
                        </EntityDescription>
                    </Entity>
                ))}

                <Drawer
                    width="100vw"
                    open={drawerPhoto.isOpen}
                    title={
                        <div className={styles.drawerContent}>
                            <h2 className={styles.drawerTitle}>
                                Загруженные фотографии
                            </h2>
                            <Popover
                                content={
                                    <div className={styles.drawerSearchWrapper}>
                                        <Row>
                                            <Input placeholder="Поиск по названию фотографии" />
                                        </Row>
                                    </div>
                                }
                                trigger="click"
                                placement="bottomLeft"
                            >
                                <Button
                                    icon={<SearchOutlined />}
                                    type="text"
                                    style={{ color: '#f4f4f4' }}
                                />
                            </Popover>
                        </div>
                    }
                    style={{ backgroundColor: '#262626', color: '#F4F4F4' }}
                    closeIcon={<CloseOutlined style={{ color: '#f4f4f4' }} />}
                    onClose={() => dispatch(closeDrawer())}
                >
                    <Row>
                        {photo.length > 0 ? (
                            photo.map((item) => (
                                <Card key={item.id} {...item} />
                            ))
                        ) : (
                            <h3 className={styles.drawerEmptyContent}>
                                У Вас пока нет загруженных фотографий
                            </h3>
                        )}
                    </Row>
                </Drawer>

                <ModalChangePhotoInfo />

                <Footer>
                    <>
                        <UploadButton />
                        <Button
                            icon={<PictureOutlined />}
                            onClick={() => dispatch(openDrawer())}
                        />
                    </>
                </Footer>
            </ScreenSpaceEventHandler>
        </Viewer>
    )
}

export default App
