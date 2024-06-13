import { ConfigProvider } from "antd"
import ru_RU from "antd/lib/locale/ru_RU"
import { Provider } from "react-redux"

import { ImageLibrary } from "components/ImageLibrary/ImageLibrary"
import { Map } from "components/Map"
import { ModalChangePhotoInfo } from "components/ModalChangePhotoInfo/ModalChangePhotoInfo"
import { Toolbar } from "components/Toolbar/Toolbar"
import { Utils } from "components/Utils/Utils"
import { FileProvider } from "context/FileContext"
import { useDataBaseInitialStatuses } from "hooks/useDataBaseInitialStatuses"
import { store } from "store/rootReducer"

import "leaflet/dist/leaflet.css"

export function App() {
    useDataBaseInitialStatuses()

    return (
        <ConfigProvider locale={ru_RU}>
            <Provider store={store}>
                <FileProvider>
                    <Map />
                    <ModalChangePhotoInfo />
                    <ImageLibrary />
                    <Utils />
                    <Toolbar />
                </FileProvider>
            </Provider>
        </ConfigProvider>
    )
}
