import styles from "./Utils.module.css"
import { InfoBlock } from "./components/InfoBlock/InfoBlock"
import { Polylines } from "./components/Polylines/Polylines"

export const Utils = (): JSX.Element => {
    return (
        <div className={styles.utilsWrapper}>
            <InfoBlock />
            <Polylines />
        </div>
    )
}
