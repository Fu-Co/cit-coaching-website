// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 모바일 햄버거 메뉴 토글
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // 스무스 스크롤
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 스크롤 시 헤더 스타일 변경
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 로드맵 아이템 애니메이션
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    roadmapItems.forEach(item => {
        observer.observe(item);
    });
    
    // 추천 교육 카드 애니메이션
    const recommendedCards = document.querySelectorAll('.recommended-card');
    
    recommendedCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // 무료 행사 카드 애니메이션
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // 폼 제출 처리
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // 실제 구현에서는 서버로 데이터를 전송
            console.log('폼 데이터:', formObject);
            
            // 성공 메시지 표시
            showNotification('문의가 성공적으로 전송되었습니다!', 'success');
            
            // 폼 초기화
            this.reset();
        });
    }
    
    // 수강 신청 버튼 클릭 이벤트
    // const enrollButtons = document.querySelectorAll('.enroll-btn');
    // enrollButtons.forEach(button => {
    //     button.addEventListener('click', function() {
    //         const courseTitle = this.closest('.card-content').querySelector('h3').textContent;
    //         showNotification(`${courseTitle} 수강 신청이 완료되었습니다!`, 'success');
    //     });
    // });
    
    // 무료 참가 신청 버튼 클릭 이벤트
    // const eventButtons = document.querySelectorAll('.event-btn');
    // eventButtons.forEach(button => {
    //     button.addEventListener('click', function() {
    //         const eventTitle = this.closest('.event-content').querySelector('h3').textContent;
    //         showNotification(`${eventTitle} 참가 신청이 완료되었습니다!`, 'success');
    //     });
    // });
    
    // 알림 메시지 표시 함수
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // 스타일 적용
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // 타입에 따른 배경색 설정
        if (type === 'success') {
            notification.style.backgroundColor = '#28a745';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#dc3545';
        } else {
            notification.style.backgroundColor = '#667eea';
        }
        
        document.body.appendChild(notification);
        
        // 애니메이션 표시
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 3초 후 제거
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // 현재 날짜 기준으로 추천 교육 하이라이트
    function highlightCurrentRecommendations() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // 0-based index
        
        // 4월, 5월 개강 과정을 특별히 하이라이트
        const recommendedCards = document.querySelectorAll('.recommended-card');
        
        recommendedCards.forEach(card => {
            const title = card.querySelector('h3').textContent;
            if (title.includes('4월') || title.includes('5월')) {
                card.classList.add('current-recommendation');
            }
        });
    }
    
    // 페이지 로드 시 실행
    highlightCurrentRecommendations();
    
    // 무료 행사 카운트다운 (예시)
    function updateEventCountdown() {
        const eventCards = document.querySelectorAll('.event-card');
        
        eventCards.forEach(card => {
            const eventDate = card.querySelector('.event-date');
            const month = eventDate.querySelector('.month').textContent;
            const day = eventDate.querySelector('.day').textContent;
            
            // 실제 구현에서는 날짜 계산 로직 추가
            // 여기서는 예시로 고정된 텍스트 사용
        });
    }
    
    // 페이지 로드 시 실행
    updateEventCountdown();
    
    // 스크롤 진행률 표시 (선택적)
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // 진행률 바가 있다면 업데이트
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }
    
    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', updateScrollProgress);
    
    // 로딩 애니메이션
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // 키보드 네비게이션 지원
    document.addEventListener('keydown', function(e) {
        // ESC 키로 모바일 메뉴 닫기
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// 추가 CSS 스타일 (동적으로 추가)
const additionalStyles = `
    .roadmap-item.animate {
        animation: slideInFromLeft 0.6s ease forwards;
    }
    
    .recommended-card.animate {
        animation: slideInFromBottom 0.6s ease forwards;
    }
    
    .event-card.animate {
        animation: slideInFromBottom 0.6s ease forwards;
    }
    
    .current-recommendation {
        border: 3px solid #28a745 !important;
        box-shadow: 0 0 20px rgba(40, 167, 69, 0.3) !important;
    }
    
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .header.scrolled {
        background: rgba(102, 126, 234, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(102, 126, 234, 0.95);
        backdrop-filter: blur(10px);
        padding: 1rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;

// 스타일 태그 생성 및 추가
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 