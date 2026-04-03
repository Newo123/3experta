import * as flsFunctions from "./modules//functions.js"

flsFunctions.isWebp();
flsFunctions.burgerMenu();
flsFunctions.popups();
flsFunctions.phoneMask();
/*==========================================================================
Particles
============================================================================*/
function initParticles() {
   const particlesBlocks = document.querySelectorAll('.particles-js');
   if (!particlesBlocks.length) return;

   particlesBlocks.forEach((block, index) => {
      const id = `particles-${index}`;
      block.id = id;

      particlesJS(id, {
         particles: {
            number: {
               value: 20,
               density: {
                  enable: true,
                  value_area: 1000
               }
            },
            color: {
               value: "#C2A75A",
            },
            shape: {
               type: "circle",
               stroke: {
                  width: 0,
                  color: "#000000"
               },
            },
            opacity: {
               random: false,
               anim: {
                  enable: false
               }
            },
            size: {
               value: 5,
               random: true,
            },
            line_linked: {
               enable: true,
               distance: 800,
               color: "#C2A75A",
               width: 1
            },
            move: {
               enable: true,
               speed: 2,
               out_mode: "out",
            }
         },
         retina_detect: true
      });
   });
}

initParticles();


/*==========================================================================
Hero slider
============================================================================*/
function initHeroSlider() {
   const slider = document.querySelector('.hero__slider');
   if (!slider) return;

   if (!slider.swiperInstance) {
      const swiper = new Swiper(slider, {
         effect: 'fade',
         loop: true,
         speed: 800,
         autoplay: {
            delay: 5000,
            disableOnInteraction: false,
         },
         pagination: {
            el: '.hero__pagination',
            clickable: true,
         },
         navigation: false,
      });

      swiper.on('slideChangeTransitionStart', () => {
         const previousSlide = slider.querySelector('.swiper-slide-prev');
         const currentSlide = slider.querySelector('.swiper-slide-active');

         if (previousSlide) {
            const prevTitle = previousSlide.querySelector('.hero__title');
            const prevSubtitle = previousSlide.querySelector('.hero__subtitle');
            const prevButton = previousSlide.querySelector('.hero__buttons');

            if (prevTitle) prevTitle.style.opacity = 0;
            if (prevSubtitle) prevSubtitle.style.opacity = 0;
            if (prevButton) prevButton.style.opacity = 0;
         }

         if (currentSlide) {
            const title = currentSlide.querySelector('.hero__title');
            const subtitle = currentSlide.querySelector('.hero__subtitle');
            const button = currentSlide.querySelector('.hero__buttons');

            if (title) {
               title.style.opacity = 0;
               title.style.transform = 'translateY(20px)';

               setTimeout(() => {
                  title.style.transition = 'all 0.6s ease';
                  title.style.opacity = 1;
                  title.style.transform = 'translateY(0)';
               }, 100);
            }

            if (subtitle) {
               subtitle.style.opacity = 0;
               subtitle.style.transform = 'translateY(20px)';

               setTimeout(() => {
                  subtitle.style.transition = 'all 0.6s ease';
                  subtitle.style.opacity = 1;
                  subtitle.style.transform = 'translateY(0)';
               }, 200);
            }

            if (button) {
               button.style.opacity = 0;
               button.style.transform = 'translateY(20px)';

               setTimeout(() => {
                  button.style.transition = 'all 0.6s ease';
                  button.style.opacity = 1;
                  button.style.transform = 'translateY(0)';
               }, 300);
            }
         }
      });

      slider.swiperInstance = swiper;
   }
}


/*==========================================================================
Advantages marque
============================================================================*/
function initPartnersSlider() {
   const slider = document.querySelector('.advantages__slider');
   if (!slider) return;

   if (!slider.swiperInstance) {
      const swiper = new Swiper(slider, {
         slidesPerView: 10,
         spaceBetween: 45,
         loop: true,
         allowTouchMove: false,
         speed: 2000,
         autoplay: {
            delay: 0,
            disableOnInteraction: false,
         },
         freeMode: true,
         freeModeMomentum: false,
         breakpoints: {
            320: {
               slidesPerView: 3,
               spaceBetween: 30,
            },
            480: {
               slidesPerView: 4,
               spaceBetween: 30,
            },
            768: {
               slidesPerView: 5,
               spaceBetween: 35,
            },
            980: {
               slidesPerView: 7,
               spaceBetween: 35,
            },
            1100: {
               slidesPerView: 9,
               spaceBetween: 40,
            },
            1300: {
               slidesPerView: 10,
               spaceBetween: 45,
            },
         }
      });

      slider.swiperInstance = swiper;
   }
}


/*==========================================================================
Audit 
============================================================================*/
/* function initAudit() {
   const audit = document.querySelector('.audit__main');
   if (!audit) return;

   const questions = audit.querySelectorAll('.audit__question');
   const nextBtn = audit.querySelector('.audit__next');
   const prevBtn = audit.querySelector('.audit__prev');
   const progressLine = audit.querySelector('.audit__progress-line');
   const progressText = audit.querySelector('.audit__progress-text');
   const error = audit.querySelector('.audit__error');
   let current = 0;
   const total = questions.length;

   function showQuestion(index) {
      questions.forEach((q, i) => {
         q.style.display = i === index ? 'block' : 'none';
      });

      updateButtons();
      updateProgress();
   }

   function updateButtons() {
      prevBtn.style.visibility = current === 0 ? 'hidden' : 'visible';
      const checked = questions[current].querySelector('input:checked');

      if (checked) {
         nextBtn.classList.remove('disabled');
         error.style.display = 'none';
      } else {
         nextBtn.classList.add('disabled');
      }
   }

   function updateProgress() {
      let answered = 0;

      questions.forEach((q) => {
         if (q.querySelector('input:checked')) {
            answered++;
         }
      });

      const percent = Math.round((answered / total) * 100);

      progressLine.style.maxWidth = percent + '%';
      progressText.textContent = percent + '%';
   }

   questions.forEach((question) => {
      const inputs = question.querySelectorAll('input');

      inputs.forEach((input) => {
         input.addEventListener('change', () => {
            nextBtn.classList.remove('disabled');
            error.style.display = 'none';
         });
      });
   });

   nextBtn.addEventListener('click', () => {
      const checked = questions[current].querySelector('input:checked');

      if (!checked) {
         error.style.display = 'flex';
         return;
      }

      if (current < total - 1) {
         current++;
         showQuestion(current);
      } else {
         console.log('Форма заполнена');
      }
   });

   prevBtn.addEventListener('click', () => {
      if (current > 0) {
         current--;
         showQuestion(current);
      }
   });
   showQuestion(current);
}
 */

/*==========================================================================
Cases slider
============================================================================*/
function initCasesSlider() {
   const casesSlider = document.querySelector('.cases__slider');
   if (!casesSlider) return;

   if (!casesSlider.swiperInstance) {
      const swiper = new Swiper(casesSlider, {
         slidesPerView: 2,
         spaceBetween: 32,
         loop: false,
         navigation: false,
         pagination: {
            el: '.cases__pagination',
            clickable: true,
         },
         breakpoints: {
            320: {
               slidesPerView: 1,
            },
            840: {
               slidesPerView: 2,
            }
         }
      });

      casesSlider.swiperInstance = swiper;
   }
}

/*==========================================================================
Law slider
============================================================================*/
function initLawsTabs() {
   const tabs = document.querySelectorAll('.laws__tab');
   const contents = document.querySelectorAll('.laws__content');
   const tabsBg = document.querySelector('.laws__tabs-bg');
   let swipers = [];

   function initSwipers(content) {
      const sliders = content.querySelectorAll('.swiper');
      sliders.forEach(slider => {
         if (!slider.swiperInstance) {
            const swiper = new Swiper(slider, {
               slidesPerView: 3,
               spaceBetween: 36,
               navigation: false,
               pagination: {
                  el: content.querySelector('.laws__pagination'),
                  clickable: true,
               },
               loop: false,
               autoplay: false,
               breakpoints: {
                  320: {
                     slidesPerView: 1,
                  },
                  768: {
                     slidesPerView: 2,
                  },
                  1000: {
                     slidesPerView: 3,
                  }
               }
            });
            slider.swiperInstance = swiper;
            swipers.push(swiper);
         }
      });
   }

   function moveTabsBg(tab) {
      if (!tabsBg) return;
      const rect = tab.getBoundingClientRect();
      const parentRect = tab.parentElement.getBoundingClientRect();
      tabsBg.style.width = `${rect.width}px`;
      tabsBg.style.left = `${rect.left - parentRect.left}px`;
   }

   function switchTab(tab) {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(c => {
         if (c.dataset.content === target) {
            c.classList.add('active');
            initSwipers(c);
         } else {
            c.classList.remove('active');
         }
      });

      moveTabsBg(tab);
   }

   if (tabs.length) {
      switchTab(tabs[0]);
   }

   tabs.forEach(tab => {
      tab.addEventListener('click', () => switchTab(tab));
   });

   window.addEventListener('resize', () => {
      const activeTab = document.querySelector('.laws__tab.active');
      if (activeTab) moveTabsBg(activeTab);
   });
}


/*==========================================================================
Reviews slider
============================================================================*/
function initReviewsSlider() {
   const bestSlider = document.querySelector('.reviews__slider');
   if (!bestSlider || typeof Swiper === 'undefined') return;

   function carouselEffect({ swiper, on, extendParams }) {
      extendParams({
         carouselEffect: {
            opacityStep: 0.33,
            scaleStep: 0.2,
            sideSlides: 2
         }
      });

      on('beforeInit', () => {
         if (swiper.params.effect !== 'carousel') return;

         swiper.classNames.push(
            `${swiper.params.containerModifierClass}carousel`
         );

         Object.assign(swiper.params, {
            watchSlidesProgress: true,
            centeredSlides: true
         });

         Object.assign(swiper.originalParams, {
            watchSlidesProgress: true,
            centeredSlides: true
         });
      });

      on('progress', () => {
         if (swiper.params.effect !== 'carousel') return;

         const { scaleStep, opacityStep, sideSlides } = swiper.params.carouselEffect;

         const maxSide = Math.max(Math.min(sideSlides, 3), 1);
         const l = { 1: 2, 2: 1, 3: 0.2 }[maxSide];
         const o = { 1: 50, 2: 50, 3: 67 }[maxSide];
         const slidesCount = swiper.slides.length;

         for (let i = 0; i < slidesCount; i++) {
            const slide = swiper.slides[i];
            const progress = slide.progress;
            const absProgress = Math.abs(progress);

            let modifier = 1;
            if (absProgress > 1) {
               modifier = (absProgress - 1) * 0.3 * l + 1;
            }

            const translate = `${progress * modifier * o * (swiper.rtlTranslate ? -1 : 1)}%`;
            const scale = 1 - absProgress * scaleStep;
            const zIndex = slidesCount - Math.abs(Math.round(progress));

            slide.style.transform = `translateX(${translate}) scale(${scale})`;
            slide.style.zIndex = zIndex;
            slide.style.opacity = absProgress > maxSide + 1 ? 0 : 1;

            slide
               .querySelectorAll('.swiper-carousel-animate-opacity')
               .forEach(el => {
                  el.style.opacity = 1 - absProgress * opacityStep;
               });
         }
      });

      on('resize', () => {
         if (swiper.virtual && swiper.params.virtual?.enabled) {
            requestAnimationFrame(() => {
               if (!swiper.destroyed) {
                  swiper.updateSlides();
                  swiper.updateProgress();
               }
            });
         }
      });

      on('setTransition', (_, duration) => {
         if (swiper.params.effect !== 'carousel') return;

         swiper.slides.forEach(slide => {
            slide.style.transitionDuration = `${duration}ms`;
            slide
               .querySelectorAll('.swiper-carousel-animate-opacity')
               .forEach(el => {
                  el.style.transitionDuration = `${duration}ms`;
               });
         });
      });
   }

   new Swiper(bestSlider, {
      effect: 'carousel',
      grabCursor: true,
      initialSlide: 2,
      loop: false,
      loopAdditionalSlides: 1,
      slidesPerView: 'auto',
      navigation: {
         prevEl: '.reviews__prev',
         nextEl: '.reviews__next',
      },
      modules: [carouselEffect]
   });
}


/*==========================================================================
faq
============================================================================*/
function initFaqAccordion() {
   const faqItems = document.querySelectorAll('.faq__item');
   if (!faqItems.length) return;

   faqItems.forEach((item, index) => {
      const question = item.querySelector('.faq__item-question');
      const answer = item.querySelector('.faq__answer');

      if (!question || !answer || item.dataset.inited) return;

      if (index === 0) {
         item.classList.add('active');
         answer.style.maxHeight = answer.scrollHeight + 'px';
      }

      question.addEventListener('click', () => {
         const isActive = item.classList.contains('active');

         faqItems.forEach(el => {
            const elAnswer = el.querySelector('.faq__answer');
            if (!elAnswer) return;

            el.classList.remove('active');
            elAnswer.style.maxHeight = null;
         });

         if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
         }
      });

      item.dataset.inited = 'true';
   });
}


/*==========================================================================
Move elements
============================================================================*/
function moveRequestAdv() {
   const BREAKPOINT = 767;

   const requests = document.querySelectorAll('.hero__request');

   if (!requests.length) return;

   requests.forEach(request => {
      const adv = request.querySelector('.hero__request-adv');
      const items = request.querySelectorAll('.hero__request-adv-item');
      const footer = request.querySelector('.hero__request-form-footer');

      if (!adv || !items.length || !footer) return;

      // создаём "якорь" для возврата
      if (!adv.dataset.placeholder) {
         const placeholder = document.createElement('div');
         placeholder.className = 'adv-placeholder';
         adv.parentNode.insertBefore(placeholder, adv);
         adv.dataset.placeholder = 'true';
         adv._placeholder = placeholder;
      }

      function moveToFooter() {
         items.forEach(item => {
            footer.appendChild(item);
         });
      }

      function moveBack() {
         const placeholder = adv._placeholder;
         if (!placeholder) return;

         items.forEach(item => {
            adv.appendChild(item);
         });
      }

      function check() {
         if (window.innerWidth <= BREAKPOINT) {
            moveToFooter();
         } else {
            moveBack();
         }
      }

      check();
      window.addEventListener('resize', check);
   });
}


/*==========================================================================
Bg header
============================================================================*/
function initHeaderScroll() {
   const header = document.querySelector('.header');
   if (!header) return;

   const toggleHeaderBg = () => {
      if (window.scrollY > 0) {
         header.classList.add('-bg');
      } else {
         header.classList.remove('-bg');
      }
   };

   toggleHeaderBg();
   window.addEventListener('scroll', toggleHeaderBg);
}


/*==========================================================================
Init
============================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   initHeroSlider();
   initPartnersSlider();
   /* initAudit(); */
   initCasesSlider();
   initLawsTabs();
   initReviewsSlider();
   initFaqAccordion();
   moveRequestAdv();
   initHeaderScroll();
})




const notyf = new Notyf({
  duration: 2000,
  position: {
    x: 'center',
    y: 'top',
  },
});



class Sendler {

  async submit(e) {
    e.preventDefault()

    e.target.querySelector('button[type="submit"]').disabled = true

    const req = await fetch(e.target.dataset.url, {
      method: 'POST',
      body: new FormData(e.target)
    })
    
    const res = await req.json()
    
    if (res.success) {
      notyf.success(res.message)
      e.target.reset();
      e.target?.closest('#request-popup')?.classList?.remove('show')
    } else if (!res.success) {
      notyf.error(res.message)
    }

    e.target.querySelector('button[type="submit"]').disabled = false

  }
}


const sendler = new Sendler()


window.addEventListener('submit', sendler.submit)



class Popup {
  async get(e) {

    if (e.target.dataset.url) {
      const req = await fetch(e.target.dataset.url)

      const res = await req.json()
      const parser = new DOMParser()
      const doc = parser.parseFromString(res.html, 'text/html')
      const popupElement = doc.body.firstElementChild

      document.body.appendChild(popupElement)
      document.body.classList.add('popup-opened')
      setTimeout(() => {
        popupElement.classList.add('show')
      }, 100)

    } else if (e.target.dataset.close) {
      document.body.classList.remove('popup-opened')
      
      setTimeout(() => {
        e.target.remove()
      }, 400)

    }

    
  }
}


const popup = new Popup()

window.addEventListener('click', popup.get)