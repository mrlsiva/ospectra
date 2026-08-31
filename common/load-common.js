(function () {
    const scriptTag = document.currentScript;
    const scriptSrc = scriptTag && scriptTag.src ? scriptTag.src : '';
    const baseUrl = scriptSrc ? scriptSrc.replace(/load-common\.js.*$/, '') : './';
    const rootUrl = baseUrl.replace(/common\/$/, '');

    const pageRoutes = {
        home: 'index.html',
        about: 'About/',
        platform: 'Plaform/',
        solutions: 'AI-Labs/',
        homecare: 'Home-Care/',
        career: 'Career/',
        contact: 'Contact/'
    };

    function getCurrentPageKey() {
        const pathname = window.location.pathname.toLowerCase();
        if (pathname.endsWith('/index.html') || pathname === '/' || pathname === '') return 'home';
        if (pathname.includes('/about/')) return 'about';
        if (pathname.includes('/plaform/') || pathname.includes('/platform_new/')) return 'platform';
        if (pathname.includes('/solutions/') || pathname.includes('/ai-labs/')) return 'solutions';
        if (pathname.includes('/home-care/')) return 'homecare';
        if (pathname.includes('/career/')) return 'career';
        if (pathname.includes('/contact/')) return 'contact';
        return 'home';
    }

    function resolvePageLink(key) {
        const target = pageRoutes[key] || pageRoutes.home;
        return new URL(target, rootUrl).toString();
    }

    function applyActiveState() {
        const pageKey = getCurrentPageKey();
        document.querySelectorAll('[data-page]').forEach(function (element) {
            const itemPage = element.getAttribute('data-page');
            if (element.matches('.nav-item')) {
                element.classList.toggle('active', itemPage === pageKey);
            }
            if (element.tagName === 'A' && itemPage) {
                element.setAttribute('href', resolvePageLink(itemPage));
            }
        });
    }

    function bindHeaderInteractions() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'auto' : 'hidden';
        });

        document.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.querySelectorAll('.submenu-toggle').forEach(function (toggle) {
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const parent = toggle.closest('.has-submenu');
                if (parent) {
                    parent.classList.toggle('submenu-open');
                }
            });
        });

        document.querySelectorAll('.submenu-link').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                const parent = link.closest('.has-submenu');
                if (parent) {
                    parent.classList.remove('submenu-open');
                }
            });
        });
    }

    async function loadCommonMarkup() {
        try {
            const navResponse = await fetch(baseUrl + 'nav.html');
            const footerResponse = await fetch(baseUrl + 'footer.html');
            if (!navResponse.ok || !footerResponse.ok) {
                throw new Error('nav/footer request failed: ' + navResponse.status + '/' + footerResponse.status);
            }
            let navHtml = await navResponse.text();
            let footerHtml = await footerResponse.text();

            navHtml = navHtml.split('{{ROOT}}').join(rootUrl);
            footerHtml = footerHtml.split('{{ROOT}}').join(rootUrl);

            const navTarget = document.getElementById('site-nav');
            const footerTarget = document.getElementById('site-footer');

            if (navTarget) {
                navTarget.innerHTML = navHtml;
            }
            if (footerTarget) {
                footerTarget.innerHTML = footerHtml;
            }

            document.querySelectorAll('header, footer, .bj-footerbgblock').forEach(function (el) {
                if (el.closest('#site-nav') || el.closest('#site-footer')) return;
                el.style.display = 'none';
            });

            applyActiveState();
            bindHeaderInteractions();
        } catch (err) {
            console.warn('Common nav/footer failed to load:', err);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadCommonMarkup);
    } else {
        loadCommonMarkup();
    }
})();
