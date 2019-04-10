export const CurrentBrowserEdit = () => {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Firefox') !== -1){
        return  FIREFOX
    }
    if (userAgent.indexOf('Edge') !== -1){
        return EDGE
    }
    if (userAgent.indexOf('Chrome') !== -1){
        return CHROME
    }
    if (userAgent.indexOf('Safari') !== -1) {
        return SAFARI
    }
    return UNKNOW_BROWSER
}

export const CHROME = 'Chrome'
export const SAFARI = 'Safari'
export const EDGE = 'Edge'
export const FIREFOX = 'Firefox'
export const UNKNOW_BROWSER = 'unknow browser'