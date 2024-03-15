"use strict"

// spolers
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length>0) {
    //отримання звичайних спойлерів
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
        return !item.dataset.spollers.split(",")[0];
    });
    //ініціалізація звичайних спойлерів
    if (spollersRegular.length>0) {
        initSpollers(spollersRegular);
    }
    // Ініціалізація
    function initSpollers(spollersArray, mathMedia = false) {
        spollersArray.forEach(spollersBlock => {
            spollersBlock = mathMedia ? spollersBlock.item : spollersBlock;
            if (mathMedia.matches || !matchMedia) {
                spollersBlock.classList.add('_init');
                initSpollerBody(spollersBlock);
                spollersBlock.addEventListener("click", setSpollerAction);
            } else {
                spollersBlock.classList.remove('_init');
                initSpollerBody(spollersBlock, false);
                spollersBlock.removeEventListener("click", setSpollerAction);
            }
        });
    }
    //Робота з контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
        if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
                if (hideSpollerBody) {
                    spollerTitle.removeAttribute('tabindex');
                    if (!spollerTitle.classList.contains('_active')){
                        spollerTitle.nextElementSibling.hidden = true;
                    }
                } else {
                    spollerTitle.setAttribute('tabindex', '-1');
                    spollerTitle.nextElementSibling.hidden = false;
                }
            })
        }
    }
    function setSpollerAction(e) {
        const el = e.target;
        if (el.hasAttributes('data-spoller') ||el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttributes('data-spoller') ? el : el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
            if (!spollersBlock.querySelectorAll('._slide').length) {
                if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                    hideSpollersBody(spollersBlock);
                }
                spollerTitle.classList.toggle('_active');
                _slideToggle(spollerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
        }
    }
    function hideSpollersBody(spollersBody) {
        const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
        if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('._active');
            _slideUp(spollerActiveTitle.nextElementSibling, 500);
        }
    }
}


let scrolElements = document.querySelectorAll('[data-scroll-to]');
if (scrolElements.length) {
    scrolElements.forEach(btn=>{
        btn.addEventListener('click', (e)=>{
            e.preventDefault();
            let element = document.querySelector(btn.dataset.scrollTo);
            if (element) {
                let top = Math.abs(document.body.getBoundingClientRect().top)+ element.getBoundingClientRect().top;
                window.scrollTo({
                    top: top - 20,
                    behavior: 'smooth',
                })
            }
        })
    })
}












