import { Cartesian3, Color, HorizontalOrigin, NearFarScalar } from 'cesium'
import { Entity, BillboardGraphics, EntityDescription } from 'resium'
import { useAppSelector } from '../redux/hooks'
import { photosSelector } from '../redux/slices/photos'
import { drawMark } from '../helpers/drawMark'
import { useFiles } from '../context/FileContext'

export const ImageTags = () => {
    const photos = useAppSelector(photosSelector)
    const { images } = useFiles()

    return (
        <>
            {photos.map((info) => (
                <Entity
                    key={info.timeStamp}
                    name={info.title}
                    position={Cartesian3.fromDegrees(
                        info.latitude,
                        info.latitude,
                    )}
                >
                    {/* Background фото */}
                    <BillboardGraphics
                        image={drawMark(images[info.id])}
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
        </>
    )
}
