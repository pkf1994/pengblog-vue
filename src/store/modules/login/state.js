export default {
    loginMode: 'common',
    alreadyLogin: false,
    loading: false,
    currentUser: undefined,
    common: {
        username: {
            value: undefined,
            showWarn: false,
            warnMsg: '格式错误'
        },
        password: {
            value: undefined,
            showWarn: false,
            warnMsg: '格式错误'
        }
    },
    dynamic: {
        gettingSms: false,
        secondToNextGetting:  -1,
        haveGotSmsOnce: false,
        phoneNumber: {
            value: undefined,
            showWarn: false,
            warnMsg: '格式错误'
        },
        dynamicPassword: {
            value: undefined,
            showWarn: false,
            warnMsg: '格式错误'
        }
    }
}