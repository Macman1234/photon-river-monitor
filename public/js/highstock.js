/*
 Highstock JS v6.0.5 (2018-01-31)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(T, L) {
    "object" === typeof module && module.exports ? module.exports = T.document ? L(T) : L : T.Highcharts = L(T)
})("undefined" !== typeof window ? window : this, function(T) {
    var L = function() {
        var a = "undefined" === typeof T ? window : T,
            C = a.document,
            G = a.navigator && a.navigator.userAgent || "",
            E = C && C.createElementNS && !!C.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            r = /(edge|msie|trident)/i.test(G) && !a.opera,
            n = /Firefox/.test(G),
            h = n && 4 > parseInt(G.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highstock",
            version: "6.0.5",
            deg2rad: 2 * Math.PI / 360,
            doc: C,
            hasBidiBug: h,
            hasTouch: C && void 0 !== C.documentElement.ontouchstart,
            isMS: r,
            isWebKit: /AppleWebKit/.test(G),
            isFirefox: n,
            isChrome: -1 !== G.indexOf("Chrome"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(G),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: E,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {},
            charts: []
        }
    }();
    (function(a) {
        a.timers = [];
        var C = a.charts,
            G =
            a.doc,
            E = a.win;
        a.error = function(r, n) {
            r = a.isNumber(r) ? "Highcharts error #" + r + ": www.highcharts.com/errors/" + r : r;
            if (n) throw Error(r);
            E.console && console.log(r)
        };
        a.Fx = function(a, n, h) {
            this.options = n;
            this.elem = a;
            this.prop = h
        };
        a.Fx.prototype = {
            dSetter: function() {
                var a = this.paths[0],
                    n = this.paths[1],
                    h = [],
                    x = this.now,
                    q = a.length,
                    v;
                if (1 === x) h = this.toD;
                else if (q === n.length && 1 > x)
                    for (; q--;) v = parseFloat(a[q]), h[q] = isNaN(v) ? n[q] : x * parseFloat(n[q] - v) + v;
                else h = n;
                this.elem.attr("d", h, null, !0)
            },
            update: function() {
                var a = this.elem,
                    n = this.prop,
                    h = this.now,
                    x = this.options.step;
                if (this[n + "Setter"]) this[n + "Setter"]();
                else a.attr ? a.element && a.attr(n, h, null, !0) : a.style[n] = h + this.unit;
                x && x.call(a, h, this)
            },
            run: function(r, n, h) {
                var x = this,
                    q = x.options,
                    v = function(a) {
                        return v.stopped ? !1 : x.step(a)
                    },
                    y = E.requestAnimationFrame || function(a) {
                        setTimeout(a, 13)
                    },
                    g = function() {
                        for (var c = 0; c < a.timers.length; c++) a.timers[c]() || a.timers.splice(c--, 1);
                        a.timers.length && y(g)
                    };
                r === n ? (delete q.curAnim[this.prop], q.complete && 0 === a.keys(q.curAnim).length && q.complete.call(this.elem)) :
                    (this.startTime = +new Date, this.start = r, this.end = n, this.unit = h, this.now = this.start, this.pos = 0, v.elem = this.elem, v.prop = this.prop, v() && 1 === a.timers.push(v) && y(g))
            },
            step: function(r) {
                var n = +new Date,
                    h, x = this.options,
                    q = this.elem,
                    v = x.complete,
                    y = x.duration,
                    g = x.curAnim;
                q.attr && !q.element ? r = !1 : r || n >= y + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), h = g[this.prop] = !0, a.objectEach(g, function(a) {
                    !0 !== a && (h = !1)
                }), h && v && v.call(q), r = !1) : (this.pos = x.easing((n - this.startTime) / y), this.now = this.start + (this.end -
                    this.start) * this.pos, this.update(), r = !0);
                return r
            },
            initPath: function(r, n, h) {
                function x(a) {
                    var f, b;
                    for (t = a.length; t--;) f = "M" === a[t] || "L" === a[t], b = /[a-zA-Z]/.test(a[t + 3]), f && b && a.splice(t + 1, 0, a[t + 1], a[t + 2], a[t + 1], a[t + 2])
                }

                function q(a, c) {
                    for (; a.length < f;) {
                        a[0] = c[f - a.length];
                        var m = a.slice(0, b);
                        [].splice.apply(a, [0, 0].concat(m));
                        e && (m = a.slice(a.length - b), [].splice.apply(a, [a.length, 0].concat(m)), t--)
                    }
                    a[0] = "M"
                }

                function v(a, c) {
                    for (var m = (f - a.length) / b; 0 < m && m--;) p = a.slice().splice(a.length / B - b, b * B), p[0] =
                        c[f - b - m * b], l && (p[b - 6] = p[b - 2], p[b - 5] = p[b - 1]), [].splice.apply(a, [a.length / B, 0].concat(p)), e && m--
                }
                n = n || "";
                var y, g = r.startX,
                    c = r.endX,
                    l = -1 < n.indexOf("C"),
                    b = l ? 7 : 3,
                    f, p, t;
                n = n.split(" ");
                h = h.slice();
                var e = r.isArea,
                    B = e ? 2 : 1,
                    D;
                l && (x(n), x(h));
                if (g && c) {
                    for (t = 0; t < g.length; t++)
                        if (g[t] === c[0]) {
                            y = t;
                            break
                        } else if (g[0] === c[c.length - g.length + t]) {
                        y = t;
                        D = !0;
                        break
                    }
                    void 0 === y && (n = [])
                }
                n.length && a.isNumber(y) && (f = h.length + y * B * b, D ? (q(n, h), v(h, n)) : (q(h, n), v(n, h)));
                return [n, h]
            }
        };
        a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter =
            function() {
                this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
            };
        a.merge = function() {
            var r, n = arguments,
                h, x = {},
                q = function(h, r) {
                    "object" !== typeof h && (h = {});
                    a.objectEach(r, function(g, c) {
                        !a.isObject(g, !0) || a.isClass(g) || a.isDOMElement(g) ? h[c] = r[c] : h[c] = q(h[c] || {}, g)
                    });
                    return h
                };
            !0 === n[0] && (x = n[1], n = Array.prototype.slice.call(n, 2));
            h = n.length;
            for (r = 0; r < h; r++) x = q(x, n[r]);
            return x
        };
        a.pInt = function(a, n) {
            return parseInt(a, n || 10)
        };
        a.isString = function(a) {
            return "string" ===
                typeof a
        };
        a.isArray = function(a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function(r, n) {
            return !!r && "object" === typeof r && (!n || !a.isArray(r))
        };
        a.isDOMElement = function(r) {
            return a.isObject(r) && "number" === typeof r.nodeType
        };
        a.isClass = function(r) {
            var n = r && r.constructor;
            return !(!a.isObject(r, !0) || a.isDOMElement(r) || !n || !n.name || "Object" === n.name)
        };
        a.isNumber = function(a) {
            return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        };
        a.erase =
            function(a, n) {
                for (var h = a.length; h--;)
                    if (a[h] === n) {
                        a.splice(h, 1);
                        break
                    }
            };
        a.defined = function(a) {
            return void 0 !== a && null !== a
        };
        a.attr = function(r, n, h) {
            var x;
            a.isString(n) ? a.defined(h) ? r.setAttribute(n, h) : r && r.getAttribute && (x = r.getAttribute(n)) : a.defined(n) && a.isObject(n) && a.objectEach(n, function(a, h) {
                r.setAttribute(h, a)
            });
            return x
        };
        a.splat = function(r) {
            return a.isArray(r) ? r : [r]
        };
        a.syncTimeout = function(a, n, h) {
            if (n) return setTimeout(a, n, h);
            a.call(0, h)
        };
        a.extend = function(a, n) {
            var h;
            a || (a = {});
            for (h in n) a[h] =
                n[h];
            return a
        };
        a.pick = function() {
            var a = arguments,
                n, h, x = a.length;
            for (n = 0; n < x; n++)
                if (h = a[n], void 0 !== h && null !== h) return h
        };
        a.css = function(r, n) {
            a.isMS && !a.svg && n && void 0 !== n.opacity && (n.filter = "alpha(opacity\x3d" + 100 * n.opacity + ")");
            a.extend(r.style, n)
        };
        a.createElement = function(r, n, h, x, q) {
            r = G.createElement(r);
            var v = a.css;
            n && a.extend(r, n);
            q && v(r, {
                padding: 0,
                border: "none",
                margin: 0
            });
            h && v(r, h);
            x && x.appendChild(r);
            return r
        };
        a.extendClass = function(r, n) {
            var h = function() {};
            h.prototype = new r;
            a.extend(h.prototype,
                n);
            return h
        };
        a.pad = function(a, n, h) {
            return Array((n || 2) + 1 - String(a).length).join(h || 0) + a
        };
        a.relativeLength = function(a, n, h) {
            return /%$/.test(a) ? n * parseFloat(a) / 100 + (h || 0) : parseFloat(a)
        };
        a.wrap = function(a, n, h) {
            var x = a[n];
            a[n] = function() {
                var a = Array.prototype.slice.call(arguments),
                    v = arguments,
                    y = this;
                y.proceed = function() {
                    x.apply(y, arguments.length ? arguments : v)
                };
                a.unshift(x);
                a = h.apply(this, a);
                y.proceed = null;
                return a
            }
        };
        a.formatSingle = function(r, n, h) {
            var x = /\.([0-9])/,
                q = a.defaultOptions.lang;
            /f$/.test(r) ?
                (h = (h = r.match(x)) ? h[1] : -1, null !== n && (n = a.numberFormat(n, h, q.decimalPoint, -1 < r.indexOf(",") ? q.thousandsSep : ""))) : n = (h || a.time).dateFormat(r, n);
            return n
        };
        a.format = function(r, n, h) {
            for (var x = "{", q = !1, v, y, g, c, l = [], b; r;) {
                x = r.indexOf(x);
                if (-1 === x) break;
                v = r.slice(0, x);
                if (q) {
                    v = v.split(":");
                    y = v.shift().split(".");
                    c = y.length;
                    b = n;
                    for (g = 0; g < c; g++) b && (b = b[y[g]]);
                    v.length && (b = a.formatSingle(v.join(":"), b, h));
                    l.push(b)
                } else l.push(v);
                r = r.slice(x + 1);
                x = (q = !q) ? "}" : "{"
            }
            l.push(r);
            return l.join("")
        };
        a.getMagnitude = function(a) {
            return Math.pow(10,
                Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function(r, n, h, x, q) {
            var v, y = r;
            h = a.pick(h, 1);
            v = r / h;
            n || (n = q ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === x && (1 === h ? n = a.grep(n, function(a) {
                return 0 === a % 1
            }) : .1 >= h && (n = [1 / h])));
            for (x = 0; x < n.length && !(y = n[x], q && y * h >= r || !q && v <= (n[x] + (n[x + 1] || n[x])) / 2); x++);
            return y = a.correctFloat(y * h, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function(a, n) {
            var h = a.length,
                x, q;
            for (q = 0; q < h; q++) a[q].safeI = q;
            a.sort(function(a, q) {
                x = n(a, q);
                return 0 === x ?
                    a.safeI - q.safeI : x
            });
            for (q = 0; q < h; q++) delete a[q].safeI
        };
        a.arrayMin = function(a) {
            for (var n = a.length, h = a[0]; n--;) a[n] < h && (h = a[n]);
            return h
        };
        a.arrayMax = function(a) {
            for (var n = a.length, h = a[0]; n--;) a[n] > h && (h = a[n]);
            return h
        };
        a.destroyObjectProperties = function(r, n) {
            a.objectEach(r, function(a, x) {
                a && a !== n && a.destroy && a.destroy();
                delete r[x]
            })
        };
        a.discardElement = function(r) {
            var n = a.garbageBin;
            n || (n = a.createElement("div"));
            r && n.appendChild(r);
            n.innerHTML = ""
        };
        a.correctFloat = function(a, n) {
            return parseFloat(a.toPrecision(n ||
                14))
        };
        a.setAnimation = function(r, n) {
            n.renderer.globalAnimation = a.pick(r, n.options.chart.animation, !0)
        };
        a.animObject = function(r) {
            return a.isObject(r) ? a.merge(r) : {
                duration: r ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function(r, n, h, x) {
            r = +r || 0;
            n = +n;
            var q = a.defaultOptions.lang,
                v = (r.toString().split(".")[1] || "").split("e")[0].length,
                y, g, c = r.toString().split("e"); - 1 === n ? n = Math.min(v, 20) : a.isNumber(n) ? n && c[1] && 0 > c[1] &&
                (y = n + +c[1], 0 <= y ? (c[0] = (+c[0]).toExponential(y).split("e")[0], n = y) : (c[0] = c[0].split(".")[0] || 0, r = 20 > n ? (c[0] * Math.pow(10, c[1])).toFixed(n) : 0, c[1] = 0)) : n = 2;
            g = (Math.abs(c[1] ? c[0] : r) + Math.pow(10, -Math.max(n, v) - 1)).toFixed(n);
            v = String(a.pInt(g));
            y = 3 < v.length ? v.length % 3 : 0;
            h = a.pick(h, q.decimalPoint);
            x = a.pick(x, q.thousandsSep);
            r = (0 > r ? "-" : "") + (y ? v.substr(0, y) + x : "");
            r += v.substr(y).replace(/(\d{3})(?=\d)/g, "$1" + x);
            n && (r += h + g.slice(-n));
            c[1] && 0 !== +r && (r += "e" + c[1]);
            return r
        };
        Math.easeInOutSine = function(a) {
            return -.5 *
                (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function(r, n, h) {
            if ("width" === n) return Math.min(r.offsetWidth, r.scrollWidth) - a.getStyle(r, "padding-left") - a.getStyle(r, "padding-right");
            if ("height" === n) return Math.min(r.offsetHeight, r.scrollHeight) - a.getStyle(r, "padding-top") - a.getStyle(r, "padding-bottom");
            E.getComputedStyle || a.error(27, !0);
            if (r = E.getComputedStyle(r, void 0)) r = r.getPropertyValue(n), a.pick(h, "opacity" !== n) && (r = a.pInt(r));
            return r
        };
        a.inArray = function(r, n) {
            return (a.indexOfPolyfill || Array.prototype.indexOf).call(n,
                r)
        };
        a.grep = function(r, n) {
            return (a.filterPolyfill || Array.prototype.filter).call(r, n)
        };
        a.find = Array.prototype.find ? function(a, n) {
            return a.find(n)
        } : function(a, n) {
            var h, x = a.length;
            for (h = 0; h < x; h++)
                if (n(a[h], h)) return a[h]
        };
        a.map = function(a, n) {
            for (var h = [], x = 0, q = a.length; x < q; x++) h[x] = n.call(a[x], a[x], x, a);
            return h
        };
        a.keys = function(r) {
            return (a.keysPolyfill || Object.keys).call(void 0, r)
        };
        a.reduce = function(r, n, h) {
            return (a.reducePolyfill || Array.prototype.reduce).call(r, n, h)
        };
        a.offset = function(a) {
            var n = G.documentElement;
            a = a.parentElement ? a.getBoundingClientRect() : {
                top: 0,
                left: 0
            };
            return {
                top: a.top + (E.pageYOffset || n.scrollTop) - (n.clientTop || 0),
                left: a.left + (E.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
            }
        };
        a.stop = function(r, n) {
            for (var h = a.timers.length; h--;) a.timers[h].elem !== r || n && n !== a.timers[h].prop || (a.timers[h].stopped = !0)
        };
        a.each = function(r, n, h) {
            return (a.forEachPolyfill || Array.prototype.forEach).call(r, n, h)
        };
        a.objectEach = function(a, n, h) {
            for (var x in a) a.hasOwnProperty(x) && n.call(h, a[x], x, a)
        };
        a.addEvent = function(r,
            n, h) {
            var x, q, v = r.addEventListener || a.addEventListenerPolyfill;
            r.hcEvents && !Object.prototype.hasOwnProperty.call(r, "hcEvents") && (q = {}, a.objectEach(r.hcEvents, function(a, g) {
                q[g] = a.slice(0)
            }), r.hcEvents = q);
            x = r.hcEvents = r.hcEvents || {};
            v && v.call(r, n, h, !1);
            x[n] || (x[n] = []);
            x[n].push(h);
            return function() {
                a.removeEvent(r, n, h)
            }
        };
        a.removeEvent = function(r, n, h) {
            function x(c, g) {
                var b = r.removeEventListener || a.removeEventListenerPolyfill;
                b && b.call(r, c, g, !1)
            }

            function q() {
                var c, g;
                r.nodeName && (n ? (c = {}, c[n] = !0) : c = y,
                    a.objectEach(c, function(a, f) {
                        if (y[f])
                            for (g = y[f].length; g--;) x(f, y[f][g])
                    }))
            }
            var v, y = r.hcEvents,
                g;
            y && (n ? (v = y[n] || [], h ? (g = a.inArray(h, v), -1 < g && (v.splice(g, 1), y[n] = v), x(n, h)) : (q(), y[n] = [])) : (q(), r.hcEvents = {}))
        };
        a.fireEvent = function(r, n, h, x) {
            var q;
            q = r.hcEvents;
            var v, y;
            h = h || {};
            if (G.createEvent && (r.dispatchEvent || r.fireEvent)) q = G.createEvent("Events"), q.initEvent(n, !0, !0), a.extend(q, h), r.dispatchEvent ? r.dispatchEvent(q) : r.fireEvent(n, q);
            else if (q)
                for (q = q[n] || [], v = q.length, h.target || a.extend(h, {
                        preventDefault: function() {
                            h.defaultPrevented = !0
                        },
                        target: r,
                        type: n
                    }), n = 0; n < v; n++)(y = q[n]) && !1 === y.call(r, h) && h.preventDefault();
            x && !h.defaultPrevented && x(h)
        };
        a.animate = function(r, n, h) {
            var x, q = "",
                v, y, g;
            a.isObject(h) || (g = arguments, h = {
                duration: g[2],
                easing: g[3],
                complete: g[4]
            });
            a.isNumber(h.duration) || (h.duration = 400);
            h.easing = "function" === typeof h.easing ? h.easing : Math[h.easing] || Math.easeInOutSine;
            h.curAnim = a.merge(n);
            a.objectEach(n, function(c, g) {
                a.stop(r, g);
                y = new a.Fx(r, h, g);
                v = null;
                "d" === g ? (y.paths = y.initPath(r, r.d, n.d), y.toD = n.d, x = 0, v = 1) : r.attr ?
                    x = r.attr(g) : (x = parseFloat(a.getStyle(r, g)) || 0, "opacity" !== g && (q = "px"));
                v || (v = c);
                v && v.match && v.match("px") && (v = v.replace(/px/g, ""));
                y.run(x, v, q)
            })
        };
        a.seriesType = function(r, n, h, x, q) {
            var v = a.getOptions(),
                y = a.seriesTypes;
            v.plotOptions[r] = a.merge(v.plotOptions[n], h);
            y[r] = a.extendClass(y[n] || function() {}, x);
            y[r].prototype.type = r;
            q && (y[r].prototype.pointClass = a.extendClass(a.Point, q));
            return y[r]
        };
        a.uniqueKey = function() {
            var a = Math.random().toString(36).substring(2, 9),
                n = 0;
            return function() {
                return "highcharts-" +
                    a + "-" + n++
            }
        }();
        E.jQuery && (E.jQuery.fn.highcharts = function() {
            var r = [].slice.call(arguments);
            if (this[0]) return r[0] ? (new(a[a.isString(r[0]) ? r.shift() : "Chart"])(this[0], r[0], r[1]), this) : C[a.attr(this[0], "data-highcharts-chart")]
        })
    })(L);
    (function(a) {
        var C = a.each,
            G = a.isNumber,
            E = a.map,
            r = a.merge,
            n = a.pInt;
        a.Color = function(h) {
            if (!(this instanceof a.Color)) return new a.Color(h);
            this.init(h)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) {
                    return [n(a[1]), n(a[2]), n(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(a) {
                    return [n(a[1]), n(a[2]), n(a[3]), 1]
                }
            }],
            names: {
                none: "rgba(255,255,255,0)",
                white: "#ffffff",
                black: "#000000"
            },
            init: function(h) {
                var n, q, v, y;
                if ((this.input = h = this.names[h && h.toLowerCase ? h.toLowerCase() : ""] || h) && h.stops) this.stops = E(h.stops, function(g) {
                    return new a.Color(g[1])
                });
                else if (h && h.charAt && "#" === h.charAt() && (n = h.length, h = parseInt(h.substr(1),
                        16), 7 === n ? q = [(h & 16711680) >> 16, (h & 65280) >> 8, h & 255, 1] : 4 === n && (q = [(h & 3840) >> 4 | (h & 3840) >> 8, (h & 240) >> 4 | h & 240, (h & 15) << 4 | h & 15, 1])), !q)
                    for (v = this.parsers.length; v-- && !q;) y = this.parsers[v], (n = y.regex.exec(h)) && (q = y.parse(n));
                this.rgba = q || []
            },
            get: function(a) {
                var h = this.input,
                    q = this.rgba,
                    v;
                this.stops ? (v = r(h), v.stops = [].concat(v.stops), C(this.stops, function(q, g) {
                    v.stops[g] = [v.stops[g][0], q.get(a)]
                })) : v = q && G(q[0]) ? "rgb" === a || !a && 1 === q[3] ? "rgb(" + q[0] + "," + q[1] + "," + q[2] + ")" : "a" === a ? q[3] : "rgba(" + q.join(",") + ")" : h;
                return v
            },
            brighten: function(a) {
                var h, q = this.rgba;
                if (this.stops) C(this.stops, function(q) {
                    q.brighten(a)
                });
                else if (G(a) && 0 !== a)
                    for (h = 0; 3 > h; h++) q[h] += n(255 * a), 0 > q[h] && (q[h] = 0), 255 < q[h] && (q[h] = 255);
                return this
            },
            setOpacity: function(a) {
                this.rgba[3] = a;
                return this
            },
            tweenTo: function(a, n) {
                var q = this.rgba,
                    h = a.rgba;
                h.length && q && q.length ? (a = 1 !== h[3] || 1 !== q[3], n = (a ? "rgba(" : "rgb(") + Math.round(h[0] + (q[0] - h[0]) * (1 - n)) + "," + Math.round(h[1] + (q[1] - h[1]) * (1 - n)) + "," + Math.round(h[2] + (q[2] - h[2]) * (1 - n)) + (a ? "," + (h[3] + (q[3] -
                    h[3]) * (1 - n)) : "") + ")") : n = a.input || "none";
                return n
            }
        };
        a.color = function(h) {
            return new a.Color(h)
        }
    })(L);
    (function(a) {
        var C, G, E = a.addEvent,
            r = a.animate,
            n = a.attr,
            h = a.charts,
            x = a.color,
            q = a.css,
            v = a.createElement,
            y = a.defined,
            g = a.deg2rad,
            c = a.destroyObjectProperties,
            l = a.doc,
            b = a.each,
            f = a.extend,
            p = a.erase,
            t = a.grep,
            e = a.hasTouch,
            B = a.inArray,
            D = a.isArray,
            m = a.isFirefox,
            A = a.isMS,
            u = a.isObject,
            H = a.isString,
            I = a.isWebKit,
            K = a.merge,
            d = a.noop,
            w = a.objectEach,
            F = a.pick,
            k = a.pInt,
            z = a.removeEvent,
            O = a.stop,
            N = a.svg,
            M = a.SVG_NS,
            P = a.symbolSizes,
            Q = a.win;
        C = a.SVGElement = function() {
            return this
        };
        f(C.prototype, {
            opacity: 1,
            SVG_NS: M,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
            init: function(a, k) {
                this.element = "span" === k ? v(k) : l.createElementNS(this.SVG_NS, k);
                this.renderer = a
            },
            animate: function(k, d, z) {
                d = a.animObject(F(d, this.renderer.globalAnimation, !0));
                0 !== d.duration ? (z && (d.complete = z), r(this, k, d)) : (this.attr(k, null, z), d.step && d.step.call(this));
                return this
            },
            colorGradient: function(k, d, z) {
                var J = this.renderer,
                    f, e, c, m, p, g, t, A, B, u, F = [],
                    M;
                k.radialGradient ? e = "radialGradient" : k.linearGradient && (e = "linearGradient");
                e && (c = k[e], p = J.gradients, t = k.stops, u = z.radialReference, D(c) && (k[e] = c = {
                        x1: c[0],
                        y1: c[1],
                        x2: c[2],
                        y2: c[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === e && u && !y(c.gradientUnits) && (m = c, c = K(c, J.getRadialAttr(u, m), {
                        gradientUnits: "userSpaceOnUse"
                    })), w(c, function(a, k) {
                        "id" !== k && F.push(k, a)
                    }), w(t, function(a) {
                        F.push(a)
                    }), F = F.join(","), p[F] ? u = p[F].attr("id") :
                    (c.id = u = a.uniqueKey(), p[F] = g = J.createElement(e).attr(c).add(J.defs), g.radAttr = m, g.stops = [], b(t, function(k) {
                        0 === k[1].indexOf("rgba") ? (f = a.color(k[1]), A = f.get("rgb"), B = f.get("a")) : (A = k[1], B = 1);
                        k = J.createElement("stop").attr({
                            offset: k[0],
                            "stop-color": A,
                            "stop-opacity": B
                        }).add(g);
                        g.stops.push(k)
                    })), M = "url(" + J.url + "#" + u + ")", z.setAttribute(d, M), z.gradient = F, k.toString = function() {
                        return M
                    })
            },
            applyTextOutline: function(k) {
                var J = this.element,
                    d, z, f, e, c; - 1 !== k.indexOf("contrast") && (k = k.replace(/contrast/g, this.renderer.getContrast(J.style.fill)));
                k = k.split(" ");
                z = k[k.length - 1];
                if ((f = k[0]) && "none" !== f && a.svg) {
                    this.fakeTS = !0;
                    k = [].slice.call(J.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    f = f.replace(/(^[\d\.]+)(.*?)$/g, function(a, k, J) {
                        return 2 * k + J
                    });
                    for (c = k.length; c--;) d = k[c], "highcharts-text-outline" === d.getAttribute("class") && p(k, J.removeChild(d));
                    e = J.firstChild;
                    b(k, function(a, k) {
                        0 === k && (a.setAttribute("x", J.getAttribute("x")), k = J.getAttribute("y"), a.setAttribute("y", k || 0), null === k && J.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        n(a, {
                            "class": "highcharts-text-outline",
                            fill: z,
                            stroke: z,
                            "stroke-width": f,
                            "stroke-linejoin": "round"
                        });
                        J.insertBefore(a, e)
                    })
                }
            },
            attr: function(a, k, d, z) {
                var J, f = this.element,
                    b, e = this,
                    c, m;
                "string" === typeof a && void 0 !== k && (J = a, a = {}, a[J] = k);
                "string" === typeof a ? e = (this[a + "Getter"] || this._defaultGetter).call(this, a, f) : (w(a, function(k, J) {
                    c = !1;
                    z || O(this, J);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(J) && (b || (this.symbolAttr(a), b = !0), c = !0);
                    !this.rotation || "x" !== J && "y" !== J || (this.doTransform = !0);
                    c || (m = this[J + "Setter"] ||
                        this._defaultSetter, m.call(this, k, J, f), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(J) && this.updateShadows(J, k, m))
                }, this), this.afterSetters());
                d && d.call(this);
                return e
            },
            afterSetters: function() {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function(a, k, d) {
                for (var J = this.shadows, z = J.length; z--;) d.call(J[z], "height" === a ? Math.max(k - (J[z].cutHeight || 0), 0) : "d" === a ? this.d : k, a, J[z])
            },
            addClass: function(a, k) {
                var J = this.attr("class") || ""; - 1 === J.indexOf(a) &&
                    (k || (a = (J + (J ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function(a) {
                return -1 !== B(a, (this.attr("class") || "").split(" "))
            },
            removeClass: function(a) {
                return this.attr("class", (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function(a) {
                var k = this;
                b("x y r start end width height innerR anchorX anchorY".split(" "), function(J) {
                    k[J] = F(a[J], k[J])
                });
                k.attr({
                    d: k.renderer.symbols[k.symbolName](k.x, k.y, k.width, k.height, k)
                })
            },
            clip: function(a) {
                return this.attr("clip-path", a ? "url(" +
                    this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function(a, k) {
                var d;
                k = k || a.strokeWidth || 0;
                d = Math.round(k) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + d;
                a.y = Math.floor(a.y || this.y || 0) + d;
                a.width = Math.floor((a.width || this.width || 0) - 2 * d);
                a.height = Math.floor((a.height || this.height || 0) - 2 * d);
                y(a.strokeWidth) && (a.strokeWidth = k);
                return a
            },
            css: function(a) {
                var d = this.styles,
                    z = {},
                    J = this.element,
                    b, e = "",
                    c, m = !d,
                    g = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                d && w(a, function(a, k) {
                    a !== d[k] && (z[k] = a, m = !0)
                });
                m && (d && (a = f(d, z)), b = this.textWidth = a && a.width && "auto" !== a.width && "text" === J.nodeName.toLowerCase() && k(a.width), this.styles = a, b && !N && this.renderer.forExport && delete a.width, J.namespaceURI === this.SVG_NS ? (c = function(a, k) {
                    return "-" + k.toLowerCase()
                }, w(a, function(a, k) {
                    -1 === B(k, g) && (e += k.replace(/([A-Z])/g, c) + ":" + a + ";")
                }), e && n(J, "style", e)) : q(J, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            strokeWidth: function() {
                return this["stroke-width"] ||
                    0
            },
            on: function(a, k) {
                var d = this,
                    z = d.element;
                e && "click" === a ? (z.ontouchstart = function(a) {
                    d.touchEventFired = Date.now();
                    a.preventDefault();
                    k.call(z, a)
                }, z.onclick = function(a) {
                    (-1 === Q.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (d.touchEventFired || 0)) && k.call(z, a)
                }) : z["on" + a] = k;
                return this
            },
            setRadialReference: function(a) {
                var k = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                k && k.radAttr && k.animate(this.renderer.getRadialAttr(a, k.radAttr));
                return this
            },
            translate: function(a,
                k) {
                return this.attr({
                    translateX: a,
                    translateY: k
                })
            },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function() {
                var a = this.translateX || 0,
                    k = this.translateY || 0,
                    d = this.scaleX,
                    z = this.scaleY,
                    f = this.inverted,
                    b = this.rotation,
                    e = this.matrix,
                    c = this.element;
                f && (a += this.width, k += this.height);
                a = ["translate(" + a + "," + k + ")"];
                y(e) && a.push("matrix(" + e.join(",") + ")");
                f ? a.push("rotate(90) scale(-1,1)") : b && a.push("rotate(" + b + " " + F(this.rotationOriginX, c.getAttribute("x"), 0) + " " + F(this.rotationOriginY,
                    c.getAttribute("y") || 0) + ")");
                (y(d) || y(z)) && a.push("scale(" + F(d, 1) + " " + F(z, 1) + ")");
                a.length && c.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function(a, k, d) {
                var z, f, b, J, e = {};
                f = this.renderer;
                b = f.alignedObjects;
                var c, m;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = k, !d || H(d)) this.alignTo = z = d || "renderer", p(b, this), b.push(this), d = null
                } else a = this.alignOptions, k = this.alignByTranslate, z = this.alignTo;
                d = F(d, f[z], f);
                z = a.align;
                f = a.verticalAlign;
                b = (d.x || 0) + (a.x || 0);
                J = (d.y || 0) + (a.y || 0);
                "right" === z ? c = 1 : "center" === z && (c = 2);
                c && (b += (d.width - (a.width || 0)) / c);
                e[k ? "translateX" : "x"] = Math.round(b);
                "bottom" === f ? m = 1 : "middle" === f && (m = 2);
                m && (J += (d.height - (a.height || 0)) / m);
                e[k ? "translateY" : "y"] = Math.round(J);
                this[this.placed ? "animate" : "attr"](e);
                this.placed = !0;
                this.alignAttr = e;
                return this
            },
            getBBox: function(a, k) {
                var d, z = this.renderer,
                    e, J = this.element,
                    c = this.styles,
                    m, w = this.textStr,
                    p, t = z.cache,
                    A = z.cacheKeys,
                    B;
                k = F(k, this.rotation);
                e = k * g;
                m = c && c.fontSize;
                y(w) && (B = w.toString(), -1 === B.indexOf("\x3c") && (B = B.replace(/[0-9]/g, "0")), B += ["", k || 0, m, c && c.width, c && c.textOverflow].join());
                B && !a && (d = t[B]);
                if (!d) {
                    if (J.namespaceURI === this.SVG_NS || z.forExport) {
                        try {
                            (p = this.fakeTS && function(a) {
                                b(J.querySelectorAll(".highcharts-text-outline"), function(k) {
                                    k.style.display = a
                                })
                            }) && p("none"), d = J.getBBox ? f({}, J.getBBox()) : {
                                width: J.offsetWidth,
                                height: J.offsetHeight
                            }, p && p("")
                        } catch (fa) {}
                        if (!d || 0 > d.width) d = {
                            width: 0,
                            height: 0
                        }
                    } else d = this.htmlGetBBox();
                    z.isSVG &&
                        (a = d.width, z = d.height, c && "11px" === c.fontSize && 17 === Math.round(z) && (d.height = z = 14), k && (d.width = Math.abs(z * Math.sin(e)) + Math.abs(a * Math.cos(e)), d.height = Math.abs(z * Math.cos(e)) + Math.abs(a * Math.sin(e))));
                    if (B && 0 < d.height) {
                        for (; 250 < A.length;) delete t[A.shift()];
                        t[B] || A.push(B);
                        t[B] = d
                    }
                }
                return d
            },
            show: function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function(a) {
                var k = this;
                k.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function() {
                        k.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(a) {
                var k = this.renderer,
                    d = this.element,
                    z;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && k.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) z = this.zIndexSetter();
                z || (a ? a.element : k.box).appendChild(d);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function(a) {
                var k = a.parentNode;
                k && k.removeChild(a)
            },
            destroy: function() {
                var a = this,
                    k = a.element || {},
                    d = a.renderer.isSVG && "SPAN" === k.nodeName && a.parentGroup,
                    z = k.ownerSVGElement,
                    f = a.clipPath;
                k.onclick =
                    k.onmouseout = k.onmouseover = k.onmousemove = k.point = null;
                O(a);
                f && z && (b(z.querySelectorAll("[clip-path],[CLIP-PATH]"), function(a) {
                    var k = a.getAttribute("clip-path"),
                        d = f.element.id;
                    (-1 < k.indexOf("(#" + d + ")") || -1 < k.indexOf('("#' + d + '")')) && a.removeAttribute("clip-path")
                }), a.clipPath = f.destroy());
                if (a.stops) {
                    for (z = 0; z < a.stops.length; z++) a.stops[z] = a.stops[z].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(k);
                for (a.destroyShadows(); d && d.div && 0 === d.div.childNodes.length;) k = d.parentGroup, a.safeRemoveChild(d.div), delete d.div,
                    d = k;
                a.alignTo && p(a.renderer.alignedObjects, a);
                w(a, function(k, d) {
                    delete a[d]
                });
                return null
            },
            shadow: function(a, k, d) {
                var z = [],
                    f, b, e = this.element,
                    c, J, m, p;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    J = F(a.width, 3);
                    m = (a.opacity || .15) / J;
                    p = this.parentInverted ? "(-1,-1)" : "(" + F(a.offsetX, 1) + ", " + F(a.offsetY, 1) + ")";
                    for (f = 1; f <= J; f++) b = e.cloneNode(0), c = 2 * J + 1 - 2 * f, n(b, {
                        isShadow: "true",
                        stroke: a.color || "#000000",
                        "stroke-opacity": m * f,
                        "stroke-width": c,
                        transform: "translate" + p,
                        fill: "none"
                    }), d && (n(b, "height", Math.max(n(b,
                        "height") - c, 0)), b.cutHeight = c), k ? k.element.appendChild(b) : e.parentNode && e.parentNode.insertBefore(b, e), z.push(b);
                    this.shadows = z
                }
                return this
            },
            destroyShadows: function() {
                b(this.shadows || [], function(a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function(a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function(a) {
                a = F(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a =
                    parseFloat(a));
                return a
            },
            dSetter: function(a, k, d) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[k] !== a && (d.setAttribute(k, a), this[k] = a)
            },
            dashstyleSetter: function(a) {
                var d, z = this["stroke-width"];
                "inherit" === z && (z = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (d =
                        a.length; d--;) a[d] = k(a[d]) * z;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function(a) {
                this.alignValue = a;
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[a])
            },
            opacitySetter: function(a, k, d) {
                this[k] = a;
                d.setAttribute(k, a)
            },
            titleSetter: function(a) {
                var k = this.element.getElementsByTagName("title")[0];
                k || (k = l.createElementNS(this.SVG_NS, "title"), this.element.appendChild(k));
                k.firstChild && k.removeChild(k.firstChild);
                k.appendChild(l.createTextNode(String(F(a),
                    "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            textSetter: function(a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function(a, k, d) {
                "string" === typeof a ? d.setAttribute(k, a) : a && this.colorGradient(a, k, d)
            },
            visibilitySetter: function(a, k, d) {
                "inherit" === a ? d.removeAttribute(k) : this[k] !== a && d.setAttribute(k, a);
                this[k] = a
            },
            zIndexSetter: function(a, d) {
                var z = this.renderer,
                    f = this.parentGroup,
                    b = (f || z).element || z.box,
                    e, c = this.element,
                    m, p, z = b === z.box;
                e = this.added;
                var w;
                y(a) && (c.zIndex = a, a = +a, this[d] === a && (e = !1), this[d] = a);
                if (e) {
                    (a = this.zIndex) && f && (f.handleZ = !0);
                    d = b.childNodes;
                    for (w = d.length - 1; 0 <= w && !m; w--)
                        if (f = d[w], e = f.zIndex, p = !y(e), f !== c)
                            if (0 > a && p && !z && !w) b.insertBefore(c, d[w]), m = !0;
                            else if (k(e) <= a || p && (!y(a) || 0 <= a)) b.insertBefore(c, d[w + 1] || null), m = !0;
                    m || (b.insertBefore(c, d[z ? 3 : 0] || null), m = !0)
                }
                return m
            },
            _defaultSetter: function(a, k, d) {
                d.setAttribute(k, a)
            }
        });
        C.prototype.yGetter = C.prototype.xGetter;
        C.prototype.translateXSetter =
            C.prototype.translateYSetter = C.prototype.rotationSetter = C.prototype.verticalAlignSetter = C.prototype.rotationOriginXSetter = C.prototype.rotationOriginYSetter = C.prototype.scaleXSetter = C.prototype.scaleYSetter = C.prototype.matrixSetter = function(a, k) {
                this[k] = a;
                this.doTransform = !0
            };
        C.prototype["stroke-widthSetter"] = C.prototype.strokeSetter = function(a, k, d) {
            this[k] = a;
            this.stroke && this["stroke-width"] ? (C.prototype.fillSetter.call(this, this.stroke, "stroke", d), d.setAttribute("stroke-width", this["stroke-width"]),
                this.hasStroke = !0) : "stroke-width" === k && 0 === a && this.hasStroke && (d.removeAttribute("stroke"), this.hasStroke = !1)
        };
        G = a.SVGRenderer = function() {
            this.init.apply(this, arguments)
        };
        f(G.prototype, {
            Element: C,
            SVG_NS: M,
            init: function(a, k, d, z, f, b) {
                var e;
                z = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(z));
                e = z.element;
                a.appendChild(e);
                n(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && n(e, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = e;
                this.boxWrapper = z;
                this.alignedObjects = [];
                this.url = (m || I) && l.getElementsByTagName("base").length ? Q.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(l.createTextNode("Created with Highstock 6.0.5"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = b;
                this.forExport = f;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(k, d, !1);
                var c;
                m && a.getBoundingClientRect && (k = function() {
                    q(a, {
                        left: 0,
                        top: 0
                    });
                    c = a.getBoundingClientRect();
                    q(a, {
                        left: Math.ceil(c.left) - c.left + "px",
                        top: Math.ceil(c.top) - c.top + "px"
                    })
                }, k(), this.unSubPixelFix = E(Q, "resize", k))
            },
            getStyle: function(a) {
                return this.style = f({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function(a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                c(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function(a) {
                var k = new this.Element;
                k.init(this, a);
                return k
            },
            draw: d,
            getRadialAttr: function(a, k) {
                return {
                    cx: a[0] - a[2] / 2 + k.cx * a[2],
                    cy: a[1] - a[2] / 2 + k.cy * a[2],
                    r: k.r * a[2]
                }
            },
            getSpanWidth: function(a) {
                return a.getBBox(!0).width
            },
            applyEllipsis: function(a, k, d, z) {
                var f = a.rotation,
                    b = d,
                    e, c = 0,
                    m = d.length,
                    p = function(a) {
                        k.removeChild(k.firstChild);
                        a && k.appendChild(l.createTextNode(a))
                    },
                    w;
                a.rotation = 0;
                b = this.getSpanWidth(a, k);
                if (w = b > z) {
                    for (; c <= m;) e = Math.ceil((c + m) / 2), b = d.substring(0, e) + "\u2026", p(b), b = this.getSpanWidth(a, k), c === m ? c = m + 1 : b > z ? m = e - 1 : c = e;
                    0 === m && p("")
                }
                a.rotation = f;
                return w
            },
            escapes: {
                "\x26": "\x26amp;",
                "\x3c": "\x26lt;",
                "\x3e": "\x26gt;",
                "'": "\x26#39;",
                '"': "\x26quot;"
            },
            buildText: function(a) {
                var d = a.element,
                    z = this,
                    f = z.forExport,
                    e = F(a.textStr, "").toString(),
                    c = -1 !== e.indexOf("\x3c"),
                    m = d.childNodes,
                    p, g, A, u, I = n(d, "x"),
                    J = a.styles,
                    D = a.textWidth,
                    K = J && J.lineHeight,
                    O = J && J.textOutline,
                    H = J && "ellipsis" === J.textOverflow,
                    P = J && "nowrap" === J.whiteSpace,
                    h = J && J.fontSize,
                    v, y, Q = m.length,
                    J = D && !a.added && this.box,
                    x = function(a) {
                        var f;
                        f = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : h || z.style.fontSize || 12;
                        return K ? k(K) : z.fontMetrics(f, a.getAttribute("style") ? a : d).h
                    },
                    r = function(a, k) {
                        w(z.escapes, function(d, z) {
                            k && -1 !== B(d, k) || (a = a.toString().replace(new RegExp(d, "g"), z))
                        });
                        return a
                    };
                v = [e, H, P, K, O, h, D].join();
                if (v !== a.textCache) {
                    for (a.textCache = v; Q--;) d.removeChild(m[Q]);
                    c || O || H || D || -1 !== e.indexOf(" ") ?
                        (p = /<.*class="([^"]+)".*>/, g = /<.*style="([^"]+)".*>/, A = /<.*href="([^"]+)".*>/, J && J.appendChild(d), e = c ? e.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [e], e = t(e, function(a) {
                            return "" !== a
                        }), b(e, function(k, e) {
                            var c, m = 0;
                            k = k.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                            c = k.split("|||");
                            b(c, function(k) {
                                if ("" !== k || 1 === c.length) {
                                    var b = {},
                                        w = l.createElementNS(z.SVG_NS, "tspan"),
                                        t, B;
                                    p.test(k) && (t = k.match(p)[1], n(w, "class", t));
                                    g.test(k) && (B = k.match(g)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), n(w, "style", B));
                                    A.test(k) && !f && (n(w, "onclick", 'location.href\x3d"' + k.match(A)[1] + '"'), n(w, "class", "highcharts-anchor"), q(w, {
                                        cursor: "pointer"
                                    }));
                                    k = r(k.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                    if (" " !== k) {
                                        w.appendChild(l.createTextNode(k));
                                        m ? b.dx = 0 : e && null !== I && (b.x = I);
                                        n(w, b);
                                        d.appendChild(w);
                                        !m &&
                                            y && (!N && f && q(w, {
                                                display: "block"
                                            }), n(w, "dy", x(w)));
                                        if (D) {
                                            b = k.replace(/([^\^])-/g, "$1- ").split(" ");
                                            t = 1 < c.length || e || 1 < b.length && !P;
                                            var F = [],
                                                J, K = x(w),
                                                O = a.rotation;
                                            for (H && (u = z.applyEllipsis(a, w, k, D)); !H && t && (b.length || F.length);) a.rotation = 0, J = z.getSpanWidth(a, w), k = J > D, void 0 === u && (u = k), k && 1 !== b.length ? (w.removeChild(w.firstChild), F.unshift(b.pop())) : (b = F, F = [], b.length && !P && (w = l.createElementNS(M, "tspan"), n(w, {
                                                dy: K,
                                                x: I
                                            }), B && n(w, "style", B), d.appendChild(w)), J > D && (D = J)), b.length && w.appendChild(l.createTextNode(b.join(" ").replace(/- /g,
                                                "-")));
                                            a.rotation = O
                                        }
                                        m++
                                    }
                                }
                            });
                            y = y || d.childNodes.length
                        }), u && a.attr("title", r(a.textStr, ["\x26lt;", "\x26gt;"])), J && J.removeChild(d), O && a.applyTextOutline && a.applyTextOutline(O)) : d.appendChild(l.createTextNode(r(e)))
                }
            },
            getContrast: function(a) {
                a = x(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function(a, k, d, z, b, e, c, m, w) {
                var p = this.label(a, k, d, w, null, null, null, null, "button"),
                    g = 0;
                p.attr(K({
                    padding: 8,
                    r: 2
                }, b));
                var t, B, u, F;
                b = K({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, b);
                t = b.style;
                delete b.style;
                e = K(b, {
                    fill: "#e6e6e6"
                }, e);
                B = e.style;
                delete e.style;
                c = K(b, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, c);
                u = c.style;
                delete c.style;
                m = K(b, {
                    style: {
                        color: "#cccccc"
                    }
                }, m);
                F = m.style;
                delete m.style;
                E(p.element, A ? "mouseover" : "mouseenter", function() {
                    3 !== g && p.setState(1)
                });
                E(p.element, A ? "mouseout" : "mouseleave", function() {
                    3 !== g && p.setState(g)
                });
                p.setState = function(a) {
                    1 !== a && (p.state = g = a);
                    p.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    p.attr([b, e, c, m][a || 0]).css([t, B, u, F][a || 0])
                };
                p.attr(b).css(f({
                    cursor: "default"
                }, t));
                return p.on("click", function(a) {
                    3 !== g && z.call(p, a)
                })
            },
            crispLine: function(a, k) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - k % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + k % 2 / 2);
                return a
            },
            path: function(a) {
                var k = {
                    fill: "none"
                };
                D(a) ? k.d = a : u(a) && f(k, a);
                return this.createElement("path").attr(k)
            },
            circle: function(a, k, d) {
                a = u(a) ? a : {
                    x: a,
                    y: k,
                    r: d
                };
                k = this.createElement("circle");
                k.xSetter =
                    k.ySetter = function(a, k, d) {
                        d.setAttribute("c" + k, a)
                    };
                return k.attr(a)
            },
            arc: function(a, k, d, z, b, f) {
                u(a) ? (z = a, k = z.y, d = z.r, a = z.x) : z = {
                    innerR: z,
                    start: b,
                    end: f
                };
                a = this.symbol("arc", a, k, d, d, z);
                a.r = d;
                return a
            },
            rect: function(a, k, d, z, b, f) {
                b = u(a) ? a.r : b;
                var e = this.createElement("rect");
                a = u(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: k,
                    width: Math.max(d, 0),
                    height: Math.max(z, 0)
                };
                void 0 !== f && (a.strokeWidth = f, a = e.crisp(a));
                a.fill = "none";
                b && (a.r = b);
                e.rSetter = function(a, k, d) {
                    n(d, {
                        rx: a,
                        ry: a
                    })
                };
                return e.attr(a)
            },
            setSize: function(a, k, d) {
                var z =
                    this.alignedObjects,
                    b = z.length;
                this.width = a;
                this.height = k;
                for (this.boxWrapper.animate({
                        width: a,
                        height: k
                    }, {
                        step: function() {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: F(d, !0) ? void 0 : 0
                    }); b--;) z[b].align()
            },
            g: function(a) {
                var k = this.createElement("g");
                return a ? k.attr({
                    "class": "highcharts-" + a
                }) : k
            },
            image: function(a, k, d, z, b) {
                var e = {
                    preserveAspectRatio: "none"
                };
                1 < arguments.length && f(e, {
                    x: k,
                    y: d,
                    width: z,
                    height: b
                });
                e = this.createElement("image").attr(e);
                e.element.setAttributeNS ?
                    e.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : e.element.setAttribute("hc-svg-href", a);
                return e
            },
            symbol: function(a, k, d, z, e, c) {
                var m = this,
                    w, p = /^url\((.*?)\)$/,
                    g = p.test(a),
                    t = !g && (this.symbols[a] ? a : "circle"),
                    B = t && this.symbols[t],
                    A = y(k) && B && B.call(this.symbols, Math.round(k), Math.round(d), z, e, c),
                    u, M;
                B ? (w = this.path(A), w.attr("fill", "none"), f(w, {
                    symbolName: t,
                    x: k,
                    y: d,
                    width: z,
                    height: e
                }), c && f(w, c)) : g && (u = a.match(p)[1], w = this.image(u), w.imgwidth = F(P[u] && P[u].width, c && c.width), w.imgheight =
                    F(P[u] && P[u].height, c && c.height), M = function() {
                        w.attr({
                            width: w.width,
                            height: w.height
                        })
                    }, b(["width", "height"], function(a) {
                        w[a + "Setter"] = function(a, k) {
                            var d = {},
                                z = this["img" + k],
                                b = "width" === k ? "translateX" : "translateY";
                            this[k] = a;
                            y(z) && (this.element && this.element.setAttribute(k, z), this.alignByTranslate || (d[b] = ((this[k] || 0) - z) / 2, this.attr(d)))
                        }
                    }), y(k) && w.attr({
                        x: k,
                        y: d
                    }), w.isImg = !0, y(w.imgwidth) && y(w.imgheight) ? M() : (w.attr({
                        width: 0,
                        height: 0
                    }), v("img", {
                        onload: function() {
                            var a = h[m.chartIndex];
                            0 === this.width &&
                                (q(this, {
                                    position: "absolute",
                                    top: "-999em"
                                }), l.body.appendChild(this));
                            P[u] = {
                                width: this.width,
                                height: this.height
                            };
                            w.imgwidth = this.width;
                            w.imgheight = this.height;
                            w.element && M();
                            this.parentNode && this.parentNode.removeChild(this);
                            m.imgCount--;
                            if (!m.imgCount && a && a.onload) a.onload()
                        },
                        src: u
                    }), this.imgCount++));
                return w
            },
            symbols: {
                circle: function(a, k, d, z) {
                    return this.arc(a + d / 2, k + z / 2, d / 2, z / 2, {
                        start: 0,
                        end: 2 * Math.PI,
                        open: !1
                    })
                },
                square: function(a, k, d, z) {
                    return ["M", a, k, "L", a + d, k, a + d, k + z, a, k + z, "Z"]
                },
                triangle: function(a,
                    k, d, z) {
                    return ["M", a + d / 2, k, "L", a + d, k + z, a, k + z, "Z"]
                },
                "triangle-down": function(a, k, d, z) {
                    return ["M", a, k, "L", a + d, k, a + d / 2, k + z, "Z"]
                },
                diamond: function(a, k, d, z) {
                    return ["M", a + d / 2, k, "L", a + d, k + z / 2, a + d / 2, k + z, a, k + z / 2, "Z"]
                },
                arc: function(a, k, d, z, b) {
                    var e = b.start,
                        f = b.r || d,
                        c = b.r || z || d,
                        w = b.end - .001;
                    d = b.innerR;
                    z = F(b.open, .001 > Math.abs(b.end - b.start - 2 * Math.PI));
                    var m = Math.cos(e),
                        p = Math.sin(e),
                        g = Math.cos(w),
                        w = Math.sin(w);
                    b = .001 > b.end - e - Math.PI ? 0 : 1;
                    f = ["M", a + f * m, k + c * p, "A", f, c, 0, b, 1, a + f * g, k + c * w];
                    y(d) && f.push(z ? "M" : "L", a + d *
                        g, k + d * w, "A", d, d, 0, b, 0, a + d * m, k + d * p);
                    f.push(z ? "" : "Z");
                    return f
                },
                callout: function(a, k, d, z, b) {
                    var e = Math.min(b && b.r || 0, d, z),
                        f = e + 6,
                        c = b && b.anchorX;
                    b = b && b.anchorY;
                    var w;
                    w = ["M", a + e, k, "L", a + d - e, k, "C", a + d, k, a + d, k, a + d, k + e, "L", a + d, k + z - e, "C", a + d, k + z, a + d, k + z, a + d - e, k + z, "L", a + e, k + z, "C", a, k + z, a, k + z, a, k + z - e, "L", a, k + e, "C", a, k, a, k, a + e, k];
                    c && c > d ? b > k + f && b < k + z - f ? w.splice(13, 3, "L", a + d, b - 6, a + d + 6, b, a + d, b + 6, a + d, k + z - e) : w.splice(13, 3, "L", a + d, z / 2, c, b, a + d, z / 2, a + d, k + z - e) : c && 0 > c ? b > k + f && b < k + z - f ? w.splice(33, 3, "L", a, b + 6, a - 6, b, a, b - 6,
                        a, k + e) : w.splice(33, 3, "L", a, z / 2, c, b, a, z / 2, a, k + e) : b && b > z && c > a + f && c < a + d - f ? w.splice(23, 3, "L", c + 6, k + z, c, k + z + 6, c - 6, k + z, a + e, k + z) : b && 0 > b && c > a + f && c < a + d - f && w.splice(3, 3, "L", c - 6, k, c, k - 6, c + 6, k, d - e, k);
                    return w
                }
            },
            clipRect: function(k, d, z, b) {
                var e = a.uniqueKey(),
                    f = this.createElement("clipPath").attr({
                        id: e
                    }).add(this.defs);
                k = this.rect(k, d, z, b, 0).add(f);
                k.id = e;
                k.clipPath = f;
                k.count = 0;
                return k
            },
            text: function(a, k, d, z) {
                var b = {};
                if (z && (this.allowHTML || !this.forExport)) return this.html(a, k, d);
                b.x = Math.round(k || 0);
                d && (b.y =
                    Math.round(d));
                if (a || 0 === a) b.text = a;
                a = this.createElement("text").attr(b);
                z || (a.xSetter = function(a, k, d) {
                    var z = d.getElementsByTagName("tspan"),
                        b, e = d.getAttribute(k),
                        f;
                    for (f = 0; f < z.length; f++) b = z[f], b.getAttribute(k) === e && b.setAttribute(k, a);
                    d.setAttribute(k, a)
                });
                return a
            },
            fontMetrics: function(a, d) {
                a = a || d && d.style && d.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? k(a) : /em/.test(a) ? parseFloat(a) * (d ? this.fontMetrics(null, d.parentNode).f : 16) : 12;
                d = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: d,
                    b: Math.round(.8 *
                        d),
                    f: a
                }
            },
            rotCorr: function(a, k, d) {
                var z = a;
                k && d && (z = Math.max(z * Math.cos(k * g), 4));
                return {
                    x: -a / 3 * Math.sin(k * g),
                    y: z
                }
            },
            label: function(k, d, e, c, w, m, p, g, t) {
                var B = this,
                    u = B.g("button" !== t && "label"),
                    A = u.text = B.text("", 0, 0, p).attr({
                        zIndex: 1
                    }),
                    F, M, I = 0,
                    N = 3,
                    l = 0,
                    D, O, H, P, q, h = {},
                    J, v, n = /^url\((.*?)\)$/.test(c),
                    Q = n,
                    x, r, Y, V;
                t && u.addClass("highcharts-" + t);
                Q = n;
                x = function() {
                    return (J || 0) % 2 / 2
                };
                r = function() {
                    var a = A.element.style,
                        k = {};
                    M = (void 0 === D || void 0 === O || q) && y(A.textStr) && A.getBBox();
                    u.width = (D || M.width || 0) + 2 * N + l;
                    u.height =
                        (O || M.height || 0) + 2 * N;
                    v = N + B.fontMetrics(a && a.fontSize, A).b;
                    Q && (F || (u.box = F = B.symbols[c] || n ? B.symbol(c) : B.rect(), F.addClass(("button" === t ? "" : "highcharts-label-box") + (t ? " highcharts-" + t + "-box" : "")), F.add(u), a = x(), k.x = a, k.y = (g ? -v : 0) + a), k.width = Math.round(u.width), k.height = Math.round(u.height), F.attr(f(k, h)), h = {})
                };
                Y = function() {
                    var a = l + N,
                        k;
                    k = g ? 0 : v;
                    y(D) && M && ("center" === q || "right" === q) && (a += {
                        center: .5,
                        right: 1
                    }[q] * (D - M.width));
                    if (a !== A.x || k !== A.y) A.attr("x", a), void 0 !== k && A.attr("y", k);
                    A.x = a;
                    A.y = k
                };
                V = function(a,
                    k) {
                    F ? F.attr(a, k) : h[a] = k
                };
                u.onAdd = function() {
                    A.add(u);
                    u.attr({
                        text: k || 0 === k ? k : "",
                        x: d,
                        y: e
                    });
                    F && y(w) && u.attr({
                        anchorX: w,
                        anchorY: m
                    })
                };
                u.widthSetter = function(k) {
                    D = a.isNumber(k) ? k : null
                };
                u.heightSetter = function(a) {
                    O = a
                };
                u["text-alignSetter"] = function(a) {
                    q = a
                };
                u.paddingSetter = function(a) {
                    y(a) && a !== N && (N = u.padding = a, Y())
                };
                u.paddingLeftSetter = function(a) {
                    y(a) && a !== l && (l = a, Y())
                };
                u.alignSetter = function(a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a];
                    a !== I && (I = a, M && u.attr({
                        x: H
                    }))
                };
                u.textSetter = function(a) {
                    void 0 !== a && A.textSetter(a);
                    r();
                    Y()
                };
                u["stroke-widthSetter"] = function(a, k) {
                    a && (Q = !0);
                    J = this["stroke-width"] = a;
                    V(k, a)
                };
                u.strokeSetter = u.fillSetter = u.rSetter = function(a, k) {
                    "r" !== k && ("fill" === k && a && (Q = !0), u[k] = a);
                    V(k, a)
                };
                u.anchorXSetter = function(a, k) {
                    w = u.anchorX = a;
                    V(k, Math.round(a) - x() - H)
                };
                u.anchorYSetter = function(a, k) {
                    m = u.anchorY = a;
                    V(k, a - P)
                };
                u.xSetter = function(a) {
                    u.x = a;
                    I && (a -= I * ((D || M.width) + 2 * N));
                    H = Math.round(a);
                    u.attr("translateX", H)
                };
                u.ySetter = function(a) {
                    P = u.y = Math.round(a);
                    u.attr("translateY", P)
                };
                var ea = u.css;
                return f(u, {
                    css: function(a) {
                        if (a) {
                            var k = {};
                            a = K(a);
                            b(u.textProps, function(d) {
                                void 0 !== a[d] && (k[d] = a[d], delete a[d])
                            });
                            A.css(k)
                        }
                        return ea.call(u, a)
                    },
                    getBBox: function() {
                        return {
                            width: M.width + 2 * N,
                            height: M.height + 2 * N,
                            x: M.x - N,
                            y: M.y - N
                        }
                    },
                    shadow: function(a) {
                        a && (r(), F && F.shadow(a));
                        return u
                    },
                    destroy: function() {
                        z(u.element, "mouseenter");
                        z(u.element, "mouseleave");
                        A && (A = A.destroy());
                        F && (F = F.destroy());
                        C.prototype.destroy.call(u);
                        u = B = r = Y = V = null
                    }
                })
            }
        });
        a.Renderer = G
    })(L);
    (function(a) {
        var C = a.attr,
            G = a.createElement,
            E = a.css,
            r =
            a.defined,
            n = a.each,
            h = a.extend,
            x = a.isFirefox,
            q = a.isMS,
            v = a.isWebKit,
            y = a.pick,
            g = a.pInt,
            c = a.SVGRenderer,
            l = a.win,
            b = a.wrap;
        h(a.SVGElement.prototype, {
            htmlCss: function(a) {
                var b = this.element;
                if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = h(this.styles, a);
                E(this.element, a);
                return this
            },
            htmlGetBBox: function() {
                var a = this.element;
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var a = this.renderer,
                        b = this.element,
                        c = this.translateX || 0,
                        e = this.translateY || 0,
                        B = this.x || 0,
                        l = this.y || 0,
                        m = this.textAlign || "left",
                        A = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[m],
                        u = this.styles,
                        H = u && u.whiteSpace;
                    E(b, {
                        marginLeft: c,
                        marginTop: e
                    });
                    this.shadows && n(this.shadows, function(a) {
                        E(a, {
                            marginLeft: c + 1,
                            marginTop: e + 1
                        })
                    });
                    this.inverted && n(b.childNodes, function(d) {
                        a.invertChild(d, b)
                    });
                    if ("SPAN" === b.tagName) {
                        var u = this.rotation,
                            I = this.textWidth && g(this.textWidth),
                            K = [u, m, b.innerHTML, this.textAlign].join(),
                            d;
                        (d = I !== this.oldTextWidth) && !(d = I > this.oldTextWidth) && ((d = this.textPxLength) || (E(b, {
                            width: "",
                            whiteSpace: H || "nowrap"
                        }), d = b.offsetWidth), d = d > I);
                        d && /[ \-]/.test(b.textContent || b.innerText) && (E(b, {
                            width: I + "px",
                            display: "block",
                            whiteSpace: H || "normal"
                        }), this.oldTextWidth = I);
                        K !== this.cTT && (H = a.fontMetrics(b.style.fontSize).b, r(u) && u !== (this.oldRotation || 0) && this.setSpanRotation(u, A, H), this.getSpanCorrection(this.textPxLength || b.offsetWidth, H, A, u, m));
                        E(b, {
                            left: B +
                                (this.xCorr || 0) + "px",
                            top: l + (this.yCorr || 0) + "px"
                        });
                        this.cTT = K;
                        this.oldRotation = u
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(a, b, c) {
                var e = {},
                    f = this.renderer.getTransformKey();
                e[f] = e.transform = "rotate(" + a + "deg)";
                e[f + (x ? "Origin" : "-origin")] = e.transformOrigin = 100 * b + "% " + c + "px";
                E(this.element, e)
            },
            getSpanCorrection: function(a, b, c) {
                this.xCorr = -a * c;
                this.yCorr = -b
            }
        });
        h(c.prototype, {
            getTransformKey: function() {
                return q && !/Edge/.test(l.navigator.userAgent) ? "-ms-transform" : v ? "-webkit-transform" : x ? "MozTransform" :
                    l.opera ? "-o-transform" : ""
            },
            html: function(a, c, g) {
                var e = this.createElement("span"),
                    f = e.element,
                    p = e.renderer,
                    m = p.isSVG,
                    t = function(a, e) {
                        n(["opacity", "visibility"], function(f) {
                            b(a, f + "Setter", function(a, d, b, f) {
                                a.call(this, d, b, f);
                                e[b] = d
                            })
                        })
                    };
                e.textSetter = function(a) {
                    a !== f.innerHTML && delete this.bBox;
                    this.textStr = a;
                    f.innerHTML = y(a, "");
                    e.doTransform = !0
                };
                m && t(e, e.element.style);
                e.xSetter = e.ySetter = e.alignSetter = e.rotationSetter = function(a, b) {
                    "align" === b && (b = "textAlign");
                    e[b] = a;
                    e.doTransform = !0
                };
                e.attr({
                    text: a,
                    x: Math.round(c),
                    y: Math.round(g)
                }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                f.style.whiteSpace = "nowrap";
                e.css = e.htmlCss;
                e.afterSetters = function() {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                m && (e.add = function(a) {
                    var b, c = p.box.parentNode,
                        m = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;) m.push(a), a = a.parentGroup;
                            n(m.reverse(), function(a) {
                                function d(k, d) {
                                    a[d] = k;
                                    "translateX" === d ? f.left = k + "px" : f.top = k + "px";
                                    a.doTransform = !0
                                }
                                var f,
                                    k = C(a.element, "class");
                                k && (k = {
                                    className: k
                                });
                                b = a.div = a.div || G("div", k, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, b || c);
                                f = b.style;
                                h(a, {
                                    classSetter: function(a) {
                                        return function(k) {
                                            this.element.setAttribute("class", k);
                                            a.className = k
                                        }
                                    }(b),
                                    on: function() {
                                        m[0].div && e.on.apply({
                                            element: m[0].div
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: d,
                                    translateYSetter: d
                                });
                                t(a, f)
                            })
                        }
                    } else b = c;
                    b.appendChild(f);
                    e.added = !0;
                    e.alignOnAdd && e.htmlUpdateTransform();
                    return e
                });
                return e
            }
        })
    })(L);
    (function(a) {
        var C = a.defined,
            G = a.each,
            E = a.extend,
            r = a.merge,
            n = a.pick,
            h = a.timeUnits,
            x = a.win;
        a.Time = function(a) {
            this.update(a, !1)
        };
        a.Time.prototype = {
            defaultOptions: {},
            update: function(q) {
                var h = n(q && q.useUTC, !0),
                    y = this;
                this.options = q = r(!0, this.options || {}, q);
                this.Date = q.Date || x.Date;
                this.timezoneOffset = (this.useUTC = h) && q.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(h && !q.getTimezoneOffset &&
                    !q.timezone)) || this.timezoneOffset ? (this.get = function(a, c) {
                    var g = c.getTime(),
                        b = g - y.getTimezoneOffset(c);
                    c.setTime(b);
                    a = c["getUTC" + a]();
                    c.setTime(g);
                    return a
                }, this.set = function(g, c, l) {
                    var b;
                    if (-1 !== a.inArray(g, ["Milliseconds", "Seconds", "Minutes"])) c["set" + g](l);
                    else b = y.getTimezoneOffset(c), b = c.getTime() - b, c.setTime(b), c["setUTC" + g](l), g = y.getTimezoneOffset(c), b = c.getTime() + g, c.setTime(b)
                }) : h ? (this.get = function(a, c) {
                    return c["getUTC" + a]()
                }, this.set = function(a, c, l) {
                    return c["setUTC" + a](l)
                }) : (this.get =
                    function(a, c) {
                        return c["get" + a]()
                    }, this.set = function(a, c, l) {
                        return c["set" + a](l)
                    })
            },
            makeTime: function(q, h, y, g, c, l) {
                var b, f, p;
                this.useUTC ? (b = this.Date.UTC.apply(0, arguments), f = this.getTimezoneOffset(b), b += f, p = this.getTimezoneOffset(b), f !== p ? b += p - f : f - 36E5 === this.getTimezoneOffset(b - 36E5) && (a.isChrome || a.isMS) && (b -= 36E5)) : b = (new this.Date(q, h, n(y, 1), n(g, 0), n(c, 0), n(l, 0))).getTime();
                return b
            },
            timezoneOffsetFunction: function() {
                var q = this,
                    h = this.options,
                    n = x.moment;
                if (!this.useUTC) return function(a) {
                    return 6E4 *
                        (new Date(a)).getTimezoneOffset()
                };
                if (h.timezone) {
                    if (n) return function(a) {
                        return 6E4 * -n.tz(a, h.timezone).utcOffset()
                    };
                    a.error(25)
                }
                return this.useUTC && h.getTimezoneOffset ? function(a) {
                    return 6E4 * h.getTimezoneOffset(a)
                } : function() {
                    return 6E4 * (q.timezoneOffset || 0)
                }
            },
            dateFormat: function(q, h, n) {
                if (!a.defined(h) || isNaN(h)) return a.defaultOptions.lang.invalidDate || "";
                q = a.pick(q, "%Y-%m-%d %H:%M:%S");
                var g = this,
                    c = new this.Date(h),
                    l = this.get("Hours", c),
                    b = this.get("Day", c),
                    f = this.get("Date", c),
                    p = this.get("Month",
                        c),
                    t = this.get("FullYear", c),
                    e = a.defaultOptions.lang,
                    B = e.weekdays,
                    D = e.shortWeekdays,
                    m = a.pad,
                    c = a.extend({
                        a: D ? D[b] : B[b].substr(0, 3),
                        A: B[b],
                        d: m(f),
                        e: m(f, 2, " "),
                        w: b,
                        b: e.shortMonths[p],
                        B: e.months[p],
                        m: m(p + 1),
                        y: t.toString().substr(2, 2),
                        Y: t,
                        H: m(l),
                        k: l,
                        I: m(l % 12 || 12),
                        l: l % 12 || 12,
                        M: m(g.get("Minutes", c)),
                        p: 12 > l ? "AM" : "PM",
                        P: 12 > l ? "am" : "pm",
                        S: m(c.getSeconds()),
                        L: m(Math.round(h % 1E3), 3)
                    }, a.dateFormats);
                a.objectEach(c, function(a, b) {
                    for (; - 1 !== q.indexOf("%" + b);) q = q.replace("%" + b, "function" === typeof a ? a.call(g, h) : a)
                });
                return n ? q.substr(0, 1).toUpperCase() + q.substr(1) : q
            },
            getTimeTicks: function(a, v, y, g) {
                var c = this,
                    l = [],
                    b = {},
                    f, p = new c.Date(v),
                    t = a.unitRange,
                    e = a.count || 1,
                    B;
                if (C(v)) {
                    c.set("Milliseconds", p, t >= h.second ? 0 : e * Math.floor(c.get("Milliseconds", p) / e));
                    t >= h.second && c.set("Seconds", p, t >= h.minute ? 0 : e * Math.floor(c.get("Seconds", p) / e));
                    t >= h.minute && c.set("Minutes", p, t >= h.hour ? 0 : e * Math.floor(c.get("Minutes", p) / e));
                    t >= h.hour && c.set("Hours", p, t >= h.day ? 0 : e * Math.floor(c.get("Hours", p) / e));
                    t >= h.day && c.set("Date", p, t >= h.month ?
                        1 : e * Math.floor(c.get("Date", p) / e));
                    t >= h.month && (c.set("Month", p, t >= h.year ? 0 : e * Math.floor(c.get("Month", p) / e)), f = c.get("FullYear", p));
                    t >= h.year && c.set("FullYear", p, f - f % e);
                    t === h.week && c.set("Date", p, c.get("Date", p) - c.get("Day", p) + n(g, 1));
                    f = c.get("FullYear", p);
                    g = c.get("Month", p);
                    var D = c.get("Date", p),
                        m = c.get("Hours", p);
                    v = p.getTime();
                    c.variableTimezone && (B = y - v > 4 * h.month || c.getTimezoneOffset(v) !== c.getTimezoneOffset(y));
                    p = p.getTime();
                    for (v = 1; p < y;) l.push(p), p = t === h.year ? c.makeTime(f + v * e, 0) : t === h.month ?
                        c.makeTime(f, g + v * e) : !B || t !== h.day && t !== h.week ? B && t === h.hour && 1 < e ? c.makeTime(f, g, D, m + v * e) : p + t * e : c.makeTime(f, g, D + v * e * (t === h.day ? 1 : 7)), v++;
                    l.push(p);
                    t <= h.hour && 1E4 > l.length && G(l, function(a) {
                        0 === a % 18E5 && "000000000" === c.dateFormat("%H%M%S%L", a) && (b[a] = "day")
                    })
                }
                l.info = E(a, {
                    higherRanks: b,
                    totalRange: t * e
                });
                return l
            }
        }
    })(L);
    (function(a) {
        var C = a.color,
            G = a.merge;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square",
                "triangle", "triangle-down"
            ],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: a.Time.prototype.defaultOptions,
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: C("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: 0,
                href: "http://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        a.setOptions = function(C) {
            a.defaultOptions = G(!0, a.defaultOptions, C);
            a.time.update(G(a.defaultOptions.global,
                a.defaultOptions.time), !1);
            return a.defaultOptions
        };
        a.getOptions = function() {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        a.time = new a.Time(G(a.defaultOptions.global, a.defaultOptions.time));
        a.dateFormat = function(C, r, n) {
            return a.time.dateFormat(C, r, n)
        }
    })(L);
    (function(a) {
        var C = a.correctFloat,
            G = a.defined,
            E = a.destroyObjectProperties,
            r = a.isNumber,
            n = a.merge,
            h = a.pick,
            x = a.deg2rad;
        a.Tick = function(a, h, n, g) {
            this.axis = a;
            this.pos = h;
            this.type = n || "";
            this.isNewLabel = this.isNew = !0;
            n ||
                g || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function() {
                var a = this.axis,
                    v = a.options,
                    y = a.chart,
                    g = a.categories,
                    c = a.names,
                    l = this.pos,
                    b = v.labels,
                    f = a.tickPositions,
                    p = l === f[0],
                    t = l === f[f.length - 1],
                    c = g ? h(g[l], c[l], l) : l,
                    g = this.label,
                    f = f.info,
                    e;
                a.isDatetimeAxis && f && (e = v.dateTimeLabelFormats[f.higherRanks[l] || f.unitName]);
                this.isFirst = p;
                this.isLast = t;
                v = a.labelFormatter.call({
                    axis: a,
                    chart: y,
                    isFirst: p,
                    isLast: t,
                    dateTimeLabelFormat: e,
                    value: a.isLog ? C(a.lin2log(c)) : c,
                    pos: l
                });
                if (G(g)) g && g.attr({
                    text: v
                });
                else {
                    if (this.label =
                        g = G(v) && b.enabled ? y.renderer.text(v, 0, 0, b.useHTML).css(n(b.style)).add(a.labelGroup) : null) g.textPxLength = g.getBBox().width;
                    this.rotation = 0
                }
            },
            getLabelSize: function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function(a) {
                var q = this.axis,
                    n = q.options.labels,
                    g = a.x,
                    c = q.chart.chartWidth,
                    l = q.chart.spacing,
                    b = h(q.labelLeft, Math.min(q.pos, l[3])),
                    l = h(q.labelRight, Math.max(q.isRadial ? 0 : q.pos + q.len, c - l[1])),
                    f = this.label,
                    p = this.rotation,
                    t = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[q.labelAlign ||
                        f.attr("align")
                    ],
                    e = f.getBBox().width,
                    B = q.getSlotWidth(),
                    D = B,
                    m = 1,
                    A, u = {};
                if (p || !1 === n.overflow) 0 > p && g - t * e < b ? A = Math.round(g / Math.cos(p * x) - b) : 0 < p && g + t * e > l && (A = Math.round((c - g) / Math.cos(p * x)));
                else if (c = g + (1 - t) * e, g - t * e < b ? D = a.x + D * (1 - t) - b : c > l && (D = l - a.x + D * t, m = -1), D = Math.min(B, D), D < B && "center" === q.labelAlign && (a.x += m * (B - D - t * (B - Math.min(e, D)))), e > D || q.autoRotation && (f.styles || {}).width) A = D;
                A && (u.width = A, (n.style || {}).textOverflow || (u.textOverflow = "ellipsis"), f.css(u))
            },
            getPosition: function(a, h, n, g) {
                var c = this.axis,
                    l = c.chart,
                    b = g && l.oldChartHeight || l.chartHeight;
                return {
                    x: a ? c.translate(h + n, null, null, g) + c.transB : c.left + c.offset + (c.opposite ? (g && l.oldChartWidth || l.chartWidth) - c.right - c.left : 0),
                    y: a ? b - c.bottom + c.offset - (c.opposite ? c.height : 0) : b - c.translate(h + n, null, null, g) - c.transB
                }
            },
            getLabelPosition: function(a, h, n, g, c, l, b, f) {
                var p = this.axis,
                    t = p.transA,
                    e = p.reversed,
                    B = p.staggerLines,
                    D = p.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    m = c.y,
                    A = g || p.reserveSpaceDefault ? 0 : -p.labelOffset * ("center" === p.labelAlign ? .5 : 1);
                G(m) || (m = 0 === p.side ? n.rotation ?
                    -8 : -n.getBBox().height : 2 === p.side ? D.y + 8 : Math.cos(n.rotation * x) * (D.y - n.getBBox(!1, 0).height / 2));
                a = a + c.x + A + D.x - (l && g ? l * t * (e ? -1 : 1) : 0);
                h = h + m - (l && !g ? l * t * (e ? 1 : -1) : 0);
                B && (n = b / (f || 1) % B, p.opposite && (n = B - n - 1), h += p.labelOffset / B * n);
                return {
                    x: a,
                    y: Math.round(h)
                }
            },
            getMarkPath: function(a, h, n, g, c, l) {
                return l.crispLine(["M", a, h, "L", a + (c ? 0 : -n), h + (c ? n : 0)], g)
            },
            renderGridLine: function(a, h, n) {
                var g = this.axis,
                    c = g.options,
                    l = this.gridLine,
                    b = {},
                    f = this.pos,
                    p = this.type,
                    t = g.tickmarkOffset,
                    e = g.chart.renderer,
                    B = p ? p + "Grid" : "grid",
                    D = c[B + "LineWidth"],
                    m = c[B + "LineColor"],
                    c = c[B + "LineDashStyle"];
                l || (b.stroke = m, b["stroke-width"] = D, c && (b.dashstyle = c), p || (b.zIndex = 1), a && (b.opacity = 0), this.gridLine = l = e.path().attr(b).addClass("highcharts-" + (p ? p + "-" : "") + "grid-line").add(g.gridGroup));
                if (!a && l && (a = g.getPlotLinePath(f + t, l.strokeWidth() * n, a, !0))) l[this.isNew ? "attr" : "animate"]({
                    d: a,
                    opacity: h
                })
            },
            renderMark: function(a, n, y) {
                var g = this.axis,
                    c = g.options,
                    l = g.chart.renderer,
                    b = this.type,
                    f = b ? b + "Tick" : "tick",
                    p = g.tickSize(f),
                    t = this.mark,
                    e = !t,
                    B = a.x;
                a = a.y;
                var D = h(c[f + "Width"], !b && g.isXAxis ? 1 : 0),
                    c = c[f + "Color"];
                p && (g.opposite && (p[0] = -p[0]), e && (this.mark = t = l.path().addClass("highcharts-" + (b ? b + "-" : "") + "tick").add(g.axisGroup), t.attr({
                    stroke: c,
                    "stroke-width": D
                })), t[e ? "attr" : "animate"]({
                    d: this.getMarkPath(B, a, p[0], t.strokeWidth() * y, g.horiz, l),
                    opacity: n
                }))
            },
            renderLabel: function(a, n, y, g) {
                var c = this.axis,
                    l = c.horiz,
                    b = c.options,
                    f = this.label,
                    p = b.labels,
                    t = p.step,
                    c = c.tickmarkOffset,
                    e = !0,
                    B = a.x;
                a = a.y;
                f && r(B) && (f.xy = a = this.getLabelPosition(B, a, f, l, p, c, g, t), this.isFirst &&
                    !this.isLast && !h(b.showFirstLabel, 1) || this.isLast && !this.isFirst && !h(b.showLastLabel, 1) ? e = !1 : !l || p.step || p.rotation || n || 0 === y || this.handleOverflow(a), t && g % t && (e = !1), e && r(a.y) ? (a.opacity = y, f[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (f.attr("y", -9999), this.isNewLabel = !0))
            },
            render: function(a, n, y) {
                var g = this.axis,
                    c = g.horiz,
                    l = this.getPosition(c, this.pos, g.tickmarkOffset, n),
                    b = l.x,
                    f = l.y,
                    g = c && b === g.pos + g.len || !c && f === g.pos ? -1 : 1;
                y = h(y, 1);
                this.isActive = !0;
                this.renderGridLine(n, y, g);
                this.renderMark(l,
                    y, g);
                this.renderLabel(l, n, y, a);
                this.isNew = !1
            },
            destroy: function() {
                E(this, this.axis)
            }
        }
    })(L);
    var da = function(a) {
        var C = a.addEvent,
            G = a.animObject,
            E = a.arrayMax,
            r = a.arrayMin,
            n = a.color,
            h = a.correctFloat,
            x = a.defaultOptions,
            q = a.defined,
            v = a.deg2rad,
            y = a.destroyObjectProperties,
            g = a.each,
            c = a.extend,
            l = a.fireEvent,
            b = a.format,
            f = a.getMagnitude,
            p = a.grep,
            t = a.inArray,
            e = a.isArray,
            B = a.isNumber,
            D = a.isString,
            m = a.merge,
            A = a.normalizeTickInterval,
            u = a.objectEach,
            H = a.pick,
            I = a.removeEvent,
            K = a.splat,
            d = a.syncTimeout,
            w = a.Tick,
            F = function() {
                this.init.apply(this,
                    arguments)
            };
        a.extend(F.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    },
                    x: 0
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    formatter: function() {
                        return a.numberFormat(this.total, -1)
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#000000",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function(a, d) {
                var k = d.isX,
                    b = this;
                b.chart = a;
                b.horiz = a.inverted && !b.isZAxis ? !k : k;
                b.isXAxis = k;
                b.coll = b.coll || (k ? "xAxis" : "yAxis");
                b.opposite = d.opposite;
                b.side = d.side || (b.horiz ?
                    b.opposite ? 0 : 2 : b.opposite ? 1 : 3);
                b.setOptions(d);
                var z = this.options,
                    e = z.type;
                b.labelFormatter = z.labels.formatter || b.defaultLabelFormatter;
                b.userOptions = d;
                b.minPixelPadding = 0;
                b.reversed = z.reversed;
                b.visible = !1 !== z.visible;
                b.zoomEnabled = !1 !== z.zoomEnabled;
                b.hasNames = "category" === e || !0 === z.categories;
                b.categories = z.categories || b.hasNames;
                b.names = b.names || [];
                b.plotLinesAndBandsGroups = {};
                b.isLog = "logarithmic" === e;
                b.isDatetimeAxis = "datetime" === e;
                b.positiveValuesOnly = b.isLog && !b.allowNegativeLog;
                b.isLinked =
                    q(z.linkedTo);
                b.ticks = {};
                b.labelEdge = [];
                b.minorTicks = {};
                b.plotLinesAndBands = [];
                b.alternateBands = {};
                b.len = 0;
                b.minRange = b.userMinRange = z.minRange || z.maxZoom;
                b.range = z.range;
                b.offset = z.offset || 0;
                b.stacks = {};
                b.oldStacks = {};
                b.stacksTouched = 0;
                b.max = null;
                b.min = null;
                b.crosshair = H(z.crosshair, K(a.options.tooltip.crosshairs)[k ? 0 : 1], !1);
                d = b.options.events; - 1 === t(b, a.axes) && (k ? a.axes.splice(a.xAxis.length, 0, b) : a.axes.push(b), a[b.coll].push(b));
                b.series = b.series || [];
                a.inverted && !b.isZAxis && k && void 0 === b.reversed &&
                    (b.reversed = !0);
                u(d, function(a, k) {
                    C(b, k, a)
                });
                b.lin2log = z.linearToLogConverter || b.lin2log;
                b.isLog && (b.val2lin = b.log2lin, b.lin2val = b.lin2log)
            },
            setOptions: function(a) {
                this.options = m(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], m(x[this.coll], a))
            },
            defaultLabelFormatter: function() {
                var k = this.axis,
                    d = this.value,
                    e = k.chart.time,
                    f = k.categories,
                    c = this.dateTimeLabelFormat,
                    w = x.lang,
                    m = w.numericSymbols,
                    w = w.numericSymbolMagnitude || 1E3,
                    p = m && m.length,
                    t, g = k.options.labels.format,
                    k = k.isLog ? Math.abs(d) : k.tickInterval;
                if (g) t = b(g, this, e);
                else if (f) t = d;
                else if (c) t = e.dateFormat(c, d);
                else if (p && 1E3 <= k)
                    for (; p-- && void 0 === t;) e = Math.pow(w, p + 1), k >= e && 0 === 10 * d % e && null !== m[p] && 0 !== d && (t = a.numberFormat(d / e, -1) + m[p]);
                void 0 === t && (t = 1E4 <= Math.abs(d) ? a.numberFormat(d, -1) : a.numberFormat(d, -1, void 0, ""));
                return t
            },
            getSeriesExtremes: function() {
                var a = this,
                    d = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin =
                    a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                g(a.series, function(k) {
                    if (k.visible || !d.options.chart.ignoreHiddenSeries) {
                        var b = k.options,
                            z = b.threshold,
                            e;
                        a.hasVisibleSeries = !0;
                        a.positiveValuesOnly && 0 >= z && (z = null);
                        if (a.isXAxis) b = k.xData, b.length && (k = r(b), e = E(b), B(k) || k instanceof Date || (b = p(b, B), k = r(b), e = E(b)), b.length && (a.dataMin = Math.min(H(a.dataMin, b[0], k), k), a.dataMax = Math.max(H(a.dataMax, b[0], e), e)));
                        else if (k.getExtremes(), e = k.dataMax, k = k.dataMin, q(k) && q(e) &&
                            (a.dataMin = Math.min(H(a.dataMin, k), k), a.dataMax = Math.max(H(a.dataMax, e), e)), q(z) && (a.threshold = z), !b.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                    }
                })
            },
            translate: function(a, d, b, e, f, c) {
                var k = this.linkedParent || this,
                    z = 1,
                    w = 0,
                    m = e ? k.oldTransA : k.transA;
                e = e ? k.oldMin : k.min;
                var p = k.minPixelPadding;
                f = (k.isOrdinal || k.isBroken || k.isLog && f) && k.lin2val;
                m || (m = k.transA);
                b && (z *= -1, w = k.len);
                k.reversed && (z *= -1, w -= z * (k.sector || k.len));
                d ? (a = (a * z + w - p) / m + e, f && (a = k.lin2val(a))) : (f && (a = k.val2lin(a)), a = B(e) ? z * (a - e) *
                    m + w + z * p + (B(c) ? m * c : 0) : void 0);
                return a
            },
            toPixels: function(a, d) {
                return this.translate(a, !1, !this.horiz, null, !0) + (d ? 0 : this.pos)
            },
            toValue: function(a, d) {
                return this.translate(a - (d ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function(a, d, b, e, f) {
                var k = this.chart,
                    z = this.left,
                    c = this.top,
                    w, m, p = b && k.oldChartHeight || k.chartHeight,
                    t = b && k.oldChartWidth || k.chartWidth,
                    g;
                w = this.transB;
                var u = function(a, k, d) {
                    if (a < k || a > d) e ? a = Math.min(Math.max(k, a), d) : g = !0;
                    return a
                };
                f = H(f, this.translate(a, null, null, b));
                f = Math.min(Math.max(-1E5,
                    f), 1E5);
                a = b = Math.round(f + w);
                w = m = Math.round(p - f - w);
                B(f) ? this.horiz ? (w = c, m = p - this.bottom, a = b = u(a, z, z + this.width)) : (a = z, b = t - this.right, w = m = u(w, c, c + this.height)) : (g = !0, e = !1);
                return g && !e ? null : k.renderer.crispLine(["M", a, w, "L", b, m], d || 1)
            },
            getLinearTickPositions: function(a, d, b) {
                var k, z = h(Math.floor(d / a) * a);
                b = h(Math.ceil(b / a) * a);
                var e = [],
                    f;
                h(z + a) === z && (f = 20);
                if (this.single) return [d];
                for (d = z; d <= b;) {
                    e.push(d);
                    d = h(d + a, f);
                    if (d === k) break;
                    k = d
                }
                return e
            },
            getMinorTickInterval: function() {
                var a = this.options;
                return !0 ===
                    a.minorTicks ? H(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function() {
                var a = this,
                    d = a.options,
                    b = a.tickPositions,
                    e = a.minorTickInterval,
                    f = [],
                    c = a.pointRangePadding || 0,
                    w = a.min - c,
                    c = a.max + c,
                    m = c - w;
                if (m && m / e < a.len / 3)
                    if (a.isLog) g(this.paddedTicks, function(k, d, b) {
                        d && f.push.apply(f, a.getLogTickPositions(e, b[d - 1], b[d], !0))
                    });
                    else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) f = f.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e), w, c, d.startOfWeek));
                else
                    for (d = w + (b[0] - w) % e; d <= c && d !== f[0]; d += e) f.push(d);
                0 !== f.length && a.trimTicks(f);
                return f
            },
            adjustForMinRange: function() {
                var a = this.options,
                    d = this.min,
                    b = this.max,
                    e, f, c, w, m, p, t, u;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (q(a.min) || q(a.max) ? this.minRange = null : (g(this.series, function(a) {
                    p = a.xData;
                    for (w = t = a.xIncrement ? 1 : p.length - 1; 0 < w; w--)
                        if (m = p[w] - p[w - 1], void 0 === c || m < c) c = m
                }), this.minRange = Math.min(5 * c, this.dataMax - this.dataMin)));
                b - d < this.minRange && (f = this.dataMax - this.dataMin >= this.minRange,
                    u = this.minRange, e = (u - b + d) / 2, e = [d - e, H(a.min, d - e)], f && (e[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), d = E(e), b = [d + u, H(a.max, d + u)], f && (b[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), b = r(b), b - d < u && (e[0] = b - u, e[1] = H(a.min, b - u), d = E(e)));
                this.min = d;
                this.max = b
            },
            getClosest: function() {
                var a;
                this.categories ? a = 1 : g(this.series, function(k) {
                    var d = k.closestPointRange,
                        b = k.visible || !k.chart.options.chart.ignoreHiddenSeries;
                    !k.noSharedTooltip && q(d) && b && (a = q(a) ? Math.min(a, d) : d)
                });
                return a
            },
            nameToX: function(a) {
                var k =
                    e(this.categories),
                    d = k ? this.categories : this.names,
                    b = a.options.x,
                    f;
                a.series.requireSorting = !1;
                q(b) || (b = !1 === this.options.uniqueNames ? a.series.autoIncrement() : k ? t(a.name, d) : H(d["s" + a.name], -1)); - 1 === b ? k || (f = d.length) : f = b;
                void 0 !== f && (this.names[f] = a.name, this.names["s" + a.name] = f);
                return f
            },
            updateNames: function() {
                var a = this,
                    d = this.names,
                    b = d.length;
                if (0 < b) {
                    for (; b--;) delete d["s" + d[b]];
                    d.length = 0;
                    this.minRange = this.userMinRange;
                    g(this.series || [], function(k) {
                        k.xIncrement = null;
                        if (!k.points || k.isDirtyData) k.processData(),
                            k.generatePoints();
                        g(k.points, function(d, b) {
                            var e;
                            d.options && (e = a.nameToX(d), void 0 !== e && e !== d.x && (d.x = e, k.xData[b] = e))
                        })
                    })
                }
            },
            setAxisTranslation: function(a) {
                var k = this,
                    d = k.max - k.min,
                    b = k.axisPointRange || 0,
                    e, f = 0,
                    c = 0,
                    w = k.linkedParent,
                    m = !!k.categories,
                    p = k.transA,
                    t = k.isXAxis;
                if (t || m || b) e = k.getClosest(), w ? (f = w.minPointOffset, c = w.pointRangePadding) : g(k.series, function(a) {
                    var d = m ? 1 : t ? H(a.options.pointRange, e, 0) : k.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    b = Math.max(b, d);
                    k.single || (f = Math.max(f, D(a) ? 0 :
                        d / 2), c = Math.max(c, "on" === a ? 0 : d))
                }), w = k.ordinalSlope && e ? k.ordinalSlope / e : 1, k.minPointOffset = f *= w, k.pointRangePadding = c *= w, k.pointRange = Math.min(b, d), t && (k.closestPointRange = e);
                a && (k.oldTransA = p);
                k.translationSlope = k.transA = p = k.options.staticScale || k.len / (d + c || 1);
                k.transB = k.horiz ? k.left : k.bottom;
                k.minPixelPadding = p * f
            },
            minFromRange: function() {
                return this.max - this.range
            },
            setTickInterval: function(k) {
                var d = this,
                    b = d.chart,
                    e = d.options,
                    c = d.isLog,
                    w = d.log2lin,
                    m = d.isDatetimeAxis,
                    p = d.isXAxis,
                    t = d.isLinked,
                    u = e.maxPadding,
                    F = e.minPadding,
                    I = e.tickInterval,
                    D = e.tickPixelInterval,
                    K = d.categories,
                    n = d.threshold,
                    y = d.softThreshold,
                    v, x, r, C;
                m || K || t || this.getTickAmount();
                r = H(d.userMin, e.min);
                C = H(d.userMax, e.max);
                t ? (d.linkedParent = b[d.coll][e.linkedTo], b = d.linkedParent.getExtremes(), d.min = H(b.min, b.dataMin), d.max = H(b.max, b.dataMax), e.type !== d.linkedParent.options.type && a.error(11, 1)) : (!y && q(n) && (d.dataMin >= n ? (v = n, F = 0) : d.dataMax <= n && (x = n, u = 0)), d.min = H(r, v, d.dataMin), d.max = H(C, x, d.dataMax));
                c && (d.positiveValuesOnly && !k && 0 >= Math.min(d.min,
                    H(d.dataMin, d.min)) && a.error(10, 1), d.min = h(w(d.min), 15), d.max = h(w(d.max), 15));
                d.range && q(d.max) && (d.userMin = d.min = r = Math.max(d.dataMin, d.minFromRange()), d.userMax = C = d.max, d.range = null);
                l(d, "foundExtremes");
                d.beforePadding && d.beforePadding();
                d.adjustForMinRange();
                !(K || d.axisPointRange || d.usePercentage || t) && q(d.min) && q(d.max) && (w = d.max - d.min) && (!q(r) && F && (d.min -= w * F), !q(C) && u && (d.max += w * u));
                B(e.softMin) && !B(d.userMin) && (d.min = Math.min(d.min, e.softMin));
                B(e.softMax) && !B(d.userMax) && (d.max = Math.max(d.max,
                    e.softMax));
                B(e.floor) && (d.min = Math.max(d.min, e.floor));
                B(e.ceiling) && (d.max = Math.min(d.max, e.ceiling));
                y && q(d.dataMin) && (n = n || 0, !q(r) && d.min < n && d.dataMin >= n ? d.min = n : !q(C) && d.max > n && d.dataMax <= n && (d.max = n));
                d.tickInterval = d.min === d.max || void 0 === d.min || void 0 === d.max ? 1 : t && !I && D === d.linkedParent.options.tickPixelInterval ? I = d.linkedParent.tickInterval : H(I, this.tickAmount ? (d.max - d.min) / Math.max(this.tickAmount - 1, 1) : void 0, K ? 1 : (d.max - d.min) * D / Math.max(d.len, D));
                p && !k && g(d.series, function(a) {
                    a.processData(d.min !==
                        d.oldMin || d.max !== d.oldMax)
                });
                d.setAxisTranslation(!0);
                d.beforeSetTickPositions && d.beforeSetTickPositions();
                d.postProcessTickInterval && (d.tickInterval = d.postProcessTickInterval(d.tickInterval));
                d.pointRange && !I && (d.tickInterval = Math.max(d.pointRange, d.tickInterval));
                k = H(e.minTickInterval, d.isDatetimeAxis && d.closestPointRange);
                !I && d.tickInterval < k && (d.tickInterval = k);
                m || c || I || (d.tickInterval = A(d.tickInterval, null, f(d.tickInterval), H(e.allowDecimals, !(.5 < d.tickInterval && 5 > d.tickInterval && 1E3 < d.max &&
                    9999 > d.max)), !!this.tickAmount));
                this.tickAmount || (d.tickInterval = d.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function() {
                var a = this.options,
                    d, b = a.tickPositions;
                d = this.getMinorTickInterval();
                var e = a.tickPositioner,
                    f = a.startOnTick,
                    c = a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === d && this.tickInterval ? this.tickInterval / 5 : d;
                this.single = this.min === this.max && q(this.min) && !this.tickAmount && (parseInt(this.min,
                    10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = d = b && b.slice();
                !d && (d = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), d.length > this.len && (d = [d[0], d.pop()], d[0] === d[1] && (d.length = 1)), this.tickPositions = d, e && (e = e.apply(this, [this.min,
                    this.max
                ]))) && (this.tickPositions = d = e);
                this.paddedTicks = d.slice(0);
                this.trimTicks(d, f, c);
                this.isLinked || (this.single && 2 > d.length && (this.min -= .5, this.max += .5), b || e || this.adjustTickAmount())
            },
            trimTicks: function(a, d, b) {
                var k = a[0],
                    e = a[a.length - 1],
                    f = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (d && -Infinity !== k) this.min = k;
                    else
                        for (; this.min - f > a[0];) a.shift();
                    if (b) this.max = e;
                    else
                        for (; this.max + f < a[a.length - 1];) a.pop();
                    0 === a.length && q(k) && !this.options.tickPositions && a.push((e + k) / 2)
                }
            },
            alignToOthers: function() {
                var a = {},
                    d, b = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === b.alignTicks || this.isLog || g(this.chart[this.coll], function(k) {
                    var b = k.options,
                        b = [k.horiz ? b.left : b.top, b.width, b.height, b.pane].join();
                    k.series.length && (a[b] ? d = !0 : a[b] = 1)
                });
                return d
            },
            getTickAmount: function() {
                var a = this.options,
                    d = a.tickAmount,
                    b = a.tickPixelInterval;
                !q(a.tickInterval) && this.len < b && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (d = 2);
                !d && this.alignToOthers() && (d = Math.ceil(this.len / b) + 1);
                4 > d && (this.finalTickAmt =
                    d, d = 5);
                this.tickAmount = d
            },
            adjustTickAmount: function() {
                var a = this.tickInterval,
                    d = this.tickPositions,
                    b = this.tickAmount,
                    e = this.finalTickAmt,
                    f = d && d.length,
                    c = H(this.threshold, this.softThreshold ? 0 : null);
                if (this.hasData()) {
                    if (f < b) {
                        for (; d.length < b;) d.length % 2 || this.min === c ? d.push(h(d[d.length - 1] + a)) : d.unshift(h(d[0] - a));
                        this.transA *= (f - 1) / (b - 1);
                        this.min = d[0];
                        this.max = d[d.length - 1]
                    } else f > b && (this.tickInterval *= 2, this.setTickPositions());
                    if (q(e)) {
                        for (a = b = d.length; a--;)(3 === e && 1 === a % 2 || 2 >= e && 0 < a && a < b - 1) && d.splice(a,
                            1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function() {
                var a, d;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                d = this.len !== this.oldAxisLength;
                g(this.series, function(d) {
                    if (d.isDirtyData || d.isDirty || d.xAxis.isDirty) a = !0
                });
                d || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin =
                    this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = d || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function(a, d, b, e, f) {
                var k = this,
                    w = k.chart;
                b = H(b, !0);
                g(k.series, function(a) {
                    delete a.kdTree
                });
                f = c(f, {
                    min: a,
                    max: d
                });
                l(k, "setExtremes", f, function() {
                    k.userMin = a;
                    k.userMax = d;
                    k.eventArgs = f;
                    b && w.redraw(e)
                })
            },
            zoom: function(a, d) {
                var k = this.dataMin,
                    b = this.dataMax,
                    e = this.options,
                    f = Math.min(k, H(e.min, k)),
                    e = Math.max(b, H(e.max, b));
                if (a !== this.min ||
                    d !== this.max) this.allowZoomOutside || (q(k) && (a < f && (a = f), a > e && (a = e)), q(b) && (d < f && (d = f), d > e && (d = e))), this.displayBtn = void 0 !== a || void 0 !== d, this.setExtremes(a, d, !1, void 0, {
                    trigger: "zoom"
                });
                return !0
            },
            setAxisSize: function() {
                var d = this.chart,
                    b = this.options,
                    e = b.offsets || [0, 0, 0, 0],
                    f = this.horiz,
                    c = this.width = Math.round(a.relativeLength(H(b.width, d.plotWidth - e[3] + e[1]), d.plotWidth)),
                    w = this.height = Math.round(a.relativeLength(H(b.height, d.plotHeight - e[0] + e[2]), d.plotHeight)),
                    m = this.top = Math.round(a.relativeLength(H(b.top,
                        d.plotTop + e[0]), d.plotHeight, d.plotTop)),
                    b = this.left = Math.round(a.relativeLength(H(b.left, d.plotLeft + e[3]), d.plotWidth, d.plotLeft));
                this.bottom = d.chartHeight - w - m;
                this.right = d.chartWidth - c - b;
                this.len = Math.max(f ? c : w, 0);
                this.pos = f ? b : m
            },
            getExtremes: function() {
                var a = this.isLog,
                    d = this.lin2log;
                return {
                    min: a ? h(d(this.min)) : this.min,
                    max: a ? h(d(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(a) {
                var d = this.isLog,
                    k = this.lin2log,
                    b = d ?
                    k(this.min) : this.min,
                    d = d ? k(this.max) : this.max;
                null === a ? a = b : b > a ? a = b : d < a && (a = d);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function(a) {
                a = (H(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function(a) {
                var d = this.options,
                    k = d[a + "Length"],
                    b = H(d[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (b && k) return "inside" === d[a + "Position"] && (k = -k), [k, b]
            },
            labelMetrics: function() {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style &&
                    this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function() {
                var a = this.options.labels,
                    d = this.horiz,
                    b = this.tickInterval,
                    e = b,
                    f = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / b),
                    c, w = a.rotation,
                    m = this.labelMetrics(),
                    p, t = Number.MAX_VALUE,
                    u, B = function(a) {
                        a /= f || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return a * b
                    };
                d ? (u = !a.staggerLines && !a.step && (q(w) ? [w] : f < H(a.autoRotationLimit, 80) && a.autoRotation)) && g(u, function(a) {
                    var d;
                    if (a === w || a && -90 <= a && 90 >= a) p = B(Math.abs(m.h / Math.sin(v * a))), d = p +
                        Math.abs(a / 360), d < t && (t = d, c = a, e = p)
                }) : a.step || (e = B(m.h));
                this.autoRotation = u;
                this.labelRotation = H(c, w);
                return e
            },
            getSlotWidth: function() {
                var a = this.chart,
                    d = this.horiz,
                    b = this.options.labels,
                    e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    f = a.margin[3];
                return d && 2 > (b.step || 0) && !b.rotation && (this.staggerLines || 1) * this.len / e || !d && (b.style && parseInt(b.style.width, 10) || f && f - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function() {
                var a = this.chart,
                    d = a.renderer,
                    b = this.tickPositions,
                    e = this.ticks,
                    f = this.options.labels,
                    c = this.horiz,
                    w = this.getSlotWidth(),
                    m = Math.max(1, Math.round(w - 2 * (f.padding || 5))),
                    p = {},
                    t = this.labelMetrics(),
                    u = f.style && f.style.textOverflow,
                    B, A, F = 0,
                    I;
                D(f.rotation) || (p.rotation = f.rotation || 0);
                g(b, function(a) {
                    (a = e[a]) && a.label && a.label.textPxLength > F && (F = a.label.textPxLength)
                });
                this.maxLabelLength = F;
                if (this.autoRotation) F > m && F > t.h ? p.rotation = this.labelRotation : this.labelRotation = 0;
                else if (w && (B = m, !u))
                    for (A = "clip", m = b.length; !c && m--;)
                        if (I = b[m], I = e[I].label) I.styles && "ellipsis" ===
                            I.styles.textOverflow ? I.css({
                                textOverflow: "clip"
                            }) : I.textPxLength > w && I.css({
                                width: w + "px"
                            }), I.getBBox().height > this.len / b.length - (t.h - t.f) && (I.specificTextOverflow = "ellipsis");
                p.rotation && (B = F > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight, u || (A = "ellipsis"));
                if (this.labelAlign = f.align || this.autoLabelAlign(this.labelRotation)) p.align = this.labelAlign;
                g(b, function(a) {
                    var d = (a = e[a]) && a.label;
                    d && (d.attr(p), !B || f.style && f.style.width || !(B < d.textPxLength || "SPAN" === d.element.tagName) || d.css({
                        width: B,
                        textOverflow: d.specificTextOverflow ||
                            A
                    }), delete d.specificTextOverflow, a.rotation = p.rotation)
                });
                this.tickRotCorr = d.rotCorr(t.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function() {
                return this.hasVisibleSeries || q(this.min) && q(this.max) && this.tickPositions && 0 < this.tickPositions.length
            },
            addTitle: function(a) {
                var d = this.chart.renderer,
                    b = this.horiz,
                    k = this.opposite,
                    e = this.options.title,
                    f;
                this.axisTitle || ((f = e.textAlign) || (f = (b ? {
                        low: "left",
                        middle: "center",
                        high: "right"
                    } : {
                        low: k ? "right" : "left",
                        middle: "center",
                        high: k ? "left" : "right"
                    })[e.align]),
                    this.axisTitle = d.text(e.text, 0, 0, e.useHTML).attr({
                        zIndex: 7,
                        rotation: e.rotation || 0,
                        align: f
                    }).addClass("highcharts-axis-title").css(e.style).add(this.axisGroup), this.axisTitle.isNew = !0);
                e.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len
                });
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function(a) {
                var d = this.ticks;
                d[a] ? d[a].addLabel() : d[a] = new w(this, a)
            },
            getOffset: function() {
                var a = this,
                    d = a.chart,
                    b = d.renderer,
                    e = a.options,
                    f = a.tickPositions,
                    c = a.ticks,
                    w = a.horiz,
                    m = a.side,
                    p = d.inverted && !a.isZAxis ? [1, 0, 3, 2][m] : m,
                    t, B, A = 0,
                    F, I = 0,
                    l = e.title,
                    D = e.labels,
                    K = 0,
                    h = d.axisOffset,
                    d = d.clipOffset,
                    n = [-1, 1, 1, -1][m],
                    y = e.className,
                    v = a.axisParent,
                    x = this.tickSize("tick");
                t = a.hasData();
                a.showAxis = B = t || H(e.showEmpty, !0);
                a.staggerLines = a.horiz && D.staggerLines;
                a.axisGroup || (a.gridGroup = b.g("grid").attr({
                        zIndex: e.gridZIndex || 1
                    }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (y || "")).add(v), a.axisGroup = b.g("axis").attr({
                        zIndex: e.zIndex || 2
                    }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (y || "")).add(v), a.labelGroup =
                    b.g("axis-labels").attr({
                        zIndex: D.zIndex || 7
                    }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (y || "")).add(v));
                t || a.isLinked ? (g(f, function(d, b) {
                    a.generateTick(d, b)
                }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === m || 2 === m || {
                    1: "left",
                    3: "right"
                }[m] === a.labelAlign, H(D.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && g(f, function(a) {
                    K = Math.max(c[a].getLabelSize(), K)
                }), a.staggerLines && (K *= a.staggerLines), a.labelOffset = K * (a.opposite ? -1 : 1)) : u(c, function(a, d) {
                    a.destroy();
                    delete c[d]
                });
                l && l.text && !1 !== l.enabled && (a.addTitle(B), B && !1 !== l.reserveSpace && (a.titleOffset = A = a.axisTitle.getBBox()[w ? "height" : "width"], F = l.offset, I = q(F) ? 0 : H(l.margin, w ? 5 : 10)));
                a.renderLine();
                a.offset = n * H(e.offset, h[m]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                b = 0 === m ? -a.labelMetrics().h : 2 === m ? a.tickRotCorr.y : 0;
                I = Math.abs(K) + I;
                K && (I = I - b + n * (w ? H(D.y, a.tickRotCorr.y + 8 * n) : D.x));
                a.axisTitleMargin = H(F, I);
                h[m] = Math.max(h[m], a.axisTitleMargin + A + n * a.offset, I, t && f.length && x ? x[0] + n * a.offset : 0);
                e = e.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() /
                    2);
                d[p] = Math.max(d[p], e)
            },
            getLinePath: function(a) {
                var d = this.chart,
                    b = this.opposite,
                    k = this.offset,
                    e = this.horiz,
                    f = this.left + (b ? this.width : 0) + k,
                    k = d.chartHeight - this.bottom - (b ? this.height : 0) + k;
                b && (a *= -1);
                return d.renderer.crispLine(["M", e ? this.left : f, e ? k : this.top, "L", e ? d.chartWidth - this.right : f, e ? k : d.chartHeight - this.bottom], a)
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function() {
                var a = this.horiz,
                    d = this.left,
                    b = this.top,
                    e = this.len,
                    f = this.options.title,
                    c = a ? d : b,
                    w = this.opposite,
                    m = this.offset,
                    p = f.x || 0,
                    t = f.y || 0,
                    u = this.axisTitle,
                    g = this.chart.renderer.fontMetrics(f.style && f.style.fontSize, u),
                    u = Math.max(u.getBBox(null, 0).height - g.h - 1, 0),
                    e = {
                        low: c + (a ? 0 : e),
                        middle: c + e / 2,
                        high: c + (a ? e : 0)
                    }[f.align],
                    d = (a ? b + this.height : d) + (a ? 1 : -1) * (w ? -1 : 1) * this.axisTitleMargin + [-u, u, g.f, -u][this.side];
                return {
                    x: a ? e + p : d + (w ? this.width :
                        0) + m + p,
                    y: a ? d + t - (w ? this.height : 0) + m : e + t
                }
            },
            renderMinorTick: function(a) {
                var d = this.chart.hasRendered && B(this.oldMin),
                    b = this.minorTicks;
                b[a] || (b[a] = new w(this, a, "minor"));
                d && b[a].isNew && b[a].render(null, !0);
                b[a].render(null, !1, 1)
            },
            renderTick: function(a, d) {
                var b = this.isLinked,
                    k = this.ticks,
                    e = this.chart.hasRendered && B(this.oldMin);
                if (!b || a >= this.min && a <= this.max) k[a] || (k[a] = new w(this, a)), e && k[a].isNew && k[a].render(d, !0, .1), k[a].render(d)
            },
            render: function() {
                var b = this,
                    e = b.chart,
                    f = b.options,
                    c = b.isLog,
                    m = b.lin2log,
                    p = b.isLinked,
                    t = b.tickPositions,
                    A = b.axisTitle,
                    F = b.ticks,
                    I = b.minorTicks,
                    l = b.alternateBands,
                    D = f.stackLabels,
                    K = f.alternateGridColor,
                    H = b.tickmarkOffset,
                    h = b.axisLine,
                    n = b.showAxis,
                    q = G(e.renderer.globalAnimation),
                    y, v;
                b.labelEdge.length = 0;
                b.overlap = !1;
                g([F, I, l], function(a) {
                    u(a, function(a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || p) b.minorTickInterval && !b.categories && g(b.getMinorTickPositions(), function(a) {
                    b.renderMinorTick(a)
                }), t.length && (g(t, function(a, d) {
                    b.renderTick(a, d)
                }), H && (0 === b.min || b.single) && (F[-1] || (F[-1] =
                    new w(b, -1, null, !0)), F[-1].render(-1))), K && g(t, function(d, k) {
                    v = void 0 !== t[k + 1] ? t[k + 1] + H : b.max - H;
                    0 === k % 2 && d < b.max && v <= b.max + (e.polar ? -H : H) && (l[d] || (l[d] = new a.PlotLineOrBand(b)), y = d + H, l[d].options = {
                        from: c ? m(y) : y,
                        to: c ? m(v) : v,
                        color: K
                    }, l[d].render(), l[d].isActive = !0)
                }), b._addedPlotLB || (g((f.plotLines || []).concat(f.plotBands || []), function(a) {
                    b.addPlotBandOrLine(a)
                }), b._addedPlotLB = !0);
                g([F, I, l], function(a) {
                    var b, k = [],
                        f = q.duration;
                    u(a, function(a, d) {
                        a.isActive || (a.render(d, !1, 0), a.isActive = !1, k.push(d))
                    });
                    d(function() {
                        for (b = k.length; b--;) a[k[b]] && !a[k[b]].isActive && (a[k[b]].destroy(), delete a[k[b]])
                    }, a !== l && e.hasRendered && f ? f : 0)
                });
                h && (h[h.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(h.strokeWidth())
                }), h.isPlaced = !0, h[n ? "show" : "hide"](!0));
                A && n && (f = b.getTitlePosition(), B(f.y) ? (A[A.isNew ? "attr" : "animate"](f), A.isNew = !1) : (A.attr("y", -9999), A.isNew = !0));
                D && D.enabled && b.renderStackTotals();
                b.isDirty = !1
            },
            redraw: function() {
                this.visible && (this.render(), g(this.plotLinesAndBands, function(a) {
                    a.render()
                }));
                g(this.series, function(a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function(a) {
                var d = this,
                    b = d.stacks,
                    k = d.plotLinesAndBands,
                    e;
                a || I(d);
                u(b, function(a, d) {
                    y(a);
                    b[d] = null
                });
                g([d.ticks, d.minorTicks, d.alternateBands], function(a) {
                    y(a)
                });
                if (k)
                    for (a = k.length; a--;) k[a].destroy();
                g("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function(a) {
                    d[a] && (d[a] = d[a].destroy())
                });
                for (e in d.plotLinesAndBandsGroups) d.plotLinesAndBandsGroups[e] =
                    d.plotLinesAndBandsGroups[e].destroy();
                u(d, function(a, b) {
                    -1 === t(b, d.keepProps) && delete d[b]
                })
            },
            drawCrosshair: function(a, d) {
                var b, e = this.crosshair,
                    k = H(e.snap, !0),
                    f, c = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (q(d) || !k) ? (k ? q(d) && (f = this.isXAxis ? d.plotX : this.len - d.plotY) : f = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), q(f) && (b = this.getPlotLinePath(d && (this.isXAxis ? d.x : H(d.stackY, d.y)), null, null, null, f) || null), q(b) ? (d = this.categories && !this.isRadial, c || (this.cross =
                    c = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (d ? "category " : "thin ") + e.className).attr({
                        zIndex: H(e.zIndex, 2)
                    }).add(), c.attr({
                        stroke: e.color || (d ? n("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": H(e.width, 1)
                    }).css({
                        "pointer-events": "none"
                    }), e.dashStyle && c.attr({
                        dashstyle: e.dashStyle
                    })), c.show().attr({
                    d: b
                }), d && !e.width && c.attr({
                    "stroke-width": this.transA
                }), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
            },
            hideCrosshair: function() {
                this.cross &&
                    this.cross.hide()
            }
        });
        return a.Axis = F
    }(L);
    (function(a) {
        var C = a.Axis,
            G = a.getMagnitude,
            E = a.normalizeTickInterval,
            r = a.timeUnits;
        C.prototype.getTimeTicks = function() {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
        };
        C.prototype.normalizeTimeTickInterval = function(a, h) {
            var n = h || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ];
            h = n[n.length -
                1];
            var q = r[h[0]],
                v = h[1],
                y;
            for (y = 0; y < n.length && !(h = n[y], q = r[h[0]], v = h[1], n[y + 1] && a <= (q * v[v.length - 1] + r[n[y + 1][0]]) / 2); y++);
            q === r.year && a < 5 * q && (v = [1, 2, 5]);
            a = E(a / q, v, "year" === h[0] ? Math.max(G(a / q), 1) : 1);
            return {
                unitRange: q,
                count: a,
                unitName: h[0]
            }
        }
    })(L);
    (function(a) {
        var C = a.Axis,
            G = a.getMagnitude,
            E = a.map,
            r = a.normalizeTickInterval,
            n = a.pick;
        C.prototype.getLogTickPositions = function(a, x, q, v) {
            var h = this.options,
                g = this.len,
                c = this.lin2log,
                l = this.log2lin,
                b = [];
            v || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a),
                b = this.getLinearTickPositions(a, x, q);
            else if (.08 <= a)
                for (var g = Math.floor(x), f, p, t, e, B, h = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; g < q + 1 && !B; g++)
                    for (p = h.length, f = 0; f < p && !B; f++) t = l(c(g) * h[f]), t > x && (!v || e <= q) && void 0 !== e && b.push(e), e > q && (B = !0), e = t;
            else x = c(x), q = c(q), a = v ? this.getMinorTickInterval() : h.tickInterval, a = n("auto" === a ? null : a, this._minorAutoInterval, h.tickPixelInterval / (v ? 5 : 1) * (q - x) / ((v ? g / this.tickPositions.length : g) || 1)), a = r(a, null, G(a)), b = E(this.getLinearTickPositions(a, x, q), l), v ||
                (this._minorAutoInterval = a / 5);
            v || (this.tickInterval = a);
            return b
        };
        C.prototype.log2lin = function(a) {
            return Math.log(a) / Math.LN10
        };
        C.prototype.lin2log = function(a) {
            return Math.pow(10, a)
        }
    })(L);
    (function(a, C) {
        var G = a.arrayMax,
            E = a.arrayMin,
            r = a.defined,
            n = a.destroyObjectProperties,
            h = a.each,
            x = a.erase,
            q = a.merge,
            v = a.pick;
        a.PlotLineOrBand = function(a, g) {
            this.axis = a;
            g && (this.options = g, this.id = g.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function() {
                var h = this,
                    g = h.axis,
                    c = g.horiz,
                    l = h.options,
                    b = l.label,
                    f = h.label,
                    p = l.to,
                    t = l.from,
                    e = l.value,
                    B = r(t) && r(p),
                    D = r(e),
                    m = h.svgElem,
                    A = !m,
                    u = [],
                    H = l.color,
                    I = v(l.zIndex, 0),
                    K = l.events,
                    u = {
                        "class": "highcharts-plot-" + (B ? "band " : "line ") + (l.className || "")
                    },
                    d = {},
                    w = g.chart.renderer,
                    F = B ? "bands" : "lines",
                    k = g.log2lin;
                g.isLog && (t = k(t), p = k(p), e = k(e));
                D ? (u = {
                    stroke: H,
                    "stroke-width": l.width
                }, l.dashStyle && (u.dashstyle = l.dashStyle)) : B && (H && (u.fill = H), l.borderWidth && (u.stroke = l.borderColor, u["stroke-width"] = l.borderWidth));
                d.zIndex = I;
                F += "-" + I;
                (H = g.plotLinesAndBandsGroups[F]) || (g.plotLinesAndBandsGroups[F] =
                    H = w.g("plot-" + F).attr(d).add());
                A && (h.svgElem = m = w.path().attr(u).add(H));
                if (D) u = g.getPlotLinePath(e, m.strokeWidth());
                else if (B) u = g.getPlotBandPath(t, p, l);
                else return;
                A && u && u.length ? (m.attr({
                    d: u
                }), K && a.objectEach(K, function(a, d) {
                    m.on(d, function(a) {
                        K[d].apply(h, [a])
                    })
                })) : m && (u ? (m.show(), m.animate({
                    d: u
                })) : (m.hide(), f && (h.label = f = f.destroy())));
                b && r(b.text) && u && u.length && 0 < g.width && 0 < g.height && !u.flat ? (b = q({
                    align: c && B && "center",
                    x: c ? !B && 4 : 10,
                    verticalAlign: !c && B && "middle",
                    y: c ? B ? 16 : 10 : B ? 6 : -4,
                    rotation: c &&
                        !B && 90
                }, b), this.renderLabel(b, u, B, I)) : f && f.hide();
                return h
            },
            renderLabel: function(a, g, c, l) {
                var b = this.label,
                    f = this.axis.chart.renderer;
                b || (b = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (c ? "band" : "line") + "-label " + (a.className || "")
                }, b.zIndex = l, this.label = b = f.text(a.text, 0, 0, a.useHTML).attr(b).add(), b.css(a.style));
                l = g.xBounds || [g[1], g[4], c ? g[6] : g[1]];
                g = g.yBounds || [g[2], g[5], c ? g[7] : g[2]];
                c = E(l);
                f = E(g);
                b.align(a, !1, {
                    x: c,
                    y: f,
                    width: G(l) - c,
                    height: G(g) - f
                });
                b.show()
            },
            destroy: function() {
                x(this.axis.plotLinesAndBands,
                    this);
                delete this.axis;
                n(this)
            }
        };
        a.extend(C.prototype, {
            getPlotBandPath: function(a, g) {
                var c = this.getPlotLinePath(g, null, null, !0),
                    l = this.getPlotLinePath(a, null, null, !0),
                    b = [],
                    f = this.horiz,
                    p = 1,
                    t;
                a = a < this.min && g < this.min || a > this.max && g > this.max;
                if (l && c)
                    for (a && (t = l.toString() === c.toString(), p = 0), a = 0; a < l.length; a += 6) f && c[a + 1] === l[a + 1] ? (c[a + 1] += p, c[a + 4] += p) : f || c[a + 2] !== l[a + 2] || (c[a + 2] += p, c[a + 5] += p), b.push("M", l[a + 1], l[a + 2], "L", l[a + 4], l[a + 5], c[a + 4], c[a + 5], c[a + 1], c[a + 2], "z"), b.flat = t;
                return b
            },
            addPlotBand: function(a) {
                return this.addPlotBandOrLine(a,
                    "plotBands")
            },
            addPlotLine: function(a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function(h, g) {
                var c = (new a.PlotLineOrBand(this, h)).render(),
                    l = this.userOptions;
                c && (g && (l[g] = l[g] || [], l[g].push(h)), this.plotLinesAndBands.push(c));
                return c
            },
            removePlotBandOrLine: function(a) {
                for (var g = this.plotLinesAndBands, c = this.options, l = this.userOptions, b = g.length; b--;) g[b].id === a && g[b].destroy();
                h([c.plotLines || [], l.plotLines || [], c.plotBands || [], l.plotBands || []], function(f) {
                    for (b = f.length; b--;) f[b].id ===
                        a && x(f, f[b])
                })
            },
            removePlotBand: function(a) {
                this.removePlotBandOrLine(a)
            },
            removePlotLine: function(a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(L, da);
    (function(a) {
        var C = a.each,
            G = a.extend,
            E = a.format,
            r = a.isNumber,
            n = a.map,
            h = a.merge,
            x = a.pick,
            q = a.splat,
            v = a.syncTimeout,
            y = a.timeUnits;
        a.Tooltip = function() {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function(a, c) {
                this.chart = a;
                this.options = c;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = c.split && !a.inverted;
                this.shared = c.shared || this.split
            },
            cleanSplit: function(a) {
                C(this.chart.series, function(c) {
                    var g = c && c.tt;
                    g && (!g.isActive || a ? c.tt = g.destroy() : g.isActive = !1)
                })
            },
            getLabel: function() {
                var a = this.chart.renderer,
                    c = this.options;
                this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, c.shape || "callout", null, null, c.useHTML, null, "tooltip").attr({
                    padding: c.padding,
                    r: c.borderRadius
                }), this.label.attr({
                    fill: c.backgroundColor,
                    "stroke-width": c.borderWidth
                }).css(c.style).shadow(c.shadow)), this.label.attr({
                    zIndex: 8
                }).add());
                return this.label
            },
            update: function(a) {
                this.destroy();
                h(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, h(!0, this.options, a))
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            },
            move: function(a, c, l, b) {
                var f = this,
                    p = f.now,
                    t = !1 !== f.options.animation && !f.isHidden && (1 < Math.abs(a - p.x) || 1 < Math.abs(c - p.y)),
                    e = f.followPointer || 1 < f.len;
                G(p, {
                    x: t ? (2 * p.x + a) /
                        3 : a,
                    y: t ? (p.y + c) / 2 : c,
                    anchorX: e ? void 0 : t ? (2 * p.anchorX + l) / 3 : l,
                    anchorY: e ? void 0 : t ? (p.anchorY + b) / 2 : b
                });
                f.getLabel().attr(p);
                t && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    f && f.move(a, c, l, b)
                }, 32))
            },
            hide: function(a) {
                var c = this;
                clearTimeout(this.hideTimer);
                a = x(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = v(function() {
                    c.getLabel()[a ? "fadeOut" : "hide"]();
                    c.isHidden = !0
                }, a))
            },
            getAnchor: function(a, c) {
                var g, b = this.chart,
                    f = b.inverted,
                    p = b.plotTop,
                    t = b.plotLeft,
                    e = 0,
                    B =
                    0,
                    D, m;
                a = q(a);
                g = a[0].tooltipPos;
                this.followPointer && c && (void 0 === c.chartX && (c = b.pointer.normalize(c)), g = [c.chartX - b.plotLeft, c.chartY - p]);
                g || (C(a, function(a) {
                    D = a.series.yAxis;
                    m = a.series.xAxis;
                    e += a.plotX + (!f && m ? m.left - t : 0);
                    B += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!f && D ? D.top - p : 0)
                }), e /= a.length, B /= a.length, g = [f ? b.plotWidth - B : e, this.shared && !f && 1 < a.length && c ? c.chartY - p : f ? b.plotHeight - e : B]);
                return n(g, Math.round)
            },
            getPosition: function(a, c, l) {
                var b = this.chart,
                    f = this.distance,
                    p = {},
                    t = b.inverted &&
                    l.h || 0,
                    e, g = ["y", b.chartHeight, c, l.plotY + b.plotTop, b.plotTop, b.plotTop + b.plotHeight],
                    D = ["x", b.chartWidth, a, l.plotX + b.plotLeft, b.plotLeft, b.plotLeft + b.plotWidth],
                    m = !this.followPointer && x(l.ttBelow, !b.inverted === !!l.negative),
                    A = function(a, d, b, e, k, c) {
                        var w = b < e - f,
                            u = e + f + b < d,
                            g = e - f - b;
                        e += f;
                        if (m && u) p[a] = e;
                        else if (!m && w) p[a] = g;
                        else if (w) p[a] = Math.min(c - b, 0 > g - t ? g : g - t);
                        else if (u) p[a] = Math.max(k, e + t + b > d ? e : e + t);
                        else return !1
                    },
                    u = function(a, d, b, e) {
                        var k;
                        e < f || e > d - f ? k = !1 : p[a] = e < b / 2 ? 1 : e > d - b / 2 ? d - b - 2 : e - b / 2;
                        return k
                    },
                    H =
                    function(a) {
                        var d = g;
                        g = D;
                        D = d;
                        e = a
                    },
                    I = function() {
                        !1 !== A.apply(0, g) ? !1 !== u.apply(0, D) || e || (H(!0), I()) : e ? p.x = p.y = 0 : (H(!0), I())
                    };
                (b.inverted || 1 < this.len) && H();
                I();
                return p
            },
            defaultFormatter: function(a) {
                var c = this.points || q(this),
                    g;
                g = [a.tooltipFooterHeaderFormatter(c[0])];
                g = g.concat(a.bodyFormatter(c));
                g.push(a.tooltipFooterHeaderFormatter(c[0], !0));
                return g
            },
            refresh: function(a, c) {
                var g, b = this.options,
                    f, p = a,
                    t, e = {},
                    B = [];
                g = b.formatter || this.defaultFormatter;
                var e = this.shared,
                    D;
                b.enabled && (clearTimeout(this.hideTimer),
                    this.followPointer = q(p)[0].series.tooltipOptions.followPointer, t = this.getAnchor(p, c), c = t[0], f = t[1], !e || p.series && p.series.noSharedTooltip ? e = p.getLabelConfig() : (C(p, function(a) {
                        a.setState("hover");
                        B.push(a.getLabelConfig())
                    }), e = {
                        x: p[0].category,
                        y: p[0].y
                    }, e.points = B, p = p[0]), this.len = B.length, e = g.call(e, this), D = p.series, this.distance = x(D.tooltipOptions.distance, 16), !1 === e ? this.hide() : (g = this.getLabel(), this.isHidden && g.attr({
                        opacity: 1
                    }).show(), this.split ? this.renderSplit(e, q(a)) : (b.style.width || g.css({
                            width: this.chart.spacingBox.width
                        }),
                        g.attr({
                            text: e && e.join ? e.join("") : e
                        }), g.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + x(p.colorIndex, D.colorIndex)), g.attr({
                            stroke: b.borderColor || p.color || D.color || "#666666"
                        }), this.updatePosition({
                            plotX: c,
                            plotY: f,
                            negative: p.negative,
                            ttBelow: p.ttBelow,
                            h: t[2] || 0
                        })), this.isHidden = !1))
            },
            renderSplit: function(g, c) {
                var l = this,
                    b = [],
                    f = this.chart,
                    p = f.renderer,
                    t = !0,
                    e = this.options,
                    B = 0,
                    D = this.getLabel();
                a.isString(g) && (g = [!1, g]);
                C(g.slice(0, c.length + 1), function(a, g) {
                    if (!1 !== a) {
                        g = c[g - 1] || {
                            isHeader: !0,
                            plotX: c[0].plotX
                        };
                        var m = g.series || l,
                            A = m.tt,
                            I = g.series || {},
                            K = "highcharts-color-" + x(g.colorIndex, I.colorIndex, "none");
                        A || (m.tt = A = p.label(null, null, null, "callout", null, null, e.useHTML).addClass("highcharts-tooltip-box " + K).attr({
                            padding: e.padding,
                            r: e.borderRadius,
                            fill: e.backgroundColor,
                            stroke: e.borderColor || g.color || I.color || "#333333",
                            "stroke-width": e.borderWidth
                        }).add(D));
                        A.isActive = !0;
                        A.attr({
                            text: a
                        });
                        A.css(e.style).shadow(e.shadow);
                        a = A.getBBox();
                        I = a.width + A.strokeWidth();
                        g.isHeader ? (B =
                            a.height, I = Math.max(0, Math.min(g.plotX + f.plotLeft - I / 2, f.chartWidth - I))) : I = g.plotX + f.plotLeft - x(e.distance, 16) - I;
                        0 > I && (t = !1);
                        a = (g.series && g.series.yAxis && g.series.yAxis.pos) + (g.plotY || 0);
                        a -= f.plotTop;
                        b.push({
                            target: g.isHeader ? f.plotHeight + B : a,
                            rank: g.isHeader ? 1 : 0,
                            size: m.tt.getBBox().height + 1,
                            point: g,
                            x: I,
                            tt: A
                        })
                    }
                });
                this.cleanSplit();
                a.distribute(b, f.plotHeight + B);
                C(b, function(a) {
                    var b = a.point,
                        c = b.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: t || b.isHeader ? a.x : b.plotX + f.plotLeft + x(e.distance,
                            16),
                        y: a.pos + f.plotTop,
                        anchorX: b.isHeader ? b.plotX + f.plotLeft : b.plotX + c.xAxis.pos,
                        anchorY: b.isHeader ? a.pos + f.plotTop - 15 : b.plotY + c.yAxis.pos
                    })
                })
            },
            updatePosition: function(a) {
                var c = this.chart,
                    g = this.getLabel(),
                    g = (this.options.positioner || this.getPosition).call(this, g.width, g.height, a);
                this.move(Math.round(g.x), Math.round(g.y || 0), a.plotX + c.plotLeft, a.plotY + c.plotTop)
            },
            getDateFormat: function(a, c, l, b) {
                var f = this.chart.time,
                    p = f.dateFormat("%m-%d %H:%M:%S.%L", c),
                    t, e, g = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    D = "millisecond";
                for (e in y) {
                    if (a === y.week && +f.dateFormat("%w", c) === l && "00:00:00.000" === p.substr(6)) {
                        e = "week";
                        break
                    }
                    if (y[e] > a) {
                        e = D;
                        break
                    }
                    if (g[e] && p.substr(g[e]) !== "01-01 00:00:00.000".substr(g[e])) break;
                    "week" !== e && (D = e)
                }
                e && (t = b[e]);
                return t
            },
            getXDateFormat: function(a, c, l) {
                c = c.dateTimeLabelFormats;
                var b = l && l.closestPointRange;
                return (b ? this.getDateFormat(b, a.x, l.options.startOfWeek, c) : c.day) || c.year
            },
            tooltipFooterHeaderFormatter: function(a, c) {
                c = c ? "footer" : "header";
                var g = a.series,
                    b = g.tooltipOptions,
                    f = b.xDateFormat,
                    p = g.xAxis,
                    t = p && "datetime" === p.options.type && r(a.key),
                    e = b[c + "Format"];
                t && !f && (f = this.getXDateFormat(a, b, p));
                t && f && C(a.point && a.point.tooltipDateKeys || ["key"], function(a) {
                    e = e.replace("{point." + a + "}", "{point." + a + ":" + f + "}")
                });
                return E(e, {
                    point: a,
                    series: g
                }, this.chart.time)
            },
            bodyFormatter: function(a) {
                return n(a, function(a) {
                    var c = a.series.tooltipOptions;
                    return (c[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, c[(a.point.formatPrefix || "point") + "Format"])
                })
            }
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.attr,
            E = a.charts,
            r = a.color,
            n = a.css,
            h = a.defined,
            x = a.each,
            q = a.extend,
            v = a.find,
            y = a.fireEvent,
            g = a.isNumber,
            c = a.isObject,
            l = a.offset,
            b = a.pick,
            f = a.splat,
            p = a.Tooltip;
        a.Pointer = function(a, b) {
            this.init(a, b)
        };
        a.Pointer.prototype = {
            init: function(a, e) {
                this.options = e;
                this.chart = a;
                this.runChartClick = e.chart.events && !!e.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                p && (a.tooltip = new p(a, e.tooltip), this.followTouchMove = b(e.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function(a) {
                var e = this.chart,
                    f = e.options.chart,
                    c = f.zoomType || "",
                    e = e.inverted;
                /touch/.test(a.type) && (c = b(f.pinchType, c));
                this.zoomX = a = /x/.test(c);
                this.zoomY = c = /y/.test(c);
                this.zoomHor = a && !e || c && e;
                this.zoomVert = c && !e || a && e;
                this.hasZoom = a || c
            },
            normalize: function(a, b) {
                var e;
                e = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = l(this.chart.container));
                return q(a, {
                    chartX: Math.round(e.pageX - b.left),
                    chartY: Math.round(e.pageY - b.top)
                })
            },
            getCoordinates: function(a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                x(this.chart.axes, function(e) {
                    b[e.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: e,
                        value: e.toValue(a[e.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            },
            findNearestKDPoint: function(a, b, f) {
                var e;
                x(a, function(a) {
                    var m = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(f, m);
                    if ((m = c(a, !0)) && !(m = !c(e, !0))) var m = e.distX - a.distX,
                        p = e.dist - a.dist,
                        t = (a.series.group && a.series.group.zIndex) - (e.series.group && e.series.group.zIndex),
                        m = 0 < (0 !== m && b ? m : 0 !== p ? p : 0 !== t ? t : e.series.index >
                            a.series.index ? -1 : 1);
                    m && (e = a)
                });
                return e
            },
            getPointFromEvent: function(a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            },
            getChartCoordinatesFromPoint: function(a, e) {
                var f = a.series,
                    c = f.xAxis,
                    f = f.yAxis,
                    m = b(a.clientX, a.plotX);
                if (c && f) return e ? {
                    chartX: c.len + c.pos - m,
                    chartY: f.len + f.pos - a.plotY
                } : {
                    chartX: m + c.pos,
                    chartY: a.plotY + f.pos
                }
            },
            getHoverData: function(f, e, p, g, m, A, u) {
                var t, I = [],
                    B = u && u.isBoosting;
                g = !(!g || !f);
                u = e && !e.stickyTracking ? [e] : a.grep(p, function(a) {
                    return a.visible && !(!m && a.directTouch) &&
                        b(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                e = (t = g ? f : this.findNearestKDPoint(u, m, A)) && t.series;
                t && (m && !e.noSharedTooltip ? (u = a.grep(p, function(a) {
                    return a.visible && !(!m && a.directTouch) && b(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), x(u, function(a) {
                    var d = v(a.points, function(a) {
                        return a.x === t.x && !a.isNull
                    });
                    c(d) && (B && (d = a.getPoint(d)), I.push(d))
                })) : I.push(t));
                return {
                    hoverPoint: t,
                    hoverSeries: e,
                    hoverPoints: I
                }
            },
            runPointActions: function(f, e) {
                var c = this.chart,
                    p = c.tooltip && c.tooltip.options.enabled ?
                    c.tooltip : void 0,
                    m = p ? p.shared : !1,
                    g = e || c.hoverPoint,
                    u = g && g.series || c.hoverSeries,
                    u = this.getHoverData(g, u, c.series, !!e || u && u.directTouch && this.isDirectTouch, m, f, {
                        isBoosting: c.isBoosting
                    }),
                    t, g = u.hoverPoint;
                t = u.hoverPoints;
                e = (u = u.hoverSeries) && u.tooltipOptions.followPointer;
                m = m && u && !u.noSharedTooltip;
                if (g && (g !== c.hoverPoint || p && p.isHidden)) {
                    x(c.hoverPoints || [], function(b) {
                        -1 === a.inArray(b, t) && b.setState()
                    });
                    x(t || [], function(a) {
                        a.setState("hover")
                    });
                    if (c.hoverSeries !== u) u.onMouseOver();
                    c.hoverPoint && c.hoverPoint.firePointEvent("mouseOut");
                    if (!g.series) return;
                    g.firePointEvent("mouseOver");
                    c.hoverPoints = t;
                    c.hoverPoint = g;
                    p && p.refresh(m ? t : g, f)
                } else e && p && !p.isHidden && (g = p.getAnchor([{}], f), p.updatePosition({
                    plotX: g[0],
                    plotY: g[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = C(c.container.ownerDocument, "mousemove", function(b) {
                    var e = E[a.hoverChartIndex];
                    if (e) e.pointer.onDocumentMouseMove(b)
                }));
                x(c.axes, function(e) {
                    var c = b(e.crosshair.snap, !0),
                        d = c ? a.find(t, function(a) {
                            return a.series[e.coll] === e
                        }) : void 0;
                    d || !c ? e.drawCrosshair(f, d) : e.hideCrosshair()
                })
            },
            reset: function(a, b) {
                var e = this.chart,
                    c = e.hoverSeries,
                    m = e.hoverPoint,
                    p = e.hoverPoints,
                    g = e.tooltip,
                    t = g && g.shared ? p : m;
                a && t && x(f(t), function(b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) g && t && (g.refresh(t), m && (m.setState(m.state, !0), x(e.axes, function(a) {
                    a.crosshair && a.drawCrosshair(null, m)
                })));
                else {
                    if (m) m.onMouseOut();
                    p && x(p, function(a) {
                        a.setState()
                    });
                    if (c) c.onMouseOut();
                    g && g.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    x(e.axes, function(a) {
                        a.hideCrosshair()
                    });
                    this.hoverX =
                        e.hoverPoints = e.hoverPoint = null
                }
            },
            scaleGroups: function(a, b) {
                var e = this.chart,
                    f;
                x(e.series, function(c) {
                    f = a || c.getPlotBox();
                    c.xAxis && c.xAxis.zoomEnabled && c.group && (c.group.attr(f), c.markerGroup && (c.markerGroup.attr(f), c.markerGroup.clip(b ? e.clipRect : null)), c.dataLabelsGroup && c.dataLabelsGroup.attr(f))
                });
                e.clipRect.attr(b || e.clipBox)
            },
            dragStart: function(a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function(a) {
                var b =
                    this.chart,
                    f = b.options.chart,
                    c = a.chartX,
                    m = a.chartY,
                    p = this.zoomHor,
                    g = this.zoomVert,
                    t = b.plotLeft,
                    I = b.plotTop,
                    l = b.plotWidth,
                    d = b.plotHeight,
                    w, F = this.selectionMarker,
                    k = this.mouseDownX,
                    z = this.mouseDownY,
                    h = f.panKey && a[f.panKey + "Key"];
                F && F.touch || (c < t ? c = t : c > t + l && (c = t + l), m < I ? m = I : m > I + d && (m = I + d), this.hasDragged = Math.sqrt(Math.pow(k - c, 2) + Math.pow(z - m, 2)), 10 < this.hasDragged && (w = b.isInsidePlot(k - t, z - I), b.hasCartesianSeries && (this.zoomX || this.zoomY) && w && !h && !F && (this.selectionMarker = F = b.renderer.rect(t, I, p ? 1 : l,
                    g ? 1 : d, 0).attr({
                    fill: f.selectionMarkerFill || r("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), F && p && (c -= k, F.attr({
                    width: Math.abs(c),
                    x: (0 < c ? 0 : c) + k
                })), F && g && (c = m - z, F.attr({
                    height: Math.abs(c),
                    y: (0 < c ? 0 : c) + z
                })), w && !F && f.panning && b.pan(a, f.panning)))
            },
            drop: function(a) {
                var b = this,
                    f = this.chart,
                    c = this.hasPinched;
                if (this.selectionMarker) {
                    var m = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        p = this.selectionMarker,
                        t = p.attr ? p.attr("x") : p.x,
                        l = p.attr ? p.attr("y") : p.y,
                        I = p.attr ? p.attr("width") :
                        p.width,
                        K = p.attr ? p.attr("height") : p.height,
                        d;
                    if (this.hasDragged || c) x(f.axes, function(e) {
                        if (e.zoomEnabled && h(e.min) && (c || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[e.coll]])) {
                            var f = e.horiz,
                                k = "touchend" === a.type ? e.minPixelPadding : 0,
                                w = e.toValue((f ? t : l) + k),
                                f = e.toValue((f ? t + I : l + K) - k);
                            m[e.coll].push({
                                axis: e,
                                min: Math.min(w, f),
                                max: Math.max(w, f)
                            });
                            d = !0
                        }
                    }), d && y(f, "selection", m, function(a) {
                        f.zoom(q(a, c ? {
                            animation: !1
                        } : null))
                    });
                    g(f.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    c && this.scaleGroups()
                }
                f && g(f.index) &&
                    (n(f.container, {
                        cursor: f._cursor
                    }), f.cancelClick = 10 < this.hasDragged, f.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(a) {
                2 !== a.button && (a = this.normalize(a), this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            },
            onDocumentMouseUp: function(b) {
                E[a.hoverChartIndex] && E[a.hoverChartIndex].pointer.drop(b)
            },
            onDocumentMouseMove: function(a) {
                var b = this.chart,
                    f = this.chartPosition;
                a = this.normalize(a, f);
                !f || this.inClass(a.target, "highcharts-tracker") ||
                    b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function(b) {
                var e = E[a.hoverChartIndex];
                e && (b.relatedTarget || b.toElement) && (e.pointer.reset(), e.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(b) {
                var e = this.chart;
                h(a.hoverChartIndex) && E[a.hoverChartIndex] && E[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = e.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === e.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !e.isInsidePlot(b.chartX -
                    e.plotLeft, b.chartY - e.plotTop) || e.openMenu || this.runPointActions(b)
            },
            inClass: function(a, b) {
                for (var e; a;) {
                    if (e = G(a, "class")) {
                        if (-1 !== e.indexOf(b)) return !0;
                        if (-1 !== e.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function(a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function(a) {
                var b = this.chart,
                    f = b.hoverPoint,
                    c = b.plotLeft,
                    p = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (f && this.inClass(a.target, "highcharts-tracker") ? (y(f.series, "click", q(a, {
                    point: f
                })), b.hoverPoint && f.firePointEvent("click", a)) : (q(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - c, a.chartY - p) && y(b, "click", a)))
            },
            setDOMEvents: function() {
                var b = this,
                    e = b.chart.container,
                    f = e.ownerDocument;
                e.onmousedown = function(a) {
                    b.onContainerMouseDown(a)
                };
                e.onmousemove = function(a) {
                    b.onContainerMouseMove(a)
                };
                e.onclick = function(a) {
                    b.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = C(e, "mouseleave", b.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = C(f, "mouseup", b.onDocumentMouseUp));
                a.hasTouch && (e.ontouchstart = function(a) {
                    b.onContainerTouchStart(a)
                }, e.ontouchmove = function(a) {
                    b.onContainerTouchMove(a)
                }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = C(f, "touchend", b.onDocumentTouchEnd)))
            },
            destroy: function() {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function(a, f) {
                    b[f] = null
                })
            }
        }
    })(L);
    (function(a) {
        var C = a.charts,
            G = a.each,
            E = a.extend,
            r = a.map,
            n = a.noop,
            h = a.pick;
        E(a.Pointer.prototype, {
            pinchTranslate: function(a, h, n, r, g, c) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, h, n, r, g, c);
                this.zoomVert && this.pinchTranslateDirection(!1, a, h, n, r,
                    g, c)
            },
            pinchTranslateDirection: function(a, h, n, r, g, c, l, b) {
                var f = this.chart,
                    p = a ? "x" : "y",
                    t = a ? "X" : "Y",
                    e = "chart" + t,
                    B = a ? "width" : "height",
                    D = f["plot" + (a ? "Left" : "Top")],
                    m, A, u = b || 1,
                    H = f.inverted,
                    I = f.bounds[a ? "h" : "v"],
                    K = 1 === h.length,
                    d = h[0][e],
                    w = n[0][e],
                    F = !K && h[1][e],
                    k = !K && n[1][e],
                    z;
                n = function() {
                    !K && 20 < Math.abs(d - F) && (u = b || Math.abs(w - k) / Math.abs(d - F));
                    A = (D - w) / u + d;
                    m = f["plot" + (a ? "Width" : "Height")] / u
                };
                n();
                h = A;
                h < I.min ? (h = I.min, z = !0) : h + m > I.max && (h = I.max - m, z = !0);
                z ? (w -= .8 * (w - l[p][0]), K || (k -= .8 * (k - l[p][1])), n()) : l[p] = [w, k];
                H || (c[p] = A - D, c[B] = m);
                c = H ? 1 / u : u;
                g[B] = m;
                g[p] = h;
                r[H ? a ? "scaleY" : "scaleX" : "scale" + t] = u;
                r["translate" + t] = c * D + (w - c * d)
            },
            pinch: function(a) {
                var q = this,
                    v = q.chart,
                    x = q.pinchDown,
                    g = a.touches,
                    c = g.length,
                    l = q.lastValidTouch,
                    b = q.hasZoom,
                    f = q.selectionMarker,
                    p = {},
                    t = 1 === c && (q.inClass(a.target, "highcharts-tracker") && v.runTrackerClick || q.runChartClick),
                    e = {};
                1 < c && (q.initiated = !0);
                b && q.initiated && !t && a.preventDefault();
                r(g, function(a) {
                    return q.normalize(a)
                });
                "touchstart" === a.type ? (G(g, function(a, b) {
                    x[b] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), l.x = [x[0].chartX, x[1] && x[1].chartX], l.y = [x[0].chartY, x[1] && x[1].chartY], G(v.axes, function(a) {
                    if (a.zoomEnabled) {
                        var b = v.bounds[a.horiz ? "h" : "v"],
                            e = a.minPixelPadding,
                            f = a.toPixels(h(a.options.min, a.dataMin)),
                            c = a.toPixels(h(a.options.max, a.dataMax)),
                            p = Math.max(f, c);
                        b.min = Math.min(a.pos, Math.min(f, c) - e);
                        b.max = Math.max(a.pos + a.len, p + e)
                    }
                }), q.res = !0) : q.followTouchMove && 1 === c ? this.runPointActions(q.normalize(a)) : x.length && (f || (q.selectionMarker = f = E({
                    destroy: n,
                    touch: !0
                }, v.plotBox)), q.pinchTranslate(x,
                    g, p, f, e, l), q.hasPinched = b, q.scaleGroups(p, e), q.res && (q.res = !1, this.reset(!1, 0)))
            },
            touch: function(n, q) {
                var v = this.chart,
                    r, g;
                if (v.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                a.hoverChartIndex = v.index;
                1 === n.touches.length ? (n = this.normalize(n), (g = v.isInsidePlot(n.chartX - v.plotLeft, n.chartY - v.plotTop)) && !v.openMenu ? (q && this.runPointActions(n), "touchmove" === n.type && (q = this.pinchDown, r = q[0] ? 4 <= Math.sqrt(Math.pow(q[0].chartX - n.chartX, 2) + Math.pow(q[0].chartY - n.chartY, 2)) : !1), h(r, !0) && this.pinch(n)) : q && this.reset()) : 2 === n.touches.length && this.pinch(n)
            },
            onContainerTouchStart: function(a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function(a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function(h) {
                C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(h)
            }
        })
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.charts,
            E = a.css,
            r = a.doc,
            n = a.extend,
            h = a.noop,
            x = a.Pointer,
            q = a.removeEvent,
            v = a.win,
            y = a.wrap;
        if (!a.hasTouch && (v.PointerEvent || v.MSPointerEvent)) {
            var g = {},
                c = !!v.PointerEvent,
                l = function() {
                    var b = [];
                    b.item = function(a) {
                        return this[a]
                    };
                    a.objectEach(g, function(a) {
                        b.push({
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.target
                        })
                    });
                    return b
                },
                b = function(b, c, g, e) {
                    "touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !G[a.hoverChartIndex] || (e(b), e = G[a.hoverChartIndex].pointer, e[c]({
                        type: g,
                        target: b.currentTarget,
                        preventDefault: h,
                        touches: l()
                    }))
                };
            n(x.prototype, {
                onContainerPointerDown: function(a) {
                    b(a, "onContainerTouchStart", "touchstart", function(a) {
                        g[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function(a) {
                    b(a, "onContainerTouchMove", "touchmove", function(a) {
                        g[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        g[a.pointerId].target || (g[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function(a) {
                    b(a, "onDocumentTouchEnd", "touchend", function(a) {
                        delete g[a.pointerId]
                    })
                },
                batchMSEvents: function(a) {
                    a(this.chart.container, c ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, c ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(r, c ?
                        "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            y(x.prototype, "init", function(a, b, c) {
                a.call(this, b, c);
                this.hasZoom && E(b.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            y(x.prototype, "setDOMEvents", function(a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(C)
            });
            y(x.prototype, "destroy", function(a) {
                this.batchMSEvents(q);
                a.call(this)
            })
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.css,
            E = a.discardElement,
            r = a.defined,
            n = a.each,
            h = a.isFirefox,
            x = a.marginNames,
            q = a.merge,
            v = a.pick,
            y = a.setAnimation,
            g = a.stableSort,
            c = a.win,
            l = a.wrap;
        a.Legend = function(a, f) {
            this.init(a, f)
        };
        a.Legend.prototype = {
            init: function(a, f) {
                this.chart = a;
                this.setOptions(f);
                f.enabled && (this.render(), C(this.chart, "endResize", function() {
                    this.legend.positionCheckboxes()
                }))
            },
            setOptions: function(a) {
                var b = v(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = q(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.itemHeight =
                    this.maxItemWidth = 0;
                this.symbolWidth = v(a.symbolWidth, 16);
                this.pages = []
            },
            update: function(a, f) {
                var b = this.chart;
                this.setOptions(q(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                v(f, !0) && b.redraw()
            },
            colorizeItem: function(a, f) {
                a.legendGroup[f ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var b = this.options,
                    c = a.legendItem,
                    e = a.legendLine,
                    g = a.legendSymbol,
                    l = this.itemHiddenStyle.color,
                    b = f ? b.itemStyle.color : l,
                    m = f ? a.color || l : l,
                    A = a.options && a.options.marker,
                    u = {
                        fill: m
                    };
                c && c.css({
                    fill: b,
                    color: b
                });
                e && e.attr({
                    stroke: m
                });
                g && (A && g.isMarker && (u = a.pointAttribs(), f || (u.stroke = u.fill = l)), g.attr(u))
            },
            positionItem: function(a) {
                var b = this.options,
                    c = b.symbolPadding,
                    b = !b.rtl,
                    g = a._legendItemPos,
                    e = g[0],
                    g = g[1],
                    l = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(b ? e : this.legendWidth - e - 2 * c - 4, g);
                l && (l.x = e, l.y = g)
            },
            destroyItem: function(a) {
                var b = a.checkbox;
                n(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && E(a.checkbox)
            },
            destroy: function() {
                function a(a) {
                    this[a] &&
                        (this[a] = this[a].destroy())
                }
                n(this.getAllItems(), function(b) {
                    n(["legendItem", "legendGroup"], a, b)
                });
                n("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            },
            positionCheckboxes: function() {
                var a = this.group && this.group.alignAttr,
                    f, c = this.clipHeight || this.legendHeight,
                    g = this.titleHeight;
                a && (f = a.translateY, n(this.allItems, function(b) {
                    var e = b.checkbox,
                        p;
                    e && (p = f + g + e.y + (this.scrollOffset || 0) + 3, G(e, {
                        left: a.translateX + b.checkboxOffset + e.x - 20 + "px",
                        top: p + "px",
                        display: p > f - 6 && p < f + c - 6 ?
                            "" : "none"
                    }))
                }, this))
            },
            renderTitle: function() {
                var a = this.options,
                    f = this.padding,
                    c = a.title,
                    g = 0;
                c.text && (this.title || (this.title = this.chart.renderer.label(c.text, f - 3, f - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }).css(c.style).add(this.group)), a = this.title.getBBox(), g = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: g
                }));
                this.titleHeight = g
            },
            setText: function(b) {
                var f = this.options;
                b.legendItem.attr({
                    text: f.labelFormat ? a.format(f.labelFormat, b, this.chart.time) : f.labelFormatter.call(b)
                })
            },
            renderItem: function(a) {
                var b = this.chart,
                    c = b.renderer,
                    g = this.options,
                    e = "horizontal" === g.layout,
                    l = this.symbolWidth,
                    h = g.symbolPadding,
                    m = this.itemStyle,
                    A = this.itemHiddenStyle,
                    u = this.padding,
                    n = e ? v(g.itemDistance, 20) : 0,
                    I = !g.rtl,
                    K = g.width,
                    d = g.itemMarginBottom || 0,
                    w = this.itemMarginTop,
                    F = a.legendItem,
                    k = !a.series,
                    z = !k && a.series.drawLegendSymbol ? a.series : a,
                    r = z.options,
                    N = this.createCheckboxForItem && r && r.showCheckbox,
                    r = l + h + n + (N ? 20 : 0),
                    M = g.useHTML,
                    P = a.options.className;
                F || (a.legendGroup = c.g("legend-item").addClass("highcharts-" +
                        z.type + "-series highcharts-color-" + a.colorIndex + (P ? " " + P : "") + (k ? " highcharts-series-" + a.index : "")).attr({
                        zIndex: 1
                    }).add(this.scrollGroup), a.legendItem = F = c.text("", I ? l + h : -h, this.baseline || 0, M).css(q(a.visible ? m : A)).attr({
                        align: I ? "left" : "right",
                        zIndex: 2
                    }).add(a.legendGroup), this.baseline || (l = m.fontSize, this.fontMetrics = c.fontMetrics(l, F), this.baseline = this.fontMetrics.f + 3 + w, F.attr("y", this.baseline)), this.symbolHeight = g.symbolHeight || this.fontMetrics.f, z.drawLegendSymbol(this, a), this.setItemEvents &&
                    this.setItemEvents(a, F, M), N && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                m.width || F.css({
                    width: (g.itemWidth || g.width || b.spacingBox.width) - r
                });
                this.setText(a);
                c = F.getBBox();
                m = a.checkboxOffset = g.itemWidth || a.legendItemWidth || c.width + r;
                this.itemHeight = c = Math.round(a.legendItemHeight || c.height || this.symbolHeight);
                e && this.itemX - u + m > (K || b.spacingBox.width - 2 * u - g.x) && (this.itemX = u, this.itemY += w + this.lastLineHeight + d, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, m);
                this.lastItemY = w + this.itemY + d;
                this.lastLineHeight = Math.max(c, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                e ? this.itemX += m : (this.itemY += w + c + d, this.lastLineHeight = c);
                this.offsetWidth = K || Math.max((e ? this.itemX - u - (a.checkbox ? 0 : n) : m) + u, this.offsetWidth)
            },
            getAllItems: function() {
                var a = [];
                n(this.chart.series, function(b) {
                    var c = b && b.options;
                    b && v(c.showInLegend, r(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
                });
                return a
            },
            getAlignment: function() {
                var a =
                    this.options;
                return a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            },
            adjustMargins: function(a, c) {
                var b = this.chart,
                    f = this.options,
                    e = this.getAlignment();
                e && n([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(g, p) {
                    g.test(e) && !r(a[p]) && (b[x[p]] = Math.max(b[x[p]], b.legend[(p + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][p] * f[p % 2 ? "x" : "y"] + v(f.margin, 12) + c[p] + (0 === p ? b.titleOffset + b.options.title.margin : 0)))
                })
            },
            render: function() {
                var a = this,
                    c = a.chart,
                    p = c.renderer,
                    l = a.group,
                    e, B, h, m, A = a.box,
                    u = a.options,
                    H = a.padding;
                a.itemX = H;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                l || (a.group = l = p.g("legend").attr({
                    zIndex: 7
                }).add(), a.contentGroup = p.g().attr({
                    zIndex: 1
                }).add(l), a.scrollGroup = p.g().add(a.contentGroup));
                a.renderTitle();
                e = a.getAllItems();
                g(e, function(a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                u.reversed && e.reverse();
                a.allItems = e;
                a.display = B = !!e.length;
                a.lastLineHeight = 0;
                n(e, function(b) {
                    a.renderItem(b)
                });
                h =
                    (u.width || a.offsetWidth) + H;
                m = a.lastItemY + a.lastLineHeight + a.titleHeight;
                m = a.handleOverflow(m);
                m += H;
                A || (a.box = A = p.rect().addClass("highcharts-legend-box").attr({
                    r: u.borderRadius
                }).add(l), A.isNew = !0);
                A.attr({
                    stroke: u.borderColor,
                    "stroke-width": u.borderWidth || 0,
                    fill: u.backgroundColor || "none"
                }).shadow(u.shadow);
                0 < h && 0 < m && (A[A.isNew ? "attr" : "animate"](A.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: h,
                    height: m
                }, A.strokeWidth())), A.isNew = !1);
                A[B ? "show" : "hide"]();
                a.legendWidth = h;
                a.legendHeight = m;
                n(e, function(b) {
                    a.positionItem(b)
                });
                B && (p = c.spacingBox, /(lth|ct|rth)/.test(a.getAlignment()) && (p = q(p, {
                    y: p.y + c.titleOffset + c.options.title.margin
                })), l.align(q(u, {
                    width: h,
                    height: m
                }), !0, p));
                c.isResizing || this.positionCheckboxes()
            },
            handleOverflow: function(a) {
                var b = this,
                    c = this.chart,
                    g = c.renderer,
                    e = this.options,
                    l = e.y,
                    h = this.padding,
                    c = c.spacingBox.height + ("top" === e.verticalAlign ? -l : l) - h,
                    l = e.maxHeight,
                    m, A = this.clipRect,
                    u = e.navigation,
                    H = v(u.animation, !0),
                    I = u.arrowSize || 12,
                    K = this.nav,
                    d = this.pages,
                    w, F = this.allItems,
                    k = function(a) {
                        "number" === typeof a ?
                            A.attr({
                                height: a
                            }) : A && (b.clipRect = A.destroy(), b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + h + "px,9999px," + (h + a) + "px,0)" : "auto")
                    };
                "horizontal" !== e.layout || "middle" === e.verticalAlign || e.floating || (c /= 2);
                l && (c = Math.min(c, l));
                d.length = 0;
                a > c && !1 !== u.enabled ? (this.clipHeight = m = Math.max(c - 20 - this.titleHeight - h, 0), this.currentPage = v(this.currentPage, 1), this.fullHeight = a, n(F, function(a, b) {
                    var e = a._legendItemPos[1],
                        k = Math.round(a.legendItem.getBBox().height),
                        c = d.length;
                    if (!c || e - d[c - 1] > m && (w || e) !== d[c - 1]) d.push(w || e), c++;
                    a.pageIx = c - 1;
                    w && (F[b - 1].pageIx = c - 1);
                    b === F.length - 1 && e + k - d[c - 1] > m && (d.push(e), a.pageIx = c);
                    e !== w && (w = e)
                }), A || (A = b.clipRect = g.clipRect(0, h, 9999, 0), b.contentGroup.clip(A)), k(m), K || (this.nav = K = g.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = g.symbol("triangle", 0, 0, I, I).on("click", function() {
                    b.scroll(-1, H)
                }).add(K), this.pager = g.text("", 15, 10).addClass("highcharts-legend-navigation").css(u.style).add(K), this.down = g.symbol("triangle-down", 0, 0, I, I).on("click",
                    function() {
                        b.scroll(1, H)
                    }).add(K)), b.scroll(0), a = c) : K && (k(), this.nav = K.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function(a, c) {
                var b = this.pages,
                    f = b.length;
                a = this.currentPage + a;
                var e = this.clipHeight,
                    g = this.options.navigation,
                    l = this.pager,
                    m = this.padding;
                a > f && (a = f);
                0 < a && (void 0 !== c && y(c, this.chart), this.nav.attr({
                        translateX: m,
                        translateY: e + this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), this.up.attr({
                        "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }),
                    l.attr({
                        text: a + "/" + f
                    }), this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": a === f ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), this.up.attr({
                        fill: 1 === a ? g.inactiveColor : g.activeColor
                    }).css({
                        cursor: 1 === a ? "default" : "pointer"
                    }), this.down.attr({
                        fill: a === f ? g.inactiveColor : g.activeColor
                    }).css({
                        cursor: a === f ? "default" : "pointer"
                    }), this.scrollOffset = -b[a - 1] + this.initialItemY, this.scrollGroup.animate({
                        translateY: this.scrollOffset
                    }), this.currentPage = a, this.positionCheckboxes())
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function(a, c) {
                var b = a.symbolHeight,
                    f = a.options.squareSymbol;
                c.legendSymbol = this.chart.renderer.rect(f ? (a.symbolWidth - b) / 2 : 0, a.baseline - b + 1, f ? b : a.symbolWidth, b, v(a.options.symbolRadius, b / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(c.legendGroup)
            },
            drawLineMarker: function(a) {
                var b = this.options,
                    c = b.marker,
                    g = a.symbolWidth,
                    e = a.symbolHeight,
                    l = e / 2,
                    h = this.chart.renderer,
                    m = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var A;
                A = {
                    "stroke-width": b.lineWidth || 0
                };
                b.dashStyle &&
                    (A.dashstyle = b.dashStyle);
                this.legendLine = h.path(["M", 0, a, "L", g, a]).addClass("highcharts-graph").attr(A).add(m);
                c && !1 !== c.enabled && (b = Math.min(v(c.radius, l), l), 0 === this.symbol.indexOf("url") && (c = q(c, {
                    width: e,
                    height: e
                }), b = 0), this.legendSymbol = c = h.symbol(this.symbol, g / 2 - b, a - b, 2 * b, 2 * b, c).addClass("highcharts-point").add(m), c.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(c.navigator.userAgent) || h) && l(a.Legend.prototype, "positionItem", function(a, c) {
            var b = this,
                f = function() {
                    c._legendItemPos && a.call(b, c)
                };
            f();
            setTimeout(f)
        })
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.animate,
            E = a.animObject,
            r = a.attr,
            n = a.doc,
            h = a.Axis,
            x = a.createElement,
            q = a.defaultOptions,
            v = a.discardElement,
            y = a.charts,
            g = a.css,
            c = a.defined,
            l = a.each,
            b = a.extend,
            f = a.find,
            p = a.fireEvent,
            t = a.grep,
            e = a.isNumber,
            B = a.isObject,
            D = a.isString,
            m = a.Legend,
            A = a.marginNames,
            u = a.merge,
            H = a.objectEach,
            I = a.Pointer,
            K = a.pick,
            d = a.pInt,
            w = a.removeEvent,
            F = a.seriesTypes,
            k = a.splat,
            z = a.syncTimeout,
            O = a.win,
            N = a.Chart = function() {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function(a, d, b) {
            return new N(a,
                d, b)
        };
        b(N.prototype, {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (D(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function(d, b) {
                var e, c, k = d.series,
                    f = d.plotOptions || {};
                d.series = null;
                e = u(q, d);
                for (c in e.plotOptions) e.plotOptions[c].tooltip = f[c] && u(f[c].tooltip) || void 0;
                e.tooltip.userOptions = d.chart && d.chart.forExport && d.tooltip.userOptions || d.tooltip;
                e.series = d.series = k;
                this.userOptions = d;
                c = e.chart;
                k = c.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {
                    h: {},
                    v: {}
                };
                this.labelCollectors = [];
                this.callback = b;
                this.isResizing = 0;
                this.options = e;
                this.axes = [];
                this.series = [];
                this.time = d.time && a.keys(d.time).length ? new a.Time(d.time) : a.time;
                this.hasCartesianSeries = c.showAxes;
                var w = this;
                w.index = y.length;
                y.push(w);
                a.chartCount++;
                k && H(k, function(a, d) {
                    C(w, d, a)
                });
                w.xAxis = [];
                w.yAxis = [];
                w.pointCount = w.colorCounter = w.symbolCounter = 0;
                w.firstRender()
            },
            initSeries: function(d) {
                var b = this.options.chart;
                (b = F[d.type || b.type || b.defaultSeriesType]) || a.error(17, !0);
                b = new b;
                b.init(this,
                    d);
                return b
            },
            orderSeries: function(a) {
                var d = this.series;
                for (a = a || 0; a < d.length; a++) d[a] && (d[a].index = a, d[a].name = d[a].getName())
            },
            isInsidePlot: function(a, d, b) {
                var e = b ? d : a;
                a = b ? a : d;
                return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function(d) {
                var e = this.axes,
                    c = this.series,
                    k = this.pointer,
                    f = this.legend,
                    w = this.isDirtyLegend,
                    g, m, u = this.hasCartesianSeries,
                    F = this.isDirtyBox,
                    I, A = this.renderer,
                    z = A.isHidden(),
                    t = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(d, this);
                z && this.temporaryDisplay();
                this.layOutTitles();
                for (d = c.length; d--;)
                    if (I = c[d], I.options.stacking && (g = !0, I.isDirty)) {
                        m = !0;
                        break
                    }
                if (m)
                    for (d = c.length; d--;) I = c[d], I.options.stacking && (I.isDirty = !0);
                l(c, function(a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), w = !0);
                    a.isDirtyData && p(a, "updatedData")
                });
                w && f.options.enabled && (f.render(), this.isDirtyLegend = !1);
                g && this.getStacks();
                u && l(e, function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                u && (l(e, function(a) {
                    a.isDirty && (F = !0)
                }), l(e, function(a) {
                    var d =
                        a.min + "," + a.max;
                    a.extKey !== d && (a.extKey = d, t.push(function() {
                        p(a, "afterSetExtremes", b(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (F || g) && a.redraw()
                }));
                F && this.drawChartBox();
                p(this, "predraw");
                l(c, function(a) {
                    (F || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                k && k.reset(!0);
                A.draw();
                p(this, "redraw");
                p(this, "render");
                z && this.temporaryDisplay(!0);
                l(t, function(a) {
                    a.call()
                })
            },
            get: function(a) {
                function d(d) {
                    return d.id === a || d.options && d.options.id === a
                }
                var b, e = this.series,
                    c;
                b = f(this.axes, d) ||
                    f(this.series, d);
                for (c = 0; !b && c < e.length; c++) b = f(e[c].points || [], d);
                return b
            },
            getAxes: function() {
                var a = this,
                    d = this.options,
                    b = d.xAxis = k(d.xAxis || {}),
                    d = d.yAxis = k(d.yAxis || {});
                l(b, function(a, d) {
                    a.index = d;
                    a.isX = !0
                });
                l(d, function(a, d) {
                    a.index = d
                });
                b = b.concat(d);
                l(b, function(d) {
                    new h(a, d)
                })
            },
            getSelectedPoints: function() {
                var a = [];
                l(this.series, function(d) {
                    a = a.concat(t(d.data || [], function(a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function() {
                return t(this.series, function(a) {
                    return a.selected
                })
            },
            setTitle: function(a, d, b) {
                var e = this,
                    c = e.options,
                    k;
                k = c.title = u({
                    style: {
                        color: "#333333",
                        fontSize: c.isStock ? "16px" : "18px"
                    }
                }, c.title, a);
                c = c.subtitle = u({
                    style: {
                        color: "#666666"
                    }
                }, c.subtitle, d);
                l([
                    ["title", a, k],
                    ["subtitle", d, c]
                ], function(a, d) {
                    var b = a[0],
                        c = e[b],
                        k = a[1];
                    a = a[2];
                    c && k && (e[b] = c = c.destroy());
                    a && !c && (e[b] = e.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + b,
                        zIndex: a.zIndex || 4
                    }).add(), e[b].update = function(a) {
                        e.setTitle(!d && a, d && a)
                    }, e[b].css(a.style))
                });
                e.layOutTitles(b)
            },
            layOutTitles: function(a) {
                var d = 0,
                    e, c = this.renderer,
                    k = this.spacingBox;
                l(["title", "subtitle"], function(a) {
                    var e = this[a],
                        f = this.options[a];
                    a = "title" === a ? -3 : f.verticalAlign ? 0 : d + 2;
                    var w;
                    e && (w = f.style.fontSize, w = c.fontMetrics(w, e).b, e.css({
                        width: (f.width || k.width + f.widthAdjust) + "px"
                    }).align(b({
                        y: a + w
                    }, f), !1, "spacingBox"), f.floating || f.verticalAlign || (d = Math.ceil(d + e.getBBox(f.useHTML).height)))
                }, this);
                e = this.titleOffset !== d;
                this.titleOffset = d;
                !this.isDirtyBox && e && (this.isDirtyBox = e, this.hasRendered && K(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var d = this.options.chart,
                    b = d.width,
                    d = d.height,
                    e = this.renderTo;
                c(b) || (this.containerWidth = a.getStyle(e, "width"));
                c(d) || (this.containerHeight = a.getStyle(e, "height"));
                this.chartWidth = Math.max(0, b || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(d, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            },
            temporaryDisplay: function(d) {
                var b = this.renderTo;
                if (d)
                    for (; b && b.style;) b.hcOrigStyle && (a.css(b, b.hcOrigStyle),
                        delete b.hcOrigStyle), b.hcOrigDetached && (n.body.removeChild(b), b.hcOrigDetached = !1), b = b.parentNode;
                else
                    for (; b && b.style;) {
                        n.body.contains(b) || b.parentNode || (b.hcOrigDetached = !0, n.body.appendChild(b));
                        if ("none" === a.getStyle(b, "display", !1) || b.hcOricDetached) b.hcOrigStyle = {
                            display: b.style.display,
                            height: b.style.height,
                            overflow: b.style.overflow
                        }, d = {
                            display: "block",
                            overflow: "hidden"
                        }, b !== this.renderTo && (d.height = 0), a.css(b, d), b.offsetWidth || b.style.setProperty("display", "block", "important");
                        b = b.parentNode;
                        if (b === n.body) break
                    }
            },
            setClassName: function(a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function() {
                var c, k = this.options,
                    f = k.chart,
                    w, g;
                c = this.renderTo;
                var m = a.uniqueKey(),
                    p;
                c || (this.renderTo = c = f.renderTo);
                D(c) && (this.renderTo = c = n.getElementById(c));
                c || a.error(13, !0);
                w = d(r(c, "data-highcharts-chart"));
                e(w) && y[w] && y[w].hasRendered && y[w].destroy();
                r(c, "data-highcharts-chart", this.index);
                c.innerHTML = "";
                f.skipClone || c.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                w = this.chartWidth;
                g = this.chartHeight;
                p = b({
                    position: "relative",
                    overflow: "hidden",
                    width: w + "px",
                    height: g + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, f.style);
                this.container = c = x("div", {
                    id: m
                }, p, c);
                this._cursor = c.style.cursor;
                this.renderer = new(a[f.renderer] || a.Renderer)(c, w, g, null, f.forExport, k.exporting && k.exporting.allowHTML);
                this.setClassName(f.className);
                this.renderer.setStyle(f.style);
                this.renderer.chartIndex = this.index
            },
            getMargins: function(a) {
                var d =
                    this.spacing,
                    b = this.margin,
                    e = this.titleOffset;
                this.resetMargins();
                e && !c(b[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + d[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(b, d);
                this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);
                this.adjustPlotArea && this.adjustPlotArea();
                a || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    d = a.axisOffset = [0, 0, 0, 0],
                    b = a.margin;
                a.hasCartesianSeries && l(a.axes, function(a) {
                    a.visible &&
                        a.getOffset()
                });
                l(A, function(e, k) {
                    c(b[k]) || (a[e] += d[k])
                });
                a.setChartSize()
            },
            reflow: function(d) {
                var b = this,
                    e = b.options.chart,
                    k = b.renderTo,
                    f = c(e.width) && c(e.height),
                    w = e.width || a.getStyle(k, "width"),
                    e = e.height || a.getStyle(k, "height"),
                    k = d ? d.target : O;
                if (!f && !b.isPrinting && w && e && (k === O || k === n)) {
                    if (w !== b.containerWidth || e !== b.containerHeight) clearTimeout(b.reflowTimeout), b.reflowTimeout = z(function() {
                        b.container && b.setSize(void 0, void 0, !1)
                    }, d ? 100 : 0);
                    b.containerWidth = w;
                    b.containerHeight = e
                }
            },
            initReflow: function() {
                var a =
                    this,
                    d;
                d = C(O, "resize", function(d) {
                    a.reflow(d)
                });
                C(a, "destroy", d)
            },
            setSize: function(d, b, e) {
                var c = this,
                    k = c.renderer;
                c.isResizing += 1;
                a.setAnimation(e, c);
                c.oldChartHeight = c.chartHeight;
                c.oldChartWidth = c.chartWidth;
                void 0 !== d && (c.options.chart.width = d);
                void 0 !== b && (c.options.chart.height = b);
                c.getChartSize();
                d = k.globalAnimation;
                (d ? G : g)(c.container, {
                    width: c.chartWidth + "px",
                    height: c.chartHeight + "px"
                }, d);
                c.setChartSize(!0);
                k.setSize(c.chartWidth, c.chartHeight, e);
                l(c.axes, function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                c.isDirtyLegend = !0;
                c.isDirtyBox = !0;
                c.layOutTitles();
                c.getMargins();
                c.redraw(e);
                c.oldChartHeight = null;
                p(c, "resize");
                z(function() {
                    c && p(c, "endResize", null, function() {
                        --c.isResizing
                    })
                }, E(d).duration)
            },
            setChartSize: function(a) {
                var d = this.inverted,
                    b = this.renderer,
                    c = this.chartWidth,
                    e = this.chartHeight,
                    k = this.options.chart,
                    f = this.spacing,
                    w = this.clipOffset,
                    g, m, p, u;
                this.plotLeft = g = Math.round(this.plotLeft);
                this.plotTop = m = Math.round(this.plotTop);
                this.plotWidth = p = Math.max(0, Math.round(c - g - this.marginRight));
                this.plotHeight = u = Math.max(0, Math.round(e - m - this.marginBottom));
                this.plotSizeX = d ? u : p;
                this.plotSizeY = d ? p : u;
                this.plotBorderWidth = k.plotBorderWidth || 0;
                this.spacingBox = b.spacingBox = {
                    x: f[3],
                    y: f[0],
                    width: c - f[3] - f[1],
                    height: e - f[0] - f[2]
                };
                this.plotBox = b.plotBox = {
                    x: g,
                    y: m,
                    width: p,
                    height: u
                };
                c = 2 * Math.floor(this.plotBorderWidth / 2);
                d = Math.ceil(Math.max(c, w[3]) / 2);
                b = Math.ceil(Math.max(c, w[0]) / 2);
                this.clipBox = {
                    x: d,
                    y: b,
                    width: Math.floor(this.plotSizeX - Math.max(c, w[1]) / 2 - d),
                    height: Math.max(0, Math.floor(this.plotSizeY -
                        Math.max(c, w[2]) / 2 - b))
                };
                a || l(this.axes, function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            },
            resetMargins: function() {
                var a = this,
                    d = a.options.chart;
                l(["margin", "spacing"], function(b) {
                    var c = d[b],
                        e = B(c) ? c : [c, c, c, c];
                    l(["Top", "Right", "Bottom", "Left"], function(c, k) {
                        a[b][k] = K(d[b + c], e[k])
                    })
                });
                l(A, function(d, b) {
                    a[d] = K(a.margin[b], a.spacing[b])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var a = this.options.chart,
                    d = this.renderer,
                    b = this.chartWidth,
                    c = this.chartHeight,
                    e = this.chartBackground,
                    k = this.plotBackground,
                    f = this.plotBorder,
                    w, g = this.plotBGImage,
                    m = a.backgroundColor,
                    p = a.plotBackgroundColor,
                    u = a.plotBackgroundImage,
                    F, l = this.plotLeft,
                    I = this.plotTop,
                    A = this.plotWidth,
                    z = this.plotHeight,
                    t = this.plotBox,
                    K = this.clipRect,
                    h = this.clipBox,
                    n = "animate";
                e || (this.chartBackground = e = d.rect().addClass("highcharts-background").add(), n = "attr");
                w = a.borderWidth || 0;
                F = w + (a.shadow ? 8 : 0);
                m = {
                    fill: m || "none"
                };
                if (w || e["stroke-width"]) m.stroke = a.borderColor, m["stroke-width"] = w;
                e.attr(m).shadow(a.shadow);
                e[n]({
                    x: F /
                        2,
                    y: F / 2,
                    width: b - F - w % 2,
                    height: c - F - w % 2,
                    r: a.borderRadius
                });
                n = "animate";
                k || (n = "attr", this.plotBackground = k = d.rect().addClass("highcharts-plot-background").add());
                k[n](t);
                k.attr({
                    fill: p || "none"
                }).shadow(a.plotShadow);
                u && (g ? g.animate(t) : this.plotBGImage = d.image(u, l, I, A, z).add());
                K ? K.animate({
                    width: h.width,
                    height: h.height
                }) : this.clipRect = d.clipRect(h);
                n = "animate";
                f || (n = "attr", this.plotBorder = f = d.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                f.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth ||
                        0,
                    fill: "none"
                });
                f[n](f.crisp({
                    x: l,
                    y: I,
                    width: A,
                    height: z
                }, -f.strokeWidth()));
                this.isDirtyBox = !1
            },
            propFromSeries: function() {
                var a = this,
                    d = a.options.chart,
                    b, c = a.options.series,
                    e, k;
                l(["inverted", "angular", "polar"], function(f) {
                    b = F[d.type || d.defaultSeriesType];
                    k = d[f] || b && b.prototype[f];
                    for (e = c && c.length; !k && e--;)(b = F[c[e].type]) && b.prototype[f] && (k = !0);
                    a[f] = k
                })
            },
            linkSeries: function() {
                var a = this,
                    d = a.series;
                l(d, function(a) {
                    a.linkedSeries.length = 0
                });
                l(d, function(d) {
                    var b = d.options.linkedTo;
                    D(b) && (b = ":previous" ===
                        b ? a.series[d.index - 1] : a.get(b)) && b.linkedParent !== d && (b.linkedSeries.push(d), d.linkedParent = b, d.visible = K(d.options.visible, b.options.visible, d.visible))
                })
            },
            renderSeries: function() {
                l(this.series, function(a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function() {
                var a = this,
                    c = a.options.labels;
                c.items && l(c.items, function(e) {
                    var k = b(c.style, e.style),
                        f = d(k.left) + a.plotLeft,
                        w = d(k.top) + a.plotTop + 12;
                    delete k.left;
                    delete k.top;
                    a.renderer.text(e.html, f, w).attr({
                        zIndex: 2
                    }).css(k).add()
                })
            },
            render: function() {
                var a =
                    this.axes,
                    d = this.renderer,
                    b = this.options,
                    c, e, k;
                this.setTitle();
                this.legend = new m(this, b.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                b = this.plotWidth;
                c = this.plotHeight = Math.max(this.plotHeight - 21, 0);
                l(a, function(a) {
                    a.setScale()
                });
                this.getAxisMargins();
                e = 1.1 < b / this.plotWidth;
                k = 1.05 < c / this.plotHeight;
                if (e || k) l(a, function(a) {
                    (a.horiz && e || !a.horiz && k) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && l(a, function(a) {
                    a.visible &&
                        a.render()
                });
                this.seriesGroup || (this.seriesGroup = d.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function(a) {
                var d = this;
                a = u(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                        a.href && (O.location.href = a.href)
                    }).attr({
                        align: a.position.align,
                        zIndex: 8
                    }).css(a.style).add().align(a.position),
                    this.credits.update = function(a) {
                        d.credits = d.credits.destroy();
                        d.addCredits(a)
                    })
            },
            destroy: function() {
                var d = this,
                    b = d.axes,
                    c = d.series,
                    e = d.container,
                    k, f = e && e.parentNode;
                p(d, "destroy");
                d.renderer.forExport ? a.erase(y, d) : y[d.index] = void 0;
                a.chartCount--;
                d.renderTo.removeAttribute("data-highcharts-chart");
                w(d);
                for (k = b.length; k--;) b[k] = b[k].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (k = c.length; k--;) c[k] = c[k].destroy();
                l("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),
                    function(a) {
                        var b = d[a];
                        b && b.destroy && (d[a] = b.destroy())
                    });
                e && (e.innerHTML = "", w(e), f && v(e));
                H(d, function(a, b) {
                    delete d[b]
                })
            },
            firstRender: function() {
                var a = this,
                    d = a.options;
                if (!a.isReadyToRender || a.isReadyToRender()) {
                    a.getContainer();
                    p(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    l(d.series || [], function(d) {
                        a.initSeries(d)
                    });
                    a.linkSeries();
                    p(a, "beforeRender");
                    I && (a.pointer = new I(a, d));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            },
            onload: function() {
                l([this.callback].concat(this.callbacks),
                    function(a) {
                        a && void 0 !== this.index && a.apply(this, [this])
                    }, this);
                p(this, "load");
                p(this, "render");
                c(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        })
    })(L);
    (function(a) {
        var C, G = a.each,
            E = a.extend,
            r = a.erase,
            n = a.fireEvent,
            h = a.format,
            x = a.isArray,
            q = a.isNumber,
            v = a.pick,
            y = a.removeEvent;
        a.Point = C = function() {};
        a.Point.prototype = {
            init: function(a, c, l) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(c, l);
                a.options.colorByPoint ? (c = a.options.colors || a.chart.options.colors, this.color =
                    this.color || c[a.colorCounter], c = c.length, l = a.colorCounter, a.colorCounter++, a.colorCounter === c && (a.colorCounter = 0)) : l = a.colorIndex;
                this.colorIndex = v(this.colorIndex, l);
                a.chart.pointCount++;
                return this
            },
            applyOptions: function(a, c) {
                var g = this.series,
                    b = g.options.pointValKey || g.pointValKey;
                a = C.prototype.optionsToObject.call(this, a);
                E(this, a);
                this.options = this.options ? E(this.options, a) : a;
                a.group && delete this.group;
                b && (this.y = this[b]);
                this.isNull = v(this.isValid && !this.isValid(), null === this.x || !q(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === c && g.xAxis && g.xAxis.hasNames && (this.x = g.xAxis.nameToX(this));
                void 0 === this.x && g && (this.x = void 0 === c ? g.autoIncrement(this) : c);
                return this
            },
            optionsToObject: function(a) {
                var c = {},
                    g = this.series,
                    b = g.options.keys,
                    f = b || g.pointArrayMap || ["y"],
                    p = f.length,
                    t = 0,
                    e = 0;
                if (q(a) || null === a) c[f[0]] = a;
                else if (x(a))
                    for (!b && a.length > p && (g = typeof a[0], "string" === g ? c.name = a[0] : "number" === g && (c.x = a[0]), t++); e < p;) b && void 0 === a[t] || (c[f[e]] = a[t]), t++, e++;
                else "object" ===
                    typeof a && (c = a, a.dataLabels && (g._hasPointLabels = !0), a.marker && (g._hasPointMarkers = !0));
                return c
            },
            getClassName: function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            },
            getZone: function() {
                var a =
                    this.series,
                    c = a.zones,
                    a = a.zoneAxis || "y",
                    l = 0,
                    b;
                for (b = c[l]; this[a] >= b.value;) b = c[++l];
                b && b.color && !this.options.color && (this.color = b.color);
                return b
            },
            destroy: function() {
                var a = this.series.chart,
                    c = a.hoverPoints,
                    l;
                a.pointCount--;
                c && (this.setState(), r(c, this), c.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) y(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (l in this) this[l] = null
            },
            destroyElements: function() {
                for (var a = ["graphic",
                        "dataLabel", "dataLabelUpper", "connector", "shadowGroup"
                    ], c, l = 6; l--;) c = a[l], this[c] && (this[c] = this[c].destroy())
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function(a) {
                var c = this.series,
                    g = c.tooltipOptions,
                    b = v(g.valueDecimals, ""),
                    f = g.valuePrefix || "",
                    p = g.valueSuffix || "";
                G(c.pointArrayMap || ["y"], function(c) {
                    c =
                        "{point." + c;
                    if (f || p) a = a.replace(c + "}", f + c + "}" + p);
                    a = a.replace(c + "}", c + ":,." + b + "f}")
                });
                return h(a, {
                    point: this,
                    series: this.series
                }, c.chart.time)
            },
            firePointEvent: function(a, c, l) {
                var b = this,
                    f = this.series.options;
                (f.point.events[a] || b.options && b.options.events && b.options.events[a]) && this.importEvents();
                "click" === a && f.allowPointSelect && (l = function(a) {
                    b.select && b.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                n(this, a, c, l)
            },
            visible: !0
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.animObject,
            E = a.arrayMax,
            r = a.arrayMin,
            n = a.correctFloat,
            h = a.defaultOptions,
            x = a.defaultPlotOptions,
            q = a.defined,
            v = a.each,
            y = a.erase,
            g = a.extend,
            c = a.fireEvent,
            l = a.grep,
            b = a.isArray,
            f = a.isNumber,
            p = a.isString,
            t = a.merge,
            e = a.objectEach,
            B = a.pick,
            D = a.removeEvent,
            m = a.splat,
            A = a.SVGElement,
            u = a.syncTimeout,
            H = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                enabledThreshold: 2,
                radius: 4,
                states: {
                    normal: {},
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function() {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {},
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    marker: {}
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function(a, b) {
                var d = this,
                    c, f = a.series,
                    k;
                d.chart = a;
                d.options = b = d.setOptions(b);
                d.linkedSeries = [];
                d.bindAxes();
                g(d, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                c = b.events;
                e(c, function(a, b) {
                    C(d, b, a)
                });
                if (c && c.click || b.point && b.point.events && b.point.events.click ||
                    b.allowPointSelect) a.runTrackerClick = !0;
                d.getColor();
                d.getSymbol();
                v(d.parallelArrays, function(a) {
                    d[a + "Data"] = []
                });
                d.setData(b.data, !1);
                d.isCartesian && (a.hasCartesianSeries = !0);
                f.length && (k = f[f.length - 1]);
                d._i = B(k && k._i, -1) + 1;
                a.orderSeries(this.insert(f))
            },
            insert: function(a) {
                var b = this.options.index,
                    d;
                if (f(b)) {
                    for (d = a.length; d--;)
                        if (b >= B(a[d].options.index, a[d]._i)) {
                            a.splice(d + 1, 0, this);
                            break
                        } - 1 === d && a.unshift(this);
                    d += 1
                } else a.push(this);
                return B(d, a.length - 1)
            },
            bindAxes: function() {
                var b = this,
                    c = b.options,
                    d = b.chart,
                    e;
                v(b.axisTypes || [], function(f) {
                    v(d[f], function(a) {
                        e = a.options;
                        if (c[f] === e.index || void 0 !== c[f] && c[f] === e.id || void 0 === c[f] && 0 === e.index) b.insert(a.series), b[f] = a, a.isDirty = !0
                    });
                    b[f] || b.optionalAxis === f || a.error(18, !0)
                })
            },
            updateParallelArrays: function(a, b) {
                var d = a.series,
                    c = arguments,
                    e = f(b) ? function(c) {
                        var e = "y" === c && d.toYData ? d.toYData(a) : a[c];
                        d[c + "Data"][b] = e
                    } : function(a) {
                        Array.prototype[b].apply(d[a + "Data"], Array.prototype.slice.call(c, 2))
                    };
                v(d.parallelArrays, e)
            },
            autoIncrement: function() {
                var a =
                    this.options,
                    b = this.xIncrement,
                    d, c = a.pointIntervalUnit,
                    e = this.chart.time,
                    b = B(b, a.pointStart, 0);
                this.pointInterval = d = B(this.pointInterval, a.pointInterval, 1);
                c && (a = new e.Date(b), "day" === c ? e.set("Date", a, e.get("Date", a) + d) : "month" === c ? e.set("Month", a, e.get("Month", a) + d) : "year" === c && e.set("FullYear", a, e.get("FullYear", a) + d), d = a.getTime() - b);
                this.xIncrement = b + d;
                return b
            },
            setOptions: function(a) {
                var b = this.chart,
                    d = b.options,
                    c = d.plotOptions,
                    e = (b.userOptions || {}).plotOptions || {},
                    k = c[this.type];
                this.userOptions =
                    a;
                b = t(k, c.series, a);
                this.tooltipOptions = t(h.tooltip, h.plotOptions.series && h.plotOptions.series.tooltip, h.plotOptions[this.type].tooltip, d.tooltip.userOptions, c.series && c.series.tooltip, c[this.type].tooltip, a.tooltip);
                this.stickyTracking = B(a.stickyTracking, e[this.type] && e[this.type].stickyTracking, e.series && e.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);
                null === k.marker && delete b.marker;
                this.zoneAxis = b.zoneAxis;
                a = this.zones = (b.zones || []).slice();
                !b.negativeColor &&
                    !b.negativeFillColor || b.zones || a.push({
                        value: b[this.zoneAxis + "Threshold"] || b.threshold || 0,
                        className: "highcharts-negative",
                        color: b.negativeColor,
                        fillColor: b.negativeFillColor
                    });
                a.length && q(a[a.length - 1].value) && a.push({
                    color: this.color,
                    fillColor: this.fillColor
                });
                return b
            },
            getName: function() {
                return this.name || "Series " + (this.index + 1)
            },
            getCyclic: function(a, b, d) {
                var c, e = this.chart,
                    k = this.userOptions,
                    f = a + "Index",
                    m = a + "Counter",
                    g = d ? d.length : B(e.options.chart[a + "Count"], e[a + "Count"]);
                b || (c = B(k[f], k["_" + f]),
                    q(c) || (e.series.length || (e[m] = 0), k["_" + f] = c = e[m] % g, e[m] += 1), d && (b = d[c]));
                void 0 !== c && (this[f] = c);
                this[a] = b
            },
            getColor: function() {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || x[this.type].color, this.chart.options.colors)
            },
            getSymbol: function() {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function(c, e, d, w) {
                var m = this,
                    k = m.points,
                    g = k && k.length || 0,
                    u, l = m.options,
                    A =
                    m.chart,
                    t = null,
                    I = m.xAxis,
                    h = l.turboThreshold,
                    n = this.xData,
                    K = this.yData,
                    H = (u = m.pointArrayMap) && u.length;
                c = c || [];
                u = c.length;
                e = B(e, !0);
                if (!1 !== w && u && g === u && !m.cropped && !m.hasGroupedData && m.visible) v(c, function(a, d) {
                    k[d].update && a !== l.data[d] && k[d].update(a, !1, null, !1)
                });
                else {
                    m.xIncrement = null;
                    m.colorCounter = 0;
                    v(this.parallelArrays, function(a) {
                        m[a + "Data"].length = 0
                    });
                    if (h && u > h) {
                        for (d = 0; null === t && d < u;) t = c[d], d++;
                        if (f(t))
                            for (d = 0; d < u; d++) n[d] = this.autoIncrement(), K[d] = c[d];
                        else if (b(t))
                            if (H)
                                for (d = 0; d < u; d++) t =
                                    c[d], n[d] = t[0], K[d] = t.slice(1, H + 1);
                            else
                                for (d = 0; d < u; d++) t = c[d], n[d] = t[0], K[d] = t[1];
                        else a.error(12)
                    } else
                        for (d = 0; d < u; d++) void 0 !== c[d] && (t = {
                            series: m
                        }, m.pointClass.prototype.applyOptions.apply(t, [c[d]]), m.updateParallelArrays(t, d));
                    K && p(K[0]) && a.error(14, !0);
                    m.data = [];
                    m.options.data = m.userOptions.data = c;
                    for (d = g; d--;) k[d] && k[d].destroy && k[d].destroy();
                    I && (I.minRange = I.userMinRange);
                    m.isDirty = A.isDirtyBox = !0;
                    m.isDirtyData = !!k;
                    d = !1
                }
                "point" === l.legendType && (this.processData(), this.generatePoints());
                e &&
                    A.redraw(d)
            },
            processData: function(b) {
                var c = this.xData,
                    d = this.yData,
                    e = c.length,
                    f;
                f = 0;
                var k, m, g = this.xAxis,
                    u, p = this.options;
                u = p.cropThreshold;
                var l = this.getExtremesFromAll || p.getExtremesFromAll,
                    A = this.isCartesian,
                    p = g && g.val2lin,
                    t = g && g.isLog,
                    I = this.requireSorting,
                    h, n;
                if (A && !this.isDirty && !g.isDirty && !this.yAxis.isDirty && !b) return !1;
                g && (b = g.getExtremes(), h = b.min, n = b.max);
                if (A && this.sorted && !l && (!u || e > u || this.forceCrop))
                    if (c[e - 1] < h || c[0] > n) c = [], d = [];
                    else if (c[0] < h || c[e - 1] > n) f = this.cropData(this.xData,
                    this.yData, h, n), c = f.xData, d = f.yData, f = f.start, k = !0;
                for (u = c.length || 1; --u;) e = t ? p(c[u]) - p(c[u - 1]) : c[u] - c[u - 1], 0 < e && (void 0 === m || e < m) ? m = e : 0 > e && I && (a.error(15), I = !1);
                this.cropped = k;
                this.cropStart = f;
                this.processedXData = c;
                this.processedYData = d;
                this.closestPointRange = m
            },
            cropData: function(a, b, d, c) {
                var e = a.length,
                    k = 0,
                    f = e,
                    m = B(this.cropShoulder, 1),
                    w;
                for (w = 0; w < e; w++)
                    if (a[w] >= d) {
                        k = Math.max(0, w - m);
                        break
                    }
                for (d = w; d < e; d++)
                    if (a[d] > c) {
                        f = d + m;
                        break
                    }
                return {
                    xData: a.slice(k, f),
                    yData: b.slice(k, f),
                    start: k,
                    end: f
                }
            },
            generatePoints: function() {
                var a =
                    this.options,
                    b = a.data,
                    d = this.data,
                    c, e = this.processedXData,
                    k = this.processedYData,
                    f = this.pointClass,
                    g = e.length,
                    u = this.cropStart || 0,
                    p, l = this.hasGroupedData,
                    a = a.keys,
                    A, t = [],
                    h;
                d || l || (d = [], d.length = b.length, d = this.data = d);
                a && l && (this.options.keys = !1);
                for (h = 0; h < g; h++) p = u + h, l ? (A = (new f).init(this, [e[h]].concat(m(k[h]))), A.dataGroup = this.groupMap[h]) : (A = d[p]) || void 0 === b[p] || (d[p] = A = (new f).init(this, b[p], e[h])), A && (A.index = p, t[h] = A);
                this.options.keys = a;
                if (d && (g !== (c = d.length) || l))
                    for (h = 0; h < c; h++) h !== u || l ||
                        (h += g), d[h] && (d[h].destroyElements(), d[h].plotX = void 0);
                this.data = d;
                this.points = t
            },
            getExtremes: function(a) {
                var c = this.yAxis,
                    d = this.processedXData,
                    e, m = [],
                    k = 0;
                e = this.xAxis.getExtremes();
                var g = e.min,
                    u = e.max,
                    p, l, A, t;
                a = a || this.stackedYData || this.processedYData || [];
                e = a.length;
                for (t = 0; t < e; t++)
                    if (l = d[t], A = a[t], p = (f(A, !0) || b(A)) && (!c.positiveValuesOnly || A.length || 0 < A), l = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[t + 1] || l) >= g && (d[t - 1] || l) <= u, p && l)
                        if (p = A.length)
                            for (; p--;) "number" ===
                                typeof A[p] && (m[k++] = A[p]);
                        else m[k++] = A;
                this.dataMin = r(m);
                this.dataMax = E(m)
            },
            translate: function() {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    d = this.xAxis,
                    c = d.categories,
                    e = this.yAxis,
                    k = this.points,
                    m = k.length,
                    g = !!this.modifyValue,
                    p = a.pointPlacement,
                    u = "between" === p || f(p),
                    l = a.threshold,
                    A = a.startFromThreshold ? l : 0,
                    t, h, H, D, v = Number.MAX_VALUE;
                "between" === p && (p = .5);
                f(p) && (p *= B(a.pointRange || d.pointRange));
                for (a = 0; a < m; a++) {
                    var r = k[a],
                        x = r.x,
                        y = r.y;
                    h = r.low;
                    var C =
                        b && e.stacks[(this.negStacks && y < (A ? 0 : l) ? "-" : "") + this.stackKey],
                        G;
                    e.positiveValuesOnly && null !== y && 0 >= y && (r.isNull = !0);
                    r.plotX = t = n(Math.min(Math.max(-1E5, d.translate(x, 0, 0, 0, 1, p, "flags" === this.type)), 1E5));
                    b && this.visible && !r.isNull && C && C[x] && (D = this.getStackIndicator(D, x, this.index), G = C[x], y = G.points[D.key], h = y[0], y = y[1], h === A && D.key === C[x].base && (h = B(l, e.min)), e.positiveValuesOnly && 0 >= h && (h = null), r.total = r.stackTotal = G.total, r.percentage = G.total && r.y / G.total * 100, r.stackY = y, G.setOffset(this.pointXOffset ||
                        0, this.barW || 0));
                    r.yBottom = q(h) ? Math.min(Math.max(-1E5, e.translate(h, 0, 1, 0, 1)), 1E5) : null;
                    g && (y = this.modifyValue(y, r));
                    r.plotY = h = "number" === typeof y && Infinity !== y ? Math.min(Math.max(-1E5, e.translate(y, 0, 1, 0, 1)), 1E5) : void 0;
                    r.isInside = void 0 !== h && 0 <= h && h <= e.len && 0 <= t && t <= d.len;
                    r.clientX = u ? n(d.translate(x, 0, 0, 0, 1, p)) : t;
                    r.negative = r.y < (l || 0);
                    r.category = c && void 0 !== c[r.x] ? c[r.x] : r.x;
                    r.isNull || (void 0 !== H && (v = Math.min(v, Math.abs(t - H))), H = t);
                    r.zone = this.zones.length && r.getZone()
                }
                this.closestPointRangePx =
                    v
            },
            getValidPoints: function(a, b) {
                var d = this.chart;
                return l(a || this.points || [], function(a) {
                    return b && !d.isInsidePlot(a.plotX, a.plotY, d.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function(a) {
                var b = this.chart,
                    d = this.options,
                    c = b.renderer,
                    e = b.inverted,
                    k = this.clipBox,
                    f = k || b.clipBox,
                    m = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, f.height, d.xAxis, d.yAxis].join(),
                    g = b[m],
                    p = b[m + "m"];
                g || (a && (f.width = 0, e && (f.x = b.plotSizeX), b[m + "m"] = p = c.clipRect(e ? b.plotSizeX + 99 : -99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth :
                    b.chartHeight)), b[m] = g = c.clipRect(f), g.count = {
                    length: 0
                });
                a && !g.count[this.index] && (g.count[this.index] = !0, g.count.length += 1);
                !1 !== d.clip && (this.group.clip(a || k ? g : b.clipRect), this.markerGroup.clip(p), this.sharedClipKey = m);
                a || (g.count[this.index] && (delete g.count[this.index], --g.count.length), 0 === g.count.length && m && b[m] && (k || (b[m] = b[m].destroy()), b[m + "m"] && (b[m + "m"] = b[m + "m"].destroy())))
            },
            animate: function(a) {
                var b = this.chart,
                    d = G(this.options.animation),
                    c;
                a ? this.setClip(d) : (c = this.sharedClipKey, (a = b[c]) &&
                    a.animate({
                        width: b.plotSizeX,
                        x: 0
                    }, d), b[c + "m"] && b[c + "m"].animate({
                        width: b.plotSizeX + 99,
                        x: 0
                    }, d), this.animate = null)
            },
            afterAnimate: function() {
                this.setClip();
                c(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function() {
                var a = this.points,
                    b = this.chart,
                    d, c, e, k, f = this.options.marker,
                    m, g, p, u = this[this.specialGroup] || this.markerGroup,
                    l, A = B(f.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= f.enabledThreshold * f.radius);
                if (!1 !== f.enabled || this._hasPointMarkers)
                    for (d = 0; d < a.length; d++) c =
                        a[d], k = c.graphic, m = c.marker || {}, g = !!c.marker, e = A && void 0 === m.enabled || m.enabled, p = c.isInside, e && !c.isNull ? (e = B(m.symbol, this.symbol), l = this.markerAttribs(c, c.selected && "select"), k ? k[p ? "show" : "hide"](!0).animate(l) : p && (0 < l.width || c.hasImage) && (c.graphic = k = b.renderer.symbol(e, l.x, l.y, l.width, l.height, g ? m : f).add(u)), k && k.attr(this.pointAttribs(c, c.selected && "select")), k && k.addClass(c.getClassName(), !0)) : k && (c.graphic = k.destroy())
            },
            markerAttribs: function(a, b) {
                var d = this.options.marker,
                    c = a.marker || {},
                    e = c.symbol || d.symbol,
                    k = B(c.radius, d.radius);
                b && (d = d.states[b], b = c.states && c.states[b], k = B(b && b.radius, d && d.radius, k + (d && d.radiusPlus || 0)));
                a.hasImage = e && 0 === e.indexOf("url");
                a.hasImage && (k = 0);
                a = {
                    x: Math.floor(a.plotX) - k,
                    y: a.plotY - k
                };
                k && (a.width = a.height = 2 * k);
                return a
            },
            pointAttribs: function(a, b) {
                var d = this.options.marker,
                    c = a && a.options,
                    e = c && c.marker || {},
                    k = this.color,
                    f = c && c.color,
                    m = a && a.color,
                    c = B(e.lineWidth, d.lineWidth);
                a = a && a.zone && a.zone.color;
                k = f || a || m || k;
                a = e.fillColor || d.fillColor || k;
                k = e.lineColor ||
                    d.lineColor || k;
                b && (d = d.states[b], b = e.states && e.states[b] || {}, c = B(b.lineWidth, d.lineWidth, c + B(b.lineWidthPlus, d.lineWidthPlus, 0)), a = b.fillColor || d.fillColor || a, k = b.lineColor || d.lineColor || k);
                return {
                    stroke: k,
                    "stroke-width": c,
                    fill: a
                }
            },
            destroy: function() {
                var a = this,
                    b = a.chart,
                    d = /AppleWebKit\/533/.test(H.navigator.userAgent),
                    f, m, k = a.data || [],
                    g, p;
                c(a, "destroy");
                D(a);
                v(a.axisTypes || [], function(d) {
                    (p = a[d]) && p.series && (y(p.series, a), p.isDirty = p.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (m = k.length; m--;)(g = k[m]) && g.destroy && g.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                e(a, function(a, b) {
                    a instanceof A && !a.survive && (f = d && "group" === b ? "hide" : "destroy", a[f]())
                });
                b.hoverSeries === a && (b.hoverSeries = null);
                y(b.series, a);
                b.orderSeries();
                e(a, function(d, b) {
                    delete a[b]
                })
            },
            getGraphPath: function(a, b, d) {
                var c = this,
                    e = c.options,
                    k = e.step,
                    f, m = [],
                    g = [],
                    p;
                a = a || c.points;
                (f = a.reversed) && a.reverse();
                (k = {
                    right: 1,
                    center: 2
                }[k] || k && 3) && f && (k = 4 - k);
                !e.connectNulls || b || d || (a = this.getValidPoints(a));
                v(a, function(f, w) {
                    var u = f.plotX,
                        l = f.plotY,
                        A = a[w - 1];
                    (f.leftCliff || A && A.rightCliff) && !d && (p = !0);
                    f.isNull && !q(b) && 0 < w ? p = !e.connectNulls : f.isNull && !b ? p = !0 : (0 === w || p ? w = ["M", f.plotX, f.plotY] : c.getPointSpline ? w = c.getPointSpline(a, f, w) : k ? (w = 1 === k ? ["L", A.plotX, l] : 2 === k ? ["L", (A.plotX + u) / 2, A.plotY, "L", (A.plotX + u) / 2, l] : ["L", u, A.plotY], w.push("L", u, l)) : w = ["L", u, l], g.push(f.x), k && g.push(f.x), m.push.apply(m, w), p = !1)
                });
                m.xMap = g;
                return c.graphPath = m
            },
            drawGraph: function() {
                var a = this,
                    b = this.options,
                    d = (this.gappedPath ||
                        this.getGraphPath).call(this),
                    c = [
                        ["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]
                    ];
                v(this.zones, function(d, e) {
                    c.push(["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (d.className || ""), d.color || a.color, d.dashStyle || b.dashStyle])
                });
                v(c, function(c, e) {
                    var k = c[0],
                        f = a[k];
                    f ? (f.endX = a.preventGraphAnimation ? null : d.xMap, f.animate({
                        d: d
                    })) : d.length && (a[k] = a.chart.renderer.path(d).addClass(c[1]).attr({
                        zIndex: 1
                    }).add(a.group), f = {
                        stroke: c[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph &&
                            a.color || "none"
                    }, c[3] ? f.dashstyle = c[3] : "square" !== b.linecap && (f["stroke-linecap"] = f["stroke-linejoin"] = "round"), f = a[k].attr(f).shadow(2 > e && b.shadow));
                    f && (f.startX = d.xMap, f.isArea = d.isArea)
                })
            },
            applyZones: function() {
                var a = this,
                    b = this.chart,
                    d = b.renderer,
                    c = this.zones,
                    e, k, f = this.clips || [],
                    m, g = this.graph,
                    p = this.area,
                    u = Math.max(b.chartWidth, b.chartHeight),
                    l = this[(this.zoneAxis || "y") + "Axis"],
                    A, t, h = b.inverted,
                    n, H, D, q, r = !1;
                c.length && (g || p) && l && void 0 !== l.min && (t = l.reversed, n = l.horiz, g && g.hide(), p && p.hide(),
                    A = l.getExtremes(), v(c, function(c, w) {
                        e = t ? n ? b.plotWidth : 0 : n ? 0 : l.toPixels(A.min);
                        e = Math.min(Math.max(B(k, e), 0), u);
                        k = Math.min(Math.max(Math.round(l.toPixels(B(c.value, A.max), !0)), 0), u);
                        r && (e = k = l.toPixels(A.max));
                        H = Math.abs(e - k);
                        D = Math.min(e, k);
                        q = Math.max(e, k);
                        l.isXAxis ? (m = {
                            x: h ? q : D,
                            y: 0,
                            width: H,
                            height: u
                        }, n || (m.x = b.plotHeight - m.x)) : (m = {
                            x: 0,
                            y: h ? q : D,
                            width: u,
                            height: H
                        }, n && (m.y = b.plotWidth - m.y));
                        h && d.isVML && (m = l.isXAxis ? {
                            x: 0,
                            y: t ? D : q,
                            height: m.width,
                            width: b.chartWidth
                        } : {
                            x: m.y - b.plotLeft - b.spacingBox.x,
                            y: 0,
                            width: m.height,
                            height: b.chartHeight
                        });
                        f[w] ? f[w].animate(m) : (f[w] = d.clipRect(m), g && a["zone-graph-" + w].clip(f[w]), p && a["zone-area-" + w].clip(f[w]));
                        r = c.value > A.max
                    }), this.clips = f)
            },
            invertGroups: function(a) {
                function b() {
                    v(["group", "markerGroup"], function(b) {
                        d[b] && (c.renderer.isVML && d[b].attr({
                            width: d.yAxis.len,
                            height: d.xAxis.len
                        }), d[b].width = d.yAxis.len, d[b].height = d.xAxis.len, d[b].invert(a))
                    })
                }
                var d = this,
                    c = d.chart,
                    e;
                d.xAxis && (e = C(c, "resize", b), C(d, "destroy", e), b(a), d.invertGroups = b)
            },
            plotGroup: function(a, b, d, c, e) {
                var f =
                    this[a],
                    m = !f;
                m && (this[a] = f = this.chart.renderer.g().attr({
                    zIndex: c || .1
                }).add(e));
                f.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (q(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (f.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                f.attr({
                    visibility: d
                })[m ? "attr" : "animate"](this.getPlotBox());
                return f
            },
            getPlotBox: function() {
                var a = this.chart,
                    b = this.xAxis,
                    d = this.yAxis;
                a.inverted && (b = d, d = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: d ? d.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    d, c = a.options,
                    e = !!a.animate && b.renderer.isSVG && G(c.animation).duration,
                    f = a.visible ? "inherit" : "hidden",
                    m = c.zIndex,
                    g = a.hasRendered,
                    p = b.seriesGroup,
                    l = b.inverted;
                d = a.plotGroup("group", "series", f, m, p);
                a.markerGroup = a.plotGroup("markerGroup", "markers", f, m, p);
                e && a.animate(!0);
                d.inverted = a.isCartesian ? l : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(l);
                !1 === c.clip || a.sharedClipKey || g || d.clip(b.clipRect);
                e && a.animate();
                g || (a.animationTimeout = u(function() {
                    a.afterAnimate()
                }, e));
                a.isDirty = !1;
                a.hasRendered = !0
            },
            redraw: function() {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    d = this.group,
                    c = this.xAxis,
                    e = this.yAxis;
                d && (a.inverted && d.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), d.animate({
                    translateX: B(c && c.left, a.plotLeft),
                    translateY: B(e && e.top,
                        a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(a, b) {
                var d = this.xAxis,
                    c = this.yAxis,
                    e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? d.len - a.chartY + d.pos : a.chartX - d.pos,
                    plotY: e ? c.len - a.chartX + c.pos : a.chartY - c.pos
                }, b)
            },
            buildKDTree: function() {
                function a(d, c, e) {
                    var f, k;
                    if (k = d && d.length) return f = b.kdAxisArray[c % e], d.sort(function(a, d) {
                        return a[f] - d[f]
                    }), k = Math.floor(k / 2), {
                        point: d[k],
                        left: a(d.slice(0, k), c + 1, e),
                        right: a(d.slice(k +
                            1), c + 1, e)
                    }
                }
                this.buildingKdTree = !0;
                var b = this,
                    d = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete b.kdTree;
                u(function() {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), d, d);
                    b.buildingKdTree = !1
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function(a, b) {
                function d(a, b, k, g) {
                    var p = b.point,
                        u = c.kdAxisArray[k % g],
                        w, l, A = p;
                    l = q(a[e]) && q(p[e]) ? Math.pow(a[e] - p[e], 2) : null;
                    w = q(a[f]) && q(p[f]) ? Math.pow(a[f] - p[f], 2) : null;
                    w = (l || 0) + (w || 0);
                    p.dist = q(w) ? Math.sqrt(w) : Number.MAX_VALUE;
                    p.distX = q(l) ? Math.sqrt(l) : Number.MAX_VALUE;
                    u = a[u] - p[u];
                    w = 0 > u ? "left" : "right";
                    l = 0 > u ? "right" : "left";
                    b[w] && (w = d(a, b[w], k + 1, g), A = w[m] < A[m] ? w : p);
                    b[l] && Math.sqrt(u * u) < A[m] && (a = d(a, b[l], k + 1, g), A = a[m] < A[m] ? a : A);
                    return A
                }
                var c = this,
                    e = this.kdAxisArray[0],
                    f = this.kdAxisArray[1],
                    m = b ? "distX" : "dist";
                b = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree();
                if (this.kdTree) return d(a, this.kdTree, b, b)
            }
        })
    })(L);
    (function(a) {
        var C = a.Axis,
            G = a.Chart,
            E = a.correctFloat,
            r = a.defined,
            n = a.destroyObjectProperties,
            h = a.each,
            x =
            a.format,
            q = a.objectEach,
            v = a.pick,
            y = a.Series;
        a.StackItem = function(a, c, l, b, f) {
            var g = a.chart.inverted;
            this.axis = a;
            this.isNegative = l;
            this.options = c;
            this.x = b;
            this.total = null;
            this.points = {};
            this.stack = f;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: c.align || (g ? l ? "left" : "right" : "center"),
                verticalAlign: c.verticalAlign || (g ? "middle" : l ? "bottom" : "top"),
                y: v(c.y, g ? 4 : l ? 14 : -6),
                x: v(c.x, g ? l ? -6 : 6 : 0)
            };
            this.textAlign = c.textAlign || (g ? l ? "right" : "left" : "center")
        };
        a.StackItem.prototype = {
            destroy: function() {
                n(this,
                    this.axis)
            },
            render: function(a) {
                var c = this.axis.chart,
                    g = this.options,
                    b = g.format,
                    b = b ? x(b, this, c.time) : g.formatter.call(this);
                this.label ? this.label.attr({
                    text: b,
                    visibility: "hidden"
                }) : this.label = c.renderer.text(b, null, null, g.useHTML).css(g.style).attr({
                    align: this.textAlign,
                    rotation: g.rotation,
                    visibility: "hidden"
                }).add(a)
            },
            setOffset: function(a, c) {
                var g = this.axis,
                    b = g.chart,
                    f = g.translate(g.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    g = g.translate(0),
                    g = Math.abs(f - g);
                a = b.xAxis[0].translate(this.x) + a;
                f = this.getStackBox(b,
                    this, a, f, c, g);
                if (c = this.label) c.align(this.alignOptions, null, f), f = c.alignAttr, c[!1 === this.options.crop || b.isInsidePlot(f.x, f.y) ? "show" : "hide"](!0)
            },
            getStackBox: function(a, c, l, b, f, p) {
                var g = c.axis.reversed,
                    e = a.inverted;
                a = a.plotHeight;
                c = c.isNegative && !g || !c.isNegative && g;
                return {
                    x: e ? c ? b : b - p : l,
                    y: e ? a - l - f : c ? a - b - p : a - b,
                    width: e ? p : f,
                    height: e ? f : p
                }
            }
        };
        G.prototype.getStacks = function() {
            var a = this;
            h(a.yAxis, function(a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            h(a.series, function(c) {
                !c.options.stacking ||
                    !0 !== c.visible && !1 !== a.options.chart.ignoreHiddenSeries || (c.stackKey = c.type + v(c.options.stack, ""))
            })
        };
        C.prototype.buildStacks = function() {
            var a = this.series,
                c = v(this.options.reversedStacks, !0),
                l = a.length,
                b;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (b = l; b--;) a[c ? b : l - b - 1].setStackedPoints();
                for (b = 0; b < l; b++) a[b].modifyStacks()
            }
        };
        C.prototype.renderStackTotals = function() {
            var a = this.chart,
                c = a.renderer,
                l = this.stacks,
                b = this.stackTotalGroup;
            b || (this.stackTotalGroup = b = c.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            b.translate(a.plotLeft, a.plotTop);
            q(l, function(a) {
                q(a, function(a) {
                    a.render(b)
                })
            })
        };
        C.prototype.resetStacks = function() {
            var a = this,
                c = a.stacks;
            a.isXAxis || q(c, function(c) {
                q(c, function(b, f) {
                    b.touched < a.stacksTouched ? (b.destroy(), delete c[f]) : (b.total = null, b.cumulative = null)
                })
            })
        };
        C.prototype.cleanStacks = function() {
            var a;
            this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), q(a, function(a) {
                q(a, function(a) {
                    a.cumulative = a.total
                })
            }))
        };
        y.prototype.setStackedPoints = function() {
            if (this.options.stacking &&
                (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var g = this.processedXData,
                    c = this.processedYData,
                    l = [],
                    b = c.length,
                    f = this.options,
                    p = f.threshold,
                    t = v(f.startFromThreshold && p, 0),
                    e = f.stack,
                    f = f.stacking,
                    h = this.stackKey,
                    n = "-" + h,
                    m = this.negStacks,
                    A = this.yAxis,
                    u = A.stacks,
                    H = A.oldStacks,
                    q, K, d, w, F, k, z;
                A.stacksTouched += 1;
                for (F = 0; F < b; F++) k = g[F], z = c[F], q = this.getStackIndicator(q, k, this.index), w = q.key, d = (K = m && z < (t ? 0 : p)) ? n : h, u[d] || (u[d] = {}), u[d][k] || (H[d] && H[d][k] ? (u[d][k] = H[d][k], u[d][k].total =
                    null) : u[d][k] = new a.StackItem(A, A.options.stackLabels, K, k, e)), d = u[d][k], null !== z ? (d.points[w] = d.points[this.index] = [v(d.cumulative, t)], r(d.cumulative) || (d.base = w), d.touched = A.stacksTouched, 0 < q.index && !1 === this.singleStacks && (d.points[w][0] = d.points[this.index + "," + k + ",0"][0])) : d.points[w] = d.points[this.index] = null, "percent" === f ? (K = K ? h : n, m && u[K] && u[K][k] ? (K = u[K][k], d.total = K.total = Math.max(K.total, d.total) + Math.abs(z) || 0) : d.total = E(d.total + (Math.abs(z) || 0))) : d.total = E(d.total + (z || 0)), d.cumulative = v(d.cumulative,
                    t) + (z || 0), null !== z && (d.points[w].push(d.cumulative), l[F] = d.cumulative);
                "percent" === f && (A.usePercentage = !0);
                this.stackedYData = l;
                A.oldStacks = {}
            }
        };
        y.prototype.modifyStacks = function() {
            var a = this,
                c = a.stackKey,
                l = a.yAxis.stacks,
                b = a.processedXData,
                f, p = a.options.stacking;
            a[p + "Stacker"] && h([c, "-" + c], function(c) {
                for (var e = b.length, g, h; e--;)
                    if (g = b[e], f = a.getStackIndicator(f, g, a.index, c), h = (g = l[c] && l[c][g]) && g.points[f.key]) a[p + "Stacker"](h, g, e)
            })
        };
        y.prototype.percentStacker = function(a, c, l) {
            c = c.total ? 100 / c.total :
                0;
            a[0] = E(a[0] * c);
            a[1] = E(a[1] * c);
            this.stackedYData[l] = a[1]
        };
        y.prototype.getStackIndicator = function(a, c, l, b) {
            !r(a) || a.x !== c || b && a.key !== b ? a = {
                x: c,
                index: 0,
                key: b
            } : a.index++;
            a.key = [l, c, a.index].join();
            return a
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.animate,
            E = a.Axis,
            r = a.createElement,
            n = a.css,
            h = a.defined,
            x = a.each,
            q = a.erase,
            v = a.extend,
            y = a.fireEvent,
            g = a.inArray,
            c = a.isNumber,
            l = a.isObject,
            b = a.isArray,
            f = a.merge,
            p = a.objectEach,
            t = a.pick,
            e = a.Point,
            B = a.Series,
            D = a.seriesTypes,
            m = a.setAnimation,
            A = a.splat;
        v(a.Chart.prototype, {
            addSeries: function(a, b, c) {
                var e, d = this;
                a && (b = t(b, !0), y(d, "addSeries", {
                    options: a
                }, function() {
                    e = d.initSeries(a);
                    d.isDirtyLegend = !0;
                    d.linkSeries();
                    b && d.redraw(c)
                }));
                return e
            },
            addAxis: function(a, b, c, e) {
                var d = b ? "xAxis" : "yAxis",
                    m = this.options;
                a = f(a, {
                    index: this[d].length,
                    isX: b
                });
                b = new E(this, a);
                m[d] = A(m[d] || {});
                m[d].push(a);
                t(c, !0) && this.redraw(e);
                return b
            },
            showLoading: function(a) {
                var b = this,
                    c = b.options,
                    e = b.loadingDiv,
                    d = c.loading,
                    f = function() {
                        e && n(e, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth +
                                "px",
                            height: b.plotHeight + "px"
                        })
                    };
                e || (b.loadingDiv = e = r("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = r("span", {
                    className: "highcharts-loading-inner"
                }, null, e), C(b, "redraw", f));
                e.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                n(e, v(d.style, {
                    zIndex: 10
                }));
                n(b.loadingSpan, d.labelStyle);
                b.loadingShown || (n(e, {
                    opacity: 0,
                    display: ""
                }), G(e, {
                    opacity: d.style.opacity || .5
                }, {
                    duration: d.showDuration || 0
                }));
                b.loadingShown = !0;
                f()
            },
            hideLoading: function() {
                var a =
                    this.options,
                    b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", G(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function() {
                        n(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            update: function(a, b, e) {
                var m = this,
                    d = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    },
                    w = a.chart,
                    u, k, l = [];
                if (w) {
                    f(!0, m.options.chart, w);
                    "className" in w && m.setClassName(w.className);
                    if ("inverted" in w || "polar" in w) m.propFromSeries(), u = !0;
                    "alignTicks" in w && (u = !0);
                    p(w, function(a, b) {
                        -1 !== g("chart." + b, m.propsRequireUpdateSeries) && (k = !0); - 1 !== g(b, m.propsRequireDirtyBox) &&
                            (m.isDirtyBox = !0)
                    });
                    "style" in w && m.renderer.setStyle(w.style)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && f(!0, this.options.plotOptions, a.plotOptions);
                p(a, function(a, b) {
                    if (m[b] && "function" === typeof m[b].update) m[b].update(a, !1);
                    else if ("function" === typeof m[d[b]]) m[d[b]](a);
                    "chart" !== b && -1 !== g(b, m.propsRequireUpdateSeries) && (k = !0)
                });
                x("xAxis yAxis zAxis series colorAxis pane".split(" "), function(b) {
                    a[b] && (x(A(a[b]), function(a, d) {
                        (d = h(a.id) && m.get(a.id) || m[b][d]) && d.coll === b && (d.update(a, !1), e && (d.touched = !0));
                        if (!d && e)
                            if ("series" === b) m.addSeries(a, !1).touched = !0;
                            else if ("xAxis" === b || "yAxis" === b) m.addAxis(a, "xAxis" === b, !1).touched = !0
                    }), e && x(m[b], function(a) {
                        a.touched ? delete a.touched : l.push(a)
                    }))
                });
                x(l, function(a) {
                    a.remove(!1)
                });
                u && x(m.axes, function(a) {
                    a.update({}, !1)
                });
                k && x(m.series, function(a) {
                    a.update({}, !1)
                });
                a.loading && f(!0, m.options.loading, a.loading);
                u = w && w.width;
                w = w && w.height;
                c(u) && u !== m.chartWidth || c(w) && w !== m.chartHeight ? m.setSize(u, w) : t(b, !0) && m.redraw()
            },
            setSubtitle: function(a) {
                this.setTitle(void 0,
                    a)
            }
        });
        v(e.prototype, {
            update: function(a, b, c, e) {
                function d() {
                    f.applyOptions(a);
                    null === f.y && k && (f.graphic = k.destroy());
                    l(a, !0) && (k && k.element && a && a.marker && void 0 !== a.marker.symbol && (f.graphic = k.destroy()), a && a.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy()), f.connector && (f.connector = f.connector.destroy()));
                    g = f.index;
                    m.updateParallelArrays(f, g);
                    u.data[g] = l(u.data[g], !0) || l(a, !0) ? f.options : a;
                    m.isDirty = m.isDirtyData = !0;
                    !m.fixedBox && m.hasCartesianSeries && (p.isDirtyBox = !0);
                    "point" === u.legendType &&
                        (p.isDirtyLegend = !0);
                    b && p.redraw(c)
                }
                var f = this,
                    m = f.series,
                    k = f.graphic,
                    g, p = m.chart,
                    u = m.options;
                b = t(b, !0);
                !1 === e ? d() : f.firePointEvent("update", {
                    options: a
                }, d)
            },
            remove: function(a, b) {
                this.series.removePoint(g(this, this.series.data), a, b)
            }
        });
        v(B.prototype, {
            addPoint: function(a, b, c, e) {
                var d = this.options,
                    f = this.data,
                    m = this.chart,
                    k = this.xAxis,
                    k = k && k.hasNames && k.names,
                    g = d.data,
                    p, u, A = this.xData,
                    l, h;
                b = t(b, !0);
                p = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(p, [a]);
                h = p.x;
                l = A.length;
                if (this.requireSorting &&
                    h < A[l - 1])
                    for (u = !0; l && A[l - 1] > h;) l--;
                this.updateParallelArrays(p, "splice", l, 0, 0);
                this.updateParallelArrays(p, l);
                k && p.name && (k[h] = p.name);
                g.splice(l, 0, a);
                u && (this.data.splice(l, 0, null), this.processData());
                "point" === d.legendType && this.generatePoints();
                c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(p, "shift"), g.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && m.redraw(e)
            },
            removePoint: function(a, b, c) {
                var e = this,
                    d = e.data,
                    f = d[a],
                    g = e.points,
                    k = e.chart,
                    p = function() {
                        g && g.length === d.length &&
                            g.splice(a, 1);
                        d.splice(a, 1);
                        e.options.data.splice(a, 1);
                        e.updateParallelArrays(f || {
                            series: e
                        }, "splice", a, 1);
                        f && f.destroy();
                        e.isDirty = !0;
                        e.isDirtyData = !0;
                        b && k.redraw()
                    };
                m(c, k);
                b = t(b, !0);
                f ? f.firePointEvent("remove", null, p) : p()
            },
            remove: function(a, b, c) {
                function e() {
                    d.destroy();
                    f.isDirtyLegend = f.isDirtyBox = !0;
                    f.linkSeries();
                    t(a, !0) && f.redraw(b)
                }
                var d = this,
                    f = d.chart;
                !1 !== c ? y(d, "remove", null, e) : e()
            },
            update: function(a, b) {
                var c = this,
                    e = c.chart,
                    d = c.userOptions,
                    m = c.oldType || c.type,
                    g = a.type || d.type || e.options.chart.type,
                    k = D[m].prototype,
                    p, u = ["group", "markerGroup", "dataLabelsGroup"],
                    l = ["navigatorSeries", "baseSeries"],
                    A = c.finishedAnimating && {
                        animation: !1
                    };
                if (Object.keys && "data" === Object.keys(a).toString()) return this.setData(a.data, b);
                l = u.concat(l);
                x(l, function(a) {
                    l[a] = c[a];
                    delete c[a]
                });
                a = f(d, A, {
                    index: c.index,
                    pointStart: c.xData[0]
                }, {
                    data: c.options.data
                }, a);
                c.remove(!1, null, !1);
                for (p in k) c[p] = void 0;
                v(c, D[g || m].prototype);
                x(l, function(a) {
                    c[a] = l[a]
                });
                c.init(e, a);
                a.zIndex !== d.zIndex && x(u, function(b) {
                    c[b] && c[b].attr({
                        zIndex: a.zIndex
                    })
                });
                c.oldType = m;
                e.linkSeries();
                t(b, !0) && e.redraw(!1)
            }
        });
        v(E.prototype, {
            update: function(a, b) {
                var c = this.chart;
                a = c.options[this.coll][this.options.index] = f(this.userOptions, a);
                this.destroy(!0);
                this.init(c, v(a, {
                    events: void 0
                }));
                c.isDirtyBox = !0;
                t(b, !0) && c.redraw()
            },
            remove: function(a) {
                for (var c = this.chart, e = this.coll, f = this.series, d = f.length; d--;) f[d] && f[d].remove(!1);
                q(c.axes, this);
                q(c[e], this);
                b(c.options[e]) ? c.options[e].splice(this.options.index, 1) : delete c.options[e];
                x(c[e], function(a, b) {
                    a.options.index =
                        b
                });
                this.destroy();
                c.isDirtyBox = !0;
                t(a, !0) && c.redraw()
            },
            setTitle: function(a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function(a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    })(L);
    (function(a) {
        var C = a.color,
            G = a.each,
            E = a.map,
            r = a.pick,
            n = a.Series,
            h = a.seriesType;
        h("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function(h) {
                var n = [],
                    v = [],
                    x = this.xAxis,
                    g = this.yAxis,
                    c = g.stacks[this.stackKey],
                    l = {},
                    b = this.index,
                    f = g.series,
                    p = f.length,
                    t, e = r(g.options.reversedStacks, !0) ? 1 : -1,
                    B;
                h = h || this.points;
                if (this.options.stacking) {
                    for (B = 0; B < h.length; B++) h[B].leftNull = h[B].rightNull = null, l[h[B].x] = h[B];
                    a.objectEach(c, function(a, b) {
                        null !== a.total && v.push(b)
                    });
                    v.sort(function(a, b) {
                        return a - b
                    });
                    t = E(f, function() {
                        return this.visible
                    });
                    G(v, function(a, f) {
                        var m = 0,
                            u, h;
                        if (l[a] && !l[a].isNull) n.push(l[a]), G([-1, 1], function(m) {
                            var g = 1 === m ? "rightNull" : "leftNull",
                                d = 0,
                                w = c[v[f + m]];
                            if (w)
                                for (B = b; 0 <= B && B < p;) u = w.points[B], u || (B === b ? l[a][g] = !0 : t[B] && (h = c[a].points[B]) && (d -= h[1] - h[0])), B += e;
                            l[a][1 === m ? "rightCliff" : "leftCliff"] =
                                d
                        });
                        else {
                            for (B = b; 0 <= B && B < p;) {
                                if (u = c[a].points[B]) {
                                    m = u[1];
                                    break
                                }
                                B += e
                            }
                            m = g.translate(m, 0, 1, 0, 1);
                            n.push({
                                isNull: !0,
                                plotX: x.translate(a, 0, 0, 0, 1),
                                x: a,
                                plotY: m,
                                yBottom: m
                            })
                        }
                    })
                }
                return n
            },
            getGraphPath: function(a) {
                var h = n.prototype.getGraphPath,
                    v = this.options,
                    x = v.stacking,
                    g = this.yAxis,
                    c, l, b = [],
                    f = [],
                    p = this.index,
                    t, e = g.stacks[this.stackKey],
                    B = v.threshold,
                    D = g.getThreshold(v.threshold),
                    m, v = v.connectNulls || "percent" === x,
                    A = function(c, m, l) {
                        var u = a[c];
                        c = x && e[u.x].points[p];
                        var d = u[l + "Null"] || 0;
                        l = u[l + "Cliff"] || 0;
                        var w,
                            A, u = !0;
                        l || d ? (w = (d ? c[0] : c[1]) + l, A = c[0] + l, u = !!d) : !x && a[m] && a[m].isNull && (w = A = B);
                        void 0 !== w && (f.push({
                            plotX: t,
                            plotY: null === w ? D : g.getThreshold(w),
                            isNull: u,
                            isCliff: !0
                        }), b.push({
                            plotX: t,
                            plotY: null === A ? D : g.getThreshold(A),
                            doCurve: !1
                        }))
                    };
                a = a || this.points;
                x && (a = this.getStackPoints(a));
                for (c = 0; c < a.length; c++)
                    if (l = a[c].isNull, t = r(a[c].rectPlotX, a[c].plotX), m = r(a[c].yBottom, D), !l || v) v || A(c, c - 1, "left"), l && !x && v || (f.push(a[c]), b.push({
                        x: c,
                        plotX: t,
                        plotY: m
                    })), v || A(c, c + 1, "right");
                c = h.call(this, f, !0, !0);
                b.reversed = !0;
                l = h.call(this, b, !0, !0);
                l.length && (l[0] = "L");
                l = c.concat(l);
                h = h.call(this, f, !1, v);
                l.xMap = c.xMap;
                this.areaPath = l;
                return h
            },
            drawGraph: function() {
                this.areaPath = [];
                n.prototype.drawGraph.apply(this);
                var a = this,
                    h = this.areaPath,
                    v = this.options,
                    y = [
                        ["area", "highcharts-area", this.color, v.fillColor]
                    ];
                G(this.zones, function(g, c) {
                    y.push(["zone-area-" + c, "highcharts-area highcharts-zone-area-" + c + " " + g.className, g.color || a.color, g.fillColor || v.fillColor])
                });
                G(y, function(g) {
                    var c = g[0],
                        l = a[c];
                    l ? (l.endX = a.preventGraphAnimation ?
                        null : h.xMap, l.animate({
                            d: h
                        })) : (l = a[c] = a.chart.renderer.path(h).addClass(g[1]).attr({
                        fill: r(g[3], C(g[2]).setOpacity(r(v.fillOpacity, .75)).get()),
                        zIndex: 0
                    }).add(a.group), l.isArea = !0);
                    l.startX = h.xMap;
                    l.shiftUnit = v.step ? 2 : 1
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(L);
    (function(a) {
        var C = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function(a, E, r) {
                var n = E.plotX,
                    h = E.plotY,
                    x = a[r - 1];
                r = a[r + 1];
                var q, v, y, g;
                if (x && !x.isNull && !1 !== x.doCurve && !E.isCliff && r && !r.isNull && !1 !== r.doCurve &&
                    !E.isCliff) {
                    a = x.plotY;
                    y = r.plotX;
                    r = r.plotY;
                    var c = 0;
                    q = (1.5 * n + x.plotX) / 2.5;
                    v = (1.5 * h + a) / 2.5;
                    y = (1.5 * n + y) / 2.5;
                    g = (1.5 * h + r) / 2.5;
                    y !== q && (c = (g - v) * (y - n) / (y - q) + h - g);
                    v += c;
                    g += c;
                    v > a && v > h ? (v = Math.max(a, h), g = 2 * h - v) : v < a && v < h && (v = Math.min(a, h), g = 2 * h - v);
                    g > r && g > h ? (g = Math.max(r, h), v = 2 * h - g) : g < r && g < h && (g = Math.min(r, h), v = 2 * h - g);
                    E.rightContX = y;
                    E.rightContY = g
                }
                E = ["C", C(x.rightContX, x.plotX), C(x.rightContY, x.plotY), C(q, n), C(v, h), n, h];
                x.rightContX = x.rightContY = null;
                return E
            }
        })
    })(L);
    (function(a) {
        var C = a.seriesTypes.area.prototype,
            G = a.seriesType;
        G("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: C.getStackPoints,
            getGraphPath: C.getGraphPath,
            drawGraph: C.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(L);
    (function(a) {
        var C = a.animObject,
            G = a.color,
            E = a.each,
            r = a.extend,
            n = a.isNumber,
            h = a.merge,
            x = a.pick,
            q = a.Series,
            v = a.seriesType,
            y = a.svg;
        v("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000"
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function() {
                q.prototype.init.apply(this, arguments);
                var a = this,
                    c = a.chart;
                c.hasRendered && E(c.series, function(c) {
                    c.type === a.type && (c.isDirty = !0)
                })
            },
            getColumnMetrics: function() {
                var a = this,
                    c = a.options,
                    l = a.xAxis,
                    b = a.yAxis,
                    f = l.reversed,
                    p, h = {},
                    e = 0;
                !1 === c.grouping ? e = 1 : E(a.chart.series, function(c) {
                    var f = c.options,
                        m = c.yAxis,
                        g;
                    c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries || b.len !== m.len || b.pos !== m.pos || (f.stacking ? (p = c.stackKey, void 0 === h[p] && (h[p] = e++), g = h[p]) : !1 !== f.grouping && (g = e++), c.columnIndex = g)
                });
                var n = Math.min(Math.abs(l.transA) * (l.ordinalSlope || c.pointRange || l.closestPointRange || l.tickInterval || 1), l.len),
                    D = n * c.groupPadding,
                    m = (n - 2 * D) / (e || 1),
                    c = Math.min(c.maxPointWidth || l.len, x(c.pointWidth,
                        m * (1 - 2 * c.pointPadding)));
                a.columnMetrics = {
                    width: c,
                    offset: (m - c) / 2 + (D + ((a.columnIndex || 0) + (f ? 1 : 0)) * m - n / 2) * (f ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function(a, c, l, b) {
                var f = this.chart,
                    g = this.borderWidth,
                    h = -(g % 2 ? .5 : 0),
                    g = g % 2 ? .5 : 1;
                f.inverted && f.renderer.isVML && (g += 1);
                this.options.crisp && (l = Math.round(a + l) + h, a = Math.round(a) + h, l -= a);
                b = Math.round(c + b) + g;
                h = .5 >= Math.abs(c) && .5 < b;
                c = Math.round(c) + g;
                b -= c;
                h && b && (--c, b += 1);
                return {
                    x: a,
                    y: c,
                    width: l,
                    height: b
                }
            },
            translate: function() {
                var a = this,
                    c = a.chart,
                    l = a.options,
                    b =
                    a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    b = a.borderWidth = x(l.borderWidth, b ? 0 : 1),
                    f = a.yAxis,
                    p = l.threshold,
                    h = a.translatedThreshold = f.getThreshold(p),
                    e = x(l.minPointLength, 5),
                    n = a.getColumnMetrics(),
                    D = n.width,
                    m = a.barW = Math.max(D, 1 + 2 * b),
                    A = a.pointXOffset = n.offset;
                c.inverted && (h -= .5);
                l.pointPadding && (m = Math.ceil(m));
                q.prototype.translate.apply(a);
                E(a.points, function(b) {
                    var g = x(b.yBottom, h),
                        u = 999 + Math.abs(g),
                        u = Math.min(Math.max(-u, b.plotY), f.len + u),
                        l = b.plotX + A,
                        d = m,
                        w = Math.min(u, g),
                        t, k = Math.max(u, g) - w;
                    e &&
                        Math.abs(k) < e && (k = e, t = !f.reversed && !b.negative || f.reversed && b.negative, b.y === p && a.dataMax <= p && f.min < p && (t = !t), w = Math.abs(w - h) > e ? g - e : h - (t ? e : 0));
                    b.barX = l;
                    b.pointWidth = D;
                    b.tooltipPos = c.inverted ? [f.len + f.pos - c.plotLeft - u, a.xAxis.len - l - d / 2, k] : [l + d / 2, u + f.pos - c.plotTop, k];
                    b.shapeType = "rect";
                    b.shapeArgs = a.crispCol.apply(a, b.isNull ? [l, h, d, 0] : [l, w, d, k])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function(a, c) {
                var g = this.options,
                    b, f = this.pointAttrToOptions || {};
                b = f.stroke || "borderColor";
                var p = f["stroke-width"] || "borderWidth",
                    t = a && a.color || this.color,
                    e = a && a[b] || g[b] || this.color || t,
                    n = a && a[p] || g[p] || this[p] || 0,
                    f = g.dashStyle;
                a && this.zones.length && (t = a.getZone(), t = a.options.color || t && t.color || this.color);
                c && (a = h(g.states[c], a.options.states && a.options.states[c] || {}), c = a.brightness, t = a.color || void 0 !== c && G(t).brighten(a.brightness).get() || t, e = a[b] || e, n = a[p] || n, f = a.dashStyle || f);
                b = {
                    fill: t,
                    stroke: e,
                    "stroke-width": n
                };
                f && (b.dashstyle = f);
                return b
            },
            drawPoints: function() {
                var a = this,
                    c = this.chart,
                    l = a.options,
                    b = c.renderer,
                    f = l.animationLimit || 250,
                    p;
                E(a.points, function(g) {
                    var e = g.graphic;
                    if (n(g.plotY) && null !== g.y) {
                        p = g.shapeArgs;
                        if (e) e[c.pointCount < f ? "animate" : "attr"](h(p));
                        else g.graphic = e = b[g.shapeType](p).add(g.group || a.group);
                        l.borderRadius && e.attr({
                            r: l.borderRadius
                        });
                        e.attr(a.pointAttribs(g, g.selected && "select")).shadow(l.shadow, null, l.stacking && !l.borderRadius);
                        e.addClass(g.getClassName(), !0)
                    } else e && (g.graphic = e.destroy())
                })
            },
            animate: function(a) {
                var c = this,
                    g = this.yAxis,
                    b = c.options,
                    f = this.chart.inverted,
                    p = {},
                    h = f ? "translateX" : "translateY",
                    e;
                y && (a ? (p.scaleY = .001, a = Math.min(g.pos + g.len, Math.max(g.pos, g.toPixels(b.threshold))), f ? p.translateX = a - g.len : p.translateY = a, c.group.attr(p)) : (e = c.group.attr(h), c.group.animate({
                    scaleY: 1
                }, r(C(c.options.animation), {
                    step: function(a, b) {
                        p[h] = e + b.pos * (g.pos - e);
                        c.group.attr(p)
                    }
                })), c.animate = null))
            },
            remove: function() {
                var a = this,
                    c = a.chart;
                c.hasRendered && E(c.series,
                    function(c) {
                        c.type === a.type && (c.isDirty = !0)
                    });
                q.prototype.remove.apply(a, arguments)
            }
        })
    })(L);
    (function(a) {
        a = a.seriesType;
        a("bar", "column", null, {
            inverted: !0
        })
    })(L);
    (function(a) {
        var C = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function() {
                this.options.lineWidth && C.prototype.drawGraph.call(this)
            }
        })
    })(L);
    (function(a) {
        var C = a.deg2rad,
            G = a.isNumber,
            E = a.pick,
            r = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function() {
                var a = this.options,
                    h = this.chart,
                    x = 2 * (a.slicedOffset || 0),
                    q = h.plotWidth - 2 * x,
                    h = h.plotHeight - 2 * x,
                    v = a.center,
                    v = [E(v[0], "50%"), E(v[1], "50%"), a.size || "100%", a.innerSize || 0],
                    y = Math.min(q,
                        h),
                    g, c;
                for (g = 0; 4 > g; ++g) c = v[g], a = 2 > g || 2 === g && /%$/.test(c), v[g] = r(c, [q, h, y, v[2]][g]) + (a ? x : 0);
                v[3] > v[2] && (v[3] = v[2]);
                return v
            },
            getStartAndEndRadians: function(a, h) {
                a = G(a) ? a : 0;
                h = G(h) && h > a && 360 > h - a ? h : a + 360;
                return {
                    start: C * (a + -90),
                    end: C * (h + -90)
                }
            }
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.CenteredSeriesMixin,
            E = a.defined,
            r = a.each,
            n = a.extend,
            h = G.getStartAndEndRadians,
            x = a.inArray,
            q = a.noop,
            v = a.pick,
            y = a.Point,
            g = a.Series,
            c = a.seriesType,
            l = a.setAnimation;
        c("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30,
                enabled: !0,
                formatter: function() {
                    return this.point.isNull ? void 0 : this.point.name
                },
                x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            states: {
                hover: {
                    brightness: .1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function(a) {
                var b = this,
                    c = b.points,
                    g = b.startAngleRad;
                a || (r(c, function(a) {
                    var c = a.graphic,
                        e = a.shapeArgs;
                    c && (c.attr({
                        r: a.startR || b.center[3] / 2,
                        start: g,
                        end: g
                    }), c.animate({
                        r: e.r,
                        start: e.start,
                        end: e.end
                    }, b.options.animation))
                }), b.animate = null)
            },
            updateTotals: function() {
                var a, c = 0,
                    g = this.points,
                    l = g.length,
                    e, h = this.options.ignoreHiddenPoint;
                for (a = 0; a < l; a++) e = g[a], c += h && !e.visible ? 0 : e.isNull ? 0 : e.y;
                this.total = c;
                for (a = 0; a < l; a++) e = g[a], e.percentage = 0 < c && (e.visible || !h) ? e.y / c * 100 : 0, e.total = c
            },
            generatePoints: function() {
                g.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function(a) {
                this.generatePoints();
                var b = 0,
                    c = this.options,
                    g = c.slicedOffset,
                    e = g + (c.borderWidth || 0),
                    l, n, m, A = h(c.startAngle, c.endAngle),
                    u = this.startAngleRad = A.start,
                    A = (this.endAngleRad = A.end) - u,
                    q = this.points,
                    r, x = c.dataLabels.distance,
                    c = c.ignoreHiddenPoint,
                    d, w = q.length,
                    F;
                a || (this.center = a = this.getCenter());
                this.getX = function(b, d, c) {
                    m = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + c.labelDistance), 1));
                    return a[0] + (d ? -1 : 1) * Math.cos(m) * (a[2] / 2 + c.labelDistance)
                };
                for (d = 0; d < w; d++) {
                    F = q[d];
                    F.labelDistance = v(F.options.dataLabels && F.options.dataLabels.distance, x);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, F.labelDistance);
                    l = u + b * A;
                    if (!c || F.visible) b += F.percentage / 100;
                    n = u + b * A;
                    F.shapeType = "arc";
                    F.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * l) / 1E3,
                        end: Math.round(1E3 * n) / 1E3
                    };
                    m = (n + l) / 2;
                    m > 1.5 * Math.PI ? m -= 2 * Math.PI : m < -Math.PI / 2 && (m += 2 * Math.PI);
                    F.slicedTranslation = {
                        translateX: Math.round(Math.cos(m) * g),
                        translateY: Math.round(Math.sin(m) * g)
                    };
                    n = Math.cos(m) * a[2] /
                        2;
                    r = Math.sin(m) * a[2] / 2;
                    F.tooltipPos = [a[0] + .7 * n, a[1] + .7 * r];
                    F.half = m < -Math.PI / 2 || m > Math.PI / 2 ? 1 : 0;
                    F.angle = m;
                    l = Math.min(e, F.labelDistance / 5);
                    F.labelPos = [a[0] + n + Math.cos(m) * F.labelDistance, a[1] + r + Math.sin(m) * F.labelDistance, a[0] + n + Math.cos(m) * l, a[1] + r + Math.sin(m) * l, a[0] + n, a[1] + r, 0 > F.labelDistance ? "center" : F.half ? "right" : "left", m]
                }
            },
            drawGraph: null,
            drawPoints: function() {
                var a = this,
                    c = a.chart.renderer,
                    g, l, e, h, D = a.options.shadow;
                D && !a.shadowGroup && (a.shadowGroup = c.g("shadow").add(a.group));
                r(a.points, function(b) {
                    l =
                        b.graphic;
                    if (b.isNull) l && (b.graphic = l.destroy());
                    else {
                        h = b.shapeArgs;
                        g = b.getTranslate();
                        var f = b.shadowGroup;
                        D && !f && (f = b.shadowGroup = c.g("shadow").add(a.shadowGroup));
                        f && f.attr(g);
                        e = a.pointAttribs(b, b.selected && "select");
                        l ? l.setRadialReference(a.center).attr(e).animate(n(h, g)) : (b.graphic = l = c[b.shapeType](h).setRadialReference(a.center).attr(g).add(a.group), b.visible || l.attr({
                            visibility: "hidden"
                        }), l.attr(e).attr({
                            "stroke-linejoin": "round"
                        }).shadow(D, f));
                        l.addClass(b.getClassName())
                    }
                })
            },
            searchPoint: q,
            sortByAngle: function(a, c) {
                a.sort(function(a, b) {
                    return void 0 !== a.angle && (b.angle - a.angle) * c
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: G.getCenter,
            getSymbol: q
        }, {
            init: function() {
                y.prototype.init.apply(this, arguments);
                var a = this,
                    c;
                a.name = v(a.name, "Slice");
                c = function(b) {
                    a.slice("select" === b.type)
                };
                C(a, "select", c);
                C(a, "unselect", c);
                return a
            },
            isValid: function() {
                return a.isNumber(this.y, !0) && 0 <= this.y
            },
            setVisible: function(a, c) {
                var b = this,
                    f = b.series,
                    e = f.chart,
                    g = f.options.ignoreHiddenPoint;
                c = v(c, g);
                a !== b.visible && (b.visible = b.options.visible = a = void 0 === a ? !b.visible : a, f.options.data[x(b, f.data)] = b.options, r(["graphic", "dataLabel", "connector", "shadowGroup"], function(c) {
                    if (b[c]) b[c][a ? "show" : "hide"](!0)
                }), b.legendItem && e.legend.colorizeItem(b, a), a || "hover" !== b.state || b.setState(""), g && (f.isDirty = !0), c && e.redraw())
            },
            slice: function(a, c, g) {
                var b = this.series;
                l(g, b.chart);
                v(c, !0);
                this.sliced = this.options.sliced = E(a) ? a : !this.sliced;
                b.options.data[x(this, b.data)] = this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            },
            getTranslate: function() {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function(a) {
                var b = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(b.x, b.y, b.r + a, b.r + a, {
                    innerR: this.shapeArgs.r - 1,
                    start: b.start,
                    end: b.end
                })
            }
        })
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.arrayMax,
            E = a.defined,
            r = a.each,
            n = a.extend,
            h = a.format,
            x = a.map,
            q = a.merge,
            v = a.noop,
            y = a.pick,
            g = a.relativeLength,
            c =
            a.Series,
            l = a.seriesTypes,
            b = a.stableSort;
        a.distribute = function(a, c) {
            function f(a, b) {
                return a.target - b.target
            }
            var e, g = !0,
                p = a,
                m = [],
                l;
            l = 0;
            for (e = a.length; e--;) l += a[e].size;
            if (l > c) {
                b(a, function(a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (l = e = 0; l <= c;) l += a[e].size, e++;
                m = a.splice(e - 1, a.length)
            }
            b(a, f);
            for (a = x(a, function(a) {
                    return {
                        size: a.size,
                        targets: [a.target],
                        align: y(a.align, .5)
                    }
                }); g;) {
                for (e = a.length; e--;) g = a[e], l = (Math.min.apply(0, g.targets) + Math.max.apply(0, g.targets)) / 2, g.pos = Math.min(Math.max(0, l - g.size *
                    g.align), c - g.size);
                e = a.length;
                for (g = !1; e--;) 0 < e && a[e - 1].pos + a[e - 1].size > a[e].pos && (a[e - 1].size += a[e].size, a[e - 1].targets = a[e - 1].targets.concat(a[e].targets), a[e - 1].align = .5, a[e - 1].pos + a[e - 1].size > c && (a[e - 1].pos = c - a[e - 1].size), a.splice(e, 1), g = !0)
            }
            e = 0;
            r(a, function(a) {
                var b = 0;
                r(a.targets, function() {
                    p[e].pos = a.pos + b;
                    b += p[e].size;
                    e++
                })
            });
            p.push.apply(p, m);
            b(p, f)
        };
        c.prototype.drawDataLabels = function() {
            function b(a, b) {
                var d = b.filter;
                return d ? (b = d.operator, a = a[d.property], d = d.value, "\x3e" === b && a > d || "\x3c" ===
                    b && a < d || "\x3e\x3d" === b && a >= d || "\x3c\x3d" === b && a <= d || "\x3d\x3d" === b && a == d || "\x3d\x3d\x3d" === b && a === d ? !0 : !1) : !0
            }
            var c = this,
                g = c.chart,
                e = c.options,
                l = e.dataLabels,
                n = c.points,
                m, A, u = c.hasRendered || 0,
                H, v, x = y(l.defer, !!e.animation),
                d = g.renderer;
            if (l.enabled || c._hasPointLabels) c.dlProcessOptions && c.dlProcessOptions(l), v = c.plotGroup("dataLabelsGroup", "data-labels", x && !u ? "hidden" : "visible", l.zIndex || 6), x && (v.attr({
                opacity: +u
            }), u || C(c, "afterAnimate", function() {
                c.visible && v.show(!0);
                v[e.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), A = l, r(n, function(f) {
                var p, k = f.dataLabel,
                    u, w, n = f.connector,
                    t = !k,
                    D;
                m = f.dlOptions || f.options && f.options.dataLabels;
                (p = y(m && m.enabled, A.enabled) && !f.isNull) && (p = !0 === b(f, m || l));
                p && (l = q(A, m), u = f.getLabelConfig(), D = l[f.formatPrefix + "Format"] || l.format, H = E(D) ? h(D, u, g.time) : (l[f.formatPrefix + "Formatter"] || l.formatter).call(u, l), D = l.style, u = l.rotation, D.color = y(l.color, D.color, c.color, "#000000"), "contrast" === D.color && (f.contrastColor = d.getContrast(f.color || c.color), D.color = l.inside || 0 > y(f.labelDistance,
                    l.distance) || e.stacking ? f.contrastColor : "#000000"), e.cursor && (D.cursor = e.cursor), w = {
                    fill: l.backgroundColor,
                    stroke: l.borderColor,
                    "stroke-width": l.borderWidth,
                    r: l.borderRadius || 0,
                    rotation: u,
                    padding: l.padding,
                    zIndex: 1
                }, a.objectEach(w, function(a, b) {
                    void 0 === a && delete w[b]
                }));
                !k || p && E(H) ? p && E(H) && (k ? w.text = H : (k = f.dataLabel = u ? d.text(H, 0, -9999).addClass("highcharts-data-label") : d.label(H, 0, -9999, l.shape, null, null, l.useHTML, null, "data-label"), k.addClass(" highcharts-data-label-color-" + f.colorIndex + " " + (l.className ||
                    "") + (l.useHTML ? "highcharts-tracker" : ""))), k.attr(w), k.css(D).shadow(l.shadow), k.added || k.add(v), c.alignDataLabel(f, k, l, null, t)) : (f.dataLabel = k = k.destroy(), n && (f.connector = n.destroy()))
            })
        };
        c.prototype.alignDataLabel = function(a, b, c, e, g) {
            var f = this.chart,
                m = f.inverted,
                l = y(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                p = y(a.plotY, -9999),
                h = b.getBBox(),
                t, q = c.rotation,
                d = c.align,
                w = this.visible && (a.series.forceDL || f.isInsidePlot(l, Math.round(p), m) || e && f.isInsidePlot(l, m ? e.x + 1 : e.y + e.height - 1, m)),
                F = "justify" === y(c.overflow,
                    "justify");
            if (w && (t = c.style.fontSize, t = f.renderer.fontMetrics(t, b).b, e = n({
                        x: m ? this.yAxis.len - p : l,
                        y: Math.round(m ? this.xAxis.len - l : p),
                        width: 0,
                        height: 0
                    }, e), n(c, {
                        width: h.width,
                        height: h.height
                    }), q ? (F = !1, l = f.renderer.rotCorr(t, q), l = {
                        x: e.x + c.x + e.width / 2 + l.x,
                        y: e.y + c.y + {
                            top: 0,
                            middle: .5,
                            bottom: 1
                        }[c.verticalAlign] * e.height
                    }, b[g ? "attr" : "animate"](l).attr({
                        align: d
                    }), p = (q + 720) % 360, p = 180 < p && 360 > p, "left" === d ? l.y -= p ? h.height : 0 : "center" === d ? (l.x -= h.width / 2, l.y -= h.height / 2) : "right" === d && (l.x -= h.width, l.y -= p ? 0 : h.height)) :
                    (b.align(c, null, e), l = b.alignAttr), F ? a.isLabelJustified = this.justifyDataLabel(b, c, l, h, e, g) : y(c.crop, !0) && (w = f.isInsidePlot(l.x, l.y) && f.isInsidePlot(l.x + h.width, l.y + h.height)), c.shape && !q)) b[g ? "attr" : "animate"]({
                anchorX: m ? f.plotWidth - a.plotY : a.plotX,
                anchorY: m ? f.plotHeight - a.plotX : a.plotY
            });
            w || (b.attr({
                y: -9999
            }), b.placed = !1)
        };
        c.prototype.justifyDataLabel = function(a, b, c, e, g, l) {
            var f = this.chart,
                p = b.align,
                u = b.verticalAlign,
                h, n, t = a.box ? 0 : a.padding || 0;
            h = c.x + t;
            0 > h && ("right" === p ? b.align = "left" : b.x = -h, n = !0);
            h = c.x + e.width - t;
            h > f.plotWidth && ("left" === p ? b.align = "right" : b.x = f.plotWidth - h, n = !0);
            h = c.y + t;
            0 > h && ("bottom" === u ? b.verticalAlign = "top" : b.y = -h, n = !0);
            h = c.y + e.height - t;
            h > f.plotHeight && ("top" === u ? b.verticalAlign = "bottom" : b.y = f.plotHeight - h, n = !0);
            n && (a.placed = !l, a.align(b, null, g));
            return n
        };
        l.pie && (l.pie.prototype.drawDataLabels = function() {
            var b = this,
                g = b.data,
                l, e = b.chart,
                h = b.options.dataLabels,
                n = y(h.connectorPadding, 10),
                m = y(h.connectorWidth, 1),
                A = e.plotWidth,
                u = e.plotHeight,
                q, v = b.center,
                x = v[2] / 2,
                d = v[1],
                w, F,
                k, z, O = [
                    [],
                    []
                ],
                N, M, C, Q, J = [0, 0, 0, 0];
            b.visible && (h.enabled || b._hasPointLabels) && (r(g, function(a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                    width: "auto"
                }).css({
                    width: "auto",
                    textOverflow: "clip"
                }), a.dataLabel.shortened = !1)
            }), c.prototype.drawDataLabels.apply(b), r(g, function(a) {
                a.dataLabel && a.visible && (O[a.half].push(a), a.dataLabel._pos = null)
            }), r(O, function(c, f) {
                var m, g, p = c.length,
                    t = [],
                    q;
                if (p)
                    for (b.sortByAngle(c, f - .5), 0 < b.maxLabelDistance && (m = Math.max(0, d - x - b.maxLabelDistance), g = Math.min(d +
                            x + b.maxLabelDistance, e.plotHeight), r(c, function(a) {
                            0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, d - x - a.labelDistance), a.bottom = Math.min(d + x + a.labelDistance, e.plotHeight), q = a.dataLabel.getBBox().height || 21, a.positionsIndex = t.push({
                                target: a.labelPos[1] - a.top + q / 2,
                                size: q,
                                rank: a.y
                            }) - 1)
                        }), a.distribute(t, g + q - m)), Q = 0; Q < p; Q++) l = c[Q], g = l.positionsIndex, k = l.labelPos, w = l.dataLabel, C = !1 === l.visible ? "hidden" : "inherit", M = m = k[1], t && E(t[g]) && (void 0 === t[g].pos ? C = "hidden" : (z = t[g].size, M = l.top + t[g].pos)), delete l.positionIndex,
                        N = h.justify ? v[0] + (f ? -1 : 1) * (x + l.labelDistance) : b.getX(M < l.top + 2 || M > l.bottom - 2 ? m : M, f, l), w._attr = {
                            visibility: C,
                            align: k[6]
                        }, w._pos = {
                            x: N + h.x + ({
                                left: n,
                                right: -n
                            }[k[6]] || 0),
                            y: M + h.y - 10
                        }, k.x = N, k.y = M, y(h.crop, !0) && (F = w.getBBox().width, m = null, N - F < n ? (m = Math.round(F - N + n), J[3] = Math.max(m, J[3])) : N + F > A - n && (m = Math.round(N + F - A + n), J[1] = Math.max(m, J[1])), 0 > M - z / 2 ? J[0] = Math.max(Math.round(-M + z / 2), J[0]) : M + z / 2 > u && (J[2] = Math.max(Math.round(M + z / 2 - u), J[2])), w.sideOverflow = m)
            }), 0 === G(J) || this.verifyDataLabelOverflow(J)) && (this.placeDataLabels(),
                m && r(this.points, function(a) {
                    var d;
                    q = a.connector;
                    if ((w = a.dataLabel) && w._pos && a.visible && 0 < a.labelDistance) {
                        C = w._attr.visibility;
                        if (d = !q) a.connector = q = e.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex).add(b.dataLabelsGroup), q.attr({
                            "stroke-width": m,
                            stroke: h.connectorColor || a.color || "#666666"
                        });
                        q[d ? "attr" : "animate"]({
                            d: b.connectorPath(a.labelPos)
                        });
                        q.attr("visibility", C)
                    } else q && (a.connector = q.destroy())
                }))
        }, l.pie.prototype.connectorPath = function(a) {
            var b =
                a.x,
                c = a.y;
            return y(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
        }, l.pie.prototype.placeDataLabels = function() {
            r(this.points, function(a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
                        width: b._attr.width + "px",
                        textOverflow: "ellipsis"
                    }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a),
                    b.moved = !0) : b && b.attr({
                    y: -9999
                }))
            }, this)
        }, l.pie.prototype.alignDataLabel = v, l.pie.prototype.verifyDataLabelOverflow = function(a) {
            var b = this.center,
                c = this.options,
                e = c.center,
                f = c.minSize || 80,
                l, m = null !== c.size;
            m || (null !== e[0] ? l = Math.max(b[2] - Math.max(a[1], a[3]), f) : (l = Math.max(b[2] - a[1] - a[3], f), b[0] += (a[3] - a[1]) / 2), null !== e[1] ? l = Math.max(Math.min(l, b[2] - Math.max(a[0], a[2])), f) : (l = Math.max(Math.min(l, b[2] - a[0] - a[2]), f), b[1] += (a[0] - a[2]) / 2), l < b[2] ? (b[2] = l, b[3] = Math.min(g(c.innerSize || 0, l), l), this.translate(b),
                this.drawDataLabels && this.drawDataLabels()) : m = !0);
            return m
        });
        l.column && (l.column.prototype.alignDataLabel = function(a, b, g, e, l) {
            var f = this.chart.inverted,
                m = a.series,
                h = a.dlBox || a.shapeArgs,
                p = y(a.below, a.plotY > y(this.translatedThreshold, m.yAxis.len)),
                n = y(g.inside, !!this.options.stacking);
            h && (e = q(h), 0 > e.y && (e.height += e.y, e.y = 0), h = e.y + e.height - m.yAxis.len, 0 < h && (e.height -= h), f && (e = {
                x: m.yAxis.len - e.y - e.height,
                y: m.xAxis.len - e.x - e.width,
                width: e.height,
                height: e.width
            }), n || (f ? (e.x += p ? 0 : e.width, e.width = 0) : (e.y +=
                p ? e.height : 0, e.height = 0)));
            g.align = y(g.align, !f || n ? "center" : p ? "right" : "left");
            g.verticalAlign = y(g.verticalAlign, f || n ? "middle" : p ? "top" : "bottom");
            c.prototype.alignDataLabel.call(this, a, b, g, e, l);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({
                color: a.contrastColor
            })
        })
    })(L);
    (function(a) {
        var C = a.Chart,
            G = a.each,
            E = a.objectEach,
            r = a.pick;
        a = a.addEvent;
        a(C.prototype, "render", function() {
            var a = [];
            G(this.labelCollectors || [], function(h) {
                a = a.concat(h())
            });
            G(this.yAxis || [], function(h) {
                h.options.stackLabels &&
                    !h.options.stackLabels.allowOverlap && E(h.stacks, function(h) {
                        E(h, function(h) {
                            a.push(h.label)
                        })
                    })
            });
            G(this.series || [], function(h) {
                var n = h.options.dataLabels,
                    q = h.dataLabelCollections || ["dataLabel"];
                (n.enabled || h._hasPointLabels) && !n.allowOverlap && h.visible && G(q, function(n) {
                    G(h.points, function(h) {
                        h[n] && (h[n].labelrank = r(h.labelrank, h.shapeArgs && h.shapeArgs.height), a.push(h[n]))
                    })
                })
            });
            this.hideOverlappingLabels(a)
        });
        C.prototype.hideOverlappingLabels = function(a) {
            var h = a.length,
                n, q, r, y, g, c, l, b, f, p = function(a,
                    b, c, f, m, g, l, h) {
                    return !(m > a + c || m + l < a || g > b + f || g + h < b)
                };
            for (q = 0; q < h; q++)
                if (n = a[q]) n.oldOpacity = n.opacity, n.newOpacity = 1, n.width || (r = n.getBBox(), n.width = r.width, n.height = r.height);
            a.sort(function(a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (q = 0; q < h; q++)
                for (r = a[q], n = q + 1; n < h; ++n)
                    if (y = a[n], r && y && r !== y && r.placed && y.placed && 0 !== r.newOpacity && 0 !== y.newOpacity && (g = r.alignAttr, c = y.alignAttr, l = r.parentGroup, b = y.parentGroup, f = 2 * (r.box ? 0 : r.padding || 0), g = p(g.x + l.translateX, g.y + l.translateY, r.width - f, r.height -
                            f, c.x + b.translateX, c.y + b.translateY, y.width - f, y.height - f)))(r.labelrank < y.labelrank ? r : y).newOpacity = 0;
            G(a, function(a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function() {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.Chart,
            E = a.createElement,
            r = a.css,
            n = a.defaultOptions,
            h = a.defaultPlotOptions,
            x = a.each,
            q = a.extend,
            v = a.fireEvent,
            y = a.hasTouch,
            g = a.inArray,
            c = a.isObject,
            l = a.Legend,
            b = a.merge,
            f = a.pick,
            p = a.Point,
            t = a.Series,
            e = a.seriesTypes,
            B = a.svg,
            D;
        D = a.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this,
                    b = a.chart.pointer,
                    c = function(a) {
                        var c = b.getPointFromEvent(a);
                        void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
                    };
                x(a.points, function(a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (x(a.trackerGroups, function(e) {
                    if (a[e]) {
                        a[e].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function(a) {
                            b.onTrackerMouseOut(a)
                        });
                        if (y) a[e].on("touchstart", c);
                        a.options.cursor && a[e].css(r).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0)
            },
            drawTrackerGraph: function() {
                var a = this,
                    b = a.options,
                    c = b.trackByArea,
                    e = [].concat(c ? a.areaPath : a.graphPath),
                    f = e.length,
                    g = a.chart,
                    d = g.pointer,
                    l = g.renderer,
                    h = g.options.tooltip.snap,
                    k = a.tracker,
                    p, n = function() {
                        if (g.hoverSeries !== a) a.onMouseOver()
                    },
                    t = "rgba(192,192,192," + (B ? .0001 : .002) + ")";
                if (f && !c)
                    for (p = f + 1; p--;) "M" === e[p] && e.splice(p + 1, 0, e[p + 1] - h, e[p + 2], "L"), (p && "M" === e[p] || p === f) && e.splice(p,
                        0, "L", e[p - 2] + h, e[p - 1]);
                k ? k.attr({
                    d: e
                }) : a.graph && (a.tracker = l.path(e).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: t,
                    fill: c ? t : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * h),
                    zIndex: 2
                }).add(a.group), x([a.tracker, a.markerGroup], function(a) {
                    a.addClass("highcharts-tracker").on("mouseover", n).on("mouseout", function(a) {
                        d.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({
                        cursor: b.cursor
                    });
                    if (y) a.on("touchstart", n)
                }))
            }
        };
        e.column && (e.column.prototype.drawTracker = D.drawTrackerPoint);
        e.pie && (e.pie.prototype.drawTracker = D.drawTrackerPoint);
        e.scatter && (e.scatter.prototype.drawTracker = D.drawTrackerPoint);
        q(l.prototype, {
            setItemEvents: function(a, c, e) {
                var f = this,
                    m = f.chart.renderer.boxWrapper,
                    g = "highcharts-legend-" + (a instanceof p ? "point" : "series") + "-active";
                (e ? c : a.legendGroup).on("mouseover", function() {
                    a.setState("hover");
                    m.addClass(g);
                    c.css(f.options.itemHoverStyle)
                }).on("mouseout", function() {
                    c.css(b(a.visible ? f.itemStyle : f.itemHiddenStyle));
                    m.removeClass(g);
                    a.setState()
                }).on("click",
                    function(b) {
                        var d = function() {
                            a.setVisible && a.setVisible()
                        };
                        m.removeClass(g);
                        b = {
                            browserEvent: b
                        };
                        a.firePointEvent ? a.firePointEvent("legendItemClick", b, d) : v(a, "legendItemClick", b, d)
                    })
            },
            createCheckboxForItem: function(a) {
                a.checkbox = E("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                C(a.checkbox, "click", function(b) {
                    v(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function() {
                        a.select()
                    })
                })
            }
        });
        n.legend.itemStyle.cursor =
            "pointer";
        q(G.prototype, {
            showResetZoom: function() {
                var a = this,
                    b = n.lang,
                    c = a.options.chart.resetZoomButton,
                    e = c.theme,
                    f = e.states,
                    g = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
                    a.zoomOut()
                }, e, f && f.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position, !1, g)
            },
            zoomOut: function() {
                var a = this;
                v(a, "selection", {
                    resetSelection: !0
                }, function() {
                    a.zoom()
                })
            },
            zoom: function(a) {
                var b, e = this.pointer,
                    m = !1,
                    g;
                !a || a.resetSelection ? (x(this.axes, function(a) {
                    b = a.zoom()
                }), e.initiated = !1) : x(a.xAxis.concat(a.yAxis), function(a) {
                    var d = a.axis;
                    e[d.isXAxis ? "zoomX" : "zoomY"] && (b = d.zoom(a.min, a.max), d.displayBtn && (m = !0))
                });
                g = this.resetZoomButton;
                m && !g ? this.showResetZoom() : !m && c(g) && (this.resetZoomButton = g.destroy());
                b && this.redraw(f(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function(a, b) {
                var c = this,
                    e = c.hoverPoints,
                    f;
                e && x(e, function(a) {
                    a.setState()
                });
                x("xy" === b ? [1, 0] : [1], function(b) {
                    b =
                        c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz,
                        e = a[d ? "chartX" : "chartY"],
                        d = d ? "mouseDownX" : "mouseDownY",
                        m = c[d],
                        k = (b.pointRange || 0) / 2,
                        g = b.getExtremes(),
                        l = b.toValue(m - e, !0) + k,
                        h = b.toValue(m + b.len - e, !0) - k,
                        p = h < l,
                        m = p ? h : l,
                        l = p ? l : h,
                        h = Math.min(g.dataMin, k ? g.min : b.toValue(b.toPixels(g.min) - b.minPixelPadding)),
                        k = Math.max(g.dataMax, k ? g.max : b.toValue(b.toPixels(g.max) + b.minPixelPadding)),
                        p = h - m;
                    0 < p && (l += p, m = h);
                    p = l - k;
                    0 < p && (l = k, m -= p);
                    b.series.length && m !== g.min && l !== g.max && (b.setExtremes(m, l, !1, !1, {
                        trigger: "pan"
                    }), f = !0);
                    c[d] =
                        e
                });
                f && c.redraw(!1);
                r(c.container, {
                    cursor: "move"
                })
            }
        });
        q(p.prototype, {
            select: function(a, b) {
                var c = this,
                    e = c.series,
                    m = e.chart;
                a = f(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function() {
                    c.selected = c.options.selected = a;
                    e.options.data[g(c, e.data)] = c.options;
                    c.setState(a && "select");
                    b || x(m.getSelectedPoints(), function(a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, e.options.data[g(a, e.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function(a) {
                var b =
                    this.series.chart,
                    c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            },
            onMouseOut: function() {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                x(a.hoverPoints || [], function(a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var c = this,
                        e = b(c.series.options.point, c.options).events;
                    c.events = e;
                    a.objectEach(e, function(a, b) {
                        C(c, b, a)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function(a, b) {
                var c = Math.floor(this.plotX),
                    e = this.plotY,
                    g = this.series,
                    m = g.options.states[a || "normal"] || {},
                    d = h[g.type].marker && g.options.marker,
                    l = d && !1 === d.enabled,
                    p = d && d.states && d.states[a || "normal"] || {},
                    k = !1 === p.enabled,
                    n = g.stateMarkerGraphic,
                    A = this.marker || {},
                    t = g.chart,
                    r = g.halo,
                    D, B = d && g.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === m.enabled || a && (k || l && !1 === p.enabled) || a && A.states && A.states[a] && !1 === A.states[a].enabled)) {
                    B && (D = g.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" +
                        this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.animate(g.pointAttribs(this, a), f(t.options.chart.animation, m.animation)), D && this.graphic.animate(D, f(t.options.chart.animation, p.animation, d.animation)), n && n.hide();
                    else {
                        if (a && p) {
                            d = A.symbol || g.symbol;
                            n && n.currentSymbol !== d && (n = n.destroy());
                            if (n) n[b ? "animate" : "attr"]({
                                x: D.x,
                                y: D.y
                            });
                            else d && (g.stateMarkerGraphic = n = t.renderer.symbol(d, D.x, D.y, D.width, D.height).add(g.markerGroup), n.currentSymbol = d);
                            n && n.attr(g.pointAttribs(this,
                                a))
                        }
                        n && (n[a && t.isInsidePlot(c, e, t.inverted) ? "show" : "hide"](), n.element.point = this)
                    }(c = m.halo) && c.size ? (r || (g.halo = r = t.renderer.path().add((this.graphic || n).parentGroup)), r.show()[b ? "animate" : "attr"]({
                        d: this.haloPath(c.size)
                    }), r.attr({
                        "class": "highcharts-halo highcharts-color-" + f(this.colorIndex, g.colorIndex)
                    }), r.point = this, r.attr(q({
                        fill: this.color || g.color,
                        "fill-opacity": c.opacity,
                        zIndex: -1
                    }, c.attributes))) : r && r.point && r.point.haloPath && r.animate({
                        d: r.point.haloPath(0)
                    }, null, r.hide);
                    this.state = a
                }
            },
            haloPath: function(a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        q(t.prototype, {
            onMouseOver: function() {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && v(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function() {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    e = b.hoverPoint;
                b.hoverSeries = null;
                if (e) e.onMouseOut();
                this && a.events.mouseOut && v(this, "mouseOut");
                !c || this.stickyTracking ||
                    c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function(a) {
                var b = this,
                    c = b.options,
                    e = b.graph,
                    g = c.states,
                    m = c.lineWidth,
                    c = 0;
                a = a || "";
                if (b.state !== a && (x([b.group, b.markerGroup, b.dataLabelsGroup], function(d) {
                        d && (b.state && d.removeClass("highcharts-series-" + b.state), a && d.addClass("highcharts-series-" + a))
                    }), b.state = a, !g[a] || !1 !== g[a].enabled) && (a && (m = g[a].lineWidth || m + (g[a].lineWidthPlus || 0)), e && !e.dashstyle))
                    for (m = {
                            "stroke-width": m
                        }, e.animate(m, f(g[a || "normal"] && g[a || "normal"].animation,
                            b.chart.options.chart.animation)); b["zone-graph-" + c];) b["zone-graph-" + c].attr(m), c += 1
            },
            setVisible: function(a, b) {
                var c = this,
                    e = c.chart,
                    f = c.legendItem,
                    g, d = e.options.chart.ignoreHiddenSeries,
                    m = c.visible;
                g = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !m : a) ? "show" : "hide";
                x(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function(a) {
                    if (c[a]) c[a][g]()
                });
                if (e.hoverSeries === c || (e.hoverPoint && e.hoverPoint.series) === c) c.onMouseOut();
                f && e.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking &&
                    x(e.series, function(a) {
                        a.options.stacking && a.visible && (a.isDirty = !0)
                    });
                x(c.linkedSeries, function(b) {
                    b.setVisible(a, !1)
                });
                d && (e.isDirtyBox = !0);
                !1 !== b && e.redraw();
                v(c, g)
            },
            show: function() {
                this.setVisible(!0)
            },
            hide: function() {
                this.setVisible(!1)
            },
            select: function(a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                v(this, a ? "select" : "unselect")
            },
            drawTracker: D.drawTrackerGraph
        })
    })(L);
    (function(a) {
        var C = a.Chart,
            G = a.each,
            E = a.inArray,
            r = a.isArray,
            n = a.isObject,
            h = a.pick,
            x = a.splat;
        C.prototype.setResponsive = function(h) {
            var n = this.options.responsive,
                q = [],
                g = this.currentResponsive;
            n && n.rules && G(n.rules, function(c) {
                void 0 === c._id && (c._id = a.uniqueKey());
                this.matchResponsiveRule(c, q, h)
            }, this);
            var c = a.merge.apply(0, a.map(q, function(c) {
                    return a.find(n.rules, function(a) {
                        return a._id === c
                    }).chartOptions
                })),
                q = q.toString() || void 0;
            q !== (g && g.ruleIds) && (g && this.update(g.undoOptions, h), q ? (this.currentResponsive = {
                    ruleIds: q,
                    mergedOptions: c,
                    undoOptions: this.currentOptions(c)
                }, this.update(c, h)) :
                this.currentResponsive = void 0)
        };
        C.prototype.matchResponsiveRule = function(a, n) {
            var q = a.condition;
            (q.callback || function() {
                return this.chartWidth <= h(q.maxWidth, Number.MAX_VALUE) && this.chartHeight <= h(q.maxHeight, Number.MAX_VALUE) && this.chartWidth >= h(q.minWidth, 0) && this.chartHeight >= h(q.minHeight, 0)
            }).call(this) && n.push(a._id)
        };
        C.prototype.currentOptions = function(h) {
            function q(g, c, l, b) {
                var f;
                a.objectEach(g, function(a, g) {
                    if (!b && -1 < E(g, ["series", "xAxis", "yAxis"]))
                        for (a = x(a), l[g] = [], f = 0; f < a.length; f++) c[g][f] &&
                            (l[g][f] = {}, q(a[f], c[g][f], l[g][f], b + 1));
                    else n(a) ? (l[g] = r(a) ? [] : {}, q(a, c[g] || {}, l[g], b + 1)) : l[g] = c[g] || null
                })
            }
            var y = {};
            q(h, this.options, y, 0);
            return y
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.Axis,
            E = a.Chart,
            r = a.css,
            n = a.defined,
            h = a.each,
            x = a.extend,
            q = a.noop,
            v = a.pick,
            y = a.timeUnits,
            g = a.wrap;
        g(a.Series.prototype, "init", function(a) {
            var c;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            (c = this.xAxis) && c.options.ordinal && C(this, "updatedData", function() {
                delete c.ordinalIndex
            })
        });
        g(G.prototype, "getTimeTicks",
            function(a, g, b, f, h, t, e, q) {
                var c = 0,
                    m, l, p = {},
                    r, B, v, d = [],
                    w = -Number.MAX_VALUE,
                    F = this.options.tickPixelInterval,
                    k = this.chart.time;
                if (!this.options.ordinal && !this.options.breaks || !t || 3 > t.length || void 0 === b) return a.call(this, g, b, f, h);
                B = t.length;
                for (m = 0; m < B; m++) {
                    v = m && t[m - 1] > f;
                    t[m] < b && (c = m);
                    if (m === B - 1 || t[m + 1] - t[m] > 5 * e || v) {
                        if (t[m] > w) {
                            for (l = a.call(this, g, t[c], t[m], h); l.length && l[0] <= w;) l.shift();
                            l.length && (w = l[l.length - 1]);
                            d = d.concat(l)
                        }
                        c = m + 1
                    }
                    if (v) break
                }
                a = l.info;
                if (q && a.unitRange <= y.hour) {
                    m = d.length - 1;
                    for (c =
                        1; c < m; c++) k.dateFormat("%d", d[c]) !== k.dateFormat("%d", d[c - 1]) && (p[d[c]] = "day", r = !0);
                    r && (p[d[0]] = "day");
                    a.higherRanks = p
                }
                d.info = a;
                if (q && n(F)) {
                    q = k = d.length;
                    m = [];
                    var z;
                    for (r = []; q--;) c = this.translate(d[q]), z && (r[q] = z - c), m[q] = z = c;
                    r.sort();
                    r = r[Math.floor(r.length / 2)];
                    r < .6 * F && (r = null);
                    q = d[k - 1] > f ? k - 1 : k;
                    for (z = void 0; q--;) c = m[q], f = Math.abs(z - c), z && f < .8 * F && (null === r || f < .8 * r) ? (p[d[q]] && !p[d[q + 1]] ? (f = q + 1, z = c) : f = q, d.splice(f, 1)) : z = c
                }
                return d
            });
        x(G.prototype, {
            beforeSetTickPositions: function() {
                var a, g = [],
                    b = !1,
                    f, p =
                    this.getExtremes(),
                    t = p.min,
                    e = p.max,
                    q, r = this.isXAxis && !!this.options.breaks,
                    p = this.options.ordinal,
                    m = Number.MAX_VALUE,
                    A = this.chart.options.chart.ignoreHiddenSeries;
                f = "highcharts-navigator-xaxis" === this.options.className;
                !this.options.overscroll || this.max !== this.dataMax || this.chart.mouseIsDown && !f || this.eventArgs && (!this.eventArgs || "navigator" === this.eventArgs.trigger) || (this.max += this.options.overscroll, !f && n(this.userMin) && (this.min += this.options.overscroll));
                if (p || r) {
                    h(this.series, function(b, c) {
                        if (!(A &&
                                !1 === b.visible || !1 === b.takeOrdinalPosition && !r) && (g = g.concat(b.processedXData), a = g.length, g.sort(function(a, b) {
                                return a - b
                            }), m = Math.min(m, v(b.closestPointRange, m)), a))
                            for (c = a - 1; c--;) g[c] === g[c + 1] && g.splice(c, 1)
                    });
                    a = g.length;
                    if (2 < a) {
                        f = g[1] - g[0];
                        for (q = a - 1; q-- && !b;) g[q + 1] - g[q] !== f && (b = !0);
                        !this.options.keepOrdinalPadding && (g[0] - t > f || e - g[g.length - 1] > f) && (b = !0)
                    } else this.options.overscroll && (2 === a ? m = g[1] - g[0] : 1 === a ? (m = this.options.overscroll, g = [g[0], g[0] + m]) : m = this.overscrollPointsRange);
                    b ? (this.options.overscroll &&
                        (this.overscrollPointsRange = m, g = g.concat(this.getOverscrollPositions())), this.ordinalPositions = g, f = this.ordinal2lin(Math.max(t, g[0]), !0), q = Math.max(this.ordinal2lin(Math.min(e, g[g.length - 1]), !0), 1), this.ordinalSlope = e = (e - t) / (q - f), this.ordinalOffset = t - f * e) : (this.overscrollPointsRange = v(this.closestPointRange, this.overscrollPointsRange), this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = void 0)
                }
                this.isOrdinal = p && b;
                this.groupIntervalFactor = null
            },
            val2lin: function(a, g) {
                var b = this.ordinalPositions;
                if (b) {
                    var c = b.length,
                        l, h;
                    for (l = c; l--;)
                        if (b[l] === a) {
                            h = l;
                            break
                        }
                    for (l = c - 1; l--;)
                        if (a > b[l] || 0 === l) {
                            a = (a - b[l]) / (b[l + 1] - b[l]);
                            h = l + a;
                            break
                        }
                    g = g ? h : this.ordinalSlope * (h || 0) + this.ordinalOffset
                } else g = a;
                return g
            },
            lin2val: function(a, g) {
                var b = this.ordinalPositions;
                if (b) {
                    var c = this.ordinalSlope,
                        l = this.ordinalOffset,
                        h = b.length - 1,
                        e;
                    if (g) 0 > a ? a = b[0] : a > h ? a = b[h] : (h = Math.floor(a), e = a - h);
                    else
                        for (; h--;)
                            if (g = c * h + l, a >= g) {
                                c = c * (h + 1) + l;
                                e = (a - g) / (c - g);
                                break
                            } return void 0 !== e && void 0 !== b[h] ? b[h] + (e ? e * (b[h + 1] - b[h]) : 0) : a
                }
                return a
            },
            getExtendedPositions: function() {
                var a = this,
                    g = a.chart,
                    b = a.series[0].currentDataGrouping,
                    f = a.ordinalIndex,
                    p = b ? b.count + b.unitName : "raw",
                    n = a.options.overscroll,
                    e = a.getExtremes(),
                    r, D;
                f || (f = a.ordinalIndex = {});
                f[p] || (r = {
                    series: [],
                    chart: g,
                    getExtremes: function() {
                        return {
                            min: e.dataMin,
                            max: e.dataMax + n
                        }
                    },
                    options: {
                        ordinal: !0
                    },
                    val2lin: G.prototype.val2lin,
                    ordinal2lin: G.prototype.ordinal2lin
                }, h(a.series, function(c) {
                    D = {
                        xAxis: r,
                        xData: c.xData.slice(),
                        chart: g,
                        destroyGroupedData: q
                    };
                    D.xData = D.xData.concat(a.getOverscrollPositions());
                    D.options = {
                        dataGrouping: b ? {
                            enabled: !0,
                            forced: !0,
                            approximation: "open",
                            units: [
                                [b.unitName, [b.count]]
                            ]
                        } : {
                            enabled: !1
                        }
                    };
                    c.processData.apply(D);
                    r.series.push(D)
                }), a.beforeSetTickPositions.apply(r), f[p] = r.ordinalPositions);
                return f[p]
            },
            getOverscrollPositions: function() {
                var c = this.options.overscroll,
                    g = this.overscrollPointsRange,
                    b = [],
                    f = this.dataMax;
                if (a.defined(g))
                    for (b.push(f); f <= this.dataMax + c;) f += g, b.push(f);
                return b
            },
            getGroupIntervalFactor: function(a, g, b) {
                var c;
                b = b.processedXData;
                var l = b.length,
                    h = [];
                c =
                    this.groupIntervalFactor;
                if (!c) {
                    for (c = 0; c < l - 1; c++) h[c] = b[c + 1] - b[c];
                    h.sort(function(a, b) {
                        return a - b
                    });
                    h = h[Math.floor(l / 2)];
                    a = Math.max(a, b[0]);
                    g = Math.min(g, b[l - 1]);
                    this.groupIntervalFactor = c = l * h / (g - a)
                }
                return c
            },
            postProcessTickInterval: function(a) {
                var c = this.ordinalSlope;
                return c ? this.options.breaks ? this.closestPointRange || a : a / (c / this.closestPointRange) : a
            }
        });
        G.prototype.ordinal2lin = G.prototype.val2lin;
        g(E.prototype, "pan", function(a, g) {
            var b = this.xAxis[0],
                c = b.options.overscroll,
                l = g.chartX,
                n = !1;
            if (b.options.ordinal &&
                b.series.length) {
                var e = this.mouseDownX,
                    q = b.getExtremes(),
                    D = q.dataMax,
                    m = q.min,
                    A = q.max,
                    u = this.hoverPoints,
                    v = b.closestPointRange || b.overscrollPointsRange,
                    e = (e - l) / (b.translationSlope * (b.ordinalSlope || v)),
                    x = {
                        ordinalPositions: b.getExtendedPositions()
                    },
                    v = b.lin2val,
                    y = b.val2lin,
                    d;
                x.ordinalPositions ? 1 < Math.abs(e) && (u && h(u, function(a) {
                    a.setState()
                }), 0 > e ? (u = x, d = b.ordinalPositions ? b : x) : (u = b.ordinalPositions ? b : x, d = x), x = d.ordinalPositions, D > x[x.length - 1] && x.push(D), this.fixedRange = A - m, e = b.toFixedRange(null, null,
                    v.apply(u, [y.apply(u, [m, !0]) + e, !0]), v.apply(d, [y.apply(d, [A, !0]) + e, !0])), e.min >= Math.min(q.dataMin, m) && e.max <= Math.max(D, A) + c && b.setExtremes(e.min, e.max, !0, !1, {
                    trigger: "pan"
                }), this.mouseDownX = l, r(this.container, {
                    cursor: "move"
                })) : n = !0
            } else n = !0;
            n && (c && (b.max = b.dataMax + c), a.apply(this, Array.prototype.slice.call(arguments, 1)))
        })
    })(L);
    (function(a) {
        function C() {
            return Array.prototype.slice.call(arguments, 1)
        }

        function G(a) {
            a.apply(this);
            this.drawBreaks(this.xAxis, ["x"]);
            this.drawBreaks(this.yAxis, E(this.pointArrayMap, ["y"]))
        }
        var E = a.pick,
            r = a.wrap,
            n = a.each,
            h = a.extend,
            x = a.isArray,
            q = a.fireEvent,
            v = a.Axis,
            y = a.Series;
        h(v.prototype, {
            isInBreak: function(a, c) {
                var g = a.repeat || Infinity,
                    b = a.from,
                    f = a.to - a.from;
                c = c >= b ? (c - b) % g : g - (b - c) % g;
                return a.inclusive ? c <= f : c < f && 0 !== c
            },
            isInAnyBreak: function(a, c) {
                var g = this.options.breaks,
                    b = g && g.length,
                    f, h, n;
                if (b) {
                    for (; b--;) this.isInBreak(g[b], a) && (f = !0, h || (h = E(g[b].showPoints, this.isXAxis ? !1 : !0)));
                    n = f && c ? f && !h : f
                }
                return n
            }
        });
        r(v.prototype, "setTickPositions", function(a) {
            a.apply(this, Array.prototype.slice.call(arguments,
                1));
            if (this.options.breaks) {
                var c = this.tickPositions,
                    g = this.tickPositions.info,
                    b = [],
                    f;
                for (f = 0; f < c.length; f++) this.isInAnyBreak(c[f]) || b.push(c[f]);
                this.tickPositions = b;
                this.tickPositions.info = g
            }
        });
        r(v.prototype, "init", function(a, c, h) {
            var b = this;
            h.breaks && h.breaks.length && (h.ordinal = !1);
            a.call(this, c, h);
            a = this.options.breaks;
            b.isBroken = x(a) && !!a.length;
            b.isBroken && (b.val2lin = function(a) {
                var c = a,
                    f, e;
                for (e = 0; e < b.breakArray.length; e++)
                    if (f = b.breakArray[e], f.to <= a) c -= f.len;
                    else if (f.from >= a) break;
                else if (b.isInBreak(f,
                        a)) {
                    c -= a - f.from;
                    break
                }
                return c
            }, b.lin2val = function(a) {
                var c, f;
                for (f = 0; f < b.breakArray.length && !(c = b.breakArray[f], c.from >= a); f++) c.to < a ? a += c.len : b.isInBreak(c, a) && (a += c.len);
                return a
            }, b.setExtremes = function(a, b, c, e, g) {
                for (; this.isInAnyBreak(a);) a -= this.closestPointRange;
                for (; this.isInAnyBreak(b);) b -= this.closestPointRange;
                v.prototype.setExtremes.call(this, a, b, c, e, g)
            }, b.setAxisTranslation = function(a) {
                v.prototype.setAxisTranslation.call(this, a);
                a = b.options.breaks;
                var c = [],
                    f = [],
                    e = 0,
                    g, h, m = b.userMin || b.min,
                    l = b.userMax || b.max,
                    u = E(b.pointRangePadding, 0),
                    r, x;
                n(a, function(a) {
                    h = a.repeat || Infinity;
                    b.isInBreak(a, m) && (m += a.to % h - m % h);
                    b.isInBreak(a, l) && (l -= l % h - a.from % h)
                });
                n(a, function(a) {
                    r = a.from;
                    for (h = a.repeat || Infinity; r - h > m;) r -= h;
                    for (; r < m;) r += h;
                    for (x = r; x < l; x += h) c.push({
                        value: x,
                        move: "in"
                    }), c.push({
                        value: x + (a.to - a.from),
                        move: "out",
                        size: a.breakSize
                    })
                });
                c.sort(function(a, b) {
                    return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
                });
                g = 0;
                r = m;
                n(c, function(a) {
                    g += "in" === a.move ? 1 : -1;
                    1 === g && "in" ===
                        a.move && (r = a.value);
                    0 === g && (f.push({
                        from: r,
                        to: a.value,
                        len: a.value - r - (a.size || 0)
                    }), e += a.value - r - (a.size || 0))
                });
                b.breakArray = f;
                b.unitLength = l - m - e + u;
                q(b, "afterBreaks");
                b.options.staticScale ? b.transA = b.options.staticScale : b.unitLength && (b.transA *= (l - b.min + u) / b.unitLength);
                u && (b.minPixelPadding = b.transA * b.minPointOffset);
                b.min = m;
                b.max = l
            })
        });
        r(y.prototype, "generatePoints", function(a) {
            a.apply(this, C(arguments));
            var c = this.xAxis,
                g = this.yAxis,
                b = this.points,
                f, h = b.length,
                n = this.options.connectNulls,
                e;
            if (c &&
                g && (c.options.breaks || g.options.breaks))
                for (; h--;) f = b[h], e = null === f.y && !1 === n, e || !c.isInAnyBreak(f.x, !0) && !g.isInAnyBreak(f.y, !0) || (b.splice(h, 1), this.data[h] && this.data[h].destroyElements())
        });
        a.Series.prototype.drawBreaks = function(a, c) {
            var g = this,
                b = g.points,
                f, h, r, e;
            a && n(c, function(c) {
                f = a.breakArray || [];
                h = a.isXAxis ? a.min : E(g.options.threshold, a.min);
                n(b, function(b) {
                    e = E(b["stack" + c.toUpperCase()], b[c]);
                    n(f, function(c) {
                        r = !1;
                        if (h < c.from && e > c.to || h > c.from && e < c.from) r = "pointBreak";
                        else if (h < c.from && e >
                            c.from && e < c.to || h > c.from && e > c.to && e < c.from) r = "pointInBreak";
                        r && q(a, r, {
                            point: b,
                            brk: c
                        })
                    })
                })
            })
        };
        a.Series.prototype.gappedPath = function() {
            var g = this.options.gapSize,
                c = this.points.slice(),
                h = c.length - 1,
                b = this.yAxis,
                f;
            if (g && 0 < h)
                for ("value" !== this.options.gapUnit && (g *= this.closestPointRange); h--;) c[h + 1].x - c[h].x > g && (f = (c[h].x + c[h + 1].x) / 2, c.splice(h + 1, 0, {
                    isNull: !0,
                    x: f
                }), this.options.stacking && (f = b.stacks[this.stackKey][f] = new a.StackItem(b, b.options.stackLabels, !1, f, this.stack), f.total = 0));
            return this.getGraphPath(c)
        };
        r(a.seriesTypes.column.prototype, "drawPoints", G);
        r(a.Series.prototype, "drawPoints", G)
    })(L);
    (function(a) {
        var C = a.arrayMax,
            G = a.arrayMin,
            E = a.Axis,
            r = a.defaultPlotOptions,
            n = a.defined,
            h = a.each,
            x = a.extend,
            q = a.format,
            v = a.isNumber,
            y = a.merge,
            g = a.pick,
            c = a.Point,
            l = a.Tooltip,
            b = a.wrap,
            f = a.Series.prototype,
            p = f.processData,
            t = f.generatePoints,
            e = {
                approximation: "average",
                groupPixelWidth: 2,
                dateTimeLabelFormats: {
                    millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
                    second: ["%A, %b %e, %H:%M:%S",
                        "%A, %b %e, %H:%M:%S", "-%H:%M:%S"
                    ],
                    minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    month: ["%B %Y", "%B", "-%B %Y"],
                    year: ["%Y", "%Y", "-%Y"]
                }
            },
            B = {
                line: {},
                spline: {},
                area: {},
                areaspline: {},
                column: {
                    approximation: "sum",
                    groupPixelWidth: 10
                },
                arearange: {
                    approximation: "range"
                },
                areasplinerange: {
                    approximation: "range"
                },
                columnrange: {
                    approximation: "range",
                    groupPixelWidth: 10
                },
                candlestick: {
                    approximation: "ohlc",
                    groupPixelWidth: 10
                },
                ohlc: {
                    approximation: "ohlc",
                    groupPixelWidth: 5
                }
            },
            D = a.defaultDataGroupingUnits = [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1]],
                ["week", [1]],
                ["month", [1, 3, 6]],
                ["year", null]
            ],
            m = a.approximations = {
                sum: function(a) {
                    var b = a.length,
                        c;
                    if (!b && a.hasNulls) c = null;
                    else if (b)
                        for (c = 0; b--;) c += a[b];
                    return c
                },
                average: function(a) {
                    var b = a.length;
                    a = m.sum(a);
                    v(a) && b && (a /= b);
                    return a
                },
                averages: function() {
                    var a = [];
                    h(arguments, function(b) {
                        a.push(m.average(b))
                    });
                    return void 0 === a[0] ? void 0 : a
                },
                open: function(a) {
                    return a.length ? a[0] : a.hasNulls ? null : void 0
                },
                high: function(a) {
                    return a.length ? C(a) : a.hasNulls ? null : void 0
                },
                low: function(a) {
                    return a.length ? G(a) : a.hasNulls ? null : void 0
                },
                close: function(a) {
                    return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0
                },
                ohlc: function(a, b, c, e) {
                    a = m.open(a);
                    b = m.high(b);
                    c = m.low(c);
                    e = m.close(e);
                    if (v(a) || v(b) || v(c) || v(e)) return [a, b, c, e]
                },
                range: function(a, b) {
                    a = m.low(a);
                    b = m.high(b);
                    if (v(a) || v(b)) return [a, b];
                    if (null === a && null === b) return null
                }
            };
        f.groupData = function(a, b, c, f) {
            var g = this.data,
                d = this.options.data,
                l = [],
                p = [],
                k = [],
                n = a.length,
                u, q, r = !!b,
                A = [];
            f = "function" === typeof f ? f : m[f] || B[this.type] && m[B[this.type].approximation] || m[e.approximation];
            var t = this.pointArrayMap,
                D = t && t.length,
                x = 0;
            q = 0;
            var y, H;
            D ? h(t, function() {
                A.push([])
            }) : A.push([]);
            y = D || 1;
            for (H = 0; H <= n && !(a[H] >= c[0]); H++);
            for (H; H <= n; H++) {
                for (; void 0 !== c[x + 1] && a[H] >= c[x + 1] || H === n;) {
                    u =
                        c[x];
                    this.dataGroupInfo = {
                        start: q,
                        length: A[0].length
                    };
                    q = f.apply(this, A);
                    void 0 !== q && (l.push(u), p.push(q), k.push(this.dataGroupInfo));
                    q = H;
                    for (u = 0; u < y; u++) A[u].length = 0, A[u].hasNulls = !1;
                    x += 1;
                    if (H === n) break
                }
                if (H === n) break;
                if (t) {
                    u = this.cropStart + H;
                    var I = g && g[u] || this.pointClass.prototype.applyOptions.apply({
                            series: this
                        }, [d[u]]),
                        C;
                    for (u = 0; u < D; u++) C = I[t[u]], v(C) ? A[u].push(C) : null === C && (A[u].hasNulls = !0)
                } else u = r ? b[H] : null, v(u) ? A[0].push(u) : null === u && (A[0].hasNulls = !0)
            }
            return [l, p, k]
        };
        f.processData = function() {
            var a =
                this.chart,
                b = this.options.dataGrouping,
                c = !1 !== this.allowDG && b && g(b.enabled, a.options.isStock),
                e = this.visible || !a.options.chart.ignoreHiddenSeries,
                m, d = this.currentDataGrouping,
                h;
            this.forceCrop = c;
            this.groupPixelWidth = null;
            this.hasProcessed = !0;
            if (!1 !== p.apply(this, arguments) && c) {
                this.destroyGroupedData();
                var l = this.processedXData,
                    k = this.processedYData,
                    q = a.plotSizeX,
                    a = this.xAxis,
                    r = a.options.ordinal,
                    t = this.groupPixelWidth = a.getGroupPixelWidth && a.getGroupPixelWidth();
                if (t) {
                    this.isDirty = m = !0;
                    this.points =
                        null;
                    c = a.getExtremes();
                    h = c.min;
                    c = c.max;
                    r = r && a.getGroupIntervalFactor(h, c, this) || 1;
                    t = t * (c - h) / q * r;
                    q = a.getTimeTicks(a.normalizeTimeTickInterval(t, b.units || D), Math.min(h, l[0]), Math.max(c, l[l.length - 1]), a.options.startOfWeek, l, this.closestPointRange);
                    l = f.groupData.apply(this, [l, k, q, b.approximation]);
                    k = l[0];
                    r = l[1];
                    if (b.smoothed && k.length) {
                        b = k.length - 1;
                        for (k[b] = Math.min(k[b], c); b-- && 0 < b;) k[b] += t / 2;
                        k[0] = Math.max(k[0], h)
                    }
                    h = q.info;
                    this.closestPointRange = q.info.totalRange;
                    this.groupMap = l[2];
                    n(k[0]) && k[0] < a.dataMin &&
                        e && (a.min === a.dataMin && (a.min = k[0]), a.dataMin = k[0]);
                    this.processedXData = k;
                    this.processedYData = r
                } else this.groupMap = null;
                this.hasGroupedData = m;
                this.currentDataGrouping = h;
                this.preventGraphAnimation = (d && d.totalRange) !== (h && h.totalRange)
            }
        };
        f.destroyGroupedData = function() {
            var a = this.groupedData;
            h(a || [], function(b, c) {
                b && (a[c] = b.destroy ? b.destroy() : null)
            });
            this.groupedData = null
        };
        f.generatePoints = function() {
            t.apply(this);
            this.destroyGroupedData();
            this.groupedData = this.hasGroupedData ? this.points : null
        };
        b(c.prototype,
            "update",
            function(b) {
                this.dataGroup ? a.error(24) : b.apply(this, [].slice.call(arguments, 1))
            });
        b(l.prototype, "tooltipFooterHeaderFormatter", function(a, b, c) {
            var e = this.chart.time,
                f = b.series,
                d = f.tooltipOptions,
                g = f.options.dataGrouping,
                h = d.xDateFormat,
                k, m = f.xAxis;
            return m && "datetime" === m.options.type && g && v(b.key) ? (a = f.currentDataGrouping, g = g.dateTimeLabelFormats, a ? (m = g[a.unitName], 1 === a.count ? h = m[0] : (h = m[1], k = m[2])) : !h && g && (h = this.getXDateFormat(b, d, m)), h = e.dateFormat(h, b.key), k && (h += e.dateFormat(k, b.key +
                a.totalRange - 1)), q(d[(c ? "footer" : "header") + "Format"], {
                point: x(b.point, {
                    key: h
                }),
                series: f
            }, e)) : a.call(this, b, c)
        });
        b(f, "destroy", function(a) {
            this.destroyGroupedData();
            a.call(this)
        });
        b(f, "setOptions", function(a, b) {
            a = a.call(this, b);
            var c = this.type,
                f = this.chart.options.plotOptions,
                g = r[c].dataGrouping;
            B[c] && (g || (g = y(e, B[c])), a.dataGrouping = y(g, f.series && f.series.dataGrouping, f[c].dataGrouping, b.dataGrouping));
            this.chart.options.isStock && (this.requireSorting = !0);
            return a
        });
        b(E.prototype, "setScale", function(a) {
            a.call(this);
            h(this.series, function(a) {
                a.hasProcessed = !1
            })
        });
        E.prototype.getGroupPixelWidth = function() {
            var a = this.series,
                b = a.length,
                c, e = 0,
                f = !1,
                d;
            for (c = b; c--;)(d = a[c].options.dataGrouping) && (e = Math.max(e, d.groupPixelWidth));
            for (c = b; c--;)(d = a[c].options.dataGrouping) && a[c].hasProcessed && (b = (a[c].processedXData || a[c].data).length, a[c].groupPixelWidth || b > this.chart.plotSizeX / e || b && d.forced) && (f = !0);
            return f ? e : 0
        };
        E.prototype.setDataGrouping = function(a, b) {
            var c;
            b = g(b, !0);
            a || (a = {
                forced: !1,
                units: null
            });
            if (this instanceof E)
                for (c = this.series.length; c--;) this.series[c].update({
                    dataGrouping: a
                }, !1);
            else h(this.chart.options.series, function(b) {
                b.dataGrouping = a
            }, !1);
            b && this.chart.redraw()
        }
    })(L);
    (function(a) {
        var C = a.each,
            G = a.Point,
            E = a.seriesType,
            r = a.seriesTypes;
        E("ohlc", "column", {
            lineWidth: 1,
            tooltip: {
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'
            },
            threshold: null,
            states: {
                hover: {
                    lineWidth: 3
                }
            },
            stickyTracking: !0
        }, {
            directTouch: !1,
            pointArrayMap: ["open", "high", "low", "close"],
            toYData: function(a) {
                return [a.open, a.high, a.low, a.close]
            },
            pointValKey: "close",
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            pointAttribs: function(a, h) {
                h = r.column.prototype.pointAttribs.call(this, a, h);
                var n = this.options;
                delete h.fill;
                !a.options.color && n.upColor && a.open < a.close && (h.stroke = n.upColor);
                return h
            },
            translate: function() {
                var a = this,
                    h = a.yAxis,
                    x = !!a.modifyValue,
                    q = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
                r.column.prototype.translate.apply(a);
                C(a.points, function(n) {
                    C([n.open, n.high, n.low, n.close, n.low], function(r, g) {
                        null !== r && (x && (r = a.modifyValue(r)), n[q[g]] = h.toPixels(r, !0))
                    });
                    n.tooltipPos[1] = n.plotHigh + h.pos - a.chart.plotTop
                })
            },
            drawPoints: function() {
                var a = this,
                    h = a.chart;
                C(a.points, function(n) {
                    var q, r, x, g, c = n.graphic,
                        l, b = !c;
                    void 0 !== n.plotY && (c || (n.graphic = c = h.renderer.path().add(a.group)), c.attr(a.pointAttribs(n, n.selected && "select")), r = c.strokeWidth() %
                        2 / 2, l = Math.round(n.plotX) - r, x = Math.round(n.shapeArgs.width / 2), g = ["M", l, Math.round(n.yBottom), "L", l, Math.round(n.plotHigh)], null !== n.open && (q = Math.round(n.plotOpen) + r, g.push("M", l, q, "L", l - x, q)), null !== n.close && (q = Math.round(n.plotClose) + r, g.push("M", l, q, "L", l + x, q)), c[b ? "attr" : "animate"]({
                            d: g
                        }).addClass(n.getClassName(), !0))
                })
            },
            animate: null
        }, {
            getClassName: function() {
                return G.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down")
            }
        })
    })(L);
    (function(a) {
        var C =
            a.defaultPlotOptions,
            G = a.each,
            E = a.merge,
            r = a.seriesType,
            n = a.seriesTypes;
        r("candlestick", "ohlc", E(C.column, {
            states: {
                hover: {
                    lineWidth: 2
                }
            },
            tooltip: C.ohlc.tooltip,
            threshold: null,
            lineColor: "#000000",
            lineWidth: 1,
            upColor: "#ffffff",
            stickyTracking: !0
        }), {
            pointAttribs: function(a, r) {
                var h = n.column.prototype.pointAttribs.call(this, a, r),
                    v = this.options,
                    x = a.open < a.close,
                    g = v.lineColor || this.color;
                h["stroke-width"] = v.lineWidth;
                h.fill = a.options.color || (x ? v.upColor || this.color : this.color);
                h.stroke = a.lineColor || (x ? v.upLineColor ||
                    g : g);
                r && (a = v.states[r], h.fill = a.color || h.fill, h.stroke = a.lineColor || h.stroke, h["stroke-width"] = a.lineWidth || h["stroke-width"]);
                return h
            },
            drawPoints: function() {
                var a = this,
                    n = a.chart;
                G(a.points, function(h) {
                    var r = h.graphic,
                        q, g, c, l, b, f, p, t = !r;
                    void 0 !== h.plotY && (r || (h.graphic = r = n.renderer.path().add(a.group)), r.attr(a.pointAttribs(h, h.selected && "select")).shadow(a.options.shadow), b = r.strokeWidth() % 2 / 2, f = Math.round(h.plotX) - b, q = h.plotOpen, g = h.plotClose, c = Math.min(q, g), q = Math.max(q, g), p = Math.round(h.shapeArgs.width /
                        2), g = Math.round(c) !== Math.round(h.plotHigh), l = q !== h.yBottom, c = Math.round(c) + b, q = Math.round(q) + b, b = [], b.push("M", f - p, q, "L", f - p, c, "L", f + p, c, "L", f + p, q, "Z", "M", f, c, "L", f, g ? Math.round(h.plotHigh) : c, "M", f, q, "L", f, l ? Math.round(h.yBottom) : q), r[t ? "attr" : "animate"]({
                        d: b
                    }).addClass(h.getClassName(), !0))
                })
            }
        })
    })(L);
    da = function(a) {
        var C = a.each,
            G = a.seriesTypes,
            E = a.stableSort;
        return {
            translate: function() {
                G.column.prototype.translate.apply(this);
                var a = this.options,
                    n = this.chart,
                    h = this.points,
                    x = h.length - 1,
                    q, v, y = a.onSeries;
                q = y && n.get(y);
                var a = a.onKey || "y",
                    y = q && q.options.step,
                    g = q && q.points,
                    c = g && g.length,
                    l = this.xAxis,
                    b = this.yAxis,
                    f = 0,
                    p, t, e, B;
                if (q && q.visible && c)
                    for (f = (q.pointXOffset || 0) + (q.barW || 0) / 2, q = q.currentDataGrouping, t = g[c - 1].x + (q ? q.totalRange : 0), E(h, function(a, b) {
                            return a.x - b.x
                        }), a = "plot" + a[0].toUpperCase() + a.substr(1); c-- && h[x] && !(p = g[c], q = h[x], q.y = p.y, p.x <= q.x && void 0 !== p[a] && (q.x <= t && (q.plotY = p[a], p.x < q.x && !y && (e = g[c + 1]) && void 0 !== e[a] && (B = (q.x - p.x) / (e.x - p.x), q.plotY += B * (e[a] - p[a]), q.y += B * (e.y - p.y))), x--, c++,
                            0 > x)););
                C(h, function(a, c) {
                    var e;
                    a.plotX += f;
                    void 0 === a.plotY && (0 <= a.plotX && a.plotX <= l.len ? a.plotY = n.chartHeight - l.bottom - (l.opposite ? l.height : 0) + l.offset - b.top : a.shapeArgs = {});
                    (v = h[c - 1]) && v.plotX === a.plotX && (void 0 === v.stackIndex && (v.stackIndex = 0), e = v.stackIndex + 1);
                    a.stackIndex = e
                })
            }
        }
    }(L);
    (function(a, C) {
        function G(a) {
            g[a + "pin"] = function(c, b, f, h, n) {
                var e = n && n.anchorX;
                n = n && n.anchorY;
                "circle" === a && h > f && (c -= Math.round((h - f) / 2), f = h);
                c = g[a](c, b, f, h);
                e && n && (c.push("M", "circle" === a ? c[1] - c[4] : c[1] + c[4] / 2, b >
                    n ? b : b + h, "L", e, n), c = c.concat(g.circle(e - 1, n - 1, 2, 2)));
                return c
            }
        }
        var E = a.addEvent,
            r = a.each,
            n = a.merge,
            h = a.noop,
            x = a.Renderer,
            q = a.seriesType,
            v = a.TrackerMixin,
            y = a.VMLRenderer,
            g = a.SVGRenderer.prototype.symbols;
        q("flags", "column", {
            pointRange: 0,
            allowOverlapX: !1,
            shape: "flag",
            stackDistance: 12,
            textAlign: "center",
            tooltip: {
                pointFormat: "{point.text}\x3cbr/\x3e"
            },
            threshold: null,
            y: -30,
            fillColor: "#ffffff",
            lineWidth: 1,
            states: {
                hover: {
                    lineColor: "#000000",
                    fillColor: "#ccd6eb"
                }
            },
            style: {
                fontSize: "11px",
                fontWeight: "bold"
            }
        }, {
            sorted: !1,
            noSharedTooltip: !0,
            allowDG: !1,
            takeOrdinalPosition: !1,
            trackerGroups: ["markerGroup"],
            forceCrop: !0,
            init: a.Series.prototype.init,
            pointAttribs: function(a, g) {
                var b = this.options,
                    c = a && a.color || this.color,
                    h = b.lineColor,
                    l = a && a.lineWidth;
                a = a && a.fillColor || b.fillColor;
                g && (a = b.states[g].fillColor, h = b.states[g].lineColor, l = b.states[g].lineWidth);
                return {
                    fill: a || c,
                    stroke: h || c,
                    "stroke-width": l || b.lineWidth || 0
                }
            },
            translate: C.translate,
            drawPoints: function() {
                var c = this.points,
                    g = this.chart,
                    b = g.renderer,
                    f, h,
                    q = this.options,
                    e = q.y,
                    B, D, m, A, u, v, x = this.yAxis,
                    y = {},
                    d = [];
                for (D = c.length; D--;) m = c[D], v = m.plotX > this.xAxis.len, f = m.plotX, A = m.stackIndex, B = m.options.shape || q.shape, h = m.plotY, void 0 !== h && (h = m.plotY + e - (void 0 !== A && A * q.stackDistance)), m.anchorX = A ? void 0 : m.plotX, u = A ? void 0 : m.plotY, A = m.graphic, void 0 !== h && 0 <= f && !v ? (A || (A = m.graphic = b.label("", null, null, B, null, null, q.useHTML).attr(this.pointAttribs(m)).css(n(q.style, m.style)).attr({
                        align: "flag" === B ? "left" : "center",
                        width: q.width,
                        height: q.height,
                        "text-align": q.textAlign
                    }).addClass("highcharts-point").add(this.markerGroup),
                    m.graphic.div && (m.graphic.div.point = m), A.shadow(q.shadow), A.isNew = !0), 0 < f && (f -= A.strokeWidth() % 2), B = {
                    y: h,
                    anchorY: u
                }, q.allowOverlapX && (B.x = f, B.anchorX = m.anchorX), A.attr({
                    text: m.options.title || q.title || "A"
                })[A.isNew ? "attr" : "animate"](B), q.allowOverlapX || (y[m.plotX] ? y[m.plotX].size = Math.max(y[m.plotX].size, A.width) : y[m.plotX] = {
                    align: 0,
                    size: A.width,
                    target: f,
                    anchorX: f
                }), m.tooltipPos = g.inverted ? [x.len + x.pos - g.plotLeft - h, this.xAxis.len - f] : [f, h + x.pos - g.plotTop]) : A && (m.graphic = A.destroy());
                q.allowOverlapX ||
                    (a.objectEach(y, function(a) {
                        a.plotX = a.anchorX;
                        d.push(a)
                    }), a.distribute(d, this.xAxis.len), r(c, function(a) {
                        var b = a.graphic && y[a.plotX];
                        b && (a.graphic[a.graphic.isNew ? "attr" : "animate"]({
                            x: b.pos,
                            anchorX: a.anchorX
                        }), a.graphic.isNew = !1)
                    }));
                q.useHTML && a.wrap(this.markerGroup, "on", function(b) {
                    return a.SVGElement.prototype.on.apply(b.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1))
                })
            },
            drawTracker: function() {
                var a = this.points;
                v.drawTrackerPoint.apply(this);
                r(a, function(c) {
                    var b = c.graphic;
                    b &&
                        E(b.element, "mouseover", function() {
                            0 < c.stackIndex && !c.raised && (c._y = b.y, b.attr({
                                y: c._y - 8
                            }), c.raised = !0);
                            r(a, function(a) {
                                a !== c && a.raised && a.graphic && (a.graphic.attr({
                                    y: a._y
                                }), a.raised = !1)
                            })
                        })
                })
            },
            animate: h,
            buildKDTree: h,
            setClip: h
        });
        g.flag = function(a, h, b, f, n) {
            var c = n && n.anchorX || a;
            n = n && n.anchorY || h;
            return g.circle(c - 1, n - 1, 2, 2).concat(["M", c, n, "L", a, h + f, a, h, a + b, h, a + b, h + f, a, h + f, "Z"])
        };
        G("circle");
        G("square");
        x === y && r(["flag", "circlepin", "squarepin"], function(a) {
            y.prototype.symbols[a] = g[a]
        })
    })(L, da);
    (function(a) {
        function C(a,
            b, c) {
            this.init(a, b, c)
        }
        var G = a.addEvent,
            E = a.Axis,
            r = a.correctFloat,
            n = a.defaultOptions,
            h = a.defined,
            x = a.destroyObjectProperties,
            q = a.each,
            v = a.fireEvent,
            y = a.hasTouch,
            g = a.isTouchDevice,
            c = a.merge,
            l = a.pick,
            b = a.removeEvent,
            f = a.wrap,
            p, t = {
                height: g ? 20 : 14,
                barBorderRadius: 0,
                buttonBorderRadius: 0,
                liveRedraw: a.svg && !g,
                margin: 10,
                minWidth: 6,
                step: .2,
                zIndex: 3,
                barBackgroundColor: "#cccccc",
                barBorderWidth: 1,
                barBorderColor: "#cccccc",
                buttonArrowColor: "#333333",
                buttonBackgroundColor: "#e6e6e6",
                buttonBorderColor: "#cccccc",
                buttonBorderWidth: 1,
                rifleColor: "#333333",
                trackBackgroundColor: "#f2f2f2",
                trackBorderColor: "#f2f2f2",
                trackBorderWidth: 1
            };
        n.scrollbar = c(!0, t, n.scrollbar);
        a.swapXY = p = function(a, b) {
            var c = a.length,
                e;
            if (b)
                for (b = 0; b < c; b += 3) e = a[b + 1], a[b + 1] = a[b + 2], a[b + 2] = e;
            return a
        };
        C.prototype = {
            init: function(a, b, f) {
                this.scrollbarButtons = [];
                this.renderer = a;
                this.userOptions = b;
                this.options = c(t, b);
                this.chart = f;
                this.size = l(this.options.size, this.options.height);
                b.enabled && (this.render(), this.initEvents(), this.addEvents())
            },
            render: function() {
                var a =
                    this.renderer,
                    b = this.options,
                    c = this.size,
                    f;
                this.group = f = a.g("scrollbar").attr({
                    zIndex: b.zIndex,
                    translateY: -99999
                }).add();
                this.track = a.rect().addClass("highcharts-scrollbar-track").attr({
                    x: 0,
                    r: b.trackBorderRadius || 0,
                    height: c,
                    width: c
                }).add(f);
                this.track.attr({
                    fill: b.trackBackgroundColor,
                    stroke: b.trackBorderColor,
                    "stroke-width": b.trackBorderWidth
                });
                this.trackBorderWidth = this.track.strokeWidth();
                this.track.attr({
                    y: -this.trackBorderWidth % 2 / 2
                });
                this.scrollbarGroup = a.g().add(f);
                this.scrollbar = a.rect().addClass("highcharts-scrollbar-thumb").attr({
                    height: c,
                    width: c,
                    r: b.barBorderRadius || 0
                }).add(this.scrollbarGroup);
                this.scrollbarRifles = a.path(p(["M", -3, c / 4, "L", -3, 2 * c / 3, "M", 0, c / 4, "L", 0, 2 * c / 3, "M", 3, c / 4, "L", 3, 2 * c / 3], b.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
                this.scrollbar.attr({
                    fill: b.barBackgroundColor,
                    stroke: b.barBorderColor,
                    "stroke-width": b.barBorderWidth
                });
                this.scrollbarRifles.attr({
                    stroke: b.rifleColor,
                    "stroke-width": 1
                });
                this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
                this.scrollbarGroup.translate(-this.scrollbarStrokeWidth %
                    2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
                this.drawScrollbarButton(0);
                this.drawScrollbarButton(1)
            },
            position: function(a, b, c, f) {
                var e = this.options.vertical,
                    g = 0,
                    h = this.rendered ? "animate" : "attr";
                this.x = a;
                this.y = b + this.trackBorderWidth;
                this.width = c;
                this.xOffset = this.height = f;
                this.yOffset = g;
                e ? (this.width = this.yOffset = c = g = this.size, this.xOffset = b = 0, this.barWidth = f - 2 * c, this.x = a += this.options.margin) : (this.height = this.xOffset = f = b = this.size, this.barWidth = c - 2 * f, this.y += this.options.margin);
                this.group[h]({
                    translateX: a,
                    translateY: this.y
                });
                this.track[h]({
                    width: c,
                    height: f
                });
                this.scrollbarButtons[1][h]({
                    translateX: e ? 0 : c - b,
                    translateY: e ? f - g : 0
                })
            },
            drawScrollbarButton: function(a) {
                var b = this.renderer,
                    c = this.scrollbarButtons,
                    e = this.options,
                    f = this.size,
                    g;
                g = b.g().add(this.group);
                c.push(g);
                g = b.rect().addClass("highcharts-scrollbar-button").add(g);
                g.attr({
                    stroke: e.buttonBorderColor,
                    "stroke-width": e.buttonBorderWidth,
                    fill: e.buttonBackgroundColor
                });
                g.attr(g.crisp({
                    x: -.5,
                    y: -.5,
                    width: f + 1,
                    height: f + 1,
                    r: e.buttonBorderRadius
                }, g.strokeWidth()));
                g = b.path(p(["M", f / 2 + (a ? -1 : 1), f / 2 - 3, "L", f / 2 + (a ? -1 : 1), f / 2 + 3, "L", f / 2 + (a ? 2 : -2), f / 2], e.vertical)).addClass("highcharts-scrollbar-arrow").add(c[a]);
                g.attr({
                    fill: e.buttonArrowColor
                })
            },
            setRange: function(a, b) {
                var c = this.options,
                    e = c.vertical,
                    f = c.minWidth,
                    g = this.barWidth,
                    l, n, p = this.rendered && !this.hasDragged ? "animate" : "attr";
                h(g) && (a = Math.max(a, 0), l = Math.ceil(g * a), this.calculatedWidth = n = r(g * Math.min(b, 1) - l), n < f && (l = (g - f + n) * a, n = f), f = Math.floor(l + this.xOffset + this.yOffset), g = n / 2 - .5, this.from = a, this.to = b, e ? (this.scrollbarGroup[p]({
                        translateY: f
                    }),
                    this.scrollbar[p]({
                        height: n
                    }), this.scrollbarRifles[p]({
                        translateY: g
                    }), this.scrollbarTop = f, this.scrollbarLeft = 0) : (this.scrollbarGroup[p]({
                    translateX: f
                }), this.scrollbar[p]({
                    width: n
                }), this.scrollbarRifles[p]({
                    translateX: g
                }), this.scrollbarLeft = f, this.scrollbarTop = 0), 12 >= n ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0), !1 === c.showFull && (0 >= a && 1 <= b ? this.group.hide() : this.group.show()), this.rendered = !0)
            },
            initEvents: function() {
                var a = this;
                a.mouseMoveHandler = function(b) {
                    var c = a.chart.pointer.normalize(b),
                        e = a.options.vertical ? "chartY" : "chartX",
                        f = a.initPositions;
                    !a.grabbedCenter || b.touches && 0 === b.touches[0][e] || (c = a.cursorToScrollbarPosition(c)[e], e = a[e], e = c - e, a.hasDragged = !0, a.updatePosition(f[0] + e, f[1] + e), a.hasDragged && v(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMType: b.type,
                        DOMEvent: b
                    }))
                };
                a.mouseUpHandler = function(b) {
                    a.hasDragged && v(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMType: b.type,
                        DOMEvent: b
                    });
                    a.grabbedCenter = a.hasDragged = a.chartX = a.chartY = null
                };
                a.mouseDownHandler =
                    function(b) {
                        b = a.chart.pointer.normalize(b);
                        b = a.cursorToScrollbarPosition(b);
                        a.chartX = b.chartX;
                        a.chartY = b.chartY;
                        a.initPositions = [a.from, a.to];
                        a.grabbedCenter = !0
                    };
                a.buttonToMinClick = function(b) {
                    var c = r(a.to - a.from) * a.options.step;
                    a.updatePosition(r(a.from - c), r(a.to - c));
                    v(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: b
                    })
                };
                a.buttonToMaxClick = function(b) {
                    var c = (a.to - a.from) * a.options.step;
                    a.updatePosition(a.from + c, a.to + c);
                    v(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: b
                    })
                };
                a.trackClick = function(b) {
                    var c = a.chart.pointer.normalize(b),
                        e = a.to - a.from,
                        f = a.y + a.scrollbarTop,
                        g = a.x + a.scrollbarLeft;
                    a.options.vertical && c.chartY > f || !a.options.vertical && c.chartX > g ? a.updatePosition(a.from + e, a.to + e) : a.updatePosition(a.from - e, a.to - e);
                    v(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: b
                    })
                }
            },
            cursorToScrollbarPosition: function(a) {
                var b = this.options,
                    b = b.minWidth > this.calculatedWidth ? b.minWidth : 0;
                return {
                    chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - b),
                    chartY: (a.chartY -
                        this.y - this.yOffset) / (this.barWidth - b)
                }
            },
            updatePosition: function(a, b) {
                1 < b && (a = r(1 - r(b - a)), b = 1);
                0 > a && (b = r(b - a), a = 0);
                this.from = a;
                this.to = b
            },
            update: function(a) {
                this.destroy();
                this.init(this.chart.renderer, c(!0, this.options, a), this.chart)
            },
            addEvents: function() {
                var a = this.options.inverted ? [1, 0] : [0, 1],
                    b = this.scrollbarButtons,
                    c = this.scrollbarGroup.element,
                    f = this.mouseDownHandler,
                    g = this.mouseMoveHandler,
                    h = this.mouseUpHandler,
                    a = [
                        [b[a[0]].element, "click", this.buttonToMinClick],
                        [b[a[1]].element, "click", this.buttonToMaxClick],
                        [this.track.element, "click", this.trackClick],
                        [c, "mousedown", f],
                        [c.ownerDocument, "mousemove", g],
                        [c.ownerDocument, "mouseup", h]
                    ];
                y && a.push([c, "touchstart", f], [c.ownerDocument, "touchmove", g], [c.ownerDocument, "touchend", h]);
                q(a, function(a) {
                    G.apply(null, a)
                });
                this._events = a
            },
            removeEvents: function() {
                q(this._events, function(a) {
                    b.apply(null, a)
                });
                this._events.length = 0
            },
            destroy: function() {
                var a = this.chart.scroller;
                this.removeEvents();
                q(["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"], function(a) {
                    this[a] &&
                        this[a].destroy && (this[a] = this[a].destroy())
                }, this);
                a && this === a.scrollbar && (a.scrollbar = null, x(a.scrollbarButtons))
            }
        };
        f(E.prototype, "init", function(a) {
            var b = this;
            a.apply(b, Array.prototype.slice.call(arguments, 1));
            b.options.scrollbar && b.options.scrollbar.enabled && (b.options.scrollbar.vertical = !b.horiz, b.options.startOnTick = b.options.endOnTick = !1, b.scrollbar = new C(b.chart.renderer, b.options.scrollbar, b.chart), G(b.scrollbar, "changed", function(a) {
                var c = Math.min(l(b.options.min, b.min), b.min, b.dataMin),
                    e = Math.max(l(b.options.max, b.max), b.max, b.dataMax) - c,
                    f;
                b.horiz && !b.reversed || !b.horiz && b.reversed ? (f = c + e * this.to, c += e * this.from) : (f = c + e * (1 - this.from), c += e * (1 - this.to));
                b.setExtremes(c, f, !0, !1, a)
            }))
        });
        f(E.prototype, "render", function(a) {
            var b = Math.min(l(this.options.min, this.min), this.min, l(this.dataMin, this.min)),
                c = Math.max(l(this.options.max, this.max), this.max, l(this.dataMax, this.max)),
                e = this.scrollbar,
                f = this.titleOffset || 0;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            if (e) {
                this.horiz ? (e.position(this.left,
                    this.top + this.height + 2 + this.chart.scrollbarsOffsets[1] + (this.opposite ? 0 : f + this.axisTitleMargin + this.offset), this.width, this.height), f = 1) : (e.position(this.left + this.width + 2 + this.chart.scrollbarsOffsets[0] + (this.opposite ? f + this.axisTitleMargin + this.offset : 0), this.top, this.width, this.height), f = 0);
                if (!this.opposite && !this.horiz || this.opposite && this.horiz) this.chart.scrollbarsOffsets[f] += this.scrollbar.size + this.scrollbar.options.margin;
                isNaN(b) || isNaN(c) || !h(this.min) || !h(this.max) ? e.setRange(0, 0) : (f =
                    (this.min - b) / (c - b), b = (this.max - b) / (c - b), this.horiz && !this.reversed || !this.horiz && this.reversed ? e.setRange(f, b) : e.setRange(1 - b, 1 - f))
            }
        });
        f(E.prototype, "getOffset", function(a) {
            var b = this.horiz ? 2 : 1,
                c = this.scrollbar;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            c && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[b] += c.size + c.options.margin)
        });
        f(E.prototype, "destroy", function(a) {
            this.scrollbar && (this.scrollbar = this.scrollbar.destroy());
            a.apply(this, Array.prototype.slice.call(arguments,
                1))
        });
        a.Scrollbar = C
    })(L);
    (function(a) {
        function C(a) {
            this.init(a)
        }
        var G = a.addEvent,
            E = a.Axis,
            r = a.Chart,
            n = a.color,
            h = a.defaultOptions,
            x = a.defined,
            q = a.destroyObjectProperties,
            v = a.each,
            y = a.erase,
            g = a.error,
            c = a.extend,
            l = a.grep,
            b = a.hasTouch,
            f = a.isArray,
            p = a.isNumber,
            t = a.isObject,
            e = a.merge,
            B = a.pick,
            D = a.removeEvent,
            m = a.Scrollbar,
            A = a.Series,
            u = a.seriesTypes,
            H = a.wrap,
            I = [].concat(a.defaultDataGroupingUnits),
            K = function(a) {
                var b = l(arguments, p);
                if (b.length) return Math[a].apply(0, b)
            };
        I[4] = ["day", [1, 2, 3, 4]];
        I[5] = ["week", [1, 2, 3]];
        u = void 0 === u.areaspline ? "line" : "areaspline";
        c(h, {
            navigator: {
                height: 40,
                margin: 25,
                maskInside: !0,
                handles: {
                    width: 7,
                    height: 15,
                    symbols: ["navigator-handle", "navigator-handle"],
                    enabled: !0,
                    lineWidth: 1,
                    backgroundColor: "#f2f2f2",
                    borderColor: "#999999"
                },
                maskFill: n("#6685c2").setOpacity(.3).get(),
                outlineColor: "#cccccc",
                outlineWidth: 1,
                series: {
                    type: u,
                    fillOpacity: .05,
                    lineWidth: 1,
                    compare: null,
                    dataGrouping: {
                        approximation: "average",
                        enabled: !0,
                        groupPixelWidth: 2,
                        smoothed: !0,
                        units: I
                    },
                    dataLabels: {
                        enabled: !1,
                        zIndex: 2
                    },
                    id: "highcharts-navigator-series",
                    className: "highcharts-navigator-series",
                    lineColor: null,
                    marker: {
                        enabled: !1
                    },
                    pointRange: 0,
                    threshold: null
                },
                xAxis: {
                    overscroll: 0,
                    className: "highcharts-navigator-xaxis",
                    tickLength: 0,
                    lineWidth: 0,
                    gridLineColor: "#e6e6e6",
                    gridLineWidth: 1,
                    tickPixelInterval: 200,
                    labels: {
                        align: "left",
                        style: {
                            color: "#999999"
                        },
                        x: 3,
                        y: -4
                    },
                    crosshair: !1
                },
                yAxis: {
                    className: "highcharts-navigator-yaxis",
                    gridLineWidth: 0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: .1,
                    maxPadding: .1,
                    labels: {
                        enabled: !1
                    },
                    crosshair: !1,
                    title: {
                        text: null
                    },
                    tickLength: 0,
                    tickWidth: 0
                }
            }
        });
        a.Renderer.prototype.symbols["navigator-handle"] = function(a, b, c, e, f) {
            a = f.width / 2;
            b = Math.round(a / 3) + .5;
            f = f.height;
            return ["M", -a - 1, .5, "L", a, .5, "L", a, f + .5, "L", -a - 1, f + .5, "L", -a - 1, .5, "M", -b, 4, "L", -b, f - 3, "M", b - 1, 4, "L", b - 1, f - 3]
        };
        C.prototype = {
            drawHandle: function(a, b, c, e) {
                var d = this.navigatorOptions.handles.height;
                this.handles[b][e](c ? {
                    translateX: Math.round(this.left + this.height / 2),
                    translateY: Math.round(this.top + parseInt(a, 10) + .5 - d)
                } : {
                    translateX: Math.round(this.left +
                        parseInt(a, 10)),
                    translateY: Math.round(this.top + this.height / 2 - d / 2 - 1)
                })
            },
            drawOutline: function(a, b, c, e) {
                var d = this.navigatorOptions.maskInside,
                    f = this.outline.strokeWidth(),
                    k = f / 2,
                    f = f % 2 / 2,
                    g = this.outlineHeight,
                    h = this.scrollbarHeight,
                    m = this.size,
                    l = this.left - h,
                    n = this.top;
                c ? (l -= k, c = n + b + f, b = n + a + f, a = ["M", l + g, n - h - f, "L", l + g, c, "L", l, c, "L", l, b, "L", l + g, b, "L", l + g, n + m + h].concat(d ? ["M", l + g, c - k, "L", l + g, b + k] : [])) : (a += l + h - f, b += l + h - f, n += k, a = ["M", l, n, "L", a, n, "L", a, n + g, "L", b, n + g, "L", b, n, "L", l + m + 2 * h, n].concat(d ? ["M", a - k, n,
                    "L", b + k, n
                ] : []));
                this.outline[e]({
                    d: a
                })
            },
            drawMasks: function(a, b, c, e) {
                var d = this.left,
                    f = this.top,
                    k = this.height,
                    g, h, m, l;
                c ? (m = [d, d, d], l = [f, f + a, f + b], h = [k, k, k], g = [a, b - a, this.size - b]) : (m = [d, d + a, d + b], l = [f, f, f], h = [a, b - a, this.size - b], g = [k, k, k]);
                v(this.shades, function(a, b) {
                    a[e]({
                        x: m[b],
                        y: l[b],
                        width: h[b],
                        height: g[b]
                    })
                })
            },
            renderElements: function() {
                var a = this,
                    b = a.navigatorOptions,
                    c = b.maskInside,
                    e = a.chart,
                    f = e.inverted,
                    g = e.renderer,
                    h;
                a.navigatorGroup = h = g.g("navigator").attr({
                    zIndex: 8,
                    visibility: "hidden"
                }).add();
                var m = {
                    cursor: f ? "ns-resize" : "ew-resize"
                };
                v([!c, c, !c], function(c, d) {
                    a.shades[d] = g.rect().addClass("highcharts-navigator-mask" + (1 === d ? "-inside" : "-outside")).attr({
                        fill: c ? b.maskFill : "rgba(0,0,0,0)"
                    }).css(1 === d && m).add(h)
                });
                a.outline = g.path().addClass("highcharts-navigator-outline").attr({
                    "stroke-width": b.outlineWidth,
                    stroke: b.outlineColor
                }).add(h);
                b.handles.enabled && v([0, 1], function(c) {
                    b.handles.inverted = e.inverted;
                    a.handles[c] = g.symbol(b.handles.symbols[c], -b.handles.width / 2 - 1, 0, b.handles.width, b.handles.height,
                        b.handles);
                    a.handles[c].attr({
                        zIndex: 7 - c
                    }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][c]).add(h);
                    var d = b.handles;
                    a.handles[c].attr({
                        fill: d.backgroundColor,
                        stroke: d.borderColor,
                        "stroke-width": d.lineWidth
                    }).css(m)
                })
            },
            update: function(a) {
                v(this.series || [], function(a) {
                    a.baseSeries && delete a.baseSeries.navigatorSeries
                });
                this.destroy();
                e(!0, this.chart.options.navigator, this.options, a);
                this.init(this.chart)
            },
            render: function(b, c, e, f) {
                var d = this.chart,
                    k, g, h = this.scrollbarHeight,
                    m, l = this.xAxis;
                k = l.fake ? d.xAxis[0] : l;
                var n = this.navigatorEnabled,
                    w, q = this.rendered;
                g = d.inverted;
                var r, u = d.xAxis[0].minRange,
                    t = d.xAxis[0].options.maxRange;
                if (!this.hasDragged || x(e)) {
                    if (!p(b) || !p(c))
                        if (q) e = 0, f = B(l.width, k.width);
                        else return;
                    this.left = B(l.left, d.plotLeft + h + (g ? d.plotWidth : 0));
                    this.size = w = m = B(l.len, (g ? d.plotHeight : d.plotWidth) - 2 * h);
                    d = g ? h : m + 2 * h;
                    e = B(e, l.toPixels(b, !0));
                    f = B(f, l.toPixels(c, !0));
                    p(e) && Infinity !== Math.abs(e) || (e = 0, f = d);
                    b = l.toValue(e, !0);
                    c = l.toValue(f, !0);
                    r = Math.abs(a.correctFloat(c -
                        b));
                    r < u ? this.grabbedLeft ? e = l.toPixels(c - u, !0) : this.grabbedRight && (f = l.toPixels(b + u, !0)) : x(t) && r > t && (this.grabbedLeft ? e = l.toPixels(c - t, !0) : this.grabbedRight && (f = l.toPixels(b + t, !0)));
                    this.zoomedMax = Math.min(Math.max(e, f, 0), w);
                    this.zoomedMin = Math.min(Math.max(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(e, f), 0), w);
                    this.range = this.zoomedMax - this.zoomedMin;
                    w = Math.round(this.zoomedMax);
                    e = Math.round(this.zoomedMin);
                    n && (this.navigatorGroup.attr({
                            visibility: "visible"
                        }), q = q && !this.hasDragged ? "animate" :
                        "attr", this.drawMasks(e, w, g, q), this.drawOutline(e, w, g, q), this.navigatorOptions.handles.enabled && (this.drawHandle(e, 0, g, q), this.drawHandle(w, 1, g, q)));
                    this.scrollbar && (g ? (g = this.top - h, k = this.left - h + (n || !k.opposite ? 0 : (k.titleOffset || 0) + k.axisTitleMargin), h = m + 2 * h) : (g = this.top + (n ? this.height : -h), k = this.left - h), this.scrollbar.position(k, g, d, h), this.scrollbar.setRange(this.zoomedMin / m, this.zoomedMax / m));
                    this.rendered = !0
                }
            },
            addMouseEvents: function() {
                var a = this,
                    c = a.chart,
                    e = c.container,
                    f = [],
                    g, h;
                a.mouseMoveHandler =
                    g = function(b) {
                        a.onMouseMove(b)
                    };
                a.mouseUpHandler = h = function(b) {
                    a.onMouseUp(b)
                };
                f = a.getPartsEvents("mousedown");
                f.push(G(e, "mousemove", g), G(e.ownerDocument, "mouseup", h));
                b && (f.push(G(e, "touchmove", g), G(e.ownerDocument, "touchend", h)), f.concat(a.getPartsEvents("touchstart")));
                a.eventsToUnbind = f;
                a.series && a.series[0] && f.push(G(a.series[0].xAxis, "foundExtremes", function() {
                    c.navigator.modifyNavigatorAxisExtremes()
                }))
            },
            getPartsEvents: function(a) {
                var b = this,
                    c = [];
                v(["shades", "handles"], function(d) {
                    v(b[d],
                        function(e, f) {
                            c.push(G(e.element, a, function(a) {
                                b[d + "Mousedown"](a, f)
                            }))
                        })
                });
                return c
            },
            shadesMousedown: function(a, b) {
                a = this.chart.pointer.normalize(a);
                var c = this.chart,
                    d = this.xAxis,
                    e = this.zoomedMin,
                    f = this.left,
                    g = this.size,
                    h = this.range,
                    m = a.chartX,
                    l, n;
                c.inverted && (m = a.chartY, f = this.top);
                1 === b ? (this.grabbedCenter = m, this.fixedWidth = h, this.dragOffset = m - e) : (a = m - f - h / 2, 0 === b ? a = Math.max(0, a) : 2 === b && a + h >= g && (a = g - h, d.reversed ? (a -= h, n = this.getUnionExtremes().dataMin) : l = this.getUnionExtremes().dataMax), a !== e &&
                    (this.fixedWidth = h, b = d.toFixedRange(a, a + h, n, l), x(b.min) && c.xAxis[0].setExtremes(Math.min(b.min, b.max), Math.max(b.min, b.max), !0, null, {
                        trigger: "navigator"
                    })))
            },
            handlesMousedown: function(a, b) {
                this.chart.pointer.normalize(a);
                a = this.chart;
                var c = a.xAxis[0],
                    d = a.inverted && !c.reversed || !a.inverted && c.reversed;
                0 === b ? (this.grabbedLeft = !0, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = d ? c.min : c.max) : (this.grabbedRight = !0, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = d ? c.max : c.min);
                a.fixedRange = null
            },
            onMouseMove: function(a) {
                var b = this,
                    c = b.chart,
                    d = b.left,
                    e = b.navigatorSize,
                    f = b.range,
                    g = b.dragOffset,
                    h = c.inverted;
                a.touches && 0 === a.touches[0].pageX || (a = c.pointer.normalize(a), c = a.chartX, h && (d = b.top, c = a.chartY), b.grabbedLeft ? (b.hasDragged = !0, b.render(0, 0, c - d, b.otherHandlePos)) : b.grabbedRight ? (b.hasDragged = !0, b.render(0, 0, b.otherHandlePos, c - d)) : b.grabbedCenter && (b.hasDragged = !0, c < g ? c = g : c > e + g - f && (c = e + g - f), b.render(0, 0, c - g, c - g + f)), b.hasDragged && b.scrollbar && b.scrollbar.options.liveRedraw && (a.DOMType = a.type,
                    setTimeout(function() {
                        b.onMouseUp(a)
                    }, 0)))
            },
            onMouseUp: function(a) {
                var b = this.chart,
                    c = this.xAxis,
                    d = c && c.reversed,
                    e = this.scrollbar,
                    f, g, h = a.DOMEvent || a;
                (!this.hasDragged || e && e.hasDragged) && "scrollbar" !== a.trigger || (e = this.getUnionExtremes(), this.zoomedMin === this.otherHandlePos ? f = this.fixedExtreme : this.zoomedMax === this.otherHandlePos && (g = this.fixedExtreme), this.zoomedMax === this.size && (g = d ? e.dataMin : e.dataMax), 0 === this.zoomedMin && (f = d ? e.dataMax : e.dataMin), c = c.toFixedRange(this.zoomedMin, this.zoomedMax,
                    f, g), x(c.min) && b.xAxis[0].setExtremes(Math.min(c.min, c.max), Math.max(c.min, c.max), !0, this.hasDragged ? !1 : null, {
                    trigger: "navigator",
                    triggerOp: "navigator-drag",
                    DOMEvent: h
                }));
                "mousemove" !== a.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null)
            },
            removeEvents: function() {
                this.eventsToUnbind && (v(this.eventsToUnbind, function(a) {
                    a()
                }), this.eventsToUnbind = void 0);
                this.removeBaseSeriesEvents()
            },
            removeBaseSeriesEvents: function() {
                var a =
                    this.baseSeries || [];
                this.navigatorEnabled && a[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && v(a, function(a) {
                    D(a, "updatedData", this.updatedDataHandler)
                }, this), a[0].xAxis && D(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
            },
            init: function(a) {
                var b = a.options,
                    c = b.navigator,
                    d = c.enabled,
                    f = b.scrollbar,
                    g = f.enabled,
                    b = d ? c.height : 0,
                    h = g ? f.height : 0;
                this.handles = [];
                this.shades = [];
                this.chart = a;
                this.setBaseSeries();
                this.height = b;
                this.scrollbarHeight = h;
                this.scrollbarEnabled = g;
                this.navigatorEnabled = d;
                this.navigatorOptions =
                    c;
                this.scrollbarOptions = f;
                this.outlineHeight = b + h;
                this.opposite = B(c.opposite, !d && a.inverted);
                var l = this,
                    f = l.baseSeries,
                    g = a.xAxis.length,
                    n = a.yAxis.length,
                    p = f && f[0] && f[0].xAxis || a.xAxis[0];
                a.extraMargin = {
                    type: l.opposite ? "plotTop" : "marginBottom",
                    value: (d || !a.inverted ? l.outlineHeight : 0) + c.margin
                };
                a.inverted && (a.extraMargin.type = l.opposite ? "marginRight" : "plotLeft");
                a.isDirtyBox = !0;
                l.navigatorEnabled ? (l.xAxis = new E(a, e({
                        breaks: p.options.breaks,
                        ordinal: p.options.ordinal
                    }, c.xAxis, {
                        id: "navigator-x-axis",
                        yAxis: "navigator-y-axis",
                        isX: !0,
                        type: "datetime",
                        index: g,
                        offset: 0,
                        keepOrdinalPadding: !0,
                        startOnTick: !1,
                        endOnTick: !1,
                        minPadding: 0,
                        maxPadding: 0,
                        zoomEnabled: !1
                    }, a.inverted ? {
                        offsets: [h, 0, -h, 0],
                        width: b
                    } : {
                        offsets: [0, -h, 0, h],
                        height: b
                    })), l.yAxis = new E(a, e(c.yAxis, {
                        id: "navigator-y-axis",
                        alignTicks: !1,
                        offset: 0,
                        index: n,
                        zoomEnabled: !1
                    }, a.inverted ? {
                        width: b
                    } : {
                        height: b
                    })), f || c.series.data ? l.updateNavigatorSeries() : 0 === a.series.length && H(a, "redraw", function(b, c) {
                        0 < a.series.length && !l.series && (l.setBaseSeries(), a.redraw = b);
                        b.call(a, c)
                    }), l.renderElements(),
                    l.addMouseEvents()) : l.xAxis = {
                    translate: function(b, c) {
                        var d = a.xAxis[0],
                            e = d.getExtremes(),
                            f = d.len - 2 * h,
                            g = K("min", d.options.min, e.dataMin),
                            d = K("max", d.options.max, e.dataMax) - g;
                        return c ? b * d / f + g : f * (b - g) / d
                    },
                    toPixels: function(a) {
                        return this.translate(a)
                    },
                    toValue: function(a) {
                        return this.translate(a, !0)
                    },
                    toFixedRange: E.prototype.toFixedRange,
                    fake: !0
                };
                a.options.scrollbar.enabled && (a.scrollbar = l.scrollbar = new m(a.renderer, e(a.options.scrollbar, {
                    margin: l.navigatorEnabled ? 0 : 10,
                    vertical: a.inverted
                }), a), G(l.scrollbar,
                    "changed",
                    function(b) {
                        var c = l.size,
                            d = c * this.to,
                            c = c * this.from;
                        l.hasDragged = l.scrollbar.hasDragged;
                        l.render(0, 0, c, d);
                        (a.options.scrollbar.liveRedraw || "mousemove" !== b.DOMType && "touchmove" !== b.DOMType) && setTimeout(function() {
                            l.onMouseUp(b)
                        })
                    }));
                l.addBaseSeriesEvents();
                l.addChartEvents()
            },
            getUnionExtremes: function(a) {
                var b = this.chart.xAxis[0],
                    c = this.xAxis,
                    d = c.options,
                    e = b.options,
                    f;
                a && null === b.dataMin || (f = {
                    dataMin: B(d && d.min, K("min", e.min, b.dataMin, c.dataMin, c.min)),
                    dataMax: B(d && d.max, K("max", e.max, b.dataMax,
                        c.dataMax, c.max))
                });
                return f
            },
            setBaseSeries: function(a, b) {
                var c = this.chart,
                    d = this.baseSeries = [];
                a = a || c.options && c.options.navigator.baseSeries || 0;
                v(c.series || [], function(b, c) {
                    b.options.isInternal || !b.options.showInNavigator && (c !== a && b.options.id !== a || !1 === b.options.showInNavigator) || d.push(b)
                });
                this.xAxis && !this.xAxis.fake && this.updateNavigatorSeries(b)
            },
            updateNavigatorSeries: function(b) {
                var d = this,
                    g = d.chart,
                    k = d.baseSeries,
                    l, m, n = d.navigatorOptions.series,
                    p, q = {
                        enableMouseTracking: !1,
                        index: null,
                        linkedTo: null,
                        group: "nav",
                        padXAxis: !1,
                        xAxis: "navigator-x-axis",
                        yAxis: "navigator-y-axis",
                        showInLegend: !1,
                        stacking: !1,
                        isInternal: !0,
                        visible: !0
                    },
                    r = d.series = a.grep(d.series || [], function(b) {
                        var c = b.baseSeries;
                        return 0 > a.inArray(c, k) ? (c && (D(c, "updatedData", d.updatedDataHandler), delete c.navigatorSeries), b.destroy(), !1) : !0
                    });
                k && k.length && v(k, function(a) {
                    var u = a.navigatorSeries,
                        w = c({
                            color: a.color
                        }, f(n) ? h.navigator.series : n);
                    u && !1 === d.navigatorOptions.adaptToUpdatedData || (q.name = "Navigator " + k.length, l = a.options || {}, p =
                        l.navigatorOptions || {}, m = e(l, q, w, p), w = p.data || w.data, d.hasNavigatorData = d.hasNavigatorData || !!w, m.data = w || l.data && l.data.slice(0), u && u.options ? u.update(m, b) : (a.navigatorSeries = g.initSeries(m), a.navigatorSeries.baseSeries = a, r.push(a.navigatorSeries)))
                });
                if (n.data && (!k || !k.length) || f(n)) d.hasNavigatorData = !1, n = a.splat(n), v(n, function(a, b) {
                    q.name = "Navigator " + (r.length + 1);
                    m = e(h.navigator.series, {
                            color: g.series[b] && !g.series[b].options.isInternal && g.series[b].color || g.options.colors[b] || g.options.colors[0]
                        },
                        q, a);
                    m.data = a.data;
                    m.data && (d.hasNavigatorData = !0, r.push(g.initSeries(m)))
                });
                this.addBaseSeriesEvents()
            },
            addBaseSeriesEvents: function() {
                var a = this,
                    b = a.baseSeries || [];
                b[0] && b[0].xAxis && G(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
                v(b, function(b) {
                    G(b, "show", function() {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1)
                    });
                    G(b, "hide", function() {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1)
                    });
                    !1 !== this.navigatorOptions.adaptToUpdatedData && b.xAxis && G(b, "updatedData",
                        this.updatedDataHandler);
                    G(b, "remove", function() {
                        this.navigatorSeries && (y(a.series, this.navigatorSeries), this.navigatorSeries.remove(!1), delete this.navigatorSeries)
                    })
                }, this)
            },
            modifyNavigatorAxisExtremes: function() {
                var a = this.xAxis,
                    b;
                a.getExtremes && (!(b = this.getUnionExtremes(!0)) || b.dataMin === a.min && b.dataMax === a.max || (a.min = b.dataMin, a.max = b.dataMax))
            },
            modifyBaseAxisExtremes: function() {
                var a = this.chart.navigator,
                    b = this.getExtremes(),
                    c = b.dataMin,
                    e = b.dataMax,
                    b = b.max - b.min,
                    f = a.stickToMin,
                    g = a.stickToMax,
                    h = this.options.overscroll,
                    m, l, n = a.series && a.series[0],
                    q = !!this.setExtremes;
                this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger || (f && (l = c, m = l + b), g && (m = e + h, f || (l = Math.max(m - b, n && n.xData ? n.xData[0] : -Number.MAX_VALUE))), q && (f || g) && p(l) && (this.min = this.userMin = l, this.max = this.userMax = m));
                a.stickToMin = a.stickToMax = null
            },
            updatedDataHandler: function() {
                var a = this.chart.navigator,
                    b = this.navigatorSeries;
                a.stickToMax = a.xAxis.reversed ? 0 === Math.round(a.zoomedMin) : Math.round(a.zoomedMax) >= Math.round(a.size);
                a.stickToMin = p(this.xAxis.min) && this.xAxis.min <= this.xData[0] && (!this.chart.fixedRange || !a.stickToMax);
                b && !a.hasNavigatorData && (b.options.pointStart = this.xData[0], b.setData(this.options.data, !1, null, !1))
            },
            addChartEvents: function() {
                G(this.chart, "redraw", function() {
                    var a = this.navigator,
                        b = a && (a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis || a.scrollbar && this.xAxis[0]);
                    b && a.render(b.min, b.max)
                })
            },
            destroy: function() {
                this.removeEvents();
                this.xAxis && (y(this.chart.xAxis, this.xAxis), y(this.chart.axes,
                    this.xAxis));
                this.yAxis && (y(this.chart.yAxis, this.yAxis), y(this.chart.axes, this.yAxis));
                v(this.series || [], function(a) {
                    a.destroy && a.destroy()
                });
                v("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "), function(a) {
                    this[a] && this[a].destroy && this[a].destroy();
                    this[a] = null
                }, this);
                v([this.handles], function(a) {
                    q(a)
                }, this)
            }
        };
        a.Navigator = C;
        H(E.prototype, "zoom", function(a, b, c) {
            var d = this.chart,
                e = d.options,
                f = e.chart.zoomType,
                g = e.navigator,
                e = e.rangeSelector,
                h;
            this.isXAxis && (g && g.enabled || e && e.enabled) && ("x" === f ? d.resetZoomButton = "blocked" : "y" === f ? h = !1 : "xy" === f && this.options.range && (d = this.previousZoom, x(b) ? this.previousZoom = [this.min, this.max] : d && (b = d[0], c = d[1], delete this.previousZoom)));
            return void 0 !== h ? h : a.call(this, b, c)
        });
        H(r.prototype, "init", function(a, b, c) {
            G(this, "beforeRender", function() {
                var a = this.options;
                if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = this.navigator = new C(this)
            });
            a.call(this, b, c)
        });
        H(r.prototype,
            "setChartSize",
            function(a) {
                var b = this.legend,
                    c = this.navigator,
                    d, e, f, g;
                a.apply(this, [].slice.call(arguments, 1));
                c && (e = b && b.options, f = c.xAxis, g = c.yAxis, d = c.scrollbarHeight, this.inverted ? (c.left = c.opposite ? this.chartWidth - d - c.height : this.spacing[3] + d, c.top = this.plotTop + d) : (c.left = this.plotLeft + d, c.top = c.navigatorOptions.top || this.chartHeight - c.height - d - this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (e && "bottom" === e.verticalAlign && e.enabled && !e.floating ?
                    b.legendHeight + B(e.margin, 10) : 0)), f && g && (this.inverted ? f.options.left = g.options.left = c.left : f.options.top = g.options.top = c.top, f.setAxisSize(), g.setAxisSize()))
            });
        H(A.prototype, "addPoint", function(a, b, c, e, f) {
            var d = this.options.turboThreshold;
            d && this.xData.length > d && t(b, !0) && this.chart.navigator && g(20, !0);
            a.call(this, b, c, e, f)
        });
        H(r.prototype, "addSeries", function(a, b, c, e) {
            a = a.call(this, b, !1, e);
            this.navigator && this.navigator.setBaseSeries(null, !1);
            B(c, !0) && this.redraw();
            return a
        });
        H(A.prototype, "update",
            function(a, b, c) {
                a.call(this, b, !1);
                this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, !1);
                B(c, !0) && this.chart.redraw()
            });
        r.prototype.callbacks.push(function(a) {
            var b = a.navigator;
            b && (a = a.xAxis[0].getExtremes(), b.render(a.min, a.max))
        })
    })(L);
    (function(a) {
        function C(a) {
            this.init(a)
        }
        var G = a.addEvent,
            E = a.Axis,
            r = a.Chart,
            n = a.css,
            h = a.createElement,
            x = a.defaultOptions,
            q = a.defined,
            v = a.destroyObjectProperties,
            y = a.discardElement,
            g = a.each,
            c = a.extend,
            l = a.fireEvent,
            b = a.isNumber,
            f = a.merge,
            p = a.pick,
            t = a.pInt,
            e = a.splat,
            B = a.wrap;
        c(x, {
            rangeSelector: {
                verticalAlign: "top",
                buttonTheme: {
                    "stroke-width": 0,
                    width: 28,
                    height: 18,
                    padding: 2,
                    zIndex: 7
                },
                floating: !1,
                x: 0,
                y: 0,
                height: void 0,
                inputPosition: {
                    align: "right",
                    x: 0,
                    y: 0
                },
                buttonPosition: {
                    align: "left",
                    x: 0,
                    y: 0
                },
                labelStyle: {
                    color: "#666666"
                }
            }
        });
        x.lang = f(x.lang, {
            rangeSelectorZoom: "Zoom",
            rangeSelectorFrom: "From",
            rangeSelectorTo: "To"
        });
        C.prototype = {
            clickButton: function(a, c) {
                var f = this,
                    h = f.chart,
                    l = f.buttonOptions[a],
                    m = h.xAxis[0],
                    n = h.scroller && h.scroller.getUnionExtremes() ||
                    m || {},
                    d = n.dataMin,
                    q = n.dataMax,
                    r, k = m && Math.round(Math.min(m.max, p(q, m.max))),
                    t = l.type,
                    v, n = l._range,
                    x, D, y, B = l.dataGrouping;
                if (null !== d && null !== q) {
                    h.fixedRange = n;
                    B && (this.forcedDataGrouping = !0, E.prototype.setDataGrouping.call(m || {
                        chart: this.chart
                    }, B, !1));
                    if ("month" === t || "year" === t) m ? (t = {
                        range: l,
                        max: k,
                        chart: h,
                        dataMin: d,
                        dataMax: q
                    }, r = m.minFromRange.call(t), b(t.newMax) && (k = t.newMax)) : n = l;
                    else if (n) r = Math.max(k - n, d), k = Math.min(r + n, q);
                    else if ("ytd" === t)
                        if (m) void 0 === q && (d = Number.MAX_VALUE, q = Number.MIN_VALUE,
                            g(h.series, function(a) {
                                a = a.xData;
                                d = Math.min(a[0], d);
                                q = Math.max(a[a.length - 1], q)
                            }), c = !1), k = f.getYTDExtremes(q, d, h.time.useUTC), r = x = k.min, k = k.max;
                        else {
                            G(h, "beforeRender", function() {
                                f.clickButton(a)
                            });
                            return
                        }
                    else "all" === t && m && (r = d, k = q);
                    r += l._offsetMin;
                    k += l._offsetMax;
                    f.setSelected(a);
                    m ? m.setExtremes(r, k, p(c, 1), null, {
                        trigger: "rangeSelectorButton",
                        rangeSelectorButton: l
                    }) : (v = e(h.options.xAxis)[0], y = v.range, v.range = n, D = v.min, v.min = x, G(h, "load", function() {
                        v.range = y;
                        v.min = D
                    }))
                }
            },
            setSelected: function(a) {
                this.selected =
                    this.options.selected = a
            },
            defaultButtons: [{
                type: "month",
                count: 1,
                text: "1m"
            }, {
                type: "month",
                count: 3,
                text: "3m"
            }, {
                type: "month",
                count: 6,
                text: "6m"
            }, {
                type: "ytd",
                text: "YTD"
            }, {
                type: "year",
                count: 1,
                text: "1y"
            }, {
                type: "all",
                text: "All"
            }],
            init: function(a) {
                var b = this,
                    c = a.options.rangeSelector,
                    e = c.buttons || [].concat(b.defaultButtons),
                    f = c.selected,
                    h = function() {
                        var a = b.minInput,
                            c = b.maxInput;
                        a && a.blur && l(a, "blur");
                        c && c.blur && l(c, "blur")
                    };
                b.chart = a;
                b.options = c;
                b.buttons = [];
                a.extraTopMargin = c.height;
                b.buttonOptions = e;
                this.unMouseDown =
                    G(a.container, "mousedown", h);
                this.unResize = G(a, "resize", h);
                g(e, b.computeButtonRange);
                void 0 !== f && e[f] && this.clickButton(f, !1);
                G(a, "load", function() {
                    a.xAxis && a.xAxis[0] && G(a.xAxis[0], "setExtremes", function(c) {
                        this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping && this.setDataGrouping(!1, !1)
                    })
                })
            },
            updateButtonStates: function() {
                var a = this.chart,
                    c = a.xAxis[0],
                    e = Math.round(c.max - c.min),
                    f = !c.hasVisibleSeries,
                    h = a.scroller && a.scroller.getUnionExtremes() ||
                    c,
                    l = h.dataMin,
                    n = h.dataMax,
                    a = this.getYTDExtremes(n, l, a.time.useUTC),
                    d = a.min,
                    p = a.max,
                    q = this.selected,
                    k = b(q),
                    r = this.options.allButtonsEnabled,
                    t = this.buttons;
                g(this.buttonOptions, function(a, b) {
                    var g = a._range,
                        h = a.type,
                        m = a.count || 1,
                        u = t[b],
                        w = 0;
                    a = a._offsetMax - a._offsetMin;
                    b = b === q;
                    var v = g > n - l,
                        A = g < c.minRange,
                        x = !1,
                        z = !1,
                        g = g === e;
                    ("month" === h || "year" === h) && e + 36E5 >= 864E5 * {
                        month: 28,
                        year: 365
                    }[h] * m - a && e - 36E5 <= 864E5 * {
                        month: 31,
                        year: 366
                    }[h] * m + a ? g = !0 : "ytd" === h ? (g = p - d + a === e, x = !b) : "all" === h && (g = c.max - c.min >= n - l, z = !b && k &&
                        g);
                    h = !r && (v || A || z || f);
                    m = b && g || g && !k && !x;
                    h ? w = 3 : m && (k = !0, w = 2);
                    u.state !== w && u.setState(w)
                })
            },
            computeButtonRange: function(a) {
                var b = a.type,
                    c = a.count || 1,
                    e = {
                        millisecond: 1,
                        second: 1E3,
                        minute: 6E4,
                        hour: 36E5,
                        day: 864E5,
                        week: 6048E5
                    };
                if (e[b]) a._range = e[b] * c;
                else if ("month" === b || "year" === b) a._range = 864E5 * {
                    month: 30,
                    year: 365
                }[b] * c;
                a._offsetMin = p(a.offsetMin, 0);
                a._offsetMax = p(a.offsetMax, 0);
                a._range += a._offsetMax - a._offsetMin
            },
            setInputValue: function(a, b) {
                var c = this.chart.options.rangeSelector,
                    e = this.chart.time,
                    f = this[a +
                        "Input"];
                q(b) && (f.previousValue = f.HCTime, f.HCTime = b);
                f.value = e.dateFormat(c.inputEditDateFormat || "%Y-%m-%d", f.HCTime);
                this[a + "DateBox"].attr({
                    text: e.dateFormat(c.inputDateFormat || "%b %e, %Y", f.HCTime)
                })
            },
            showInput: function(a) {
                var b = this.inputGroup,
                    c = this[a + "DateBox"];
                n(this[a + "Input"], {
                    left: b.translateX + c.x + "px",
                    top: b.translateY + "px",
                    width: c.width - 2 + "px",
                    height: c.height - 2 + "px",
                    border: "2px solid silver"
                })
            },
            hideInput: function(a) {
                n(this[a + "Input"], {
                    border: 0,
                    width: "1px",
                    height: "1px"
                });
                this.setInputValue(a)
            },
            drawInput: function(a) {
                function e() {
                    var a = v.value,
                        c = (r.inputDateParser || Date.parse)(a),
                        d = l.xAxis[0],
                        e = l.scroller && l.scroller.xAxis ? l.scroller.xAxis : d,
                        f = e.dataMin,
                        e = e.dataMax;
                    c !== v.previousValue && (v.previousValue = c, b(c) || (c = a.split("-"), c = Date.UTC(t(c[0]), t(c[1]) - 1, t(c[2]))), b(c) && (l.time.useUTC || (c += 6E4 * (new Date).getTimezoneOffset()), w ? c > g.maxInput.HCTime ? c = void 0 : c < f && (c = f) : c < g.minInput.HCTime ? c = void 0 : c > e && (c = e), void 0 !== c && d.setExtremes(w ? c : d.min, w ? d.max : c, void 0, void 0, {
                        trigger: "rangeSelectorInput"
                    })))
                }
                var g = this,
                    l = g.chart,
                    p = l.renderer.style || {},
                    q = l.renderer,
                    r = l.options.rangeSelector,
                    d = g.div,
                    w = "min" === a,
                    v, k, z = this.inputGroup;
                this[a + "Label"] = k = q.label(x.lang[w ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({
                    padding: 2
                }).add(z);
                z.offset += k.width + 5;
                this[a + "DateBox"] = q = q.label("", z.offset).addClass("highcharts-range-input").attr({
                    padding: 2,
                    width: r.inputBoxWidth || 90,
                    height: r.inputBoxHeight || 17,
                    stroke: r.inputBoxBorderColor || "#cccccc",
                    "stroke-width": 1,
                    "text-align": "center"
                }).on("click", function() {
                    g.showInput(a);
                    g[a + "Input"].focus()
                }).add(z);
                z.offset += q.width + (w ? 10 : 0);
                this[a + "Input"] = v = h("input", {
                    name: a,
                    className: "highcharts-range-selector",
                    type: "text"
                }, {
                    top: l.plotTop + "px"
                }, d);
                k.css(f(p, r.labelStyle));
                q.css(f({
                    color: "#333333"
                }, p, r.inputStyle));
                n(v, c({
                    position: "absolute",
                    border: 0,
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    textAlign: "center",
                    fontSize: p.fontSize,
                    fontFamily: p.fontFamily,
                    top: "-9999em"
                }, r.inputStyle));
                v.onfocus = function() {
                    g.showInput(a)
                };
                v.onblur =
                    function() {
                        g.hideInput(a)
                    };
                v.onchange = e;
                v.onkeypress = function(a) {
                    13 === a.keyCode && e()
                }
            },
            getPosition: function() {
                var a = this.chart,
                    b = a.options.rangeSelector,
                    a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
                return {
                    buttonTop: a + b.buttonPosition.y,
                    inputTop: a + b.inputPosition.y - 10
                }
            },
            getYTDExtremes: function(a, b, c) {
                var e = this.chart.time,
                    f = new e.Date(a),
                    g = e.get("FullYear", f);
                c = c ? e.Date.UTC(g, 0, 1) : +new e.Date(g, 0, 1);
                b = Math.max(b || 0, c);
                f = f.getTime();
                return {
                    max: Math.min(a || f, f),
                    min: b
                }
            },
            render: function(a, b) {
                var c =
                    this,
                    e = c.chart,
                    f = e.renderer,
                    l = e.container,
                    m = e.options,
                    d = m.exporting && !1 !== m.exporting.enabled && m.navigation && m.navigation.buttonOptions,
                    n = x.lang,
                    q = c.div,
                    k = m.rangeSelector,
                    m = k.floating,
                    r = c.buttons,
                    q = c.inputGroup,
                    t = k.buttonTheme,
                    v = k.buttonPosition,
                    y = k.inputPosition,
                    B = k.inputEnabled,
                    D = t && t.states,
                    C = e.plotLeft,
                    G, E = c.buttonGroup,
                    L;
                L = c.rendered;
                var W = c.options.verticalAlign,
                    Z = e.legend,
                    aa = Z && Z.options,
                    ba = v.y,
                    X = y.y,
                    ca = L || !1,
                    U = 0,
                    R = 0,
                    S;
                if (!1 !== k.enabled) {
                    L || (c.group = L = f.g("range-selector-group").attr({
                            zIndex: 7
                        }).add(),
                        c.buttonGroup = E = f.g("range-selector-buttons").add(L), c.zoomText = f.text(n.rangeSelectorZoom, p(C + v.x, C), 15).css(k.labelStyle).add(E), G = p(C + v.x, C) + c.zoomText.getBBox().width + 5, g(c.buttonOptions, function(a, b) {
                            r[b] = f.button(a.text, G, 0, function() {
                                var d = a.events && a.events.click,
                                    e;
                                d && (e = d.call(a));
                                !1 !== e && c.clickButton(b);
                                c.isActive = !0
                            }, t, D && D.hover, D && D.select, D && D.disabled).attr({
                                "text-align": "center"
                            }).add(E);
                            G += r[b].width + p(k.buttonSpacing, 5)
                        }), !1 !== B && (c.div = q = h("div", null, {
                            position: "relative",
                            height: 0,
                            zIndex: 1
                        }), l.parentNode.insertBefore(q, l), c.inputGroup = q = f.g("input-group").add(L), q.offset = 0, c.drawInput("min"), c.drawInput("max")));
                    C = e.plotLeft - e.spacing[3];
                    c.updateButtonStates();
                    d && this.titleCollision(e) && "top" === W && "right" === v.align && v.y + E.getBBox().height - 12 < (d.y || 0) + d.height && (U = -40);
                    "left" === v.align ? S = v.x - e.spacing[3] : "right" === v.align && (S = v.x + U - e.spacing[1]);
                    E.align({
                        y: v.y,
                        width: E.getBBox().width,
                        align: v.align,
                        x: S
                    }, !0, e.spacingBox);
                    c.group.placed = ca;
                    c.buttonGroup.placed = ca;
                    !1 !== B && (U = d &&
                        this.titleCollision(e) && "top" === W && "right" === y.align && y.y - q.getBBox().height - 12 < (d.y || 0) + d.height + e.spacing[0] ? -40 : 0, "left" === y.align ? S = C : "right" === y.align && (S = -Math.max(e.axisOffset[1], -U)), q.align({
                            y: y.y,
                            width: q.getBBox().width,
                            align: y.align,
                            x: y.x + S - 2
                        }, !0, e.spacingBox), l = q.alignAttr.translateX + q.alignOptions.x - U + q.getBBox().x + 2, d = q.alignOptions.width, n = E.alignAttr.translateX + E.getBBox().x, S = E.getBBox().width + 20, (y.align === v.align || n + S > l && l + d > n && ba < X + q.getBBox().height) && q.attr({
                            translateX: q.alignAttr.translateX +
                                (e.axisOffset[1] >= -U ? 0 : -U),
                            translateY: q.alignAttr.translateY + E.getBBox().height + 10
                        }), c.setInputValue("min", a), c.setInputValue("max", b), c.inputGroup.placed = ca);
                    c.group.align({
                        verticalAlign: W
                    }, !0, e.spacingBox);
                    a = c.group.getBBox().height + 20;
                    b = c.group.alignAttr.translateY;
                    "bottom" === W && (Z = aa && "bottom" === aa.verticalAlign && aa.enabled && !aa.floating ? Z.legendHeight + p(aa.margin, 10) : 0, a = a + Z - 20, R = b - a - (m ? 0 : k.y) - 10);
                    if ("top" === W) m && (R = 0), e.titleOffset && (R = e.titleOffset + e.options.title.margin), R += e.margin[0] - e.spacing[0] ||
                        0;
                    else if ("middle" === W)
                        if (X === ba) R = 0 > X ? b + void 0 : b;
                        else if (X || ba) R = 0 > X || 0 > ba ? R - Math.min(X, ba) : b - a + NaN;
                    c.group.translate(k.x, k.y + Math.floor(R));
                    !1 !== B && (c.minInput.style.marginTop = c.group.translateY + "px", c.maxInput.style.marginTop = c.group.translateY + "px");
                    c.rendered = !0
                }
            },
            getHeight: function() {
                var a = this.options,
                    b = this.group,
                    c = a.y,
                    e = a.buttonPosition.y,
                    a = a.inputPosition.y,
                    b = b ? b.getBBox(!0).height + 13 + c : 0,
                    c = Math.min(a, e);
                if (0 > a && 0 > e || 0 < a && 0 < e) b += Math.abs(c);
                return b
            },
            titleCollision: function(a) {
                return !(a.options.title.text ||
                    a.options.subtitle.text)
            },
            update: function(a) {
                var b = this.chart;
                f(!0, b.options.rangeSelector, a);
                this.destroy();
                this.init(b);
                b.rangeSelector.render()
            },
            destroy: function() {
                var b = this,
                    c = b.minInput,
                    e = b.maxInput;
                b.unMouseDown();
                b.unResize();
                v(b.buttons);
                c && (c.onfocus = c.onblur = c.onchange = null);
                e && (e.onfocus = e.onblur = e.onchange = null);
                a.objectEach(b, function(a, c) {
                    a && "chart" !== c && (a.destroy ? a.destroy() : a.nodeType && y(this[c]));
                    a !== C.prototype[c] && (b[c] = null)
                }, this)
            }
        };
        E.prototype.toFixedRange = function(a, c, e, f) {
            var g =
                this.chart && this.chart.fixedRange;
            a = p(e, this.translate(a, !0, !this.horiz));
            c = p(f, this.translate(c, !0, !this.horiz));
            e = g && (c - a) / g;
            .7 < e && 1.3 > e && (f ? a = c - g : c = a + g);
            b(a) && b(c) || (a = c = void 0);
            return {
                min: a,
                max: c
            }
        };
        E.prototype.minFromRange = function() {
            var a = this.range,
                c = {
                    month: "Month",
                    year: "FullYear"
                }[a.type],
                e, f = this.max,
                g, h, l = function(a, b) {
                    var d = new Date(a),
                        e = d["get" + c]();
                    d["set" + c](e + b);
                    e === d["get" + c]() && d.setDate(0);
                    return d.getTime() - a
                };
            b(a) ? (e = f - a, h = a) : (e = f + l(f, -a.count), this.chart && (this.chart.fixedRange =
                f - e));
            g = p(this.dataMin, Number.MIN_VALUE);
            b(e) || (e = g);
            e <= g && (e = g, void 0 === h && (h = l(e, a.count)), this.newMax = Math.min(e + h, this.dataMax));
            b(f) || (e = void 0);
            return e
        };
        B(r.prototype, "init", function(a, b, c) {
            G(this, "init", function() {
                this.options.rangeSelector.enabled && (this.rangeSelector = new C(this))
            });
            a.call(this, b, c)
        });
        B(r.prototype, "render", function(a, b, c) {
            var e = this.axes,
                f = this.rangeSelector;
            f && (g(e, function(a) {
                    a.updateNames();
                    a.setScale()
                }), this.getAxisMargins(), f.render(), e = f.options.verticalAlign, f.options.floating ||
                ("bottom" === e ? this.extraBottomMargin = !0 : "middle" !== e && (this.extraTopMargin = !0)));
            a.call(this, b, c)
        });
        B(r.prototype, "update", function(b, c, e, f) {
            var g = this.rangeSelector,
                h;
            this.extraTopMargin = this.extraBottomMargin = !1;
            g && (g.render(), h = c.rangeSelector && c.rangeSelector.verticalAlign || g.options && g.options.verticalAlign, g.options.floating || ("bottom" === h ? this.extraBottomMargin = !0 : "middle" !== h && (this.extraTopMargin = !0)));
            b.call(this, a.merge(!0, c, {
                chart: {
                    marginBottom: p(c.chart && c.chart.marginBottom, this.margin.bottom),
                    spacingBottom: p(c.chart && c.chart.spacingBottom, this.spacing.bottom)
                }
            }), e, f)
        });
        B(r.prototype, "redraw", function(a, b, c) {
            var e = this.rangeSelector;
            e && !e.options.floating && (e.render(), e = e.options.verticalAlign, "bottom" === e ? this.extraBottomMargin = !0 : "middle" !== e && (this.extraTopMargin = !0));
            a.call(this, b, c)
        });
        r.prototype.adjustPlotArea = function() {
            var a = this.rangeSelector;
            this.rangeSelector && (a = a.getHeight(), this.extraTopMargin && (this.plotTop += a), this.extraBottomMargin && (this.marginBottom += a))
        };
        r.prototype.callbacks.push(function(a) {
            function c() {
                e =
                    a.xAxis[0].getExtremes();
                b(e.min) && f.render(e.min, e.max)
            }
            var e, f = a.rangeSelector,
                g, h;
            f && (h = G(a.xAxis[0], "afterSetExtremes", function(a) {
                f.render(a.min, a.max)
            }), g = G(a, "redraw", c), c());
            G(a, "destroy", function() {
                f && (g(), h())
            })
        });
        a.RangeSelector = C
    })(L);
    (function(a) {
        var C = a.arrayMax,
            G = a.arrayMin,
            E = a.Axis,
            r = a.Chart,
            n = a.defined,
            h = a.each,
            x = a.extend,
            q = a.format,
            v = a.grep,
            y = a.inArray,
            g = a.isNumber,
            c = a.isString,
            l = a.map,
            b = a.merge,
            f = a.pick,
            p = a.Point,
            t = a.Renderer,
            e = a.Series,
            B = a.splat,
            D = a.SVGRenderer,
            m = a.VMLRenderer,
            A = a.wrap,
            u = e.prototype,
            H = u.init,
            I = u.processData,
            K = p.prototype.tooltipFormatter;
        a.StockChart = a.stockChart = function(d, e, g) {
            var k = c(d) || d.nodeName,
                h = arguments[k ? 1 : 0],
                n = h.series,
                m = a.getOptions(),
                p, q = f(h.navigator && h.navigator.enabled, m.navigator.enabled, !0),
                w = q ? {
                    startOnTick: !1,
                    endOnTick: !1
                } : null,
                t = {
                    marker: {
                        enabled: !1,
                        radius: 2
                    }
                },
                u = {
                    shadow: !1,
                    borderWidth: 0
                };
            h.xAxis = l(B(h.xAxis || {}), function(a) {
                return b({
                        minPadding: 0,
                        maxPadding: 0,
                        overscroll: 0,
                        ordinal: !0,
                        title: {
                            text: null
                        },
                        labels: {
                            overflow: "justify"
                        },
                        showLastLabel: !0
                    },
                    m.xAxis, a, {
                        type: "datetime",
                        categories: null
                    }, w)
            });
            h.yAxis = l(B(h.yAxis || {}), function(a) {
                p = f(a.opposite, !0);
                return b({
                    labels: {
                        y: -2
                    },
                    opposite: p,
                    showLastLabel: !(!a.categories && "category" !== a.type),
                    title: {
                        text: null
                    }
                }, m.yAxis, a)
            });
            h.series = null;
            h = b({
                chart: {
                    panning: !0,
                    pinchType: "x"
                },
                navigator: {
                    enabled: q
                },
                scrollbar: {
                    enabled: f(m.scrollbar.enabled, !0)
                },
                rangeSelector: {
                    enabled: f(m.rangeSelector.enabled, !0)
                },
                title: {
                    text: null
                },
                tooltip: {
                    split: f(m.tooltip.split, !0),
                    crosshairs: !0
                },
                legend: {
                    enabled: !1
                },
                plotOptions: {
                    line: t,
                    spline: t,
                    area: t,
                    areaspline: t,
                    arearange: t,
                    areasplinerange: t,
                    column: u,
                    columnrange: u,
                    candlestick: u,
                    ohlc: u
                }
            }, h, {
                isStock: !0
            });
            h.series = n;
            return k ? new r(d, h, g) : new r(h, e)
        };
        A(E.prototype, "autoLabelAlign", function(a) {
            var b = this.chart,
                c = this.options,
                b = b._labelPanes = b._labelPanes || {},
                d = this.options.labels;
            return this.chart.options.isStock && "yAxis" === this.coll && (c = c.top + "," + c.height, !b[c] && d.enabled) ? (15 === d.x && (d.x = 0), void 0 === d.align && (d.align = "right"), b[c] = this, "right") : a.apply(this, [].slice.call(arguments,
                1))
        });
        A(E.prototype, "destroy", function(a) {
            var b = this.chart,
                c = this.options && this.options.top + "," + this.options.height;
            c && b._labelPanes && b._labelPanes[c] === this && delete b._labelPanes[c];
            return a.apply(this, Array.prototype.slice.call(arguments, 1))
        });
        A(E.prototype, "getPlotLinePath", function(b, e, m, k, p, q) {
            var d = this,
                r = this.isLinked && !this.series ? this.linkedParent.series : this.series,
                t = d.chart,
                w = t.renderer,
                u = d.left,
                v = d.top,
                x, z, A, B, F = [],
                D = [],
                C, E;
            if ("xAxis" !== d.coll && "yAxis" !== d.coll) return b.apply(this, [].slice.call(arguments,
                1));
            D = function(a) {
                var b = "xAxis" === a ? "yAxis" : "xAxis";
                a = d.options[b];
                return g(a) ? [t[b][a]] : c(a) ? [t.get(a)] : l(r, function(a) {
                    return a[b]
                })
            }(d.coll);
            h(d.isXAxis ? t.yAxis : t.xAxis, function(a) {
                if (n(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
                    var b = a.isXAxis ? "yAxis" : "xAxis",
                        b = n(a.options[b]) ? t[b][a.options[b]] : t[b][0];
                    d === b && D.push(a)
                }
            });
            C = D.length ? [] : [d.isXAxis ? t.yAxis[0] : t.xAxis[0]];
            h(D, function(b) {
                -1 !== y(b, C) || a.find(C, function(a) {
                    return a.pos === b.pos && a.len && b.len
                }) || C.push(b)
            });
            E = f(q, d.translate(e,
                null, null, k));
            g(E) && (d.horiz ? h(C, function(a) {
                var b;
                z = a.pos;
                B = z + a.len;
                x = A = Math.round(E + d.transB);
                if (x < u || x > u + d.width) p ? x = A = Math.min(Math.max(u, x), u + d.width) : b = !0;
                b || F.push("M", x, z, "L", A, B)
            }) : h(C, function(a) {
                var b;
                x = a.pos;
                A = x + a.len;
                z = B = Math.round(v + d.height - E);
                if (z < v || z > v + d.height) p ? z = B = Math.min(Math.max(v, z), d.top + d.height) : b = !0;
                b || F.push("M", x, z, "L", A, B)
            }));
            return 0 < F.length ? w.crispPolyLine(F, m || 1) : null
        });
        D.prototype.crispPolyLine = function(a, b) {
            var c;
            for (c = 0; c < a.length; c += 6) a[c + 1] === a[c + 4] && (a[c +
                1] = a[c + 4] = Math.round(a[c + 1]) - b % 2 / 2), a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = Math.round(a[c + 2]) + b % 2 / 2);
            return a
        };
        t === m && (m.prototype.crispPolyLine = D.prototype.crispPolyLine);
        A(E.prototype, "hideCrosshair", function(a, b) {
            a.call(this, b);
            this.crossLabel && (this.crossLabel = this.crossLabel.hide())
        });
        A(E.prototype, "drawCrosshair", function(a, b, c) {
            var d, e;
            a.call(this, b, c);
            if (n(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
                a = this.chart;
                var g = this.options.crosshair.label,
                    h = this.horiz;
                d = this.opposite;
                e = this.left;
                var l = this.top,
                    m = this.crossLabel,
                    p, r = g.format,
                    t = "",
                    u = "inside" === this.options.tickPosition,
                    w = !1 !== this.crosshair.snap,
                    v = 0;
                b || (b = this.cross && this.cross.e);
                p = h ? "center" : d ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center";
                m || (m = this.crossLabel = a.renderer.label(null, null, null, g.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" + this.series[0].colorIndex)).attr({
                    align: g.align || p,
                    padding: f(g.padding, 8),
                    r: f(g.borderRadius,
                        3),
                    zIndex: 2
                }).add(this.labelGroup), m.attr({
                    fill: g.backgroundColor || this.series[0] && this.series[0].color || "#666666",
                    stroke: g.borderColor || "",
                    "stroke-width": g.borderWidth || 0
                }).css(x({
                    color: "#ffffff",
                    fontWeight: "normal",
                    fontSize: "11px",
                    textAlign: "center"
                }, g.style)));
                h ? (p = w ? c.plotX + e : b.chartX, l += d ? 0 : this.height) : (p = d ? this.width + e : 0, l = w ? c.plotY + l : b.chartY);
                r || g.formatter || (this.isDatetimeAxis && (t = "%b %d, %Y"), r = "{value" + (t ? ":" + t : "") + "}");
                b = w ? c[this.isXAxis ? "x" : "y"] : this.toValue(h ? b.chartX : b.chartY);
                m.attr({
                    text: r ?
                        q(r, {
                            value: b
                        }, a.time) : g.formatter.call(this, b),
                    x: p,
                    y: l,
                    visibility: b < this.min || b > this.max ? "hidden" : "visible"
                });
                b = m.getBBox();
                if (h) {
                    if (u && !d || !u && d) l = m.y - b.height
                } else l = m.y - b.height / 2;
                h ? (d = e - b.x, e = e + this.width - b.x) : (d = "left" === this.labelAlign ? e : 0, e = "right" === this.labelAlign ? e + this.width : a.chartWidth);
                m.translateX < d && (v = d - m.translateX);
                m.translateX + b.width >= e && (v = -(m.translateX + b.width - e));
                m.attr({
                    x: p + v,
                    y: l,
                    anchorX: h ? p : this.opposite ? 0 : a.chartWidth,
                    anchorY: h ? this.opposite ? a.chartHeight : 0 : l + b.height /
                        2
                })
            }
        });
        u.init = function() {
            H.apply(this, arguments);
            this.setCompare(this.options.compare)
        };
        u.setCompare = function(a) {
            this.modifyValue = "value" === a || "percent" === a ? function(b, c) {
                var d = this.compareValue;
                if (void 0 !== b && void 0 !== d) return b = "value" === a ? b - d : b / d * 100 - (100 === this.options.compareBase ? 0 : 100), c && (c.change = b), b
            } : null;
            this.userOptions.compare = a;
            this.chart.hasRendered && (this.isDirty = !0)
        };
        u.processData = function() {
            var a, b = -1,
                c, e, f = !0 === this.options.compareStart ? 0 : 1,
                h, l;
            I.apply(this, arguments);
            if (this.xAxis &&
                this.processedYData)
                for (c = this.processedXData, e = this.processedYData, h = e.length, this.pointArrayMap && (b = y("close", this.pointArrayMap), -1 === b && (b = y(this.pointValKey || "y", this.pointArrayMap))), a = 0; a < h - f; a++)
                    if (l = e[a] && -1 < b ? e[a][b] : e[a], g(l) && c[a + f] >= this.xAxis.min && 0 !== l) {
                        this.compareValue = l;
                        break
                    }
        };
        A(u, "getExtremes", function(a) {
            var b;
            a.apply(this, [].slice.call(arguments, 1));
            this.modifyValue && (b = [this.modifyValue(this.dataMin), this.modifyValue(this.dataMax)], this.dataMin = G(b), this.dataMax = C(b))
        });
        E.prototype.setCompare =
            function(a, b) {
                this.isXAxis || (h(this.series, function(b) {
                    b.setCompare(a)
                }), f(b, !0) && this.chart.redraw())
            };
        p.prototype.tooltipFormatter = function(b) {
            b = b.replace("{point.change}", (0 < this.change ? "+" : "") + a.numberFormat(this.change, f(this.series.tooltipOptions.changeDecimals, 2)));
            return K.apply(this, [b])
        };
        A(e.prototype, "render", function(a) {
            this.chart.is3d && this.chart.is3d() || this.chart.polar || !this.xAxis || this.xAxis.isRadial || (!this.clipBox && this.animate ? (this.clipBox = b(this.chart.clipBox), this.clipBox.width =
                this.xAxis.len, this.clipBox.height = this.yAxis.len) : this.chart[this.sharedClipKey] ? this.chart[this.sharedClipKey].attr({
                width: this.xAxis.len,
                height: this.yAxis.len
            }) : this.clipBox && (this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len));
            a.call(this)
        });
        A(r.prototype, "getSelectedPoints", function(a) {
            var b = a.call(this);
            h(this.series, function(a) {
                a.hasGroupedData && (b = b.concat(v(a.points || [], function(a) {
                    return a.selected
                })))
            });
            return b
        });
        A(r.prototype, "update", function(a, c) {
            "scrollbar" in c &&
                this.navigator && (b(!0, this.options.scrollbar, c.scrollbar), this.navigator.update({}, !1), delete c.scrollbar);
            return a.apply(this, Array.prototype.slice.call(arguments, 1))
        })
    })(L);
    return L
});