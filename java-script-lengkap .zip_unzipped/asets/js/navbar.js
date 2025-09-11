// Fungsi untuk memuat navbar
function loadNavbar() {
  fetch('/components/navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-container').innerHTML = data;
      
      // Setelah navbar dimuat, jalankan script untuk toggle
      const toggleButton = document.getElementById('navbar-toggle');
      const navbarMenu = document.getElementById('navbar-menu');
      
      if (toggleButton && navbarMenu) {
        toggleButton.addEventListener('click', () => {
          navbarMenu.classList.toggle('active');
          toggleButton.classList.toggle('active');
        });
        
        // Setup toggle untuk submenu
        setupSubmenuToggles();
        
        // Menutup menu ketika item diklik (di mobile)
        const navLinks = document.querySelectorAll('.nav-link a');
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
            toggleButton.classList.remove('active');
          });
        });
      }
    })
    .catch(error => {
      console.error('Error loading navbar:', error);
      document.getElementById('navbar-container').innerHTML = `
        <nav class="navbar">
          <div style="color: white;">Error loading navigation</div>
        </nav>
      `;
    });
}

// Fungsi untuk mengatur toggle pada submenu
function setupSubmenuToggles() {
  const submenuHeaders = document.querySelectorAll('.submenu-header');
  
  submenuHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const arrow = this.querySelector('.toggle-arrow');
      const navLink = this.nextElementSibling;
      
      // Toggle kelas active pada panah
      arrow.classList.toggle('active');
      
      // Toggle kelas active pada nav-link
      navLink.classList.toggle('active');
    });
  });
}

// Fungsi untuk menandai halaman aktif
function highlightCurrentPage(pageId) {
  // Tunggu sampai navbar selesai dimuat
  setTimeout(() => {
    const activeLink = document.getElementById(`nav-${pageId}`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }, 100);
}

// Panggil fungsi loadNavbar ketika halaman dimuat
document.addEventListener('DOMContentLoaded', loadNavbar);