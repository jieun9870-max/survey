'use strict';

// ── 스크롤 fade-in (Intersection Observer) ──
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  fadeEls.forEach((el) => observer.observe(el));
}

// ── Navbar 스크롤 블러 ──
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 초기 실행
}

// ── 모바일 햄버거 메뉴 ──
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIconOpen = document.getElementById('menu-icon-open');
const menuIconClose = document.getElementById('menu-icon-close');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuIconOpen.classList.toggle('hidden', !isOpen);
    menuIconClose.classList.toggle('hidden', isOpen);
  });

  // 모바일 메뉴 링크 클릭 시 자동 닫기
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    });
  });
}

// ── FAQ 아코디언 ──
const faqList = document.getElementById('faq-list');
if (faqList) {
  faqList.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-question');
    if (!btn) return;

    const answerId = btn.getAttribute('aria-controls');
    const answer = document.getElementById(answerId);
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';

    // 다른 항목 모두 닫기
    faqList.querySelectorAll('.faq-question').forEach((q) => {
      if (q !== btn) {
        q.setAttribute('aria-expanded', 'false');
        const otherId = q.getAttribute('aria-controls');
        document.getElementById(otherId)?.classList.remove('open');
      }
    });

    // 현재 항목 토글
    btn.setAttribute('aria-expanded', String(!isExpanded));
    answer?.classList.toggle('open', !isExpanded);
  });
}

// ── 폼 유효성 검사 ──
const form = document.getElementById('coupon-form');
if (form) {
  form.addEventListener('submit', (e) => {
    let valid = true;

    // 이름
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (!nameInput.value.trim()) {
      nameError.classList.add('show');
      nameInput.setAttribute('aria-invalid', 'true');
      valid = false;
    } else {
      nameError.classList.remove('show');
      nameInput.setAttribute('aria-invalid', 'false');
    }

    // 이메일
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
      emailError.classList.add('show');
      emailInput.setAttribute('aria-invalid', 'true');
      valid = false;
    } else {
      emailError.classList.remove('show');
      emailInput.setAttribute('aria-invalid', 'false');
    }

    // 설문 완료 체크박스
    const surveyDone = document.getElementById('survey-done');
    const surveyDoneError = document.getElementById('survey-done-error');
    if (!surveyDone.checked) {
      surveyDoneError.classList.add('show');
      valid = false;
    } else {
      surveyDoneError.classList.remove('show');
    }

    // 개인정보 동의 체크박스
    const privacy = document.getElementById('privacy');
    const privacyError = document.getElementById('privacy-error');
    if (!privacy.checked) {
      privacyError.classList.add('show');
      valid = false;
    } else {
      privacyError.classList.remove('show');
    }

    if (!valid) {
      e.preventDefault();
      // 첫 번째 에러로 포커스
      const firstError = form.querySelector('[aria-invalid="true"]');
      firstError?.focus();
    }
  });

  // 입력 시 실시간 에러 해제
  ['name', 'email'].forEach((id) => {
    const input = document.getElementById(id);
    input?.addEventListener('input', () => {
      const error = document.getElementById(`${id}-error`);
      if (input.value.trim()) {
        error?.classList.remove('show');
        input.setAttribute('aria-invalid', 'false');
      }
    });
  });
}

// ── 부드러운 스크롤 (href="#..." 앵커) ──
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href').slice(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
