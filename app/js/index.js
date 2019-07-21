"use strict";

!function () {
  var mapCreated = false;

  function CreateMap() {
    mapCreated = true;
    ymaps.ready(function () {
      var myMap = new ymaps.Map("map", {
        center: [53.931944, 27.57836],
        zoom: 17
      }, {
        searchControlProvider: "yandex#search"
      }),
          myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {});
      myMap.geoObjects.add(myPlacemark);
    });
  }

  function scroll() {
    var htmlS = document.querySelector("html").scrollTop;
    var bodyS = document.querySelector("body").scrollTop;
    var offset = document.getElementById("map").offsetTop;

    if (htmlS + window.innerHeight >= offset || bodyS + window.innerHeight >= offset) {
      if (mapCreated == false) {
        mapCreated = true;
        var script = document.createElement("script");
        script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
        var head = document.querySelector("head");
        head.appendChild(script);

        script.onload = function () {
          setTimeout(function () {
            CreateMap();
          }, 1000);
        };
      }
    }
  }

  window.addEventListener("scroll", function () {
    if (mapCreated == false) {
      scroll();
    }
  });
}();
"use strict";

$(document).ready(function () {
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

  (function () {
    $("#fullpage").css({
      oveflow: "hidden"
    });
    var sections = $("section");
    var countSlide = sections.length;
    var AllowToMove = true;
    sections.css({
      position: "absolute",
      top: window.innerHeight,
      left: 0,
      width: "100%"
    });
    var active = 0;

    function SetSizeSlide(id) {
      sections.each(function (i, e) {
        $(e).css({
          height: window.innerHeight
        });
      });
      AddEventText("setSize= " + window.innerHeight);
    }

    function SetSlide(newSlide, flag) {
      AllowToMove = false;
      var prevent = active;
      active = newSlide;
      var direct = flag == "up" ? -1 : 1;
      SetSizeSlide();
      AddEventText(window.outerHeight);
      sections.eq(active).css({
        top: -window.innerHeight * direct,
        height: window.innerHeight
      });
      sections.eq(prevent).animate({
        top: window.innerHeight * direct
      }, 1000);
      sections.eq(active).animate({
        top: 0
      }, 1000, function () {
        var prev = prevent;
        sections.eq(prev).css({
          top: window.innerHeight
        });
        AllowToMove = true;
      });
    }

    sections.eq(0).css({
      top: 0
    });
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);
    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
      return evt.touches || evt.originalEvent.touches // browser API
      ; // jQuery
    }

    function handleTouchStart(evt) {
      var firstTouch = getTouches(evt)[0];
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

    window.addEventListener("resize", function () {
      sections.each(function (id, el) {
        if (id !== active) {
          $(el).css({
            top: window.innerHeight
          });
        }
      });
    });
    window.addEventListener("wheel", function (event) {
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

  (function () {
    var toggle = $(".side-menu__toggle");
    var menu = $(".side-menu__nav");
    var bg = $(".side-menu__bg");

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

    bg.on("click", function () {
      Close();
    });
    toggle.on("click", function () {
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
    var links = $(tab).find(".b-tab__link");
    var content = $(tab).find(".b-tab__content");
    var changeEvent = null;

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
    links.on("click", function (e) {
      e.preventDefault();
      var id = links.index(e.target);
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
    var _this = $(block);

    var tab = Tab(_this.find(".b-tab"), {
      changeEvent: changeEvent
    });

    var slider = _this.find(".js-slider");

    if (slider.hasClass("slick-initialized")) {
      slider.slick("unslick");
    }

    slider.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
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

  $(".tabs-slider").each(function (id, el) {
    SplitedBlock(el);
  });
  /**Smart House  */

  var prevArrow = "<div class=\"arrow arrow--prev\"><img src=\"img/arrow-left-white.svg\"/></div>";
  var nextArrow = "<div class=\"arrow arrow--next\"><img src=\"img/arrow-right-white.svg\"/></div>";
  $(".b-devices__block").each(function (id, el) {
    $(el).find(".b-devices__slider").slick({
      slidesToShow: 1,
      dots: false,
      appendArrows: $(el).find(".b-devices__slider-arrows"),
      prevArrow: prevArrow,
      nextArrow: nextArrow
    });
  });
  Tab($(".b-tab--express-req"));
  var prevArrowBlack = "<div class=\"arrow arrow--prev\"><img src=\"img/arrow-left-black.svg\"/></div>";
  var nextArrowBlack = "<div class=\"arrow arrow--next\"><img src=\"img/arrow-right-black.svg\"/></div>";
  $(".slider-contacts").slick({
    slidesToShow: 1,
    prevArrow: prevArrowBlack,
    nextArrow: nextArrowBlack
  });
});
//# sourceMappingURL=index.js.map
