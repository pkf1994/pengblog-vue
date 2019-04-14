export const SetCookie = (name, value, keepDay) => {
    let date = new Date();
    let keepTime = keepDay*3600*24*1000
    date.setTime(date.getTime() + keepTime)
    document.cookie = name + '=' + value +'; expires=' + date.toGMTString() + '; path=/;'
}

export const DeleteCookie = (name) => {
    SetCookie(name,'',-1)
}

export const ReadCookie = () => {
    let arrStr = document.cookie.split("; ");
    let cookieMap = {}
    for(let i = 0; i < arrStr.length; i++) {
        let coupleStr = arrStr[i].split("=");
        cookieMap[coupleStr[0]] = coupleStr[1]
    }
    return cookieMap
}
