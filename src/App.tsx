import { ArcGisMapServerImageryProvider } from 'cesium'
import { Viewer, ImageryLayer, ScreenSpaceEventHandler } from 'resium'
import { ModalChangePhotoInfo } from './components/ModalChangePhotoInfo/ModalChangePhotoInfo'
import { ImageLibrary } from './components/ImageLibrary'
import { RouteDesigner } from './components/RouteDesigner'
import { ImageTags } from './components/ImageTags'
import { Toolbar } from './components/Toolbar'

const imageryProvider = ArcGisMapServerImageryProvider.fromUrl(
    'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'
)

const App = () => {
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
        >
            <ScreenSpaceEventHandler>
                <ImageryLayer imageryProvider={imageryProvider} />
                <RouteDesigner />
                <ImageTags />
                <ImageLibrary />
                <ModalChangePhotoInfo />
                <Toolbar />
            </ScreenSpaceEventHandler>
        </Viewer>
    )
}

export default App
