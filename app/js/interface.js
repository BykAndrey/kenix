$(document).ready(() => {
	/*$("#fullpage").pagepiling({
		sectionSelector: "section",
		anchors: [
			"first",
			"scenarios",
			"controll",
			"b-why",
			"devices",
			"company",
			"portfolio",
			"experess",
			"contacts"
		]
	});
	*/
	$("#fullpage").css({
		oveflow: "hidden"
	});
	let sections = $("section");
	sections.css({
		position: "absolute",
		top: window.innerHeight,
		left: 0,
		width: "100%"
	});
	let active = 0;
	window.addEventListener("wheel", event => {
		if (event.deltaY === 100) {
			let prevent = active;
			active += 1;
			sections.eq(prevent).animate(
				{
					top: -window.innerHeight
				},
				1000
			);
			sections.eq(active).animate(
				{
					top: 0
				},
				1000,
				function() {
					let prev = prevent;
					sections.eq(prev).css({
						top: window.innerHeight
					});
				}
			);
		}
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
	/*$(".b-tab--scenar").each((id, el) => {
		scenarTab = Tab(el, {
			changeEvent(id) {
				$(".b-splited__slider").slick("slickGoTo", id);
			}
		});
	});*/

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
});
