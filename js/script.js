
$(document).ready(function () {

    // gnb
    window.addEventListener('scroll', function () {
        const gnbWrap = document.querySelector('.gnb-wrap');
        const scrollPosition = window.scrollY;

        if (scrollPosition > 100) {
            gnbWrap.classList.add('scrolled');
        } else {
            gnbWrap.classList.remove('scrolled');
        }
    });

    // Ready Go
    $(window).scroll(function () {
        $('.blowing-text').each(function () {
            var $this = $(this);

            if ($this.offset().top + $this.outerHeight() > $(window).scrollTop() && $this.offset().top < $(window).scrollTop() + $(window).height()) {
                if (!$this.hasClass('once')) {
                    $this.addClass('once');
                }
            } else {
                $this.removeClass('once');
            }
        });
    });

    $(window).trigger('scroll');

    // skills
    $('.canvas').each(function () {
        const spanpercent = $(this).siblings('.percent');

        const border = 5;
        const duration = 700;

        const canvas = $(this)[0];
        const ctx = canvas.getContext('2d');

        const targetPercent = $(this).data('percent');
        const posX = canvas.width / 2;
        const posY = canvas.height / 2;
        const onePercent = 360 / 100;
        const result = onePercent * targetPercent;
        const radius = (canvas.width / 2) - (border / 2);
        let percent = 0;
        ctx.lineCap = (targetPercent <= 0) ? 'butt' : 'round';

        function arcMove() {
            let degrees = 0;
            let startTime = null;

            function animate(timestamp) {
                if (!startTime) startTime = timestamp;
                let progress = (timestamp - startTime) / duration;
                progress = Math.min(1, progress);
                degrees = progress * result;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                percent = Math.floor(degrees / onePercent);
                spanpercent.text(percent);

                ctx.beginPath();
                ctx.arc(posX, posY, radius, 0, Math.PI * 2);
                ctx.strokeStyle = '#e0e0e0';
                ctx.lineWidth = border;
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = '#121212';
                ctx.lineWidth = border;
                ctx.arc(posX, posY, radius, Math.PI * -0.5, (Math.PI / 180) * degrees - (Math.PI / 2));
                ctx.stroke();

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }
            requestAnimationFrame(animate);
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    arcMove();
                }
            });
        }, { threshold: 0.6 });

        observer.observe($(this)[0]);
    });

    // artwork
    $('.artwork-menu li:nth-child(1)').on('click', function (e) {
        e.preventDefault();

        $('.artwork-menu li:nth-child(1)').addClass('show');
        $('.artwork-menu li:nth-child(2)').removeClass('show');

        $('.card-wrap').fadeOut(function () {
            $('.artwork-wrap').fadeIn();
        });
    });

    $('.artwork-menu li:nth-child(2)').on('click', function (e) {
        e.preventDefault();

        $('.artwork-menu li:nth-child(2)').addClass('show');
        $('.artwork-menu li:nth-child(1)').removeClass('show');

        $('.artwork-wrap').fadeOut(function () {
            $('.card-wrap').fadeIn();
        });
    });

    // artwork-con
    $('.artwork-con a img').click(function (event) {
        if ($(window).width() <= 767) {
            event.preventDefault();
            return;
        }

        event.preventDefault();

        var $img = $(this);
        var $clonedImg = $img.clone();
        var $overlay = $('.overlay');

        $clonedImg.addClass('con-zoomed');
        $overlay.fadeIn();
        $('body').append($clonedImg);
        $('html, body').css('overflow', 'hidden');

        $overlay.click(function () {
            $overlay.fadeOut();
            $clonedImg.remove();
            $('html, body').css('overflow', 'auto');
        })
    });

    // artwork-card

    var swiper = new Swiper(".mySwiper", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
  
  });