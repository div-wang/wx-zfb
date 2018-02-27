const ua = navigator.userAgent.toLowerCase()


const is_weChat = function () {
    if (/micromessenger/i.test(ua)) {
        return true
    } else {
        return false
    }
}

const is_qq = function () {
    if (/qq/i.test(ua)) {
        return true
    } else {
        return false
    }
}

const is_qqBrowser = function () {
    if (/mqqbrowser/i.test(ua)) {
        return true
    } else {
        return false
    }
}

const is_android = function () {
    if (ua.match(/(android|symbianos)/i)) {
        return true
    } else {
        return false
    }
}

const is_ios = function () {
    if (/iphone|ipad|ipod/.test(ua)) {
        return true
    } else {
        return false
    }
}

// alert(ua + '\nqq:' + is_qq() + '\nwx:' + is_weChat() + '\nios:' + is_ios() + '\nandroid:' + is_android() + '\nqqBrowser:' + is_qqBrowser())

export default {
    iso: is_ios,
    android: is_android,
    qq: is_qq,
    wechat: is_weChat,
    qqBrowser: is_qqBrowser
}