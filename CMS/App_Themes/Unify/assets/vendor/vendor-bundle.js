/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function (a, b) { "use strict"; "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) { if (!a.document) throw new Error("jQuery requires a window with a document"); return b(a) } : b(a) }("undefined" != typeof window ? window : this, function (a, b) {
    "use strict"; var c = [], d = a.document, e = Object.getPrototypeOf, f = c.slice, g = c.concat, h = c.push, i = c.indexOf, j = {}, k = j.toString, l = j.hasOwnProperty, m = l.toString, n = m.call(Object), o = {}; function p(a, b) { b = b || d; var c = b.createElement("script"); c.text = a, b.head.appendChild(c).parentNode.removeChild(c) } var q = "3.2.1", r = function (a, b) { return new r.fn.init(a, b) }, s = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, t = /^-ms-/, u = /-([a-z])/g, v = function (a, b) { return b.toUpperCase() }; r.fn = r.prototype = { jquery: q, constructor: r, length: 0, toArray: function () { return f.call(this) }, get: function (a) { return null == a ? f.call(this) : a < 0 ? this[a + this.length] : this[a] }, pushStack: function (a) { var b = r.merge(this.constructor(), a); return b.prevObject = this, b }, each: function (a) { return r.each(this, a) }, map: function (a) { return this.pushStack(r.map(this, function (b, c) { return a.call(b, c, b) })) }, slice: function () { return this.pushStack(f.apply(this, arguments)) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, eq: function (a) { var b = this.length, c = +a + (a < 0 ? b : 0); return this.pushStack(c >= 0 && c < b ? [this[c]] : []) }, end: function () { return this.prevObject || this.constructor() }, push: h, sort: c.sort, splice: c.splice }, r.extend = r.fn.extend = function () { var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1; for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || r.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++)if (null != (a = arguments[h])) for (b in a) c = g[b], d = a[b], g !== d && (j && d && (r.isPlainObject(d) || (e = Array.isArray(d))) ? (e ? (e = !1, f = c && Array.isArray(c) ? c : []) : f = c && r.isPlainObject(c) ? c : {}, g[b] = r.extend(j, f, d)) : void 0 !== d && (g[b] = d)); return g }, r.extend({ expando: "jQuery" + (q + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (a) { throw new Error(a) }, noop: function () { }, isFunction: function (a) { return "function" === r.type(a) }, isWindow: function (a) { return null != a && a === a.window }, isNumeric: function (a) { var b = r.type(a); return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a)) }, isPlainObject: function (a) { var b, c; return !(!a || "[object Object]" !== k.call(a)) && (!(b = e(a)) || (c = l.call(b, "constructor") && b.constructor, "function" == typeof c && m.call(c) === n)) }, isEmptyObject: function (a) { var b; for (b in a) return !1; return !0 }, type: function (a) { return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? j[k.call(a)] || "object" : typeof a }, globalEval: function (a) { p(a) }, camelCase: function (a) { return a.replace(t, "ms-").replace(u, v) }, each: function (a, b) { var c, d = 0; if (w(a)) { for (c = a.length; d < c; d++)if (b.call(a[d], d, a[d]) === !1) break } else for (d in a) if (b.call(a[d], d, a[d]) === !1) break; return a }, trim: function (a) { return null == a ? "" : (a + "").replace(s, "") }, makeArray: function (a, b) { var c = b || []; return null != a && (w(Object(a)) ? r.merge(c, "string" == typeof a ? [a] : a) : h.call(c, a)), c }, inArray: function (a, b, c) { return null == b ? -1 : i.call(b, a, c) }, merge: function (a, b) { for (var c = +b.length, d = 0, e = a.length; d < c; d++)a[e++] = b[d]; return a.length = e, a }, grep: function (a, b, c) { for (var d, e = [], f = 0, g = a.length, h = !c; f < g; f++)d = !b(a[f], f), d !== h && e.push(a[f]); return e }, map: function (a, b, c) { var d, e, f = 0, h = []; if (w(a)) for (d = a.length; f < d; f++)e = b(a[f], f, c), null != e && h.push(e); else for (f in a) e = b(a[f], f, c), null != e && h.push(e); return g.apply([], h) }, guid: 1, proxy: function (a, b) { var c, d, e; if ("string" == typeof b && (c = a[b], b = a, a = c), r.isFunction(a)) return d = f.call(arguments, 2), e = function () { return a.apply(b || this, d.concat(f.call(arguments))) }, e.guid = a.guid = a.guid || r.guid++ , e }, now: Date.now, support: o }), "function" == typeof Symbol && (r.fn[Symbol.iterator] = c[Symbol.iterator]), r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) { j["[object " + b + "]"] = b.toLowerCase() }); function w(a) { var b = !!a && "length" in a && a.length, c = r.type(a); return "function" !== c && !r.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a) } var x = function (a) { var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date, v = a.document, w = 0, x = 0, y = ha(), z = ha(), A = ha(), B = function (a, b) { return a === b && (l = !0), 0 }, C = {}.hasOwnProperty, D = [], E = D.pop, F = D.push, G = D.push, H = D.slice, I = function (a, b) { for (var c = 0, d = a.length; c < d; c++)if (a[c] === b) return c; return -1 }, J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", K = "[\\x20\\t\\r\\n\\f]", L = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", M = "\\[" + K + "*(" + L + ")(?:" + K + "*([*^$|!~]?=)" + K + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + L + "))|)" + K + "*\\]", N = ":(" + L + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)", O = new RegExp(K + "+", "g"), P = new RegExp("^" + K + "+|((?:^|[^\\\\])(?:\\\\.)*)" + K + "+$", "g"), Q = new RegExp("^" + K + "*," + K + "*"), R = new RegExp("^" + K + "*([>+~]|" + K + ")" + K + "*"), S = new RegExp("=" + K + "*([^\\]'\"]*?)" + K + "*\\]", "g"), T = new RegExp(N), U = new RegExp("^" + L + "$"), V = { ID: new RegExp("^#(" + L + ")"), CLASS: new RegExp("^\\.(" + L + ")"), TAG: new RegExp("^(" + L + "|[*])"), ATTR: new RegExp("^" + M), PSEUDO: new RegExp("^" + N), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + K + "*(even|odd|(([+-]|)(\\d*)n|)" + K + "*(?:([+-]|)" + K + "*(\\d+)|))" + K + "*\\)|)", "i"), bool: new RegExp("^(?:" + J + ")$", "i"), needsContext: new RegExp("^" + K + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + K + "*((?:-\\d)?\\d*)" + K + "*\\)|)(?=[^-]|$)", "i") }, W = /^(?:input|select|textarea|button)$/i, X = /^h\d$/i, Y = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, $ = /[+~]/, _ = new RegExp("\\\\([\\da-f]{1,6}" + K + "?|(" + K + ")|.)", "ig"), aa = function (a, b, c) { var d = "0x" + b - 65536; return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320) }, ba = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ca = function (a, b) { return b ? "\0" === a ? "\ufffd" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a }, da = function () { m() }, ea = ta(function (a) { return a.disabled === !0 && ("form" in a || "label" in a) }, { dir: "parentNode", next: "legend" }); try { G.apply(D = H.call(v.childNodes), v.childNodes), D[v.childNodes.length].nodeType } catch (fa) { G = { apply: D.length ? function (a, b) { F.apply(a, H.call(b)) } : function (a, b) { var c = a.length, d = 0; while (a[c++] = b[d++]); a.length = c - 1 } } } function ga(a, b, d, e) { var f, h, j, k, l, o, r, s = b && b.ownerDocument, w = b ? b.nodeType : 9; if (d = d || [], "string" != typeof a || !a || 1 !== w && 9 !== w && 11 !== w) return d; if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) { if (11 !== w && (l = Z.exec(a))) if (f = l[1]) { if (9 === w) { if (!(j = b.getElementById(f))) return d; if (j.id === f) return d.push(j), d } else if (s && (j = s.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d } else { if (l[2]) return G.apply(d, b.getElementsByTagName(a)), d; if ((f = l[3]) && c.getElementsByClassName && b.getElementsByClassName) return G.apply(d, b.getElementsByClassName(f)), d } if (c.qsa && !A[a + " "] && (!q || !q.test(a))) { if (1 !== w) s = b, r = a; else if ("object" !== b.nodeName.toLowerCase()) { (k = b.getAttribute("id")) ? k = k.replace(ba, ca) : b.setAttribute("id", k = u), o = g(a), h = o.length; while (h--) o[h] = "#" + k + " " + sa(o[h]); r = o.join(","), s = $.test(a) && qa(b.parentNode) || b } if (r) try { return G.apply(d, s.querySelectorAll(r)), d } catch (x) { } finally { k === u && b.removeAttribute("id") } } } return i(a.replace(P, "$1"), b, d, e) } function ha() { var a = []; function b(c, e) { return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e } return b } function ia(a) { return a[u] = !0, a } function ja(a) { var b = n.createElement("fieldset"); try { return !!a(b) } catch (c) { return !1 } finally { b.parentNode && b.parentNode.removeChild(b), b = null } } function ka(a, b) { var c = a.split("|"), e = c.length; while (e--) d.attrHandle[c[e]] = b } function la(a, b) { var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex; if (d) return d; if (c) while (c = c.nextSibling) if (c === b) return -1; return a ? 1 : -1 } function ma(a) { return function (b) { var c = b.nodeName.toLowerCase(); return "input" === c && b.type === a } } function na(a) { return function (b) { var c = b.nodeName.toLowerCase(); return ("input" === c || "button" === c) && b.type === a } } function oa(a) { return function (b) { return "form" in b ? b.parentNode && b.disabled === !1 ? "label" in b ? "label" in b.parentNode ? b.parentNode.disabled === a : b.disabled === a : b.isDisabled === a || b.isDisabled !== !a && ea(b) === a : b.disabled === a : "label" in b && b.disabled === a } } function pa(a) { return ia(function (b) { return b = +b, ia(function (c, d) { var e, f = a([], c.length, b), g = f.length; while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e])) }) }) } function qa(a) { return a && "undefined" != typeof a.getElementsByTagName && a } c = ga.support = {}, f = ga.isXML = function (a) { var b = a && (a.ownerDocument || a).documentElement; return !!b && "HTML" !== b.nodeName }, m = ga.setDocument = function (a) { var b, e, g = a ? a.ownerDocument || a : v; return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), v !== n && (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ja(function (a) { return a.className = "i", !a.getAttribute("className") }), c.getElementsByTagName = ja(function (a) { return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length }), c.getElementsByClassName = Y.test(n.getElementsByClassName), c.getById = ja(function (a) { return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length }), c.getById ? (d.filter.ID = function (a) { var b = a.replace(_, aa); return function (a) { return a.getAttribute("id") === b } }, d.find.ID = function (a, b) { if ("undefined" != typeof b.getElementById && p) { var c = b.getElementById(a); return c ? [c] : [] } }) : (d.filter.ID = function (a) { var b = a.replace(_, aa); return function (a) { var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id"); return c && c.value === b } }, d.find.ID = function (a, b) { if ("undefined" != typeof b.getElementById && p) { var c, d, e, f = b.getElementById(a); if (f) { if (c = f.getAttributeNode("id"), c && c.value === a) return [f]; e = b.getElementsByName(a), d = 0; while (f = e[d++]) if (c = f.getAttributeNode("id"), c && c.value === a) return [f] } return [] } }), d.find.TAG = c.getElementsByTagName ? function (a, b) { return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0 } : function (a, b) { var c, d = [], e = 0, f = b.getElementsByTagName(a); if ("*" === a) { while (c = f[e++]) 1 === c.nodeType && d.push(c); return d } return f }, d.find.CLASS = c.getElementsByClassName && function (a, b) { if ("undefined" != typeof b.getElementsByClassName && p) return b.getElementsByClassName(a) }, r = [], q = [], (c.qsa = Y.test(n.querySelectorAll)) && (ja(function (a) { o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + K + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + K + "*(?:value|" + J + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]") }), ja(function (a) { a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>"; var b = n.createElement("input"); b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + K + "*[*^$|!~]?="), 2 !== a.querySelectorAll(":enabled").length && q.push(":enabled", ":disabled"), o.appendChild(a).disabled = !0, 2 !== a.querySelectorAll(":disabled").length && q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:") })), (c.matchesSelector = Y.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function (a) { c.disconnectedMatch = s.call(a, "*"), s.call(a, "[s!='']:x"), r.push("!=", N) }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Y.test(o.compareDocumentPosition), t = b || Y.test(o.contains) ? function (a, b) { var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode; return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d))) } : function (a, b) { if (b) while (b = b.parentNode) if (b === a) return !0; return !1 }, B = b ? function (a, b) { if (a === b) return l = !0, 0; var d = !a.compareDocumentPosition - !b.compareDocumentPosition; return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? I(k, a) - I(k, b) : 0 : 4 & d ? -1 : 1) } : function (a, b) { if (a === b) return l = !0, 0; var c, d = 0, e = a.parentNode, f = b.parentNode, g = [a], h = [b]; if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? I(k, a) - I(k, b) : 0; if (e === f) return la(a, b); c = a; while (c = c.parentNode) g.unshift(c); c = b; while (c = c.parentNode) h.unshift(c); while (g[d] === h[d]) d++; return d ? la(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0 }, n) : n }, ga.matches = function (a, b) { return ga(a, null, null, b) }, ga.matchesSelector = function (a, b) { if ((a.ownerDocument || a) !== n && m(a), b = b.replace(S, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try { var d = s.call(a, b); if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d } catch (e) { } return ga(b, n, null, [a]).length > 0 }, ga.contains = function (a, b) { return (a.ownerDocument || a) !== n && m(a), t(a, b) }, ga.attr = function (a, b) { (a.ownerDocument || a) !== n && m(a); var e = d.attrHandle[b.toLowerCase()], f = e && C.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0; return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null }, ga.escape = function (a) { return (a + "").replace(ba, ca) }, ga.error = function (a) { throw new Error("Syntax error, unrecognized expression: " + a) }, ga.uniqueSort = function (a) { var b, d = [], e = 0, f = 0; if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) { while (b = a[f++]) b === a[f] && (e = d.push(f)); while (e--) a.splice(d[e], 1) } return k = null, a }, e = ga.getText = function (a) { var b, c = "", d = 0, f = a.nodeType; if (f) { if (1 === f || 9 === f || 11 === f) { if ("string" == typeof a.textContent) return a.textContent; for (a = a.firstChild; a; a = a.nextSibling)c += e(a) } else if (3 === f || 4 === f) return a.nodeValue } else while (b = a[d++]) c += e(b); return c }, d = ga.selectors = { cacheLength: 50, createPseudo: ia, match: V, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function (a) { return a[1] = a[1].replace(_, aa), a[3] = (a[3] || a[4] || a[5] || "").replace(_, aa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4) }, CHILD: function (a) { return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a }, PSEUDO: function (a) { var b, c = !a[6] && a[2]; return V.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && T.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3)) } }, filter: { TAG: function (a) { var b = a.replace(_, aa).toLowerCase(); return "*" === a ? function () { return !0 } : function (a) { return a.nodeName && a.nodeName.toLowerCase() === b } }, CLASS: function (a) { var b = y[a + " "]; return b || (b = new RegExp("(^|" + K + ")" + a + "(" + K + "|$)")) && y(a, function (a) { return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "") }) }, ATTR: function (a, b, c) { return function (d) { var e = ga.attr(d, a); return null == e ? "!=" === b : !b || (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(O, " ") + " ").indexOf(c) > -1 : "|=" === b && (e === c || e.slice(0, c.length + 1) === c + "-")) } }, CHILD: function (a, b, c, d, e) { var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b; return 1 === d && 0 === e ? function (a) { return !!a.parentNode } : function (b, c, i) { var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h, t = !1; if (q) { if (f) { while (p) { m = b; while (m = m[p]) if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1; o = p = "only" === a && !o && "nextSibling" } return !0 } if (o = [g ? q.firstChild : q.lastChild], g && s) { m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n]; while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) if (1 === m.nodeType && ++t && m === b) { k[a] = [w, n, t]; break } } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1) while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [w, t]), m === b)) break; return t -= e, t === d || t % d === 0 && t / d >= 0 } } }, PSEUDO: function (a, b) { var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a); return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function (a, c) { var d, f = e(a, b), g = f.length; while (g--) d = I(a, f[g]), a[d] = !(c[d] = f[g]) }) : function (a) { return e(a, 0, c) }) : e } }, pseudos: { not: ia(function (a) { var b = [], c = [], d = h(a.replace(P, "$1")); return d[u] ? ia(function (a, b, c, e) { var f, g = d(a, null, e, []), h = a.length; while (h--) (f = g[h]) && (a[h] = !(b[h] = f)) }) : function (a, e, f) { return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop() } }), has: ia(function (a) { return function (b) { return ga(a, b).length > 0 } }), contains: ia(function (a) { return a = a.replace(_, aa), function (b) { return (b.textContent || b.innerText || e(b)).indexOf(a) > -1 } }), lang: ia(function (a) { return U.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(_, aa).toLowerCase(), function (b) { var c; do if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType); return !1 } }), target: function (b) { var c = a.location && a.location.hash; return c && c.slice(1) === b.id }, root: function (a) { return a === o }, focus: function (a) { return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex) }, enabled: oa(!1), disabled: oa(!0), checked: function (a) { var b = a.nodeName.toLowerCase(); return "input" === b && !!a.checked || "option" === b && !!a.selected }, selected: function (a) { return a.parentNode && a.parentNode.selectedIndex, a.selected === !0 }, empty: function (a) { for (a = a.firstChild; a; a = a.nextSibling)if (a.nodeType < 6) return !1; return !0 }, parent: function (a) { return !d.pseudos.empty(a) }, header: function (a) { return X.test(a.nodeName) }, input: function (a) { return W.test(a.nodeName) }, button: function (a) { var b = a.nodeName.toLowerCase(); return "input" === b && "button" === a.type || "button" === b }, text: function (a) { var b; return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase()) }, first: pa(function () { return [0] }), last: pa(function (a, b) { return [b - 1] }), eq: pa(function (a, b, c) { return [c < 0 ? c + b : c] }), even: pa(function (a, b) { for (var c = 0; c < b; c += 2)a.push(c); return a }), odd: pa(function (a, b) { for (var c = 1; c < b; c += 2)a.push(c); return a }), lt: pa(function (a, b, c) { for (var d = c < 0 ? c + b : c; --d >= 0;)a.push(d); return a }), gt: pa(function (a, b, c) { for (var d = c < 0 ? c + b : c; ++d < b;)a.push(d); return a }) } }, d.pseudos.nth = d.pseudos.eq; for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) d.pseudos[b] = ma(b); for (b in { submit: !0, reset: !0 }) d.pseudos[b] = na(b); function ra() { } ra.prototype = d.filters = d.pseudos, d.setFilters = new ra, g = ga.tokenize = function (a, b) { var c, e, f, g, h, i, j, k = z[a + " "]; if (k) return b ? 0 : k.slice(0); h = a, i = [], j = d.preFilter; while (h) { c && !(e = Q.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = R.exec(h)) && (c = e.shift(), f.push({ value: c, type: e[0].replace(P, " ") }), h = h.slice(c.length)); for (g in d.filter) !(e = V[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({ value: c, type: g, matches: e }), h = h.slice(c.length)); if (!c) break } return b ? h.length : h ? ga.error(a) : z(a, i).slice(0) }; function sa(a) { for (var b = 0, c = a.length, d = ""; b < c; b++)d += a[b].value; return d } function ta(a, b, c) { var d = b.dir, e = b.next, f = e || d, g = c && "parentNode" === f, h = x++; return b.first ? function (b, c, e) { while (b = b[d]) if (1 === b.nodeType || g) return a(b, c, e); return !1 } : function (b, c, i) { var j, k, l, m = [w, h]; if (i) { while (b = b[d]) if ((1 === b.nodeType || g) && a(b, c, i)) return !0 } else while (b = b[d]) if (1 === b.nodeType || g) if (l = b[u] || (b[u] = {}), k = l[b.uniqueID] || (l[b.uniqueID] = {}), e && e === b.nodeName.toLowerCase()) b = b[d] || b; else { if ((j = k[f]) && j[0] === w && j[1] === h) return m[2] = j[2]; if (k[f] = m, m[2] = a(b, c, i)) return !0 } return !1 } } function ua(a) { return a.length > 1 ? function (b, c, d) { var e = a.length; while (e--) if (!a[e](b, c, d)) return !1; return !0 } : a[0] } function va(a, b, c) { for (var d = 0, e = b.length; d < e; d++)ga(a, b[d], c); return c } function wa(a, b, c, d, e) { for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h))); return g } function xa(a, b, c, d, e, f) { return d && !d[u] && (d = xa(d)), e && !e[u] && (e = xa(e, f)), ia(function (f, g, h, i) { var j, k, l, m = [], n = [], o = g.length, p = f || va(b || "*", h.nodeType ? [h] : h, []), q = !a || !f && b ? p : wa(p, m, a, h, i), r = c ? e || (f ? a : o || d) ? [] : g : q; if (c && c(q, r, h, i), d) { j = wa(r, n), d(j, [], h, i), k = j.length; while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l)) } if (f) { if (e || a) { if (e) { j = [], k = r.length; while (k--) (l = r[k]) && j.push(q[k] = l); e(null, r = [], j, i) } k = r.length; while (k--) (l = r[k]) && (j = e ? I(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l)) } } else r = wa(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : G.apply(g, r) }) } function ya(a) { for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ta(function (a) { return a === b }, h, !0), l = ta(function (a) { return I(b, a) > -1 }, h, !0), m = [function (a, c, d) { var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d)); return b = null, e }]; i < f; i++)if (c = d.relative[a[i].type]) m = [ta(ua(m), c)]; else { if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) { for (e = ++i; e < f; e++)if (d.relative[a[e].type]) break; return xa(i > 1 && ua(m), i > 1 && sa(a.slice(0, i - 1).concat({ value: " " === a[i - 2].type ? "*" : "" })).replace(P, "$1"), c, i < e && ya(a.slice(i, e)), e < f && ya(a = a.slice(e)), e < f && sa(a)) } m.push(c) } return ua(m) } function za(a, b) { var c = b.length > 0, e = a.length > 0, f = function (f, g, h, i, k) { var l, o, q, r = 0, s = "0", t = f && [], u = [], v = j, x = f || e && d.find.TAG("*", k), y = w += null == v ? 1 : Math.random() || .1, z = x.length; for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) { if (e && l) { o = 0, g || l.ownerDocument === n || (m(l), h = !p); while (q = a[o++]) if (q(l, g || n, h)) { i.push(l); break } k && (w = y) } c && ((l = !q && l) && r-- , f && t.push(l)) } if (r += s, c && s !== r) { o = 0; while (q = b[o++]) q(t, u, g, h); if (f) { if (r > 0) while (s--) t[s] || u[s] || (u[s] = E.call(i)); u = wa(u) } G.apply(i, u), k && !f && u.length > 0 && r + b.length > 1 && ga.uniqueSort(i) } return k && (w = y, j = v), t }; return c ? ia(f) : f } return h = ga.compile = function (a, b) { var c, d = [], e = [], f = A[a + " "]; if (!f) { b || (b = g(a)), c = b.length; while (c--) f = ya(b[c]), f[u] ? d.push(f) : e.push(f); f = A(a, za(e, d)), f.selector = a } return f }, i = ga.select = function (a, b, c, e) { var f, i, j, k, l, m = "function" == typeof a && a, n = !e && g(a = m.selector || a); if (c = c || [], 1 === n.length) { if (i = n[0] = n[0].slice(0), i.length > 2 && "ID" === (j = i[0]).type && 9 === b.nodeType && p && d.relative[i[1].type]) { if (b = (d.find.ID(j.matches[0].replace(_, aa), b) || [])[0], !b) return c; m && (b = b.parentNode), a = a.slice(i.shift().value.length) } f = V.needsContext.test(a) ? 0 : i.length; while (f--) { if (j = i[f], d.relative[k = j.type]) break; if ((l = d.find[k]) && (e = l(j.matches[0].replace(_, aa), $.test(i[0].type) && qa(b.parentNode) || b))) { if (i.splice(f, 1), a = e.length && sa(i), !a) return G.apply(c, e), c; break } } } return (m || h(a, n))(e, b, !p, c, !b || $.test(a) && qa(b.parentNode) || b), c }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function (a) { return 1 & a.compareDocumentPosition(n.createElement("fieldset")) }), ja(function (a) { return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href") }) || ka("type|href|height|width", function (a, b, c) { if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2) }), c.attributes && ja(function (a) { return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value") }) || ka("value", function (a, b, c) { if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue }), ja(function (a) { return null == a.getAttribute("disabled") }) || ka(J, function (a, b, c) { var d; if (!c) return a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null }), ga }(a); r.find = x, r.expr = x.selectors, r.expr[":"] = r.expr.pseudos, r.uniqueSort = r.unique = x.uniqueSort, r.text = x.getText, r.isXMLDoc = x.isXML, r.contains = x.contains, r.escapeSelector = x.escape; var y = function (a, b, c) { var d = [], e = void 0 !== c; while ((a = a[b]) && 9 !== a.nodeType) if (1 === a.nodeType) { if (e && r(a).is(c)) break; d.push(a) } return d }, z = function (a, b) { for (var c = []; a; a = a.nextSibling)1 === a.nodeType && a !== b && c.push(a); return c }, A = r.expr.match.needsContext; function B(a, b) { return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase() } var C = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, D = /^.[^:#\[\.,]*$/; function E(a, b, c) { return r.isFunction(b) ? r.grep(a, function (a, d) { return !!b.call(a, d, a) !== c }) : b.nodeType ? r.grep(a, function (a) { return a === b !== c }) : "string" != typeof b ? r.grep(a, function (a) { return i.call(b, a) > -1 !== c }) : D.test(b) ? r.filter(b, a, c) : (b = r.filter(b, a), r.grep(a, function (a) { return i.call(b, a) > -1 !== c && 1 === a.nodeType })) } r.filter = function (a, b, c) { var d = b[0]; return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? r.find.matchesSelector(d, a) ? [d] : [] : r.find.matches(a, r.grep(b, function (a) { return 1 === a.nodeType })) }, r.fn.extend({ find: function (a) { var b, c, d = this.length, e = this; if ("string" != typeof a) return this.pushStack(r(a).filter(function () { for (b = 0; b < d; b++)if (r.contains(e[b], this)) return !0 })); for (c = this.pushStack([]), b = 0; b < d; b++)r.find(a, e[b], c); return d > 1 ? r.uniqueSort(c) : c }, filter: function (a) { return this.pushStack(E(this, a || [], !1)) }, not: function (a) { return this.pushStack(E(this, a || [], !0)) }, is: function (a) { return !!E(this, "string" == typeof a && A.test(a) ? r(a) : a || [], !1).length } }); var F, G = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, H = r.fn.init = function (a, b, c) { var e, f; if (!a) return this; if (c = c || F, "string" == typeof a) { if (e = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : G.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a); if (e[1]) { if (b = b instanceof r ? b[0] : b, r.merge(this, r.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), C.test(e[1]) && r.isPlainObject(b)) for (e in b) r.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]); return this } return f = d.getElementById(e[2]), f && (this[0] = f, this.length = 1), this } return a.nodeType ? (this[0] = a, this.length = 1, this) : r.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(r) : r.makeArray(a, this) }; H.prototype = r.fn, F = r(d); var I = /^(?:parents|prev(?:Until|All))/, J = { children: !0, contents: !0, next: !0, prev: !0 }; r.fn.extend({ has: function (a) { var b = r(a, this), c = b.length; return this.filter(function () { for (var a = 0; a < c; a++)if (r.contains(this, b[a])) return !0 }) }, closest: function (a, b) { var c, d = 0, e = this.length, f = [], g = "string" != typeof a && r(a); if (!A.test(a)) for (; d < e; d++)for (c = this[d]; c && c !== b; c = c.parentNode)if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && r.find.matchesSelector(c, a))) { f.push(c); break } return this.pushStack(f.length > 1 ? r.uniqueSort(f) : f) }, index: function (a) { return a ? "string" == typeof a ? i.call(r(a), this[0]) : i.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 }, add: function (a, b) { return this.pushStack(r.uniqueSort(r.merge(this.get(), r(a, b)))) }, addBack: function (a) { return this.add(null == a ? this.prevObject : this.prevObject.filter(a)) } }); function K(a, b) { while ((a = a[b]) && 1 !== a.nodeType); return a } r.each({ parent: function (a) { var b = a.parentNode; return b && 11 !== b.nodeType ? b : null }, parents: function (a) { return y(a, "parentNode") }, parentsUntil: function (a, b, c) { return y(a, "parentNode", c) }, next: function (a) { return K(a, "nextSibling") }, prev: function (a) { return K(a, "previousSibling") }, nextAll: function (a) { return y(a, "nextSibling") }, prevAll: function (a) { return y(a, "previousSibling") }, nextUntil: function (a, b, c) { return y(a, "nextSibling", c) }, prevUntil: function (a, b, c) { return y(a, "previousSibling", c) }, siblings: function (a) { return z((a.parentNode || {}).firstChild, a) }, children: function (a) { return z(a.firstChild) }, contents: function (a) { return B(a, "iframe") ? a.contentDocument : (B(a, "template") && (a = a.content || a), r.merge([], a.childNodes)) } }, function (a, b) { r.fn[a] = function (c, d) { var e = r.map(this, b, c); return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = r.filter(d, e)), this.length > 1 && (J[a] || r.uniqueSort(e), I.test(a) && e.reverse()), this.pushStack(e) } }); var L = /[^\x20\t\r\n\f]+/g; function M(a) { var b = {}; return r.each(a.match(L) || [], function (a, c) { b[c] = !0 }), b } r.Callbacks = function (a) { a = "string" == typeof a ? M(a) : r.extend({}, a); var b, c, d, e, f = [], g = [], h = -1, i = function () { for (e = e || a.once, d = b = !0; g.length; h = -1) { c = g.shift(); while (++h < f.length) f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1) } a.memory || (c = !1), b = !1, e && (f = c ? [] : "") }, j = { add: function () { return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) { r.each(b, function (b, c) { r.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== r.type(c) && d(c) }) }(arguments), c && !b && i()), this }, remove: function () { return r.each(arguments, function (a, b) { var c; while ((c = r.inArray(b, f, c)) > -1) f.splice(c, 1), c <= h && h-- }), this }, has: function (a) { return a ? r.inArray(a, f) > -1 : f.length > 0 }, empty: function () { return f && (f = []), this }, disable: function () { return e = g = [], f = c = "", this }, disabled: function () { return !f }, lock: function () { return e = g = [], c || b || (f = c = ""), this }, locked: function () { return !!e }, fireWith: function (a, c) { return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this }, fire: function () { return j.fireWith(this, arguments), this }, fired: function () { return !!d } }; return j }; function N(a) { return a } function O(a) { throw a } function P(a, b, c, d) { var e; try { a && r.isFunction(e = a.promise) ? e.call(a).done(b).fail(c) : a && r.isFunction(e = a.then) ? e.call(a, b, c) : b.apply(void 0, [a].slice(d)) } catch (a) { c.apply(void 0, [a]) } } r.extend({ Deferred: function (b) { var c = [["notify", "progress", r.Callbacks("memory"), r.Callbacks("memory"), 2], ["resolve", "done", r.Callbacks("once memory"), r.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", r.Callbacks("once memory"), r.Callbacks("once memory"), 1, "rejected"]], d = "pending", e = { state: function () { return d }, always: function () { return f.done(arguments).fail(arguments), this }, "catch": function (a) { return e.then(null, a) }, pipe: function () { var a = arguments; return r.Deferred(function (b) { r.each(c, function (c, d) { var e = r.isFunction(a[d[4]]) && a[d[4]]; f[d[1]](function () { var a = e && e.apply(this, arguments); a && r.isFunction(a.promise) ? a.promise().progress(b.notify).done(b.resolve).fail(b.reject) : b[d[0] + "With"](this, e ? [a] : arguments) }) }), a = null }).promise() }, then: function (b, d, e) { var f = 0; function g(b, c, d, e) { return function () { var h = this, i = arguments, j = function () { var a, j; if (!(b < f)) { if (a = d.apply(h, i), a === c.promise()) throw new TypeError("Thenable self-resolution"); j = a && ("object" == typeof a || "function" == typeof a) && a.then, r.isFunction(j) ? e ? j.call(a, g(f, c, N, e), g(f, c, O, e)) : (f++ , j.call(a, g(f, c, N, e), g(f, c, O, e), g(f, c, N, c.notifyWith))) : (d !== N && (h = void 0, i = [a]), (e || c.resolveWith)(h, i)) } }, k = e ? j : function () { try { j() } catch (a) { r.Deferred.exceptionHook && r.Deferred.exceptionHook(a, k.stackTrace), b + 1 >= f && (d !== O && (h = void 0, i = [a]), c.rejectWith(h, i)) } }; b ? k() : (r.Deferred.getStackHook && (k.stackTrace = r.Deferred.getStackHook()), a.setTimeout(k)) } } return r.Deferred(function (a) { c[0][3].add(g(0, a, r.isFunction(e) ? e : N, a.notifyWith)), c[1][3].add(g(0, a, r.isFunction(b) ? b : N)), c[2][3].add(g(0, a, r.isFunction(d) ? d : O)) }).promise() }, promise: function (a) { return null != a ? r.extend(a, e) : e } }, f = {}; return r.each(c, function (a, b) { var g = b[2], h = b[5]; e[b[1]] = g.add, h && g.add(function () { d = h }, c[3 - a][2].disable, c[0][2].lock), g.add(b[3].fire), f[b[0]] = function () { return f[b[0] + "With"](this === f ? void 0 : this, arguments), this }, f[b[0] + "With"] = g.fireWith }), e.promise(f), b && b.call(f, f), f }, when: function (a) { var b = arguments.length, c = b, d = Array(c), e = f.call(arguments), g = r.Deferred(), h = function (a) { return function (c) { d[a] = this, e[a] = arguments.length > 1 ? f.call(arguments) : c, --b || g.resolveWith(d, e) } }; if (b <= 1 && (P(a, g.done(h(c)).resolve, g.reject, !b), "pending" === g.state() || r.isFunction(e[c] && e[c].then))) return g.then(); while (c--) P(e[c], h(c), g.reject); return g.promise() } }); var Q = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/; r.Deferred.exceptionHook = function (b, c) { a.console && a.console.warn && b && Q.test(b.name) && a.console.warn("jQuery.Deferred exception: " + b.message, b.stack, c) }, r.readyException = function (b) { a.setTimeout(function () { throw b }) }; var R = r.Deferred(); r.fn.ready = function (a) { return R.then(a)["catch"](function (a) { r.readyException(a) }), this }, r.extend({ isReady: !1, readyWait: 1, ready: function (a) { (a === !0 ? --r.readyWait : r.isReady) || (r.isReady = !0, a !== !0 && --r.readyWait > 0 || R.resolveWith(d, [r])) } }), r.ready.then = R.then; function S() {
        d.removeEventListener("DOMContentLoaded", S),
        a.removeEventListener("load", S), r.ready()
    } "complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll ? a.setTimeout(r.ready) : (d.addEventListener("DOMContentLoaded", S), a.addEventListener("load", S)); var T = function (a, b, c, d, e, f, g) { var h = 0, i = a.length, j = null == c; if ("object" === r.type(c)) { e = !0; for (h in c) T(a, b, h, c[h], !0, f, g) } else if (void 0 !== d && (e = !0, r.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) { return j.call(r(a), c) })), b)) for (; h < i; h++)b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c))); return e ? a : j ? b.call(a) : i ? b(a[0], c) : f }, U = function (a) { return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType }; function V() { this.expando = r.expando + V.uid++ } V.uid = 1, V.prototype = { cache: function (a) { var b = a[this.expando]; return b || (b = {}, U(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, { value: b, configurable: !0 }))), b }, set: function (a, b, c) { var d, e = this.cache(a); if ("string" == typeof b) e[r.camelCase(b)] = c; else for (d in b) e[r.camelCase(d)] = b[d]; return e }, get: function (a, b) { return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][r.camelCase(b)] }, access: function (a, b, c) { return void 0 === b || b && "string" == typeof b && void 0 === c ? this.get(a, b) : (this.set(a, b, c), void 0 !== c ? c : b) }, remove: function (a, b) { var c, d = a[this.expando]; if (void 0 !== d) { if (void 0 !== b) { Array.isArray(b) ? b = b.map(r.camelCase) : (b = r.camelCase(b), b = b in d ? [b] : b.match(L) || []), c = b.length; while (c--) delete d[b[c]] } (void 0 === b || r.isEmptyObject(d)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando]) } }, hasData: function (a) { var b = a[this.expando]; return void 0 !== b && !r.isEmptyObject(b) } }; var W = new V, X = new V, Y = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Z = /[A-Z]/g; function $(a) { return "true" === a || "false" !== a && ("null" === a ? null : a === +a + "" ? +a : Y.test(a) ? JSON.parse(a) : a) } function _(a, b, c) { var d; if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(Z, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) { try { c = $(c) } catch (e) { } X.set(a, b, c) } else c = void 0; return c } r.extend({ hasData: function (a) { return X.hasData(a) || W.hasData(a) }, data: function (a, b, c) { return X.access(a, b, c) }, removeData: function (a, b) { X.remove(a, b) }, _data: function (a, b, c) { return W.access(a, b, c) }, _removeData: function (a, b) { W.remove(a, b) } }), r.fn.extend({ data: function (a, b) { var c, d, e, f = this[0], g = f && f.attributes; if (void 0 === a) { if (this.length && (e = X.get(f), 1 === f.nodeType && !W.get(f, "hasDataAttrs"))) { c = g.length; while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = r.camelCase(d.slice(5)), _(f, d, e[d]))); W.set(f, "hasDataAttrs", !0) } return e } return "object" == typeof a ? this.each(function () { X.set(this, a) }) : T(this, function (b) { var c; if (f && void 0 === b) { if (c = X.get(f, a), void 0 !== c) return c; if (c = _(f, a), void 0 !== c) return c } else this.each(function () { X.set(this, a, b) }) }, null, b, arguments.length > 1, null, !0) }, removeData: function (a) { return this.each(function () { X.remove(this, a) }) } }), r.extend({ queue: function (a, b, c) { var d; if (a) return b = (b || "fx") + "queue", d = W.get(a, b), c && (!d || Array.isArray(c) ? d = W.access(a, b, r.makeArray(c)) : d.push(c)), d || [] }, dequeue: function (a, b) { b = b || "fx"; var c = r.queue(a, b), d = c.length, e = c.shift(), f = r._queueHooks(a, b), g = function () { r.dequeue(a, b) }; "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire() }, _queueHooks: function (a, b) { var c = b + "queueHooks"; return W.get(a, c) || W.access(a, c, { empty: r.Callbacks("once memory").add(function () { W.remove(a, [b + "queue", c]) }) }) } }), r.fn.extend({ queue: function (a, b) { var c = 2; return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? r.queue(this[0], a) : void 0 === b ? this : this.each(function () { var c = r.queue(this, a, b); r._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && r.dequeue(this, a) }) }, dequeue: function (a) { return this.each(function () { r.dequeue(this, a) }) }, clearQueue: function (a) { return this.queue(a || "fx", []) }, promise: function (a, b) { var c, d = 1, e = r.Deferred(), f = this, g = this.length, h = function () { --d || e.resolveWith(f, [f]) }; "string" != typeof a && (b = a, a = void 0), a = a || "fx"; while (g--) c = W.get(f[g], a + "queueHooks"), c && c.empty && (d++ , c.empty.add(h)); return h(), e.promise(b) } }); var aa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, ba = new RegExp("^(?:([+-])=|)(" + aa + ")([a-z%]*)$", "i"), ca = ["Top", "Right", "Bottom", "Left"], da = function (a, b) { return a = b || a, "none" === a.style.display || "" === a.style.display && r.contains(a.ownerDocument, a) && "none" === r.css(a, "display") }, ea = function (a, b, c, d) { var e, f, g = {}; for (f in b) g[f] = a.style[f], a.style[f] = b[f]; e = c.apply(a, d || []); for (f in b) a.style[f] = g[f]; return e }; function fa(a, b, c, d) { var e, f = 1, g = 20, h = d ? function () { return d.cur() } : function () { return r.css(a, b, "") }, i = h(), j = c && c[3] || (r.cssNumber[b] ? "" : "px"), k = (r.cssNumber[b] || "px" !== j && +i) && ba.exec(r.css(a, b)); if (k && k[3] !== j) { j = j || k[3], c = c || [], k = +i || 1; do f = f || ".5", k /= f, r.style(a, b, k + j); while (f !== (f = h() / i) && 1 !== f && --g) } return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e } var ga = {}; function ha(a) { var b, c = a.ownerDocument, d = a.nodeName, e = ga[d]; return e ? e : (b = c.body.appendChild(c.createElement(d)), e = r.css(b, "display"), b.parentNode.removeChild(b), "none" === e && (e = "block"), ga[d] = e, e) } function ia(a, b) { for (var c, d, e = [], f = 0, g = a.length; f < g; f++)d = a[f], d.style && (c = d.style.display, b ? ("none" === c && (e[f] = W.get(d, "display") || null, e[f] || (d.style.display = "")), "" === d.style.display && da(d) && (e[f] = ha(d))) : "none" !== c && (e[f] = "none", W.set(d, "display", c))); for (f = 0; f < g; f++)null != e[f] && (a[f].style.display = e[f]); return a } r.fn.extend({ show: function () { return ia(this, !0) }, hide: function () { return ia(this) }, toggle: function (a) { return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () { da(this) ? r(this).show() : r(this).hide() }) } }); var ja = /^(?:checkbox|radio)$/i, ka = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, la = /^$|\/(?:java|ecma)script/i, ma = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] }; ma.optgroup = ma.option, ma.tbody = ma.tfoot = ma.colgroup = ma.caption = ma.thead, ma.th = ma.td; function na(a, b) { var c; return c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [], void 0 === b || b && B(a, b) ? r.merge([a], c) : c } function oa(a, b) { for (var c = 0, d = a.length; c < d; c++)W.set(a[c], "globalEval", !b || W.get(b[c], "globalEval")) } var pa = /<|&#?\w+;/; function qa(a, b, c, d, e) { for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; n < o; n++)if (f = a[n], f || 0 === f) if ("object" === r.type(f)) r.merge(m, f.nodeType ? [f] : f); else if (pa.test(f)) { g = g || l.appendChild(b.createElement("div")), h = (ka.exec(f) || ["", ""])[1].toLowerCase(), i = ma[h] || ma._default, g.innerHTML = i[1] + r.htmlPrefilter(f) + i[2], k = i[0]; while (k--) g = g.lastChild; r.merge(m, g.childNodes), g = l.firstChild, g.textContent = "" } else m.push(b.createTextNode(f)); l.textContent = "", n = 0; while (f = m[n++]) if (d && r.inArray(f, d) > -1) e && e.push(f); else if (j = r.contains(f.ownerDocument, f), g = na(l.appendChild(f), "script"), j && oa(g), c) { k = 0; while (f = g[k++]) la.test(f.type || "") && c.push(f) } return l } !function () { var a = d.createDocumentFragment(), b = a.appendChild(d.createElement("div")), c = d.createElement("input"); c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), o.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", o.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue }(); var ra = d.documentElement, sa = /^key/, ta = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, ua = /^([^.]*)(?:\.(.+)|)/; function va() { return !0 } function wa() { return !1 } function xa() { try { return d.activeElement } catch (a) { } } function ya(a, b, c, d, e, f) { var g, h; if ("object" == typeof b) { "string" != typeof c && (d = d || c, c = void 0); for (h in b) ya(a, h, c, d, b[h], f); return a } if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = wa; else if (!e) return a; return 1 === f && (g = e, e = function (a) { return r().off(a), g.apply(this, arguments) }, e.guid = g.guid || (g.guid = r.guid++)), a.each(function () { r.event.add(this, b, e, d, c) }) } r.event = { global: {}, add: function (a, b, c, d, e) { var f, g, h, i, j, k, l, m, n, o, p, q = W.get(a); if (q) { c.handler && (f = c, c = f.handler, e = f.selector), e && r.find.matchesSelector(ra, e), c.guid || (c.guid = r.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function (b) { return "undefined" != typeof r && r.event.triggered !== b.type ? r.event.dispatch.apply(a, arguments) : void 0 }), b = (b || "").match(L) || [""], j = b.length; while (j--) h = ua.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = r.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = r.event.special[n] || {}, k = r.extend({ type: n, origType: p, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && r.expr.match.needsContext.test(e), namespace: o.join(".") }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), r.event.global[n] = !0) } }, remove: function (a, b, c, d, e) { var f, g, h, i, j, k, l, m, n, o, p, q = W.hasData(a) && W.get(a); if (q && (i = q.events)) { b = (b || "").match(L) || [""], j = b.length; while (j--) if (h = ua.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) { l = r.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; while (f--) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount-- , l.remove && l.remove.call(a, k)); g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || r.removeEvent(a, n, q.handle), delete i[n]) } else for (n in i) r.event.remove(a, n + b[j], c, d, !0); r.isEmptyObject(i) && W.remove(a, "handle events") } }, dispatch: function (a) { var b = r.event.fix(a), c, d, e, f, g, h, i = new Array(arguments.length), j = (W.get(this, "events") || {})[b.type] || [], k = r.event.special[b.type] || {}; for (i[0] = b, c = 1; c < arguments.length; c++)i[c] = arguments[c]; if (b.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, b) !== !1) { h = r.event.handlers.call(this, b, j), c = 0; while ((f = h[c++]) && !b.isPropagationStopped()) { b.currentTarget = f.elem, d = 0; while ((g = f.handlers[d++]) && !b.isImmediatePropagationStopped()) b.rnamespace && !b.rnamespace.test(g.namespace) || (b.handleObj = g, b.data = g.data, e = ((r.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (b.result = e) === !1 && (b.preventDefault(), b.stopPropagation())) } return k.postDispatch && k.postDispatch.call(this, b), b.result } }, handlers: function (a, b) { var c, d, e, f, g, h = [], i = b.delegateCount, j = a.target; if (i && j.nodeType && !("click" === a.type && a.button >= 1)) for (; j !== this; j = j.parentNode || this)if (1 === j.nodeType && ("click" !== a.type || j.disabled !== !0)) { for (f = [], g = {}, c = 0; c < i; c++)d = b[c], e = d.selector + " ", void 0 === g[e] && (g[e] = d.needsContext ? r(e, this).index(j) > -1 : r.find(e, this, null, [j]).length), g[e] && f.push(d); f.length && h.push({ elem: j, handlers: f }) } return j = this, i < b.length && h.push({ elem: j, handlers: b.slice(i) }), h }, addProp: function (a, b) { Object.defineProperty(r.Event.prototype, a, { enumerable: !0, configurable: !0, get: r.isFunction(b) ? function () { if (this.originalEvent) return b(this.originalEvent) } : function () { if (this.originalEvent) return this.originalEvent[a] }, set: function (b) { Object.defineProperty(this, a, { enumerable: !0, configurable: !0, writable: !0, value: b }) } }) }, fix: function (a) { return a[r.expando] ? a : new r.Event(a) }, special: { load: { noBubble: !0 }, focus: { trigger: function () { if (this !== xa() && this.focus) return this.focus(), !1 }, delegateType: "focusin" }, blur: { trigger: function () { if (this === xa() && this.blur) return this.blur(), !1 }, delegateType: "focusout" }, click: { trigger: function () { if ("checkbox" === this.type && this.click && B(this, "input")) return this.click(), !1 }, _default: function (a) { return B(a.target, "a") } }, beforeunload: { postDispatch: function (a) { void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result) } } } }, r.removeEvent = function (a, b, c) { a.removeEventListener && a.removeEventListener(b, c) }, r.Event = function (a, b) { return this instanceof r.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? va : wa, this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a, b && r.extend(this, b), this.timeStamp = a && a.timeStamp || r.now(), void (this[r.expando] = !0)) : new r.Event(a, b) }, r.Event.prototype = { constructor: r.Event, isDefaultPrevented: wa, isPropagationStopped: wa, isImmediatePropagationStopped: wa, isSimulated: !1, preventDefault: function () { var a = this.originalEvent; this.isDefaultPrevented = va, a && !this.isSimulated && a.preventDefault() }, stopPropagation: function () { var a = this.originalEvent; this.isPropagationStopped = va, a && !this.isSimulated && a.stopPropagation() }, stopImmediatePropagation: function () { var a = this.originalEvent; this.isImmediatePropagationStopped = va, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation() } }, r.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, "char": !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function (a) { var b = a.button; return null == a.which && sa.test(a.type) ? null != a.charCode ? a.charCode : a.keyCode : !a.which && void 0 !== b && ta.test(a.type) ? 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0 : a.which } }, r.event.addProp), r.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (a, b) { r.event.special[a] = { delegateType: b, bindType: b, handle: function (a) { var c, d = this, e = a.relatedTarget, f = a.handleObj; return e && (e === d || r.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c } } }), r.fn.extend({ on: function (a, b, c, d) { return ya(this, a, b, c, d) }, one: function (a, b, c, d) { return ya(this, a, b, c, d, 1) }, off: function (a, b, c) { var d, e; if (a && a.preventDefault && a.handleObj) return d = a.handleObj, r(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this; if ("object" == typeof a) { for (e in a) this.off(e, b, a[e]); return this } return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = wa), this.each(function () { r.event.remove(this, a, c, b) }) } }); var za = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, Aa = /<script|<style|<link/i, Ba = /checked\s*(?:[^=]|=\s*.checked.)/i, Ca = /^true\/(.*)/, Da = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g; function Ea(a, b) { return B(a, "table") && B(11 !== b.nodeType ? b : b.firstChild, "tr") ? r(">tbody", a)[0] || a : a } function Fa(a) { return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a } function Ga(a) { var b = Ca.exec(a.type); return b ? a.type = b[1] : a.removeAttribute("type"), a } function Ha(a, b) { var c, d, e, f, g, h, i, j; if (1 === b.nodeType) { if (W.hasData(a) && (f = W.access(a), g = W.set(b, f), j = f.events)) { delete g.handle, g.events = {}; for (e in j) for (c = 0, d = j[e].length; c < d; c++)r.event.add(b, e, j[e][c]) } X.hasData(a) && (h = X.access(a), i = r.extend({}, h), X.set(b, i)) } } function Ia(a, b) { var c = b.nodeName.toLowerCase(); "input" === c && ja.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue) } function Ja(a, b, c, d) { b = g.apply([], b); var e, f, h, i, j, k, l = 0, m = a.length, n = m - 1, q = b[0], s = r.isFunction(q); if (s || m > 1 && "string" == typeof q && !o.checkClone && Ba.test(q)) return a.each(function (e) { var f = a.eq(e); s && (b[0] = q.call(this, e, f.html())), Ja(f, b, c, d) }); if (m && (e = qa(b, a[0].ownerDocument, !1, a, d), f = e.firstChild, 1 === e.childNodes.length && (e = f), f || d)) { for (h = r.map(na(e, "script"), Fa), i = h.length; l < m; l++)j = e, l !== n && (j = r.clone(j, !0, !0), i && r.merge(h, na(j, "script"))), c.call(a[l], j, l); if (i) for (k = h[h.length - 1].ownerDocument, r.map(h, Ga), l = 0; l < i; l++)j = h[l], la.test(j.type || "") && !W.access(j, "globalEval") && r.contains(k, j) && (j.src ? r._evalUrl && r._evalUrl(j.src) : p(j.textContent.replace(Da, ""), k)) } return a } function Ka(a, b, c) { for (var d, e = b ? r.filter(b, a) : a, f = 0; null != (d = e[f]); f++)c || 1 !== d.nodeType || r.cleanData(na(d)), d.parentNode && (c && r.contains(d.ownerDocument, d) && oa(na(d, "script")), d.parentNode.removeChild(d)); return a } r.extend({ htmlPrefilter: function (a) { return a.replace(za, "<$1></$2>") }, clone: function (a, b, c) { var d, e, f, g, h = a.cloneNode(!0), i = r.contains(a.ownerDocument, a); if (!(o.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || r.isXMLDoc(a))) for (g = na(h), f = na(a), d = 0, e = f.length; d < e; d++)Ia(f[d], g[d]); if (b) if (c) for (f = f || na(a), g = g || na(h), d = 0, e = f.length; d < e; d++)Ha(f[d], g[d]); else Ha(a, h); return g = na(h, "script"), g.length > 0 && oa(g, !i && na(a, "script")), h }, cleanData: function (a) { for (var b, c, d, e = r.event.special, f = 0; void 0 !== (c = a[f]); f++)if (U(c)) { if (b = c[W.expando]) { if (b.events) for (d in b.events) e[d] ? r.event.remove(c, d) : r.removeEvent(c, d, b.handle); c[W.expando] = void 0 } c[X.expando] && (c[X.expando] = void 0) } } }), r.fn.extend({ detach: function (a) { return Ka(this, a, !0) }, remove: function (a) { return Ka(this, a) }, text: function (a) { return T(this, function (a) { return void 0 === a ? r.text(this) : this.empty().each(function () { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a) }) }, null, a, arguments.length) }, append: function () { return Ja(this, arguments, function (a) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var b = Ea(this, a); b.appendChild(a) } }) }, prepend: function () { return Ja(this, arguments, function (a) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var b = Ea(this, a); b.insertBefore(a, b.firstChild) } }) }, before: function () { return Ja(this, arguments, function (a) { this.parentNode && this.parentNode.insertBefore(a, this) }) }, after: function () { return Ja(this, arguments, function (a) { this.parentNode && this.parentNode.insertBefore(a, this.nextSibling) }) }, empty: function () { for (var a, b = 0; null != (a = this[b]); b++)1 === a.nodeType && (r.cleanData(na(a, !1)), a.textContent = ""); return this }, clone: function (a, b) { return a = null != a && a, b = null == b ? a : b, this.map(function () { return r.clone(this, a, b) }) }, html: function (a) { return T(this, function (a) { var b = this[0] || {}, c = 0, d = this.length; if (void 0 === a && 1 === b.nodeType) return b.innerHTML; if ("string" == typeof a && !Aa.test(a) && !ma[(ka.exec(a) || ["", ""])[1].toLowerCase()]) { a = r.htmlPrefilter(a); try { for (; c < d; c++)b = this[c] || {}, 1 === b.nodeType && (r.cleanData(na(b, !1)), b.innerHTML = a); b = 0 } catch (e) { } } b && this.empty().append(a) }, null, a, arguments.length) }, replaceWith: function () { var a = []; return Ja(this, arguments, function (b) { var c = this.parentNode; r.inArray(this, a) < 0 && (r.cleanData(na(this)), c && c.replaceChild(b, this)) }, a) } }), r.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) { r.fn[a] = function (a) { for (var c, d = [], e = r(a), f = e.length - 1, g = 0; g <= f; g++)c = g === f ? this : this.clone(!0), r(e[g])[b](c), h.apply(d, c.get()); return this.pushStack(d) } }); var La = /^margin/, Ma = new RegExp("^(" + aa + ")(?!px)[a-z%]+$", "i"), Na = function (b) { var c = b.ownerDocument.defaultView; return c && c.opener || (c = a), c.getComputedStyle(b) }; !function () { function b() { if (i) { i.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", i.innerHTML = "", ra.appendChild(h); var b = a.getComputedStyle(i); c = "1%" !== b.top, g = "2px" === b.marginLeft, e = "4px" === b.width, i.style.marginRight = "50%", f = "4px" === b.marginRight, ra.removeChild(h), i = null } } var c, e, f, g, h = d.createElement("div"), i = d.createElement("div"); i.style && (i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", o.clearCloneStyle = "content-box" === i.style.backgroundClip, h.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", h.appendChild(i), r.extend(o, { pixelPosition: function () { return b(), c }, boxSizingReliable: function () { return b(), e }, pixelMarginRight: function () { return b(), f }, reliableMarginLeft: function () { return b(), g } })) }(); function Oa(a, b, c) { var d, e, f, g, h = a.style; return c = c || Na(a), c && (g = c.getPropertyValue(b) || c[b], "" !== g || r.contains(a.ownerDocument, a) || (g = r.style(a, b)), !o.pixelMarginRight() && Ma.test(g) && La.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g } function Pa(a, b) { return { get: function () { return a() ? void delete this.get : (this.get = b).apply(this, arguments) } } } var Qa = /^(none|table(?!-c[ea]).+)/, Ra = /^--/, Sa = { position: "absolute", visibility: "hidden", display: "block" }, Ta = { letterSpacing: "0", fontWeight: "400" }, Ua = ["Webkit", "Moz", "ms"], Va = d.createElement("div").style; function Wa(a) { if (a in Va) return a; var b = a[0].toUpperCase() + a.slice(1), c = Ua.length; while (c--) if (a = Ua[c] + b, a in Va) return a } function Xa(a) { var b = r.cssProps[a]; return b || (b = r.cssProps[a] = Wa(a) || a), b } function Ya(a, b, c) { var d = ba.exec(b); return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b } function Za(a, b, c, d, e) { var f, g = 0; for (f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0; f < 4; f += 2)"margin" === c && (g += r.css(a, c + ca[f], !0, e)), d ? ("content" === c && (g -= r.css(a, "padding" + ca[f], !0, e)), "margin" !== c && (g -= r.css(a, "border" + ca[f] + "Width", !0, e))) : (g += r.css(a, "padding" + ca[f], !0, e), "padding" !== c && (g += r.css(a, "border" + ca[f] + "Width", !0, e))); return g } function $a(a, b, c) { var d, e = Na(a), f = Oa(a, b, e), g = "border-box" === r.css(a, "boxSizing", !1, e); return Ma.test(f) ? f : (d = g && (o.boxSizingReliable() || f === a.style[b]), "auto" === f && (f = a["offset" + b[0].toUpperCase() + b.slice(1)]), f = parseFloat(f) || 0, f + Za(a, b, c || (g ? "border" : "content"), d, e) + "px") } r.extend({ cssHooks: { opacity: { get: function (a, b) { if (b) { var c = Oa(a, "opacity"); return "" === c ? "1" : c } } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": "cssFloat" }, style: function (a, b, c, d) { if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) { var e, f, g, h = r.camelCase(b), i = Ra.test(b), j = a.style; return i || (b = Xa(h)), g = r.cssHooks[b] || r.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : j[b] : (f = typeof c, "string" === f && (e = ba.exec(c)) && e[1] && (c = fa(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (r.cssNumber[h] ? "" : "px")), o.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (j[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i ? j.setProperty(b, c) : j[b] = c)), void 0) } }, css: function (a, b, c, d) { var e, f, g, h = r.camelCase(b), i = Ra.test(b); return i || (b = Xa(h)), g = r.cssHooks[b] || r.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = Oa(a, b, d)), "normal" === e && b in Ta && (e = Ta[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e } }), r.each(["height", "width"], function (a, b) { r.cssHooks[b] = { get: function (a, c, d) { if (c) return !Qa.test(r.css(a, "display")) || a.getClientRects().length && a.getBoundingClientRect().width ? $a(a, b, d) : ea(a, Sa, function () { return $a(a, b, d) }) }, set: function (a, c, d) { var e, f = d && Na(a), g = d && Za(a, b, d, "border-box" === r.css(a, "boxSizing", !1, f), f); return g && (e = ba.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = r.css(a, b)), Ya(a, c, g) } } }), r.cssHooks.marginLeft = Pa(o.reliableMarginLeft, function (a, b) { if (b) return (parseFloat(Oa(a, "marginLeft")) || a.getBoundingClientRect().left - ea(a, { marginLeft: 0 }, function () { return a.getBoundingClientRect().left })) + "px" }), r.each({ margin: "", padding: "", border: "Width" }, function (a, b) { r.cssHooks[a + b] = { expand: function (c) { for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++)e[a + ca[d] + b] = f[d] || f[d - 2] || f[0]; return e } }, La.test(a) || (r.cssHooks[a + b].set = Ya) }), r.fn.extend({ css: function (a, b) { return T(this, function (a, b, c) { var d, e, f = {}, g = 0; if (Array.isArray(b)) { for (d = Na(a), e = b.length; g < e; g++)f[b[g]] = r.css(a, b[g], !1, d); return f } return void 0 !== c ? r.style(a, b, c) : r.css(a, b) }, a, b, arguments.length > 1) } }); function _a(a, b, c, d, e) { return new _a.prototype.init(a, b, c, d, e) } r.Tween = _a, _a.prototype = { constructor: _a, init: function (a, b, c, d, e, f) { this.elem = a, this.prop = c, this.easing = e || r.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (r.cssNumber[c] ? "" : "px") }, cur: function () { var a = _a.propHooks[this.prop]; return a && a.get ? a.get(this) : _a.propHooks._default.get(this) }, run: function (a) { var b, c = _a.propHooks[this.prop]; return this.options.duration ? this.pos = b = r.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : _a.propHooks._default.set(this), this } }, _a.prototype.init.prototype = _a.prototype, _a.propHooks = { _default: { get: function (a) { var b; return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = r.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) }, set: function (a) { r.fx.step[a.prop] ? r.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[r.cssProps[a.prop]] && !r.cssHooks[a.prop] ? a.elem[a.prop] = a.now : r.style(a.elem, a.prop, a.now + a.unit) } } }, _a.propHooks.scrollTop = _a.propHooks.scrollLeft = { set: function (a) { a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now) } }, r.easing = { linear: function (a) { return a }, swing: function (a) { return .5 - Math.cos(a * Math.PI) / 2 }, _default: "swing" }, r.fx = _a.prototype.init, r.fx.step = {}; var ab, bb, cb = /^(?:toggle|show|hide)$/, db = /queueHooks$/; function eb() { bb && (d.hidden === !1 && a.requestAnimationFrame ? a.requestAnimationFrame(eb) : a.setTimeout(eb, r.fx.interval), r.fx.tick()) } function fb() { return a.setTimeout(function () { ab = void 0 }), ab = r.now() } function gb(a, b) { var c, d = 0, e = { height: a }; for (b = b ? 1 : 0; d < 4; d += 2 - b)c = ca[d], e["margin" + c] = e["padding" + c] = a; return b && (e.opacity = e.width = a), e } function hb(a, b, c) { for (var d, e = (kb.tweeners[b] || []).concat(kb.tweeners["*"]), f = 0, g = e.length; f < g; f++)if (d = e[f].call(c, b, a)) return d } function ib(a, b, c) { var d, e, f, g, h, i, j, k, l = "width" in b || "height" in b, m = this, n = {}, o = a.style, p = a.nodeType && da(a), q = W.get(a, "fxshow"); c.queue || (g = r._queueHooks(a, "fx"), null == g.unqueued && (g.unqueued = 0, h = g.empty.fire, g.empty.fire = function () { g.unqueued || h() }), g.unqueued++ , m.always(function () { m.always(function () { g.unqueued-- , r.queue(a, "fx").length || g.empty.fire() }) })); for (d in b) if (e = b[d], cb.test(e)) { if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) { if ("show" !== e || !q || void 0 === q[d]) continue; p = !0 } n[d] = q && q[d] || r.style(a, d) } if (i = !r.isEmptyObject(b), i || !r.isEmptyObject(n)) { l && 1 === a.nodeType && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = q && q.display, null == j && (j = W.get(a, "display")), k = r.css(a, "display"), "none" === k && (j ? k = j : (ia([a], !0), j = a.style.display || j, k = r.css(a, "display"), ia([a]))), ("inline" === k || "inline-block" === k && null != j) && "none" === r.css(a, "float") && (i || (m.done(function () { o.display = j }), null == j && (k = o.display, j = "none" === k ? "" : k)), o.display = "inline-block")), c.overflow && (o.overflow = "hidden", m.always(function () { o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2] })), i = !1; for (d in n) i || (q ? "hidden" in q && (p = q.hidden) : q = W.access(a, "fxshow", { display: j }), f && (q.hidden = !p), p && ia([a], !0), m.done(function () { p || ia([a]), W.remove(a, "fxshow"); for (d in n) r.style(a, d, n[d]) })), i = hb(p ? q[d] : 0, d, m), d in q || (q[d] = i.start, p && (i.end = i.start, i.start = 0)) } } function jb(a, b) { var c, d, e, f, g; for (c in a) if (d = r.camelCase(c), e = b[d], f = a[c], Array.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = r.cssHooks[d], g && "expand" in g) { f = g.expand(f), delete a[d]; for (c in f) c in a || (a[c] = f[c], b[c] = e) } else b[d] = e } function kb(a, b, c) { var d, e, f = 0, g = kb.prefilters.length, h = r.Deferred().always(function () { delete i.elem }), i = function () { if (e) return !1; for (var b = ab || fb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++)j.tweens[g].run(f); return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (i || h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j]), !1) }, j = h.promise({ elem: a, props: r.extend({}, b), opts: r.extend(!0, { specialEasing: {}, easing: r.easing._default }, c), originalProperties: b, originalOptions: c, startTime: ab || fb(), duration: c.duration, tweens: [], createTween: function (b, c) { var d = r.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing); return j.tweens.push(d), d }, stop: function (b) { var c = 0, d = b ? j.tweens.length : 0; if (e) return this; for (e = !0; c < d; c++)j.tweens[c].run(1); return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this } }), k = j.props; for (jb(k, j.opts.specialEasing); f < g; f++)if (d = kb.prefilters[f].call(j, a, k, j.opts)) return r.isFunction(d.stop) && (r._queueHooks(j.elem, j.opts.queue).stop = r.proxy(d.stop, d)), d; return r.map(k, hb, j), r.isFunction(j.opts.start) && j.opts.start.call(a, j), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always), r.fx.timer(r.extend(i, { elem: a, anim: j, queue: j.opts.queue })), j } r.Animation = r.extend(kb, { tweeners: { "*": [function (a, b) { var c = this.createTween(a, b); return fa(c.elem, a, ba.exec(b), c), c }] }, tweener: function (a, b) { r.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(L); for (var c, d = 0, e = a.length; d < e; d++)c = a[d], kb.tweeners[c] = kb.tweeners[c] || [], kb.tweeners[c].unshift(b) }, prefilters: [ib], prefilter: function (a, b) { b ? kb.prefilters.unshift(a) : kb.prefilters.push(a) } }), r.speed = function (a, b, c) { var d = a && "object" == typeof a ? r.extend({}, a) : { complete: c || !c && b || r.isFunction(a) && a, duration: a, easing: c && b || b && !r.isFunction(b) && b }; return r.fx.off ? d.duration = 0 : "number" != typeof d.duration && (d.duration in r.fx.speeds ? d.duration = r.fx.speeds[d.duration] : d.duration = r.fx.speeds._default), null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function () { r.isFunction(d.old) && d.old.call(this), d.queue && r.dequeue(this, d.queue) }, d }, r.fn.extend({ fadeTo: function (a, b, c, d) { return this.filter(da).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d) }, animate: function (a, b, c, d) { var e = r.isEmptyObject(a), f = r.speed(b, c, d), g = function () { var b = kb(this, r.extend({}, a), f); (e || W.get(this, "finish")) && b.stop(!0) }; return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g) }, stop: function (a, b, c) { var d = function (a) { var b = a.stop; delete a.stop, b(c) }; return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () { var b = !0, e = null != a && a + "queueHooks", f = r.timers, g = W.get(this); if (e) g[e] && g[e].stop && d(g[e]); else for (e in g) g[e] && g[e].stop && db.test(e) && d(g[e]); for (e = f.length; e--;)f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1)); !b && c || r.dequeue(this, a) }) }, finish: function (a) { return a !== !1 && (a = a || "fx"), this.each(function () { var b, c = W.get(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = r.timers, g = d ? d.length : 0; for (c.finish = !0, r.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;)f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1)); for (b = 0; b < g; b++)d[b] && d[b].finish && d[b].finish.call(this); delete c.finish }) } }), r.each(["toggle", "show", "hide"], function (a, b) { var c = r.fn[b]; r.fn[b] = function (a, d, e) { return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gb(b, !0), a, d, e) } }), r.each({ slideDown: gb("show"), slideUp: gb("hide"), slideToggle: gb("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) { r.fn[a] = function (a, c, d) { return this.animate(b, a, c, d) } }), r.timers = [], r.fx.tick = function () { var a, b = 0, c = r.timers; for (ab = r.now(); b < c.length; b++)a = c[b], a() || c[b] !== a || c.splice(b--, 1); c.length || r.fx.stop(), ab = void 0 }, r.fx.timer = function (a) { r.timers.push(a), r.fx.start() }, r.fx.interval = 13, r.fx.start = function () { bb || (bb = !0, eb()) }, r.fx.stop = function () { bb = null }, r.fx.speeds = { slow: 600, fast: 200, _default: 400 }, r.fn.delay = function (b, c) { return b = r.fx ? r.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function (c, d) { var e = a.setTimeout(c, b); d.stop = function () { a.clearTimeout(e) } }) }, function () { var a = d.createElement("input"), b = d.createElement("select"), c = b.appendChild(d.createElement("option")); a.type = "checkbox", o.checkOn = "" !== a.value, o.optSelected = c.selected, a = d.createElement("input"), a.value = "t", a.type = "radio", o.radioValue = "t" === a.value }(); var lb, mb = r.expr.attrHandle; r.fn.extend({ attr: function (a, b) { return T(this, r.attr, a, b, arguments.length > 1) }, removeAttr: function (a) { return this.each(function () { r.removeAttr(this, a) }) } }), r.extend({
        attr: function (a, b, c) {
            var d, e, f = a.nodeType; if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? r.prop(a, b, c) : (1 === f && r.isXMLDoc(a) || (e = r.attrHooks[b.toLowerCase()] || (r.expr.match.bool.test(b) ? lb : void 0)), void 0 !== c ? null === c ? void r.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = r.find.attr(a, b),
                null == d ? void 0 : d))
        }, attrHooks: { type: { set: function (a, b) { if (!o.radioValue && "radio" === b && B(a, "input")) { var c = a.value; return a.setAttribute("type", b), c && (a.value = c), b } } } }, removeAttr: function (a, b) { var c, d = 0, e = b && b.match(L); if (e && 1 === a.nodeType) while (c = e[d++]) a.removeAttribute(c) }
    }), lb = { set: function (a, b, c) { return b === !1 ? r.removeAttr(a, c) : a.setAttribute(c, c), c } }, r.each(r.expr.match.bool.source.match(/\w+/g), function (a, b) { var c = mb[b] || r.find.attr; mb[b] = function (a, b, d) { var e, f, g = b.toLowerCase(); return d || (f = mb[g], mb[g] = e, e = null != c(a, b, d) ? g : null, mb[g] = f), e } }); var nb = /^(?:input|select|textarea|button)$/i, ob = /^(?:a|area)$/i; r.fn.extend({ prop: function (a, b) { return T(this, r.prop, a, b, arguments.length > 1) }, removeProp: function (a) { return this.each(function () { delete this[r.propFix[a] || a] }) } }), r.extend({ prop: function (a, b, c) { var d, e, f = a.nodeType; if (3 !== f && 8 !== f && 2 !== f) return 1 === f && r.isXMLDoc(a) || (b = r.propFix[b] || b, e = r.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b] }, propHooks: { tabIndex: { get: function (a) { var b = r.find.attr(a, "tabindex"); return b ? parseInt(b, 10) : nb.test(a.nodeName) || ob.test(a.nodeName) && a.href ? 0 : -1 } } }, propFix: { "for": "htmlFor", "class": "className" } }), o.optSelected || (r.propHooks.selected = { get: function (a) { var b = a.parentNode; return b && b.parentNode && b.parentNode.selectedIndex, null }, set: function (a) { var b = a.parentNode; b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex) } }), r.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () { r.propFix[this.toLowerCase()] = this }); function pb(a) { var b = a.match(L) || []; return b.join(" ") } function qb(a) { return a.getAttribute && a.getAttribute("class") || "" } r.fn.extend({ addClass: function (a) { var b, c, d, e, f, g, h, i = 0; if (r.isFunction(a)) return this.each(function (b) { r(this).addClass(a.call(this, b, qb(this))) }); if ("string" == typeof a && a) { b = a.match(L) || []; while (c = this[i++]) if (e = qb(c), d = 1 === c.nodeType && " " + pb(e) + " ") { g = 0; while (f = b[g++]) d.indexOf(" " + f + " ") < 0 && (d += f + " "); h = pb(d), e !== h && c.setAttribute("class", h) } } return this }, removeClass: function (a) { var b, c, d, e, f, g, h, i = 0; if (r.isFunction(a)) return this.each(function (b) { r(this).removeClass(a.call(this, b, qb(this))) }); if (!arguments.length) return this.attr("class", ""); if ("string" == typeof a && a) { b = a.match(L) || []; while (c = this[i++]) if (e = qb(c), d = 1 === c.nodeType && " " + pb(e) + " ") { g = 0; while (f = b[g++]) while (d.indexOf(" " + f + " ") > -1) d = d.replace(" " + f + " ", " "); h = pb(d), e !== h && c.setAttribute("class", h) } } return this }, toggleClass: function (a, b) { var c = typeof a; return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : r.isFunction(a) ? this.each(function (c) { r(this).toggleClass(a.call(this, c, qb(this), b), b) }) : this.each(function () { var b, d, e, f; if ("string" === c) { d = 0, e = r(this), f = a.match(L) || []; while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b) } else void 0 !== a && "boolean" !== c || (b = qb(this), b && W.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : W.get(this, "__className__") || "")) }) }, hasClass: function (a) { var b, c, d = 0; b = " " + a + " "; while (c = this[d++]) if (1 === c.nodeType && (" " + pb(qb(c)) + " ").indexOf(b) > -1) return !0; return !1 } }); var rb = /\r/g; r.fn.extend({ val: function (a) { var b, c, d, e = this[0]; { if (arguments.length) return d = r.isFunction(a), this.each(function (c) { var e; 1 === this.nodeType && (e = d ? a.call(this, c, r(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = r.map(e, function (a) { return null == a ? "" : a + "" })), b = r.valHooks[this.type] || r.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e)) }); if (e) return b = r.valHooks[e.type] || r.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(rb, "") : null == c ? "" : c) } } }), r.extend({ valHooks: { option: { get: function (a) { var b = r.find.attr(a, "value"); return null != b ? b : pb(r.text(a)) } }, select: { get: function (a) { var b, c, d, e = a.options, f = a.selectedIndex, g = "select-one" === a.type, h = g ? null : [], i = g ? f + 1 : e.length; for (d = f < 0 ? i : g ? f : 0; d < i; d++)if (c = e[d], (c.selected || d === f) && !c.disabled && (!c.parentNode.disabled || !B(c.parentNode, "optgroup"))) { if (b = r(c).val(), g) return b; h.push(b) } return h }, set: function (a, b) { var c, d, e = a.options, f = r.makeArray(b), g = e.length; while (g--) d = e[g], (d.selected = r.inArray(r.valHooks.option.get(d), f) > -1) && (c = !0); return c || (a.selectedIndex = -1), f } } } }), r.each(["radio", "checkbox"], function () { r.valHooks[this] = { set: function (a, b) { if (Array.isArray(b)) return a.checked = r.inArray(r(a).val(), b) > -1 } }, o.checkOn || (r.valHooks[this].get = function (a) { return null === a.getAttribute("value") ? "on" : a.value }) }); var sb = /^(?:focusinfocus|focusoutblur)$/; r.extend(r.event, { trigger: function (b, c, e, f) { var g, h, i, j, k, m, n, o = [e || d], p = l.call(b, "type") ? b.type : b, q = l.call(b, "namespace") ? b.namespace.split(".") : []; if (h = i = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !sb.test(p + r.event.triggered) && (p.indexOf(".") > -1 && (q = p.split("."), p = q.shift(), q.sort()), k = p.indexOf(":") < 0 && "on" + p, b = b[r.expando] ? b : new r.Event(p, "object" == typeof b && b), b.isTrigger = f ? 2 : 3, b.namespace = q.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : r.makeArray(c, [b]), n = r.event.special[p] || {}, f || !n.trigger || n.trigger.apply(e, c) !== !1)) { if (!f && !n.noBubble && !r.isWindow(e)) { for (j = n.delegateType || p, sb.test(j + p) || (h = h.parentNode); h; h = h.parentNode)o.push(h), i = h; i === (e.ownerDocument || d) && o.push(i.defaultView || i.parentWindow || a) } g = 0; while ((h = o[g++]) && !b.isPropagationStopped()) b.type = g > 1 ? j : n.bindType || p, m = (W.get(h, "events") || {})[b.type] && W.get(h, "handle"), m && m.apply(h, c), m = k && h[k], m && m.apply && U(h) && (b.result = m.apply(h, c), b.result === !1 && b.preventDefault()); return b.type = p, f || b.isDefaultPrevented() || n._default && n._default.apply(o.pop(), c) !== !1 || !U(e) || k && r.isFunction(e[p]) && !r.isWindow(e) && (i = e[k], i && (e[k] = null), r.event.triggered = p, e[p](), r.event.triggered = void 0, i && (e[k] = i)), b.result } }, simulate: function (a, b, c) { var d = r.extend(new r.Event, c, { type: a, isSimulated: !0 }); r.event.trigger(d, null, b) } }), r.fn.extend({ trigger: function (a, b) { return this.each(function () { r.event.trigger(a, b, this) }) }, triggerHandler: function (a, b) { var c = this[0]; if (c) return r.event.trigger(a, b, c, !0) } }), r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (a, b) { r.fn[b] = function (a, c) { return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b) } }), r.fn.extend({ hover: function (a, b) { return this.mouseenter(a).mouseleave(b || a) } }), o.focusin = "onfocusin" in a, o.focusin || r.each({ focus: "focusin", blur: "focusout" }, function (a, b) { var c = function (a) { r.event.simulate(b, a.target, r.event.fix(a)) }; r.event.special[b] = { setup: function () { var d = this.ownerDocument || this, e = W.access(d, b); e || d.addEventListener(a, c, !0), W.access(d, b, (e || 0) + 1) }, teardown: function () { var d = this.ownerDocument || this, e = W.access(d, b) - 1; e ? W.access(d, b, e) : (d.removeEventListener(a, c, !0), W.remove(d, b)) } } }); var tb = a.location, ub = r.now(), vb = /\?/; r.parseXML = function (b) { var c; if (!b || "string" != typeof b) return null; try { c = (new a.DOMParser).parseFromString(b, "text/xml") } catch (d) { c = void 0 } return c && !c.getElementsByTagName("parsererror").length || r.error("Invalid XML: " + b), c }; var wb = /\[\]$/, xb = /\r?\n/g, yb = /^(?:submit|button|image|reset|file)$/i, zb = /^(?:input|select|textarea|keygen)/i; function Ab(a, b, c, d) { var e; if (Array.isArray(b)) r.each(b, function (b, e) { c || wb.test(a) ? d(a, e) : Ab(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d) }); else if (c || "object" !== r.type(b)) d(a, b); else for (e in b) Ab(a + "[" + e + "]", b[e], c, d) } r.param = function (a, b) { var c, d = [], e = function (a, b) { var c = r.isFunction(b) ? b() : b; d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c) }; if (Array.isArray(a) || a.jquery && !r.isPlainObject(a)) r.each(a, function () { e(this.name, this.value) }); else for (c in a) Ab(c, a[c], b, e); return d.join("&") }, r.fn.extend({ serialize: function () { return r.param(this.serializeArray()) }, serializeArray: function () { return this.map(function () { var a = r.prop(this, "elements"); return a ? r.makeArray(a) : this }).filter(function () { var a = this.type; return this.name && !r(this).is(":disabled") && zb.test(this.nodeName) && !yb.test(a) && (this.checked || !ja.test(a)) }).map(function (a, b) { var c = r(this).val(); return null == c ? null : Array.isArray(c) ? r.map(c, function (a) { return { name: b.name, value: a.replace(xb, "\r\n") } }) : { name: b.name, value: c.replace(xb, "\r\n") } }).get() } }); var Bb = /%20/g, Cb = /#.*$/, Db = /([?&])_=[^&]*/, Eb = /^(.*?):[ \t]*([^\r\n]*)$/gm, Fb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Gb = /^(?:GET|HEAD)$/, Hb = /^\/\//, Ib = {}, Jb = {}, Kb = "*/".concat("*"), Lb = d.createElement("a"); Lb.href = tb.href; function Mb(a) { return function (b, c) { "string" != typeof b && (c = b, b = "*"); var d, e = 0, f = b.toLowerCase().match(L) || []; if (r.isFunction(c)) while (d = f[e++]) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c) } } function Nb(a, b, c, d) { var e = {}, f = a === Jb; function g(h) { var i; return e[h] = !0, r.each(a[h] || [], function (a, h) { var j = h(b, c, d); return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1) }), i } return g(b.dataTypes[0]) || !e["*"] && g("*") } function Ob(a, b) { var c, d, e = r.ajaxSettings.flatOptions || {}; for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]); return d && r.extend(!0, a, d), a } function Pb(a, b, c) { var d, e, f, g, h = a.contents, i = a.dataTypes; while ("*" === i[0]) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type")); if (d) for (e in h) if (h[e] && h[e].test(d)) { i.unshift(e); break } if (i[0] in c) f = i[0]; else { for (e in c) { if (!i[0] || a.converters[e + " " + i[0]]) { f = e; break } g || (g = e) } f = f || g } if (f) return f !== i[0] && i.unshift(f), c[f] } function Qb(a, b, c, d) { var e, f, g, h, i, j = {}, k = a.dataTypes.slice(); if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g]; f = k.shift(); while (f) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i; else if ("*" !== i && i !== f) { if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) { g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1])); break } if (g !== !0) if (g && a["throws"]) b = g(b); else try { b = g(b) } catch (l) { return { state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f } } } return { state: "success", data: b } } r.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: tb.href, type: "GET", isLocal: Fb.test(tb.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Kb, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": r.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function (a, b) { return b ? Ob(Ob(a, r.ajaxSettings), b) : Ob(r.ajaxSettings, a) }, ajaxPrefilter: Mb(Ib), ajaxTransport: Mb(Jb), ajax: function (b, c) { "object" == typeof b && (c = b, b = void 0), c = c || {}; var e, f, g, h, i, j, k, l, m, n, o = r.ajaxSetup({}, c), p = o.context || o, q = o.context && (p.nodeType || p.jquery) ? r(p) : r.event, s = r.Deferred(), t = r.Callbacks("once memory"), u = o.statusCode || {}, v = {}, w = {}, x = "canceled", y = { readyState: 0, getResponseHeader: function (a) { var b; if (k) { if (!h) { h = {}; while (b = Eb.exec(g)) h[b[1].toLowerCase()] = b[2] } b = h[a.toLowerCase()] } return null == b ? null : b }, getAllResponseHeaders: function () { return k ? g : null }, setRequestHeader: function (a, b) { return null == k && (a = w[a.toLowerCase()] = w[a.toLowerCase()] || a, v[a] = b), this }, overrideMimeType: function (a) { return null == k && (o.mimeType = a), this }, statusCode: function (a) { var b; if (a) if (k) y.always(a[y.status]); else for (b in a) u[b] = [u[b], a[b]]; return this }, abort: function (a) { var b = a || x; return e && e.abort(b), A(0, b), this } }; if (s.promise(y), o.url = ((b || o.url || tb.href) + "").replace(Hb, tb.protocol + "//"), o.type = c.method || c.type || o.method || o.type, o.dataTypes = (o.dataType || "*").toLowerCase().match(L) || [""], null == o.crossDomain) { j = d.createElement("a"); try { j.href = o.url, j.href = j.href, o.crossDomain = Lb.protocol + "//" + Lb.host != j.protocol + "//" + j.host } catch (z) { o.crossDomain = !0 } } if (o.data && o.processData && "string" != typeof o.data && (o.data = r.param(o.data, o.traditional)), Nb(Ib, o, c, y), k) return y; l = r.event && o.global, l && 0 === r.active++ && r.event.trigger("ajaxStart"), o.type = o.type.toUpperCase(), o.hasContent = !Gb.test(o.type), f = o.url.replace(Cb, ""), o.hasContent ? o.data && o.processData && 0 === (o.contentType || "").indexOf("application/x-www-form-urlencoded") && (o.data = o.data.replace(Bb, "+")) : (n = o.url.slice(f.length), o.data && (f += (vb.test(f) ? "&" : "?") + o.data, delete o.data), o.cache === !1 && (f = f.replace(Db, "$1"), n = (vb.test(f) ? "&" : "?") + "_=" + ub++ + n), o.url = f + n), o.ifModified && (r.lastModified[f] && y.setRequestHeader("If-Modified-Since", r.lastModified[f]), r.etag[f] && y.setRequestHeader("If-None-Match", r.etag[f])), (o.data && o.hasContent && o.contentType !== !1 || c.contentType) && y.setRequestHeader("Content-Type", o.contentType), y.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + Kb + "; q=0.01" : "") : o.accepts["*"]); for (m in o.headers) y.setRequestHeader(m, o.headers[m]); if (o.beforeSend && (o.beforeSend.call(p, y, o) === !1 || k)) return y.abort(); if (x = "abort", t.add(o.complete), y.done(o.success), y.fail(o.error), e = Nb(Jb, o, c, y)) { if (y.readyState = 1, l && q.trigger("ajaxSend", [y, o]), k) return y; o.async && o.timeout > 0 && (i = a.setTimeout(function () { y.abort("timeout") }, o.timeout)); try { k = !1, e.send(v, A) } catch (z) { if (k) throw z; A(-1, z) } } else A(-1, "No Transport"); function A(b, c, d, h) { var j, m, n, v, w, x = c; k || (k = !0, i && a.clearTimeout(i), e = void 0, g = h || "", y.readyState = b > 0 ? 4 : 0, j = b >= 200 && b < 300 || 304 === b, d && (v = Pb(o, y, d)), v = Qb(o, v, y, j), j ? (o.ifModified && (w = y.getResponseHeader("Last-Modified"), w && (r.lastModified[f] = w), w = y.getResponseHeader("etag"), w && (r.etag[f] = w)), 204 === b || "HEAD" === o.type ? x = "nocontent" : 304 === b ? x = "notmodified" : (x = v.state, m = v.data, n = v.error, j = !n)) : (n = x, !b && x || (x = "error", b < 0 && (b = 0))), y.status = b, y.statusText = (c || x) + "", j ? s.resolveWith(p, [m, x, y]) : s.rejectWith(p, [y, x, n]), y.statusCode(u), u = void 0, l && q.trigger(j ? "ajaxSuccess" : "ajaxError", [y, o, j ? m : n]), t.fireWith(p, [y, x]), l && (q.trigger("ajaxComplete", [y, o]), --r.active || r.event.trigger("ajaxStop"))) } return y }, getJSON: function (a, b, c) { return r.get(a, b, c, "json") }, getScript: function (a, b) { return r.get(a, void 0, b, "script") } }), r.each(["get", "post"], function (a, b) { r[b] = function (a, c, d, e) { return r.isFunction(c) && (e = e || d, d = c, c = void 0), r.ajax(r.extend({ url: a, type: b, dataType: e, data: c, success: d }, r.isPlainObject(a) && a)) } }), r._evalUrl = function (a) { return r.ajax({ url: a, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0 }) }, r.fn.extend({ wrapAll: function (a) { var b; return this[0] && (r.isFunction(a) && (a = a.call(this[0])), b = r(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () { var a = this; while (a.firstElementChild) a = a.firstElementChild; return a }).append(this)), this }, wrapInner: function (a) { return r.isFunction(a) ? this.each(function (b) { r(this).wrapInner(a.call(this, b)) }) : this.each(function () { var b = r(this), c = b.contents(); c.length ? c.wrapAll(a) : b.append(a) }) }, wrap: function (a) { var b = r.isFunction(a); return this.each(function (c) { r(this).wrapAll(b ? a.call(this, c) : a) }) }, unwrap: function (a) { return this.parent(a).not("body").each(function () { r(this).replaceWith(this.childNodes) }), this } }), r.expr.pseudos.hidden = function (a) { return !r.expr.pseudos.visible(a) }, r.expr.pseudos.visible = function (a) { return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length) }, r.ajaxSettings.xhr = function () { try { return new a.XMLHttpRequest } catch (b) { } }; var Rb = { 0: 200, 1223: 204 }, Sb = r.ajaxSettings.xhr(); o.cors = !!Sb && "withCredentials" in Sb, o.ajax = Sb = !!Sb, r.ajaxTransport(function (b) { var c, d; if (o.cors || Sb && !b.crossDomain) return { send: function (e, f) { var g, h = b.xhr(); if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields) for (g in b.xhrFields) h[g] = b.xhrFields[g]; b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"); for (g in e) h.setRequestHeader(g, e[g]); c = function (a) { return function () { c && (c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Rb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? { binary: h.response } : { text: h.responseText }, h.getAllResponseHeaders())) } }, h.onload = c(), d = h.onerror = c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function () { 4 === h.readyState && a.setTimeout(function () { c && d() }) }, c = c("abort"); try { h.send(b.hasContent && b.data || null) } catch (i) { if (c) throw i } }, abort: function () { c && c() } } }), r.ajaxPrefilter(function (a) { a.crossDomain && (a.contents.script = !1) }), r.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function (a) { return r.globalEval(a), a } } }), r.ajaxPrefilter("script", function (a) { void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET") }), r.ajaxTransport("script", function (a) { if (a.crossDomain) { var b, c; return { send: function (e, f) { b = r("<script>").prop({ charset: a.scriptCharset, src: a.url }).on("load error", c = function (a) { b.remove(), c = null, a && f("error" === a.type ? 404 : 200, a.type) }), d.head.appendChild(b[0]) }, abort: function () { c && c() } } } }); var Tb = [], Ub = /(=)\?(?=&|$)|\?\?/; r.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { var a = Tb.pop() || r.expando + "_" + ub++; return this[a] = !0, a } }), r.ajaxPrefilter("json jsonp", function (b, c, d) { var e, f, g, h = b.jsonp !== !1 && (Ub.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Ub.test(b.data) && "data"); if (h || "jsonp" === b.dataTypes[0]) return e = b.jsonpCallback = r.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Ub, "$1" + e) : b.jsonp !== !1 && (b.url += (vb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () { return g || r.error(e + " was not called"), g[0] }, b.dataTypes[0] = "json", f = a[e], a[e] = function () { g = arguments }, d.always(function () { void 0 === f ? r(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Tb.push(e)), g && r.isFunction(f) && f(g[0]), g = f = void 0 }), "script" }), o.createHTMLDocument = function () { var a = d.implementation.createHTMLDocument("").body; return a.innerHTML = "<form></form><form></form>", 2 === a.childNodes.length }(), r.parseHTML = function (a, b, c) { if ("string" != typeof a) return []; "boolean" == typeof b && (c = b, b = !1); var e, f, g; return b || (o.createHTMLDocument ? (b = d.implementation.createHTMLDocument(""), e = b.createElement("base"), e.href = d.location.href, b.head.appendChild(e)) : b = d), f = C.exec(a), g = !c && [], f ? [b.createElement(f[1])] : (f = qa([a], b, g), g && g.length && r(g).remove(), r.merge([], f.childNodes)) }, r.fn.load = function (a, b, c) { var d, e, f, g = this, h = a.indexOf(" "); return h > -1 && (d = pb(a.slice(h)), a = a.slice(0, h)), r.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && r.ajax({ url: a, type: e || "GET", dataType: "html", data: b }).done(function (a) { f = arguments, g.html(d ? r("<div>").append(r.parseHTML(a)).find(d) : a) }).always(c && function (a, b) { g.each(function () { c.apply(this, f || [a.responseText, b, a]) }) }), this }, r.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) { r.fn[b] = function (a) { return this.on(b, a) } }), r.expr.pseudos.animated = function (a) { return r.grep(r.timers, function (b) { return a === b.elem }).length }, r.offset = { setOffset: function (a, b, c) { var d, e, f, g, h, i, j, k = r.css(a, "position"), l = r(a), m = {}; "static" === k && (a.style.position = "relative"), h = l.offset(), f = r.css(a, "top"), i = r.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), r.isFunction(b) && (b = b.call(a, c, r.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m) } }, r.fn.extend({ offset: function (a) { if (arguments.length) return void 0 === a ? this : this.each(function (b) { r.offset.setOffset(this, a, b) }); var b, c, d, e, f = this[0]; if (f) return f.getClientRects().length ? (d = f.getBoundingClientRect(), b = f.ownerDocument, c = b.documentElement, e = b.defaultView, { top: d.top + e.pageYOffset - c.clientTop, left: d.left + e.pageXOffset - c.clientLeft }) : { top: 0, left: 0 } }, position: function () { if (this[0]) { var a, b, c = this[0], d = { top: 0, left: 0 }; return "fixed" === r.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), B(a[0], "html") || (d = a.offset()), d = { top: d.top + r.css(a[0], "borderTopWidth", !0), left: d.left + r.css(a[0], "borderLeftWidth", !0) }), { top: b.top - d.top - r.css(c, "marginTop", !0), left: b.left - d.left - r.css(c, "marginLeft", !0) } } }, offsetParent: function () { return this.map(function () { var a = this.offsetParent; while (a && "static" === r.css(a, "position")) a = a.offsetParent; return a || ra }) } }), r.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, b) { var c = "pageYOffset" === b; r.fn[a] = function (d) { return T(this, function (a, d, e) { var f; return r.isWindow(a) ? f = a : 9 === a.nodeType && (f = a.defaultView), void 0 === e ? f ? f[b] : a[d] : void (f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e) }, a, d, arguments.length) } }), r.each(["top", "left"], function (a, b) { r.cssHooks[b] = Pa(o.pixelPosition, function (a, c) { if (c) return c = Oa(a, b), Ma.test(c) ? r(a).position()[b] + "px" : c }) }), r.each({ Height: "height", Width: "width" }, function (a, b) { r.each({ padding: "inner" + a, content: b, "": "outer" + a }, function (c, d) { r.fn[d] = function (e, f) { var g = arguments.length && (c || "boolean" != typeof e), h = c || (e === !0 || f === !0 ? "margin" : "border"); return T(this, function (b, c, e) { var f; return r.isWindow(b) ? 0 === d.indexOf("outer") ? b["inner" + a] : b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? r.css(b, c, h) : r.style(b, c, e, h) }, b, g ? e : void 0, g) } }) }), r.fn.extend({ bind: function (a, b, c) { return this.on(a, null, b, c) }, unbind: function (a, b) { return this.off(a, null, b) }, delegate: function (a, b, c, d) { return this.on(b, a, c, d) }, undelegate: function (a, b, c) { return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c) } }), r.holdReady = function (a) { a ? r.readyWait++ : r.ready(!0) }, r.isArray = Array.isArray, r.parseJSON = JSON.parse, r.nodeName = B, "function" == typeof define && define.amd && define("jquery", [], function () { return r }); var Vb = a.jQuery, Wb = a.$; return r.noConflict = function (b) { return a.$ === r && (a.$ = Wb), b && a.jQuery === r && (a.jQuery = Vb), r }, b || (a.jQuery = a.$ = r), r
});

/*! jQuery Migrate v3.0.0 | (c) jQuery Foundation and other contributors | jquery.org/license */
"undefined" == typeof jQuery.migrateMute && (jQuery.migrateMute = !0), function (a, b) { "use strict"; function c(c) { var d = b.console; e[c] || (e[c] = !0, a.migrateWarnings.push(c), d && d.warn && !a.migrateMute && (d.warn("JQMIGRATE: " + c), a.migrateTrace && d.trace && d.trace())) } function d(a, b, d, e) { Object.defineProperty(a, b, { configurable: !0, enumerable: !0, get: function () { return c(e), d } }) } a.migrateVersion = "3.0.0", function () { var c = b.console && b.console.log && function () { b.console.log.apply(b.console, arguments) }, d = /^[12]\./; c && (a && !d.test(a.fn.jquery) || c("JQMIGRATE: jQuery 3.0.0+ REQUIRED"), a.migrateWarnings && c("JQMIGRATE: Migrate plugin loaded multiple times"), c("JQMIGRATE: Migrate is installed" + (a.migrateMute ? "" : " with logging active") + ", version " + a.migrateVersion)) }(); var e = {}; a.migrateWarnings = [], void 0 === a.migrateTrace && (a.migrateTrace = !0), a.migrateReset = function () { e = {}, a.migrateWarnings.length = 0 }, "BackCompat" === document.compatMode && c("jQuery is not compatible with Quirks Mode"); var f = a.fn.init, g = a.isNumeric, h = a.find, i = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/, j = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g; a.fn.init = function (a) { var b = Array.prototype.slice.call(arguments); return "string" == typeof a && "#" === a && (c("jQuery( '#' ) is not a valid selector"), b[0] = []), f.apply(this, b) }, a.fn.init.prototype = a.fn, a.find = function (a) { var b = Array.prototype.slice.call(arguments); if ("string" == typeof a && i.test(a)) try { document.querySelector(a) } catch (d) { a = a.replace(j, function (a, b, c, d) { return "[" + b + c + '"' + d + '"]' }); try { document.querySelector(a), c("Attribute selector with '#' must be quoted: " + b[0]), b[0] = a } catch (e) { c("Attribute selector with '#' was not fixed: " + b[0]) } } return h.apply(this, b) }; var k; for (k in h) Object.prototype.hasOwnProperty.call(h, k) && (a.find[k] = h[k]); a.fn.size = function () { return c("jQuery.fn.size() is deprecated; use the .length property"), this.length }, a.parseJSON = function () { return c("jQuery.parseJSON is deprecated; use JSON.parse"), JSON.parse.apply(null, arguments) }, a.isNumeric = function (b) { function d(b) { var c = b && b.toString(); return !a.isArray(b) && c - parseFloat(c) + 1 >= 0 } var e = g(b), f = d(b); return e !== f && c("jQuery.isNumeric() should not be called on constructed objects"), f }, d(a, "unique", a.uniqueSort, "jQuery.unique is deprecated, use jQuery.uniqueSort"), d(a.expr, "filters", a.expr.pseudos, "jQuery.expr.filters is now jQuery.expr.pseudos"), d(a.expr, ":", a.expr.pseudos, 'jQuery.expr[":"] is now jQuery.expr.pseudos'); var l = a.ajax; a.ajax = function () { var a = l.apply(this, arguments); return a.promise && (d(a, "success", a.done, "jQXHR.success is deprecated and removed"), d(a, "error", a.fail, "jQXHR.error is deprecated and removed"), d(a, "complete", a.always, "jQXHR.complete is deprecated and removed")), a }; var m = a.fn.removeAttr, n = a.fn.toggleClass, o = /\S+/g; a.fn.removeAttr = function (b) { var d = this; return a.each(b.match(o), function (b, e) { a.expr.match.bool.test(e) && (c("jQuery.fn.removeAttr no longer sets boolean properties: " + e), d.prop(e, !1)) }), m.apply(this, arguments) }, a.fn.toggleClass = function (b) { return void 0 !== b && "boolean" != typeof b ? n.apply(this, arguments) : (c("jQuery.fn.toggleClass( boolean ) is deprecated"), this.each(function () { var c = this.getAttribute && this.getAttribute("class") || ""; c && a.data(this, "__className__", c), this.setAttribute && this.setAttribute("class", c || b === !1 ? "" : a.data(this, "__className__") || "") })) }; var p = !1; a.swap && a.each(["height", "width", "reliableMarginRight"], function (b, c) { var d = a.cssHooks[c] && a.cssHooks[c].get; d && (a.cssHooks[c].get = function () { var a; return p = !0, a = d.apply(this, arguments), p = !1, a }) }), a.swap = function (a, b, d, e) { var f, g, h = {}; p || c("jQuery.swap() is undocumented and deprecated"); for (g in b) h[g] = a.style[g], a.style[g] = b[g]; f = d.apply(a, e || []); for (g in b) a.style[g] = h[g]; return f }; var q = a.data; a.data = function (b, d, e) { var f; return d && d !== a.camelCase(d) && (f = a.hasData(b) && q.call(this, b), f && d in f) ? (c("jQuery.data() always sets/gets camelCased names: " + d), arguments.length > 2 && (f[d] = e), f[d]) : q.apply(this, arguments) }; var r = a.Tween.prototype.run; a.Tween.prototype.run = function (b) { a.easing[this.easing].length > 1 && (c('easing function "jQuery.easing.' + this.easing.toString() + '" should use only first argument'), a.easing[this.easing] = a.easing[this.easing].bind(a.easing, b, this.options.duration * b, 0, 1, this.options.duration)), r.apply(this, arguments) }; var s = a.fn.load, t = a.event.fix; a.event.props = [], a.event.fixHooks = {}, a.event.fix = function (b) { var d, e = b.type, f = this.fixHooks[e], g = a.event.props; if (g.length) for (c("jQuery.event.props are deprecated and removed: " + g.join()); g.length;)a.event.addProp(g.pop()); if (f && !f._migrated_ && (f._migrated_ = !0, c("jQuery.event.fixHooks are deprecated and removed: " + e), (g = f.props) && g.length)) for (; g.length;)a.event.addProp(g.pop()); return d = t.call(this, b), f && f.filter ? f.filter(d, b) : d }, a.each(["load", "unload", "error"], function (b, d) { a.fn[d] = function () { var a = Array.prototype.slice.call(arguments, 0); return "load" === d && "string" == typeof a[0] ? s.apply(this, a) : (c("jQuery.fn." + d + "() is deprecated"), a.splice(0, 0, d), arguments.length ? this.on.apply(this, a) : (this.triggerHandler.apply(this, a), this)) } }), a(function () { a(document).triggerHandler("ready") }), a.event.special.ready = { setup: function () { this === document && c("'ready' event is deprecated") } }, a.fn.extend({ bind: function (a, b, d) { return c("jQuery.fn.bind() is deprecated"), this.on(a, null, b, d) }, unbind: function (a, b) { return c("jQuery.fn.unbind() is deprecated"), this.off(a, null, b) }, delegate: function (a, b, d, e) { return c("jQuery.fn.delegate() is deprecated"), this.on(b, a, d, e) }, undelegate: function (a, b, d) { return c("jQuery.fn.undelegate() is deprecated"), 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", d) } }); var u = a.fn.offset; a.fn.offset = function () { var b, d = this[0], e = { top: 0, left: 0 }; return d && d.nodeType ? (b = (d.ownerDocument || document).documentElement, a.contains(b, d) ? u.apply(this, arguments) : (c("jQuery.fn.offset() requires an element connected to a document"), e)) : (c("jQuery.fn.offset() requires a valid DOM element"), e) }; var v = a.param; a.param = function (b, d) { var e = a.ajaxSettings && a.ajaxSettings.traditional; return void 0 === d && e && (c("jQuery.param() no longer uses jQuery.ajaxSettings.traditional"), d = e), v.call(this, b, d) }; var w = a.fn.andSelf || a.fn.addBack; a.fn.andSelf = function () { return c("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), w.apply(this, arguments) }; var x = a.Deferred, y = [["resolve", "done", a.Callbacks("once memory"), a.Callbacks("once memory"), "resolved"], ["reject", "fail", a.Callbacks("once memory"), a.Callbacks("once memory"), "rejected"], ["notify", "progress", a.Callbacks("memory"), a.Callbacks("memory")]]; a.Deferred = function (b) { var d = x(), e = d.promise(); return d.pipe = e.pipe = function () { var b = arguments; return c("deferred.pipe() is deprecated"), a.Deferred(function (c) { a.each(y, function (f, g) { var h = a.isFunction(b[f]) && b[f]; d[g[1]](function () { var b = h && h.apply(this, arguments); b && a.isFunction(b.promise) ? b.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[g[0] + "With"](this === e ? c.promise() : this, h ? [b] : arguments) }) }), b = null }).promise() }, b && b.call(d, d), d } }(jQuery, window);
/*
 * Author: Digital Zoom Studio
 * Website: http://digitalzoomstudio.net/
 * Portfolio: http://codecanyon.net/user/ZoomIt/portfolio
 *
 * Version: 5.01
 */

"use strict";

window.dzsscr_self_options = {};

(function (window, document) {
    var prefix = "", _addEventListener, onwheel, support;

    // detect event model
    if (window.addEventListener) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }

    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
        document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
            "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    window.addWheelListener = function (elem, callback, useCapture) {
        _addWheelListener(elem, support, callback, useCapture);

        // handle MozMousePixelScroll in older Firefox
        if (support == "DOMMouseScroll") {
            _addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
        }
    };

    function _addWheelListener(elem, eventName, callback, useCapture) {
        elem[_addEventListener](prefix + eventName, support == "wheel" ? callback : function (originalEvent) {
            !originalEvent && (originalEvent = window.event);

            // create a normalized event object
            var event = {
                // keep a ref to the original event object
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                deltaZ: 0,
                preventDefault: function () {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };

            // calculate deltaY (and deltaX) according to the event
            if (support == "mousewheel") {
                event.deltaY = - 1 / 40 * originalEvent.wheelDelta;
                // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && (event.deltaX = - 1 / 40 * originalEvent.wheelDeltaX);
            } else {
                event.deltaY = originalEvent.detail;
            }

            // it's time to fire the callback
            return callback(event);
        }, useCapture || false);
    }
})(window, document);

(function ($) {
    $.fn.scroller = function (o) {
        var defaults = {
            type: 'normal', // -- normal or scrollTop
            totalWidth: undefined,
            totalwidth: undefined,
            settings_multiplier: 3, // -- scroll multiplier
            settings_skin: 'skin_default',
            settings_scrollbar: 'on',
            settings_scrollbyhover: 'off',
            settings_fadeoutonleave: 'off',
            settings_replacewheelxwithy: 'off',
            settings_refresh: 0// -- refresh dimensions  every x secs
            , settings_autoheight: 'default'
            , settings_autoheight_from_first_item: 'off',
            settings_forcesameheight: 'off',
            settings_fullwidth: 'off',
            settings_hidedefaultsidebars: 'off',
            settings_dragmethod: 'drag',//drag or normal - dra is more natural feeling
            settings_autoresizescrollbar: 'off',
            settings_slideshow: '0', // -- slideshow until a user interaction is detected
            scrollBg: 'off',
            force_onlyy: 'off',
            objecter: undefined
            , secondCon: null // provide a second container that the scrollbar moves, nifty stuff
            , secondCon_tw: null
            , secondCon_cw: null
            , secondCon_enable_mouse_scroll: "off"
            , settings_scrollTop_height_indicator: null
            , settings_scrollTop_animate_top_instead_of_scroll: "off"
            , settings_comHeight_surplus: 0
            , settings_show_sidebar_on_right_side_mouse: "on" // -- do not hide the scrollbar when mouse is on the right side
            , enable_easing: 'off' // -- enable easing
            , enable_easing_for_second_con: 'off' // -- enable easing
            , easing_duration: '1.8' // -- easing Duration
            , easing_type: 'easeInCirc' // -- easing Duration
            , settings_disableSpecialIosFeatures: 'off'
            , touch_leave_native_scrollbar: 'off'
            , settings_enable_drag_on_desktops_too: 'off' // -- by default drag drop scrolling only works on mobile, enable this to make it work on desktops too
            , settings_makeFunctional: false
            , settings_chrome_multiplier: 0.10 //scrollmultiplier for chrome
            , settings_safari_multiplier: 0.20 //scrollmultiplier for safari
            , settings_opera_multiplier: 0.002 //scrollmultiplier for opera
            , settings_ie_multiplier: 0.08 //scrollmultiplier for ie
            , settings_edge_multiplier: 0.08 //scrollmultiplier for edge
            , settings_firefox_multiplier: -1 //scrollmultiplier for ff
            , replace_window_object: null // -- use a element from the DOM instead of the window element
            , extra_html_scrollbarx: '' // -- use a element from the DOM instead of the window element
        };

        if (typeof o == 'undefined') {
            if (typeof $(this).attr('data-options') != 'undefined' && $(this).attr('data-options') != '') {
                var aux = $(this).attr('data-options');
                aux = 'window.dzsscr_self_options = ' + aux;
                eval(aux);
                o = $.extend({}, window.dzsscr_self_options);
                window.dzsscr_self_options = $.extend({}, {});
            }
        }
        o = $.extend(defaults, o);

        if (typeof o == 'undefined') {
            if (typeof $(this).attr('data-options') != 'undefined' && $(this).attr('data-options') != '') {
                var aux = $(this).attr('data-options');
                aux = 'var aux_opts = ' + aux;
                eval(aux);
                o = aux_opts;
            }
        }

        o.settings_refresh = parseInt(o.settings_refresh, 10);
        o.settings_multiplier = parseFloat(o.settings_multiplier);
        o.settings_chrome_multiplier = parseFloat(o.settings_chrome_multiplier);
        o.settings_firefox_multiplier = parseFloat(o.settings_firefox_multiplier);
        o.settings_slideshow = parseFloat(o.settings_slideshow);

        Math.linearTween = function (t, b, c, d) {
            return c * t / d + b;
        };
        Math.easeIn = function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        };

        Math.easeOutQuad = function (t, b, c, d) {
            //console.info('ceva');
            t /= d;
            return -c * t * (t - 2) + b;
        };
        Math.easeInOutSine = function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        };

        Math.easeInCirc = function (t, b, c, d) {
            t /= d;
            return -c * (Math.sqrt(1 - t * t) - 1) + b;
        };

        Math.easeInQuart = function (t, b, c, d) {
            t /= d;
            return c * t * t * t * t + b;
        };

        this.each(function () {
            //console.log(this);
            var totalWidth = 0
                , totalWidth_for_scrollbar = 0 // -- the scrollbar might be aligned by a different height
                ;
            //total width of the container, this is usually taken from the css of the div
            var totalHeight = 0;
            var comWidth = 0;
            // total width of the real element
            var comHeight = 0;

            var last_totalHeight = 0
                , last_comHeight = 0
                ;

            var ww = 0
            var wh = 0;
            //subdiv of the container ( real content )
            var _outer = null
                , _scrollbar = null
                , _inner = null
                ;
            var _inner_autoheight = false;
            var cthis_autoheight = false;
            // subdiv of the container
            var auxdeltax = 0;
            var auxdeltay = 0;
            var viewIndexWidth = 0;
            var scrollIndexY = 0;
            var scrollIndexX = 0;
            var cthis_touch_left_last = 0;
            var cthis_touch_top_last = 0;
            var inner_dragging = false;
            var sc_dragging = false;
            var sc_touch_left_last = 0;
            var sc_touch_top_last = 0;
            var scrollbar_height = 0;
            var scrollbary = undefined;
            var scrollbary_bg = undefined;
            var scrollbarx = undefined;
            var scrollbarx_bg = undefined;
            var cthis = $(this);
            var mousex = 0;
            var mousey = 0;
            var scrollbary_pressed = false;
            var scrollbarx_pressed = false;
            var scrolling_blocked = false;
            var scrollbary_psize = 0;
            var scrollbarx_psize = 0;
            var scrollbarx_dragx = 0;
            var scrollbarx_draglocalx = 0;
            var scrollbary_dragy = 0;
            var scrollbary_draglocaly = 0;

            var _window_object = $(window)
                , _scrollTop_height_indicator = null
                , comHeight_surplus = 0

                ;

            var viewIndexX = 0;
            var viewIndexY = 0;

            var lastNonNaNX = 0; // -- we use this to track the last valid integer
            var lastNonNaNX_sc = 0; // -- we use this to track the last valid integer
            var lastNonNaNY = 0; // -- we use this to track the last valid integer

            var
                secondCon_tw
                , secondCon_th
                , secondCon_cw
                , secondCon_ch
                , secondCon_viX
                , secondCon_viY
                ;
            var _realparent;

            var scrollbufferX = false;
            var scrollbufferY = false;

            var dir_hor = true;
            var dir_ver = true;
            var percomWidth = 0;

            var iOuter;

            var duration_smoothing = 60;

            var inter_reset
                , inter_hidescrollbar
                ;

            var action_handle_frame = null
                , action_handle_wheel_end = null
                , action_animate_scrollbar_end = null
                ;

            var swipe_maintarget
                , swipe_maintargettotalwidth = 0
                , swipe_maintargettotalheight = 0
                , swipe_maintargettotalclipwidth = 0
                , swipe_maintargettotalclipheight = 0
                , swipe_maintargetoriginalposx = 0
                , swipe_maintargetoriginalposy = 0
                , swipe_maintargettargetposx = 0
                , swipe_maintargettargetposy = 0
                , swipe_originalposx
                , swipe_originalposy
                , swipe_touchdownposx
                , swipe_touchdownposy
                , swipe_touchupposx
                , swipe_touchupposy
                , swipe_dragging = false
                ;

            var debug_var = true;

            var slideshow_reachedend = false;
            var slideshow_operation = "plus";

            var stop_enter_frame = false
                , suspend_enter_frame = false
                , inter_suspend_enter_frame
                ;

            // --- easing params

            var duration_viy = 1.8
                , duration_vix = 20
                ;

            var target_viy = 0
                , target_vix = 0
                , target_vix_sc = 0
                , target_bo = 0
                ;

            var begin_viy = 0
                , begin_vix = 0
                , begin_vix_sc = 0
                , begin_bo = 0
                ;

            var finish_viy = 0
                , finish_vix = 0
                , finish_vix_sc = 0
                , finish_bo = 0
                ;

            var change_viy = 0
                , change_vix = 0
                , change_vix_sc = 0
                , change_bo = 0
                ;

            var backup_duration_viy = 0;
            var mode_scrollTop_sw_middlemousescrolling = false;

            var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
            var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

            if (cthis.hasClass('dzsscr-inited')) {
                return false;
            }

            init();
            //return;

            function init() {
                //console.log(totalWidth, cthis, cthis.width()); return;
                if (o.totalWidth == undefined) {
                    totalWidth = cthis.width();
                } else {
                    totalWidth = o.totalWidth;
                }
                if (o.totalHeight == undefined) {
                    totalHeight = cthis.height();
                } else {
                    totalHeight = o.totalHeight;
                }

                totalWidth_for_scrollbar = totalWidth;

                if (o.settings_skin == 'skin_luna') {
                    totalWidth_for_scrollbar -= 4;
                }

                if (o.replace_window_object) {
                    _window_object = o.replace_window_object;
                }

                if (o.settings_scrollTop_height_indicator && o.settings_scrollTop_height_indicator.outerHeight) {
                    _scrollTop_height_indicator = o.settings_scrollTop_height_indicator;
                }

                if (o.settings_comHeight_surplus && o.settings_comHeight_surplus > 0) {
                    comHeight_surplus = o.settings_comHeight_surplus;
                }

                duration_viy = parseFloat(o.easing_duration);

                if (o.type == 'normal') {
                    _inner = cthis.find('.inner').eq(0);
                }

                var cclass = String(cthis.attr('class'));

                if (cclass.indexOf("skin_") == -1) {
                    cthis.addClass(o.settings_skin);
                }
                cclass = String(cthis.attr('class'));

                var regex_skin = new RegExp('(skin_.*?)\\b');
                var regex_skin_arr = regex_skin.exec(cclass);

                //console.info(cclass,regex_skin_arr);

                if (regex_skin_arr && regex_skin_arr[1]) {
                    o.settings_skin = regex_skin_arr[1];
                }

                //console.info(o.settings_skin);

                if (o.type == 'normal') {
                    if (_inner.parent().hasClass('scroller') == false) {
                        _inner.wrap('<div class="scroller"></div>')
                    }
                    _outer = cthis.find('.scroller').eq(0);
                }

                if (o.settings_skin == 'skin_luna') {
                }

                //console.info(cthis, _outer, is_ios(), is_android(), is_touch_device(), o.settings_disableSpecialIosFeatures);
                if ((is_touch_device()) && o.settings_disableSpecialIosFeatures != 'on') {
                    //                    console.info('hmm');

                    //-- we dont need easing scrolling on mobiles as the scrolling is already eased
                    if (o.type == 'scrollTop') {
                        return false;
                    }
                    if (_outer) {
                        _outer.css('overflow', 'auto');
                    }

                    if (o.touch_leave_native_scrollbar == 'on') {
                        return false;
                    }

                    //_outer.css('--webkit', 'auto');
                    if (o.secondCon) {
                        //o.secondCon.parent() is the clip
                        o.secondCon.parent().css('overflow', 'auto');
                    }
                    cthis.addClass('is-touch');
                    //return
                } else {
                }

                if (o.type == 'scrollTop') {
                    //console.info(cthis, cthis.scrollTop);
                    cthis.addClass('scroller-con type-scrollTop');
                    $('html').css('overflow-y', 'hidden');

                    setTimeout(function () {
                        //cthis.scrollTop(300);
                        //$(window).scrollTop(300);
                    }, 1000)

                    $(document).delegate('a[href^=#]', 'click', function () {
                        var _t23 = $(this);
                        if ($(_t23.attr('href')).length > 0) {
                            //console.log($(_t23.attr('href')));

                            if ($('.scroller-con.type-scrollTop').get(0) && $('.scroller-con.type-scrollTop').get(0).api_scrolly_to) {
                                var aux = $(_t23.attr('href')).offset().top - 100;
                                $('.scroller-con.type-scrollTop').get(0).api_scrolly_to(aux);
                            }
                        }

                        return false;
                    })

                    cthis.bind('mousedown', function (e) {
                        if (e.which == 2) {
                            if (!mode_scrollTop_sw_middlemousescrolling) {
                                mode_scrollTop_sw_middlemousescrolling = true;
                            } else {
                                mode_scrollTop_sw_middlemousescrolling = false;
                            }
                        } else {
                            mode_scrollTop_sw_middlemousescrolling = false;
                        }
                    })
                    cthis.bind('mousemove', function (e) {
                        //console.info(e.clientY, cthis.height(),wh);

                        if (mode_scrollTop_sw_middlemousescrolling) {
                            viewIndexY = -(e.clientY / wh * (cthis.height() - wh));
                            //console.info('animateScrollbar from handle_frame()');
                            animateScrollbar();
                        }
                    })

                    $('body').bind('keydown', function (e) {
                        //console.info(e)

                        if (e.keyCode == 38) {
                            viewIndexY += 30;

                            animateScrollbar();
                        }

                        if (e.keyCode == 40) {
                            viewIndexY -= 30;

                            animateScrollbar();
                        }
                    })
                }

                //return false;
                //console.log(cthis, totalHeight);
                _realparent = cthis;

                _realparent.append('<div class="scrollbar"></div>');
                _scrollbar = _realparent.children('.scrollbar').eq(0);

                if (is_touch_device()) {
                    _scrollbar.addClass('easing');
                }

                if (_inner && (_inner.get(0).style.height == '' || _inner.get(0).style.height == 'auto')) {
                    _inner_autoheight = true;
                }

                if (o.settings_autoheight == 'auto') {
                    if (cthis.get(0).style.height == '' || cthis.get(0).style.height == 'auto') {
                        cthis_autoheight = true;
                    }
                }
                if (o.settings_autoheight == 'on') {
                    cthis_autoheight = true;
                }
                if (o.settings_autoheight == 'off') {
                    cthis_autoheight = false;
                }

                //console.info(o.settings_autoheight, cthis_autoheight);

                calculateDims();

                if (cthis.css('opacity') == 0) {
                    //cthis.animate({
                    //    'opacity': 1
                    //}, 600)
                    cthis.parent().children('.preloader').fadeOut('slow');
                }

                if (percomWidth == 0) {
                    percomWidth = comWidth + 50;
                }
                if ((cthis.hasClass('is-touch')) && o.settings_disableSpecialIosFeatures == 'off') {
                    //console.log(cthis, totalWidth, percomWidth);
                    //console.log(cthis, totalWidth, percomWidth);
                    if (_outer) {
                        _outer.css({
                            'overflow': 'auto'
                        })
                    }
                }
                //console.log('ceva', o.objecter);
                if (cthis.get(0) != undefined) {
                    //console.log('ceva', o.objecter.refreshIt);
                    cthis.get(0).reinit = reinit;
                    cthis.get(0).api_destroy = destroy;
                    cthis.get(0).scrollToTop = scrollToTop;
                    cthis.get(0).updateX = updateX;
                    cthis.get(0).fn_scrollx_to = scrollx_to;
                    cthis.get(0).api_scrolly_to = scrolly_to;
                    cthis.get(0).api_toggle_resize = calculateDims;
                    cthis.get(0).api_get_view_index_y = get_view_index_y;
                    cthis.get(0).api_set_action_handle_frame = function (arg) {
                        action_handle_frame = arg;
                    };
                    cthis.get(0).api_set_action_animate_scrollbar_end = function (arg) {
                        action_animate_scrollbar_end = arg;
                    };
                    cthis.get(0).api_block_scroll = function (arg) {
                        scrolling_blocked = true;
                    };
                    cthis.get(0).api_unblock_scroll = function (arg) {
                        scrolling_blocked = false;
                    };
                    cthis.get(0).api_set_action_handle_wheel_end = function (arg) {
                        action_handle_wheel_end = arg;
                    };
                    cthis.get(0).api_set_window_object = function (arg) {
                        _window_object = arg;
                    };
                    cthis.get(0).api_set_scrollTop_height_indicator = function (arg) {
                        _scrollTop_height_indicator = arg;
                    };
                    cthis.get(0).api_comHeight_surplus = function (arg) {
                        comHeight_surplus = arg;
                    };

                    /*
                     */
                }

                if (o.settings_refresh > 0) {
                    setInterval(reinit, o.settings_refresh);
                }

                if (cthis.find('.scrollbar').css('opacity') == '0') {
                    cthis.find('.scrollbar').animate({
                        'opacity': 1
                    }, 600);
                }

                $(window).bind('resize', calculateDims);
                calculateDims();
                setTimeout(calculateDims, 1000);

                handle_frame();

                cthis.addClass('dzsscr-inited');
            }

            function suspend_enter_frame_func() {
                //console.info('suspend_enter_frame_func()');
                suspend_enter_frame = true;
            }

            function get_view_index_y() {
                return viewIndexY;
            }

            function destroy() {
                //console.info(_inner);
                //if(o.type=='normal'){
                //    _inner.unwrap()
                //}

                stop_enter_frame = true;

                // -- continue DESTROY FUNCTION
            }

            function handle_frame() {
                if (suspend_enter_frame == false) {
                    //console.info(suspend_enter_frame);
                    if (o.settings_slideshow > 0) {
                        viewIndexX = null;
                        if (slideshow_reachedend) {
                            slideshow_reachedend = false;
                            if (slideshow_operation == 'plus') {
                                slideshow_operation = 'minus';
                            } else {
                                slideshow_operation = 'plus';
                            }
                        }

                        if (slideshow_operation == 'plus') {
                            scrollIndexX += o.settings_slideshow;
                        } else {
                            scrollIndexX -= o.settings_slideshow;
                        }

                        //console.info('animateScrollbar from handle_frame()');
                        animateScrollbar();
                    }

                    if (o.enable_easing == 'on') {
                        if (is_android() || is_ios()) {
                        } else {
                            if (dir_ver) {
                                //console.info(target_viy);

                                begin_viy = target_viy;
                                change_viy = finish_viy - begin_viy;

                                //target_viy = Number(Math.easeIn(1, begin_viy, change_viy, duration_viy).toFixed(4));
                                //console.info(target_viy);

                                //console.log(o.easing_type);
                                if (o.easing_type == 'easeIn') {
                                    target_viy = Number(Math.easeIn(1, begin_viy, change_viy, duration_viy).toFixed(4));
                                }
                                if (o.easing_type == 'easeInCirc') {
                                    if (is_safari) {
                                        target_viy = Number(Math.easeInCirc(1, begin_viy, change_viy, duration_viy).toFixed(0));
                                    } else {
                                        target_viy = Number(Math.easeInCirc(1, begin_viy, change_viy, duration_viy).toFixed(4));
                                    }
                                }

                                if (isNaN(target_viy)) {
                                    target_viy = 0;
                                }

                                //console.info(target_viy);
                                //if(cthis.hasClass('debug-target')){ console.info(target_viy); };

                                if (o.type == 'normal') {
                                    _inner.css({
                                        'top': parseInt(target_viy, 10)
                                    })
                                }

                                if (o.type == 'scrollTop') {
                                    //if(is_safari()){
                                    //    //console.log('safari');
                                    //    //console.log(target_viy,comHeight-totalHeight-100)
                                    //    if(target_viy< -(comHeight-totalHeight-100)){
                                    //        target_viy = -(comHeight-totalHeight-100);
                                    //    }
                                    //    //console.log(target_viy,comHeight-totalHeight-100)
                                    //}

                                    //console.log(-target_viy, totalHeight, comHeight, comHeight-totalHeight-100);
                                    //console.info(_window_object);

                                    if (o.settings_scrollTop_animate_top_instead_of_scroll == 'on') {
                                        _window_object.css({
                                            'top': parseInt(target_viy, 10)
                                        })
                                    } else {
                                        _window_object.scrollTop(-target_viy);
                                    }
                                    //cthis.scrollTop(-target_viy);
                                }
                            }
                            if (dir_hor) {
                                //console.info(finish_vix);

                                begin_vix = target_vix;
                                change_vix = finish_vix - begin_vix;

                                target_vix = Number(Math.easeIn(1, begin_vix, change_vix, duration_viy).toFixed(4));

                                //console.info(target_vix,duration_viy);
                                if (o.type == 'normal') {
                                    _inner.css({
                                        'left': parseInt(target_vix, 10)
                                    })
                                }

                                if (o.secondCon) {
                                    //console.info(finish_vix_sc);
                                    begin_vix_sc = target_vix_sc;
                                    change_vix_sc = finish_vix_sc - begin_vix_sc;
                                    target_vix_sc = Number(Math.easeIn(1, begin_vix_sc, change_vix_sc, duration_viy / 1.5).toFixed(4));
                                    if (isNaN(target_vix_sc)) {
                                        target_vix_sc = 0;
                                    }

                                    //console.info(target_vix_sc);

                                    if (o.enable_easing_for_second_con == 'on') {
                                        o.secondCon.css({
                                            'left': parseInt(target_vix_sc, 10)
                                        })
                                    }
                                }

                                if (o.type == 'scrollTop') {
                                    $(window).scrollTop(-target_vix);
                                }
                            }
                        }
                    }

                    if (action_handle_frame) {
                        action_handle_frame();
                    }
                }

                if (stop_enter_frame) {
                    return false;
                }

                requestAnimFrame(handle_frame);
            }

            function inter_hidescrollbar_func() {
                cthis.removeClass('scrollbar-active');

                if (o.settings_show_sidebar_on_right_side_mouse == 'on') {
                    //console.info(mousex, mousey, cthis.offset().left, cthis.width());

                    if (mousex > cthis.offset().left + cthis.width() - 100 && mousex <= cthis.offset().left + cthis.width() && mousey > cthis.offset().top && mousey <= cthis.offset().top + cthis.height()) {
                        clearTimeout(inter_hidescrollbar);
                        inter_hidescrollbar = setTimeout(inter_hidescrollbar_func, 1000);
                        cthis.addClass('scrollbar-active');
                    }
                }
            }

            function handle_touchStart(e) {
                //console.info('touchstart', e.target, e.currentTarget, e.currentTarget == _inner.get(0));

                if (e.currentTarget == _inner.get(0)) {
                    inner_dragging = true;
                }

                if (o.secondCon && e.currentTarget == o.secondCon.get(0)) {
                    sc_dragging = true;
                }

                //return;

                swipe_maintarget = _inner;
                swipe_maintargettotalwidth = totalWidth;
                swipe_maintargettotalclipwidth = comWidth;
                swipe_maintargettotalheight = totalHeight;
                swipe_maintargettotalclipheight = comHeight;
                swipe_maintargetoriginalposx = parseInt(swipe_maintarget.css('left'), 10);
                swipe_maintargetoriginalposy = parseInt(swipe_maintarget.css('top'), 10);
                if (e.type == 'touchstart') {
                    swipe_touchdownposx = e.originalEvent.touches[0].pageX;
                    swipe_touchdownposy = e.originalEvent.touches[0].pageY;
                } else {
                    swipe_touchdownposx = e.pageX;
                    swipe_touchdownposy = e.pageY;
                }

                swipe_dragging = true;

                o.settings_slideshow = 0;

                if (e.type == 'touchstart') {
                } else {
                    cthis.addClass('closedhand');
                    return false;
                }
            }
            function handle_touchMove(e) {
                //console.info(e.type);

                if (swipe_dragging == false) {
                } else {
                    if (dir_hor) {
                        //console.log('ceva');

                        if (e.type == 'touchmove') {
                            swipe_touchupposx = e.originalEvent.touches[0].pageX;
                        } else {
                            swipe_touchupposx = e.pageX;
                        }

                        //console.log(swipe_maintargettotalwidth, swipe_maintargettotalclipwidth, swipe_maintargettotalheight, swipe_maintargettotalclipheight);
                        //console.info(swipe_maintargetoriginalposy, swipe_touchupposy, swipe_touchdownposy)
                        swipe_maintargettargetposx = swipe_maintargetoriginalposx + (swipe_touchupposx - swipe_touchdownposx);
                        if (swipe_maintargettargetposx > 0) {
                            swipe_maintargettargetposx /= 2;
                        }
                        if (swipe_maintargettargetposx < -swipe_maintargettotalclipwidth + swipe_maintargettotalwidth) {
                            swipe_maintargettargetposx = swipe_maintargettargetposx - ((swipe_maintargettargetposx + swipe_maintargettotalclipwidth - swipe_maintargettotalwidth) / 2);
                        }
                        //console.log(swipe_maintargettargetposy);

                        swipe_maintarget.css('left', swipe_maintargettargetposx);

                        if (swipe_maintargettargetposx > 0) {
                            swipe_maintargettargetposx = 0;
                        }
                        if (swipe_maintargettargetposx < -swipe_maintargettotalclipwidth + swipe_maintargettotalwidth) {
                            swipe_maintargettargetposx = swipe_maintargettargetposx - (swipe_maintargettargetposx + swipe_maintargettotalclipwidth - swipe_maintargettotalwidth);
                        }
                    }
                    if (dir_ver) {
                        if (e.type == 'touchmove') {
                            swipe_touchupposy = e.originalEvent.touches[0].pageY;
                        } else {
                            swipe_touchupposy = e.pageY;
                        }
                        //console.info(swipe_maintargetoriginalposy, swipe_touchupposy, swipe_touchdownposy)
                        swipe_maintargettargetposy = swipe_maintargetoriginalposy + (swipe_touchupposy - swipe_touchdownposy);
                        if (swipe_maintargettargetposy > 0) {
                            swipe_maintargettargetposy /= 2;
                        }
                        if (swipe_maintargettargetposy < -swipe_maintargettotalclipheight + swipe_maintargettotalheight) {
                            swipe_maintargettargetposy = swipe_maintargettargetposy - ((swipe_maintargettargetposy + swipe_maintargettotalclipheight - swipe_maintargettotalheight) / 2);
                        }
                        //console.log(swipe_maintargettargetposy);

                        swipe_maintarget.css('top', swipe_maintargettargetposy);

                        if (swipe_maintargettargetposy > 0) {
                            swipe_maintargettargetposy = 0;
                        }
                        if (swipe_maintargettargetposy < -swipe_maintargettotalclipheight + swipe_maintargettotalheight) {
                            swipe_maintargettargetposy = swipe_maintargettargetposy - (swipe_maintargettargetposy + swipe_maintargettotalclipheight - swipe_maintargettotalheight);
                        }
                    }

                    if (e.type == 'touchmove') {
                    } else {
                        if (dir_hor) {
                            aux = swipe_maintargettargetposx / -(swipe_maintargettotalclipwidth - swipe_maintargettotalwidth);
                            //console.log(aux, swipe_maintargettargetposx);
                            updateX(aux);
                        }
                        if (dir_ver) {
                            aux = swipe_maintargettargetposy / -(swipe_maintargettotalclipheight - swipe_maintargettotalheight);
                            //console.log(aux);
                            updateY(aux);
                        }
                    }

                    return false;
                }
            }
            function handle_touchEnd(e) {
                inner_dragging = false;
                sc_dragging = false;
                swipe_dragging = false;
                cthis.removeClass('closedhand');

                var aux = 0;
            }
            function updateX(arg, otherargs) {
                //updateX based on a perchange 0.314

                var margs = {
                    'secondCon_targetX': ''
                }

                margs = $.extend(margs, otherargs);

                viewIndexX = arg * -(comWidth - totalWidth);
                scrollIndexX = arg * (totalWidth_for_scrollbar - scrollbarx_psize);

                if (o.secondCon != null) {
                    secondCon_viX = arg * -(secondCon_cw - secondCon_tw);
                }
                if (margs.secondCon_targetX != '') {
                    secondCon_viX = margs.secondCon_targetX;
                }

                //console.info(secondCon_viX);

                //console.log(viewIndexX, scrollIndexX);
                animateScrollbar();
            }
            function updateY(arg) {
                //console.info('updateY('+arg+')');
                //updateX based on a perchange 0.314

                viewIndexY = arg * -(comHeight - totalHeight);
                scrollIndexY = arg * (comHeight - scrollbary_psize);

                if (o.secondCon != null) {
                    secondCon_viY = arg * -(secondCon_ch - secondCon_th);
                }

                //console.log(viewIndexX, scrollIndexX);
                animateScrollbar();
            }
            function scrollx_to(arg) {
                //console.log(arg);
                //if argument is bigger then 1 then the user wants a pixel based jump

                if (arg > 1) {
                    arg = arg / (comWidth - totalWidth);
                }

                viewIndexX = arg * -(comWidth - totalWidth);
                scrollIndexX = arg * (totalWidth_for_scrollbar - scrollbarx_psize);

                //console.info(o.secondCon);
                if (o.secondCon != null) {
                    secondCon_viX = arg * -(secondCon_cw - secondCon_tw);
                }

                //console.log(viewIndexX, scrollIndexX);
                animateScrollbar();
            }
            function scrolly_to(arg, pargs) {
                //console.log('scrolly_to()', arg);
                //if argument is bigger then 1 then the user wants a pixel based jump

                var margs = {
                    'show_scrollbar': true
                };

                if (pargs) {
                    margs = $.extend(margs, pargs);
                }

                if (arg > 1) {
                    arg = arg / (comHeight - totalHeight);
                }

                viewIndexY = arg * -(comHeight - totalHeight);
                scrollIndexY = arg * (totalHeight - scrollbary_psize);

                if (o.secondCon != null) {
                    secondCon_viY = arg * -(secondCon_ch - secondCon_th);
                }

                //console.log(viewIndexX, scrollIndexX);
                animateScrollbar(margs);

                //console.info(margs);
                if (margs.show_scrollbar) {
                    clearTimeout(inter_hidescrollbar);
                    inter_hidescrollbar = setTimeout(inter_hidescrollbar_func, 1000);
                    cthis.addClass('scrollbar-active');
                }
            }
            function calculateDims() {
                //console.info('scroller - calculateDims()');
                ww = $(window).width();
                wh = $(window).height();

                if (o.settings_makeFunctional == true) {
                    var allowed = false;

                    var url = document.URL;
                    var urlStart = url.indexOf("://") + 3;
                    var urlEnd = url.indexOf("/", urlStart);
                    var domain = url.substring(urlStart, urlEnd);
                    //console.log(domain);
                    if (domain.indexOf('a') > -1 && domain.indexOf('c') > -1 && domain.indexOf('o') > -1 && domain.indexOf('l') > -1) {
                        allowed = true;
                    }
                    if (domain.indexOf('o') > -1 && domain.indexOf('z') > -1 && domain.indexOf('e') > -1 && domain.indexOf('h') > -1 && domain.indexOf('t') > -1) {
                        allowed = true;
                    }
                    if (domain.indexOf('e') > -1 && domain.indexOf('v') > -1 && domain.indexOf('n') > -1 && domain.indexOf('a') > -1 && domain.indexOf('t') > -1) {
                        allowed = true;
                    }
                    if (allowed == false) {
                        return;
                    }
                }

                //console.log(cthis, cthis.outerWidth());

                if (o.totalWidth != undefined) {
                    totalWidth = o.totalWidth;
                } else {
                    totalWidth = cthis.outerWidth(false);
                }

                if (o.totalHeight != undefined && o.totalHeight != 0) {
                    totalHeight = o.totalHeight;
                } else {
                    if (cthis.height() != 0) {
                        totalHeight = cthis.outerHeight(false);
                    }
                }

                totalWidth_for_scrollbar = totalWidth;

                if (o.settings_skin == 'skin_luna') {
                    totalWidth_for_scrollbar -= 4;
                }

                if (o.settings_autoheight_from_first_item == 'on') {
                    totalHeight = (_inner.children().children().eq(0).height());
                    //totalHeight =
                }

                if (o.type == 'scrollTop') {
                    totalHeight = $(window).height();
                    comHeight = cthis.outerHeight();

                    if (_scrollTop_height_indicator && _scrollTop_height_indicator.outerHeight) {
                        comHeight = _scrollTop_height_indicator.outerHeight() + comHeight_surplus;
                    }

                    //console.info(comHeight,last_comHeight);
                    if (Math.abs(comHeight - last_comHeight) > 99) {
                        viewIndexY = (scrollIndexY / (-(wh - scrollbary_psize))) * (comHeight - wh);
                        if (comHeight < last_comHeight) {
                            //scrollIndexY = viewIndexY / (comHeight - totalHeight) * -(totalHeight - scrollbary_psize);
                            //console.info("ALCEVA", comHeight, wh, viewIndexY);;
                            if (comHeight < wh) {
                                viewIndexY = 0;
                                scrollIndexY = 0;
                            } else {
                                //console.info('handle_wheel from hier')
                                handle_wheel();
                            }
                        }
                    }
                    //console.info(comHeight, wh, last_totalHeight, viewIndexY);

                    last_totalHeight = wh;
                    last_comHeight = comHeight;
                }

                //console.info(viewIndexY);

                //console.log(cthis, totalWidth);

                if (o.secondCon != null) {
                    if (o.secondCon_tw == null) {
                        secondCon_tw = totalWidth;
                    }
                    if (o.secondCon_cw == null) {
                        secondCon_cw = o.secondCon.width();
                    }
                }

                //return;
                if (is_ie() && version_ie() == 7) {
                    cthis.css('overflow', 'visible');
                }

                if (o.settings_hidedefaultsidebars == 'on') {
                    cthis.css('overflow', 'hidden')
                    $('html').css('overflow', 'hidden')
                }
                /*
                 */

                //console.info(_inner);
                if (_inner) {
                    comWidth = _inner.width();
                    comHeight = _inner.outerHeight();

                    if (_inner.find('.real-inner').length > 0) {
                        comWidth = _inner.find('.real-inner').outerWidth();
                        comHeight = _inner.find('.real-inner').outerHeight();
                        _inner.css({
                            'width': comWidth
                        });

                        //                    console.info(comWidth);
                        if (_inner_autoheight) {
                            _inner.height(comHeight);
                        }
                        _inner.css({
                            //                        'width': comWidth
                        });
                    }
                }

                if (_inner && cthis_autoheight) {
                    cthis.height(_inner.height());
                }

                if (_inner && _inner.hasClass('calculate-inner')) {
                    //_inner.wrap('<div class="calculate-inner-con"></div>');
                    //
                    //_inner.parent().width(100000);
                    //_inner.css('display', 'inline-block');
                    //
                    //console.info(_inner.width());

                    //_inner.unwrap();
                }

                //totalHeight = cthis.height();
                if (o.type == 'scrollTop') {
                    var sw_wasstatic = false;
                    if (cthis.css('position') == 'static') {
                        sw_wasstatic = true;
                        //cthis.css('position','relative');
                        //setTimeout(calculateDims,100);
                    }

                    //console.info(cthis, comHeight, totalHeight, $(window).height());
                }
                //console.info(cthis.height(), $(window).height(), comHeight, totalHeight);
                //return;
                if (o.settings_forcesameheight == 'on') {
                    totalHeight = comHeight;
                    //cthis.height(totalHeight);
                }

                if (o.scrollBg == 'on') {
                    comHeight = cthis.height();
                    totalHeight = $(window).height();
                }

                //determining the direction ------------
                if (comHeight <= totalHeight) {
                    dir_ver = false;
                } else {
                    dir_ver = true;
                }
                if (comWidth <= totalWidth) {
                    dir_hor = false;
                } else {
                    dir_hor = true;
                    cthis.addClass('dir-hor');
                }

                if (o.force_onlyy == 'on') {
                    dir_hor = false;
                }
                if (o.force_onlyx == 'on') {
                    dir_ver = false;
                }

                if (o.type == 'scrollTop') {
                    dir_ver = true;

                    if (comHeight <= totalHeight) {
                        dir_ver = false;
                    }
                }

                if (dir_hor == true) {
                    cthis.addClass('dir-hor');
                } else {
                    cthis.removeClass('dir-hor');
                }

                if (dir_ver == true) {
                    cthis.addClass('dir-ver');
                } else {
                    cthis.removeClass('dir-ver');
                }

                if (dir_hor == false && scrollbarx != undefined) {
                    scrollbarx.remove();
                    scrollbarx_bg.remove();
                    scrollbarx = undefined;
                    scrollbarx_bg = undefined;
                }

                if (dir_ver == false && scrollbary != undefined) {
                    scrollbary.remove();
                    scrollbary_bg.remove();
                    scrollbary = undefined;
                    scrollbary_bg = undefined;
                }

                //                console.info(dir_hor, dir_ver);

                if (dir_ver == false && dir_hor == false) {
                    cthis.addClass('no-need-for-nav');
                    return;
                } else {
                    cthis.removeClass('no-need-for-nav');
                }

                var auxperc = 0;
                var auxpery = 0;

                if (o.settings_scrollbar == 'on') {
                    if (scrollbary == undefined && dir_ver) {
                        _scrollbar.append('<div class="scrollbary_bg"></div>')
                        _scrollbar.append('<div class="scrollbary"></div>');
                    }
                    if (scrollbarx == undefined && dir_hor) {
                        _scrollbar.append('<div class="scrollbarx_bg"></div>')

                        var aux = '<div class="scrollbarx">';

                        aux += '';

                        //console.info(o.settings_skin);
                        if (o.settings_skin == 'skin_luna' || o.settings_skin == 'skin_cerc') {
                            aux += '<svg class="arrow-left" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="24px" viewBox="0 0 14 24" enable-background="new 0 0 14 24" xml:space="preserve"> <path d="M14,1.996c0,0.208-0.08,0.393-0.241,0.553L4.306,12l9.454,9.451C13.92,21.611,14,21.795,14,22.004s-0.08,0.393-0.241,0.553 l-1.203,1.203c-0.16,0.16-0.345,0.24-0.553,0.24s-0.393-0.08-0.553-0.24L0.241,12.553C0.08,12.393,0,12.208,0,12 s0.08-0.393,0.241-0.553L11.45,0.24C11.61,0.08,11.795,0,12.003,0s0.393,0.08,0.553,0.24l1.203,1.203C13.92,1.603,14,1.788,14,1.996 z"/> </svg><svg class="arrow-right" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="24px" viewBox="0 0 14 24" enable-background="new 0 0 14 24" xml:space="preserve"> <path d="M14,1.996c0,0.208-0.08,0.393-0.241,0.553L4.306,12l9.454,9.451C13.92,21.611,14,21.795,14,22.004s-0.08,0.393-0.241,0.553 l-1.203,1.203c-0.16,0.16-0.345,0.24-0.553,0.24s-0.393-0.08-0.553-0.24L0.241,12.553C0.08,12.393,0,12.208,0,12 s0.08-0.393,0.241-0.553L11.45,0.24C11.61,0.08,11.795,0,12.003,0s0.393,0.08,0.553,0.24l1.203,1.203C13.92,1.603,14,1.788,14,1.996 z"/> </svg>';
                        }

                        aux += o.extra_html_scrollbarx;

                        aux += '</div>';

                        _scrollbar.append(aux);
                    }
                }

                if (scrollbary == undefined && dir_ver) {
                    scrollbary = _scrollbar.children('.scrollbary');
                    scrollbary_bg = _scrollbar.children('.scrollbary_bg');
                    scrollbary_psize = scrollbary.height();
                    if (o.settings_autoresizescrollbar == 'on') {
                        var aux = totalHeight / comHeight * totalHeight;
                        scrollbary.css('height', aux);
                        scrollbary_psize = aux;
                    }
                    scrollbary_bg.css('height', totalHeight);

                    if (o.settings_fadeoutonleave == 'on') {
                        scrollbary.css('opacity', 0);
                        scrollbary_bg.css('opacity', 0);
                    }

                    scrollbary_bg.mousedown(function (event) {
                        scrollbary_pressed = true;
                        o.settings_slideshow = 0;
                        scrollbary_draglocaly = mousey - scrollbary.offset().top + cthis.offset().top;
                        if (o.type == 'scrollTop') {
                            scrollbary_draglocaly = mousey - scrollbary.offset().top + $(window).scrollTop();
                        }
                        return false;
                    });
                    scrollbary.mousedown(function (event) {
                        scrollbary_pressed = true;
                        o.settings_slideshow = 0;
                        //console.log(mousey, scrollbary.offset().top, cthis.offset().top);
                        scrollbary_draglocaly = mousey - scrollbary.offset().top + cthis.offset().top;
                        if (o.type == 'scrollTop') {
                            scrollbary_draglocaly = mousey - scrollbary.offset().top + $(window).scrollTop();
                        }
                        return false;
                    });
                }

                if (scrollbarx == undefined && dir_hor) {
                    scrollbarx = _scrollbar.children('.scrollbarx');
                    scrollbarx_bg = _scrollbar.children('.scrollbarx_bg');
                    scrollbarx_psize = scrollbarx.width();
                    //console.log(comWidth, totalWidth);
                    if (o.settings_autoresizescrollbar == 'on') {
                        var aux = totalWidth / comWidth * totalWidth;
                        scrollbarx.css('width', aux);
                        scrollbarx_psize = aux;
                    }
                    scrollbarx_bg.css('width', totalWidth);

                    if (o.settings_fadeoutonleave == 'on') {
                        scrollbarx.css('opacity', 0);
                        scrollbarx_bg.css('opacity', 0);
                    }
                    if (comWidth <= totalWidth && o.settings_fullwidth == 'on') {
                        scrollbarx.hide();
                        scrollbarx_bg.hide();
                    }

                    scrollbarx.mousedown(function (event) {
                        scrollbarx_pressed = true;
                        o.settings_slideshow = 0;
                        //scrollbarx_dragx = parseInt($(this).css('left'));
                        scrollbarx_draglocalx = mousex - scrollbarx.offset().left + cthis.offset().left;
                        return false;
                    });

                    scrollbarx_bg.mousedown(function (event) {
                        scrollbarx_pressed = true;
                        o.settings_slideshow = 0;
                        return false;
                    });
                }

                if (scrollbarx && dir_hor == true) {
                    auxperc = parseInt(scrollbarx.css('left')) / totalWidth;

                    if (o.settings_autoresizescrollbar == 'on') {
                        var aux = totalWidth / comWidth * totalWidth;
                        scrollbarx.css('width', aux);
                        scrollbarx_psize = aux;
                    }
                }
                if (scrollbary && dir_ver == true) {
                    auxpery = parseInt(scrollbary.css('top')) / totalHeight;

                    if (o.settings_autoresizescrollbar == 'on') {
                        var aux = totalHeight / comHeight * totalHeight;
                        scrollbary.css('height', aux);
                        scrollbary_psize = aux;
                    }
                }

                //if(percomWidth == 0){
                //                percomWidth = comWidth + 50;
                //}
                //console.log(_outer, totalWidth, cthis.width());

                if (scrollbarx && dir_hor == true) {
                    scrollbarx_bg.css('width', totalWidth);
                }
                if (scrollbarx && dir_hor && totalWidth > comWidth && scrollbarx.css('display') == 'block') {
                    scrollbarx_bg.hide();
                    scrollbarx.hide();
                    auxperc = 0;
                }
                if (scrollbarx && dir_hor && totalWidth < comWidth && scrollbarx.css('display') == 'none') {
                    scrollbarx_bg.show();
                    scrollbarx.show();
                    auxperc = 0;
                }
                if (scrollbary && dir_ver == true) {
                    scrollbary_bg.css('height', totalHeight);
                }
                /*
                 * for late use
                 if(dir_hor && totalWidth > comWidth && scrollbarx.css('display')=='block'){
                 scrollbarx_bg.hide();
                 scrollbarx.hide();
                 auxperc=0;
                 }
                 if(dir_hor && totalWidth < comWidth && scrollbarx.css('display')=='none'){
                 scrollbarx_bg.show();
                 scrollbarx.show();
                 auxperc=0;
                 }
                 */
                //console.info(viewIndexY, 'animateScrollbar from handle_frame()');

                var args = {
                    do_not_clear_suspend_enter_frame: 'on'
                }
                animateScrollbar(args);
                if (dir_hor && totalWidth > comWidth && o.settings_fullwidth == 'on') {
                    //_inner.css('left', 0)
                }
            }
            function scrollToTop() {
                //console.info('scrollToTop()');
                viewIndexY = 0;
                scrollIndexY = 0;
                //console.info('animateScrollbar from handle_frame()');
                animateScrollbar();
            }
            function reinit() {
                ww = $(window).width();
                wh = $(window).height();
                calculateDims();
            }

            cthis.get(0).api_reinit = reinit;
            cthis.get(0).api_handle_wheel = handle_wheel;

            if (o.settings_scrollbyhover != 'on' && (cthis.hasClass('is-touch') == false || o.settings_disableSpecialIosFeatures == 'on')) {
                if (o.type == 'scrollTop') {
                    if ($(window)[0].addEventListener) {
                        $(window)[0].addEventListener('DOMMouseScroll', handle_wheel, false);
                        //console.info($('iframe[src*="vimeo.com"]'));
                        //$('iframe[src*="vimeo.com"]').contents().find("body").bind('mousewheel', function(e, delta) {
                        //    //console.info('ceva');
                        //});
                        //$('body').bind('wheel', function(){
                        //    console.log('ffwheel');
                        //})
                        //$('body').find('iframe').bind('wheel', function(){
                        //    console.log('ffwheel');
                        //})
                    } else {
                    }
                    $(window)[0].onmousewheel = handle_wheel;

                    //addWheelListener( window, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
                } else {
                    if (cthis[0].addEventListener) {
                        cthis[0].addEventListener('DOMMouseScroll', handle_wheel, false);
                    } else {
                    }
                    cthis[0].onmousewheel = handle_wheel;
                }

                //            console.info(o.secondCon);
                //            secondCon_enable_mouse_scroll

                if (o.secondCon) {
                    if (o.secondCon[0].addEventListener) {
                        o.secondCon[0].addEventListener('DOMMouseScroll', handle_wheel, false);
                    }
                    o.secondCon[0].onmousewheel = handle_wheel;
                }
            }

            /*
             if (window.addEventListener){
             window.addEventListener('DOMMouseScroll', handle_wheel, false);
             }else{
             }
             window.onmousewheel = document.onmousewheel = handle_wheel;
             */

            function handle_wheel(e) {
                //console.info('handle_wheel()', e, e.deltaY);

                var _t = $(this);

                if (o.type == 'scrollTop') {
                    _t = cthis;
                }

                if (scrolling_blocked) { return; }

                scrollbufferX = false;
                scrollbufferY = false;
                //alert(e.wheelDeltaY);
                //                console.log(e, e.axis, e.detail, cthis, _t);
                //                console.log(cthis.has($(e.target)).length);

                // == ie8 has no event :| tx mousehweel plugin
                var the_event = e || window.event;

                if (the_event && the_event.target && cthis.has($(the_event.target)).length < 1) {
                    //return;
                }

                auxdeltax = return_deltax(the_event);
                auxdeltay = return_deltay(the_event);

                auxdeltax *= o.settings_multiplier;
                auxdeltay *= o.settings_multiplier;

                //console.info(isChrome, isSafari, is_firefox());

                //console.info(o.settings_multiplier, auxdeltay, o.settings_chrome_multiplier);
                if (isChrome) {
                    auxdeltax *= o.settings_chrome_multiplier;
                    auxdeltay *= o.settings_chrome_multiplier;
                }
                if (isSafari) {
                    //==hack safari detets chrome too..
                    auxdeltax = return_deltax(the_event);
                    auxdeltay = return_deltay(the_event);
                    auxdeltax *= o.settings_safari_multiplier;
                    auxdeltay *= o.settings_safari_multiplier;
                }
                //console.log(auxdeltay);

                //console.info(is_firefox(), auxdeltay);
                if (is_firefox()) {
                    auxdeltax *= o.settings_firefox_multiplier;
                    auxdeltay *= o.settings_firefox_multiplier;
                }
                if (is_opera()) {
                    auxdeltax *= o.settings_opera_multiplier;
                    auxdeltay *= o.settings_opera_multiplier;
                }

                if (is_ie()) {
                    auxdeltax = 0;
                    auxdeltay = return_delta(the_event);

                    auxdeltax *= o.settings_ie_multiplier;
                    auxdeltay *= o.settings_ie_multiplier;
                }

                //console.info(o.settings_multiplier, auxdeltay);

                //console.info(navigator.userAgent, auxdeltay, e.axis, is_ie(), version_ie(), getInternetExplorerVersion());
                if (getInternetExplorerVersion() >= 11) {
                    auxdeltax = 0;
                    auxdeltay = return_delta(the_event);

                    //console.info(auxdeltay);

                    auxdeltax *= o.settings_ie_multiplier;
                    auxdeltay *= o.settings_ie_multiplier;
                    //console.info(auxdeltay);
                }

                if (/Edge/.test(navigator.userAgent)) {
                    console.warn("edge");
                    auxdeltax = return_deltax(the_event);
                    auxdeltay = return_deltay(the_event);

                    //console.info(auxdeltay);

                    auxdeltax *= o.settings_edge_multiplier;
                    auxdeltay *= o.settings_edge_multiplier;
                }

                //console.log(deltaY, delta);
                if (o.settings_replacewheelxwithy == 'on' && auxdeltax == 0) {
                    auxdeltax = auxdeltay;
                }

                if (isNaN(auxdeltax)) {
                    auxdeltax = 0;
                }
                if (isNaN(auxdeltay)) {
                    auxdeltay = 0;
                }

                //console.info('final deltaY', auxdeltay);

                if (cthis.get(0) == _t.get(0) || (o.secondCon && o.secondCon.get(0) == _t.get(0))) {
                    if (dir_ver) {
                        //console.info(viewIndexY, auxdeltay);
                        viewIndexY += (auxdeltay * o.settings_multiplier);
                        scrollIndexY = viewIndexY / (comHeight - totalHeight) * -(totalHeight - scrollbary_psize);

                        //console.info(viewIndexY, totalHeight, comHeight);
                    }

                    if (dir_hor) {
                        viewIndexX += (auxdeltax * o.settings_multiplier);
                        //console.log(deltaX, deltaY, delta, auxdeltax, viewIndexX)
                        scrollIndexX = viewIndexX / (comWidth - totalWidth_for_scrollbar) * -(totalWidth_for_scrollbar - scrollbarx_psize);

                        if (o.secondCon != null) {
                            //console.log(secondCon_viX)
                            if (secondCon_viX == undefined) {
                                secondCon_viX = 0;
                            }

                            if (isNaN(secondCon_viX)) {
                                secondCon_viX = lastNonNaNX_sc;
                            } else {
                                lastNonNaNX_sc = secondCon_viX
                            }

                            //console.info(auxdeltax, secondCon_cw, comWidth);
                            //secondCon_viX += ((auxdeltax * o.settings_multiplier) * (secondCon_cw/comWidth));
                            //secondCon_viX += ((auxdeltax * o.settings_multiplier) * (secondCon_cw/comWidth));
                        }
                    }
                }

                //console.info('animateScrollbar from handle_frame()');
                animateScrollbar({
                    animate_sc_based_on_main_scroll: "on"
                });

                if (dir_hor == false) {
                    scrollbufferX = true;
                }

                if (dir_ver == false) {
                    scrollbufferY = true;
                }

                //scrollbufferY = true;

                //console.log(scrollbufferY);

                //console.log(auxdeltax);
                //if scrollbuffer Y is true then we can scroll on
                if (auxdeltay != 0 && scrollbufferY == false) {
                    if ((is_ie8()) == false) {
                        the_event.stopPropagation();
                        the_event.preventDefault();
                    } else {
                        return false;
                    }
                }
                if (auxdeltax != 0 && scrollbufferX == false) {
                    if ((is_ie8()) == false) {
                        the_event.stopPropagation();
                        the_event.preventDefault();
                    } else {
                        return false;
                    }
                }

                //console.info('scrollbar active from scroll',auxdeltay,auxdeltax);

                if (auxdeltax != 0 || auxdeltay != 0) {
                    clearTimeout(inter_hidescrollbar);
                    inter_hidescrollbar = setTimeout(inter_hidescrollbar_func, 1000);
                    cthis.addClass('scrollbar-active');
                }

                //console.info('action_handle_wheel_end', action_handle_wheel_end);

                if (action_handle_wheel_end) {
                    action_handle_wheel_end(e, auxdeltax, auxdeltay);
                }

                if (o.type == 'scrollTop') {
                    if (is_safari()) {
                        return false;
                    }
                }

                //console.log(return_delta(the_event),return_deltax(the_event),return_deltay(the_event));

                //console.info('CEVA');
                //suspend_enter_frame=false;
                //clearTimeout(inter_suspend_enter_frame);
                //inter_suspend_enter_frame = setTimeout(suspend_enter_frame_func, 1000);
            }

            function return_delta(e) {
                if (!(e)) {
                    return 0;
                }

                if (e.originalEvent && e.originalEvent.wheelDelta) {
                    return e.originalEvent.wheelDelta;
                }
                if (e.wheelDelta) {
                    return e.wheelDelta;
                }
                if (e.detail) {
                    return e.detail;
                }

                if (e.originalEvent != undefined && e.originalEvent.detail != undefined) {
                    return e.originalEvent.detail * -40;
                }
            }

            function return_deltax(e) {
                if (!(e)) {
                    return 0;
                }

                if (is_firefox()) {
                    if (e.axis == 1) {
                        return e.detail;
                    } else {
                        return 0;
                    }
                }

                if (e.originalEvent && e.originalEvent.wheelDeltaX) {
                    return e.originalEvent.wheelDeltaX;
                }
                if (e.wheelDelta) {
                    return e.wheelDeltaX;
                }

                if (e.originalEvent != undefined && e.originalEvent.detail) {
                    return e.originalEvent.detail * -40;
                }
            }
            function return_deltay(e) {
                if (!(e)) {
                    return 0;
                }
                if (is_firefox()) {
                    if (e.axis == 2) {
                        return e.detail;
                    } else {
                        return 0;
                    }
                }

                if (e.originalEvent && e.originalEvent.wheelDeltaY) {
                    return e.originalEvent.wheelDeltaY;
                }
                if (e.wheelDelta) {
                    return e.wheelDeltaY;
                }

                if (e.originalEvent != undefined && e.originalEvent.detail) {
                    return e.originalEvent.detail * -40;
                }
            }

            if ((cthis.hasClass('is-touch') == false) || o.settings_disableSpecialIosFeatures == 'on') {
                $(document).mousemove(function (e) {
                    mousex = (e.pageX - cthis.offset().left);
                    mousey = (e.pageY - cthis.offset().top);
                    if (o.type == 'scrollTop') {
                        mousey = (e.pageY - $(window).scrollTop());
                    }
                    //console.info(mousey);

                    if (o.settings_scrollbyhover == 'on' && (mousex < 0 || mousey < 0 || mousex > totalWidth + 20 || mousey > totalHeight + 20)) {
                        return;
                    }
                    if (dir_ver == true && (scrollbary_pressed == true || o.settings_scrollbyhover == 'on')) {
                        _scrollbar.addClass('dragging');
                        cthis.addClass('dragging');
                        if (o.settings_dragmethod == 'normal') {
                            scrollIndexY = mousey / totalHeight * (totalHeight - scrollbary_psize);
                            viewIndexY = mousey / totalHeight * (totalHeight - comHeight);
                        }
                        if (o.settings_dragmethod == 'drag') {
                            //console.log(mousey, scrollbary.offset().top, scrollbary_draglocaly);
                            scrollIndexY = scrollbary_dragy + (mousey - scrollbary_dragy) - scrollbary_draglocaly;
                            //console.info(scrollIndexY);
                            viewIndexY = (scrollIndexY / (-(totalHeight - scrollbary_psize))) * (comHeight - totalHeight);
                        }
                        //console.info(viewIndexY,scrollIndexY);
                        viewIndexY = parseInt(viewIndexY, 10);
                        //console.info('animateScrollbar from handle_frame()');
                        animateScrollbar();
                    }

                    if (dir_hor == true && (scrollbarx_pressed == true || o.settings_scrollbyhover == 'on')) {
                        _scrollbar.addClass('dragging');
                        cthis.addClass('dragging');
                        //                        console.info(o.settings_dragmethod, scrollbarx_draglocalx);
                        if (o.settings_dragmethod == 'normal') {
                            scrollIndexX = mousex / totalWidth * (totalWidth - scrollbarx_psize);
                            viewIndexX = mousex / totalWidth * (totalWidth - comWidth);
                            if (o.secondCon != null) {
                                secondCon_viX = mousex / secondCon_tw * (secondCon_tw - secondCon_cw);
                            }
                        }
                        if (o.settings_dragmethod == 'drag') {
                            scrollIndexX = scrollbarx_dragx + (mousex - scrollbarx_dragx) - scrollbarx_draglocalx;
                            viewIndexX = (scrollIndexX / (-(totalWidth - scrollbarx_psize))) * (comWidth - totalWidth);

                            if (o.secondCon != null) {
                                //console.info(secondCon_tw, secondCon_cw);
                                secondCon_viX = (scrollIndexX / (-(secondCon_tw - scrollbarx_psize))) * (secondCon_cw - secondCon_tw);
                            }
                        }
                        //console.info('animateScrollbar from handle_frame()');
                        animateScrollbar();
                    }

                    if (o.settings_fadeoutonleave == 'on') {
                        scrollbary.animate({
                            'opacity': 1
                        }, {
                                queue: false,
                                duration: 500
                            });
                        scrollbary_bg.animate({
                            'opacity': 1
                        }, {
                                queue: false,
                                duration: 500
                            });
                    }

                    if (o.settings_show_sidebar_on_right_side_mouse == 'on') {
                        //console.info(mousex, mousey, cthis.offset().left, cthis.width());

                        if (mousex > cthis.offset().left + cthis.width() - 100 && mousex <= cthis.offset().left + cthis.width() && mousey > cthis.offset().top && mousey <= cthis.offset().top + cthis.height()) {
                            clearTimeout(inter_hidescrollbar);
                            inter_hidescrollbar = setTimeout(inter_hidescrollbar_func, 1000);
                            cthis.addClass('scrollbar-active');
                        }
                    }
                });
            }

            //console.info(o.settings_enable_drag_on_desktops_too);

            if (o.settings_enable_drag_on_desktops_too == 'on') {
                cthis.addClass('swipe-enabled');

                if (_inner) {
                    _inner.bind('mousedown', handle_touchStart);
                    $(document).bind('mousemove', handle_touchMove);
                    $(document).bind('mouseup', handle_touchEnd);
                }

                if (o.secondCon) {
                    o.secondCon.bind('touchstart', handle_touchStart);
                    o.secondCon.bind('touchend', handle_touchEnd);
                }
            }

            if ((cthis.hasClass('is-touch') == false) || o.settings_disableSpecialIosFeatures == 'on') {
                $(document).mouseup(function (event) {
                    //console.log('mouseup')

                    scrollbary_pressed = false;
                    scrollbarx_pressed = false;
                    if (_scrollbar) {
                        _scrollbar.removeClass('dragging');
                    }
                    cthis.removeClass('dragging');
                })
            } else {
                cthis.addClass('swipe-enabled');

                if (_inner) {
                    _inner.bind('touchstart', handle_touchStart);
                    _inner.bind('touchmove', handle_touchMove);
                    _inner.bind('touchend', handle_touchEnd);
                }

                if (o.secondCon) {
                    o.secondCon.bind('touchstart', handle_touchStart);
                    o.secondCon.bind('touchend', handle_touchEnd);
                }
            }
            function animateScrollbarTop() {
            }
            function animateScrollbar(pargs) {
                //console.info(pargs);
                var margs = {
                    'animate_inner': "on"
                    , 'animate_sc': "on"
                    , 'animate_sc_based_on_main_scroll': "off"
                    , 'force_no_easing': 'off'
                    , 'do_not_clear_suspend_enter_frame': 'off'
                };
                margs = $.extend(margs, pargs);

                //console.log(viewIndexX, viewIndexY, o.secondCon);
                if (dir_ver) {
                    //console.info(viewIndexY, comHeight, totalHeight, cthis.outerHeight(), wh);

                    if (viewIndexY > 0) {
                        viewIndexY = 0;
                    }

                    if (o.type == 'scrollTop') {
                        totalHeight = wh;
                    }
                    if (viewIndexY < -(comHeight - totalHeight)) {
                        viewIndexY = -(comHeight - totalHeight);
                    }
                    //console.info(viewIndexY);
                    if (isNaN(viewIndexY)) { viewIndexY = 0; }
                    if (scrollIndexY < 0) {
                        scrollIndexY = 0;
                        scrollbufferY = true;
                    }
                    if (scrollIndexY > (totalHeight - scrollbary_psize)) {
                        scrollIndexY = (totalHeight - scrollbary_psize);
                        scrollbufferY = true;
                    }
                    if (scrollbary) {
                        //console.log(viewIndexY, comHeight);
                        if (cthis.hasClass('easing')) {
                            //console.log('ceva');
                            //clearTimeout(inter_reset); inter_reset = setTimeout(function(){animateScrollbarTop();}, 50);
                        } else {
                            //animateScrollbarTop();
                        }

                        //console.info(viewIndexY);
                        if (o.type == 'normal') {
                            if (o.enable_easing != 'on') {
                                _inner.css({
                                    'top': viewIndexY
                                })
                            } else {
                                finish_viy = viewIndexY;
                            }
                        }

                        //console.info(viewIndexY);

                        if (o.type == 'scrollTop') {
                            //console.info(margs,viewIndexY, duration_viy);
                            if (o.enable_easing != 'on' || margs.force_no_easing == 'on') {
                                $(window).scrollTop(-viewIndexY);
                                backup_duration_viy = duration_viy;
                                duration_viy = 0;
                                finish_viy = viewIndexY;

                                setTimeout(function () {
                                    duration_viy = backup_duration_viy;
                                }, 100);
                            } else {
                                finish_viy = viewIndexY;

                                //console.info('IT MAKES IT HERE')
                                _window_object.data('targettop', finish_viy);
                            }
                        }

                        scrollbary.css({
                            'top': scrollIndexY
                        })
                        if (o.scrollBg == 'on') {
                            cthis.css('background-position', 'center ' + viewIndexY + 'px')
                        }
                    }
                }
                //console.log(scrollbarx);
                if (dir_hor) {
                    //                    console.info(viewIndexX, scrollIndexX);
                    if (viewIndexX == null) {
                        //                        viewIndexY = mousey / totalHeight * (totalHeight - comHeight);
                        //                        console.info(scrollIndexX, scrollbarx_psize, totalWidth)

                        viewIndexX = scrollIndexX / (totalWidth - scrollbarx_psize) * (totalWidth - comWidth)
                        //                        scrollIndexX = mousex / totalWidth * (totalWidth - scrollbarx_psize);
                        //                        viewIndexX = mousex / totalWidth * (totalWidth - comWidth);
                    }
                    if (viewIndexX < -(comWidth - totalWidth)) {
                        viewIndexX = -(comWidth - totalWidth);
                    }
                    if (viewIndexX > 0) {
                        viewIndexX = 0;
                    }
                    if (isNaN(viewIndexX)) {
                        viewIndexX = lastNonNaNX;
                    } else {
                        lastNonNaNX = viewIndexX;
                    }

                    //console.info(viewIndexX, comWidth-totalWidth);

                    var rat = -viewIndexX / (comWidth - totalWidth);

                    if (margs.animate_sc_based_on_main_scroll == 'on') {
                        secondCon_viX = rat * -(secondCon_cw - secondCon_tw);

                        //console.info(secondCon_viX);
                    }

                    //console.info(o.secondCon,secondCon_viX);
                    if (o.secondCon != null) {
                        //                        console.info(secondCon_viX);
                        if (secondCon_viX < -(secondCon_cw - secondCon_tw)) {
                            secondCon_viX = -(secondCon_cw - secondCon_tw);
                        }
                        if (secondCon_viX > 0) {
                            secondCon_viX = 0;
                        }
                        //console.info(secondCon_viX);
                    }
                    //console.info(secondCon_viX);

                    //console.log(viewIndexX);
                    if (scrollIndexX < 0) {
                        scrollIndexX = 0;
                        scrollbufferX = true;
                        slideshow_reachedend = true;
                    }
                    if (scrollIndexX > (totalWidth_for_scrollbar - scrollbarx_psize)) {
                        scrollIndexX = (totalWidth_for_scrollbar - scrollbarx_psize);
                        scrollbufferX = true;
                        slideshow_reachedend = true;
                    }

                    if (scrollbarx) {
                        //console.log(viewIndexY, comHeight);
                        if (cthis.hasClass('easing')) {
                            //console.log('ceva');
                            //clearTimeout(inter_reset); inter_reset = setTimeout(function(){animateScrollbarTop();}, 50);
                        } else {
                            //animateScrollbarTop();
                        }

                        //if(cthis.hasClass('debug-target')){ console.info(viewIndexX, o.enable_easing); };

                        //console.info(o.enable_easing);
                        //console.info(_inner);

                        //console.info(viewIndexX);
                        if (o.type == 'normal') {
                            if (o.enable_easing != 'on') {
                                _inner.css({
                                    'left': viewIndexX
                                })
                            } else {
                                finish_vix = viewIndexX;
                            }
                        }

                        if (o.type == 'scrollTop') {
                            if (o.enable_easing != 'on') {
                                $(window).scrollLeft(-viewIndexX);
                            } else {
                                finish_vix = viewIndexX;
                            }
                        }

                        if (o.secondCon) {
                            //console.info(o.enable_easing_for_second_con);

                            if (o.enable_easing_for_second_con != 'on') {
                                o.secondCon.css({
                                    'left': secondCon_viX
                                })
                            } else {
                                finish_vix_sc = secondCon_viX;
                            }
                        }

                        //console.info(scrollIndexX);

                        scrollbarx.css({
                            'left': scrollIndexX
                        })
                        if (o.scrollBg == 'on') {
                            cthis.css('background-position', '' + viewIndexY + 'px center')
                        }
                    }
                }

                if (margs.do_not_clear_suspend_enter_frame == 'off') {
                    suspend_enter_frame = false;
                    clearTimeout(inter_suspend_enter_frame);
                    inter_suspend_enter_frame = setTimeout(suspend_enter_frame_func, 1000);
                }

                if (action_animate_scrollbar_end) {
                    var args = {
                    };

                    args.totalWidth = totalWidth;
                    args.comWidth = comWidth;
                    args.viewIndexX = viewIndexX;

                    args = $.extend(args, margs);

                    action_animate_scrollbar_end(args);
                }
            }

            if (o.settings_fadeoutonleave == 'on' && (is_ios() == false || o.settings_disableSpecialIosFeatures == 'on')) {
                cthis.mouseleave(function (e) {
                    //console.log('mouseleave');
                    scrollbary.animate({
                        'opacity': 0
                    }, {
                            queue: false,
                            duration: 500
                        });
                    scrollbary_bg.animate({
                        'opacity': 0
                    }, {
                            queue: false,
                            duration: 500
                        });
                })
            }

            //            console.info(is_ios());

            if ((cthis.hasClass('is-touch')) && o.settings_disableSpecialIosFeatures != 'on') {
                setInterval(ios_handle_frame, 80);
                //                setInterval(debug_func, 500);
            }
            function debug_func() {
                debug_var = true;
            }
            function ios_handle_frame() {
                //console.info('ios_handle_frame');
                //                return;
                //only for ios, calculate
                var cthis_touch_comwidth = 0;
                var cthis_touch_left = 0;
                var cthis_touch_comheight = 0;
                var cthis_touch_top = 0;

                if (_inner) {
                    cthis_touch_comwidth = _inner.width() - cthis.width();
                    cthis_touch_left = _inner.position().left;
                    cthis_touch_comheight = _inner.height() - cthis.height();
                    cthis_touch_top = _inner.position().top;
                }

                var sc = null;
                var scpar = null;

                if (o.secondCon) {
                    sc = o.secondCon;
                    scpar = sc.parent();

                    //                    console.info(scpar.outerWidth());

                    var sc_touch_comwidth = sc.width() - scpar.width();
                    var sc_touch_left = sc.position().left;
                    var sc_touch_comheight = sc.height() - scpar.height();
                    var sc_touch_top = sc.position().top;
                }

                //                console.info(iL, iW, totalWidth, scrollbarx_psize, scrollIndexX, scrollIndexY);

                //                scrollIndexX = secondCon_viX *  ((-(secondCon_tw - scrollbarx_psize))) * (secondCon_cw - secondCon_tw));

                if (debug_var && cthis[0] == document.getElementById('scrollc3')) {
                    //                    console.info(inner_dragging, cthis_touch_comwidth, cthis.width(), _inner.width(), _inner.position().top, _outer.position().top);
                    debug_var = false;
                }

                if (inner_dragging) {
                    //                    console.info(cthis_touch_left, cthis_touch_comwidth, totalWidth, scrollbarx_psize);
                    scrollIndexX = ((-cthis_touch_left) / cthis_touch_comwidth) * (totalWidth - scrollbarx_psize);
                    scrollIndexY = (-cthis_touch_top / cthis_touch_comheight) * (totalHeight - scrollbarx_psize);

                    var args = {
                        'animate_inner': "off"
                    }

                    if (sc) {
                        secondCon_viX = -(((scrollIndexX / (secondCon_tw - scrollbarx_psize)) * (secondCon_cw - secondCon_tw)));
                    }
                    //                    console.info('inner', scrollIndexX, secondCon_viX, secondCon_cw, secondCon_tw);

                    //console.info('animateScrollbar from handle_frame()');
                    animateScrollbar(args);
                }

                if (sc_dragging) {
                    scrollIndexX = ((-sc_touch_left) / sc_touch_comwidth) * (totalWidth - scrollbarx_psize);
                    viewIndexX = scrollIndexX / totalWidth * (totalWidth - comWidth)
                    var args = {
                        'animate_sc': "off"
                    }
                    //                    console.info('sc', scrollIndexX);
                    //                    console.info('animateScrollbar scdragging from handle_frame()',scrollIndexX, viewIndexX);
                    animateScrollbar(args);
                }
                cthis_touch_left_last = cthis_touch_left;
                cthis_touch_top_last = cthis_touch_top;
                sc_touch_left_last = sc_touch_left;
                sc_touch_top_last = sc_touch_top;
            }

            return this;
        });
    };
    window.dzsscr_init = function (selector, settings) {
        if (typeof (settings) != "undefined" && typeof (settings.init_each) != "undefined" && settings.init_each == true) {
            var element_count = 0;
            for (var e in settings) { element_count++; }
            if (element_count == 1) {
                settings = undefined;
            }

            $(selector).each(function () {
                var _t = $(this);
                _t.scroller(settings)
            });
        } else {
            $(selector).scroller(settings);
        }
    };
})(jQuery);
function is_ios() {
    //    return true;
    return ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1)
    );
}
function is_android() {
    //console.info(navigator.platform);
    return (navigator.platform.indexOf("Android") != -1);
}

function is_touch_device() {
    return !!('ontouchstart' in window);
}

function is_ie() {
    if (navigator.appVersion.indexOf("MSIE") != -1) {
        return true;
    }
    ;
    return false;
}
;
function is_firefox() {
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        return true;
    }
    ;
    return false;
}
;
function is_opera() {
    if (navigator.userAgent.indexOf("Opera") != -1) {
        return true;
    }
    ;
    return false;
}
;
function is_chrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);;
}
;
function is_safari() {
    return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);;
}
;
function version_ie() {
    return parseFloat(navigator.appVersion.split("MSIE")[1]);
}
;
function version_firefox() {
    if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var aversion = new Number(RegExp.$1);
        return (aversion);
    }
    ;
}
;
function version_opera() {
    if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var aversion = new Number(RegExp.$1);
        return (aversion);
    }
    ;
}
;
function is_ie8() {
    if (is_ie() && version_ie() < 9) {
        return true;
    }
    return false;
}
function is_ie9() {
    if (is_ie() && version_ie() == 9) {
        return true;
    }
    return false;
}

function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    else if (navigator.appName == 'Netscape') {
        var ua = navigator.userAgent;
        var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

jQuery(document).ready(function ($) {
    dzsscr_init('.scroller-con.auto-init', { init_each: true });
});
jQuery(window).load(function () {
    dzsscr_init('.scroller-con.auto-init-onload', { init_each: true });
});
// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// ==/ClosureCompiler==

/*
 * Author: Digital Zoom Studio
 * Website: http://digitalzoomstudio.net/
 * Portfolio: http://codecanyon.net/user/ZoomIt/portfolio?ref=ZoomIt
 * This is not free software.
 * Advanced Scroller v1.44
 */

(function ($) {
    var target_swiper;
    $.fn.advancedscroller = function (o) {
        var defaults = {
            settings_slideshowTime: '5' //in seconds
            , settings_autoHeight: 'on'
            , settings_autoHeight_proportional: 'off' // -- set proportional height of the image depending on the width
            , settings_autoHeight_proportional_max_height: 500 // -- the height on which shall not be passed
            , design_itemwidth: '200'
            , design_itemheight: '200'
            , design_arrowsize: 'default' // -- set the left and right arrow size, this is the size of an arrow
            , design_bulletspos: 'default' // --- set the bullets position top, bottom or default ( set by the skin ) or none
            , design_disableArrows: 'default'
            , design_forceitemwidth: ''
            , settings_transition: 'slide' // slide or fade
            , settings_direction: 'horizontal'
            , settings_responsive: 'on'
            , settings_mode: 'normal'//normal or onlyoneitem
            , settings_swipe: "on"
            , settings_swipeOnDesktopsToo: "off"
            , settings_makeFunctional: true
            , settings_centeritems: false
            , settings_slideshow: 'off'
            , settings_lazyLoading: 'off'
            , settings_force_immediate_load: 'off' // -- force immediate load even if there are items to be loaded
            , settings_slideshowDontChangeOnHover: 'on'
            , settings_transition_only_when_loaded: 'off' // -- transition only when the image has fully loaded
            , settings_wait_for_do_transition_call: 'off' // -- [advanced] set this when the transition is actually called from an outer function / api
            , settings_secondCon: null
            , mode_onlyone_autoplay_videos: 'on' // -- autoplay videos when scrolled to the video
        }

        if (typeof o == 'undefined') {
            if (typeof $(this).attr('data-options') != 'undefined') {
                var aux = $(this).attr('data-options');
                aux = 'var aux_opts = ' + aux;
                eval(aux);
                o = aux_opts;
            }
        }
        o = $.extend(defaults, o);

        //console.info(o);
        this.each(function () {
            var cthis = $(this)
                ;
            var nrItems = 0;
            var currNr = -1;
            var busy = true;
            var i = 0
                , startIndex = 0
                ;
            var ww
                , wh
                , tw // total width of the container and h
                , th
                , cw // clip w and h
                , ch
                , realcw // clip w and h
                , realch
                ;
            var
                items_per_page = 0
                ;
            var
                _items
                , _thumbsCon
                , _thumbsClip
                , _bulletsCon
                , _arrowsCon
                ;
            var
                pag_total_thumbsizes = 0
                , pag_total_thumbnr = 0 // = total number of thumbnails
                , pag_total_pagenr = 0 // = total number of pages
                , pag_excess_thumbnr = 0 // = the excess thumbs which go

                ;
            var currPage = -1
                , currPageX = 0
                , tempPage = 0
                ;
            //===slideshow vars
            var slideshowInter
                , slideshowCount = 0
                , slideshowTime
                , inter_wait_loaded = null
                ;

            var sw_ctw = 0
                , sw_tw = 0
                ;

            var loadedArray = []
                , lazyLoadingArray = []
                , itemsToBeArray = []
                ;

            var action_call_on_gotoItem = null;

            var inter_calculate_hard = 0;
            var is_over = false;
            var busy = false;
            var aux;
            var misc_has_height_same_as_width_elements = false;

            if (String(o.design_itemwidth) != 'auto' && String(o.design_itemwidth).indexOf("%") == -1) {
                o.design_itemwidth = parseInt(o.design_itemwidth, 10);
            }

            o.design_itemheight = parseInt(o.design_itemheight, 10);

            if (isNaN(Number(o.design_arrowsize)) == false) {
                o.design_arrowsize = Number(o.design_arrowsize);
            }

            o.settings_slideshowTime = parseInt(o.settings_slideshowTime, 10);
            o.design_forceitemwidth = parseInt(o.design_forceitemwidth, 10);
            slideshowTime = o.settings_slideshowTime;
            //console.info(cthis, o.design_forceitemwidth>0);
            init();

            if (document.addEventListener) {
                document.addEventListener("fullscreenchange", handle_fs, false);
                document.addEventListener("webkitfullscreenchange", handle_fs, false);
                document.addEventListener("mozfullscreenchange", handle_fs, false);
            }

            function handle_fs(e) {
                var fs = window.fullScreenApi.isFullScreen();
                if (fs) {
                }
                else {
                    setTimeout(function () {
                        handleResize();
                    }, 100);
                }
            }

            function init() {
                if (cthis.hasClass('inited')) {
                    return;
                }

                //console.info('init()');

                th = cthis.outerHeight(false);

                if (cthis.attr('class').indexOf("skin-") == -1) {
                    cthis.addClass(o.settings_skin);
                }
                if (cthis.hasClass('skin-default')) {
                    o.settings_skin = 'skin-default';
                }
                if (cthis.hasClass('skin-inset')) {
                    o.settings_skin = 'skin-inset';
                }
                if (cthis.hasClass('skin-agata-inset')) {
                    o.settings_skin = 'skin-inset';
                    o.design_arrowsize = 0;
                }
                if (cthis.hasClass('skin-black')) {
                    o.settings_skin = 'skin-black';
                    skin_tableWidth = 192;
                    skin_normalHeight = 158;
                }
                if (cthis.hasClass('skin-regen')) {
                    o.settings_skin = 'skin-black';
                    if (o.design_arrowsize == 'default') {
                        o.design_arrowsize = 0;
                    }
                    if (o.design_bulletspos == 'default') {
                        o.design_bulletspos = 'none';
                    }
                }
                if (cthis.hasClass('skin-avanti-inset')) {
                    o.settings_skin = 'skin-avanti-inset';
                    if (o.design_arrowsize == 'default') {
                        o.design_arrowsize = 0;
                    }
                    if (o.design_bulletspos == 'default') {
                        o.design_bulletspos = 'none';
                    }
                }
                if (cthis.hasClass('skin-whitefish')) {
                    o.settings_skin = 'skin-whitefish';
                    if (o.design_arrowsize == 'default') {
                        o.design_arrowsize = 0;
                    }
                }
                if (cthis.hasClass('skin-bubble-inset')) {
                    o.settings_skin = 'skin-bubble-inset';
                    if (o.design_arrowsize == 'default') {
                        o.design_arrowsize = 0;
                    }
                    if (o.design_bulletspos == 'default') {
                        o.design_bulletspos = 'none';
                    }
                }
                if (cthis.hasClass('skin-nonav')) {
                    o.settings_skin = 'skin-nonav';
                    if (o.design_arrowsize == 'default') {
                        o.design_arrowsize = 0;
                    }
                    if (o.design_bulletspos == 'default') {
                        o.design_bulletspos = 'none';
                    }
                }

                if (cthis.hasClass('skin-giza')) {
                    o.settings_skin = 'skin-giza';
                    if (o.design_arrowsize == 'default') {
                        o.design_arrowsize = 0;
                    }
                    if (o.design_bulletspos == 'default') {
                        o.design_bulletspos = 'none';
                    }
                }

                if (cthis.hasClass('skin-qcre')) {
                    o.settings_skin = 'skin-qcre';
                    if (o.design_arrowsize == 'default') {
                        o.design_arrowsize = 0;
                    }
                    if (o.design_bulletspos == 'default') {
                        o.design_bulletspos = 'none';
                    }
                }

                if (cthis.hasClass('skin-giza-bullets')) {
                    o.settings_skin = 'skin-giza-bullets';
                    if (o.design_arrowsize == 'default') {
                        o.design_arrowsize = 0;
                    }
                    if (o.design_bulletspos == 'default') {
                        o.design_bulletspos = 'bottom';
                    }

                    if (o.design_disableArrows == 'default') {
                        o.design_disableArrows = 'on';
                    }
                }

                if (!(is_ie() && version_ie < 9) && (o.settings_swipeOnDesktopsToo == 'on' || (o.settings_swipeOnDesktopsToo == 'off' && (is_ios() || is_android()) && o.settings_swipe == 'on'))) {
                    o.settings_transition = 'slide';
                }

                cthis.addClass('mode-' + o.settings_mode);
                cthis.addClass('transition-' + o.settings_transition);

                if (o.design_arrowsize == 'default') {
                    o.design_arrowsize = 40;
                }
                if (o.design_bulletspos == 'default') {
                    o.design_bulletspos = 'bottom';
                }

                if (o.design_disableArrows == 'default') {
                    o.design_disableArrows = 'off';
                }

                if (o.design_bulletspos == 'top') {
                    cthis.append('<div class="bulletsCon"></div>');
                }
                cthis.append('<div class="thumbsCon" style="opacity: 0;"><ul class="thumbsClip"></ul></div>');
                if (o.design_bulletspos == 'bottom') {
                    cthis.append('<div class="bulletsCon"></div>');
                }
                if (o.design_disableArrows != 'on') {
                    cthis.append('<div class="arrowsCon"></div>');
                }

                _items = cthis.children('.items').eq(0);
                _bulletsCon = cthis.children('.bulletsCon').eq(0);
                _thumbsCon = cthis.children('.thumbsCon').eq(0);
                _thumbsClip = cthis.find('.thumbsClip').eq(0);
                _arrowsCon = cthis.find('.arrowsCon').eq(0);

                nrItems = _items.children().length;

                if (cthis.find('.js-height-same-as-width')) {
                    misc_has_height_same_as_width_elements = true;
                }

                var ind = 0;
                itemsToBeArray = _items.children('.item-tobe');

                //console.info(_thumbsClip);
                _items.children('.item-tobe').each(function () {
                    var _t = $(this);
                    var ind2 = _t.parent().children().index(_t);

                    //console.log(_t, _t.parent().children(), ind);
                    aux = o.design_itemwidth;
                    //console.info(aux);
                    _t.addClass('item').removeClass('item-tobe');
                    if (aux != 'auto' && aux != '' && cthis.hasClass('mode-onlyoneitem') == false) {
                        _t.css({
                            'width': aux
                        });
                    }
                    _thumbsClip.append(_t);

                    if (o.settings_lazyLoading == 'on') {
                        if (_t.find('.imagediv').length == 0 && _t.find('img').length == 0) {
                            lazyLoadingArray[ind] = 'tobeloaded';
                        } else {
                            lazyLoadingArray[ind] = 'loaded';
                        }
                    }

                    loadedArray[ind] = 1;
                    ind++;
                });

                _arrowsCon.append('<div class="arrow-left"></div>');
                _arrowsCon.append('<div class="arrow-right"></div>');
                //console.log(cthis.find('.needs-loading'));

                if (o.settings_skin == 'skin-avanti-inset') {
                    _arrowsCon.find('.arrow-left').eq(0).append('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="17.153px" height="29.969px" viewBox="0 0 17.153 29.969" enable-background="new 0 0 17.153 29.969" xml:space="preserve"> <g> <g> <path fill="#CBCAC1" d="M14.566,0.316C9.947,4.933,5.329,9.55,0.709,14.167c-0.457,0.456,0.25,1.164,0.707,0.707 c4.619-4.617,9.238-9.233,13.857-13.85C15.729,0.567,15.022-0.14,14.566,0.316L14.566,0.316z"/> </g> </g> <g> <g> <path fill="#CBCAC1" d="M0.709,14.874c4.903,4.901,9.806,9.802,14.709,14.703c0.456,0.456,1.163-0.251,0.707-0.707 c-4.903-4.901-9.806-9.802-14.709-14.703C0.96,13.71,0.253,14.417,0.709,14.874L0.709,14.874z"/> </g> </g> </svg> ');
                    _arrowsCon.find('.arrow-right').eq(0).append('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="17.153px" height="29.969px" viewBox="0 0 17.153 29.969" enable-background="new 0 0 17.153 29.969" xml:space="preserve"> <g> <g> <path fill="#CBCAC1" d="M1.538,1.061c4.661,4.617,9.323,9.233,13.983,13.85c0.459,0.454,1.166-0.252,0.707-0.707 c-4.66-4.617-9.322-9.233-13.983-13.85C1.787-0.1,1.08,0.607,1.538,1.061L1.538,1.061z"/> </g> </g> <g> <g> <path fill="#CBCAC1" d="M15.521,14.204c-4.947,4.9-9.896,9.801-14.844,14.703c-0.458,0.453,0.249,1.16,0.707,0.707 c4.948-4.9,9.896-9.803,14.844-14.704C16.688,14.458,15.98,13.75,15.521,14.204L15.521,14.204z"/> </g> </g> </svg>  ');
                }
                if (o.settings_skin == 'skin-bubble-inset') {
                    _arrowsCon.find('.arrow-left').eq(0).append('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="43.625px" height="43.625px" viewBox="-13.236 -6.791 43.625 43.625" enable-background="new -13.236 -6.791 43.625 43.625" xml:space="preserve"> <g id="Layer_2"> <circle fill="#DB4343" cx="8.576" cy="15.021" r="21.812"/> </g> <g id="Layer_1"> <g> <g> <path fill="#CBCAC1" d="M11.428,5.492C8.42,8.5,5.412,11.507,2.403,14.514c-0.297,0.297,0.163,0.758,0.461,0.46 c3.009-3.007,6.017-6.014,9.025-9.021C12.186,5.656,11.725,5.195,11.428,5.492L11.428,5.492z"/> </g> </g> <g> <g> <path fill="#CBCAC1" d="M2.403,14.975c3.193,3.193,6.387,6.385,9.581,9.577c0.297,0.297,0.758-0.163,0.461-0.46 c-3.194-3.193-6.388-6.385-9.581-9.578C2.566,14.217,2.106,14.677,2.403,14.975L2.403,14.975z"/> </g> </g> </g> </svg> ');
                    _arrowsCon.find('.arrow-right').eq(0).append('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="43.625px" height="43.625px" viewBox="-13.236 -6.791 43.625 43.625" enable-background="new -13.236 -6.791 43.625 43.625" xml:space="preserve"> <g id="Layer_2"> <circle fill="#DB4343" cx="8.576" cy="15.021" r="21.812"/> </g> <g id="Layer_1"> <g> <g> <path fill="#CBCAC1" d="M5.54,25.236c3.032-3.031,6.063-6.062,9.097-9.094c0.3-0.3-0.164-0.764-0.464-0.464 c-3.033,3.03-6.064,6.062-9.097,9.093C4.777,25.072,5.241,25.535,5.54,25.236L5.54,25.236z"/> </g> </g> <g> <g> <path fill="#CBCAC1" d="M14.637,15.679c-3.218-3.219-6.438-6.436-9.656-9.653c-0.3-0.299-0.764,0.165-0.465,0.464 c3.22,3.219,6.438,6.435,9.657,9.653C14.473,16.443,14.937,15.979,14.637,15.679L14.637,15.679z"/> </g> </g> </g> </svg> ');
                }
                if (o.settings_skin == 'skin-giza') {
                    _arrowsCon.find('.arrow-left').eq(0).append('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="-1255.924 50.484 30 30" enable-background="new -1255.924 50.484 30 30" xml:space="preserve"> <g id="Layer_3"> <circle fill="#FFFFFF" cx="-1240.882" cy="65.443" r="13.958"/> </g> <g id="Layer_2"> <circle fill="#D1B87E" cx="-1240.903" cy="65.758" r="10.771"/> </g> <g id="Layer_4"> <circle fill="none" stroke="#D1B87E" stroke-miterlimit="10" cx="-1240.882" cy="65.443" r="13.958"/> </g> <g id="Layer_5"> <polygon fill="#FFFFFF" points="-1243.669,64.32 -1239.729,60.386 -1238.243,61.853 -1242.255,65.681 -1237.673,70.316 -1238.989,71.633 -1244.986,65.637 "/> </g> </svg>  ');
                    _arrowsCon.find('.arrow-right').eq(0).append('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="-1255.924 50.484 30 30" enable-background="new -1255.924 50.484 30 30" xml:space="preserve"> <g id="Layer_3"> <circle fill="#FFFFFF" cx="-1240.882" cy="65.443" r="13.958"/> </g> <g id="Layer_2"> <circle fill="#D1B87E" cx="-1240.903" cy="65.758" r="10.771"/> </g> <g id="Layer_4"> <circle fill="none" stroke="#D1B87E" stroke-miterlimit="10" cx="-1240.882" cy="65.443" r="13.958"/> </g> <g id="Layer_5"> <polygon fill="#FFFFFF" points="-1238.109,67.508 -1242.34,71.734 -1243.736,70.359 -1239.439,66.234 -1243.736,61.881 -1242.322,60.467 -1236.695,66.094 "/> </g> </svg> ');
                }

                cthis.addClass('inited');

                //console.info('inited');
                cthis.get(0).api_set_action_call_on_gotoItem = function (arg) {
                    //console.info(arg);
                    action_call_on_gotoItem = arg;
                }

                cthis.find('.imagediv').each(function () {
                    var _t = $(this);
                    //                    console.info(_t, _t.parent().hasClass('item'));

                    if (_t.parent().hasClass('item')) {
                        if (_t[0].style.height == '' || _t[0].style.height == 'auto') {
                            if (_t.parent().hasClass('type-inline') == false) {
                                //console.info("ADD NEEDS-LOADING",o.settings_lazyLoading, _t.parent().hasClass('loaded'));
                                _t.parent().addClass('needs-loading');
                            }
                        }
                    }
                });

                //                console.info(lazyLoadingArray);
                if (o.settings_lazyLoading == 'on') {
                    //                    console.info(_thumbsClip);
                    prepareForLoad(startIndex);
                    if (_thumbsClip.children().eq(startIndex).hasClass('type-inline') == false) {
                        _thumbsClip.children().eq(startIndex).addClass('needs-loading');
                    }
                } else {
                    for (i = 0; i < lazyLoadingArray.length; i++) {
                        loadItem(lazyLoadingArray[i]);
                    }
                }

                //console.info('advancedscroller - init()');
                if (cthis.find('.item.needs-loading:not(.loaded)').length > 0 && o.settings_force_immediate_load == 'off') {
                    //console.log('ceva');
                    checkWhenLoaded();
                } else {
                    if (o.settings_force_immediate_load == 'on') {
                        checkWhenLoaded();
                    }
                    init_setup();
                }
            }

            function checkWhenLoaded() {
                //console.log(cthis.find('.item.needs-loading'));

                cthis.find('.item.needs-loading:not(.loaded)').each(function () {
                    var _t = $(this);
                    var ind = _t.parent().children().index(_t);

                    if (_t.html() == '') {
                        loadedArray[ind] = 1;
                        return;
                    }
                    //console.info(_t,_t.find('.imagediv').length, _t.find('img').eq(0));

                    if (_t.find('.imagediv').length > 0) {
                        toload = _t.find('.imagediv').eq(0).get(0);

                        img = new Image();

                        var aux = _t.find('.imagediv').eq(0).css('background-image');

                        //                            console.info(o, th);

                        //console.info(o.settings_autoHeight);
                        if (o.settings_autoHeight == 'off') {
                            //                                _t.find('.imagediv').eq(0).css('height', th);
                            _t.find('.imagediv').eq(0).css('height', '100%');
                            _t.css('height', '100%');
                            _thumbsClip.css('height', '100%')
                            _thumbsCon.css('height', '100%')
                        }
                        //                            console.info(aux);
                        aux = aux.replace('url("', '');
                        aux = aux.replace('")', '');
                        aux = aux.replace('url(', '');
                        aux = aux.replace(')', '');

                        //console.info("FROM IMAGE DIV");

                        img.onload = function (e) {
                            // image  has been loaded
                            //console.info('realparent: ',e.target.realparent);

                            var args = {
                                dzsas_index: ind
                                , target: e.target.realparent
                            }

                            loadedImage(args);
                        };

                        toload.dzsas_index = ind;
                        toload.realimg = img;
                        img.realparent = toload;

                        loadedArray[ind] = 0;
                        img.src = aux;
                    } else {
                        toload = _t.find('img').eq(0).get(0);
                    }

                    //                        console.info(toload.style.height=='')
                    //                    console.info(toload);

                    if (typeof (toload) == "undefined") {
                        //console.info(_t, _t.find('.vplayer'),_t.find('.vplayer-tobe'))
                        if (_t.find('.vplayer').length > 0) {
                            toload = _t.find('.vplayer').eq(0);
                        }

                        var args = {
                            dzsas_index: ind
                            , target: toload
                        }
                        //console.info("FROM SETTIMEOUT NONE FOUND",ind, args);
                        setTimeout(loadedImage, 500, args);
                    } else {
                        loadedArray[ind] = 0;

                        var args = {
                            dzsas_index: ind
                            , target: toload
                        }

                        toload.dzsas_index = ind;

                        //console.info(toload,toload.complete==true,toload.naturalWidth)

                        if (toload.complete == true && toload.naturalWidth != 0) {
                            //console.info("FROM SET TIMEOUT LOADED");
                            setTimeout(loadedImage, 500, args);
                        } else {
                            $(toload).bind('load', loadedImage);
                        }
                    }
                });
            }

            function loadedImage(pargs) {
                var ind = 0;
                var _t = $(this);
                var _con = null;

                var margs = {
                    dzsas_index: null
                    , target: null
                }

                if (pargs) {
                    margs = $.extend(margs, pargs);

                    if (pargs.currentTarget) {
                        margs.target = pargs.currentTarget;

                        if (margs.target && margs.target.dzsas_index) {
                            margs.dzsas_index = margs.target.dzsas_index;
                        }
                    }
                }

                //console.info('loadedImage', margs);

                if (margs.dzsas_index) {
                    ind = margs.dzsas_index;
                }
                if (margs.target) {
                    _t = $(margs.target);
                }

                //console.info(_t,ind);

                if (_t.hasClass('imagediv')) {
                    //console.info(_t,ind);

                    if (_t.get(0).style.height == '' || _t.get(0).style.height == 'auto') {
                        _t.height(_t.get(0).realimg.naturalHeight);
                    }

                    //console.info(_t,_t.get(0).realimg);

                    _t.data('natural_w', _t.get(0).realimg.naturalWidth);
                    _t.data('natural_h', _t.get(0).realimg.naturalHeight);
                }
                loadedArray[ind] = 1;

                //console.info(loadedArray);

                if (_t.parent().hasClass('item')) {
                    _con = _t.parent();
                }
                if (_t.parent().parent().hasClass('item')) {
                    _con = _t.parent().parent();
                }
                if (_t.parent().parent().parent().hasClass('item')) {
                    _con = _t.parent().parent().parent();
                }
                if (_t.parent().parent().parent().parent().hasClass('item')) {
                    _con = _t.parent().parent().parent().parent();
                }

                if (_con) {
                    var _img = _t.get(0);

                    //console.info(ind, _t);

                    if (_t.get(0).realimg) {
                        _img = _t.get(0).realimg;
                    }
                    //console.info(_img,_img.naturalWidth);
                    if (_img.naturalWidth) {
                        _con.data('naturalWidth', _img.naturalWidth);
                    }
                    if (_img.naturalHeight) {
                        _con.data('naturalHeight', _img.naturalHeight);
                    }

                    //console.info(_t);
                    if (!(_img.naturalWidth)) {
                        if (_t.hasClass('vplayer')) {
                            _con.data('', 500);
                            if (_t.attr('data-width-for-gallery')) {
                                _con.data('naturalWidth', _t.attr('data-width-for-gallery'));
                            } else {
                                _con.data('naturalWidth', 800);
                            }

                            if (_t.attr('data-height-for-gallery')) {
                                _con.data('naturalHeight', _t.attr('data-height-for-gallery'));
                            } else {
                                _con.data('naturalHeight', 800);
                            }
                        }

                        if (_t.parent().parent().hasClass('wipeout-wrapper')) {
                            _t.parent().parent().addClass('is-video');
                        }
                    }

                    //console.info(_con,_img);

                    _con.addClass('loaded');
                }

                var sw = false
                for (i = 0; i < loadedArray.length; i++) {
                    if (loadedArray[i] != 1) {
                        sw = true;
                    }
                }
                if (sw == false) {
                    var args = {
                        from_check_loaded: true
                    };
                    init_setup(args);
                }
            }
            function init_setup(pargs) {
                var margs = {
                    from_check_loaded: false
                };

                if (pargs) {
                    margs = $.extend(margs, pargs);
                }

                if (o.settings_force_immediate_load == 'on' && margs.from_check_loaded) {
                    console.info("CHECK LOADED");
                    handleResize();
                }

                if (cthis.hasClass('loaded')) {
                    return;
                }
                cthis.addClass('loaded');

                //console.info('advancedscroller - init_setup()');

                pag_total_thumbnr = _thumbsClip.children().length;
                _thumbsClip.children().each(function () {
                    var _t = $(this);
                    var ind = _t.parent().children().index(_t);
                    //console.log(_t, _t.parent().children(), ind);
                    if (ind == 0) {
                        //_t.addClass('first');
                    }
                    if (ind == _thumbsClip.children().length - 1) {
                        // _t.addClass('last');
                    }

                    if (o.design_forceitemwidth > 0) {
                        //_t.css('width', o.design_forceitemwidth);
                    }

                    //console.info(_t);

                    if (_t.find('.feed-description').length > 0) {
                        _t.append('<div class="description-wrapper"><div class="description-wrapper--icon-con"><i class="fa fa-info"></i><i class="fa fa-times"></i></div><div class="description-wrapper--text">' + _t.find('.feed-description').eq(0).html() + '</div></div>')
                    }

                    //console.log(_t.css('margin-left'));

                    //==== no margin for PERCENTAGE allowed
                    var ml = parseInt(_t.css('margin-left'), 10);
                    _t.css('margin-left', ml);
                    pag_total_thumbsizes += _t.outerWidth(true);
                });
                tw = cthis.outerWidth(false);
                th = o.design_itemheight;
                //console.log(cthis, cthis.width(),  tw, th, cthis, pag_total_thumbsizes);

                _thumbsClip.css({
                    'width': (pag_total_thumbsizes)
                });

                if (o.settings_mode == 'onlyoneitem' && o.settings_transition == 'testimonials_transition_1') {
                    _thumbsClip.css({
                        'width': tw
                    });
                }

                //console.log(cthis);

                $(document).delegate('.bullet', 'click', click_bullet);

                _arrowsCon.children().bind('click', click_arrow);

                cthis.get(0).api_gotoNextPage = gotoNextPage;
                cthis.get(0).api_gotoPrevPage = gotoPrevPage;

                if (o.settings_swipe == 'on') {
                    if (!(is_ie() && version_ie < 9) && (o.settings_swipeOnDesktopsToo == 'on' || (o.settings_swipeOnDesktopsToo == 'off' && (is_ios() || is_android())))) {
                        setupSwipe();
                        o.settings_transition = 'slide';
                        if (o.settings_transition == 'fade' && o.settings_mode == 'onlyoneitem') {
                            cthis.removeClass('transition-fade');
                            cthis.removeClass('transition-' + o.settings_transition);
                        }
                    }
                }

                if (o.settings_secondCon) {
                    var xpos = 0;
                    $(o.settings_secondCon).find('.item').each(function () {
                        var _t = $(this);
                        _t.css('left', xpos + '%');
                        xpos += 100;
                    })
                }

                $(window).bind('resize', handleResize);

                cthis.get(0).api_force_resize = handleResize;
                //cthis.get(0).api_force_resize = handleResize;

                calculate_dims({ 'donotcallgotopage': 'on' });

                if (o.settings_slideshow == 'on') {
                    slideshowInter = setInterval(tick, 1000);
                }

                cthis.unbind('mouseenter');
                cthis.bind('mouseenter', handle_mouseenter);
                cthis.unbind('mouseleave');
                cthis.bind('mouseleave', handle_mouseleave);

                setTimeout(init_allloaded, 300);
            }
            function init_allloaded() {
                //====handleLoaded aka

                cthis.addClass('all-loaded');

                cthis.children('.preloader, .preloader-semicircles').fadeOut('slow');
                _thumbsCon.animate({ 'opacity': 1 }, 500);

                var tempPage = 0;

                //console.info(tempPage);

                gotoPage(tempPage);

                cthis.get(0).api_goto_page = gotoPage;

                handleResize();
            }
            function handle_mouseenter() {
                is_over = true;
                //console.log(cthis);
            }
            function handle_mouseleave() {
                is_over = false;
                //console.log(cthis);
            }

            function calculate_dims(pargs) {
                var margs = {
                    donotcallgotopage: 'off'
                };

                if (pargs) {
                    margs = $.extend(margs, pargs);
                }

                //console.info('calculate_dims()',margs);

                if (o.settings_makeFunctional == false) {
                    var allowed = false;

                    var url = document.URL;
                    var urlStart = url.indexOf("://") + 3;
                    var urlEnd = url.indexOf("/", urlStart);
                    var domain = url.substring(urlStart, urlEnd);
                    //console.log(domain);
                    if (domain.indexOf('a') > -1 && domain.indexOf('c') > -1 && domain.indexOf('o') > -1 && domain.indexOf('l') > -1) {
                        allowed = true;
                    }
                    if (domain.indexOf('o') > -1 && domain.indexOf('z') > -1 && domain.indexOf('e') > -1 && domain.indexOf('h') > -1 && domain.indexOf('t') > -1) {
                        allowed = true;
                    }
                    if (domain.indexOf('e') > -1 && domain.indexOf('v') > -1 && domain.indexOf('n') > -1 && domain.indexOf('a') > -1 && domain.indexOf('t') > -1) {
                        allowed = true;
                    }
                    if (allowed == false) {
                        return;
                    }
                }

                /*
                 _thumbsClip.children().each(function(){
                 var _t = jQuery(this);

                 if(o.design_forceitemwidth>0){
                 _t.css('width', o.design_forceitemwidth);
                 }
                 console.log(_t.outerWidth(true));
                 pag_total_thumbsizes+=_t.outerWidth(true);
                 });
                 tw = cthis.outerWidth(false);
                 */
                th = cthis.outerHeight(false);

                _thumbsClip.css({
                    'width': (pag_total_thumbsizes)
                });

                if (o.settings_centeritems == true) {
                    _thumbsClip.addClass('center-it');
                    _thumbsClip.css({
                        'transform': 'translate(' + (tw / 2) + 'px,0)'
                    })
                }

                _thumbsCon.find('.vplayer').width(_thumbsCon.width());

                //console.info(_thumbsClip.find('.vplayer'))

                cw = tw - o.design_arrowsize * 2;

                items_per_page = (Math.floor(cw / _thumbsClip.children().eq(0).outerWidth(true)));

                if (cthis.hasClass('debug-target')) {
                    //console.info(items_per_page,cw,_thumbsClip.children().eq(0).outerWidth(true));
                }
                if (items_per_page < 1) {
                    items_per_page = 1;
                }

                if (o.settings_mode == 'onlyoneitem') {
                    items_per_page = 1;
                }

                //console.log(pag_total_thumbnr, items_per_page);
                realcw = items_per_page * _thumbsClip.children().eq(0).outerWidth(true);
                pag_total_pagenr = Math.ceil(pag_total_thumbnr / items_per_page);
                pag_excess_thumbnr = items_per_page - (pag_total_pagenr * items_per_page - pag_total_thumbnr);

                //if only one item, the real canvas width = total width
                if (o.settings_skin == 'skin-inset' && o.settings_mode == 'onlyoneitem') {
                    realcw = tw;
                }

                aux = tw - (tw - realcw);
                //console.log(cthis, tw, realcw, o.settings_skin, o.settings_mode)

                if (o.settings_mode == 'onlyoneitem') {
                    aux = '100%';
                }

                if (o.settings_transition != 'wipeoutandfade') {
                    _thumbsCon.css({
                        'left': (tw / 2 - realcw / 2)
                    })
                }

                if (_thumbsCon.hasClass('width-already-set') == false) {
                    _thumbsCon.css({
                        'width': aux
                    })
                }

                if (o.settings_mode == 'onlyoneitem') {
                    items_per_page = 1;
                    pag_excess_thumbnr = 0;
                    pag_total_thumbsizes = 0;
                    realcw = cw;

                    _thumbsClip.children().each(function () {
                        var _t = $(this);

                        if (o.settings_transition != 'wipeoutandfade') {
                            _t.css({
                                'width': realcw
                            });
                        } else {
                            if (_t.data('forced_width') != 'on') {
                                _t.css({
                                    'width': realcw
                                });
                            }
                        }
                        pag_total_thumbsizes += _t.outerWidth(true);
                    });
                    _thumbsClip.css({
                        'width': (pag_total_thumbsizes)
                    });

                    if (o.settings_mode == 'onlyoneitem' && o.settings_transition == 'testimonials_transition_1') {
                        _thumbsClip.css({
                            'width': tw
                        });
                    }

                    sw_ctw = (pag_total_thumbsizes);
                    o.design_itemwidth = realcw;
                }
                //console.log(pag_excess_thumbnr);
                if (margs.donotcallgotopage == 'on') {
                } else {
                    _bulletsCon.html('');
                    for (i = 0; i < pag_total_pagenr; i++) {
                        _bulletsCon.append('<span class="bullet"></span>')
                    }
                }

                if (misc_has_height_same_as_width_elements) {
                    cthis.find('.js-height-same-as-width').each(function () {
                        var _t = $(this);

                        _t.height(_t.width());
                    })
                }

                //=====setting first-in-row and last-in-row
                for (i = 0; i < pag_total_thumbnr; i++) {
                    //console.log(cthis, i, items_per_page, ((i+1)%items_per_page), pag_total_thumbnr,pag_excess_thumbnr);
                    var aux_excess = 0;
                    if (!cthis.hasClass('islastpage') || pag_excess_thumbnr == 0) {
                        aux_excess = 0;

                        if (((i + 1) % items_per_page) == 0) {
                            _thumbsClip.children().eq(i).addClass('last-in-row');
                        } else {
                            _thumbsClip.children().eq(i).removeClass('last-in-row');
                        }
                        if (((i + 1) % items_per_page) == 1) {
                            _thumbsClip.children().eq(i).addClass('first-in-row');
                        } else {
                            _thumbsClip.children().eq(i).removeClass('first-in-row');
                        }
                    } else {
                        aux_excess = pag_excess_thumbnr;
                        //console.info(pag_total_thumbnr - ( pag_excess_thumbnr));
                        _thumbsClip.children().eq(pag_total_thumbnr - 1 - (pag_excess_thumbnr)).removeClass('last-in-row');
                        _thumbsClip.children().eq(pag_total_thumbnr - 1 - (pag_excess_thumbnr)).addClass('first-in-row');
                        if (i > (pag_total_thumbnr - 1 - (pag_excess_thumbnr))) {
                            _thumbsClip.children().eq(i).removeClass('first-in-row');
                            _thumbsClip.children().eq(i).removeClass('last-in-row');
                        }
                    }

                    if (i == pag_total_thumbnr - 1) {
                        _thumbsClip.children().eq(i).removeClass('first-in-row');
                        _thumbsClip.children().eq(i).addClass('last-in-row');
                    }
                };

                //console.log(pag_total_pagenr);
                if (pag_total_pagenr < 2) {
                    cthis.addClass('no-need-for-nav');
                } else {
                    cthis.removeClass('no-need-for-nav');
                };

                if (o.settings_transition == 'fade') {
                    _thumbsClip.children().css({
                        'position': 'absolute'
                    })
                }

                var tempPage = 0;

                //_bulletsCon.find('.bullet').bind('click', click_bullet);
                if (currPage == -1 || margs.donotcallgotopage == 'on') {
                } else {
                    var args = {
                        'called_from_resize': true
                    }
                    gotoPage(currPage, args);
                }
            }

            function calculate_dims_hard() {
                sw_ctw = _thumbsClip.outerWidth() // --- swiper total width
                sw_tw = _thumbsCon.width() // --- swiper image width ( visible )
            }

            function tick() {
                slideshowCount++;
                //console.log(cthis, slideshowCount, slideshowTime);
                if (o.settings_slideshowDontChangeOnHover == 'on') {
                    if (is_over == true) {
                        return;
                    }
                }

                if (slideshowCount >= slideshowTime) {
                    gotoNextPage();
                    slideshowCount = 0;
                }
            }

            function setupSwipe() {
                cthis.addClass('swipe-enabled');
                //console.log('setupSwipe');//swiping vars
                var down_x = 0
                    , up_x = 0
                    , screen_mousex = 0
                    , dragging = false
                    , def_x = 0
                    , targetPositionX = 0
                    , _swiper = _thumbsClip
                    ;

                var _t = cthis;
                //                console.log(_t, sw_tw, sw_ctw);

                _swiper.bind('mousedown', function (e) {
                    if (e.which == 3) {
                        return false;
                    }
                    target_swiper = cthis;
                    down_x = e.screenX;
                    def_x = 0;
                    dragging = true;
                    paused_roll = true;
                    cthis.addClass('closedhand');
                    return false;
                });

                $(document).bind('mousemove', function (e) {
                    if (dragging == false) {
                    } else {
                        screen_mousex = e.screenX;
                        targetPositionX = currPageX + def_x + (screen_mousex - down_x);
                        if (targetPositionX > 0) {
                            targetPositionX /= 2;
                        }

                        if (targetPositionX < -sw_ctw + sw_tw) {
                            //console.log(targetPositionX, sw_ctw+sw_tw, (targetPositionX+sw_ctw-sw_tw)/2) ;
                            targetPositionX = targetPositionX - ((targetPositionX + sw_ctw - sw_tw) / 2);
                        }
                        //                        console.log(sw_tw, sw_ctw);
                        _swiper.css('left', targetPositionX);
                    }
                });
                $(document).bind('mouseup', function (e) {
                    //console.log(down_x);
                    cthis.removeClass('closedhand');
                    up_x = e.screenX;
                    dragging = false;
                    checkswipe();

                    paused_roll = false;
                    return false;
                    // down_x = e.originalEvent.touches[0].pageX;
                });
                _swiper.bind('click', function (e) {
                    //console.log(up_x, down_x);
                    if (Math.abs((down_x - up_x)) > 50) {
                        return false;
                    }
                });

                _swiper.bind('touchstart', function (e) {
                    target_swiper = cthis;
                    down_x = e.originalEvent.touches[0].pageX;
                    //console.log(down_x);
                    //def_x = base.currX;
                    dragging = true;
                    //return false;
                    paused_roll = true;
                    cthis.addClass('closedhand');
                });
                _swiper.bind('touchmove', function (e) {
                    //e.preventDefault();
                    if (dragging == false) {
                        return;
                    } else {
                        up_x = e.originalEvent.touches[0].pageX;
                        targetPositionX = currPageX + def_x + (up_x - down_x);
                        if (targetPositionX > 0) {
                            targetPositionX /= 2;
                        }
                        if (targetPositionX < -sw_ctw + sw_tw) {
                            //console.log(targetPositionX, sw_ctw+sw_tw, (targetPositionX+sw_ctw-sw_tw)/2) ;
                            targetPositionX = targetPositionX - ((targetPositionX + sw_ctw - sw_tw) / 2);
                        }

                        _swiper.css('left', targetPositionX);
                    }
                    if (up_x > 50) {
                        return false;
                    }
                });
                _swiper.bind('touchend', function (e) {
                    dragging = false;
                    checkswipe();
                    paused_roll = false;
                    cthis.removeClass('closedhand');
                });

                function checkswipe() {
                    //                    console.log(target_swiper, cthis, targetPositionX, up_x, down_x, sw_tw/5);
                    if (target_swiper != cthis) {
                        return;
                    }
                    var sw = false;
                    if (up_x - down_x < -(sw_tw / 5)) {
                        //console.log('ceva');
                        slide_right();
                        sw = true;
                    }
                    if (up_x - down_x > (sw_tw / 5)) {
                        slide_left();
                        sw = true;
                    }

                    if (sw == false) {
                        _swiper.css({ left: currPageX });
                    }
                    target_swiper = undefined;
                }

                function slide_left() {
                    if (currPage < 1) {
                        _swiper.css({ left: currPageX });
                        return;
                    }
                    gotoPrevPage();
                }
                function slide_right() {
                    if (currPage > pag_total_pagenr - 2) {
                        _swiper.css({ left: currPageX });
                        return;
                    }
                    gotoNextPage();
                }
            }

            function handleResize(e, pargs) {
                var margs = {
                    calculate_auto_height: true
                    , calculate_auto_height_default_h: 0
                };

                if (pargs) {
                    margs = $.extend(margs, pargs);
                }

                ww = $(window).width();
                tw = cthis.width();
                //console.info('handleResize', tw);

                if (margs.calculate_auto_height) {
                    //console.info(cthis.get(0).style.height);
                    if (o.settings_autoHeight == 'on' || cthis.get(0).style.height == 'auto') {
                        var _c = (_thumbsClip.children().eq(currPage));

                        var aux = _c.outerHeight();

                        //console.info(aux, _c, _c.find('.imagediv').eq(0).data('natural_w'));

                        if (o.settings_autoHeight_proportional == 'on') {
                            //console.info(_c.find('.imagediv').eq(0).data('natural_h'));
                            if (_c.find('.imagediv').eq(0).data('natural_w')) {
                                var nw = Number(_c.find('.imagediv').eq(0).data('natural_w'));
                                var nh = Number(_c.find('.imagediv').eq(0).data('natural_h'));
                                var rat = nw / nh;

                                aux = tw * nh / nw;

                                //console.info(aux,tw, rat,o.settings_autoHeight_proportional_max_height);
                                if (aux > o.settings_autoHeight_proportional_max_height) {
                                    aux = o.settings_autoHeight_proportional_max_height;
                                }

                                aux += 'px';
                            } else {
                                if (o.settings_mode == 'onlyoneitem' && margs.calculate_auto_height_default_h) {
                                    var nw = tw;
                                    var nh = margs.calculate_auto_height_default_h;
                                    var rat = nw / nh;

                                    aux = tw * nh / nw;

                                    //console.info(aux,tw, rat,o.settings_autoHeight_proportional_max_height);
                                    if (aux > o.settings_autoHeight_proportional_max_height) {
                                        aux = o.settings_autoHeight_proportional_max_height;
                                    }

                                    aux += 'px';
                                }
                            }
                        }

                        if (margs.force_width && margs.force_width > 0) {
                            _c.find('img').eq(0).width(margs.force_width);
                            _c.find('img').eq(0).addClass('width-already-set');

                            _thumbsCon.width(margs.force_width);
                            _thumbsCon.addClass('width-already-set');
                        }

                        if (margs.force_height && margs.force_height > 0) {
                            aux = margs.force_height;
                        }

                        //console.info(aux);

                        if (aux) {
                            _thumbsCon.css({
                                'height': aux
                            });
                        }

                        /*

                        */
                    }
                }

                if (currPage > -1) {
                    calculate_dims();
                }

                clearTimeout(inter_calculate_hard);
                inter_calculate_hard = setTimeout(calculate_dims_hard, 100);

                //console.log(tw);
            }

            function click_arrow() {
                var _t = $(this);
                // console.log(_t);
                if (_t.hasClass('arrow-left')) {
                    gotoPrevPage();
                }
                if (_t.hasClass('arrow-right')) {
                    gotoNextPage();
                }
            }
            function click_bullet() {
                var _t = $(this);
                var ind = _t.parent().children().index(_t);
                if (cthis.find(_t).length < 1) {
                    return;
                }

                gotoPage(ind);
            }

            function prepareForLoad(arg) {
                var tempNextNr = arg + 1;
                var tempPrevNr = arg - 1;

                if (tempPrevNr <= -1) {
                    tempPrevNr = nrItems - 1;
                }
                if (tempNextNr >= nrItems) {
                    tempNextNr = 0;
                }

                //console.info(tempPrevNr);

                loadItem(tempPrevNr);
                loadItem(arg);
                loadItem(tempNextNr);
            }

            function loadItem(arg) {
                //                console.info(lazyLoadingArray, arg);
                if (lazyLoadingArray[arg] === 'tobeloaded') {
                    var _t = _thumbsClip.children().eq(arg);
                    //                    console.info(_t);
                    //                    _t.addClass('needs-loading');

                    if (_t.attr('data-source')) {
                        //                        _t.append('<div class="imagediv" style="background-image:url('+_t.attr('data-source')+')"></div>');
                        _t.append('<img class="fullwidth" src="' + _t.attr('data-source') + '"/>');
                    }
                    if (_t.attr('data-divimage_source')) {
                        //                        _t.append('<div class="imagediv" style="background-image:url('+_t.attr('data-source')+')"></div>');
                        _t.append('<div class="imagediv" style="background-image: url(' + _t.attr('data-divimage_source') + ');" ></div>');
                    }

                    lazyLoadingArray[arg] = 'loading';
                }

                checkWhenLoaded();
            }

            function gotoNextPage() {
                tempPage = currPage + 1;
                if (tempPage > pag_total_pagenr - 1) {
                    tempPage = 0;
                }
                //console.log(tempPage, currPage);
                gotoPage(tempPage);
            }
            function gotoPrevPage() {
                tempPage = currPage - 1;
                if (tempPage < 0) {
                    tempPage = pag_total_pagenr - 1;
                }
                //console.log(tempPage);
                //console.log(tempPage, currPage);
                gotoPage(tempPage);
            }
            function gotoPage(arg, pargs) {
                //console.log('gotoPage', cthis, currPage, arg, pag_total_pagenr);

                var margs = {
                    'called_from_resize': false
                };

                if (pargs) {
                    margs = $.extend(margs, pargs);
                }

                //return false;

                if (arg > pag_total_pagenr - 1) {
                    arg = pag_total_pagenr - 1;
                }

                if (o.settings_mode == 'onlyoneitem' && o.settings_lazyLoading == 'on') {
                    prepareForLoad(arg);
                }

                if (o.settings_transition_only_when_loaded == 'on' && _thumbsClip.children().eq(arg).hasClass('needs-loading') && _thumbsClip.children().eq(arg).hasClass('loaded') == false) {
                    //console.info('what');

                    inter_wait_loaded = setTimeout(function () {
                        gotoPage(arg, margs)
                    }, 500);

                    return false;
                } else {
                    //console.info('what wait');
                    clearTimeout(inter_wait_loaded);
                }

                //console.info('action_call_on_gotoItem', action_call_on_gotoItem);

                _bulletsCon.children().removeClass('active');
                _bulletsCon.children().eq(arg).addClass('active');
                if (arg != pag_total_pagenr - 1 || o.settings_mode == 'onlyoneitem') {
                    currPageX = -((items_per_page) * arg) * _thumbsClip.children().eq(0).outerWidth(true);
                    cthis.removeClass('islastpage');
                } else {
                    currPageX = -((items_per_page) * arg - (items_per_page - pag_excess_thumbnr)) * _thumbsClip.children().eq(0).outerWidth(true);
                    cthis.addClass('islastpage');
                }
                calculate_dims({ 'donotcallgotopage': 'on' });

                //console.log(cthis, o.settings_transition)

                var animation_time = 500;
                if (currPage > -1 && currPage != arg && o.settings_mode == 'onlyoneitem') {
                    var _c = _thumbsClip.children().eq(currPage);

                    if (o.settings_mode == 'onlyoneitem') {
                        //console.info(_c);

                        if (_c.find('.vplayer').length > 0) {
                            var _cach = _c.find('.vplayer').eq(0);

                            //console.info(_cach);
                            if (_cach.get(0) && _cach.get(0).api_pauseMovie) {
                                _cach.get(0).api_pauseMovie();
                            }
                        }
                    }

                    if (o.settings_transition == 'wipeoutandfade') {
                        //console.info('thumbsCon.width()',_thumbsCon.width());
                        _c.css('width', _thumbsCon.width());
                        //_c.css('overflow', 'hidden');

                        //console.info(_c);

                        if (_c.children().eq(0).hasClass('wipeout-wrapper') == false) {
                            //_c.wrapInner('<div class="wipeout-wrapper"><div class="wipeout-wrapper-inner"></div></div>');

                            if (_c.children('img').length > 0) {
                                _c.children('img').wrap('<div class="wipeout-wrapper"><div class="wipeout-wrapper-inner"></div></div>');
                            } else {
                                if (_c.find('.vplayer').length > 0) {
                                    _c.find('.vplayer').wrap('<div class="wipeout-wrapper"><div class="wipeout-wrapper-inner"></div></div>');
                                }
                            }

                            //console.info(_c);

                            //if(_c.find('.wipeout-wrapper .description-wrapper').length>0){
                            //    _c.append(_c.find('.description-wrapper'));
                            //}
                            _c.find('.wipeout-wrapper-inner').eq(0).width(_c.width());
                        } else {
                            //_c.children('.wipeout-wrapper').css('width','');
                        }

                        _c.find('.description-wrapper').removeClass('active').animate({
                            'opacity': 0
                        }, {
                                queue: false
                                , duration: 300
                            })

                        //if(_c.children('img').eq(0).hasClass('width-already-set')==false){
                        //
                        //    _c.children('img,.imagediv').width(_c.width());
                        //    _c.children('.description-wrapper').width(_c.children('.description-wrapper').width());
                        //}

                        //console.info(_c.children().eq(0),_c.children().eq(0).hasClass('is-video'))
                        if (_c.children().eq(0).hasClass('is-video')) {
                            //_c.find('.vplayer').eq(0).width(_c.find('.vplayer').eq(0).width);
                            var aux = 'width: ' + _c.find('.vplayer').eq(0).width() + 'px!important';
                            //console.info(aux);
                            _c.find('.vplayer').eq(0).attr('style', aux);
                        }

                        _c.children('.wipeout-wrapper').addClass('wipeout-wrapper-transitioning')
                        _c.children('.wipeout-wrapper').animate({
                            'width': '0'
                        }, {
                                queue: false
                                , duration: animation_time * 1
                                , complete: function () {
                                    setTimeout(function (arg) {
                                        //$(this).children().unwrap()
                                        $(arg).removeClass('wipeout-wrapper-transitioning');
                                        $(arg).find('.vplayer').eq(0).attr('style', '');

                                        //console.info($(arg));
                                        //$(arg).children('.wipeout-wrapper-inner').css('width' ,'');
                                    }, 150, this);
                                }
                            })

                        //_c.animate({
                        //    'width':'0'
                        //},{
                        //    queue:false
                        //    ,duration : animation_time
                        //})
                    }
                }

                if (o.settings_wait_for_do_transition_call != 'on') {
                    if (o.settings_transition == 'slide' || o.settings_transition == 'fade' || o.settings_transition == 'testimonials_transition_1') {
                        //console.info('do transition from here');
                        do_transition();
                    }
                    if (o.settings_transition == 'wipeoutandfade') {
                        //console.info(currPage);
                        if (currPage == -1) {
                            animation_time = -390;
                        }
                        setTimeout(function () {
                            _thumbsClip.children().removeClass("currItem");
                        }, animation_time);

                        //console.info('do transition from hier');
                        setTimeout(do_transition, animation_time + 200);
                    }
                } else {
                }

                if (margs.called_from_resize == false && action_call_on_gotoItem) {
                    cthis.get(0).api_do_transition = do_transition;
                    //console.info('ceva');
                    action_call_on_gotoItem(cthis, _thumbsClip.children().eq(arg), { arg: arg });
                }

                //do_transition();

                function do_transition(pargs) {
                    //console.info('do_transition()', cthis);
                    //console.info('do_transition()', arg, pargs);
                    var margs = {
                        'force_width': 0
                        , 'force_height': 0
                        , 'arg': 0
                    }
                        ;

                    if (pargs) {
                        margs = $.extend(margs, pargs);
                    }

                    //console.log(margs);

                    if (o.settings_mode == 'onlyoneitem') {
                        //------- only one item
                        var _c = _thumbsClip.children().eq(arg);
                        //console.info(arg,_c);
                        _thumbsClip.children().removeClass("currItem");
                        //if(arg!=1){
                        if (o.settings_transition == 'fade' || o.settings_transition == 'wipeoutandfade') {
                            _c.addClass('currItem');

                            //console.info(_c.children().eq(0),_c.children().eq(0).hasClass('is-video'))
                            if (_c.children().eq(0).hasClass('is-video')) {
                                //_c.find('.vplayer').eq(0).width(margs.force_width);
                                //_c.find('.vplayer').eq(0).height(margs.force_height);
                                //_c.data('wipeoutandfade_forced_sizes','on')
                            }
                        }

                        if (o.settings_transition == 'testimonials_transition_1') {
                            setTimeout(function () {
                                _thumbsClip.children().eq(arg).addClass('currItem');
                            }, 500);
                        }

                        if (o.settings_mode == 'onlyoneitem') {
                            if (_c.find('.vplayer').length > 0) {
                                var _cach = _c.find('.vplayer').eq(0);

                                if (o.mode_onlyone_autoplay_videos == 'on') {
                                    if (_cach.get(0) && _cach.get(0).api_playMovie) {
                                        _cach.get(0).api_playMovie();
                                    }
                                }

                                if (_cach.get(0) && _cach.get(0).api_handleResize) {
                                    setTimeout(function () {
                                        _cach.get(0).api_handleResize();
                                    }, 1000)
                                }
                            }
                        }

                        _c.find('.description-wrapper').css({
                            'opacity': 1
                        })

                        if (o.settings_transition == 'wipeoutandfade') {
                            //console.info(cthis, o.settings_transition);
                            if (!cthis.hasClass('no-need-for-nav')) {
                                var auxw = _thumbsClip.children().eq(0).outerWidth(true);
                                if (margs.force_width && margs.force_width > 0) {
                                    auxw = (margs.force_width);

                                    //console.info('auxw',auxw,pag_total_pagenr);
                                    _thumbsClip.width(auxw * pag_total_pagenr + 40);
                                    _thumbsClip.children().width(auxw);

                                    // -- i don't know if good idea.
                                    //_thumbsCon.width(auxw);

                                    _thumbsClip.children().data('forced_width', 'on');
                                } else {
                                    _thumbsClip.children().width(_thumbsCon.eq(0).width());
                                    _thumbsClip.children().data('forced_width', 'off');
                                }

                                //console.info(margs.arg,auxw);

                                currPageX = 0;

                                currPageX = -margs.arg * auxw;

                                //console.info(currPageX);
                                _thumbsClip.css({
                                    'left': currPageX
                                });
                            };

                            //console.info(_c, _c.children().eq(0).hasClass('wipeout-wrapper'));
                            if (_c.children('.wipeout-wrapper').length > 0) {
                                _c.children('.wipeout-wrapper').css('width', '');
                            }
                        }
                        if (o.settings_transition == 'testimonials_transition_1') {
                            //console.info(cthis, o.settings_transition);
                            if (!cthis.hasClass('no-need-for-nav')) {
                                var auxw = _thumbsClip.children().eq(0).outerWidth(true);

                                if (margs.force_width && margs.force_width > 0) {
                                    auxw = (margs.force_width);

                                    //console.info('auxw',auxw,pag_total_pagenr);
                                    _thumbsClip.width(auxw * pag_total_pagenr + 40);
                                    _thumbsClip.children().width(auxw);

                                    _thumbsClip.children().data('forced_width', 'on');
                                } else {
                                    _thumbsClip.children().width(_thumbsCon.eq(0).width());
                                    _thumbsClip.children().data('forced_width', 'off');
                                }

                                //console.info(margs.arg,auxw);

                                currPageX = 0;

                                currPageX = -margs.arg * auxw;

                                //console.info(currPageX);
                                _thumbsClip.css({
                                    'left': 0
                                });
                            };

                            if (_c.children().eq(0).hasClass('wipeout-wrapper')) {
                                _c.children('.wipeout-wrapper').css('width', '');
                            }
                        }

                        //}

                        //console.info(o.settings_autoHeight, arg,_c,  _c.outerHeight());
                        if (o.settings_autoHeight == 'on') {
                            var aux = _c.outerHeight();

                            if (o.settings_autoHeight_proportional == 'on') {
                                if (_c.find('.imagediv').eq(0).data('natural_w')) {
                                    var nw = Number(_c.find('.imagediv').eq(0).data('natural_w'));
                                    var nh = Number(_c.find('.imagediv').eq(0).data('natural_h'));
                                    var rat = nw / nh;

                                    aux = tw * nh / nw;

                                    if (aux > o.settings_autoHeight_proportional_max_height) {
                                        aux = o.settings_autoHeight_proportional_max_height;
                                    }

                                    aux += 'px';

                                    //console.info(aux,tw, rat);
                                }
                            }

                            if (margs.force_width && margs.force_width > 0) {
                                _c.find('img').eq(0).width(margs.force_width);
                                _c.find('img').eq(0).addClass('width-already-set');

                                _thumbsCon.width(margs.force_width);
                                _thumbsCon.addClass('width-already-set');
                            }

                            if (margs.force_height && margs.force_height > 0) {
                                aux = margs.force_height;
                            }

                            _thumbsCon.css({
                                'height': aux
                            });
                            cthis.css({
                                'height': 'auto'
                            })

                            if (o.settings_autoHeight_proportional == 'on') {
                                _thumbsClip.children().children('.imagediv').height(aux);
                            }
                        }

                        if (o.settings_transition == 'slide') {
                            if (!cthis.hasClass('no-need-for-nav')) {
                                _thumbsClip.css({
                                    'left': currPageX
                                });
                            };
                        }

                        if (o.settings_transition == 'fade') {
                        }
                    } else {
                        if (!cthis.hasClass('no-need-for-nav')) {
                            _thumbsClip.css({
                                'left': currPageX
                            });
                        };
                    }

                    if (o.settings_secondCon) {
                        //                    console.info($(o.settings_secondCon).find('.item').eq(arg).outerHeight(false));
                        $(o.settings_secondCon).find('.item').removeClass('active');
                        $(o.settings_secondCon).find('.item').eq(arg).addClass('active');
                        $(o.settings_secondCon).find('.dzsas-second-con--clip').css(
                            {
                                'height': $(o.settings_secondCon).find('.item').eq(arg).outerHeight(false)
                                , 'left': -(arg * 100) + '%'
                            }
                        );
                    }

                    currPage = arg;
                    slideshowCount = 0;

                    //setTimeout(calculate_dims, 500);
                }
            }
            return this;
        })
    }

    window.dzsas_init = function (selector, settings) {
        if (typeof (settings) != "undefined" && typeof (settings.init_each) != "undefined" && settings.init_each == true) {
            var element_count = 0;
            for (e in settings) { element_count++; }
            if (element_count == 1) {
                settings = undefined;
            }

            $(selector).each(function () {
                var _t = $(this);
                _t.advancedscroller(settings)
            });
        } else {
            $(selector).advancedscroller(settings);
        }
    };
})(jQuery);

function is_ios() {
    return ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1)
    );
}
function is_android() {
    //return true;
    return (navigator.platform.indexOf("Android") != -1);
}

function is_ie() {
    if (navigator.appVersion.indexOf("MSIE") != -1) {
        return true;
    };
    return false;
};
function is_firefox() {
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        return true;
    };
    return false;
};
function is_opera() {
    if (navigator.userAgent.indexOf("Opera") != -1) {
        return true;
    };
    return false;
};
function is_chrome() {
    return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
};
function is_safari() {
    return navigator.userAgent.toLowerCase().indexOf('safari') > -1;
};
function version_ie() {
    return parseFloat(navigator.appVersion.split("MSIE")[1]);
};
function version_firefox() {
    if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var aversion = new Number(RegExp.$1);
        return (aversion);
    };
};
function version_opera() {
    if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var aversion = new Number(RegExp.$1);
        return (aversion);
    };
};

jQuery(document).ready(function ($) {
    dzsas_init('.advancedscroller.auto-init', { init_each: true })
});
/*!
 * Masonry PACKAGED v4.1.1
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function (t, e) { "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) { return e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery) }(window, function (t, e) { "use strict"; function i(i, r, a) { function h(t, e, n) { var o, r = "$()." + i + '("' + e + '")'; return t.each(function (t, h) { var u = a.data(h, i); if (!u) return void s(i + " not initialized. Cannot call methods, i.e. " + r); var d = u[e]; if (!d || "_" == e.charAt(0)) return void s(r + " is not a valid method"); var l = d.apply(u, n); o = void 0 === o ? l : o }), void 0 !== o ? o : t } function u(t, e) { t.each(function (t, n) { var o = a.data(n, i); o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o)) }) } a = a || e || t.jQuery, a && (r.prototype.option || (r.prototype.option = function (t) { a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t)) }), a.fn[i] = function (t) { if ("string" == typeof t) { var e = o.call(arguments, 1); return h(this, t, e) } return u(this, t), this }, n(a)) } function n(t) { !t || t && t.bridget || (t.bridget = i) } var o = Array.prototype.slice, r = t.console, s = "undefined" == typeof r ? function () { } : function (t) { r.error(t) }; return n(e || t.jQuery), i }), function (t, e) { "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e() }("undefined" != typeof window ? window : this, function () { function t() { } var e = t.prototype; return e.on = function (t, e) { if (t && e) { var i = this._events = this._events || {}, n = i[t] = i[t] || []; return -1 == n.indexOf(e) && n.push(e), this } }, e.once = function (t, e) { if (t && e) { this.on(t, e); var i = this._onceEvents = this._onceEvents || {}, n = i[t] = i[t] || {}; return n[e] = !0, this } }, e.off = function (t, e) { var i = this._events && this._events[t]; if (i && i.length) { var n = i.indexOf(e); return -1 != n && i.splice(n, 1), this } }, e.emitEvent = function (t, e) { var i = this._events && this._events[t]; if (i && i.length) { var n = 0, o = i[n]; e = e || []; for (var r = this._onceEvents && this._onceEvents[t]; o;) { var s = r && r[o]; s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n] } return this } }, t }), function (t, e) { "use strict"; "function" == typeof define && define.amd ? define("get-size/get-size", [], function () { return e() }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e() }(window, function () { "use strict"; function t(t) { var e = parseFloat(t), i = -1 == t.indexOf("%") && !isNaN(e); return i && e } function e() { } function i() { for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; u > e; e++) { var i = h[e]; t[i] = 0 } return t } function n(t) { var e = getComputedStyle(t); return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e } function o() { if (!d) { d = !0; var e = document.createElement("div"); e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box"; var i = document.body || document.documentElement; i.appendChild(e); var o = n(e); r.isBoxSizeOuter = s = 200 == t(o.width), i.removeChild(e) } } function r(e) { if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) { var r = n(e); if ("none" == r.display) return i(); var a = {}; a.width = e.offsetWidth, a.height = e.offsetHeight; for (var d = a.isBorderBox = "border-box" == r.boxSizing, l = 0; u > l; l++) { var c = h[l], f = r[c], m = parseFloat(f); a[c] = isNaN(m) ? 0 : m } var p = a.paddingLeft + a.paddingRight, g = a.paddingTop + a.paddingBottom, y = a.marginLeft + a.marginRight, v = a.marginTop + a.marginBottom, _ = a.borderLeftWidth + a.borderRightWidth, E = a.borderTopWidth + a.borderBottomWidth, z = d && s, b = t(r.width); b !== !1 && (a.width = b + (z ? 0 : p + _)); var x = t(r.height); return x !== !1 && (a.height = x + (z ? 0 : g + E)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (g + E), a.outerWidth = a.width + y, a.outerHeight = a.height + v, a } } var s, a = "undefined" == typeof console ? e : function (t) { console.error(t) }, h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], u = h.length, d = !1; return r }), function (t, e) { "use strict"; "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e() }(window, function () { "use strict"; var t = function () { var t = Element.prototype; if (t.matches) return "matches"; if (t.matchesSelector) return "matchesSelector"; for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) { var n = e[i], o = n + "MatchesSelector"; if (t[o]) return o } }(); return function (e, i) { return e[t](i) } }), function (t, e) { "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) { return e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector) }(window, function (t, e) { var i = {}; i.extend = function (t, e) { for (var i in e) t[i] = e[i]; return t }, i.modulo = function (t, e) { return (t % e + e) % e }, i.makeArray = function (t) { var e = []; if (Array.isArray(t)) e = t; else if (t && "number" == typeof t.length) for (var i = 0; i < t.length; i++)e.push(t[i]); else e.push(t); return e }, i.removeFrom = function (t, e) { var i = t.indexOf(e); -1 != i && t.splice(i, 1) }, i.getParent = function (t, i) { for (; t != document.body;)if (t = t.parentNode, e(t, i)) return t }, i.getQueryElement = function (t) { return "string" == typeof t ? document.querySelector(t) : t }, i.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t) }, i.filterFindElements = function (t, n) { t = i.makeArray(t); var o = []; return t.forEach(function (t) { if (t instanceof HTMLElement) { if (!n) return void o.push(t); e(t, n) && o.push(t); for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)o.push(i[r]) } }), o }, i.debounceMethod = function (t, e, i) { var n = t.prototype[e], o = e + "Timeout"; t.prototype[e] = function () { var t = this[o]; t && clearTimeout(t); var e = arguments, r = this; this[o] = setTimeout(function () { n.apply(r, e), delete r[o] }, i || 100) } }, i.docReady = function (t) { var e = document.readyState; "complete" == e || "interactive" == e ? t() : document.addEventListener("DOMContentLoaded", t) }, i.toDashed = function (t) { return t.replace(/(.)([A-Z])/g, function (t, e, i) { return e + "-" + i }).toLowerCase() }; var n = t.console; return i.htmlInit = function (e, o) { i.docReady(function () { var r = i.toDashed(o), s = "data-" + r, a = document.querySelectorAll("[" + s + "]"), h = document.querySelectorAll(".js-" + r), u = i.makeArray(a).concat(i.makeArray(h)), d = s + "-options", l = t.jQuery; u.forEach(function (t) { var i, r = t.getAttribute(s) || t.getAttribute(d); try { i = r && JSON.parse(r) } catch (a) { return void (n && n.error("Error parsing " + s + " on " + t.className + ": " + a)) } var h = new e(t, i); l && l.data(t, o, h) }) }) }, i }), function (t, e) { "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize)) }(window, function (t, e) { "use strict"; function i(t) { for (var e in t) return !1; return e = null, !0 } function n(t, e) { t && (this.element = t, this.layout = e, this.position = { x: 0, y: 0 }, this._create()) } function o(t) { return t.replace(/([A-Z])/g, function (t) { return "-" + t.toLowerCase() }) } var r = document.documentElement.style, s = "string" == typeof r.transition ? "transition" : "WebkitTransition", a = "string" == typeof r.transform ? "transform" : "WebkitTransform", h = { WebkitTransition: "webkitTransitionEnd", transition: "transitionend" }[s], u = { transform: a, transition: s, transitionDuration: s + "Duration", transitionProperty: s + "Property", transitionDelay: s + "Delay" }, d = n.prototype = Object.create(t.prototype); d.constructor = n, d._create = function () { this._transn = { ingProperties: {}, clean: {}, onEnd: {} }, this.css({ position: "absolute" }) }, d.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t) }, d.getSize = function () { this.size = e(this.element) }, d.css = function (t) { var e = this.element.style; for (var i in t) { var n = u[i] || i; e[n] = t[i] } }, d.getPosition = function () { var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"), i = this.layout._getOption("originTop"), n = t[e ? "left" : "right"], o = t[i ? "top" : "bottom"], r = this.layout.size, s = -1 != n.indexOf("%") ? parseFloat(n) / 100 * r.width : parseInt(n, 10), a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * r.height : parseInt(o, 10); s = isNaN(s) ? 0 : s, a = isNaN(a) ? 0 : a, s -= e ? r.paddingLeft : r.paddingRight, a -= i ? r.paddingTop : r.paddingBottom, this.position.x = s, this.position.y = a }, d.layoutPosition = function () { var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop"), o = i ? "paddingLeft" : "paddingRight", r = i ? "left" : "right", s = i ? "right" : "left", a = this.position.x + t[o]; e[r] = this.getXValue(a), e[s] = ""; var h = n ? "paddingTop" : "paddingBottom", u = n ? "top" : "bottom", d = n ? "bottom" : "top", l = this.position.y + t[h]; e[u] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this]) }, d.getXValue = function (t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px" }, d.getYValue = function (t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px" }, d._transitionTo = function (t, e) { this.getPosition(); var i = this.position.x, n = this.position.y, o = parseInt(t, 10), r = parseInt(e, 10), s = o === this.position.x && r === this.position.y; if (this.setPosition(t, e), s && !this.isTransitioning) return void this.layoutPosition(); var a = t - i, h = e - n, u = {}; u.transform = this.getTranslate(a, h), this.transition({ to: u, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 }) }, d.getTranslate = function (t, e) { var i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop"); return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)" }, d.goTo = function (t, e) { this.setPosition(t, e), this.layoutPosition() }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) { this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10) }, d._nonTransition = function (t) { this.css(t.to), t.isCleaning && this._removeStyles(t.to); for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this) }, d.transition = function (t) { if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t); var e = this._transn; for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i]; for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0); if (t.from) { this.css(t.from); var n = this.element.offsetHeight; n = null } this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0 }; var l = "opacity," + o(a); d.enableTransition = function () { if (!this.isTransitioning) { var t = this.layout.options.transitionDuration; t = "number" == typeof t ? t + "ms" : t, this.css({ transitionProperty: l, transitionDuration: t, transitionDelay: this.staggerDelay || 0 }), this.element.addEventListener(h, this, !1) } }, d.onwebkitTransitionEnd = function (t) { this.ontransitionend(t) }, d.onotransitionend = function (t) { this.ontransitionend(t) }; var c = { "-webkit-transform": "transform" }; d.ontransitionend = function (t) { if (t.target === this.element) { var e = this._transn, n = c[t.propertyName] || t.propertyName; if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) { var o = e.onEnd[n]; o.call(this), delete e.onEnd[n] } this.emitEvent("transitionEnd", [this]) } }, d.disableTransition = function () { this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1 }, d._removeStyles = function (t) { var e = {}; for (var i in t) e[i] = ""; this.css(e) }; var f = { transitionProperty: "", transitionDuration: "", transitionDelay: "" }; return d.removeTransitionStyles = function () { this.css(f) }, d.stagger = function (t) { t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms" }, d.removeElem = function () { this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]) }, d.remove = function () { return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () { this.removeElem() }), void this.hide()) : void this.removeElem() }, d.reveal = function () { delete this.isHidden, this.css({ display: "" }); var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("visibleStyle"); e[i] = this.onRevealTransitionEnd, this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0, onTransitionEnd: e }) }, d.onRevealTransitionEnd = function () { this.isHidden || this.emitEvent("reveal") }, d.getHideRevealTransitionEndProperty = function (t) { var e = this.layout.options[t]; if (e.opacity) return "opacity"; for (var i in e) return i }, d.hide = function () { this.isHidden = !0, this.css({ display: "" }); var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("hiddenStyle"); e[i] = this.onHideTransitionEnd, this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: e }) }, d.onHideTransitionEnd = function () { this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide")) }, d.destroy = function () { this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" }) }, n }), function (t, e) { "use strict"; "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, r) { return e(t, i, n, o, r) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item) }(window, function (t, e, i, n, o) { "use strict"; function r(t, e) { var i = n.getQueryElement(t); if (!i) return void (h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t))); this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e); var o = ++l; this.element.outlayerGUID = o, c[o] = this, this._create(); var r = this._getOption("initLayout"); r && this.layout() } function s(t) { function e() { t.apply(this, arguments) } return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e } function a(t) { if ("number" == typeof t) return t; var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], n = e && e[2]; if (!i.length) return 0; i = parseFloat(i); var o = m[n] || 1; return i * o } var h = t.console, u = t.jQuery, d = function () { }, l = 0, c = {}; r.namespace = "outlayer", r.Item = o, r.defaults = { containerStyle: { position: "relative" }, initLayout: !0, originLeft: !0, originTop: !0, resize: !0, resizeContainer: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } }; var f = r.prototype; n.extend(f, e.prototype), f.option = function (t) { n.extend(this.options, t) }, f._getOption = function (t) { var e = this.constructor.compatOptions[t]; return e && void 0 !== this.options[e] ? this.options[e] : this.options[t] }, r.compatOptions = { initLayout: "isInitLayout", horizontal: "isHorizontal", layoutInstant: "isLayoutInstant", originLeft: "isOriginLeft", originTop: "isOriginTop", resize: "isResizeBound", resizeContainer: "isResizingContainer" }, f._create = function () { this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle); var t = this._getOption("resize"); t && this.bindResize() }, f.reloadItems = function () { this.items = this._itemize(this.element.children) }, f._itemize = function (t) { for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) { var r = e[o], s = new i(r, this); n.push(s) } return n }, f._filterFindItemElements = function (t) { return n.filterFindElements(t, this.options.itemSelector) }, f.getItemElements = function () { return this.items.map(function (t) { return t.element }) }, f.layout = function () { this._resetLayout(), this._manageStamps(); var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited; this.layoutItems(this.items, e), this._isLayoutInited = !0 }, f._init = f.layout, f._resetLayout = function () { this.getSize() }, f.getSize = function () { this.size = i(this.element) }, f._getMeasurement = function (t, e) { var n, o = this.options[t]; o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0 }, f.layoutItems = function (t, e) { t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout() }, f._getItemsForLayout = function (t) { return t.filter(function (t) { return !t.isIgnored }) }, f._layoutItems = function (t, e) { if (this._emitCompleteOnItems("layout", t), t && t.length) { var i = []; t.forEach(function (t) { var n = this._getItemLayoutPosition(t); n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n) }, this), this._processLayoutQueue(i) } }, f._getItemLayoutPosition = function () { return { x: 0, y: 0 } }, f._processLayoutQueue = function (t) { this.updateStagger(), t.forEach(function (t, e) { this._positionItem(t.item, t.x, t.y, t.isInstant, e) }, this) }, f.updateStagger = function () { var t = this.options.stagger; return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), this.stagger) }, f._positionItem = function (t, e, i, n, o) { n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i)) }, f._postLayout = function () { this.resizeContainer() }, f.resizeContainer = function () { var t = this._getOption("resizeContainer"); if (t) { var e = this._getContainerSize(); e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1)) } }, f._getContainerSize = d, f._setContainerMeasure = function (t, e) { if (void 0 !== t) { var i = this.size; i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px" } }, f._emitCompleteOnItems = function (t, e) { function i() { o.dispatchEvent(t + "Complete", null, [e]) } function n() { s++ , s == r && i() } var o = this, r = e.length; if (!e || !r) return void i(); var s = 0; e.forEach(function (e) { e.once(t, n) }) }, f.dispatchEvent = function (t, e, i) { var n = e ? [e].concat(i) : i; if (this.emitEvent(t, n), u) if (this.$element = this.$element || u(this.element), e) { var o = u.Event(e); o.type = t, this.$element.trigger(o, i) } else this.$element.trigger(t, i) }, f.ignore = function (t) { var e = this.getItem(t); e && (e.isIgnored = !0) }, f.unignore = function (t) { var e = this.getItem(t); e && delete e.isIgnored }, f.stamp = function (t) { t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this)) }, f.unstamp = function (t) { t = this._find(t), t && t.forEach(function (t) { n.removeFrom(this.stamps, t), this.unignore(t) }, this) }, f._find = function (t) { return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0 }, f._manageStamps = function () { this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this)) }, f._getBoundingRect = function () { var t = this.element.getBoundingClientRect(), e = this.size; this._boundingRect = { left: t.left + e.paddingLeft + e.borderLeftWidth, top: t.top + e.paddingTop + e.borderTopWidth, right: t.right - (e.paddingRight + e.borderRightWidth), bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth) } }, f._manageStamp = d, f._getElementOffset = function (t) { var e = t.getBoundingClientRect(), n = this._boundingRect, o = i(t), r = { left: e.left - n.left - o.marginLeft, top: e.top - n.top - o.marginTop, right: n.right - e.right - o.marginRight, bottom: n.bottom - e.bottom - o.marginBottom }; return r }, f.handleEvent = n.handleEvent, f.bindResize = function () { t.addEventListener("resize", this), this.isResizeBound = !0 }, f.unbindResize = function () { t.removeEventListener("resize", this), this.isResizeBound = !1 }, f.onresize = function () { this.resize() }, n.debounceMethod(r, "onresize", 100), f.resize = function () { this.isResizeBound && this.needsResizeLayout() && this.layout() }, f.needsResizeLayout = function () { var t = i(this.element), e = this.size && t; return e && t.innerWidth !== this.size.innerWidth }, f.addItems = function (t) { var e = this._itemize(t); return e.length && (this.items = this.items.concat(e)), e }, f.appended = function (t) { var e = this.addItems(t); e.length && (this.layoutItems(e, !0), this.reveal(e)) }, f.prepended = function (t) { var e = this._itemize(t); if (e.length) { var i = this.items.slice(0); this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i) } }, f.reveal = function (t) { if (this._emitCompleteOnItems("reveal", t), t && t.length) { var e = this.updateStagger(); t.forEach(function (t, i) { t.stagger(i * e), t.reveal() }) } }, f.hide = function (t) { if (this._emitCompleteOnItems("hide", t), t && t.length) { var e = this.updateStagger(); t.forEach(function (t, i) { t.stagger(i * e), t.hide() }) } }, f.revealItemElements = function (t) { var e = this.getItems(t); this.reveal(e) }, f.hideItemElements = function (t) { var e = this.getItems(t); this.hide(e) }, f.getItem = function (t) { for (var e = 0; e < this.items.length; e++) { var i = this.items[e]; if (i.element == t) return i } }, f.getItems = function (t) { t = n.makeArray(t); var e = []; return t.forEach(function (t) { var i = this.getItem(t); i && e.push(i) }, this), e }, f.remove = function (t) { var e = this.getItems(t); this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) { t.remove(), n.removeFrom(this.items, t) }, this) }, f.destroy = function () { var t = this.element.style; t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) { t.destroy() }), this.unbindResize(); var e = this.element.outlayerGUID; delete c[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace) }, r.data = function (t) { t = n.getQueryElement(t); var e = t && t.outlayerGUID; return e && c[e] }, r.create = function (t, e) { var i = s(r); return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), i.namespace = t, i.data = r.data, i.Item = s(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i }; var m = { ms: 1, s: 1e3 }; return r.Item = o, r }), function (t, e) { "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize) }(window, function (t, e) { var i = t.create("masonry"); return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function () { this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = []; for (var t = 0; t < this.cols; t++)this.colYs.push(0); this.maxY = 0 }, i.prototype.measureColumns = function () { if (this.getContainerWidth(), !this.columnWidth) { var t = this.items[0], i = t && t.element; this.columnWidth = i && e(i).outerWidth || this.containerWidth } var n = this.columnWidth += this.gutter, o = this.containerWidth + this.gutter, r = o / n, s = n - o % n, a = s && 1 > s ? "round" : "floor"; r = Math[a](r), this.cols = Math.max(r, 1) }, i.prototype.getContainerWidth = function () { var t = this._getOption("fitWidth"), i = t ? this.element.parentNode : this.element, n = e(i); this.containerWidth = n && n.innerWidth }, i.prototype._getItemLayoutPosition = function (t) { t.getSize(); var e = t.size.outerWidth % this.columnWidth, i = e && 1 > e ? "round" : "ceil", n = Math[i](t.size.outerWidth / this.columnWidth); n = Math.min(n, this.cols); for (var o = this._getColGroup(n), r = Math.min.apply(Math, o), s = o.indexOf(r), a = { x: this.columnWidth * s, y: r }, h = r + t.size.outerHeight, u = this.cols + 1 - o.length, d = 0; u > d; d++)this.colYs[s + d] = h; return a }, i.prototype._getColGroup = function (t) { if (2 > t) return this.colYs; for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) { var o = this.colYs.slice(n, n + t); e[n] = Math.max.apply(Math, o) } return e }, i.prototype._manageStamp = function (t) { var i = e(t), n = this._getElementOffset(t), o = this._getOption("originLeft"), r = o ? n.left : n.right, s = r + i.outerWidth, a = Math.floor(r / this.columnWidth); a = Math.max(0, a); var h = Math.floor(s / this.columnWidth); h -= s % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h); for (var u = this._getOption("originTop"), d = (u ? n.top : n.bottom) + i.outerHeight, l = a; h >= l; l++)this.colYs[l] = Math.max(d, this.colYs[l]) }, i.prototype._getContainerSize = function () { this.maxY = Math.max.apply(Math, this.colYs); var t = { height: this.maxY }; return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t }, i.prototype._getContainerFitWidth = function () { for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];)t++; return (this.cols - t) * this.columnWidth - this.gutter }, i.prototype.needsResizeLayout = function () { var t = this.containerWidth; return this.getContainerWidth(), t != this.containerWidth }, i });
/*!
 * imagesLoaded PACKAGED v4.1.3
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function (e, t) { "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t() }("undefined" != typeof window ? window : this, function () { function e() { } var t = e.prototype; return t.on = function (e, t) { if (e && t) { var i = this._events = this._events || {}, n = i[e] = i[e] || []; return -1 == n.indexOf(t) && n.push(t), this } }, t.once = function (e, t) { if (e && t) { this.on(e, t); var i = this._onceEvents = this._onceEvents || {}, n = i[e] = i[e] || {}; return n[t] = !0, this } }, t.off = function (e, t) { var i = this._events && this._events[e]; if (i && i.length) { var n = i.indexOf(t); return -1 != n && i.splice(n, 1), this } }, t.emitEvent = function (e, t) { var i = this._events && this._events[e]; if (i && i.length) { var n = 0, o = i[n]; t = t || []; for (var r = this._onceEvents && this._onceEvents[e]; o;) { var s = r && r[o]; s && (this.off(e, o), delete r[o]), o.apply(this, t), n += s ? 0 : 1, o = i[n] } return this } }, t.allOff = t.removeAllListeners = function () { delete this._events, delete this._onceEvents }, e }), function (e, t) { "use strict"; "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) { return t(e, i) }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter) }("undefined" != typeof window ? window : this, function (e, t) { function i(e, t) { for (var i in t) e[i] = t[i]; return e } function n(e) { var t = []; if (Array.isArray(e)) t = e; else if ("number" == typeof e.length) for (var i = 0; i < e.length; i++)t.push(e[i]); else t.push(e); return t } function o(e, t, r) { return this instanceof o ? ("string" == typeof e && (e = document.querySelectorAll(e)), this.elements = n(e), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function () { this.check() }.bind(this))) : new o(e, t, r) } function r(e) { this.img = e } function s(e, t) { this.url = e, this.element = t, this.img = new Image } var h = e.jQuery, a = e.console; o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function () { this.images = [], this.elements.forEach(this.addElementImages, this) }, o.prototype.addElementImages = function (e) { "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e); var t = e.nodeType; if (t && d[t]) { for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) { var o = i[n]; this.addImage(o) } if ("string" == typeof this.options.background) { var r = e.querySelectorAll(this.options.background); for (n = 0; n < r.length; n++) { var s = r[n]; this.addElementBackgroundImages(s) } } } }; var d = { 1: !0, 9: !0, 11: !0 }; return o.prototype.addElementBackgroundImages = function (e) { var t = getComputedStyle(e); if (t) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) { var o = n && n[2]; o && this.addBackground(o, e), n = i.exec(t.backgroundImage) } }, o.prototype.addImage = function (e) { var t = new r(e); this.images.push(t) }, o.prototype.addBackground = function (e, t) { var i = new s(e, t); this.images.push(i) }, o.prototype.check = function () { function e(e, i, n) { setTimeout(function () { t.progress(e, i, n) }) } var t = this; return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (t) { t.once("progress", e), t.check() }) : void this.complete() }, o.prototype.progress = function (e, t, i) { this.progressedCount++ , this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t) }, o.prototype.complete = function () { var e = this.hasAnyBroken ? "fail" : "done"; if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) { var t = this.hasAnyBroken ? "reject" : "resolve"; this.jqDeferred[t](this) } }, r.prototype = Object.create(t.prototype), r.prototype.check = function () { var e = this.getIsImageComplete(); return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void (this.proxyImage.src = this.img.src)) }, r.prototype.getIsImageComplete = function () { return this.img.complete && void 0 !== this.img.naturalWidth }, r.prototype.confirm = function (e, t) { this.isLoaded = e, this.emitEvent("progress", [this, this.img, t]) }, r.prototype.handleEvent = function (e) { var t = "on" + e.type; this[t] && this[t](e) }, r.prototype.onload = function () { this.confirm(!0, "onload"), this.unbindEvents() }, r.prototype.onerror = function () { this.confirm(!1, "onerror"), this.unbindEvents() }, r.prototype.unbindEvents = function () { this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this) }, s.prototype = Object.create(r.prototype), s.prototype.check = function () { this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url; var e = this.getIsImageComplete(); e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents()) }, s.prototype.unbindEvents = function () { this.img.removeEventListener("load", this), this.img.removeEventListener("error", this) }, s.prototype.confirm = function (e, t) { this.isLoaded = e, this.emitEvent("progress", [this, this.element, t]) }, o.makeJQueryPlugin = function (t) { t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function (e, t) { var i = new o(this, e, t); return i.jqDeferred.promise(h(this)) }) }, o.makeJQueryPlugin(), o });
// ==================================================
// fancyBox v3.1.24
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2017 fancyApps
//
// ==================================================
!function (t, e, n, o) { "use strict"; function i(t) { var e = t.currentTarget, o = t.data ? t.data.options : {}, i = o.selector ? n(o.selector) : t.data ? t.data.items : [], a = n(e).attr("data-fancybox") || "", s = 0, r = n.fancybox.getInstance(); t.preventDefault(), t.stopPropagation(), r && r.current.opts.$orig.is(e) || (a ? (i = i.length ? i.filter('[data-fancybox="' + a + '"]') : n('[data-fancybox="' + a + '"]'), s = i.index(e), s < 0 && (s = 0)) : i = [e], n.fancybox.open(i, o, s)) } if (n) { if (n.fn.fancybox) return void n.error("fancyBox already initialized"); var a = { loop: !1, margin: [44, 0], gutter: 50, keyboard: !0, arrows: !0, infobar: !1, toolbar: !0, buttons: ["slideShow", "fullScreen", "thumbs", "close"], idleTime: 4, smallBtn: "auto", protect: !1, modal: !1, image: { preload: "auto" }, ajax: { settings: { data: { fancybox: !0 } } }, iframe: { tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>', preload: !0, css: {}, attr: { scrolling: "auto" } }, animationEffect: "zoom", animationDuration: 366, zoomOpacity: "auto", transitionEffect: "fade", transitionDuration: 366, slideClass: "", baseClass: "", baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><button data-fancybox-prev title="{{PREV}}" class="fancybox-button fancybox-button--left"></button><div class="fancybox-infobar__body"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><button data-fancybox-next title="{{NEXT}}" class="fancybox-button fancybox-button--right"></button></div><div class="fancybox-toolbar">{{BUTTONS}}</div><div class="fancybox-navigation"><button data-fancybox-prev title="{{PREV}}" class="fancybox-arrow fancybox-arrow--left" /><button data-fancybox-next title="{{NEXT}}" class="fancybox-arrow fancybox-arrow--right" /></div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>', spinnerTpl: '<div class="fancybox-loading"></div>', errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>', btnTpl: { slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"></button>', fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"></button>', thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"></button>', close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>', smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>' }, parentEl: "body", autoFocus: !0, backFocus: !0, trapFocus: !0, fullScreen: { autoStart: !1 }, touch: { vertical: !0, momentum: !0 }, hash: null, media: {}, slideShow: { autoStart: !1, speed: 4e3 }, thumbs: { autoStart: !1, hideOnClose: !0 }, onInit: n.noop, beforeLoad: n.noop, afterLoad: n.noop, beforeShow: n.noop, afterShow: n.noop, beforeClose: n.noop, afterClose: n.noop, onActivate: n.noop, onDeactivate: n.noop, clickContent: function (t, e) { return "image" === t.type && "zoom" }, clickSlide: "close", clickOutside: "close", dblclickContent: !1, dblclickSlide: !1, dblclickOutside: !1, mobile: { clickContent: function (t, e) { return "image" === t.type && "toggleControls" }, clickSlide: function (t, e) { return "image" === t.type ? "toggleControls" : "close" }, dblclickContent: function (t, e) { return "image" === t.type && "zoom" }, dblclickSlide: function (t, e) { return "image" === t.type && "zoom" } }, lang: "en", i18n: { en: { CLOSE: "Close", NEXT: "Next", PREV: "Previous", ERROR: "The requested content cannot be loaded. <br/> Please try again later.", PLAY_START: "Start slideshow", PLAY_STOP: "Pause slideshow", FULL_SCREEN: "Full screen", THUMBS: "Thumbnails" }, de: { CLOSE: "Schliessen", NEXT: "Weiter", PREV: "Zurück", ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.", PLAY_START: "Diaschau starten", PLAY_STOP: "Diaschau beenden", FULL_SCREEN: "Vollbild", THUMBS: "Vorschaubilder" } } }, s = n(t), r = n(e), c = 0, l = function (t) { return t && t.hasOwnProperty && t instanceof n }, u = function () { return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) { return t.setTimeout(e, 1e3 / 60) } }(), d = function () { var t, n = e.createElement("fakeelement"), i = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" }; for (t in i) if (n.style[t] !== o) return i[t] }(), f = function (t) { return t && t.length && t[0].offsetHeight }, h = function (t, o, i) { var s = this; s.opts = n.extend(!0, { index: i }, a, o || {}), o && n.isArray(o.buttons) && (s.opts.buttons = o.buttons), s.id = s.opts.id || ++c, s.group = [], s.currIndex = parseInt(s.opts.index, 10) || 0, s.prevIndex = null, s.prevPos = null, s.currPos = 0, s.firstRun = null, s.createGroup(t), s.group.length && (s.$lastFocus = n(e.activeElement).blur(), s.slides = {}, s.init(t)) }; n.extend(h.prototype, { init: function () { var t, e, o, i = this, a = i.group[i.currIndex].opts; i.scrollTop = r.scrollTop(), i.scrollLeft = r.scrollLeft(), n.fancybox.getInstance() || n.fancybox.isMobile || "hidden" === n("body").css("overflow") || (t = n("body").width(), n("html").addClass("fancybox-enabled"), t = n("body").width() - t, t > 1 && n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar, .fancybox-enabled body { margin-right: ' + t + "px; }</style>")), o = "", n.each(a.buttons, function (t, e) { o += a.btnTpl[e] || "" }), e = n(i.translate(i, a.baseTpl.replace("{{BUTTONS}}", o))).addClass("fancybox-is-hidden").attr("id", "fancybox-container-" + i.id).addClass(a.baseClass).data("FancyBox", i).prependTo(a.parentEl), i.$refs = { container: e }, ["bg", "inner", "infobar", "toolbar", "stage", "caption"].forEach(function (t) { i.$refs[t] = e.find(".fancybox-" + t) }), (!a.arrows || i.group.length < 2) && e.find(".fancybox-navigation").remove(), a.infobar || i.$refs.infobar.remove(), a.toolbar || i.$refs.toolbar.remove(), i.trigger("onInit"), i.activate(), i.jumpTo(i.currIndex) }, translate: function (t, e) { var n = t.opts.i18n[t.opts.lang]; return e.replace(/\{\{(\w+)\}\}/g, function (t, e) { var i = n[e]; return i === o ? t : i }) }, createGroup: function (t) { var e = this, i = n.makeArray(t); n.each(i, function (t, i) { var a, s, r, c, l = {}, u = {}, d = []; n.isPlainObject(i) ? (l = i, u = i.opts || i) : "object" === n.type(i) && n(i).length ? (a = n(i), d = a.data(), u = "options" in d ? d.options : {}, u = "object" === n.type(u) ? u : {}, l.src = "src" in d ? d.src : u.src || a.attr("href"), ["width", "height", "thumb", "type", "filter"].forEach(function (t) { t in d && (u[t] = d[t]) }), "srcset" in d && (u.image = { srcset: d.srcset }), u.$orig = a, l.type || l.src || (l.type = "inline", l.src = i)) : l = { type: "html", src: i + "" }, l.opts = n.extend(!0, {}, e.opts, u), n.fancybox.isMobile && (l.opts = n.extend(!0, {}, l.opts, l.opts.mobile)), s = l.type || l.opts.type, r = l.src || "", !s && r && (r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? s = "image" : r.match(/\.(pdf)((\?|#).*)?$/i) ? s = "pdf" : "#" === r.charAt(0) && (s = "inline")), l.type = s, l.index = e.group.length, l.opts.$orig && !l.opts.$orig.length && delete l.opts.$orig, !l.opts.$thumb && l.opts.$orig && (l.opts.$thumb = l.opts.$orig.find("img:first")), l.opts.$thumb && !l.opts.$thumb.length && delete l.opts.$thumb, "function" === n.type(l.opts.caption) ? l.opts.caption = l.opts.caption.apply(i, [e, l]) : "caption" in d && (l.opts.caption = d.caption), l.opts.caption = l.opts.caption === o ? "" : l.opts.caption + "", "ajax" === s && (c = r.split(/\s+/, 2), c.length > 1 && (l.src = c.shift(), l.opts.filter = c.shift())), "auto" == l.opts.smallBtn && (n.inArray(s, ["html", "inline", "ajax"]) > -1 ? (l.opts.toolbar = !1, l.opts.smallBtn = !0) : l.opts.smallBtn = !1), "pdf" === s && (l.type = "iframe", l.opts.iframe.preload = !1), l.opts.modal && (l.opts = n.extend(!0, l.opts, { infobar: 0, toolbar: 0, smallBtn: 0, keyboard: 0, slideShow: 0, fullScreen: 0, thumbs: 0, touch: 0, clickContent: !1, clickSlide: !1, clickOutside: !1, dblclickContent: !1, dblclickSlide: !1, dblclickOutside: !1 })), e.group.push(l) }) }, addEvents: function () { var o = this; o.removeEvents(), o.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (t) { t.stopPropagation(), t.preventDefault(), o.close(t) }).on("click.fb-prev touchend.fb-prev", "[data-fancybox-prev]", function (t) { t.stopPropagation(), t.preventDefault(), o.previous() }).on("click.fb-next touchend.fb-next", "[data-fancybox-next]", function (t) { t.stopPropagation(), t.preventDefault(), o.next() }), s.on("orientationchange.fb resize.fb", function (t) { t && t.originalEvent && "resize" === t.originalEvent.type ? u(function () { o.update() }) : (o.$refs.stage.hide(), setTimeout(function () { o.$refs.stage.show(), o.update() }, 500)) }), r.on("focusin.fb", function (t) { var i = n.fancybox ? n.fancybox.getInstance() : null; i.isClosing || !i.current || !i.current.opts.trapFocus || n(t.target).hasClass("fancybox-container") || n(t.target).is(e) || i && "fixed" !== n(t.target).css("position") && !i.$refs.container.has(t.target).length && (t.stopPropagation(), i.focus(), s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft)) }), r.on("keydown.fb", function (t) { var e = o.current, i = t.keyCode || t.which; if (e && e.opts.keyboard && !n(t.target).is("input") && !n(t.target).is("textarea")) return 8 === i || 27 === i ? (t.preventDefault(), void o.close(t)) : 37 === i || 38 === i ? (t.preventDefault(), void o.previous()) : 39 === i || 40 === i ? (t.preventDefault(), void o.next()) : void o.trigger("afterKeydown", t, i) }), o.group[o.currIndex].opts.idleTime && (o.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseenter.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function () { o.idleSecondsCounter = 0, o.isIdle && o.showControls(), o.isIdle = !1 }), o.idleInterval = t.setInterval(function () { o.idleSecondsCounter++ , o.idleSecondsCounter >= o.group[o.currIndex].opts.idleTime && (o.isIdle = !0, o.idleSecondsCounter = 0, o.hideControls()) }, 1e3)) }, removeEvents: function () { var e = this; s.off("orientationchange.fb resize.fb"), r.off("focusin.fb keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e.idleInterval), e.idleInterval = null) }, previous: function (t) { return this.jumpTo(this.currPos - 1, t) }, next: function (t) { return this.jumpTo(this.currPos + 1, t) }, jumpTo: function (t, e, i) { var a, s, r, c, l, u, d, h = this, p = h.group.length; if (!(h.isSliding || h.isClosing || h.isAnimating && h.firstRun)) { if (t = parseInt(t, 10), s = h.current ? h.current.opts.loop : h.opts.loop, !s && (t < 0 || t >= p)) return !1; if (a = h.firstRun = null === h.firstRun, !(p < 2 && !a && h.isSliding)) { if (c = h.current, h.prevIndex = h.currIndex, h.prevPos = h.currPos, r = h.createSlide(t), p > 1 && ((s || r.index > 0) && h.createSlide(t - 1), (s || r.index < p - 1) && h.createSlide(t + 1)), h.current = r, h.currIndex = r.index, h.currPos = r.pos, h.trigger("beforeShow", a), h.updateControls(), u = n.fancybox.getTranslate(r.$slide), r.isMoved = (0 !== u.left || 0 !== u.top) && !r.$slide.hasClass("fancybox-animated"), r.forcedDuration = o, n.isNumeric(e) ? r.forcedDuration = e : e = r.opts[a ? "animationDuration" : "transitionDuration"], e = parseInt(e, 10), a) return r.opts.animationEffect && e && h.$refs.container.css("transition-duration", e + "ms"), h.$refs.container.removeClass("fancybox-is-hidden"), f(h.$refs.container), h.$refs.container.addClass("fancybox-is-open"), r.$slide.addClass("fancybox-slide--current"), h.loadSlide(r), void h.preload(); n.each(h.slides, function (t, e) { n.fancybox.stop(e.$slide) }), r.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"), r.isMoved ? (l = Math.round(r.$slide.width()), n.each(h.slides, function (t, o) { var i = o.pos - r.pos; n.fancybox.animate(o.$slide, { top: 0, left: i * l + i * o.opts.gutter }, e, function () { o.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"), o.pos === h.currPos && (r.isMoved = !1, h.complete()) }) })) : h.$refs.stage.children().removeAttr("style"), r.isLoaded ? h.revealContent(r) : h.loadSlide(r), h.preload(), c.pos !== r.pos && (d = "fancybox-slide--" + (c.pos > r.pos ? "next" : "previous"), c.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"), c.isComplete = !1, e && (r.isMoved || r.opts.transitionEffect) && (r.isMoved ? c.$slide.addClass(d) : (d = "fancybox-animated " + d + " fancybox-fx-" + r.opts.transitionEffect, n.fancybox.animate(c.$slide, d, e, function () { c.$slide.removeClass(d).removeAttr("style") })))) } } }, createSlide: function (t) { var e, o, i = this; return o = t % i.group.length, o = o < 0 ? i.group.length + o : o, !i.slides[t] && i.group[o] && (e = n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage), i.slides[t] = n.extend(!0, {}, i.group[o], { pos: t, $slide: e, isLoaded: !1 }), i.updateSlide(i.slides[t])), i.slides[t] }, scaleToActual: function (t, e, i) { var a, s, r, c, l, u = this, d = u.current, f = d.$content, h = parseInt(d.$slide.width(), 10), p = parseInt(d.$slide.height(), 10), g = d.width, b = d.height; "image" != d.type || d.hasError || !f || u.isAnimating || (n.fancybox.stop(f), u.isAnimating = !0, t = t === o ? .5 * h : t, e = e === o ? .5 * p : e, a = n.fancybox.getTranslate(f), c = g / a.width, l = b / a.height, s = .5 * h - .5 * g, r = .5 * p - .5 * b, g > h && (s = a.left * c - (t * c - t), s > 0 && (s = 0), s < h - g && (s = h - g)), b > p && (r = a.top * l - (e * l - e), r > 0 && (r = 0), r < p - b && (r = p - b)), u.updateCursor(g, b), n.fancybox.animate(f, { top: r, left: s, scaleX: c, scaleY: l }, i || 330, function () { u.isAnimating = !1 }), u.SlideShow && u.SlideShow.isActive && u.SlideShow.stop()) }, scaleToFit: function (t) { var e, o = this, i = o.current, a = i.$content; "image" != i.type || i.hasError || !a || o.isAnimating || (n.fancybox.stop(a), o.isAnimating = !0, e = o.getFitPos(i), o.updateCursor(e.width, e.height), n.fancybox.animate(a, { top: e.top, left: e.left, scaleX: e.width / a.width(), scaleY: e.height / a.height() }, t || 330, function () { o.isAnimating = !1 })) }, getFitPos: function (t) { var e, o, i, a, r, c = this, l = t.$content, u = t.width, d = t.height, f = t.opts.margin; return !(!l || !l.length || !u && !d) && ("number" === n.type(f) && (f = [f, f]), 2 == f.length && (f = [f[0], f[1], f[0], f[1]]), s.width() < 800 && (f = [0, 0, 0, 0]), e = parseInt(c.$refs.stage.width(), 10) - (f[1] + f[3]), o = parseInt(c.$refs.stage.height(), 10) - (f[0] + f[2]), i = Math.min(1, e / u, o / d), a = Math.floor(i * u), r = Math.floor(i * d), { top: Math.floor(.5 * (o - r)) + f[0], left: Math.floor(.5 * (e - a)) + f[3], width: a, height: r }) }, update: function () { var t = this; n.each(t.slides, function (e, n) { t.updateSlide(n) }) }, updateSlide: function (t) { var e = this, o = t.$content; o && (t.width || t.height) && (n.fancybox.stop(o), n.fancybox.setTranslate(o, e.getFitPos(t)), t.pos === e.currPos && e.updateCursor()), t.$slide.trigger("refresh"), e.trigger("onUpdate", t) }, updateCursor: function (t, e) { var n, i = this, a = i.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut"); i.current && !i.isClosing && (i.isZoomable() ? (a.addClass("fancybox-is-zoomable"), n = t !== o && e !== o ? t < i.current.width && e < i.current.height : i.isScaledDown(), n ? a.addClass("fancybox-can-zoomIn") : i.current.opts.touch ? a.addClass("fancybox-can-drag") : a.addClass("fancybox-can-zoomOut")) : i.current.opts.touch && a.addClass("fancybox-can-drag")) }, isZoomable: function () { var t, e = this, o = e.current; if (o && !e.isClosing) return !!("image" === o.type && o.isLoaded && !o.hasError && ("zoom" === o.opts.clickContent || n.isFunction(o.opts.clickContent) && "zoom" === o.opts.clickContent(o)) && (t = e.getFitPos(o), o.width > t.width || o.height > t.height)) }, isScaledDown: function () { var t = this, e = t.current, o = e.$content, i = !1; return o && (i = n.fancybox.getTranslate(o), i = i.width < e.width || i.height < e.height), i }, canPan: function () { var t = this, e = t.current, n = e.$content, o = !1; return n && (o = t.getFitPos(e), o = Math.abs(n.width() - o.width) > 1 || Math.abs(n.height() - o.height) > 1), o }, loadSlide: function (t) { var e, o, i, a = this; if (!t.isLoading && !t.isLoaded) { switch (t.isLoading = !0, a.trigger("beforeLoad", t), e = t.type, o = t.$slide, o.off("refresh").trigger("onReset").addClass("fancybox-slide--" + (e || "unknown")).addClass(t.opts.slideClass), e) { case "image": a.setImage(t); break; case "iframe": a.setIframe(t); break; case "html": a.setContent(t, t.src || t.content); break; case "inline": n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t); break; case "ajax": a.showLoading(t), i = n.ajax(n.extend({}, t.opts.ajax.settings, { url: t.src, success: function (e, n) { "success" === n && a.setContent(t, e) }, error: function (e, n) { e && "abort" !== n && a.setError(t) } })), o.one("onReset", function () { i.abort() }); break; default: a.setError(t) }return !0 } }, setImage: function (e) { var o, i, a, s, r = this, c = e.opts.image.srcset; if (c) { a = t.devicePixelRatio || 1, s = t.innerWidth * a, i = c.split(",").map(function (t) { var e = {}; return t.trim().split(/\s+/).forEach(function (t, n) { var o = parseInt(t.substring(0, t.length - 1), 10); return 0 === n ? e.url = t : void (o && (e.value = o, e.postfix = t[t.length - 1])) }), e }), i.sort(function (t, e) { return t.value - e.value }); for (var l = 0; l < i.length; l++) { var u = i[l]; if ("w" === u.postfix && u.value >= s || "x" === u.postfix && u.value >= a) { o = u; break } } !o && i.length && (o = i[i.length - 1]), o && (e.src = o.url, e.width && e.height && "w" == o.postfix && (e.height = e.width / e.height * o.value, e.width = o.value)) } e.$content = n('<div class="fancybox-image-wrap"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide), e.opts.preload !== !1 && e.opts.width && e.opts.height && (e.opts.thumb || e.opts.$thumb) ? (e.width = e.opts.width, e.height = e.opts.height, e.$ghost = n("<img />").one("error", function () { n(this).remove(), e.$ghost = null, r.setBigImage(e) }).one("load", function () { r.afterLoad(e), r.setBigImage(e) }).addClass("fancybox-image").appendTo(e.$content).attr("src", e.opts.thumb || e.opts.$thumb.attr("src"))) : r.setBigImage(e) }, setBigImage: function (t) { var e = this, o = n("<img />"); t.$image = o.one("error", function () { e.setError(t) }).one("load", function () { clearTimeout(t.timouts), t.timouts = null, e.isClosing || (t.width = this.naturalWidth, t.height = this.naturalHeight, t.opts.image.srcset && o.attr("sizes", "100vw").attr("srcset", t.opts.image.srcset), e.hideLoading(t), t.$ghost ? t.timouts = setTimeout(function () { t.timouts = null, t.$ghost.hide() }, Math.min(300, Math.max(1e3, t.height / 1600))) : e.afterLoad(t)) }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), o[0].complete ? o.trigger("load") : o[0].error ? o.trigger("error") : t.timouts = setTimeout(function () { o[0].complete || t.hasError || e.showLoading(t) }, 100) }, setIframe: function (t) { var e, i = this, a = t.opts.iframe, s = t.$slide; t.$content = n('<div class="fancybox-content' + (a.preload ? " fancybox-is-hidden" : "") + '"></div>').css(a.css).appendTo(s), e = n(a.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(a.attr).appendTo(t.$content), a.preload ? (i.showLoading(t), e.on("load.fb error.fb", function (e) { this.isReady = 1, t.$slide.trigger("refresh"), i.afterLoad(t) }), s.on("refresh.fb", function () { var n, i, s, r, c, l = t.$content; if (1 === e[0].isReady) { try { n = e.contents(), i = n.find("body") } catch (t) { } i && i.length && (a.css.width === o || a.css.height === o) && (s = e[0].contentWindow.document.documentElement.scrollWidth, r = Math.ceil(i.outerWidth(!0) + (l.width() - s)), c = Math.ceil(i.outerHeight(!0)), l.css({ width: a.css.width === o ? r + (l.outerWidth() - l.innerWidth()) : a.css.width, height: a.css.height === o ? c + (l.outerHeight() - l.innerHeight()) : a.css.height })), l.removeClass("fancybox-is-hidden") } })) : this.afterLoad(t), e.attr("src", t.src), t.opts.smallBtn === !0 && t.$content.prepend(i.translate(t, t.opts.btnTpl.smallBtn)), s.one("onReset", function () { try { n(this).find("iframe").hide().attr("src", "//about:blank") } catch (t) { } n(this).empty(), t.isLoaded = !1 }) }, setContent: function (t, e) { var o = this; o.isClosing || (o.hideLoading(t), t.$slide.empty(), l(e) && e.parent().length ? (e.parent(".fancybox-slide--inline").trigger("onReset"), t.$placeholder = n("<div></div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e = n("<div>").append(n.trim(e)).contents(), 3 === e[0].nodeType && (e = n("<div>").html(e))), t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function () { t.$placeholder && (t.$placeholder.after(e.hide()).remove(), t.$placeholder = null), t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (n(this).empty(), t.isLoaded = !1) }), t.$content = n(e).appendTo(t.$slide), t.opts.smallBtn && !t.$smallBtn && (t.$smallBtn = n(o.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content)), this.afterLoad(t)) }, setError: function (t) { t.hasError = !0, t.$slide.removeClass("fancybox-slide--" + t.type), this.setContent(t, this.translate(t, t.opts.errorTpl)) }, showLoading: function (t) { var e = this; t = t || e.current, t && !t.$spinner && (t.$spinner = n(e.opts.spinnerTpl).appendTo(t.$slide)) }, hideLoading: function (t) { var e = this; t = t || e.current, t && t.$spinner && (t.$spinner.remove(), delete t.$spinner) }, afterLoad: function (t) { var e = this; e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function (t) { return 2 == t.button && t.preventDefault(), !0 }), "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.revealContent(t)) }, revealContent: function (t) { var e, i, a, s, r, c = this, l = t.$slide, u = !1; return e = t.opts[c.firstRun ? "animationEffect" : "transitionEffect"], a = t.opts[c.firstRun ? "animationDuration" : "transitionDuration"], a = parseInt(t.forcedDuration === o ? a : t.forcedDuration, 10), !t.isMoved && t.pos === c.currPos && a || (e = !1), "zoom" !== e || t.pos === c.currPos && a && "image" === t.type && !t.hasError && (u = c.getThumbPos(t)) || (e = "fade"), "zoom" === e ? (r = c.getFitPos(t), r.scaleX = r.width / u.width, r.scaleY = r.height / u.height, delete r.width, delete r.height, s = t.opts.zoomOpacity, "auto" == s && (s = Math.abs(t.width / t.height - u.width / u.height) > .1), s && (u.opacity = .1, r.opacity = 1), n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), u), f(t.$content), void n.fancybox.animate(t.$content, r, a, function () { c.complete() })) : (c.updateSlide(t), e ? (n.fancybox.stop(l), i = "fancybox-animated fancybox-slide--" + (t.pos > c.prevPos ? "next" : "previous") + " fancybox-fx-" + e, l.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(i), t.$content.removeClass("fancybox-is-hidden"), f(l), void n.fancybox.animate(l, "fancybox-slide--current", a, function (e) { l.removeClass(i).removeAttr("style"), t.pos === c.currPos && c.complete() }, !0)) : (f(l), t.$content.removeClass("fancybox-is-hidden"), void (t.pos === c.currPos && c.complete()))) }, getThumbPos: function (o) { var i, a = this, s = !1, r = function (e) { for (var o, i = e[0], a = i.getBoundingClientRect(), s = []; null !== i.parentElement;)"hidden" !== n(i.parentElement).css("overflow") && "auto" !== n(i.parentElement).css("overflow") || s.push(i.parentElement.getBoundingClientRect()), i = i.parentElement; return o = s.every(function (t) { var e = Math.min(a.right, t.right) - Math.max(a.left, t.left), n = Math.min(a.bottom, t.bottom) - Math.max(a.top, t.top); return e > 0 && n > 0 }), o && a.bottom > 0 && a.right > 0 && a.left < n(t).width() && a.top < n(t).height() }, c = o.opts.$thumb, l = c ? c.offset() : 0; return l && c[0].ownerDocument === e && r(c) && (i = a.$refs.stage.offset(), s = { top: l.top - i.top + parseFloat(c.css("border-top-width") || 0), left: l.left - i.left + parseFloat(c.css("border-left-width") || 0), width: c.width(), height: c.height(), scaleX: 1, scaleY: 1 }), s }, complete: function () { var t = this, o = t.current, i = {}; o.isMoved || !o.isLoaded || o.isComplete || (o.isComplete = !0, o.$slide.siblings().trigger("onReset"), f(o.$slide), o.$slide.addClass("fancybox-slide--complete"), n.each(t.slides, function (e, o) { o.pos >= t.currPos - 1 && o.pos <= t.currPos + 1 ? i[o.pos] = o : o && (n.fancybox.stop(o.$slide), o.$slide.unbind().remove()) }), t.slides = i, t.updateCursor(), t.trigger("afterShow"), (n(e.activeElement).is("[disabled]") || o.opts.autoFocus && "image" != o.type && "iframe" !== o.type) && t.focus()) }, preload: function () { var t, e, n = this; n.group.length < 2 || (t = n.slides[n.currPos + 1], e = n.slides[n.currPos - 1], t && "image" === t.type && n.loadSlide(t), e && "image" === e.type && n.loadSlide(e)) }, focus: function () { var t, e = this.current; this.isClosing || (t = e && e.isComplete ? e.$slide.find("button,:input,[tabindex],a").filter(":not([disabled]):visible:first") : null, t = t && t.length ? t : this.$refs.container, t.focus()) }, activate: function () { var t = this; n(".fancybox-container").each(function () { var e = n(this).data("FancyBox"); e && e.uid !== t.uid && !e.isClosing && e.trigger("onDeactivate") }), t.current && (t.$refs.container.index() > 0 && t.$refs.container.prependTo(e.body), t.updateControls()), t.trigger("onActivate"), t.addEvents() }, close: function (t, e) { var o, i, a, s, r, c, l = this, f = l.current, h = function () { l.cleanUp(t) }; return !l.isClosing && (l.isClosing = !0, l.trigger("beforeClose", t) === !1 ? (l.isClosing = !1, u(function () { l.update() }), !1) : (l.removeEvents(), f.timouts && clearTimeout(f.timouts), a = f.$content, o = f.opts.animationEffect, i = n.isNumeric(e) ? e : o ? f.opts.animationDuration : 0, f.$slide.off(d).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), f.$slide.siblings().trigger("onReset").remove(), i && l.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"), l.hideLoading(f), l.hideControls(), l.updateCursor(), "zoom" !== o || t !== !0 && a && i && "image" === f.type && !f.hasError && (c = l.getThumbPos(f)) || (o = "fade"), "zoom" === o ? (n.fancybox.stop(a), r = n.fancybox.getTranslate(a), r.width = r.width * r.scaleX, r.height = r.height * r.scaleY, s = f.opts.zoomOpacity, "auto" == s && (s = Math.abs(f.width / f.height - c.width / c.height) > .1), s && (c.opacity = 0), r.scaleX = r.width / c.width, r.scaleY = r.height / c.height, r.width = c.width, r.height = c.height, n.fancybox.setTranslate(f.$content, r), n.fancybox.animate(f.$content, c, i, h), !0) : (o && i ? t === !0 ? setTimeout(h, i) : n.fancybox.animate(f.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + o, i, h) : h(), !0))) }, cleanUp: function (t) { var e, o = this; o.current.$slide.trigger("onReset"), o.$refs.container.empty().remove(), o.trigger("afterClose", t), o.$lastFocus && o.current.opts.backFocus && o.$lastFocus.focus(), o.current = null, e = n.fancybox.getInstance(), e ? e.activate() : (s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft), n("html").removeClass("fancybox-enabled"), n("#fancybox-style-noscroll").remove()) }, trigger: function (t, e) { var o, i = Array.prototype.slice.call(arguments, 1), a = this, s = e && e.opts ? e : a.current; return s ? i.unshift(s) : s = a, i.unshift(a), n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)), o === !1 ? o : void ("afterClose" === t ? r.trigger(t + ".fb", i) : a.$refs.container.trigger(t + ".fb", i)) }, updateControls: function (t) { var e = this, o = e.current, i = o.index, a = o.opts, s = a.caption, r = e.$refs.caption; o.$slide.trigger("refresh"), e.$caption = s && s.length ? r.html(s) : null, e.isHiddenControls || e.showControls(), n("[data-fancybox-count]").html(e.group.length), n("[data-fancybox-index]").html(i + 1), n("[data-fancybox-prev]").prop("disabled", !a.loop && i <= 0), n("[data-fancybox-next]").prop("disabled", !a.loop && i >= e.group.length - 1) }, hideControls: function () { this.isHiddenControls = !0, this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav") }, showControls: function () { var t = this, e = t.current ? t.current.opts : t.opts, n = t.$refs.container; t.isHiddenControls = !1, t.idleSecondsCounter = 0, n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal), t.$caption ? n.addClass("fancybox-show-caption ") : n.removeClass("fancybox-show-caption") }, toggleControls: function () { this.isHiddenControls ? this.showControls() : this.hideControls() } }), n.fancybox = { version: "3.1.24", defaults: a, getInstance: function (t) { var e = n('.fancybox-container:not(".fancybox-is-closing"):first').data("FancyBox"), o = Array.prototype.slice.call(arguments, 1); return e instanceof h && ("string" === n.type(t) ? e[t].apply(e, o) : "function" === n.type(t) && t.apply(e, o), e) }, open: function (t, e, n) { return new h(t, e, n) }, close: function (t) { var e = this.getInstance(); e && (e.close(), t === !0 && this.close()) }, destroy: function () { this.close(!0), r.off("click.fb-start") }, isMobile: e.createTouch !== o && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent), use3d: function () { var n = e.createElement("div"); return t.getComputedStyle && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11) }(), getTranslate: function (t) { var e; if (!t || !t.length) return !1; if (e = t.eq(0).css("transform"), e && e.indexOf("matrix") !== -1 ? (e = e.split("(")[1], e = e.split(")")[0], e = e.split(",")) : e = [], e.length) e = e.length > 10 ? [e[13], e[12], e[0], e[5]] : [e[5], e[4], e[0], e[3]], e = e.map(parseFloat); else { e = [0, 0, 1, 1]; var n = /\.*translate\((.*)px,(.*)px\)/i, o = n.exec(t.eq(0).attr("style")); o && (e[0] = parseFloat(o[2]), e[1] = parseFloat(o[1])) } return { top: e[0], left: e[1], scaleX: e[2], scaleY: e[3], opacity: parseFloat(t.css("opacity")), width: t.width(), height: t.height() } }, setTranslate: function (t, e) { var n = "", i = {}; if (t && e) return e.left === o && e.top === o || (n = (e.left === o ? t.position().left : e.left) + "px, " + (e.top === o ? t.position().top : e.top) + "px", n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), e.scaleX !== o && e.scaleY !== o && (n = (n.length ? n + " " : "") + "scale(" + e.scaleX + ", " + e.scaleY + ")"), n.length && (i.transform = n), e.opacity !== o && (i.opacity = e.opacity), e.width !== o && (i.width = e.width), e.height !== o && (i.height = e.height), t.css(i) }, animate: function (t, e, i, a, s) { var r = d || "transitionend"; n.isFunction(i) && (a = i, i = null), n.isPlainObject(e) || t.removeAttr("style"), t.on(r, function (i) { (!i || !i.originalEvent || t.is(i.originalEvent.target) && "z-index" != i.originalEvent.propertyName) && (t.off(r), n.isPlainObject(e) ? e.scaleX !== o && e.scaleY !== o && (t.css("transition-duration", "0ms"), e.width = Math.round(t.width() * e.scaleX), e.height = Math.round(t.height() * e.scaleY), e.scaleX = 1, e.scaleY = 1, n.fancybox.setTranslate(t, e)) : s !== !0 && t.removeClass(e), n.isFunction(a) && a(i)) }), n.isNumeric(i) && t.css("transition-duration", i + "ms"), n.isPlainObject(e) ? n.fancybox.setTranslate(t, e) : t.addClass(e), t.data("timer", setTimeout(function () { t.trigger("transitionend") }, i + 16)) }, stop: function (t) { clearTimeout(t.data("timer")), t.off(d) } }, n.fn.fancybox = function (t) { var e; return t = t || {}, e = t.selector || !1, e ? n("body").off("click.fb-start", e).on("click.fb-start", e, { options: t }, i) : this.off("click.fb-start").on("click.fb-start", { items: this, options: t }, i), this }, r.on("click.fb-start", "[data-fancybox]", i) } }(window, document, window.jQuery), function (t) {
    "use strict"; var e = function (e, n, o) { if (e) return o = o || "", "object" === t.type(o) && (o = t.param(o, !0)), t.each(n, function (t, n) { e = e.replace("$" + t, n || "") }), o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o), e }, n = { youtube: { matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i, params: { autoplay: 1, autohide: 1, fs: 1, rel: 0, hd: 1, wmode: "transparent", enablejsapi: 1, html5: 1 }, paramPlace: 8, type: "iframe", url: "//www.youtube.com/embed/$4", thumb: "//img.youtube.com/vi/$4/hqdefault.jpg" }, vimeo: { matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/, params: { autoplay: 1, hd: 1, show_title: 1, show_byline: 1, show_portrait: 0, fullscreen: 1, api: 1 }, paramPlace: 3, type: "iframe", url: "//player.vimeo.com/video/$2" }, metacafe: { matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/, type: "iframe", url: "//www.metacafe.com/embed/$1/?ap=1" }, dailymotion: { matcher: /dailymotion.com\/video\/(.*)\/?(.*)/, params: { additionalInfos: 0, autoStart: 1 }, type: "iframe", url: "//www.dailymotion.com/embed/video/$1" }, vine: { matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/, type: "iframe", url: "//vine.co/v/$1/embed/simple" }, instagram: { matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i, type: "image", url: "//$1/p/$2/media/?size=l" }, gmap_place: { matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i, type: "iframe", url: function (t) { return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12]) + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed") } }, gmap_search: { matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i, type: "iframe", url: function (t) { return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed" } } }; t(document).on("onInit.fb", function (o, i) {
        t.each(i.group, function (o, i) {
            var a, s, r, c, l, u, d, f = i.src || "", h = !1; i.type || (a = t.extend(!0, {}, n, i.opts.media), t.each(a, function (n, o) { if (r = f.match(o.matcher), u = {}, d = n, r) { if (h = o.type, o.paramPlace && r[o.paramPlace]) { l = r[o.paramPlace], "?" == l[0] && (l = l.substring(1)), l = l.split("&"); for (var a = 0; a < l.length; ++a) { var p = l[a].split("=", 2); 2 == p.length && (u[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "))) } } return c = t.extend(!0, {}, o.params, i.opts[n], u), f = "function" === t.type(o.url) ? o.url.call(this, r, c, i) : e(o.url, r, c), s = "function" === t.type(o.thumb) ? o.thumb.call(this, r, c, i) : e(o.thumb, r), "vimeo" === d && (f = f.replace("&%23", "#")), !1 } }), h ? (i.src = f, i.type = h, i.opts.thumb || i.opts.$thumb && i.opts.$thumb.length || (i.opts.thumb = s), "iframe" === h && (t.extend(!0, i.opts, { iframe: { preload: !1, attr: { scrolling: "no" } } }), i.contentProvider = d,
                i.opts.slideClass += " fancybox-slide--" + ("gmap_place" == d || "gmap_search" == d ? "map" : "video"))) : i.type = "image")
        })
    })
}(window.jQuery), function (t, e, n) { "use strict"; var o = function () { return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) { return t.setTimeout(e, 1e3 / 60) } }(), i = function () { return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function (e) { t.clearTimeout(e) } }(), a = function (e) { var n = []; e = e.originalEvent || e || t.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e]; for (var o in e) e[o].pageX ? n.push({ x: e[o].pageX, y: e[o].pageY }) : e[o].clientX && n.push({ x: e[o].clientX, y: e[o].clientY }); return n }, s = function (t, e, n) { return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0 }, r = function (t) { if (t.is("a,button,input,select,textarea") || n.isFunction(t.get(0).onclick)) return !0; for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0; return !1 }, c = function (e) { var n = t.getComputedStyle(e)["overflow-y"], o = t.getComputedStyle(e)["overflow-x"], i = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight, a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth; return i || a }, l = function (t) { for (var e = !1; ;) { if (e = c(t.get(0))) break; if (t = t.parent(), !t.length || t.hasClass("fancybox-stage") || t.is("body")) break } return e }, u = function (t) { var e = this; e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart")) }; u.prototype.destroy = function () { this.$container.off(".fb.touch") }, u.prototype.ontouchstart = function (o) { var i = this, c = n(o.target), u = i.instance, d = u.current, f = d.$content, h = "touchstart" == o.type; if (h && i.$container.off("mousedown.fb.touch"), !d || i.instance.isAnimating || i.instance.isClosing) return o.stopPropagation(), void o.preventDefault(); if ((!o.originalEvent || 2 != o.originalEvent.button) && c.length && !r(c) && !r(c.parent()) && !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left) && (i.startPoints = a(o), i.startPoints && !(i.startPoints.length > 1 && u.isSliding))) { if (i.$target = c, i.$content = f, i.canTap = !0, n(e).off(".fb.touch"), n(e).on(h ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(i, "ontouchend")), n(e).on(h ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(i, "ontouchmove")), o.stopPropagation(), !u.current.opts.touch && !u.canPan() || !c.is(i.$stage) && !i.$stage.find(c).length) return void (c.is("img") && o.preventDefault()); n.fancybox.isMobile && (l(i.$target) || l(i.$target.parent())) || o.preventDefault(), i.canvasWidth = Math.round(d.$slide[0].clientWidth), i.canvasHeight = Math.round(d.$slide[0].clientHeight), i.startTime = (new Date).getTime(), i.distanceX = i.distanceY = i.distance = 0, i.isPanning = !1, i.isSwiping = !1, i.isZooming = !1, i.sliderStartPos = i.sliderLastPos || { top: 0, left: 0 }, i.contentStartPos = n.fancybox.getTranslate(i.$content), i.contentLastPos = null, 1 !== i.startPoints.length || i.isZooming || (i.canTap = !u.isSliding, "image" === d.type && (i.contentStartPos.width > i.canvasWidth + 1 || i.contentStartPos.height > i.canvasHeight + 1) ? (n.fancybox.stop(i.$content), i.$content.css("transition-duration", "0ms"), i.isPanning = !0) : i.isSwiping = !0, i.$container.addClass("fancybox-controls--isGrabbing")), 2 !== i.startPoints.length || u.isAnimating || d.hasError || "image" !== d.type || !d.isLoaded && !d.$ghost || (i.isZooming = !0, i.isSwiping = !1, i.isPanning = !1, n.fancybox.stop(i.$content), i.$content.css("transition-duration", "0ms"), i.centerPointStartX = .5 * (i.startPoints[0].x + i.startPoints[1].x) - n(t).scrollLeft(), i.centerPointStartY = .5 * (i.startPoints[0].y + i.startPoints[1].y) - n(t).scrollTop(), i.percentageOfImageAtPinchPointX = (i.centerPointStartX - i.contentStartPos.left) / i.contentStartPos.width, i.percentageOfImageAtPinchPointY = (i.centerPointStartY - i.contentStartPos.top) / i.contentStartPos.height, i.startDistanceBetweenFingers = s(i.startPoints[0], i.startPoints[1])) } }, u.prototype.ontouchmove = function (t) { var e = this; if (e.newPoints = a(t), n.fancybox.isMobile && (l(e.$target) || l(e.$target.parent()))) return t.stopPropagation(), void (e.canTap = !1); if ((e.instance.current.opts.touch || e.instance.canPan()) && e.newPoints && e.newPoints.length && (e.distanceX = s(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = s(e.newPoints[0], e.startPoints[0], "y"), e.distance = s(e.newPoints[0], e.startPoints[0]), e.distance > 0)) { if (!e.$target.is(e.$stage) && !e.$stage.find(e.$target).length) return; t.stopPropagation(), t.preventDefault(), e.isSwiping ? e.onSwipe() : e.isPanning ? e.onPan() : e.isZooming && e.onZoom() } }, u.prototype.onSwipe = function () { var e, a = this, s = a.isSwiping, r = a.sliderStartPos.left || 0; s === !0 ? Math.abs(a.distance) > 10 && (a.canTap = !1, a.instance.group.length < 2 && a.instance.opts.touch.vertical ? a.isSwiping = "y" : a.instance.isSliding || a.instance.opts.touch.vertical === !1 || "auto" === a.instance.opts.touch.vertical && n(t).width() > 800 ? a.isSwiping = "x" : (e = Math.abs(180 * Math.atan2(a.distanceY, a.distanceX) / Math.PI), a.isSwiping = e > 45 && e < 135 ? "y" : "x"), a.instance.isSliding = a.isSwiping, a.startPoints = a.newPoints, n.each(a.instance.slides, function (t, e) { n.fancybox.stop(e.$slide), e.$slide.css("transition-duration", "0ms"), e.inTransition = !1, e.pos === a.instance.current.pos && (a.sliderStartPos.left = n.fancybox.getTranslate(e.$slide).left) }), a.instance.SlideShow && a.instance.SlideShow.isActive && a.instance.SlideShow.stop()) : ("x" == s && (a.distanceX > 0 && (a.instance.group.length < 2 || 0 === a.instance.current.index && !a.instance.current.opts.loop) ? r += Math.pow(a.distanceX, .8) : a.distanceX < 0 && (a.instance.group.length < 2 || a.instance.current.index === a.instance.group.length - 1 && !a.instance.current.opts.loop) ? r -= Math.pow(-a.distanceX, .8) : r += a.distanceX), a.sliderLastPos = { top: "x" == s ? 0 : a.sliderStartPos.top + a.distanceY, left: r }, a.requestId && (i(a.requestId), a.requestId = null), a.requestId = o(function () { a.sliderLastPos && (n.each(a.instance.slides, function (t, e) { var o = e.pos - a.instance.currPos; n.fancybox.setTranslate(e.$slide, { top: a.sliderLastPos.top, left: a.sliderLastPos.left + o * a.canvasWidth + o * e.opts.gutter }) }), a.$container.addClass("fancybox-is-sliding")) })) }, u.prototype.onPan = function () { var t, e, a, s = this; s.canTap = !1, t = s.contentStartPos.width > s.canvasWidth ? s.contentStartPos.left + s.distanceX : s.contentStartPos.left, e = s.contentStartPos.top + s.distanceY, a = s.limitMovement(t, e, s.contentStartPos.width, s.contentStartPos.height), a.scaleX = s.contentStartPos.scaleX, a.scaleY = s.contentStartPos.scaleY, s.contentLastPos = a, s.requestId && (i(s.requestId), s.requestId = null), s.requestId = o(function () { n.fancybox.setTranslate(s.$content, s.contentLastPos) }) }, u.prototype.limitMovement = function (t, e, n, o) { var i, a, s, r, c = this, l = c.canvasWidth, u = c.canvasHeight, d = c.contentStartPos.left, f = c.contentStartPos.top, h = c.distanceX, p = c.distanceY; return i = Math.max(0, .5 * l - .5 * n), a = Math.max(0, .5 * u - .5 * o), s = Math.min(l - n, .5 * l - .5 * n), r = Math.min(u - o, .5 * u - .5 * o), n > l && (h > 0 && t > i && (t = i - 1 + Math.pow(-i + d + h, .8) || 0), h < 0 && t < s && (t = s + 1 - Math.pow(s - d - h, .8) || 0)), o > u && (p > 0 && e > a && (e = a - 1 + Math.pow(-a + f + p, .8) || 0), p < 0 && e < r && (e = r + 1 - Math.pow(r - f - p, .8) || 0)), { top: e, left: t } }, u.prototype.limitPosition = function (t, e, n, o) { var i = this, a = i.canvasWidth, s = i.canvasHeight; return n > a ? (t = t > 0 ? 0 : t, t = t < a - n ? a - n : t) : t = Math.max(0, a / 2 - n / 2), o > s ? (e = e > 0 ? 0 : e, e = e < s - o ? s - o : e) : e = Math.max(0, s / 2 - o / 2), { top: e, left: t } }, u.prototype.onZoom = function () { var e = this, a = e.contentStartPos.width, r = e.contentStartPos.height, c = e.contentStartPos.left, l = e.contentStartPos.top, u = s(e.newPoints[0], e.newPoints[1]), d = u / e.startDistanceBetweenFingers, f = Math.floor(a * d), h = Math.floor(r * d), p = (a - f) * e.percentageOfImageAtPinchPointX, g = (r - h) * e.percentageOfImageAtPinchPointY, b = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(), m = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(), y = b - e.centerPointStartX, v = m - e.centerPointStartY, x = c + (p + y), w = l + (g + v), $ = { top: w, left: x, scaleX: e.contentStartPos.scaleX * d, scaleY: e.contentStartPos.scaleY * d }; e.canTap = !1, e.newWidth = f, e.newHeight = h, e.contentLastPos = $, e.requestId && (i(e.requestId), e.requestId = null), e.requestId = o(function () { n.fancybox.setTranslate(e.$content, e.contentLastPos) }) }, u.prototype.ontouchend = function (t) { var o = this, s = Math.max((new Date).getTime() - o.startTime, 1), r = o.isSwiping, c = o.isPanning, l = o.isZooming; return o.endPoints = a(t), o.$container.removeClass("fancybox-controls--isGrabbing"), n(e).off(".fb.touch"), o.requestId && (i(o.requestId), o.requestId = null), o.isSwiping = !1, o.isPanning = !1, o.isZooming = !1, o.canTap ? o.onTap(t) : (o.speed = 366, o.velocityX = o.distanceX / s * .5, o.velocityY = o.distanceY / s * .5, o.speedX = Math.max(.5 * o.speed, Math.min(1.5 * o.speed, 1 / Math.abs(o.velocityX) * o.speed)), void (c ? o.endPanning() : l ? o.endZooming() : o.endSwiping(r))) }, u.prototype.endSwiping = function (t) { var e = this, o = !1; e.instance.isSliding = !1, e.sliderLastPos = null, "y" == t && Math.abs(e.distanceY) > 50 ? (n.fancybox.animate(e.instance.current.$slide, { top: e.sliderStartPos.top + e.distanceY + 150 * e.velocityY, opacity: 0 }, 150), o = e.instance.close(!0, 300)) : "x" == t && e.distanceX > 50 && e.instance.group.length > 1 ? o = e.instance.previous(e.speedX) : "x" == t && e.distanceX < -50 && e.instance.group.length > 1 && (o = e.instance.next(e.speedX)), o !== !1 || "x" != t && "y" != t || e.instance.jumpTo(e.instance.current.index, 150), e.$container.removeClass("fancybox-is-sliding") }, u.prototype.endPanning = function () { var t, e, o, i = this; i.contentLastPos && (i.instance.current.opts.touch.momentum === !1 ? (t = i.contentLastPos.left, e = i.contentLastPos.top) : (t = i.contentLastPos.left + i.velocityX * i.speed, e = i.contentLastPos.top + i.velocityY * i.speed), o = i.limitPosition(t, e, i.contentStartPos.width, i.contentStartPos.height), o.width = i.contentStartPos.width, o.height = i.contentStartPos.height, n.fancybox.animate(i.$content, o, 330)) }, u.prototype.endZooming = function () { var t, e, o, i, a = this, s = a.instance.current, r = a.newWidth, c = a.newHeight; a.contentLastPos && (t = a.contentLastPos.left, e = a.contentLastPos.top, i = { top: e, left: t, width: r, height: c, scaleX: 1, scaleY: 1 }, n.fancybox.setTranslate(a.$content, i), r < a.canvasWidth && c < a.canvasHeight ? a.instance.scaleToFit(150) : r > s.width || c > s.height ? a.instance.scaleToActual(a.centerPointStartX, a.centerPointStartY, 150) : (o = a.limitPosition(t, e, r, c), n.fancybox.setTranslate(a.content, n.fancybox.getTranslate(a.$content)), n.fancybox.animate(a.$content, o, 150))) }, u.prototype.onTap = function (t) { var e, o = this, i = n(t.target), s = o.instance, r = s.current, c = t && a(t) || o.startPoints, l = c[0] ? c[0].x - o.$stage.offset().left : 0, u = c[0] ? c[0].y - o.$stage.offset().top : 0, d = function (e) { var i = r.opts[e]; if (n.isFunction(i) && (i = i.apply(s, [r, t])), i) switch (i) { case "close": s.close(o.startEvent); break; case "toggleControls": s.toggleControls(!0); break; case "next": s.next(); break; case "nextOrClose": s.group.length > 1 ? s.next() : s.close(o.startEvent); break; case "zoom": "image" == r.type && (r.isLoaded || r.$ghost) && (s.canPan() ? s.scaleToFit() : s.isScaledDown() ? s.scaleToActual(l, u) : s.group.length < 2 && s.close(o.startEvent)) } }; if (!(t.originalEvent && 2 == t.originalEvent.button || s.isSliding || l > i[0].clientWidth + i.offset().left)) { if (i.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) e = "Outside"; else if (i.is(".fancybox-slide")) e = "Slide"; else { if (!s.current.$content || !s.current.$content.has(t.target).length) return; e = "Content" } if (o.tapped) { if (clearTimeout(o.tapped), o.tapped = null, Math.abs(l - o.tapX) > 50 || Math.abs(u - o.tapY) > 50 || s.isSliding) return this; d("dblclick" + e) } else o.tapX = l, o.tapY = u, r.opts["dblclick" + e] && r.opts["dblclick" + e] !== r.opts["click" + e] ? o.tapped = setTimeout(function () { o.tapped = null, d("click" + e) }, 300) : d("click" + e); return this } }, n(e).on("onActivate.fb", function (t, e) { e && !e.Guestures && (e.Guestures = new u(e)) }), n(e).on("beforeClose.fb", function (t, e) { e && e.Guestures && e.Guestures.destroy() }) }(window, document, window.jQuery), function (t, e) { "use strict"; var n = function (t) { this.instance = t, this.init() }; e.extend(n.prototype, { timer: null, isActive: !1, $button: null, speed: 3e3, init: function () { var t = this; t.$button = t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function () { t.toggle() }), (t.instance.group.length < 2 || !t.instance.group[t.instance.currIndex].opts.slideShow) && t.$button.hide() }, set: function () { var t = this; t.instance && t.instance.current && (t.instance.current.opts.loop || t.instance.currIndex < t.instance.group.length - 1) ? t.timer = setTimeout(function () { t.instance.next() }, t.instance.current.opts.slideShow.speed || t.speed) : (t.stop(), t.instance.idleSecondsCounter = 0, t.instance.showControls()) }, clear: function () { var t = this; clearTimeout(t.timer), t.timer = null }, start: function () { var t = this, e = t.instance.current; t.instance && e && (e.opts.loop || e.index < t.instance.group.length - 1) && (t.isActive = !0, t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).addClass("fancybox-button--pause"), e.isComplete && t.set()) }, stop: function () { var t = this, e = t.instance.current; t.clear(), t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause"), t.isActive = !1 }, toggle: function () { var t = this; t.isActive ? t.stop() : t.start() } }), e(t).on({ "onInit.fb": function (t, e) { e && !e.SlideShow && (e.SlideShow = new n(e)) }, "beforeShow.fb": function (t, e, n, o) { var i = e && e.SlideShow; o ? i && n.opts.slideShow.autoStart && i.start() : i && i.isActive && i.clear() }, "afterShow.fb": function (t, e, n) { var o = e && e.SlideShow; o && o.isActive && o.set() }, "afterKeydown.fb": function (n, o, i, a, s) { var r = o && o.SlideShow; !r || !i.opts.slideShow || 80 !== s && 32 !== s || e(t.activeElement).is("button,a,input") || (a.preventDefault(), r.toggle()) }, "beforeClose.fb onDeactivate.fb": function (t, e) { var n = e && e.SlideShow; n && n.stop() } }), e(t).on("visibilitychange", function () { var n = e.fancybox.getInstance(), o = n && n.SlideShow; o && o.isActive && (t.hidden ? o.clear() : o.set()) }) }(document, window.jQuery), function (t, e) { "use strict"; var n = function () { var e, n, o, i = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], a = {}; for (n = 0; n < i.length; n++)if (e = i[n], e && e[1] in t) { for (o = 0; o < e.length; o++)a[i[0][o]] = e[o]; return a } return !1 }(); if (!n) return void (e.fancybox.defaults.btnTpl.fullScreen = !1); var o = { request: function (e) { e = e || t.documentElement, e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT) }, exit: function () { t[n.exitFullscreen]() }, toggle: function (e) { e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e) }, isFullscreen: function () { return Boolean(t[n.fullscreenElement]) }, enabled: function () { return Boolean(t[n.fullscreenEnabled]) } }; e(t).on({ "onInit.fb": function (t, e) { var n, i = e.$refs.toolbar.find("[data-fancybox-fullscreen]"); e && !e.FullScreen && e.group[e.currIndex].opts.fullScreen ? (n = e.$refs.container, n.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (t) { t.stopPropagation(), t.preventDefault(), o.toggle(n[0]) }), e.opts.fullScreen && e.opts.fullScreen.autoStart === !0 && o.request(n[0]), e.FullScreen = o) : i.hide() }, "afterKeydown.fb": function (t, e, n, o, i) { e && e.FullScreen && 70 === i && (o.preventDefault(), e.FullScreen.toggle(e.$refs.container[0])) }, "beforeClose.fb": function (t) { t && t.FullScreen && o.exit() } }), e(t).on(n.fullscreenchange, function () { var t = e.fancybox.getInstance(); t.current && "image" === t.current.type && t.isAnimating && (t.current.$content.css("transition", "none"), t.isAnimating = !1, t.update(!0, !0, 0)) }) }(document, window.jQuery), function (t, e) { "use strict"; var n = function (t) { this.instance = t, this.init() }; e.extend(n.prototype, { $button: null, $grid: null, $list: null, isVisible: !1, init: function () { var t = this, e = t.instance.group[0], n = t.instance.group[1]; t.$button = t.instance.$refs.toolbar.find("[data-fancybox-thumbs]"), t.instance.group.length > 1 && t.instance.group[t.instance.currIndex].opts.thumbs && ("image" == e.type || e.opts.thumb || e.opts.$thumb) && ("image" == n.type || n.opts.thumb || n.opts.$thumb) ? (t.$button.on("click", function () { t.toggle() }), t.isActive = !0) : (t.$button.hide(), t.isActive = !1) }, create: function () { var t, n, o = this.instance; this.$grid = e('<div class="fancybox-thumbs"></div>').appendTo(o.$refs.container), t = "<ul>", e.each(o.group, function (e, o) { n = o.opts.thumb || (o.opts.$thumb ? o.opts.$thumb.attr("src") : null), n || "image" !== o.type || (n = o.src), n && n.length && (t += '<li data-index="' + e + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + n + '" /></li>') }), t += "</ul>", this.$list = e(t).appendTo(this.$grid).on("click", "li", function () { o.jumpTo(e(this).data("index")) }), this.$list.find("img").hide().one("load", function () { var t, n, o, i, a = e(this).parent().removeClass("fancybox-thumbs-loading"), s = a.outerWidth(), r = a.outerHeight(); t = this.naturalWidth || this.width, n = this.naturalHeight || this.height, o = t / s, i = n / r, o >= 1 && i >= 1 && (o > i ? (t /= i, n = r) : (t = s, n /= o)), e(this).css({ width: Math.floor(t), height: Math.floor(n), "margin-top": Math.min(0, Math.floor(.3 * r - .3 * n)), "margin-left": Math.min(0, Math.floor(.5 * s - .5 * t)) }).show() }).each(function () { this.src = e(this).data("src") }) }, focus: function () { this.instance.current && this.$list.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + this.instance.current.index + '"]').addClass("fancybox-thumbs-active").focus() }, close: function () { this.$grid.hide() }, update: function () { this.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), this.isVisible ? (this.$grid || this.create(), this.instance.trigger("onThumbsShow"), this.focus()) : this.$grid && this.instance.trigger("onThumbsHide"), this.instance.update() }, hide: function () { this.isVisible = !1, this.update() }, show: function () { this.isVisible = !0, this.update() }, toggle: function () { this.isVisible = !this.isVisible, this.update() } }), e(t).on({ "onInit.fb": function (t, e) { e && !e.Thumbs && (e.Thumbs = new n(e)) }, "beforeShow.fb": function (t, e, n, o) { var i = e && e.Thumbs; if (i && i.isActive) { if (n.modal) return i.$button.hide(), void i.hide(); o && e.opts.thumbs.autoStart === !0 && i.show(), i.isVisible && i.focus() } }, "afterKeydown.fb": function (t, e, n, o, i) { var a = e && e.Thumbs; a && a.isActive && 71 === i && (o.preventDefault(), a.toggle()) }, "beforeClose.fb": function (t, e) { var n = e && e.Thumbs; n && n.isVisible && e.opts.thumbs.hideOnClose !== !1 && n.close() } }) }(document, window.jQuery), function (t, e, n) { "use strict"; function o() { var t = e.location.hash.substr(1), n = t.split("-"), o = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1, i = n.join("-"); return o < 1 && (o = 1), { hash: t, index: o, gallery: i } } function i(t) { var e; "" !== t.gallery && (e = n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1), e.length || (e = n("#" + n.escapeSelector(t.gallery))), e.length && (s = !1, e.trigger("click"))) } function a(t) { var e; return !!t && (e = t.current ? t.current.opts : t.opts, e.$orig ? e.$orig.data("fancybox") : e.hash || "") } n.escapeSelector || (n.escapeSelector = function (t) { var e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, n = function (t, e) { return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t }; return (t + "").replace(e, n) }); var s = !0, r = null, c = null; n(function () { setTimeout(function () { n.fancybox.defaults.hash !== !1 && (n(t).on({ "onInit.fb": function (t, e) { var n, i; e.group[e.currIndex].opts.hash !== !1 && (n = o(), i = a(e), i && n.gallery && i == n.gallery && (e.currIndex = n.index - 1)) }, "beforeShow.fb": function (n, o, i) { var l; i.opts.hash !== !1 && (l = a(o), l && "" !== l && (e.location.hash.indexOf(l) < 0 && (o.opts.origHash = e.location.hash), r = l + (o.group.length > 1 ? "-" + (i.index + 1) : ""), "replaceState" in e.history ? (c && clearTimeout(c), c = setTimeout(function () { e.history[s ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + r), c = null, s = !1 }, 300)) : e.location.hash = r)) }, "beforeClose.fb": function (o, i, s) { var l, u; c && clearTimeout(c), s.opts.hash !== !1 && (l = a(i), u = i && i.opts.origHash ? i.opts.origHash : "", l && "" !== l && ("replaceState" in history ? e.history.replaceState({}, t.title, e.location.pathname + e.location.search + u) : (e.location.hash = u, n(e).scrollTop(i.scrollTop).scrollLeft(i.scrollLeft))), r = null) } }), n(e).on("hashchange.fb", function () { var t = o(); n.fancybox.getInstance() ? !r || r === t.gallery + "-" + t.index || 1 === t.index && r == t.gallery || (r = null, n.fancybox.close(), s = !0) : "" !== t.gallery && i(t) }), i(o())) }, 50) }) }(document, window, window.jQuery);
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
; (function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function () {
        var instanceUid = 0;

        function Slick(element, settings) {
            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function (slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
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
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

            _.registerBreakpoints();
            _.init(true);
        }

        return Slick;
    }());

    Slick.prototype.activateADA = function () {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });
    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {
        var _ = this;

        if (typeof (index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof (index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function (index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();
    };

    Slick.prototype.animateHeight = function () {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function (targetLeft, callback) {
        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }
        } else {
            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                        duration: _.options.speed,
                        easing: _.options.easing,
                        step: function (now) {
                            now = Math.ceil(now);
                            if (_.options.vertical === false) {
                                animProps[_.animType] = 'translate(' +
                                    now + 'px, 0px)';
                                _.$slideTrack.css(animProps);
                            } else {
                                animProps[_.animType] = 'translate(0px,' +
                                    now + 'px)';
                                _.$slideTrack.css(animProps);
                            }
                        },
                        complete: function () {
                            if (callback) {
                                callback.call();
                            }
                        }
                    });
            } else {
                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function () {
                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }
            }
        }
    };

    Slick.prototype.getNavTarget = function () {
        var _ = this,
            asNavFor = _.options.asNavFor;

        if (asNavFor && asNavFor !== null) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;
    };

    Slick.prototype.asNavFor = function (index) {
        var _ = this,
            asNavFor = _.getNavTarget();

        if (asNavFor !== null && typeof asNavFor === 'object') {
            asNavFor.each(function () {
                var target = $(this).slick('getSlick');
                if (!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }
    };

    Slick.prototype.applyTransition = function (slide) {
        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }
    };

    Slick.prototype.autoPlay = function () {
        var _ = this;

        _.autoPlayClear();

        if (_.slideCount > _.options.slidesToShow) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
        }
    };

    Slick.prototype.autoPlayClear = function () {
        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }
    };

    Slick.prototype.autoPlayIterator = function () {
        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if (!_.paused && !_.interrupted && !_.focussed) {
            if (_.options.infinite === false) {
                if (_.direction === 1 && (_.currentSlide + 1) === (_.slideCount - 1)) {
                    _.direction = 0;
                }

                else if (_.direction === 0) {
                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if (_.currentSlide - 1 === 0) {
                        _.direction = 1;
                    }
                }
            }

            _.slideHandler(slideTo);
        }
    };

    Slick.prototype.buildArrows = function () {
        var _ = this;

        if (_.options.arrows === true) {
            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if (_.slideCount > _.options.slidesToShow) {
                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }
            } else {
                _.$prevArrow.add(_.$nextArrow)

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });
            }
        }
    };

    Slick.prototype.buildDots = function () {
        var _ = this,
            i, dot;

        if (_.options.dots === true) {
            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');
        }
    };

    Slick.prototype.buildOut = function () {
        var _ = this;

        _.$slides =
            _.$slider
                .children(_.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function (index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }
    };

    Slick.prototype.buildRows = function () {
        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides, slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if (_.options.rows > 1) {
            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for (a = 0; a < numOfSlides; a++) {
                var slide = document.createElement('div');
                for (b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for (c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width': (100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });
        }
    };

    Slick.prototype.checkResponsive = function (initial, forceUpdate) {
        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if (_.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {
            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                            targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if (!initial && triggerBreakpoint !== false) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }
    };

    Slick.prototype.changeSlide = function (event, dontAnimate) {
        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if ($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if (!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {
            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }
    };

    Slick.prototype.checkNavigable = function (index) {
        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function () {
        var _ = this;

        if (_.options.dots && _.$dots !== null) {
            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
    };

    Slick.prototype.cleanUpSlideEvents = function () {
        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
    };

    Slick.prototype.cleanUpRows = function () {
        var _ = this, originalSlides;

        if (_.options.rows > 1) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }
    };

    Slick.prototype.clickHandler = function (event) {
        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }
    };

    Slick.prototype.destroy = function (refresh) {
        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.$prevArrow.length) {
            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display', '');

            if (_.htmlExpr.test(_.options.prevArrow)) {
                _.$prevArrow.remove();
            }
        }

        if (_.$nextArrow && _.$nextArrow.length) {
            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display', '');

            if (_.htmlExpr.test(_.options.nextArrow)) {
                _.$nextArrow.remove();
            }
        }

        if (_.$slides) {
            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function () {
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if (!refresh) {
            _.$slider.trigger('destroy', [_]);
        }
    };

    Slick.prototype.disableTransition = function (slide) {
        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }
    };

    Slick.prototype.fadeSlide = function (slideIndex, callback) {
        var _ = this;

        if (_.cssTransitions === false) {
            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);
        } else {
            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function () {
                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }
        }
    };

    Slick.prototype.fadeSlideOut = function (slideIndex) {
        var _ = this;

        if (_.cssTransitions === false) {
            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);
        } else {
            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });
        }
    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {
        var _ = this;

        if (filter !== null) {
            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();
        }
    };

    Slick.prototype.focusHandler = function () {
        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function (event) {
                event.stopImmediatePropagation();
                var $sf = $(this);

                setTimeout(function () {
                    if (_.options.pauseOnFocus) {
                        _.focussed = $sf.is(':focus');
                        _.autoPlay();
                    }
                }, 0);
            });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
        var _ = this;
        return _.currentSlide;
    };

    Slick.prototype.getDotCount = function () {
        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if (!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        } else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;
    };

    Slick.prototype.getLeft = function (slideIndex) {
        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {
            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft = 0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft = 0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;
    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {
        var _ = this;

        return _.options[option];
    };

    Slick.prototype.getNavigableIndexes = function () {
        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;
    };

    Slick.prototype.getSlick = function () {
        return this;
    };

    Slick.prototype.getSlideCount = function () {
        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function (index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;
        } else {
            return _.options.slidesToScroll;
        }
    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {
        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);
    };

    Slick.prototype.init = function (creation) {
        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {
            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();
        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if (_.options.autoplay) {
            _.paused = false;
            _.autoPlay();
        }
    };

    Slick.prototype.initADA = function () {
        var _ = this,
            numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
            tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
                return (val >= 0) && (val < _.slideCount);
            });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                    $(this).attr({
                        'aria-describedby': 'slick-slide-control' + _.instanceUid + slideControlIndex
                    });
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function (i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });
            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
            _.$slides.eq(i).attr('tabindex', 0);
        }

        _.activateADA();
    };

    Slick.prototype.initArrowEvents = function () {
        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
                .off('click.slick')
                .on('click.slick', {
                    message: 'previous'
                }, _.changeSlide);
            _.$nextArrow
                .off('click.slick')
                .on('click.slick', {
                    message: 'next'
                }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }
    };

    Slick.prototype.initDotEvents = function () {
        var _ = this;

        if (_.options.dots === true) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true) {
            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));
        }
    };

    Slick.prototype.initSlideEvents = function () {
        var _ = this;

        if (_.options.pauseOnHover) {
            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
        }
    };

    Slick.prototype.initializeEvents = function () {
        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);
    };

    Slick.prototype.initUI = function () {
        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.show();
            _.$nextArrow.show();
        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            _.$dots.show();
        }
    };

    Slick.prototype.keyHandler = function (event) {
        var _ = this;
        //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' : 'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }
    };

    Slick.prototype.lazyLoad = function () {
        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {
            $('img[data-lazy]', imagesScope).each(function () {
                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function () {
                    image
                        .animate({ opacity: 0 }, 100, function () {
                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet);

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes);
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function () {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });
                };

                imageToLoad.onerror = function () {
                    image
                        .removeAttr('data-lazy')
                        .removeClass('slick-loading')
                        .addClass('slick-lazyload-error');

                    _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
                };

                imageToLoad.src = imageSource;
            });
        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
            if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
                cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
                loadImages(cloneRange);
            } else if (_.currentSlide === 0) {
                cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
                loadImages(cloneRange);
            }
    };

    Slick.prototype.loadSlider = function () {
        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }
    };

    Slick.prototype.next = Slick.prototype.slickNext = function () {
        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });
    };

    Slick.prototype.orientationChange = function () {
        var _ = this;

        _.checkResponsive();
        _.setPosition();
    };

    Slick.prototype.pause = Slick.prototype.slickPause = function () {
        var _ = this;

        _.autoPlayClear();
        _.paused = true;
    };

    Slick.prototype.play = Slick.prototype.slickPlay = function () {
        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;
    };

    Slick.prototype.postSlide = function (index) {
        var _ = this;

        if (!_.unslicked) {
            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if (_.options.autoplay) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }
        }
    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function () {
        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });
    };

    Slick.prototype.preventDefault = function (event) {
        event.preventDefault();
    };

    Slick.prototype.progressiveLazyLoad = function (tryCount) {
        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $('img[data-lazy]', _.$slider),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ($imgsToLoad.length) {
            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function () {
                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet);

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes);
                    }
                }

                image
                    .attr('src', imageSource)
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if (_.options.adaptiveHeight === true) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                _.progressiveLazyLoad();
            };

            imageToLoad.onerror = function () {
                if (tryCount < 3) {
                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout(function () {
                        _.progressiveLazyLoad(tryCount + 1);
                    }, 500);
                } else {
                    image
                        .removeAttr('data-lazy')
                        .removeClass('slick-loading')
                        .addClass('slick-lazyload-error');

                    _.$slider.trigger('lazyLoadError', [_, image, imageSource]);

                    _.progressiveLazyLoad();
                }
            };

            imageToLoad.src = imageSource;
        } else {
            _.$slider.trigger('allImagesLoaded', [_]);
        }
    };

    Slick.prototype.refresh = function (initializing) {
        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if (!_.options.infinite && (_.currentSlide > lastVisibleIndex)) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if (!initializing) {
            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);
        }
    };

    Slick.prototype.registerBreakpoints = function () {
        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {
            _.respondTo = _.options.respondTo || 'window';

            for (breakpoint in responsiveSettings) {
                l = _.breakpoints.length - 1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while (l >= 0) {
                        if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
                            _.breakpoints.splice(l, 1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
                }
            }

            _.breakpoints.sort(function (a, b) {
                return (_.options.mobileFirst) ? a - b : b - a;
            });
        }
    };

    Slick.prototype.reinit = function () {
        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);
    };

    Slick.prototype.resize = function () {
        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function () {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if (!_.unslicked) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {
        var _ = this;

        if (typeof (index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();
    };

    Slick.prototype.setCSS = function (position) {
        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }
    };

    Slick.prototype.setDimensions = function () {
        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();

        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));
        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
    };

    Slick.prototype.setFade = function () {
        var _ = this,
            targetLeft;

        _.$slides.each(function (index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });
    };

    Slick.prototype.setHeight = function () {
        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }
    };

    Slick.prototype.setOption =
        Slick.prototype.slickSetOption = function () {
            /**
             * accepts arguments in format of:
             *
             *  - for changing a single option's value:
             *     .slick("setOption", option, value, refresh )
             *
             *  - for changing a set of responsive options:
             *     .slick("setOption", 'responsive', [{}, ...], refresh )
             *
             *  - for updating multiple values at once (not responsive)
             *     .slick("setOption", { 'option': value, ... }, refresh )
             */

            var _ = this, l, item, option, value, refresh = false, type;

            if ($.type(arguments[0]) === 'object') {
                option = arguments[0];
                refresh = arguments[1];
                type = 'multiple';
            } else if ($.type(arguments[0]) === 'string') {
                option = arguments[0];
                value = arguments[1];
                refresh = arguments[2];

                if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {
                    type = 'responsive';
                } else if (typeof arguments[1] !== 'undefined') {
                    type = 'single';
                }
            }

            if (type === 'single') {
                _.options[option] = value;
            } else if (type === 'multiple') {
                $.each(option, function (opt, val) {
                    _.options[opt] = val;
                });
            } else if (type === 'responsive') {
                for (item in value) {
                    if ($.type(_.options.responsive) !== 'array') {
                        _.options.responsive = [value[item]];
                    } else {
                        l = _.options.responsive.length - 1;

                        // loop through the responsive object and splice out duplicates.
                        while (l >= 0) {
                            if (_.options.responsive[l].breakpoint === value[item].breakpoint) {
                                _.options.responsive.splice(l, 1);
                            }

                            l--;
                        }

                        _.options.responsive.push(value[item]);
                    }
                }
            }

            if (refresh) {
                _.unload();
                _.reinit();
            }
        };

    Slick.prototype.setPosition = function () {
        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);
    };

    Slick.prototype.setProps = function () {
        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if (_.options.fade) {
            if (typeof _.options.zIndex === 'number') {
                if (_.options.zIndex < 3) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };

    Slick.prototype.setSlideClasses = function (index) {
        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {
            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {
                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');
                } else {
                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');
                }

                if (index === 0) {
                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');
                } else if (index === _.slideCount - 1) {
                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');
                }
            }

            _.$slides
                .eq(index)
                .addClass('slick-center');
        } else {
            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {
                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');
            } else if (allSlides.length <= _.options.slidesToShow) {
                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');
            } else {
                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {
                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');
                } else {
                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');
                }
            }
        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function () {
        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {
            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {
                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                    infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
                    $(this).attr('id', '');
                });
            }
        }
    };

    Slick.prototype.interrupt = function (toggle) {
        var _ = this;

        if (!toggle) {
            _.autoPlay();
        }
        _.interrupted = toggle;
    };

    Slick.prototype.selectHandler = function (event) {
        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideHandler(index, false, true);
            return;
        }

        _.slideHandler(index);
    };

    Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function () {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function () {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if (_.options.autoplay) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if (_.options.asNavFor) {
            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if (navTarget.slideCount <= navTarget.options.slidesToShow) {
                navTarget.setSlideClasses(_.currentSlide);
            }
        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {
                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function () {
                    _.postSlide(animSlide);
                });
            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true) {
            _.animateSlide(targetLeft, function () {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }
    };

    Slick.prototype.startLoad = function () {
        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.hide();
            _.$nextArrow.hide();
        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            _.$dots.hide();
        }

        _.$slider.addClass('slick-loading');
    };

    Slick.prototype.swipeDirection = function () {
        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';
    };

    Slick.prototype.swipeEnd = function (event) {
        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = (_.touchObject.swipeLength > 10) ? false : true;

        if (_.touchObject.curX === undefined) {
            return false;
        }

        if (_.touchObject.edgeHit === true) {
            _.$slider.trigger('edge', [_, _.swipeDirection()]);
        }

        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
            direction = _.swipeDirection();

            switch (direction) {
                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable(_.currentSlide + _.getSlideCount()) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable(_.currentSlide - _.getSlideCount()) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:
            }

            if (direction != 'vertical') {
                _.slideHandler(slideCount);
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction]);
            }
        } else {
            if (_.touchObject.startX !== _.touchObject.curX) {
                _.slideHandler(_.currentSlide);
                _.touchObject = {};
            }
        }
    };

    Slick.prototype.swipeHandler = function (event) {
        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {
            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;
        }
    };

    Slick.prototype.swipeMove = function (event) {
        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }

        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);
    };

    Slick.prototype.swipeStart = function (event) {
        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;
    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
        var _ = this;

        if (_.$slidesCache !== null) {
            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();
        }
    };

    Slick.prototype.unload = function () {
        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');
    };

    Slick.prototype.unslick = function (fromBreakpoint) {
        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();
    };

    Slick.prototype.updateArrows = function () {
        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if (_.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite) {
            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {
                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            }
        }
    };

    Slick.prototype.updateDots = function () {
        var _ = this;

        if (_.$dots !== null) {
            _.$dots
                .find('li')
                .removeClass('slick-active')
                .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');
        }
    };

    Slick.prototype.visibility = function () {
        var _ = this;

        if (_.options.autoplay) {
            if (document[_.hidden]) {
                _.interrupted = true;
            } else {
                _.interrupted = false;
            }
        }
    };

    $.fn.slick = function () {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };
}));

/********************************************
	-	THEMEPUNCH TOOLS Ver. 1.0     -
	 Last Update of Tools 08.03.2018
*********************************************/

/*
* @fileOverview TouchSwipe - jQuery Plugin
* @version 1.6.9
*
* @author Matt Bryson http://www.github.com/mattbryson
* @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* @see http://labs.skinkers.com/touchSwipe/
* @see http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson
* Dual licensed under the MIT or GPL Version 2 licenses.
*
*/

(function (a) { if (typeof define === "function" && define.amd && define.amd.jQuery) { define(["jquery"], a) } else { a(jQuery) } }(function (f) { var y = "1.6.9", p = "left", o = "right", e = "up", x = "down", c = "in", A = "out", m = "none", s = "auto", l = "swipe", t = "pinch", B = "tap", j = "doubletap", b = "longtap", z = "hold", E = "horizontal", u = "vertical", i = "all", r = 10, g = "start", k = "move", h = "end", q = "cancel", a = "ontouchstart" in window, v = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled, d = window.navigator.pointerEnabled || window.navigator.msPointerEnabled, C = "TouchSwipe"; var n = { fingers: 1, threshold: 75, cancelThreshold: null, pinchThreshold: 20, maxTimeThreshold: null, fingerReleaseThreshold: 250, longTapThreshold: 500, doubleTapThreshold: 200, swipe: null, swipeLeft: null, swipeRight: null, swipeUp: null, swipeDown: null, swipeStatus: null, pinchIn: null, pinchOut: null, pinchStatus: null, click: null, tap: null, doubleTap: null, longTap: null, hold: null, triggerOnTouchEnd: true, triggerOnTouchLeave: false, allowPageScroll: "auto", fallbackToMouseEvents: true, excludedElements: "label, button, input, select, textarea, a, .noSwipe", preventDefaultEvents: true }; f.fn.swipetp = function (H) { var G = f(this), F = G.data(C); if (F && typeof H === "string") { if (F[H]) { return F[H].apply(this, Array.prototype.slice.call(arguments, 1)) } else { f.error("Method " + H + " does not exist on jQuery.swipetp") } } else { if (!F && (typeof H === "object" || !H)) { return w.apply(this, arguments) } } return G }; f.fn.swipetp.version = y; f.fn.swipetp.defaults = n; f.fn.swipetp.phases = { PHASE_START: g, PHASE_MOVE: k, PHASE_END: h, PHASE_CANCEL: q }; f.fn.swipetp.directions = { LEFT: p, RIGHT: o, UP: e, DOWN: x, IN: c, OUT: A }; f.fn.swipetp.pageScroll = { NONE: m, HORIZONTAL: E, VERTICAL: u, AUTO: s }; f.fn.swipetp.fingers = { ONE: 1, TWO: 2, THREE: 3, ALL: i }; function w(F) { if (F && (F.allowPageScroll === undefined && (F.swipe !== undefined || F.swipeStatus !== undefined))) { F.allowPageScroll = m } if (F.click !== undefined && F.tap === undefined) { F.tap = F.click } if (!F) { F = {} } F = f.extend({}, f.fn.swipetp.defaults, F); return this.each(function () { var H = f(this); var G = H.data(C); if (!G) { G = new D(this, F); H.data(C, G) } }) } function D(a5, aw) { var aA = (a || d || !aw.fallbackToMouseEvents), K = aA ? (d ? (v ? "MSPointerDown" : "pointerdown") : "touchstart") : "mousedown", az = aA ? (d ? (v ? "MSPointerMove" : "pointermove") : "touchmove") : "mousemove", V = aA ? (d ? (v ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup", T = aA ? null : "mouseleave", aE = (d ? (v ? "MSPointerCancel" : "pointercancel") : "touchcancel"); var ah = 0, aQ = null, ac = 0, a2 = 0, a0 = 0, H = 1, ar = 0, aK = 0, N = null; var aS = f(a5); var aa = "start"; var X = 0; var aR = null; var U = 0, a3 = 0, a6 = 0, ae = 0, O = 0; var aX = null, ag = null; try { aS.bind(K, aO); aS.bind(aE, ba) } catch (al) { f.error("events not supported " + K + "," + aE + " on jQuery.swipetp") } this.enable = function () { aS.bind(K, aO); aS.bind(aE, ba); return aS }; this.disable = function () { aL(); return aS }; this.destroy = function () { aL(); aS.data(C, null); aS = null }; this.option = function (bd, bc) { if (aw[bd] !== undefined) { if (bc === undefined) { return aw[bd] } else { aw[bd] = bc } } else { f.error("Option " + bd + " does not exist on jQuery.swipetp.options") } return null }; function aO(be) { if (aC()) { return } if (f(be.target).closest(aw.excludedElements, aS).length > 0) { return } var bf = be.originalEvent ? be.originalEvent : be; var bd, bg = bf.touches, bc = bg ? bg[0] : bf; aa = g; if (bg) { X = bg.length } else { be.preventDefault() } ah = 0; aQ = null; aK = null; ac = 0; a2 = 0; a0 = 0; H = 1; ar = 0; aR = ak(); N = ab(); S(); if (!bg || (X === aw.fingers || aw.fingers === i) || aY()) { aj(0, bc); U = au(); if (X == 2) { aj(1, bg[1]); a2 = a0 = av(aR[0].start, aR[1].start) } if (aw.swipeStatus || aw.pinchStatus) { bd = P(bf, aa) } } else { bd = false } if (bd === false) { aa = q; P(bf, aa); return bd } else { if (aw.hold) { ag = setTimeout(f.proxy(function () { aS.trigger("hold", [bf.target]); if (aw.hold) { bd = aw.hold.call(aS, bf, bf.target) } }, this), aw.longTapThreshold) } ap(true) } return null } function a4(bf) { var bi = bf.originalEvent ? bf.originalEvent : bf; if (aa === h || aa === q || an()) { return } var be, bj = bi.touches, bd = bj ? bj[0] : bi; var bg = aI(bd); a3 = au(); if (bj) { X = bj.length } if (aw.hold) { clearTimeout(ag) } aa = k; if (X == 2) { if (a2 == 0) { aj(1, bj[1]); a2 = a0 = av(aR[0].start, aR[1].start) } else { aI(bj[1]); a0 = av(aR[0].end, aR[1].end); aK = at(aR[0].end, aR[1].end) } H = a8(a2, a0); ar = Math.abs(a2 - a0) } if ((X === aw.fingers || aw.fingers === i) || !bj || aY()) { aQ = aM(bg.start, bg.end); am(bf, aQ); ah = aT(bg.start, bg.end); ac = aN(); aJ(aQ, ah); if (aw.swipeStatus || aw.pinchStatus) { be = P(bi, aa) } if (!aw.triggerOnTouchEnd || aw.triggerOnTouchLeave) { var bc = true; if (aw.triggerOnTouchLeave) { var bh = aZ(this); bc = F(bg.end, bh) } if (!aw.triggerOnTouchEnd && bc) { aa = aD(k) } else { if (aw.triggerOnTouchLeave && !bc) { aa = aD(h) } } if (aa == q || aa == h) { P(bi, aa) } } } else { aa = q; P(bi, aa) } if (be === false) { aa = q; P(bi, aa) } } function M(bc) { var bd = bc.originalEvent ? bc.originalEvent : bc, be = bd.touches; if (be) { if (be.length) { G(); return true } } if (an()) { X = ae } a3 = au(); ac = aN(); if (bb() || !ao()) { aa = q; P(bd, aa) } else { if (aw.triggerOnTouchEnd || (aw.triggerOnTouchEnd == false && aa === k)) { bc.preventDefault(); aa = h; P(bd, aa) } else { if (!aw.triggerOnTouchEnd && a7()) { aa = h; aG(bd, aa, B) } else { if (aa === k) { aa = q; P(bd, aa) } } } } ap(false); return null } function ba() { X = 0; a3 = 0; U = 0; a2 = 0; a0 = 0; H = 1; S(); ap(false) } function L(bc) { var bd = bc.originalEvent ? bc.originalEvent : bc; if (aw.triggerOnTouchLeave) { aa = aD(h); P(bd, aa) } } function aL() { aS.unbind(K, aO); aS.unbind(aE, ba); aS.unbind(az, a4); aS.unbind(V, M); if (T) { aS.unbind(T, L) } ap(false) } function aD(bg) { var bf = bg; var be = aB(); var bd = ao(); var bc = bb(); if (!be || bc) { bf = q } else { if (bd && bg == k && (!aw.triggerOnTouchEnd || aw.triggerOnTouchLeave)) { bf = h } else { if (!bd && bg == h && aw.triggerOnTouchLeave) { bf = q } } } return bf } function P(be, bc) { var bd, bf = be.touches; if ((J() || W()) || (Q() || aY())) { if (J() || W()) { bd = aG(be, bc, l) } if ((Q() || aY()) && bd !== false) { bd = aG(be, bc, t) } } else { if (aH() && bd !== false) { bd = aG(be, bc, j) } else { if (aq() && bd !== false) { bd = aG(be, bc, b) } else { if (ai() && bd !== false) { bd = aG(be, bc, B) } } } } if (bc === q) { ba(be) } if (bc === h) { if (bf) { if (!bf.length) { ba(be) } } else { ba(be) } } return bd } function aG(bf, bc, be) { var bd; if (be == l) { aS.trigger("swipeStatus", [bc, aQ || null, ah || 0, ac || 0, X, aR]); if (aw.swipeStatus) { bd = aw.swipeStatus.call(aS, bf, bc, aQ || null, ah || 0, ac || 0, X, aR); if (bd === false) { return false } } if (bc == h && aW()) { aS.trigger("swipe", [aQ, ah, ac, X, aR]); if (aw.swipe) { bd = aw.swipe.call(aS, bf, aQ, ah, ac, X, aR); if (bd === false) { return false } } switch (aQ) { case p: aS.trigger("swipeLeft", [aQ, ah, ac, X, aR]); if (aw.swipeLeft) { bd = aw.swipeLeft.call(aS, bf, aQ, ah, ac, X, aR) } break; case o: aS.trigger("swipeRight", [aQ, ah, ac, X, aR]); if (aw.swipeRight) { bd = aw.swipeRight.call(aS, bf, aQ, ah, ac, X, aR) } break; case e: aS.trigger("swipeUp", [aQ, ah, ac, X, aR]); if (aw.swipeUp) { bd = aw.swipeUp.call(aS, bf, aQ, ah, ac, X, aR) } break; case x: aS.trigger("swipeDown", [aQ, ah, ac, X, aR]); if (aw.swipeDown) { bd = aw.swipeDown.call(aS, bf, aQ, ah, ac, X, aR) } break } } } if (be == t) { aS.trigger("pinchStatus", [bc, aK || null, ar || 0, ac || 0, X, H, aR]); if (aw.pinchStatus) { bd = aw.pinchStatus.call(aS, bf, bc, aK || null, ar || 0, ac || 0, X, H, aR); if (bd === false) { return false } } if (bc == h && a9()) { switch (aK) { case c: aS.trigger("pinchIn", [aK || null, ar || 0, ac || 0, X, H, aR]); if (aw.pinchIn) { bd = aw.pinchIn.call(aS, bf, aK || null, ar || 0, ac || 0, X, H, aR) } break; case A: aS.trigger("pinchOut", [aK || null, ar || 0, ac || 0, X, H, aR]); if (aw.pinchOut) { bd = aw.pinchOut.call(aS, bf, aK || null, ar || 0, ac || 0, X, H, aR) } break } } } if (be == B) { if (bc === q || bc === h) { clearTimeout(aX); clearTimeout(ag); if (Z() && !I()) { O = au(); aX = setTimeout(f.proxy(function () { O = null; aS.trigger("tap", [bf.target]); if (aw.tap) { bd = aw.tap.call(aS, bf, bf.target) } }, this), aw.doubleTapThreshold) } else { O = null; aS.trigger("tap", [bf.target]); if (aw.tap) { bd = aw.tap.call(aS, bf, bf.target) } } } } else { if (be == j) { if (bc === q || bc === h) { clearTimeout(aX); O = null; aS.trigger("doubletap", [bf.target]); if (aw.doubleTap) { bd = aw.doubleTap.call(aS, bf, bf.target) } } } else { if (be == b) { if (bc === q || bc === h) { clearTimeout(aX); O = null; aS.trigger("longtap", [bf.target]); if (aw.longTap) { bd = aw.longTap.call(aS, bf, bf.target) } } } } } return bd } function ao() { var bc = true; if (aw.threshold !== null) { bc = ah >= aw.threshold } return bc } function bb() { var bc = false; if (aw.cancelThreshold !== null && aQ !== null) { bc = (aU(aQ) - ah) >= aw.cancelThreshold } return bc } function af() { if (aw.pinchThreshold !== null) { return ar >= aw.pinchThreshold } return true } function aB() { var bc; if (aw.maxTimeThreshold) { if (ac >= aw.maxTimeThreshold) { bc = false } else { bc = true } } else { bc = true } return bc } function am(bc, bd) { if (aw.preventDefaultEvents === false) { return } if (aw.allowPageScroll === m) { bc.preventDefault() } else { var be = aw.allowPageScroll === s; switch (bd) { case p: if ((aw.swipeLeft && be) || (!be && aw.allowPageScroll != E)) { bc.preventDefault() } break; case o: if ((aw.swipeRight && be) || (!be && aw.allowPageScroll != E)) { bc.preventDefault() } break; case e: if ((aw.swipeUp && be) || (!be && aw.allowPageScroll != u)) { bc.preventDefault() } break; case x: if ((aw.swipeDown && be) || (!be && aw.allowPageScroll != u)) { bc.preventDefault() } break } } } function a9() { var bd = aP(); var bc = Y(); var be = af(); return bd && bc && be } function aY() { return !!(aw.pinchStatus || aw.pinchIn || aw.pinchOut) } function Q() { return !!(a9() && aY()) } function aW() { var bf = aB(); var bh = ao(); var be = aP(); var bc = Y(); var bd = bb(); var bg = !bd && bc && be && bh && bf; return bg } function W() { return !!(aw.swipe || aw.swipeStatus || aw.swipeLeft || aw.swipeRight || aw.swipeUp || aw.swipeDown) } function J() { return !!(aW() && W()) } function aP() { return ((X === aw.fingers || aw.fingers === i) || !a) } function Y() { return aR[0].end.x !== 0 } function a7() { return !!(aw.tap) } function Z() { return !!(aw.doubleTap) } function aV() { return !!(aw.longTap) } function R() { if (O == null) { return false } var bc = au(); return (Z() && ((bc - O) <= aw.doubleTapThreshold)) } function I() { return R() } function ay() { return ((X === 1 || !a) && (isNaN(ah) || ah < aw.threshold)) } function a1() { return ((ac > aw.longTapThreshold) && (ah < r)) } function ai() { return !!(ay() && a7()) } function aH() { return !!(R() && Z()) } function aq() { return !!(a1() && aV()) } function G() { a6 = au(); ae = event.touches.length + 1 } function S() { a6 = 0; ae = 0 } function an() { var bc = false; if (a6) { var bd = au() - a6; if (bd <= aw.fingerReleaseThreshold) { bc = true } } return bc } function aC() { return !!(aS.data(C + "_intouch") === true) } function ap(bc) { if (bc === true) { aS.bind(az, a4); aS.bind(V, M); if (T) { aS.bind(T, L) } } else { aS.unbind(az, a4, false); aS.unbind(V, M, false); if (T) { aS.unbind(T, L, false) } } aS.data(C + "_intouch", bc === true) } function aj(bd, bc) { var be = bc.identifier !== undefined ? bc.identifier : 0; aR[bd].identifier = be; aR[bd].start.x = aR[bd].end.x = bc.pageX || bc.clientX; aR[bd].start.y = aR[bd].end.y = bc.pageY || bc.clientY; return aR[bd] } function aI(bc) { var be = bc.identifier !== undefined ? bc.identifier : 0; var bd = ad(be); bd.end.x = bc.pageX || bc.clientX; bd.end.y = bc.pageY || bc.clientY; return bd } function ad(bd) { for (var bc = 0; bc < aR.length; bc++) { if (aR[bc].identifier == bd) { return aR[bc] } } } function ak() { var bc = []; for (var bd = 0; bd <= 5; bd++) { bc.push({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, identifier: 0 }) } return bc } function aJ(bc, bd) { bd = Math.max(bd, aU(bc)); N[bc].distance = bd } function aU(bc) { if (N[bc]) { return N[bc].distance } return undefined } function ab() { var bc = {}; bc[p] = ax(p); bc[o] = ax(o); bc[e] = ax(e); bc[x] = ax(x); return bc } function ax(bc) { return { direction: bc, distance: 0 } } function aN() { return a3 - U } function av(bf, be) { var bd = Math.abs(bf.x - be.x); var bc = Math.abs(bf.y - be.y); return Math.round(Math.sqrt(bd * bd + bc * bc)) } function a8(bc, bd) { var be = (bd / bc) * 1; return be.toFixed(2) } function at() { if (H < 1) { return A } else { return c } } function aT(bd, bc) { return Math.round(Math.sqrt(Math.pow(bc.x - bd.x, 2) + Math.pow(bc.y - bd.y, 2))) } function aF(bf, bd) { var bc = bf.x - bd.x; var bh = bd.y - bf.y; var be = Math.atan2(bh, bc); var bg = Math.round(be * 180 / Math.PI); if (bg < 0) { bg = 360 - Math.abs(bg) } return bg } function aM(bd, bc) { var be = aF(bd, bc); if ((be <= 45) && (be >= 0)) { return p } else { if ((be <= 360) && (be >= 315)) { return p } else { if ((be >= 135) && (be <= 225)) { return o } else { if ((be > 45) && (be < 135)) { return x } else { return e } } } } } function au() { var bc = new Date(); return bc.getTime() } function aZ(bc) { bc = f(bc); var be = bc.offset(); var bd = { left: be.left, right: be.left + bc.outerWidth(), top: be.top, bottom: be.top + bc.outerHeight() }; return bd } function F(bc, bd) { return (bc.x > bd.left && bc.x < bd.right && bc.y > bd.top && bc.y < bd.bottom) } } }));

if (typeof (console) === 'undefined') {
    var console = {};
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = console.groupCollapsed = function () { };
}

if (window.tplogs == true)
    try {
        console.groupCollapsed("ThemePunch GreenSocks Logs");
    } catch (e) { }

var oldgs = window.GreenSockGlobals;
oldgs_queue = window._gsQueue;

var punchgs = window.GreenSockGlobals = {};

if (window.tplogs == true)
    try {
        console.info("Build GreenSock SandBox for ThemePunch Plugins");
        console.info("GreenSock TweenLite Engine Initalised by ThemePunch Plugin");
    } catch (e) { }

/* TWEEN LITE */
/*!
 * VERSION: 1.19.1
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
!function (a, b) { "use strict"; var c = {}, d = a.document, e = a.GreenSockGlobals = a.GreenSockGlobals || a; if (!e.TweenLite) { var f, g, h, i, j, k = function (a) { var b, c = a.split("."), d = e; for (b = 0; b < c.length; b++)d[c[b]] = d = d[c[b]] || {}; return d }, l = k("com.greensock"), m = 1e-10, n = function (a) { var b, c = [], d = a.length; for (b = 0; b !== d; c.push(a[b++])); return c }, o = function () { }, p = function () { var a = Object.prototype.toString, b = a.call([]); return function (c) { return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b) } }(), q = {}, r = function (d, f, g, h) { this.sc = q[d] ? q[d].sc : [], q[d] = this, this.gsClass = null, this.func = g; var i = []; this.check = function (j) { for (var l, m, n, o, p, s = f.length, t = s; --s > -1;)(l = q[f[s]] || new r(f[s], [])).gsClass ? (i[s] = l.gsClass, t--) : j && l.sc.push(this); if (0 === t && g) { if (m = ("com.greensock." + d).split("."), n = m.pop(), o = k(m.join("."))[n] = this.gsClass = g.apply(g, i), h) if (e[n] = c[n] = o, p = "undefined" != typeof module && module.exports, !p && "function" == typeof define && define.amd) define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + d.split(".").pop(), [], function () { return o }); else if (p) if (d === b) { module.exports = c[b] = o; for (s in c) o[s] = c[s] } else c[b] && (c[b][n] = o); for (s = 0; s < this.sc.length; s++)this.sc[s].check() } }, this.check(!0) }, s = a._gsDefine = function (a, b, c, d) { return new r(a, b, c, d) }, t = l._class = function (a, b, c) { return b = b || function () { }, s(a, [], function () { return b }, c), b }; s.globals = e; var u = [0, 0, 1, 1], v = t("easing.Ease", function (a, b, c, d) { this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? u.concat(b) : u }, !0), w = v.map = {}, x = v.register = function (a, b, c, d) { for (var e, f, g, h, i = b.split(","), j = i.length, k = (c || "easeIn,easeOut,easeInOut").split(","); --j > -1;)for (f = i[j], e = d ? t("easing." + f, null, !0) : l.easing[f] || {}, g = k.length; --g > -1;)h = k[g], w[f + "." + h] = w[h + f] = e[h] = a.getRatio ? a : a[h] || new a }; for (h = v.prototype, h._calcEnd = !1, h.getRatio = function (a) { if (this._func) return this._params[0] = a, this._func.apply(null, this._params); var b = this._type, c = this._power, d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a); return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2 }, f = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], g = f.length; --g > -1;)h = f[g] + ",Power" + g, x(new v(null, null, 1, g), h, "easeOut", !0), x(new v(null, null, 2, g), h, "easeIn" + (0 === g ? ",easeNone" : "")), x(new v(null, null, 3, g), h, "easeInOut"); w.linear = l.easing.Linear.easeIn, w.swing = l.easing.Quad.easeInOut; var y = t("events.EventDispatcher", function (a) { this._listeners = {}, this._eventTarget = a || this }); h = y.prototype, h.addEventListener = function (a, b, c, d, e) { e = e || 0; var f, g, h = this._listeners[a], k = 0; for (this !== i || j || i.wake(), null == h && (this._listeners[a] = h = []), g = h.length; --g > -1;)f = h[g], f.c === b && f.s === c ? h.splice(g, 1) : 0 === k && f.pr < e && (k = g + 1); h.splice(k, 0, { c: b, s: c, up: d, pr: e }) }, h.removeEventListener = function (a, b) { var c, d = this._listeners[a]; if (d) for (c = d.length; --c > -1;)if (d[c].c === b) return void d.splice(c, 1) }, h.dispatchEvent = function (a) { var b, c, d, e = this._listeners[a]; if (e) for (b = e.length, b > 1 && (e = e.slice(0)), c = this._eventTarget; --b > -1;)d = e[b], d && (d.up ? d.c.call(d.s || c, { type: a, target: c }) : d.c.call(d.s || c)) }; var z = a.requestAnimationFrame, A = a.cancelAnimationFrame, B = Date.now || function () { return (new Date).getTime() }, C = B(); for (f = ["ms", "moz", "webkit", "o"], g = f.length; --g > -1 && !z;)z = a[f[g] + "RequestAnimationFrame"], A = a[f[g] + "CancelAnimationFrame"] || a[f[g] + "CancelRequestAnimationFrame"]; t("Ticker", function (a, b) { var c, e, f, g, h, k = this, l = B(), n = b !== !1 && z ? "auto" : !1, p = 500, q = 33, r = "tick", s = function (a) { var b, d, i = B() - C; i > p && (l += i - q), C += i, k.time = (C - l) / 1e3, b = k.time - h, (!c || b > 0 || a === !0) && (k.frame++ , h += b + (b >= g ? .004 : g - b), d = !0), a !== !0 && (f = e(s)), d && k.dispatchEvent(r) }; y.call(k), k.time = k.frame = 0, k.tick = function () { s(!0) }, k.lagSmoothing = function (a, b) { p = a || 1 / m, q = Math.min(b, p, 0) }, k.sleep = function () { null != f && (n && A ? A(f) : clearTimeout(f), e = o, f = null, k === i && (j = !1)) }, k.wake = function (a) { null !== f ? k.sleep() : a ? l += -C + (C = B()) : k.frame > 10 && (C = B() - p + 5), e = 0 === c ? o : n && z ? z : function (a) { return setTimeout(a, 1e3 * (h - k.time) + 1 | 0) }, k === i && (j = !0), s(2) }, k.fps = function (a) { return arguments.length ? (c = a, g = 1 / (c || 60), h = this.time + g, void k.wake()) : c }, k.useRAF = function (a) { return arguments.length ? (k.sleep(), n = a, void k.fps(c)) : n }, k.fps(a), setTimeout(function () { "auto" === n && k.frame < 5 && "hidden" !== d.visibilityState && k.useRAF(!1) }, 1500) }), h = l.Ticker.prototype = new l.events.EventDispatcher, h.constructor = l.Ticker; var D = t("core.Animation", function (a, b) { if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed === !0, W) { j || i.wake(); var c = this.vars.useFrames ? V : W; c.add(this, c._time), this.vars.paused && this.paused(!0) } }); i = D.ticker = new l.Ticker, h = D.prototype, h._dirty = h._gc = h._initted = h._paused = !1, h._totalTime = h._time = 0, h._rawPrevTime = -1, h._next = h._last = h._onUpdate = h._timeline = h.timeline = null, h._paused = !1; var E = function () { j && B() - C > 2e3 && i.wake(), setTimeout(E, 2e3) }; E(), h.play = function (a, b) { return null != a && this.seek(a, b), this.reversed(!1).paused(!1) }, h.pause = function (a, b) { return null != a && this.seek(a, b), this.paused(!0) }, h.resume = function (a, b) { return null != a && this.seek(a, b), this.paused(!1) }, h.seek = function (a, b) { return this.totalTime(Number(a), b !== !1) }, h.restart = function (a, b) { return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0) }, h.reverse = function (a, b) { return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1) }, h.render = function (a, b, c) { }, h.invalidate = function () { return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this }, h.isActive = function () { var a, b = this._timeline, c = this._startTime; return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime(!0)) >= c && a < c + this.totalDuration() / this._timeScale }, h._enabled = function (a, b) { return j || i.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1 }, h._kill = function (a, b) { return this._enabled(!1, !1) }, h.kill = function (a, b) { return this._kill(a, b), this }, h._uncache = function (a) { for (var b = a ? this : this.timeline; b;)b._dirty = !0, b = b.timeline; return this }, h._swapSelfInParams = function (a) { for (var b = a.length, c = a.concat(); --b > -1;)"{self}" === a[b] && (c[b] = this); return c }, h._callback = function (a) { var b = this.vars, c = b[a], d = b[a + "Params"], e = b[a + "Scope"] || b.callbackScope || this, f = d ? d.length : 0; switch (f) { case 0: c.call(e); break; case 1: c.call(e, d[0]); break; case 2: c.call(e, d[0], d[1]); break; default: c.apply(e, d) } }, h.eventCallback = function (a, b, c, d) { if ("on" === (a || "").substr(0, 2)) { var e = this.vars; if (1 === arguments.length) return e[a]; null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = p(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d), "onUpdate" === a && (this._onUpdate = b) } return this }, h.delay = function (a) { return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay }, h.duration = function (a) { return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration) }, h.totalDuration = function (a) { return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration }, h.time = function (a, b) { return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time }, h.totalTime = function (a, b, c) { if (j || i.wake(), !arguments.length) return this._totalTime; if (this._timeline) { if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) { this._dirty && this.totalDuration(); var d = this._totalDuration, e = this._timeline; if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline) for (; e._timeline;)e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline } this._gc && this._enabled(!0, !1), (this._totalTime !== a || 0 === this._duration) && (J.length && Y(), this.render(a, b, !1), J.length && Y()) } return this }, h.progress = h.totalProgress = function (a, b) { var c = this.duration(); return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio }, h.startTime = function (a) { return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime }, h.endTime = function (a) { return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale }, h.timeScale = function (a) { if (!arguments.length) return this._timeScale; if (a = a || m, this._timeline && this._timeline.smoothChildTiming) { var b = this._pauseTime, c = b || 0 === b ? b : this._timeline.totalTime(); this._startTime = c - (c - this._startTime) * this._timeScale / a } return this._timeScale = a, this._uncache(!1) }, h.reversed = function (a) { return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed }, h.paused = function (a) { if (!arguments.length) return this._paused; var b, c, d = this._timeline; return a != this._paused && d && (j || a || i.wake(), b = d.rawTime(), c = b - this._pauseTime, !a && d.smoothChildTiming && (this._startTime += c, this._uncache(!1)), this._pauseTime = a ? b : null, this._paused = a, this._active = this.isActive(), !a && 0 !== c && this._initted && this.duration() && (b = d.smoothChildTiming ? this._totalTime : (b - this._startTime) / this._timeScale, this.render(b, b === this._totalTime, !0))), this._gc && !a && this._enabled(!0, !1), this }; var F = t("core.SimpleTimeline", function (a) { D.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0 }); h = F.prototype = new D, h.constructor = F, h.kill()._gc = !1, h._first = h._last = h._recent = null, h._sortChildren = !1, h.add = h.insert = function (a, b, c, d) { var e, f; if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), e = this._last, this._sortChildren) for (f = a._startTime; e && e._startTime > f;)e = e._prev; return e ? (a._next = e._next, e._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = e, this._recent = a, this._timeline && this._uncache(!0), this }, h._remove = function (a, b) { return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this }, h.render = function (a, b, c) { var d, e = this._first; for (this._totalTime = this._time = this._rawPrevTime = a; e;)d = e._next, (e._active || a >= e._startTime && !e._paused) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)), e = d }, h.rawTime = function () { return j || i.wake(), this._totalTime }; var G = t("TweenLite", function (b, c, d) { if (D.call(this, c, d), this.render = G.prototype.render, null == b) throw "Cannot tween a null target."; this.target = b = "string" != typeof b ? b : G.selector(b) || b; var e, f, g, h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType), i = this.vars.overwrite; if (this._overwrite = i = null == i ? U[G.defaultOverwrite] : "number" == typeof i ? i >> 0 : U[i], (h || b instanceof Array || b.push && p(b)) && "number" != typeof b[0]) for (this._targets = g = n(b), this._propLookup = [], this._siblings = [], e = 0; e < g.length; e++)f = g[e], f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(n(f))) : (this._siblings[e] = Z(f, this, !1), 1 === i && this._siblings[e].length > 1 && _(f, this, null, 1, this._siblings[e])) : (f = g[e--] = G.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1); else this._propLookup = {}, this._siblings = Z(b, this, !1), 1 === i && this._siblings.length > 1 && _(b, this, null, 1, this._siblings); (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -m, this.render(Math.min(0, -this._delay))) }, !0), H = function (b) { return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType) }, I = function (a, b) { var c, d = {}; for (c in a) T[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!Q[c] || Q[c] && Q[c]._autoCSS) || (d[c] = a[c], delete a[c]); a.css = d }; h = G.prototype = new D, h.constructor = G, h.kill()._gc = !1, h.ratio = 0, h._firstPT = h._targets = h._overwrittenProps = h._startAt = null, h._notifyPluginsOfEnabled = h._lazy = !1, G.version = "1.19.1", G.defaultEase = h._ease = new v(null, null, 1, 1), G.defaultOverwrite = "auto", G.ticker = i, G.autoSleep = 120, G.lagSmoothing = function (a, b) { i.lagSmoothing(a, b) }, G.selector = a.$ || a.jQuery || function (b) { var c = a.$ || a.jQuery; return c ? (G.selector = c, c(b)) : "undefined" == typeof d ? b : d.querySelectorAll ? d.querySelectorAll(b) : d.getElementById("#" === b.charAt(0) ? b.substr(1) : b) }; var J = [], K = {}, L = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, M = function (a) { for (var b, c = this._firstPT, d = 1e-6; c;)b = c.blob ? 1 === a ? this.end : a ? this.join("") : this.start : c.c * a + c.s, c.m ? b = c.m(b, this._target || c.t) : d > b && b > -d && !c.blob && (b = 0), c.f ? c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b) : c.t[c.p] = b, c = c._next }, N = function (a, b, c, d) { var e, f, g, h, i, j, k, l = [], m = 0, n = "", o = 0; for (l.start = a, l.end = b, a = l[0] = a + "", b = l[1] = b + "", c && (c(l), a = l[0], b = l[1]), l.length = 0, e = a.match(L) || [], f = b.match(L) || [], d && (d._next = null, d.blob = 1, l._firstPT = l._applyPT = d), i = f.length, h = 0; i > h; h++)k = f[h], j = b.substr(m, b.indexOf(k, m) - m), n += j || !h ? j : ",", m += j.length, o ? o = (o + 1) % 5 : "rgba(" === j.substr(-5) && (o = 1), k === e[h] || e.length <= h ? n += k : (n && (l.push(n), n = ""), g = parseFloat(e[h]), l.push(g), l._firstPT = { _next: l._firstPT, t: l, p: l.length - 1, s: g, c: ("=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * parseFloat(k.substr(2)) : parseFloat(k) - g) || 0, f: 0, m: o && 4 > o ? Math.round : 0 }), m += k.length; return n += b.substr(m), n && l.push(n), l.setRatio = M, l }, O = function (a, b, c, d, e, f, g, h, i) { "function" == typeof d && (d = d(i || 0, a)); var j, k = typeof a[b], l = "function" !== k ? "" : b.indexOf("set") || "function" != typeof a["get" + b.substr(3)] ? b : "get" + b.substr(3), m = "get" !== c ? c : l ? g ? a[l](g) : a[l]() : a[b], n = "string" == typeof d && "=" === d.charAt(1), o = { t: a, p: b, s: m, f: "function" === k, pg: 0, n: e || b, m: f ? "function" == typeof f ? f : Math.round : 0, pr: 0, c: n ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - m || 0 }; return ("number" != typeof m || "number" != typeof d && !n) && (g || isNaN(m) || !n && isNaN(d) || "boolean" == typeof m || "boolean" == typeof d ? (o.fp = g, j = N(m, n ? o.s + o.c : d, h || G.defaultStringFilter, o), o = { t: j, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: e || b, pr: 0, m: 0 }) : (o.s = parseFloat(m), n || (o.c = parseFloat(d) - o.s || 0))), o.c ? ((o._next = this._firstPT) && (o._next._prev = o), this._firstPT = o, o) : void 0 }, P = G._internals = { isArray: p, isSelector: H, lazyTweens: J, blobDif: N }, Q = G._plugins = {}, R = P.tweenLookup = {}, S = 0, T = P.reservedProps = { ease: 1, delay: 1, overwrite: 1, onComplete: 1, onCompleteParams: 1, onCompleteScope: 1, useFrames: 1, runBackwards: 1, startAt: 1, onUpdate: 1, onUpdateParams: 1, onUpdateScope: 1, onStart: 1, onStartParams: 1, onStartScope: 1, onReverseComplete: 1, onReverseCompleteParams: 1, onReverseCompleteScope: 1, onRepeat: 1, onRepeatParams: 1, onRepeatScope: 1, easeParams: 1, yoyo: 1, immediateRender: 1, repeat: 1, repeatDelay: 1, data: 1, paused: 1, reversed: 1, autoCSS: 1, lazy: 1, onOverwrite: 1, callbackScope: 1, stringFilter: 1, id: 1 }, U = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, "true": 1, "false": 0 }, V = D._rootFramesTimeline = new F, W = D._rootTimeline = new F, X = 30, Y = P.lazyRender = function () { var a, b = J.length; for (K = {}; --b > -1;)a = J[b], a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), a._lazy = !1); J.length = 0 }; W._startTime = i.time, V._startTime = i.frame, W._active = V._active = !0, setTimeout(Y, 1), D._updateRoot = G.render = function () { var a, b, c; if (J.length && Y(), W.render((i.time - W._startTime) * W._timeScale, !1, !1), V.render((i.frame - V._startTime) * V._timeScale, !1, !1), J.length && Y(), i.frame >= X) { X = i.frame + (parseInt(G.autoSleep, 10) || 120); for (c in R) { for (b = R[c].tweens, a = b.length; --a > -1;)b[a]._gc && b.splice(a, 1); 0 === b.length && delete R[c] } if (c = W._first, (!c || c._paused) && G.autoSleep && !V._first && 1 === i._listeners.tick.length) { for (; c && c._paused;)c = c._next; c || i.sleep() } } }, i.addEventListener("tick", D._updateRoot); var Z = function (a, b, c) { var d, e, f = a._gsTweenID; if (R[f || (a._gsTweenID = f = "t" + S++)] || (R[f] = { target: a, tweens: [] }), b && (d = R[f].tweens, d[e = d.length] = b, c)) for (; --e > -1;)d[e] === b && d.splice(e, 1); return R[f].tweens }, $ = function (a, b, c, d) { var e, f, g = a.vars.onOverwrite; return g && (e = g(a, b, c, d)), g = G.onOverwrite, g && (f = g(a, b, c, d)), e !== !1 && f !== !1 }, _ = function (a, b, c, d, e) { var f, g, h, i; if (1 === d || d >= 4) { for (i = e.length, f = 0; i > f; f++)if ((h = e[f]) !== b) h._gc || h._kill(null, a, b) && (g = !0); else if (5 === d) break; return g } var j, k = b._startTime + m, l = [], n = 0, o = 0 === b._duration; for (f = e.length; --f > -1;)(h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (j = j || aa(b, 0, o), 0 === aa(h, j, o) && (l[n++] = h)) : h._startTime <= k && h._startTime + h.totalDuration() / h._timeScale > k && ((o || !h._initted) && k - h._startTime <= 2e-10 || (l[n++] = h))); for (f = n; --f > -1;)if (h = l[f], 2 === d && h._kill(c, a, b) && (g = !0), 2 !== d || !h._firstPT && h._initted) { if (2 !== d && !$(h, b)) continue; h._enabled(!1, !1) && (g = !0) } return g }, aa = function (a, b, c) { for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) { if (f += d._startTime, e *= d._timeScale, d._paused) return -100; d = d._timeline } return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * m > f - b ? m : (f += a.totalDuration() / a._timeScale / e) > b + m ? 0 : f - b - m }; h._init = function () { var a, b, c, d, e, f, g = this.vars, h = this._overwrittenProps, i = this._duration, j = !!g.immediateRender, k = g.ease; if (g.startAt) { this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), e = {}; for (d in g.startAt) e[d] = g.startAt[d]; if (e.overwrite = !1, e.immediateRender = !0, e.lazy = j && g.lazy !== !1, e.startAt = e.delay = null, this._startAt = G.to(this.target, 0, e), j) if (this._time > 0) this._startAt = null; else if (0 !== i) return } else if (g.runBackwards && 0 !== i) if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null; else { 0 !== this._time && (j = !1), c = {}; for (d in g) T[d] && "autoCSS" !== d || (c[d] = g[d]); if (c.overwrite = 0, c.data = "isFromStart", c.lazy = j && g.lazy !== !1, c.immediateRender = j, this._startAt = G.to(this.target, 0, c), j) { if (0 === this._time) return } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null) } if (this._ease = k = k ? k instanceof v ? k : "function" == typeof k ? new v(k, g.easeParams) : w[k] || G.defaultEase : G.defaultEase, g.easeParams instanceof Array && k.config && (this._ease = k.config.apply(k, g.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (f = this._targets.length, a = 0; f > a; a++)this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], h ? h[a] : null, a) && (b = !0); else b = this._initProps(this.target, this._propLookup, this._siblings, h, 0); if (b && G._onPluginEvent("_onInitAllProps", this), h && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), g.runBackwards) for (c = this._firstPT; c;)c.s += c.c, c.c = -c.c, c = c._next; this._onUpdate = g.onUpdate, this._initted = !0 }, h._initProps = function (b, c, d, e, f) { var g, h, i, j, k, l; if (null == b) return !1; K[b._gsTweenID] && Y(), this.vars.css || b.style && b !== a && b.nodeType && Q.css && this.vars.autoCSS !== !1 && I(this.vars, b); for (g in this.vars) if (l = this.vars[g], T[g]) l && (l instanceof Array || l.push && p(l)) && -1 !== l.join("").indexOf("{self}") && (this.vars[g] = l = this._swapSelfInParams(l, this)); else if (Q[g] && (j = new Q[g])._onInitTween(b, this.vars[g], this, f)) { for (this._firstPT = k = { _next: this._firstPT, t: j, p: "setRatio", s: 0, c: 1, f: 1, n: g, pg: 1, pr: j._priority, m: 0 }, h = j._overwriteProps.length; --h > -1;)c[j._overwriteProps[h]] = this._firstPT; (j._priority || j._onInitAllProps) && (i = !0), (j._onDisable || j._onEnable) && (this._notifyPluginsOfEnabled = !0), k._next && (k._next._prev = k) } else c[g] = O.call(this, b, g, "get", l, g, 0, null, this.vars.stringFilter, f); return e && this._kill(e, b) ? this._initProps(b, c, d, e, f) : this._overwrite > 1 && this._firstPT && d.length > 1 && _(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e, f)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (K[b._gsTweenID] = !0), i) }, h.render = function (a, b, c) { var d, e, f, g, h = this._time, i = this._duration, j = this._rawPrevTime; if (a >= i - 1e-7 && a >= 0) this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === i && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 > j || 0 >= a && a >= -1e-7 || j === m && "isPause" !== this.data) && j !== a && (c = !0, j > m && (e = "onReverseComplete")), this._rawPrevTime = g = !b || a || j === a ? a : m); else if (1e-7 > a) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== h || 0 === i && j > 0) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === i && (this._initted || !this.vars.lazy || c) && (j >= 0 && (j !== m || "isPause" !== this.data) && (c = !0), this._rawPrevTime = g = !b || a || j === a ? a : m)), this._initted || (c = !0); else if (this._totalTime = this._time = a, this._easeType) { var k = a / i, l = this._easeType, n = this._easePower; (1 === l || 3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2), 1 === n ? k *= k : 2 === n ? k *= k * k : 3 === n ? k *= k * k * k : 4 === n && (k *= k * k * k * k), 1 === l ? this.ratio = 1 - k : 2 === l ? this.ratio = k : .5 > a / i ? this.ratio = k / 2 : this.ratio = 1 - k / 2 } else this.ratio = this._ease.getRatio(a / i); if (this._time !== h || c) { if (!this._initted) { if (this._init(), !this._initted || this._gc) return; if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = h, this._rawPrevTime = j, J.push(this), void (this._lazy = [a, b]); this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) } for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== h && a >= 0 && (this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === i) && (b || this._callback("onStart"))), f = this._firstPT; f;)f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next; this._onUpdate && (0 > a && this._startAt && a !== -1e-4 && this._startAt.render(a, b, c), b || (this._time !== h || d || c) && this._callback("onUpdate")), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && a !== -1e-4 && this._startAt.render(a, b, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === i && this._rawPrevTime === m && g !== m && (this._rawPrevTime = 0)) } }, h._kill = function (a, b, c) { if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._lazy = !1, this._enabled(!1, !1); b = "string" != typeof b ? b || this._targets || this.target : G.selector(b) || b; var d, e, f, g, h, i, j, k, l, m = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline; if ((p(b) || H(b)) && "number" != typeof b[0]) for (d = b.length; --d > -1;)this._kill(a, b[d], c) && (i = !0); else { if (this._targets) { for (d = this._targets.length; --d > -1;)if (b === this._targets[d]) { h = this._propLookup[d] || {}, this._overwrittenProps = this._overwrittenProps || [], e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : "all"; break } } else { if (b !== this.target) return !1; h = this._propLookup, e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all" } if (h) { if (j = a || h, k = a !== e && "all" !== e && a !== h && ("object" != typeof a || !a._tempKill), c && (G.onOverwrite || this.vars.onOverwrite)) { for (f in j) h[f] && (l || (l = []), l.push(f)); if ((l || !a) && !$(this, c, b, l)) return !1 } for (f in j) (g = h[f]) && (m && (g.f ? g.t[g.p](g.s) : g.t[g.p] = g.s, i = !0), g.pg && g.t._kill(j) && (i = !0), g.pg && 0 !== g.t._overwriteProps.length || (g._prev ? g._prev._next = g._next : g === this._firstPT && (this._firstPT = g._next), g._next && (g._next._prev = g._prev), g._next = g._prev = null), delete h[f]), k && (e[f] = 1); !this._firstPT && this._initted && this._enabled(!1, !1) } } return i }, h.invalidate = function () { return this._notifyPluginsOfEnabled && G._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], D.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -m, this.render(Math.min(0, -this._delay))), this }, h._enabled = function (a, b) { if (j || i.wake(), a && this._gc) { var c, d = this._targets; if (d) for (c = d.length; --c > -1;)this._siblings[c] = Z(d[c], this, !0); else this._siblings = Z(this.target, this, !0) } return D.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled && this._firstPT ? G._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1 }, G.to = function (a, b, c) { return new G(a, b, c) }, G.from = function (a, b, c) { return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new G(a, b, c) }, G.fromTo = function (a, b, c, d) { return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new G(a, b, d) }, G.delayedCall = function (a, b, c, d, e) { return new G(b, 0, { delay: a, onComplete: b, onCompleteParams: c, callbackScope: d, onReverseComplete: b, onReverseCompleteParams: c, immediateRender: !1, lazy: !1, useFrames: e, overwrite: 0 }) }, G.set = function (a, b) { return new G(a, 0, b) }, G.getTweensOf = function (a, b) { if (null == a) return []; a = "string" != typeof a ? a : G.selector(a) || a; var c, d, e, f; if ((p(a) || H(a)) && "number" != typeof a[0]) { for (c = a.length, d = []; --c > -1;)d = d.concat(G.getTweensOf(a[c], b)); for (c = d.length; --c > -1;)for (f = d[c], e = c; --e > -1;)f === d[e] && d.splice(c, 1) } else for (d = Z(a).concat(), c = d.length; --c > -1;)(d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1); return d }, G.killTweensOf = G.killDelayedCallsTo = function (a, b, c) { "object" == typeof b && (c = b, b = !1); for (var d = G.getTweensOf(a, b), e = d.length; --e > -1;)d[e]._kill(c, a) }; var ba = t("plugins.TweenPlugin", function (a, b) { this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = ba.prototype }, !0); if (h = ba.prototype, ba.version = "1.19.0", ba.API = 2, h._firstPT = null, h._addTween = O, h.setRatio = M, h._kill = function (a) { var b, c = this._overwriteProps, d = this._firstPT; if (null != a[this._propName]) this._overwriteProps = []; else for (b = c.length; --b > -1;)null != a[c[b]] && c.splice(b, 1); for (; d;)null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)), d = d._next; return !1 }, h._mod = h._roundProps = function (a) { for (var b, c = this._firstPT; c;)b = a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")], b && "function" == typeof b && (2 === c.f ? c.t._applyPT.m = b : c.m = b), c = c._next }, G._onPluginEvent = function (a, b) { var c, d, e, f, g, h = b._firstPT; if ("_onInitAllProps" === a) { for (; h;) { for (g = h._next, d = e; d && d.pr > h.pr;)d = d._next; (h._prev = d ? d._prev : f) ? h._prev._next = h : e = h, (h._next = d) ? d._prev = h : f = h, h = g } h = b._firstPT = e } for (; h;)h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0), h = h._next; return c }, ba.activate = function (a) { for (var b = a.length; --b > -1;)a[b].API === ba.API && (Q[(new a[b])._propName] = a[b]); return !0 }, s.plugin = function (a) { if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition."; var b, c = a.propName, d = a.priority || 0, e = a.overwriteProps, f = { init: "_onInitTween", set: "setRatio", kill: "_kill", round: "_mod", mod: "_mod", initAll: "_onInitAllProps" }, g = t("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function () { ba.call(this, c, d), this._overwriteProps = e || [] }, a.global === !0), h = g.prototype = new ba(c); h.constructor = g, g.API = a.API; for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]); return g.version = a.version, ba.activate([g]), g }, f = a._gsQueue) { for (g = 0; g < f.length; g++)f[g](); for (h in q) q[h].func || a.console.log("GSAP encountered missing dependency: " + h) } j = !1 } }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite");
/* TIME LINE LITE */
/*!
 * VERSION: 1.17.0
 * DATE: 2015-05-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window; (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () { "use strict"; _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) { var s = function (t) { e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate; var i, s, r = this.vars; for (s in r) i = r[s], h(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i)); h(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger) }, r = 1e-10, n = i._internals, a = s._internals = {}, o = n.isSelector, h = n.isArray, l = n.lazyTweens, _ = n.lazyRender, u = [], f = _gsScope._gsDefine.globals, c = function (t) { var e, i = {}; for (e in t) i[e] = t[e]; return i }, p = a.pauseCallback = function (t, e, i, s) { var n, a = t._timeline, o = a._totalTime, h = t._startTime, l = 0 > t._rawPrevTime || 0 === t._rawPrevTime && a._reversed, _ = l ? 0 : r, f = l ? r : 0; if (e || !this._forcingPlayhead) { for (a.pause(h), n = t._prev; n && n._startTime === h;)n._rawPrevTime = f, n = n._prev; for (n = t._next; n && n._startTime === h;)n._rawPrevTime = _, n = n._next; e && e.apply(s || a.vars.callbackScope || a, i || u), (this._forcingPlayhead || !a._paused) && a.seek(o) } }, m = function (t) { var e, i = [], s = t.length; for (e = 0; e !== s; i.push(t[e++])); return i }, d = s.prototype = new e; return s.version = "1.17.0", d.constructor = s, d.kill()._gc = d._forcingPlayhead = !1, d.to = function (t, e, s, r) { var n = s.repeat && f.TweenMax || i; return e ? this.add(new n(t, e, s), r) : this.set(t, s, r) }, d.from = function (t, e, s, r) { return this.add((s.repeat && f.TweenMax || i).from(t, e, s), r) }, d.fromTo = function (t, e, s, r, n) { var a = r.repeat && f.TweenMax || i; return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n) }, d.staggerTo = function (t, e, r, n, a, h, l, _) { var u, f = new s({ onComplete: h, onCompleteParams: l, callbackScope: _, smoothChildTiming: this.smoothChildTiming }); for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], o(t) && (t = m(t)), n = n || 0, 0 > n && (t = m(t), t.reverse(), n *= -1), u = 0; t.length > u; u++)r.startAt && (r.startAt = c(r.startAt)), f.to(t[u], e, c(r), u * n); return this.add(f, a) }, d.staggerFrom = function (t, e, i, s, r, n, a, o) { return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o) }, d.staggerFromTo = function (t, e, i, s, r, n, a, o, h) { return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, h) }, d.call = function (t, e, s, r) { return this.add(i.delayedCall(0, t, e, s), r) }, d.set = function (t, e, s) { return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s) }, s.exportRoot = function (t, e) { t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0); var r, n, a = new s(t), o = a._timeline; for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;)n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n; return o.add(a, 0), a }, d.add = function (r, n, a, o) { var l, _, u, f, c, p; if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) { if (r instanceof Array || r && r.push && h(r)) { for (a = a || "normal", o = o || 0, l = n, _ = r.length, u = 0; _ > u; u++)h(f = r[u]) && (f = new s({ tweens: f })), this.add(f, l), "string" != typeof f && "function" != typeof f && ("sequence" === a ? l = f._startTime + f.totalDuration() / f._timeScale : "start" === a && (f._startTime -= f.delay())), l += o; return this._uncache(!0) } if ("string" == typeof r) return this.addLabel(r, n); if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string."; r = i.delayedCall(0, r) } if (e.prototype.add.call(this, r, n), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (c = this, p = c.rawTime() > r._startTime; c._timeline;)p && c._timeline.smoothChildTiming ? c.totalTime(c._totalTime, !0) : c._gc && c._enabled(!0, !1), c = c._timeline; return this }, d.remove = function (e) { if (e instanceof t) return this._remove(e, !1); if (e instanceof Array || e && e.push && h(e)) { for (var i = e.length; --i > -1;)this.remove(e[i]); return this } return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e) }, d._remove = function (t, i) { e.prototype._remove.call(this, t, i); var s = this._last; return s ? this._time > s._startTime + s._totalDuration / s._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this }, d.append = function (t, e) { return this.add(t, this._parseTimeOrLabel(null, e, !0, t)) }, d.insert = d.insertMultiple = function (t, e, i, s) { return this.add(t, e || 0, i, s) }, d.appendMultiple = function (t, e, i, s) { return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s) }, d.addLabel = function (t, e) { return this._labels[t] = this._parseTimeOrLabel(e), this }, d.addPause = function (t, e, s, r) { var n = i.delayedCall(0, p, ["{self}", e, s, r], this); return n.data = "isPause", this.add(n, t) }, d.removeLabel = function (t) { return delete this._labels[t], this }, d.getLabelTime = function (t) { return null != this._labels[t] ? this._labels[t] : -1 }, d._parseTimeOrLabel = function (e, i, s, r) { var n; if (r instanceof t && r.timeline === this) this.remove(r); else if (r && (r instanceof Array || r.push && h(r))) for (n = r.length; --n > -1;)r[n] instanceof t && r[n].timeline === this && this.remove(r[n]); if ("string" == typeof i) return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s); if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration()); else { if (n = e.indexOf("="), -1 === n) return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i; i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration() } return Number(e) + i }, d.seek = function (t, e) { return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1) }, d.stop = function () { return this.paused(!0) }, d.gotoAndPlay = function (t, e) { return this.play(t, e) }, d.gotoAndStop = function (t, e) { return this.pause(t, e) }, d.render = function (t, e, i) { this._gc && this._enabled(!0, !1); var s, n, a, o, h, u = this._dirty ? this.totalDuration() : this._totalDuration, f = this._time, c = this._startTime, p = this._timeScale, m = this._paused; if (t >= u) this._totalTime = this._time = u, this._reversed || this._hasPausedChild() || (n = !0, o = "onComplete", h = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (h = !0, this._rawPrevTime > r && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = u + 1e-4; else if (1e-7 > t) if (this._totalTime = this._time = 0, (0 !== f || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete", n = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (h = n = !0, o = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (h = !0), this._rawPrevTime = t; else { if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, 0 === t && n) for (s = this._first; s && 0 === s._startTime;)s._duration || (n = !1), s = s._next; t = 0, this._initted || (h = !0) } else this._totalTime = this._time = this._rawPrevTime = t; if (this._time !== f && this._first || i || h) { if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== f && t > 0 && (this._active = !0), 0 === f && this.vars.onStart && 0 !== this._time && (e || this._callback("onStart")), this._time >= f) for (s = this._first; s && (a = s._next, !this._paused || m);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a; else for (s = this._last; s && (a = s._prev, !this._paused || m);)(s._active || f >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a; this._onUpdate && (e || (l.length && _(), this._callback("onUpdate"))), o && (this._gc || (c === this._startTime || p !== this._timeScale) && (0 === this._time || u >= this.totalDuration()) && (n && (l.length && _(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this._callback(o))) } }, d._hasPausedChild = function () { for (var t = this._first; t;) { if (t._paused || t instanceof s && t._hasPausedChild()) return !0; t = t._next } return !1 }, d.getChildren = function (t, e, s, r) { r = r || -9999999999; for (var n = [], a = this._first, o = 0; a;)r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next; return n }, d.getTweensOf = function (t, e) { var s, r, n = this._gc, a = [], o = 0; for (n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length; --r > -1;)(s[r].timeline === this || e && this._contains(s[r])) && (a[o++] = s[r]); return n && this._enabled(!1, !0), a }, d.recent = function () { return this._recent }, d._contains = function (t) { for (var e = t.timeline; e;) { if (e === this) return !0; e = e.timeline } return !1 }, d.shiftChildren = function (t, e, i) { i = i || 0; for (var s, r = this._first, n = this._labels; r;)r._startTime >= i && (r._startTime += t), r = r._next; if (e) for (s in n) n[s] >= i && (n[s] += t); return this._uncache(!0) }, d._kill = function (t, e) { if (!t && !e) return this._enabled(!1, !1); for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;)i[s]._kill(t, e) && (r = !0); return r }, d.clear = function (t) { var e = this.getChildren(!1, !0, !0), i = e.length; for (this._time = this._totalTime = 0; --i > -1;)e[i]._enabled(!1, !1); return t !== !1 && (this._labels = {}), this._uncache(!0) }, d.invalidate = function () { for (var e = this._first; e;)e.invalidate(), e = e._next; return t.prototype.invalidate.call(this) }, d._enabled = function (t, i) { if (t === this._gc) for (var s = this._first; s;)s._enabled(t, !0), s = s._next; return e.prototype._enabled.call(this, t, i) }, d.totalTime = function () { this._forcingPlayhead = !0; var e = t.prototype.totalTime.apply(this, arguments); return this._forcingPlayhead = !1, e }, d.duration = function (t) { return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration) }, d.totalDuration = function (t) { if (!arguments.length) { if (this._dirty) { for (var e, i, s = 0, r = this._last, n = 999999999999; r;)e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, 0 > r._startTime && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), i = r._startTime + r._totalDuration / r._timeScale, i > s && (s = i), r = e; this._duration = this._totalDuration = s, this._dirty = !1 } return this._totalDuration } return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this }, d.paused = function (e) { if (!e) for (var i = this._first, s = this._time; i;)i._startTime === s && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next; return t.prototype.paused.apply(this, arguments) }, d.usesFrames = function () { for (var e = this._timeline; e._timeline;)e = e._timeline; return e === t._rootFramesTimeline }, d.rawTime = function () { return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale }, s }, !0) }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (t) { "use strict"; var e = function () { return (_gsScope.GreenSockGlobals || _gsScope)[t] }; "function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("./TweenLite.js"), module.exports = e()) }("TimelineLite");

/* EASING PLUGIN*/
/*!
 * VERSION: 1.15.5
 * DATE: 2016-07-08
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window; (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () { "use strict"; _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (a) { var b, c, d, e = _gsScope.GreenSockGlobals || _gsScope, f = e.com.greensock, g = 2 * Math.PI, h = Math.PI / 2, i = f._class, j = function (b, c) { var d = i("easing." + b, function () { }, !0), e = d.prototype = new a; return e.constructor = d, e.getRatio = c, d }, k = a.register || function () { }, l = function (a, b, c, d, e) { var f = i("easing." + a, { easeOut: new b, easeIn: new c, easeInOut: new d }, !0); return k(f, a), f }, m = function (a, b, c) { this.t = a, this.v = b, c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap = c.t - a) }, n = function (b, c) { var d = i("easing." + b, function (a) { this._p1 = a || 0 === a ? a : 1.70158, this._p2 = 1.525 * this._p1 }, !0), e = d.prototype = new a; return e.constructor = d, e.getRatio = c, e.config = function (a) { return new d(a) }, d }, o = l("Back", n("BackOut", function (a) { return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1 }), n("BackIn", function (a) { return a * a * ((this._p1 + 1) * a - this._p1) }), n("BackInOut", function (a) { return (a *= 2) < 1 ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2) })), p = i("easing.SlowMo", function (a, b, c) { b = b || 0 === b ? b : .7, null == a ? a = .7 : a > 1 && (a = 1), this._p = 1 !== a ? b : 0, this._p1 = (1 - a) / 2, this._p2 = a, this._p3 = this._p1 + this._p2, this._calcEnd = c === !0 }, !0), q = p.prototype = new a; return q.constructor = p, q.getRatio = function (a) { var b = a + (.5 - a) * this._p; return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b }, p.ease = new p(.7, .7), q.config = p.config = function (a, b, c) { return new p(a, b, c) }, b = i("easing.SteppedEase", function (a) { a = a || 1, this._p1 = 1 / a, this._p2 = a + 1 }, !0), q = b.prototype = new a, q.constructor = b, q.getRatio = function (a) { return 0 > a ? a = 0 : a >= 1 && (a = .999999999), (this._p2 * a >> 0) * this._p1 }, q.config = b.config = function (a) { return new b(a) }, c = i("easing.RoughEase", function (b) { b = b || {}; for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), n = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --n > -1;)c = o ? Math.random() : 1 / l * n, d = q ? q.getRatio(c) : c, "none" === i ? e = r : "out" === i ? (f = 1 - c, e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c, e = f * f * .5 * r) : (f = 2 * (1 - c), e = f * f * .5 * r), o ? d += Math.random() * e - .5 * e : n % 2 ? d += .5 * e : d -= .5 * e, p && (d > 1 ? d = 1 : 0 > d && (d = 0)), j[k++] = { x: c, y: d }; for (j.sort(function (a, b) { return a.x - b.x }), h = new m(1, 1, null), n = l; --n > -1;)g = j[n], h = new m(g.x, g.y, h); this._prev = new m(0, 0, 0 !== h.t ? h : h.next) }, !0), q = c.prototype = new a, q.constructor = c, q.getRatio = function (a) { var b = this._prev; if (a > b.t) { for (; b.next && a >= b.t;)b = b.next; b = b.prev } else for (; b.prev && a <= b.t;)b = b.prev; return this._prev = b, b.v + (a - b.t) / b.gap * b.c }, q.config = function (a) { return new c(a) }, c.ease = new c, l("Bounce", j("BounceOut", function (a) { return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375 }), j("BounceIn", function (a) { return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375) }), j("BounceInOut", function (a) { var b = .5 > a; return a = b ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375, b ? .5 * (1 - a) : .5 * a + .5 })), l("Circ", j("CircOut", function (a) { return Math.sqrt(1 - (a -= 1) * a) }), j("CircIn", function (a) { return -(Math.sqrt(1 - a * a) - 1) }), j("CircInOut", function (a) { return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1) })), d = function (b, c, d) { var e = i("easing." + b, function (a, b) { this._p1 = a >= 1 ? a : 1, this._p2 = (b || d) / (1 > a ? a : 1), this._p3 = this._p2 / g * (Math.asin(1 / this._p1) || 0), this._p2 = g / this._p2 }, !0), f = e.prototype = new a; return f.constructor = e, f.getRatio = c, f.config = function (a, b) { return new e(a, b) }, e }, l("Elastic", d("ElasticOut", function (a) { return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1 }, .3), d("ElasticIn", function (a) { return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) }, .3), d("ElasticInOut", function (a) { return (a *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2) * .5 + 1 }, .45)), l("Expo", j("ExpoOut", function (a) { return 1 - Math.pow(2, -10 * a) }), j("ExpoIn", function (a) { return Math.pow(2, 10 * (a - 1)) - .001 }), j("ExpoInOut", function (a) { return (a *= 2) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1))) })), l("Sine", j("SineOut", function (a) { return Math.sin(a * h) }), j("SineIn", function (a) { return -Math.cos(a * h) + 1 }), j("SineInOut", function (a) { return -.5 * (Math.cos(Math.PI * a) - 1) })), i("easing.EaseLookup", { find: function (b) { return a.map[b] } }, !0), k(e.SlowMo, "SlowMo", "ease,"), k(c, "RoughEase", "ease,"), k(b, "SteppedEase", "ease,"), o }, !0) }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function () { "use strict"; var a = function () { return _gsScope.GreenSockGlobals || _gsScope }; "function" == typeof define && define.amd ? define(["TweenLite"], a) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = a()) }();

/* CSS PLUGIN */
/*!
 * VERSION: 1.19.1
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window; (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict"; _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (a, b) {
        var c, d, e, f, g = function () { a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = g.prototype.setRatio }, h = _gsScope._gsDefine.globals, i = {}, j = g.prototype = new a("css"); j.constructor = g, g.version = "1.19.1", g.API = 2, g.defaultTransformPerspective = 0, g.defaultSkewType = "compensated", g.defaultSmoothOrigin = !0, j = "px", g.suffixMap = { top: j, right: j, bottom: j, left: j, width: j, height: j, fontSize: j, padding: j, margin: j, perspective: j, lineHeight: "" }; var k, l, m, n, o, p, q, r, s = /(?:\-|\.|\b)(\d|\.|e\-)+/g, t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, w = /(?:\d|\-|\+|=|#|\.)*/g, x = /opacity *= *([^)]*)/i, y = /opacity:([^;]*)/i, z = /alpha\(opacity *=.+?\)/i, A = /^(rgb|hsl)/, B = /([A-Z])/g, C = /-([a-z])/gi, D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, E = function (a, b) { return b.toUpperCase() }, F = /(?:Left|Right|Width)/i, G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, I = /,(?=[^\)]*(?:\(|$))/gi, J = /[\s,\(]/i, K = Math.PI / 180, L = 180 / Math.PI, M = {}, N = { style: {} }, O = _gsScope.document || { createElement: function () { return N } }, P = function (a, b) { return O.createElementNS ? O.createElementNS(b || "http://www.w3.org/1999/xhtml", a) : O.createElement(a) }, Q = P("div"), R = P("img"), S = g._internals = { _specialProps: i }, T = (_gsScope.navigator || {}).userAgent || "", U = function () { var a = T.indexOf("Android"), b = P("a"); return m = -1 !== T.indexOf("Safari") && -1 === T.indexOf("Chrome") && (-1 === a || parseFloat(T.substr(a + 8, 2)) > 3), o = m && parseFloat(T.substr(T.indexOf("Version/") + 8, 2)) < 6, n = -1 !== T.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T)) && (p = parseFloat(RegExp.$1)), b ? (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity)) : !1 }(), V = function (a) { return x.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1 }, W = function (a) { _gsScope.console && console.log(a) }, X = "", Y = "", Z = function (a, b) { b = b || Q; var c, d, e = b.style; if (void 0 !== e[a]) return a; for (a = a.charAt(0).toUpperCase() + a.substr(1), c = ["O", "Moz", "ms", "Ms", "Webkit"], d = 5; --d > -1 && void 0 === e[c[d] + a];); return d >= 0 ? (Y = 3 === d ? "ms" : c[d], X = "-" + Y.toLowerCase() + "-", Y + a) : null }, $ = O.defaultView ? O.defaultView.getComputedStyle : function () { }, _ = g.getStyle = function (a, b, c, d, e) { var f; return U || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || $(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(B, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : V(a) }, aa = S.convertToPixels = function (a, c, d, e, f) { if ("px" === e || !e) return d; if ("auto" === e || !d) return 0; var h, i, j, k = F.test(c), l = a, m = Q.style, n = 0 > d, o = 1 === d; if (n && (d = -d), o && (d *= 100), "%" === e && -1 !== c.indexOf("border")) h = d / 100 * (k ? a.clientWidth : a.clientHeight); else { if (m.cssText = "border:0 solid red;position:" + _(a, "position") + ";line-height:0;", "%" !== e && l.appendChild && "v" !== e.charAt(0) && "rem" !== e) m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e; else { if (l = a.parentNode || O.body, i = l._gsCache, j = b.ticker.frame, i && k && i.time === j) return i.width * d / 100; m[k ? "width" : "height"] = d + e } l.appendChild(Q), h = parseFloat(Q[k ? "offsetWidth" : "offsetHeight"]), l.removeChild(Q), k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache = l._gsCache || {}, i.time = j, i.width = h / d * 100), 0 !== h || f || (h = aa(a, c, d, e, !0)) } return o && (h /= 100), n ? -h : h }, ba = S.calculateOffset = function (a, b, c) { if ("absolute" !== _(a, "position", c)) return 0; var d = "left" === b ? "Left" : "Top", e = _(a, "margin" + d, c); return a["offset" + d] - (aa(a, b, parseFloat(e), e.replace(w, "")) || 0) }, ca = function (a, b) { var c, d, e, f = {}; if (b = b || $(a, null)) if (c = b.length) for (; --c > -1;)e = b[c], (-1 === e.indexOf("-transform") || Da === e) && (f[e.replace(C, E)] = b.getPropertyValue(e)); else for (c in b) (-1 === c.indexOf("Transform") || Ca === c) && (f[c] = b[c]); else if (b = a.currentStyle || a.style) for (c in b) "string" == typeof c && void 0 === f[c] && (f[c.replace(C, E)] = b[c]); return U || (f.opacity = V(a)), d = Ra(a, b, !1), f.rotation = d.rotation, f.skewX = d.skewX, f.scaleX = d.scaleX, f.scaleY = d.scaleY, f.x = d.x, f.y = d.y, Fa && (f.z = d.z, f.rotationX = d.rotationX, f.rotationY = d.rotationY, f.scaleZ = d.scaleZ), f.filters && delete f.filters, f }, da = function (a, b, c, d, e) { var f, g, h, i = {}, j = a.style; for (g in c) "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(v, "") ? f : 0 : ba(a, g), void 0 !== j[g] && (h = new sa(j, g, j[g], h))); if (d) for (g in d) "className" !== g && (i[g] = d[g]); return { difs: i, firstMPT: h } }, ea = { width: ["Left", "Right"], height: ["Top", "Bottom"] }, fa = ["marginLeft", "marginRight", "marginTop", "marginBottom"], ga = function (a, b, c) { if ("svg" === (a.nodeName + "").toLowerCase()) return (c || $(a))[b] || 0; if (a.getCTM && Oa(a)) return a.getBBox()[b] || 0; var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight), e = ea[b], f = e.length; for (c = c || $(a, null); --f > -1;)d -= parseFloat(_(a, "padding" + e[f], c, !0)) || 0, d -= parseFloat(_(a, "border" + e[f] + "Width", c, !0)) || 0; return d }, ha = function (a, b) { if ("contain" === a || "auto" === a || "auto auto" === a) return a + " "; (null == a || "" === a) && (a = "0 0"); var c, d = a.split(" "), e = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : d[0], f = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : d[1]; if (d.length > 3 && !b) { for (d = a.split(", ").join(",").split(","), a = [], c = 0; c < d.length; c++)a.push(ha(d[c])); return a.join(",") } return null == f ? f = "center" === e ? "50%" : "0" : "center" === f && (f = "50%"), ("center" === e || isNaN(parseFloat(e)) && -1 === (e + "").indexOf("=")) && (e = "50%"), a = e + " " + f + (d.length > 2 ? " " + d[2] : ""), b && (b.oxp = -1 !== e.indexOf("%"), b.oyp = -1 !== f.indexOf("%"), b.oxr = "=" === e.charAt(1), b.oyr = "=" === f.charAt(1), b.ox = parseFloat(e.replace(v, "")), b.oy = parseFloat(f.replace(v, "")), b.v = a), b || a }, ia = function (a, b) { return "function" == typeof a && (a = a(r, q)), "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b) || 0 }, ja = function (a, b) { return "function" == typeof a && (a = a(r, q)), null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a) || 0 }, ka = function (a, b, c, d) { var e, f, g, h, i, j = 1e-6; return "function" == typeof a && (a = a(r, q)), null == a ? h = b : "number" == typeof a ? h = a : (e = 360, f = a.split("_"), i = "=" === a.charAt(1), g = (i ? parseInt(a.charAt(0) + "1", 10) * parseFloat(f[0].substr(2)) : parseFloat(f[0])) * (-1 === a.indexOf("rad") ? 1 : L) - (i ? 0 : b), f.length && (d && (d[c] = b + g), -1 !== a.indexOf("short") && (g %= e, g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)), -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (g / e | 0) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (g / e | 0) * e)), h = b + g), j > h && h > -j && (h = 0), h }, la = { aqua: [0, 255, 255], lime: [0, 255, 0], silver: [192, 192, 192], black: [0, 0, 0], maroon: [128, 0, 0], teal: [0, 128, 128], blue: [0, 0, 255], navy: [0, 0, 128], white: [255, 255, 255], fuchsia: [255, 0, 255], olive: [128, 128, 0], yellow: [255, 255, 0], orange: [255, 165, 0], gray: [128, 128, 128], purple: [128, 0, 128], green: [0, 128, 0], red: [255, 0, 0], pink: [255, 192, 203], cyan: [0, 255, 255], transparent: [255, 255, 255, 0] }, ma = function (a, b, c) { return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 255 * (1 > 6 * a ? b + (c - b) * a * 6 : .5 > a ? c : 2 > 3 * a ? b + (c - b) * (2 / 3 - a) * 6 : b) + .5 | 0 }, na = g.parseColor = function (a, b) { var c, d, e, f, g, h, i, j, k, l, m; if (a) if ("number" == typeof a) c = [a >> 16, a >> 8 & 255, 255 & a]; else { if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), la[a]) c = la[a]; else if ("#" === a.charAt(0)) 4 === a.length && (d = a.charAt(1), e = a.charAt(2), f = a.charAt(3), a = "#" + d + d + e + e + f + f), a = parseInt(a.substr(1), 16), c = [a >> 16, a >> 8 & 255, 255 & a]; else if ("hsl" === a.substr(0, 3)) if (c = m = a.match(s), b) { if (-1 !== a.indexOf("=")) return a.match(t) } else g = Number(c[0]) % 360 / 360, h = Number(c[1]) / 100, i = Number(c[2]) / 100, e = .5 >= i ? i * (h + 1) : i + h - i * h, d = 2 * i - e, c.length > 3 && (c[3] = Number(a[3])), c[0] = ma(g + 1 / 3, d, e), c[1] = ma(g, d, e), c[2] = ma(g - 1 / 3, d, e); else c = a.match(s) || la.transparent; c[0] = Number(c[0]), c[1] = Number(c[1]), c[2] = Number(c[2]), c.length > 3 && (c[3] = Number(c[3])) } else c = la.black; return b && !m && (d = c[0] / 255, e = c[1] / 255, f = c[2] / 255, j = Math.max(d, e, f), k = Math.min(d, e, f), i = (j + k) / 2, j === k ? g = h = 0 : (l = j - k, h = i > .5 ? l / (2 - j - k) : l / (j + k), g = j === d ? (e - f) / l + (f > e ? 6 : 0) : j === e ? (f - d) / l + 2 : (d - e) / l + 4, g *= 60), c[0] = g + .5 | 0, c[1] = 100 * h + .5 | 0, c[2] = 100 * i + .5 | 0), c }, oa = function (a, b) { var c, d, e, f = a.match(pa) || [], g = 0, h = f.length ? "" : a; for (c = 0; c < f.length; c++)d = f[c], e = a.substr(g, a.indexOf(d, g) - g), g += e.length + d.length, d = na(d, b), 3 === d.length && d.push(1), h += e + (b ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : "rgba(" + d.join(",")) + ")"; return h + a.substr(g) }, pa = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b"; for (j in la) pa += "|" + j + "\\b"; pa = new RegExp(pa + ")", "gi"), g.colorStringFilter = function (a) { var b, c = a[0] + a[1]; pa.test(c) && (b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla("), a[0] = oa(a[0], b), a[1] = oa(a[1], b)), pa.lastIndex = 0 }, b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter); var qa = function (a, b, c, d) { if (null == a) return function (a) { return a }; var e, f = b ? (a.match(pa) || [""])[0] : "", g = a.split(f).join("").match(u) || [], h = a.substr(0, a.indexOf(g[0])), i = ")" === a.charAt(a.length - 1) ? ")" : "", j = -1 !== a.indexOf(" ") ? " " : ",", k = g.length, l = k > 0 ? g[0].replace(s, "") : ""; return k ? e = b ? function (a) { var b, m, n, o; if ("number" == typeof a) a += l; else if (d && I.test(a)) { for (o = a.replace(I, "|").split("|"), n = 0; n < o.length; n++)o[n] = e(o[n]); return o.join(",") } if (b = (a.match(pa) || [f])[0], m = a.split(b).join("").match(u) || [], n = m.length, k > n--) for (; ++n < k;)m[n] = c ? m[(n - 1) / 2 | 0] : g[n]; return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "") } : function (a) { var b, f, m; if ("number" == typeof a) a += l; else if (d && I.test(a)) { for (f = a.replace(I, "|").split("|"), m = 0; m < f.length; m++)f[m] = e(f[m]); return f.join(",") } if (b = a.match(u) || [], m = b.length, k > m--) for (; ++m < k;)b[m] = c ? b[(m - 1) / 2 | 0] : g[m]; return h + b.join(j) + i } : function (a) { return a } }, ra = function (a) { return a = a.split(","), function (b, c, d, e, f, g, h) { var i, j = (c + "").split(" "); for (h = {}, i = 0; 4 > i; i++)h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0]; return e.parse(b, h, f, g) } }, sa = (S._setPluginRatio = function (a) { this.plugin.setRatio(a); for (var b, c, d, e, f, g = this.data, h = g.proxy, i = g.firstMPT, j = 1e-6; i;)b = h[i.v], i.r ? b = Math.round(b) : j > b && b > -j && (b = 0), i.t[i.p] = b, i = i._next; if (g.autoRotate && (g.autoRotate.rotation = g.mod ? g.mod(h.rotation, this.t) : h.rotation), 1 === a || 0 === a) for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i;) { if (c = i.t, c.type) { if (1 === c.type) { for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++)e += c["xn" + d] + c["xs" + (d + 1)]; c[f] = e } } else c[f] = c.s + c.xs0; i = i._next } }, function (a, b, c, d, e) { this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next = d) }), ta = (S._parseToProxy = function (a, b, c, d, e, f) { var g, h, i, j, k, l = d, m = {}, n = {}, o = c._transform, p = M; for (c._transform = null, M = b, d = k = c.parse(a, b, d, e), M = p, f && (c._transform = o, l && (l._prev = null, l._prev && (l._prev._next = null))); d && d !== l;) { if (d.type <= 1 && (h = d.p, n[h] = d.s + d.c, m[h] = d.s, f || (j = new sa(d, "s", h, j, d.r), d.c = 0), 1 === d.type)) for (g = d.l; --g > 0;)i = "xn" + g, h = d.p + "_" + i, n[h] = d.data[i], m[h] = d[i], f || (j = new sa(d, i, h, j, d.rxp[i])); d = d._next } return { proxy: m, end: n, firstMPT: j, pt: k } }, S.CSSPropTween = function (a, b, d, e, g, h, i, j, k, l, m) { this.t = a, this.p = b, this.s = d, this.c = e, this.n = i || b, a instanceof ta || f.push(this.n), this.r = j, this.type = h || 0, k && (this.pr = k, c = !0), this.b = void 0 === l ? d : l, this.e = void 0 === m ? d + e : m, g && (this._next = g, g._prev = this) }), ua = function (a, b, c, d, e, f) { var g = new ta(a, b, c, d - c, e, -1, f); return g.b = c, g.e = g.xs0 = d, g }, va = g.parseComplex = function (a, b, c, d, e, f, h, i, j, l) { c = c || f || "", "function" == typeof d && (d = d(r, q)), h = new ta(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d), d += "", e && pa.test(d + c) && (d = [c, d], g.colorStringFilter(d), c = d[0], d = d[1]); var m, n, o, p, u, v, w, x, y, z, A, B, C, D = c.split(", ").join(",").split(" "), E = d.split(", ").join(",").split(" "), F = D.length, G = k !== !1; for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (D = D.join(" ").replace(I, ", ").split(" "), E = E.join(" ").replace(I, ", ").split(" "), F = D.length), F !== E.length && (D = (f || "").split(" "), F = D.length), h.plugin = j, h.setRatio = l, pa.lastIndex = 0, m = 0; F > m; m++)if (p = D[m], u = E[m], x = parseFloat(p), x || 0 === x) h.appendXtra("", x, ia(u, x), u.replace(t, ""), G && -1 !== u.indexOf("px"), !0); else if (e && pa.test(p)) B = u.indexOf(")") + 1, B = ")" + (B ? u.substr(B) : ""), C = -1 !== u.indexOf("hsl") && U, p = na(p, C), u = na(u, C), y = p.length + u.length > 6, y && !U && 0 === u[3] ? (h["xs" + h.l] += h.l ? " transparent" : "transparent", h.e = h.e.split(E[m]).join("transparent")) : (U || (y = !1), C ? h.appendXtra(y ? "hsla(" : "hsl(", p[0], ia(u[0], p[0]), ",", !1, !0).appendXtra("", p[1], ia(u[1], p[1]), "%,", !1).appendXtra("", p[2], ia(u[2], p[2]), y ? "%," : "%" + B, !1) : h.appendXtra(y ? "rgba(" : "rgb(", p[0], u[0] - p[0], ",", !0, !0).appendXtra("", p[1], u[1] - p[1], ",", !0).appendXtra("", p[2], u[2] - p[2], y ? "," : B, !0), y && (p = p.length < 4 ? 1 : p[3], h.appendXtra("", p, (u.length < 4 ? 1 : u[3]) - p, B, !1))), pa.lastIndex = 0; else if (v = p.match(s)) { if (w = u.match(t), !w || w.length !== v.length) return h; for (o = 0, n = 0; n < v.length; n++)A = v[n], z = p.indexOf(A, o), h.appendXtra(p.substr(o, z - o), Number(A), ia(w[n], A), "", G && "px" === p.substr(z + A.length, 2), 0 === n), o = z + A.length; h["xs" + h.l] += p.substr(o) } else h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + u : u; if (-1 !== d.indexOf("=") && h.data) { for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++)B += h["xs" + m] + h.data["xn" + m]; h.e = B + h["xs" + m] } return h.l || (h.type = -1, h.xs0 = h.e), h.xfirst || h }, wa = 9; for (j = ta.prototype, j.l = j.pr = 0; --wa > 0;)j["xn" + wa] = 0, j["xs" + wa] = ""; j.xs0 = "", j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null, j.appendXtra = function (a, b, c, d, e, f) { var g = this, h = g.l; return g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++ , g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new ta(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = { s: b + c }, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g) }; var xa = function (a, b) { b = b || {}, this.p = b.prefix ? Z(a) || a : a, i[a] = i[this.p] = this, this.format = b.formatter || qa(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0 }, ya = S._registerComplexSpecialProp = function (a, b, c) { "object" != typeof b && (b = { parser: c }); var d, e, f = a.split(","), g = b.defaultValue; for (c = c || [g], d = 0; d < f.length; d++)b.prefix = 0 === d && b.prefix, b.defaultValue = c[d] || g, e = new xa(f[d], b) }, za = S._registerPluginProp = function (a) { if (!i[a]) { var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin"; ya(a, { parser: function (a, c, d, e, f, g, j) { var k = h.com.greensock.plugins[b]; return k ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j)) : (W("Error: " + b + " js file not loaded."), f) } }) } }; j = xa.prototype, j.parseComplex = function (a, b, c, d, e, f) { var g, h, i, j, k, l, m = this.keyword; if (this.multi && (I.test(c) || I.test(b) ? (h = b.replace(I, "|").split("|"), i = c.replace(I, "|").split("|")) : m && (h = [b], i = [c])), i) { for (j = i.length > h.length ? i.length : h.length, g = 0; j > g; g++)b = h[g] = h[g] || this.dflt, c = i[g] = i[g] || this.dflt, m && (k = b.indexOf(m), l = c.indexOf(m), k !== l && (-1 === l ? h[g] = h[g].split(m).join("") : -1 === k && (h[g] += " " + m))); b = h.join(", "), c = i.join(", ") } return va(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f) }, j.parse = function (a, b, c, d, f, g, h) { return this.parseComplex(a.style, this.format(_(a, this.p, e, !1, this.dflt)), this.format(b), f, g) }, g.registerSpecialProp = function (a, b, c) { ya(a, { parser: function (a, d, e, f, g, h, i) { var j = new ta(a, e, 0, 0, g, 2, e, !1, c); return j.plugin = h, j.setRatio = b(a, d, f._tween, e), j }, priority: c }) }, g.useSVGTransformAttr = !0; var Aa, Ba = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","), Ca = Z("transform"), Da = X + "transform", Ea = Z("transformOrigin"), Fa = null !== Z("perspective"), Ga = S.Transform = function () { this.perspective = parseFloat(g.defaultTransformPerspective) || 0, this.force3D = g.defaultForce3D !== !1 && Fa ? g.defaultForce3D || "auto" : !1 }, Ha = _gsScope.SVGElement, Ia = function (a, b, c) { var d, e = O.createElementNS("http://www.w3.org/2000/svg", a), f = /([a-z])([A-Z])/g; for (d in c) e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]); return b.appendChild(e), e }, Ja = O.documentElement || {}, Ka = function () { var a, b, c, d = p || /Android/i.test(T) && !_gsScope.chrome; return O.createElementNS && !d && (a = Ia("svg", Ja), b = Ia("rect", a, { width: 100, height: 50, x: 100 }), c = b.getBoundingClientRect().width, b.style[Ea] = "50% 50%", b.style[Ca] = "scaleX(0.5)", d = c === b.getBoundingClientRect().width && !(n && Fa), Ja.removeChild(a)), d }(), La = function (a, b, c, d, e, f) { var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = a._gsTransform, w = Qa(a, !0); v && (t = v.xOrigin, u = v.yOrigin), (!d || (h = d.split(" ")).length < 2) && (n = a.getBBox(), 0 === n.x && 0 === n.y && n.width + n.height === 0 && (n = { x: parseFloat(a.hasAttribute("x") ? a.getAttribute("x") : a.hasAttribute("cx") ? a.getAttribute("cx") : 0) || 0, y: parseFloat(a.hasAttribute("y") ? a.getAttribute("y") : a.hasAttribute("cy") ? a.getAttribute("cy") : 0) || 0, width: 0, height: 0 }), b = ha(b).split(" "), h = [(-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * n.width : parseFloat(b[0])) + n.x, (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * n.height : parseFloat(b[1])) + n.y]), c.xOrigin = k = parseFloat(h[0]), c.yOrigin = l = parseFloat(h[1]), d && w !== Pa && (m = w[0], n = w[1], o = w[2], p = w[3], q = w[4], r = w[5], s = m * p - n * o, s && (i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s, j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s, k = c.xOrigin = h[0] = i, l = c.yOrigin = h[1] = j)), v && (f && (c.xOffset = v.xOffset, c.yOffset = v.yOffset, v = c), e || e !== !1 && g.defaultSmoothOrigin !== !1 ? (i = k - t, j = l - u, v.xOffset += i * w[0] + j * w[2] - i, v.yOffset += i * w[1] + j * w[3] - j) : v.xOffset = v.yOffset = 0), f || a.setAttribute("data-svg-origin", h.join(" ")) }, Ma = function (a) { var b, c = P("svg", this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), d = this.parentNode, e = this.nextSibling, f = this.style.cssText; if (Ja.appendChild(c), c.appendChild(this), this.style.display = "block", a) try { b = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = Ma } catch (g) { } else this._originalGetBBox && (b = this._originalGetBBox()); return e ? d.insertBefore(this, e) : d.appendChild(this), Ja.removeChild(c), this.style.cssText = f, b }, Na = function (a) { try { return a.getBBox() } catch (b) { return Ma.call(a, !0) } }, Oa = function (a) { return !(!(Ha && a.getCTM && Na(a)) || a.parentNode && !a.ownerSVGElement) }, Pa = [1, 0, 0, 1, 0, 0], Qa = function (a, b) { var c, d, e, f, g, h, i = a._gsTransform || new Ga, j = 1e5, k = a.style; if (Ca ? d = _(a, Da, null, !0) : a.currentStyle && (d = a.currentStyle.filter.match(G), d = d && 4 === d.length ? [d[0].substr(4), Number(d[2].substr(4)), Number(d[1].substr(4)), d[3].substr(4), i.x || 0, i.y || 0].join(",") : ""), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, c && Ca && ((h = "none" === $(a).display) || !a.parentNode) && (h && (f = k.display, k.display = "block"), a.parentNode || (g = 1, Ja.appendChild(a)), d = _(a, Da, null, !0), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, f ? k.display = f : h && Va(k, "display"), g && Ja.removeChild(a)), (i.svg || a.getCTM && Oa(a)) && (c && -1 !== (k[Ca] + "").indexOf("matrix") && (d = k[Ca], c = 0), e = a.getAttribute("transform"), c && e && (-1 !== e.indexOf("matrix") ? (d = e, c = 0) : -1 !== e.indexOf("translate") && (d = "matrix(1,0,0,1," + e.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", c = 0))), c) return Pa; for (e = (d || "").match(s) || [], wa = e.length; --wa > -1;)f = Number(e[wa]), e[wa] = (g = f - (f |= 0)) ? (g * j + (0 > g ? -.5 : .5) | 0) / j + f : f; return b && e.length > 6 ? [e[0], e[1], e[4], e[5], e[12], e[13]] : e }, Ra = S.getTransform = function (a, c, d, e) { if (a._gsTransform && d && !e) return a._gsTransform; var f, h, i, j, k, l, m = d ? a._gsTransform || new Ga : new Ga, n = m.scaleX < 0, o = 2e-5, p = 1e5, q = Fa ? parseFloat(_(a, Ea, c, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0, r = parseFloat(g.defaultTransformPerspective) || 0; if (m.svg = !(!a.getCTM || !Oa(a)), m.svg && (La(a, _(a, Ea, c, !1, "50% 50%") + "", m, a.getAttribute("data-svg-origin")), Aa = g.useSVGTransformAttr || Ka), f = Qa(a), f !== Pa) { if (16 === f.length) { var s, t, u, v, w, x = f[0], y = f[1], z = f[2], A = f[3], B = f[4], C = f[5], D = f[6], E = f[7], F = f[8], G = f[9], H = f[10], I = f[12], J = f[13], K = f[14], M = f[11], N = Math.atan2(D, H); m.zOrigin && (K = -m.zOrigin, I = F * K - f[12], J = G * K - f[13], K = H * K + m.zOrigin - f[14]), m.rotationX = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = B * v + F * w, t = C * v + G * w, u = D * v + H * w, F = B * -w + F * v, G = C * -w + G * v, H = D * -w + H * v, M = E * -w + M * v, B = s, C = t, D = u), N = Math.atan2(-z, H), m.rotationY = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = x * v - F * w, t = y * v - G * w, u = z * v - H * w, G = y * w + G * v, H = z * w + H * v, M = A * w + M * v, x = s, y = t, z = u), N = Math.atan2(y, x), m.rotation = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), x = x * v + B * w, t = y * v + C * w, C = y * -w + C * v, D = z * -w + D * v, y = t), m.rotationX && Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0, m.rotationY = 180 - m.rotationY), m.scaleX = (Math.sqrt(x * x + y * y) * p + .5 | 0) / p, m.scaleY = (Math.sqrt(C * C + G * G) * p + .5 | 0) / p, m.scaleZ = (Math.sqrt(D * D + H * H) * p + .5 | 0) / p, m.rotationX || m.rotationY ? m.skewX = 0 : (m.skewX = B || C ? Math.atan2(B, C) * L + m.rotation : m.skewX || 0, Math.abs(m.skewX) > 90 && Math.abs(m.skewX) < 270 && (n ? (m.scaleX *= -1, m.skewX += m.rotation <= 0 ? 180 : -180, m.rotation += m.rotation <= 0 ? 180 : -180) : (m.scaleY *= -1, m.skewX += m.skewX <= 0 ? 180 : -180))), m.perspective = M ? 1 / (0 > M ? -M : M) : 0, m.x = I, m.y = J, m.z = K, m.svg && (m.x -= m.xOrigin - (m.xOrigin * x - m.yOrigin * B), m.y -= m.yOrigin - (m.yOrigin * y - m.xOrigin * C)) } else if (!Fa || e || !f.length || m.x !== f[4] || m.y !== f[5] || !m.rotationX && !m.rotationY) { var O = f.length >= 6, P = O ? f[0] : 1, Q = f[1] || 0, R = f[2] || 0, S = O ? f[3] : 1; m.x = f[4] || 0, m.y = f[5] || 0, i = Math.sqrt(P * P + Q * Q), j = Math.sqrt(S * S + R * R), k = P || Q ? Math.atan2(Q, P) * L : m.rotation || 0, l = R || S ? Math.atan2(R, S) * L + k : m.skewX || 0, Math.abs(l) > 90 && Math.abs(l) < 270 && (n ? (i *= -1, l += 0 >= k ? 180 : -180, k += 0 >= k ? 180 : -180) : (j *= -1, l += 0 >= l ? 180 : -180)), m.scaleX = i, m.scaleY = j, m.rotation = k, m.skewX = l, Fa && (m.rotationX = m.rotationY = m.z = 0, m.perspective = r, m.scaleZ = 1), m.svg && (m.x -= m.xOrigin - (m.xOrigin * P + m.yOrigin * R), m.y -= m.yOrigin - (m.xOrigin * Q + m.yOrigin * S)) } m.zOrigin = q; for (h in m) m[h] < o && m[h] > -o && (m[h] = 0) } return d && (a._gsTransform = m, m.svg && (Aa && a.style[Ca] ? b.delayedCall(.001, function () { Va(a.style, Ca) }) : !Aa && a.getAttribute("transform") && b.delayedCall(.001, function () { a.removeAttribute("transform") }))), m }, Sa = function (a) { var b, c, d = this.data, e = -d.rotation * K, f = e + d.skewX * K, g = 1e5, h = (Math.cos(e) * d.scaleX * g | 0) / g, i = (Math.sin(e) * d.scaleX * g | 0) / g, j = (Math.sin(f) * -d.scaleY * g | 0) / g, k = (Math.cos(f) * d.scaleY * g | 0) / g, l = this.t.style, m = this.t.currentStyle; if (m) { c = i, i = -j, j = -c, b = m.filter, l.filter = ""; var n, o, q = this.t.offsetWidth, r = this.t.offsetHeight, s = "absolute" !== m.position, t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k, u = d.x + q * d.xPercent / 100, v = d.y + r * d.yPercent / 100; if (null != d.ox && (n = (d.oxp ? q * d.ox * .01 : d.ox) - q / 2, o = (d.oyp ? r * d.oy * .01 : d.oy) - r / 2, u += n - (n * h + o * i), v += o - (n * j + o * k)), s ? (n = q / 2, o = r / 2, t += ", Dx=" + (n - (n * h + o * i) + u) + ", Dy=" + (o - (n * j + o * k) + v) + ")") : t += ", sizingMethod='auto expand')", -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? l.filter = b.replace(H, t) : l.filter = t + " " + b, (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === t.indexOf("Dx=0, Dy=0") || x.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l.removeAttribute("filter")), !s) { var y, z, A, B = 8 > p ? 1 : -1; for (n = d.ieOffsetX || 0, o = d.ieOffsetY || 0, d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + u), d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + v), wa = 0; 4 > wa; wa++)z = fa[wa], y = m[z], c = -1 !== y.indexOf("px") ? parseFloat(y) : aa(this.t, z, parseFloat(y), y.replace(w, "")) || 0, A = c !== d[z] ? 2 > wa ? -d.ieOffsetX : -d.ieOffsetY : 2 > wa ? n - d.ieOffsetX : o - d.ieOffsetY, l[z] = (d[z] = Math.round(c - A * (0 === wa || 2 === wa ? 1 : B))) + "px" } } }, Ta = S.set3DTransformRatio = S.setTransformRatio = function (a) { var b, c, d, e, f, g, h, i, j, k, l, m, o, p, q, r, s, t, u, v, w, x, y, z = this.data, A = this.t.style, B = z.rotation, C = z.rotationX, D = z.rotationY, E = z.scaleX, F = z.scaleY, G = z.scaleZ, H = z.x, I = z.y, J = z.z, L = z.svg, M = z.perspective, N = z.force3D, O = z.skewY, P = z.skewX; if (O && (P += O, B += O), ((1 === a || 0 === a) && "auto" === N && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !N) && !J && !M && !D && !C && 1 === G || Aa && L || !Fa) return void (B || P || L ? (B *= K, x = P * K, y = 1e5, c = Math.cos(B) * E, f = Math.sin(B) * E, d = Math.sin(B - x) * -F, g = Math.cos(B - x) * F, x && "simple" === z.skewType && (b = Math.tan(x - O * K), b = Math.sqrt(1 + b * b), d *= b, g *= b, O && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b)), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset, Aa && (z.xPercent || z.yPercent) && (q = this.t.getBBox(), H += .01 * z.xPercent * q.width, I += .01 * z.yPercent * q.height), q = 1e-6, q > H && H > -q && (H = 0), q > I && I > -q && (I = 0)), u = (c * y | 0) / y + "," + (f * y | 0) / y + "," + (d * y | 0) / y + "," + (g * y | 0) / y + "," + H + "," + I + ")", L && Aa ? this.t.setAttribute("transform", "matrix(" + u) : A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + u) : A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + F + "," + H + "," + I + ")"); if (n && (q = 1e-4, q > E && E > -q && (E = G = 2e-5), q > F && F > -q && (F = G = 2e-5), !M || z.z || z.rotationX || z.rotationY || (M = 0)), B || P) B *= K, r = c = Math.cos(B), s = f = Math.sin(B), P && (B -= P * K, r = Math.cos(B), s = Math.sin(B), "simple" === z.skewType && (b = Math.tan((P - O) * K), b = Math.sqrt(1 + b * b), r *= b, s *= b, z.skewY && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b))), d = -s, g = r; else { if (!(D || C || 1 !== G || M || L)) return void (A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) translate3d(" : "translate3d(") + H + "px," + I + "px," + J + "px)" + (1 !== E || 1 !== F ? " scale(" + E + "," + F + ")" : "")); c = g = 1, d = f = 0 } k = 1, e = h = i = j = l = m = 0, o = M ? -1 / M : 0, p = z.zOrigin, q = 1e-6, v = ",", w = "0", B = D * K, B && (r = Math.cos(B), s = Math.sin(B), i = -s, l = o * -s, e = c * s, h = f * s, k = r, o *= r, c *= r, f *= r), B = C * K, B && (r = Math.cos(B), s = Math.sin(B), b = d * r + e * s, t = g * r + h * s, j = k * s, m = o * s, e = d * -s + e * r, h = g * -s + h * r, k *= r, o *= r, d = b, g = t), 1 !== G && (e *= G, h *= G, k *= G, o *= G), 1 !== F && (d *= F, g *= F, j *= F, m *= F), 1 !== E && (c *= E, f *= E, i *= E, l *= E), (p || L) && (p && (H += e * -p, I += h * -p, J += k * -p + p), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset), q > H && H > -q && (H = w), q > I && I > -q && (I = w), q > J && J > -q && (J = 0)), u = z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix3d(" : "matrix3d(", u += (q > c && c > -q ? w : c) + v + (q > f && f > -q ? w : f) + v + (q > i && i > -q ? w : i), u += v + (q > l && l > -q ? w : l) + v + (q > d && d > -q ? w : d) + v + (q > g && g > -q ? w : g), C || D || 1 !== G ? (u += v + (q > j && j > -q ? w : j) + v + (q > m && m > -q ? w : m) + v + (q > e && e > -q ? w : e), u += v + (q > h && h > -q ? w : h) + v + (q > k && k > -q ? w : k) + v + (q > o && o > -q ? w : o) + v) : u += ",0,0,0,0,1,0,", u += H + v + I + v + J + v + (M ? 1 + -J / M : 1) + ")", A[Ca] = u }; j = Ga.prototype, j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0, j.scaleX = j.scaleY = j.scaleZ = 1, ya("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", { parser: function (a, b, c, d, f, h, i) { if (d._lastParsedTransform === i) return f; d._lastParsedTransform = i; var j, k = i.scale && "function" == typeof i.scale ? i.scale : 0; "function" == typeof i[c] && (j = i[c], i[c] = b), k && (i.scale = k(r, a)); var l, m, n, o, p, s, t, u, v, w = a._gsTransform, x = a.style, y = 1e-6, z = Ba.length, A = i, B = {}, C = "transformOrigin", D = Ra(a, e, !0, A.parseTransform), E = A.transform && ("function" == typeof A.transform ? A.transform(r, q) : A.transform); if (d._transform = D, E && "string" == typeof E && Ca) m = Q.style, m[Ca] = E, m.display = "block", m.position = "absolute", O.body.appendChild(Q), l = Ra(Q, null, !1), D.svg && (s = D.xOrigin, t = D.yOrigin, l.x -= D.xOffset, l.y -= D.yOffset, (A.transformOrigin || A.svgOrigin) && (E = {}, La(a, ha(A.transformOrigin), E, A.svgOrigin, A.smoothOrigin, !0), s = E.xOrigin, t = E.yOrigin, l.x -= E.xOffset - D.xOffset, l.y -= E.yOffset - D.yOffset), (s || t) && (u = Qa(Q, !0), l.x -= s - (s * u[0] + t * u[2]), l.y -= t - (s * u[1] + t * u[3]))), O.body.removeChild(Q), l.perspective || (l.perspective = D.perspective), null != A.xPercent && (l.xPercent = ja(A.xPercent, D.xPercent)), null != A.yPercent && (l.yPercent = ja(A.yPercent, D.yPercent)); else if ("object" == typeof A) { if (l = { scaleX: ja(null != A.scaleX ? A.scaleX : A.scale, D.scaleX), scaleY: ja(null != A.scaleY ? A.scaleY : A.scale, D.scaleY), scaleZ: ja(A.scaleZ, D.scaleZ), x: ja(A.x, D.x), y: ja(A.y, D.y), z: ja(A.z, D.z), xPercent: ja(A.xPercent, D.xPercent), yPercent: ja(A.yPercent, D.yPercent), perspective: ja(A.transformPerspective, D.perspective) }, p = A.directionalRotation, null != p) if ("object" == typeof p) for (m in p) A[m] = p[m]; else A.rotation = p; "string" == typeof A.x && -1 !== A.x.indexOf("%") && (l.x = 0, l.xPercent = ja(A.x, D.xPercent)), "string" == typeof A.y && -1 !== A.y.indexOf("%") && (l.y = 0, l.yPercent = ja(A.y, D.yPercent)), l.rotation = ka("rotation" in A ? A.rotation : "shortRotation" in A ? A.shortRotation + "_short" : "rotationZ" in A ? A.rotationZ : D.rotation, D.rotation, "rotation", B), Fa && (l.rotationX = ka("rotationX" in A ? A.rotationX : "shortRotationX" in A ? A.shortRotationX + "_short" : D.rotationX || 0, D.rotationX, "rotationX", B), l.rotationY = ka("rotationY" in A ? A.rotationY : "shortRotationY" in A ? A.shortRotationY + "_short" : D.rotationY || 0, D.rotationY, "rotationY", B)), l.skewX = ka(A.skewX, D.skewX), l.skewY = ka(A.skewY, D.skewY) } for (Fa && null != A.force3D && (D.force3D = A.force3D, o = !0), D.skewType = A.skewType || D.skewType || g.defaultSkewType, n = D.force3D || D.z || D.rotationX || D.rotationY || l.z || l.rotationX || l.rotationY || l.perspective, n || null == A.scale || (l.scaleZ = 1); --z > -1;)v = Ba[z], E = l[v] - D[v], (E > y || -y > E || null != A[v] || null != M[v]) && (o = !0, f = new ta(D, v, D[v], E, f), v in B && (f.e = B[v]), f.xs0 = 0, f.plugin = h, d._overwriteProps.push(f.n)); return E = A.transformOrigin, D.svg && (E || A.svgOrigin) && (s = D.xOffset, t = D.yOffset, La(a, ha(E), l, A.svgOrigin, A.smoothOrigin), f = ua(D, "xOrigin", (w ? D : l).xOrigin, l.xOrigin, f, C), f = ua(D, "yOrigin", (w ? D : l).yOrigin, l.yOrigin, f, C), (s !== D.xOffset || t !== D.yOffset) && (f = ua(D, "xOffset", w ? s : D.xOffset, D.xOffset, f, C), f = ua(D, "yOffset", w ? t : D.yOffset, D.yOffset, f, C)), E = "0px 0px"), (E || Fa && n && D.zOrigin) && (Ca ? (o = !0, v = Ea, E = (E || _(a, v, e, !1, "50% 50%")) + "", f = new ta(x, v, 0, 0, f, -1, C), f.b = x[v], f.plugin = h, Fa ? (m = D.zOrigin, E = E.split(" "), D.zOrigin = (E.length > 2 && (0 === m || "0px" !== E[2]) ? parseFloat(E[2]) : m) || 0, f.xs0 = f.e = E[0] + " " + (E[1] || "50%") + " 0px", f = new ta(D, "zOrigin", 0, 0, f, -1, f.n), f.b = m, f.xs0 = f.e = D.zOrigin) : f.xs0 = f.e = E) : ha(E + "", D)), o && (d._transformType = D.svg && Aa || !n && 3 !== this._transformType ? 2 : 3), j && (i[c] = j), k && (i.scale = k), f }, prefix: !0 }), ya("boxShadow", { defaultValue: "0px 0px 0px 0px #999", prefix: !0, color: !0, multi: !0, keyword: "inset" }), ya("borderRadius", { defaultValue: "0px", parser: function (a, b, c, f, g, h) { b = this.format(b); var i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], z = a.style; for (q = parseFloat(a.offsetWidth), r = parseFloat(a.offsetHeight), i = b.split(" "), j = 0; j < y.length; j++)this.p.indexOf("border") && (y[j] = Z(y[j])), m = l = _(a, y[j], e, !1, "0px"), -1 !== m.indexOf(" ") && (l = m.split(" "), m = l[0], l = l[1]), n = k = i[j], o = parseFloat(m), t = m.substr((o + "").length), u = "=" === n.charAt(1), u ? (p = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), p *= parseFloat(n), s = n.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(n), s = n.substr((p + "").length)), "" === s && (s = d[c] || t), s !== t && (v = aa(a, "borderLeft", o, t), w = aa(a, "borderTop", o, t), "%" === s ? (m = v / q * 100 + "%", l = w / r * 100 + "%") : "em" === s ? (x = aa(a, "borderLeft", 1, "em"), m = v / x + "em", l = w / x + "em") : (m = v + "px", l = w + "px"), u && (n = parseFloat(m) + p + s, k = parseFloat(l) + p + s)), g = va(z, y[j], m + " " + l, n + " " + k, !1, "0px", g); return g }, prefix: !0, formatter: qa("0px 0px 0px 0px", !1, !0) }), ya("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", { defaultValue: "0px", parser: function (a, b, c, d, f, g) { return va(a.style, c, this.format(_(a, c, e, !1, "0px 0px")), this.format(b), !1, "0px", f) }, prefix: !0, formatter: qa("0px 0px", !1, !0) }), ya("backgroundPosition", { defaultValue: "0 0", parser: function (a, b, c, d, f, g) { var h, i, j, k, l, m, n = "background-position", o = e || $(a, null), q = this.format((o ? p ? o.getPropertyValue(n + "-x") + " " + o.getPropertyValue(n + "-y") : o.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"), r = this.format(b); if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && r.split(",").length < 2 && (m = _(a, "backgroundImage").replace(D, ""), m && "none" !== m)) { for (h = q.split(" "), i = r.split(" "), R.setAttribute("src", m), j = 2; --j > -1;)q = h[j], k = -1 !== q.indexOf("%"), k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - R.width : a.offsetHeight - R.height, h[j] = k ? parseFloat(q) / 100 * l + "px" : parseFloat(q) / l * 100 + "%"); q = h.join(" ") } return this.parseComplex(a.style, q, r, f, g) }, formatter: ha }), ya("backgroundSize", { defaultValue: "0 0", formatter: function (a) { return a += "", ha(-1 === a.indexOf(" ") ? a + " " + a : a) } }), ya("perspective", { defaultValue: "0px", prefix: !0 }), ya("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }), ya("transformStyle", { prefix: !0 }), ya("backfaceVisibility", { prefix: !0 }), ya("userSelect", { prefix: !0 }), ya("margin", { parser: ra("marginTop,marginRight,marginBottom,marginLeft") }), ya("padding", { parser: ra("paddingTop,paddingRight,paddingBottom,paddingLeft") }), ya("clip", {
            defaultValue: "rect(0px,0px,0px,0px)", parser: function (a, b, c, d, f, g) {
                var h, i, j; return 9 > p ? (i = a.currentStyle, j = 8 > p ? " " : ",", h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")",
                    b = this.format(b).split(",").join(j)) : (h = this.format(_(a, this.p, e, !1, this.dflt)), b = this.format(b)), this.parseComplex(a.style, h, b, f, g)
            }
        }), ya("textShadow", { defaultValue: "0px 0px 0px #999", color: !0, multi: !0 }), ya("autoRound,strictUnits", { parser: function (a, b, c, d, e) { return e } }), ya("border", { defaultValue: "0px solid #000", parser: function (a, b, c, d, f, g) { var h = _(a, "borderTopWidth", e, !1, "0px"), i = this.format(b).split(" "), j = i[0].replace(w, ""); return "px" !== j && (h = parseFloat(h) / aa(a, "borderTopWidth", 1, j) + j), this.parseComplex(a.style, this.format(h + " " + _(a, "borderTopStyle", e, !1, "solid") + " " + _(a, "borderTopColor", e, !1, "#000")), i.join(" "), f, g) }, color: !0, formatter: function (a) { var b = a.split(" "); return b[0] + " " + (b[1] || "solid") + " " + (a.match(pa) || ["#000"])[0] } }), ya("borderWidth", { parser: ra("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth") }), ya("float,cssFloat,styleFloat", { parser: function (a, b, c, d, e, f) { var g = a.style, h = "cssFloat" in g ? "cssFloat" : "styleFloat"; return new ta(g, h, 0, 0, e, -1, c, !1, 0, g[h], b) } }); var Ua = function (a) { var b, c = this.t, d = c.filter || _(this.data, "filter") || "", e = this.s + this.c * a | 0; 100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"), b = !_(this.data, "filter")) : (c.filter = d.replace(z, ""), b = !0)), b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"), -1 === d.indexOf("pacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(x, "opacity=" + e)) }; ya("opacity,alpha,autoAlpha", { defaultValue: "1", parser: function (a, b, c, d, f, g) { var h = parseFloat(_(a, "opacity", e, !1, "1")), i = a.style, j = "autoAlpha" === c; return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === _(a, "visibility", e) && 0 !== b && (h = 0), U ? f = new ta(i, "opacity", h, b - h, f) : (f = new ta(i, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = Ua), j && (f = new ta(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)), f } }); var Va = function (a, b) { b && (a.removeProperty ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) && (b = "-" + b), a.removeProperty(b.replace(B, "-$1").toLowerCase())) : a.removeAttribute(b)) }, Wa = function (a) { if (this.t._gsClassPT = this, 1 === a || 0 === a) { this.t.setAttribute("class", 0 === a ? this.b : this.e); for (var b = this.data, c = this.t.style; b;)b.v ? c[b.p] = b.v : Va(c, b.p), b = b._next; 1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null) } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e) }; ya("className", { parser: function (a, b, d, f, g, h, i) { var j, k, l, m, n, o = a.getAttribute("class") || "", p = a.style.cssText; if (g = f._classNamePT = new ta(a, d, 0, 0, g, 2), g.setRatio = Wa, g.pr = -11, c = !0, g.b = o, k = ca(a, e), l = a._gsClassPT) { for (m = {}, n = l.data; n;)m[n.p] = 1, n = n._next; l.setRatio(1) } return a._gsClassPT = g, g.e = "=" !== b.charAt(1) ? b : o.replace(new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), a.setAttribute("class", g.e), j = da(a, k, ca(a), i, m), a.setAttribute("class", o), g.data = j.firstMPT, a.style.cssText = p, g = g.xfirst = f.parse(a, j.difs, g, h) } }); var Xa = function (a) { if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) { var b, c, d, e, f, g = this.t.style, h = i.transform.parse; if ("all" === this.e) g.cssText = "", e = !0; else for (b = this.e.split(" ").join("").split(","), d = b.length; --d > -1;)c = b[d], i[c] && (i[c].parse === h ? e = !0 : c = "transformOrigin" === c ? Ea : i[c].p), Va(g, c); e && (Va(g, Ca), f = this.t._gsTransform, f && (f.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform)) } }; for (ya("clearProps", { parser: function (a, b, d, e, f) { return f = new ta(a, d, 0, 0, f, 2), f.setRatio = Xa, f.e = b, f.pr = -10, f.data = e._tween, c = !0, f } }), j = "bezier,throwProps,physicsProps,physics2D".split(","), wa = j.length; wa--;)za(j[wa]); j = g.prototype, j._firstPT = j._lastParsedTransform = j._transform = null, j._onInitTween = function (a, b, h, j) { if (!a.nodeType) return !1; this._target = q = a, this._tween = h, this._vars = b, r = j, k = b.autoRound, c = !1, d = b.suffixMap || g.suffixMap, e = $(a, ""), f = this._overwriteProps; var n, p, s, t, u, v, w, x, z, A = a.style; if (l && "" === A.zIndex && (n = _(a, "zIndex", e), ("auto" === n || "" === n) && this._addLazySet(A, "zIndex", 0)), "string" == typeof b && (t = A.cssText, n = ca(a, e), A.cssText = t + ";" + b, n = da(a, n, ca(a)).difs, !U && y.test(b) && (n.opacity = parseFloat(RegExp.$1)), b = n, A.cssText = t), b.className ? this._firstPT = p = i.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = p = this.parse(a, b, null), this._transformType) { for (z = 3 === this._transformType, Ca ? m && (l = !0, "" === A.zIndex && (w = _(a, "zIndex", e), ("auto" === w || "" === w) && this._addLazySet(A, "zIndex", 0)), o && this._addLazySet(A, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (z ? "visible" : "hidden"))) : A.zoom = 1, s = p; s && s._next;)s = s._next; x = new ta(a, "transform", 0, 0, null, 2), this._linkCSSP(x, null, s), x.setRatio = Ca ? Ta : Sa, x.data = this._transform || Ra(a, e, !0), x.tween = h, x.pr = -1, f.pop() } if (c) { for (; p;) { for (v = p._next, s = t; s && s.pr > p.pr;)s = s._next; (p._prev = s ? s._prev : u) ? p._prev._next = p : t = p, (p._next = s) ? s._prev = p : u = p, p = v } this._firstPT = t } return !0 }, j.parse = function (a, b, c, f) { var g, h, j, l, m, n, o, p, s, t, u = a.style; for (g in b) n = b[g], "function" == typeof n && (n = n(r, q)), h = i[g], h ? c = h.parse(a, n, g, this, c, f, b) : (m = _(a, g, e) + "", s = "string" == typeof n, "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || s && A.test(n) ? (s || (n = na(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = va(u, g, m, n, !0, "transparent", c, 0, f)) : s && J.test(n) ? c = va(u, g, m, n, !0, null, c, 0, f) : (j = parseFloat(m), o = j || 0 === j ? m.substr((j + "").length) : "", ("" === m || "auto" === m) && ("width" === g || "height" === g ? (j = ga(a, g, e), o = "px") : "left" === g || "top" === g ? (j = ba(a, g, e), o = "px") : (j = "opacity" !== g ? 0 : 1, o = "")), t = s && "=" === n.charAt(1), t ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.replace(w, "")) : (l = parseFloat(n), p = s ? n.replace(w, "") : ""), "" === p && (p = g in d ? d[g] : o), n = l || 0 === l ? (t ? l + j : l) + p : b[g], o !== p && "" !== p && (l || 0 === l) && j && (j = aa(a, g, j, o), "%" === p ? (j /= aa(a, g, 100, "%") / 100, b.strictUnits !== !0 && (m = j + "%")) : "em" === p || "rem" === p || "vw" === p || "vh" === p ? j /= aa(a, g, 1, p) : "px" !== p && (l = aa(a, g, l, p), p = "px"), t && (l || 0 === l) && (n = l + j + p)), t && (l += j), !j && 0 !== j || !l && 0 !== l ? void 0 !== u[g] && (n || n + "" != "NaN" && null != n) ? (c = new ta(u, g, l || j || 0, 0, c, -1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : W("invalid " + g + " tween value: " + b[g]) : (c = new ta(u, g, j, l - j, c, 0, g, k !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p))), f && c && !c.plugin && (c.plugin = f); return c }, j.setRatio = function (a) { var b, c, d, e = this._firstPT, f = 1e-6; if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time) if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6) for (; e;) { if (b = e.c * a + e.s, e.r ? b = Math.round(b) : f > b && b > -f && (b = 0), e.type) if (1 === e.type) if (d = e.l, 2 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2; else if (3 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3; else if (4 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4; else if (5 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5; else { for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++)c += e["xn" + d] + e["xs" + (d + 1)]; e.t[e.p] = c } else -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a); else e.t[e.p] = b + e.xs0; e = e._next } else for (; e;)2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a), e = e._next; else for (; e;) { if (2 !== e.type) if (e.r && -1 !== e.type) if (b = Math.round(e.s + e.c), e.type) { if (1 === e.type) { for (d = e.l, c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++)c += e["xn" + d] + e["xs" + (d + 1)]; e.t[e.p] = c } } else e.t[e.p] = b + e.xs0; else e.t[e.p] = e.e; else e.setRatio(a); e = e._next } }, j._enableTransforms = function (a) { this._transform = this._transform || Ra(this._target, e, !0), this._transformType = this._transform.svg && Aa || !a && 3 !== this._transformType ? 2 : 3 }; var Ya = function (a) { this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0) }; j._addLazySet = function (a, b, c) { var d = this._firstPT = new ta(a, b, 0, 0, this._firstPT, 2); d.e = c, d.setRatio = Ya, d.data = this }, j._linkCSSP = function (a, b, c, d) { return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a }, j._mod = function (a) { for (var b = this._firstPT; b;)"function" == typeof a[b.p] && a[b.p] === Math.round && (b.r = 1), b = b._next }, j._kill = function (b) { var c, d, e, f = b; if (b.autoAlpha || b.alpha) { f = {}; for (d in b) f[d] = b[d]; f.opacity = 1, f.autoAlpha && (f.visibility = 1) } for (b.className && (c = this._classNamePT) && (e = c.xfirst, e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next), c._next && this._linkCSSP(c._next, c._next._next, e._prev), this._classNamePT = null), c = this._firstPT; c;)c.plugin && c.plugin !== d && c.plugin._kill && (c.plugin._kill(b), d = c.plugin), c = c._next; return a.prototype._kill.call(this, f) }; var Za = function (a, b, c) { var d, e, f, g; if (a.slice) for (e = a.length; --e > -1;)Za(a[e], b, c); else for (d = a.childNodes, e = d.length; --e > -1;)f = d[e], g = f.type, f.style && (b.push(ca(f)), c && c.push(f)), 1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Za(f, b, c) }; return g.cascadeTo = function (a, c, d) { var e, f, g, h, i = b.to(a, c, d), j = [i], k = [], l = [], m = [], n = b._internals.reservedProps; for (a = i._targets || i.target, Za(a, k, m), i.render(c, !0, !0), Za(a, l), i.render(0, !0, !0), i._enabled(!0), e = m.length; --e > -1;)if (f = da(m[e], k[e], l[e]), f.firstMPT) { f = f.difs; for (g in d) n[g] && (f[g] = d[g]); h = {}; for (g in f) h[g] = k[e][g]; j.push(b.fromTo(m[e], c, h, f)) } return j }, a.activate([g]), g
    }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (a) { "use strict"; var b = function () { return (_gsScope.GreenSockGlobals || _gsScope)[a] }; "function" == typeof define && define.amd ? define(["TweenLite"], b) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = b()) }("CSSPlugin");

/* SPLIT TEXT UTIL */
/*!
 * VERSION: 0.5.6
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window; !function (a) { "use strict"; var b = a.GreenSockGlobals || a, c = function (a) { var c, d = a.split("."), e = b; for (c = 0; c < d.length; c++)e[d[c]] = e = e[d[c]] || {}; return e }, d = c("com.greensock.utils"), e = function (a) { var b = a.nodeType, c = ""; if (1 === b || 9 === b || 11 === b) { if ("string" == typeof a.textContent) return a.textContent; for (a = a.firstChild; a; a = a.nextSibling)c += e(a) } else if (3 === b || 4 === b) return a.nodeValue; return c }, f = document, g = f.defaultView ? f.defaultView.getComputedStyle : function () { }, h = /([A-Z])/g, i = function (a, b, c, d) { var e; return (c = c || g(a, null)) ? (a = c.getPropertyValue(b.replace(h, "-$1").toLowerCase()), e = a || c.length ? a : c[b]) : a.currentStyle && (c = a.currentStyle, e = c[b]), d ? e : parseInt(e, 10) || 0 }, j = function (a) { return a.length && a[0] && (a[0].nodeType && a[0].style && !a.nodeType || a[0].length && a[0][0]) ? !0 : !1 }, k = function (a) { var b, c, d, e = [], f = a.length; for (b = 0; f > b; b++)if (c = a[b], j(c)) for (d = c.length, d = 0; d < c.length; d++)e.push(c[d]); else e.push(c); return e }, l = /(?:\r|\n|\t\t)/g, m = /(?:\s\s+)/g, n = 55296, o = 56319, p = 56320, q = 127462, r = 127487, s = 127995, t = 127999, u = function (a) { return (a.charCodeAt(0) - n << 10) + (a.charCodeAt(1) - p) + 65536 }, v = f.all && !f.addEventListener, w = " style='position:relative;display:inline-block;" + (v ? "*display:inline;*zoom:1;'" : "'"), x = function (a, b) { a = a || ""; var c = -1 !== a.indexOf("++"), d = 1; return c && (a = a.split("++").join("")), function () { return "<" + b + w + (a ? " class='" + a + (c ? d++ : "") + "'>" : ">") } }, y = d.SplitText = b.SplitText = function (a, b) { if ("string" == typeof a && (a = y.selector(a)), !a) throw "cannot split a null element."; this.elements = j(a) ? k(a) : [a], this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = b || {}, this.split(b) }, z = function (a, b, c) { var d = a.nodeType; if (1 === d || 9 === d || 11 === d) for (a = a.firstChild; a; a = a.nextSibling)z(a, b, c); else (3 === d || 4 === d) && (a.nodeValue = a.nodeValue.split(b).join(c)) }, A = function (a, b) { for (var c = b.length; --c > -1;)a.push(b[c]) }, B = function (a) { var b, c = [], d = a.length; for (b = 0; b !== d; c.push(a[b++])); return c }, C = function (a, b, c) { for (var d; a && a !== b;) { if (d = a._next || a.nextSibling) return d.textContent.charAt(0) === c; a = a.parentNode || a._parent } return !1 }, D = function (a) { var b, c, d = B(a.childNodes), e = d.length; for (b = 0; e > b; b++)c = d[b], c._isSplit ? D(c) : (b && 3 === c.previousSibling.nodeType ? c.previousSibling.nodeValue += 3 === c.nodeType ? c.nodeValue : c.firstChild.nodeValue : 3 !== c.nodeType && a.insertBefore(c.firstChild, c), a.removeChild(c)) }, E = function (a, b, c, d, e, h, j) { var k, l, m, n, o, p, q, r, s, t, u, v, w = g(a), x = i(a, "paddingLeft", w), y = -999, B = i(a, "borderBottomWidth", w) + i(a, "borderTopWidth", w), E = i(a, "borderLeftWidth", w) + i(a, "borderRightWidth", w), F = i(a, "paddingTop", w) + i(a, "paddingBottom", w), G = i(a, "paddingLeft", w) + i(a, "paddingRight", w), H = .2 * i(a, "fontSize"), I = i(a, "textAlign", w, !0), J = [], K = [], L = [], M = b.wordDelimiter || " ", N = b.span ? "span" : "div", O = b.type || b.split || "chars,words,lines", P = e && -1 !== O.indexOf("lines") ? [] : null, Q = -1 !== O.indexOf("words"), R = -1 !== O.indexOf("chars"), S = "absolute" === b.position || b.absolute === !0, T = b.linesClass, U = -1 !== (T || "").indexOf("++"), V = []; for (P && 1 === a.children.length && a.children[0]._isSplit && (a = a.children[0]), U && (T = T.split("++").join("")), l = a.getElementsByTagName("*"), m = l.length, o = [], k = 0; m > k; k++)o[k] = l[k]; if (P || S) for (k = 0; m > k; k++)n = o[k], p = n.parentNode === a, (p || S || R && !Q) && (v = n.offsetTop, P && p && Math.abs(v - y) > H && "BR" !== n.nodeName && (q = [], P.push(q), y = v), S && (n._x = n.offsetLeft, n._y = v, n._w = n.offsetWidth, n._h = n.offsetHeight), P && ((n._isSplit && p || !R && p || Q && p || !Q && n.parentNode.parentNode === a && !n.parentNode._isSplit) && (q.push(n), n._x -= x, C(n, a, M) && (n._wordEnd = !0)), "BR" === n.nodeName && n.nextSibling && "BR" === n.nextSibling.nodeName && P.push([]))); for (k = 0; m > k; k++)n = o[k], p = n.parentNode === a, "BR" !== n.nodeName ? (S && (s = n.style, Q || p || (n._x += n.parentNode._x, n._y += n.parentNode._y), s.left = n._x + "px", s.top = n._y + "px", s.position = "absolute", s.display = "block", s.width = n._w + 1 + "px", s.height = n._h + "px"), !Q && R ? n._isSplit ? (n._next = n.nextSibling, n.parentNode.appendChild(n)) : n.parentNode._isSplit ? (n._parent = n.parentNode, !n.previousSibling && n.firstChild && (n.firstChild._isFirst = !0), n.nextSibling && " " === n.nextSibling.textContent && !n.nextSibling.nextSibling && V.push(n.nextSibling), n._next = n.nextSibling && n.nextSibling._isFirst ? null : n.nextSibling, n.parentNode.removeChild(n), o.splice(k--, 1), m--) : p || (v = !n.nextSibling && C(n.parentNode, a, M), n.parentNode._parent && n.parentNode._parent.appendChild(n), v && n.parentNode.appendChild(f.createTextNode(" ")), b.span && (n.style.display = "inline"), J.push(n)) : n.parentNode._isSplit && !n._isSplit && "" !== n.innerHTML ? K.push(n) : R && !n._isSplit && (b.span && (n.style.display = "inline"), J.push(n))) : P || S ? (n.parentNode && n.parentNode.removeChild(n), o.splice(k--, 1), m--) : Q || a.appendChild(n); for (k = V.length; --k > -1;)V[k].parentNode.removeChild(V[k]); if (P) { for (S && (t = f.createElement(N), a.appendChild(t), u = t.offsetWidth + "px", v = t.offsetParent === a ? 0 : a.offsetLeft, a.removeChild(t)), s = a.style.cssText, a.style.cssText = "display:none;"; a.firstChild;)a.removeChild(a.firstChild); for (r = " " === M && (!S || !Q && !R), k = 0; k < P.length; k++) { for (q = P[k], t = f.createElement(N), t.style.cssText = "display:block;text-align:" + I + ";position:" + (S ? "absolute;" : "relative;"), T && (t.className = T + (U ? k + 1 : "")), L.push(t), m = q.length, l = 0; m > l; l++)"BR" !== q[l].nodeName && (n = q[l], t.appendChild(n), r && n._wordEnd && t.appendChild(f.createTextNode(" ")), S && (0 === l && (t.style.top = n._y + "px", t.style.left = x + v + "px"), n.style.top = "0px", v && (n.style.left = n._x - v + "px"))); 0 === m ? t.innerHTML = "&nbsp;" : Q || R || (D(t), z(t, String.fromCharCode(160), " ")), S && (t.style.width = u, t.style.height = n._h + "px"), a.appendChild(t) } a.style.cssText = s } S && (j > a.clientHeight && (a.style.height = j - F + "px", a.clientHeight < j && (a.style.height = j + B + "px")), h > a.clientWidth && (a.style.width = h - G + "px", a.clientWidth < h && (a.style.width = h + E + "px"))), A(c, J), A(d, K), A(e, L) }, F = function (a, b, c, d) { var g, h, i, j, k, p, v, w, x, y = b.span ? "span" : "div", A = b.type || b.split || "chars,words,lines", B = (-1 !== A.indexOf("words"), -1 !== A.indexOf("chars")), C = "absolute" === b.position || b.absolute === !0, D = b.wordDelimiter || " ", E = " " !== D ? "" : C ? "&#173; " : " ", F = b.span ? "</span>" : "</div>", G = !0, H = f.createElement("div"), I = a.parentNode; for (I.insertBefore(H, a), H.textContent = a.nodeValue, I.removeChild(a), a = H, g = e(a), v = -1 !== g.indexOf("<"), b.reduceWhiteSpace !== !1 && (g = g.replace(m, " ").replace(l, "")), v && (g = g.split("<").join("{{LT}}")), k = g.length, h = (" " === g.charAt(0) ? E : "") + c(), i = 0; k > i; i++)if (p = g.charAt(i), p === D && g.charAt(i - 1) !== D && i) { for (h += G ? F : "", G = !1; g.charAt(i + 1) === D;)h += E, i++; i === k - 1 ? h += E : ")" !== g.charAt(i + 1) && (h += E + c(), G = !0) } else "{" === p && "{{LT}}" === g.substr(i, 6) ? (h += B ? d() + "{{LT}}</" + y + ">" : "{{LT}}", i += 5) : p.charCodeAt(0) >= n && p.charCodeAt(0) <= o || g.charCodeAt(i + 1) >= 65024 && g.charCodeAt(i + 1) <= 65039 ? (w = u(g.substr(i, 2)), x = u(g.substr(i + 2, 2)), j = w >= q && r >= w && x >= q && r >= x || x >= s && t >= x ? 4 : 2, h += B && " " !== p ? d() + g.substr(i, j) + "</" + y + ">" : g.substr(i, j), i += j - 1) : h += B && " " !== p ? d() + p + "</" + y + ">" : p; a.outerHTML = h + (G ? F : ""), v && z(I, "{{LT}}", "<") }, G = function (a, b, c, d) { var e, f, g = B(a.childNodes), h = g.length, j = "absolute" === b.position || b.absolute === !0; if (3 !== a.nodeType || h > 1) { for (b.absolute = !1, e = 0; h > e; e++)f = g[e], (3 !== f.nodeType || /\S+/.test(f.nodeValue)) && (j && 3 !== f.nodeType && "inline" === i(f, "display", null, !0) && (f.style.display = "inline-block", f.style.position = "relative"), f._isSplit = !0, G(f, b, c, d)); return b.absolute = j, void (a._isSplit = !0) } F(a, b, c, d) }, H = y.prototype; H.split = function (a) { this.isSplit && this.revert(), this.vars = a = a || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0; for (var b, c, d, e = this.elements.length, f = a.span ? "span" : "div", g = ("absolute" === a.position || a.absolute === !0, x(a.wordsClass, f)), h = x(a.charsClass, f); --e > -1;)d = this.elements[e], this._originals[e] = d.innerHTML, b = d.clientHeight, c = d.clientWidth, G(d, a, g, h), E(d, a, this.chars, this.words, this.lines, c, b); return this.chars.reverse(), this.words.reverse(), this.lines.reverse(), this.isSplit = !0, this }, H.revert = function () { if (!this._originals) throw "revert() call wasn't scoped properly."; for (var a = this._originals.length; --a > -1;)this.elements[a].innerHTML = this._originals[a]; return this.chars = [], this.words = [], this.lines = [], this.isSplit = !1, this }, y.selector = a.$ || a.jQuery || function (b) { var c = a.$ || a.jQuery; return c ? (y.selector = c, c(b)) : "undefined" == typeof document ? b : document.querySelectorAll ? document.querySelectorAll(b) : document.getElementById("#" === b.charAt(0) ? b.substr(1) : b) }, y.version = "0.5.6" }(_gsScope), function (a) { "use strict"; var b = function () { return (_gsScope.GreenSockGlobals || _gsScope)[a] }; "function" == typeof define && define.amd ? define([], b) : "undefined" != typeof module && module.exports && (module.exports = b()) }("SplitText");

try {
    window.GreenSockGlobals = null;
    window._gsQueue = null;
    window._gsDefine = null;

    delete (window.GreenSockGlobals);
    delete (window._gsQueue);
    delete (window._gsDefine);
} catch (e) { }

try {
    window.GreenSockGlobals = oldgs;
    window._gsQueue = oldgs_queue;
} catch (e) { }

if (window.tplogs == true)
    try {
        console.groupEnd();
    } catch (e) { }

(function (e, t) {
    e.waitForImages = { hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage"] }; e.expr[":"].uncached = function (t) { var n = document.createElement("img"); n.src = t.src; return e(t).is('img[src!=""]') && !n.complete }; e.fn.waitForImages = function (t, n, r) { if (e.isPlainObject(arguments[0])) { n = t.each; r = t.waitForAll; t = t.finished } t = t || e.noop; n = n || e.noop; r = !!r; if (!e.isFunction(t) || !e.isFunction(n)) { throw new TypeError("An invalid callback was supplied.") } return this.each(function () { var i = e(this), s = []; if (r) { var o = e.waitForImages.hasImageProperties || [], u = /url\((['"]?)(.*?)\1\)/g; i.find("*").each(function () { var t = e(this); if (t.is("img:uncached")) { s.push({ src: t.attr("src"), element: t[0] }) } e.each(o, function (e, n) { var r = t.css(n); if (!r) { return true } var i; while (i = u.exec(r)) { s.push({ src: i[2], element: t[0] }) } }) }) } else { i.find("img:uncached").each(function () { s.push({ src: this.src, element: this }) }) } var f = s.length, l = 0; if (f == 0) { t.call(i[0]) } e.each(s, function (r, s) { var o = new Image; e(o).bind("load error", function (e) { l++; n.call(s.element, l, f, e.type == "load"); if (l == f) { t.call(i[0]); return false } }); o.src = s.src }) }) };
})(jQuery);

/**************************************************************************
 * jquery.themepunch.revolution.js - jQuery Plugin for Revolution Slider
 * @version: 5.4.8 (10.06.2018)
 * @requires jQuery v1.7 or later (tested on 1.9)
 * @author ThemePunch
**************************************************************************/
!function (jQuery, undefined) { "use strict"; var version = { core: "5.4.8", "revolution.extensions.actions.min.js": "2.1.0", "revolution.extensions.carousel.min.js": "1.2.1", "revolution.extensions.kenburn.min.js": "1.3.1", "revolution.extensions.layeranimation.min.js": "3.6.5", "revolution.extensions.navigation.min.js": "1.3.5", "revolution.extensions.parallax.min.js": "2.2.3", "revolution.extensions.slideanims.min.js": "1.8", "revolution.extensions.video.min.js": "2.2.2" }; jQuery.fn.extend({ revolution: function (i) { var e = { delay: 9e3, responsiveLevels: 4064, visibilityLevels: [2048, 1024, 778, 480], gridwidth: 960, gridheight: 500, minHeight: 0, autoHeight: "off", sliderType: "standard", sliderLayout: "auto", fullScreenAutoWidth: "off", fullScreenAlignForce: "off", fullScreenOffsetContainer: "", fullScreenOffset: "0", hideCaptionAtLimit: 0, hideAllCaptionAtLimit: 0, hideSliderAtLimit: 0, disableProgressBar: "off", stopAtSlide: -1, stopAfterLoops: -1, shadow: 0, dottedOverlay: "none", startDelay: 0, lazyType: "smart", spinner: "spinner0", shuffle: "off", viewPort: { enable: !1, outof: "wait", visible_area: "60%", presize: !1 }, fallbacks: { isJoomla: !1, panZoomDisableOnMobile: "off", simplifyAll: "on", nextSlideOnWindowFocus: "off", disableFocusListener: !0, ignoreHeightChanges: "off", ignoreHeightChangesSize: 0, allowHTML5AutoPlayOnAndroid: !0 }, parallax: { type: "off", levels: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85], origo: "enterpoint", speed: 400, bgparallax: "off", opacity: "on", disable_onmobile: "off", ddd_shadow: "on", ddd_bgfreeze: "off", ddd_overflow: "visible", ddd_layer_overflow: "visible", ddd_z_correction: 65, ddd_path: "mouse" }, scrolleffect: { fade: "off", blur: "off", scale: "off", grayscale: "off", maxblur: 10, on_layers: "off", on_slidebg: "off", on_static_layers: "off", on_parallax_layers: "off", on_parallax_static_layers: "off", direction: "both", multiplicator: 1.35, multiplicator_layers: .5, tilt: 30, disable_on_mobile: "on" }, carousel: { easing: punchgs.Power3.easeInOut, speed: 800, showLayersAllTime: "off", horizontal_align: "center", vertical_align: "center", infinity: "on", space: 0, maxVisibleItems: 3, stretch: "off", fadeout: "on", maxRotation: 0, minScale: 0, vary_fade: "off", vary_rotation: "on", vary_scale: "off", border_radius: "0px", padding_top: 0, padding_bottom: 0 }, navigation: { keyboardNavigation: "off", keyboard_direction: "horizontal", mouseScrollNavigation: "off", onHoverStop: "on", touch: { touchenabled: "off", touchOnDesktop: "off", swipe_treshold: 75, swipe_min_touches: 1, drag_block_vertical: !1, swipe_direction: "horizontal" }, arrows: { style: "", enable: !1, hide_onmobile: !1, hide_onleave: !0, hide_delay: 200, hide_delay_mobile: 1200, hide_under: 0, hide_over: 9999, tmp: "", rtl: !1, left: { h_align: "left", v_align: "center", h_offset: 20, v_offset: 0, container: "slider" }, right: { h_align: "right", v_align: "center", h_offset: 20, v_offset: 0, container: "slider" } }, bullets: { container: "slider", rtl: !1, style: "", enable: !1, hide_onmobile: !1, hide_onleave: !0, hide_delay: 200, hide_delay_mobile: 1200, hide_under: 0, hide_over: 9999, direction: "horizontal", h_align: "left", v_align: "center", space: 0, h_offset: 20, v_offset: 0, tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-title"></span>' }, thumbnails: { container: "slider", rtl: !1, style: "", enable: !1, width: 100, height: 50, min_width: 100, wrapper_padding: 2, wrapper_color: "#f5f5f5", wrapper_opacity: 1, tmp: '<span class="tp-thumb-image"></span><span class="tp-thumb-title"></span>', visibleAmount: 5, hide_onmobile: !1, hide_onleave: !0, hide_delay: 200, hide_delay_mobile: 1200, hide_under: 0, hide_over: 9999, direction: "horizontal", span: !1, position: "inner", space: 2, h_align: "left", v_align: "center", h_offset: 20, v_offset: 0 }, tabs: { container: "slider", rtl: !1, style: "", enable: !1, width: 100, min_width: 100, height: 50, wrapper_padding: 10, wrapper_color: "#f5f5f5", wrapper_opacity: 1, tmp: '<span class="tp-tab-image"></span>', visibleAmount: 5, hide_onmobile: !1, hide_onleave: !0, hide_delay: 200, hide_delay_mobile: 1200, hide_under: 0, hide_over: 9999, direction: "horizontal", span: !1, space: 0, position: "inner", h_align: "left", v_align: "center", h_offset: 20, v_offset: 0 } }, extensions: "extensions/", extensions_suffix: ".min.js", debugMode: !1 }; return i = jQuery.extend(!0, {}, e, i), this.each(function () { var e = jQuery(this); i.minHeight = i.minHeight != undefined ? parseInt(i.minHeight, 0) : i.minHeight, i.scrolleffect.on = "on" === i.scrolleffect.fade || "on" === i.scrolleffect.scale || "on" === i.scrolleffect.blur || "on" === i.scrolleffect.grayscale, "hero" == i.sliderType && e.find(">ul>li").each(function (e) { 0 < e && jQuery(this).remove() }), i.jsFileLocation = i.jsFileLocation || getScriptLocation("themepunch.revolution.min.js"), i.jsFileLocation = i.jsFileLocation + i.extensions, i.scriptsneeded = getNeededScripts(i, e), i.curWinRange = 0, i.rtl = !0, i.navigation != undefined && i.navigation.touch != undefined && (i.navigation.touch.swipe_min_touches = 5 < i.navigation.touch.swipe_min_touches ? 1 : i.navigation.touch.swipe_min_touches), jQuery(this).on("scriptsloaded", function () { if (i.modulesfailing) return e.html('<div style="margin:auto;line-height:40px;font-size:14px;color:#fff;padding:15px;background:#e74c3c;margin:20px 0px;">!! Error at loading Slider Revolution 5.0 Extrensions.' + i.errorm + "</div>").show(), !1; _R.migration != undefined && (i = _R.migration(e, i)), punchgs.force3D = !0, "on" !== i.simplifyAll && punchgs.TweenLite.lagSmoothing(1e3, 16), prepareOptions(e, i), initSlider(e, i) }), e[0].opt = i, waitForScripts(e, i) }) }, getRSVersion: function (e) { if (!0 === e) return jQuery("body").data("tp_rs_version"); var i = jQuery("body").data("tp_rs_version"), t = ""; for (var a in t += "---------------------------------------------------------\n", t += "    Currently Loaded Slider Revolution & SR Modules :\n", t += "---------------------------------------------------------\n", i) t += i[a].alias + ": " + i[a].ver + "\n"; return t += "---------------------------------------------------------\n" }, revremoveslide: function (r) { return this.each(function () { var e = jQuery(this), i = e[0].opt; if (!(r < 0 || r > i.slideamount) && e != undefined && 0 < e.length && 0 < jQuery("body").find("#" + e.attr("id")).length && i && 0 < i.li.length && (0 < r || r <= i.li.length)) { var t = jQuery(i.li[r]), a = t.data("index"), n = !1; i.slideamount = i.slideamount - 1, i.realslideamount = i.realslideamount - 1, removeNavWithLiref(".tp-bullet", a, i), removeNavWithLiref(".tp-tab", a, i), removeNavWithLiref(".tp-thumb", a, i), t.hasClass("active-revslide") && (n = !0), t.remove(), i.li = removeArray(i.li, r), i.carousel && i.carousel.slides && (i.carousel.slides = removeArray(i.carousel.slides, r)), i.thumbs = removeArray(i.thumbs, r), _R.updateNavIndexes && _R.updateNavIndexes(i), n && e.revnext(), punchgs.TweenLite.set(i.li, { minWidth: "99%" }), punchgs.TweenLite.set(i.li, { minWidth: "100%" }) } }) }, revaddcallback: function (e) { return this.each(function () { this.opt && (this.opt.callBackArray === undefined && (this.opt.callBackArray = new Array), this.opt.callBackArray.push(e)) }) }, revgetparallaxproc: function () { return jQuery(this)[0].opt.scrollproc }, revdebugmode: function () { return this.each(function () { var e = jQuery(this); e[0].opt.debugMode = !0, containerResized(e, e[0].opt) }) }, revscroll: function (i) { return this.each(function () { var e = jQuery(this); jQuery("body,html").animate({ scrollTop: e.offset().top + e.height() - i + "px" }, { duration: 400 }) }) }, revredraw: function (e) { return this.each(function () { var e = jQuery(this); containerResized(e, e[0].opt) }) }, revkill: function (e) { var i = this, t = jQuery(this); if (punchgs.TweenLite.killDelayedCallsTo(_R.showHideNavElements), t != undefined && 0 < t.length && 0 < jQuery("body").find("#" + t.attr("id")).length) { t.data("conthover", 1), t.data("conthover-changed", 1), t.trigger("revolution.slide.onpause"); var a = t.parent().find(".tp-bannertimer"), n = t[0].opt; n.tonpause = !0, t.trigger("stoptimer"); var r = "resize.revslider-" + t.attr("id"); jQuery(window).unbind(r), punchgs.TweenLite.killTweensOf(t.find("*"), !1), punchgs.TweenLite.killTweensOf(t, !1), t.unbind("hover, mouseover, mouseenter,mouseleave, resize"); r = "resize.revslider-" + t.attr("id"); jQuery(window).off(r), t.find("*").each(function () { var e = jQuery(this); e.unbind("on, hover, mouseenter,mouseleave,mouseover, resize,restarttimer, stoptimer"), e.off("on, hover, mouseenter,mouseleave,mouseover, resize"), e.data("mySplitText", null), e.data("ctl", null), e.data("tween") != undefined && e.data("tween").kill(), e.data("kenburn") != undefined && e.data("kenburn").kill(), e.data("timeline_out") != undefined && e.data("timeline_out").kill(), e.data("timeline") != undefined && e.data("timeline").kill(), e.remove(), e.empty(), e = null }), punchgs.TweenLite.killTweensOf(t.find("*"), !1), punchgs.TweenLite.killTweensOf(t, !1), a.remove(); try { t.closest(".forcefullwidth_wrapper_tp_banner").remove() } catch (e) { } try { t.closest(".rev_slider_wrapper").remove() } catch (e) { } try { t.remove() } catch (e) { } return t.empty(), t.html(), n = t = null, delete i.c, delete i.opt, delete i.container, !0 } return !1 }, revpause: function () { return this.each(function () { var e = jQuery(this); e != undefined && 0 < e.length && 0 < jQuery("body").find("#" + e.attr("id")).length && (e.data("conthover", 1), e.data("conthover-changed", 1), e.trigger("revolution.slide.onpause"), e[0].opt.tonpause = !0, e.trigger("stoptimer")) }) }, revresume: function () { return this.each(function () { var e = jQuery(this); e != undefined && 0 < e.length && 0 < jQuery("body").find("#" + e.attr("id")).length && (e.data("conthover", 0), e.data("conthover-changed", 1), e.trigger("revolution.slide.onresume"), e[0].opt.tonpause = !1, e.trigger("starttimer")) }) }, revstart: function () { var e = jQuery(this); if (e != undefined && 0 < e.length && 0 < jQuery("body").find("#" + e.attr("id")).length && e[0].opt !== undefined) return e[0].opt.sliderisrunning ? (console.log("Slider Is Running Already"), !1) : ((e[0].opt.c = e)[0].opt.ul = e.find(">ul"), runSlider(e, e[0].opt), !0) }, revnext: function () { return this.each(function () { var e = jQuery(this); e != undefined && 0 < e.length && 0 < jQuery("body").find("#" + e.attr("id")).length && _R.callingNewSlide(e, 1) }) }, revprev: function () { return this.each(function () { var e = jQuery(this); e != undefined && 0 < e.length && 0 < jQuery("body").find("#" + e.attr("id")).length && _R.callingNewSlide(e, -1) }) }, revmaxslide: function () { return jQuery(this).find(".tp-revslider-mainul >li").length }, revcurrentslide: function () { var e = jQuery(this); if (e != undefined && 0 < e.length && 0 < jQuery("body").find("#" + e.attr("id")).length) return parseInt(e[0].opt.act, 0) + 1 }, revlastslide: function () { return jQuery(this).find(".tp-revslider-mainul >li").length }, revshowslide: function (i) { return this.each(function () { var e = jQuery(this); e != undefined && 0 < e.length && 0 < jQuery("body").find("#" + e.attr("id")).length && _R.callingNewSlide(e, "to" + (i - 1)) }) }, revcallslidewithid: function (i) { return this.each(function () { var e = jQuery(this); e != undefined && 0 < e.length && 0 < jQuery("body").find("#" + e.attr("id")).length && _R.callingNewSlide(e, i) }) } }); var _R = jQuery.fn.revolution; jQuery.extend(!0, _R, { getversion: function () { return version }, compare_version: function (e) { var i = jQuery("body").data("tp_rs_version"); return (i = i === undefined ? new Object : i).Core === undefined && (i.Core = new Object, i.Core.alias = "Slider Revolution Core", i.Core.name = "jquery.themepunch.revolution.min.js", i.Core.ver = _R.getversion().core), "stop" != e.check && (_R.getversion().core < e.min_core ? (e.check === undefined && (console.log("%cSlider Revolution Warning (Core:" + _R.getversion().core + ")", "color:#c0392b;font-weight:bold;"), console.log("%c     Core is older than expected (" + e.min_core + ") from " + e.alias, "color:#333"), console.log("%c     Please update Slider Revolution to the latest version.", "color:#333"), console.log("%c     It might be required to purge and clear Server/Client side Caches.", "color:#333")), e.check = "stop") : _R.getversion()[e.name] != undefined && e.version < _R.getversion()[e.name] && (e.check === undefined && (console.log("%cSlider Revolution Warning (Core:" + _R.getversion().core + ")", "color:#c0392b;font-weight:bold;"), console.log("%c     " + e.alias + " (" + e.version + ") is older than requiered (" + _R.getversion()[e.name] + ")", "color:#333"), console.log("%c     Please update Slider Revolution to the latest version.", "color:#333"), console.log("%c     It might be required to purge and clear Server/Client side Caches.", "color:#333")), e.check = "stop")), i[e.alias] === undefined && (i[e.alias] = new Object, i[e.alias].alias = e.alias, i[e.alias].ver = e.version, i[e.alias].name = e.name), jQuery("body").data("tp_rs_version", i), e }, currentSlideIndex: function (e) { var i = e.c.find(".active-revslide").index(); return i = -1 == i ? 0 : i }, simp: function (e, i, t) { var a = Math.abs(e) - Math.floor(Math.abs(e / i)) * i; return t ? a : e < 0 ? -1 * a : a }, iOSVersion: function () { var e = !1; return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) ? navigator.userAgent.match(/OS 4_\d like Mac OS X/i) && (e = !0) : e = !1, e }, isIE: function (e, i) { var t = jQuery('<div style="display:none;"/>').appendTo(jQuery("body")); t.html("\x3c!--[if " + (i || "") + " IE " + (e || "") + "]><a>&nbsp;</a><![endif]--\x3e"); var a = t.find("a").length; return t.remove(), a }, is_mobile: function () { var e = ["android", "webos", "iphone", "ipad", "blackberry", "Android", "webos", , "iPod", "iPhone", "iPad", "Blackberry", "BlackBerry"], i = !1; for (var t in e) 1 < navigator.userAgent.split(e[t]).length && (i = !0); return i }, is_android: function () { var e = ["android", "Android"], i = !1; for (var t in e) 1 < navigator.userAgent.split(e[t]).length && (i = !0); return i }, callBackHandling: function (e, t, a) { try { e.callBackArray && jQuery.each(e.callBackArray, function (e, i) { i && i.inmodule && i.inmodule === t && i.atposition && i.atposition === a && i.callback && i.callback.call() }) } catch (e) { console.log("Call Back Failed") } }, get_browser: function () { var e, i = navigator.appName, t = navigator.userAgent, a = t.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i); return a && null != (e = t.match(/version\/([\.\d]+)/i)) && (a[2] = e[1]), (a = a ? [a[1], a[2]] : [i, navigator.appVersion, "-?"])[0] }, get_browser_version: function () { var e, i = navigator.appName, t = navigator.userAgent, a = t.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i); return a && null != (e = t.match(/version\/([\.\d]+)/i)) && (a[2] = e[1]), (a = a ? [a[1], a[2]] : [i, navigator.appVersion, "-?"])[1] }, isSafari11: function () { var e = jQuery.trim(_R.get_browser().toLowerCase()); return -1 === jQuery.trim(navigator.userAgent.toLowerCase()).search("edge") && "msie" !== e && e.match(/safari|chrome/) }, getHorizontalOffset: function (e, i) { var t = gWiderOut(e, ".outer-left"), a = gWiderOut(e, ".outer-right"); switch (i) { case "left": return t; case "right": return a; case "both": return t + a } }, callingNewSlide: function (e, i) { var t = 0 < e.find(".next-revslide").length ? e.find(".next-revslide").index() : 0 < e.find(".processing-revslide").length ? e.find(".processing-revslide").index() : e.find(".active-revslide").index(), a = 0, n = e[0].opt; e.find(".next-revslide").removeClass("next-revslide"), e.find(".active-revslide").hasClass("tp-invisible-slide") && (t = n.last_shown_slide), i && jQuery.isNumeric(i) || i.match(/to/g) ? (a = 1 === i || -1 === i ? (a = t + i) < 0 ? n.slideamount - 1 : a >= n.slideamount ? 0 : a : (i = jQuery.isNumeric(i) ? i : parseInt(i.split("to")[1], 0)) < 0 ? 0 : i > n.slideamount - 1 ? n.slideamount - 1 : i, e.find(".tp-revslider-slidesli:eq(" + a + ")").addClass("next-revslide")) : i && e.find(".tp-revslider-slidesli").each(function () { var e = jQuery(this); e.data("index") === i && e.addClass("next-revslide") }), a = e.find(".next-revslide").index(), e.trigger("revolution.nextslide.waiting"), t === a && t === n.last_shown_slide || a !== t && -1 != a ? swapSlide(e) : e.find(".next-revslide").removeClass("next-revslide") }, slotSize: function (e, i) { i.slotw = Math.ceil(i.width / i.slots), "fullscreen" == i.sliderLayout ? i.sloth = Math.ceil(jQuery(window).height() / i.slots) : i.sloth = Math.ceil(i.height / i.slots), "on" == i.autoHeight && e !== undefined && "" !== e && (i.sloth = Math.ceil(e.height() / i.slots)) }, setSize: function (e) { var i = (e.top_outer || 0) + (e.bottom_outer || 0), t = parseInt(e.carousel.padding_top || 0, 0), a = parseInt(e.carousel.padding_bottom || 0, 0), n = e.gridheight[e.curWinRange], r = 0, o = -1 === e.nextSlide || e.nextSlide === undefined ? 0 : e.nextSlide; if (e.paddings = e.paddings === undefined ? { top: parseInt(e.c.parent().css("paddingTop"), 0) || 0, bottom: parseInt(e.c.parent().css("paddingBottom"), 0) || 0 } : e.paddings, e.rowzones && 0 < e.rowzones.length) for (var s = 0; s < e.rowzones[o].length; s++)r += e.rowzones[o][s][0].offsetHeight; if (n = (n = n < e.minHeight ? e.minHeight : n) < r ? r : n, "fullwidth" == e.sliderLayout && "off" == e.autoHeight && punchgs.TweenLite.set(e.c, { maxHeight: n + "px" }), e.c.css({ marginTop: t, marginBottom: a }), e.width = e.ul.width(), e.height = e.ul.height(), setScale(e), e.height = Math.round(e.gridheight[e.curWinRange] * (e.width / e.gridwidth[e.curWinRange])), e.height > e.gridheight[e.curWinRange] && "on" != e.autoHeight && (e.height = e.gridheight[e.curWinRange]), "fullscreen" == e.sliderLayout || e.infullscreenmode) { e.height = e.bw * e.gridheight[e.curWinRange]; e.c.parent().width(); var l = jQuery(window).height(); if (e.fullScreenOffsetContainer != undefined) { try { var d = e.fullScreenOffsetContainer.split(","); d && jQuery.each(d, function (e, i) { l = 0 < jQuery(i).length ? l - jQuery(i).outerHeight(!0) : l }) } catch (e) { } try { 1 < e.fullScreenOffset.split("%").length && e.fullScreenOffset != undefined && 0 < e.fullScreenOffset.length ? l -= jQuery(window).height() * parseInt(e.fullScreenOffset, 0) / 100 : e.fullScreenOffset != undefined && 0 < e.fullScreenOffset.length && (l -= parseInt(e.fullScreenOffset, 0)) } catch (e) { } } l = l < e.minHeight ? e.minHeight : l, l -= i, e.c.parent().height(l), e.c.closest(".rev_slider_wrapper").height(l), e.c.css({ height: "100%" }), e.height = l, e.minHeight != undefined && e.height < e.minHeight && (e.height = e.minHeight), e.height = parseInt(r, 0) > parseInt(e.height, 0) ? r : e.height } else e.minHeight != undefined && e.height < e.minHeight && (e.height = e.minHeight), e.height = parseInt(r, 0) > parseInt(e.height, 0) ? r : e.height, e.c.height(e.height); var c = { height: t + a + i + e.height + e.paddings.top + e.paddings.bottom }; e.c.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").css(c), e.c.closest(".rev_slider_wrapper").css(c), setScale(e) }, enterInViewPort: function (t) { t.waitForCountDown && (countDown(t.c, t), t.waitForCountDown = !1), t.waitForFirstSlide && (swapSlide(t.c), t.waitForFirstSlide = !1, setTimeout(function () { t.c.removeClass("tp-waitforfirststart") }, 500)), "playing" != t.sliderlaststatus && t.sliderlaststatus != undefined || t.c.trigger("starttimer"), t.lastplayedvideos != undefined && 0 < t.lastplayedvideos.length && jQuery.each(t.lastplayedvideos, function (e, i) { _R.playVideo(i, t) }) }, leaveViewPort: function (t) { t.sliderlaststatus = t.sliderstatus, t.c.trigger("stoptimer"), t.playingvideos != undefined && 0 < t.playingvideos.length && (t.lastplayedvideos = jQuery.extend(!0, [], t.playingvideos), t.playingvideos && jQuery.each(t.playingvideos, function (e, i) { t.leaveViewPortBasedStop = !0, _R.stopVideo && _R.stopVideo(i, t) })) }, unToggleState: function (e) { e != undefined && 0 < e.length && jQuery.each(e, function (e, i) { i.removeClass("rs-toggle-content-active") }) }, toggleState: function (e) { e != undefined && 0 < e.length && jQuery.each(e, function (e, i) { i.addClass("rs-toggle-content-active") }) }, swaptoggleState: function (e) { e != undefined && 0 < e.length && jQuery.each(e, function (e, i) { jQuery(i).hasClass("rs-toggle-content-active") ? jQuery(i).removeClass("rs-toggle-content-active") : jQuery(i).addClass("rs-toggle-content-active") }) }, lastToggleState: function (e) { var t = 0; return e != undefined && 0 < e.length && jQuery.each(e, function (e, i) { t = i.hasClass("rs-toggle-content-active") }), t } }); var _ISM = _R.is_mobile(), _ANDROID = _R.is_android(), checkIDS = function (e, i) { if (e.anyid = e.anyid === undefined ? [] : e.anyid, -1 != jQuery.inArray(i.attr("id"), e.anyid)) { var t = i.attr("id") + "_" + Math.round(9999 * Math.random()); i.attr("id", t) } e.anyid.push(i.attr("id")) }, removeArray = function (e, t) { var a = []; return jQuery.each(e, function (e, i) { e != t && a.push(i) }), a }, removeNavWithLiref = function (e, i, t) { t.c.find(e).each(function () { var e = jQuery(this); e.data("liref") === i && e.remove() }) }, lAjax = function (i, t) { return !jQuery("body").data(i) && (t.filesystem ? (t.errorm === undefined && (t.errorm = "<br>Local Filesystem Detected !<br>Put this to your header:"), console.warn("Local Filesystem detected !"), t.errorm = t.errorm + '<br>&lt;script type="text/javascript" src="' + t.jsFileLocation + i + t.extensions_suffix + '"&gt;&lt;/script&gt;', console.warn(t.jsFileLocation + i + t.extensions_suffix + " could not be loaded !"), console.warn("Please use a local Server or work online or make sure that you load all needed Libraries manually in your Document."), console.log(" "), !(t.modulesfailing = !0)) : (jQuery.ajax({ url: t.jsFileLocation + i + t.extensions_suffix + "?version=" + version.core, dataType: "script", cache: !0, error: function (e) { console.warn("Slider Revolution 5.0 Error !"), console.error("Failure at Loading:" + i + t.extensions_suffix + " on Path:" + t.jsFileLocation), console.info(e) } }), void jQuery("body").data(i, !0))) }, getNeededScripts = function (t, e) { var i = new Object, a = t.navigation; return i.kenburns = !1, i.parallax = !1, i.carousel = !1, i.navigation = !1, i.videos = !1, i.actions = !1, i.layeranim = !1, i.migration = !1, e.data("version") && e.data("version").toString().match(/5./gi) ? (e.find("img").each(function () { "on" == jQuery(this).data("kenburns") && (i.kenburns = !0) }), ("carousel" == t.sliderType || "on" == a.keyboardNavigation || "on" == a.mouseScrollNavigation || "on" == a.touch.touchenabled || a.arrows.enable || a.bullets.enable || a.thumbnails.enable || a.tabs.enable) && (i.navigation = !0), e.find(".tp-caption, .tp-static-layer, .rs-background-video-layer").each(function () { var e = jQuery(this); (e.data("ytid") != undefined || 0 < e.find("iframe").length && 0 < e.find("iframe").attr("src").toLowerCase().indexOf("youtube")) && (i.videos = !0), (e.data("vimeoid") != undefined || 0 < e.find("iframe").length && 0 < e.find("iframe").attr("src").toLowerCase().indexOf("vimeo")) && (i.videos = !0), e.data("actions") !== undefined && (i.actions = !0), i.layeranim = !0 }), e.find("li").each(function () { jQuery(this).data("link") && jQuery(this).data("link") != undefined && (i.layeranim = !0, i.actions = !0) }), !i.videos && (0 < e.find(".rs-background-video-layer").length || 0 < e.find(".tp-videolayer").length || 0 < e.find(".tp-audiolayer").length || 0 < e.find("iframe").length || 0 < e.find("video").length) && (i.videos = !0), "carousel" == t.sliderType && (i.carousel = !0), ("off" !== t.parallax.type || t.viewPort.enable || "true" == t.viewPort.enable || "true" === t.scrolleffect.on || t.scrolleffect.on) && (i.parallax = !0)) : (i.kenburns = !0, i.parallax = !0, i.carousel = !1, i.navigation = !0, i.videos = !0, i.actions = !0, i.layeranim = !0, i.migration = !0), "hero" == t.sliderType && (i.carousel = !1, i.navigation = !1), window.location.href.match(/file:/gi) && (i.filesystem = !0, t.filesystem = !0), i.videos && void 0 === _R.isVideoPlaying && lAjax("revolution.extension.video", t), i.carousel && void 0 === _R.prepareCarousel && lAjax("revolution.extension.carousel", t), i.carousel || void 0 !== _R.animateSlide || lAjax("revolution.extension.slideanims", t), i.actions && void 0 === _R.checkActions && lAjax("revolution.extension.actions", t), i.layeranim && void 0 === _R.handleStaticLayers && lAjax("revolution.extension.layeranimation", t), i.kenburns && void 0 === _R.stopKenBurn && lAjax("revolution.extension.kenburn", t), i.navigation && void 0 === _R.createNavigation && lAjax("revolution.extension.navigation", t), i.migration && void 0 === _R.migration && lAjax("revolution.extension.migration", t), i.parallax && void 0 === _R.checkForParallax && lAjax("revolution.extension.parallax", t), t.addons != undefined && 0 < t.addons.length && jQuery.each(t.addons, function (e, i) { "object" == typeof i && i.fileprefix != undefined && lAjax(i.fileprefix, t) }), i }, waitForScripts = function (e, i) { var t = !0, a = i.scriptsneeded; i.addons != undefined && 0 < i.addons.length && jQuery.each(i.addons, function (e, i) { "object" == typeof i && i.init != undefined && _R[i.init] === undefined && (t = !1) }), a.filesystem || "undefined" != typeof punchgs && t && (!a.kenburns || a.kenburns && void 0 !== _R.stopKenBurn) && (!a.navigation || a.navigation && void 0 !== _R.createNavigation) && (!a.carousel || a.carousel && void 0 !== _R.prepareCarousel) && (!a.videos || a.videos && void 0 !== _R.resetVideo) && (!a.actions || a.actions && void 0 !== _R.checkActions) && (!a.layeranim || a.layeranim && void 0 !== _R.handleStaticLayers) && (!a.migration || a.migration && void 0 !== _R.migration) && (!a.parallax || a.parallax && void 0 !== _R.checkForParallax) && (a.carousel || !a.carousel && void 0 !== _R.animateSlide) ? e.trigger("scriptsloaded") : setTimeout(function () { waitForScripts(e, i) }, 50) }, getScriptLocation = function (e) { var i = new RegExp("themepunch.revolution.min.js", "gi"), t = ""; return jQuery("script").each(function () { var e = jQuery(this).attr("src"); e && e.match(i) && (t = e) }), t = (t = (t = t.replace("jquery.themepunch.revolution.min.js", "")).replace("jquery.themepunch.revolution.js", "")).split("?")[0] }, setCurWinRange = function (e, i) { var t = 9999, a = 0, n = 0, r = 0, o = jQuery(window).width(), s = i && 9999 == e.responsiveLevels ? e.visibilityLevels : e.responsiveLevels; s && s.length && jQuery.each(s, function (e, i) { o < i && (0 == a || i < a) && (r = e, a = t = i), i < o && a < i && (a = i, n = e) }), a < t && (r = n), i ? e.forcedWinRange = r : e.curWinRange = r }, prepareOptions = function (e, i) { i.carousel.maxVisibleItems = i.carousel.maxVisibleItems < 1 ? 999 : i.carousel.maxVisibleItems, i.carousel.vertical_align = "top" === i.carousel.vertical_align ? "0%" : "bottom" === i.carousel.vertical_align ? "100%" : "50%" }, gWiderOut = function (e, i) { var t = 0; return e.find(i).each(function () { var e = jQuery(this); !e.hasClass("tp-forcenotvisible") && t < e.outerWidth() && (t = e.outerWidth()) }), t }, initSlider = function (container, opt) { if (container == undefined) return !1; container.data("aimg") != undefined && ("enabled" == container.data("aie8") && _R.isIE(8) || "enabled" == container.data("amobile") && _ISM) && container.html('<img class="tp-slider-alternative-image" src="' + container.data("aimg") + '">'), container.find(">ul").addClass("tp-revslider-mainul"), opt.c = container, opt.ul = container.find(".tp-revslider-mainul"), opt.ul.find(">li").each(function (e) { var i = jQuery(this); "on" == i.data("hideslideonmobile") && _ISM && i.remove(), (i.data("invisible") || !0 === i.data("invisible")) && (i.addClass("tp-invisible-slide"), i.appendTo(opt.ul)) }), opt.addons != undefined && 0 < opt.addons.length && jQuery.each(opt.addons, function (i, obj) { "object" == typeof obj && obj.init != undefined && _R[obj.init](eval(obj.params)) }), opt.cid = container.attr("id"), opt.ul.css({ visibility: "visible" }), opt.slideamount = opt.ul.find(">li").not(".tp-invisible-slide").length, opt.realslideamount = opt.ul.find(">li").length, opt.slayers = container.find(".tp-static-layers"), opt.slayers.data("index", "staticlayers"), 1 != opt.waitForInit && (container[0].opt = opt, runSlider(container, opt)) }, onFullScreenChange = function () { jQuery("body").data("rs-fullScreenMode", !jQuery("body").data("rs-fullScreenMode")), jQuery("body").data("rs-fullScreenMode") && setTimeout(function () { jQuery(window).trigger("resize") }, 200) }, runSlider = function (t, x) { if (x.sliderisrunning = !0, x.ul.find(">li").each(function (e) { jQuery(this).data("originalindex", e) }), x.allli = x.ul.find(">li"), jQuery.each(x.allli, function (e, i) { (i = jQuery(i)).data("origindex", i.index()) }), x.li = x.ul.find(">li").not(".tp-invisible-slide"), "on" == x.shuffle) { var e = new Object, i = x.ul.find(">li:first-child"); e.fstransition = i.data("fstransition"), e.fsmasterspeed = i.data("fsmasterspeed"), e.fsslotamount = i.data("fsslotamount"); for (var a = 0; a < x.slideamount; a++) { var n = Math.round(Math.random() * x.slideamount); x.ul.find(">li:eq(" + n + ")").prependTo(x.ul) } var r = x.ul.find(">li:first-child"); r.data("fstransition", e.fstransition), r.data("fsmasterspeed", e.fsmasterspeed), r.data("fsslotamount", e.fsslotamount), x.allli = x.ul.find(">li"), x.li = x.ul.find(">li").not(".tp-invisible-slide") } if (x.inli = x.ul.find(">li.tp-invisible-slide"), x.thumbs = new Array, x.slots = 4, x.act = -1, x.firststart = 1, x.loadqueue = new Array, x.syncload = 0, x.conw = t.width(), x.conh = t.height(), 1 < x.responsiveLevels.length ? x.responsiveLevels[0] = 9999 : x.responsiveLevels = 9999, jQuery.each(x.allli, function (e, i) { var t = (i = jQuery(i)).find(".rev-slidebg") || i.find("img").first(), a = 0; i.addClass("tp-revslider-slidesli"), i.data("index") === undefined && i.data("index", "rs-" + Math.round(999999 * Math.random())); var n = new Object; n.params = new Array, n.id = i.data("index"), n.src = i.data("thumb") !== undefined ? i.data("thumb") : t.data("lazyload") !== undefined ? t.data("lazyload") : t.attr("src"), i.data("title") !== undefined && n.params.push({ from: RegExp("\\{\\{title\\}\\}", "g"), to: i.data("title") }), i.data("description") !== undefined && n.params.push({ from: RegExp("\\{\\{description\\}\\}", "g"), to: i.data("description") }); for (a = 1; a <= 10; a++)i.data("param" + a) !== undefined && n.params.push({ from: RegExp("\\{\\{param" + a + "\\}\\}", "g"), to: i.data("param" + a) }); if (x.thumbs.push(n), i.data("link") != undefined) { var r = i.data("link"), o = i.data("target") || "_self", s = "back" === i.data("slideindex") ? 0 : 60, l = i.data("linktoslide"), d = l; l != undefined && "next" != l && "prev" != l && x.allli.each(function () { var e = jQuery(this); e.data("origindex") + 1 == d && (l = e.data("index")) }), "slide" != r && (l = "no"); var c = '<div class="tp-caption slidelink" style="cursor:pointer;width:100%;height:100%;z-index:' + s + ';" data-x="center" data-y="center" data-basealign="slide" ', u = ' data-frames=\'[{"delay":0,"speed":100,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]\''; c = "no" == l ? c + u + " >" : c + "data-actions='" + ("scroll_under" === l ? '[{"event":"click","action":"scrollbelow","offset":"100px","delay":"0"}]' : "prev" === l ? '[{"event":"click","action":"jumptoslide","slide":"prev","delay":"0.2"}]' : "next" === l ? '[{"event":"click","action":"jumptoslide","slide":"next","delay":"0.2"}]' : '[{"event":"click","action":"jumptoslide","slide":"' + l + '","delay":"0.2"}]') + "'" + u + " >", c += '<a style="width:100%;height:100%;display:block"', c = "slide" != r ? c + ' target="' + o + '" href="' + r + '"' : c, c += '><span style="width:100%;height:100%;display:block"></span></a></div>', i.append(c) } }), x.rle = x.responsiveLevels.length || 1, x.gridwidth = cArray(x.gridwidth, x.rle), x.gridheight = cArray(x.gridheight, x.rle), "on" == x.simplifyAll && (_R.isIE(8) || _R.iOSVersion()) && (t.find(".tp-caption").each(function () { var e = jQuery(this); e.removeClass("customin customout").addClass("fadein fadeout"), e.data("splitin", ""), e.data("speed", 400) }), x.allli.each(function () { var e = jQuery(this); e.data("transition", "fade"), e.data("masterspeed", 500), e.data("slotamount", 1), (e.find(".rev-slidebg") || e.find(">img").first()).data("kenburns", "off") })), x.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), x.autoHeight = "fullscreen" == x.sliderLayout ? "on" : x.autoHeight, "fullwidth" == x.sliderLayout && "off" == x.autoHeight && t.css({ maxHeight: x.gridheight[x.curWinRange] + "px" }), "auto" != x.sliderLayout && 0 == t.closest(".forcefullwidth_wrapper_tp_banner").length && ("fullscreen" !== x.sliderLayout || "on" != x.fullScreenAutoWidth)) { var o = t.parent(), s = o.css("marginBottom"), l = o.css("marginTop"), d = t.attr("id") + "_forcefullwidth"; s = s === undefined ? 0 : s, l = l === undefined ? 0 : l, o.wrap('<div class="forcefullwidth_wrapper_tp_banner" id="' + d + '" style="position:relative;width:100%;height:auto;margin-top:' + l + ";margin-bottom:" + s + '"></div>'), t.closest(".forcefullwidth_wrapper_tp_banner").append('<div class="tp-fullwidth-forcer" style="width:100%;height:' + t.height() + 'px"></div>'), t.parent().css({ marginTop: "0px", marginBottom: "0px" }), t.parent().css({ position: "absolute" }) } if (x.shadow !== undefined && 0 < x.shadow && (t.parent().addClass("tp-shadow" + x.shadow), t.parent().append('<div class="tp-shadowcover"></div>'), t.parent().find(".tp-shadowcover").css({ backgroundColor: t.parent().css("backgroundColor"), backgroundImage: t.parent().css("backgroundImage") })), setCurWinRange(x), setCurWinRange(x, !0), !t.hasClass("revslider-initialised")) { t.addClass("revslider-initialised"), t.addClass("tp-simpleresponsive"), t.attr("id") == undefined && t.attr("id", "revslider-" + Math.round(1e3 * Math.random() + 5)), checkIDS(x, t), x.firefox13 = !1, x.ie = !jQuery.support.opacity, x.ie9 = 9 == document.documentMode, x.origcd = x.delay; var c = jQuery.fn.jquery.split("."), u = parseFloat(c[0]), p = parseFloat(c[1]); parseFloat(c[2] || "0"); 1 == u && p < 7 && t.html('<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:' + c + " <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>"), 1 < u && (x.ie = !1); var j = new Object; j.addedyt = 0, j.addedvim = 0, j.addedvid = 0, x.scrolleffect.on && (x.scrolleffect.layers = new Array), t.find(".tp-caption, .rs-background-video-layer").each(function (e) { var n = jQuery(this), i = n.data(), t = i.autoplayonlyfirsttime, a = i.autoplay, r = (i.videomp4 !== undefined || i.videowebm !== undefined || i.videoogv, n.hasClass("tp-audiolayer")), o = i.videoloop, s = !0, l = !1; i.startclasses = n.attr("class"), i.isparallaxlayer = 0 <= i.startclasses.indexOf("rs-parallax"), n.hasClass("tp-static-layer") && _R.handleStaticLayers && (_R.handleStaticLayers(n, x), x.scrolleffect.on && ("on" === x.scrolleffect.on_parallax_static_layers && i.isparallaxlayer || "on" === x.scrolleffect.on_static_layers && !i.isparallaxlayer) && (l = !0), s = !1); var d = n.data("noposteronmobile") || n.data("noPosterOnMobile") || n.data("posteronmobile") || n.data("posterOnMobile") || n.data("posterOnMObile"); n.data("noposteronmobile", d); var c = 0; if (n.find("iframe").each(function () { punchgs.TweenLite.set(jQuery(this), { autoAlpha: 0 }), c++ }), 0 < c && n.data("iframes", !0), n.hasClass("tp-caption")) { var u = n.hasClass("slidelink") ? "width:100% !important;height:100% !important;" : "", p = n.data(), f = "", h = p.type, g = "row" === h || "column" === h ? "relative" : "absolute", v = ""; "row" === h ? (n.addClass("rev_row").removeClass("tp-resizeme"), v = "rev_row_wrap") : "column" === h ? (f = p.verticalalign === undefined ? " vertical-align:bottom;" : " vertical-align:" + p.verticalalign + ";", v = "rev_column", n.addClass("rev_column_inner").removeClass("tp-resizeme"), n.data("width", "auto"), punchgs.TweenLite.set(n, { width: "auto" })) : "group" === h && n.removeClass("tp-resizeme"); var m = "", y = ""; "row" !== h && "group" !== h && "column" !== h ? (m = "display:" + n.css("display") + ";", 0 < n.closest(".rev_column").length ? (n.addClass("rev_layer_in_column"), s = !1) : 0 < n.closest(".rev_group").length && (n.addClass("rev_layer_in_group"), s = !1)) : "column" === h && (s = !1), p.wrapper_class !== undefined && (v = v + " " + p.wrapper_class), p.wrapper_id !== undefined && (y = 'id="' + p.wrapper_id + '"'); var w = ""; n.hasClass("tp-no-events") && (w = ";pointer-events:none"), n.wrap("<div " + y + ' class="tp-parallax-wrap ' + v + '" style="' + f + " " + u + "position:" + g + ";" + m + ";visibility:hidden" + w + '"><div class="tp-loop-wrap" style="' + u + "position:" + g + ";" + m + ';"><div class="tp-mask-wrap" style="' + u + "position:" + g + ";" + m + ';" ></div></div></div>'), s && x.scrolleffect.on && ("on" === x.scrolleffect.on_parallax_layers && i.isparallaxlayer || "on" === x.scrolleffect.on_layers && !i.isparallaxlayer) && x.scrolleffect.layers.push(n.parent()), l && x.scrolleffect.layers.push(n.parent()), "column" === h && (n.append('<div class="rev_column_bg rev_column_bg_man_sized" style="visibility:hidden"></div>'), n.closest(".tp-parallax-wrap").append('<div class="rev_column_bg rev_column_bg_auto_sized"></div>')); var b = n.closest(".tp-loop-wrap"); jQuery.each(["pendulum", "rotate", "slideloop", "pulse", "wave"], function (e, i) { var t = n.find(".rs-" + i), a = t.data() || ""; "" != a && (b.data(a), b.addClass("rs-" + i), t.children(0).unwrap(), n.data("loopanimation", "on")) }), n.attr("id") === undefined && n.attr("id", "layer-" + Math.round(999999999 * Math.random())), checkIDS(x, n), punchgs.TweenLite.set(n, { visibility: "hidden" }) } var _ = n.data("actions"); _ !== undefined && _R.checkActions(n, x, _), checkHoverDependencies(n, x), _R.checkVideoApis && (j = _R.checkVideoApis(n, x, j)), r || 1 != t && "true" != t && "1sttime" != a || "loopandnoslidestop" == o || n.closest("li.tp-revslider-slidesli").addClass("rs-pause-timer-once"), r || 1 != a && "true" != a && "on" != a && "no1sttime" != a || "loopandnoslidestop" == o || n.closest("li.tp-revslider-slidesli").addClass("rs-pause-timer-always") }), t[0].addEventListener("mouseenter", function () { t.trigger("tp-mouseenter"), x.overcontainer = !0 }, { passive: !0 }), t[0].addEventListener("mouseover", function () { t.trigger("tp-mouseover"), x.overcontainer = !0 }, { passive: !0 }), t[0].addEventListener("mouseleave", function () { t.trigger("tp-mouseleft"), x.overcontainer = !1 }, { passive: !0 }), t.find(".tp-caption video").each(function (e) { var i = jQuery(this); i.removeClass("video-js vjs-default-skin"), i.attr("preload", ""), i.css({ display: "none" }) }), "standard" !== x.sliderType && (x.lazyType = "all"), loadImages(t.find(".tp-static-layers"), x, 0, !0), waitForCurrentImages(t.find(".tp-static-layers"), x, function () { t.find(".tp-static-layers img").each(function () { var e = jQuery(this), i = e.data("lazyload") != undefined ? e.data("lazyload") : e.attr("src"), t = getLoadObj(x, i); e.attr("src", t.src) }) }), x.rowzones = [], x.allli.each(function (e) { var i = jQuery(this); punchgs.TweenLite.set(this, { perspective: 6e3 }), x.rowzones[e] = [], i.find(".rev_row_zone").each(function () { x.rowzones[e].push(jQuery(this)) }), "all" != x.lazyType && ("smart" != x.lazyType || 0 != e && 1 != e && e != x.slideamount && e != x.slideamount - 1) || (loadImages(i, x, e), waitForCurrentImages(i, x, function () { })) }); var f = getUrlVars("#")[0]; if (f.length < 9 && 1 < f.split("slide").length) { var h = parseInt(f.split("slide")[1], 0); h < 1 && (h = 1), h > x.slideamount && (h = x.slideamount), x.startWithSlide = h - 1 } t.append('<div class="tp-loader ' + x.spinner + '"><div class="dot1"></div><div class="dot2"></div><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'), x.loader = t.find(".tp-loader"), 0 === t.find(".tp-bannertimer").length && t.append('<div class="tp-bannertimer" style="visibility:hidden"></div>'), t.find(".tp-bannertimer").css({ width: "0%" }), x.ul.css({ display: "block" }), prepareSlides(t, x), ("off" !== x.parallax.type || x.scrolleffect.on) && _R.checkForParallax && _R.checkForParallax(t, x), _R.setSize(x), "hero" !== x.sliderType && _R.createNavigation && _R.createNavigation(t, x), _R.resizeThumbsTabs && _R.resizeThumbsTabs && _R.resizeThumbsTabs(x), contWidthManager(x); var g = x.viewPort; x.inviewport = !1, g != undefined && g.enable && (jQuery.isNumeric(g.visible_area) || -1 !== g.visible_area.indexOf("%") && (g.visible_area = parseInt(g.visible_area) / 100), _R.scrollTicker && _R.scrollTicker(x, t)), "carousel" === x.sliderType && _R.prepareCarousel && (punchgs.TweenLite.set(x.ul, { opacity: 0 }), _R.prepareCarousel(x, new punchgs.TimelineLite, undefined, 0), x.onlyPreparedSlide = !0), setTimeout(function () { if (!g.enable || g.enable && x.inviewport || g.enable && !x.inviewport && "wait" == !g.outof) swapSlide(t); else if (x.c.addClass("tp-waitforfirststart"), x.waitForFirstSlide = !0, g.presize) { var e = jQuery(x.li[0]); loadImages(e, x, 0, !0), waitForCurrentImages(e.find(".tp-layers"), x, function () { _R.animateTheCaptions({ slide: e, opt: x, preset: !0 }) }) } _R.manageNavigation && _R.manageNavigation(x), 1 < x.slideamount && (!g.enable || g.enable && x.inviewport ? countDown(t, x) : x.waitForCountDown = !0), setTimeout(function () { t.trigger("revolution.slide.onloaded") }, 100) }, x.startDelay), x.startDelay = 0, jQuery("body").data("rs-fullScreenMode", !1), window.addEventListener("fullscreenchange", onFullScreenChange, { passive: !0 }), window.addEventListener("mozfullscreenchange", onFullScreenChange, { passive: !0 }), window.addEventListener("webkitfullscreenchange", onFullScreenChange, { passive: !0 }); var v = "resize.revslider-" + t.attr("id"); jQuery(window).on(v, function () { if (t == undefined) return !1; 0 != jQuery("body").find(t) && contWidthManager(x); var e = !1; if ("fullscreen" == x.sliderLayout) { var i = jQuery(window).height(); "mobile" == x.fallbacks.ignoreHeightChanges && _ISM || "always" == x.fallbacks.ignoreHeightChanges ? (x.fallbacks.ignoreHeightChangesSize = x.fallbacks.ignoreHeightChangesSize == undefined ? 0 : x.fallbacks.ignoreHeightChangesSize, e = i != x.lastwindowheight && Math.abs(i - x.lastwindowheight) > x.fallbacks.ignoreHeightChangesSize) : e = i != x.lastwindowheight } (t.outerWidth(!0) != x.width || t.is(":hidden") || e) && (x.lastwindowheight = jQuery(window).height(), containerResized(t, x)) }), hideSliderUnder(t, x), contWidthManager(x), x.fallbacks.disableFocusListener || "true" == x.fallbacks.disableFocusListener || !0 === x.fallbacks.disableFocusListener || (t.addClass("rev_redraw_on_blurfocus"), tabBlurringCheck()) } }, cArray = function (e, i) { if (!jQuery.isArray(e)) { var t = e; (e = new Array).push(t) } if (e.length < i) { t = e[e.length - 1]; for (var a = 0; a < i - e.length + 2; a++)e.push(t) } return e }, checkHoverDependencies = function (e, n) { var i = e.data(); ("sliderenter" === i.start || i.frames !== undefined && i.frames[0] != undefined && "sliderenter" === i.frames[0].delay) && (n.layersonhover === undefined && (n.c.on("tp-mouseenter", function () { n.layersonhover && jQuery.each(n.layersonhover, function (e, i) { var t = i.data("closestli") || i.closest(".tp-revslider-slidesli"), a = i.data("staticli") || i.closest(".tp-static-layers"); i.data("closestli") === undefined && (i.data("closestli", t), i.data("staticli", a)), (0 < t.length && t.hasClass("active-revslide") || t.hasClass("processing-revslide") || 0 < a.length) && (i.data("animdirection", "in"), _R.playAnimationFrame && _R.playAnimationFrame({ caption: i, opt: n, frame: "frame_0", triggerdirection: "in", triggerframein: "frame_0", triggerframeout: "frame_999" }), i.data("triggerstate", "on")) }) }), n.c.on("tp-mouseleft", function () { n.layersonhover && jQuery.each(n.layersonhover, function (e, i) { i.data("animdirection", "out"), i.data("triggered", !0), i.data("triggerstate", "off"), _R.stopVideo && _R.stopVideo(i, n), _R.playAnimationFrame && _R.playAnimationFrame({ caption: i, opt: n, frame: "frame_999", triggerdirection: "out", triggerframein: "frame_0", triggerframeout: "frame_999" }) }) }), n.layersonhover = new Array), n.layersonhover.push(e)) }, contWidthManager = function (e) { var i = _R.getHorizontalOffset(e.c, "left"); if ("auto" == e.sliderLayout || "fullscreen" === e.sliderLayout && "on" == e.fullScreenAutoWidth) "fullscreen" == e.sliderLayout && "on" == e.fullScreenAutoWidth ? punchgs.TweenLite.set(e.ul, { left: 0, width: e.c.width() }) : punchgs.TweenLite.set(e.ul, { left: i, width: e.c.width() - _R.getHorizontalOffset(e.c, "both") }); else { var t = Math.ceil(e.c.closest(".forcefullwidth_wrapper_tp_banner").offset().left - i); punchgs.TweenLite.set(e.c.parent(), { left: 0 - t + "px", width: jQuery(window).width() - _R.getHorizontalOffset(e.c, "both") }) } e.slayers && "fullwidth" != e.sliderLayout && "fullscreen" != e.sliderLayout && punchgs.TweenLite.set(e.slayers, { left: i }) }, cv = function (e, i) { return e === undefined ? i : e }, hideSliderUnder = function (e, i, t) { var a = e.parent(); jQuery(window).width() < i.hideSliderAtLimit ? (e.trigger("stoptimer"), "none" != a.css("display") && a.data("olddisplay", a.css("display")), a.css({ display: "none" })) : e.is(":hidden") && t && (a.data("olddisplay") != undefined && "undefined" != a.data("olddisplay") && "none" != a.data("olddisplay") ? a.css({ display: a.data("olddisplay") }) : a.css({ display: "block" }), e.trigger("restarttimer"), setTimeout(function () { containerResized(e, i) }, 150)), _R.hideUnHideNav && _R.hideUnHideNav(i) }, containerResized = function (e, i) { if (e.trigger("revolution.slide.beforeredraw"), 1 == i.infullscreenmode && (i.minHeight = jQuery(window).height()), setCurWinRange(i), setCurWinRange(i, !0), !_R.resizeThumbsTabs || !0 === _R.resizeThumbsTabs(i)) { if (hideSliderUnder(e, i, !0), contWidthManager(i), "carousel" == i.sliderType && _R.prepareCarousel(i, !0), e === undefined) return !1; _R.setSize(i), i.conw = i.c.width(), i.conh = i.infullscreenmode ? i.minHeight : i.c.height(); var t = e.find(".active-revslide .slotholder"), a = e.find(".processing-revslide .slotholder"); removeSlots(e, i, e, 2), "standard" === i.sliderType && (punchgs.TweenLite.set(a.find(".defaultimg"), { opacity: 0 }), t.find(".defaultimg").css({ opacity: 1 })), "carousel" === i.sliderType && i.lastconw != i.conw && (clearTimeout(i.pcartimer), i.pcartimer = setTimeout(function () { _R.prepareCarousel(i, !0), "carousel" == i.sliderType && "on" === i.carousel.showLayersAllTime && jQuery.each(i.li, function (e) { _R.animateTheCaptions({ slide: jQuery(i.li[e]), opt: i, recall: !0 }) }) }, 100), i.lastconw = i.conw), _R.manageNavigation && _R.manageNavigation(i), _R.animateTheCaptions && 0 < e.find(".active-revslide").length && _R.animateTheCaptions({ slide: e.find(".active-revslide"), opt: i, recall: !0 }), "on" == a.data("kenburns") && _R.startKenBurn(a, i, a.data("kbtl") !== undefined ? a.data("kbtl").progress() : 0), "on" == t.data("kenburns") && _R.startKenBurn(t, i, t.data("kbtl") !== undefined ? t.data("kbtl").progress() : 0), _R.animateTheCaptions && 0 < e.find(".processing-revslide").length && _R.animateTheCaptions({ slide: e.find(".processing-revslide"), opt: i, recall: !0 }), _R.manageNavigation && _R.manageNavigation(i) } e.trigger("revolution.slide.afterdraw") }, setScale = function (e) { e.bw = e.width / e.gridwidth[e.curWinRange], e.bh = e.height / e.gridheight[e.curWinRange], e.bh > e.bw ? e.bh = e.bw : e.bw = e.bh, (1 < e.bh || 1 < e.bw) && (e.bw = 1, e.bh = 1) }, prepareSlides = function (e, u) { if (e.find(".tp-caption").each(function () { var e = jQuery(this); e.data("transition") !== undefined && e.addClass(e.data("transition")) }), u.ul.css({ overflow: "hidden", width: "100%", height: "100%", maxHeight: e.parent().css("maxHeight") }), "on" == u.autoHeight && (u.ul.css({ overflow: "hidden", width: "100%", height: "100%", maxHeight: "none" }), e.css({ maxHeight: "none" }), e.parent().css({ maxHeight: "none" })), u.allli.each(function (e) { var i = jQuery(this), t = i.data("originalindex"); (u.startWithSlide != undefined && t == u.startWithSlide || u.startWithSlide === undefined && 0 == e) && i.addClass("next-revslide"), i.css({ width: "100%", height: "100%", overflow: "hidden" }) }), "carousel" === u.sliderType) { u.ul.css({ overflow: "visible" }).wrap('<div class="tp-carousel-wrapper" style="width:100%;height:100%;position:absolute;top:0px;left:0px;overflow:hidden;"></div>'); var i = '<div style="clear:both;display:block;width:100%;height:1px;position:relative;margin-bottom:-1px"></div>'; u.c.parent().prepend(i), u.c.parent().append(i), _R.prepareCarousel(u) } e.parent().css({ overflow: "visible" }), u.allli.find(">img").each(function (e) { var i = jQuery(this), t = i.closest("li"), a = t.find(".rs-background-video-layer"); a.addClass("defaultvid").css({ zIndex: 30 }), i.addClass("defaultimg"), "on" == u.fallbacks.panZoomDisableOnMobile && _ISM && (i.data("kenburns", "off"), i.data("bgfit", "cover")); var n = t.data("mediafilter"); n = "none" === n || n === undefined ? "" : n, i.wrap('<div class="slotholder" style="position:absolute; top:0px; left:0px; z-index:0;width:100%;height:100%;"></div>'), a.appendTo(t.find(".slotholder")); var r = i.data(); i.closest(".slotholder").data(r), 0 < a.length && r.bgparallax != undefined && (a.data("bgparallax", r.bgparallax), a.data("showcoveronpause", "on")), "none" != u.dottedOverlay && u.dottedOverlay != undefined && i.closest(".slotholder").append('<div class="tp-dottedoverlay ' + u.dottedOverlay + '"></div>'); var o = i.attr("src"); r.src = o, r.bgfit = r.bgfit || "cover", r.bgrepeat = r.bgrepeat || "no-repeat", r.bgposition = r.bgposition || "center center"; i.closest(".slotholder"); var s = i.data("bgcolor"), l = ""; l = s !== undefined && 0 <= s.indexOf("gradient") ? '"background:' + s + ';width:100%;height:100%;"' : '"background-color:' + s + ";background-repeat:" + r.bgrepeat + ";background-image:url(" + o + ");background-size:" + r.bgfit + ";background-position:" + r.bgposition + ';width:100%;height:100%;"', i.data("mediafilter", n), n = "on" === i.data("kenburns") ? "" : n; var d = jQuery('<div class="tp-bgimg defaultimg ' + n + '" data-bgcolor="' + s + '" style=' + l + "></div>"); i.parent().append(d); var c = document.createComment("Runtime Modification - Img tag is Still Available for SEO Goals in Source - " + i.get(0).outerHTML); i.replaceWith(c), d.data(r), d.attr("src", o), "standard" !== u.sliderType && "undefined" !== u.sliderType || d.css({ opacity: 0 }) }), u.scrolleffect.on && "on" === u.scrolleffect.on_slidebg && (u.allslotholder = new Array, u.allli.find(".slotholder").each(function () { jQuery(this).wrap('<div style="display:block;position:absolute;top:0px;left:0px;width:100%;height:100%" class="slotholder_fadeoutwrap"></div>') }), u.allslotholder = u.c.find(".slotholder_fadeoutwrap")) }, removeSlots = function (e, i, t, a) { i.removePrepare = i.removePrepare + a, t.find(".slot, .slot-circle-wrapper").each(function () { jQuery(this).remove() }), i.transition = 0, i.removePrepare = 0 }, cutParams = function (e) { var i = e; return e != undefined && 0 < e.length && (i = e.split("?")[0]), i }, relativeRedir = function (e) { return location.pathname.replace(/(.*)\/[^/]*/, "$1/" + e) }, abstorel = function (e, i) { var t = e.split("/"), a = i.split("/"); t.pop(); for (var n = 0; n < a.length; n++)"." != a[n] && (".." == a[n] ? t.pop() : t.push(a[n])); return t.join("/") }, imgLoaded = function (l, e, d) { e.syncload-- , e.loadqueue && jQuery.each(e.loadqueue, function (e, i) { var t = i.src.replace(/\.\.\/\.\.\//gi, ""), a = self.location.href, n = document.location.origin, r = a.substring(0, a.length - 1) + "/" + t, o = n + "/" + t, s = abstorel(self.location.href, i.src); a = a.substring(0, a.length - 1) + t, (cutParams(n += t) === cutParams(decodeURIComponent(l.src)) || cutParams(a) === cutParams(decodeURIComponent(l.src)) || cutParams(s) === cutParams(decodeURIComponent(l.src)) || cutParams(o) === cutParams(decodeURIComponent(l.src)) || cutParams(r) === cutParams(decodeURIComponent(l.src)) || cutParams(i.src) === cutParams(decodeURIComponent(l.src)) || cutParams(i.src).replace(/^.*\/\/[^\/]+/, "") === cutParams(decodeURIComponent(l.src)).replace(/^.*\/\/[^\/]+/, "") || "file://" === window.location.origin && cutParams(l.src).match(new RegExp(t))) && (i.progress = d, i.width = l.width, i.height = l.height) }), progressImageLoad(e) }, progressImageLoad = function (a) { 3 != a.syncload && a.loadqueue && jQuery.each(a.loadqueue, function (e, i) { if (i.progress.match(/prepared/g) && a.syncload <= 3) { if (a.syncload++ , "img" == i.type) { var t = new Image; t.onload = function () { imgLoaded(this, a, "loaded"), i.error = !1 }, t.onerror = function () { imgLoaded(this, a, "failed"), i.error = !0 }, t.src = i.src } else jQuery.get(i.src, function (e) { i.innerHTML = (new XMLSerializer).serializeToString(e.documentElement), i.progress = "loaded", a.syncload-- , progressImageLoad(a) }).fail(function () { i.progress = "failed", a.syncload-- , progressImageLoad(a) }); i.progress = "inload" } }) }, addToLoadQueue = function (t, e, i, a, n) { var r = !1; if (e.loadqueue && jQuery.each(e.loadqueue, function (e, i) { i.src === t && (r = !0) }), !r) { var o = new Object; o.src = t, o.starttoload = jQuery.now(), o.type = a || "img", o.prio = i, o.progress = "prepared", o.static = n, e.loadqueue.push(o) } }, loadImages = function (e, a, n, r) { e.find("img,.defaultimg, .tp-svg-layer").each(function () { var e = jQuery(this), i = e.data("lazyload") !== undefined && "undefined" !== e.data("lazyload") ? e.data("lazyload") : e.data("svg_src") != undefined ? e.data("svg_src") : e.attr("src"), t = e.data("svg_src") != undefined ? "svg" : "img"; e.data("start-to-load", jQuery.now()), addToLoadQueue(i, a, n, t, r) }), progressImageLoad(a) }, getLoadObj = function (e, t) { var a = new Object; return e.loadqueue && jQuery.each(e.loadqueue, function (e, i) { i.src == t && (a = i) }), a }, waitForCurrentImages = function (o, s, e) { var l = !1; o.find("img,.defaultimg, .tp-svg-layer").each(function () { var e = jQuery(this), i = e.data("lazyload") != undefined ? e.data("lazyload") : e.data("svg_src") != undefined ? e.data("svg_src") : e.attr("src"), t = getLoadObj(s, i); if (e.data("loaded") === undefined && t !== undefined && t.progress && t.progress.match(/loaded/g)) { if (e.attr("src", t.src), "img" == t.type) if (e.hasClass("defaultimg")) _R.isIE(8) ? defimg.attr("src", t.src) : -1 == t.src.indexOf("images/transparent.png") && -1 == t.src.indexOf("assets/transparent.png") || e.data("bgcolor") === undefined ? e.css({ backgroundImage: 'url("' + t.src + '")' }) : e.data("bgcolor") !== undefined && e.css({ background: e.data("bgcolor") }), o.data("owidth", t.width), o.data("oheight", t.height), o.find(".slotholder").data("owidth", t.width), o.find(".slotholder").data("oheight", t.height); else { var a = e.data("ww"), n = e.data("hh"); e.data("owidth", t.width), e.data("oheight", t.height), a = a == undefined || "auto" == a || "" == a ? t.width : a, n = n == undefined || "auto" == n || "" == n ? t.height : n, !jQuery.isNumeric(a) && 0 < a.indexOf("%") && (n = a), e.data("ww", a), e.data("hh", n) } else "svg" == t.type && "loaded" == t.progress && (e.append('<div class="tp-svg-innercontainer"></div>'), e.find(".tp-svg-innercontainer").append(t.innerHTML)); e.data("loaded", !0) } if (t && t.progress && t.progress.match(/inprogress|inload|prepared/g) && (!t.error && jQuery.now() - e.data("start-to-load") < 5e3 ? l = !0 : (t.progress = "failed", t.reported_img || (t.reported_img = !0, console.warn(i + "  Could not be loaded !")))), 1 == s.youtubeapineeded && (!window.YT || YT.Player == undefined) && (l = !0, 5e3 < jQuery.now() - s.youtubestarttime && 1 != s.youtubewarning)) { s.youtubewarning = !0; var r = "YouTube Api Could not be loaded !"; "https:" === location.protocol && (r += " Please Check and Renew SSL Certificate !"), console.error(r), s.c.append('<div style="position:absolute;top:50%;width:100%;color:#e74c3c;  font-size:16px; text-align:center; padding:15px;background:#000; display:block;"><strong>' + r + "</strong></div>") } if (1 == s.vimeoapineeded && !window.Vimeo && (l = !0, 5e3 < jQuery.now() - s.vimeostarttime && 1 != s.vimeowarning)) { s.vimeowarning = !0; r = "Vimeo Api Could not be loaded !"; "https:" === location.protocol && (r += " Please Check and Renew SSL Certificate !"), console.error(r), s.c.append('<div style="position:absolute;top:50%;width:100%;color:#e74c3c;  font-size:16px; text-align:center; padding:15px;background:#000; display:block;"><strong>' + r + "</strong></div>") } }), !_ISM && s.audioqueue && 0 < s.audioqueue.length && jQuery.each(s.audioqueue, function (e, i) { i.status && "prepared" === i.status && jQuery.now() - i.start < i.waittime && (l = !0) }), jQuery.each(s.loadqueue, function (e, i) { !0 !== i.static || "loaded" == i.progress && "failed" !== i.progress || ("failed" == i.progress ? i.reported || (i.reported = !0, console.warn("Static Image " + i.src + "  Could not be loaded in time. Error Exists:" + i.error)) : !i.error && jQuery.now() - i.starttoload < 5e3 ? l = !0 : i.reported || (i.reported = !0, console.warn("Static Image " + i.src + "  Could not be loaded within 5s! Error Exists:" + i.error))) }), l ? punchgs.TweenLite.delayedCall(.18, waitForCurrentImages, [o, s, e]) : punchgs.TweenLite.delayedCall(.18, e) }, swapSlide = function (e) { var i = e[0].opt; if (clearTimeout(i.waitWithSwapSlide), 0 < e.find(".processing-revslide").length) return i.waitWithSwapSlide = setTimeout(function () { swapSlide(e) }, 150), !1; var t = e.find(".active-revslide"), a = e.find(".next-revslide"), n = a.find(".defaultimg"); if ("carousel" !== i.sliderType || i.carousel.fadein || (punchgs.TweenLite.to(i.ul, 1, { opacity: 1 }), i.carousel.fadein = !0), a.index() === t.index() && !0 !== i.onlyPreparedSlide) return a.removeClass("next-revslide"), !1; !0 === i.onlyPreparedSlide && (i.onlyPreparedSlide = !1, jQuery(i.li[0]).addClass("processing-revslide")), a.removeClass("next-revslide").addClass("processing-revslide"), -1 === a.index() && "carousel" === i.sliderType && (a = jQuery(i.li[0])), a.data("slide_on_focus_amount", a.data("slide_on_focus_amount") + 1 || 1), "on" == i.stopLoop && a.index() == i.lastslidetoshow - 1 && (e.find(".tp-bannertimer").css({ visibility: "hidden" }), e.trigger("revolution.slide.onstop"), i.noloopanymore = 1), a.index() === i.slideamount - 1 && (i.looptogo = i.looptogo - 1, i.looptogo <= 0 && (i.stopLoop = "on")), i.tonpause = !0, e.trigger("stoptimer"), i.cd = 0, "off" === i.spinner && (i.loader !== undefined ? i.loader.css({ display: "none" }) : i.loadertimer = setTimeout(function () { i.loader !== undefined && i.loader.css({ display: "block" }) }, 50)), loadImages(a, i, 1), _R.preLoadAudio && _R.preLoadAudio(a, i, 1), waitForCurrentImages(a, i, function () { a.find(".rs-background-video-layer").each(function () { var e = jQuery(this); e.hasClass("HasListener") || (e.data("bgvideo", 1), _R.manageVideoLayer && _R.manageVideoLayer(e, i)), 0 == e.find(".rs-fullvideo-cover").length && e.append('<div class="rs-fullvideo-cover"></div>') }), swapSlideProgress(n, e) }) }, swapSlideProgress = function (e, i) { var t = i.find(".active-revslide"), a = i.find(".processing-revslide"), n = t.find(".slotholder"), r = a.find(".slotholder"), o = i[0].opt; o.tonpause = !1, o.cd = 0, clearTimeout(o.loadertimer), o.loader !== undefined && o.loader.css({ display: "none" }), _R.setSize(o), _R.slotSize(e, o), _R.manageNavigation && _R.manageNavigation(o); var s = {}; s.nextslide = a, s.currentslide = t, i.trigger("revolution.slide.onbeforeswap", s), o.transition = 1, o.videoplaying = !1, a.data("delay") != undefined ? (o.cd = 0, o.delay = a.data("delay")) : o.delay = o.origcd, "true" == a.data("ssop") || !0 === a.data("ssop") ? o.ssop = !0 : o.ssop = !1, i.trigger("nulltimer"); var l = t.index(), d = a.index(); o.sdir = d < l ? 1 : 0, "arrow" == o.sc_indicator && (0 == l && d == o.slideamount - 1 && (o.sdir = 1), l == o.slideamount - 1 && 0 == d && (o.sdir = 0)), o.lsdir = o.lsdir === undefined ? o.sdir : o.lsdir, o.dirc = o.lsdir != o.sdir, o.lsdir = o.sdir, t.index() != a.index() && 1 != o.firststart && _R.removeTheCaptions && _R.removeTheCaptions(t, o), a.hasClass("rs-pause-timer-once") || a.hasClass("rs-pause-timer-always") ? o.videoplaying = !0 : i.trigger("restarttimer"), a.removeClass("rs-pause-timer-once"); var c; if (o.currentSlide = t.index(), o.nextSlide = a.index(), "carousel" == o.sliderType) c = new punchgs.TimelineLite, _R.prepareCarousel(o, c), letItFree(i, r, n, a, t, c), o.transition = 0, o.firststart = 0; else { (c = new punchgs.TimelineLite({ onComplete: function () { letItFree(i, r, n, a, t, c) } })).add(punchgs.TweenLite.set(r.find(".defaultimg"), { opacity: 0 })), c.pause(), _R.animateTheCaptions && _R.animateTheCaptions({ slide: a, opt: o, preset: !0 }), 1 == o.firststart && (punchgs.TweenLite.set(t, { autoAlpha: 0 }), o.firststart = 0), punchgs.TweenLite.set(t, { zIndex: 18 }), punchgs.TweenLite.set(a, { autoAlpha: 0, zIndex: 20 }), "prepared" == a.data("differentissplayed") && (a.data("differentissplayed", "done"), a.data("transition", a.data("savedtransition")), a.data("slotamount", a.data("savedslotamount")), a.data("masterspeed", a.data("savedmasterspeed"))), a.data("fstransition") != undefined && "done" != a.data("differentissplayed") && (a.data("savedtransition", a.data("transition")), a.data("savedslotamount", a.data("slotamount")), a.data("savedmasterspeed", a.data("masterspeed")), a.data("transition", a.data("fstransition")), a.data("slotamount", a.data("fsslotamount")), a.data("masterspeed", a.data("fsmasterspeed")), a.data("differentissplayed", "prepared")), a.data("transition") == undefined && a.data("transition", "random"), 0; var u = a.data("transition") !== undefined ? a.data("transition").split(",") : "fade", p = a.data("nexttransid") == undefined ? -1 : a.data("nexttransid"); "on" == a.data("randomtransition") ? p = Math.round(Math.random() * u.length) : p += 1, p == u.length && (p = 0), a.data("nexttransid", p); var f = u[p]; o.ie && ("boxfade" == f && (f = "boxslide"), "slotfade-vertical" == f && (f = "slotzoom-vertical"), "slotfade-horizontal" == f && (f = "slotzoom-horizontal")), _R.isIE(8) && (f = 11), c = _R.animateSlide(0, f, i, a, t, r, n, c), "on" == r.data("kenburns") && (_R.startKenBurn(r, o), c.add(punchgs.TweenLite.set(r, { autoAlpha: 0 }))), c.pause() } _R.scrollHandling && (_R.scrollHandling(o, !0, 0), c.eventCallback("onUpdate", function () { _R.scrollHandling(o, !0, 0) })), "off" != o.parallax.type && o.parallax.firstgo == undefined && _R.scrollHandling && (o.parallax.firstgo = !0, o.lastscrolltop = -999, _R.scrollHandling(o, !0, 0), setTimeout(function () { o.lastscrolltop = -999, _R.scrollHandling(o, !0, 0) }, 210), setTimeout(function () { o.lastscrolltop = -999, _R.scrollHandling(o, !0, 0) }, 420)), _R.animateTheCaptions ? "carousel" === o.sliderType && "on" === o.carousel.showLayersAllTime ? (jQuery.each(o.li, function (e) { o.carousel.allLayersStarted ? _R.animateTheCaptions({ slide: jQuery(o.li[e]), opt: o, recall: !0 }) : o.li[e] === a ? _R.animateTheCaptions({ slide: jQuery(o.li[e]), maintimeline: c, opt: o, startslideanimat: 0 }) : _R.animateTheCaptions({ slide: jQuery(o.li[e]), opt: o, startslideanimat: 0 }) }), o.carousel.allLayersStarted = !0) : _R.animateTheCaptions({ slide: a, opt: o, maintimeline: c, startslideanimat: 0 }) : c != undefined && setTimeout(function () { c.resume() }, 30), punchgs.TweenLite.to(a, .001, { autoAlpha: 1 }) }, letItFree = function (e, i, t, a, n, r) { var o = e[0].opt; "carousel" === o.sliderType || (o.removePrepare = 0, punchgs.TweenLite.to(i.find(".defaultimg"), .001, { zIndex: 20, autoAlpha: 1, onComplete: function () { removeSlots(e, o, a, 1) } }), a.index() != n.index() && punchgs.TweenLite.to(n, .2, { zIndex: 18, autoAlpha: 0, onComplete: function () { removeSlots(e, o, n, 1) } })), e.find(".active-revslide").removeClass("active-revslide"), e.find(".processing-revslide").removeClass("processing-revslide").addClass("active-revslide"), o.act = a.index(), o.c.attr("data-slideactive", e.find(".active-revslide").data("index")), "scroll" != o.parallax.type && "scroll+mouse" != o.parallax.type && "mouse+scroll" != o.parallax.type || (o.lastscrolltop = -999, _R.scrollHandling(o)), r.clear(), t.data("kbtl") != undefined && (t.data("kbtl").reverse(), t.data("kbtl").timeScale(25)), "on" == i.data("kenburns") && (i.data("kbtl") != undefined ? (i.data("kbtl").timeScale(1), i.data("kbtl").play()) : _R.startKenBurn(i, o)), a.find(".rs-background-video-layer").each(function (e) { if (_ISM && !o.fallbacks.allowHTML5AutoPlayOnAndroid) return !1; var i = jQuery(this); _R.resetVideo(i, o, !1, !0), punchgs.TweenLite.fromTo(i, 1, { autoAlpha: 0 }, { autoAlpha: 1, ease: punchgs.Power3.easeInOut, delay: .2, onComplete: function () { _R.animcompleted && _R.animcompleted(i, o) } }) }), n.find(".rs-background-video-layer").each(function (e) { if (_ISM) return !1; var i = jQuery(this); _R.stopVideo && (_R.resetVideo(i, o), _R.stopVideo(i, o)), punchgs.TweenLite.to(i, 1, { autoAlpha: 0, ease: punchgs.Power3.easeInOut, delay: .2 }) }); var s = {}; if (s.slideIndex = a.index() + 1, s.slideLIIndex = a.index(), s.slide = a, s.currentslide = a, s.prevslide = n, o.last_shown_slide = n.index(), e.trigger("revolution.slide.onchange", s), e.trigger("revolution.slide.onafterswap", s), o.startWithSlide !== undefined && "done" !== o.startWithSlide && "carousel" === o.sliderType) { for (var l = o.startWithSlide, d = 0; d <= o.li.length - 1; d++) { jQuery(o.li[d]).data("originalindex") === o.startWithSlide && (l = d) } 0 !== l && _R.callingNewSlide(o.c, l), o.startWithSlide = "done" } o.duringslidechange = !1; var c = n.data("slide_on_focus_amount"), u = n.data("hideafterloop"); 0 != u && u <= c && o.c.revremoveslide(n.index()); var p = -1 === o.nextSlide || o.nextSlide === undefined ? 0 : o.nextSlide; o.rowzones != undefined && (p = p > o.rowzones.length ? o.rowzones.length : p), o.rowzones != undefined && 0 < o.rowzones.length && o.rowzones[p] != undefined && 0 <= p && p <= o.rowzones.length && 0 < o.rowzones[p].length && _R.setSize(o) }, removeAllListeners = function (e, i) { e.children().each(function () { try { jQuery(this).die("click") } catch (e) { } try { jQuery(this).die("mouseenter") } catch (e) { } try { jQuery(this).die("mouseleave") } catch (e) { } try { jQuery(this).unbind("hover") } catch (e) { } }); try { e.die("click", "mouseenter", "mouseleave") } catch (e) { } clearInterval(i.cdint), e = null }, countDown = function (e, i) { i.cd = 0, i.loop = 0, i.stopAfterLoops != undefined && -1 < i.stopAfterLoops ? i.looptogo = i.stopAfterLoops : i.looptogo = 9999999, i.stopAtSlide != undefined && -1 < i.stopAtSlide ? i.lastslidetoshow = i.stopAtSlide : i.lastslidetoshow = 999, i.stopLoop = "off", 0 == i.looptogo && (i.stopLoop = "on"); var t = e.find(".tp-bannertimer"); e.on("stoptimer", function () { var e = jQuery(this).find(".tp-bannertimer"); e[0].tween.pause(), "on" == i.disableProgressBar && e.css({ visibility: "hidden" }), i.sliderstatus = "paused", _R.unToggleState(i.slidertoggledby) }), e.on("starttimer", function () { i.forcepause_viatoggle || (1 != i.conthover && 1 != i.videoplaying && i.width > i.hideSliderAtLimit && 1 != i.tonpause && 1 != i.overnav && 1 != i.ssop && (1 === i.noloopanymore || i.viewPort.enable && !i.inviewport || (t.css({ visibility: "visible" }), t[0].tween.resume(), i.sliderstatus = "playing")), "on" == i.disableProgressBar && t.css({ visibility: "hidden" }), _R.toggleState(i.slidertoggledby)) }), e.on("restarttimer", function () { if (!i.forcepause_viatoggle) { var e = jQuery(this).find(".tp-bannertimer"); if (i.mouseoncontainer && "on" == i.navigation.onHoverStop && !_ISM) return !1; 1 === i.noloopanymore || i.viewPort.enable && !i.inviewport || 1 == i.ssop || (e.css({ visibility: "visible" }), e[0].tween.kill(), e[0].tween = punchgs.TweenLite.fromTo(e, i.delay / 1e3, { width: "0%" }, { force3D: "auto", width: "100%", ease: punchgs.Linear.easeNone, onComplete: a, delay: 1 }), i.sliderstatus = "playing"), "on" == i.disableProgressBar && e.css({ visibility: "hidden" }), _R.toggleState(i.slidertoggledby) } }), e.on("nulltimer", function () { t[0].tween.kill(), t[0].tween = punchgs.TweenLite.fromTo(t, i.delay / 1e3, { width: "0%" }, { force3D: "auto", width: "100%", ease: punchgs.Linear.easeNone, onComplete: a, delay: 1 }), t[0].tween.pause(0), "on" == i.disableProgressBar && t.css({ visibility: "hidden" }), i.sliderstatus = "paused" }); var a = function () { 0 == jQuery("body").find(e).length && (removeAllListeners(e, i), clearInterval(i.cdint)), e.trigger("revolution.slide.slideatend"), 1 == e.data("conthover-changed") && (i.conthover = e.data("conthover"), e.data("conthover-changed", 0)), _R.callingNewSlide(e, 1) }; t[0].tween = punchgs.TweenLite.fromTo(t, i.delay / 1e3, { width: "0%" }, { force3D: "auto", width: "100%", ease: punchgs.Linear.easeNone, onComplete: a, delay: 1 }), 1 < i.slideamount && (0 != i.stopAfterLoops || 1 != i.stopAtSlide) ? e.trigger("starttimer") : (i.noloopanymore = 1, e.trigger("nulltimer")), e.on("tp-mouseenter", function () { i.mouseoncontainer = !0, "on" != i.navigation.onHoverStop || _ISM || (e.trigger("stoptimer"), e.trigger("revolution.slide.onpause")) }), e.on("tp-mouseleft", function () { i.mouseoncontainer = !1, 1 != e.data("conthover") && "on" == i.navigation.onHoverStop && (1 == i.viewPort.enable && i.inviewport || 0 == i.viewPort.enable) && (e.trigger("revolution.slide.onresume"), e.trigger("starttimer")) }) }, vis = function () { var i, t, e = { hidden: "visibilitychange", webkitHidden: "webkitvisibilitychange", mozHidden: "mozvisibilitychange", msHidden: "msvisibilitychange" }; for (i in e) if (i in document) { t = e[i]; break } return function (e) { return e && document.addEventListener(t, e, { pasive: !0 }), !document[i] } }(), restartOnFocus = function () { jQuery(".rev_redraw_on_blurfocus").each(function () { var e = jQuery(this)[0].opt; if (e == undefined || e.c == undefined || 0 === e.c.length) return !1; 1 != e.windowfocused && (e.windowfocused = !0, punchgs.TweenLite.delayedCall(.3, function () { "on" == e.fallbacks.nextSlideOnWindowFocus && e.c.revnext(), e.c.revredraw(), "playing" == e.lastsliderstatus && e.c.revresume() })) }) }, lastStatBlur = function () { jQuery(".rev_redraw_on_blurfocus").each(function () { var e = jQuery(this)[0].opt; e.windowfocused = !1, e.lastsliderstatus = e.sliderstatus, e.c.revpause(); var i = e.c.find(".active-revslide .slotholder"), t = e.c.find(".processing-revslide .slotholder"); "on" == t.data("kenburns") && _R.stopKenBurn(t, e), "on" == i.data("kenburns") && _R.stopKenBurn(i, e) }) }, tabBlurringCheck = function () { var e = document.documentMode === undefined, i = window.chrome; 1 !== jQuery("body").data("revslider_focus_blur_listener") && (jQuery("body").data("revslider_focus_blur_listener", 1), e && !i ? jQuery(window).on("focusin", function () { restartOnFocus() }).on("focusout", function () { lastStatBlur() }) : window.addEventListener ? (window.addEventListener("focus", function (e) { restartOnFocus() }, { capture: !1, passive: !0 }), window.addEventListener("blur", function (e) { lastStatBlur() }, { capture: !1, passive: !0 })) : (window.attachEvent("focus", function (e) { restartOnFocus() }), window.attachEvent("blur", function (e) { lastStatBlur() }))) }, getUrlVars = function (e) { for (var i, t = [], a = window.location.href.slice(window.location.href.indexOf(e) + 1).split("_"), n = 0; n < a.length; n++)a[n] = a[n].replace("%3D", "="), i = a[n].split("="), t.push(i[0]), t[i[0]] = i[1]; return t } }(jQuery);
/********************************************
 * REVOLUTION 5.4.6.4 EXTENSION - ACTIONS
 * @version: 2.1.0 (22.11.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/

!function ($) { "use strict"; function getScrollRoot() { var e, t = document.documentElement, o = document.body, a = (void 0 !== window.pageYOffset ? window.pageYOffset : null) || o.scrollTop || t.scrollTop; return t.scrollTop = o.scrollTop = a + (a > 0) ? -1 : 1, e = t.scrollTop !== a ? t : o, e.scrollTop = a, e } var _R = jQuery.fn.revolution, _ISM = _R.is_mobile(), extension = { alias: "Actions Min JS", name: "revolution.extensions.actions.min.js", min_core: "5.4.5", version: "2.1.0" }; jQuery.extend(!0, _R, { checkActions: function (e, t, o) { if ("stop" === _R.compare_version(extension).check) return !1; checkActions_intern(e, t, o) } }); var checkActions_intern = function (e, t, o) { o && jQuery.each(o, function (o, a) { a.delay = parseInt(a.delay, 0) / 1e3, e.addClass("tp-withaction"), t.fullscreen_esclistener || "exitfullscreen" != a.action && "togglefullscreen" != a.action || (jQuery(document).keyup(function (t) { 27 == t.keyCode && jQuery("#rs-go-fullscreen").length > 0 && e.trigger(a.event) }), t.fullscreen_esclistener = !0); var r = "backgroundvideo" == a.layer ? jQuery(".rs-background-video-layer") : "firstvideo" == a.layer ? jQuery(".tp-revslider-slidesli").find(".tp-videolayer") : jQuery("#" + a.layer); switch (-1 != jQuery.inArray(a.action, ["toggleslider", "toggle_mute_video", "toggle_global_mute_video", "togglefullscreen"]) && e.data("togglelisteners", !0), a.action) { case "togglevideo": jQuery.each(r, function (t, o) { var a = (o = jQuery(o)).data("videotoggledby"); void 0 == a && (a = new Array), a.push(e), o.data("videotoggledby", a) }); break; case "togglelayer": jQuery.each(r, function (t, o) { var r = (o = jQuery(o)).data("layertoggledby"); void 0 == r && (r = new Array), r.push(e), o.data("layertoggledby", r), o.data("triggered_startstatus", a.layerstatus) }); break; case "toggle_mute_video": case "toggle_global_mute_video": jQuery.each(r, function (t, o) { var a = (o = jQuery(o)).data("videomutetoggledby"); void 0 == a && (a = new Array), a.push(e), o.data("videomutetoggledby", a) }); break; case "toggleslider": void 0 == t.slidertoggledby && (t.slidertoggledby = new Array), t.slidertoggledby.push(e); break; case "togglefullscreen": void 0 == t.fullscreentoggledby && (t.fullscreentoggledby = new Array), t.fullscreentoggledby.push(e) }switch (e.on(a.event, function () { if ("click" === a.event && e.hasClass("tp-temporarydisabled")) return !1; var o = "backgroundvideo" == a.layer ? jQuery(".active-revslide .slotholder .rs-background-video-layer") : "firstvideo" == a.layer ? jQuery(".active-revslide .tp-videolayer").first() : jQuery("#" + a.layer); if ("stoplayer" == a.action || "togglelayer" == a.action || "startlayer" == a.action) { if (o.length > 0) { var r = o.data(); void 0 !== r.clicked_time_stamp && (new Date).getTime() - r.clicked_time_stamp > 150 && (clearTimeout(r.triggerdelayIn), clearTimeout(r.triggerdelayOut)), r.clicked_time_stamp = (new Date).getTime(), "startlayer" == a.action || "togglelayer" == a.action && "in" != o.data("animdirection") ? (r.animdirection = "in", r.triggerstate = "on", _R.toggleState(r.layertoggledby), _R.playAnimationFrame && (clearTimeout(r.triggerdelayIn), r.triggerdelayIn = setTimeout(function () { _R.playAnimationFrame({ caption: o, opt: t, frame: "frame_0", triggerdirection: "in", triggerframein: "frame_0", triggerframeout: "frame_999" }) }, 1e3 * a.delay))) : ("stoplayer" == a.action || "togglelayer" == a.action && "out" != o.data("animdirection")) && (r.animdirection = "out", r.triggered = !0, r.triggerstate = "off", _R.stopVideo && _R.stopVideo(o, t), _R.unToggleState(r.layertoggledby), _R.endMoveCaption && (clearTimeout(r.triggerdelayOut), r.triggerdelayOut = setTimeout(function () { _R.playAnimationFrame({ caption: o, opt: t, frame: "frame_999", triggerdirection: "out", triggerframein: "frame_0", triggerframeout: "frame_999" }) }, 1e3 * a.delay))) } } else !_ISM || "playvideo" != a.action && "stopvideo" != a.action && "togglevideo" != a.action && "mutevideo" != a.action && "unmutevideo" != a.action && "toggle_mute_video" != a.action && "toggle_global_mute_video" != a.action ? (a.delay = "NaN" === a.delay || NaN === a.delay ? 0 : a.delay, _R.isSafari11() ? actionSwitches(o, t, a, e) : punchgs.TweenLite.delayedCall(a.delay, function () { actionSwitches(o, t, a, e) }, [o, t, a, e])) : actionSwitches(o, t, a, e) }), a.action) { case "togglelayer": case "startlayer": case "playlayer": case "stoplayer": var l = (r = jQuery("#" + a.layer)).data(); r.length > 0 && void 0 !== l && (void 0 !== l.frames && "bytrigger" != l.frames[0].delay || void 0 === l.frames && "bytrigger" !== l.start) && (l.triggerstate = "on") } }) }, actionSwitches = function (tnc, opt, a, _nc) { switch (a.action) { case "scrollbelow": a.speed = void 0 !== a.speed ? a.speed : 400, a.ease = void 0 !== a.ease ? a.ease : punchgs.Power2.easeOut, _nc.addClass("tp-scrollbelowslider"), _nc.data("scrolloffset", a.offset), _nc.data("scrolldelay", a.delay), _nc.data("scrollspeed", a.speed), _nc.data("scrollease", a.ease); var off = getOffContH(opt.fullScreenOffsetContainer) || 0, aof = parseInt(a.offset, 0) || 0; off = off - aof || 0, opt.scrollRoot = jQuery(document); var sobj = { _y: opt.scrollRoot.scrollTop() }; punchgs.TweenLite.to(sobj, a.speed / 1e3, { _y: opt.c.offset().top + jQuery(opt.li[0]).height() - off, ease: a.ease, onUpdate: function () { opt.scrollRoot.scrollTop(sobj._y) } }); break; case "callback": eval(a.callback); break; case "jumptoslide": switch (a.slide.toLowerCase()) { case "+1": case "next": opt.sc_indicator = "arrow", _R.callingNewSlide(opt.c, 1); break; case "previous": case "prev": case "-1": opt.sc_indicator = "arrow", _R.callingNewSlide(opt.c, -1); break; default: var ts = jQuery.isNumeric(a.slide) ? parseInt(a.slide, 0) : a.slide; _R.callingNewSlide(opt.c, ts) }break; case "simplelink": window.open(a.url, a.target); break; case "toggleslider": opt.noloopanymore = 0, "playing" == opt.sliderstatus ? (opt.c.revpause(), opt.forcepause_viatoggle = !0, _R.unToggleState(opt.slidertoggledby)) : (opt.forcepause_viatoggle = !1, opt.c.revresume(), _R.toggleState(opt.slidertoggledby)); break; case "pauseslider": opt.c.revpause(), _R.unToggleState(opt.slidertoggledby); break; case "playslider": opt.noloopanymore = 0, opt.c.revresume(), _R.toggleState(opt.slidertoggledby); break; case "playvideo": tnc.length > 0 && _R.playVideo(tnc, opt); break; case "stopvideo": tnc.length > 0 && _R.stopVideo && _R.stopVideo(tnc, opt); break; case "togglevideo": tnc.length > 0 && (_R.isVideoPlaying(tnc, opt) ? _R.stopVideo && _R.stopVideo(tnc, opt) : _R.playVideo(tnc, opt)); break; case "mutevideo": tnc.length > 0 && _R.muteVideo(tnc, opt); break; case "unmutevideo": tnc.length > 0 && _R.unMuteVideo && _R.unMuteVideo(tnc, opt); break; case "toggle_mute_video": tnc.length > 0 && (_R.isVideoMuted(tnc, opt) ? _R.unMuteVideo(tnc, opt) : _R.muteVideo && _R.muteVideo(tnc, opt)), _nc.toggleClass("rs-toggle-content-active"); break; case "toggle_global_mute_video": !0 === opt.globalmute ? (opt.globalmute = !1, void 0 != opt.playingvideos && opt.playingvideos.length > 0 && jQuery.each(opt.playingvideos, function (e, t) { _R.unMuteVideo && _R.unMuteVideo(t, opt) })) : (opt.globalmute = !0, void 0 != opt.playingvideos && opt.playingvideos.length > 0 && jQuery.each(opt.playingvideos, function (e, t) { _R.muteVideo && _R.muteVideo(t, opt) })), _nc.toggleClass("rs-toggle-content-active"); break; case "simulateclick": tnc.length > 0 && tnc.click(); break; case "toggleclass": tnc.length > 0 && (tnc.hasClass(a.classname) ? tnc.removeClass(a.classname) : tnc.addClass(a.classname)); break; case "gofullscreen": case "exitfullscreen": case "togglefullscreen": if (jQuery(".rs-go-fullscreen").length > 0 && ("togglefullscreen" == a.action || "exitfullscreen" == a.action)) { jQuery(".rs-go-fullscreen").removeClass("rs-go-fullscreen"); var gf = opt.c.closest(".forcefullwidth_wrapper_tp_banner").length > 0 ? opt.c.closest(".forcefullwidth_wrapper_tp_banner") : opt.c.closest(".rev_slider_wrapper"); opt.minHeight = opt.oldminheight, opt.infullscreenmode = !1, opt.c.revredraw(), jQuery(window).trigger("resize"), _R.unToggleState(opt.fullscreentoggledby) } else if (0 == jQuery(".rs-go-fullscreen").length && ("togglefullscreen" == a.action || "gofullscreen" == a.action)) { var gf = opt.c.closest(".forcefullwidth_wrapper_tp_banner").length > 0 ? opt.c.closest(".forcefullwidth_wrapper_tp_banner") : opt.c.closest(".rev_slider_wrapper"); gf.addClass("rs-go-fullscreen"), opt.oldminheight = opt.minHeight, opt.minHeight = jQuery(window).height(), opt.infullscreenmode = !0, opt.c.revredraw(), jQuery(window).trigger("resize"), _R.toggleState(opt.fullscreentoggledby) } break; default: var obj = {}; obj.event = a, obj.layer = _nc, opt.c.trigger("layeraction", [obj]) } }, getOffContH = function (e) { if (void 0 == e) return 0; if (e.split(",").length > 1) { var t = e.split(","), o = 0; return t && jQuery.each(t, function (e, t) { jQuery(t).length > 0 && (o += jQuery(t).outerHeight(!0)) }), o } return jQuery(e).height() } }(jQuery);
/********************************************
 * REVOLUTION 5.4 EXTENSION - CAROUSEL
 * @version: 1.2.1 (18.11.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function (a) { "use strict"; var b = jQuery.fn.revolution, c = { alias: "Carousel Min JS", name: "revolution.extensions.carousel.min.js", min_core: "5.3.0", version: "1.2.1" }; jQuery.extend(!0, b, { prepareCarousel: function (a, d, h, i) { return "stop" !== b.compare_version(c).check && (h = a.carousel.lastdirection = f(h, a.carousel.lastdirection), e(a), a.carousel.slide_offset_target = j(a), void (void 0 !== i ? g(a, h, !1, 0) : void 0 == d ? b.carouselToEvalPosition(a, h) : g(a, h, !1))) }, carouselToEvalPosition: function (a, c) { var d = a.carousel; c = d.lastdirection = f(c, d.lastdirection); var e = "center" === d.horizontal_align ? (d.wrapwidth / 2 - d.slide_width / 2 - d.slide_globaloffset) / d.slide_width : (0 - d.slide_globaloffset) / d.slide_width, h = b.simp(e, a.slideamount, !1), i = h - Math.floor(h), j = 0, k = -1 * (Math.ceil(h) - h), l = -1 * (Math.floor(h) - h); j = i >= .3 && "left" === c || i >= .7 && "right" === c ? k : i < .3 && "left" === c || i < .7 && "right" === c ? l : j, j = "off" === d.infinity ? h < 0 ? h : e > a.slideamount - 1 ? e - (a.slideamount - 1) : j : j, d.slide_offset_target = j * d.slide_width, 0 !== Math.abs(d.slide_offset_target) ? g(a, c, !0) : b.organiseCarousel(a, c) }, organiseCarousel: function (a, b, c, d) { b = void 0 === b || "down" == b || "up" == b || null === b || jQuery.isEmptyObject(b) ? "left" : b; for (var e = a.carousel, f = new Array, g = e.slides.length, i = ("right" === e.horizontal_align ? a.width : 0, 0); i < g; i++) { var j = i * e.slide_width + e.slide_offset; "on" === e.infinity && (j = j > e.wrapwidth - e.inneroffset && "right" == b ? e.slide_offset - (e.slides.length - i) * e.slide_width : j, j = j < 0 - e.inneroffset - e.slide_width && "left" == b ? j + e.maxwidth : j), f[i] = j } var k = 999; e.slides && jQuery.each(e.slides, function (d, h) { var i = f[d]; "on" === e.infinity && (i = i > e.wrapwidth - e.inneroffset && "left" === b ? f[0] - (g - d) * e.slide_width : i, i = i < 0 - e.inneroffset - e.slide_width ? "left" == b ? i + e.maxwidth : "right" === b ? f[g - 1] + (d + 1) * e.slide_width : i : i); var j = new Object; j.left = i + e.inneroffset; var l = "center" === e.horizontal_align ? (Math.abs(e.wrapwidth / 2) - (j.left + e.slide_width / 2)) / e.slide_width : (e.inneroffset - j.left) / e.slide_width, n = "center" === e.horizontal_align ? 2 : 1; if ((c && Math.abs(l) < k || 0 === l) && (k = Math.abs(l), e.focused = d), j.width = e.slide_width, j.x = 0, j.transformPerspective = 1200, j.transformOrigin = "50% " + e.vertical_align, "on" === e.fadeout) if ("on" === e.vary_fade) j.autoAlpha = 1 - Math.abs(1 / Math.ceil(e.maxVisibleItems / n) * l); else switch (e.horizontal_align) { case "center": j.autoAlpha = Math.abs(l) < Math.ceil(e.maxVisibleItems / n - 1) ? 1 : 1 - (Math.abs(l) - Math.floor(Math.abs(l))); break; case "left": j.autoAlpha = l < 1 && l > 0 ? 1 - l : Math.abs(l) > e.maxVisibleItems - 1 ? 1 - (Math.abs(l) - (e.maxVisibleItems - 1)) : 1; break; case "right": j.autoAlpha = l > -1 && l < 0 ? 1 - Math.abs(l) : l > e.maxVisibleItems - 1 ? 1 - (Math.abs(l) - (e.maxVisibleItems - 1)) : 1 } else j.autoAlpha = Math.abs(l) < Math.ceil(e.maxVisibleItems / n) ? 1 : 0; if (void 0 !== e.minScale && e.minScale > 0) if ("on" === e.vary_scale) { j.scale = 1 - Math.abs(e.minScale / 100 / Math.ceil(e.maxVisibleItems / n) * l); var o = (e.slide_width - e.slide_width * j.scale) * Math.abs(l) } else { j.scale = l >= 1 || l <= -1 ? 1 - e.minScale / 100 : (100 - e.minScale * Math.abs(l)) / 100; var o = (e.slide_width - e.slide_width * (1 - e.minScale / 100)) * Math.abs(l) } void 0 !== e.maxRotation && 0 != Math.abs(e.maxRotation) && ("on" === e.vary_rotation ? (j.rotationY = Math.abs(e.maxRotation) - Math.abs((1 - Math.abs(1 / Math.ceil(e.maxVisibleItems / n) * l)) * e.maxRotation), j.autoAlpha = Math.abs(j.rotationY) > 90 ? 0 : j.autoAlpha) : j.rotationY = l >= 1 || l <= -1 ? e.maxRotation : Math.abs(l) * e.maxRotation, j.rotationY = l < 0 ? j.rotationY * -1 : j.rotationY), j.x = -1 * e.space * l, j.left = Math.floor(j.left), j.x = Math.floor(j.x), void 0 !== j.scale ? l < 0 ? j.x - o : j.x + o : j.x, j.zIndex = Math.round(100 - Math.abs(5 * l)), j.transformStyle = "3D" != a.parallax.type && "3d" != a.parallax.type ? "flat" : "preserve-3d", punchgs.TweenLite.set(h, j) }), d && (a.c.find(".next-revslide").removeClass("next-revslide"), jQuery(e.slides[e.focused]).addClass("next-revslide"), a.c.trigger("revolution.nextslide.waiting")); e.wrapwidth / 2 - e.slide_offset, e.maxwidth + e.slide_offset - e.wrapwidth / 2 } }); var d = function (a) { var b = a.carousel; b.infbackup = b.infinity, b.maxVisiblebackup = b.maxVisibleItems, b.slide_globaloffset = "none", b.slide_offset = 0, b.wrap = a.c.find(".tp-carousel-wrapper"), b.slides = a.c.find(".tp-revslider-slidesli"), 0 !== b.maxRotation && ("3D" != a.parallax.type && "3d" != a.parallax.type ? punchgs.TweenLite.set(b.wrap, { perspective: 1200, transformStyle: "flat" }) : punchgs.TweenLite.set(b.wrap, { perspective: 1600, transformStyle: "preserve-3d" })), void 0 !== b.border_radius && parseInt(b.border_radius, 0) > 0 && punchgs.TweenLite.set(a.c.find(".tp-revslider-slidesli"), { borderRadius: b.border_radius }) }, e = function (a) { void 0 === a.bw && b.setSize(a); var c = a.carousel, e = b.getHorizontalOffset(a.c, "left"), f = b.getHorizontalOffset(a.c, "right"); void 0 === c.wrap && d(a), c.slide_width = "on" !== c.stretch ? a.gridwidth[a.curWinRange] * a.bw : a.c.width(), c.maxwidth = a.slideamount * c.slide_width, c.maxVisiblebackup > c.slides.length + 1 && (c.maxVisibleItems = c.slides.length + 2), c.wrapwidth = c.maxVisibleItems * c.slide_width + (c.maxVisibleItems - 1) * c.space, c.wrapwidth = "auto" != a.sliderLayout ? c.wrapwidth > a.c.closest(".tp-simpleresponsive").width() ? a.c.closest(".tp-simpleresponsive").width() : c.wrapwidth : c.wrapwidth > a.ul.width() ? a.ul.width() : c.wrapwidth, c.infinity = c.wrapwidth >= c.maxwidth ? "off" : c.infbackup, c.wrapoffset = "center" === c.horizontal_align ? (a.c.width() - f - e - c.wrapwidth) / 2 : 0, c.wrapoffset = "auto" != a.sliderLayout && a.outernav ? 0 : c.wrapoffset < e ? e : c.wrapoffset; var g = "hidden"; "3D" != a.parallax.type && "3d" != a.parallax.type || (g = "visible"), "right" === c.horizontal_align ? punchgs.TweenLite.set(c.wrap, { left: "auto", right: c.wrapoffset + "px", width: c.wrapwidth, overflow: g }) : punchgs.TweenLite.set(c.wrap, { right: "auto", left: c.wrapoffset + "px", width: c.wrapwidth, overflow: g }), c.inneroffset = "right" === c.horizontal_align ? c.wrapwidth - c.slide_width : 0, c.realoffset = Math.abs(c.wrap.position().left), c.windhalf = jQuery(window).width() / 2 }, f = function (a, b) { return null === a || jQuery.isEmptyObject(a) ? b : void 0 === a ? "right" : a }, g = function (a, c, d, e) { var g = a.carousel; c = g.lastdirection = f(c, g.lastdirection); var h = new Object, i = d ? punchgs.Power2.easeOut : g.easing; h.from = 0, h.to = g.slide_offset_target, e = void 0 === e ? g.speed / 1e3 : e, e = d ? .4 : e, void 0 !== g.positionanim && g.positionanim.pause(), g.positionanim = punchgs.TweenLite.to(h, e, { from: h.to, onUpdate: function () { g.slide_offset = g.slide_globaloffset + h.from, g.slide_offset = b.simp(g.slide_offset, g.maxwidth), b.organiseCarousel(a, c, !1, !1) }, onComplete: function () { g.slide_globaloffset = "off" === g.infinity ? g.slide_globaloffset + g.slide_offset_target : b.simp(g.slide_globaloffset + g.slide_offset_target, g.maxwidth), g.slide_offset = b.simp(g.slide_offset, g.maxwidth), b.organiseCarousel(a, c, !1, !0); var e = jQuery(a.li[g.focused]); a.c.find(".next-revslide").removeClass("next-revslide"), d && b.callingNewSlide(a.c, e.data("index")) }, ease: i }) }, h = function (a, b) { return Math.abs(a) > Math.abs(b) ? a > 0 ? a - Math.abs(Math.floor(a / b) * b) : a + Math.abs(Math.floor(a / b) * b) : a }, i = function (a, b, c) { var c, c, d = b - a, e = b - c - a; return d = h(d, c), e = h(e, c), Math.abs(d) > Math.abs(e) ? e : d }, j = function (a) { var c = 0, d = a.carousel; if (void 0 !== d.positionanim && d.positionanim.kill(), "none" == d.slide_globaloffset) d.slide_globaloffset = c = "center" === d.horizontal_align ? d.wrapwidth / 2 - d.slide_width / 2 : 0; else { d.slide_globaloffset = d.slide_offset, d.slide_offset = 0; var e = a.c.find(".processing-revslide").index(), f = "center" === d.horizontal_align ? (d.wrapwidth / 2 - d.slide_width / 2 - d.slide_globaloffset) / d.slide_width : (0 - d.slide_globaloffset) / d.slide_width; f = b.simp(f, a.slideamount, !1), e = e >= 0 ? e : a.c.find(".active-revslide").index(), e = e >= 0 ? e : 0, c = "off" === d.infinity ? f - e : -i(f, e, a.slideamount), c *= d.slide_width } return c } }(jQuery);
/********************************************
 * REVOLUTION 5.4.6.5 EXTENSION - KEN BURN
 * @version: 1.3.1 (15.05.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function (a) { "use strict"; var b = jQuery.fn.revolution, c = { alias: "KenBurns Min JS", name: "revolution.extensions.kenburn.min.js", min_core: "5.4", version: "1.3.1" }; jQuery.extend(!0, b, { stopKenBurn: function (a) { if ("stop" === b.compare_version(c).check) return !1; void 0 != a.data("kbtl") && a.data("kbtl").pause() }, startKenBurn: function (a, d, e) { if ("stop" === b.compare_version(c).check) return !1; var f = a.data(), g = a.find(".defaultimg"), h = g.data("lazyload") || g.data("src"), j = (f.owidth, f.oheight, "carousel" === d.sliderType ? d.carousel.slide_width : d.ul.width()), k = d.ul.height(); if (a.data("kbtl") && a.data("kbtl").kill(), e = e || 0, 0 == a.find(".tp-kbimg").length) { var m = g.data("mediafilter"); m = void 0 === m ? "" : m, a.append('<div class="tp-kbimg-wrap ' + m + '" style="z-index:2;width:100%;height:100%;top:0px;left:0px;position:absolute;"><img class="tp-kbimg" src="' + h + '" style="position:absolute;" width="' + f.owidth + '" height="' + f.oheight + '"></div>'), a.data("kenburn", a.find(".tp-kbimg")) } var n = function (a, b, c, d, e, f, g) { var h = a * c, i = b * c, j = Math.abs(d - h), k = Math.abs(e - i), l = new Object; return l.l = (0 - f) * j, l.r = l.l + h, l.t = (0 - g) * k, l.b = l.t + i, l.h = f, l.v = g, l }, o = function (a, b, c, d, e) { var f = a.bgposition.split(" ") || "center center", g = "center" == f[0] ? "50%" : "left" == f[0] || "left" == f[1] ? "0%" : "right" == f[0] || "right" == f[1] ? "100%" : f[0], h = "center" == f[1] ? "50%" : "top" == f[0] || "top" == f[1] ? "0%" : "bottom" == f[0] || "bottom" == f[1] ? "100%" : f[1]; g = parseInt(g, 0) / 100 || 0, h = parseInt(h, 0) / 100 || 0; var i = new Object; return i.start = n(e.start.width, e.start.height, e.start.scale, b, c, g, h), i.end = n(e.start.width, e.start.height, e.end.scale, b, c, g, h), i }, p = function (a, b, c) { var d = c.scalestart / 100, e = c.scaleend / 100, f = void 0 != c.offsetstart ? c.offsetstart.split(" ") || [0, 0] : [0, 0], g = void 0 != c.offsetend ? c.offsetend.split(" ") || [0, 0] : [0, 0]; c.bgposition = "center center" == c.bgposition ? "50% 50%" : c.bgposition; var h = new Object, i = a * d, k = (c.owidth, c.oheight, a * e); c.owidth, c.oheight; if (h.start = new Object, h.starto = new Object, h.end = new Object, h.endo = new Object, h.start.width = a, h.start.height = h.start.width / c.owidth * c.oheight, h.start.height < b) { var m = b / h.start.height; h.start.height = b, h.start.width = h.start.width * m } h.start.transformOrigin = c.bgposition, h.start.scale = d, h.end.scale = e, c.rotatestart = 0 === c.rotatestart ? .01 : c.rotatestart, h.start.rotation = c.rotatestart + "deg", h.end.rotation = c.rotateend + "deg"; var n = o(c, a, b, f, h); f[0] = parseFloat(f[0]) + n.start.l, g[0] = parseFloat(g[0]) + n.end.l, f[1] = parseFloat(f[1]) + n.start.t, g[1] = parseFloat(g[1]) + n.end.t; var p = n.start.r - n.start.l, q = n.start.b - n.start.t, r = n.end.r - n.end.l, s = n.end.b - n.end.t; return f[0] = f[0] > 0 ? 0 : p + f[0] < a ? a - p : f[0], g[0] = g[0] > 0 ? 0 : r + g[0] < a ? a - r : g[0], f[1] = f[1] > 0 ? 0 : q + f[1] < b ? b - q : f[1], g[1] = g[1] > 0 ? 0 : s + g[1] < b ? b - s : g[1], h.starto.x = f[0] + "px", h.starto.y = f[1] + "px", h.endo.x = g[0] + "px", h.endo.y = g[1] + "px", h.end.ease = h.endo.ease = c.ease, h.end.force3D = h.endo.force3D = !0, h }; void 0 != a.data("kbtl") && (a.data("kbtl").kill(), a.removeData("kbtl")); var q = a.data("kenburn"), r = q.parent(), s = p(j, k, f), t = new punchgs.TimelineLite; if (t.pause(), s.start.transformOrigin = "0% 0%", s.starto.transformOrigin = "0% 0%", t.add(punchgs.TweenLite.fromTo(q, f.duration / 1e3, s.start, s.end), 0), t.add(punchgs.TweenLite.fromTo(r, f.duration / 1e3, s.starto, s.endo), 0), void 0 !== f.blurstart && void 0 !== f.blurend && (0 !== f.blurstart || 0 !== f.blurend)) { var u = { a: f.blurstart }, v = { a: f.blurend, ease: s.endo.ease }, w = new punchgs.TweenLite(u, f.duration / 1e3, v); w.eventCallback("onUpdate", function (a) { punchgs.TweenLite.set(a, { filter: "blur(" + u.a + "px)", webkitFilter: "blur(" + u.a + "px)" }) }, [r]), t.add(w, 0) } t.progress(e), t.play(), a.data("kbtl", t) } }) }(jQuery);
/************************************************
 * REVOLUTION 5.4.6.5 EXTENSION - LAYER ANIMATION
 * @version: 3.6.5 (10.06.2018)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
************************************************/
!function (e) { "use strict"; var A = jQuery.fn.revolution, l = (A.is_mobile(), A.is_android(), { alias: "LayerAnimation Min JS", name: "revolution.extensions.layeranimation.min.js", min_core: "5.4.6.4", version: "3.6.5" }); jQuery.extend(!0, A, { updateMarkup: function (e, t) { var i = jQuery(e).data(); if (void 0 !== i.start && !i.frames_added && void 0 === i.frames) { var a = new Array, n = F(B(), i.transform_in, void 0, !1), r = F(B(), i.transform_out, void 0, !1), o = F(B(), i.transform_hover, void 0, !1); jQuery.isNumeric(i.end) && jQuery.isNumeric(i.start) && jQuery.isNumeric(n.speed) && (i.end = parseInt(i.end, 0) - (parseInt(i.start, 0) + parseFloat(n.speed, 0))), a.push({ frame: "0", delay: i.start, from: i.transform_in, to: i.transform_idle, split: i.splitin, speed: n.speed, ease: n.anim.ease, mask: i.mask_in, splitdelay: i.elementdelay }), a.push({ frame: "5", delay: i.end, to: i.transform_out, split: i.splitout, speed: r.speed, ease: r.anim.ease, mask: i.mask_out, splitdelay: i.elementdelay }), i.transform_hover && a.push({ frame: "hover", to: i.transform_hover, style: i.style_hover, speed: o.speed, ease: o.anim.ease, splitdelay: i.elementdelay }), i.frames = a } if (!i.frames_added) { if (i.inframeindex = 0, i.outframeindex = -1, i.hoverframeindex = -1, void 0 !== i.frames) for (var s = 0; s < i.frames.length; s++)void 0 !== i.frames[s].sfx_effect && 0 <= i.frames[s].sfx_effect.indexOf("block") && (0 === s ? (i.frames[s].from = "o:0", i.frames[s].to = "o:1") : i.frames[s].to = "o:0", i._sfx = "block"), void 0 === i.frames[0].from && (i.frames[0].from = "o:inherit"), 0 === i.frames[0].delay && (i.frames[0].delay = 20), "hover" === i.frames[s].frame ? i.hoverframeindex = s : "frame_999" !== i.frames[s].frame && "frame_out" !== i.frames[s].frame && "last" !== i.frames[s].frame && "end" !== i.frames[s].frame || (i.outframeindex = s), void 0 !== i.frames[s].split && i.frames[s].split.match(/chars|words|lines/g) && (i.splittext = !0); i.outframeindex = -1 === i.outframeindex ? -1 === i.hoverframeindex ? i.frames.length - 1 : i.frames.length - 2 : i.outframeindex, i.frames_added = !0 } }, animcompleted: function (e, t) { var i = e.data(), a = i.videotype, n = i.autoplay, r = i.autoplayonlyfirsttime; null != a && "none" != a && (1 == n || "true" == n || "on" == n || "1sttime" == n || r ? (("carousel" !== t.sliderType || "carousel" === t.sliderType && "on" === t.carousel.showLayersAllTime && e.closest("li").hasClass("active-revslide") || "carousel" === t.sliderType && "on" !== t.carousel.showLayersAllTime && e.closest("li").hasClass("active-revslide")) && A.playVideo(e, t), A.toggleState(e.data("videotoggledby")), (r || "1sttime" == n) && (i.autoplayonlyfirsttime = !1, i.autoplay = "off")) : ("no1sttime" == n && (i.datasetautoplay = "on"), A.unToggleState(e.data("videotoggledby")))) }, handleStaticLayers: function (e, t) { var i = parseInt(e.data("startslide"), 0), a = parseInt(e.data("endslide"), 0); i < 0 && (i = 0), a < 0 && (a = t.realslideamount), 0 === i && a === t.realslideamount - 1 && (a = t.realslideamount + 1), e.data("startslide", i), e.data("endslide", a) }, animateTheCaptions: function (e) { if ("stop" === A.compare_version(l).check) return !1; var p = e.opt, t = e.slide, n = e.recall, i = e.maintimeline, r = e.preset, o = e.startslideanimat, s = "carousel" === p.sliderType ? 0 : p.width / 2 - p.gridwidth[p.curWinRange] * p.bw / 2, a = t.data("index"); if (p.layers = p.layers || new Object, p.layers[a] = p.layers[a] || t.find(".tp-caption"), p.layers.static = p.layers.static || p.c.find(".tp-static-layers").find(".tp-caption"), void 0 === p.timelines && A.createTimelineStructure(p), p.conh = p.c.height(), p.conw = p.c.width(), p.ulw = p.ul.width(), p.ulh = p.ul.height(), p.debugMode) { t.addClass("indebugmode"), t.find(".helpgrid").remove(), p.c.find(".hglayerinfo").remove(), t.append('<div class="helpgrid" style="width:' + p.gridwidth[p.curWinRange] * p.bw + "px;height:" + p.gridheight[p.curWinRange] * p.bw + 'px;"></div>'); var d = t.find(".helpgrid"); d.append('<div class="hginfo">Zoom:' + Math.round(100 * p.bw) + "% &nbsp;&nbsp;&nbsp; Device Level:" + p.curWinRange + "&nbsp;&nbsp;&nbsp; Grid Preset:" + p.gridwidth[p.curWinRange] + "x" + p.gridheight[p.curWinRange] + "</div>"), p.c.append('<div class="hglayerinfo"></div>'), d.append('<div class="tlhg"></div>') } void 0 !== a && p.layers[a] && jQuery.each(p.layers[a], function (e, t) { var i = jQuery(this); A.updateMarkup(this, p), A.prepareSingleCaption({ caption: i, opt: p, offsetx: s, offsety: 0, index: e, recall: n, preset: r }), r && 0 !== o || A.buildFullTimeLine({ caption: i, opt: p, offsetx: s, offsety: 0, index: e, recall: n, preset: r, regenerate: 0 === o }), n && "carousel" === p.sliderType && "on" === p.carousel.showLayersAllTime && A.animcompleted(i, p) }), p.layers.static && jQuery.each(p.layers.static, function (e, t) { var i = jQuery(this), a = i.data(); !0 !== a.hoveredstatus && !0 !== a.inhoveroutanimation ? (A.updateMarkup(this, p), A.prepareSingleCaption({ caption: i, opt: p, offsetx: s, offsety: 0, index: e, recall: n, preset: r }), r && 0 !== o || !0 === a.veryfirstststic || (A.buildFullTimeLine({ caption: i, opt: p, offsetx: s, offsety: 0, index: e, recall: n, preset: r, regenerate: 0 === o }), a.veryfirstststic = !0), n && "carousel" === p.sliderType && "on" === p.carousel.showLayersAllTime && A.animcompleted(i, p)) : A.prepareSingleCaption({ caption: i, opt: p, offsetx: s, offsety: 0, index: e, recall: n, preset: r }) }); var g = -1 === p.nextSlide || void 0 === p.nextSlide ? 0 : p.nextSlide; void 0 !== p.rowzones && (g = g > p.rowzones.length ? p.rowzones.length : g), null != p.rowzones && 0 < p.rowzones.length && null != p.rowzones[g] && 0 <= g && g <= p.rowzones.length && 0 < p.rowzones[g].length && A.setSize(p), r || void 0 !== o && (void 0 !== a && jQuery.each(p.timelines[a].layers, function (e, t) { var i = t.layer.data(); "none" !== t.wrapper && void 0 !== t.wrapper || ("keep" == t.triggerstate && "on" === i.triggerstate ? A.playAnimationFrame({ caption: t.layer, opt: p, frame: "frame_0", triggerdirection: "in", triggerframein: "frame_0", triggerframeout: "frame_999" }) : t.timeline.restart()) }), p.timelines.staticlayers && jQuery.each(p.timelines.staticlayers.layers, function (e, t) { var i = t.layer.data(), a = g >= t.firstslide && g <= t.lastslide, n = g < t.firstslide || g > t.lastslide, r = t.timeline.getLabelTime("slide_" + t.firstslide), o = t.timeline.getLabelTime("slide_" + t.lastslide), s = i.static_layer_timeline_time, d = "in" === i.animdirection || "out" !== i.animdirection && void 0, l = "bytrigger" === i.frames[0].delay, m = (i.frames[i.frames.length - 1].delay, i.triggered_startstatus), c = i.lasttriggerstate; !0 !== i.hoveredstatus && 1 != i.inhoveroutanimation && (void 0 !== s && d && ("keep" == c ? (A.playAnimationFrame({ caption: t.layer, opt: p, frame: "frame_0", triggerdirection: "in", triggerframein: "frame_0", triggerframeout: "frame_999" }), i.triggeredtimeline.time(s)) : !0 !== i.hoveredstatus && t.timeline.time(s)), "reset" === c && "hidden" === m && (t.timeline.time(0), i.animdirection = "out"), a ? d ? g === t.lastslide && (t.timeline.play(o), i.animdirection = "in") : (l || "in" === i.animdirection || t.timeline.play(r), ("visible" == m && "keep" !== c || "keep" === c && !0 === d || "visible" == m && void 0 === d) && (t.timeline.play(r + .01), i.animdirection = "in")) : n && d && t.timeline.play("frame_999")) })), null != i && setTimeout(function () { i.resume() }, 30) }, prepareSingleCaption: function (e) { var t = e.caption, i = t.data(), a = e.opt, n = e.recall, r = e.recall, o = (e.preset, jQuery("body").hasClass("rtl")); if (i._pw = void 0 === i._pw ? t.closest(".tp-parallax-wrap") : i._pw, i._lw = void 0 === i._lw ? t.closest(".tp-loop-wrap") : i._lw, i._mw = void 0 === i._mw ? t.closest(".tp-mask-wrap") : i._mw, i._responsive = i.responsive || "on", i._respoffset = i.responsive_offset || "on", i._ba = i.basealign || "grid", i._gw = "grid" === i._ba ? a.width : a.ulw, i._gh = "grid" === i._ba ? a.height : a.ulh, i._lig = void 0 === i._lig ? t.hasClass("rev_layer_in_group") ? t.closest(".rev_group") : t.hasClass("rev_layer_in_column") ? t.closest(".rev_column_inner") : t.hasClass("rev_column_inner") ? t.closest(".rev_row") : "none" : i._lig, i._column = void 0 === i._column ? t.hasClass("rev_column_inner") ? t.closest(".rev_column") : "none" : i._column, i._row = void 0 === i._row ? t.hasClass("rev_column_inner") ? t.closest(".rev_row") : "none" : i._row, i._ingroup = void 0 === i._ingroup ? !(t.hasClass("rev_group") || !t.closest(".rev_group")) : i._ingroup, i._isgroup = void 0 === i._isgroup ? !!t.hasClass("rev_group") : i._isgroup, i._nctype = i.type || "none", i._cbgc_auto = void 0 === i._cbgc_auto ? "column" === i._nctype && i._pw.find(".rev_column_bg_auto_sized") : i._cbgc_auto, i._cbgc_man = void 0 === i._cbgc_man ? "column" === i._nctype && i._pw.find(".rev_column_bg_man_sized") : i._cbgc_man, i._slideid = i._slideid || t.closest(".tp-revslider-slidesli").data("index"), i._id = void 0 === i._id ? t.data("id") || t.attr("id") : i._id, i._slidelink = void 0 === i._slidelink ? void 0 !== t.hasClass("slidelink") && t.hasClass("slidelink") : i._slidelink, void 0 === i._li && (t.hasClass("tp-static-layer") ? (i._isstatic = !0, i._li = t.closest(".tp-static-layers"), i._slideid = "staticlayers") : i._li = t.closest(".tp-revslider-slidesli")), i._row = void 0 === i._row ? "column" === i._nctype && i._pw.closest(".rev_row") : i._row, void 0 === i._togglelisteners && t.find(".rs-toggled-content") ? (i._togglelisteners = !0, void 0 === i.actions && t.click(function () { A.swaptoggleState(t) })) : i._togglelisteners = !1, "fullscreen" == a.sliderLayout && (e.offsety = i._gh / 2 - a.gridheight[a.curWinRange] * a.bh / 2), ("on" == a.autoHeight || null != a.minHeight && 0 < a.minHeight) && (e.offsety = a.conh / 2 - a.gridheight[a.curWinRange] * a.bh / 2), e.offsety < 0 && (e.offsety = 0), a.debugMode) { t.closest("li").find(".helpgrid").css({ top: e.offsety + "px", left: e.offsetx + "px" }); var s = a.c.find(".hglayerinfo"); t.on("hover, mouseenter", function () { var i = ""; t.data() && jQuery.each(t.data(), function (e, t) { "object" != typeof t && (i = i + '<span style="white-space:nowrap"><span style="color:#27ae60">' + e + ":</span>" + t + "</span>&nbsp; &nbsp; ") }), s.html(i) }) } if ("off" === (void 0 === i.visibility ? "oon" : N(i.visibility, a)[a.forcedWinRange] || N(i.visibility, a) || "ooon") || i._gw < a.hideCaptionAtLimit && "on" == i.captionhidden || i._gw < a.hideAllCaptionAtLimit ? i._pw.addClass("tp-hidden-caption") : i._pw.removeClass("tp-hidden-caption"), i.layertype = "html", e.offsetx < 0 && (e.offsetx = 0), null != i.thumbimage && null == i.videoposter && (i.videoposter = i.thumbimage), 0 < t.find("img").length) { var d = t.find("img"); i.layertype = "image", 0 == d.width() && d.css({ width: "auto" }), 0 == d.height() && d.css({ height: "auto" }), null == d.data("ww") && 0 < d.width() && d.data("ww", d.width()), null == d.data("hh") && 0 < d.height() && d.data("hh", d.height()); var l = d.data("ww"), m = d.data("hh"), c = "slide" == i._ba ? a.ulw : a.gridwidth[a.curWinRange], p = "slide" == i._ba ? a.ulh : a.gridheight[a.curWinRange], g = "full" === (l = N(d.data("ww"), a)[a.curWinRange] || N(d.data("ww"), a) || "auto") || "full-proportional" === l, u = "full" === (m = N(d.data("hh"), a)[a.curWinRange] || N(d.data("hh"), a) || "auto") || "full-proportional" === m; if ("full-proportional" === l) { var f = d.data("owidth"), h = d.data("oheight"); f / c < h / p ? m = h * ((l = c) / f) : l = f * ((m = p) / h) } else l = g ? c : !jQuery.isNumeric(l) && 0 < l.indexOf("%") ? l : parseFloat(l), m = u ? p : !jQuery.isNumeric(m) && 0 < m.indexOf("%") ? m : parseFloat(m); l = void 0 === l ? 0 : l, m = void 0 === m ? 0 : m, "off" !== i._responsive ? ("grid" != i._ba && g ? jQuery.isNumeric(l) ? d.css({ width: l + "px" }) : d.css({ width: l }) : jQuery.isNumeric(l) ? d.css({ width: l * a.bw + "px" }) : d.css({ width: l }), "grid" != i._ba && u ? jQuery.isNumeric(m) ? d.css({ height: m + "px" }) : d.css({ height: m }) : jQuery.isNumeric(m) ? d.css({ height: m * a.bh + "px" }) : d.css({ height: m })) : d.css({ width: l, height: m }), i._ingroup && "row" !== i._nctype && (void 0 !== l && !jQuery.isNumeric(l) && "string" === jQuery.type(l) && 0 < l.indexOf("%") && punchgs.TweenLite.set([i._lw, i._pw, i._mw], { minWidth: l }), void 0 !== m && !jQuery.isNumeric(m) && "string" === jQuery.type(m) && 0 < m.indexOf("%") && punchgs.TweenLite.set([i._lw, i._pw, i._mw], { minHeight: m })) } if ("slide" === i._ba) e.offsetx = 0, e.offsety = 0; else if (i._isstatic && void 0 !== a.carousel && void 0 !== a.carousel.horizontal_align && "carousel" === a.sliderType) { switch (a.carousel.horizontal_align) { case "center": e.offsetx = 0 + (a.ulw - a.gridwidth[a.curWinRange] * a.bw) / 2; break; case "left": break; case "right": e.offsetx = a.ulw - a.gridwidth[a.curWinRange] * a.bw }e.offsetx = e.offsetx < 0 ? 0 : e.offsetx } var v = "html5" == i.audio ? "audio" : "video"; if (t.hasClass("tp-videolayer") || t.hasClass("tp-audiolayer") || 0 < t.find("iframe").length || 0 < t.find(v).length) { if (i.layertype = "video", A.manageVideoLayer && A.manageVideoLayer(t, a, n, r), !n && !r) { i.videotype; A.resetVideo && A.resetVideo(t, a, e.preset) } var _ = i.aspectratio; null != _ && 1 < _.split(":").length && A.prepareCoveredVideo(a, t); d = t.find("iframe") ? t.find("iframe") : d = t.find(v); var b = !t.find("iframe"), y = t.hasClass("coverscreenvideo"); d.css({ display: "block" }), null == t.data("videowidth") && (t.data("videowidth", d.width()), t.data("videoheight", d.height())); l = N(t.data("videowidth"), a)[a.curWinRange] || N(t.data("videowidth"), a) || "auto", m = N(t.data("videoheight"), a)[a.curWinRange] || N(t.data("videoheight"), a) || "auto"; l = "auto" === l || !jQuery.isNumeric(l) && 0 < l.indexOf("%") ? "auto" === l ? "auto" : "grid" === i._ba ? a.gridwidth[a.curWinRange] * a.bw : i._gw : parseFloat(l) * a.bw + "px", m = "auto" === m || !jQuery.isNumeric(m) && 0 < m.indexOf("%") ? "auto" === m ? "auto" : "grid" === i._ba ? a.gridheight[a.curWinRange] * a.bw : i._gh : parseFloat(m) * a.bh + "px", i.cssobj = void 0 === i.cssobj ? V(t, 0) : i.cssobj; var w = Z(i.cssobj, a); if ("auto" == w.lineHeight && (w.lineHeight = w.fontSize + 4), t.hasClass("fullscreenvideo") || y) { e.offsetx = 0, e.offsety = 0, t.data("x", 0), t.data("y", 0); var x = i._gh; "on" == a.autoHeight && (x = a.conh), t.css({ width: i._gw, height: x }) } else punchgs.TweenLite.set(t, { paddingTop: Math.round(w.paddingTop * a.bh) + "px", paddingBottom: Math.round(w.paddingBottom * a.bh) + "px", paddingLeft: Math.round(w.paddingLeft * a.bw) + "px", paddingRight: Math.round(w.paddingRight * a.bw) + "px", marginTop: w.marginTop * a.bh + "px", marginBottom: w.marginBottom * a.bh + "px", marginLeft: w.marginLeft * a.bw + "px", marginRight: w.marginRight * a.bw + "px", borderTopWidth: Math.round(w.borderTopWidth * a.bh) + "px", borderBottomWidth: Math.round(w.borderBottomWidth * a.bh) + "px", borderLeftWidth: Math.round(w.borderLeftWidth * a.bw) + "px", borderRightWidth: Math.round(w.borderRightWidth * a.bw) + "px", width: l, height: m }); (0 == b && !y || 1 != i.forcecover && !t.hasClass("fullscreenvideo") && !y) && (d.width(l), d.height(m)), i._ingroup && null !== i.videowidth && void 0 !== i.videowidth && !jQuery.isNumeric(i.videowidth) && 0 < i.videowidth.indexOf("%") && punchgs.TweenLite.set([i._lw, i._pw, i._mw], { minWidth: i.videowidth }) } E(t, a, 0, i._responsive), t.hasClass("tp-resizeme") && t.find("*").each(function () { E(jQuery(this), a, "rekursive", i._responsive) }); var T = t.outerHeight(), k = t.css("backgroundColor"); D(t, ".frontcorner", "left", "borderRight", "borderTopColor", T, k), D(t, ".frontcornertop", "left", "borderRight", "borderBottomColor", T, k), D(t, ".backcorner", "right", "borderLeft", "borderBottomColor", T, k), D(t, ".backcornertop", "right", "borderLeft", "borderTopColor", T, k), "on" == a.fullScreenAlignForce && (e.offsetx = 0, e.offsety = 0), "block" === i._sfx && void 0 === i._bmask && (i._bmask = jQuery('<div class="tp-blockmask"></div>'), i._mw.append(i._bmask)), i.arrobj = new Object, i.arrobj.voa = N(i.voffset, a)[a.curWinRange] || N(i.voffset, a)[0], i.arrobj.hoa = N(i.hoffset, a)[a.curWinRange] || N(i.hoffset, a)[0], i.arrobj.elx = N(i.x, a)[a.curWinRange] || N(i.x, a)[0], i.arrobj.ely = N(i.y, a)[a.curWinRange] || N(i.y, a)[0]; var j = 0 == i.arrobj.voa.length ? 0 : i.arrobj.voa, L = 0 == i.arrobj.hoa.length ? 0 : i.arrobj.hoa, I = 0 == i.arrobj.elx.length ? 0 : i.arrobj.elx, W = 0 == i.arrobj.ely.length ? 0 : i.arrobj.ely; i.eow = t.outerWidth(!0), i.eoh = t.outerHeight(!0), 0 == i.eow && 0 == i.eoh && (i.eow = a.ulw, i.eoh = a.ulh); var R = "off" !== i._respoffset ? parseInt(j, 0) * a.bw : parseInt(j, 0), C = "off" !== i._respoffset ? parseInt(L, 0) * a.bw : parseInt(L, 0), z = "grid" === i._ba ? a.gridwidth[a.curWinRange] * a.bw : i._gw, O = "grid" === i._ba ? a.gridheight[a.curWinRange] * a.bw : i._gh; "on" == a.fullScreenAlignForce && (z = a.ulw, O = a.ulh), "none" !== i._lig && null != i._lig && (z = i._lig.width(), O = i._lig.height(), e.offsetx = 0, e.offsety = 0), I = "center" === I || "middle" === I ? z / 2 - i.eow / 2 + C : "left" === I ? C : "right" === I ? z - i.eow - C : "off" !== i._respoffset ? I * a.bw : I, W = "center" == W || "middle" == W ? O / 2 - i.eoh / 2 + R : "top" == W ? R : "bottom" == W ? O - i.eoh - R : "off" !== i._respoffset ? W * a.bw : W, o && !i._slidelink && (I += i.eow), i._slidelink && (I = 0), i.calcx = parseInt(I, 0) + e.offsetx, i.calcy = parseInt(W, 0) + e.offsety; var Q = t.css("z-Index"); if ("row" !== i._nctype && "column" !== i._nctype) punchgs.TweenLite.set(i._pw, { zIndex: Q, top: i.calcy, left: i.calcx, overwrite: "auto" }); else if ("row" !== i._nctype) punchgs.TweenLite.set(i._pw, { zIndex: Q, width: i.columnwidth, top: 0, left: 0, overwrite: "auto" }); else if ("row" === i._nctype) { var S = "grid" === i._ba ? z + "px" : "100%"; punchgs.TweenLite.set(i._pw, { zIndex: Q, width: S, top: 0, left: e.offsetx, overwrite: "auto" }) } if (void 0 !== i.blendmode && punchgs.TweenLite.set(i._pw, { mixBlendMode: i.blendmode }), "row" === i._nctype && (i.columnbreak <= a.curWinRange ? t.addClass("rev_break_columns") : t.removeClass("rev_break_columns")), "on" == i.loopanimation && punchgs.TweenLite.set(i._lw, { minWidth: i.eow, minHeight: i.eoh }), "column" === i._nctype) { var M = void 0 !== t[0]._gsTransform ? t[0]._gsTransform.y : 0, P = parseInt(i._column[0].style.paddingTop, 0); punchgs.TweenLite.set(t, { y: 0 }), punchgs.TweenLite.set(i._cbgc_man, { y: parseInt(P + i._column.offset().top - t.offset().top, 0) }), punchgs.TweenLite.set(t, { y: M }) } i._ingroup && "row" !== i._nctype && (void 0 !== i._groupw && !jQuery.isNumeric(i._groupw) && 0 < i._groupw.indexOf("%") && punchgs.TweenLite.set([i._lw, i._pw, i._mw], { minWidth: i._groupw }), void 0 !== i._grouph && !jQuery.isNumeric(i._grouph) && 0 < i._grouph.indexOf("%") && punchgs.TweenLite.set([i._lw, i._pw, i._mw], { minHeight: i._grouph })) }, createTimelineStructure: function (s) { s.timelines = s.timelines || new Object, s.c.find(".tp-revslider-slidesli, .tp-static-layers").each(function () { var e = jQuery(this), o = e.data("index"); s.timelines[o] = s.timelines[o] || {}, s.timelines[o].layers = s.timelines[o].layers || new Object, e.find(".tp-caption").each(function (e) { var t, i, a, n, r; t = jQuery(this), i = s.timelines[o].layers, a = o, r = new punchgs.TimelineLite({ paused: !0 }), (i = i || new Object)[t.attr("id")] = i[t.attr("id")] || new Object, "staticlayers" === a && (i[t.attr("id")].firstslide = t.data("startslide"), i[t.attr("id")].lastslide = t.data("endslide")), t.data("slideid", a), i[t.attr("id")].defclasses = n = t[0].className, i[t.attr("id")].wrapper = 0 <= n.indexOf("rev_layer_in_column") ? t.closest(".rev_column_inner") : 0 <= n.indexOf("rev_column_inner") ? t.closest(".rev_row") : 0 <= n.indexOf("rev_layer_in_group") ? t.closest(".rev_group") : "none", i[t.attr("id")].timeline = r, i[t.attr("id")].layer = t, i[t.attr("id")].triggerstate = t.data("lasttriggerstate"), i[t.attr("id")].dchildren = 0 <= n.indexOf("rev_row") ? t[0].getElementsByClassName("rev_column_inner") : 0 <= n.indexOf("rev_column_inner") ? t[0].getElementsByClassName("tp-caption") : 0 <= n.indexOf("rev_group") ? t[0].getElementsByClassName("rev_layer_in_group") : "none", t.data("timeline", r) }) }) }, buildFullTimeLine: function (e) { var t, i, a = e.caption, n = a.data(), r = e.opt, o = {}, s = h(); if (!(t = r.timelines[n._slideid].layers[n._id]).generated || !0 === e.regenerate) { if (i = t.timeline, t.generated = !0, void 0 !== n.current_timeline && !0 !== e.regenerate ? (n.current_timeline_pause = n.current_timeline.paused(), n.current_timeline_time = n.current_timeline.time(), n.current_is_nc_timeline = i === n.current_timeline, n.static_layer_timeline_time = n.current_timeline_time) : (n.static_layer_timeline_time = n.current_timeline_time, n.current_timeline_time = 0, n.current_timeline && n.current_timeline.clear()), i.clear(), o.svg = null != n.svg_src && a.find("svg"), o.svg && (n.idlesvg = f(n.svg_idle, u()), punchgs.TweenLite.set(o.svg, n.idlesvg.anim)), -1 !== n.hoverframeindex && void 0 !== n.hoverframeindex && !a.hasClass("rs-hover-ready")) { if (a.addClass("rs-hover-ready"), n.hovertimelines = {}, n.hoveranim = F(s, n.frames[n.hoverframeindex].to), n.hoveranim = v(n.hoveranim, n.frames[n.hoverframeindex].style), o.svg) { var d = f(n.svg_hover, u()); null != n.hoveranim.anim.color && (d.anim.fill = n.hoveranim.anim.color, n.idlesvg.anim.css.fill = o.svg.css("fill")), n.hoversvg = d } a.hover(function (e) { var t = { caption: jQuery(e.currentTarget), opt: r, firstframe: "frame_0", lastframe: "frame_999" }, i = (g(t), t.caption), a = i.data(), n = a.frames[a.hoverframeindex]; a.forcehover = n.force, a.hovertimelines.item = punchgs.TweenLite.to(i, n.speed / 1e3, a.hoveranim.anim), (a.hoverzIndex || a.hoveranim.anim && a.hoveranim.anim.zIndex) && (a.basiczindex = void 0 === a.basiczindex ? a.cssobj.zIndex : a.basiczindex, a.hoverzIndex = void 0 === a.hoverzIndex ? a.hoveranim.anim.zIndex : a.hoverzIndex, a.inhoverinanimation = !0, 0 === n.speed && (a.inhoverinanimation = !1), a.hovertimelines.pwhoveranim = punchgs.TweenLite.to(a._pw, n.speed / 1e3, { overwrite: "auto", zIndex: a.hoverzIndex }), a.hovertimelines.pwhoveranim.eventCallback("onComplete", function (e) { e.inhoverinanimation = !1 }, [a])), o.svg && (a.hovertimelines.svghoveranim = punchgs.TweenLite.to([o.svg, o.svg.find("path")], n.speed / 1e3, a.hoversvg.anim)), a.hoveredstatus = !0 }, function (e) { var t = { caption: jQuery(e.currentTarget), opt: r, firstframe: "frame_0", lastframe: "frame_999" }, i = (g(t), t.caption), a = i.data(), n = a.frames[a.hoverframeindex]; a.hoveredstatus = !1, a.inhoveroutanimation = !0, a.hovertimelines.item.pause(), a.hovertimelines.item = punchgs.TweenLite.to(i, n.speed / 1e3, jQuery.extend(!0, {}, a._gsTransformTo)), 0 == n.speed && (a.inhoveroutanimation = !1), a.hovertimelines.item.eventCallback("onComplete", function (e) { e.inhoveroutanimation = !1 }, [a]), void 0 !== a.hovertimelines.pwhoveranim && (a.hovertimelines.pwhoveranim = punchgs.TweenLite.to(a._pw, n.speed / 1e3, { overwrite: "auto", zIndex: a.basiczindex })), o.svg && punchgs.TweenLite.to([o.svg, o.svg.find("path")], n.speed / 1e3, a.idlesvg.anim) }) } for (var l = 0; l < n.frames.length; l++)if (l !== n.hoverframeindex) { var m = l === n.inframeindex ? "frame_0" : l === n.outframeindex || "frame_999" === n.frames[l].frame ? "frame_999" : "frame_" + l; t[n.frames[l].framename = m] = {}, t[m].timeline = new punchgs.TimelineLite({ align: "normal" }); var c = n.frames[l].delay, p = (n.triggered_startstatus, void 0 !== c ? 0 <= jQuery.inArray(c, ["slideenter", "bytrigger", "wait"]) ? c : parseInt(c, 0) / 1e3 : "wait"); void 0 !== t.firstslide && "frame_0" === m && (i.addLabel("slide_" + t.firstslide + "_pause", 0), i.addPause("slide_" + t.firstslide + "_pause"), i.addLabel("slide_" + t.firstslide, "+=0.005")), void 0 !== t.lastslide && "frame_999" === m && (i.addLabel("slide_" + t.lastslide + "_pause", "+=0.01"), i.addPause("slide_" + t.lastslide + "_pause"), i.addLabel("slide_" + t.lastslide, "+=0.005")), jQuery.isNumeric(p) ? i.addLabel(m, "+=" + p) : (i.addLabel("pause_" + l, "+=0.01"), i.addPause("pause_" + l), i.addLabel(m, "+=0.01")), i = A.createFrameOnTimeline({ caption: e.caption, timeline: i, label: m, frameindex: l, opt: r }) } e.regenerate || (n.current_is_nc_timeline && (n.current_timeline = i), n.current_timeline_pause ? i.pause(n.current_timeline_time) : i.time(n.current_timeline_time)) } }, createFrameOnTimeline: function (e) { var t = e.caption, i = t.data(), a = e.label, n = e.timeline, r = e.frameindex, o = e.opt, s = t, d = {}, l = o.timelines[i._slideid].layers[i._id], m = i.frames.length - 1, c = i.frames[r].split, p = i.frames[r].split_direction, g = i.frames[r].sfx_effect, u = !1; if (p = void 0 === p ? "forward" : p, -1 !== i.hoverframeindex && i.hoverframeindex == m && (m -= 1), d.content = new punchgs.TimelineLite({ align: "normal" }), d.mask = new punchgs.TimelineLite({ align: "normal" }), void 0 === n.vars.id && (n.vars.id = Math.round(1e5 * Math.random())), "column" === i._nctype && (n.add(punchgs.TweenLite.set(i._cbgc_man, { visibility: "visible" }), a), n.add(punchgs.TweenLite.set(i._cbgc_auto, { visibility: "hidden" }), a)), i.splittext && 0 === r) { void 0 !== i.mySplitText && i.mySplitText.revert(); var f = 0 < t.find("a").length ? t.find("a") : t; i.mySplitText = new punchgs.SplitText(f, { type: "chars,words,lines", charsClass: "tp-splitted tp-charsplit", wordsClass: "tp-splitted tp-wordsplit", linesClass: "tp-splitted tp-linesplit" }), t.addClass("splitted") } void 0 !== i.mySplitText && c && c.match(/chars|words|lines/g) && (s = i.mySplitText[c], u = !0); var h, v, _ = r !== i.outframeindex ? F(B(), i.frames[r].to, void 0, u, s.length - 1) : void 0 !== i.frames[r].to && null === i.frames[r].to.match(/auto:auto/g) ? F(X(), i.frames[r].to, 1 == o.sdir, u, s.length - 1) : F(X(), i.frames[i.inframeindex].from, 0 == o.sdir, u, s.length - 1), b = void 0 !== i.frames[r].from ? F(_, i.frames[i.inframeindex].from, 1 == o.sdir, u, s.length - 1) : void 0, y = i.frames[r].splitdelay; if (0 !== r || e.fromcurrentstate ? v = H(i.frames[r].mask) : h = H(i.frames[r].mask), _.anim.ease = void 0 === i.frames[r].ease ? punchgs.Power1.easeInOut : i.frames[r].ease, void 0 !== b && (b.anim.ease = void 0 === i.frames[r].ease ? punchgs.Power1.easeInOut : i.frames[r].ease, b.speed = void 0 === i.frames[r].speed ? b.speed : i.frames[r].speed, b.anim.x = b.anim.x * o.bw || Y(b.anim.x, o, i.eow, i.eoh, i.calcy, i.calcx, "horizontal"), b.anim.y = b.anim.y * o.bw || Y(b.anim.y, o, i.eow, i.eoh, i.calcy, i.calcx, "vertical")), void 0 !== _ && (_.anim.ease = void 0 === i.frames[r].ease ? punchgs.Power1.easeInOut : i.frames[r].ease, _.speed = void 0 === i.frames[r].speed ? _.speed : i.frames[r].speed, _.anim.x = _.anim.x * o.bw || Y(_.anim.x, o, i.eow, i.eoh, i.calcy, i.calcx, "horizontal"), _.anim.y = _.anim.y * o.bw || Y(_.anim.y, o, i.eow, i.eoh, i.calcy, i.calcx, "vertical")), t.data("iframes") && n.add(punchgs.TweenLite.set(t.find("iframe"), { autoAlpha: 1 }), a + "+=0.001"), r === i.outframeindex && (i.frames[r].to && i.frames[r].to.match(/auto:auto/g), _.speed = void 0 === i.frames[r].speed || "inherit" === i.frames[r].speed ? i.frames[i.inframeindex].speed : i.frames[r].speed, _.anim.ease = void 0 === i.frames[r].ease || "inherit" === i.frames[r].ease ? i.frames[i.inframeindex].ease : i.frames[r].ease, _.anim.overwrite = "auto"), 0 !== r || e.fromcurrentstate) 0 === r && e.fromcurrentstate && (_.speed = b.speed); else { if (s != t) { var w = jQuery.extend({}, _.anim, !0); n.add(punchgs.TweenLite.set(t, _.anim), a), (_ = B()).ease = w.ease, void 0 !== w.filter && (_.anim.filter = w.filter), void 0 !== w["-webkit-filter"] && (_.anim["-webkit-filter"] = w["-webkit-filter"]) } b.anim.visibility = "hidden", b.anim.immediateRender = !0, _.anim.visibility = "visible" } e.fromcurrentstate && (_.anim.immediateRender = !0); var x = -1; if (0 === r && !e.fromcurrentstate && void 0 !== i._bmask && void 0 !== g && 0 <= g.indexOf("block") || r === i.outframeindex && !e.fromcurrentstate && void 0 !== i._bmask && void 0 !== g && 0 <= g.indexOf("block")) { var T = 0 === r ? b.speed / 1e3 / 2 : _.speed / 1e3 / 2, k = [{ scaleY: 1, scaleX: 0, transformOrigin: "0% 50%" }, { scaleY: 1, scaleX: 1, ease: _.anim.ease }], j = { scaleY: 1, scaleX: 0, transformOrigin: "100% 50%", ease: _.anim.ease }; switch (x = void 0 === y ? T : y + T, g) { case "blocktoleft": case "blockfromright": k[0].transformOrigin = "100% 50%", j.transformOrigin = "0% 50%"; break; case "blockfromtop": case "blocktobottom": k = [{ scaleX: 1, scaleY: 0, transformOrigin: "50% 0%" }, { scaleX: 1, scaleY: 1, ease: _.anim.ease }], j = { scaleX: 1, scaleY: 0, transformOrigin: "50% 100%", ease: _.anim.ease }; break; case "blocktotop": case "blockfrombottom": k = [{ scaleX: 1, scaleY: 0, transformOrigin: "50% 100%" }, { scaleX: 1, scaleY: 1, ease: _.anim.ease }], j = { scaleX: 1, scaleY: 0, transformOrigin: "50% 0%", ease: _.anim.ease } }k[0].background = i.frames[r].sfxcolor, n.add(d.mask.fromTo(i._bmask, T, k[0], k[1], y), a), n.add(d.mask.to(i._bmask, T, j, x), a) } if (u) var L = M(s.length - 1, p); if (0 !== r || e.fromcurrentstate) if ("block" === i._sfx_out && r === i.outframeindex) n.add(d.content.staggerTo(s, .001, { autoAlpha: 0, delay: x }), a), n.add(d.content.staggerTo(s, _.speed / 1e3 / 2 - .001, { x: 0, delay: x }), a + "+=0.001"); else if (u && void 0 !== L) { R = { to: P(_.anim) }; for (var I in s) { z = jQuery.extend({}, _.anim); for (var W in R.to) z[W] = parseInt(R.to[W].values[R.to[W].index], 0), R.to[W].index = R.to[W].index < R.to[W].len ? R.to[W].index + 1 : 0; void 0 !== i.frames[r].color && (z.color = i.frames[r].color), void 0 !== i.frames[r].bgcolor && (z.backgroundColor = i.frames[r].bgcolor), n.add(d.content.to(s[L[I]], _.speed / 1e3, z, y * I), a) } } else void 0 !== i.frames[r].color && (_.anim.color = i.frames[r].color), void 0 !== i.frames[r].bgcolor && (_.anim.backgroundColor = i.frames[r].bgcolor), n.add(d.content.staggerTo(s, _.speed / 1e3, _.anim, y), a); else if ("block" === i._sfx_in) n.add(d.content.staggerFromTo(s, .05, { x: 0, y: 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, delay: x }), a); else if (u && void 0 !== L) { var R = { from: P(b.anim), to: P(_.anim) }; for (var I in s) { var C = jQuery.extend({}, b.anim), z = jQuery.extend({}, _.anim); for (var W in R.from) C[W] = parseInt(R.from[W].values[R.from[W].index], 0), R.from[W].index = R.from[W].index < R.from[W].len ? R.from[W].index + 1 : 0; z.ease = C.ease, void 0 !== i.frames[r].color && (C.color = i.frames[r].color, z.color = i.cssobj.styleProps.color), void 0 !== i.frames[r].bgcolor && (C.backgroundColor = i.frames[r].bgcolor, z.backgroundColor = i.cssobj.styleProps["background-color"]), n.add(d.content.fromTo(s[L[I]], b.speed / 1e3, C, z, y * I), a) } } else void 0 !== i.frames[r].color && (b.anim.color = i.frames[r].color, _.anim.color = i.cssobj.styleProps.color), void 0 !== i.frames[r].bgcolor && (b.anim.backgroundColor = i.frames[r].bgcolor, _.anim.backgroundColor = i.cssobj.styleProps["background-color"]), n.add(d.content.staggerFromTo(s, b.speed / 1e3, b.anim, _.anim, y), a); return void 0 === v || !1 === v || 0 === r && e.ignorefirstframe || (v.anim.ease = void 0 === v.anim.ease || "inherit" === v.anim.ease ? i.frames[0].ease : v.anim.ease, v.anim.overflow = "hidden", v.anim.x = v.anim.x * o.bw || Y(v.anim.x, o, i.eow, i.eoh, i.calcy, i.calcx, "horizontal"), v.anim.y = v.anim.y * o.bw || Y(v.anim.y, o, i.eow, i.eoh, i.calcy, i.calcx, "vertical")), 0 === r && h && !1 !== h && !e.fromcurrentstate || 0 === r && e.ignorefirstframe ? ((v = new Object).anim = new Object, v.anim.overwrite = "auto", v.anim.ease = _.anim.ease, v.anim.x = v.anim.y = 0, h && !1 !== h && (h.anim.x = h.anim.x * o.bw || Y(h.anim.x, o, i.eow, i.eoh, i.calcy, i.calcx, "horizontal"), h.anim.y = h.anim.y * o.bw || Y(h.anim.y, o, i.eow, i.eoh, i.calcy, i.calcx, "vertical"), h.anim.overflow = "hidden")) : 0 === r && n.add(d.mask.set(i._mw, { overflow: "visible" }), a), void 0 !== h && void 0 !== v && !1 !== h && !1 !== v ? n.add(d.mask.fromTo(i._mw, b.speed / 1e3, h.anim, v.anim, y), a) : void 0 !== v && !1 !== v && n.add(d.mask.to(i._mw, _.speed / 1e3, v.anim, y), a), n.addLabel(a + "_end"), i._gsTransformTo && r === m && i.hoveredstatus && (i.hovertimelines.item = punchgs.TweenLite.to(t, 0, i._gsTransformTo)), i._gsTransformTo = !1, d.content.eventCallback("onStart", O, [r, l, i._pw, i, n, _.anim, t, e.updateStaticTimeline, o]), d.content.eventCallback("onUpdate", Q, [a, i._id, i._pw, i, n, r, jQuery.extend(!0, {}, _.anim), e.updateStaticTimeline, t, o]), d.content.eventCallback("onComplete", S, [r, i.frames.length, m, i._pw, i, n, e.updateStaticTimeline, t, o]), n }, endMoveCaption: function (e) { e.firstframe = "frame_0", e.lastframe = "frame_999"; var t = g(e), i = e.caption.data(); if (void 0 !== e.frame ? t.timeline.play(e.frame) : (!t.static || e.currentslide >= t.removeonslide || e.currentslide < t.showonslide) && (t.outnow = new punchgs.TimelineLite, t.timeline.pause(), !0 === i.visibleelement && A.createFrameOnTimeline({ caption: e.caption, timeline: t.outnow, label: "outnow", frameindex: e.caption.data("outframeindex"), opt: e.opt, fromcurrentstate: !0 }).play()), e.checkchildrens && t.timeline_obj && t.timeline_obj.dchildren && "none" !== t.timeline_obj.dchildren && 0 < t.timeline_obj.dchildren.length) for (var a = 0; a < t.timeline_obj.dchildren.length; a++)A.endMoveCaption({ caption: jQuery(t.timeline_obj.dchildren[a]), opt: e.opt }) }, playAnimationFrame: function (e) { e.firstframe = e.triggerframein, e.lastframe = e.triggerframeout; var t, i = g(e), a = e.caption.data(), n = 0; for (var r in a.frames) a.frames[r].framename === e.frame && (t = n), n++; void 0 !== a.triggeredtimeline && a.triggeredtimeline.pause(), a.triggeredtimeline = new punchgs.TimelineLite, i.timeline.pause(); var o = !0 === a.visibleelement; a.triggeredtimeline = A.createFrameOnTimeline({ caption: e.caption, timeline: a.triggeredtimeline, label: "triggered", frameindex: t, updateStaticTimeline: !0, opt: e.opt, ignorefirstframe: !0, fromcurrentstate: o }).play() }, removeTheCaptions: function (e, i) { if ("stop" === A.compare_version(l).check) return !1; var t = e.data("index"), a = new Array; i.layers[t] && jQuery.each(i.layers[t], function (e, t) { a.push(t) }); var n = A.currentSlideIndex(i); a && jQuery.each(a, function (e) { var t = jQuery(this); "carousel" === i.sliderType && "on" === i.carousel.showLayersAllTime ? (clearTimeout(t.data("videoplaywait")), A.stopVideo && A.stopVideo(t, i)) : (r(t), clearTimeout(t.data("videoplaywait")), A.endMoveCaption({ caption: t, opt: i, currentslide: n })), A.removeMediaFromList && A.removeMediaFromList(t, i), i.lastplayedvideos = [] }) } }); var O = function (e, t, i, a, n, r, o, s, d) { var l = {}; if (l.layer = o, l.eventtype = 0 === e ? "enterstage" : e === a.outframeindex ? "leavestage" : "framestarted", l.layertype = o.data("layertype"), a.active = !0, l.frame_index = e, l.layersettings = o.data(), d.c.trigger("revolution.layeraction", [l]), "on" == a.loopanimation && c(a._lw, d.bw), "enterstage" === l.eventtype && (a.animdirection = "in", a.visibleelement = !0, A.toggleState(a.layertoggledby)), "none" !== t.dchildren && void 0 !== t.dchildren && 0 < t.dchildren.length) if (0 === e) for (var m = 0; m < t.dchildren.length; m++)jQuery(t.dchildren[m]).data("timeline").play(0); else if (e === a.outframeindex) for (m = 0; m < t.dchildren.length; m++)A.endMoveCaption({ caption: jQuery(t.dchildren[m]), opt: d, checkchildrens: !0 }); punchgs.TweenLite.set(i, { visibility: "visible" }), a.current_frame = e, a.current_timeline = n, a.current_timeline_time = n.time(), s && (a.static_layer_timeline_time = a.current_timeline_time), a.last_frame_started = e }, Q = function (e, t, i, a, n, r, o, s, d, l) { "column" === a._nctype && b(d, l), punchgs.TweenLite.set(i, { visibility: "visible" }), a.current_frame = r, a.current_timeline = n, a.current_timeline_time = n.time(), s && (a.static_layer_timeline_time = a.current_timeline_time), void 0 !== a.hoveranim && !1 === a._gsTransformTo && (a._gsTransformTo = o, a._gsTransformTo && a._gsTransformTo.startAt && delete a._gsTransformTo.startAt, void 0 === a.cssobj.styleProps.css ? a._gsTransformTo = jQuery.extend(!0, {}, a.cssobj.styleProps, a._gsTransformTo) : a._gsTransformTo = jQuery.extend(!0, {}, a.cssobj.styleProps.css, a._gsTransformTo)), a.visibleelement = !0 }, S = function (e, t, i, a, n, r, o, s, d) { var l = {}; l.layer = s, l.eventtype = 0 === e ? "enteredstage" : e === t - 1 || e === i ? "leftstage" : "frameended", l.layertype = s.data("layertype"), l.layersettings = s.data(), d.c.trigger("revolution.layeraction", [l]), "leftstage" !== l.eventtype && A.animcompleted(s, d), "leftstage" === l.eventtype && A.stopVideo && A.stopVideo(s, d), "column" === n._nctype && (punchgs.TweenLite.to(n._cbgc_man, .01, { visibility: "hidden" }), punchgs.TweenLite.to(n._cbgc_auto, .01, { visibility: "visible" })), "leftstage" === l.eventtype && (n.active = !1, punchgs.TweenLite.set(a, { visibility: "hidden", overwrite: "auto" }), n.animdirection = "out", n.visibleelement = !1, A.unToggleState(n.layertoggledby), "video" === n._nctype && A.resetVideo && setTimeout(function () { A.resetVideo(s, d) }, 100)), n.current_frame = e, n.current_timeline = r, n.current_timeline_time = r.time(), o && (n.static_layer_timeline_time = n.current_timeline_time) }, g = function (e) { var t = {}; return e.firstframe = void 0 === e.firstframe ? "frame_0" : e.firstframe, e.lastframe = void 0 === e.lastframe ? "frame_999" : e.lastframe, t.id = e.caption.data("id") || e.caption.attr("id"), t.slideid = e.caption.data("slideid") || e.caption.closest(".tp-revslider-slidesli").data("index"), t.timeline_obj = e.opt.timelines[t.slideid].layers[t.id], t.timeline = t.timeline_obj.timeline, t.ffs = t.timeline.getLabelTime(e.firstframe), t.ffe = t.timeline.getLabelTime(e.firstframe + "_end"), t.lfs = t.timeline.getLabelTime(e.lastframe), t.lfe = t.timeline.getLabelTime(e.lastframe + "_end"), t.ct = t.timeline.time(), t.static = null != t.timeline_obj.firstslide || null != t.timeline_obj.lastslide, t.static && (t.showonslide = t.timeline_obj.firstslide, t.removeonslide = t.timeline_obj.lastslide), t }, M = function (e, t) { var i = new Array; switch (t) { case "forward": case "random": for (var a = 0; a <= e; a++)i.push(a); "random" === t && (i = function (e) { for (var t, i, a = e.length; 0 !== a;)i = Math.floor(Math.random() * a), t = e[a -= 1], e[a] = e[i], e[i] = t; return e }(i)); break; case "backward": for (a = 0; a <= e; a++)i.push(e - a); break; case "middletoedge": var n = Math.ceil(e / 2), r = n - 1, o = n + 1; i.push(n); for (a = 0; a < n; a++)0 <= r && i.push(r), o <= e && i.push(o), r-- , o++; break; case "edgetomiddle": for (r = e, o = 0, a = 0; a <= Math.floor(e / 2); a++)i.push(r), o < r && i.push(o), r-- , o++ }return i }, P = function (e) { var t = {}; for (var i in e) "string" == typeof e[i] && 0 <= e[i].indexOf("|") && (void 0 === t[i] && (t[i] = { index: 0 }), t[i].values = e[i].replace("[", "").replace("]", "").split("|"), t[i].len = t[i].values.length - 1); return t }, B = function (e) { return (e = void 0 === e ? new Object : e).anim = void 0 === e.anim ? new Object : e.anim, e.anim.x = void 0 === e.anim.x ? 0 : e.anim.x, e.anim.y = void 0 === e.anim.y ? 0 : e.anim.y, e.anim.z = void 0 === e.anim.z ? 0 : e.anim.z, e.anim.rotationX = void 0 === e.anim.rotationX ? 0 : e.anim.rotationX, e.anim.rotationY = void 0 === e.anim.rotationY ? 0 : e.anim.rotationY, e.anim.rotationZ = void 0 === e.anim.rotationZ ? 0 : e.anim.rotationZ, e.anim.scaleX = void 0 === e.anim.scaleX ? 1 : e.anim.scaleX, e.anim.scaleY = void 0 === e.anim.scaleY ? 1 : e.anim.scaleY, e.anim.skewX = void 0 === e.anim.skewX ? 0 : e.anim.skewX, e.anim.skewY = void 0 === e.anim.skewY ? 0 : e.anim.skewY, e.anim.opacity = void 0 === e.anim.opacity ? 1 : e.anim.opacity, e.anim.transformOrigin = void 0 === e.anim.transformOrigin ? "50% 50%" : e.anim.transformOrigin, e.anim.transformPerspective = void 0 === e.anim.transformPerspective ? 600 : e.anim.transformPerspective, e.anim.rotation = void 0 === e.anim.rotation ? 0 : e.anim.rotation, e.anim.force3D = void 0 === e.anim.force3D ? "auto" : e.anim.force3D, e.anim.autoAlpha = void 0 === e.anim.autoAlpha ? 1 : e.anim.autoAlpha, e.anim.visibility = void 0 === e.anim.visibility ? "visible" : e.anim.visibility, e.anim.overwrite = void 0 === e.anim.overwrite ? "auto" : e.anim.overwrite, e.speed = void 0 === e.speed ? .3 : e.speed, e.filter = void 0 === e.filter ? "blur(0px) grayscale(0%) brightness(100%)" : e.filter, e["-webkit-filter"] = void 0 === e["-webkit-filter"] ? "blur(0px) grayscale(0%) brightness(100%)" : e["-webkit-filter"], e }, u = function () { var e = new Object; return e.anim = new Object, e.anim.stroke = "none", e.anim.strokeWidth = 0, e.anim.strokeDasharray = "none", e.anim.strokeDashoffset = "0", e }, f = function (e, r) { var t = e.split(";"); return t && jQuery.each(t, function (e, t) { var i = t.split(":"), a = i[0], n = i[1]; "sc" == a && (r.anim.stroke = n), "sw" == a && (r.anim.strokeWidth = n), "sda" == a && (r.anim.strokeDasharray = n), "sdo" == a && (r.anim.strokeDashoffset = n) }), r }, X = function () { var e = new Object; return e.anim = new Object, e.anim.x = 0, e.anim.y = 0, e.anim.z = 0, e }, h = function () { var e = new Object; return e.anim = new Object, e.speed = .2, e }, m = function (e, t, i, a, n) { if (n = void 0 === n ? "" : n, jQuery.isNumeric(parseFloat(e))) return parseFloat(e) + n; if (void 0 === e || "inherit" === e) return t + "ext"; if (1 < e.split("{").length) { var r = e.split(","), o = parseFloat(r[1].split("}")[0]); if (r = parseFloat(r[0].split("{")[1]), void 0 !== i && void 0 !== a) { parseInt(Math.random() * (o - r), 0), parseInt(r, 0); for (var s = 0; s < a; s++)e = e + "|" + (parseInt(Math.random() * (o - r), 0) + parseInt(r, 0)) + n; e += "]" } else e = Math.random() * (o - r) + r } return e }, Y = function (e, t, i, a, n, r, o) { return !jQuery.isNumeric(e) && e.match(/%]/g) ? (e = e.split("[")[1].split("]")[0], "horizontal" == o ? e = (i + 2) * parseInt(e, 0) / 100 : "vertical" == o && (e = (a + 2) * parseInt(e, 0) / 100)) : e = "top" === (e = "left" === (e = "layer_top" === (e = "layer_left" === e ? 0 - i : "layer_right" === e ? i : e) ? 0 - a : "layer_bottom" === e ? a : e) || "stage_left" === e ? 0 - i - r : "right" === e || "stage_right" === e ? t.conw - r : "center" === e || "stage_center" === e ? t.conw / 2 - i / 2 - r : e) || "stage_top" === e ? 0 - a - n : "bottom" === e || "stage_bottom" === e ? t.conh - n : "middle" === e || "stage_middle" === e ? t.conh / 2 - a / 2 - n : e, e }, F = function (e, t, r, o, s) { var d = new Object; if (d = jQuery.extend(!0, {}, d, e), void 0 === t) return d; var i = t.split(";"), l = ""; return i && jQuery.each(i, function (e, t) { var i = t.split(":"), a = i[0], n = i[1]; r && "none" !== r && null != n && 0 < n.length && n.match(/\(R\)/) && ("[" === (n = "right" === (n = n.replace("(R)", "")) ? "left" : "left" === n ? "right" : "top" === n ? "bottom" : "bottom" === n ? "top" : n)[0] && "-" === n[1] ? n = n.replace("[-", "[") : "[" === n[0] && "-" !== n[1] ? n = n.replace("[", "[-") : "-" === n[0] ? n = n.replace("-", "") : n[0].match(/[1-9]/) && (n = "-" + n)), null != n && (n = n.replace(/\(R\)/, ""), "rotationX" != a && "rX" != a || (d.anim.rotationX = m(n, d.anim.rotationX, o, s, "deg")), "rotationY" != a && "rY" != a || (d.anim.rotationY = m(n, d.anim.rotationY, o, s, "deg")), "rotationZ" != a && "rZ" != a || (d.anim.rotation = m(n, d.anim.rotationZ, o, s, "deg")), "scaleX" != a && "sX" != a || (d.anim.scaleX = m(n, d.anim.scaleX, o, s)), "scaleY" != a && "sY" != a || (d.anim.scaleY = m(n, d.anim.scaleY, o, s)), "opacity" != a && "o" != a || (d.anim.opacity = m(n, d.anim.opacity, o, s)), "fb" == a && (l = "" === l ? "blur(" + parseInt(n, 0) + "px)" : l + " blur(" + parseInt(n, 0) + "px)"), "fg" == a && (l = "" === l ? "grayscale(" + parseInt(n, 0) + "%)" : l + " grayscale(" + parseInt(n, 0) + "%)"), "fbr" == a && (l = "" === l ? "brightness(" + parseInt(n, 0) + "%)" : l + " brightness(" + parseInt(n, 0) + "%)"), 0 === d.anim.opacity && (d.anim.autoAlpha = 0), d.anim.opacity = 0 == d.anim.opacity ? 1e-4 : d.anim.opacity, "skewX" != a && "skX" != a || (d.anim.skewX = m(n, d.anim.skewX, o, s)), "skewY" != a && "skY" != a || (d.anim.skewY = m(n, d.anim.skewY, o, s)), "x" == a && (d.anim.x = m(n, d.anim.x, o, s)), "y" == a && (d.anim.y = m(n, d.anim.y, o, s)), "z" == a && (d.anim.z = m(n, d.anim.z, o, s)), "transformOrigin" != a && "tO" != a || (d.anim.transformOrigin = n.toString()), "transformPerspective" != a && "tP" != a || (d.anim.transformPerspective = parseInt(n, 0)), "speed" != a && "s" != a || (d.speed = parseFloat(n))) }), "" !== l && (d.anim["-webkit-filter"] = l, d.anim.filter = l), d }, H = function (e) { if (void 0 === e) return !1; var n = new Object; n.anim = new Object; var t = e.split(";"); return t && jQuery.each(t, function (e, t) { var i = (t = t.split(":"))[0], a = t[1]; "x" == i && (n.anim.x = a), "y" == i && (n.anim.y = a), "s" == i && (n.speed = parseFloat(a)), "e" != i && "ease" != i || (n.anim.ease = a) }), n }, N = function (i, e, t) { if (null == i && (i = 0), !jQuery.isArray(i) && "string" === jQuery.type(i) && (1 < i.split(",").length || 1 < i.split("[").length)) { var a = (i = (i = i.replace("[", "")).replace("]", "")).match(/'/g) ? i.split("',") : i.split(","); i = new Array, a && jQuery.each(a, function (e, t) { t = (t = t.replace("'", "")).replace("'", ""), i.push(t) }) } else { var n = i; jQuery.isArray(i) || (i = new Array).push(n) } n = i[i.length - 1]; if (i.length < e.rle) for (var r = 1; r <= e.curWinRange; r++)i.push(n); return i }; function D(e, t, i, a, n, r, o) { var s = e.find(t); s.css("borderWidth", r + "px"), s.css(i, 0 - r + "px"), s.css(a, "0px solid transparent"), s.css(n, o) } var v = function (a, e) { if (void 0 === e) return a; var t = (e = (e = (e = (e = (e = (e = (e = (e = e.replace("c:", "color:")).replace("bg:", "background-color:")).replace("bw:", "border-width:")).replace("bc:", "border-color:")).replace("br:", "borderRadius:")).replace("bs:", "border-style:")).replace("td:", "text-decoration:")).replace("zi:", "zIndex:")).split(";"); return t && jQuery.each(t, function (e, t) { var i = t.split(":"); 0 < i[0].length && ("background-color" === i[0] && 0 <= i[1].indexOf("gradient") && (i[0] = "background"), a.anim[i[0]] = i[1]) }), a }, V = function (e, t) { var i, a = new Object, n = !1; if ("rekursive" == t && (i = e.closest(".tp-caption")) && e.css("fontSize") === i.css("fontSize") && e.css("fontWeight") === i.css("fontWeight") && e.css("lineHeight") === i.css("lineHeight") && (n = !0), a.basealign = e.data("basealign") || "grid", a.fontSize = n ? void 0 === i.data("fontsize") ? parseInt(i.css("fontSize"), 0) || 0 : i.data("fontsize") : void 0 === e.data("fontsize") ? parseInt(e.css("fontSize"), 0) || 0 : e.data("fontsize"), a.fontWeight = n ? void 0 === i.data("fontweight") ? parseInt(i.css("fontWeight"), 0) || 0 : i.data("fontweight") : void 0 === e.data("fontweight") ? parseInt(e.css("fontWeight"), 0) || 0 : e.data("fontweight"), a.whiteSpace = n ? void 0 === i.data("whitespace") ? i.css("whitespace") || "normal" : i.data("whitespace") : void 0 === e.data("whitespace") ? e.css("whitespace") || "normal" : e.data("whitespace"), a.textAlign = n ? void 0 === i.data("textalign") ? i.css("textalign") || "inherit" : i.data("textalign") : void 0 === e.data("textalign") ? e.css("textalign") || "inherit" : e.data("textalign"), a.zIndex = n ? void 0 === i.data("zIndex") ? i.css("zIndex") || "inherit" : i.data("zIndex") : void 0 === e.data("zIndex") ? e.css("zIndex") || "inherit" : e.data("zIndex"), -1 !== jQuery.inArray(e.data("layertype"), ["video", "image", "audio"]) || e.is("img") ? a.lineHeight = 0 : a.lineHeight = n ? void 0 === i.data("lineheight") ? parseInt(i.css("lineHeight"), 0) || 0 : i.data("lineheight") : void 0 === e.data("lineheight") ? parseInt(e.css("lineHeight"), 0) || 0 : e.data("lineheight"), a.letterSpacing = n ? void 0 === i.data("letterspacing") ? parseFloat(i.css("letterSpacing"), 0) || 0 : i.data("letterspacing") : void 0 === e.data("letterspacing") ? parseFloat(e.css("letterSpacing")) || 0 : e.data("letterspacing"), a.paddingTop = void 0 === e.data("paddingtop") ? parseInt(e.css("paddingTop"), 0) || 0 : e.data("paddingtop"), a.paddingBottom = void 0 === e.data("paddingbottom") ? parseInt(e.css("paddingBottom"), 0) || 0 : e.data("paddingbottom"), a.paddingLeft = void 0 === e.data("paddingleft") ? parseInt(e.css("paddingLeft"), 0) || 0 : e.data("paddingleft"), a.paddingRight = void 0 === e.data("paddingright") ? parseInt(e.css("paddingRight"), 0) || 0 : e.data("paddingright"), a.marginTop = void 0 === e.data("margintop") ? parseInt(e.css("marginTop"), 0) || 0 : e.data("margintop"), a.marginBottom = void 0 === e.data("marginbottom") ? parseInt(e.css("marginBottom"), 0) || 0 : e.data("marginbottom"), a.marginLeft = void 0 === e.data("marginleft") ? parseInt(e.css("marginLeft"), 0) || 0 : e.data("marginleft"), a.marginRight = void 0 === e.data("marginright") ? parseInt(e.css("marginRight"), 0) || 0 : e.data("marginright"), a.borderTopWidth = void 0 === e.data("bordertopwidth") ? parseInt(e.css("borderTopWidth"), 0) || 0 : e.data("bordertopwidth"), a.borderBottomWidth = void 0 === e.data("borderbottomwidth") ? parseInt(e.css("borderBottomWidth"), 0) || 0 : e.data("borderbottomwidth"), a.borderLeftWidth = void 0 === e.data("borderleftwidth") ? parseInt(e.css("borderLeftWidth"), 0) || 0 : e.data("borderleftwidth"), a.borderRightWidth = void 0 === e.data("borderrightwidth") ? parseInt(e.css("borderRightWidth"), 0) || 0 : e.data("borderrightwidth"), "rekursive" != t) { if (a.color = void 0 === e.data("color") ? "nopredefinedcolor" : e.data("color"), a.whiteSpace = n ? void 0 === i.data("whitespace") ? i.css("whiteSpace") || "nowrap" : i.data("whitespace") : void 0 === e.data("whitespace") ? e.css("whiteSpace") || "nowrap" : e.data("whitespace"), a.textAlign = n ? void 0 === i.data("textalign") ? i.css("textalign") || "inherit" : i.data("textalign") : void 0 === e.data("textalign") ? e.css("textalign") || "inherit" : e.data("textalign"), a.fontWeight = n ? void 0 === i.data("fontweight") ? parseInt(i.css("fontWeight"), 0) || 0 : i.data("fontweight") : void 0 === e.data("fontweight") ? parseInt(e.css("fontWeight"), 0) || 0 : e.data("fontweight"), a.minWidth = void 0 === e.data("width") ? parseInt(e.css("minWidth"), 0) || 0 : e.data("width"), a.minHeight = void 0 === e.data("height") ? parseInt(e.css("minHeight"), 0) || 0 : e.data("height"), null != e.data("videowidth") && null != e.data("videoheight")) { var r = e.data("videowidth"), o = e.data("videoheight"); r = "100%" === r ? "none" : r, o = "100%" === o ? "none" : o, e.data("width", r), e.data("height", o) } a.maxWidth = void 0 === e.data("width") ? parseInt(e.css("maxWidth"), 0) || "none" : e.data("width"), a.maxHeight = -1 !== jQuery.inArray(e.data("type"), ["column", "row"]) ? "none" : void 0 === e.data("height") ? parseInt(e.css("maxHeight"), 0) || "none" : e.data("height"), a.wan = void 0 === e.data("wan") ? parseInt(e.css("-webkit-transition"), 0) || "none" : e.data("wan"), a.moan = void 0 === e.data("moan") ? parseInt(e.css("-moz-animation-transition"), 0) || "none" : e.data("moan"), a.man = void 0 === e.data("man") ? parseInt(e.css("-ms-animation-transition"), 0) || "none" : e.data("man"), a.ani = void 0 === e.data("ani") ? parseInt(e.css("transition"), 0) || "none" : e.data("ani") } return a.styleProps = { borderTopLeftRadius: e[0].style.borderTopLeftRadius, borderTopRightRadius: e[0].style.borderTopRightRadius, borderBottomRightRadius: e[0].style.borderBottomRightRadius, borderBottomLeftRadius: e[0].style.borderBottomLeftRadius, background: e[0].style.background, boxShadow: e[0].style.boxShadow, "background-color": e[0].style["background-color"], "border-top-color": e[0].style["border-top-color"], "border-bottom-color": e[0].style["border-bottom-color"], "border-right-color": e[0].style["border-right-color"], "border-left-color": e[0].style["border-left-color"], "border-top-style": e[0].style["border-top-style"], "border-bottom-style": e[0].style["border-bottom-style"], "border-left-style": e[0].style["border-left-style"], "border-right-style": e[0].style["border-right-style"], "border-left-width": e[0].style["border-left-width"], "border-right-width": e[0].style["border-right-width"], "border-bottom-width": e[0].style["border-bottom-width"], "border-top-width": e[0].style["border-top-width"], color: e[0].style.color, "text-decoration": e[0].style["text-decoration"], "font-style": e[0].style["font-style"] }, "" !== a.styleProps.background && void 0 !== a.styleProps.background && a.styleProps.background !== a.styleProps["background-color"] || delete a.styleProps.background, "" == a.styleProps.color && (a.styleProps.color = e.css("color")), a }, Z = function (a, n) { var r = new Object; return a && jQuery.each(a, function (e, t) { var i = N(t, n)[n.curWinRange]; r[e] = void 0 !== i ? i : a[e] }), r }, _ = function (e, t, i, a) { return e = "full" === (e = jQuery.isNumeric(e) ? e * t + "px" : e) ? a : "auto" === e || "none" === e ? i : e }, E = function (e, t, i, a) { var n = e.data(); n = void 0 === n ? {} : n; try { if ("BR" == e[0].nodeName || "br" == e[0].tagName) return !1 } catch (e) { } n.cssobj = void 0 === n.cssobj ? V(e, i) : n.cssobj; var r = Z(n.cssobj, t), o = t.bw, s = t.bh; "off" === a && (s = o = 1), "auto" == r.lineHeight && (r.lineHeight = r.fontSize + 4); var d = { Top: r.marginTop, Bottom: r.marginBottom, Left: r.marginLeft, Right: r.marginRight }; if ("column" === n._nctype && (punchgs.TweenLite.set(n._column, { paddingTop: Math.round(r.marginTop * s) + "px", paddingBottom: Math.round(r.marginBottom * s) + "px", paddingLeft: Math.round(r.marginLeft * o) + "px", paddingRight: Math.round(r.marginRight * o) + "px" }), d = { Top: 0, Bottom: 0, Left: 0, Right: 0 }), !e.hasClass("tp-splitted")) { if (e.css("-webkit-transition", "none"), e.css("-moz-transition", "none"), e.css("-ms-transition", "none"), e.css("transition", "none"), (void 0 !== e.data("transform_hover") || void 0 !== e.data("style_hover")) && punchgs.TweenLite.set(e, r.styleProps), punchgs.TweenLite.set(e, { fontSize: Math.round(r.fontSize * o) + "px", fontWeight: r.fontWeight, letterSpacing: Math.floor(r.letterSpacing * o) + "px", paddingTop: Math.round(r.paddingTop * s) + "px", paddingBottom: Math.round(r.paddingBottom * s) + "px", paddingLeft: Math.round(r.paddingLeft * o) + "px", paddingRight: Math.round(r.paddingRight * o) + "px", marginTop: d.Top * s + "px", marginBottom: d.Bottom * s + "px", marginLeft: d.Left * o + "px", marginRight: d.Right * o + "px", borderTopWidth: Math.round(r.borderTopWidth * s) + "px", borderBottomWidth: Math.round(r.borderBottomWidth * s) + "px", borderLeftWidth: Math.round(r.borderLeftWidth * o) + "px", borderRightWidth: Math.round(r.borderRightWidth * o) + "px", lineHeight: Math.round(r.lineHeight * s) + "px", textAlign: r.textAlign, overwrite: "auto" }), "rekursive" != i) { var l = "slide" == r.basealign ? t.ulw : t.gridwidth[t.curWinRange], m = "slide" == r.basealign ? t.ulh : t.gridheight[t.curWinRange], c = _(r.maxWidth, o, "none", l), p = _(r.maxHeight, s, "none", m), g = _(r.minWidth, o, "0px", l), u = _(r.minHeight, s, "0px", m); if (g = void 0 === g ? 0 : g, u = void 0 === u ? 0 : u, c = void 0 === c ? "none" : c, p = void 0 === p ? "none" : p, n._isgroup && ("#1/1#" === g && (g = c = l), "#1/2#" === g && (g = c = l / 2), "#1/3#" === g && (g = c = l / 3), "#1/4#" === g && (g = c = l / 4), "#1/5#" === g && (g = c = l / 5), "#1/6#" === g && (g = c = l / 6), "#2/3#" === g && (g = c = l / 3 * 2), "#3/4#" === g && (g = c = l / 4 * 3), "#2/5#" === g && (g = c = l / 5 * 2), "#3/5#" === g && (g = c = l / 5 * 3), "#4/5#" === g && (g = c = l / 5 * 4), "#3/6#" === g && (g = c = l / 6 * 3), "#4/6#" === g && (g = c = l / 6 * 4), "#5/6#" === g && (g = c = l / 6 * 5)), n._ingroup && (n._groupw = g, n._grouph = u), punchgs.TweenLite.set(e, { maxWidth: c, maxHeight: p, minWidth: g, minHeight: u, whiteSpace: r.whiteSpace, textAlign: r.textAlign, overwrite: "auto" }), "nopredefinedcolor" != r.color && punchgs.TweenLite.set(e, { color: r.color, overwrite: "auto" }), null != n.svg_src) { var f = "nopredefinedcolor" != r.color && null != r.color ? r.color : null != r.css && "nopredefinedcolor" != r.css.color && null != r.css.color ? r.css.color : null != r.styleProps.color ? r.styleProps.color : null != r.styleProps.css && null != r.styleProps.css.color && r.styleProps.css.color; 0 != f && (punchgs.TweenLite.set(e.find("svg"), { fill: f, overwrite: "auto" }), punchgs.TweenLite.set(e.find("svg path"), { fill: f, overwrite: "auto" })) } } "column" === n._nctype && (void 0 === n._column_bg_set && (n._column_bg_set = e.css("backgroundColor"), n._column_bg_image = e.css("backgroundImage"), n._column_bg_image_repeat = e.css("backgroundRepeat"), n._column_bg_image_position = e.css("backgroundPosition"), n._column_bg_image_size = e.css("backgroundSize"), n._column_bg_opacity = e.data("bgopacity"), n._column_bg_opacity = void 0 === n._column_bg_opacity ? 1 : n._column_bg_opacity, punchgs.TweenLite.set(e, { backgroundColor: "transparent", backgroundImage: "" })), setTimeout(function () { b(e, t) }, 1), n._cbgc_auto && 0 < n._cbgc_auto.length && (n._cbgc_auto[0].style.backgroundSize = n._column_bg_image_size, jQuery.isArray(r.marginLeft) ? punchgs.TweenLite.set(n._cbgc_auto, { borderTopWidth: r.marginTop[t.curWinRange] * s + "px", borderLeftWidth: r.marginLeft[t.curWinRange] * o + "px", borderRightWidth: r.marginRight[t.curWinRange] * o + "px", borderBottomWidth: r.marginBottom[t.curWinRange] * s + "px", backgroundColor: n._column_bg_set, backgroundImage: n._column_bg_image, backgroundRepeat: n._column_bg_image_repeat, backgroundPosition: n._column_bg_image_position, opacity: n._column_bg_opacity }) : punchgs.TweenLite.set(n._cbgc_auto, { borderTopWidth: r.marginTop * s + "px", borderLeftWidth: r.marginLeft * o + "px", borderRightWidth: r.marginRight * o + "px", borderBottomWidth: r.marginBottom * s + "px", backgroundColor: n._column_bg_set, backgroundImage: n._column_bg_image, backgroundRepeat: n._column_bg_image_repeat, backgroundPosition: n._column_bg_image_position, opacity: n._column_bg_opacity }))), setTimeout(function () { e.css("-webkit-transition", e.data("wan")), e.css("-moz-transition", e.data("moan")), e.css("-ms-transition", e.data("man")), e.css("transition", e.data("ani")) }, 30) } }, b = function (e, t) { var i, a, n, r = e.data(); r._cbgc_man && 0 < r._cbgc_man.length && (jQuery.isArray(r.cssobj.marginLeft) ? (r.cssobj.marginLeft[t.curWinRange] * t.bw, i = r.cssobj.marginTop[t.curWinRange] * t.bh, a = r.cssobj.marginBottom[t.curWinRange] * t.bh, r.cssobj.marginRight[t.curWinRange], t.bw) : (r.cssobj.marginLeft * t.bw, i = r.cssobj.marginTop * t.bh, a = r.cssobj.marginBottom * t.bh, r.cssobj.marginRight, t.bw), n = r._row.hasClass("rev_break_columns") ? "100%" : r._row.height() - (i + a) + "px", r._cbgc_man[0].style.backgroundSize = r._column_bg_image_size, punchgs.TweenLite.set(r._cbgc_man, { width: "100%", height: n, backgroundColor: r._column_bg_set, backgroundImage: r._column_bg_image, backgroundRepeat: r._column_bg_image_repeat, backgroundPosition: r._column_bg_image_position, overwrite: "auto", opacity: r._column_bg_opacity })) }, c = function (e, t) { var i = e.data(); if (e.hasClass("rs-pendulum") && null == i._loop_timeline) { i._loop_timeline = new punchgs.TimelineLite; var a = null == e.data("startdeg") ? -20 : e.data("startdeg"), n = null == e.data("enddeg") ? 20 : e.data("enddeg"), r = null == e.data("speed") ? 2 : e.data("speed"), o = null == e.data("origin") ? "50% 50%" : e.data("origin"), s = null == e.data("easing") ? punchgs.Power2.easeInOut : e.data("easing"); a *= t, n *= t, i._loop_timeline.append(new punchgs.TweenLite.fromTo(e, r, { force3D: "auto", rotation: a, transformOrigin: o }, { rotation: n, ease: s })), i._loop_timeline.append(new punchgs.TweenLite.fromTo(e, r, { force3D: "auto", rotation: n, transformOrigin: o }, { rotation: a, ease: s, onComplete: function () { i._loop_timeline.restart() } })) } if (e.hasClass("rs-rotate") && null == i._loop_timeline) { i._loop_timeline = new punchgs.TimelineLite; a = null == e.data("startdeg") ? 0 : e.data("startdeg"), n = null == e.data("enddeg") ? 360 : e.data("enddeg"), r = null == e.data("speed") ? 2 : e.data("speed"), o = null == e.data("origin") ? "50% 50%" : e.data("origin"), s = null == e.data("easing") ? punchgs.Power2.easeInOut : e.data("easing"); a *= t, n *= t, i._loop_timeline.append(new punchgs.TweenLite.fromTo(e, r, { force3D: "auto", rotation: a, transformOrigin: o }, { rotation: n, ease: s, onComplete: function () { i._loop_timeline.restart() } })) } if (e.hasClass("rs-slideloop") && null == i._loop_timeline) { i._loop_timeline = new punchgs.TimelineLite; var d = null == e.data("xs") ? 0 : e.data("xs"), l = null == e.data("ys") ? 0 : e.data("ys"), m = null == e.data("xe") ? 0 : e.data("xe"), c = null == e.data("ye") ? 0 : e.data("ye"); r = null == e.data("speed") ? 2 : e.data("speed"), s = null == e.data("easing") ? punchgs.Power2.easeInOut : e.data("easing"); d *= t, l *= t, m *= t, c *= t, i._loop_timeline.append(new punchgs.TweenLite.fromTo(e, r, { force3D: "auto", x: d, y: l }, { x: m, y: c, ease: s })), i._loop_timeline.append(new punchgs.TweenLite.fromTo(e, r, { force3D: "auto", x: m, y: c }, { x: d, y: l, onComplete: function () { i._loop_timeline.restart() } })) } if (e.hasClass("rs-pulse") && null == i._loop_timeline) { i._loop_timeline = new punchgs.TimelineLite; var p = null == e.data("zoomstart") ? 0 : e.data("zoomstart"), g = null == e.data("zoomend") ? 0 : e.data("zoomend"); r = null == e.data("speed") ? 2 : e.data("speed"), s = null == e.data("easing") ? punchgs.Power2.easeInOut : e.data("easing"); i._loop_timeline.append(new punchgs.TweenLite.fromTo(e, r, { force3D: "auto", scale: p }, { scale: g, ease: s })), i._loop_timeline.append(new punchgs.TweenLite.fromTo(e, r, { force3D: "auto", scale: g }, { scale: p, onComplete: function () { i._loop_timeline.restart() } })) } if (e.hasClass("rs-wave") && null == i._loop_timeline) { i._loop_timeline = new punchgs.TimelineLite; var u = null == e.data("angle") ? 10 : parseInt(e.data("angle"), 0), f = null == e.data("radius") ? 10 : parseInt(e.data("radius"), 0), h = (r = null == e.data("speed") ? -20 : e.data("speed"), (o = null == e.data("origin") ? "50% 50%" : e.data("origin")).split(" ")), v = new Object; 1 <= h.length ? (v.x = h[0], v.y = h[1]) : (v.x = "50%", v.y = "50%"), f *= t; var _ = (parseInt(v.x, 0) / 100 - .5) * e.width(), b = (parseInt(v.y, 0) / 100 - .5) * e.height(), y = { a: 0, ang: u, element: e, unit: f, xoffset: 0 + _, yoffset: -1 * f + b }, w = parseInt(u, 0), x = new punchgs.TweenLite.fromTo(y, r, { a: 0 + w }, { a: 360 + w, force3D: "auto", ease: punchgs.Linear.easeNone }); x.eventCallback("onUpdate", function (e) { var t = e.a * (Math.PI / 180), i = e.yoffset + e.unit * (1 - Math.sin(t)), a = e.xoffset + Math.cos(t) * e.unit; punchgs.TweenLite.to(e.element, .1, { force3D: "auto", x: a, y: i }) }, [y]), x.eventCallback("onComplete", function (e) { e._loop_timeline.restart() }, [i]), i._loop_timeline.append(x) } }, r = function (e) { e.closest(".rs-pendulum, .rs-slideloop, .rs-pulse, .rs-wave").each(function () { null != this._loop_timeline && (this._loop_timeline.pause(), this._loop_timeline = null) }) } }(jQuery);
/********************************************
 * REVOLUTION 5.4.6.5 EXTENSION - NAVIGATION
 * @version: 1.3.5 (06.04.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function (a) { "use strict"; var b = jQuery.fn.revolution, c = b.is_mobile(), d = { alias: "Navigation Min JS", name: "revolution.extensions.navigation.min.js", min_core: "5.4.0", version: "1.3.5" }; jQuery.extend(!0, b, { hideUnHideNav: function (a) { var b = a.c.width(), c = a.navigation.arrows, d = a.navigation.bullets, e = a.navigation.thumbnails, f = a.navigation.tabs; m(c) && y(a.c.find(".tparrows"), c.hide_under, b, c.hide_over), m(d) && y(a.c.find(".tp-bullets"), d.hide_under, b, d.hide_over), m(e) && y(a.c.parent().find(".tp-thumbs"), e.hide_under, b, e.hide_over), m(f) && y(a.c.parent().find(".tp-tabs"), f.hide_under, b, f.hide_over), x(a) }, resizeThumbsTabs: function (a, b) { if (a.navigation && a.navigation.tabs.enable || a.navigation && a.navigation.thumbnails.enable) { var c = (jQuery(window).width() - 480) / 500, d = new punchgs.TimelineLite, e = a.navigation.tabs, g = a.navigation.thumbnails, h = a.navigation.bullets; if (d.pause(), c = c > 1 ? 1 : c < 0 ? 0 : c, m(e) && (b || e.width > e.min_width) && f(c, d, a.c, e, a.slideamount, "tab"), m(g) && (b || g.width > g.min_width) && f(c, d, a.c, g, a.slideamount, "thumb"), m(h) && b) { var i = a.c.find(".tp-bullets"); i.find(".tp-bullet").each(function (a) { var b = jQuery(this), c = a + 1, d = b.outerWidth() + parseInt(void 0 === h.space ? 0 : h.space, 0), e = b.outerHeight() + parseInt(void 0 === h.space ? 0 : h.space, 0); "vertical" === h.direction ? (b.css({ top: (c - 1) * e + "px", left: "0px" }), i.css({ height: (c - 1) * e + b.outerHeight(), width: b.outerWidth() })) : (b.css({ left: (c - 1) * d + "px", top: "0px" }), i.css({ width: (c - 1) * d + b.outerWidth(), height: b.outerHeight() })) }) } d.play(), x(a) } return !0 }, updateNavIndexes: function (a) { function d(a) { c.find(a).lenght > 0 && c.find(a).each(function (a) { jQuery(this).data("liindex", a) }) } var c = a.c; d(".tp-tab"), d(".tp-bullet"), d(".tp-thumb"), b.resizeThumbsTabs(a, !0), b.manageNavigation(a) }, manageNavigation: function (a) { var c = b.getHorizontalOffset(a.c.parent(), "left"), d = b.getHorizontalOffset(a.c.parent(), "right"); m(a.navigation.bullets) && ("fullscreen" != a.sliderLayout && "fullwidth" != a.sliderLayout && (a.navigation.bullets.h_offset_old = void 0 === a.navigation.bullets.h_offset_old ? a.navigation.bullets.h_offset : a.navigation.bullets.h_offset_old, a.navigation.bullets.h_offset = "center" === a.navigation.bullets.h_align ? a.navigation.bullets.h_offset_old + c / 2 - d / 2 : a.navigation.bullets.h_offset_old + c - d), t(a.c.find(".tp-bullets"), a.navigation.bullets, a)), m(a.navigation.thumbnails) && t(a.c.parent().find(".tp-thumbs"), a.navigation.thumbnails, a), m(a.navigation.tabs) && t(a.c.parent().find(".tp-tabs"), a.navigation.tabs, a), m(a.navigation.arrows) && ("fullscreen" != a.sliderLayout && "fullwidth" != a.sliderLayout && (a.navigation.arrows.left.h_offset_old = void 0 === a.navigation.arrows.left.h_offset_old ? a.navigation.arrows.left.h_offset : a.navigation.arrows.left.h_offset_old, a.navigation.arrows.left.h_offset = "right" === a.navigation.arrows.left.h_align ? a.navigation.arrows.left.h_offset_old + d : a.navigation.arrows.left.h_offset_old + c, a.navigation.arrows.right.h_offset_old = void 0 === a.navigation.arrows.right.h_offset_old ? a.navigation.arrows.right.h_offset : a.navigation.arrows.right.h_offset_old, a.navigation.arrows.right.h_offset = "right" === a.navigation.arrows.right.h_align ? a.navigation.arrows.right.h_offset_old + d : a.navigation.arrows.right.h_offset_old + c), t(a.c.find(".tp-leftarrow.tparrows"), a.navigation.arrows.left, a), t(a.c.find(".tp-rightarrow.tparrows"), a.navigation.arrows.right, a)), m(a.navigation.thumbnails) && e(a.c.parent().find(".tp-thumbs"), a.navigation.thumbnails), m(a.navigation.tabs) && e(a.c.parent().find(".tp-tabs"), a.navigation.tabs) }, createNavigation: function (a, f) { if ("stop" === b.compare_version(d).check) return !1; var g = a.parent(), j = f.navigation.arrows, n = f.navigation.bullets, r = f.navigation.thumbnails, s = f.navigation.tabs, t = m(j), v = m(n), x = m(r), y = m(s); h(a, f), i(a, f), t && q(a, j, f), f.li.each(function (b) { var c = jQuery(f.li[f.li.length - 1 - b]), d = jQuery(this); v && (f.navigation.bullets.rtl ? u(a, n, c, f) : u(a, n, d, f)), x && (f.navigation.thumbnails.rtl ? w(a, r, c, "tp-thumb", f) : w(a, r, d, "tp-thumb", f)), y && (f.navigation.tabs.rtl ? w(a, s, c, "tp-tab", f) : w(a, s, d, "tp-tab", f)) }), a.bind("revolution.slide.onafterswap revolution.nextslide.waiting", function () { var b = 0 == a.find(".next-revslide").length ? a.find(".active-revslide").data("index") : a.find(".next-revslide").data("index"); a.find(".tp-bullet").each(function () { var a = jQuery(this); a.data("liref") === b ? a.addClass("selected") : a.removeClass("selected") }), g.find(".tp-thumb, .tp-tab").each(function () { var a = jQuery(this); a.data("liref") === b ? (a.addClass("selected"), a.hasClass("tp-tab") ? e(g.find(".tp-tabs"), s) : e(g.find(".tp-thumbs"), r)) : a.removeClass("selected") }); var c = 0, d = !1; f.thumbs && jQuery.each(f.thumbs, function (a, e) { c = !1 === d ? a : c, d = e.id === b || a === b || d }); var h = c > 0 ? c - 1 : f.slideamount - 1, i = c + 1 == f.slideamount ? 0 : c + 1; if (!0 === j.enable) { var k = j.tmp; if (void 0 != f.thumbs[h] && jQuery.each(f.thumbs[h].params, function (a, b) { k = k.replace(b.from, b.to) }), j.left.j.html(k), k = j.tmp, i > f.slideamount) return; jQuery.each(f.thumbs[i].params, function (a, b) { k = k.replace(b.from, b.to) }), j.right.j.html(k), j.rtl ? (punchgs.TweenLite.set(j.left.j.find(".tp-arr-imgholder"), { backgroundImage: "url(" + f.thumbs[i].src + ")" }), punchgs.TweenLite.set(j.right.j.find(".tp-arr-imgholder"), { backgroundImage: "url(" + f.thumbs[h].src + ")" })) : (punchgs.TweenLite.set(j.left.j.find(".tp-arr-imgholder"), { backgroundImage: "url(" + f.thumbs[h].src + ")" }), punchgs.TweenLite.set(j.right.j.find(".tp-arr-imgholder"), { backgroundImage: "url(" + f.thumbs[i].src + ")" })) } }), l(j), l(n), l(r), l(s), g.on("mouseenter mousemove", function () { g.hasClass("tp-mouseover") || (g.addClass("tp-mouseover"), punchgs.TweenLite.killDelayedCallsTo(p), t && j.hide_onleave && p(g.find(".tparrows"), j, "show"), v && n.hide_onleave && p(g.find(".tp-bullets"), n, "show"), x && r.hide_onleave && p(g.find(".tp-thumbs"), r, "show"), y && s.hide_onleave && p(g.find(".tp-tabs"), s, "show"), c && (g.removeClass("tp-mouseover"), o(a, f))) }), g.on("mouseleave", function () { g.removeClass("tp-mouseover"), o(a, f) }), t && j.hide_onleave && p(g.find(".tparrows"), j, "hide", 0), v && n.hide_onleave && p(g.find(".tp-bullets"), n, "hide", 0), x && r.hide_onleave && p(g.find(".tp-thumbs"), r, "hide", 0), y && s.hide_onleave && p(g.find(".tp-tabs"), s, "hide", 0), x && k(g.find(".tp-thumbs"), f), y && k(g.find(".tp-tabs"), f), "carousel" === f.sliderType && k(a, f, !0), ("on" === f.navigation.touch.touchOnDesktop || "on" == f.navigation.touch.touchenabled && c) && k(a, f, "swipebased") } }); var e = function (a, b) { var d = (a.hasClass("tp-thumbs"), a.hasClass("tp-thumbs") ? ".tp-thumb-mask" : ".tp-tab-mask"), e = a.hasClass("tp-thumbs") ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper", f = a.hasClass("tp-thumbs") ? ".tp-thumb" : ".tp-tab", g = a.find(d), h = g.find(e), i = b.direction, j = "vertical" === i ? g.find(f).first().outerHeight(!0) + b.space : g.find(f).first().outerWidth(!0) + b.space, k = "vertical" === i ? g.height() : g.width(), l = parseInt(g.find(f + ".selected").data("liindex"), 0), m = k / j, n = "vertical" === i ? g.height() : g.width(), o = 0 - l * j, p = "vertical" === i ? h.height() : h.width(), q = o < 0 - (p - n) ? 0 - (p - n) : q > 0 ? 0 : o, r = h.data("offset"); m > 2 && (q = o - (r + j) <= 0 ? o - (r + j) < 0 - j ? r : q + j : q, q = o - j + r + k < j && o + (Math.round(m) - 2) * j < r ? o + (Math.round(m) - 2) * j : q), q = q < 0 - (p - n) ? 0 - (p - n) : q > 0 ? 0 : q, "vertical" !== i && g.width() >= h.width() && (q = 0), "vertical" === i && g.height() >= h.height() && (q = 0), a.hasClass("dragged") || ("vertical" === i ? h.data("tmmove", punchgs.TweenLite.to(h, .5, { top: q + "px", ease: punchgs.Power3.easeInOut })) : h.data("tmmove", punchgs.TweenLite.to(h, .5, { left: q + "px", ease: punchgs.Power3.easeInOut })), h.data("offset", q)) }, f = function (a, b, c, d, e, f) { var g = c.parent().find(".tp-" + f + "s"), h = g.find(".tp-" + f + "s-inner-wrapper"), i = g.find(".tp-" + f + "-mask"), j = d.width * a < d.min_width ? d.min_width : Math.round(d.width * a), k = Math.round(j / d.width * d.height), l = "vertical" === d.direction ? j : j * e + d.space * (e - 1), m = "vertical" === d.direction ? k * e + d.space * (e - 1) : k, n = "vertical" === d.direction ? { width: j + "px" } : { height: k + "px" }; b.add(punchgs.TweenLite.set(g, n)), b.add(punchgs.TweenLite.set(h, { width: l + "px", height: m + "px" })), b.add(punchgs.TweenLite.set(i, { width: l + "px", height: m + "px" })); var o = h.find(".tp-" + f); return o && jQuery.each(o, function (a, c) { "vertical" === d.direction ? b.add(punchgs.TweenLite.set(c, { top: a * (k + parseInt(void 0 === d.space ? 0 : d.space, 0)), width: j + "px", height: k + "px" })) : "horizontal" === d.direction && b.add(punchgs.TweenLite.set(c, { left: a * (j + parseInt(void 0 === d.space ? 0 : d.space, 0)), width: j + "px", height: k + "px" })) }), b }, g = function (a) { var b = 0, c = 0, d = 0, e = 0, f = 1, g = 1, h = 1; return "detail" in a && (c = a.detail), "wheelDelta" in a && (c = -a.wheelDelta / 120), "wheelDeltaY" in a && (c = -a.wheelDeltaY / 120), "wheelDeltaX" in a && (b = -a.wheelDeltaX / 120), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (b = c, c = 0), d = b * f, e = c * f, "deltaY" in a && (e = a.deltaY), "deltaX" in a && (d = a.deltaX), (d || e) && a.deltaMode && (1 == a.deltaMode ? (d *= g, e *= g) : (d *= h, e *= h)), d && !b && (b = d < 1 ? -1 : 1), e && !c && (c = e < 1 ? -1 : 1), e = navigator.userAgent.match(/mozilla/i) ? 10 * e : e, (e > 300 || e < -300) && (e /= 10), { spinX: b, spinY: c, pixelX: d, pixelY: e } }, h = function (a, c) { "on" === c.navigation.keyboardNavigation && jQuery(document).keydown(function (d) { ("horizontal" == c.navigation.keyboard_direction && 39 == d.keyCode || "vertical" == c.navigation.keyboard_direction && 40 == d.keyCode) && (c.sc_indicator = "arrow", c.sc_indicator_dir = 0, b.callingNewSlide(a, 1)), ("horizontal" == c.navigation.keyboard_direction && 37 == d.keyCode || "vertical" == c.navigation.keyboard_direction && 38 == d.keyCode) && (c.sc_indicator = "arrow", c.sc_indicator_dir = 1, b.callingNewSlide(a, -1)) }) }, i = function (a, c) { if ("on" === c.navigation.mouseScrollNavigation || "carousel" === c.navigation.mouseScrollNavigation) { c.isIEEleven = !!navigator.userAgent.match(/Trident.*rv\:11\./), c.isSafari = !!navigator.userAgent.match(/safari/i), c.ischrome = !!navigator.userAgent.match(/chrome/i); var d = c.ischrome ? -49 : c.isIEEleven || c.isSafari ? -9 : navigator.userAgent.match(/mozilla/i) ? -29 : -49, e = c.ischrome ? 49 : c.isIEEleven || c.isSafari ? 9 : navigator.userAgent.match(/mozilla/i) ? 29 : 49; a.on("mousewheel DOMMouseScroll", function (f) { var h = g(f.originalEvent), i = a.find(".tp-revslider-slidesli.active-revslide").index(), j = a.find(".tp-revslider-slidesli.processing-revslide").index(), k = -1 != i && 0 == i || -1 != j && 0 == j, l = -1 != i && i == c.slideamount - 1 || 1 != j && j == c.slideamount - 1, m = !0; "carousel" == c.navigation.mouseScrollNavigation && (k = l = !1), -1 == j ? h.pixelY < d ? (k || (c.sc_indicator = "arrow", "reverse" !== c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 1, b.callingNewSlide(a, -1)), m = !1), l || (c.sc_indicator = "arrow", "reverse" === c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 0, b.callingNewSlide(a, 1)), m = !1)) : h.pixelY > e && (l || (c.sc_indicator = "arrow", "reverse" !== c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 0, b.callingNewSlide(a, 1)), m = !1), k || (c.sc_indicator = "arrow", "reverse" === c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 1, b.callingNewSlide(a, -1)), m = !1)) : m = !1; var n = c.c.offset().top - jQuery("body").scrollTop(), o = n + c.c.height(); return "carousel" != c.navigation.mouseScrollNavigation ? ("reverse" !== c.navigation.mouseScrollReverse && (n > 0 && h.pixelY > 0 || o < jQuery(window).height() && h.pixelY < 0) && (m = !0), "reverse" === c.navigation.mouseScrollReverse && (n < 0 && h.pixelY < 0 || o > jQuery(window).height() && h.pixelY > 0) && (m = !0)) : m = !1, 0 == m ? (f.preventDefault(f), !1) : void 0 }) } }, j = function (a, b, d) { return a = c ? jQuery(d.target).closest("." + a).length || jQuery(d.srcElement).closest("." + a).length : jQuery(d.toElement).closest("." + a).length || jQuery(d.originalTarget).closest("." + a).length, !0 === a || 1 === a ? 1 : 0 }, k = function (a, d, e) { var f = d.carousel; jQuery(".bullet, .bullets, .tp-bullets, .tparrows").addClass("noSwipe"), f.Limit = "endless"; var h = (c || b.get_browser(), a), i = "vertical" === d.navigation.thumbnails.direction || "vertical" === d.navigation.tabs.direction ? "none" : "vertical", k = d.navigation.touch.swipe_direction || "horizontal"; i = "swipebased" == e && "vertical" == k ? "none" : e ? "vertical" : i, jQuery.fn.swipetp || (jQuery.fn.swipetp = jQuery.fn.swipe), jQuery.fn.swipetp.defaults && jQuery.fn.swipetp.defaults.excludedElements || jQuery.fn.swipetp.defaults || (jQuery.fn.swipetp.defaults = new Object), jQuery.fn.swipetp.defaults.excludedElements = "label, button, input, select, textarea, .noSwipe", h.swipetp({ allowPageScroll: i, triggerOnTouchLeave: !0, treshold: d.navigation.touch.swipe_treshold, fingers: d.navigation.touch.swipe_min_touches, excludeElements: jQuery.fn.swipetp.defaults.excludedElements, swipeStatus: function (e, g, h, i, l, m, n) { var o = j("rev_slider_wrapper", a, e), p = j("tp-thumbs", a, e), q = j("tp-tabs", a, e), r = jQuery(this).attr("class"), s = !!r.match(/tp-tabs|tp-thumb/gi); if ("carousel" === d.sliderType && (("move" === g || "end" === g || "cancel" == g) && d.dragStartedOverSlider && !d.dragStartedOverThumbs && !d.dragStartedOverTabs || "start" === g && o > 0 && 0 === p && 0 === q)) { if (c && ("up" === h || "down" === h)) return; switch (d.dragStartedOverSlider = !0, i = h && h.match(/left|up/g) ? Math.round(-1 * i) : i = Math.round(1 * i), g) { case "start": void 0 !== f.positionanim && (f.positionanim.kill(), f.slide_globaloffset = "off" === f.infinity ? f.slide_offset : b.simp(f.slide_offset, f.maxwidth)), f.overpull = "none", f.wrap.addClass("dragged"); break; case "move": if (d.c.find(".tp-withaction").addClass("tp-temporarydisabled"), f.slide_offset = "off" === f.infinity ? f.slide_globaloffset + i : b.simp(f.slide_globaloffset + i, f.maxwidth), "off" === f.infinity) { var t = "center" === f.horizontal_align ? (f.wrapwidth / 2 - f.slide_width / 2 - f.slide_offset) / f.slide_width : (0 - f.slide_offset) / f.slide_width; "none" !== f.overpull && 0 !== f.overpull || !(t < 0 || t > d.slideamount - 1) ? t >= 0 && t <= d.slideamount - 1 && (t >= 0 && i > f.overpull || t <= d.slideamount - 1 && i < f.overpull) && (f.overpull = 0) : f.overpull = i, f.slide_offset = t < 0 ? f.slide_offset + (f.overpull - i) / 1.1 + Math.sqrt(Math.abs((f.overpull - i) / 1.1)) : t > d.slideamount - 1 ? f.slide_offset + (f.overpull - i) / 1.1 - Math.sqrt(Math.abs((f.overpull - i) / 1.1)) : f.slide_offset } b.organiseCarousel(d, h, !0, !0); break; case "end": case "cancel": f.slide_globaloffset = f.slide_offset, f.wrap.removeClass("dragged"), b.carouselToEvalPosition(d, h), d.dragStartedOverSlider = !1, d.dragStartedOverThumbs = !1, d.dragStartedOverTabs = !1, setTimeout(function () { d.c.find(".tp-withaction").removeClass("tp-temporarydisabled") }, 19) } } else { if (("move" !== g && "end" !== g && "cancel" != g || d.dragStartedOverSlider || !d.dragStartedOverThumbs && !d.dragStartedOverTabs) && !("start" === g && o > 0 && (p > 0 || q > 0))) { if ("end" == g && !s) { if (d.sc_indicator = "arrow", "horizontal" == k && "left" == h || "vertical" == k && "up" == h) return d.sc_indicator_dir = 0, b.callingNewSlide(d.c, 1), !1; if ("horizontal" == k && "right" == h || "vertical" == k && "down" == h) return d.sc_indicator_dir = 1, b.callingNewSlide(d.c, -1), !1 } return d.dragStartedOverSlider = !1, d.dragStartedOverThumbs = !1, d.dragStartedOverTabs = !1, !0 } p > 0 && (d.dragStartedOverThumbs = !0), q > 0 && (d.dragStartedOverTabs = !0); var u = d.dragStartedOverThumbs ? ".tp-thumbs" : ".tp-tabs", v = d.dragStartedOverThumbs ? ".tp-thumb-mask" : ".tp-tab-mask", w = d.dragStartedOverThumbs ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper", x = d.dragStartedOverThumbs ? ".tp-thumb" : ".tp-tab", y = d.dragStartedOverThumbs ? d.navigation.thumbnails : d.navigation.tabs; i = h && h.match(/left|up/g) ? Math.round(-1 * i) : i = Math.round(1 * i); var z = a.parent().find(v), A = z.find(w), B = y.direction, C = "vertical" === B ? A.height() : A.width(), D = "vertical" === B ? z.height() : z.width(), E = "vertical" === B ? z.find(x).first().outerHeight(!0) + y.space : z.find(x).first().outerWidth(!0) + y.space, F = void 0 === A.data("offset") ? 0 : parseInt(A.data("offset"), 0), G = 0; switch (g) { case "start": a.parent().find(u).addClass("dragged"), F = "vertical" === B ? A.position().top : A.position().left, A.data("offset", F), A.data("tmmove") && A.data("tmmove").pause(); break; case "move": if (C <= D) return !1; G = F + i, G = G > 0 ? "horizontal" === B ? G - A.width() * (G / A.width() * G / A.width()) : G - A.height() * (G / A.height() * G / A.height()) : G; var H = "vertical" === B ? 0 - (A.height() - z.height()) : 0 - (A.width() - z.width()); G = G < H ? "horizontal" === B ? G + A.width() * (G - H) / A.width() * (G - H) / A.width() : G + A.height() * (G - H) / A.height() * (G - H) / A.height() : G, "vertical" === B ? punchgs.TweenLite.set(A, { top: G + "px" }) : punchgs.TweenLite.set(A, { left: G + "px" }); break; case "end": case "cancel": if (s) return G = F + i, G = "vertical" === B ? G < 0 - (A.height() - z.height()) ? 0 - (A.height() - z.height()) : G : G < 0 - (A.width() - z.width()) ? 0 - (A.width() - z.width()) : G, G = G > 0 ? 0 : G, G = Math.abs(i) > E / 10 ? i <= 0 ? Math.floor(G / E) * E : Math.ceil(G / E) * E : i < 0 ? Math.ceil(G / E) * E : Math.floor(G / E) * E, G = "vertical" === B ? G < 0 - (A.height() - z.height()) ? 0 - (A.height() - z.height()) : G : G < 0 - (A.width() - z.width()) ? 0 - (A.width() - z.width()) : G, G = G > 0 ? 0 : G, "vertical" === B ? punchgs.TweenLite.to(A, .5, { top: G + "px", ease: punchgs.Power3.easeOut }) : punchgs.TweenLite.to(A, .5, { left: G + "px", ease: punchgs.Power3.easeOut }), G = G || ("vertical" === B ? A.position().top : A.position().left), A.data("offset", G), A.data("distance", i), setTimeout(function () { d.dragStartedOverSlider = !1, d.dragStartedOverThumbs = !1, d.dragStartedOverTabs = !1 }, 100), a.parent().find(u).removeClass("dragged"), !1 } } } }) }, l = function (a) { a.hide_delay = jQuery.isNumeric(parseInt(a.hide_delay, 0)) ? a.hide_delay / 1e3 : .2, a.hide_delay_mobile = jQuery.isNumeric(parseInt(a.hide_delay_mobile, 0)) ? a.hide_delay_mobile / 1e3 : .2 }, m = function (a) { return a && a.enable }, n = function (a) { return a && a.enable && !0 === a.hide_onleave && (void 0 === a.position || !a.position.match(/outer/g)) }, o = function (a, b) { var d = a.parent(); n(b.navigation.arrows) && punchgs.TweenLite.delayedCall(c ? b.navigation.arrows.hide_delay_mobile : b.navigation.arrows.hide_delay, p, [d.find(".tparrows"), b.navigation.arrows, "hide"]), n(b.navigation.bullets) && punchgs.TweenLite.delayedCall(c ? b.navigation.bullets.hide_delay_mobile : b.navigation.bullets.hide_delay, p, [d.find(".tp-bullets"), b.navigation.bullets, "hide"]), n(b.navigation.thumbnails) && punchgs.TweenLite.delayedCall(c ? b.navigation.thumbnails.hide_delay_mobile : b.navigation.thumbnails.hide_delay, p, [d.find(".tp-thumbs"), b.navigation.thumbnails, "hide"]), n(b.navigation.tabs) && punchgs.TweenLite.delayedCall(c ? b.navigation.tabs.hide_delay_mobile : b.navigation.tabs.hide_delay, p, [d.find(".tp-tabs"), b.navigation.tabs, "hide"]) }, p = function (a, b, c, d) { switch (d = void 0 === d ? .5 : d, c) { case "show": punchgs.TweenLite.to(a, d, { autoAlpha: 1, ease: punchgs.Power3.easeInOut, overwrite: "auto" }); break; case "hide": punchgs.TweenLite.to(a, d, { autoAlpha: 0, ease: punchgs.Power3.easeInOu, overwrite: "auto" }) } }, q = function (a, b, c) { b.style = void 0 === b.style ? "" : b.style, b.left.style = void 0 === b.left.style ? "" : b.left.style, b.right.style = void 0 === b.right.style ? "" : b.right.style, 0 === a.find(".tp-leftarrow.tparrows").length && a.append('<div class="tp-leftarrow tparrows ' + b.style + " " + b.left.style + '">' + b.tmp + "</div>"), 0 === a.find(".tp-rightarrow.tparrows").length && a.append('<div class="tp-rightarrow tparrows ' + b.style + " " + b.right.style + '">' + b.tmp + "</div>"); var d = a.find(".tp-leftarrow.tparrows"), e = a.find(".tp-rightarrow.tparrows"); b.rtl ? (d.click(function () { c.sc_indicator = "arrow", c.sc_indicator_dir = 0, a.revnext() }), e.click(function () { c.sc_indicator = "arrow", c.sc_indicator_dir = 1, a.revprev() })) : (e.click(function () { c.sc_indicator = "arrow", c.sc_indicator_dir = 0, a.revnext() }), d.click(function () { c.sc_indicator = "arrow", c.sc_indicator_dir = 1, a.revprev() })), b.right.j = a.find(".tp-rightarrow.tparrows"), b.left.j = a.find(".tp-leftarrow.tparrows"), b.padding_top = parseInt(c.carousel.padding_top || 0, 0), b.padding_bottom = parseInt(c.carousel.padding_bottom || 0, 0), t(d, b.left, c), t(e, b.right, c), b.left.opt = c, b.right.opt = c, "outer-left" != b.position && "outer-right" != b.position || (c.outernav = !0) }, r = function (a, b, c) { var d = a.outerHeight(!0), f = (a.outerWidth(!0), void 0 == b.opt ? 0 : 0 == c.conh ? c.height : c.conh), g = "layergrid" == b.container ? "fullscreen" == c.sliderLayout ? c.height / 2 - c.gridheight[c.curWinRange] * c.bh / 2 : "on" == c.autoHeight || void 0 != c.minHeight && c.minHeight > 0 ? f / 2 - c.gridheight[c.curWinRange] * c.bh / 2 : 0 : 0, h = "top" === b.v_align ? { top: "0px", y: Math.round(b.v_offset + g) + "px" } : "center" === b.v_align ? { top: "50%", y: Math.round(0 - d / 2 + b.v_offset) + "px" } : { top: "100%", y: Math.round(0 - (d + b.v_offset + g)) + "px" }; a.hasClass("outer-bottom") || punchgs.TweenLite.set(a, h) }, s = function (a, b, c) { var e = (a.outerHeight(!0), a.outerWidth(!0)), f = "layergrid" == b.container ? "carousel" === c.sliderType ? 0 : c.width / 2 - c.gridwidth[c.curWinRange] * c.bw / 2 : 0, g = "left" === b.h_align ? { left: "0px", x: Math.round(b.h_offset + f) + "px" } : "center" === b.h_align ? { left: "50%", x: Math.round(0 - e / 2 + b.h_offset) + "px" } : { left: "100%", x: Math.round(0 - (e + b.h_offset + f)) + "px" }; punchgs.TweenLite.set(a, g) }, t = function (a, b, c) { var d = a.closest(".tp-simpleresponsive").length > 0 ? a.closest(".tp-simpleresponsive") : a.closest(".tp-revslider-mainul").length > 0 ? a.closest(".tp-revslider-mainul") : a.closest(".rev_slider_wrapper").length > 0 ? a.closest(".rev_slider_wrapper") : a.parent().find(".tp-revslider-mainul"), e = d.width(), f = d.height(); if (r(a, b, c), s(a, b, c), "outer-left" !== b.position || "fullwidth" != b.sliderLayout && "fullscreen" != b.sliderLayout ? "outer-right" !== b.position || "fullwidth" != b.sliderLayout && "fullscreen" != b.sliderLayout || punchgs.TweenLite.set(a, { right: 0 - a.outerWidth() + "px", x: b.h_offset + "px" }) : punchgs.TweenLite.set(a, { left: 0 - a.outerWidth() + "px", x: b.h_offset + "px" }), a.hasClass("tp-thumbs") || a.hasClass("tp-tabs")) { var g = a.data("wr_padding"), h = a.data("maxw"), i = a.data("maxh"), j = a.hasClass("tp-thumbs") ? a.find(".tp-thumb-mask") : a.find(".tp-tab-mask"), k = parseInt(b.padding_top || 0, 0), l = parseInt(b.padding_bottom || 0, 0); h > e && "outer-left" !== b.position && "outer-right" !== b.position ? (punchgs.TweenLite.set(a, { left: "0px", x: 0, maxWidth: e - 2 * g + "px" }), punchgs.TweenLite.set(j, { maxWidth: e - 2 * g + "px" })) : (punchgs.TweenLite.set(a, { maxWidth: h + "px" }), punchgs.TweenLite.set(j, { maxWidth: h + "px" })), i + 2 * g > f && "outer-bottom" !== b.position && "outer-top" !== b.position ? (punchgs.TweenLite.set(a, { top: "0px", y: 0, maxHeight: k + l + (f - 2 * g) + "px" }), punchgs.TweenLite.set(j, { maxHeight: k + l + (f - 2 * g) + "px" })) : (punchgs.TweenLite.set(a, { maxHeight: i + "px" }), punchgs.TweenLite.set(j, { maxHeight: i + "px" })), "outer-left" !== b.position && "outer-right" !== b.position && (k = 0, l = 0), !0 === b.span && "vertical" === b.direction ? (punchgs.TweenLite.set(a, { maxHeight: k + l + (f - 2 * g) + "px", height: k + l + (f - 2 * g) + "px", top: 0 - k, y: 0 }), r(j, b, c)) : !0 === b.span && "horizontal" === b.direction && (punchgs.TweenLite.set(a, { maxWidth: "100%", width: e - 2 * g + "px", left: 0, x: 0 }), s(j, b, c)) } }, u = function (a, b, c, d) { 0 === a.find(".tp-bullets").length && (b.style = void 0 === b.style ? "" : b.style, a.append('<div class="tp-bullets ' + b.style + " " + b.direction + '"></div>')); var e = a.find(".tp-bullets"), f = c.data("index"), g = b.tmp; jQuery.each(d.thumbs[c.index()].params, function (a, b) { g = g.replace(b.from, b.to) }), e.append('<div class="justaddedbullet tp-bullet">' + g + "</div>"); var h = a.find(".justaddedbullet"), i = a.find(".tp-bullet").length, j = h.outerWidth() + parseInt(void 0 === b.space ? 0 : b.space, 0), k = h.outerHeight() + parseInt(void 0 === b.space ? 0 : b.space, 0); "vertical" === b.direction ? (h.css({ top: (i - 1) * k + "px", left: "0px" }), e.css({ height: (i - 1) * k + h.outerHeight(), width: h.outerWidth() })) : (h.css({ left: (i - 1) * j + "px", top: "0px" }), e.css({ width: (i - 1) * j + h.outerWidth(), height: h.outerHeight() })), h.find(".tp-bullet-image").css({ backgroundImage: "url(" + d.thumbs[c.index()].src + ")" }), h.data("liref", f), h.click(function () { d.sc_indicator = "bullet", a.revcallslidewithid(f), a.find(".tp-bullet").removeClass("selected"), jQuery(this).addClass("selected") }), h.removeClass("justaddedbullet"), b.padding_top = parseInt(d.carousel.padding_top || 0, 0), b.padding_bottom = parseInt(d.carousel.padding_bottom || 0, 0), b.opt = d, "outer-left" != b.position && "outer-right" != b.position || (d.outernav = !0), e.addClass("nav-pos-hor-" + b.h_align), e.addClass("nav-pos-ver-" + b.v_align), e.addClass("nav-dir-" + b.direction), t(e, b, d) }, w = function (a, b, c, d, e) { var f = "tp-thumb" === d ? ".tp-thumbs" : ".tp-tabs", g = "tp-thumb" === d ? ".tp-thumb-mask" : ".tp-tab-mask", h = "tp-thumb" === d ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper", i = "tp-thumb" === d ? ".tp-thumb" : ".tp-tab", j = "tp-thumb" === d ? ".tp-thumb-image" : ".tp-tab-image"; if (b.visibleAmount = b.visibleAmount > e.slideamount ? e.slideamount : b.visibleAmount, b.sliderLayout = e.sliderLayout, 0 === a.parent().find(f).length) { b.style = void 0 === b.style ? "" : b.style; var k = !0 === b.span ? "tp-span-wrapper" : "", l = '<div class="' + d + "s " + k + " " + b.position + " " + b.style + '"><div class="' + d + '-mask"><div class="' + d + 's-inner-wrapper" style="position:relative;"></div></div></div>'; "outer-top" === b.position ? a.parent().prepend(l) : "outer-bottom" === b.position ? a.after(l) : a.append(l), b.padding_top = parseInt(e.carousel.padding_top || 0, 0), b.padding_bottom = parseInt(e.carousel.padding_bottom || 0, 0), "outer-left" != b.position && "outer-right" != b.position || (e.outernav = !0) } var m = c.data("index"), n = a.parent().find(f), o = n.find(g), p = o.find(h), q = "horizontal" === b.direction ? b.width * b.visibleAmount + b.space * (b.visibleAmount - 1) : b.width, r = "horizontal" === b.direction ? b.height : b.height * b.visibleAmount + b.space * (b.visibleAmount - 1), s = b.tmp; jQuery.each(e.thumbs[c.index()].params, function (a, b) { s = s.replace(b.from, b.to) }), p.append('<div data-liindex="' + c.index() + '" data-liref="' + m + '" class="justaddedthumb ' + d + '" style="width:' + b.width + "px;height:" + b.height + 'px;">' + s + "</div>"); var u = n.find(".justaddedthumb"), v = n.find(i).length, w = u.outerWidth() + parseInt(void 0 === b.space ? 0 : b.space, 0), x = u.outerHeight() + parseInt(void 0 === b.space ? 0 : b.space, 0); u.find(j).css({ backgroundImage: "url(" + e.thumbs[c.index()].src + ")" }), "vertical" === b.direction ? (u.css({ top: (v - 1) * x + "px", left: "0px" }), p.css({ height: (v - 1) * x + u.outerHeight(), width: u.outerWidth() })) : (u.css({ left: (v - 1) * w + "px", top: "0px" }), p.css({ width: (v - 1) * w + u.outerWidth(), height: u.outerHeight() })), n.data("maxw", q), n.data("maxh", r), n.data("wr_padding", b.wrapper_padding); var y = "outer-top" === b.position || "outer-bottom" === b.position ? "relative" : "absolute"; "outer-top" !== b.position && "outer-bottom" !== b.position || b.h_align; o.css({ maxWidth: q + "px", maxHeight: r + "px", overflow: "hidden", position: "relative" }), n.css({ maxWidth: q + "px", maxHeight: r + "px", overflow: "visible", position: y, background: b.wrapper_color, padding: b.wrapper_padding + "px", boxSizing: "contet-box" }), u.click(function () { e.sc_indicator = "bullet"; var b = a.parent().find(h).data("distance"); b = void 0 === b ? 0 : b, Math.abs(b) < 10 && (a.revcallslidewithid(m), a.parent().find(f).removeClass("selected"), jQuery(this).addClass("selected")) }), u.removeClass("justaddedthumb"), b.opt = e, n.addClass("nav-pos-hor-" + b.h_align), n.addClass("nav-pos-ver-" + b.v_align), n.addClass("nav-dir-" + b.direction), t(n, b, e) }, x = function (a) { var b = a.c.parent().find(".outer-top"), c = a.c.parent().find(".outer-bottom"); a.top_outer = b.hasClass("tp-forcenotvisible") ? 0 : b.outerHeight() || 0, a.bottom_outer = c.hasClass("tp-forcenotvisible") ? 0 : c.outerHeight() || 0 }, y = function (a, b, c, d) { b > c || c > d ? a.addClass("tp-forcenotvisible") : a.removeClass("tp-forcenotvisible") } }(jQuery);
/********************************************
 * REVOLUTION 5.4.6.5 EXTENSION - NAVIGATION
 * @version: 1.3.5 (06.04.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function (a) { "use strict"; var b = jQuery.fn.revolution, c = b.is_mobile(), d = { alias: "Navigation Min JS", name: "revolution.extensions.navigation.min.js", min_core: "5.4.0", version: "1.3.5" }; jQuery.extend(!0, b, { hideUnHideNav: function (a) { var b = a.c.width(), c = a.navigation.arrows, d = a.navigation.bullets, e = a.navigation.thumbnails, f = a.navigation.tabs; m(c) && y(a.c.find(".tparrows"), c.hide_under, b, c.hide_over), m(d) && y(a.c.find(".tp-bullets"), d.hide_under, b, d.hide_over), m(e) && y(a.c.parent().find(".tp-thumbs"), e.hide_under, b, e.hide_over), m(f) && y(a.c.parent().find(".tp-tabs"), f.hide_under, b, f.hide_over), x(a) }, resizeThumbsTabs: function (a, b) { if (a.navigation && a.navigation.tabs.enable || a.navigation && a.navigation.thumbnails.enable) { var c = (jQuery(window).width() - 480) / 500, d = new punchgs.TimelineLite, e = a.navigation.tabs, g = a.navigation.thumbnails, h = a.navigation.bullets; if (d.pause(), c = c > 1 ? 1 : c < 0 ? 0 : c, m(e) && (b || e.width > e.min_width) && f(c, d, a.c, e, a.slideamount, "tab"), m(g) && (b || g.width > g.min_width) && f(c, d, a.c, g, a.slideamount, "thumb"), m(h) && b) { var i = a.c.find(".tp-bullets"); i.find(".tp-bullet").each(function (a) { var b = jQuery(this), c = a + 1, d = b.outerWidth() + parseInt(void 0 === h.space ? 0 : h.space, 0), e = b.outerHeight() + parseInt(void 0 === h.space ? 0 : h.space, 0); "vertical" === h.direction ? (b.css({ top: (c - 1) * e + "px", left: "0px" }), i.css({ height: (c - 1) * e + b.outerHeight(), width: b.outerWidth() })) : (b.css({ left: (c - 1) * d + "px", top: "0px" }), i.css({ width: (c - 1) * d + b.outerWidth(), height: b.outerHeight() })) }) } d.play(), x(a) } return !0 }, updateNavIndexes: function (a) { function d(a) { c.find(a).lenght > 0 && c.find(a).each(function (a) { jQuery(this).data("liindex", a) }) } var c = a.c; d(".tp-tab"), d(".tp-bullet"), d(".tp-thumb"), b.resizeThumbsTabs(a, !0), b.manageNavigation(a) }, manageNavigation: function (a) { var c = b.getHorizontalOffset(a.c.parent(), "left"), d = b.getHorizontalOffset(a.c.parent(), "right"); m(a.navigation.bullets) && ("fullscreen" != a.sliderLayout && "fullwidth" != a.sliderLayout && (a.navigation.bullets.h_offset_old = void 0 === a.navigation.bullets.h_offset_old ? a.navigation.bullets.h_offset : a.navigation.bullets.h_offset_old, a.navigation.bullets.h_offset = "center" === a.navigation.bullets.h_align ? a.navigation.bullets.h_offset_old + c / 2 - d / 2 : a.navigation.bullets.h_offset_old + c - d), t(a.c.find(".tp-bullets"), a.navigation.bullets, a)), m(a.navigation.thumbnails) && t(a.c.parent().find(".tp-thumbs"), a.navigation.thumbnails, a), m(a.navigation.tabs) && t(a.c.parent().find(".tp-tabs"), a.navigation.tabs, a), m(a.navigation.arrows) && ("fullscreen" != a.sliderLayout && "fullwidth" != a.sliderLayout && (a.navigation.arrows.left.h_offset_old = void 0 === a.navigation.arrows.left.h_offset_old ? a.navigation.arrows.left.h_offset : a.navigation.arrows.left.h_offset_old, a.navigation.arrows.left.h_offset = "right" === a.navigation.arrows.left.h_align ? a.navigation.arrows.left.h_offset_old + d : a.navigation.arrows.left.h_offset_old + c, a.navigation.arrows.right.h_offset_old = void 0 === a.navigation.arrows.right.h_offset_old ? a.navigation.arrows.right.h_offset : a.navigation.arrows.right.h_offset_old, a.navigation.arrows.right.h_offset = "right" === a.navigation.arrows.right.h_align ? a.navigation.arrows.right.h_offset_old + d : a.navigation.arrows.right.h_offset_old + c), t(a.c.find(".tp-leftarrow.tparrows"), a.navigation.arrows.left, a), t(a.c.find(".tp-rightarrow.tparrows"), a.navigation.arrows.right, a)), m(a.navigation.thumbnails) && e(a.c.parent().find(".tp-thumbs"), a.navigation.thumbnails), m(a.navigation.tabs) && e(a.c.parent().find(".tp-tabs"), a.navigation.tabs) }, createNavigation: function (a, f) { if ("stop" === b.compare_version(d).check) return !1; var g = a.parent(), j = f.navigation.arrows, n = f.navigation.bullets, r = f.navigation.thumbnails, s = f.navigation.tabs, t = m(j), v = m(n), x = m(r), y = m(s); h(a, f), i(a, f), t && q(a, j, f), f.li.each(function (b) { var c = jQuery(f.li[f.li.length - 1 - b]), d = jQuery(this); v && (f.navigation.bullets.rtl ? u(a, n, c, f) : u(a, n, d, f)), x && (f.navigation.thumbnails.rtl ? w(a, r, c, "tp-thumb", f) : w(a, r, d, "tp-thumb", f)), y && (f.navigation.tabs.rtl ? w(a, s, c, "tp-tab", f) : w(a, s, d, "tp-tab", f)) }), a.bind("revolution.slide.onafterswap revolution.nextslide.waiting", function () { var b = 0 == a.find(".next-revslide").length ? a.find(".active-revslide").data("index") : a.find(".next-revslide").data("index"); a.find(".tp-bullet").each(function () { var a = jQuery(this); a.data("liref") === b ? a.addClass("selected") : a.removeClass("selected") }), g.find(".tp-thumb, .tp-tab").each(function () { var a = jQuery(this); a.data("liref") === b ? (a.addClass("selected"), a.hasClass("tp-tab") ? e(g.find(".tp-tabs"), s) : e(g.find(".tp-thumbs"), r)) : a.removeClass("selected") }); var c = 0, d = !1; f.thumbs && jQuery.each(f.thumbs, function (a, e) { c = !1 === d ? a : c, d = e.id === b || a === b || d }); var h = c > 0 ? c - 1 : f.slideamount - 1, i = c + 1 == f.slideamount ? 0 : c + 1; if (!0 === j.enable) { var k = j.tmp; if (void 0 != f.thumbs[h] && jQuery.each(f.thumbs[h].params, function (a, b) { k = k.replace(b.from, b.to) }), j.left.j.html(k), k = j.tmp, i > f.slideamount) return; jQuery.each(f.thumbs[i].params, function (a, b) { k = k.replace(b.from, b.to) }), j.right.j.html(k), j.rtl ? (punchgs.TweenLite.set(j.left.j.find(".tp-arr-imgholder"), { backgroundImage: "url(" + f.thumbs[i].src + ")" }), punchgs.TweenLite.set(j.right.j.find(".tp-arr-imgholder"), { backgroundImage: "url(" + f.thumbs[h].src + ")" })) : (punchgs.TweenLite.set(j.left.j.find(".tp-arr-imgholder"), { backgroundImage: "url(" + f.thumbs[h].src + ")" }), punchgs.TweenLite.set(j.right.j.find(".tp-arr-imgholder"), { backgroundImage: "url(" + f.thumbs[i].src + ")" })) } }), l(j), l(n), l(r), l(s), g.on("mouseenter mousemove", function () { g.hasClass("tp-mouseover") || (g.addClass("tp-mouseover"), punchgs.TweenLite.killDelayedCallsTo(p), t && j.hide_onleave && p(g.find(".tparrows"), j, "show"), v && n.hide_onleave && p(g.find(".tp-bullets"), n, "show"), x && r.hide_onleave && p(g.find(".tp-thumbs"), r, "show"), y && s.hide_onleave && p(g.find(".tp-tabs"), s, "show"), c && (g.removeClass("tp-mouseover"), o(a, f))) }), g.on("mouseleave", function () { g.removeClass("tp-mouseover"), o(a, f) }), t && j.hide_onleave && p(g.find(".tparrows"), j, "hide", 0), v && n.hide_onleave && p(g.find(".tp-bullets"), n, "hide", 0), x && r.hide_onleave && p(g.find(".tp-thumbs"), r, "hide", 0), y && s.hide_onleave && p(g.find(".tp-tabs"), s, "hide", 0), x && k(g.find(".tp-thumbs"), f), y && k(g.find(".tp-tabs"), f), "carousel" === f.sliderType && k(a, f, !0), ("on" === f.navigation.touch.touchOnDesktop || "on" == f.navigation.touch.touchenabled && c) && k(a, f, "swipebased") } }); var e = function (a, b) { var d = (a.hasClass("tp-thumbs"), a.hasClass("tp-thumbs") ? ".tp-thumb-mask" : ".tp-tab-mask"), e = a.hasClass("tp-thumbs") ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper", f = a.hasClass("tp-thumbs") ? ".tp-thumb" : ".tp-tab", g = a.find(d), h = g.find(e), i = b.direction, j = "vertical" === i ? g.find(f).first().outerHeight(!0) + b.space : g.find(f).first().outerWidth(!0) + b.space, k = "vertical" === i ? g.height() : g.width(), l = parseInt(g.find(f + ".selected").data("liindex"), 0), m = k / j, n = "vertical" === i ? g.height() : g.width(), o = 0 - l * j, p = "vertical" === i ? h.height() : h.width(), q = o < 0 - (p - n) ? 0 - (p - n) : q > 0 ? 0 : o, r = h.data("offset"); m > 2 && (q = o - (r + j) <= 0 ? o - (r + j) < 0 - j ? r : q + j : q, q = o - j + r + k < j && o + (Math.round(m) - 2) * j < r ? o + (Math.round(m) - 2) * j : q), q = q < 0 - (p - n) ? 0 - (p - n) : q > 0 ? 0 : q, "vertical" !== i && g.width() >= h.width() && (q = 0), "vertical" === i && g.height() >= h.height() && (q = 0), a.hasClass("dragged") || ("vertical" === i ? h.data("tmmove", punchgs.TweenLite.to(h, .5, { top: q + "px", ease: punchgs.Power3.easeInOut })) : h.data("tmmove", punchgs.TweenLite.to(h, .5, { left: q + "px", ease: punchgs.Power3.easeInOut })), h.data("offset", q)) }, f = function (a, b, c, d, e, f) { var g = c.parent().find(".tp-" + f + "s"), h = g.find(".tp-" + f + "s-inner-wrapper"), i = g.find(".tp-" + f + "-mask"), j = d.width * a < d.min_width ? d.min_width : Math.round(d.width * a), k = Math.round(j / d.width * d.height), l = "vertical" === d.direction ? j : j * e + d.space * (e - 1), m = "vertical" === d.direction ? k * e + d.space * (e - 1) : k, n = "vertical" === d.direction ? { width: j + "px" } : { height: k + "px" }; b.add(punchgs.TweenLite.set(g, n)), b.add(punchgs.TweenLite.set(h, { width: l + "px", height: m + "px" })), b.add(punchgs.TweenLite.set(i, { width: l + "px", height: m + "px" })); var o = h.find(".tp-" + f); return o && jQuery.each(o, function (a, c) { "vertical" === d.direction ? b.add(punchgs.TweenLite.set(c, { top: a * (k + parseInt(void 0 === d.space ? 0 : d.space, 0)), width: j + "px", height: k + "px" })) : "horizontal" === d.direction && b.add(punchgs.TweenLite.set(c, { left: a * (j + parseInt(void 0 === d.space ? 0 : d.space, 0)), width: j + "px", height: k + "px" })) }), b }, g = function (a) { var b = 0, c = 0, d = 0, e = 0, f = 1, g = 1, h = 1; return "detail" in a && (c = a.detail), "wheelDelta" in a && (c = -a.wheelDelta / 120), "wheelDeltaY" in a && (c = -a.wheelDeltaY / 120), "wheelDeltaX" in a && (b = -a.wheelDeltaX / 120), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (b = c, c = 0), d = b * f, e = c * f, "deltaY" in a && (e = a.deltaY), "deltaX" in a && (d = a.deltaX), (d || e) && a.deltaMode && (1 == a.deltaMode ? (d *= g, e *= g) : (d *= h, e *= h)), d && !b && (b = d < 1 ? -1 : 1), e && !c && (c = e < 1 ? -1 : 1), e = navigator.userAgent.match(/mozilla/i) ? 10 * e : e, (e > 300 || e < -300) && (e /= 10), { spinX: b, spinY: c, pixelX: d, pixelY: e } }, h = function (a, c) { "on" === c.navigation.keyboardNavigation && jQuery(document).keydown(function (d) { ("horizontal" == c.navigation.keyboard_direction && 39 == d.keyCode || "vertical" == c.navigation.keyboard_direction && 40 == d.keyCode) && (c.sc_indicator = "arrow", c.sc_indicator_dir = 0, b.callingNewSlide(a, 1)), ("horizontal" == c.navigation.keyboard_direction && 37 == d.keyCode || "vertical" == c.navigation.keyboard_direction && 38 == d.keyCode) && (c.sc_indicator = "arrow", c.sc_indicator_dir = 1, b.callingNewSlide(a, -1)) }) }, i = function (a, c) { if ("on" === c.navigation.mouseScrollNavigation || "carousel" === c.navigation.mouseScrollNavigation) { c.isIEEleven = !!navigator.userAgent.match(/Trident.*rv\:11\./), c.isSafari = !!navigator.userAgent.match(/safari/i), c.ischrome = !!navigator.userAgent.match(/chrome/i); var d = c.ischrome ? -49 : c.isIEEleven || c.isSafari ? -9 : navigator.userAgent.match(/mozilla/i) ? -29 : -49, e = c.ischrome ? 49 : c.isIEEleven || c.isSafari ? 9 : navigator.userAgent.match(/mozilla/i) ? 29 : 49; a.on("mousewheel DOMMouseScroll", function (f) { var h = g(f.originalEvent), i = a.find(".tp-revslider-slidesli.active-revslide").index(), j = a.find(".tp-revslider-slidesli.processing-revslide").index(), k = -1 != i && 0 == i || -1 != j && 0 == j, l = -1 != i && i == c.slideamount - 1 || 1 != j && j == c.slideamount - 1, m = !0; "carousel" == c.navigation.mouseScrollNavigation && (k = l = !1), -1 == j ? h.pixelY < d ? (k || (c.sc_indicator = "arrow", "reverse" !== c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 1, b.callingNewSlide(a, -1)), m = !1), l || (c.sc_indicator = "arrow", "reverse" === c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 0, b.callingNewSlide(a, 1)), m = !1)) : h.pixelY > e && (l || (c.sc_indicator = "arrow", "reverse" !== c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 0, b.callingNewSlide(a, 1)), m = !1), k || (c.sc_indicator = "arrow", "reverse" === c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 1, b.callingNewSlide(a, -1)), m = !1)) : m = !1; var n = c.c.offset().top - jQuery("body").scrollTop(), o = n + c.c.height(); return "carousel" != c.navigation.mouseScrollNavigation ? ("reverse" !== c.navigation.mouseScrollReverse && (n > 0 && h.pixelY > 0 || o < jQuery(window).height() && h.pixelY < 0) && (m = !0), "reverse" === c.navigation.mouseScrollReverse && (n < 0 && h.pixelY < 0 || o > jQuery(window).height() && h.pixelY > 0) && (m = !0)) : m = !1, 0 == m ? (f.preventDefault(f), !1) : void 0 }) } }, j = function (a, b, d) { return a = c ? jQuery(d.target).closest("." + a).length || jQuery(d.srcElement).closest("." + a).length : jQuery(d.toElement).closest("." + a).length || jQuery(d.originalTarget).closest("." + a).length, !0 === a || 1 === a ? 1 : 0 }, k = function (a, d, e) { var f = d.carousel; jQuery(".bullet, .bullets, .tp-bullets, .tparrows").addClass("noSwipe"), f.Limit = "endless"; var h = (c || b.get_browser(), a), i = "vertical" === d.navigation.thumbnails.direction || "vertical" === d.navigation.tabs.direction ? "none" : "vertical", k = d.navigation.touch.swipe_direction || "horizontal"; i = "swipebased" == e && "vertical" == k ? "none" : e ? "vertical" : i, jQuery.fn.swipetp || (jQuery.fn.swipetp = jQuery.fn.swipe), jQuery.fn.swipetp.defaults && jQuery.fn.swipetp.defaults.excludedElements || jQuery.fn.swipetp.defaults || (jQuery.fn.swipetp.defaults = new Object), jQuery.fn.swipetp.defaults.excludedElements = "label, button, input, select, textarea, .noSwipe", h.swipetp({ allowPageScroll: i, triggerOnTouchLeave: !0, treshold: d.navigation.touch.swipe_treshold, fingers: d.navigation.touch.swipe_min_touches, excludeElements: jQuery.fn.swipetp.defaults.excludedElements, swipeStatus: function (e, g, h, i, l, m, n) { var o = j("rev_slider_wrapper", a, e), p = j("tp-thumbs", a, e), q = j("tp-tabs", a, e), r = jQuery(this).attr("class"), s = !!r.match(/tp-tabs|tp-thumb/gi); if ("carousel" === d.sliderType && (("move" === g || "end" === g || "cancel" == g) && d.dragStartedOverSlider && !d.dragStartedOverThumbs && !d.dragStartedOverTabs || "start" === g && o > 0 && 0 === p && 0 === q)) { if (c && ("up" === h || "down" === h)) return; switch (d.dragStartedOverSlider = !0, i = h && h.match(/left|up/g) ? Math.round(-1 * i) : i = Math.round(1 * i), g) { case "start": void 0 !== f.positionanim && (f.positionanim.kill(), f.slide_globaloffset = "off" === f.infinity ? f.slide_offset : b.simp(f.slide_offset, f.maxwidth)), f.overpull = "none", f.wrap.addClass("dragged"); break; case "move": if (d.c.find(".tp-withaction").addClass("tp-temporarydisabled"), f.slide_offset = "off" === f.infinity ? f.slide_globaloffset + i : b.simp(f.slide_globaloffset + i, f.maxwidth), "off" === f.infinity) { var t = "center" === f.horizontal_align ? (f.wrapwidth / 2 - f.slide_width / 2 - f.slide_offset) / f.slide_width : (0 - f.slide_offset) / f.slide_width; "none" !== f.overpull && 0 !== f.overpull || !(t < 0 || t > d.slideamount - 1) ? t >= 0 && t <= d.slideamount - 1 && (t >= 0 && i > f.overpull || t <= d.slideamount - 1 && i < f.overpull) && (f.overpull = 0) : f.overpull = i, f.slide_offset = t < 0 ? f.slide_offset + (f.overpull - i) / 1.1 + Math.sqrt(Math.abs((f.overpull - i) / 1.1)) : t > d.slideamount - 1 ? f.slide_offset + (f.overpull - i) / 1.1 - Math.sqrt(Math.abs((f.overpull - i) / 1.1)) : f.slide_offset } b.organiseCarousel(d, h, !0, !0); break; case "end": case "cancel": f.slide_globaloffset = f.slide_offset, f.wrap.removeClass("dragged"), b.carouselToEvalPosition(d, h), d.dragStartedOverSlider = !1, d.dragStartedOverThumbs = !1, d.dragStartedOverTabs = !1, setTimeout(function () { d.c.find(".tp-withaction").removeClass("tp-temporarydisabled") }, 19) } } else { if (("move" !== g && "end" !== g && "cancel" != g || d.dragStartedOverSlider || !d.dragStartedOverThumbs && !d.dragStartedOverTabs) && !("start" === g && o > 0 && (p > 0 || q > 0))) { if ("end" == g && !s) { if (d.sc_indicator = "arrow", "horizontal" == k && "left" == h || "vertical" == k && "up" == h) return d.sc_indicator_dir = 0, b.callingNewSlide(d.c, 1), !1; if ("horizontal" == k && "right" == h || "vertical" == k && "down" == h) return d.sc_indicator_dir = 1, b.callingNewSlide(d.c, -1), !1 } return d.dragStartedOverSlider = !1, d.dragStartedOverThumbs = !1, d.dragStartedOverTabs = !1, !0 } p > 0 && (d.dragStartedOverThumbs = !0), q > 0 && (d.dragStartedOverTabs = !0); var u = d.dragStartedOverThumbs ? ".tp-thumbs" : ".tp-tabs", v = d.dragStartedOverThumbs ? ".tp-thumb-mask" : ".tp-tab-mask", w = d.dragStartedOverThumbs ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper", x = d.dragStartedOverThumbs ? ".tp-thumb" : ".tp-tab", y = d.dragStartedOverThumbs ? d.navigation.thumbnails : d.navigation.tabs; i = h && h.match(/left|up/g) ? Math.round(-1 * i) : i = Math.round(1 * i); var z = a.parent().find(v), A = z.find(w), B = y.direction, C = "vertical" === B ? A.height() : A.width(), D = "vertical" === B ? z.height() : z.width(), E = "vertical" === B ? z.find(x).first().outerHeight(!0) + y.space : z.find(x).first().outerWidth(!0) + y.space, F = void 0 === A.data("offset") ? 0 : parseInt(A.data("offset"), 0), G = 0; switch (g) { case "start": a.parent().find(u).addClass("dragged"), F = "vertical" === B ? A.position().top : A.position().left, A.data("offset", F), A.data("tmmove") && A.data("tmmove").pause(); break; case "move": if (C <= D) return !1; G = F + i, G = G > 0 ? "horizontal" === B ? G - A.width() * (G / A.width() * G / A.width()) : G - A.height() * (G / A.height() * G / A.height()) : G; var H = "vertical" === B ? 0 - (A.height() - z.height()) : 0 - (A.width() - z.width()); G = G < H ? "horizontal" === B ? G + A.width() * (G - H) / A.width() * (G - H) / A.width() : G + A.height() * (G - H) / A.height() * (G - H) / A.height() : G, "vertical" === B ? punchgs.TweenLite.set(A, { top: G + "px" }) : punchgs.TweenLite.set(A, { left: G + "px" }); break; case "end": case "cancel": if (s) return G = F + i, G = "vertical" === B ? G < 0 - (A.height() - z.height()) ? 0 - (A.height() - z.height()) : G : G < 0 - (A.width() - z.width()) ? 0 - (A.width() - z.width()) : G, G = G > 0 ? 0 : G, G = Math.abs(i) > E / 10 ? i <= 0 ? Math.floor(G / E) * E : Math.ceil(G / E) * E : i < 0 ? Math.ceil(G / E) * E : Math.floor(G / E) * E, G = "vertical" === B ? G < 0 - (A.height() - z.height()) ? 0 - (A.height() - z.height()) : G : G < 0 - (A.width() - z.width()) ? 0 - (A.width() - z.width()) : G, G = G > 0 ? 0 : G, "vertical" === B ? punchgs.TweenLite.to(A, .5, { top: G + "px", ease: punchgs.Power3.easeOut }) : punchgs.TweenLite.to(A, .5, { left: G + "px", ease: punchgs.Power3.easeOut }), G = G || ("vertical" === B ? A.position().top : A.position().left), A.data("offset", G), A.data("distance", i), setTimeout(function () { d.dragStartedOverSlider = !1, d.dragStartedOverThumbs = !1, d.dragStartedOverTabs = !1 }, 100), a.parent().find(u).removeClass("dragged"), !1 } } } }) }, l = function (a) { a.hide_delay = jQuery.isNumeric(parseInt(a.hide_delay, 0)) ? a.hide_delay / 1e3 : .2, a.hide_delay_mobile = jQuery.isNumeric(parseInt(a.hide_delay_mobile, 0)) ? a.hide_delay_mobile / 1e3 : .2 }, m = function (a) { return a && a.enable }, n = function (a) { return a && a.enable && !0 === a.hide_onleave && (void 0 === a.position || !a.position.match(/outer/g)) }, o = function (a, b) { var d = a.parent(); n(b.navigation.arrows) && punchgs.TweenLite.delayedCall(c ? b.navigation.arrows.hide_delay_mobile : b.navigation.arrows.hide_delay, p, [d.find(".tparrows"), b.navigation.arrows, "hide"]), n(b.navigation.bullets) && punchgs.TweenLite.delayedCall(c ? b.navigation.bullets.hide_delay_mobile : b.navigation.bullets.hide_delay, p, [d.find(".tp-bullets"), b.navigation.bullets, "hide"]), n(b.navigation.thumbnails) && punchgs.TweenLite.delayedCall(c ? b.navigation.thumbnails.hide_delay_mobile : b.navigation.thumbnails.hide_delay, p, [d.find(".tp-thumbs"), b.navigation.thumbnails, "hide"]), n(b.navigation.tabs) && punchgs.TweenLite.delayedCall(c ? b.navigation.tabs.hide_delay_mobile : b.navigation.tabs.hide_delay, p, [d.find(".tp-tabs"), b.navigation.tabs, "hide"]) }, p = function (a, b, c, d) { switch (d = void 0 === d ? .5 : d, c) { case "show": punchgs.TweenLite.to(a, d, { autoAlpha: 1, ease: punchgs.Power3.easeInOut, overwrite: "auto" }); break; case "hide": punchgs.TweenLite.to(a, d, { autoAlpha: 0, ease: punchgs.Power3.easeInOu, overwrite: "auto" }) } }, q = function (a, b, c) { b.style = void 0 === b.style ? "" : b.style, b.left.style = void 0 === b.left.style ? "" : b.left.style, b.right.style = void 0 === b.right.style ? "" : b.right.style, 0 === a.find(".tp-leftarrow.tparrows").length && a.append('<div class="tp-leftarrow tparrows ' + b.style + " " + b.left.style + '">' + b.tmp + "</div>"), 0 === a.find(".tp-rightarrow.tparrows").length && a.append('<div class="tp-rightarrow tparrows ' + b.style + " " + b.right.style + '">' + b.tmp + "</div>"); var d = a.find(".tp-leftarrow.tparrows"), e = a.find(".tp-rightarrow.tparrows"); b.rtl ? (d.click(function () { c.sc_indicator = "arrow", c.sc_indicator_dir = 0, a.revnext() }), e.click(function () { c.sc_indicator = "arrow", c.sc_indicator_dir = 1, a.revprev() })) : (e.click(function () { c.sc_indicator = "arrow", c.sc_indicator_dir = 0, a.revnext() }), d.click(function () { c.sc_indicator = "arrow", c.sc_indicator_dir = 1, a.revprev() })), b.right.j = a.find(".tp-rightarrow.tparrows"), b.left.j = a.find(".tp-leftarrow.tparrows"), b.padding_top = parseInt(c.carousel.padding_top || 0, 0), b.padding_bottom = parseInt(c.carousel.padding_bottom || 0, 0), t(d, b.left, c), t(e, b.right, c), b.left.opt = c, b.right.opt = c, "outer-left" != b.position && "outer-right" != b.position || (c.outernav = !0) }, r = function (a, b, c) { var d = a.outerHeight(!0), f = (a.outerWidth(!0), void 0 == b.opt ? 0 : 0 == c.conh ? c.height : c.conh), g = "layergrid" == b.container ? "fullscreen" == c.sliderLayout ? c.height / 2 - c.gridheight[c.curWinRange] * c.bh / 2 : "on" == c.autoHeight || void 0 != c.minHeight && c.minHeight > 0 ? f / 2 - c.gridheight[c.curWinRange] * c.bh / 2 : 0 : 0, h = "top" === b.v_align ? { top: "0px", y: Math.round(b.v_offset + g) + "px" } : "center" === b.v_align ? { top: "50%", y: Math.round(0 - d / 2 + b.v_offset) + "px" } : { top: "100%", y: Math.round(0 - (d + b.v_offset + g)) + "px" }; a.hasClass("outer-bottom") || punchgs.TweenLite.set(a, h) }, s = function (a, b, c) { var e = (a.outerHeight(!0), a.outerWidth(!0)), f = "layergrid" == b.container ? "carousel" === c.sliderType ? 0 : c.width / 2 - c.gridwidth[c.curWinRange] * c.bw / 2 : 0, g = "left" === b.h_align ? { left: "0px", x: Math.round(b.h_offset + f) + "px" } : "center" === b.h_align ? { left: "50%", x: Math.round(0 - e / 2 + b.h_offset) + "px" } : { left: "100%", x: Math.round(0 - (e + b.h_offset + f)) + "px" }; punchgs.TweenLite.set(a, g) }, t = function (a, b, c) { var d = a.closest(".tp-simpleresponsive").length > 0 ? a.closest(".tp-simpleresponsive") : a.closest(".tp-revslider-mainul").length > 0 ? a.closest(".tp-revslider-mainul") : a.closest(".rev_slider_wrapper").length > 0 ? a.closest(".rev_slider_wrapper") : a.parent().find(".tp-revslider-mainul"), e = d.width(), f = d.height(); if (r(a, b, c), s(a, b, c), "outer-left" !== b.position || "fullwidth" != b.sliderLayout && "fullscreen" != b.sliderLayout ? "outer-right" !== b.position || "fullwidth" != b.sliderLayout && "fullscreen" != b.sliderLayout || punchgs.TweenLite.set(a, { right: 0 - a.outerWidth() + "px", x: b.h_offset + "px" }) : punchgs.TweenLite.set(a, { left: 0 - a.outerWidth() + "px", x: b.h_offset + "px" }), a.hasClass("tp-thumbs") || a.hasClass("tp-tabs")) { var g = a.data("wr_padding"), h = a.data("maxw"), i = a.data("maxh"), j = a.hasClass("tp-thumbs") ? a.find(".tp-thumb-mask") : a.find(".tp-tab-mask"), k = parseInt(b.padding_top || 0, 0), l = parseInt(b.padding_bottom || 0, 0); h > e && "outer-left" !== b.position && "outer-right" !== b.position ? (punchgs.TweenLite.set(a, { left: "0px", x: 0, maxWidth: e - 2 * g + "px" }), punchgs.TweenLite.set(j, { maxWidth: e - 2 * g + "px" })) : (punchgs.TweenLite.set(a, { maxWidth: h + "px" }), punchgs.TweenLite.set(j, { maxWidth: h + "px" })), i + 2 * g > f && "outer-bottom" !== b.position && "outer-top" !== b.position ? (punchgs.TweenLite.set(a, { top: "0px", y: 0, maxHeight: k + l + (f - 2 * g) + "px" }), punchgs.TweenLite.set(j, { maxHeight: k + l + (f - 2 * g) + "px" })) : (punchgs.TweenLite.set(a, { maxHeight: i + "px" }), punchgs.TweenLite.set(j, { maxHeight: i + "px" })), "outer-left" !== b.position && "outer-right" !== b.position && (k = 0, l = 0), !0 === b.span && "vertical" === b.direction ? (punchgs.TweenLite.set(a, { maxHeight: k + l + (f - 2 * g) + "px", height: k + l + (f - 2 * g) + "px", top: 0 - k, y: 0 }), r(j, b, c)) : !0 === b.span && "horizontal" === b.direction && (punchgs.TweenLite.set(a, { maxWidth: "100%", width: e - 2 * g + "px", left: 0, x: 0 }), s(j, b, c)) } }, u = function (a, b, c, d) { 0 === a.find(".tp-bullets").length && (b.style = void 0 === b.style ? "" : b.style, a.append('<div class="tp-bullets ' + b.style + " " + b.direction + '"></div>')); var e = a.find(".tp-bullets"), f = c.data("index"), g = b.tmp; jQuery.each(d.thumbs[c.index()].params, function (a, b) { g = g.replace(b.from, b.to) }), e.append('<div class="justaddedbullet tp-bullet">' + g + "</div>"); var h = a.find(".justaddedbullet"), i = a.find(".tp-bullet").length, j = h.outerWidth() + parseInt(void 0 === b.space ? 0 : b.space, 0), k = h.outerHeight() + parseInt(void 0 === b.space ? 0 : b.space, 0); "vertical" === b.direction ? (h.css({ top: (i - 1) * k + "px", left: "0px" }), e.css({ height: (i - 1) * k + h.outerHeight(), width: h.outerWidth() })) : (h.css({ left: (i - 1) * j + "px", top: "0px" }), e.css({ width: (i - 1) * j + h.outerWidth(), height: h.outerHeight() })), h.find(".tp-bullet-image").css({ backgroundImage: "url(" + d.thumbs[c.index()].src + ")" }), h.data("liref", f), h.click(function () { d.sc_indicator = "bullet", a.revcallslidewithid(f), a.find(".tp-bullet").removeClass("selected"), jQuery(this).addClass("selected") }), h.removeClass("justaddedbullet"), b.padding_top = parseInt(d.carousel.padding_top || 0, 0), b.padding_bottom = parseInt(d.carousel.padding_bottom || 0, 0), b.opt = d, "outer-left" != b.position && "outer-right" != b.position || (d.outernav = !0), e.addClass("nav-pos-hor-" + b.h_align), e.addClass("nav-pos-ver-" + b.v_align), e.addClass("nav-dir-" + b.direction), t(e, b, d) }, w = function (a, b, c, d, e) { var f = "tp-thumb" === d ? ".tp-thumbs" : ".tp-tabs", g = "tp-thumb" === d ? ".tp-thumb-mask" : ".tp-tab-mask", h = "tp-thumb" === d ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper", i = "tp-thumb" === d ? ".tp-thumb" : ".tp-tab", j = "tp-thumb" === d ? ".tp-thumb-image" : ".tp-tab-image"; if (b.visibleAmount = b.visibleAmount > e.slideamount ? e.slideamount : b.visibleAmount, b.sliderLayout = e.sliderLayout, 0 === a.parent().find(f).length) { b.style = void 0 === b.style ? "" : b.style; var k = !0 === b.span ? "tp-span-wrapper" : "", l = '<div class="' + d + "s " + k + " " + b.position + " " + b.style + '"><div class="' + d + '-mask"><div class="' + d + 's-inner-wrapper" style="position:relative;"></div></div></div>'; "outer-top" === b.position ? a.parent().prepend(l) : "outer-bottom" === b.position ? a.after(l) : a.append(l), b.padding_top = parseInt(e.carousel.padding_top || 0, 0), b.padding_bottom = parseInt(e.carousel.padding_bottom || 0, 0), "outer-left" != b.position && "outer-right" != b.position || (e.outernav = !0) } var m = c.data("index"), n = a.parent().find(f), o = n.find(g), p = o.find(h), q = "horizontal" === b.direction ? b.width * b.visibleAmount + b.space * (b.visibleAmount - 1) : b.width, r = "horizontal" === b.direction ? b.height : b.height * b.visibleAmount + b.space * (b.visibleAmount - 1), s = b.tmp; jQuery.each(e.thumbs[c.index()].params, function (a, b) { s = s.replace(b.from, b.to) }), p.append('<div data-liindex="' + c.index() + '" data-liref="' + m + '" class="justaddedthumb ' + d + '" style="width:' + b.width + "px;height:" + b.height + 'px;">' + s + "</div>"); var u = n.find(".justaddedthumb"), v = n.find(i).length, w = u.outerWidth() + parseInt(void 0 === b.space ? 0 : b.space, 0), x = u.outerHeight() + parseInt(void 0 === b.space ? 0 : b.space, 0); u.find(j).css({ backgroundImage: "url(" + e.thumbs[c.index()].src + ")" }), "vertical" === b.direction ? (u.css({ top: (v - 1) * x + "px", left: "0px" }), p.css({ height: (v - 1) * x + u.outerHeight(), width: u.outerWidth() })) : (u.css({ left: (v - 1) * w + "px", top: "0px" }), p.css({ width: (v - 1) * w + u.outerWidth(), height: u.outerHeight() })), n.data("maxw", q), n.data("maxh", r), n.data("wr_padding", b.wrapper_padding); var y = "outer-top" === b.position || "outer-bottom" === b.position ? "relative" : "absolute"; "outer-top" !== b.position && "outer-bottom" !== b.position || b.h_align; o.css({ maxWidth: q + "px", maxHeight: r + "px", overflow: "hidden", position: "relative" }), n.css({ maxWidth: q + "px", maxHeight: r + "px", overflow: "visible", position: y, background: b.wrapper_color, padding: b.wrapper_padding + "px", boxSizing: "contet-box" }), u.click(function () { e.sc_indicator = "bullet"; var b = a.parent().find(h).data("distance"); b = void 0 === b ? 0 : b, Math.abs(b) < 10 && (a.revcallslidewithid(m), a.parent().find(f).removeClass("selected"), jQuery(this).addClass("selected")) }), u.removeClass("justaddedthumb"), b.opt = e, n.addClass("nav-pos-hor-" + b.h_align), n.addClass("nav-pos-ver-" + b.v_align), n.addClass("nav-dir-" + b.direction), t(n, b, e) }, x = function (a) { var b = a.c.parent().find(".outer-top"), c = a.c.parent().find(".outer-bottom"); a.top_outer = b.hasClass("tp-forcenotvisible") ? 0 : b.outerHeight() || 0, a.bottom_outer = c.hasClass("tp-forcenotvisible") ? 0 : c.outerHeight() || 0 }, y = function (a, b, c, d) { b > c || c > d ? a.addClass("tp-forcenotvisible") : a.removeClass("tp-forcenotvisible") } }(jQuery);
/********************************************
 * REVOLUTION 5.4.6.5 EXTENSION - PARALLAX
 * @version: 2.2.3 (17.05.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function (a) { "use strict"; function e(a, b) { a.lastscrolltop = b } var b = jQuery.fn.revolution, c = b.is_mobile(), d = { alias: "Parallax Min JS", name: "revolution.extensions.parallax.min.js", min_core: "5.4.5", version: "2.2.3" }; jQuery.extend(!0, b, { checkForParallax: function (a, e) { function g(a) { if ("3D" == f.type || "3d" == f.type) { a.find(".slotholder").wrapAll('<div class="dddwrapper" style="width:100%;height:100%;position:absolute;top:0px;left:0px;overflow:hidden"></div>'), a.find(".tp-parallax-wrap").wrapAll('<div class="dddwrapper-layer" style="width:100%;height:100%;position:absolute;top:0px;left:0px;z-index:5;overflow:' + f.ddd_layer_overflow + ';"></div>'), a.find(".rs-parallaxlevel-tobggroup").closest(".tp-parallax-wrap").wrapAll('<div class="dddwrapper-layertobggroup" style="position:absolute;top:0px;left:0px;z-index:50;width:100%;height:100%"></div>'); var b = a.find(".dddwrapper"), c = a.find(".dddwrapper-layer"); a.find(".dddwrapper-layertobggroup").appendTo(b), "carousel" == e.sliderType && ("on" == f.ddd_shadow && b.addClass("dddwrappershadow"), punchgs.TweenLite.set(b, { borderRadius: e.carousel.border_radius })), punchgs.TweenLite.set(a, { overflow: "visible", transformStyle: "preserve-3d", perspective: 1600 }), punchgs.TweenLite.set(b, { force3D: "auto", transformOrigin: "50% 50%" }), punchgs.TweenLite.set(c, { force3D: "auto", transformOrigin: "50% 50%", zIndex: 5 }), punchgs.TweenLite.set(e.ul, { transformStyle: "preserve-3d", transformPerspective: 1600 }) } } if ("stop" === b.compare_version(d).check) return !1; var f = e.parallax; if (!f.done) { if (f.done = !0, c && "on" == f.disable_onmobile) return !1; "3D" != f.type && "3d" != f.type || (punchgs.TweenLite.set(e.c, { overflow: f.ddd_overflow }), punchgs.TweenLite.set(e.ul, { overflow: f.ddd_overflow }), "carousel" != e.sliderType && "on" == f.ddd_shadow && (e.c.prepend('<div class="dddwrappershadow"></div>'), punchgs.TweenLite.set(e.c.find(".dddwrappershadow"), { force3D: "auto", transformPerspective: 1600, transformOrigin: "50% 50%", width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 0 }))), e.li.each(function () { g(jQuery(this)) }), ("3D" == f.type || "3d" == f.type) && e.c.find(".tp-static-layers").length > 0 && (punchgs.TweenLite.set(e.c.find(".tp-static-layers"), { top: 0, left: 0, width: "100%", height: "100%" }), g(e.c.find(".tp-static-layers"))), f.pcontainers = new Array, f.pcontainer_depths = new Array, f.bgcontainers = new Array, f.bgcontainer_depths = new Array, e.c.find(".tp-revslider-slidesli .slotholder, .tp-revslider-slidesli .rs-background-video-layer").each(function () { var a = jQuery(this), b = a.data("bgparallax") || e.parallax.bgparallax; void 0 !== (b = "on" == b ? 1 : b) && "off" !== b && (f.bgcontainers.push(a), f.bgcontainer_depths.push(e.parallax.levels[parseInt(b, 0) - 1] / 100)) }); for (var h = 1; h <= f.levels.length; h++)e.c.find(".rs-parallaxlevel-" + h).each(function () { var a = jQuery(this), b = a.closest(".tp-parallax-wrap"); b.data("parallaxlevel", f.levels[h - 1]), b.addClass("tp-parallax-container"), f.pcontainers.push(b), f.pcontainer_depths.push(f.levels[h - 1]) }); "mouse" != f.type && "scroll+mouse" != f.type && "mouse+scroll" != f.type && "3D" != f.type && "3d" != f.type || (a.mouseenter(function (b) { var c = a.find(".active-revslide"), d = a.offset().top, e = a.offset().left, f = b.pageX - e, g = b.pageY - d; c.data("enterx", f), c.data("entery", g) }), a.on("mousemove.hoverdir, mouseleave.hoverdir, trigger3dpath", function (b, c) { var d = c && c.li ? c.li : a.find(".active-revslide"); if ("enterpoint" == f.origo) { var g = a.offset().top, h = a.offset().left; void 0 == d.data("enterx") && d.data("enterx", b.pageX - h), void 0 == d.data("entery") && d.data("entery", b.pageY - g); var i = d.data("enterx") || b.pageX - h, j = d.data("entery") || b.pageY - g, k = i - (b.pageX - h), l = j - (b.pageY - g), m = f.speed / 1e3 || .4 } else var g = a.offset().top, h = a.offset().left, k = e.conw / 2 - (b.pageX - h), l = e.conh / 2 - (b.pageY - g), m = f.speed / 1e3 || 3; "mouseleave" == b.type && (k = f.ddd_lasth || 0, l = f.ddd_lastv || 0, m = 1.5); for (var n = 0; n < f.pcontainers.length; n++) { var o = f.pcontainers[n], p = f.pcontainer_depths[n], q = "3D" == f.type || "3d" == f.type ? p / 200 : p / 100, r = k * q, s = l * q; "scroll+mouse" == f.type || "mouse+scroll" == f.type ? punchgs.TweenLite.to(o, m, { force3D: "auto", x: r, ease: punchgs.Power3.easeOut, overwrite: "all" }) : punchgs.TweenLite.to(o, m, { force3D: "auto", x: r, y: s, ease: punchgs.Power3.easeOut, overwrite: "all" }) } if ("3D" == f.type || "3d" == f.type) { var t = ".tp-revslider-slidesli .dddwrapper, .dddwrappershadow, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer"; "carousel" === e.sliderType && (t = ".tp-revslider-slidesli .dddwrapper, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer"), e.c.find(t).each(function () { var a = jQuery(this), c = f.levels[f.levels.length - 1] / 200, d = k * c, g = l * c, h = 0 == e.conw ? 0 : Math.round(k / e.conw * c * 100) || 0, i = 0 == e.conh ? 0 : Math.round(l / e.conh * c * 100) || 0, j = a.closest("li"), n = 0, o = !1; a.hasClass("dddwrapper-layer") && (n = f.ddd_z_correction || 65, o = !0), a.hasClass("dddwrapper-layer") && (d = 0, g = 0), j.hasClass("active-revslide") || "carousel" != e.sliderType ? "on" != f.ddd_bgfreeze || o ? punchgs.TweenLite.to(a, m, { rotationX: i, rotationY: -h, x: d, z: n, y: g, ease: punchgs.Power3.easeOut, overwrite: "all" }) : punchgs.TweenLite.to(a, .5, { force3D: "auto", rotationY: 0, rotationX: 0, z: 0, ease: punchgs.Power3.easeOut, overwrite: "all" }) : punchgs.TweenLite.to(a, .5, { force3D: "auto", rotationY: 0, x: 0, y: 0, rotationX: 0, z: 0, ease: punchgs.Power3.easeOut, overwrite: "all" }), "mouseleave" == b.type && punchgs.TweenLite.to(jQuery(this), 3.8, { z: 0, ease: punchgs.Power3.easeOut }) }) } }), c && (window.ondeviceorientation = function (b) { var c = Math.round(b.beta || 0) - 70, d = Math.round(b.gamma || 0), g = a.find(".active-revslide"); if (jQuery(window).width() > jQuery(window).height()) { var h = d; d = c, c = h } var i = a.width(), j = a.height(), k = 360 / i * d, l = 180 / j * c, m = f.speed / 1e3 || 3, n = []; if (g.find(".tp-parallax-container").each(function (a) { n.push(jQuery(this)) }), a.find(".tp-static-layers .tp-parallax-container").each(function () { n.push(jQuery(this)) }), jQuery.each(n, function () { var a = jQuery(this), b = parseInt(a.data("parallaxlevel"), 0), c = b / 100, d = k * c * 2, e = l * c * 4; punchgs.TweenLite.to(a, m, { force3D: "auto", x: d, y: e, ease: punchgs.Power3.easeOut, overwrite: "all" }) }), "3D" == f.type || "3d" == f.type) { var o = ".tp-revslider-slidesli .dddwrapper, .dddwrappershadow, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer"; "carousel" === e.sliderType && (o = ".tp-revslider-slidesli .dddwrapper, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer"), e.c.find(o).each(function () { var a = jQuery(this), c = f.levels[f.levels.length - 1] / 200, d = k * c, g = l * c * 3, h = 0 == e.conw ? 0 : Math.round(k / e.conw * c * 500) || 0, i = 0 == e.conh ? 0 : Math.round(l / e.conh * c * 700) || 0, j = a.closest("li"), n = 0, o = !1; a.hasClass("dddwrapper-layer") && (n = f.ddd_z_correction || 65, o = !0), a.hasClass("dddwrapper-layer") && (d = 0, g = 0), j.hasClass("active-revslide") || "carousel" != e.sliderType ? "on" != f.ddd_bgfreeze || o ? punchgs.TweenLite.to(a, m, { rotationX: i, rotationY: -h, x: d, z: n, y: g, ease: punchgs.Power3.easeOut, overwrite: "all" }) : punchgs.TweenLite.to(a, .5, { force3D: "auto", rotationY: 0, rotationX: 0, z: 0, ease: punchgs.Power3.easeOut, overwrite: "all" }) : punchgs.TweenLite.to(a, .5, { force3D: "auto", rotationY: 0, z: 0, x: 0, y: 0, rotationX: 0, ease: punchgs.Power3.easeOut, overwrite: "all" }), "mouseleave" == b.type && punchgs.TweenLite.to(jQuery(this), 3.8, { z: 0, ease: punchgs.Power3.easeOut }) }) } })); var i = e.scrolleffect; if (i.bgs = new Array, i.on) { if ("on" === i.on_slidebg) for (var h = 0; h < e.allslotholder.length; h++)i.bgs.push(e.allslotholder[h]); i.multiplicator_layers = parseFloat(i.multiplicator_layers), i.multiplicator = parseFloat(i.multiplicator) } void 0 !== i.layers && 0 === i.layers.length && (i.layers = !1), void 0 !== i.bgs && 0 === i.bgs.length && (i.bgs = !1), b.scrollTicker(e, a) } }, scrollTicker: function (a, d) { 1 != a.scrollTicker && (a.scrollTicker = !0, c ? (punchgs.TweenLite.ticker.fps(150), punchgs.TweenLite.ticker.addEventListener("tick", function () { b.scrollHandling(a) }, d, !1, 1)) : document.addEventListener("scroll", function (c) { b.scrollHandling(a, !0) }, { passive: !0 })), b.scrollHandling(a, !0) }, scrollHandling: function (a, d, f) { if (a.lastwindowheight = a.lastwindowheight || window.innerHeight, a.conh = 0 === a.conh || void 0 === a.conh ? a.infullscreenmode ? a.minHeight : a.c.height() : a.conh, a.lastscrolltop == window.scrollY && !a.duringslidechange && !d) return !1; punchgs.TweenLite.delayedCall(.2, e, [a, window.scrollY]); var g = a.c[0].getBoundingClientRect(), h = a.viewPort, i = a.parallax, j = g.top < 0 || g.height > a.lastwindowheight ? g.top / g.height : g.bottom > a.lastwindowheight ? (g.bottom - a.lastwindowheight) / g.height : 0; if (a.scrollproc = j, b.callBackHandling && b.callBackHandling(a, "parallax", "start"), h.enable) { var k = 1 - Math.abs(j); k = k < 0 ? 0 : k, jQuery.isNumeric(h.visible_area) || -1 !== h.visible_area.indexOf("%") && (h.visible_area = parseInt(h.visible_area) / 100), 1 - h.visible_area <= k ? a.inviewport || (a.inviewport = !0, b.enterInViewPort(a)) : a.inviewport && (a.inviewport = !1, b.leaveViewPort(a)) } if (c && "on" == i.disable_onmobile) return !1; if ("3d" != i.type && "3D" != i.type) { if (("scroll" == i.type || "scroll+mouse" == i.type || "mouse+scroll" == i.type) && i.pcontainers) for (var l = 0; l < i.pcontainers.length; l++)if (i.pcontainers[l].length > 0) { var m = i.pcontainers[l], n = i.pcontainer_depths[l] / 100, o = Math.round(j * (-n * a.conh) * 10) / 10 || 0, p = void 0 !== f ? f : i.speedls / 1e3 || 0; m.data("parallaxoffset", o), punchgs.TweenLite.to(m, p, { overwrite: "auto", force3D: "auto", y: o }) } if (i.bgcontainers) for (var l = 0; l < i.bgcontainers.length; l++) { var q = i.bgcontainers[l], r = i.bgcontainer_depths[l], o = j * (-r * a.conh) || 0, p = void 0 !== f ? f : i.speedbg / 1e3 || 0; punchgs.TweenLite.to(q, p, { position: "absolute", top: "0px", left: "0px", backfaceVisibility: "hidden", force3D: "true", y: o + "px" }) } } var s = a.scrolleffect; if (s.on && ("on" !== s.disable_on_mobile || !c)) { var t = Math.abs(j) - s.tilt / 100; if (t = t < 0 ? 0 : t, !1 !== s.layers) { var u = 1 - t * s.multiplicator_layers, v = { backfaceVisibility: "hidden", force3D: "true", z: .001, perspective: 600 }; if ("top" == s.direction && j >= 0 && (u = 1), "bottom" == s.direction && j <= 0 && (u = 1), u = u > 1 ? 1 : u < 0 ? 0 : u, "on" === s.fade && (v.opacity = u), "on" === s.scale) { var w = u; v.scale = 1 - w + 1 } if ("on" === s.blur) { var x = (1 - u) * s.maxblur; v["-webkit-filter"] = "blur(" + x + "px)", v.filter = "blur(" + x + "px)" } if ("on" === s.grayscale) { var y = 100 * (1 - u), z = "grayscale(" + y + "%)"; v["-webkit-filter"] = void 0 === v["-webkit-filter"] ? z : v["-webkit-filter"] + " " + z, v.filter = void 0 === v.filter ? z : v.filter + " " + z } punchgs.TweenLite.set(s.layers, v) } if (!1 !== s.bgs) { var u = 1 - t * s.multiplicator, v = { backfaceVisibility: "hidden", force3D: "true" }; if ("top" == s.direction && j >= 0 && (u = 1), "bottom" == s.direction && j <= 0 && (u = 1), u = u > 1 ? 1 : u < 0 ? 0 : u, "on" === s.fade && (v.opacity = u), "on" === s.scale) { var w = u; punchgs.TweenLite.set(jQuery(".tp-kbimg-wrap"), { transformOrigin: "50% 50%", scale: w, force3D: !0 }) } if ("on" === s.blur) { var x = (1 - u) * s.maxblur; v["-webkit-filter"] = "blur(" + x + "px)", v.filter = "blur(" + x + "px)" } if ("on" === s.grayscale) { var y = 100 * (1 - u), z = "grayscale(" + y + "%)"; v["-webkit-filter"] = void 0 === v["-webkit-filter"] ? z : v["-webkit-filter"] + " " + z, v.filter = void 0 === v.filter ? z : v.filter + " " + z } punchgs.TweenLite.set(s.bgs, v) } } b.callBackHandling && b.callBackHandling(a, "parallax", "end") } }) }(jQuery);
/************************************************
 * REVOLUTION 5.4.6.5 EXTENSION - SLIDE ANIMATIONS
 * @version: 1.8 (17.05.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
************************************************/
!function (t) { "use strict"; var L = jQuery.fn.revolution, l = { alias: "SlideAnimations Min JS", name: "revolution.extensions.slideanims.min.js", min_core: "5.4.5", version: "1.8" }; jQuery.extend(!0, L, { animateSlide: function (t, e, o, a, i, n, r, s) { return "stop" === L.compare_version(l).check ? s : d(t, e, o, a, i, n, r, s) } }); var ct = function (t, e, o, a) { var i = t, n = i.find(".defaultimg"), r = n.data("mediafilter"), s = i.data("zoomstart"), l = i.data("rotationstart"); null != n.data("currotate") && (l = n.data("currotate")), null != n.data("curscale") && "box" == a ? s = 100 * n.data("curscale") : null != n.data("curscale") && (s = n.data("curscale")), L.slotSize(n, e); var d = n.attr("src"), h = n.data("bgcolor"), f = e.width, c = e.height, u = n.data("fxof"); void 0 === h && (h = n.css("backgroundColor")), "on" == e.autoHeight && (c = e.c.height()), null == u && (u = 0); var p = 0, g = n.data("bgfit"), w = n.data("bgrepeat"), m = n.data("bgposition"); null == g && (g = "cover"), null == w && (w = "no-repeat"), null == m && (m = "center center"); var v = ""; switch (v = void 0 !== h && 0 <= h.indexOf("gradient") ? "background:" + h : "background-color:" + h + ";background-image:url(" + d + ");background-repeat:" + w + ";background-size:" + g + ";background-position:" + m, a) { case "box": for (var y = 0, x = 0, T = 0; T < e.slots; T++) { for (var z = x = 0; z < e.slots; z++)i.append('<div class="slot" style="position:absolute;top:' + (0 + x) + "px;left:" + (u + y) + "px;width:" + e.slotw + "px;height:" + e.sloth + 'px;overflow:hidden;"><div class="slotslide ' + r + '" data-x="' + y + '" data-y="' + x + '" style="position:absolute;top:0px;left:0px;width:' + e.slotw + "px;height:" + e.sloth + 'px;overflow:hidden;"><div style="position:absolute;top:' + (0 - x) + "px;left:" + (0 - y) + "px;width:" + f + "px;height:" + c + "px;" + v + ';"></div></div></div>'), x += e.sloth, null != s && null != l && punchgs.TweenLite.set(i.find(".slot").last(), { rotationZ: l }); y += e.slotw } break; case "vertical": case "horizontal": if ("horizontal" == a) { if (!o) p = 0 - e.slotw; for (z = 0; z < e.slots; z++)i.append('<div class="slot" style="position:absolute;top:0px;left:' + (u + z * e.slotw) + "px;overflow:hidden;width:" + (e.slotw + .3) + "px;height:" + c + 'px"><div class="slotslide ' + r + '" style="position:absolute;top:0px;left:' + p + "px;width:" + (e.slotw + .6) + "px;height:" + c + 'px;overflow:hidden;"><div style="position:absolute;top:0px;left:' + (0 - z * e.slotw) + "px;width:" + f + "px;height:" + c + "px;" + v + ';"></div></div></div>'), null != s && null != l && punchgs.TweenLite.set(i.find(".slot").last(), { rotationZ: l }) } else { if (!o) p = 0 - e.sloth; for (z = 0; z < e.slots + 2; z++)i.append('<div class="slot" style="position:absolute;top:' + (0 + z * e.sloth) + "px;left:" + u + "px;overflow:hidden;width:" + f + "px;height:" + e.sloth + 'px"><div class="slotslide ' + r + '" style="position:absolute;top:' + p + "px;left:0px;width:" + f + "px;height:" + e.sloth + 'px;overflow:hidden;"><div style="position:absolute;top:' + (0 - z * e.sloth) + "px;left:0px;width:" + f + "px;height:" + c + "px;" + v + ';"></div></div></div>'), null != s && null != l && punchgs.TweenLite.set(i.find(".slot").last(), { rotationZ: l }) } } }; var ut = function (t, e) { return null == e || jQuery.isNumeric(t) ? t : null == t ? t : t.split(",")[e] }, d = function (a, t, e, o, i, n, r, s) { var l = e[0].opt, d = i.index(), h = o.index() < d ? 1 : 0; "arrow" == l.sc_indicator && (h = l.sc_indicator_dir); var f = function (t, o, e, a) { var i = t[0].opt, n = punchgs.Power1.easeIn, r = punchgs.Power1.easeOut, s = punchgs.Power1.easeInOut, l = punchgs.Power2.easeIn, d = punchgs.Power2.easeOut, h = punchgs.Power2.easeInOut, f = (punchgs.Power3.easeIn, punchgs.Power3.easeOut), c = punchgs.Power3.easeInOut, u = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45], p = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27], g = 0, w = 1, m = 0, v = 0, y = (new Array, [["boxslide", 0, 1, 10, 0, "box", !1, null, 0, r, r, 500, 6], ["boxfade", 1, 0, 10, 0, "box", !1, null, 1, s, s, 700, 5], ["slotslide-horizontal", 2, 0, 0, 200, "horizontal", !0, !1, 2, h, h, 700, 3], ["slotslide-vertical", 3, 0, 0, 200, "vertical", !0, !1, 3, h, h, 700, 3], ["curtain-1", 4, 3, 0, 0, "horizontal", !0, !0, 4, r, r, 300, 5], ["curtain-2", 5, 3, 0, 0, "horizontal", !0, !0, 5, r, r, 300, 5], ["curtain-3", 6, 3, 25, 0, "horizontal", !0, !0, 6, r, r, 300, 5], ["slotzoom-horizontal", 7, 0, 0, 400, "horizontal", !0, !0, 7, r, r, 300, 7], ["slotzoom-vertical", 8, 0, 0, 0, "vertical", !0, !0, 8, d, d, 500, 8], ["slotfade-horizontal", 9, 0, 0, 1e3, "horizontal", !0, null, 9, d, d, 2e3, 10], ["slotfade-vertical", 10, 0, 0, 1e3, "vertical", !0, null, 10, d, d, 2e3, 10], ["fade", 11, 0, 1, 300, "horizontal", !0, null, 11, h, h, 1e3, 1], ["crossfade", 11, 1, 1, 300, "horizontal", !0, null, 11, h, h, 1e3, 1], ["fadethroughdark", 11, 2, 1, 300, "horizontal", !0, null, 11, h, h, 1e3, 1], ["fadethroughlight", 11, 3, 1, 300, "horizontal", !0, null, 11, h, h, 1e3, 1], ["fadethroughtransparent", 11, 4, 1, 300, "horizontal", !0, null, 11, h, h, 1e3, 1], ["slideleft", 12, 0, 1, 0, "horizontal", !0, !0, 12, c, c, 1e3, 1], ["slideup", 13, 0, 1, 0, "horizontal", !0, !0, 13, c, c, 1e3, 1], ["slidedown", 14, 0, 1, 0, "horizontal", !0, !0, 14, c, c, 1e3, 1], ["slideright", 15, 0, 1, 0, "horizontal", !0, !0, 15, c, c, 1e3, 1], ["slideoverleft", 12, 7, 1, 0, "horizontal", !0, !0, 12, c, c, 1e3, 1], ["slideoverup", 13, 7, 1, 0, "horizontal", !0, !0, 13, c, c, 1e3, 1], ["slideoverdown", 14, 7, 1, 0, "horizontal", !0, !0, 14, c, c, 1e3, 1], ["slideoverright", 15, 7, 1, 0, "horizontal", !0, !0, 15, c, c, 1e3, 1], ["slideremoveleft", 12, 8, 1, 0, "horizontal", !0, !0, 12, c, c, 1e3, 1], ["slideremoveup", 13, 8, 1, 0, "horizontal", !0, !0, 13, c, c, 1e3, 1], ["slideremovedown", 14, 8, 1, 0, "horizontal", !0, !0, 14, c, c, 1e3, 1], ["slideremoveright", 15, 8, 1, 0, "horizontal", !0, !0, 15, c, c, 1e3, 1], ["papercut", 16, 0, 0, 600, "", null, null, 16, c, c, 1e3, 2], ["3dcurtain-horizontal", 17, 0, 20, 100, "vertical", !1, !0, 17, s, s, 500, 7], ["3dcurtain-vertical", 18, 0, 10, 100, "horizontal", !1, !0, 18, s, s, 500, 5], ["cubic", 19, 0, 20, 600, "horizontal", !1, !0, 19, c, c, 500, 1], ["cube", 19, 0, 20, 600, "horizontal", !1, !0, 20, c, c, 500, 1], ["flyin", 20, 0, 4, 600, "vertical", !1, !0, 21, f, c, 500, 1], ["turnoff", 21, 0, 1, 500, "horizontal", !1, !0, 22, c, c, 500, 1], ["incube", 22, 0, 20, 200, "horizontal", !1, !0, 23, h, h, 500, 1], ["cubic-horizontal", 23, 0, 20, 500, "vertical", !1, !0, 24, d, d, 500, 1], ["cube-horizontal", 23, 0, 20, 500, "vertical", !1, !0, 25, d, d, 500, 1], ["incube-horizontal", 24, 0, 20, 500, "vertical", !1, !0, 26, h, h, 500, 1], ["turnoff-vertical", 25, 0, 1, 200, "horizontal", !1, !0, 27, h, h, 500, 1], ["fadefromright", 12, 1, 1, 0, "horizontal", !0, !0, 28, h, h, 1e3, 1], ["fadefromleft", 15, 1, 1, 0, "horizontal", !0, !0, 29, h, h, 1e3, 1], ["fadefromtop", 14, 1, 1, 0, "horizontal", !0, !0, 30, h, h, 1e3, 1], ["fadefrombottom", 13, 1, 1, 0, "horizontal", !0, !0, 31, h, h, 1e3, 1], ["fadetoleftfadefromright", 12, 2, 1, 0, "horizontal", !0, !0, 32, h, h, 1e3, 1], ["fadetorightfadefromleft", 15, 2, 1, 0, "horizontal", !0, !0, 33, h, h, 1e3, 1], ["fadetobottomfadefromtop", 14, 2, 1, 0, "horizontal", !0, !0, 34, h, h, 1e3, 1], ["fadetotopfadefrombottom", 13, 2, 1, 0, "horizontal", !0, !0, 35, h, h, 1e3, 1], ["parallaxtoright", 15, 3, 1, 0, "horizontal", !0, !0, 36, h, l, 1500, 1], ["parallaxtoleft", 12, 3, 1, 0, "horizontal", !0, !0, 37, h, l, 1500, 1], ["parallaxtotop", 14, 3, 1, 0, "horizontal", !0, !0, 38, h, n, 1500, 1], ["parallaxtobottom", 13, 3, 1, 0, "horizontal", !0, !0, 39, h, n, 1500, 1], ["scaledownfromright", 12, 4, 1, 0, "horizontal", !0, !0, 40, h, l, 1e3, 1], ["scaledownfromleft", 15, 4, 1, 0, "horizontal", !0, !0, 41, h, l, 1e3, 1], ["scaledownfromtop", 14, 4, 1, 0, "horizontal", !0, !0, 42, h, l, 1e3, 1], ["scaledownfrombottom", 13, 4, 1, 0, "horizontal", !0, !0, 43, h, l, 1e3, 1], ["zoomout", 13, 5, 1, 0, "horizontal", !0, !0, 44, h, l, 1e3, 1], ["zoomin", 13, 6, 1, 0, "horizontal", !0, !0, 45, h, l, 1e3, 1], ["slidingoverlayup", 27, 0, 1, 0, "horizontal", !0, !0, 47, s, r, 2e3, 1], ["slidingoverlaydown", 28, 0, 1, 0, "horizontal", !0, !0, 48, s, r, 2e3, 1], ["slidingoverlayright", 30, 0, 1, 0, "horizontal", !0, !0, 49, s, r, 2e3, 1], ["slidingoverlayleft", 29, 0, 1, 0, "horizontal", !0, !0, 50, s, r, 2e3, 1], ["parallaxcirclesup", 31, 0, 1, 0, "horizontal", !0, !0, 51, h, n, 1500, 1], ["parallaxcirclesdown", 32, 0, 1, 0, "horizontal", !0, !0, 52, h, n, 1500, 1], ["parallaxcirclesright", 33, 0, 1, 0, "horizontal", !0, !0, 53, h, n, 1500, 1], ["parallaxcirclesleft", 34, 0, 1, 0, "horizontal", !0, !0, 54, h, n, 1500, 1], ["notransition", 26, 0, 1, 0, "horizontal", !0, null, 46, h, l, 1e3, 1], ["parallaxright", 15, 3, 1, 0, "horizontal", !0, !0, 55, h, l, 1500, 1], ["parallaxleft", 12, 3, 1, 0, "horizontal", !0, !0, 56, h, l, 1500, 1], ["parallaxup", 14, 3, 1, 0, "horizontal", !0, !0, 57, h, n, 1500, 1], ["parallaxdown", 13, 3, 1, 0, "horizontal", !0, !0, 58, h, n, 1500, 1], ["grayscale", 11, 5, 1, 300, "horizontal", !0, null, 11, h, h, 1e3, 1], ["grayscalecross", 11, 6, 1, 300, "horizontal", !0, null, 11, h, h, 1e3, 1], ["brightness", 11, 7, 1, 300, "horizontal", !0, null, 11, h, h, 1e3, 1], ["brightnesscross", 11, 8, 1, 300, "horizontal", !0, null, 11, h, h, 1e3, 1], ["blurlight", 11, 9, 1, 300, "horizontal", !0, null, 11, h, h, 1e3, 1], ["blurlightcross", 11, 10, 1, 300, "horizontal", !0, null, 11, h, h, 1e3, 1], ["blurstrong", 11, 9, 1, 300, "horizontal", !0, null, 11, h, h, 1e3, 1], ["blurstrongcross", 11, 10, 1, 300, "horizontal", !0, null, 11, h, h, 1e3, 1]]); i.duringslidechange = !0, i.testanims = !1, 1 == i.testanims && (i.nexttesttransform = void 0 === i.nexttesttransform ? 34 : i.nexttesttransform + 1, i.nexttesttransform = 70 < i.nexttesttransform ? 0 : i.nexttesttransform, o = y[i.nexttesttransform][0], console.log(o + "  " + i.nexttesttransform + "  " + y[i.nexttesttransform][1] + "  " + y[i.nexttesttransform][2])), jQuery.each(["parallaxcircles", "slidingoverlay", "slide", "slideover", "slideremove", "parallax", "parralaxto"], function (t, e) { o == e + "horizontal" && (o = 1 != a ? e + "left" : e + "right"), o == e + "vertical" && (o = 1 != a ? e + "up" : e + "down") }), "random" == o && (o = Math.round(Math.random() * y.length - 1), y.length - 1 < o && (o = y.length - 1)), "random-static" == o && (o = Math.round(Math.random() * u.length - 1), u.length - 1 < o && (o = u.length - 1), o = u[o]), "random-premium" == o && (o = Math.round(Math.random() * p.length - 1), p.length - 1 < o && (o = p.length - 1), o = p[o]); if (1 == i.isJoomla && null != window.MooTools && -1 != [12, 13, 14, 15, 16, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45].indexOf(o)) { var x = Math.round(Math.random() * (p.length - 2)) + 1; p.length - 1 < x && (x = p.length - 1), 0 == x && (x = 1), o = p[x] } jQuery.each(y, function (t, e) { e[0] != o && e[8] != o || (g = e[1], w = e[2], m = v), v += 1 }), 30 < g && (g = 30), g < 0 && (g = 0); var T = new Object; return T.nexttrans = g, T.STA = y[m], T.specials = w, T }(e, t, 0, h), c = f.STA, u = f.specials; a = f.nexttrans; "on" == n.data("kenburns") && (a = 11); var p = o.data("nexttransid") || 0, g = ut(o.data("masterspeed"), p); g = (g = "default" === g ? c[11] : "random" === g ? Math.round(1e3 * Math.random() + 300) : null != g ? parseInt(g, 0) : c[11]) > l.delay ? l.delay : g, g += c[4], l.slots = ut(o.data("slotamount"), p), l.slots = null == l.slots || "default" == l.slots ? c[12] : "random" == l.slots ? Math.round(12 * Math.random() + 4) : l.slots, l.slots = l.slots < 1 ? "boxslide" == t ? Math.round(6 * Math.random() + 3) : "flyin" == t ? Math.round(4 * Math.random() + 1) : l.slots : l.slots, l.slots = (4 == a || 5 == a || 6 == a) && l.slots < 3 ? 3 : l.slots, l.slots = 0 != c[3] ? Math.min(l.slots, c[3]) : l.slots, l.slots = 9 == a ? l.width / l.slots : 10 == a ? l.height / l.slots : l.slots, l.rotate = ut(o.data("rotate"), p), l.rotate = null == l.rotate || "default" == l.rotate ? 0 : 999 == l.rotate || "random" == l.rotate ? Math.round(360 * Math.random()) : l.rotate, l.rotate = l.ie || l.ie9 ? 0 : l.rotate, 11 != a && (null != c[7] && ct(r, l, c[7], c[5]), null != c[6] && ct(n, l, c[6], c[5])), s.add(punchgs.TweenLite.set(n.find(".defaultvid"), { y: 0, x: 0, top: 0, left: 0, scale: 1 }), 0), s.add(punchgs.TweenLite.set(r.find(".defaultvid"), { y: 0, x: 0, top: 0, left: 0, scale: 1 }), 0), s.add(punchgs.TweenLite.set(n.find(".defaultvid"), { y: "+0%", x: "+0%" }), 0), s.add(punchgs.TweenLite.set(r.find(".defaultvid"), { y: "+0%", x: "+0%" }), 0), s.add(punchgs.TweenLite.set(n, { autoAlpha: 1, y: "+0%", x: "+0%" }), 0), s.add(punchgs.TweenLite.set(r, { autoAlpha: 1, y: "+0%", x: "+0%" }), 0), s.add(punchgs.TweenLite.set(n.parent(), { backgroundColor: "transparent" }), 0), s.add(punchgs.TweenLite.set(r.parent(), { backgroundColor: "transparent" }), 0); var w = ut(o.data("easein"), p), m = ut(o.data("easeout"), p); if (w = "default" === w ? c[9] || punchgs.Power2.easeInOut : w || c[9] || punchgs.Power2.easeInOut, m = "default" === m ? c[10] || punchgs.Power2.easeInOut : m || c[10] || punchgs.Power2.easeInOut, 0 == a) { var v = Math.ceil(l.height / l.sloth), y = 0; n.find(".slotslide").each(function (t) { var e = jQuery(this); (y += 1) == v && (y = 0), s.add(punchgs.TweenLite.from(e, g / 600, { opacity: 0, top: 0 - l.sloth, left: 0 - l.slotw, rotation: l.rotate, force3D: "auto", ease: w }), (15 * t + 30 * y) / 1500) }) } if (1 == a) { var x; n.find(".slotslide").each(function (t) { var e = jQuery(this), o = Math.random() * g + 300, a = 500 * Math.random() + 200; x < o + a && (x = a + a, t), s.add(punchgs.TweenLite.from(e, o / 1e3, { autoAlpha: 0, force3D: "auto", rotation: l.rotate, ease: w }), a / 1e3) }) } if (2 == a) { var T = new punchgs.TimelineLite; r.find(".slotslide").each(function () { var t = jQuery(this); T.add(punchgs.TweenLite.to(t, g / 1e3, { left: l.slotw, ease: w, force3D: "auto", rotation: 0 - l.rotate }), 0), s.add(T, 0) }), n.find(".slotslide").each(function () { var t = jQuery(this); T.add(punchgs.TweenLite.from(t, g / 1e3, { left: 0 - l.slotw, ease: w, force3D: "auto", rotation: l.rotate }), 0), s.add(T, 0) }) } if (3 == a) { T = new punchgs.TimelineLite; r.find(".slotslide").each(function () { var t = jQuery(this); T.add(punchgs.TweenLite.to(t, g / 1e3, { top: l.sloth, ease: w, rotation: l.rotate, force3D: "auto", transformPerspective: 600 }), 0), s.add(T, 0) }), n.find(".slotslide").each(function () { var t = jQuery(this); T.add(punchgs.TweenLite.from(t, g / 1e3, { top: 0 - l.sloth, rotation: l.rotate, ease: m, force3D: "auto", transformPerspective: 600 }), 0), s.add(T, 0) }) } if (4 == a || 5 == a) { setTimeout(function () { r.find(".defaultimg").css({ opacity: 0 }) }, 100); var z = g / 1e3; T = new punchgs.TimelineLite; r.find(".slotslide").each(function (t) { var e = jQuery(this), o = t * z / l.slots; 5 == a && (o = (l.slots - t - 1) * z / l.slots / 1.5), T.add(punchgs.TweenLite.to(e, 3 * z, { transformPerspective: 600, force3D: "auto", top: 0 + l.height, opacity: .5, rotation: l.rotate, ease: w, delay: o }), 0), s.add(T, 0) }), n.find(".slotslide").each(function (t) { var e = jQuery(this), o = t * z / l.slots; 5 == a && (o = (l.slots - t - 1) * z / l.slots / 1.5), T.add(punchgs.TweenLite.from(e, 3 * z, { top: 0 - l.height, opacity: .5, rotation: l.rotate, force3D: "auto", ease: punchgs.eo, delay: o }), 0), s.add(T, 0) }) } if (6 == a) { l.slots < 2 && (l.slots = 2), l.slots % 2 && (l.slots = l.slots + 1); T = new punchgs.TimelineLite; setTimeout(function () { r.find(".defaultimg").css({ opacity: 0 }) }, 100), r.find(".slotslide").each(function (t) { var e = jQuery(this); if (t + 1 < l.slots / 2) var o = 90 * (t + 2); else o = 90 * (2 + l.slots - t); T.add(punchgs.TweenLite.to(e, (g + o) / 1e3, { top: 0 + l.height, opacity: 1, force3D: "auto", rotation: l.rotate, ease: w }), 0), s.add(T, 0) }), n.find(".slotslide").each(function (t) { var e = jQuery(this); if (t + 1 < l.slots / 2) var o = 90 * (t + 2); else o = 90 * (2 + l.slots - t); T.add(punchgs.TweenLite.from(e, (g + o) / 1e3, { top: 0 - l.height, opacity: 1, force3D: "auto", rotation: l.rotate, ease: m }), 0), s.add(T, 0) }) } if (7 == a) { (g *= 2) > l.delay && (g = l.delay); T = new punchgs.TimelineLite; setTimeout(function () { r.find(".defaultimg").css({ opacity: 0 }) }, 100), r.find(".slotslide").each(function () { var t = jQuery(this).find("div"); T.add(punchgs.TweenLite.to(t, g / 1e3, { left: 0 - l.slotw / 2 + "px", top: 0 - l.height / 2 + "px", width: 2 * l.slotw + "px", height: 2 * l.height + "px", opacity: 0, rotation: l.rotate, force3D: "auto", ease: w }), 0), s.add(T, 0) }), n.find(".slotslide").each(function (t) { var e = jQuery(this).find("div"); T.add(punchgs.TweenLite.fromTo(e, g / 1e3, { left: 0, top: 0, opacity: 0, transformPerspective: 600 }, { left: 0 - t * l.slotw + "px", ease: m, force3D: "auto", top: "0px", width: l.width, height: l.height, opacity: 1, rotation: 0, delay: .1 }), 0), s.add(T, 0) }) } if (8 == a) { (g *= 3) > l.delay && (g = l.delay); T = new punchgs.TimelineLite; r.find(".slotslide").each(function () { var t = jQuery(this).find("div"); T.add(punchgs.TweenLite.to(t, g / 1e3, { left: 0 - l.width / 2 + "px", top: 0 - l.sloth / 2 + "px", width: 2 * l.width + "px", height: 2 * l.sloth + "px", force3D: "auto", ease: w, opacity: 0, rotation: l.rotate }), 0), s.add(T, 0) }), n.find(".slotslide").each(function (t) { var e = jQuery(this).find("div"); T.add(punchgs.TweenLite.fromTo(e, g / 1e3, { left: 0, top: 0, opacity: 0, force3D: "auto" }, { left: "0px", top: 0 - t * l.sloth + "px", width: n.find(".defaultimg").data("neww") + "px", height: n.find(".defaultimg").data("newh") + "px", opacity: 1, ease: m, rotation: 0 }), 0), s.add(T, 0) }) } if (9 == a || 10 == a) { n.find(".slotslide").each(function (t) { var e = jQuery(this); 0, s.add(punchgs.TweenLite.fromTo(e, g / 2e3, { autoAlpha: 0, force3D: "auto", transformPerspective: 600 }, { autoAlpha: 1, ease: w, delay: t * l.slots / 100 / 2e3 }), 0) }) } if (27 == a || 28 == a || 29 == a || 30 == a) { var L = n.find(".slot"), b = 27 == a || 29 == a ? "-100%" : "+100%", A = 27 == a || 29 == a ? "+100%" : "-100%", D = 27 == a || 29 == a ? "-80%" : "80%", j = 27 == a || 29 == a ? "+80%" : "-80%", Q = 27 == a || 29 == a ? "+10%" : "-10%", M = { overwrite: "all" }, P = { autoAlpha: 0, zIndex: 1, force3D: "auto", ease: w }, k = { position: "inherit", autoAlpha: 0, overwrite: "all", zIndex: 1 }, O = { autoAlpha: 1, force3D: "auto", ease: m }, I = { overwrite: "all", zIndex: 2, opacity: 1, autoAlpha: 1 }, X = { autoAlpha: 1, force3D: "auto", overwrite: "all", ease: w }, Y = { overwrite: "all", zIndex: 2, autoAlpha: 1 }, S = { autoAlpha: 1, force3D: "auto", ease: w }, _ = 1 == (27 == a || 28 == a ? 1 : 2) ? "y" : "x"; M[_] = "0px", P[_] = b, k[_] = Q, O[_] = "0%", I[_] = A, X[_] = b, Y[_] = D, S[_] = j, L.append('<span style="background-color:rgba(0,0,0,0.6);width:100%;height:100%;position:absolute;top:0px;left:0px;display:block;z-index:2"></span>'), s.add(punchgs.TweenLite.fromTo(r, g / 1e3, M, P), 0), s.add(punchgs.TweenLite.fromTo(n.find(".defaultimg"), g / 2e3, k, O), g / 2e3), s.add(punchgs.TweenLite.fromTo(L, g / 1e3, I, X), 0), s.add(punchgs.TweenLite.fromTo(L.find(".slotslide div"), g / 1e3, Y, S), 0) } if (31 == a || 32 == a || 33 == a || 34 == a) { g = 6e3, w = punchgs.Power3.easeInOut; var C = g / 1e3; mas = C - C / 5, _nt = a, fy = 31 == _nt ? "+100%" : 32 == _nt ? "-100%" : "0%", fx = 33 == _nt ? "+100%" : 34 == _nt ? "-100%" : "0%", ty = 31 == _nt ? "-100%" : 32 == _nt ? "+100%" : "0%", tx = 33 == _nt ? "-100%" : 34 == _nt ? "+100%" : "0%", s.add(punchgs.TweenLite.fromTo(r, C - .2 * C, { y: 0, x: 0 }, { y: ty, x: tx, ease: m }), .2 * C), s.add(punchgs.TweenLite.fromTo(n, C, { y: fy, x: fx }, { y: "0%", x: "0%", ease: w }), 0), n.find(".slot").remove(), n.find(".defaultimg").clone().appendTo(n).addClass("slot"), function (t, f, c, e, u) { var o = t.find(".slot"), p = [2, 1.2, .9, .7, .55, .42], g = t.width(), w = t.height(); o.wrap('<div class="slot-circle-wrapper" style="overflow:hidden;position:absolute;border:1px solid #fff"></div>'); for (var a = 0; a < 6; a++)o.parent().clone(!1).appendTo(nextsh); t.find(".slot-circle-wrapper").each(function (t) { if (t < 6) { var e = jQuery(this), o = e.find(".slot"), a = w < g ? p[t] * g : p[t] * w, i = a / 2 - g / 2 + 0, n = a / 2 - w / 2 + 0, r = { scale: 1, transformOrigo: "50% 50%", width: a + "px", height: a + "px", top: w / 2 - a / 2 + "px", left: (33 == c ? g / 2 - a / 2 : 34 == c ? g - a : g / 2 - a / 2) + "px", borderRadius: 0 != t ? "50%" : "0" }, s = { scale: 1, top: w / 2 - a / 2, left: g / 2 - a / 2, ease: u }, l = { width: g, height: w, autoAlpha: 1, top: n + "px", position: "absolute", left: (33 == c ? i : 34 == c ? i + g / 2 : i) + "px" }, d = { top: n + "px", left: i + "px", ease: u }, h = f; mtl.add(punchgs.TweenLite.fromTo(e, h, r, s), 0), mtl.add(punchgs.TweenLite.fromTo(o, h, l, d), 0), mtl.add(punchgs.TweenLite.fromTo(e, .001, { autoAlpha: 0 }, { autoAlpha: 1 }), 0) } }) }(n, C, _nt, 0, w) } if (11 == a) { 12 < u && (u = 0); var V = 2 == u ? "#000000" : 3 == u ? "#ffffff" : "transparent"; switch (u) { case 0: s.add(punchgs.TweenLite.fromTo(n, g / 1e3, { autoAlpha: 0 }, { autoAlpha: 1, force3D: "auto", ease: w }), 0); break; case 1: s.add(punchgs.TweenLite.fromTo(n, g / 1e3, { autoAlpha: 0 }, { autoAlpha: 1, force3D: "auto", ease: w }), 0), s.add(punchgs.TweenLite.fromTo(r, g / 1e3, { autoAlpha: 1 }, { autoAlpha: 0, force3D: "auto", ease: w }), 0); break; case 2: case 3: case 4: s.add(punchgs.TweenLite.set(r.parent(), { backgroundColor: V, force3D: "auto" }), 0), s.add(punchgs.TweenLite.set(n.parent(), { backgroundColor: "transparent", force3D: "auto" }), 0), s.add(punchgs.TweenLite.to(r, g / 2e3, { autoAlpha: 0, force3D: "auto", ease: w }), 0), s.add(punchgs.TweenLite.fromTo(n, g / 2e3, { autoAlpha: 0 }, { autoAlpha: 1, force3D: "auto", ease: w }), g / 2e3); break; case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: var Z = "blur(" + (0 <= jQuery.inArray(u, [9, 10]) ? 5 : 0 <= jQuery.inArray(u, [11, 12]) ? 10 : 0) + "px) grayscale(" + (0 <= jQuery.inArray(u, [5, 6, 7, 8]) ? 100 : 0) + "%) brightness(" + (0 <= jQuery.inArray(u, [7, 8]) ? 300 : 0) + "%)", H = "blur(0px) grayscale(0%) brightness(100%)"; s.add(punchgs.TweenLite.fromTo(n, g / 1e3, { autoAlpha: 0, filter: Z, "-webkit-filter": Z }, { autoAlpha: 1, filter: H, "-webkit-filter": H, force3D: "auto", ease: w }), 0), 0 <= jQuery.inArray(u, [6, 8, 10]) && s.add(punchgs.TweenLite.fromTo(r, g / 1e3, { autoAlpha: 1, filter: H, "-webkit-filter": H }, { autoAlpha: 0, force3D: "auto", ease: w, filter: Z, "-webkit-filter": Z }), 0) }s.add(punchgs.TweenLite.set(n.find(".defaultimg"), { autoAlpha: 1 }), 0), s.add(punchgs.TweenLite.set(r.find("defaultimg"), { autoAlpha: 1 }), 0) } if (26 == a) { g = 0, s.add(punchgs.TweenLite.fromTo(n, g / 1e3, { autoAlpha: 0 }, { autoAlpha: 1, force3D: "auto", ease: w }), 0), s.add(punchgs.TweenLite.to(r, g / 1e3, { autoAlpha: 0, force3D: "auto", ease: w }), 0), s.add(punchgs.TweenLite.set(n.find(".defaultimg"), { autoAlpha: 1 }), 0), s.add(punchgs.TweenLite.set(r.find("defaultimg"), { autoAlpha: 1 }), 0) } if (12 == a || 13 == a || 14 == a || 15 == a) { (g = g) > l.delay && (g = l.delay), setTimeout(function () { punchgs.TweenLite.set(r.find(".defaultimg"), { autoAlpha: 0 }) }, 100); var J = l.width, N = l.height, R = n.find(".slotslide, .defaultvid"), q = 0, B = 0, E = 1, F = 1, G = 1, K = g / 1e3, U = K; "fullwidth" != l.sliderLayout && "fullscreen" != l.sliderLayout || (J = R.width(), N = R.height()), 12 == a ? q = J : 15 == a ? q = 0 - J : 13 == a ? B = N : 14 == a && (B = 0 - N), 1 == u && (E = 0), 2 == u && (E = 0), 3 == u && (K = g / 1300), 4 != u && 5 != u || (F = .6), 6 == u && (F = 1.4), 5 != u && 6 != u || (G = 1.4, B = q = N = J = E = 0), 6 == u && (G = .6); 7 == u && (N = J = 0); var W = n.find(".slotslide"), $ = r.find(".slotslide, .defaultvid"); if (s.add(punchgs.TweenLite.set(i, { zIndex: 15 }), 0), s.add(punchgs.TweenLite.set(o, { zIndex: 20 }), 0), 8 == u ? (s.add(punchgs.TweenLite.set(i, { zIndex: 20 }), 0), s.add(punchgs.TweenLite.set(o, { zIndex: 15 }), 0), s.add(punchgs.TweenLite.set(W, { left: 0, top: 0, scale: 1, opacity: 1, rotation: 0, ease: w, force3D: "auto" }), 0)) : s.add(punchgs.TweenLite.from(W, K, { left: q, top: B, scale: G, opacity: E, rotation: l.rotate, ease: w, force3D: "auto" }), 0), 4 != u && 5 != u || (N = J = 0), 1 != u) switch (a) { case 12: s.add(punchgs.TweenLite.to($, U, { left: 0 - J + "px", force3D: "auto", scale: F, opacity: E, rotation: l.rotate, ease: m }), 0); break; case 15: s.add(punchgs.TweenLite.to($, U, { left: J + "px", force3D: "auto", scale: F, opacity: E, rotation: l.rotate, ease: m }), 0); break; case 13: s.add(punchgs.TweenLite.to($, U, { top: 0 - N + "px", force3D: "auto", scale: F, opacity: E, rotation: l.rotate, ease: m }), 0); break; case 14: s.add(punchgs.TweenLite.to($, U, { top: N + "px", force3D: "auto", scale: F, opacity: E, rotation: l.rotate, ease: m }), 0) } } if (16 == a) { T = new punchgs.TimelineLite; s.add(punchgs.TweenLite.set(i, { position: "absolute", "z-index": 20 }), 0), s.add(punchgs.TweenLite.set(o, { position: "absolute", "z-index": 15 }), 0), i.wrapInner('<div class="tp-half-one" style="position:relative; width:100%;height:100%"></div>'), i.find(".tp-half-one").clone(!0).appendTo(i).addClass("tp-half-two"), i.find(".tp-half-two").removeClass("tp-half-one"); J = l.width, N = l.height; "on" == l.autoHeight && (N = e.height()), i.find(".tp-half-one .defaultimg").wrap('<div class="tp-papercut" style="width:' + J + "px;height:" + N + 'px;"></div>'), i.find(".tp-half-two .defaultimg").wrap('<div class="tp-papercut" style="width:' + J + "px;height:" + N + 'px;"></div>'), i.find(".tp-half-two .defaultimg").css({ position: "absolute", top: "-50%" }), i.find(".tp-half-two .tp-caption").wrapAll('<div style="position:absolute;top:-50%;left:0px;"></div>'), s.add(punchgs.TweenLite.set(i.find(".tp-half-two"), { width: J, height: N, overflow: "hidden", zIndex: 15, position: "absolute", top: N / 2, left: "0px", transformPerspective: 600, transformOrigin: "center bottom" }), 0), s.add(punchgs.TweenLite.set(i.find(".tp-half-one"), { width: J, height: N / 2, overflow: "visible", zIndex: 10, position: "absolute", top: "0px", left: "0px", transformPerspective: 600, transformOrigin: "center top" }), 0); i.find(".defaultimg"); var tt = Math.round(20 * Math.random() - 10), et = Math.round(20 * Math.random() - 10), ot = Math.round(20 * Math.random() - 10), at = .4 * Math.random() - .2, it = .4 * Math.random() - .2, nt = 1 * Math.random() + 1, rt = 1 * Math.random() + 1, st = .3 * Math.random() + .3; s.add(punchgs.TweenLite.set(i.find(".tp-half-one"), { overflow: "hidden" }), 0), s.add(punchgs.TweenLite.fromTo(i.find(".tp-half-one"), g / 800, { width: J, height: N / 2, position: "absolute", top: "0px", left: "0px", force3D: "auto", transformOrigin: "center top" }, { scale: nt, rotation: tt, y: 0 - N - N / 4, autoAlpha: 0, ease: w }), 0), s.add(punchgs.TweenLite.fromTo(i.find(".tp-half-two"), g / 800, { width: J, height: N, overflow: "hidden", position: "absolute", top: N / 2, left: "0px", force3D: "auto", transformOrigin: "center bottom" }, { scale: rt, rotation: et, y: N + N / 4, ease: w, autoAlpha: 0, onComplete: function () { punchgs.TweenLite.set(i, { position: "absolute", "z-index": 15 }), punchgs.TweenLite.set(o, { position: "absolute", "z-index": 20 }), 0 < i.find(".tp-half-one").length && (i.find(".tp-half-one .defaultimg").unwrap(), i.find(".tp-half-one .slotholder").unwrap()), i.find(".tp-half-two").remove() } }), 0), T.add(punchgs.TweenLite.set(n.find(".defaultimg"), { autoAlpha: 1 }), 0), null != i.html() && s.add(punchgs.TweenLite.fromTo(o, (g - 200) / 1e3, { scale: st, x: l.width / 4 * at, y: N / 4 * it, rotation: ot, force3D: "auto", transformOrigin: "center center", ease: m }, { autoAlpha: 1, scale: 1, x: 0, y: 0, rotation: 0 }), 0), s.add(T, 0) } if (17 == a && n.find(".slotslide").each(function (t) { var e = jQuery(this); s.add(punchgs.TweenLite.fromTo(e, g / 800, { opacity: 0, rotationY: 0, scale: .9, rotationX: -110, force3D: "auto", transformPerspective: 600, transformOrigin: "center center" }, { opacity: 1, top: 0, left: 0, scale: 1, rotation: 0, rotationX: 0, force3D: "auto", rotationY: 0, ease: w, delay: .06 * t }), 0) }), 18 == a && n.find(".slotslide").each(function (t) { var e = jQuery(this); s.add(punchgs.TweenLite.fromTo(e, g / 500, { autoAlpha: 0, rotationY: 110, scale: .9, rotationX: 10, force3D: "auto", transformPerspective: 600, transformOrigin: "center center" }, { autoAlpha: 1, top: 0, left: 0, scale: 1, rotation: 0, rotationX: 0, force3D: "auto", rotationY: 0, ease: w, delay: .06 * t }), 0) }), 19 == a || 22 == a) { T = new punchgs.TimelineLite; s.add(punchgs.TweenLite.set(i, { zIndex: 20 }), 0), s.add(punchgs.TweenLite.set(o, { zIndex: 20 }), 0), setTimeout(function () { r.find(".defaultimg").css({ opacity: 0 }) }, 100); var lt = 90, dt = (E = 1, "center center "); 1 == h && (lt = -90), 19 == a ? (dt = dt + "-" + l.height / 2, E = 0) : dt += l.height / 2, punchgs.TweenLite.set(e, { transformStyle: "flat", backfaceVisibility: "hidden", transformPerspective: 600 }), n.find(".slotslide").each(function (t) { var e = jQuery(this); T.add(punchgs.TweenLite.fromTo(e, g / 1e3, { transformStyle: "flat", backfaceVisibility: "hidden", left: 0, rotationY: l.rotate, z: 10, top: 0, scale: 1, force3D: "auto", transformPerspective: 600, transformOrigin: dt, rotationX: lt }, { left: 0, rotationY: 0, top: 0, z: 0, scale: 1, force3D: "auto", rotationX: 0, delay: 50 * t / 1e3, ease: w }), 0), T.add(punchgs.TweenLite.to(e, .1, { autoAlpha: 1, delay: 50 * t / 1e3 }), 0), s.add(T) }), r.find(".slotslide").each(function (t) { var e = jQuery(this), o = -90; 1 == h && (o = 90), T.add(punchgs.TweenLite.fromTo(e, g / 1e3, { transformStyle: "flat", backfaceVisibility: "hidden", autoAlpha: 1, rotationY: 0, top: 0, z: 0, scale: 1, force3D: "auto", transformPerspective: 600, transformOrigin: dt, rotationX: 0 }, { autoAlpha: 1, rotationY: l.rotate, top: 0, z: 10, scale: 1, rotationX: o, delay: 50 * t / 1e3, force3D: "auto", ease: m }), 0), s.add(T) }), s.add(punchgs.TweenLite.set(i, { zIndex: 18 }), 0) } if (20 == a) { if (setTimeout(function () { r.find(".defaultimg").css({ opacity: 0 }) }, 100), 1 == h) { var ht = -l.width; lt = 80, dt = "20% 70% -" + l.height / 2 } else ht = l.width, lt = -80, dt = "80% 70% -" + l.height / 2; n.find(".slotslide").each(function (t) { var e = jQuery(this), o = 50 * t / 1e3; s.add(punchgs.TweenLite.fromTo(e, g / 1e3, { left: ht, rotationX: 40, z: -600, opacity: E, top: 0, scale: 1, force3D: "auto", transformPerspective: 600, transformOrigin: dt, transformStyle: "flat", rotationY: lt }, { left: 0, rotationX: 0, opacity: 1, top: 0, z: 0, scale: 1, rotationY: 0, delay: o, ease: w }), 0) }), r.find(".slotslide").each(function (t) { var e = jQuery(this), o = 50 * t / 1e3; if (o = 0 < t ? o + g / 9e3 : 0, 1 != h) var a = -l.width / 2, i = 30, n = "20% 70% -" + l.height / 2; else a = l.width / 2, i = -30, n = "80% 70% -" + l.height / 2; m = punchgs.Power2.easeInOut, s.add(punchgs.TweenLite.fromTo(e, g / 1e3, { opacity: 1, rotationX: 0, top: 0, z: 0, scale: 1, left: 0, force3D: "auto", transformPerspective: 600, transformOrigin: n, transformStyle: "flat", rotationY: 0 }, { opacity: 1, rotationX: 20, top: 0, z: -600, left: a, force3D: "auto", rotationY: i, delay: o, ease: m }), 0) }) } if (21 == a || 25 == a) { setTimeout(function () { r.find(".defaultimg").css({ opacity: 0 }) }, 100); lt = 90, ht = -l.width; var ft = -lt; if (1 == h) if (25 == a) { dt = "center top 0"; lt = l.rotate } else { dt = "left center 0"; ft = l.rotate } else if (ht = l.width, lt = -90, 25 == a) { dt = "center bottom 0"; ft = -lt, lt = l.rotate } else { dt = "right center 0"; ft = l.rotate } n.find(".slotslide").each(function (t) { var e = jQuery(this), o = g / 1.5 / 3; s.add(punchgs.TweenLite.fromTo(e, 2 * o / 1e3, { left: 0, transformStyle: "flat", rotationX: ft, z: 0, autoAlpha: 0, top: 0, scale: 1, force3D: "auto", transformPerspective: 1200, transformOrigin: dt, rotationY: lt }, { left: 0, rotationX: 0, top: 0, z: 0, autoAlpha: 1, scale: 1, rotationY: 0, force3D: "auto", delay: o / 1e3, ease: w }), 0) }), 1 != h ? (ht = -l.width, lt = 90, 25 == a ? (dt = "center top 0", ft = -lt, lt = l.rotate) : (dt = "left center 0", ft = l.rotate)) : (ht = l.width, lt = -90, 25 == a ? (dt = "center bottom 0", ft = -lt, lt = l.rotate) : (dt = "right center 0", ft = l.rotate)), r.find(".slotslide").each(function (t) { var e = jQuery(this); s.add(punchgs.TweenLite.fromTo(e, g / 1e3, { left: 0, transformStyle: "flat", rotationX: 0, z: 0, autoAlpha: 1, top: 0, scale: 1, force3D: "auto", transformPerspective: 1200, transformOrigin: dt, rotationY: 0 }, { left: 0, rotationX: ft, top: 0, z: 0, autoAlpha: 1, force3D: "auto", scale: 1, rotationY: lt, ease: m }), 0) }) } if (23 == a || 24 == a) { setTimeout(function () { r.find(".defaultimg").css({ opacity: 0 }) }, 100); lt = -90, E = 1; if (1 == h && (lt = 90), 23 == a) { dt = "center center -" + l.width / 2; E = 0 } else dt = "center center " + l.width / 2; punchgs.TweenLite.set(e, { transformStyle: "preserve-3d", backfaceVisibility: "hidden", perspective: 2500 }), n.find(".slotslide").each(function (t) { var e = jQuery(this); s.add(punchgs.TweenLite.fromTo(e, g / 1e3, { left: 0, rotationX: l.rotate, force3D: "auto", opacity: E, top: 0, scale: 1, transformPerspective: 1200, transformOrigin: dt, rotationY: lt }, { left: 0, rotationX: 0, autoAlpha: 1, top: 0, z: 0, scale: 1, rotationY: 0, delay: 50 * t / 500, ease: w }), 0) }), lt = 90, 1 == h && (lt = -90), r.find(".slotslide").each(function (t) { var e = jQuery(this); s.add(punchgs.TweenLite.fromTo(e, g / 1e3, { left: 0, rotationX: 0, top: 0, z: 0, scale: 1, force3D: "auto", transformStyle: "flat", transformPerspective: 1200, transformOrigin: dt, rotationY: 0 }, { left: 0, rotationX: l.rotate, top: 0, scale: 1, rotationY: lt, delay: 50 * t / 500, ease: m }), 0), 23 == a && s.add(punchgs.TweenLite.fromTo(e, g / 2e3, { autoAlpha: 1 }, { autoAlpha: 0, delay: 50 * t / 500 + g / 3e3, ease: m }), 0) }) } return s } }(jQuery);
/********************************************
 * REVOLUTION 5.4.6.5 EXTENSION - VIDEO FUNCTIONS
 * @version: 2.2.2 (04.06.2018)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
; !function (e) { "use strict"; var I = jQuery.fn.revolution, _ = I.is_mobile(), S = (I.is_android(), { alias: "Video Min JS", name: "revolution.extensions.video.min.js", min_core: "5.4.8", version: "2.2.2" }); function j(e) { return null == e ? -1 : jQuery.isNumeric(e) ? e : 1 < e.split(":").length ? 60 * parseInt(e.split(":")[0], 0) + parseInt(e.split(":")[1], 0) : e } jQuery.extend(!0, I, { preLoadAudio: function (e, a) { if ("stop" === I.compare_version(S).check) return !1; e.find(".tp-audiolayer").each(function () { var e = jQuery(this), t = {}; 0 === e.find("audio").length && (t.src = null != e.data("videomp4") ? e.data("videomp4") : "", t.pre = e.data("videopreload") || "", void 0 === e.attr("id") && e.attr("audio-layer-" + Math.round(199999 * Math.random())), t.id = e.attr("id"), t.status = "prepared", t.start = jQuery.now(), t.waittime = 1e3 * e.data("videopreloadwait") || 5e3, "auto" != t.pre && "canplaythrough" != t.pre && "canplay" != t.pre && "progress" != t.pre || (void 0 === a.audioqueue && (a.audioqueue = []), a.audioqueue.push(t), I.manageVideoLayer(e, a))) }) }, preLoadAudioDone: function (a, e, i) { e.audioqueue && 0 < e.audioqueue.length && jQuery.each(e.audioqueue, function (e, t) { a.data("videomp4") !== t.src || t.pre !== i && "auto" !== t.pre || (t.status = "loaded") }) }, resetVideo: function (e, t, a, i) { var o = e.data(); switch (o.videotype) { case "youtube": o.player; try { if ("on" == o.forcerewind) { var d = -1 == (l = j(e.data("videostartat"))), n = 1 === o.bgvideo || 0 < e.find(".tp-videoposter").length; null != o.player && (l = -1 == l ? 0 : l, o.player.seekTo(l), o.player.pauseVideo()) } } catch (e) { } 0 == e.find(".tp-videoposter").length && 1 !== o.bgvideo && !0 !== a && punchgs.TweenLite.to(e.find("iframe"), .3, { autoAlpha: 1, display: "block", ease: punchgs.Power3.easeInOut }); break; case "vimeo": var r = e.data("vimeoplayer"); try { if ("on" == o.forcerewind) { var l = j(o.videostartat); d = -1 == l, n = 1 === o.bgvideo || 0 < e.find(".tp-videoposter").length; (0 !== (l = -1 == l ? 0 : l) && !d || n) && r.pause().then(function () { r.setCurrentTime(l) }) } } catch (e) { } 0 == e.find(".tp-videoposter").length && 1 !== o.bgvideo && !0 !== a && punchgs.TweenLite.to(e.find("iframe"), .3, { autoAlpha: 1, display: "block", ease: punchgs.Power3.easeInOut }); break; case "html5": if (_ && 1 == o.disablevideoonmobile) return !1; var s = "html5" == o.audio ? "audio" : "video", u = e.find(s), p = u[0]; if (punchgs.TweenLite.to(u, .3, { autoAlpha: 1, display: "block", ease: punchgs.Power3.easeInOut }), "on" == o.forcerewind && !e.hasClass("videoisplaying")) try { l = j(o.videostartat); p.currentTime = -1 == l ? 0 : l } catch (e) { } ("mute" == o.volume || I.lastToggleState(e.videomutetoggledby) || !0 === t.globalmute) && (p.muted = !0) } }, isVideoMuted: function (e, t) { var a = !1, i = e.data(); switch (i.videotype) { case "youtube": try { a = i.player.isMuted() } catch (e) { } break; case "vimeo": try { "mute" == i.volume && (a = !0) } catch (e) { } break; case "html5": var o = "html5" == i.audio ? "audio" : "video"; e.find(o)[0].muted && (a = !0) }return a }, muteVideo: function (e, t) { var a = e.data(); switch (a.videotype) { case "youtube": try { a.player.mute() } catch (e) { } break; case "vimeo": try { var i = e.data("vimeoplayer"); e.data("volume", "mute"), i.setVolume(0) } catch (e) { } break; case "html5": var o = "html5" == a.audio ? "audio" : "video"; e.find(o)[0].muted = !0 } }, unMuteVideo: function (e, t) { if (!0 !== t.globalmute) { var a = e.data(); switch (a.videotype) { case "youtube": try { a.player.unMute() } catch (e) { } break; case "vimeo": try { var i = e.data("vimeoplayer"); e.data("volume", "1"), i.setVolume(1) } catch (e) { } break; case "html5": var o = "html5" == a.audio ? "audio" : "video"; e.find(o)[0].muted = !1 } } }, stopVideo: function (e, t) { var a = e.data(); switch (t.leaveViewPortBasedStop || (t.lastplayedvideos = []), t.leaveViewPortBasedStop = !1, a.videotype) { case "youtube": try { var i = a.player; if (2 === i.getPlayerState() || 5 === i.getPlayerState()) return; i.pauseVideo(), a.youtubepausecalled = !0, setTimeout(function () { a.youtubepausecalled = !1 }, 80) } catch (e) { console.log("Issue at YouTube Video Pause:"), console.log(e) } break; case "vimeo": try { e.data("vimeoplayer").pause(), a.vimeopausecalled = !0, setTimeout(function () { a.vimeopausecalled = !1 }, 80) } catch (e) { console.log("Issue at Vimeo Video Pause:"), console.log(e) } break; case "html5": var o = "html5" == a.audio ? "audio" : "video", d = e.find(o), n = d[0]; null != d && null != n && n.pause() } }, playVideo: function (a, i) { clearTimeout(a.data("videoplaywait")); var e = a.data(); switch (e.videotype) { case "youtube": if (0 == a.find("iframe").length) a.append(a.data("videomarkup")), O(a, i, !0); else if (null != e.player.playVideo) { var t = j(a.data("videostartat")), o = e.player.getCurrentTime(); 1 == a.data("nextslideatend-triggered") && (o = -1, a.data("nextslideatend-triggered", 0)), -1 != t && o < t && e.player.seekTo(t), !0 !== e.youtubepausecalled && e.player.playVideo() } else a.data("videoplaywait", setTimeout(function () { !0 !== e.youtubepausecalled && I.playVideo(a, i) }, 50)); break; case "vimeo": if (0 == a.find("iframe").length) a.removeData("vimeoplayer"), a.append(a.data("videomarkup")), O(a, i, !0); else if (a.hasClass("rs-apiready")) { var d, n = a.find("iframe").attr("id"); a.data("vimeoplayer") ? d = a.data("vimeoplayer") : (d = new Vimeo.Player(n), a.data("vimeoplayer", d)), d.getPaused() ? setTimeout(function () { var e = j(a.data("videostartat")), t = a.data("currenttime"); t || (t = 0), 1 == a.data("nextslideatend-triggered") && (t = -1, a.data("nextslideatend-triggered", 0)), -1 != e && t < e && d.setCurrentTime(e), d.play() }, 510) : a.data("videoplaywait", setTimeout(function () { !0 !== e.vimeopausecalled && I.playVideo(a, i) }, 50)) } else a.data("videoplaywait", setTimeout(function () { !0 !== e.vimeopausecalled && I.playVideo(a, i) }, 50)); break; case "html5": var r = "html5" == e.audio ? "audio" : "video", l = a.find(r), s = l[0]; if (1 != l.parent().data("metaloaded")) A(s, "loadedmetadata", function (e) { I.resetVideo(e, i), s.play(); var t = j(e.data("videostartat")), a = s.currentTime; 1 == e.data("nextslideatend-triggered") && (a = -1, e.data("nextslideatend-triggered", 0)), -1 != t && a < t && (s.currentTime = t) }(a)); else { s.play(); t = j(a.data("videostartat")), o = s.currentTime; 1 == a.data("nextslideatend-triggered") && (o = -1, a.data("nextslideatend-triggered", 0)), -1 != t && o < t && (s.currentTime = t) } } }, isVideoPlaying: function (a, e) { var i = !1; return null != e.playingvideos && jQuery.each(e.playingvideos, function (e, t) { a.attr("id") == t.attr("id") && (i = !0) }), i }, removeMediaFromList: function (e, t) { V(e, t) }, prepareCoveredVideo: function (e, t) { if ((!t.hasClass("tp-caption") || t.hasClass("coverscreenvideo")) && (void 0 === t.data("vimeoid") || void 0 !== t.data("vimeoplayerloaded"))) { var a = {}; a.ifr = t.find("iframe, video"), a.asp = t.data("aspectratio"), a.wa = a.asp.split(":")[0], a.ha = a.asp.split(":")[1], a.vd = a.wa / a.ha; var i = "carousel" !== e.sliderType ? e.conw : t.closest(".tp-revslider-slidesli").width(); if (0 === i || 0 === e.conh) return I.setSize(e), clearTimeout(a.ifr.data("resizelistener")), void a.ifr.data("resizelistener", setTimeout(function () { I.prepareCoveredVideo(e, t) }, 100)); var o = i / e.conh, d = o / a.vd * 100, n = a.vd / o * 100; o > a.vd ? punchgs.TweenLite.set(a.ifr, { height: d + "%", width: "100%", top: -(d - 100) / 2 + "%", left: "0px", position: "absolute" }) : punchgs.TweenLite.set(a.ifr, { width: n + "%", height: "100%", left: -(n - 100) / 2 + "%", top: "0px", position: "absolute" }), a.ifr.hasClass("resizelistener") || (a.ifr.addClass("resizelistener"), jQuery(window).resize(function () { I.prepareCoveredVideo(e, t), clearTimeout(a.ifr.data("resizelistener")), a.ifr.data("resizelistener", setTimeout(function () { I.prepareCoveredVideo(e, t) }, 90)) })) } }, checkVideoApis: function (e, t, a) { location.protocol; if ((null != e.data("ytid") || 0 < e.find("iframe").length && 0 < e.find("iframe").attr("src").toLowerCase().indexOf("youtube")) && (t.youtubeapineeded = !0), (null != e.data("ytid") || 0 < e.find("iframe").length && 0 < e.find("iframe").attr("src").toLowerCase().indexOf("youtube")) && 0 == a.addedyt) { t.youtubestarttime = jQuery.now(), a.addedyt = 1; var i = document.createElement("script"); i.src = "https://www.youtube.com/iframe_api"; var o = document.getElementsByTagName("script")[0], d = !0; jQuery("head").find("*").each(function () { "https://www.youtube.com/iframe_api" == jQuery(this).attr("src") && (d = !1) }), d && o.parentNode.insertBefore(i, o) } if ((null != e.data("vimeoid") || 0 < e.find("iframe").length && 0 < e.find("iframe").attr("src").toLowerCase().indexOf("vimeo")) && (t.vimeoapineeded = !0), (null != e.data("vimeoid") || 0 < e.find("iframe").length && 0 < e.find("iframe").attr("src").toLowerCase().indexOf("vimeo")) && 0 == a.addedvim) { t.vimeostarttime = jQuery.now(), a.addedvim = 1; var n = document.createElement("script"); o = document.getElementsByTagName("script")[0], d = !0; n.src = "https://player.vimeo.com/api/player.js", jQuery("head").find("*").each(function () { "https://player.vimeo.com/api/player.js" == jQuery(this).attr("src") && (d = !1) }), d && o.parentNode.insertBefore(n, o) } return a }, manageVideoLayer: function (i, o, e, t) { if ("stop" === I.compare_version(S).check) return !1; var a = i.data(), d = a.videoattributes, n = a.ytid, r = a.vimeoid, l = "auto" === a.videopreload || "canplay" === a.videopreload || "canplaythrough" === a.videopreload || "progress" === a.videopreload ? "auto" : a.videopreload, s = a.videomp4, u = a.videowebm, p = a.videoogv, v = a.allowfullscreenvideo, c = a.videocontrols, m = "http", g = "loop" == a.videoloop ? "loop" : "loopandnoslidestop" == a.videoloop ? "loop" : "", y = null != s || null != u ? "html5" : null != n && 1 < String(n).length ? "youtube" : null != r && 1 < String(r).length ? "vimeo" : "none", f = "html5" == a.audio ? "audio" : "video", h = "html5" == y && 0 == i.find(f).length ? "html5" : "youtube" == y && 0 == i.find("iframe").length ? "youtube" : "vimeo" == y && 0 == i.find("iframe").length ? "vimeo" : "none"; switch (g = !0 === a.nextslideatend ? "" : g, a.videotype = y, h) { case "html5": "controls" != c && (c = ""); f = "video"; "html5" == a.audio && (f = "audio", i.addClass("tp-audio-html5")); var b = ""; "video" === f && (I.is_mobile() || I.isSafari11()) && ("on" === a.autoplay || "true" === a.autoplay || !0 === a.autoplay ? b = "muted playsinline autoplay" : 1 != a.videoinline && "true" !== a.videoinline && 1 !== a.videoinline || (b += " playsinline")); var w = "<" + f + " " + b + ' style="object-fit:cover;background-size:cover;visible:hidden;width:100%; height:100%" class="" ' + g + ' preload="' + l + '">'; "auto" == l && (o.mediapreload = !0), "video" === f ? (null != u && "firefox" == I.get_browser().toLowerCase() && (w = w + '<source src="' + u + '" type="video/webm" />'), null != s && (w = w + '<source src="' + s + '" type="video/mp4" />'), null != p && (w = w + '<source src="' + p + '" type="video/ogg" />')) : "audio" === f && (null != s && (w = w + '<source src="' + s + '" type="audio/mpeg" />'), null != p && (w = w + '<source src="' + p + '" type="audio/ogg" />')), w = w + "</" + f + ">"; var T = ""; "true" !== v && !0 !== v || (T = '<div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-full-screen">Full-Screen</button></div>'), "controls" == c && (w = w + '<div class="tp-video-controls"><div class="tp-video-button-wrap"><button type="button" class="tp-video-button tp-vid-play-pause">Play</button></div><div class="tp-video-seek-bar-wrap"><input  type="range" class="tp-seek-bar" value="0"></div><div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-mute">Mute</button></div><div class="tp-video-vol-bar-wrap"><input  type="range" class="tp-volume-bar" min="0" max="1" step="0.1" value="1"></div>' + T + "</div>"), i.data("videomarkup", w), i.append(w), (_ && 1 == i.data("disablevideoonmobile") || I.isIE(8)) && i.find(f).remove(), i.find(f).each(function (e) { var t, a = jQuery(this); a.parent().hasClass("html5vid") || a.wrap('<div class="html5vid" style="position:relative;top:0px;left:0px;width:100%;height:100%; overflow:hidden;"></div>'), 1 != a.parent().data("metaloaded") && A(this, "loadedmetadata", (Q(t = i, o), void I.resetVideo(t, o))) }); break; case "youtube": m = "https", "none" == c && -1 == (d = d.replace("controls=1", "controls=0")).toLowerCase().indexOf("controls") && (d += "&controls=0"), (!0 === a.videoinline || "true" === a.videoinline || 1 === a.videoinline || i.hasClass("rs-background-video-layer") || "on" === i.data("autoplay")) && (d += "&playsinline=1"); var k = j(i.data("videostartat")), x = j(i.data("videoendat")); -1 != k && (d = d + "&start=" + k), -1 != x && (d = d + "&end=" + x); var V = d.split("origin=" + m + "://"), L = ""; 1 < V.length ? (L = V[0] + "origin=" + m + "://", self.location.href.match(/www/gi) && !V[1].match(/www/gi) && (L += "www."), L += V[1]) : L = d; var C = "true" === v || !0 === v ? "allowfullscreen" : ""; i.data("videomarkup", '<iframe type="text/html" src="' + m + "://www.youtube-nocookie.com/embed/" + n + "?" + L + '" ' + C + ' width="100%" height="100%" style="opacity:0;width:100%;height:100%"></iframe>'); break; case "vimeo": m = "https", i.data("videomarkup", '<iframe src="' + m + "://player.vimeo.com/video/" + r + "?" + d + '" webkitallowfullscreen mozallowfullscreen allowfullscreen width="100%" height="100%" style="opacity:0;visibility:hidden;width:100%;height:100%"></iframe>') }var P = _ && "on" == i.data("noposteronmobile"); if (null != a.videoposter && 2 < a.videoposter.length && !P) 0 == i.find(".tp-videoposter").length && i.append('<div class="tp-videoposter noSwipe" style="cursor:pointer; position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:3;background-image:url(' + a.videoposter + '); background-size:cover;background-position:center center;"></div>'), 0 == i.find("iframe").length && i.find(".tp-videoposter").click(function () { if (I.playVideo(i, o), _) { if (1 == i.data("disablevideoonmobile")) return !1; punchgs.TweenLite.to(i.find(".tp-videoposter"), .3, { autoAlpha: 0, force3D: "auto", ease: punchgs.Power3.easeInOut }), punchgs.TweenLite.to(i.find("iframe"), .3, { autoAlpha: 1, display: "block", ease: punchgs.Power3.easeInOut }) } }); else { if (_ && 1 == i.data("disablevideoonmobile")) return !1; 0 != i.find("iframe").length || "youtube" != y && "vimeo" != y || (i.removeData("vimeoplayer"), i.append(i.data("videomarkup")), O(i, o, !1)) } "none" != i.data("dottedoverlay") && null != i.data("dottedoverlay") && 1 != i.find(".tp-dottedoverlay").length && i.append('<div class="tp-dottedoverlay ' + i.data("dottedoverlay") + '"></div>'), i.addClass("HasListener"), 1 == i.data("bgvideo") && (i.data("ytid") ? punchgs.TweenLite.set(i.find("iframe"), { opacity: 0 }) : punchgs.TweenLite.set(i.find("video, iframe"), { autoAlpha: 0 })) } }); var A = function (e, t, a) { e.addEventListener ? e.addEventListener(t, a, { capture: !1, passive: !0 }) : e.attachEvent(t, a, { capture: !1, passive: !0 }) }, b = function (e, t, a) { var i = {}; return i.video = e, i.videotype = t, i.settings = a, i }, w = function (e, t) { if (1 == t.data("bgvideo") || 1 == t.data("forcecover")) { 1 === t.data("forcecover") && t.removeClass("fullscreenvideo").addClass("coverscreenvideo"); var a = t.data("aspectratio"); void 0 === a && a.split(":").length <= 1 && t.data("aspectratio", "16:9"), I.prepareCoveredVideo(e, t) } }, O = function (r, o, e) { var l = r.data(), t = r.find("iframe"), a = "iframe" + Math.round(1e5 * Math.random() + 1), d = l.videoloop, n = "loopandnoslidestop" != d; if (d = "loop" == d || "loopandnoslidestop" == d, w(o, r), t.attr("id", a), e && r.data("startvideonow", !0), 1 !== r.data("videolistenerexist")) switch (l.videotype) { case "youtube": var s = new YT.Player(a, { events: { onStateChange: function (e) { var t = r.closest(".tp-simpleresponsive"), a = (l.videorate, r.data("videostart"), k()); if (e.data == YT.PlayerState.PLAYING) punchgs.TweenLite.to(r.find(".tp-videoposter"), .3, { autoAlpha: 0, force3D: "auto", ease: punchgs.Power3.easeInOut }), punchgs.TweenLite.to(r.find("iframe"), .3, { autoAlpha: 1, display: "block", ease: punchgs.Power3.easeInOut }), "mute" == r.data("volume") || I.lastToggleState(r.data("videomutetoggledby")) || !0 === o.globalmute ? s.mute() : (s.unMute(), s.setVolume(parseInt(r.data("volume"), 0) || 75)), o.videoplaying = !0, x(r, o), n ? o.c.trigger("stoptimer") : o.videoplaying = !1, o.c.trigger("revolution.slide.onvideoplay", b(s, "youtube", r.data())), I.toggleState(l.videotoggledby); else { if (0 == e.data && d) { var i = j(r.data("videostartat")); -1 != i && s.seekTo(i), s.playVideo(), I.toggleState(l.videotoggledby) } a || 0 != e.data && 2 != e.data || !("on" == r.data("showcoveronpause") && 0 < r.find(".tp-videoposter").length || 1 === r.data("bgvideo") && 0 < r.find(".rs-fullvideo-cover").length) || (1 === r.data("bgvideo") ? punchgs.TweenLite.to(r.find(".rs-fullvideo-cover"), .1, { autoAlpha: 1, force3D: "auto", ease: punchgs.Power3.easeInOut }) : punchgs.TweenLite.to(r.find(".tp-videoposter"), .1, { autoAlpha: 1, force3D: "auto", ease: punchgs.Power3.easeInOut }), punchgs.TweenLite.to(r.find("iframe"), .1, { autoAlpha: 0, ease: punchgs.Power3.easeInOut })), -1 != e.data && 3 != e.data && (o.videoplaying = !1, o.tonpause = !1, V(r, o), t.trigger("starttimer"), o.c.trigger("revolution.slide.onvideostop", b(s, "youtube", r.data())), null != o.currentLayerVideoIsPlaying && o.currentLayerVideoIsPlaying.attr("id") != r.attr("id") || I.unToggleState(l.videotoggledby)), 0 == e.data && 1 == r.data("nextslideatend") ? (T(), r.data("nextslideatend-triggered", 1), o.c.revnext(), V(r, o)) : (V(r, o), o.videoplaying = !1, t.trigger("starttimer"), o.c.trigger("revolution.slide.onvideostop", b(s, "youtube", r.data())), null != o.currentLayerVideoIsPlaying && o.currentLayerVideoIsPlaying.attr("id") != r.attr("id") || I.unToggleState(l.videotoggledby)) } }, onReady: function (e) { var t, a = I.is_mobile(), i = r.hasClass("tp-videolayer"); if (a || I.isSafari11()) { var o = i && "off" !== r.data("autoplay"); if (r.hasClass("rs-background-video-layer") || o) a && i || (t = !0, s.setVolume(0), r.data("volume", "mute"), s.mute(), clearTimeout(r.data("mobilevideotimr")), r.data("mobilevideotimr", setTimeout(function () { s.playVideo() }, 500))) } t || "mute" != r.data("volume") || (s.setVolume(0), s.mute()); var d = l.videorate; r.data("videostart"); if (r.addClass("rs-apiready"), null != d && e.target.setPlaybackRate(parseFloat(d)), r.find(".tp-videoposter").unbind("click"), r.find(".tp-videoposter").click(function () { _ || s.playVideo() }), r.data("startvideonow")) { l.player.playVideo(); var n = j(r.data("videostartat")); -1 != n && l.player.seekTo(n) } r.data("videolistenerexist", 1) } } }); r.data("player", s); break; case "vimeo": for (var i, u = t.attr("src"), p = {}, v = u, c = /([^&=]+)=([^&]*)/g; i = c.exec(v);)p[decodeURIComponent(i[1])] = decodeURIComponent(i[2]); u = (u = null != p.player_id ? u.replace(p.player_id, a) : u + "&player_id=" + a).replace(/&api=0|&api=1/g, ""); var m = I.is_mobile(), g = r.data("autoplay"), y = (r.data("volume"), m || I.isSafari11()); r.hasClass("rs-background-video-layer"); (g = "on" === g || "true" === g || !0 === g) && y && (u += "?autoplay=1&autopause=0&muted=1&background=1&playsinline=1", r.data({ vimeoplaysinline: !0, volume: "mute" })), t.attr("src", u); s = r.find("iframe")[0], jQuery("#" + a); if (r.data("vimeoplayer") ? h = r.data("vimeoplayer") : (h = new Vimeo.Player(a), r.data("vimeoplayer", h)), h.on("loaded", function (e) { var t = {}; h.getVideoWidth().then(function (e) { t.width = e, void 0 !== t.width && void 0 !== t.height && (r.data("aspectratio", t.width + ":" + t.height), r.data("vimeoplayerloaded", !0), w(o, r)) }), h.getVideoHeight().then(function (e) { t.height = e, void 0 !== t.width && void 0 !== t.height && (r.data("aspectratio", t.width + ":" + t.height), r.data("vimeoplayerloaded", !0), w(o, r)) }) }), r.addClass("rs-apiready"), h.on("play", function (e) { r.data("nextslidecalled", 0), punchgs.TweenLite.to(r.find(".tp-videoposter"), .3, { autoAlpha: 0, force3D: "auto", ease: punchgs.Power3.easeInOut }), punchgs.TweenLite.to(r.find("iframe"), .3, { autoAlpha: 1, display: "block", ease: punchgs.Power3.easeInOut }), o.c.trigger("revolution.slide.onvideoplay", b(h, "vimeo", r.data())), o.videoplaying = !0, x(r, o), n ? o.c.trigger("stoptimer") : o.videoplaying = !1, r.data("vimeoplaysinline") || ("mute" == r.data("volume") || I.lastToggleState(r.data("videomutetoggledby")) || !0 === o.globalmute ? h.setVolume(0) : h.setVolume(parseInt(r.data("volume"), 0) / 100 || .75), I.toggleState(l.videotoggledby)) }), h.on("timeupdate", function (e) { var t = j(r.data("videoendat")); if (r.data("currenttime", e.seconds), 0 != t && Math.abs(t - e.seconds) < 1 && t > e.seconds && 1 != r.data("nextslidecalled")) if (d) { h.play(); var a = j(r.data("videostartat")); -1 != a && h.setCurrentTime(a) } else 1 == r.data("nextslideatend") && (r.data("nextslideatend-triggered", 1), r.data("nextslidecalled", 1), o.c.revnext()), h.pause() }), h.on("ended", function (e) { V(r, o), o.videoplaying = !1, o.c.trigger("starttimer"), o.c.trigger("revolution.slide.onvideostop", b(h, "vimeo", r.data())), 1 == r.data("nextslideatend") && (r.data("nextslideatend-triggered", 1), o.c.revnext()), null != o.currentLayerVideoIsPlaying && o.currentLayerVideoIsPlaying.attr("id") != r.attr("id") || I.unToggleState(l.videotoggledby) }), h.on("pause", function (e) { ("on" == r.data("showcoveronpause") && 0 < r.find(".tp-videoposter").length || 1 === r.data("bgvideo") && 0 < r.find(".rs-fullvideo-cover").length) && (1 === r.data("bgvideo") ? punchgs.TweenLite.to(r.find(".rs-fullvideo-cover"), .1, { autoAlpha: 1, force3D: "auto", ease: punchgs.Power3.easeInOut }) : punchgs.TweenLite.to(r.find(".tp-videoposter"), .1, { autoAlpha: 1, force3D: "auto", ease: punchgs.Power3.easeInOut }), punchgs.TweenLite.to(r.find("iframe"), .1, { autoAlpha: 0, ease: punchgs.Power3.easeInOut })), o.videoplaying = !1, o.tonpause = !1, V(r, o), o.c.trigger("starttimer"), o.c.trigger("revolution.slide.onvideostop", b(h, "vimeo", r.data())), null != o.currentLayerVideoIsPlaying && o.currentLayerVideoIsPlaying.attr("id") != r.attr("id") || I.unToggleState(l.videotoggledby) }), r.find(".tp-videoposter").unbind("click"), r.find(".tp-videoposter").click(function () { if (!_) return h.play(), !1 }), r.data("startvideonow")) h.play(), -1 != (f = j(r.data("videostartat"))) && h.setCurrentTime(f); r.data("videolistenerexist", 1) } else { var f = j(r.data("videostartat")); switch (l.videotype) { case "youtube": e && (l.player.playVideo(), -1 != f && l.player.seekTo()); break; case "vimeo": var h; if (e) (h = r.data("vimeoplayer")).play(), -1 != f && h.seekTo(f) } } }, T = function () { document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen() }, k = function () { try { if (void 0 !== window.fullScreen) return window.fullScreen; var e = 5; return jQuery.browser.webkit && /Apple Computer/.test(navigator.vendor) && (e = 42), screen.width == window.innerWidth && Math.abs(screen.height - window.innerHeight) < e } catch (e) { } }, Q = function (o, d, e) { if (_ && 1 == o.data("disablevideoonmobile")) return !1; var n = o.data(), t = "html5" == n.audio ? "audio" : "video", a = o.find(t), r = a[0], i = a.parent(), l = n.videoloop, s = "loopandnoslidestop" != l; if (l = "loop" == l || "loopandnoslidestop" == l, i.data("metaloaded", 1), 1 != o.data("bgvideo") || "none" !== n.videoloop && !1 !== n.videoloop || (s = !1), null == a.attr("control") && (0 != o.find(".tp-video-play-button").length || _ || o.append('<div class="tp-video-play-button"><i class="revicon-right-dir"></i><span class="tp-revstop">&nbsp;</span></div>'), o.find("video, .tp-poster, .tp-video-play-button").click(function () { o.hasClass("videoisplaying") ? r.pause() : r.play() })), 1 == o.data("forcecover") || o.hasClass("fullscreenvideo") || 1 == o.data("bgvideo")) if (1 == o.data("forcecover") || 1 == o.data("bgvideo")) { i.addClass("fullcoveredvideo"); var u = o.data("aspectratio"); void 0 !== u && 1 != u.split(":").length || o.data("aspectratio", "16:9"), I.prepareCoveredVideo(d, o) } else i.addClass("fullscreenvideo"); var p = o.find(".tp-vid-play-pause")[0], v = o.find(".tp-vid-mute")[0], c = o.find(".tp-vid-full-screen")[0], m = o.find(".tp-seek-bar")[0], g = o.find(".tp-volume-bar")[0]; null != p && A(p, "click", function () { 1 == r.paused ? r.play() : r.pause() }), null != v && A(v, "click", function () { 0 == r.muted ? (r.muted = !0, v.innerHTML = "Unmute") : (r.muted = !1, v.innerHTML = "Mute") }), null != c && c && A(c, "click", function () { r.requestFullscreen ? r.requestFullscreen() : r.mozRequestFullScreen ? r.mozRequestFullScreen() : r.webkitRequestFullscreen && r.webkitRequestFullscreen() }), null != m && (A(m, "change", function () { var e = r.duration * (m.value / 100); r.currentTime = e }), A(m, "mousedown", function () { o.addClass("seekbardragged"), r.pause() }), A(m, "mouseup", function () { o.removeClass("seekbardragged"), r.play() })), A(r, "canplaythrough", function () { I.preLoadAudioDone(o, d, "canplaythrough") }), A(r, "canplay", function () { I.preLoadAudioDone(o, d, "canplay") }), A(r, "progress", function () { I.preLoadAudioDone(o, d, "progress") }), A(r, "timeupdate", function () { var e = 100 / r.duration * r.currentTime, t = j(o.data("videoendat")), a = r.currentTime; if (null != m && (m.value = e), 0 != t && -1 != t && Math.abs(t - a) <= .3 && a < t && 1 != o.data("nextslidecalled")) if (l) { r.play(); var i = j(o.data("videostartat")); -1 != i && (r.currentTime = i) } else 1 == o.data("nextslideatend") && (o.data("nextslideatend-triggered", 1), o.data("nextslidecalled", 1), d.just_called_nextslide_at_htmltimer = !0, d.c.revnext(), setTimeout(function () { d.just_called_nextslide_at_htmltimer = !1 }, 1e3)), r.pause() }), null != g && A(g, "change", function () { r.volume = g.value }), A(r, "play", function () { o.data("nextslidecalled", 0); var e = o.data("volume"); e = null != e && "mute" != e ? parseFloat(e) / 100 : e, I.is_mobile() || I.isSafari11() || (!0 === d.globalmute ? r.muted = !0 : r.muted = !1, 1 < e && (e /= 100), "mute" == e ? r.muted = !0 : null != e && (r.volume = e)), o.addClass("videoisplaying"); var t = "html5" == n.audio ? "audio" : "video"; x(o, d), s && "audio" != t ? (d.videoplaying = !0, d.c.trigger("stoptimer"), d.c.trigger("revolution.slide.onvideoplay", b(r, "html5", n))) : (d.videoplaying = !1, "audio" != t && d.c.trigger("starttimer"), d.c.trigger("revolution.slide.onvideostop", b(r, "html5", n))), punchgs.TweenLite.to(o.find(".tp-videoposter"), .3, { autoAlpha: 0, force3D: "auto", ease: punchgs.Power3.easeInOut }), punchgs.TweenLite.to(o.find(t), .3, { autoAlpha: 1, display: "block", ease: punchgs.Power3.easeInOut }); var a = o.find(".tp-vid-play-pause")[0], i = o.find(".tp-vid-mute")[0]; null != a && (a.innerHTML = "Pause"), null != i && r.muted && (i.innerHTML = "Unmute"), I.toggleState(n.videotoggledby) }), A(r, "pause", function (e) { var t = "html5" == n.audio ? "audio" : "video"; !k() && 0 < o.find(".tp-videoposter").length && "on" == o.data("showcoveronpause") && !o.hasClass("seekbardragged") && (punchgs.TweenLite.to(o.find(".tp-videoposter"), .3, { autoAlpha: 1, force3D: "auto", ease: punchgs.Power3.easeInOut }), punchgs.TweenLite.to(o.find(t), .3, { autoAlpha: 0, ease: punchgs.Power3.easeInOut })), o.removeClass("videoisplaying"), d.videoplaying = !1, V(o, d), "audio" != t && d.c.trigger("starttimer"), d.c.trigger("revolution.slide.onvideostop", b(r, "html5", o.data())); var a = o.find(".tp-vid-play-pause")[0]; null != a && (a.innerHTML = "Play"), null != d.currentLayerVideoIsPlaying && d.currentLayerVideoIsPlaying.attr("id") != o.attr("id") || I.unToggleState(n.videotoggledby) }), A(r, "ended", function () { T(), V(o, d), d.videoplaying = !1, V(o, d), "audio" != t && d.c.trigger("starttimer"), d.c.trigger("revolution.slide.onvideostop", b(r, "html5", o.data())), !0 === o.data("nextslideatend") && 0 < r.currentTime && (1 == !d.just_called_nextslide_at_htmltimer && (o.data("nextslideatend-triggered", 1), d.c.revnext(), d.just_called_nextslide_at_htmltimer = !0), setTimeout(function () { d.just_called_nextslide_at_htmltimer = !1 }, 1500)), o.removeClass("videoisplaying") }) }, x = function (e, a) { null == a.playingvideos && (a.playingvideos = new Array), e.data("stopallvideos") && null != a.playingvideos && 0 < a.playingvideos.length && (a.lastplayedvideos = jQuery.extend(!0, [], a.playingvideos), jQuery.each(a.playingvideos, function (e, t) { I.stopVideo(t, a) })), a.playingvideos.push(e), a.currentLayerVideoIsPlaying = e }, V = function (e, t) { null != t.playingvideos && 0 <= jQuery.inArray(e, t.playingvideos) && t.playingvideos.splice(jQuery.inArray(e, t.playingvideos), 1) } }(jQuery);
/**
 * HSCore -
 *
 * @author HtmlStream
 * @version 1.0
 */

(function ($) {
    'use strict';

    $.HSCore = {
        init: function () {
            $(document).ready(function (e) {
                // Botostrap Tootltips
                $('[data-toggle="tooltip"]').tooltip();

                // Set Background Image Dynamically
                if ($('[data-bg-img-src]').length) $.HSCore.helpers.bgImage($('[data-bg-img-src]'));

                // Extends jQuery
                $.HSCore.helpers.extendjQuery();

                // Detect Internet Explorer (IE)
                $.HSCore.helpers.detectIE();

                // Bootstrap Navigation Options
                $.HSCore.helpers.bootstrapNavOptions.init();
            });

            $(window).on('load', function (e) {
            });
        },

        /**
         *
         *
         * @var
         */
        components: {},

        /**
         *
         *
         * @var
         */
        helpers: {
            Math: {
                getRandomValueFromRange: function (startPoint, endPoint, fixed) {
                    var fixedInner = fixed ? fixed : false;

                    Math.random();

                    return fixedInner ? (Math.random() * (endPoint - startPoint) + startPoint) : (Math.floor(Math.random() * (endPoint - startPoint + 1)) + startPoint);
                }
            },

            /*
             * Sets background-image dynamically.
             */
            bgImage: function (collection) {
                if (!collection || !collection.length) return;

                return collection.each(function (i, el) {
                    var $el = $(el),
                        bgImageSrc = $el.data('bg-img-src');

                    if (bgImageSrc) $el.css('background-image', 'url(' + bgImageSrc + ')');
                });
            },

            /**
             * Extends basic jQuery functionality
             */
            extendjQuery: function () {
                $.fn.extend({
                    /*
                     * Runs specified function after loading of all images.
                     */
                    imagesLoaded: function () {
                        var $imgs = this.find('img[src!=""]');

                        if (!$imgs.length) {
                            return $.Deferred().resolve().promise();
                        }

                        var dfds = [];

                        $imgs.each(function () {
                            var dfd = $.Deferred();
                            dfds.push(dfd);
                            var img = new Image();
                            img.onload = function () {
                                dfd.resolve();
                            };
                            img.onerror = function () {
                                dfd.resolve();
                            };
                            img.src = this.src;
                        });

                        return $.when.apply($, dfds);
                    }
                });
            },

            /**
             * Detect Internet Explorer (IE)
             *
             * @return version of IE or false, if browser is not Internet Explorer
             */

            detectIE: function () {
                var ua = window.navigator.userAgent;

                var trident = ua.indexOf('Trident/');
                if (trident > 0) {
                    // IE 11 => return version number
                    var rv = ua.indexOf('rv:');
                    var ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                    document.querySelector('body').className += ' IE';
                }

                var edge = ua.indexOf('Edge/');
                if (edge > 0) {
                    // IE 12 (aka Edge) => return version number
                    var ieV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
                    document.querySelector('body').className += ' IE';
                }

                // other browser
                return false;
            },

            /**
             * Bootstrap navigation options
             *
             */
            bootstrapNavOptions: {
                init: function () {
                    this.mobileHideOnScroll();
                },

                mobileHideOnScroll: function () {
                    var $collection = $('.navbar');
                    if (!$collection.length) return;

                    var $w = $(window),
                        breakpointsMap = {
                            'sm': 576,
                            'md': 768,
                            'lg': 992,
                            'xl': 1200
                        };

                    $('body').on('click.HSMobileHideOnScroll', '.navbar-toggler', function (e) {
                        var $navbar = $(this).closest('.navbar');

                        if ($navbar.length) {
                            $navbar.data('mobile-menu-scroll-position', $w.scrollTop());
                        }
                        e.preventDefault();
                    });

                    $w.on('scroll.HSMobileHideOnScroll', function (e) {
                        $collection.each(function (i, el) {
                            var $this = $(el), $toggler, $nav, offset, $hamburgers, breakpoint;
                            if ($this.hasClass('navbar-expand-xl')) breakpoint = breakpointsMap['xl'];
                            else if ($this.hasClass('navbar-expand-lg')) breakpoint = breakpointsMap['lg'];
                            else if ($this.hasClass('navbar-expand-md')) breakpoint = breakpointsMap['md'];
                            else if ($this.hasClass('navbar-expand-xs')) breakpoint = breakpointsMap['xs'];

                            if ($w.width() > breakpoint) return;

                            $toggler = $this.find('.navbar-toggler');
                            $nav = $this.find('.navbar-collapse');

                            if (!$nav.data('mobile-scroll-hide')) return;

                            if ($nav.length) {
                                offset = $this.data('mobile-menu-scroll-position');

                                if (Math.abs($w.scrollTop() - offset) > 40 && $nav.hasClass('show')) {
                                    $toggler.trigger('click');
                                    $hamburgers = $toggler.find('.is-active');
                                    if ($hamburgers.length) {
                                        $hamburgers.removeClass('is-active');
                                    }
                                }
                            }
                        });
                    });
                }
            }
        },

        /**
         *
         *
         * @var
         */
        settings: {
            rtl: false
        }
    };

    $.HSCore.init();
})(jQuery);
/**
 * Header Component.
 *
 * @author Htmlstream
 * @version 1.0
 *
 */
; (function ($) {
    'use strict';

    $.HSCore.components.HSHeader = {
        /**
         * Base configuration.
         *
         * @var Object _baseConfig
         */
        _baseConfig: {
            headerFixMoment: 0,
            headerFixEffect: 'slide',
            breakpointsMap: {
                'md': 768,
                'sm': 576,
                'lg': 992,
                'xl': 1200
            }
        },

        /**
         * Initializtion of header.
         *
         * @param jQuery element
         *
         * @return jQuery
         */
        init: function (element) {
            if (!element || element.length !== 1 || element.data('HSHeader')) return;

            var self = this;

            this.element = element;
            this.config = $.extend(true, {}, this._baseConfig, element.data());

            this.observers = this._detectObservers();
            this.fixMediaDifference(this.element);
            this.element.data('HSHeader', new HSHeader(this.element, this.config, this.observers));

            $(window)
                .on('scroll.uHeader', function (e) {
                    element
                        .data('HSHeader')
                        .notify();
                })
                .on('resize.uHeader', function (e) {
                    if (self.resizeTimeOutId) clearTimeout(self.resizeTimeOutId);

                    self.resizeTimeOutId = setTimeout(function () {
                        element
                            .data('HSHeader')
                            .checkViewport()
                            .update();
                    }, 100);
                })
                .trigger('scroll.uHeader');

            return this.element;
        },

        /**
         *
         *
         * @param
         *
         * @return
         */
        _detectObservers: function () {
            if (!this.element || !this.element.length) return;

            var observers = {
                'xs': [],
                'sm': [],
                'md': [],
                'lg': [],
                'xl': []
            };

            /* ------------------------ xs -------------------------*/

            // Has Hidden Element
            if (this.element.hasClass('u-header--has-hidden-element')) {
                observers['xs'].push(
                    new HSHeaderHasHiddenElement(this.element)
                );
            }

            // Sticky top

            if (this.element.hasClass('u-header--sticky-top')) {
                if (this.element.hasClass('u-header--show-hide')) {
                    observers['xs'].push(
                        new HSHeaderMomentShowHideObserver(this.element)
                    );
                }
                else if (this.element.hasClass('u-header--toggle-section')) {
                    observers['xs'].push(
                        new HSHeaderHideSectionObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-logo')) {
                    observers['xs'].push(
                        new HSHeaderChangeLogoObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-appearance')) {
                    observers['xs'].push(
                        new HSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }

            // Floating

            if (this.element.hasClass('u-header--floating')) {
                observers['xs'].push(
                    new HSHeaderFloatingObserver(this.element)
                );
            }

            if (this.element.hasClass('u-header--invulnerable')) {
                observers['xs'].push(
                    new HSHeaderWithoutBehaviorObserver(this.element)
                );
            }

            // Sticky bottom

            if (this.element.hasClass('u-header--sticky-bottom')) {
                if (this.element.hasClass('u-header--change-appearance')) {
                    observers['xs'].push(
                        new HSHeaderChangeAppearanceObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-logo')) {
                    observers['xs'].push(
                        new HSHeaderChangeLogoObserver(this.element)
                    );
                }
            }

            // Abs top & Static

            if (this.element.hasClass('u-header--abs-top') || this.element.hasClass('u-header--static')) {
                if (this.element.hasClass('u-header--show-hide')) {
                    observers['xs'].push(
                        new HSHeaderShowHideObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-logo')) {
                    observers['xs'].push(
                        new HSHeaderChangeLogoObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-appearance')) {
                    observers['xs'].push(
                        new HSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }

            // Abs bottom & Abs top 2nd screen

            if (this.element.hasClass('u-header--abs-bottom') || this.element.hasClass('u-header--abs-top-2nd-screen')) {
                observers['xs'].push(
                    new HSHeaderStickObserver(this.element)
                );

                if (this.element.hasClass('u-header--change-appearance')) {
                    observers['xs'].push(
                        new HSHeaderChangeAppearanceObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }

                if (this.element.hasClass('u-header--change-logo')) {
                    observers['xs'].push(
                        new HSHeaderChangeLogoObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }
            }

            /* ------------------------ sm -------------------------*/

            // Sticky top

            // Has Hidden Element
            if (this.element.hasClass('u-header--has-hidden-element--sm')) {
                observers['sm'].push(
                    new HSHeaderHasHiddenElement(this.element)
                );
            }

            if (this.element.hasClass('u-header--sticky-top--sm')) {
                if (this.element.hasClass('u-header--show-hide--sm')) {
                    observers['sm'].push(
                        new HSHeaderMomentShowHideObserver(this.element)
                    );
                }
                else if (this.element.hasClass('u-header--toggle-section--sm')) {
                    observers['sm'].push(
                        new HSHeaderHideSectionObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-logo--sm')) {
                    observers['sm'].push(
                        new HSHeaderChangeLogoObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-appearance--sm')) {
                    observers['sm'].push(
                        new HSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }

            // Floating

            if (this.element.hasClass('u-header--floating--sm')) {
                observers['sm'].push(
                    new HSHeaderFloatingObserver(this.element)
                );
            }

            if (this.element.hasClass('u-header--invulnerable--sm')) {
                observers['sm'].push(
                    new HSHeaderWithoutBehaviorObserver(this.element)
                );
            }

            // Sticky bottom

            if (this.element.hasClass('u-header--sticky-bottom--sm')) {
                if (this.element.hasClass('u-header--change-appearance--sm')) {
                    observers['sm'].push(
                        new HSHeaderChangeAppearanceObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-logo--sm')) {
                    observers['sm'].push(
                        new HSHeaderChangeLogoObserver(this.element)
                    );
                }
            }

            // Abs top & Static

            if (this.element.hasClass('u-header--abs-top--sm') || this.element.hasClass('u-header--static--sm')) {
                if (this.element.hasClass('u-header--show-hide--sm')) {
                    observers['sm'].push(
                        new HSHeaderShowHideObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-logo--sm')) {
                    observers['sm'].push(
                        new HSHeaderChangeLogoObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-appearance--sm')) {
                    observers['sm'].push(
                        new HSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }

            // Abs bottom & Abs top 2nd screen

            if (this.element.hasClass('u-header--abs-bottom--sm') || this.element.hasClass('u-header--abs-top-2nd-screen--sm')) {
                observers['sm'].push(
                    new HSHeaderStickObserver(this.element)
                );

                if (this.element.hasClass('u-header--change-appearance--sm')) {
                    observers['sm'].push(
                        new HSHeaderChangeAppearanceObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }

                if (this.element.hasClass('u-header--change-logo--sm')) {
                    observers['sm'].push(
                        new HSHeaderChangeLogoObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }
            }

            /* ------------------------ md -------------------------*/

            // Has Hidden Element
            if (this.element.hasClass('u-header--has-hidden-element--md')) {
                observers['md'].push(
                    new HSHeaderHasHiddenElement(this.element)
                );
            }

            // Sticky top

            if (this.element.hasClass('u-header--sticky-top--md')) {
                if (this.element.hasClass('u-header--show-hide--md')) {
                    observers['md'].push(
                        new HSHeaderMomentShowHideObserver(this.element)
                    );
                }
                else if (this.element.hasClass('u-header--toggle-section--md')) {
                    observers['md'].push(
                        new HSHeaderHideSectionObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-logo--md')) {
                    observers['md'].push(
                        new HSHeaderChangeLogoObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-appearance--md')) {
                    observers['md'].push(
                        new HSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }

            // Floating

            if (this.element.hasClass('u-header--floating--md')) {
                observers['md'].push(
                    new HSHeaderFloatingObserver(this.element)
                );
            }

            if (this.element.hasClass('u-header--invulnerable--md')) {
                observers['md'].push(
                    new HSHeaderWithoutBehaviorObserver(this.element)
                );
            }

            // Sticky bottom

            if (this.element.hasClass('u-header--sticky-bottom--md')) {
                if (this.element.hasClass('u-header--change-appearance--md')) {
                    observers['md'].push(
                        new HSHeaderChangeAppearanceObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-logo--md')) {
                    observers['md'].push(
                        new HSHeaderChangeLogoObserver(this.element)
                    );
                }
            }

            // Abs top & Static

            if (this.element.hasClass('u-header--abs-top--md') || this.element.hasClass('u-header--static--md')) {
                if (this.element.hasClass('u-header--show-hide--md')) {
                    observers['md'].push(
                        new HSHeaderShowHideObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-logo--md')) {
                    observers['md'].push(
                        new HSHeaderChangeLogoObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-appearance--md')) {
                    observers['md'].push(
                        new HSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }

            // Abs bottom & Abs top 2nd screen

            if (this.element.hasClass('u-header--abs-bottom--md') || this.element.hasClass('u-header--abs-top-2nd-screen--md')) {
                observers['md'].push(
                    new HSHeaderStickObserver(this.element)
                );

                if (this.element.hasClass('u-header--change-appearance--md')) {
                    observers['md'].push(
                        new HSHeaderChangeAppearanceObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }

                if (this.element.hasClass('u-header--change-logo--md')) {
                    observers['md'].push(
                        new HSHeaderChangeLogoObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }
            }

            /* ------------------------ lg -------------------------*/

            // Has Hidden Element
            if (this.element.hasClass('u-header--has-hidden-element--lg')) {
                observers['lg'].push(
                    new HSHeaderHasHiddenElement(this.element)
                );
            }

            // Sticky top

            if (this.element.hasClass('u-header--sticky-top--lg')) {
                if (this.element.hasClass('u-header--show-hide--lg')) {
                    observers['lg'].push(
                        new HSHeaderMomentShowHideObserver(this.element)
                    );
                }
                else if (this.element.hasClass('u-header--toggle-section--lg')) {
                    observers['lg'].push(
                        new HSHeaderHideSectionObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-logo--lg')) {
                    observers['lg'].push(
                        new HSHeaderChangeLogoObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-appearance--lg')) {
                    observers['lg'].push(
                        new HSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }

            // Floating

            if (this.element.hasClass('u-header--floating--lg')) {
                observers['lg'].push(
                    new HSHeaderFloatingObserver(this.element)
                );
            }

            if (this.element.hasClass('u-header--invulnerable--lg')) {
                observers['lg'].push(
                    new HSHeaderWithoutBehaviorObserver(this.element)
                );
            }

            // Sticky bottom

            if (this.element.hasClass('u-header--sticky-bottom--lg')) {
                if (this.element.hasClass('u-header--change-appearance--lg')) {
                    observers['lg'].push(
                        new HSHeaderChangeAppearanceObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-logo--lg')) {
                    observers['lg'].push(
                        new HSHeaderChangeLogoObserver(this.element)
                    );
                }
            }

            // Abs top & Static

            if (this.element.hasClass('u-header--abs-top--lg') || this.element.hasClass('u-header--static--lg')) {
                if (this.element.hasClass('u-header--show-hide--lg')) {
                    observers['lg'].push(
                        new HSHeaderShowHideObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-logo--lg')) {
                    observers['lg'].push(
                        new HSHeaderChangeLogoObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-appearance--lg')) {
                    observers['lg'].push(
                        new HSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }

            // Abs bottom & Abs top 2nd screen

            if (this.element.hasClass('u-header--abs-bottom--lg') || this.element.hasClass('u-header--abs-top-2nd-screen--lg')) {
                observers['lg'].push(
                    new HSHeaderStickObserver(this.element)
                );

                if (this.element.hasClass('u-header--change-appearance--lg')) {
                    observers['lg'].push(
                        new HSHeaderChangeAppearanceObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }

                if (this.element.hasClass('u-header--change-logo--lg')) {
                    observers['lg'].push(
                        new HSHeaderChangeLogoObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }
            }

            /* ------------------------ xl -------------------------*/

            // Has Hidden Element
            if (this.element.hasClass('u-header--has-hidden-element--xl')) {
                observers['xl'].push(
                    new HSHeaderHasHiddenElement(this.element)
                );
            }

            // Sticky top

            if (this.element.hasClass('u-header--sticky-top--xl')) {
                if (this.element.hasClass('u-header--show-hide--xl')) {
                    observers['xl'].push(
                        new HSHeaderMomentShowHideObserver(this.element)
                    );
                }
                else if (this.element.hasClass('u-header--toggle-section--xl')) {
                    observers['xl'].push(
                        new HSHeaderHideSectionObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-logo--xl')) {
                    observers['xl'].push(
                        new HSHeaderChangeLogoObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-appearance--xl')) {
                    observers['xl'].push(
                        new HSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }

            // Floating

            if (this.element.hasClass('u-header--floating--xl')) {
                observers['xl'].push(
                    new HSHeaderFloatingObserver(this.element)
                );
            }

            // Sticky bottom

            if (this.element.hasClass('u-header--invulnerable--xl')) {
                observers['xl'].push(
                    new HSHeaderWithoutBehaviorObserver(this.element)
                );
            }

            // Sticky bottom

            if (this.element.hasClass('u-header--sticky-bottom--xl')) {
                if (this.element.hasClass('u-header--change-appearance--xl')) {
                    observers['xl'].push(
                        new HSHeaderChangeAppearanceObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-logo--xl')) {
                    observers['xl'].push(
                        new HSHeaderChangeLogoObserver(this.element)
                    );
                }
            }

            // Abs top & Static

            if (this.element.hasClass('u-header--abs-top--xl') || this.element.hasClass('u-header--static--xl')) {
                if (this.element.hasClass('u-header--show-hide--xl')) {
                    observers['xl'].push(
                        new HSHeaderShowHideObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-logo--xl')) {
                    observers['xl'].push(
                        new HSHeaderChangeLogoObserver(this.element)
                    );
                }

                if (this.element.hasClass('u-header--change-appearance--xl')) {
                    observers['xl'].push(
                        new HSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }

            // Abs bottom & Abs top 2nd screen

            if (this.element.hasClass('u-header--abs-bottom--xl') || this.element.hasClass('u-header--abs-top-2nd-screen--xl')) {
                observers['xl'].push(
                    new HSHeaderStickObserver(this.element)
                );

                if (this.element.hasClass('u-header--change-appearance--xl')) {
                    observers['xl'].push(
                        new HSHeaderChangeAppearanceObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }

                if (this.element.hasClass('u-header--change-logo--xl')) {
                    observers['xl'].push(
                        new HSHeaderChangeLogoObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }
            }

            return observers;
        },

        /**
         *
         *
         * @param
         *
         * @return
         */
        fixMediaDifference: function (element) {
            if (!element || !element.length || !element.filter('[class*="u-header--side"]').length) return;

            var toggleable;

            if (element.hasClass('u-header--side-left--xl') || element.hasClass('u-header--side-right--xl')) {
                toggleable = element.find('.navbar-expand-xl');

                if (toggleable.length) {
                    toggleable
                        .removeClass('navbar-expand-xl')
                        .addClass('navbar-expand-lg');
                }
            }
            else if (element.hasClass('u-header--side-left--lg') || element.hasClass('u-header--side-right--lg')) {
                toggleable = element.find('.navbar-expand-lg');

                if (toggleable.length) {
                    toggleable
                        .removeClass('navbar-expand-lg')
                        .addClass('navbar-expand-md');
                }
            }
            else if (element.hasClass('u-header--side-left--md') || element.hasClass('u-header--side-right--md')) {
                toggleable = element.find('.navbar-expand-md');

                if (toggleable.length) {
                    toggleable
                        .removeClass('navbar-expand-md')
                        .addClass('navbar-expand-sm');
                }
            }
            else if (element.hasClass('u-header--side-left--sm') || element.hasClass('u-header--side-right--sm')) {
                toggleable = element.find('.navbar-expand-sm');

                if (toggleable.length) {
                    toggleable
                        .removeClass('navbar-expand-sm')
                        .addClass('navbar-expand');
                }
            }
        }
    }

    /**
     * HSHeader constructor function.
     *
     * @param jQuery element
     * @param Object config
     * @param Object observers
     *
     * @return undefined
     */
    function HSHeader(element, config, observers) {
        if (!element || !element.length) return;

        this.element = element;
        this.config = config;

        this.observers = observers && $.isPlainObject(observers) ? observers : {};

        this.viewport = 'xs';
        this.checkViewport();
    }

    /**
     *
     *
     * @return Object
     */
    HSHeader.prototype.checkViewport = function () {
        var $w = $(window);

        if ($w.width() > this.config.breakpointsMap['sm'] && this.observers['sm'].length) {
            this.prevViewport = this.viewport;
            this.viewport = 'sm';
            return this;
        }

        if ($w.width() > this.config.breakpointsMap['md'] && this.observers['md'].length) {
            this.prevViewport = this.viewport;
            this.viewport = 'md';
            return this;
        }

        if ($w.width() > this.config.breakpointsMap['lg'] && this.observers['lg'].length) {
            this.prevViewport = this.viewport;
            this.viewport = 'lg';
            return this;
        }

        if ($w.width() > this.config.breakpointsMap['xl'] && this.observers['xl'].length) {
            this.prevViewport = this.viewport;
            this.viewport = 'xl';
            return this;
        }

        if (this.prevViewport) this.prevViewport = this.viewport;
        this.viewport = 'xs';

        return this;
    }

    /**
     * Notifies all observers.
     *
     * @return Object
     */
    HSHeader.prototype.notify = function () {
        if (this.prevViewport) {
            this.observers[this.prevViewport].forEach(function (observer) {
                observer.destroy();
            });
            this.prevViewport = null;
        }

        this.observers[this.viewport].forEach(function (observer) {
            observer.check();
        });

        return this;
    }

    /**
     * Reinit all header's observers.
     *
     * @return Object
     */
    HSHeader.prototype.update = function () {
        // if( this.prevViewport ) {
        //   this.observers[this.prevViewport].forEach(function(observer){
        //     observer.destroy();
        //   });
        //   this.prevViewport = null;
        // }

        for (var viewport in this.observers) {
            this.observers[viewport].forEach(function (observer) {
                observer.destroy();
            });
        }

        this.prevViewport = null;

        this.observers[this.viewport].forEach(function (observer) {
            observer.reinit();
        });

        return this;
    }

    /**
     * Abstract constructor function for each observer.
     *
     * @param jQuery element
     *
     * @return Boolean|undefined
     */
    function HSAbstractObserver(element) {
        if (!element || !element.length) return;

        this.element = element;
        this.defaultState = true;

        this.reinit = function () {
            this
                .destroy()
                .init()
                .check();
        }

        return true;
    }

    /**
     * Header's observer which is responsible for 'sticky' behavior.
     *
     * @param jQuery element
     */
    function HSHeaderStickObserver(element) {
        if (!HSAbstractObserver.call(this, element)) return;

        this.init();
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderStickObserver.prototype.init = function () {
        this.defaultState = true;
        this.offset = this.element.offset().top;

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderStickObserver.prototype.destroy = function () {
        this.toDefaultState();

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderStickObserver.prototype.check = function () {
        var $w = $(window),
            docScrolled = $w.scrollTop();

        if (docScrolled > this.offset && this.defaultState) {
            this.changeState();
        }
        else if (docScrolled < this.offset && !this.defaultState) {
            this.toDefaultState();
        }

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderStickObserver.prototype.changeState = function () {
        this.element.addClass('js-header-fix-moment');
        this.defaultState = !this.defaultState;

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderStickObserver.prototype.toDefaultState = function () {
        this.element.removeClass('js-header-fix-moment');
        this.defaultState = !this.defaultState;

        return this;
    }

    /**
     * Header's observer which is responsible for 'show/hide' behavior which is depended on scroll direction.
     *
     * @param jQuery element
     */
    function HSHeaderMomentShowHideObserver(element) {
        if (!HSAbstractObserver.call(this, element)) return;

        this.init();
    }

    /**
     *
     *
     * @return Object
     */
    HSHeaderMomentShowHideObserver.prototype.init = function () {
        this.direction = 'down';
        this.delta = 0;
        this.defaultState = true;

        this.offset = isFinite(this.element.data('header-fix-moment')) && this.element.data('header-fix-moment') != 0 ? this.element.data('header-fix-moment') : 5;
        this.effect = this.element.data('header-fix-effect') ? this.element.data('header-fix-effect') : 'show-hide';

        return this;
    }

    /**
     *
     *
     * @return Object
     */
    HSHeaderMomentShowHideObserver.prototype.destroy = function () {
        this.toDefaultState();

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return Object
     */
    HSHeaderMomentShowHideObserver.prototype.checkDirection = function () {
        if ($(window).scrollTop() > this.delta) {
            this.direction = 'down';
        }
        else {
            this.direction = 'up';
        }

        this.delta = $(window).scrollTop();

        return this;
    }

    /**
     *
     *
     * @return Object
     */
    HSHeaderMomentShowHideObserver.prototype.toDefaultState = function () {
        switch (this.effect) {
            case 'slide':
                this.element.removeClass('u-header--moved-up');
                break;

            case 'fade':
                this.element.removeClass('u-header--faded');
                break;

            default:
                this.element.removeClass('u-header--invisible');
        }

        this.defaultState = !this.defaultState;

        return this;
    }

    /**
     *
     *
     * @return Object
     */
    HSHeaderMomentShowHideObserver.prototype.changeState = function () {
        switch (this.effect) {
            case 'slide':
                this.element.addClass('u-header--moved-up');
                break;

            case 'fade':
                this.element.addClass('u-header--faded');
                break;

            default:
                this.element.addClass('u-header--invisible');
        }

        this.defaultState = !this.defaultState;

        return this;
    }

    /**
     *
     *
     * @return Object
     */
    HSHeaderMomentShowHideObserver.prototype.check = function () {
        var docScrolled = $(window).scrollTop();
        this.checkDirection();

        if (docScrolled >= this.offset && this.defaultState && this.direction == 'down') {
            this.changeState();
        }
        else if (!this.defaultState && this.direction == 'up') {
            this.toDefaultState();
        }

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    function HSHeaderShowHideObserver(element) {
        if (!HSAbstractObserver.call(this, element)) return;

        this.init();
    }

    /**
     *
     *
     * @param
     *
     * @return Object
     */
    HSHeaderShowHideObserver.prototype.init = function () {
        if (!this.defaultState && $(window).scrollTop() > this.offset) return this;

        this.defaultState = true;
        this.transitionDuration = parseFloat(getComputedStyle(this.element.get(0))['transition-duration'], 10) * 1000;

        this.offset = isFinite(this.element.data('header-fix-moment')) && this.element.data('header-fix-moment') > this.element.outerHeight() ? this.element.data('header-fix-moment') : this.element.outerHeight() + 100;
        this.effect = this.element.data('header-fix-effect') ? this.element.data('header-fix-effect') : 'show-hide';

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return Object
     */
    HSHeaderShowHideObserver.prototype.destroy = function () {
        if (!this.defaultState && $(window).scrollTop() > this.offset) return this;

        this.element.removeClass('u-header--untransitioned');
        this._removeCap();

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderShowHideObserver.prototype._insertCap = function () {
        this.element.addClass('js-header-fix-moment u-header--untransitioned');

        if (this.element.hasClass('u-header--static')) {
            $('html').css('padding-top', this.element.outerHeight());
        }

        switch (this.effect) {
            case 'fade':
                this.element.addClass('u-header--faded');
                break;

            case 'slide':
                this.element.addClass('u-header--moved-up');
                break;

            default:
                this.element.addClass('u-header--invisible')
        }

        this.capInserted = true;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderShowHideObserver.prototype._removeCap = function () {
        var self = this;

        this.element.removeClass('js-header-fix-moment');

        if (this.element.hasClass('u-header--static')) {
            $('html').css('padding-top', 0);
        }

        if (this.removeCapTimeOutId) clearTimeout(this.removeCapTimeOutId);

        this.removeCapTimeOutId = setTimeout(function () {
            self.element.removeClass('u-header--moved-up u-header--faded u-header--invisible');
        }, 10);

        this.capInserted = false;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderShowHideObserver.prototype.check = function () {
        var $w = $(window);

        if ($w.scrollTop() > this.element.outerHeight() && !this.capInserted) {
            this._insertCap();
        }
        else if ($w.scrollTop() <= this.element.outerHeight() && this.capInserted) {
            this._removeCap();
        }

        if ($w.scrollTop() > this.offset && this.defaultState) {
            this.changeState();
        }
        else if ($w.scrollTop() <= this.offset && !this.defaultState) {
            this.toDefaultState();
        }
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderShowHideObserver.prototype.changeState = function () {
        this.element.removeClass('u-header--untransitioned');

        if (this.animationTimeoutId) clearTimeout(this.animationTimeoutId);

        switch (this.effect) {
            case 'fade':
                this.element.removeClass('u-header--faded');
                break;

            case 'slide':
                this.element.removeClass('u-header--moved-up');
                break;

            default:
                this.element.removeClass('u-header--invisible');
        }

        this.defaultState = !this.defaultState;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderShowHideObserver.prototype.toDefaultState = function () {
        var self = this;

        this.animationTimeoutId = setTimeout(function () {
            self.element.addClass('u-header--untransitioned');
        }, this.transitionDuration);

        switch (this.effect) {
            case 'fade':
                this.element.addClass('u-header--faded');
                break;
            case 'slide':
                this.element.addClass('u-header--moved-up');
                break;
            default:
                this.element.addClass('u-header--invisible');
        }

        this.defaultState = !this.defaultState;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    function HSHeaderChangeLogoObserver(element, config) {
        if (!HSAbstractObserver.call(this, element)) return;

        this.config = {
            fixPointSelf: false
        }

        if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config);

        this.init();
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeLogoObserver.prototype.init = function () {
        if (this.element.hasClass('js-header-fix-moment')) {
            this.hasFixedClass = true;
            this.element.removeClass('js-header-fix-moment');
        }
        if (this.config.fixPointSelf) {
            this.offset = this.element.offset().top;
        }
        else {
            this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 0;
        }
        if (this.hasFixedClass) {
            this.hasFixedClass = false;
            this.element.addClass('js-header-fix-moment');
        }

        this.imgs = this.element.find('.u-header__logo-img');
        this.defaultState = true;

        this.mainLogo = this.imgs.filter('.u-header__logo-img--main');
        this.additionalLogo = this.imgs.not('.u-header__logo-img--main');

        if (!this.imgs.length) return this;

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeLogoObserver.prototype.destroy = function () {
        this.toDefaultState();

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeLogoObserver.prototype.check = function () {
        var $w = $(window);

        if (!this.imgs.length) return this;

        if ($w.scrollTop() > this.offset && this.defaultState) {
            this.changeState();
        }
        else if ($w.scrollTop() <= this.offset && !this.defaultState) {
            this.toDefaultState();
        }

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeLogoObserver.prototype.changeState = function () {
        if (this.mainLogo.length) {
            this.mainLogo.removeClass('u-header__logo-img--main');
        }
        if (this.additionalLogo.length) {
            this.additionalLogo.addClass('u-header__logo-img--main');
        }

        this.defaultState = !this.defaultState;

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeLogoObserver.prototype.toDefaultState = function () {
        if (this.mainLogo.length) {
            this.mainLogo.addClass('u-header__logo-img--main');
        }
        if (this.additionalLogo.length) {
            this.additionalLogo.removeClass('u-header__logo-img--main');
        }

        this.defaultState = !this.defaultState;

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    function HSHeaderHideSectionObserver(element) {
        if (!HSAbstractObserver.call(this, element)) return;

        this.init();
    }

    /**
     *
     *
     * @param
     *
     * @return Object
     */
    HSHeaderHideSectionObserver.prototype.init = function () {
        this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 5;
        this.section = this.element.find('.u-header__section--hidden');
        this.defaultState = true;

        this.sectionHeight = this.section.length ? this.section.outerHeight() : 0;

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHideSectionObserver.prototype.destroy = function () {
        if (this.section.length) {
            this.element.css({
                'margin-top': 0
            });
        }

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHideSectionObserver.prototype.check = function () {
        if (!this.section.length) return this;

        var $w = $(window),
            docScrolled = $w.scrollTop();

        if (docScrolled > this.offset && this.defaultState) {
            this.changeState();
        }
        else if (docScrolled <= this.offset && !this.defaultState) {
            this.toDefaultState();
        }

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHideSectionObserver.prototype.changeState = function () {
        var self = this;

        this.element.stop().animate({
            'margin-top': self.sectionHeight * -1 - 1 // last '-1' is a small fix
        });

        this.defaultState = !this.defaultState;
        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHideSectionObserver.prototype.toDefaultState = function () {
        this.element.stop().animate({
            'margin-top': 0
        });

        this.defaultState = !this.defaultState;
        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    function HSHeaderChangeAppearanceObserver(element, config) {
        if (!HSAbstractObserver.call(this, element)) return;

        this.config = {
            fixPointSelf: false
        }

        if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config);

        this.init();
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeAppearanceObserver.prototype.init = function () {
        if (this.element.hasClass('js-header-fix-moment')) {
            this.hasFixedClass = true;
            this.element.removeClass('js-header-fix-moment');
        }

        if (this.config.fixPointSelf) {
            this.offset = this.element.offset().top;
        }
        else {
            this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 5;
        }

        if (this.hasFixedClass) {
            this.hasFixedClass = false;
            this.element.addClass('js-header-fix-moment');
        }

        this.sections = this.element.find('[data-header-fix-moment-classes]');

        this.defaultState = true;

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeAppearanceObserver.prototype.destroy = function () {
        this.toDefaultState();

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeAppearanceObserver.prototype.check = function () {
        if (!this.sections.length) return this;

        var $w = $(window),
            docScrolled = $w.scrollTop();

        if (docScrolled > this.offset && this.defaultState) {
            this.changeState();
        }
        else if (docScrolled <= this.offset && !this.defaultState) {
            this.toDefaultState();
        }

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeAppearanceObserver.prototype.changeState = function () {
        this.sections.each(function (i, el) {
            var $this = $(el),
                classes = $this.data('header-fix-moment-classes'),
                exclude = $this.data('header-fix-moment-exclude');

            if (!classes && !exclude) return;

            $this.addClass(classes + ' js-header-change-moment');
            $this.removeClass(exclude);
        });

        this.defaultState = !this.defaultState;
        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeAppearanceObserver.prototype.toDefaultState = function () {
        this.sections.each(function (i, el) {
            var $this = $(el),
                classes = $this.data('header-fix-moment-classes'),
                exclude = $this.data('header-fix-moment-exclude');

            if (!classes && !exclude) return;

            $this.removeClass(classes + ' js-header-change-moment');
            $this.addClass(exclude);
        });

        this.defaultState = !this.defaultState;
        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    function HSHeaderHasHiddenElement(element, config) {
        if (!HSAbstractObserver.call(this, element)) return;

        this.config = {
            animated: true
        }

        if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config);

        this.init();
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHasHiddenElement.prototype.init = function () {
        this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 5;
        this.elements = this.element.find('.u-header--hidden-element');
        this.defaultState = true;
        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHasHiddenElement.prototype.destroy = function () {
        this.toDefaultState();

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHasHiddenElement.prototype.check = function () {
        if (!this.elements.length) return this;

        var $w = $(window),
            docScrolled = $w.scrollTop();

        if (docScrolled > this.offset && this.defaultState) {
            this.changeState();
        }
        else if (docScrolled <= this.offset && !this.defaultState) {
            this.toDefaultState();
        }

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHasHiddenElement.prototype.changeState = function () {
        if (this.config.animated) {
            this.elements.stop().slideUp();
        }
        else {
            this.elements.hide();
        }

        this.defaultState = !this.defaultState;
        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHasHiddenElement.prototype.toDefaultState = function () {
        if (this.config.animated) {
            this.elements.stop().slideDown();
        }
        else {
            this.elements.show();
        }

        this.defaultState = !this.defaultState;
        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    function HSHeaderFloatingObserver(element, config) {
        if (!HSAbstractObserver.call(this, element)) return;

        this.config = config && $.isPlainObject(config) ? $.extend(true, {}, this.config, config) : {};
        this.init();
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderFloatingObserver.prototype.init = function () {
        this.offset = this.element.offset().top;
        this.sections = this.element.find('.u-header__section');

        this.defaultState = true;

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderFloatingObserver.prototype.destroy = function () {
        this.toDefaultState();

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderFloatingObserver.prototype.check = function () {
        var $w = $(window),
            docScrolled = $w.scrollTop();

        if (docScrolled > this.offset && this.defaultState) {
            this.changeState();
        }
        else if (docScrolled <= this.offset && !this.defaultState) {
            this.toDefaultState();
        }

        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderFloatingObserver.prototype.changeState = function () {
        this.element
            .addClass('js-header-fix-moment')
            .addClass(this.element.data('header-fix-moment-classes'))
            .removeClass(this.element.data('header-fix-moment-exclude'));

        if (this.sections.length) {
            this.sections.each(function (i, el) {
                var $section = $(el);

                $section.addClass($section.data('header-fix-moment-classes'))
                    .removeClass($section.data('header-fix-moment-exclude'));
            });
        }

        this.defaultState = !this.defaultState;
        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderFloatingObserver.prototype.toDefaultState = function () {
        this.element
            .removeClass('js-header-fix-moment')
            .removeClass(this.element.data('header-fix-moment-classes'))
            .addClass(this.element.data('header-fix-moment-exclude'));

        if (this.sections.length) {
            this.sections.each(function (i, el) {
                var $section = $(el);

                $section.removeClass($section.data('header-fix-moment-classes'))
                    .addClass($section.data('header-fix-moment-exclude'));
            });
        }

        this.defaultState = !this.defaultState;
        return this;
    }

    /**
     *
     *
     * @param
     *
     * @return
     */
    function HSHeaderWithoutBehaviorObserver(element) { if (!HSAbstractObserver.call(this, element)) return; }

    HSHeaderWithoutBehaviorObserver.prototype.check = function () {
        return this;
    }

    HSHeaderWithoutBehaviorObserver.prototype.init = function () {
        return this;
    }

    HSHeaderWithoutBehaviorObserver.prototype.destroy = function () {
        return this;
    }

    HSHeaderWithoutBehaviorObserver.prototype.changeState = function () {
        return this;
    }

    HSHeaderWithoutBehaviorObserver.prototype.toDefaultState = function () {
        return this;
    }
})(jQuery);
/**
 * Hamburgers plugin helper.
 *
 * @author Htmlstream
 * @version 1.0
 * @requires hamburgers.min.css
 *
 */
; (function ($) {
    'use strict';

    $.HSCore.helpers.HSHamburgers = {
		/**
		 * Initialize 'hamburgers' plugin.
		 *
		 * @param String selector
		 *
		 * @return undefined;
		 */
        init: function (selector) {
            if (!selector || !$(selector).length) return;

            var hamburgers = $(selector),
                timeoutid;

            hamburgers.each(function (i, el) {
                var $this = $(this);

                if ($this.closest('button').length) {
                    $this.closest('button').get(0).addEventListener('click', function (e) {
                        var $self = $(this),
                            $hamburger = $self.find(selector);

                        if (timeoutid) clearTimeout(timeoutid);
                        timeoutid = setTimeout(function () {
                            $hamburger.toggleClass('is-active');
                        }, 10);
                        e.preventDefault();
                    }, false);
                }
                else {
                    $this.get(0).addEventListener('click', function (e) {
                        var $self = $(this);

                        if (timeoutid) clearTimeout(timeoutid);
                        timeoutid = setTimeout(function () {
                            $self.toggleClass('is-active');
                        }, 10);
                        e.preventDefault();
                    }, false);
                }
            });
        }
    };
})(jQuery);
/**
 * Tabs wrapper.
 *
 * @author Htmlstream
 * @version 1.0
 * @requires
 *
 */
; (function ($) {
    'use strict';

    $.HSCore.components.HSTabs = {
        /**
         *
         *
         * @var Object _baseConfig
         */
        _baseConfig: {},

        /**
         *
         *
         * @var jQuery pageCollection
         */
        pageCollection: $(),

        /**
         * Initialization of Tabs wrapper.
         *
         * @param String selector (optional)
         * @param Object config (optional)
         *
         * @return jQuery pageCollection - collection of initialized items.
         */

        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;

            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;

            this.config.itemSelector = selector;

            this.initTabs();

            return this.pageCollection;
        },

        initTabs: function () {
            //Variables
            var $self = this,
                collection = $self.pageCollection;

            //Actions
            this.collection.each(function (i, el) {
                //Variables
                var windW = $(window).width(),
                    //Tabs
                    $tabs = $(el),
                    $tabsItem = $tabs.find('.nav-item'),
                    tabsType = $tabs.data('tabs-mobile-type'), //[slide-up-down], [accordion], [hide-extra-items]
                    controlClasses = $tabs.data('btn-classes'),
                    context = $tabs.parent(),

                    //Tabs Content
                    $tabsContent = $('#' + $tabs.data('target')),
                    $tabsContentItem = $tabsContent.find('.tab-pane');

                if (windW < 767) {
                    $('body').on('click', function () {
                        if (tabsType) {
                            $tabs.slideUp(200);
                        } else {
                            $tabs.find('.nav-inner').slideUp(200);
                        }
                    });
                } else {
                    $('body').off('click');
                }

                if (windW > 767 && tabsType) {
                    $tabs.removeAttr('style');
                    $tabsContentItem.removeAttr('style');
                    context.off('click', '.js-tabs-mobile-control');
                    context.off('click', '[role="tab"]');
                    if (tabsType == 'accordion') {
                        $tabsContent.find('.js-tabs-mobile-control').remove();
                    } else {
                        context.find('.js-tabs-mobile-control').remove();
                    }
                    return;
                }

                if (windW < 768 && tabsType == 'accordion') {
                    $self.accordionEffect($tabsContent, $tabsItem, $tabsContentItem, controlClasses);
                } else if (windW < 768 && tabsType == 'slide-up-down') {
                    $self.slideUpDownEffect(context, $tabs, controlClasses);
                }

                //Actions
                collection = collection.add($tabs);
            });
        },

        slideUpDownEffect: function (context, menu, btnClasses) {
            if (context.find('.js-tabs-mobile-control').length) return;

            //Create control
            var activeItemHTML = menu.find('.active').html();

            $(menu).before('<a class="js-tabs-mobile-control ' + btnClasses + '" href="#">' + activeItemHTML + '</a>');

            /*----- CLICK -----*/
            context.on('click', '.js-tabs-mobile-control', function (e) {
                e.stopPropagation();
                e.preventDefault();

                $(menu).slideToggle(200);
            });

            context.on('click', '[role="tab"]', function (e) {
                e.preventDefault();

                var thisHTML = $(this).html(),
                    $targetControl = $(this).closest('ul').prev('.js-tabs-mobile-control');

                $targetControl.html(thisHTML);
                $(menu).slideUp(200);
            });
        },

        accordionEffect: function (context, menuItem, menu, btnClasses) {
            if (context.find('.js-tabs-mobile-control').length) return;

            //Create control
            $(menu).before('<a class="js-tabs-mobile-control ' + btnClasses + '" href="#"></a>');

            menuItem.each(function () {
                var thisIndex = $(this).index(),
                    thisHTML = $(this).find('[role="tab"]').html();

                if ($(this).find('[role="tab"]').hasClass('active')) {
                    $(menu[thisIndex]).prev().addClass('active');
                }

                $(menu[thisIndex]).prev().html(thisHTML);
            });

            /*----- CLICK -----*/
            context.on('click', '.js-tabs-mobile-control', function (e) {
                e.preventDefault();

                if ($(this).hasClass('active')) return;

                var contextID = context.attr('id');

                context.find('.js-tabs-mobile-control').removeClass('active');

                $('[data-target="' + contextID + '"]').find('.nav-link').removeClass('active');
                var $target = $(this).next(),
                    targetID = $target.attr('id');

                if ($target.hasClass('fade')) {
                    $(this).addClass('active');
                    $('[href="#' + targetID + '"]').addClass('active');

                    $(menu)
                        .slideUp(200);
                    $target
                        .slideDown(200, function () {
                            context.find('[role="tabpanel"]').removeClass('show active');
                            $target.addClass('show active');
                        });
                } else {
                    $(this).addClass('active');
                    $(menu).slideUp(200);
                    $target.slideDown(200);
                }
            });
        }
    }
})(jQuery);

/**
 * Fancybox wrapper.
 *
 * @author Htmlstream
 * @version 1.0
 * @requires
 *
 */
;
(function ($) {
    'use strict';

    $.HSCore.components.HSPopup = {
		/**
		 *
		 *
		 * @var Object _baseConfig
		 */
        _baseConfig: {
            parentEl: 'html',
            baseClass: 'u-fancybox-theme',
            slideClass: 'u-fancybox-slide',
            speed: 1000,
            slideSpeedCoefficient: 1,
            infobar: false,
            fullScreen: true,
            thumbs: true,
            closeBtn: true,
            baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                '<div class="fancybox-content">' +
                '<div class="fancybox-bg"></div>' +
                '<div class="fancybox-controls" style="position: relative; z-index: 99999;">' +
                '<div class="fancybox-infobar">' +
                '<div class="fancybox-infobar__body">' +
                '<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>' +
                '</div>' +
                '</div>' +
                '<div class="fancybox-toolbar">{{BUTTONS}}</div>' +
                '</div>' +
                '<div class="fancybox-slider-wrap">' +
                '<button data-fancybox-prev class="fancybox-arrow fancybox-arrow--left" title="Previous"></button>' +
                '<button data-fancybox-next class="fancybox-arrow fancybox-arrow--right" title="Next"></button>' +
                '<div class="fancybox-stage"></div>' +
                '</div>' +
                '<div class="fancybox-caption-wrap">' +
                '<div class="fancybox-caption"></div>' +
                '</div>' +
                '</div>' +
                '</div>',
            animationEffect: 'fade'
        },

		/**
		 *
		 *
		 * @var jQuery pageCollection
		 */
        pageCollection: $(),

		/**
		 * Initialization of Fancybox wrapper.
		 *
		 * @param String selector (optional)
		 * @param Object config (optional)
		 *
		 * @return jQuery pageCollection - collection of initialized items.
		 */

        init: function (selector, config) {
            if (!selector) return;

            var $collection = $(selector);

            if (!$collection.length) return;

            config = config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig;

            this.initPopup(selector, config);
        },

        initPopup: function (el, conf) {
            var $fancybox = $(el);

            $fancybox.on('click', function () {
                var $this = $(this),
                    animationDuration = $this.data('speed'),
                    isGroup = $this.data('fancybox'),
                    isInfinite = Boolean($this.data('is-infinite')),
                    slideShowSpeed = $this.data('slideshow-speed');

                $.fancybox.defaults.animationDuration = animationDuration;

                if (isInfinite == true) {
                    $.fancybox.defaults.loop = true;
                }

                if (isGroup) {
                    $.fancybox.defaults.transitionEffect = 'slide';
                    $.fancybox.defaults.slideShow.speed = slideShowSpeed;
                }
            });

            $fancybox.fancybox($.extend(true, {}, conf, {
                beforeShow: function (instance, slide) {
                    var $fancyModal = $(instance.$refs.container),
                        $fancyOverlay = $(instance.$refs.bg[0]),
                        $fancySlide = $(instance.current.$slide),

                        animateIn = instance.current.opts.$orig[0].dataset.animateIn,
                        animateOut = instance.current.opts.$orig[0].dataset.animateOut,
                        speed = instance.current.opts.$orig[0].dataset.speed,
                        overlayBG = instance.current.opts.$orig[0].dataset.overlayBg,
                        overlayBlurBG = instance.current.opts.$orig[0].dataset.overlayBlurBg;

                    if (animateIn && $('body').hasClass('u-first-slide-init')) {
                        var $fancyPrevSlide = $(instance.slides[instance.prevPos].$slide);

                        $fancySlide.addClass('has-animation');

                        $fancyPrevSlide.addClass('animated ' + animateOut);

                        setTimeout(function () {
                            $fancySlide.addClass('animated ' + animateIn);
                        }, speed / 2);
                    } else if (animateIn) {
                        var $fancyPrevSlide = $(instance.slides[instance.prevPos].$slide);

                        $fancySlide.addClass('has-animation');

                        $fancySlide.addClass('animated ' + animateIn);

                        $('body').addClass('u-first-slide-init');
                    }

                    if (speed) {
                        $fancyOverlay.css('transition-duration', speed + 'ms');
                    } else {
                        $fancyOverlay.css('transition-duration', '1000ms');
                    }

                    if (overlayBG) {
                        $fancyOverlay.css('background-color', overlayBG);
                    }

                    if (overlayBlurBG) {
                        $('body').addClass('g-blur-30');
                    }
                },

                beforeClose: function (instance, slide) {
                    var $fancyModal = $(instance.$refs.container),
                        $fancySlide = $(instance.current.$slide),

                        animateIn = instance.current.opts.$orig[0].dataset.animateIn,
                        animateOut = instance.current.opts.$orig[0].dataset.animateOut,
                        overlayBlurBG = instance.current.opts.$orig[0].dataset.overlayBlurBg;

                    if (animateOut) {
                        $fancySlide.removeClass(animateIn).addClass(animateOut);
                        $('body').removeClass('u-first-slide-init')
                    }

                    if (overlayBlurBG) {
                        $('body').removeClass('g-blur-30')
                    }
                }
            }));
        }
    }
})(jQuery);

/**
 * Carousel wrapper.
 *
 * @author Htmlstream
 * @version 1.0
 * @requires
 *
 */
;
(function ($) {
    'use strict';

    $.HSCore.components.HSCarousel = {
		/**
		 *
		 *
		 * @var Object _baseConfig
		 */
        _baseConfig: {
            autoplay: false,
            infinite: true
        },

		/**
		 *
		 *
		 * @var jQuery pageCollection
		 */
        pageCollection: $(),

		/**
		 * Initialization of Carousel wrapper.
		 *
		 * @param String selector (optional)
		 * @param Object config (optional)
		 *
		 * @return jQuery pageCollection - collection of initialized items.
		 */
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;

            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;

            this.config.itemSelector = selector;

            this.initCarousel();

            return this.pageCollection;
        },

        initCarousel: function () {
            //Variables
            var $self = this,
                config = $self.config,
                collection = $self.pageCollection;

            //Actions
            this.collection.each(function (i, el) {
                //Variables
                var $this = $(el),
                    id = $this.attr('id'),

                    //Markup elements
                    target = $this.data('nav-for'),
                    isThumb = $this.data('is-thumbs'),
                    arrowsClasses = $this.data('arrows-classes'),
                    arrowLeftClasses = $this.data('arrow-left-classes'),
                    arrowRightClasses = $this.data('arrow-right-classes'),
                    pagiClasses = $this.data('pagi-classes'),
                    pagiHelper = $this.data('pagi-helper'),
                    $pagiIcons = $this.data('pagi-icons'),
                    $prevMarkup = '<div class="js-prev ' + arrowsClasses + ' ' + arrowLeftClasses + '"></div>',
                    $nextMarkup = '<div class="js-next ' + arrowsClasses + ' ' + arrowRightClasses + '"></div>',

                    //Setters
                    setSlidesToShow = $this.data('slides-show'),
                    setSlidesToScroll = $this.data('slides-scroll'),
                    setAutoplay = $this.data('autoplay'),
                    setAnimation = $this.data('animation'),
                    setEasing = $this.data('easing'),
                    setFade = $this.data('fade'),
                    setSpeed = $this.data('speed'),
                    setSlidesRows = $this.data('rows'),
                    setCenterMode = $this.data('center-mode'),
                    setCenterPadding = $this.data('center-padding'),
                    setPauseOnHover = $this.data('pause-hover'),
                    setVariableWidth = $this.data('variable-width'),
                    setInitialSlide = $this.data('initial-slide'),
                    setVertical = $this.data('vertical'),
                    setRtl = $this.data('rtl'),
                    setInEffect = $this.data('in-effect'),
                    setOutEffect = $this.data('out-effect'),
                    setInfinite = $this.data('infinite'),
                    setDataTitlePosition = $this.data('title-pos-inside'),
                    setFocusOnSelect = $this.data('focus-on-select'),
                    setLazyLoad = $this.data('lazy-load'),
                    isAdaptiveHeight = $this.data('adaptive-height'),
                    numberedPaging = $this.data('numbered-pagination'),
                    setResponsive = JSON.parse(el.getAttribute('data-responsive'));

                if ($this.find('[data-slide-type]').length) {
                    $self.videoSupport($this);
                }

                $this.on('init', function (event, slick) {
                    $(slick.$slides).css('height', 'auto');

                    if (isThumb && setSlidesToShow >= $(slick.$slides).length) {
                        $this.addClass('slick-transform-off');
                    }
                });

                if (setInEffect && setOutEffect) {
                    $this.on('init', function (event, slick) {
                        $(slick.$slides).addClass('single-slide');
                    });
                }

                if (pagiHelper) {
                    $this.on('init', function (event, slick) {
                        var $pagination = $this.find('.js-pagination');

                        if (!$pagination.length) return;

                        $pagination.append('<span class="u-dots-helper"></span>');
                    });
                }

                if (isThumb) {
                    $('#' + id).on('click', '.slick-slide', function (e) {
                        e.stopPropagation();

                        //Variables
                        var i = $(this).data('slick-index');

                        if ($('#' + id).slick('slickCurrentSlide') !== i) {
                            $('#' + id).slick('slickGoTo', i);
                        }
                    });
                }

                $this.on('init', function (event, slider) {
                    var $pagination = $this.find('.js-pagination');

                    if (!$pagination.length) return;

                    $($pagination[0].children[0]).addClass('slick-current');
                });

                $this.on('init', function (event, slick) {
                    var slide = $(slick.$slides)[0],
                        animatedElements = $(slide).find('[data-scs-animation-in]');

                    $(animatedElements).each(function () {
                        var animationIn = $(this).data('scs-animation-in');

                        $(this).addClass('animated ' + animationIn).css('opacity', 1);
                    });
                });

                if (numberedPaging) {
                    $this.on('init', function (event, slick) {
                        $(numberedPaging).text('1' + '/' + slick.slideCount);
                    });
                }

                $this.slick({
                    autoplay: setAutoplay ? true : false,
                    autoplaySpeed: setSpeed ? setSpeed : 3000,

                    cssEase: setAnimation ? setAnimation : 'ease',
                    easing: setEasing ? setEasing : 'linear',
                    fade: setFade ? true : false,

                    infinite: setInfinite ? true : false,
                    initialSlide: setInitialSlide ? setInitialSlide - 1 : 0,
                    slidesToShow: setSlidesToShow ? setSlidesToShow : 1,
                    slidesToScroll: setSlidesToScroll ? setSlidesToScroll : 1,
                    centerMode: setCenterMode ? true : false,
                    variableWidth: setVariableWidth ? true : false,
                    pauseOnHover: setPauseOnHover ? true : false,
                    rows: setSlidesRows ? setSlidesRows : 1,
                    vertical: setVertical ? true : false,
                    verticalSwiping: setVertical ? true : false,
                    rtl: setRtl ? true : false,
                    centerPadding: setCenterPadding ? setCenterPadding : 0,
                    focusOnSelect: setFocusOnSelect ? true : false,
                    lazyLoad: setLazyLoad ? setLazyLoad : false,

                    asNavFor: target ? target : false,
                    prevArrow: arrowsClasses ? $prevMarkup : false,
                    nextArrow: arrowsClasses ? $nextMarkup : false,
                    dots: pagiClasses ? true : false,
                    dotsClass: 'js-pagination ' + pagiClasses,
                    adaptiveHeight: !!isAdaptiveHeight,
                    customPaging: function (slider, i) {
                        var title = $(slider.$slides[i]).data('title');

                        if (title && $pagiIcons) {
                            return '<span>' + title + '</span>' + $pagiIcons;
                        } else if ($pagiIcons) {
                            return '<span></span>' + $pagiIcons;
                        } else if (title && setDataTitlePosition) {
                            return '<span>' + title + '</span>';
                        } else if (title && !setDataTitlePosition) {
                            return '<span></span>' + '<strong class="u-dot-title">' + title + '</strong>';
                        } else {
                            return '<span></span>';
                        }
                    },
                    responsive: setResponsive
                });

                $this.on('beforeChange', function (event, slider, currentSlide, nextSlide) {
                    var nxtSlide = $(slider.$slides)[nextSlide],
                        slide = $(slider.$slides)[currentSlide],
                        $pagination = $this.find('.js-pagination'),
                        animatedElements = $(nxtSlide).find('[data-scs-animation-in]'),
                        otherElements = $(slide).find('[data-scs-animation-in]');

                    $(otherElements).each(function () {
                        var animationIn = $(this).data('scs-animation-in');

                        $(this).removeClass('animated ' + animationIn);
                    });

                    $(animatedElements).each(function () {
                        $(this).css('opacity', 0);
                    });

                    if (!$pagination.length) return;

                    if (currentSlide > nextSlide) {
                        $($pagination[0].children).removeClass('slick-active-right');

                        $($pagination[0].children[nextSlide]).addClass('slick-active-right');
                    } else {
                        $($pagination[0].children).removeClass('slick-active-right');
                    }

                    $($pagination[0].children).removeClass('slick-current');

                    setTimeout(function () {
                        $($pagination[0].children[nextSlide]).addClass('slick-current');
                    }, .25);
                });

                if (numberedPaging) {
                    $this.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                        var i = (nextSlide ? nextSlide : 0) + 1;

                        $(numberedPaging).text(i + '/' + slick.slideCount);
                    });
                }

                $this.on('afterChange', function (event, slick, currentSlide, nextSlide) {
                    var slide = $(slick.$slides)[currentSlide],
                        animatedElements = $(slide).find('[data-scs-animation-in]');

                    $(animatedElements).each(function () {
                        var animationIn = $(this).data('scs-animation-in'),
                            animationDelay = $(this).data('scs-animation-delay'),
                            animationDuration = $(this).data('scs-animation-duration');

                        console.log(animationDuration);

                        $(this).css({
                            'animation-delay': animationDelay + 'ms',
                            'animation-duration': animationDuration + 'ms'
                        });

                        $(this).addClass('animated ' + animationIn).css('opacity', 1);
                    });
                });

                if (setInEffect && setOutEffect) {
                    $this.on('afterChange', function (event, slick, currentSlide, nextSlide) {
                        $(slick.$slides).removeClass('animated set-position ' + setInEffect + ' ' + setOutEffect);
                    });

                    $this.on('beforeChange', function (event, slick, currentSlide) {
                        $(slick.$slides[currentSlide]).addClass('animated ' + setOutEffect);
                    });

                    $this.on('setPosition', function (event, slick) {
                        $(slick.$slides[slick.currentSlide]).addClass('animated set-position ' + setInEffect);
                    });
                }

                //Actions
                collection = collection.add($this);
            });
        },

		/**
		 * Implementation of video support.
		 *
		 * @param jQuery carousel
		 * @param String videoSupport
		 *
		 * @return undefined
		 */
        videoSupport: function (carousel) {
            if (!carousel.length) return;

            carousel.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                var slideType = $(slick.$slides[currentSlide]).data('slide-type'),
                    player = $(slick.$slides[currentSlide]).find('iframe').get(0),
                    command;

                if (slideType == 'vimeo') {
                    command = {
                        "method": "pause",
                        "value": "true"
                    }
                } else if (slideType == 'youtube') {
                    command = {
                        "event": "command",
                        "func": "pauseVideo"
                    }
                } else {
                    return false;
                }

                if (player != undefined) {
                    player.contentWindow.postMessage(JSON.stringify(command), '*');
                }
            });
        },

		/**
		 * Implementation of text animation.
		 *
		 * @param jQuery carousel
		 * @param String textAnimationSelector
		 *
		 * @requires charming.js, anime.js, textfx.js
		 *
		 * @return undefined
		 */
        initTextAnimation: function (carousel, textAnimationSelector) {
            if (!window.TextFx || !window.anime || !carousel.length) return;

            var $text = carousel.find(textAnimationSelector);

            if (!$text.length) return;

            $text.each(function (i, el) {
                var $this = $(el);

                if (!$this.data('TextFx')) {
                    $this.data('TextFx', new TextFx($this.get(0)));
                }
            });

            carousel.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                var targets = slick.$slider
                    .find('.slick-track')
                    .children();

                var currentTarget = targets.eq(currentSlide),
                    nextTarget = targets.eq(nextSlide);

                currentTarget = currentTarget.find(textAnimationSelector);
                nextTarget = nextTarget.find(textAnimationSelector);

                if (currentTarget.length) {
                    currentTarget.data('TextFx').hide(currentTarget.data('effect') ? currentTarget.data('effect') : 'fx1');
                }

                if (nextTarget.length) {
                    nextTarget.data('TextFx').show(nextTarget.data('effect') ? nextTarget.data('effect') : 'fx1');
                }
            });
        }
    }
})(jQuery);

/**
 * Go To wrapper.
 *
 * @author Htmlstream
 * @version 1.0
 *
 */
; (function ($) {
    'use strict';
    $.HSCore.components.HSGoTo = {
        /**
         *
         *
         * @var Object _baseConfig
         */
        _baseConfig: {},

        /**
         *
         *
         * @var jQuery pageCollection
         */
        pageCollection: $(),

        /**
         * Initialization of Go To wrapper.
         *
         * @param String selector (optional)
         * @param Object config (optional)
         *
         * @return jQuery pageCollection - collection of initialized items.
         */

        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;

            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;

            this.config.itemSelector = selector;

            this.initGoTo();

            return this.pageCollection;
        },

        initGoTo: function () {
            //Variables
            var $self = this,
                collection = $self.pageCollection;

            //Actions
            this.collection.each(function (i, el) {
                //Variables
                var $this = $(el),
                    $target = $this.data('target'),
                    type = $this.data('type'),
                    showEffect = $this.data('show-effect'),
                    hideEffect = $this.data('hide-effect'),
                    position = JSON.parse(el.getAttribute('data-position')),
                    compensation = $($this.data('compensation')).outerHeight(),
                    offsetTop = $this.data('offset-top'),
                    targetOffsetTop = function () {
                        if (compensation) {
                            return $target ? $($target).offset().top - compensation : 0;
                        } else {
                            return $target ? $($target).offset().top : 0;
                        }
                    };

                if (type == 'static') {
                    $this.css({
                        'display': 'inline-block'
                    });
                } else {
                    $this.addClass('animated').css({
                        'display': 'inline-block',
                        'position': type,
                        'opacity': 0
                    });
                }

                if (type == 'fixed' || type == 'absolute') {
                    $this.css(position);
                }

                $this.on('click', function (e) {
                    e.preventDefault();

                    $('html, body').stop().animate({
                        'scrollTop': targetOffsetTop()
                    }, 800);
                });

                if (!$this.data('offset-top') && !$this.hasClass('js-animation-was-fired') && type != 'static') {
                    if ($this.offset().top <= $(window).height()) {
                        $this.show();

                        setTimeout(function () {
                            $this.addClass('js-animation-was-fired ' + showEffect).css({
                                'opacity': ''
                            });
                        });
                    }
                }

                if (type != 'static') {
                    $(window).on('scroll', function () {
                        if ($this.data('offset-top')) {
                            if ($(window).scrollTop() >= offsetTop && !$this.hasClass('js-animation-was-fired')) {
                                $this.show();

                                setTimeout(function () {
                                    $this.addClass('js-animation-was-fired ' + showEffect).css({
                                        'opacity': ''
                                    });
                                });
                            } else if ($(window).scrollTop() <= offsetTop && $this.hasClass('js-animation-was-fired')) {
                                $this.removeClass('js-animation-was-fired ' + showEffect);

                                setTimeout(function () {
                                    $this.addClass(hideEffect).css({
                                        'opacity': 0
                                    });
                                }, 100);

                                setTimeout(function () {
                                    $this.removeClass(hideEffect).hide();
                                }, 400);
                            }
                        } else {
                            var thisOffsetTop = $this.offset().top;

                            if (!$this.hasClass('js-animation-was-fired')) {
                                if ($(window).scrollTop() >= thisOffsetTop - $(window).height()) {
                                    $this.show();

                                    setTimeout(function () {
                                        $this.addClass('js-animation-was-fired ' + showEffect).css({
                                            'opacity': ''
                                        });
                                    });
                                }
                            }
                        }
                    });

                    $(window).trigger('scroll');
                }

                //Actions
                collection = collection.add($this);
            });
        }
    };
})(jQuery);