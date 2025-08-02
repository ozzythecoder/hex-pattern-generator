function $(selector) {
    return document.getElementsByClassName(selector)
}

function id(selector) {
    return document.getElementById(selector)
}

$.id = id;

export { $ }