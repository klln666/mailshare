!function (t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Clipboard = t()
    }
}(function () {
    return function t(e, n, i) {
        function o(a, s) {
            if (!n[a]) {
                if (!e[a]) {
                    var c = "function" == typeof require && require;
                    if (!s && c) return c(a, !0);
                    if (r) return r(a, !0);
                    var l = new Error("Cannot find module '" + a + "'");
                    throw l.code = "MODULE_NOT_FOUND", l
                }
                var u = n[a] = {exports: {}};
                e[a][0].call(u.exports, function (t) {
                    return o(e[a][1][t] || t)
                }, u, u.exports, t, e, n, i)
            }
            return n[a].exports
        }

        for (var r = "function" == typeof require && require, a = 0; a < i.length; a++) o(i[a]);
        return o
    }({
        1: [function (t, e, n) {
            var i = 9;
            if ("undefined" != typeof Element && !Element.prototype.matches) {
                var o = Element.prototype;
                o.matches = o.matchesSelector || o.mozMatchesSelector || o.msMatchesSelector || o.oMatchesSelector || o.webkitMatchesSelector
            }
            e.exports = function (t, e) {
                for (; t && t.nodeType !== i;) {
                    if ("function" == typeof t.matches && t.matches(e)) return t;
                    t = t.parentNode
                }
            }
        }, {}], 2: [function (t, e, n) {
            var i = t("./closest");
            e.exports = function (t, e, n, o, r) {
                var a = function (t, e, n, o) {
                    return function (n) {
                        n.delegateTarget = i(n.target, e), n.delegateTarget && o.call(t, n)
                    }
                }.apply(this, arguments);
                return t.addEventListener(n, a, r), {
                    destroy: function () {
                        t.removeEventListener(n, a, r)
                    }
                }
            }
        }, {"./closest": 1}], 3: [function (t, e, n) {
            n.node = function (t) {
                return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
            }, n.nodeList = function (t) {
                var e = Object.prototype.toString.call(t);
                return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0]))
            }, n.string = function (t) {
                return "string" == typeof t || t instanceof String
            }, n.fn = function (t) {
                return "[object Function]" === Object.prototype.toString.call(t)
            }
        }, {}], 4: [function (t, e, n) {
            var i = t("./is"), o = t("delegate");
            e.exports = function (t, e, n) {
                if (!t && !e && !n) throw new Error("Missing required arguments");
                if (!i.string(e)) throw new TypeError("Second argument must be a String");
                if (!i.fn(n)) throw new TypeError("Third argument must be a Function");
                if (i.node(t)) return function (t, e, n) {
                    return t.addEventListener(e, n), {
                        destroy: function () {
                            t.removeEventListener(e, n)
                        }
                    }
                }(t, e, n);
                if (i.nodeList(t)) return function (t, e, n) {
                    return Array.prototype.forEach.call(t, function (t) {
                        t.addEventListener(e, n)
                    }), {
                        destroy: function () {
                            Array.prototype.forEach.call(t, function (t) {
                                t.removeEventListener(e, n)
                            })
                        }
                    }
                }(t, e, n);
                if (i.string(t)) return function (t, e, n) {
                    return o(document.body, t, e, n)
                }(t, e, n);
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
            }
        }, {"./is": 3, delegate: 2}], 5: [function (t, e, n) {
            e.exports = function (t) {
                var e;
                if ("SELECT" === t.nodeName) t.focus(), e = t.value; else if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) {
                    var n = t.hasAttribute("readonly");
                    n || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), n || t.removeAttribute("readonly"), e = t.value
                } else {
                    t.hasAttribute("contenteditable") && t.focus();
                    var i = window.getSelection(), o = document.createRange();
                    o.selectNodeContents(t), i.removeAllRanges(), i.addRange(o), e = i.toString()
                }
                return e
            }
        }, {}], 6: [function (t, e, n) {
            function i() {
            }

            i.prototype = {
                on: function (t, e, n) {
                    var i = this.e || (this.e = {});
                    return (i[t] || (i[t] = [])).push({fn: e, ctx: n}), this
                }, once: function (t, e, n) {
                    function i() {
                        o.off(t, i), e.apply(n, arguments)
                    }

                    var o = this;
                    return i._ = e, this.on(t, i, n)
                }, emit: function (t) {
                    var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), i = 0,
                        o = n.length;
                    for (i; i < o; i++) n[i].fn.apply(n[i].ctx, e);
                    return this
                }, off: function (t, e) {
                    var n = this.e || (this.e = {}), i = n[t], o = [];
                    if (i && e) for (var r = 0, a = i.length; r < a; r++) i[r].fn !== e && i[r].fn._ !== e && o.push(i[r]);
                    return o.length ? n[t] = o : delete n[t], this
                }
            }, e.exports = i
        }, {}], 7: [function (t, e, n) {
            !function (i, o) {
                if (void 0 !== n) o(e, t("select")); else {
                    var r = {exports: {}};
                    o(r, i.select), i.clipboardAction = r.exports
                }
            }(this, function (t, e) {
                "use strict";
                var n = function (t) {
                    return t && t.__esModule ? t : {default: t}
                }(e), i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }, o = function () {
                    function t(t, e) {
                        for (var n = 0; n < e.length; n++) {
                            var i = e[n];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                        }
                    }

                    return function (e, n, i) {
                        return n && t(e.prototype, n), i && t(e, i), e
                    }
                }(), r = function () {
                    function t(e) {
                        (function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        })(this, t), this.resolveOptions(e), this.initSelection()
                    }

                    return o(t, [{
                        key: "resolveOptions", value: function () {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this.action = t.action, this.container = t.container, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = ""
                        }
                    }, {
                        key: "initSelection", value: function () {
                            this.text ? this.selectFake() : this.target && this.selectTarget()
                        }
                    }, {
                        key: "selectFake", value: function () {
                            var t = this, e = "rtl" == document.documentElement.getAttribute("dir");
                            this.removeFake(), this.fakeHandlerCallback = function () {
                                return t.removeFake()
                            }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[e ? "right" : "left"] = "-9999px";
                            var i = window.pageYOffset || document.documentElement.scrollTop;
                            this.fakeElem.style.top = i + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, n.default)(this.fakeElem), this.copyText()
                        }
                    }, {
                        key: "removeFake", value: function () {
                            this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null)
                        }
                    }, {
                        key: "selectTarget", value: function () {
                            this.selectedText = (0, n.default)(this.target), this.copyText()
                        }
                    }, {
                        key: "copyText", value: function () {
                            var t = void 0;
                            try {
                                t = document.execCommand(this.action)
                            } catch (e) {
                                t = !1
                            }
                            this.handleResult(t)
                        }
                    }, {
                        key: "handleResult", value: function (t) {
                            this.emitter.emit(t ? "success" : "error", {
                                action: this.action,
                                text: this.selectedText,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            })
                        }
                    }, {
                        key: "clearSelection", value: function () {
                            this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges()
                        }
                    }, {
                        key: "destroy", value: function () {
                            this.removeFake()
                        }
                    }, {
                        key: "action", set: function () {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
                            if (this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                        }, get: function () {
                            return this._action
                        }
                    }, {
                        key: "target", set: function (t) {
                            if (void 0 !== t) {
                                if (!t || "object" !== (void 0 === t ? "undefined" : i(t)) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                if ("copy" === this.action && t.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                if ("cut" === this.action && (t.hasAttribute("readonly") || t.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                this._target = t
                            }
                        }, get: function () {
                            return this._target
                        }
                    }]), t
                }();
                t.exports = r
            })
        }, {select: 5}], 8: [function (t, e, n) {
            !function (i, o) {
                if (void 0 !== n) o(e, t("./clipboard-action"), t("tiny-emitter"), t("good-listener")); else {
                    var r = {exports: {}};
                    o(r, i.clipboardAction, i.tinyEmitter, i.goodListener), i.clipboard = r.exports
                }
            }(this, function (t, e, n, i) {
                "use strict";

                function o(t) {
                    return t && t.__esModule ? t : {default: t}
                }

                function r(t, e) {
                    var n = "data-clipboard-" + t;
                    if (e.hasAttribute(n)) return e.getAttribute(n)
                }

                var a = o(e), s = o(n), c = o(i),
                    l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                        return typeof t
                    } : function (t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    }, u = function () {
                        function t(t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var i = e[n];
                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                            }
                        }

                        return function (e, n, i) {
                            return n && t(e.prototype, n), i && t(e, i), e
                        }
                    }(), p = function (t) {
                        function e(t, n) {
                            !function (t, e) {
                                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                            }(this, e);
                            var i = function (t, e) {
                                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !e || "object" != typeof e && "function" != typeof e ? t : e
                            }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                            return i.resolveOptions(n), i.listenClick(t), i
                        }

                        return function (t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }(e, s.default), u(e, [{
                            key: "resolveOptions", value: function () {
                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, this.text = "function" == typeof t.text ? t.text : this.defaultText, this.container = "object" === l(t.container) ? t.container : document.body
                            }
                        }, {
                            key: "listenClick", value: function (t) {
                                var e = this;
                                this.listener = (0, c.default)(t, "click", function (t) {
                                    return e.onClick(t)
                                })
                            }
                        }, {
                            key: "onClick", value: function (t) {
                                var e = t.delegateTarget || t.currentTarget;
                                this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new a.default({
                                    action: this.action(e),
                                    target: this.target(e),
                                    text: this.text(e),
                                    container: this.container,
                                    trigger: e,
                                    emitter: this
                                })
                            }
                        }, {
                            key: "defaultAction", value: function (t) {
                                return r("action", t)
                            }
                        }, {
                            key: "defaultTarget", value: function (t) {
                                var e = r("target", t);
                                if (e) return document.querySelector(e)
                            }
                        }, {
                            key: "defaultText", value: function (t) {
                                return r("text", t)
                            }
                        }, {
                            key: "destroy", value: function () {
                                this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                            }
                        }], [{
                            key: "isSupported", value: function () {
                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
                                    e = "string" == typeof t ? [t] : t, n = !!document.queryCommandSupported;
                                return e.forEach(function (t) {
                                    n = n && !!document.queryCommandSupported(t)
                                }), n
                            }
                        }]), e
                    }();
                t.exports = p
            })
        }, {"./clipboard-action": 7, "good-listener": 4, "tiny-emitter": 6}]
    }, {}, [8])(8)
}), function (t, e) {
    "use strict";
    "function" == typeof define ? define("http://static.test.soufunimg.com/common_m/pc_public/pcshare/js/share.js", [], function () {
        return e(t)
    }) : "object" == typeof exports ? module.exports = e(t) : t.pcShare = e(t)
}(window, function (t) {
    "use strict";

    function e(t, e) {
        if (!t) return "";
        for (var n = 0, i = "", o = /[^\x00-\xff]/g, r = "", a = t.replace(o, "**").length, s = 0; s < a && (null !== (r = t.charAt(s).toString()).match(o) ? n += 2 : n++, !(n > e)); s++) i += r;
        return a > e && (i += "..."), i
    }

    function n(e, n, i) {
        var o = n[e];
        i = i || {};
        var a = o.url;
        a += "?" + function (t) {
            var e = [];
            for (var n in t) {
                var i = n, o = t[i];
                "[object Array]" === Object.prototype.toString.call(o) && (o = o.join(",")), null !== o && (o = r(o), e.push(i + "=" + o))
            }
            return e.join("&")
        }(o.parse(i)), t.open(a)
    }

    function i(e) {
        if (!(this instanceof i)) return new i(ptions);
        if (!this.show()) {
            var n = t.document, o = n.title, r = t.location.href;
            if (this.options = {}, this.options.weiboTitle = o, this.options.qqTitle = o, this.options.desc = "", this.options.PicUrl = "", this.options.url = r, this.options.buildName = o.split("-")[0], this.options.summary = "", "object" == typeof e) for (var a in e) this.options.hasOwnProperty(a) && (this.options[a] = e[a]);
            this.creatHTML();
            var s = this;
            n.getElementById("pcshare_close").onclick = function () {
                s.hide()
            };
            for (var c = n.getElementsByClassName("pcshare_iconbox"), l = 0; l < c.length; l++) {
                var u = c[l];
                u.onclick = function (t) {
                    return function () {
                        s.share(t.getAttribute("name"))
                    }
                }(u)
            }
            this.copy();
            n.getElementById("pcshare_mail").onclick = function () {
                s.sendMail()
            }
        }
    }

    function o() {
        var e = t, n = e.document, i = n.createElement("input");
        return void 0 !== e.ActiveXObject && (e.XMLHttpRequest ? n.querySelector ? n.addEventListener ? e.atob ? i.dataset ? 11 : 10 : 9 : 8 : 7 : 6)
    }

    var r = encodeURIComponent, a = "//static.test.soufunimg.com/common_m/pc_public/pcshare/images/";
    return i.prototype.tpl = function () {
        return ['<div class="layer_share" id="share_layer"></div>', '<div class="share_tucon" id="share_tucon">', '<span class="pcshare_close " id="pcshare_close"></span>', '<div class="share_icon">', '<div class="s_erwei share_icon_zi fl">', '<div class="share_tu">', '<img style="width:82px;height:82px" src="' + ("http://u.soufun.cn/qrcode.php?url=" + r(this.options.url) + "&type=newhouse&resize=82") + '" alt="">', '</div><p class="f12 gray3">\u5fae\u4fe1\u201c\u626b\u4e00\u626b\u201d<br>\u5206\u4eab\u597d\u53cb</p></div>', '<div class="s_weibo share_icon_zi fl pcshare_iconbox link" name="wb">', '<div class="share_tu">', '<img src="' + a + 'share_weibo.png" alt="">', '</div><p class="f12 gray3">\u70b9\u51fb\u5206\u4eab\u5230\u5fae\u535a</p>', "</div>", '<div class="s_qqzone share_icon_zi fl pcshare_iconbox link" name="qz">', '<div class="share_tu">', '<img src="' + a + 'share_qq.png" alt=""></div><p class="f12 gray3">\u70b9\u51fb\u5206\u4eab\u5230QQ\u7a7a\u95f4</p></div>', '<div class="s_mail share_icon_zi fl link" id="pcshare_mail">', '<div class="share_tu">', '<img src="' + a + 'share_mail.png" alt=""></div><p class="f12 gray3">\u70b9\u51fb\u53d1\u90ae\u4ef6</p></div>', '<div class="s_copy_link share_icon_zi fl link" id="pcshare_copy">', '<div class="share_tu" style="border:none">', '<img src="' + a + 'share_lianjia.png" alt=""></div><p class="f12 gray3" style="border:none">\u70b9\u51fb\u590d\u5236\u5730\u5740</p>', '</div></div><div class="pcshare_tishi_add" id="pcshare_tishi_add" style="display: none">\u5730\u5740\u5df2\u590d\u5236</div></div>'].join("")
    }, i.prototype.creatHTML = function () {
        if (null !== document.getElementById("askpop")) return !1;
        var t = document.createElement("style"), e = this.tpl(), n = document.createElement("div");
        n.innerHTML = e, t.innerHTML = ".share_tucon .f12{font-size: 12px;}.share_tucon .link{cursor:pointer;}.share_tucon .gray3{color: #333!important;}.share_tucon span{text-decoration:none!important;color:#333;}.share_tucon .fl{float:left;display:inline}.share_icon_zi p{margin-top: 10px;line-height: 20px}.share_icon_zi .share_tu img{vertical-align:middle}.share_icon_zi .share_tu{height: 82px;line-height: 82px; overflow: hidden;border-right: 1px solid #eeeeee;  padding: 0px 30px;  width: 82px;}.s_qqzone .share_tu,.s_copy_link .share_tu{border-right: none;}.share_tucon {width: 440px;position: fixed;background: #fff;top: 50%;left: 50%;height: 262px;border-radius: 6px;margin-top: -270px;margin-left: -240px;z-index: 10010;padding: 60px 20px 40px 20px;}.share_tucon span.pcshare_close {cursor:pointer;position: absolute;top: 20px;right: 20px;width: 14px;height: 14px;background: url(" + a + "close_share.png) no-repeat;}.share_icon_zi{text-align: center;  height: 154px}.pcshare_tishi_add{opacity: 0.6;width: 200px;height: 60px;border-radius: 6px;filter: Alpha(Opacity=60);text-align: center;font-size: 16px;color: #ffffff;line-height: 60px;background-color: rgb(0, 0, 0);position: absolute;top:50%;left: 50%;margin-left: -100px;margin-top: -30px}.layer_share{height: 100%; width: 100%; position: fixed; left: 0px; top: 0px;filter: progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#99000000', endColorstr='#99000000');background-color: rgba(0,0,0,0.6); z-index: 10002;}", document.body.appendChild(t), document.body.appendChild(n)
    }, i.prototype.share = function (t) {
        var i = this;
        n(t, {
            wb: {
                url: "http://service.weibo.com/share/share.php", parse: function () {
                    return {
                        url: i.options.url + "#source=sinowb_fx",
                        count: i.options.count || "",
                        appkey: "3427098291",
                        title: r(e(i.options.weiboTitle, 160)),
                        pic: i.options.PicUrl,
                        ralateUid: ""
                    }
                }
            }, qz: {
                url: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey", parse: function () {
                    return {
                        url: i.options.url + "#source=qqkj_fx",
                        showcount: "1",
                        title: i.options.qqTitle,
                        desc: e(i.options.desc, 160),
                        summary: e(i.options.summary, 160),
                        site: i.options.url,
                        pics: i.options.PicUrl
                    }
                }
            }
        })
    }, i.prototype.hide = function () {
        var t = document.getElementById("share_layer"), e = document.getElementById("share_tucon");
        t.style.display = "none", e.style.display = "none"
    }, i.prototype.show = function () {
        var t = document.getElementById("share_layer"), e = document.getElementById("share_tucon");
        return !!e && (t && (t.style.display = "block"), e.style.display = "block", !0)
    }, i.prototype.copy = function () {
        var e = this, n = document.getElementById("pcshare_copy"), i = document.getElementById("pcshare_tishi_add");
        if (o() && o() < 8) n.onclick = function () {
            t.clipboardData.setData("Text", e.options.url), i.style.display = "block", setTimeout(function () {
                i.style.display = "none"
            }, 2e3)
        }; else if (t.Clipboard) {
            n.setAttribute("data-clipboard-text", e.options.url);
            var r = new Clipboard("#pcshare_copy");
            r.on("success", function (t) {
                i.style.display = "block", setTimeout(function () {
                    i.style.display = "none"
                }, 2e3), t.clearSelection()
            }), r.on("error", function (t) {
                alert("\u5f88\u9057\u61be\uff0c\u60a8\u7684\u6d4f\u89c8\u5668\u7248\u672c\u8fc7\u4f4e\uff0c\u590d\u5236\u5931\u8d25\uff0c\u8bf7\u624b\u52a8\u590d\u5236\u6d3b\u52a8\u94fe\u63a5\uff01")
            })
        }
    }, i.prototype.sendMail = function () {
        t.open("http://pubtest.dmp.fang.com/mailshare?lpName=" + r(this.options.buildName) + "&lpLink=" + r(this.options.url))
    }, i
});