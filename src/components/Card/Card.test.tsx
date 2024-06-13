import { render, screen } from "@testing-library/react"
import { PropsWithChildren } from "react"
import { Provider } from "react-redux"

import { store } from "store/rootReducer"
import { EStatus } from "utils/types"

import { Card, Props } from "./Card"

const props: Props = {
    imageSrc: "https://example.com/image.jpg",
    id: 1,
    title: "Title",
    description: "Description",
    latitude: 1,
    longitude: 1,
    status: EStatus.success,
    viewed: true,
    altitude: 0,
    accuracy: 0,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
    timeStamp: new Date().getTime(),
}

const ReduxProvider = ({
    children,
}: PropsWithChildren<Record<string, unknown>>): JSX.Element => (
    <Provider store={store}>{children}</Provider>
)
describe("Card", () => {
    it("should render without crashing", async () => {
        render(
            <ReduxProvider>
                <Card {...props} />
            </ReduxProvider>
        )
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const image = await screen.findByAltText(props.title!)
        expect(image).toBeInTheDocument()
    })
})
