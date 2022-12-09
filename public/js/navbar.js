const menu = document.getElementById("menu-title")
const menuLinks = document.getElementById("menu-links")
const mobileNavbar = document.getElementById("mobile-navbar")
const iconMenu = document.getElementById("icon-menu")

menu.onclick = () => {
  if (menuLinks.style.display === "none") {
    menuLinks.style.display = "block"
  } else {
    menuLinks.style.display = "none"
  }
}

iconMenu.onclick = () => {
  $("#mobile-navbar").slideToggle()
  /* if (mobileNavbar.style.display === "none") {
        mobileNavbar.style.display = "block"
      } else {
        mobileNavbar.style.display = "none"
      } */
}

$(window).resize(function () {
  if (window.innerWidth <= 575) {
    mobileNavbar.style.display = "none"
  }
})

const image = document.querySelectorAll(".movie-img")

for (let i = 0; i < image.length; i++) {
  image[i].addEventListener("mouseover", () => {
    document.querySelectorAll("#play")[i].style.display = "block"
  })
}

for (let i = 0; i < image.length; i++) {
  image[i].addEventListener("mouseleave", () => {
    document.querySelectorAll("#play")[i].style.display = "none"
  })
}

const paragraph = document.querySelectorAll(".homepage-middle p")
const headerTwo = document.querySelectorAll(".homepage-middle h2")

for (let i = 0; i < paragraph.length; i++) {
  if (paragraph[i].innerText.length > 160) {
    paragraph[i].innerText = paragraph[i].innerText.slice(0, 160) + "..."
  } else {
    paragraph[i].innerText = paragraph[i].innerText
  }
}

for (let i = 0; i < headerTwo.length; i++) {
  if (headerTwo[i].innerText.length > 24) {
    headerTwo[i].innerText = headerTwo[i].innerText.slice(0, 27) + "..."
  } else {
    headerTwo[i].innerText = headerTwo[i].innerText
  }
}
