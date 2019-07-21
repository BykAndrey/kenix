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
  function AddEventText(mes) {
    $(".mes").append("<div>" + mes + "</div>");
  }
  (function() {
    $("#fullpage").css({
      oveflow: "hidden"
    });
    let sections = $("section");
    let countSlide = sections.length;
    let AllowToMove = true;
    sections.css({
      position: "absolute",
      top: window.innerHeight,
      left: 0,
      width: "100%"
    });
    let active = 0;
    function SetSizeSlide(id) {
      sections.each((i, e) => {
        $(e).css({
          height: window.innerHeight
        });
      });

      AddEventText("setSize= " + window.innerHeight);
    }
    function SetSlide(newSlide, flag) {
      AllowToMove = false;
      let prevent = active;
      active = newSlide;
      let direct = flag == "up" ? -1 : 1;
      SetSizeSlide();
      AddEventText(window.outerHeight);
      sections.eq(active).css({
        top: -window.innerHeight * direct,
        height: window.innerHeight
      });
      sections.eq(prevent).animate(
        {
          top: window.innerHeight * direct
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
          AllowToMove = true;
        }
      );
    }
    sections.eq(0).css({
      top: 0
    });
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);

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
    window.addEventListener("resize", () => {
      sections.each((id, el) => {
        if (id !== active) {
          $(el).css({
            top: window.innerHeight
          });
        }
      });
    });
    window.addEventListener("wheel", event => {
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
    });
  })();
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
    if (props && props.changeEvent && typeof props.changeEvent === "function") {
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
    slider.on("beforeChange", function(event, slick, currentSlide, nextSlide) {
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
