import { Icon } from "leaflet"

export const Mark = (props?: Icon)=> {
    const customIcon = new Icon({
        iconUrl: require("../../assets/icons/marker-icon.png"),
        iconSize: [38, 38],
        ...props,
    })
    return customIcon
}
