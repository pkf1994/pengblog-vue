export default {
    managePage: {
        startIndex: window.innerWidth < 500 ? - 8 : - parseInt((window.innerHeight - 200)/54),
        pageScale: window.innerWidth < 500 ? 8 : parseInt((window.innerHeight - 200)/54),
        currentPage: 0,
        maxPage: 1
    }
}