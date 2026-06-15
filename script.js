// Function to highlight the active navigation link
function highlightActiveNav() {
  const path = window.location.pathname;
  let currentPage = path.split("/").pop(); // Get the last part of the URL (after the last slash)
  
  // If the path is empty (i.e., the home page), default to "index"
  if (!currentPage || currentPage === "/") {
    currentPage = "index";
  }
  
  // Remove .html extension if present
  currentPage = currentPage.replace(".html", "");

  // Map individual pages to their parent sections
  let sectionPage = currentPage;
  
  // If on individual book pages (book1, book2, etc.), highlight "books"
  if (currentPage.match(/^book\d+$/)) {
    sectionPage = "books";
  }
  // If on individual editorial pages (editorial1, editorial2, etc.), highlight "editorials"
  else if (currentPage.match(/^editorial\d+$/)) {
    sectionPage = "editorials";
  }
  // If on individual narrative pages (narrative1, narrative2, etc.), highlight "narratives"
  else if (currentPage.match(/^narrative\d+$/)) {
    sectionPage = "narratives";
  }

  // Loop through each link in the navbar
  document.querySelectorAll("nav a:not(.brand-link)").forEach(link => {
    const linkHref = link.getAttribute("href");
    
    // Extract the page name from the href (remove leading slash and .html)
    const linkPage = linkHref.replace(/^\//, "").replace(".html", "");
    
    // Compare the section page with the link href
    if (linkPage === sectionPage) {
      link.classList.remove("text-gray-600");
      link.classList.add("text-black", "font-semibold");
    } else {
      link.classList.remove("text-black", "font-semibold");
      link.classList.add("text-gray-600");
    }
  });
}

// Function to load the navbar
function loadNavbar() {
  const navbarContainer = document.getElementById("navbar-container");

  fetch("navbar.html", { cache: "force-cache" })
    .then(response => response.text())
    .then(data => {
      navbarContainer.innerHTML = data;

      // Wait for DOM to update
      requestAnimationFrame(() => {
        highlightActiveNav();
      });
    })
    .catch(error => {
      console.error("Error loading navbar:", error);
    });
}

// Function to load the footer
function loadFooter() {
  fetch("footer.html", { cache: "force-cache" })
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch(error => {
      console.error("Error loading footer:", error);
    });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  loadNavbar();
  loadFooter();
});
