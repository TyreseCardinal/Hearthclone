function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");

  screens.forEach((screen) => {
    screen.classList.add("hidden");
  });

  const activeScreen = document.getElementById(screenId);

  if (activeScreen) {
    activeScreen.classList.remove("hidden");
  }
}