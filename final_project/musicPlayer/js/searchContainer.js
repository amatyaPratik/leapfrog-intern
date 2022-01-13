searchbar.addEventListener("click", () => {
  searchContainer.style.left = "0px";
  toggleSuggestionsFront();
});
searchbar.addEventListener("input", (e) => {
  findSong(e.target.value);
});

searchbar.addEventListener("blur", () => {
  searchbar.value = "";
  searchContainer.style.left = "-160px";
  toggleSuggestionsBack();
});

searchContainer.addEventListener("mousedown", (e) => {
  if (e.target.className === "suggestion") {
    stopPlaylistMode();

    songIndex = +e.target.getAttribute("songindex");
    loadSong(songs[songIndex]);
    const isPlaying = musicContainer.classList.contains("playing");

    if (!isPlaying) {
      setupContext();
    }
    playSong();

    searchbar.value = "";
    findSong("");
    toggleSuggestionsBack();
  } else if (e.target.className === "add-to-playlist") {
    updateSelectTag(
      getBoundary(e.target).top,
      getBoundary(e.target.parentNode).right,
      e.target.parentNode.getAttribute("songindex")
    );
  }
});
searchContainer.addEventListener("mouseover", (e) => {
  if (e.target.className === "suggestion") {
    playListSound();
  }
});

function updateSelectTag(top, left, songInd) {
  const playlistSelect = document.getElementById("playlist-select");

  playlistSelect.style.top = top + "px";
  playlistSelect.style.left = left + "px";
  playlistSelect.setAttribute("songindex", songInd);
  playlistSelect.setAttribute("tabindex", 1);
  setTimeout(() => {
    playlistSelect.focus();
  }, 0);
}
