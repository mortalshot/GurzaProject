"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//libs
!function (i) {
  "use strict";

  "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery);
}(function (i) {
  "use strict";

  var e = window.Slick || {};
  (e = function () {
    var e = 0;
    return function (t, o) {
      var s,
          n = this;
      n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(t),
        appendDots: i(t),
        arrows: !0,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function customPaging(e, t) {
          return i('<button type="button" />').text(t + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: .35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3
      }, n.initials = {
        animating: !1,
        dragging: !1,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: !1,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: !1,
        slideOffset: 0,
        swipeLeft: null,
        swiping: !1,
        $list: null,
        touchObject: {},
        transformsEnabled: !1,
        unslicked: !1
      }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0);
    };
  }()).prototype.activateADA = function () {
    this.$slideTrack.find(".slick-active").attr({
      "aria-hidden": "false"
    }).find("a, input, button, select").attr({
      tabindex: "0"
    });
  }, e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
    var s = this;
    if ("boolean" == typeof t) o = t, t = null;else if (t < 0 || t >= s.slideCount) return !1;
    s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function (e, t) {
      i(t).attr("data-slick-index", e);
    }), s.$slidesCache = s.$slides, s.reinit();
  }, e.prototype.animateHeight = function () {
    var i = this;

    if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
      var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
      i.$list.animate({
        height: e
      }, i.options.speed);
    }
  }, e.prototype.animateSlide = function (e, t) {
    var o = {},
        s = this;
    s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
      left: e
    }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
      top: e
    }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
      animStart: s.currentLeft
    }).animate({
      animStart: e
    }, {
      duration: s.options.speed,
      easing: s.options.easing,
      step: function step(i) {
        i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o));
      },
      complete: function complete() {
        t && t.call();
      }
    })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function () {
      s.disableTransition(), t.call();
    }, s.options.speed));
  }, e.prototype.getNavTarget = function () {
    var e = this,
        t = e.options.asNavFor;
    return t && null !== t && (t = i(t).not(e.$slider)), t;
  }, e.prototype.asNavFor = function (e) {
    var t = this.getNavTarget();
    null !== t && "object" == _typeof(t) && t.each(function () {
      var t = i(this).slick("getSlick");
      t.unslicked || t.slideHandler(e, !0);
    });
  }, e.prototype.applyTransition = function (i) {
    var e = this,
        t = {};
    !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
  }, e.prototype.autoPlay = function () {
    var i = this;
    i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed));
  }, e.prototype.autoPlayClear = function () {
    var i = this;
    i.autoPlayTimer && clearInterval(i.autoPlayTimer);
  }, e.prototype.autoPlayIterator = function () {
    var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
    i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e));
  }, e.prototype.buildArrows = function () {
    var e = this;
    !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
      "aria-disabled": "true",
      tabindex: "-1"
    }));
  }, e.prototype.buildDots = function () {
    var e,
        t,
        o = this;

    if (!0 === o.options.dots) {
      for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) {
        t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
      }

      o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active");
    }
  }, e.prototype.buildOut = function () {
    var e = this;
    e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t) {
      i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "");
    }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable");
  }, e.prototype.buildRows = function () {
    var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this;

    if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
      for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
        var d = document.createElement("div");

        for (e = 0; e < l.options.rows; e++) {
          var a = document.createElement("div");

          for (t = 0; t < l.options.slidesPerRow; t++) {
            var c = i * r + (e * l.options.slidesPerRow + t);
            n.get(c) && a.appendChild(n.get(c));
          }

          d.appendChild(a);
        }

        o.appendChild(d);
      }

      l.$slider.empty().append(o), l.$slider.children().children().children().css({
        width: 100 / l.options.slidesPerRow + "%",
        display: "inline-block"
      });
    }
  }, e.prototype.checkResponsive = function (e, t) {
    var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();

    if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
      s = null;

      for (o in r.breakpoints) {
        r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
      }

      null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
    }
  }, e.prototype.changeSlide = function (e, t) {
    var o,
        s,
        n,
        r = this,
        l = i(e.currentTarget);

    switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
      case "previous":
        s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
        break;

      case "next":
        s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
        break;

      case "index":
        var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
        r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
        break;

      default:
        return;
    }
  }, e.prototype.checkNavigable = function (i) {
    var e, t;
    if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];else for (var o in e) {
      if (i < e[o]) {
        i = t;
        break;
      }

      t = e[o];
    }
    return i;
  }, e.prototype.cleanUpEvents = function () {
    var e = this;
    e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
  }, e.prototype.cleanUpSlideEvents = function () {
    var e = this;
    e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
  }, e.prototype.cleanUpRows = function () {
    var i,
        e = this;
    e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i));
  }, e.prototype.clickHandler = function (i) {
    !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
  }, e.prototype.destroy = function (e) {
    var t = this;
    t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
      i(this).attr("style", i(this).data("originalStyling"));
    }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t]);
  }, e.prototype.disableTransition = function (i) {
    var e = this,
        t = {};
    t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
  }, e.prototype.fadeSlide = function (i, e) {
    var t = this;
    !1 === t.cssTransitions ? (t.$slides.eq(i).css({
      zIndex: t.options.zIndex
    }), t.$slides.eq(i).animate({
      opacity: 1
    }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
      opacity: 1,
      zIndex: t.options.zIndex
    }), e && setTimeout(function () {
      t.disableTransition(i), e.call();
    }, t.options.speed));
  }, e.prototype.fadeSlideOut = function (i) {
    var e = this;
    !1 === e.cssTransitions ? e.$slides.eq(i).animate({
      opacity: 0,
      zIndex: e.options.zIndex - 2
    }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
      opacity: 0,
      zIndex: e.options.zIndex - 2
    }));
  }, e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
    var e = this;
    null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit());
  }, e.prototype.focusHandler = function () {
    var e = this;
    e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (t) {
      t.stopImmediatePropagation();
      var o = i(this);
      setTimeout(function () {
        e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay());
      }, 0);
    });
  }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
    return this.currentSlide;
  }, e.prototype.getDotCount = function () {
    var i = this,
        e = 0,
        t = 0,
        o = 0;
    if (!0 === i.options.infinite) {
      if (i.slideCount <= i.options.slidesToShow) ++o;else for (; e < i.slideCount;) {
        ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
      }
    } else if (!0 === i.options.centerMode) o = i.slideCount;else if (i.options.asNavFor) for (; e < i.slideCount;) {
      ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
    } else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
    return o - 1;
  }, e.prototype.getLeft = function (i) {
    var e,
        t,
        o,
        s,
        n = this,
        r = 0;
    return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e;
  }, e.prototype.getOption = e.prototype.slickGetOption = function (i) {
    return this.options[i];
  }, e.prototype.getNavigableIndexes = function () {
    var i,
        e = this,
        t = 0,
        o = 0,
        s = [];

    for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) {
      s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
    }

    return s;
  }, e.prototype.getSlick = function () {
    return this;
  }, e.prototype.getSlideCount = function () {
    var e,
        t,
        o = this;
    return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
      if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1;
    }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll;
  }, e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
    this.changeSlide({
      data: {
        message: "index",
        index: parseInt(i)
      }
    }, e);
  }, e.prototype.init = function (e) {
    var t = this;
    i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay());
  }, e.prototype.initADA = function () {
    var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (i) {
      return i >= 0 && i < e.slideCount;
    });
    e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
      "aria-hidden": "true",
      tabindex: "-1"
    }).find("a, input, button, select").attr({
      tabindex: "-1"
    }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
      var s = o.indexOf(t);
      i(this).attr({
        role: "tabpanel",
        id: "slick-slide" + e.instanceUid + t,
        tabindex: -1
      }), -1 !== s && i(this).attr({
        "aria-describedby": "slick-slide-control" + e.instanceUid + s
      });
    }), e.$dots.attr("role", "tablist").find("li").each(function (s) {
      var n = o[s];
      i(this).attr({
        role: "presentation"
      }), i(this).find("button").first().attr({
        role: "tab",
        id: "slick-slide-control" + e.instanceUid + s,
        "aria-controls": "slick-slide" + e.instanceUid + n,
        "aria-label": s + 1 + " of " + t,
        "aria-selected": null,
        tabindex: "-1"
      });
    }).eq(e.currentSlide).find("button").attr({
      "aria-selected": "true",
      tabindex: "0"
    }).end());

    for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) {
      e.$slides.eq(s).attr("tabindex", 0);
    }

    e.activateADA();
  }, e.prototype.initArrowEvents = function () {
    var i = this;
    !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
      message: "previous"
    }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
      message: "next"
    }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)));
  }, e.prototype.initDotEvents = function () {
    var e = this;
    !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
      message: "index"
    }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
  }, e.prototype.initSlideEvents = function () {
    var e = this;
    e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
  }, e.prototype.initializeEvents = function () {
    var e = this;
    e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
      action: "start"
    }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
      action: "move"
    }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
      action: "end"
    }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
      action: "end"
    }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition);
  }, e.prototype.initUI = function () {
    var i = this;
    !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show();
  }, e.prototype.keyHandler = function (i) {
    var e = this;
    i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
      data: {
        message: !0 === e.options.rtl ? "next" : "previous"
      }
    }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
      data: {
        message: !0 === e.options.rtl ? "previous" : "next"
      }
    }));
  }, e.prototype.lazyLoad = function () {
    function e(e) {
      i("img[data-lazy]", e).each(function () {
        var e = i(this),
            t = i(this).attr("data-lazy"),
            o = i(this).attr("data-srcset"),
            s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
            r = document.createElement("img");
        r.onload = function () {
          e.animate({
            opacity: 0
          }, 100, function () {
            o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
              opacity: 1
            }, 200, function () {
              e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
            }), n.$slider.trigger("lazyLoaded", [n, e, t]);
          });
        }, r.onerror = function () {
          e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t]);
        }, r.src = t;
      });
    }

    var t,
        o,
        s,
        n = this;
    if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad) for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) {
      r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
    }
    e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow));
  }, e.prototype.loadSlider = function () {
    var i = this;
    i.setPosition(), i.$slideTrack.css({
      opacity: 1
    }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
  }, e.prototype.next = e.prototype.slickNext = function () {
    this.changeSlide({
      data: {
        message: "next"
      }
    });
  }, e.prototype.orientationChange = function () {
    var i = this;
    i.checkResponsive(), i.setPosition();
  }, e.prototype.pause = e.prototype.slickPause = function () {
    var i = this;
    i.autoPlayClear(), i.paused = !0;
  }, e.prototype.play = e.prototype.slickPlay = function () {
    var i = this;
    i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1;
  }, e.prototype.postSlide = function (e) {
    var t = this;
    t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
  }, e.prototype.prev = e.prototype.slickPrev = function () {
    this.changeSlide({
      data: {
        message: "previous"
      }
    });
  }, e.prototype.preventDefault = function (i) {
    i.preventDefault();
  }, e.prototype.progressiveLazyLoad = function (e) {
    e = e || 1;
    var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i("img[data-lazy]", l.$slider);
    d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function () {
      s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad();
    }, r.onerror = function () {
      e < 3 ? setTimeout(function () {
        l.progressiveLazyLoad(e + 1);
      }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad());
    }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l]);
  }, e.prototype.refresh = function (e) {
    var t,
        o,
        s = this;
    o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
      currentSlide: t
    }), s.init(), e || s.changeSlide({
      data: {
        message: "index",
        index: t
      }
    }, !1);
  }, e.prototype.registerBreakpoints = function () {
    var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null;

    if ("array" === i.type(n) && n.length) {
      s.respondTo = s.options.respondTo || "window";

      for (e in n) {
        if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
          for (t = n[e].breakpoint; o >= 0;) {
            s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
          }

          s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings;
        }
      }

      s.breakpoints.sort(function (i, e) {
        return s.options.mobileFirst ? i - e : e - i;
      });
    }
  }, e.prototype.reinit = function () {
    var e = this;
    e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e]);
  }, e.prototype.resize = function () {
    var e = this;
    i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
      e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition();
    }, 50));
  }, e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
    var o = this;
    if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
    o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit();
  }, e.prototype.setCSS = function (i) {
    var e,
        t,
        o = this,
        s = {};
    !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)));
  }, e.prototype.setDimensions = function () {
    var i = this;
    !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
      padding: "0px " + i.options.centerPadding
    }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
      padding: i.options.centerPadding + " 0px"
    })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
    var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
    !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
  }, e.prototype.setFade = function () {
    var e,
        t = this;
    t.$slides.each(function (o, s) {
      e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
        position: "relative",
        right: e,
        top: 0,
        zIndex: t.options.zIndex - 2,
        opacity: 0
      }) : i(s).css({
        position: "relative",
        left: e,
        top: 0,
        zIndex: t.options.zIndex - 2,
        opacity: 0
      });
    }), t.$slides.eq(t.currentSlide).css({
      zIndex: t.options.zIndex - 1,
      opacity: 1
    });
  }, e.prototype.setHeight = function () {
    var i = this;

    if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
      var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
      i.$list.css("height", e);
    }
  }, e.prototype.setOption = e.prototype.slickSetOption = function () {
    var e,
        t,
        o,
        s,
        n,
        r = this,
        l = !1;
    if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;else if ("multiple" === n) i.each(o, function (i, e) {
      r.options[i] = e;
    });else if ("responsive" === n) for (t in s) {
      if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];else {
        for (e = r.options.responsive.length - 1; e >= 0;) {
          r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
        }

        r.options.responsive.push(s[t]);
      }
    }
    l && (r.unload(), r.reinit());
  }, e.prototype.setPosition = function () {
    var i = this;
    i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i]);
  }, e.prototype.setProps = function () {
    var i = this,
        e = document.body.style;
    i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType;
  }, e.prototype.setSlideClasses = function (i) {
    var e,
        t,
        o,
        s,
        n = this;

    if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
      var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
      e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center");
    } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));

    "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad();
  }, e.prototype.setupInfinite = function () {
    var e,
        t,
        o,
        s = this;

    if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
      for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) {
        t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
      }

      for (e = 0; e < o + s.slideCount; e += 1) {
        t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
      }

      s.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
        i(this).attr("id", "");
      });
    }
  }, e.prototype.interrupt = function (i) {
    var e = this;
    i || e.autoPlay(), e.interrupted = i;
  }, e.prototype.selectHandler = function (e) {
    var t = this,
        o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
    s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s);
  }, e.prototype.slideHandler = function (i, e, t) {
    var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this;
    if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i)) if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () {
      a.postSlide(o);
    }) : a.postSlide(o));else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () {
      a.postSlide(o);
    }) : a.postSlide(o));else {
      if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function () {
        a.postSlide(s);
      })) : a.postSlide(s), void a.animateHeight();
      !0 !== t ? a.animateSlide(d, function () {
        a.postSlide(s);
      }) : a.postSlide(s);
    }
  }, e.prototype.startLoad = function () {
    var i = this;
    !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading");
  }, e.prototype.swipeDirection = function () {
    var i,
        e,
        t,
        o,
        s = this;
    return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical";
  }, e.prototype.swipeEnd = function (i) {
    var e,
        t,
        o = this;
    if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
    if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;

    if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
      switch (t = o.swipeDirection()) {
        case "left":
        case "down":
          e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
          break;

        case "right":
        case "up":
          e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1;
      }

      "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]));
    } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {});
  }, e.prototype.swipeHandler = function (i) {
    var e = this;
    if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
      case "start":
        e.swipeStart(i);
        break;

      case "move":
        e.swipeMove(i);
        break;

      case "end":
        e.swipeEnd(i);
    }
  }, e.prototype.swipeMove = function (i) {
    var e,
        t,
        o,
        s,
        n,
        r,
        l = this;
    return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))));
  }, e.prototype.swipeStart = function (i) {
    var e,
        t = this;
    if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
    void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0;
  }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
    var i = this;
    null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit());
  }, e.prototype.unload = function () {
    var e = this;
    i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
  }, e.prototype.unslick = function (i) {
    var e = this;
    e.$slider.trigger("unslick", [e, i]), e.destroy();
  }, e.prototype.updateArrows = function () {
    var i = this;
    Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
  }, e.prototype.updateDots = function () {
    var i = this;
    null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"));
  }, e.prototype.visibility = function () {
    var i = this;
    i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1);
  }, i.fn.slick = function () {
    var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;

    for (i = 0; i < r; i++) {
      if ("object" == _typeof(s) || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
    }

    return o;
  };
});
/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */

!function (e, t) {
  "use strict";

  "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = t(require("jquery")) : e.jcf = t(jQuery);
}(void 0, function (e) {
  "use strict";

  var t = "1.2.3",
      n = [],
      o = {
    optionsKey: "jcf",
    dataKey: "jcf-instance",
    rtlClass: "jcf-rtl",
    focusClass: "jcf-focus",
    pressedClass: "jcf-pressed",
    disabledClass: "jcf-disabled",
    hiddenClass: "jcf-hidden",
    resetAppearanceClass: "jcf-reset-appearance",
    unselectableClass: "jcf-unselectable"
  },
      a = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
      i = /Windows Phone/.test(navigator.userAgent);
  o.isMobileDevice = !(!a && !i);

  var r = function r() {
    var t = e("<style>").appendTo("head"),
        n = t.prop("sheet") || t.prop("styleSheet"),
        a = function a(e, t, o) {
      o = o || 0, n.insertRule ? n.insertRule(e + "{" + t + "}", o) : n.addRule(e, t, o);
    };

    a("." + o.hiddenClass, "position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none"), a("." + o.rtlClass + " ." + o.hiddenClass, "right:-9999px !important; left: auto !important"), a("." + o.unselectableClass, "-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);"), a("." + o.resetAppearanceClass, "background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);");
    var i = e("html"),
        r = e("body");
    "rtl" !== i.css("direction") && "rtl" !== r.css("direction") || i.addClass(o.rtlClass), i.on("reset", function () {
      setTimeout(function () {
        c.refreshAll();
      }, 0);
    }), o.styleSheetCreated = !0;
  };

  !function () {
    var t,
        n = navigator.pointerEnabled || navigator.msPointerEnabled,
        o = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
        a = {},
        i = "jcf-";
    t = n ? {
      pointerover: navigator.pointerEnabled ? "pointerover" : "MSPointerOver",
      pointerdown: navigator.pointerEnabled ? "pointerdown" : "MSPointerDown",
      pointermove: navigator.pointerEnabled ? "pointermove" : "MSPointerMove",
      pointerup: navigator.pointerEnabled ? "pointerup" : "MSPointerUp"
    } : {
      pointerover: "mouseover",
      pointerdown: "mousedown" + (o ? " touchstart" : ""),
      pointermove: "mousemove" + (o ? " touchmove" : ""),
      pointerup: "mouseup" + (o ? " touchend" : "")
    }, e.each(t, function (t, n) {
      e.each(n.split(" "), function (e, n) {
        a[n] = t;
      });
    }), e.each(t, function (t, n) {
      n = n.split(" "), e.event.special[i + t] = {
        setup: function setup() {
          var t = this;
          e.each(n, function (e, n) {
            t.addEventListener ? t.addEventListener(n, c, !1) : t["on" + n] = c;
          });
        },
        teardown: function teardown() {
          var t = this;
          e.each(n, function (e, n) {
            t.addEventListener ? t.removeEventListener(n, c, !1) : t["on" + n] = null;
          });
        }
      };
    });

    var r = null,
        s = function s(e) {
      var t = Math.abs(e.pageX - r.x),
          n = Math.abs(e.pageY - r.y),
          o = 25;
      return o >= t && o >= n ? !0 : void 0;
    },
        c = function c(t) {
      var n = t || window.event,
          o = null,
          c = a[n.type];
      if (t = e.event.fix(n), t.type = i + c, n.pointerType) switch (n.pointerType) {
        case 2:
          t.pointerType = "touch";
          break;

        case 3:
          t.pointerType = "pen";
          break;

        case 4:
          t.pointerType = "mouse";
          break;

        default:
          t.pointerType = n.pointerType;
      } else t.pointerType = n.type.substr(0, 5);
      return t.pageX || t.pageY || (o = n.changedTouches ? n.changedTouches[0] : n, t.pageX = o.pageX, t.pageY = o.pageY), "touchend" === n.type && (r = {
        x: t.pageX,
        y: t.pageY
      }), "mouse" === t.pointerType && r && s(t) ? void 0 : (e.event.dispatch || e.event.handle).call(this, t);
    };
  }(), function () {
    var t = ("onwheel" in document || document.documentMode >= 9 ? "wheel" : "mousewheel DOMMouseScroll").split(" "),
        n = "jcf-mousewheel";
    e.event.special[n] = {
      setup: function setup() {
        var n = this;
        e.each(t, function (e, t) {
          n.addEventListener ? n.addEventListener(t, o, !1) : n["on" + t] = o;
        });
      },
      teardown: function teardown() {
        var n = this;
        e.each(t, function (e, t) {
          n.addEventListener ? n.removeEventListener(t, o, !1) : n["on" + t] = null;
        });
      }
    };

    var o = function o(t) {
      var o = t || window.event;

      if (t = e.event.fix(o), t.type = n, "detail" in o && (t.deltaY = -o.detail), "wheelDelta" in o && (t.deltaY = -o.wheelDelta), "wheelDeltaY" in o && (t.deltaY = -o.wheelDeltaY), "wheelDeltaX" in o && (t.deltaX = -o.wheelDeltaX), "deltaY" in o && (t.deltaY = o.deltaY), "deltaX" in o && (t.deltaX = o.deltaX), t.delta = t.deltaY || t.deltaX, 1 === o.deltaMode) {
        var a = 16;
        t.delta *= a, t.deltaY *= a, t.deltaX *= a;
      }

      return (e.event.dispatch || e.event.handle).call(this, t);
    };
  }();
  var s = {
    fireNativeEvent: function fireNativeEvent(t, n) {
      e(t).each(function () {
        var e,
            t = this;
        t.dispatchEvent ? (e = document.createEvent("HTMLEvents"), e.initEvent(n, !0, !0), t.dispatchEvent(e)) : document.createEventObject && (e = document.createEventObject(), e.target = t, t.fireEvent("on" + n, e));
      });
    },
    bindHandlers: function bindHandlers() {
      var t = this;
      e.each(t, function (n, o) {
        0 === n.indexOf("on") && e.isFunction(o) && (t[n] = function () {
          return o.apply(t, arguments);
        });
      });
    }
  },
      c = {
    version: t,
    modules: {},
    getOptions: function getOptions() {
      return e.extend({}, o);
    },
    setOptions: function setOptions(t, n) {
      arguments.length > 1 ? this.modules[t] && e.extend(this.modules[t].prototype.options, n) : e.extend(o, t);
    },
    addModule: function addModule(t) {
      e.isFunction(t) && (t = t(e, window));

      var a = function a(t) {
        t.element.data(o.dataKey) || t.element.data(o.dataKey, this), n.push(this), this.options = e.extend({}, o, this.options, i(t.element), t), this.bindHandlers(), this.init.apply(this, arguments);
      },
          i = function i(t) {
        var n = t.data(o.optionsKey),
            a = t.attr(o.optionsKey);
        if (n) return n;
        if (a) try {
          return e.parseJSON(a);
        } catch (i) {}
      };

      a.prototype = t, e.extend(t, s), t.plugins && e.each(t.plugins, function (t, n) {
        e.extend(n.prototype, s);
      });
      var r = a.prototype.destroy;
      a.prototype.destroy = function () {
        this.options.element.removeData(this.options.dataKey);

        for (var e = n.length - 1; e >= 0; e--) {
          if (n[e] === this) {
            n.splice(e, 1);
            break;
          }
        }

        r && r.apply(this, arguments);
      }, this.modules[t.name] = a;
    },
    getInstance: function getInstance(t) {
      return e(t).data(o.dataKey);
    },
    replace: function replace(t, n, a) {
      var i,
          s = this;
      return o.styleSheetCreated || r(), e(t).each(function () {
        var t,
            r = e(this);
        i = r.data(o.dataKey), i ? i.refresh() : (n || e.each(s.modules, function (e, t) {
          return t.prototype.matchElement.call(t.prototype, r) ? (n = e, !1) : void 0;
        }), n && (t = e.extend({
          element: r
        }, a), i = new s.modules[n](t)));
      }), i;
    },
    refresh: function refresh(t) {
      e(t).each(function () {
        var t = e(this).data(o.dataKey);
        t && t.refresh();
      });
    },
    destroy: function destroy(t) {
      e(t).each(function () {
        var t = e(this).data(o.dataKey);
        t && t.destroy();
      });
    },
    replaceAll: function replaceAll(t) {
      var n = this;
      e.each(this.modules, function (o, a) {
        e(a.prototype.selector, t).each(function () {
          this.className.indexOf("jcf-ignore") < 0 && n.replace(this, o);
        });
      });
    },
    refreshAll: function refreshAll(t) {
      if (t) e.each(this.modules, function (n, a) {
        e(a.prototype.selector, t).each(function () {
          var t = e(this).data(o.dataKey);
          t && t.refresh();
        });
      });else for (var a = n.length - 1; a >= 0; a--) {
        n[a].refresh();
      }
    },
    destroyAll: function destroyAll(t) {
      if (t) e.each(this.modules, function (n, a) {
        e(a.prototype.selector, t).each(function (t, n) {
          var a = e(n).data(o.dataKey);
          a && a.destroy();
        });
      });else for (; n.length;) {
        n[0].destroy();
      }
    }
  };
  return "function" == typeof define && define.amd && (window.jcf = c), c;
});
/*!
 * JavaScript Custom Forms : File Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */

!function (e) {
  e.addModule(function (e) {
    "use strict";

    return {
      name: "File",
      selector: 'input[type="file"]',
      options: {
        fakeStructure: '<span class="jcf-file"><span class="jcf-fake-input"></span><span class="jcf-upload-button"><span class="jcf-button-content"></span></span></span>',
        buttonText: "Choose file",
        placeholderText: "No file chosen",
        realElementClass: "jcf-real-element",
        extensionPrefixClass: "jcf-extension-",
        selectedFileBlock: ".jcf-fake-input",
        buttonTextBlock: ".jcf-button-content"
      },
      matchElement: function matchElement(e) {
        return e.is('input[type="file"]');
      },
      init: function init() {
        this.initStructure(), this.attachEvents(), this.refresh();
      },
      initStructure: function initStructure() {
        this.doc = e(document), this.realElement = e(this.options.element).addClass(this.options.realElementClass), this.fakeElement = e(this.options.fakeStructure).insertBefore(this.realElement), this.fileNameBlock = this.fakeElement.find(this.options.selectedFileBlock), this.buttonTextBlock = this.fakeElement.find(this.options.buttonTextBlock).text(this.options.buttonText), this.realElement.appendTo(this.fakeElement).css({
          position: "absolute",
          opacity: 0
        });
      },
      attachEvents: function attachEvents() {
        this.realElement.on({
          "jcf-pointerdown": this.onPress,
          change: this.onChange,
          focus: this.onFocus
        });
      },
      onChange: function onChange() {
        this.refresh();
      },
      onFocus: function onFocus() {
        this.fakeElement.addClass(this.options.focusClass), this.realElement.on("blur", this.onBlur);
      },
      onBlur: function onBlur() {
        this.fakeElement.removeClass(this.options.focusClass), this.realElement.off("blur", this.onBlur);
      },
      onPress: function onPress() {
        this.fakeElement.addClass(this.options.pressedClass), this.doc.on("jcf-pointerup", this.onRelease);
      },
      onRelease: function onRelease() {
        this.fakeElement.removeClass(this.options.pressedClass), this.doc.off("jcf-pointerup", this.onRelease);
      },
      getFileName: function getFileName() {
        var t = "",
            s = this.realElement.prop("files");
        return s && s.length ? e.each(s, function (e, s) {
          t += (e > 0 ? ", " : "") + s.name;
        }) : t = this.realElement.val().replace(/^[\s\S]*(?:\\|\/)([\s\S^\\\/]*)$/g, "$1"), t;
      },
      getFileExtension: function getFileExtension() {
        var e = this.realElement.val();
        return e.lastIndexOf(".") < 0 ? "" : e.substring(e.lastIndexOf(".") + 1).toLowerCase();
      },
      updateExtensionClass: function updateExtensionClass() {
        var e = this.getFileExtension(),
            t = this.fakeElement.prop("className"),
            s = t.replace(new RegExp("(\\s|^)" + this.options.extensionPrefixClass + "[^ ]+", "gi"), "");
        this.fakeElement.prop("className", s), e && this.fakeElement.addClass(this.options.extensionPrefixClass + e);
      },
      refresh: function refresh() {
        var e = this.getFileName() || this.options.placeholderText;
        this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(":disabled")), this.fileNameBlock.text(e), this.updateExtensionClass();
      },
      destroy: function destroy() {
        this.realElement.insertBefore(this.fakeElement).removeClass(this.options.realElementClass).css({
          position: "",
          opacity: ""
        }), this.fakeElement.remove(), this.realElement.off({
          "jcf-pointerdown": this.onPress,
          change: this.onChange,
          focus: this.onFocus,
          blur: this.onBlur
        }), this.doc.off("jcf-pointerup", this.onRelease);
      }
    };
  });
}(jcf);
/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/

!function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? require("jquery") : jQuery);
}(function (a) {
  var b,
      c = navigator.userAgent,
      d = /iphone/i.test(c),
      e = /chrome/i.test(c),
      f = /android/i.test(c);
  a.mask = {
    definitions: {
      9: "[0-9]",
      a: "[A-Za-z]",
      "*": "[A-Za-z0-9]"
    },
    autoclear: !0,
    dataName: "rawMaskFn",
    placeholder: "_"
  }, a.fn.extend({
    caret: function caret(a, b) {
      var c;
      if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () {
        this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select());
      })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
        begin: a,
        end: b
      });
    },
    unmask: function unmask() {
      return this.trigger("unmask");
    },
    mask: function mask(c, g) {
      var h, i, j, k, l, m, n, o;

      if (!c && this.length > 0) {
        h = a(this[0]);
        var p = h.data(a.mask.dataName);
        return p ? p() : void 0;
      }

      return g = a.extend({
        autoclear: a.mask.autoclear,
        placeholder: a.mask.placeholder,
        completed: null
      }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) {
        "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null);
      }), this.trigger("unmask").each(function () {
        function h() {
          if (g.completed) {
            for (var a = l; m >= a; a++) {
              if (j[a] && C[a] === p(a)) return;
            }

            g.completed.call(B);
          }
        }

        function p(a) {
          return g.placeholder.charAt(a < g.placeholder.length ? a : 0);
        }

        function q(a) {
          for (; ++a < n && !j[a];) {
            ;
          }

          return a;
        }

        function r(a) {
          for (; --a >= 0 && !j[a];) {
            ;
          }

          return a;
        }

        function s(a, b) {
          var c, d;

          if (!(0 > a)) {
            for (c = a, d = q(b); n > c; c++) {
              if (j[c]) {
                if (!(n > d && j[c].test(C[d]))) break;
                C[c] = C[d], C[d] = p(d), d = q(d);
              }
            }

            z(), B.caret(Math.max(l, a));
          }
        }

        function t(a) {
          var b, c, d, e;

          for (b = a, c = p(a); n > b; b++) {
            if (j[b]) {
              if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e))) break;
              c = e;
            }
          }
        }

        function u() {
          var a = B.val(),
              b = B.caret();

          if (o && o.length && o.length > a.length) {
            for (A(!0); b.begin > 0 && !j[b.begin - 1];) {
              b.begin--;
            }

            if (0 === b.begin) for (; b.begin < l && !j[b.begin];) {
              b.begin++;
            }
            B.caret(b.begin, b.begin);
          } else {
            for (A(!0); b.begin < n && !j[b.begin];) {
              b.begin++;
            }

            B.caret(b.begin, b.begin);
          }

          h();
        }

        function v() {
          A(), B.val() != E && B.change();
        }

        function w(a) {
          if (!B.prop("readonly")) {
            var b,
                c,
                e,
                f = a.which || a.keyCode;
            o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault());
          }
        }

        function x(b) {
          if (!B.prop("readonly")) {
            var c,
                d,
                e,
                g = b.which || b.keyCode,
                i = B.caret();

            if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
              if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) {
                if (t(c), C[c] = d, z(), e = q(c), f) {
                  var k = function k() {
                    a.proxy(a.fn.caret, B, e)();
                  };

                  setTimeout(k, 0);
                } else B.caret(e);

                i.begin <= m && h();
              }

              b.preventDefault();
            }
          }
        }

        function y(a, b) {
          var c;

          for (c = a; b > c && n > c; c++) {
            j[c] && (C[c] = p(c));
          }
        }

        function z() {
          B.val(C.join(""));
        }

        function A(a) {
          var b,
              c,
              d,
              e = B.val(),
              f = -1;

          for (b = 0, d = 0; n > b; b++) {
            if (j[b]) {
              for (C[b] = p(b); d++ < e.length;) {
                if (c = e.charAt(d - 1), j[b].test(c)) {
                  C[b] = c, f = b;
                  break;
                }
              }

              if (d > e.length) {
                y(b + 1, n);
                break;
              }
            } else C[b] === e.charAt(d) && d++, k > b && (f = b);
          }

          return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l;
        }

        var B = a(this),
            C = a.map(c.split(""), function (a, b) {
          return "?" != a ? i[a] ? p(b) : a : void 0;
        }),
            D = C.join(""),
            E = B.val();
        B.data(a.mask.dataName, function () {
          return a.map(C, function (a, b) {
            return j[b] && a != p(b) ? a : null;
          }).join("");
        }), B.one("unmask", function () {
          B.off(".mask").removeData(a.mask.dataName);
        }).on("focus.mask", function () {
          if (!B.prop("readonly")) {
            clearTimeout(b);
            var a;
            E = B.val(), a = A(), b = setTimeout(function () {
              B.get(0) === document.activeElement && (z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a));
            }, 10);
          }
        }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () {
          B.prop("readonly") || setTimeout(function () {
            var a = A(!0);
            B.caret(a), h();
          }, 0);
        }), e && f && B.off("input.mask").on("input.mask", u), A();
      });
    }
  });
}); // jscs:disable

/* jshint -W071, -W074 */
// jscs:enable

/* globals jQuery */

/*
 * jQuery ezPlus 1.2.5
 * Demo's and documentation:
 * http://igorlino.github.io/elevatezoom-plus/
 *
 * licensed under MIT license.
 * http://en.wikipedia.org/wiki/MIT_License
 *
 */

if (typeof Object.create !== 'function') {
  Object.create = function (obj) {
    function F() {}

    F.prototype = obj;
    return new F();
  };
}

(function ($, window, document) {
  var EZP = {
    init: function init(options, elem) {
      var self = this;
      self.elem = elem;
      self.$elem = $(elem);
      self.options = $.extend({}, $.fn.ezPlus.options, self.responsiveConfig(options || {}));
      self.imageSrc = self.$elem.attr('data-' + self.options.attrImageZoomSrc) ? self.$elem.attr('data-' + self.options.attrImageZoomSrc) : self.$elem.attr('src');

      if (!self.options.enabled) {
        return;
      } //TINT OVERRIDE SETTINGS


      if (self.options.tint) {
        self.options.lensColour = 'transparent'; //colour of the lens background

        self.options.lensOpacity = '1'; //opacity of the lens
      } //INNER OVERRIDE SETTINGS


      if (self.options.zoomType === 'inner') {
        self.options.showLens = false;
      } // LENS OVERRIDE SETTINGS


      if (self.options.zoomType === 'lens') {
        self.options.zoomWindowWidth = 0;
      } //UUID WHEN MISSING IDENTIFIER


      if (self.options.zoomId === -1) {
        self.options.zoomId = generateUUID();
      } //Remove alt on hover


      self.$elem.parent().removeAttr('title').removeAttr('alt');
      self.zoomImage = self.imageSrc;
      self.refresh(1); //Create the image swap from the gallery

      var galleryEvent = self.options.galleryEvent + '.ezpspace';
      galleryEvent += self.options.touchEnabled ? ' touchend.ezpspace' : '';
      self.$galleries = $(self.options.gallery ? '#' + self.options.gallery : self.options.gallerySelector);
      self.$galleries.on(galleryEvent, self.options.galleryItem, function (e) {
        //Set a class on the currently active gallery image
        if (self.options.galleryActiveClass) {
          $(self.options.galleryItem, self.$galleries).removeClass(self.options.galleryActiveClass);
          $(this).addClass(self.options.galleryActiveClass);
        } //stop any link on the a tag from working


        if (this.tagName === 'A') {
          e.preventDefault();
        } //call the swap image function


        if ($(this).data(self.options.attrImageZoomSrc)) {
          self.zoomImagePre = $(this).data(self.options.attrImageZoomSrc);
        } else {
          self.zoomImagePre = $(this).data('image');
        }

        self.swaptheimage($(this).data('image'), self.zoomImagePre);

        if (this.tagName === 'A') {
          return false;
        }
      });

      function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0; // jshint ignore:line

          d = Math.floor(d / 16); // jshint ignore:line

          return (c === 'x' ? r : r & 0x3 | 0x8).toString(16); // jshint ignore:line
        });
        return uuid;
      }
    },
    refresh: function refresh(length) {
      var self = this;
      setTimeout(function () {
        self.fetch(self.imageSrc, self.$elem, self.options.minZoomLevel);
      }, length || self.options.refresh);
    },
    fetch: function fetch(imgsrc, element, minZoom) {
      //get the image
      var self = this;
      var newImg = new Image();

      newImg.onload = function () {
        //set the large image dimensions - used to calculte ratio's
        if (newImg.width / element.width() <= minZoom) {
          self.largeWidth = element.width() * minZoom;
        } else {
          self.largeWidth = newImg.width;
        }

        if (newImg.height / element.height() <= minZoom) {
          self.largeHeight = element.height() * minZoom;
        } else {
          self.largeHeight = newImg.height;
        } //once image is loaded start the calls


        self.startZoom();
        self.currentImage = self.imageSrc; //let caller know image has been loaded

        self.options.onZoomedImageLoaded(self.$elem);
      };

      self.setImageSource(newImg, imgsrc); // this must be done AFTER setting onload

      return;
    },
    setImageSource: function setImageSource(image, src) {
      //sets an image's source.
      image.src = src;
    },
    startZoom: function startZoom() {
      var self = this; //get dimensions of the non zoomed image

      self.nzWidth = self.$elem.width();
      self.nzHeight = self.$elem.height(); //activated elements

      self.isWindowActive = false;
      self.isLensActive = false;
      self.isTintActive = false;
      self.overWindow = false; //CrossFade Wrapper

      if (self.options.imageCrossfade) {
        var elementZoomWrapper = $('<div class="zoomWrapper"/>').css({
          height: self.nzHeight,
          width: self.nzWidth
        });

        if (self.$elem.parent().hasClass('zoomWrapper')) {
          self.$elem.unwrap();
        }

        self.zoomWrap = self.$elem.wrap(elementZoomWrapper);
        self.$elem.css({
          position: 'absolute'
        });
      }

      self.zoomLock = 1;
      self.scrollingLock = false;
      self.changeBgSize = false;
      self.currentZoomLevel = self.options.zoomLevel; //get offset of the non zoomed image

      self.updateOffset(self); //calculate the width ratio of the large/small image

      self.widthRatio = self.largeWidth / self.currentZoomLevel / self.nzWidth;
      self.heightRatio = self.largeHeight / self.currentZoomLevel / self.nzHeight;

      function getWindowZoomStyle() {
        return {
          display: 'none',
          position: 'absolute',
          height: self.options.zoomWindowHeight,
          width: self.options.zoomWindowWidth,
          border: '' + self.options.borderSize + 'px solid ' + self.options.borderColour,
          backgroundSize: '' + self.largeWidth / self.currentZoomLevel + 'px ' + self.largeHeight / self.currentZoomLevel + 'px',
          backgroundPosition: '0px 0px',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '' + self.options.zoomWindowBgColour,
          overflow: 'hidden',
          zIndex: 100
        };
      } //if window zoom


      if (self.options.zoomType === 'window') {
        self.zoomWindowStyle = getWindowZoomStyle();
      }

      function getInnerZoomStyle() {
        //has a border been put on the image? Lets cater for this
        var borderWidth = self.$elem.css('border-left-width');
        if (self.options.scrollZoom) self.zoomLens = $('<div class="zoomLens"/>');
        return {
          display: 'none',
          position: 'absolute',
          height: self.nzHeight,
          width: self.nzWidth,
          marginTop: borderWidth,
          marginLeft: borderWidth,
          border: '' + self.options.borderSize + 'px solid ' + self.options.borderColour,
          backgroundPosition: '0px 0px',
          backgroundRepeat: 'no-repeat',
          cursor: self.options.cursor,
          overflow: 'hidden',
          zIndex: self.options.zIndex
        };
      } //if inner  zoom


      if (self.options.zoomType === 'inner') {
        self.zoomWindowStyle = getInnerZoomStyle();
      }

      function getWindowLensStyle() {
        // adjust images less than the window height
        if (self.nzHeight < self.options.zoomWindowHeight / self.heightRatio) {
          self.lensHeight = self.nzHeight;
        } else {
          self.lensHeight = self.options.zoomWindowHeight / self.heightRatio;
        }

        if (self.largeWidth < self.options.zoomWindowWidth) {
          self.lensWidth = self.nzWidth;
        } else {
          self.lensWidth = self.options.zoomWindowWidth / self.widthRatio;
        }

        return {
          display: 'none',
          position: 'absolute',
          height: self.lensHeight,
          width: self.lensWidth,
          border: '' + self.options.lensBorderSize + 'px' + ' solid ' + self.options.lensBorderColour,
          backgroundPosition: '0px 0px',
          backgroundRepeat: 'no-repeat',
          backgroundColor: self.options.lensColour,
          opacity: self.options.lensOpacity,
          cursor: self.options.cursor,
          zIndex: 999,
          overflow: 'hidden'
        };
      } //lens style for window zoom


      if (self.options.zoomType === 'window') {
        self.lensStyle = getWindowLensStyle();
      } //tint style


      self.tintStyle = {
        display: 'block',
        position: 'absolute',
        height: self.nzHeight,
        width: self.nzWidth,
        backgroundColor: self.options.tintColour,
        opacity: 0
      }; //lens style for lens zoom with optional round for modern browsers

      self.lensRound = {};

      if (self.options.zoomType === 'lens') {
        self.lensStyle = {
          display: 'none',
          position: 'absolute',
          "float": 'left',
          height: self.options.lensSize,
          width: self.options.lensSize,
          border: '' + self.options.borderSize + 'px solid ' + self.options.borderColour,
          backgroundPosition: '0px 0px',
          backgroundRepeat: 'no-repeat',
          backgroundColor: self.options.lensColour,
          cursor: self.options.cursor
        };
      } //does not round in all browsers


      if (self.options.lensShape === 'round') {
        self.lensRound = {
          borderRadius: self.options.lensSize / 2 + self.options.borderSize
        };
      } //create the div's                                                + ""
      //self.zoomContainer = $('<div/>').addClass('zoomContainer').css({"position":"relative", "height":self.nzHeight, "width":self.nzWidth});


      self.zoomContainer = $('<div class="' + self.options.container + '" ' + 'uuid="' + self.options.zoomId + '"/>');
      self.zoomContainer.css({
        position: 'absolute',
        top: self.nzOffset.top,
        left: self.nzOffset.left,
        height: self.nzHeight,
        width: self.nzWidth,
        zIndex: self.options.zIndex
      });

      if (self.$elem.attr('id')) {
        self.zoomContainer.attr('id', self.$elem.attr('id') + '-' + self.options.container);
      }

      $('.' + self.options.container + '[uuid="' + self.options.zoomId + '"]').remove();
      $(self.options.zoomContainerAppendTo).append(self.zoomContainer); //this will add overflow hidden and contrain the lens on lens mode

      if (self.options.containLensZoom && self.options.zoomType === 'lens') {
        self.zoomContainer.css('overflow', 'hidden');
      }

      if (self.options.zoomType !== 'inner') {
        self.zoomLens = $('<div class="zoomLens"/>').css($.extend({}, self.lensStyle, self.lensRound)).appendTo(self.zoomContainer).click(function () {
          self.$elem.trigger('click');
        });

        if (self.options.tint) {
          self.tintContainer = $('<div class="tintContainer"/>');
          self.zoomTint = $('<div class="zoomTint"/>').css(self.tintStyle);
          self.zoomLens.wrap(self.tintContainer);
          self.zoomTintcss = self.zoomLens.after(self.zoomTint); //if tint enabled - set an image to show over the tint

          self.zoomTintImage = $('<img src="' + self.$elem.attr('src') + '">').css({
            position: 'absolute',
            top: 0,
            left: 0,
            height: self.nzHeight,
            width: self.nzWidth,
            maxWidth: 'none'
          }).appendTo(self.zoomLens).click(function () {
            self.$elem.trigger('click');
          });
        }
      } //create zoom window


      var targetZoomContainer = isNaN(self.options.zoomWindowPosition) ? 'body' : self.zoomContainer;
      self.zoomWindow = $('<div class="zoomWindow"/>').css($.extend({
        zIndex: 999,
        top: self.windowOffsetTop,
        left: self.windowOffsetLeft
      }, self.zoomWindowStyle)).appendTo(targetZoomContainer).click(function () {
        self.$elem.trigger('click');
      });
      self.zoomWindowContainer = $('<div class="zoomWindowContainer" />').css({
        width: self.options.zoomWindowWidth
      });
      self.zoomWindow.wrap(self.zoomWindowContainer);

      if (self.options.zoomType === 'lens') {
        self.zoomContainer.css('display', 'none');
        self.zoomLens.css({
          backgroundImage: 'url("' + self.imageSrc + '")'
        });
      }

      if (self.options.zoomType === 'window') {
        self.zoomWindow.css({
          backgroundImage: 'url("' + self.imageSrc + '")'
        });
      }

      if (self.options.zoomType === 'inner') {
        self.zoomWindow.css({
          backgroundImage: 'url("' + self.imageSrc + '")'
        });
      }
      /*-------------------END THE ZOOM WINDOW AND LENS----------------------------------*/


      if (self.options.touchEnabled) {
        //touch events
        self.$elem.on('touchmove.ezpspace', function (e) {
          e.preventDefault();
          var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
          self.setPosition(touch);
        });
        self.zoomContainer.on('touchmove.ezpspace', function (e) {
          self.setElements('show');
          e.preventDefault();
          var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
          self.setPosition(touch);
        });
        self.zoomContainer.add(self.$elem).on('touchend.ezpspace', function (e) {
          self.showHideWindow('hide');

          if (self.options.showLens) {
            self.showHideLens('hide');
          }

          if (self.options.tint && self.options.zoomType !== 'inner') {
            self.showHideTint('hide');
          }
        });

        if (self.options.showLens) {
          self.zoomLens.on('touchmove.ezpspace', function (e) {
            e.preventDefault();
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            self.setPosition(touch);
          });
          self.zoomLens.on('touchend.ezpspace', function (e) {
            self.showHideWindow('hide');

            if (self.options.showLens) {
              self.showHideLens('hide');
            }

            if (self.options.tint && self.options.zoomType !== 'inner') {
              self.showHideTint('hide');
            }
          });
        }
      } // Needed to work in IE


      self.zoomContainer.on('click.ezpspace touchstart.ezpspace', self.options.onImageClick);
      self.zoomContainer.add(self.$elem).on('mousemove.ezpspace', function (e) {
        if (self.overWindow === false) {
          self.setElements('show');
        }

        mouseMoveZoomHandler(e);
      });

      function mouseMoveZoomHandler(e) {
        //self.overWindow = true;
        //make sure on orientation change the setposition is not fired
        if (self.lastX !== e.clientX || self.lastY !== e.clientY) {
          self.setPosition(e);
          self.currentLoc = e;
        }

        self.lastX = e.clientX;
        self.lastY = e.clientY;
      }

      var elementToTrack = null;

      if (self.options.zoomType !== 'inner') {
        elementToTrack = self.zoomLens;
      }

      if (self.options.tint && self.options.zoomType !== 'inner') {
        elementToTrack = self.zoomTint;
      }

      if (self.options.zoomType === 'inner') {
        elementToTrack = self.zoomWindow;
      } //register the mouse tracking


      if (elementToTrack) {
        elementToTrack.on('mousemove.ezpspace', mouseMoveZoomHandler);
      } //  lensFadeOut: 500,  zoomTintFadeIn


      self.zoomContainer.add(self.$elem).hover(function () {
        if (self.overWindow === false) {
          self.setElements('show');
        }
      }, function () {
        if (!self.scrollLock) {
          self.setElements('hide');
          self.options.onDestroy(self.$elem);
        }
      }); //end ove image

      if (self.options.zoomType !== 'inner') {
        self.zoomWindow.hover(function () {
          self.overWindow = true;
          self.setElements('hide');
        }, function () {
          self.overWindow = false;
        });
      } //end ove image
      // var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);
      //      $(this).empty();
      //    return false;
      //fix for initial zoom setting
      //if (self.options.zoomLevel !== 1) {
      //    	self.changeZoomLevel(self.currentZoomLevel);
      //}
      //set the min zoomlevel


      if (self.options.minZoomLevel) {
        self.minZoomLevel = self.options.minZoomLevel;
      } else {
        self.minZoomLevel = self.options.scrollZoomIncrement * 2;
      }

      if (self.options.scrollZoom) {
        //see compatibility of mouse events at https://developer.mozilla.org/en-US/docs/Web/Events/mousewheel
        self.zoomContainer.add(self.$elem).on('wheel DOMMouseScroll MozMousePixelScroll', function (e) {
          // in IE there is issue with firing of mouseleave - So check whether still scrolling
          // and on mouseleave check if scrolllock
          self.scrollLock = true;
          clearTimeout($.data(this, 'timer'));
          $.data(this, 'timer', setTimeout(function () {
            self.scrollLock = false; //do something
          }, 250));
          var theEvent = e.originalEvent.deltaY || e.originalEvent.detail * -1; //this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
          //   e.preventDefault();

          e.stopImmediatePropagation();
          e.stopPropagation();
          e.preventDefault();

          if (theEvent === 0) {
            // fixes last event inversion bug
            return false;
          }

          var nextZoomLevel;

          if (theEvent / 120 > 0) {
            nextZoomLevel = parseFloat(self.currentZoomLevel) - self.options.scrollZoomIncrement; //scrolling up

            if (nextZoomLevel >= parseFloat(self.minZoomLevel)) {
              self.changeZoomLevel(nextZoomLevel);
            }
          } else {
            //scrolling down
            //Check if it has to maintain original zoom window aspect ratio or not
            if (!self.fullheight && !self.fullwidth || !self.options.mantainZoomAspectRatio) {
              nextZoomLevel = parseFloat(self.currentZoomLevel) + self.options.scrollZoomIncrement;

              if (self.options.maxZoomLevel) {
                if (nextZoomLevel <= self.options.maxZoomLevel) {
                  self.changeZoomLevel(nextZoomLevel);
                }
              } else {
                //andy
                self.changeZoomLevel(nextZoomLevel);
              }
            }
          }

          return false;
        });
      }
    },
    destroy: function destroy() {
      var self = this;
      self.$elem.off('.ezpspace');
      self.$galleries.off('.ezpspace');
      $(self.zoomContainer).remove();

      if (self.options.loadingIcon && !!self.spinner && !!self.spinner.length) {
        self.spinner.remove();
        delete self.spinner;
      }
    },
    getIdentifier: function getIdentifier() {
      var self = this;
      return self.options.zoomId;
    },
    setElements: function setElements(type) {
      var self = this;

      if (!self.options.zoomEnabled) {
        return false;
      }

      if (type === 'show') {
        if (self.isWindowSet) {
          if (self.options.zoomType === 'inner') {
            self.showHideWindow('show');
          }

          if (self.options.zoomType === 'window') {
            self.showHideWindow('show');
          }

          if (self.options.showLens) {
            self.showHideZoomContainer('show');
            self.showHideLens('show');
          }

          if (self.options.tint && self.options.zoomType !== 'inner') {
            self.showHideTint('show');
          }
        }
      }

      if (type === 'hide') {
        if (self.options.zoomType === 'window') {
          self.showHideWindow('hide');
        }

        if (!self.options.tint) {
          self.showHideWindow('hide');
        }

        if (self.options.showLens) {
          self.showHideZoomContainer('hide');
          self.showHideLens('hide');
        }

        if (self.options.tint) {
          self.showHideTint('hide');
        }
      }
    },
    setPosition: function setPosition(e) {
      var self = this;

      if (!self.options.zoomEnabled || e === undefined) {
        return false;
      } //recaclc offset each time in case the image moves
      //this can be caused by other on page elements


      self.nzHeight = self.$elem.height();
      self.nzWidth = self.$elem.width();
      self.updateOffset(self);

      if (self.options.tint && self.options.zoomType !== 'inner') {
        self.zoomTint.css({
          top: 0,
          left: 0
        });
      } //set responsive
      //will checking if the image needs changing before running this code work faster?


      if (self.options.responsive && !self.options.scrollZoom) {
        if (self.options.showLens) {
          var lensHeight, lensWidth;

          if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
            self.lensHeight = self.nzHeight;
          } else {
            self.lensHeight = self.options.zoomWindowHeight / self.heightRatio;
          }

          if (self.largeWidth < self.options.zoomWindowWidth) {
            self.lensWidth = self.nzWidth;
          } else {
            self.lensWidth = self.options.zoomWindowWidth / self.widthRatio;
          }

          self.widthRatio = self.largeWidth / self.nzWidth;
          self.heightRatio = self.largeHeight / self.nzHeight;

          if (self.options.zoomType !== 'lens') {
            //possibly dont need to keep recalcalculating
            //if the lens is heigher than the image, then set lens size to image size
            if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
              self.lensHeight = self.nzHeight;
            } else {
              self.lensHeight = self.options.zoomWindowHeight / self.heightRatio;
            }

            if (self.nzWidth < self.options.zoomWindowHeight / self.heightRatio) {
              self.lensWidth = self.nzWidth;
            } else {
              self.lensWidth = self.options.zoomWindowWidth / self.widthRatio;
            }

            self.zoomLens.css({
              width: self.lensWidth,
              height: self.lensHeight
            });

            if (self.options.tint) {
              self.zoomTintImage.css({
                width: self.nzWidth,
                height: self.nzHeight
              });
            }
          }

          if (self.options.zoomType === 'lens') {
            self.zoomLens.css({
              width: self.options.lensSize,
              height: self.options.lensSize
            });
          } //end responsive image change

        }
      } //container fix


      self.zoomContainer.css({
        top: self.nzOffset.top,
        left: self.nzOffset.left,
        width: self.nzWidth,
        // new code
        height: self.nzHeight // new code

      });
      self.mouseLeft = parseInt(e.pageX - self.pageOffsetX - self.nzOffset.left);
      self.mouseTop = parseInt(e.pageY - self.pageOffsetY - self.nzOffset.top); //calculate the Location of the Lens
      //calculate the bound regions - but only if zoom window

      if (self.options.zoomType === 'window') {
        var zoomLensHeight = self.zoomLens.height() / 2;
        var zoomLensWidth = self.zoomLens.width() / 2;
        self.Etoppos = self.mouseTop < 0 + zoomLensHeight;
        self.Eboppos = self.mouseTop > self.nzHeight - zoomLensHeight - self.options.lensBorderSize * 2;
        self.Eloppos = self.mouseLeft < 0 + zoomLensWidth;
        self.Eroppos = self.mouseLeft > self.nzWidth - zoomLensWidth - self.options.lensBorderSize * 2;
      } //calculate the bound regions - but only for inner zoom


      if (self.options.zoomType === 'inner') {
        self.Etoppos = self.mouseTop < self.nzHeight / 2 / self.heightRatio;
        self.Eboppos = self.mouseTop > self.nzHeight - self.nzHeight / 2 / self.heightRatio;
        self.Eloppos = self.mouseLeft < 0 + self.nzWidth / 2 / self.widthRatio;
        self.Eroppos = self.mouseLeft > self.nzWidth - self.nzWidth / 2 / self.widthRatio - self.options.lensBorderSize * 2;
      } // if the mouse position of the slider is one of the outerbounds, then hide  window and lens


      if (self.mouseLeft < 0 || self.mouseTop < 0 || self.mouseLeft > self.nzWidth || self.mouseTop > self.nzHeight) {
        self.setElements('hide');
        return;
      } //else continue with operations
      else {
          //lens options
          if (self.options.showLens) {
            //		self.showHideLens('show');
            //set background position of lens
            self.lensLeftPos = Math.floor(self.mouseLeft - self.zoomLens.width() / 2);
            self.lensTopPos = Math.floor(self.mouseTop - self.zoomLens.height() / 2);
          } //adjust the background position if the mouse is in one of the outer regions
          //Top region


          if (self.Etoppos) {
            self.lensTopPos = 0;
          } //Left Region


          if (self.Eloppos) {
            self.windowLeftPos = 0;
            self.lensLeftPos = 0;
            self.tintpos = 0;
          } //Set bottom and right region for window mode


          if (self.options.zoomType === 'window') {
            if (self.Eboppos) {
              self.lensTopPos = Math.max(self.nzHeight - self.zoomLens.height() - self.options.lensBorderSize * 2, 0);
            }

            if (self.Eroppos) {
              self.lensLeftPos = self.nzWidth - self.zoomLens.width() - self.options.lensBorderSize * 2;
            }
          } //Set bottom and right region for inner mode


          if (self.options.zoomType === 'inner') {
            if (self.Eboppos) {
              self.lensTopPos = Math.max(self.nzHeight - self.options.lensBorderSize * 2, 0);
            }

            if (self.Eroppos) {
              self.lensLeftPos = self.nzWidth - self.nzWidth - self.options.lensBorderSize * 2;
            }
          } //if lens zoom


          if (self.options.zoomType === 'lens') {
            self.windowLeftPos = ((e.pageX - self.pageOffsetX - self.nzOffset.left) * self.widthRatio - self.zoomLens.width() / 2) * -1;
            self.windowTopPos = ((e.pageY - self.pageOffsetY - self.nzOffset.top) * self.heightRatio - self.zoomLens.height() / 2) * -1;
            self.zoomLens.css({
              backgroundPosition: '' + self.windowLeftPos + 'px ' + self.windowTopPos + 'px'
            });

            if (self.changeBgSize) {
              if (self.nzHeight > self.nzWidth) {
                if (self.options.zoomType === 'lens') {
                  self.zoomLens.css({
                    backgroundSize: '' + self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                  });
                }

                self.zoomWindow.css({
                  backgroundSize: '' + self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                });
              } else {
                if (self.options.zoomType === 'lens') {
                  self.zoomLens.css({
                    backgroundSize: '' + self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                  });
                }

                self.zoomWindow.css({
                  backgroundSize: '' + self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                });
              }

              self.changeBgSize = false;
            }

            self.setWindowPosition(e);
          } //if tint zoom


          if (self.options.tint && self.options.zoomType !== 'inner') {
            self.setTintPosition(e);
          } //set the css background position


          if (self.options.zoomType === 'window') {
            self.setWindowPosition(e);
          }

          if (self.options.zoomType === 'inner') {
            self.setWindowPosition(e);
          }

          if (self.options.showLens) {
            if (self.fullwidth && self.options.zoomType !== 'lens') {
              self.lensLeftPos = 0;
            }

            self.zoomLens.css({
              left: self.lensLeftPos,
              top: self.lensTopPos
            });
          }
        } //end else

    },
    showHideZoomContainer: function showHideZoomContainer(change) {
      var self = this;

      if (change === 'show') {
        if (self.zoomContainer) {
          self.zoomContainer.show();
        }
      }

      if (change === 'hide') {
        if (self.zoomContainer) {
          self.zoomContainer.hide();
        }
      }
    },
    showHideWindow: function showHideWindow(change) {
      var self = this;

      if (change === 'show') {
        if (!self.isWindowActive && self.zoomWindow) {
          self.options.onShow(self);

          if (self.options.zoomWindowFadeIn) {
            self.zoomWindow.stop(true, true, false).fadeIn(self.options.zoomWindowFadeIn);
          } else {
            self.zoomWindow.show();
          }

          self.isWindowActive = true;
        }
      }

      if (change === 'hide') {
        if (self.isWindowActive) {
          if (self.options.zoomWindowFadeOut) {
            self.zoomWindow.stop(true, true).fadeOut(self.options.zoomWindowFadeOut, function () {
              if (self.loop) {
                //stop moving the zoom window when zoom window is faded out
                clearInterval(self.loop);
                self.loop = false;
              }
            });
          } else {
            self.zoomWindow.hide();
          }

          self.options.onHide(self);
          self.isWindowActive = false;
        }
      }
    },
    showHideLens: function showHideLens(change) {
      var self = this;

      if (change === 'show') {
        if (!self.isLensActive) {
          if (self.zoomLens) {
            if (self.options.lensFadeIn) {
              self.zoomLens.stop(true, true, false).fadeIn(self.options.lensFadeIn);
            } else {
              self.zoomLens.show();
            }
          }

          self.isLensActive = true;
        }
      }

      if (change === 'hide') {
        if (self.isLensActive) {
          if (self.zoomLens) {
            if (self.options.lensFadeOut) {
              self.zoomLens.stop(true, true).fadeOut(self.options.lensFadeOut);
            } else {
              self.zoomLens.hide();
            }
          }

          self.isLensActive = false;
        }
      }
    },
    showHideTint: function showHideTint(change) {
      var self = this;

      if (change === 'show') {
        if (!self.isTintActive && self.zoomTint) {
          if (self.options.zoomTintFadeIn) {
            self.zoomTint.css('opacity', self.options.tintOpacity).animate().stop(true, true).fadeIn('slow');
          } else {
            self.zoomTint.css('opacity', self.options.tintOpacity).animate();
            self.zoomTint.show();
          }

          self.isTintActive = true;
        }
      }

      if (change === 'hide') {
        if (self.isTintActive) {
          if (self.options.zoomTintFadeOut) {
            self.zoomTint.stop(true, true).fadeOut(self.options.zoomTintFadeOut);
          } else {
            self.zoomTint.hide();
          }

          self.isTintActive = false;
        }
      }
    },
    setLensPosition: function setLensPosition(e) {},
    setWindowPosition: function setWindowPosition(e) {
      //return obj.slice( 0, count );
      var self = this;

      if (!isNaN(self.options.zoomWindowPosition)) {
        switch (self.options.zoomWindowPosition) {
          case 1:
            //done
            self.windowOffsetTop = self.options.zoomWindowOffsetY; //DONE - 1

            self.windowOffsetLeft = +self.nzWidth; //DONE 1, 2, 3, 4, 16

            break;

          case 2:
            if (self.options.zoomWindowHeight > self.nzHeight) {
              //positive margin
              self.windowOffsetTop = (self.options.zoomWindowHeight / 2 - self.nzHeight / 2) * -1;
              self.windowOffsetLeft = self.nzWidth; //DONE 1, 2, 3, 4, 16
            } else {
              //negative margin
              $.noop();
            }

            break;

          case 3:
            //done
            self.windowOffsetTop = self.nzHeight - self.zoomWindow.height() - self.options.borderSize * 2; //DONE 3,9

            self.windowOffsetLeft = self.nzWidth; //DONE 1, 2, 3, 4, 16

            break;

          case 4:
            //done
            self.windowOffsetTop = self.nzHeight; //DONE - 4,5,6,7,8

            self.windowOffsetLeft = self.nzWidth; //DONE 1, 2, 3, 4, 16

            break;

          case 5:
            //done
            self.windowOffsetTop = self.nzHeight; //DONE - 4,5,6,7,8

            self.windowOffsetLeft = self.nzWidth - self.zoomWindow.width() - self.options.borderSize * 2; //DONE - 5,15

            break;

          case 6:
            if (self.options.zoomWindowHeight > self.nzHeight) {
              //positive margin
              self.windowOffsetTop = self.nzHeight; //DONE - 4,5,6,7,8

              self.windowOffsetLeft = (self.options.zoomWindowWidth / 2 - self.nzWidth / 2 + self.options.borderSize * 2) * -1;
            } else {
              //negative margin
              $.noop();
            }

            break;

          case 7:
            //done
            self.windowOffsetTop = self.nzHeight; //DONE - 4,5,6,7,8

            self.windowOffsetLeft = 0; //DONE 7, 13

            break;

          case 8:
            //done
            self.windowOffsetTop = self.nzHeight; //DONE - 4,5,6,7,8

            self.windowOffsetLeft = (self.zoomWindow.width() + self.options.borderSize * 2) * -1; //DONE 8,9,10,11,12

            break;

          case 9:
            //done
            self.windowOffsetTop = self.nzHeight - self.zoomWindow.height() - self.options.borderSize * 2; //DONE 3,9

            self.windowOffsetLeft = (self.zoomWindow.width() + self.options.borderSize * 2) * -1; //DONE 8,9,10,11,12

            break;

          case 10:
            if (self.options.zoomWindowHeight > self.nzHeight) {
              //positive margin
              self.windowOffsetTop = (self.options.zoomWindowHeight / 2 - self.nzHeight / 2) * -1;
              self.windowOffsetLeft = (self.zoomWindow.width() + self.options.borderSize * 2) * -1; //DONE 8,9,10,11,12
            } else {
              //negative margin
              $.noop();
            }

            break;

          case 11:
            self.windowOffsetTop = self.options.zoomWindowOffsetY;
            self.windowOffsetLeft = (self.zoomWindow.width() + self.options.borderSize * 2) * -1; //DONE 8,9,10,11,12

            break;

          case 12:
            //done
            self.windowOffsetTop = (self.zoomWindow.height() + self.options.borderSize * 2) * -1; //DONE 12,13,14,15,16

            self.windowOffsetLeft = (self.zoomWindow.width() + self.options.borderSize * 2) * -1; //DONE 8,9,10,11,12

            break;

          case 13:
            //done
            self.windowOffsetTop = (self.zoomWindow.height() + self.options.borderSize * 2) * -1; //DONE 12,13,14,15,16

            self.windowOffsetLeft = 0; //DONE 7, 13

            break;

          case 14:
            if (self.options.zoomWindowHeight > self.nzHeight) {
              //positive margin
              self.windowOffsetTop = (self.zoomWindow.height() + self.options.borderSize * 2) * -1; //DONE 12,13,14,15,16

              self.windowOffsetLeft = (self.options.zoomWindowWidth / 2 - self.nzWidth / 2 + self.options.borderSize * 2) * -1;
            } else {
              //negative margin
              $.noop();
            }

            break;

          case 15:
            //done
            self.windowOffsetTop = (self.zoomWindow.height() + self.options.borderSize * 2) * -1; //DONE 12,13,14,15,16

            self.windowOffsetLeft = self.nzWidth - self.zoomWindow.width() - self.options.borderSize * 2; //DONE - 5,15

            break;

          case 16:
            //done
            self.windowOffsetTop = (self.zoomWindow.height() + self.options.borderSize * 2) * -1; //DONE 12,13,14,15,16

            self.windowOffsetLeft = self.nzWidth; //DONE 1, 2, 3, 4, 16

            break;

          default:
            //done
            self.windowOffsetTop = self.options.zoomWindowOffsetY; //DONE - 1

            self.windowOffsetLeft = self.nzWidth;
          //DONE 1, 2, 3, 4, 16
        }
      } //end isNAN
      else {
          // For BC purposes, treat passed element as ID if element not found
          self.externalContainer = $(self.options.zoomWindowPosition);

          if (!self.externalContainer.length) {
            self.externalContainer = $('#' + self.options.zoomWindowPosition);
          }

          self.externalContainerWidth = self.externalContainer.width();
          self.externalContainerHeight = self.externalContainer.height();
          self.externalContainerOffset = self.externalContainer.offset();
          self.windowOffsetTop = self.externalContainerOffset.top; //DONE - 1

          self.windowOffsetLeft = self.externalContainerOffset.left; //DONE 1, 2, 3, 4, 16
        }

      self.isWindowSet = true;
      self.windowOffsetTop = self.windowOffsetTop + self.options.zoomWindowOffsetY;
      self.windowOffsetLeft = self.windowOffsetLeft + self.options.zoomWindowOffsetX;
      self.zoomWindow.css({
        top: self.windowOffsetTop,
        left: self.windowOffsetLeft
      });

      if (self.options.zoomType === 'inner') {
        self.zoomWindow.css({
          top: 0,
          left: 0
        });
      }

      self.windowLeftPos = ((e.pageX - self.pageOffsetX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * -1;
      self.windowTopPos = ((e.pageY - self.pageOffsetY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * -1;

      if (self.Etoppos) {
        self.windowTopPos = 0;
      }

      if (self.Eloppos) {
        self.windowLeftPos = 0;
      }

      if (self.Eboppos) {
        self.windowTopPos = (self.largeHeight / self.currentZoomLevel - self.zoomWindow.height()) * -1;
      }

      if (self.Eroppos) {
        self.windowLeftPos = (self.largeWidth / self.currentZoomLevel - self.zoomWindow.width()) * -1;
      } //stops micro movements


      if (self.fullheight) {
        self.windowTopPos = 0;
      }

      if (self.fullwidth) {
        self.windowLeftPos = 0;
      } //set the css background position


      if (self.options.zoomType === 'window' || self.options.zoomType === 'inner') {
        if (self.zoomLock === 1) {
          //overrides for images not zoomable
          if (self.widthRatio <= 1) {
            self.windowLeftPos = 0;
          }

          if (self.heightRatio <= 1) {
            self.windowTopPos = 0;
          }
        } // adjust images less than the window height
        // if (self.options.zoomType === 'window') {
        //     if (self.largeHeight < self.options.zoomWindowHeight) {
        //         self.windowTopPos = 0;
        //     }
        //     if (self.largeWidth < self.options.zoomWindowWidth) {
        //         self.windowLeftPos = 0;
        //     }
        // }
        //set the zoomwindow background position


        if (self.options.easing) {
          //     if(self.changeZoom){
          //           clearInterval(self.loop);
          //           self.changeZoom = false;
          //           self.loop = false;
          //            }
          //set the pos to 0 if not set
          if (!self.xp) {
            self.xp = 0;
          }

          if (!self.yp) {
            self.yp = 0;
          }

          var interval = 16;
          var easingInterval = parseInt(self.options.easing);

          if (typeof easingInterval === 'number' && isFinite(easingInterval) && Math.floor(easingInterval) === easingInterval) {
            interval = easingInterval;
          } //if loop not already started, then run it


          if (!self.loop) {
            self.loop = setInterval(function () {
              //using zeno's paradox
              self.xp += (self.windowLeftPos - self.xp) / self.options.easingAmount;
              self.yp += (self.windowTopPos - self.yp) / self.options.easingAmount;

              if (self.scrollingLock) {
                clearInterval(self.loop);
                self.xp = self.windowLeftPos;
                self.yp = self.windowTopPos;
                self.xp = ((e.pageX - self.pageOffsetX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * -1;
                self.yp = ((e.pageY - self.pageOffsetY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * -1;

                if (self.changeBgSize) {
                  if (self.nzHeight > self.nzWidth) {
                    if (self.options.zoomType === 'lens') {
                      self.zoomLens.css({
                        backgroundSize: '' + self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                      });
                    }

                    self.zoomWindow.css({
                      backgroundSize: '' + self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                    });
                  } else {
                    if (self.options.zoomType !== 'lens') {
                      self.zoomLens.css({
                        backgroundSize: '' + self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                      });
                    }

                    self.zoomWindow.css({
                      backgroundSize: '' + self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                    });
                  }
                  /*
                   if(!self.bgxp){self.bgxp = self.largeWidth/self.newvalue;}
                   if(!self.bgyp){self.bgyp = self.largeHeight/self.newvalue ;}
                   if (!self.bgloop){
                   self.bgloop = setInterval(function(){
                    self.bgxp += (self.largeWidth/self.newvalue  - self.bgxp) / self.options.easingAmount;
                   self.bgyp += (self.largeHeight/self.newvalue  - self.bgyp) / self.options.easingAmount;
                    self.zoomWindow.css('background-size', self.bgxp + 'px ' + self.bgyp + 'px' );
                     }, 16);
                    }
                   */


                  self.changeBgSize = false;
                }

                self.zoomWindow.css({
                  backgroundPosition: '' + self.windowLeftPos + 'px ' + self.windowTopPos + 'px'
                });
                self.scrollingLock = false;
                self.loop = false;
              } else if (Math.round(Math.abs(self.xp - self.windowLeftPos) + Math.abs(self.yp - self.windowTopPos)) < 1) {
                //stops micro movements
                clearInterval(self.loop);
                self.zoomWindow.css({
                  backgroundPosition: '' + self.windowLeftPos + 'px ' + self.windowTopPos + 'px'
                });
                self.loop = false;
              } else {
                if (self.changeBgSize) {
                  if (self.nzHeight > self.nzWidth) {
                    if (self.options.zoomType === 'lens') {
                      self.zoomLens.css({
                        backgroundSize: '' + self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                      });
                    }

                    self.zoomWindow.css({
                      backgroundSize: '' + self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                    });
                  } else {
                    if (self.options.zoomType !== 'lens') {
                      self.zoomLens.css({
                        backgroundSize: '' + self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                      });
                    }

                    self.zoomWindow.css({
                      backgroundSize: '' + self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                    });
                  }

                  self.changeBgSize = false;
                }

                self.zoomWindow.css({
                  backgroundPosition: '' + self.xp + 'px ' + self.yp + 'px'
                });
              }
            }, interval);
          }
        } else {
          if (self.changeBgSize) {
            if (self.nzHeight > self.nzWidth) {
              if (self.options.zoomType === 'lens') {
                self.zoomLens.css({
                  backgroundSize: '' + self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                });
              }

              self.zoomWindow.css({
                backgroundSize: '' + self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
              });
            } else {
              if (self.options.zoomType === 'lens') {
                self.zoomLens.css({
                  backgroundSize: '' + self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                });
              }

              if (self.largeHeight / self.newvaluewidth < self.options.zoomWindowHeight) {
                self.zoomWindow.css({
                  backgroundSize: '' + self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                });
              } else {
                self.zoomWindow.css({
                  backgroundSize: '' + self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                });
              }
            }

            self.changeBgSize = false;
          }

          self.zoomWindow.css({
            backgroundPosition: '' + self.windowLeftPos + 'px ' + self.windowTopPos + 'px'
          });
        }
      }
    },
    setTintPosition: function setTintPosition(e) {
      var self = this;
      var zoomLensWidth = self.zoomLens.width();
      var zoomLensHeight = self.zoomLens.height();
      self.updateOffset(self);
      self.tintpos = (e.pageX - self.pageOffsetX - self.nzOffset.left - zoomLensWidth / 2) * -1;
      self.tintposy = (e.pageY - self.pageOffsetY - self.nzOffset.top - zoomLensHeight / 2) * -1;

      if (self.Etoppos) {
        self.tintposy = 0;
      }

      if (self.Eloppos) {
        self.tintpos = 0;
      }

      if (self.Eboppos) {
        self.tintposy = (self.nzHeight - zoomLensHeight - self.options.lensBorderSize * 2) * -1;
      }

      if (self.Eroppos) {
        self.tintpos = (self.nzWidth - zoomLensWidth - self.options.lensBorderSize * 2) * -1;
      }

      if (self.options.tint) {
        //stops micro movements
        if (self.fullheight) {
          self.tintposy = 0;
        }

        if (self.fullwidth) {
          self.tintpos = 0;
        }

        self.zoomTintImage.css({
          left: self.tintpos,
          top: self.tintposy
        });
      }
    },
    swaptheimage: function swaptheimage(smallimage, largeimage) {
      var self = this;
      var newImg = new Image();

      if (self.options.loadingIcon && !self.spinner) {
        var styleAttr = {
          background: 'url("' + self.options.loadingIcon + '") no-repeat',
          height: self.nzHeight,
          width: self.nzWidth,
          zIndex: 2000,
          position: 'absolute',
          backgroundPosition: 'center center'
        };

        if (self.options.zoomType === 'inner') {
          styleAttr.setProperty('top', 0);
        }

        self.spinner = $('<div class="ezp-spinner"></div>').css(styleAttr);
        self.$elem.after(self.spinner);
      } else if (self.spinner) {
        self.spinner.show();
      }

      self.options.onImageSwap(self.$elem);

      newImg.onload = function () {
        self.largeWidth = newImg.width;
        self.largeHeight = newImg.height;
        self.zoomImage = largeimage;
        self.zoomWindow.css({
          backgroundSize: '' + self.largeWidth + 'px ' + self.largeHeight + 'px'
        });
        self.swapAction(smallimage, largeimage);
        return;
      };

      self.setImageSource(newImg, largeimage); // this must be done AFTER setting onload
    },
    swapAction: function swapAction(smallimage, largeimage) {
      var self = this;
      var elemWidth = self.$elem.width();
      var elemHeight = self.$elem.height();
      var newImg2 = new Image();

      newImg2.onload = function () {
        //re-calculate values
        self.nzHeight = newImg2.height;
        self.nzWidth = newImg2.width;
        self.options.onImageSwapComplete(self.$elem);
        self.doneCallback();
        return;
      };

      self.setImageSource(newImg2, smallimage); //reset the zoomlevel to that initially set in options

      self.currentZoomLevel = self.options.zoomLevel;
      self.options.maxZoomLevel = false; //swaps the main image
      //self.$elem.attr('src',smallimage);
      //swaps the zoom image

      if (self.options.zoomType === 'lens') {
        self.zoomLens.css('background-image', 'url("' + largeimage + '")');
      }

      if (self.options.zoomType === 'window') {
        self.zoomWindow.css('background-image', 'url("' + largeimage + '")');
      }

      if (self.options.zoomType === 'inner') {
        self.zoomWindow.css('background-image', 'url("' + largeimage + '")');
      }

      self.currentImage = largeimage;

      if (self.options.imageCrossfade) {
        var oldImg = self.$elem;
        var newImg = oldImg.clone();
        self.$elem.attr('src', smallimage);
        self.$elem.after(newImg);
        newImg.stop(true).fadeOut(self.options.imageCrossfade, function () {
          $(this).remove();
        }); // if(self.options.zoomType === 'inner'){
        //remove any attributes on the cloned image so we can resize later

        self.$elem.width('auto').removeAttr('width');
        self.$elem.height('auto').removeAttr('height'); //   }

        oldImg.fadeIn(self.options.imageCrossfade);

        if (self.options.tint && self.options.zoomType !== 'inner') {
          var oldImgTint = self.zoomTintImage;
          var newImgTint = oldImgTint.clone();
          self.zoomTintImage.attr('src', largeimage);
          self.zoomTintImage.after(newImgTint);
          newImgTint.stop(true).fadeOut(self.options.imageCrossfade, function () {
            $(this).remove();
          });
          oldImgTint.fadeIn(self.options.imageCrossfade); //self.zoomTintImage.attr('width',elem.data('image'));
          //resize the tint window

          self.zoomTint.css({
            height: elemHeight,
            width: elemWidth
          });
        }

        self.zoomContainer.css({
          'height': elemHeight,
          'width': elemWidth
        });

        if (self.options.zoomType === 'inner') {
          if (!self.options.constrainType) {
            self.zoomWrap.parent().css({
              'height': elemHeight,
              'width': elemWidth
            });
            self.zoomWindow.css({
              'height': elemHeight,
              'width': elemWidth
            });
          }
        }

        if (self.options.imageCrossfade) {
          self.zoomWrap.css({
            'height': elemHeight,
            'width': elemWidth
          });
        }
      } else {
        self.$elem.attr('src', smallimage);

        if (self.options.tint) {
          self.zoomTintImage.attr('src', largeimage); //self.zoomTintImage.attr('width',elem.data('image'));

          self.zoomTintImage.attr('height', elemHeight); //self.zoomTintImage.attr('src') = elem.data('image');

          self.zoomTintImage.css('height', elemHeight);
          self.zoomTint.css('height', elemHeight);
        }

        self.zoomContainer.css({
          'height': elemHeight,
          'width': elemWidth
        });

        if (self.options.imageCrossfade) {
          self.zoomWrap.css({
            'height': elemHeight,
            'width': elemWidth
          });
        }
      }

      if (self.options.constrainType) {
        //This will contrain the image proportions
        if (self.options.constrainType === 'height') {
          var autoWDimension = {
            'height': self.options.constrainSize,
            'width': 'auto'
          };
          self.zoomContainer.css(autoWDimension);

          if (self.options.imageCrossfade) {
            self.zoomWrap.css(autoWDimension);
            self.constwidth = self.zoomWrap.width();
          } else {
            self.$elem.css(autoWDimension);
            self.constwidth = elemWidth;
          }

          var constWDim = {
            'height': self.options.constrainSize,
            'width': self.constwidth
          };

          if (self.options.zoomType === 'inner') {
            self.zoomWrap.parent().css(constWDim);
            self.zoomWindow.css(constWDim);
          }

          if (self.options.tint) {
            self.tintContainer.css(constWDim);
            self.zoomTint.css(constWDim);
            self.zoomTintImage.css(constWDim);
          }
        }

        if (self.options.constrainType === 'width') {
          var autoHDimension = {
            'height': 'auto',
            'width': self.options.constrainSize
          };
          self.zoomContainer.css(autoHDimension);

          if (self.options.imageCrossfade) {
            self.zoomWrap.css(autoHDimension);
            self.constheight = self.zoomWrap.height();
          } else {
            self.$elem.css(autoHDimension);
            self.constheight = elemHeight;
          }

          var constHDim = {
            'height': self.constheight,
            'width': self.options.constrainSize
          };

          if (self.options.zoomType === 'inner') {
            self.zoomWrap.parent().css(constHDim);
            self.zoomWindow.css(constHDim);
          }

          if (self.options.tint) {
            self.tintContainer.css(constHDim);
            self.zoomTint.css(constHDim);
            self.zoomTintImage.css(constHDim);
          }
        }
      }
    },
    doneCallback: function doneCallback() {
      var self = this;

      if (self.options.loadingIcon && !!self.spinner && !!self.spinner.length) {
        self.spinner.hide();
      }

      self.updateOffset(self);
      self.nzWidth = self.$elem.width();
      self.nzHeight = self.$elem.height(); // reset the zoomlevel back to default

      self.currentZoomLevel = self.options.zoomLevel; //ratio of the large to small image

      self.widthRatio = self.largeWidth / self.nzWidth;
      self.heightRatio = self.largeHeight / self.nzHeight; //NEED TO ADD THE LENS SIZE FOR ROUND
      // adjust images less than the window height

      if (self.options.zoomType === 'window') {
        if (self.nzHeight < self.options.zoomWindowHeight / self.heightRatio) {
          self.lensHeight = self.nzHeight;
        } else {
          self.lensHeight = self.options.zoomWindowHeight / self.heightRatio;
        }

        if (self.nzWidth < self.options.zoomWindowWidth) {
          self.lensWidth = self.nzWidth;
        } else {
          self.lensWidth = self.options.zoomWindowWidth / self.widthRatio;
        }

        if (self.zoomLens) {
          self.zoomLens.css({
            'width': self.lensWidth,
            'height': self.lensHeight
          });
        }
      }
    },
    getCurrentImage: function getCurrentImage() {
      var self = this;
      return self.zoomImage;
    },
    getGalleryList: function getGalleryList() {
      var self = this; //loop through the gallery options and set them in list for fancybox

      self.gallerylist = [];

      if (self.options.gallery) {
        $('#' + self.options.gallery + ' a').each(function () {
          var imgSrc = '';

          if ($(this).data(self.options.attrImageZoomSrc)) {
            imgSrc = $(this).data(self.options.attrImageZoomSrc);
          } else if ($(this).data('image')) {
            imgSrc = $(this).data('image');
          } //put the current image at the start


          if (imgSrc === self.zoomImage) {
            self.gallerylist.unshift({
              href: '' + imgSrc + '',
              title: $(this).find('img').attr('title')
            });
          } else {
            self.gallerylist.push({
              href: '' + imgSrc + '',
              title: $(this).find('img').attr('title')
            });
          }
        });
      } //if no gallery - return current image
      else {
          self.gallerylist.push({
            href: '' + self.zoomImage + '',
            title: $(this).find('img').attr('title')
          });
        }

      return self.gallerylist;
    },
    changeZoomLevel: function changeZoomLevel(value) {
      var self = this; //flag a zoom, so can adjust the easing during setPosition

      self.scrollingLock = true; //round to two decimal places

      self.newvalue = parseFloat(value).toFixed(2);
      var newvalue = self.newvalue; //maxwidth & Maxheight of the image

      var maxheightnewvalue = self.largeHeight / (self.options.zoomWindowHeight / self.nzHeight * self.nzHeight);
      var maxwidthtnewvalue = self.largeWidth / (self.options.zoomWindowWidth / self.nzWidth * self.nzWidth); //calculate new heightratio

      if (self.options.zoomType !== 'inner') {
        if (maxheightnewvalue <= newvalue) {
          self.heightRatio = self.largeHeight / maxheightnewvalue / self.nzHeight;
          self.newvalueheight = maxheightnewvalue;
          self.fullheight = true;
        } else {
          self.heightRatio = self.largeHeight / newvalue / self.nzHeight;
          self.newvalueheight = newvalue;
          self.fullheight = false;
        } // calculate new width ratio


        if (maxwidthtnewvalue <= newvalue) {
          self.widthRatio = self.largeWidth / maxwidthtnewvalue / self.nzWidth;
          self.newvaluewidth = maxwidthtnewvalue;
          self.fullwidth = true;
        } else {
          self.widthRatio = self.largeWidth / newvalue / self.nzWidth;
          self.newvaluewidth = newvalue;
          self.fullwidth = false;
        }

        if (self.options.zoomType === 'lens') {
          if (maxheightnewvalue <= newvalue) {
            self.fullwidth = true;
            self.newvaluewidth = maxheightnewvalue;
          } else {
            self.widthRatio = self.largeWidth / newvalue / self.nzWidth;
            self.newvaluewidth = newvalue;
            self.fullwidth = false;
          }
        }
      }

      if (self.options.zoomType === 'inner') {
        maxheightnewvalue = parseFloat(self.largeHeight / self.nzHeight).toFixed(2);
        maxwidthtnewvalue = parseFloat(self.largeWidth / self.nzWidth).toFixed(2);

        if (newvalue > maxheightnewvalue) {
          newvalue = maxheightnewvalue;
        }

        if (newvalue > maxwidthtnewvalue) {
          newvalue = maxwidthtnewvalue;
        }

        if (maxheightnewvalue <= newvalue) {
          self.heightRatio = self.largeHeight / newvalue / self.nzHeight;

          if (newvalue > maxheightnewvalue) {
            self.newvalueheight = maxheightnewvalue;
          } else {
            self.newvalueheight = newvalue;
          }

          self.fullheight = true;
        } else {
          self.heightRatio = self.largeHeight / newvalue / self.nzHeight;

          if (newvalue > maxheightnewvalue) {
            self.newvalueheight = maxheightnewvalue;
          } else {
            self.newvalueheight = newvalue;
          }

          self.fullheight = false;
        }

        if (maxwidthtnewvalue <= newvalue) {
          self.widthRatio = self.largeWidth / newvalue / self.nzWidth;

          if (newvalue > maxwidthtnewvalue) {
            self.newvaluewidth = maxwidthtnewvalue;
          } else {
            self.newvaluewidth = newvalue;
          }

          self.fullwidth = true;
        } else {
          self.widthRatio = self.largeWidth / newvalue / self.nzWidth;
          self.newvaluewidth = newvalue;
          self.fullwidth = false;
        }
      } //end inner


      var scrcontinue = false;

      if (self.options.zoomType === 'inner') {
        if (self.nzWidth >= self.nzHeight) {
          if (self.newvaluewidth <= maxwidthtnewvalue) {
            scrcontinue = true;
          } else {
            scrcontinue = false;
            self.fullheight = true;
            self.fullwidth = true;
          }
        }

        if (self.nzHeight > self.nzWidth) {
          if (self.newvaluewidth <= maxwidthtnewvalue) {
            scrcontinue = true;
          } else {
            scrcontinue = false;
            self.fullheight = true;
            self.fullwidth = true;
          }
        }
      }

      if (self.options.zoomType !== 'inner') {
        scrcontinue = true;
      }

      if (scrcontinue) {
        self.zoomLock = 0;
        self.changeZoom = true; //if lens height is less than image height

        if (self.options.zoomWindowHeight / self.heightRatio <= self.nzHeight) {
          self.currentZoomLevel = self.newvalueheight;

          if (self.options.zoomType !== 'lens' && self.options.zoomType !== 'inner') {
            self.changeBgSize = true;
            self.zoomLens.css({
              height: self.options.zoomWindowHeight / self.heightRatio
            });
          }

          if (self.options.zoomType === 'lens' || self.options.zoomType === 'inner') {
            self.changeBgSize = true;
          }
        }

        if (self.options.zoomWindowWidth / self.widthRatio <= self.nzWidth) {
          if (self.options.zoomType !== 'inner') {
            if (self.newvaluewidth > self.newvalueheight) {
              self.currentZoomLevel = self.newvaluewidth;
            }
          }

          if (self.options.zoomType !== 'lens' && self.options.zoomType !== 'inner') {
            self.changeBgSize = true;
            self.zoomLens.css({
              width: self.options.zoomWindowWidth / self.widthRatio
            });
          }

          if (self.options.zoomType === 'lens' || self.options.zoomType === 'inner') {
            self.changeBgSize = true;
          }
        }

        if (self.options.zoomType === 'inner') {
          self.changeBgSize = true;

          if (self.nzWidth > self.nzHeight) {
            self.currentZoomLevel = self.newvaluewidth;
          } else if (self.nzHeight >= self.nzWidth) {
            self.currentZoomLevel = self.newvaluewidth;
          }
        }
      } //under
      //sets the boundry change, called in setWindowPos


      self.setPosition(self.currentLoc); //
    },
    closeAll: function closeAll() {
      var self = this;

      if (self.zoomWindow) {
        self.zoomWindow.hide();
      }

      if (self.zoomLens) {
        self.zoomLens.hide();
      }

      if (self.zoomTint) {
        self.zoomTint.hide();
      }
    },
    updateOffset: function updateOffset(self) {
      if (self.options.zoomContainerAppendTo !== 'body') {
        self.nzOffset = self.$elem.offset();
        var appendedPosition = $(self.options.zoomContainerAppendTo).offset();
        self.nzOffset.top = self.$elem.offset().top - appendedPosition.top;
        self.nzOffset.left = self.$elem.offset().left - appendedPosition.left; // NOTE: When initialising ezPlus on an element
        // present inside a dialog the positions will
        // not be correct unless the dialog occupies the
        // entire viewport. These page offsets will help
        // zoom lens and zoom window to be positioned
        // correctly
        // Update page offsets

        self.pageOffsetX = appendedPosition.left;
        self.pageOffsetY = appendedPosition.top;
      } else {
        self.nzOffset = self.$elem.offset(); // Update page offsets

        self.pageOffsetX = 0;
        self.pageOffsetY = 0;
      }
    },
    changeState: function changeState(value) {
      var self = this;

      if (value === 'enable') {
        self.options.zoomEnabled = true;
      }

      if (value === 'disable') {
        self.options.zoomEnabled = false;
      }
    },
    responsiveConfig: function responsiveConfig(options) {
      if (options.respond && options.respond.length > 0) {
        return $.extend({}, options, this.configByScreenWidth(options));
      }

      return options;
    },
    configByScreenWidth: function configByScreenWidth(options) {
      var screenWidth = $(window).width();
      var config = $.grep(options.respond, function (item) {
        var range = item.range.split('-');
        return screenWidth >= range[0] && screenWidth <= range[1];
      });

      if (config.length > 0) {
        return config[0];
      } else {
        return options;
      }
    }
  };

  $.fn.ezPlus = function (options) {
    return this.each(function () {
      var elevate = Object.create(EZP);
      elevate.init(options, this);
      $.data(this, 'ezPlus', elevate);
    });
  };

  $.fn.ezPlus.options = {
    container: 'ZoomContainer',
    attrImageZoomSrc: 'zoom-image',
    // attribute to plugin use for zoom
    borderColour: '#888',
    borderSize: 4,
    constrainSize: false,
    //in pixels the dimensions you want to constrain on
    constrainType: false,
    //width or height
    containLensZoom: false,
    cursor: 'inherit',
    // user should set to what they want the cursor as, if they have set a click function
    debug: false,
    easing: false,
    easingAmount: 12,
    enabled: true,
    gallery: false,
    galleryActiveClass: 'zoomGalleryActive',
    gallerySelector: false,
    galleryItem: 'a',
    galleryEvent: 'click',
    imageCrossfade: false,
    lensBorderColour: '#000',
    lensBorderSize: 1,
    lensColour: 'white',
    //colour of the lens background
    lensFadeIn: false,
    lensFadeOut: false,
    lensOpacity: 0.4,
    //opacity of the lens
    lensShape: 'square',
    //can be 'round'
    lensSize: 200,
    lenszoom: false,
    loadingIcon: false,
    //http://www.example.com/spinner.gif
    // This change will allow to decide if you want to decrease
    // zoom of one of the dimensions once the other reached it's top value,
    // or keep the aspect ratio, default behaviour still being as always,
    // allow to continue zooming out, so it keeps retrocompatibility.
    mantainZoomAspectRatio: false,
    maxZoomLevel: false,
    minZoomLevel: 1.01,
    onComplete: $.noop,
    onDestroy: $.noop,
    onImageClick: $.noop,
    onImageSwap: $.noop,
    onImageSwapComplete: $.noop,
    onShow: $.noop,
    onHide: $.noop,
    onZoomedImageLoaded: $.noop,
    preloading: 1,
    //by default, load all the images, if 0, then only load images after activated (PLACEHOLDER FOR NEXT VERSION)
    respond: [],
    responsive: true,
    scrollZoom: false,
    //allow zoom on mousewheel, true to activate
    scrollZoomIncrement: 0.1,
    //steps of the scrollzoom
    showLens: true,
    tint: false,
    //enable the tinting
    tintColour: '#333',
    //default tint color, can be anything, red, #ccc, rgb(0,0,0)
    tintOpacity: 0.4,
    //opacity of the tint
    touchEnabled: true,
    zoomActivation: 'hover',
    // Can also be click (PLACEHOLDER FOR NEXT VERSION)
    zoomContainerAppendTo: 'body',
    //zoom container parent selector
    zoomId: -1,
    // identifier for the zoom container
    zoomLevel: 1,
    //default zoom level of image
    zoomTintFadeIn: false,
    zoomTintFadeOut: false,
    zoomType: 'window',
    //window is default,  also 'lens' available -
    zoomWindowAlwaysShow: false,
    zoomWindowBgColour: '#fff',
    zoomWindowFadeIn: false,
    zoomWindowFadeOut: false,
    zoomWindowHeight: 400,
    zoomWindowOffsetX: 0,
    zoomWindowOffsetY: 0,
    zoomWindowPosition: 1,
    //Possible values: 1-16, but we can also position with a selector string.
    zoomWindowWidth: 400,
    zoomEnabled: true,
    //false disables zoomwindow from showing
    zIndex: 999
  };
})(window.jQuery, window, document);
/*!
 * jQuery Mousewheel 3.1.13
 * Copyright OpenJS Foundation and other contributors
 */


(function (factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
    // Node/CommonJS style for Browserify
    module.exports = factory;
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {
  var toFix = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
      toBind = "onwheel" in window.document || window.document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
      slice = Array.prototype.slice,
      nullLowestDeltaTimeout,
      lowestDelta;

  if ($.event.fixHooks) {
    for (var i = toFix.length; i;) {
      $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
    }
  }

  var special = $.event.special.mousewheel = {
    version: "3.1.12",
    setup: function setup() {
      if (this.addEventListener) {
        for (var i = toBind.length; i;) {
          this.addEventListener(toBind[--i], handler, false);
        }
      } else {
        this.onmousewheel = handler;
      } // Store the line height and page height for this particular element


      $.data(this, "mousewheel-line-height", special.getLineHeight(this));
      $.data(this, "mousewheel-page-height", special.getPageHeight(this));
    },
    teardown: function teardown() {
      if (this.removeEventListener) {
        for (var i = toBind.length; i;) {
          this.removeEventListener(toBind[--i], handler, false);
        }
      } else {
        this.onmousewheel = null;
      } // Clean up the data we added to the element


      $.removeData(this, "mousewheel-line-height");
      $.removeData(this, "mousewheel-page-height");
    },
    getLineHeight: function getLineHeight(elem) {
      var $elem = $(elem),
          $parent = $elem["offsetParent" in $.fn ? "offsetParent" : "parent"]();

      if (!$parent.length) {
        $parent = $("body");
      }

      return parseInt($parent.css("fontSize"), 10) || parseInt($elem.css("fontSize"), 10) || 16;
    },
    getPageHeight: function getPageHeight(elem) {
      return $(elem).height();
    },
    settings: {
      adjustOldDeltas: true,
      // see shouldAdjustOldDeltas() below
      normalizeOffset: true // calls getBoundingClientRect for each event

    }
  };
  $.fn.extend({
    mousewheel: function mousewheel(fn) {
      return fn ? this.on("mousewheel", fn) : this.trigger("mousewheel");
    },
    unmousewheel: function unmousewheel(fn) {
      return this.off("mousewheel", fn);
    }
  });

  function handler(event) {
    var orgEvent = event || window.event,
        args = slice.call(arguments, 1),
        delta = 0,
        deltaX = 0,
        deltaY = 0,
        absDelta = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel"; // Old school scrollwheel delta

    if ("detail" in orgEvent) {
      deltaY = orgEvent.detail * -1;
    }

    if ("wheelDelta" in orgEvent) {
      deltaY = orgEvent.wheelDelta;
    }

    if ("wheelDeltaY" in orgEvent) {
      deltaY = orgEvent.wheelDeltaY;
    }

    if ("wheelDeltaX" in orgEvent) {
      deltaX = orgEvent.wheelDeltaX * -1;
    } // Firefox < 17 horizontal scrolling related to DOMMouseScroll event


    if ("axis" in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
      deltaX = deltaY * -1;
      deltaY = 0;
    } // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy


    delta = deltaY === 0 ? deltaX : deltaY; // New school wheel delta (wheel event)

    if ("deltaY" in orgEvent) {
      deltaY = orgEvent.deltaY * -1;
      delta = deltaY;
    }

    if ("deltaX" in orgEvent) {
      deltaX = orgEvent.deltaX;

      if (deltaY === 0) {
        delta = deltaX * -1;
      }
    } // No change actually happened, no reason to go any further


    if (deltaY === 0 && deltaX === 0) {
      return;
    } // Need to convert lines and pages to pixels if we aren't already in pixels
    // There are three delta modes:
    //   * deltaMode 0 is by pixels, nothing to do
    //   * deltaMode 1 is by lines
    //   * deltaMode 2 is by pages


    if (orgEvent.deltaMode === 1) {
      var lineHeight = $.data(this, "mousewheel-line-height");
      delta *= lineHeight;
      deltaY *= lineHeight;
      deltaX *= lineHeight;
    } else if (orgEvent.deltaMode === 2) {
      var pageHeight = $.data(this, "mousewheel-page-height");
      delta *= pageHeight;
      deltaY *= pageHeight;
      deltaX *= pageHeight;
    } // Store lowest absolute delta to normalize the delta values


    absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

    if (!lowestDelta || absDelta < lowestDelta) {
      lowestDelta = absDelta; // Adjust older deltas if necessary

      if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
        lowestDelta /= 40;
      }
    } // Adjust older deltas if necessary


    if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
      // Divide all the things by 40!
      delta /= 40;
      deltaX /= 40;
      deltaY /= 40;
    } // Get a whole, normalized value for the deltas


    delta = Math[delta >= 1 ? "floor" : "ceil"](delta / lowestDelta);
    deltaX = Math[deltaX >= 1 ? "floor" : "ceil"](deltaX / lowestDelta);
    deltaY = Math[deltaY >= 1 ? "floor" : "ceil"](deltaY / lowestDelta); // Normalise offsetX and offsetY properties

    if (special.settings.normalizeOffset && this.getBoundingClientRect) {
      var boundingRect = this.getBoundingClientRect();
      event.offsetX = event.clientX - boundingRect.left;
      event.offsetY = event.clientY - boundingRect.top;
    } // Add information to the event object


    event.deltaX = deltaX;
    event.deltaY = deltaY;
    event.deltaFactor = lowestDelta; // Go ahead and set deltaMode to 0 since we converted to pixels
    // Although this is a little odd since we overwrite the deltaX/Y
    // properties with normalized deltas.

    event.deltaMode = 0; // Add event and delta to the front of the arguments

    args.unshift(event, delta, deltaX, deltaY); // Clearout lowestDelta after sometime to better
    // handle multiple device types that give different
    // a different lowestDelta
    // Ex: trackpad = 3 and mouse wheel = 120

    if (nullLowestDeltaTimeout) {
      window.clearTimeout(nullLowestDeltaTimeout);
    }

    nullLowestDeltaTimeout = window.setTimeout(nullLowestDelta, 200);
    return ($.event.dispatch || $.event.handle).apply(this, args);
  }

  function nullLowestDelta() {
    lowestDelta = null;
  }

  function shouldAdjustOldDeltas(orgEvent, absDelta) {
    // If this is an older event and the delta is divisable by 120,
    // then we are assuming that the browser is treating this as an
    // older mouse wheel event and that we should divide the deltas
    // by 40 to try and get a more usable deltaFactor.
    // Side note, this actually impacts the reported scroll distance
    // in older browsers and can cause scrolling to be slower than native.
    // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
    return special.settings.adjustOldDeltas && orgEvent.type === "mousewheel" && absDelta % 120 === 0;
  }
}); // custom scripts


function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
}); // Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
  var originalPositions = [];
  var daElements = document.querySelectorAll('[data-da]');
  var daElementsArray = [];
  var daMatchMedia = []; //Заполняем массивы

  if (daElements.length > 0) {
    var number = 0;

    for (var index = 0; index < daElements.length; index++) {
      var daElement = daElements[index];
      var daMove = daElement.getAttribute('data-da');

      if (daMove != '') {
        var daArray = daMove.split(',');
        var daPlace = daArray[1] ? daArray[1].trim() : 'last';
        var daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
        var daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
        var daDestination = document.querySelector('.' + daArray[0].trim());

        if (daArray.length > 0 && daDestination) {
          daElement.setAttribute('data-da-index', number); //Заполняем массив первоначальных позиций

          originalPositions[number] = {
            "parent": daElement.parentNode,
            "index": indexInParent(daElement)
          }; //Заполняем массив элементов 

          daElementsArray[number] = {
            "element": daElement,
            "destination": document.querySelector('.' + daArray[0].trim()),
            "place": daPlace,
            "breakpoint": daBreakpoint,
            "type": daType
          };
          number++;
        }
      }
    }

    dynamicAdaptSort(daElementsArray); //Создаем события в точке брейкпоинта

    for (var _index = 0; _index < daElementsArray.length; _index++) {
      var el = daElementsArray[_index];
      var _daBreakpoint = el.breakpoint;
      var _daType = el.type;
      daMatchMedia.push(window.matchMedia("(" + _daType + "-width: " + _daBreakpoint + "px)"));

      daMatchMedia[_index].addListener(dynamicAdapt);
    }
  } //Основная функция


  function dynamicAdapt(e) {
    for (var _index2 = 0; _index2 < daElementsArray.length; _index2++) {
      var _el = daElementsArray[_index2];
      var _daElement = _el.element;
      var _daDestination = _el.destination;
      var _daPlace = _el.place;
      var _daBreakpoint2 = _el.breakpoint;
      var daClassname = "_dynamic_adapt_" + _daBreakpoint2;

      if (daMatchMedia[_index2].matches) {
        //Перебрасываем элементы
        if (!_daElement.classList.contains(daClassname)) {
          var actualIndex = indexOfElements(_daDestination)[_daPlace];

          if (_daPlace === 'first') {
            actualIndex = indexOfElements(_daDestination)[0];
          } else if (_daPlace === 'last') {
            actualIndex = indexOfElements(_daDestination)[indexOfElements(_daDestination).length];
          }

          _daDestination.insertBefore(_daElement, _daDestination.children[actualIndex]);

          _daElement.classList.add(daClassname);
        }
      } else {
        //Возвращаем на место
        if (_daElement.classList.contains(daClassname)) {
          dynamicAdaptBack(_daElement);

          _daElement.classList.remove(daClassname);
        }
      }
    }

    customAdapt();
  } //Вызов основной функции


  dynamicAdapt(); //Функция возврата на место

  function dynamicAdaptBack(el) {
    var daIndex = el.getAttribute('data-da-index');
    var originalPlace = originalPositions[daIndex];
    var parentPlace = originalPlace['parent'];
    var indexPlace = originalPlace['index'];
    var actualIndex = indexOfElements(parentPlace, true)[indexPlace];
    parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
  } //Функция получения индекса внутри родителя


  function indexInParent(el) {
    var children = Array.prototype.slice.call(el.parentNode.children);
    return children.indexOf(el);
  } //Функция получения массива индексов элементов внутри родителя 


  function indexOfElements(parent, back) {
    var children = parent.children;
    var childrenArray = [];

    for (var i = 0; i < children.length; i++) {
      var childrenElement = children[i];

      if (back) {
        childrenArray.push(i);
      } else {
        //Исключая перенесенный элемент
        if (childrenElement.getAttribute('data-da') == null) {
          childrenArray.push(i);
        }
      }
    }

    return childrenArray;
  } //Сортировка объекта


  function dynamicAdaptSort(arr) {
    arr.sort(function (a, b) {
      if (a.breakpoint > b.breakpoint) {
        return -1;
      } else {
        return 1;
      }
    });
    arr.sort(function (a, b) {
      if (a.place > b.place) {
        return 1;
      } else {
        return -1;
      }
    });
  } //Дополнительные сценарии адаптации


  function customAdapt() {//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }
})();
/*
let block = document.querySelector('.click');
block.addEventListener("click", function (e) {
	alert('Все ок ;)');
});
*/

/*
//Объявляем переменные
const parent_original = document.querySelector('.content__blocks_city');
const parent = document.querySelector('.content__column_river');
const item = document.querySelector('.content__block_item');
//Слушаем изменение размера экрана
window.addEventListener('resize', move);
//Функция
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 992) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2]);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2]);
			item.classList.remove('done');
		}
	}
}
//Вызываем функцию
move();
*/


$(document).ready(function () {
  $('.header__burger').click(function (event) {
    $('.header__burger, .header__menu').toggleClass('active');
    $('body').toggleClass('lock');
  }); // Go To

  $(".menu").on("click", ".menu__link", function (event) {
    if (!$(this).hasClass('popup-link')) {
      event.preventDefault();
      var id = $(this).attr('href');
      var top = $(id).offset().top;
      $('.header__burger').removeClass('active');
      $('.header__menu').removeClass('active');
      $('body').removeClass('lock');
      $('body,html').animate({
        scrollTop: top
      }, 1000);
    }
  });
});
var popupLinks = document.querySelectorAll('.popup-link');
var body = document.querySelector('body');
var lockPadding = document.querySelectorAll(".lock-padding");
var unlock = true;
var timeout = 800;

if (popupLinks.length > 0) {
  var _loop = function _loop(index) {
    var popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      var popupName = popupLink.getAttribute('href').replace('#', '');
      var currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  };

  for (var index = 0; index < popupLinks.length; index++) {
    _loop(index);
  }
}

var popupCloseIcon = document.querySelectorAll('.close-popup');

if (popupCloseIcon.length > 0) {
  var _loop2 = function _loop2(_index3) {
    var el = popupCloseIcon[_index3];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  };

  for (var _index3 = 0; _index3 < popupCloseIcon.length; _index3++) {
    _loop2(_index3);
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    var popupActive = document.querySelector('.popup.open');

    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }

    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive) {
  var doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (unlock) {
    popupActive.classList.remove('open');

    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  var lockPaddingValue = window.innerWidth - document.querySelector('.site-content').offsetWidth + 'px'; //!обратить внимание на контейнер

  if (lockPadding.length > 0) {
    for (var _index4 = 0; _index4 < lockPadding.length; _index4++) {
      var el = lockPadding[_index4];
      el.style.paddingRight = lockPaddingValue;
    }
  }

  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (var _index5 = 0; _index5 < lockPadding.length; _index5++) {
        var el = lockPadding[_index5];
        el.style.paddingRight = '0px';
      }
    }

    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    var popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});

(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;else node = node.parentElement;
      }

      return null;
    };
  }
})();

(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})();

var animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
  var animOnScroll = function animOnScroll(params) {
    for (var _index6 = 0; _index6 < animItems.length; _index6++) {
      var animItem = animItems[_index6];
      var animItemHeight = animItem.offsetHeight;
      var animItemOffSet = offset(animItem).top;
      var animStart = 2; //Коэффициент регулирования появления анимации

      var animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (pageYOffset > animItemOffSet - animItemPoint && pageYOffset < animItemOffSet + animItemHeight) {
        animItem.classList.add('active');
      } else {
        if (!animItem.classList.contains('anim-no-hide')) {
          //Добавить класс, чтобы не было повторной анимации при обратной прокрутке страницы
          animItem.classList.remove('active');
        }
      }
    }
  };

  var offset = function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  };

  window.addEventListener('scroll', animOnScroll);
  setTimeout(function () {
    animOnScroll();
  }, 300);
}

$('#myfile').change(function () {
  var ext = this.value.match(/\.([^\.]+)$/)[1];

  switch (ext) {
    case 'doc':
    case 'docx':
    case 'xls':
    case 'xlsx':
    case 'pdf':
    case 'zip':
    case 'rar':
    case '7z':
    case 'jpg':
    case 'jpeg':
    case 'png':
      break;

    default:
      alert('Разрешенный формат файла: doc, docx, xls, xlsx, pdf, zip, rar, 7z, jpg, jpeg, png');
      this.value = '';
  }

  var $fileUpload = $("input[type='file']");

  if (parseInt($fileUpload.get(0).files.length) > 8) {
    alert("Можно отправить не больше 8 файлов, вы можете добавить архив");
    this.value = '';
  }
}); //Отправка данных на сервер

$('#form').trigger('reset');
$(function () {
  'use strict';

  $('#form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: 'send.php',
      type: 'POST',
      contentType: false,
      processData: false,
      data: new FormData(this),
      success: function success(msg) {
        console.log(msg);

        if (msg == 'ok') {
          $('#ModalThanks').modal('show');
          $('#form').trigger('reset'); // очистка формы
        } else {
          alert('Ваш файл слишком большой');
        }
      }
    });
  });
});

function adjustLine(from, to, line) {
  var fT = from.offsetTop + from.offsetHeight / 2;
  var tT = to.offsetTop + to.offsetHeight / 2;
  var fL = from.offsetLeft + from.offsetWidth / 2;
  var tL = to.offsetLeft + to.offsetWidth / 2;
  var CA = Math.abs(tT - fT);
  var CO = Math.abs(tL - fL);
  var H = Math.sqrt(CA * CA + CO * CO);
  var ANG = 180 / Math.PI * Math.acos(CA / H);

  if (tT > fT) {
    var top = (tT - fT) / 2 + fT;
  } else {
    var top = (fT - tT) / 2 + tT;
  }

  if (tL > fL) {
    var left = (tL - fL) / 2 + fL;
  } else {
    var left = (fL - tL) / 2 + tL;
  }

  if (fT < tT && fL < tL || tT < fT && tL < fL || fT > tT && fL > tL || tT > fT && tL > fL) {
    ANG *= -1;
  }

  top -= H / 2;
  line.style["-webkit-transform"] = 'rotate(' + ANG + 'deg)';
  line.style["-moz-transform"] = 'rotate(' + ANG + 'deg)';
  line.style["-ms-transform"] = 'rotate(' + ANG + 'deg)';
  line.style["-o-transform"] = 'rotate(' + ANG + 'deg)';
  line.style["-transform"] = 'rotate(' + ANG + 'deg)';
  line.style.top = top + 15 + 'px';
  line.style.left = left + 'px';
  line.style.height = H - 15 + 'px';
}

setInterval(function () {
  adjustLine(document.getElementById('shop__chevron1'), document.getElementById('shop__chevron2'), document.getElementById('line1'));
  adjustLine(document.getElementById('shop__chevron1'), document.getElementById('shop__chevron3'), document.getElementById('line2'));
  adjustLine(document.getElementById('shop__chevron2'), document.getElementById('shop__chevron3'), document.getElementById('line3'));
  adjustLine(document.getElementById('shop__chevron2'), document.getElementById('shop__chevron4'), document.getElementById('line4'));
  adjustLine(document.getElementById('shop__chevron3'), document.getElementById('shop__chevron4'), document.getElementById('line5'));
  adjustLine(document.getElementById('shop__chevron4'), document.getElementById('shop__chevron5'), document.getElementById('line6'));
  adjustLine(document.getElementById('shop__chevron4'), document.getElementById('shop__chevron7'), document.getElementById('line7'));
  adjustLine(document.getElementById('shop__chevron4'), document.getElementById('shop__chevron8'), document.getElementById('line8'));
  adjustLine(document.getElementById('shop__chevron7'), document.getElementById('shop__chevron8'), document.getElementById('line9'));
  adjustLine(document.getElementById('shop__chevron8'), document.getElementById('shop__chevron5'), document.getElementById('line10'));
  adjustLine(document.getElementById('shop__chevron5'), document.getElementById('shop__chevron6'), document.getElementById('line11'));
  adjustLine(document.getElementById('shop__chevron5'), document.getElementById('shop__chevron9'), document.getElementById('line12'));
  adjustLine(document.getElementById('shop__chevron6'), document.getElementById('shop__chevron10'), document.getElementById('line13'));
  adjustLine(document.getElementById('shop__chevron9'), document.getElementById('shop__chevron10'), document.getElementById('line14'));
  adjustLine(document.getElementById('shop__chevron3'), document.getElementById('shop__chevron7'), document.getElementById('line15'));
  adjustLine(document.getElementById('shop__chevron7'), document.getElementById('shop__chevron11'), document.getElementById('line16'));
  adjustLine(document.getElementById('shop__chevron8'), document.getElementById('shop__chevron12'), document.getElementById('line17'));
  adjustLine(document.getElementById('shop__chevron9'), document.getElementById('shop__chevron12'), document.getElementById('line18'));
  adjustLine(document.getElementById('shop__chevron10'), document.getElementById('shop__chevron12'), document.getElementById('line19'));
  adjustLine(document.getElementById('shop__chevron9'), document.getElementById('shop__chevron6'), document.getElementById('line20'));
  adjustLine(document.getElementById('shop__chevron12'), document.getElementById('shop__chevron11'), document.getElementById('line21'));
  adjustLine(document.getElementById('shop__chevron12'), document.getElementById('shop__chevron13'), document.getElementById('line22'));
  adjustLine(document.getElementById('shop__chevron11'), document.getElementById('shop__chevron13'), document.getElementById('line23'));
  adjustLine(document.getElementById('shop__chevron13'), document.getElementById('shop__chevron14'), document.getElementById('line24'));
}, 500);
$('.accordion__title').click(function (event) {
  if ($('.accordion').hasClass('accordion-one')) {
    $('.accordion__title').not($(this)).removeClass('active');
    $('.accordion__text').not($(this).next()).slideUp(300);
  }

  $(this).toggleClass('active').next().slideToggle(300);
});
$(document).ready(function () {
  $('.catalog__cards').slick({
    autoplay: false,
    infinite: true,
    arrows: true,
    centerMode: true,
    variableWidth: true,
    initialSlide: 1,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false,
        dots: true
      }
    }]
  }); // Ширина точек слайдера каталога

  $(function () {
    var slidesNumber = $('.catalog__card').length;
    var slidesClonedNumber = $('.catalog__card.slick-cloned').length;
    var dotsWidth = 100 / (slidesNumber - slidesClonedNumber);
    $('.catalog__cards .slick-dots li').width(dotsWidth + '%');
  });
  $('.item-photoes').slick({
    autoplay: false,
    infinite: false,
    arrows: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    adaptiveHeight: true
  }); // Ширина точек слайдера в модальном окне

  $(function () {
    var slidesNumber = $('.item-photoes').length;
    var slidesClonedNumber = $('.item-photoes.slick-cloned').length;
    var dotsWidth = 100 / (slidesNumber - slidesClonedNumber);
    $('.item-photoes .slick-dots li').width(dotsWidth + '%');
  }); // Добавление счетчика фотографий в модальном окне товара 1

  $(function () {
    var $status = $('#product-1 .pagingInfo');
    var $slickElement = $('#product-1 .item-photoes');
    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      var i = (currentSlide ? currentSlide : 0) + 1;
      $status.text('Фото ' + i + ' из ' + slick.slideCount);
    });
  }); // Добавление счетчика фотографий в модальном окне товара 2

  $(function () {
    var $status = $('#product-2 .pagingInfo');
    var $slickElement = $('#product-2 .item-photoes');
    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      var i = (currentSlide ? currentSlide : 0) + 1;
      $status.text('Фото ' + i + ' из ' + slick.slideCount);
    });
  }); // Добавление счетчика фотографий в модальном окне товара 3

  $(function () {
    var $status = $('#product-3 .pagingInfo');
    var $slickElement = $('#product-3 .item-photoes');
    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      var i = (currentSlide ? currentSlide : 0) + 1;
      $status.text('Фото ' + i + ' из ' + slick.slideCount);
    });
  });
  $('.features-markup').slick({
    autoplay: false,
    infinite: false,
    arrows: false,
    dots: true,
    variableWidth: true,
    mobileFirst: true,
    responsive: [{
      breakpoint: 991,
      settings: "unslick"
    }]
  });
  $('.rashguard__photoes').slick({
    autoplay: false,
    infinite: true,
    arrows: true,
    dots: true,
    centerMode: true,
    variableWidth: false,
    slidesToShow: 3,
    initialSlide: 1,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        initialSlide: 0,
        infinite: false,
        arrows: false
      }
    }, {
      breakpoint: 576,
      settings: {
        slidesToShow: 3,
        infinite: false,
        arrows: false,
        centerMode: true,
        initialSlide: 0
      }
    }, {
      breakpoint: 450,
      settings: {
        slidesToShow: 3,
        infinite: false,
        arrows: false,
        centerMode: true,
        initialSlide: 0,
        variableWidth: true
      }
    }]
  });
  $('.rashguard__features').slick({
    mobileFirst: true,
    variableWidth: true,
    autoplay: false,
    infinite: false,
    arrows: false,
    dots: false,
    adaptiveHeight: true,
    responsive: [{
      breakpoint: 320,
      settings: {
        slidesToShow: 1
      }
    }, {
      breakpoint: 451,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 768,
      settings: "unslick"
    }]
  }); // Анимация прицела rashguard при переключении слайдов

  $('.rashguard__photoes').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('.rashguard__aim').css({
      transform: "translate(-50%, -50%) scale(0.7)"
    });
  });
  $('.rashguard__photoes').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    if ($(window).width() > 451) {
      $('.rashguard__aim').css({
        transform: "translate(-50%, -50%) scale(1)"
      });
    } else {
      $('.rashguard__aim').css({
        transform: "translate(-50%, -50%) scale(1.5)"
      });
    }
  }); // Ширина точек rashguard слайдера

  $(function () {
    var slidesNumber = $('.rashguard__item').length;
    var slidesClonedNumber = $('.rashguard__item.slick-cloned').length;
    var dotsWidth = 100 / (slidesNumber - slidesClonedNumber);
    $('.rashguard__photoes .slick-dots li').width(dotsWidth + '%');
  });
  $('.review__cards').slick({
    autoplay: false,
    infinite: false,
    arrows: true,
    dots: false,
    centerMode: false,
    variableWidth: false,
    slidesToShow: 2,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: false,
        dots: true,
        slidesToShow: 1
      }
    }, {
      breakpoint: 450,
      settings: {
        arrows: false,
        centerMode: false,
        dots: true,
        slidesToShow: 1,
        adaptiveHeight: true
      }
    }]
  }); // Замена стандартного файлового инпута

  jcf.replaceAll();
  $(".mask-phone").mask("+7(999) 999-9999"); // Определение, откуда упала заявка на почту

  $('.popup-link[href="#request"]').click(function (event) {
    var recipient = $(this).data('whatever');
    var modal = $('#request');
    modal.find('#whatever').val(recipient);
  }); //E - mail Ajax Send

  $("form").submit(function () {
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: th.serialize()
    }).done(function () {
      setTimeout(function () {
        th.trigger("reset");
      }, 800);
      window.location = "/thanks.html";
    });
    return false;
  }); // Ограничение формата отправляемых файлов

  $('#myfile').change(function () {
    var ext = this.value.match(/\.([^\.]+)$/)[1];

    switch (ext) {
      case 'doc':
      case 'docx':
      case 'xls':
      case 'xlsx':
      case 'pdf':
      case 'zip':
      case 'rar':
      case '7z':
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'webp':
        break;

      default:
        alert('Разрешенный формат файла: doc, docx, xls, xlsx, pdf, zip, rar, 7z, jpg, jpeg, png, webp');
        this.value = '';
    }

    var $fileUpload = $("input[type='file']");

    if (parseInt($fileUpload.get(0).files.length) > 8) {
      alert("Можно отправить не больше 8 файлов, вы можете добавить архив");
      this.value = '';
    }
  }); //Отправка данных на сервер с помощью phpmailer

  $('#form').trigger('reset');
  $(function () {
    'use strict';

    $('#form').on('submit', function (e) {
      e.preventDefault();
      $.ajax({
        url: 'send.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: new FormData(this),
        success: function success(msg) {
          console.log(msg);

          if (msg == 'ok') {
            window.location = "/thanks.html";
            $('#form').trigger('reset'); // очистка формы
          } else {
            alert('Что-то пошло не так');
          }
        }
      });
    });
  }); // Удаление таблички у виджета инстаграмма

  setTimeout(function () {
    $('a[href$="=free-widget"]').css("display", "none");
  }, 1000);

  if ($('.shop__line-container').hasClass('active')) {
    setTimeout(function () {
      $('.shop__line-container.active .line').css({
        opacity: 1
      });
    }, 3000);
  }

  ; // Инициализация плагина увеличения картинок

  if ($(window).width() > 992) {
    $('.drift-demo-trigger').ezPlus({
      lensSize: 100,
      lenszoom: false
    });
  }

  ; // Кнопка вверх

  var btnUp = $('.up-btn');
  $(window).scroll(function () {
    var winScrollTop = $(this).scrollTop();

    if (winScrollTop > 600) {
      btnUp.addClass('show');
    } else {
      btnUp.removeClass('show');
    }
  });
  btnUp.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, '1000');
  });
});