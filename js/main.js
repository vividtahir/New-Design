/**
 * Endurmenntunarferðir & Smart Teachers Play More
 * Interactive Scripts & Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Navigation Drawer
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Destination Filter Tabs
  const filterBtns = document.querySelectorAll('.dest-filter-btn');
  const destCards = document.querySelectorAll('.destination-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      destCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. London 2026 QR Modal
  const openQrModalBtns = document.querySelectorAll('.open-qr-modal');
  const qrModal = document.getElementById('qrModal');
  const closeQrModalBtn = document.getElementById('closeQrModalBtn');

  function openQrModal(e) {
    if (e) e.preventDefault();
    if (qrModal) {
      qrModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeQrModal() {
    if (qrModal) {
      qrModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openQrModalBtns.forEach(btn => {
    btn.addEventListener('click', openQrModal);
  });

  if (closeQrModalBtn) closeQrModalBtn.addEventListener('click', closeQrModal);
  if (qrModal) {
    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) closeQrModal();
    });
  }

  // 5. Inquiry Form Submission & Toast
  const inquiryForm = document.getElementById('inquiryForm');
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(message, duration = 4000) {
    if (!toastNotice) return;
    toastMessage.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, duration);
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sendi fyrirspurn...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        inquiryForm.reset();
        showToast('Takk fyrir! Fyrirspurn þín hefur verið send. Við höfum samband fljótlega.');
      }, 1000);
    });
  }

  // 6. Photo Lightbox Modal
  const lightboxModal = document.getElementById('photoLightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

  function openLightbox(trigger) {
    if (!lightboxModal) return;
    const fullSrc = trigger.getAttribute('data-full') || trigger.querySelector('img')?.src;
    const title = trigger.getAttribute('data-title') || trigger.querySelector('.gallery-card-title')?.textContent;
    const desc = trigger.getAttribute('data-desc') || trigger.querySelector('.gallery-card-desc')?.textContent;

    if (lightboxImg) lightboxImg.src = fullSrc;
    if (lightboxTitle) lightboxTitle.textContent = title || '';
    if (lightboxDesc) lightboxDesc.textContent = desc || '';

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => openLightbox(trigger));
  });

  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // 7. General / Destination Inquiry Modal
  const inquiryModal = document.getElementById('inquiryModal');
  const closeInquiryModalBtn = document.getElementById('closeInquiryModalBtn');
  const openInquiryModalBtns = document.querySelectorAll('.open-inquiry-modal');
  const modalDestSelect = document.getElementById('modalDestSelect');
  const destInquiryForm = document.getElementById('destinationInquiryForm');

  function openInquiryModal(btn) {
    if (!inquiryModal) return;
    const dest = btn?.getAttribute('data-destination');
    if (dest && modalDestSelect) {
      for (let i = 0; i < modalDestSelect.options.length; i++) {
        if (modalDestSelect.options[i].value.toLowerCase().includes(dest.toLowerCase())) {
          modalDestSelect.selectedIndex = i;
          break;
        }
      }
    }
    inquiryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeInquiryModal() {
    if (!inquiryModal) return;
    inquiryModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openInquiryModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // If lightbox is open, close it
      closeLightbox();
      openInquiryModal(btn);
    });
  });

  if (closeInquiryModalBtn) closeInquiryModalBtn.addEventListener('click', closeInquiryModal);
  if (inquiryModal) {
    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) closeInquiryModal();
    });
  }

  if (destInquiryForm) {
    destInquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = destInquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sendi tilboðsbeiðni...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        destInquiryForm.reset();
        closeInquiryModal();
        showToast('Takk fyrir! Tilboðsbeiðni þín hefur verið móttekin. Við svörum innan 24 klst.');
      }, 900);
    });
  }

  // 8. Custom Destination Planner Form
  const customPlannerForm = document.getElementById('customPlannerForm');
  if (customPlannerForm) {
    customPlannerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dest = document.getElementById('plannerDestination')?.value || '';
      const submitBtn = customPlannerForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sendi hugmynd...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        customPlannerForm.reset();
        showToast(`Takk fyrir! Tillaga vegna ${dest || 'áfangastaðar'} hefur verið send.`);
      }, 900);
    });
  }

  // 9. Keyboard Escape handler for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeInquiryModal();
    }
  });

  // 10. Destination Dock active scrollspy
  const destDockItems = document.querySelectorAll('.dest-dock-item');
  const destSections = document.querySelectorAll('.dest-section-block');

  if (destDockItems.length > 0 && destSections.length > 0) {
    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.scrollY + 180;

      destSections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        destDockItems.forEach(item => {
          const href = item.getAttribute('href');
          if (href === `#${currentSectionId}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }

  // 11. Smooth Scrolling for all in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

