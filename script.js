// Hataylım - JavaScript Functions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initializeDate();
    initializeMobileMenu();
    initializeSearch();
    initializeNewsletter();
    initializeComments();
    initializeShareButtons();
});

// Current date display
function initializeDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = now.toLocaleDateString('tr-TR', options);
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchNews();
            }
        });
    }
}

function searchNews() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim().toLowerCase();
    
    if (query === '') {
        alert('Lütfen arama kelimesi girin.');
        return;
    }
    
    // Simulate search functionality
    console.log('Arama yapılıyor:', query);
    alert(`"${query}" için arama sonuçları gösteriliyor...`);
    
    // In a real application, this would make an API call
    // For demo purposes, we'll just show an alert
}

// Load more news
function loadMoreNews() {
    const articlesGrid = document.getElementById('articlesGrid');
    if (!articlesGrid) return;
    
    // Sample additional news data
    const additionalNews = [
        {
            title: "Hatay'da Yeni Eğitim Projesi Başladı",
            category: "Eğitim",
            excerpt: "Büyükşehir Belediyesi tarafından hayata geçirilen yeni eğitim projesi ile öğrencilere ücretsiz kurs imkânı sağlanacak...",
            author: "Elif Özkan",
            date: "2 gün önce",
            image: "https://via.placeholder.com/300x200?text=Eğitim+Projesi",
            link: "post-detail.html"
        },
        {
            title: "İskenderun'da Deniz Festivali Düzenleniyor",
            category: "Etkinlik",
            excerpt: "Bu hafta sonu İskenderun sahilinde düzenlenecek deniz festivali ile bölge turizmine katkı sağlanması hedefleniyor...",
            author: "Murat Aydın",
            date: "3 gün önce",
            image: "https://via.placeholder.com/300x200?text=Deniz+Festivali",
            link: "post-detail.html"
        }
    ];
    
    additionalNews.forEach(news => {
        const articleHTML = `
            <article class="article-card">
                <div class="article-image">
                    <img src="${news.image}" alt="${news.title}">
                    <span class="category-badge general">${news.category}</span>
                </div>
                <div class="article-content">
                    <h3 class="article-title">
                        <a href="${news.link}">${news.title}</a>
                    </h3>
                    <p class="article-excerpt">${news.excerpt}</p>
                    <div class="article-meta">
                        <span><i class="fas fa-calendar"></i> ${news.date}</span>
                        <span><i class="fas fa-user"></i> ${news.author}</span>
                    </div>
                </div>
            </article>
        `;
        articlesGrid.insertAdjacentHTML('beforeend', articleHTML);
    });
    
    // Show success message
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> Yeni Haberler Yüklendi';
        setTimeout(() => {
            loadMoreBtn.innerHTML = '<i class="fas fa-refresh"></i> Daha Fazla Haber Yükle';
        }, 2000);
    }
}

// Newsletter subscription
function initializeNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                alert('Lütfen e-mail adresinizi girin.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Lütfen geçerli bir e-mail adresi girin.');
                return;
            }
            
            // Simulate newsletter subscription
            alert('Başarıyla abone oldunuz! E-mail adresinize onay mesajı gönderildi.');
            emailInput.value = '';
        });
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Comments functionality
function initializeComments() {
    const commentForms = document.querySelectorAll('.comments-section form');
    
    commentForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const comment = form.querySelector('#comment').value.trim();
            
            if (name === '' || email === '' || comment === '') {
                alert('Lütfen tüm alanları doldurun.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Lütfen geçerli bir e-mail adresi girin.');
                return;
            }
            
            if (comment.length < 10) {
                alert('Yorumunuz en az 10 karakter olmalıdır.');
                return;
            }
            
            // Simulate comment submission
            alert('Yorumunuz başarıyla gönderildi! Moderatör onayından sonra yayınlanacaktır.');
            form.reset();
        });
    });
}

// Share functionality
function initializeShareButtons() {
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            if (button.classList.contains('facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
            } else if (button.classList.contains('twitter')) {
                window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank', 'width=600,height=400');
            } else if (button.classList.contains('linkedin')) {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
            } else if (button.classList.contains('whatsapp')) {
                window.open(`https://wa.me/?text=${title} ${url}`, '_blank');
            }
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading for images (basic implementation)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Dark mode toggle (bonus feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Initialize dark mode from localStorage
function initializeDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Sticky navigation
function initializeStickyNav() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    
    const navOffset = nav.offsetTop;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= navOffset) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    });
}

// Back to top button
function initializeBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2a5298;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize additional features
window.addEventListener('load', function() {
    initializeLazyLoading();
    initializeDarkMode();
    initializeStickyNav();
    initializeBackToTop();
});

// Utility function for formatting numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Function to simulate reading time calculation
function calculateReadingTime() {
    const postContent = document.querySelector('.post-content');
    if (postContent) {
        const words = postContent.textContent.split(' ').length;
        const readingTime = Math.ceil(words / 200); // Average reading speed
        const timeElement = document.querySelector('.reading-time');
        if (timeElement) {
            timeElement.textContent = `${readingTime} dakika okuma`;
        }
    }
}

// Initialize reading time calculation
document.addEventListener('DOMContentLoaded', calculateReadingTime);