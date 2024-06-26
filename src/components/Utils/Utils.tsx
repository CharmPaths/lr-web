import { InfoBlock } from "./components/InfoBlock/InfoBlock"
import { PolylinesControlUnit } from "./components/PolylinesControlUnit/PolylinesControlUnit"
import styles from "./Utils.module.css"

export const Utils = () => {
    return (
        <div className={styles.utilsWrapper}>
            <InfoBlock />
            <PolylinesControlUnit />
        </div>
    )
}
