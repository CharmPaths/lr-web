// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
import { waitForElementToBeRemoved } from "@testing-library/dom"
import { message, Modal, notification } from "antd"

beforeEach(() => {
    // Fix "TypeError: window.matchMedia is not a function" in antd v4
    // https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    })
})

afterEach(async () => {
    // these antd components are rendered outside of the DOM tree of the component being tested,
    // so they are not automatically cleaned up by the testing-library's cleanup function. This
    // code below destroys those components before the next test is run
    message.destroy()
    notification.destroy()
    // wait for the modal to be removed before starting the next test. it uses a short animation
    const getNotification = () => document.querySelector(".ant-notification")
    if (getNotification()) {
        await waitForElementToBeRemoved(getNotification)
    }
    Modal.destroyAll()
    // wait for the modal to be removed before starting the next test. it uses a short animation
    const getModal = () => document.querySelector(".ant-modal-root")
    if (getModal()) {
        await waitForElementToBeRemoved(getModal)
    }
})
