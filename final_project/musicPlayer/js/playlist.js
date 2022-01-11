const playlistsToggleBtn = document.getElementById("playlists-toggle");
const playlistsContainer = document.getElementById("playlists-container");
const playlists = document.getElementsByClassName("playlist");
const createPlaylistBtn = document.getElementById("create-playlist");

/**playlist storage key */
const localStorageKey = "timeless.music";

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
    // console.log(e.target.parentNode);
  } else if (e.target.className === "delete-playlist") {
    deletePlaylist(e.target.getAttribute("parent-playlist"));
  } else if (e.target.className === "playlist-name") {
    // console.log("click ignored");
    e.target.blur();
  } else if (e.target.className === "rename-playlist") {
    oldId = e.target.getAttribute("parent-playlist");
    console.log("renaming");
    const previousPlaylistName =
      e.target.parentNode.parentNode.children[0].value;
    // console.log("previousPlaylistName", previousPlaylistName);
    e.target.parentNode.parentNode.children[0].focus();
    e.target.parentNode.parentNode.children[0].addEventListener(
      "blur",
      (renameEvent) => {
        console.log("bluring from input");
        if (renameEvent.target.value === "") {
          renameEvent.target.value = previousPlaylistName;
        } else if (
          checkIfNewPlaylist(renameEvent.target.value) &&
          oldId !== "New_Playlist"
        ) {
          console.log("olcId", oldId);

          const oldPlaylistIndex = idToPlaylistIndex(oldId);
          const newRenamedEntry = {};
          console.log("playlistIndex", oldPlaylistIndex);
          newRenamedEntry.playlist_name = renameEvent.target.value;
          newRenamedEntry.songs = fetchedPlaylists[oldPlaylistIndex].songs;

          deletePlaylist(oldPlaylistIndex);
          fetchedPlaylists.push(newRenamedEntry);
          localStorage.setItem(
            `${localStorageKey}.playlists`,
            JSON.stringify(fetchedPlaylists)
          );
          updatePlaylistInfoDiv();

          // savePlaylists();
          updatePlaylistSelectTag();
        } else if (
          checkIfNewPlaylist(renameEvent.target.value) &&
          oldId === "New_Playlist"
        ) {
          // fetchedPlaylists[
          //   fetchedPlaylists.length === 0 ? 0 : fetchedPlaylists.length - 1
          // ].playlist_name = renameEvent.target.value;
          // console.log(renameEvent.target.parentNode.parentNode);
          const newEmptyPlaylist = document.getElementById(oldId);
          newEmptyPlaylist.setAttribute("id", renameEvent.target.value);

          const newPlaylistBtn =
            newEmptyPlaylist.getElementsByClassName("play-playlist")[0];
          newPlaylistBtn.setAttribute(
            "parent-playlist",
            renameEvent.target.value
          );
          const newRenamePlaylistBtn =
            newEmptyPlaylist.getElementsByClassName("play-playlist")[0];
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
          // _______________________________________________________________
          const oldPlaylistIndex = idToPlaylistIndex(oldId);
          const newRenamedEntry = {};
          console.log("playlistIndex", oldPlaylistIndex);
          newRenamedEntry.playlist_name = renameEvent.target.value;
          newRenamedEntry.songs = fetchedPlaylists[oldPlaylistIndex].songs;

          deletePlaylist(oldPlaylistIndex);
          fetchedPlaylists.push(newRenamedEntry);
          localStorage.setItem(
            `${localStorageKey}.playlists`,
            JSON.stringify(fetchedPlaylists)
          );
          updatePlaylistInfoDiv();
          // _______________________________________________________________
          // savePlaylists();
          // updatePlaylistSelectTag();
          // savePlaylists();
          updatePlaylistSelectTag();
        } else {
          // renameEvent.target.value = "";
          // renameEvent.target.focus();
          renameEvent.target.blur();
        }
      }
    );
  } else {
  }
});

playlistsToggleBtn.addEventListener("click", togglePlaylists);

createPlaylistBtn.addEventListener("click", () => {
  // console.log("creating");
  // console.log("fetchedlist: ", fetchedPlaylists);
  createPlaylist();

  // const newEntry = {}
  // newEntry.playlist_name =

  // localStorage.setItem(
  //   `${localStorageKey}.playlists`,
  //   JSON.stringify(fetchedPlaylists)
  // );
});

function togglePlaylists() {
  if (getBoundary(playlistsContainer).right - screen.width === 0) {
    // console.log("on tab");
    playlistsContainer.style.right = "-14rem";
  } else {
    playlistsContainer.style.right = "0";
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
  playlistSongIndex = 0;
  // console.log("playing");
  playlistMode = true;

  const playlists = document.getElementsByClassName("playlist");
  for (let i = 0; i < playlists.length; i++) {
    playlists[i].classList.remove("active");
  }
  document.getElementById(playlistId).classList.add("active");

  const chosenPlaylistIndex = idToPlaylistIndex(playlistId);
  // playlistArray = fetchedPlaylists[chosenPlaylistIndex]["songs"];
  // console.log(
  //   "so called undefined. fetchedPlaylists[chosenPlaylistIndex]",
  //   fetchedPlaylists[chosenPlaylistIndex]
  // );
  // console.log("so called undefined. chosenPlaylistIndex", chosenPlaylistIndex);
  playlistArray = fetchedPlaylists[chosenPlaylistIndex].songs;
  // console.log(playlistArray[0]);
  loadSong(songs[playlistArray[playlistSongIndex]]);

  const isPlaying = musicContainer.classList.contains("playing");

  if (!isPlaying) {
    setupContext();
    playSong();
  } else {
    playSong();
  }
}

function deletePlaylist(playlistId) {
  const chosenPlaylistIndex = idToPlaylistIndex(playlistId);
  fetchedPlaylists.splice(chosenPlaylistIndex, 1);
  localStorage.setItem(
    `${localStorageKey}.playlists`,
    JSON.stringify(fetchedPlaylists)
  );
  fetchedPlaylists = JSON.parse(
    localStorage.getItem(`${localStorageKey}.playlists`)
  );

  const playlistsContainer = document.getElementById("playlists-container");
  for (let i = 0; i < playlistsContainer.children.length; i++) {
    if (playlistsContainer.children[i].getAttribute("id") == playlistId) {
      // console.log(playlistsContainer.children[i]);
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
        // console.log("playlist already exists");
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
          // console.log("clashed with ", index);
        }
      });

      // }
      // console.log("checking for ", desiredPlaylistName);
      if (newPlaylist) {
        return true;
      } else {
        console.log("rejected");
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
    fetchedPlaylists[i].songs.forEach((playlistSongIndex) => {
      containedSongNameLi += `<li>${songs[playlistSongIndex]}</li>`;
    });
    containedSongNameLi += "</ul>";
    // console.log("containedSongNameLi", containedSongNameLi);
    playlists[i].getElementsByClassName("playlist-dd")[0].innerHTML =
      containedSongNameLi;
  }
}

function addSongToPlaylist(songIndex, playlistIndex = 0) {
  fetchedPlaylists[playlistIndex].songs.push(+songIndex);
  /** commit changes */
  localStorage.setItem(
    `${localStorageKey}.playlists`,
    JSON.stringify(fetchedPlaylists)
  );
  updatePlaylistInfoDiv();
  // console.log(
  //   "added ",
  //   songs[songIndex],
  //   " to ",
  //   fetchedPlaylists[playlistIndex].playlist_name
  // );
}

function updatePlaylistSelectTag() {
  // removing old Select tag;
  let oldPlaylistSelect = document.getElementById("playlist-select");
  if (oldPlaylistSelect) {
    // console.log("oldPlaylistSelect", oldPlaylistSelect);
    for (let i = 0; i < document.body.children.length; i++) {
      if ("playlist-select" === document.body.children[i].getAttribute("id")) {
        // console.log(
        // "reday to delet",
        document.body.removeChild(document.body.children[i]);
        // );
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

  const newPlaylistUL = document.createElement("ul");

  let liInProgress = "";
  if (fetchedPlaylist) {
    fetchedPlaylist.songs.forEach((songIndex) => {
      liInProgress += `<li>${songs[songIndex]}</li>`;
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

function createPlaylist(fetchedPlaylist) {
  if (!checkIfNewPlaylist(fetchedPlaylist)) {
    console.log(
      "playlist already exists. Rename your playlist to a unique name"
    );
    return;
  } else {
    displayPlaylists(fetchedPlaylist);

    if (!fetchedPlaylist) {
      // console.log(fetchedPlaylist);
      const newEntry = {};
      const tempPlaylists = document.getElementsByClassName("playlist");

      newEntry.playlist_name =
        tempPlaylists[tempPlaylists.length - 1].getAttribute("id");

      newEntry.songs = [];
      console.log("newEntry", newEntry);

      fetchedPlaylists.push(newEntry);
      updatePlaylistSelectTag();
    }

    // localStorage.setItem(
    //   `${localStorageKey}.playlists`,
    //   JSON.stringify(fetchedPlaylists)
    // );
  }
}

function savePlaylists() {
  // console.log("old fetchedPlaylists", fetchedPlaylists);

  const currentPlaylists = document.getElementsByClassName("playlist");

  let newEntry = {
    playlist_name:
      currentPlaylists[currentPlaylists.length - 1].getAttribute("id"),
    songs: [],
  };

  fetchedPlaylists.push(newEntry);
}

function fetchPlaylists() {
  if (typeof Storage !== "undefined") {
    fetchedPlaylists = JSON.parse(
      localStorage.getItem(`${localStorageKey}.playlists`)
    );

    if (fetchedPlaylists) {
      // console.log("fetched is not null");
      // console.log("fetchedPlaylists", fetchedPlaylists);
      populatePlaylists();
    } else {
      // console.log("fetched is null");
      fetchedPlaylists = [];
      // populatePlaylists();
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
    // console.log("nothing to show");
  }
}
fetchPlaylists();
updatePlaylistSelectTag();
