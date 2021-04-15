

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

var useScroll = function () {
    var _a = react.useState({
        lastScrollTop: 0,
        bodyOffset: document.body.getBoundingClientRect(),
        scrollY: document.body.getBoundingClientRect()
            .top,
        scrollX: document.body.getBoundingClientRect()
            .left,
        scrollDirection: "",
    }), state = _a[0], setState = _a[1];
    var handleScrollEvent = react.useCallback(function (_) {
        setState(function (prevState) {
            var prevLastScrollTop = prevState.lastScrollTop;
            var bodyOffset = document.body.getBoundingClientRect();
            return {
                bodyOffset: bodyOffset,
                scrollY: -bodyOffset.top,
                scrollX: bodyOffset.left,
                scrollDirection: prevLastScrollTop > -bodyOffset.top
                    ? "down"
                    : "up",
                lastScrollTop: -bodyOffset.top,
            };
        });
    }, []);
    react.useEffect(function () {
        var scrollListener = function (e) {
            handleScrollEvent(e);
        };
        window.addEventListener("scroll", scrollListener);
        return function () {
            window.removeEventListener("scroll", scrollListener);
        };
    }, [handleScrollEvent]);
    return {
        scrollY: state.scrollY,
        scrollX: state.scrollX,
        scrollDirection: state.scrollDirection,
    };
};

exports.default = useScroll;
exports.useScroll = useScroll;
//# sourceMappingURL=useScroll.js.map
