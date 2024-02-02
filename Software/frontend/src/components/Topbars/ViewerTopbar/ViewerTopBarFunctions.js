
export const fullScreenToggle = () => {
    const elem = document.getElementById("root");
    if (!document.fullscreenElement) {
        elem.requestFullscreen();
    } else {
        document.exitFullscreen()
    }
};



