document.addEventListener("visibilitychange", () => {
    saveVillage();
});

function saveVillage() {
    window.localStorage.setItem("myVillage", JSON.stringify(village));
}