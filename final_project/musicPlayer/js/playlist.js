const playlistsToggleBtn = document.getElementById("playlists-toggle");
const playlistsContainer = document.getElementById("playlists-container");
const playlists = document.getElementsByClassName("playlist");
const createPlaylistBtn = document.getElementById("create-playlist");

/**playlist storage key */
const localStorageKey = "timeless.music";

/** sample collection schema */
// let fetchedPlaylists = JSON.parse(
//   '[{"playlist_name": "Smooth","songs": [{"song_name": "cant stiop"},{"song_name": "cant jump" },{ "song_name": "cant hump"}]},{"playlist_name": "Blues","songs": [{"song_name": "bb queen"},{"song_name": "brothers" },{ "song_name": "jazzy nights"}]}]'
// );

let fetchedPlaylists = [];

playlistsContainer.addEventListener("click", (e) => {
  let oldId;
  if (e.target.className === "playlist-song-count") {
    togglePlaylistSongs(e.target.parentNode.parentNode.parentNode);
  } else if (e.target.className === "play-playlist") {
    playPlaylist(e.target.getAttribute("parent-playlist"));
  } else if (e.target.className === "delete-playlist") {
    deletePlaylist(e.target.getAttribute("parent-playlist"));
  } else if (e.target.className === "playlist-name") {
    e.target.blur();
  } else if (e.target.className === "rename-playlist") {
    oldId = e.target.getAttribute("parent-playlist");

    e.target.parentNode.parentNode.children[0].focus();
    e.target.parentNode.parentNode.children[0].addEventListener(
      "blur",
      (renameEvent) => {
        if (renameEvent.target.value === "") {
          renameEvent.target.value = oldId;
        } else if (
          checkIfNewPlaylist(renameEvent.target.value) &&
          oldId !== "New_Playlist"
        ) {
          const newEmptyPlaylist = document.getElementById(oldId);

          const newPlaylistBtn =
            newEmptyPlaylist.getElementsByClassName("play-playlist")[0];
          newPlaylistBtn.setAttribute(
            "parent-playlist",
            renameEvent.target.value
          );
          const newRenamePlaylistBtn =
            newEmptyPlaylist.getElementsByClassName("rename-playlist")[0];
          newRenamePlaylistBtn.setAttribute(
            "parent-playlist",
            renameEvent.target.value
          );
          const newPlaylistDelBtn =
            newEmptyPlaylist.getElementsByClassName("delete-playlist")[0];
          newPlaylistDelBtn.setAttribute(
            "parent-playlist",
            renameEvent.target.value
          );
          const newPlaylistDD =
            newEmptyPlaylist.getElementsByClassName("playlist-dd")[0];
          newPlaylistDD.setAttribute(
            "parent-playlist",
            renameEvent.target.value
          );

          newEmptyPlaylist.setAttribute("id", renameEvent.target.value);

          const oldPlaylistIndex = idToPlaylistIndex(oldId);
          fetchedPlaylists[oldPlaylistIndex].playlist_name =
            renameEvent.target.value;

          commitChanges();
          updatePlaylistInfoDiv();
          updatePlaylistSelectTag();
        } else if (
          checkIfNewPlaylist(renameEvent.target.value) &&
          oldId === "New_Playlist"
        ) {
          const newEmptyPlaylist = document.getElementById(oldId);

          const newPlaylistBtn =
            newEmptyPlaylist.getElementsByClassName("play-playlist")[0];
          newPlaylistBtn.setAttribute(
            "parent-playlist",
            renameEvent.target.value
          );
          const newRenamePlaylistBtn =
            newEmptyPlaylist.getElementsByClassName("rename-playlist")[0];
          newRenamePlaylistBtn.setAttribute(
            "parent-playlist",
            renameEvent.target.value
          );
          const newPlaylistDelBtn =
            newEmptyPlaylist.getElementsByClassName("delete-playlist")[0];
          newPlaylistDelBtn.setAttribute(
            "parent-playlist",
            renameEvent.target.value
          );
          const newPlaylistDD =
            newEmptyPlaylist.getElementsByClassName("playlist-dd")[0];
          newPlaylistDD.setAttribute(
            "parent-playlist",
            renameEvent.target.value
          );

          newEmptyPlaylist.setAttribute("id", renameEvent.target.value);

          const oldPlaylistIndex = idToPlaylistIndex(oldId);

          fetchedPlaylists[oldPlaylistIndex].playlist_name =
            renameEvent.target.value;

          commitChanges();
          updatePlaylistInfoDiv();
          updatePlaylistSelectTag();
        } else {
          renameEvent.target.blur();
        }
      }
    );
  } else if (e.target.tagName.toLowerCase() === "li") {
    const itemInd = e.target.getAttribute("index");
    const playlistInd = idToPlaylistIndex(
      e.target.parentNode.parentNode.getAttribute("parent-playlist")
    );

    removeSongFromPlaylist(itemInd, playlistInd);
  } else {
  }
});

playlistsToggleBtn.addEventListener("click", togglePlaylists);

createPlaylistBtn.addEventListener("click", () => {
  createPlaylist();
});

function togglePlaylists() {
  if (getBoundary(playlistsContainer).right - screen.width === 0) {
    playlistsContainer.style.right = "-26rem";
    createPlaylistBtn.style.right = "-26rem";
  } else {
    playlistsContainer.style.right = "0";
    createPlaylistBtn.style.right = "1.3rem";
  }
}

function togglePlaylistSongs(parentNode) {
  if (getBoundary(parentNode.children[1]).height == 0) {
    parentNode.children[1].style.height = "auto";
  } else {
    parentNode.children[1].style.height = "0px";
  }
}

function idToPlaylistIndex(playlistId) {
  let toBeReturnedPlaylistIndex;
  fetchedPlaylists.forEach((entry, index) => {
    if (entry.playlist_name == playlistId) {
      toBeReturnedPlaylistIndex = index;
    }
  });
  return toBeReturnedPlaylistIndex;
}
function playPlaylist(playlistId) {
  const chosenPlaylistIndex = idToPlaylistIndex(playlistId);

  playlistArray = fetchedPlaylists[chosenPlaylistIndex].songs;
  if (playlistArray.length === 0) {
    return;
  }

  playlistSongIndex = 0;
  playlistMode = true;

  const playlists = document.getElementsByClassName("playlist");
  for (let i = 0; i < playlists.length; i++) {
    playlists[i].classList.remove("active");
  }
  document.getElementById(playlistId).classList.add("active");

  loadSong(songs[playlistArray[playlistSongIndex]]);

  const isPlaying = musicContainer.classList.contains("playing");

  if (!isPlaying) {
    setupContext();
  }
  displayHint(`Playing track: ${playlistId}`);
  playSong();
}

function deletePlaylist(playlistId) {
  const chosenPlaylistIndex = idToPlaylistIndex(playlistId);
  fetchedPlaylists.splice(chosenPlaylistIndex, 1);
  commitChanges();
  fetchedPlaylists = JSON.parse(
    localStorage.getItem(`${localStorageKey}.playlists`)
  );

  const playlistsContainer = document.getElementById("playlists-container");
  for (let i = 0; i < playlistsContainer.children.length; i++) {
    if (playlistsContainer.children[i].getAttribute("id") == playlistId) {
      playlistsContainer.removeChild(playlistsContainer.children[i]);
    }
  }
}

function checkIfNewPlaylist(desiredPlaylistName = "New Playlist") {
  if (desiredPlaylistName === "New Playlist") {
    let newPlaylist = true;
    const currentPlaylists = document.getElementsByClassName("playlist");
    for (let i = 0; i < currentPlaylists.length; i++) {
      if (
        currentPlaylists[i].getElementsByClassName("playlist-name")[0].value ==
          "New Playlist" ||
        currentPlaylists[i].getElementsByClassName("playlist-name")[0].value ==
          "New_Playlist"
      ) {
        newPlaylist = false;
      }
    }
    if (newPlaylist) {
      return true;
    } else {
      return false;
    }
  } else {
    if (fetchedPlaylists.length === 0) {
      return true;
    } else {
      let newPlaylist = true;
      const currentPlaylists = document.getElementsByClassName("playlist");
      fetchedPlaylists.forEach((entry, index) => {
        if (entry.playlist_name === desiredPlaylistName) {
          newPlaylist = false;
        }
      });

      if (newPlaylist) {
        return true;
      } else {
        return false;
      }
    }
  }
}

function updatePlaylistInfoDiv() {
  const playlists = document.getElementsByClassName("playlist");

  for (let i = 0; i < playlists.length; i++) {
    playlists[i].getElementsByClassName("playlist-img")[0].textContent =
      playlists[i].getElementsByClassName("playlist-name")[0].value[0];
    playlists[i].getElementsByClassName(
      "playlist-song-count"
    )[0].textContent = `${fetchedPlaylists[i].songs.length} songs`;

    let containedSongNameLi = "<ul>";
    fetchedPlaylists[i].songs.forEach((playlistSongIndex, index) => {
      containedSongNameLi += `<li index=${index}>${songs[playlistSongIndex]}</li>`;
    });
    containedSongNameLi += "</ul>";
    playlists[i].getElementsByClassName("playlist-dd")[0].innerHTML =
      containedSongNameLi;
  }
}

function updatePlaylistSelectTag() {
  // removing old Select tag;
  let oldPlaylistSelect = document.getElementById("playlist-select");
  if (oldPlaylistSelect) {
    for (let i = 0; i < document.body.children.length; i++) {
      if ("playlist-select" === document.body.children[i].getAttribute("id")) {
        document.body.removeChild(document.body.children[i]);
      }
    }
  }

  let playlistSelect = document.createElement("select");
  playlistSelect.setAttribute("id", "playlist-select");

  let defaultOption = document.createElement("option");
  defaultOption.textContent = "choose a playlist";
  defaultOption.setAttribute("selected", true);
  playlistSelect.appendChild(defaultOption);

  for (let i = 0; i < fetchedPlaylists.length; i++) {
    let playlistOption = document.createElement("option");
    playlistOption.setAttribute("value", i);
    playlistOption.textContent = fetchedPlaylists[i].playlist_name;

    playlistSelect.appendChild(playlistOption);
  }

  playlistSelect.addEventListener("blur", () => {
    playlistSelect.style.left = "-400px";
  });

  playlistSelect.addEventListener("change", (e) => {
    updatePlaylistSelectTag();
    addSongToPlaylist(e.target.getAttribute("songindex"), e.target.value);
  });
  document.body.appendChild(playlistSelect);
}

function displayPlaylists(fetchedPlaylist) {
  const newPlaylist = document.createElement("div");
  newPlaylist.classList.add("playlist");
  if (fetchedPlaylist) {
    newPlaylist.setAttribute("id", fetchedPlaylist.playlist_name);
  } else {
    newPlaylist.setAttribute("id", "New_Playlist");
  }

  const newPlaylistClickable = document.createElement("div");
  newPlaylistClickable.classList.add("playlist-clickable");

  const newPlaylistImg = document.createElement("div");
  newPlaylistImg.classList.add("playlist-img");

  if (fetchedPlaylist)
    newPlaylistImg.innerHTML = fetchedPlaylist.playlist_name[0];
  else {
    newPlaylistImg.innerHTML = "-";
  }

  const newPlaylistInfo = document.createElement("div");
  newPlaylistInfo.classList.add("playlist-info");

  const newPlaylistName = document.createElement("input");
  newPlaylistName.classList.add("playlist-name");
  if (fetchedPlaylist) newPlaylistName.value = fetchedPlaylist.playlist_name;
  else {
    newPlaylistName.value = "New Playlist";
  }
  const newPlaylistSongCount = document.createElement("div");
  newPlaylistSongCount.classList.add("playlist-song-count");
  if (fetchedPlaylist)
    newPlaylistSongCount.innerHTML = `${fetchedPlaylist.songs.length} songs`;
  else {
    newPlaylistSongCount.innerHTML = "0 songs";
  }

  const newPlaylistBtns = document.createElement("div");
  newPlaylistBtns.classList.add("playlist-btns");

  const newPlaylistBtn = document.createElement("button");
  newPlaylistBtn.classList.add("play-playlist");
  newPlaylistBtn.setAttribute(
    "parent-playlist",
    newPlaylist.getAttribute("id")
  );

  const newRenameBtn = document.createElement("button");
  newRenameBtn.classList.add("rename-playlist");
  newRenameBtn.setAttribute("parent-playlist", newPlaylist.getAttribute("id"));

  const newDeletePlaylistBtn = document.createElement("button");
  newDeletePlaylistBtn.classList.add("delete-playlist");
  newDeletePlaylistBtn.setAttribute(
    "parent-playlist",
    newPlaylist.getAttribute("id")
  );

  const newPlaylistDD = document.createElement("div");
  newPlaylistDD.classList.add("playlist-dd");
  newPlaylistDD.setAttribute("parent-playlist", newPlaylist.getAttribute("id"));

  const newPlaylistUL = document.createElement("ul");

  let liInProgress = "";
  if (fetchedPlaylist) {
    fetchedPlaylist.songs.forEach((songIndex, index) => {
      liInProgress += `<li index=${index}>${songs[songIndex]}</li>`;
    });
  }

  newPlaylistUL.innerHTML = liInProgress;

  // _______inserting________________________

  newPlaylistDD.appendChild(newPlaylistUL);

  newPlaylistInfo.appendChild(newPlaylistName);
  newPlaylistInfo.appendChild(newPlaylistSongCount);

  newPlaylistBtns.appendChild(newPlaylistBtn);
  newPlaylistBtns.appendChild(newRenameBtn);
  newPlaylistBtns.appendChild(newDeletePlaylistBtn);
  newPlaylistInfo.appendChild(newPlaylistBtns);

  newPlaylistClickable.appendChild(newPlaylistImg);
  newPlaylistClickable.appendChild(newPlaylistInfo);

  newPlaylist.appendChild(newPlaylistClickable);
  newPlaylist.appendChild(newPlaylistDD);

  playlistsContainer.appendChild(newPlaylist);
}

function songAlreadyInList(songInd, playlistInd) {
  const alreadyPresent = (s) => {
    return s == songInd;
  };
  return fetchedPlaylists[playlistInd].songs.some(alreadyPresent, songInd);
}

function addSongToPlaylist(songInd, playlistInd) {
  if (songAlreadyInList(songInd, playlistInd)) {
    displayHint("Song already in List");
    return;
  }
  fetchedPlaylists[playlistInd].songs.push(+songInd);
  commitChanges();
  updatePlaylistInfoDiv();
}

function removeSongFromPlaylist(itemInd, playlistInd) {
  displayHint(
    `Removed ${
      songs[fetchedPlaylists[playlistInd].songs.splice(itemInd, 1)]
    } from ${fetchedPlaylists[playlistInd].playlist_name}`
  );
  commitChanges();
  updatePlaylistInfoDiv();
}

function createPlaylist(fetchedPlaylist) {
  if (!checkIfNewPlaylist(fetchedPlaylist)) {
    displayHint(
      "playlist already exists. Rename New_Playlist to a unique name"
    );
    return;
  } else {
    displayPlaylists(fetchedPlaylist);

    if (!fetchedPlaylist) {
      const newEntry = {};
      const tempPlaylists = document.getElementsByClassName("playlist");

      newEntry.playlist_name =
        tempPlaylists[tempPlaylists.length - 1].getAttribute("id");

      newEntry.songs = [];

      fetchedPlaylists.push(newEntry);

      commitChanges();
      updatePlaylistSelectTag();
    }
  }
}

function savePlaylists() {
  const currentPlaylists = document.getElementsByClassName("playlist");

  let newEntry = {
    playlist_name:
      currentPlaylists[currentPlaylists.length - 1].getAttribute("id"),
    songs: [],
  };

  fetchedPlaylists.push(newEntry);
}

/** commit changes to localStorage */
function commitChanges() {
  localStorage.setItem(
    `${localStorageKey}.playlists`,
    JSON.stringify(fetchedPlaylists)
  );
}

function fetchPlaylists() {
  if (typeof Storage !== "undefined") {
    fetchedPlaylists = JSON.parse(
      localStorage.getItem(`${localStorageKey}.playlists`)
    );

    if (fetchedPlaylists) {
      populatePlaylists();
    } else {
      fetchedPlaylists = [];
    }
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }
}

function populatePlaylists() {
  if (fetchedPlaylists) {
    document.getElementById("empty-tag").innerHTML = "";
    fetchedPlaylists.forEach((fetchedPlaylist, index) => {
      createPlaylist(fetchedPlaylist);
    });
  } else {
    document.getElementById("empty-tag").innerHTML = "nothing to show";
  }
}

function stopPlaylistMode() {
  playlistMode = false;

  const playlists = document.getElementsByClassName("playlist");
  for (let i = 0; i < playlists.length; i++) {
    playlists[i].classList.remove("active");
  }
}
fetchPlaylists();
updatePlaylistSelectTag();
