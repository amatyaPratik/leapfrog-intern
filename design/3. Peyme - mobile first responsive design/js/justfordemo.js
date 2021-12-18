function toggleSideNav(){
	let x = document.getElementsByClassName("sidenav")[0];
  if (x.classList.contains("hidden")) {
    x.className = "sidenav bg-deepest text-white displayed clearfix";
  } else {
    x.className = "sidenav hidden";
  }
}