export const showAppLoader = () => {
    const loader = document.getElementById("app-loader")
    if (loader) {
        loader.style.display = "flex"
        loader.style.opacity = "1"
    }
}

export const hideAppLoader = () => {
    const loader = document.getElementById("app-loader")
    if (loader) {
        loader.style.opacity = "0"
        loader.style.transition = "opacity 0.6s ease"

        setTimeout(() => {
            loader.style.display = "none"
        }, 800)
    }
}
