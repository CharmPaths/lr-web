import { UploadButton } from './UploadButton/UploadButton'
import { Footer } from './Footer/Footer'
import { Button } from 'antd'
import { PictureOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../redux/hooks'
import { openDrawer } from '../redux/slices/drawerPhoto.'

export const Toolbar = () => {
    const dispatch = useAppDispatch()

    return (
        <Footer>
            <UploadButton />
            <Button
                icon={<PictureOutlined />}
                onClick={() => dispatch(openDrawer())}
            />
        </Footer>
    )
}
