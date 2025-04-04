document.addEventListener('DOMContentLoaded', () => {
    // Section B Slider
    const sectionB = {
        currentIndex: 0,
        images: document.querySelectorAll('.B img'),
        init() {
            this.images.forEach(img => img.classList.remove('active'));
            if(this.images.length > 0) {
                this.images[this.currentIndex].classList.add('active');
                setInterval(() => this.nextImage(), 5000);
            }
        },
        nextImage() {
            this.images[this.currentIndex].classList.remove('active');
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.images[this.currentIndex].classList.add('active');
        },
        prevImage() {
            this.images[this.currentIndex].classList.remove('active');
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.images[this.currentIndex].classList.add('active');
        }
    };

    // Section C Slider
    const sectionC = {
        init() {
            document.querySelectorAll('.C .Poster').forEach(poster => {
                let currentIndex = 0;
                const images = poster.querySelectorAll('.poster-img');
                const categoryText = poster.querySelector('.category-text');
                let interval;

                function update() {
                    images.forEach(img => img.classList.remove('active'));
                    images[currentIndex].classList.add('active');
                    categoryText.textContent = images[currentIndex].dataset.category || '';
                }

                function startInterval() {
                    interval = setInterval(() => {
                        currentIndex = (currentIndex + 1) % images.length;
                        update();
                    }, 3000);
                }

                if(images.length > 0) {
                    update();
                    startInterval();

                    poster.addEventListener('mouseenter', () => {
                        clearInterval(interval);
                        poster.querySelector('.poster-img.active').style.transform = 'scale(1.1)';
                        categoryText.style.opacity = '1';
                    });

                    poster.addEventListener('mouseleave', () => {
                        startInterval();
                        poster.querySelector('.poster-img.active').style.transform = 'scale(1)';
                        categoryText.style.opacity = '0';
                    });
                }
            });
        }
    };

    // Initialize all sections
    sectionB.init();
    sectionC.init();

    // Button controls for section B
    document.querySelector('.B .prev').addEventListener('click', () => sectionB.prevImage());
    document.querySelector('.B .next').addEventListener('click', () => sectionB.nextImage());
});

// Tambahkan di script
document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.fade-scroll');
    let lastScrollY = window.scrollY;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const direction = window.scrollY > lastScrollY ? 'down' : 'up';
            lastScrollY = window.scrollY;
            
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
            } else {
                if(direction === 'down') {
                    entry.target.classList.add('hidden');
                }
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    scrollElements.forEach(el => {
        observer.observe(el);
        el.classList.add('hidden'); // Initial state
    });
});