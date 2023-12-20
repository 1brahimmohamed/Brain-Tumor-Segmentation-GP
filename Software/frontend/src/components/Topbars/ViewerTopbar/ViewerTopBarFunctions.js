
export const fullScreenToggle = () => {
    const elem = document.getElementById("root");
    if (!document.fullscreenElement) {
        elem.requestFullscreen().then(r => console.log(r));
    } else {
        document.exitFullscreen().then(r => console.log(r));
    }
};

