
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

