export const DispatchUIEvent = (id,eventType) => {
    let el = document.getElementById(id)
    let e = document.createEvent('UIEvent')
    e.initUIEvent(eventType, true, true, window, 1)
    el && el.dispatchEvent(e)
}
