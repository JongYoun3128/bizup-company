// ========================================
// 링크 관리 (필수)
// ========================================
const LINKS = {
    package:
        "https://jmblife.store/product/%EB%A7%8C%EB%82%98%ED%95%9C%EB%81%BC-%EB%94%94%EB%94%94%EC%97%94%EB%B9%84-2%EC%9D%BC-%ED%8C%A8%ED%82%A4%EC%A7%80/43/category/55/display/1/",
    prebiome:
        "https://jmblife.store/product/%EB%A7%8C%EB%82%98-%ED%95%9C%EB%81%BC-%EC%93%B1-%ED%94%84%EB%A6%AC%EB%B0%94%EC%9D%B4%EC%98%B4-30g-30%ED%8F%AC-30%EC%9D%BC%EB%B6%84/27/category/42/display/1/",
    ddtea: "https://jmblife.store/product/%EB%A7%8C%EB%82%98-%EB%94%94%EB%94%94%EC%B0%A8-1%EB%B0%95%EC%8A%A4-125ml-30%ED%8C%A9-1%EB%8B%AC%EB%B6%84/28/category/54/display/1/",
};

// ========================================
// DOM이 로드된 후 실행
// ========================================
document.addEventListener("DOMContentLoaded", function () {
    initNavigation();
    initSmoothScroll();
    initLinks();
    initScrollEffects();
    initHeroSlider();
    initReviewSlider();
    // initStorySlider(); // 무한 루프 애니메이션으로 변경되어 불필요
});

// ========================================
// 네비게이션 초기화
// ========================================
function initNavigation() {
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    // 네비게이션 링크 클릭 시 모바일 메뉴 닫기
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            if (window.innerWidth < 768) {
                mobileMenuToggle.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    });

    // 스크롤 시 네비게이션 배경 강조
    window.addEventListener("scroll", function () {
        const navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

// ========================================
// 부드러운 스크롤 초기화
// ========================================
function initSmoothScroll() {
    // 앵커 링크 클릭 시 부드러운 스크롤
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            // 외부 링크가 아닌 경우에만 부드러운 스크롤 적용
            if (href !== "#" && href.startsWith("#")) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();

                    const navbarHeight =
                        document.getElementById("navbar").offsetHeight;
                    const targetPosition =
                        targetElement.offsetTop - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                    });
                }
            }
        });
    });
}

// ========================================
// 링크 초기화 (모든 구매 버튼)
// ========================================
function initLinks() {
    // data-link 속성이 있는 모든 링크 요소 찾기
    const linkElements = document.querySelectorAll("[data-link]");

    linkElements.forEach((element) => {
        const linkType = element.getAttribute("data-link");

        if (LINKS[linkType]) {
            element.href = LINKS[linkType];
            element.target = "_blank";
            element.rel = "noopener noreferrer";

            // 클릭 이벤트 추가 (분석 추적 등에 활용 가능)
            element.addEventListener("click", function (e) {
                // 여기에 Google Analytics나 기타 추적 코드 추가 가능
                console.log(`Link clicked: ${linkType} - ${LINKS[linkType]}`);
            });
        }
    });
}

// ========================================
// 스크롤 효과 초기화
// ========================================
function initScrollEffects() {
    // Intersection Observer를 사용한 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // 애니메이션을 적용할 요소들
    const animateElements = document.querySelectorAll(
        ".point-card, .why-card, .product-card, .step, .review-card, .achievement-badge",
    );

    animateElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(element);
    });
}

// ========================================
// 플로팅 버튼 스크롤 제어
// ========================================
window.addEventListener("scroll", function () {
    const floatingBtn = document.getElementById("floatingBtn");
    const footer = document.querySelector(".footer");
    const ctaFinal = document.getElementById("cta-final");

    if (!floatingBtn || !footer) return;

    const footerRect = footer.getBoundingClientRect();
    const ctaFinalRect = ctaFinal ? ctaFinal.getBoundingClientRect() : null;
    const windowHeight = window.innerHeight;

    // CTA Final 섹션이 보이면 플로팅 버튼 숨김
    if (ctaFinalRect && ctaFinalRect.top < windowHeight) {
        floatingBtn.style.opacity = "0";
        floatingBtn.style.pointerEvents = "none";
    }
    // 푸터가 보이면 플로팅 버튼 숨김
    else if (footerRect.top < windowHeight) {
        floatingBtn.style.opacity = "0";
        floatingBtn.style.pointerEvents = "none";
    }
    // 그 외에는 플로팅 버튼 표시
    else {
        floatingBtn.style.opacity = "1";
        floatingBtn.style.pointerEvents = "auto";
    }
});

// ========================================
// 이미지 Lazy Loading (선택 사항)
// ========================================
if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute("data-src");
                }
                imageObserver.unobserve(img);
            }
        });
    });

    // data-src 속성을 가진 이미지들에 lazy loading 적용
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => imageObserver.observe(img));
}

// ========================================
// 유틸리티 함수
// ========================================

// 디바운스 함수 (성능 최적화)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 스로틀 함수 (성능 최적화)
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// 반응형 처리를 위한 윈도우 리사이즈 이벤트 (디바운스 적용)
window.addEventListener(
    "resize",
    debounce(function () {
        // 화면 크기 변경 시 필요한 처리
        const mobileMenuToggle = document.getElementById("mobileMenuToggle");
        const navMenu = document.getElementById("navMenu");

        // 태블릿 이상 화면에서 모바일 메뉴가 열려있으면 닫기
        if (window.innerWidth >= 768) {
            if (mobileMenuToggle) mobileMenuToggle.classList.remove("active");
            if (navMenu) navMenu.classList.remove("active");
        }
    }, 250),
);

// ========================================
// 브라우저 호환성 체크
// ========================================
(function checkBrowserCompatibility() {
    // CSS Grid 지원 체크
    const supportsGrid = CSS.supports("display", "grid");
    if (!supportsGrid) {
        console.warn(
            "이 브라우저는 CSS Grid를 지원하지 않습니다. 레이아웃이 제대로 표시되지 않을 수 있습니다.",
        );
    }

    // IntersectionObserver 지원 체크
    if (!("IntersectionObserver" in window)) {
        console.warn(
            "이 브라우저는 IntersectionObserver를 지원하지 않습니다. 스크롤 애니메이션이 작동하지 않을 수 있습니다.",
        );
    }
})();

// ========================================
// 히어로 이미지 슬라이더 초기화
// ========================================
function initHeroSlider() {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-slider-dots .dot");

    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 1500; // 3초마다 자동 전환

    // 슬라이드 전환 함수
    function showSlide(index) {
        // 모든 슬라이드와 점 비활성화
        slides.forEach((slide) => slide.classList.remove("active"));
        dots.forEach((dot) => dot.classList.remove("active"));

        // 현재 슬라이드 활성화
        slides[index].classList.add("active");
        dots[index].classList.add("active");
        currentSlide = index;
    }

    // 다음 슬라이드로 이동
    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // 인디케이터 클릭 이벤트
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            showSlide(index);
            // 클릭 시 자동 슬라이드 재시작
            clearInterval(autoSlide);
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    });

    // 자동 슬라이드 시작
    let autoSlide = setInterval(nextSlide, slideInterval);

    // 슬라이더에 마우스 호버 시 자동 슬라이드 정지 (선택 사항)
    const heroSlider = document.querySelector(".hero-slider");
    if (heroSlider) {
        heroSlider.addEventListener("mouseenter", function () {
            clearInterval(autoSlide);
        });

        heroSlider.addEventListener("mouseleave", function () {
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    }
}

// ========================================
// 브랜드 스토리 이미지 슬라이더 초기화
// ========================================
function initStorySlider() {
    const slides = document.querySelectorAll(".story-slide");
    const dots = document.querySelectorAll(".story-slider-dots .dot");

    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 1500; // 3.5초마다 자동 전환

    // 슬라이드 전환 함수
    function showSlide(index) {
        // 모든 슬라이드와 점 비활성화
        slides.forEach((slide) => slide.classList.remove("active"));
        dots.forEach((dot) => dot.classList.remove("active"));

        // 현재 슬라이드 활성화
        slides[index].classList.add("active");
        dots[index].classList.add("active");
        currentSlide = index;
    }

    // 다음 슬라이드로 이동
    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // 인디케이터 클릭 이벤트
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            showSlide(index);
            // 클릭 시 자동 슬라이드 재시작
            clearInterval(autoSlide);
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    });

    // 자동 슬라이드 시작
    let autoSlide = setInterval(nextSlide, slideInterval);

    // 슬라이더에 마우스 호버 시 자동 슬라이드 정지
    const storySlider = document.querySelector(".story-slider");
    if (storySlider) {
        storySlider.addEventListener("mouseenter", function () {
            clearInterval(autoSlide);
        });

        storySlider.addEventListener("mouseleave", function () {
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    }
}

// ========================================
// 후기 슬라이더 초기화 (자동 슬라이드 1.5초 간격)
// ========================================
function initReviewSlider() {
    const track = document.querySelector(".review-cards");

    if (!track) {
        return;
    }

    let currentSlide = 0;
    const totalSlides = 8;

    function getSlidesPerView() {
        return window.innerWidth >= 768 ? 2 : 1;
    }

    function getMaxSlide() {
        return totalSlides - getSlidesPerView();
    }

    function updateSlider() {
        const slidesPerView = getSlidesPerView();
        const slideWidth = 100 / slidesPerView;
        const offset = -(currentSlide * slideWidth);

        track.style.transform = `translateX(${offset}%)`;
    }

    // 리사이즈 처리
    window.addEventListener(
        "resize",
        debounce(() => {
            if (currentSlide > getMaxSlide()) {
                currentSlide = getMaxSlide();
            }
            updateSlider();
        }, 250),
    );

    // 자동 슬라이드 (1.5초 간격)
    setInterval(() => {
        if (currentSlide >= getMaxSlide()) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        updateSlider();
    }, 1500);

    updateSlider();
}
