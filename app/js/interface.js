$(document).ready(() => {
	function AddEventText(mes) {
		// $(".mes").append("<div>" + mes + "</div>");
	}
	(function() {
		let RunFlag = false;
		let sections = $("section");
		let countSlide = sections.length;
		let AllowToMove = true;
		let links = $(".s-menu__link");
		let rnav = $(".rnav .rnav__link");

		let active = 0;

		function SetStyleFullpage(type, rightSide) {
			let rightElem = [$(".require-call, .footer__phone")];
			$(".wrapper").removeClass("style-white");
			$(".wrapper").removeClass("style-black");
			$(".footer").removeClass("style-white");
			$(".footer").removeClass("style-black");
			$(".require-call, .footer__phone").removeClass("style-white");
			$(".require-call, .footer__phone").removeClass("style-black");

			switch (type) {
				case "black":
					$(".wrapper").addClass("style-black");
					$(".footer").addClass("style-black");

					break;
				case "white":
					$(".wrapper").addClass("style-white");
					$(".footer").addClass("style-white");

					break;
			}

			if (rightSide) {
				switch (rightSide) {
					case "black":
						rightElem.forEach(el => {
							$(el).addClass("style-black");
						});

						break;
					case "white":
						rightElem.forEach(el => {
							$(el).addClass("style-white");
						});
						break;
				}
			}
		}
		function SetRnavId(id) {
			rnav.each((i, el) => {
				$(el).removeClass("is-active");
				if ($(el).attr("href") === "#" + id) {
					$(el).addClass("is-active");
				}
			});
		}
		function SetSizeSlide(id) {
			sections.each((i, e) => {
				$(e).css({
					height: window.innerHeight
				});
			});
		}
		function SetActiveLink(id) {
			links.each((i, e) => {
				$(e).removeClass("is-active");
				if ($(e).attr("href") === "#" + id) {
					$(e).addClass("is-active");
				}
			});
		}
		function SetSlideByHref(e) {
			e.preventDefault();
			if (!AllowToMove) {
				return false;
			}
			let href = $(e.target).attr("href");
			let id = sections.index($(href));
			if (active > id) {
				SetSlide(id, "down");
			}
			if (active < id) {
				SetSlide(id, "up");
			}
		}
		function SetSlide(newSlide, flag) {
			AllowToMove = false;
			let prevent = active;
			active = newSlide;
			let direct = flag == "up" ? -1 : 1;
			SetSizeSlide();
			SetActiveLink(sections.eq(active).attr("id"));
			SetStyleFullpage(
				sections.eq(active).attr("data-style"),
				sections.eq(active).attr("data-style-call")
			);
			SetRnavId(sections.eq(active).attr("id"));
			sections.eq(active).addClass("is-active");
			sections.eq(prevent).removeClass("is-active");
			sections.eq(active).css({
				top: -window.innerHeight * direct,
				height: window.innerHeight
			});
			sections.eq(prevent).animate(
				{
					top: window.innerHeight * direct
				},
				500
			);
			sections.eq(active).animate(
				{
					top: 0
				},
				500,
				function() {
					let prev = prevent;
					sections.eq(prev).css({
						top: window.innerHeight
					});
					AllowToMove = true;
				}
			);
		}

		var xDown = null;
		var yDown = null;

		function getTouches(evt) {
			return (
				evt.touches || evt.originalEvent.touches // browser API
			); // jQuery
		}

		function handleTouchStart(evt) {
			const firstTouch = getTouches(evt)[0];
			xDown = firstTouch.clientX;
			yDown = firstTouch.clientY;
		}

		function handleTouchMove(evt) {
			if (!xDown || !yDown) {
				return;
			}

			var xUp = evt.touches[0].clientX;
			var yUp = evt.touches[0].clientY;

			var xDiff = xDown - xUp;
			var yDiff = yDown - yUp;

			if (Math.abs(xDiff) > Math.abs(yDiff)) {
				/*most significant*/
				if (xDiff > 0) {
					/* left swipe */
				} else {
					/* right swipe */
				}
			} else {
				if (yDiff > 0) {
					if (countSlide > active + 1) {
						SetSlide(active + 1, "up");
					}
				} else {
					if (active - 1 >= 0) {
						SetSlide(active - 1, "down");
					}
				}
			}
			/* reset values */

			xDown = null;
			yDown = null;
		}
		function windowResizeHandler(e) {
			sections.each((id, el) => {
				if (id !== active) {
					$(el).css({
						top: window.innerHeight
					});
				}
			});
		}
		function fullPageWheel(e) {
			if (!AllowToMove) {
				return false;
			}
			if (event.deltaY === 100) {
				if (countSlide > active + 1) {
					SetSlide(active + 1, "up");
				}
			}
			if (event.deltaY === -100) {
				if (active - 1 >= 0) {
					SetSlide(active - 1, "down");
				}
			}
		}
		function START() {
			if (window.innerWidth > 853) {
				INIT();
			} else {
				DESTROY();
			}
		}
		function INIT() {
			if (RunFlag) {
				return false;
			}
			active = 0;
			$("#fullpage").css({
				oveflow: "hidden"
			});
			sections.css({
				position: "absolute",
				top: window.innerHeight,
				left: 0,
				width: "100%"
			});
			sections.eq(0).css({
				top: 0
			});
			document.addEventListener("touchstart", handleTouchStart, false);
			document.addEventListener("touchmove", handleTouchMove, false);
			links.on("click", SetSlideByHref);
			rnav.on("click", SetSlideByHref);
			window.addEventListener("resize", windowResizeHandler);
			$("#fullpage")[0].addEventListener("wheel", fullPageWheel);
			RunFlag = true;
		}
		function DESTROY() {
			if (!RunFlag) {
				return false;
			}
			$("#fullpage").css({
				oveflow: "auto"
			});
			$("#fullpage, body, html").addClass("scroll");
			sections.attr("style", "");
			document.removeEventListener("touchstart", handleTouchStart, false);
			document.removeEventListener("touchmove", handleTouchMove, false);
			links.off("click", SetSlideByHref);
			rnav.off("click", SetSlideByHref);
			window.removeEventListener("resize", windowResizeHandler);
			$("#fullpage")[0].removeEventListener("wheel", fullPageWheel);
			RunFlag = false;
		}
		/*START();
		window.addEventListener("resize", START);*/
	})();

	/** */
	(function() {
		let sections = $("section");
		let elColorChange = [
			".side-menu__toggle",
			".require-call",
			".footer__phone",
			".footer__guest"
		];
		function windowScroll() {
			$("main").removeClass("style-black");
			$("main").removeClass("style-white");

			elColorChange.forEach(el => {
				$(el).removeClass("style-black");
				$(el).removeClass("style-white");
			});
			let sct = $("body, html").scrollTop();
			sections.each((id, sec) => {
				elColorChange.forEach(el => {
					let scroll = document.getElementsByTagName("html")[0]
						.scrollTop;
					console.log($(sec).offset().top <= scroll + 20);
					if (
						$(sec).offset().top <= 50 + sct &&
						$(sec).offset().top + $(sec).innerHeight() >= 50 + sct
					) {
						switch ($(sec).attr("data-style")) {
							case "black":
								$(el).addClass("style-black");

								break;
							case "white":
								$(el).addClass("style-white");

								break;
						}
					}
				});
			});
		}
		window.addEventListener("scroll", windowScroll);
	})();
	/** */

	$(".side-menu")[0].addEventListener("wheel", function(e) {
		e.stopPropagation();
	});
	$(".b-tab__content").each((id, el) => {
		el.addEventListener("wheel", function(e) {
			e.stopPropagation();
		});
	});
	(function() {
		let toggle = $(".side-menu__toggle");
		let menu = $(".side-menu__nav");
		let bg = $(".side-menu__bg");
		function Open() {
			toggle.addClass("is-active");
			menu.addClass("is-active");
			bg.addClass("is-active");
		}
		function Close() {
			toggle.removeClass("is-active");
			menu.removeClass("is-active");
			bg.removeClass("is-active");
		}
		bg.on("click", () => {
			Close();
		});
		toggle.on("click", () => {
			if (toggle.hasClass("is-active")) {
				Close();
			} else {
				Open();
			}
		});
		$(".s-menu__link").on("click", Close);
	})();

	$(".js-slider").slick({
		slidesToShow: 1,
		dost: false,
		arrows: false
	});

	/*tabs*/
	function Tab(tab, props) {
		let links = $(tab).find(".b-tab__link");
		let content = $(tab).find(".b-tab__content");
		let changeEvent = null;
		if (
			props &&
			props.changeEvent &&
			typeof props.changeEvent === "function"
		) {
			changeEvent = props.changeEvent;
		}
		function setActive(id) {
			links.removeClass("is-active");
			content.removeClass("is-active");
			links.eq(id).addClass("is-active");
			content.eq(id).addClass("is-active");
		}
		setActive(0);
		links.on("click", function(e) {
			e.preventDefault();
			let id = links.index(e.target);
			setActive(id);
			if (typeof changeEvent === "function") {
				changeEvent(id);
			}
		});
		return {
			setActive: setActive
		};
	}

	function SplitedBlock(block) {
		let _this = $(block);

		let tab = Tab(_this.find(".b-tab"), {
			changeEvent: changeEvent
		});

		let slider = _this.find(".js-slider");
		if (slider.hasClass("slick-initialized")) {
			slider.slick("unslick");
		}
		slider.on("beforeChange", function(
			event,
			slick,
			currentSlide,
			nextSlide
		) {
			if (tab) {
				tab.setActive(nextSlide);
			}
		});
		slider = slider.slick({
			slidesToShow: 1,
			dost: false,
			arrows: false
		});
		function changeEvent(id) {
			slider.slick("slickGoTo", id);
		}
	}
	$(".tabs-slider").each((id, el) => {
		SplitedBlock(el);
	});

	/**Smart House  */
	let prevArrow = `<div class="arrow arrow--prev"><img src="img/arrow-left-white.svg"/></div>`;
	let nextArrow = `<div class="arrow arrow--next"><img src="img/arrow-right-white.svg"/></div>`;

	$(".b-devices__block").each((id, el) => {
		$(el)
			.find(".b-devices__slider")
			.slick({
				slidesToShow: 1,
				dots: false,
				appendArrows: $(el).find(".b-devices__slider-arrows"),
				prevArrow: prevArrow,
				nextArrow: nextArrow
			});
	});

	Tab($(".b-tab--express-req"));

	let prevArrowBlack = `<div class="arrow arrow--prev"><img src="img/arrow-left-black.svg"/></div>`;
	let nextArrowBlack = `<div class="arrow arrow--next"><img src="img/arrow-right-black.svg"/></div>`;
	$(".slider-contacts").slick({
		slidesToShow: 1,
		prevArrow: prevArrowBlack,
		nextArrow: nextArrowBlack
	});

	$(".call-us").on("click", function() {
		$.magnificPopup.open({
			items: {
				src: "#contact-us",
				type: "inline"
			}
		});
	});

	$(".contact-us").on("submit", function(e) {
		e.preventDefault();
		let name = $(this).find("[name='name']");
		let phone = $(this).find("[name='phone']");
		let email = $(this).find("[name='email']");

		name.removeClass("c-input--error");
		phone.removeClass("c-input--error");
		email.removeClass("c-input--error");

		if (!name || !phone || !email) {
			return false;
		}

		let nameVal = name.val().trim();
		let phoneVal = phone.val().trim();
		let emailVal = email.val().trim();

		if (nameVal === "") {
			name.addClass("c-input--error");
		}
		if (phoneVal === "") {
			phone.addClass("c-input--error");
		}
		if (emailVal === "") {
			email.addClass("c-input--error");
		}

		if (nameVal === "" || phoneVal === "" || emailVal === "") {
			return false;
		}
		console.log(
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim.test(
				emailVal
			)
		);
		if (
			!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim.test(
				emailVal
			)
		) {
			email.addClass("c-input--error");
			return false;
		}

		/**Send form */
		$(".contact-us__success-box").css("display", "flex");
		$(".contact-us__form").css("display", "none");
	});
});
