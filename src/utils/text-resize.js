export function textResize(string, width) {
    if (width <= 320) {
        return string.substring(0, 80) + '...';   
    } else if (width <= 375) {
        return string.substring(0, 110) + '...';
    } else if (width <= 425) {
        return string.substring(0, 130) + '...';
    } else if (width <= 768) {
        return string.substring(0, 180) + '...';
    } else if (width <= 1024) {
        return string.substring(0, 60) + '...';
    } else {
        return string.substring(0, 120) + '...';
    }
}

export function textResizeSmall(string, width) {
    if (width <= 375) {
        return string.substring(0, 60) + '...';   
    } else if (width <= 425) {
        return string.substring(0, 120) + '...';
    } else if (width <= 1023) {
        return string.substring(0, 165) + '...';
    } else if (width = 1024) {
        return string.substring(0, 45) + '...';
    } else {
        return string.substring(0, 110) + '...';
    }
}

