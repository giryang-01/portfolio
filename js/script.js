
$(document).ready(function () {

    // gnb
    window.addEventListener('scroll', function () {
        // .gnb-wrap 요소를 선택
        const gnbWrap = document.querySelector('.gnb-wrap');
        // 현재 스크롤 위치
        const scrollPosition = window.scrollY;

        // 특정 구간(예: 100px) 이상 스크롤되면 배경색을 추가
        if (scrollPosition > 100) {
            gnbWrap.classList.add('scrolled');
        } else {
            gnbWrap.classList.remove('scrolled');
        }
    });

    // Ready Go
    // 스크롤 이벤트 핸들러
    $(window).scroll(function () {
        // .blowing-text 요소가 화면에 보일 때마다 실행
        $('.blowing-text').each(function () {
            var $this = $(this);
    
            // 요소의 위치와 화면의 크기를 비교하여, 요소가 화면에 보일 때
            if ($this.offset().top + $this.outerHeight() > $(window).scrollTop() && $this.offset().top < $(window).scrollTop() + $(window).height()) {
                // 요소가 보일 때 'once' 클래스를 추가하여 애니메이션 실행
                if (!$this.hasClass('once')) {
                    $this.addClass('once');
                }
            } else {
                // 요소가 화면에 보이지 않을 때 'once' 클래스를 제거하여 애니메이션을 초기화
                $this.removeClass('once');
            }
        });
    });
    
    // 페이지 로딩 시 한번만 실행 (최초 로딩 시 보이는 경우)
    $(window).trigger('scroll');
    
    // skills
    $('.canvas').each(function () {
        // 퍼센트를 표시할 요소 선택
        const spanpercent = $(this).siblings('.percent');

        // 원의 테두리 너비(px) 및 애니메이션 지속 시간(ms) 정의 
        const border = 5;
        const duration = 700;

        // 캔버스 및 2D 컨텍스트 설정
        const canvas = $(this)[0];
        const ctx = canvas.getContext('2d');

        // 애니메이션에 필요한 변수 및 데이터 속성에서 목표 퍼센트 가져오기
        const targetPercent = $(this).data('percent');
        const posX = canvas.width / 2;
        const posY = canvas.height / 2;
        const onePercent = 360 / 100;
        const result = onePercent * targetPercent;
        const radius = (canvas.width / 2) - (border / 2);
        let percent = 0;
        ctx.lineCap = (targetPercent <= 0) ? 'butt' : 'round';

        // 원을 그리고 퍼센트 업데이트하는 함수
        function arcMove() {
            let degrees = 0;
            let startTime = null;

            // 애니메이션을 처리하는 함수
            function animate(timestamp) {
                if (!startTime) startTime = timestamp;
                let progress = (timestamp - startTime) / duration;
                progress = Math.min(1, progress);
                degrees = progress * result;

                // 캔버스 초기화 및 퍼센트 업데이트
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                percent = Math.floor(degrees / onePercent);
                spanpercent.text(percent);

                // 배경 선 그리기
                ctx.beginPath();
                ctx.arc(posX, posY, radius, 0, Math.PI * 2);
                ctx.strokeStyle = '#b1b1b1';
                ctx.lineWidth = border;
                ctx.stroke();

                // 애니메이션 되는 선 그리기
                ctx.beginPath();
                ctx.strokeStyle = '#333';
                ctx.lineWidth = border;
                ctx.arc(posX, posY, radius, Math.PI * -0.5, (Math.PI / 180) * degrees - (Math.PI / 2));
                ctx.stroke();

                // 애니메이션이 완료되지 않았다면 계속해서 프레임 요청
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }
            // 첫 프레임 요청
            requestAnimationFrame(animate);
        }

        // Intersection Observer로 skills 영역이 화면에 보일 때 애니메이션 시작
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    arcMove(); // 화면에 보이면 애니메이션 실행
                }
            });
        }, { threshold: 0.6 });  // 60% 이상 보일 때 트리거

        // 이 observer로 관찰할 대상 추가
        observer.observe($(this)[0]);
        // 애니메이션 함수 호출
        //arcMove();
    });

    // artwork
    // $('.artwork-wrap').show();
    // $('.artwork-card').hide();

    $('.artwork-menu li:nth-child(1)').on('click', function (e) {
        e.preventDefault();

        // .artwork-card가 보일 때 fadeOut() 후 .artwork-wrap fadeIn
        $('.artwork-card').fadeOut(function () {
            $('.artwork-wrap').fadeIn();
            $('.artwork-menu li:nth-child(1)').addClass('show');
            $('.artwork-menu li:nth-child(2)').removeClass('show');
        });
    });

    $('.artwork-menu li:nth-child(2)').on('click', function (e) {
        e.preventDefault();

        // .artwork-wrap이 fadeOut된 후 .artwork-card fadeIn
        $('.artwork-wrap').fadeOut(function () {
            $('.artwork-card').fadeIn();
            $('.artwork-menu li:nth-child(2)').addClass('show');
            $('.artwork-menu li:nth-child(1)').removeClass('show');
        });
    });

    // artwork-con
    $('.artwork-con a img').click(function (event) {
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
    $('.artwork-card ul').click(function (event) {
        event.preventDefault();

        var $img = $(this);
        var $clonedImg = $img.clone();
        var $overlay = $('.overlay');

        $clonedImg.addClass('card-zoomed');
        $overlay.fadeIn();
        $('body').append($clonedImg);
        $('html, body').css('overflow', 'hidden');

        $overlay.click(function () {
            $overlay.fadeOut();
            $clonedImg.remove();
            $('html, body').css('overflow', 'auto');
        })
    });

});