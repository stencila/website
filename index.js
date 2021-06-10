(() => {
  // node_modules/@chiiya/haven/dist/esm/_virtual/_rollupPluginBabelHelpers.js
  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly)
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
      return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o) {
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
        var i = 0;
        var F = function() {
        };
        return {
          s: F,
          n: function() {
            if (i >= o.length)
              return {
                done: true
              };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function(e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var it, normalCompletion = true, didErr = false, err;
    return {
      s: function() {
        it = o[Symbol.iterator]();
      },
      n: function() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function(e) {
        didErr = true;
        err = e;
      },
      f: function() {
        try {
          if (!normalCompletion && it.return != null)
            it.return();
        } finally {
          if (didErr)
            throw err;
        }
      }
    };
  }

  // node_modules/@chiiya/haven/dist/esm/cookies/cookies.js
  function decode(value) {
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  }
  var Cookies = /* @__PURE__ */ function() {
    function Cookies2() {
      _classCallCheck(this, Cookies2);
    }
    _createClass(Cookies2, null, [{
      key: "set",
      value: function set(key, value, options) {
        var attributes = this.resolveOptions(options);
        var cookieValue = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        var cookieName = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
        var cookieAttributes = this.encodeAttributes(attributes);
        document.cookie = "".concat(cookieName, "=").concat(cookieValue).concat(cookieAttributes);
      }
    }, {
      key: "get",
      value: function get(key) {
        var cookies = document.cookie ? document.cookie.split("; ") : [];
        var _iterator = _createForOfIteratorHelper(cookies), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var cookie = _step.value;
            var parts = cookie.split("=");
            var _name = decode(parts[0]);
            if (key === _name) {
              var value = parts.slice(1).join("=");
              if (value.charAt(0) === '"') {
                value = value.slice(1, -1);
              }
              value = decode(value);
              return value;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "getAll",
      value: function getAll() {
        var cookies = document.cookie ? document.cookie.split("; ") : [];
        var jar = {};
        var _iterator2 = _createForOfIteratorHelper(cookies), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var cookie = _step2.value;
            var parts = cookie.split("=");
            var _name2 = decode(parts[0]);
            var value = parts.slice(1).join("=");
            if (value.charAt(0) === '"') {
              value = value.slice(1, -1);
            }
            value = decode(value);
            jar[_name2] = value;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        return jar;
      }
    }, {
      key: "remove",
      value: function remove(key) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var attributes = this.resolveOptions(Object.assign(options, {
          expires: -1
        }));
        if (key instanceof RegExp) {
          return this.removeByRegex(key, attributes);
        }
        var cookieAttributes = this.encodeAttributes(attributes);
        document.cookie = "".concat(key, "=''").concat(cookieAttributes);
        this.set(key, "", attributes);
      }
    }, {
      key: "removeByRegex",
      value: function removeByRegex(key, attributes) {
        var _this = this;
        Object.keys(this.getAll()).map(function(name) {
          if (key.test(name)) {
            var cookieAttributes = _this.encodeAttributes(attributes);
            document.cookie = "".concat(name, "=''").concat(cookieAttributes);
            _this.set(name, "", attributes);
          }
        });
      }
    }, {
      key: "encodeAttributes",
      value: function encodeAttributes(attributes) {
        var cookieAttributes = "";
        for (var _i = 0, _Object$keys = Object.keys(attributes); _i < _Object$keys.length; _i++) {
          var _name3 = _Object$keys[_i];
          var attribute = attributes[_name3];
          if (!attribute) {
            continue;
          }
          cookieAttributes += "; ".concat(_name3);
          if (attribute !== true) {
            cookieAttributes += "=".concat(attribute.split(";")[0]);
          }
        }
        return cookieAttributes;
      }
    }, {
      key: "resolveOptions",
      value: function resolveOptions(options) {
        if (options && typeof options.expires === "number") {
          options.expires = new Date(Date.now() + options.expires * 864e5);
        }
        if (options && options.expires instanceof Date) {
          options.expires = options.expires.toUTCString();
        }
        return Object.assign({
          path: "/"
        }, options);
      }
    }]);
    return Cookies2;
  }();
  var cookies_default = Cookies;

  // node_modules/@chiiya/haven/dist/esm/store/event-bus.js
  var EventBus = /* @__PURE__ */ function() {
    function EventBus2() {
      _classCallCheck(this, EventBus2);
      _defineProperty(this, "subscriptions", {});
      _defineProperty(this, "counter", 0);
    }
    _createClass(EventBus2, [{
      key: "on",
      value: function on(event2, callback) {
        var _this = this;
        var id = this.counter += 1;
        if (this.subscriptions[event2] === void 0) {
          this.subscriptions[event2] = {};
        }
        this.subscriptions[event2][id] = callback;
        return {
          unsubscribe: function unsubscribe() {
            delete _this.subscriptions[event2][id];
          }
        };
      }
    }, {
      key: "emit",
      value: function emit(event2, payload) {
        if (this.subscriptions[event2] === void 0) {
          return;
        }
        for (var _i = 0, _Object$keys = Object.keys(this.subscriptions[event2]); _i < _Object$keys.length; _i++) {
          var _id = _Object$keys[_i];
          this.subscriptions[event2][_id](payload);
        }
      }
    }]);
    return EventBus2;
  }();
  var EventBus$1 = new EventBus();
  var event_bus_default = EventBus$1;

  // node_modules/@chiiya/haven/dist/esm/translations/en.yml.js
  var data = {
    notification: {
      message: "This website uses cookies to ensure you get the best experience on our website.",
      policy: "Learn more",
      accept: "Allow cookies",
      decline: "Decline"
    },
    preferences: {description: "This website uses the following cookies:"},
    purposes: {
      functional: {
        name: "Functional",
        description: "Functional cookies are absolutely necessary for core functions such as navigating the page or accessing secure areas. The website cannot function properly without these cookies.\n"
      },
      analytics: {
        name: "Analytics",
        description: "Analytics cookies serve to improve the performance and functionality of this website by collecting and reporting information anonymously.\n"
      },
      marketing: {
        name: "Marketing",
        description: "Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.\n"
      },
      preferences: {
        name: "Preferences",
        description: "Preference cookies are used to remember settings and customizations that change the way the website behaves or looks.\n"
      }
    }
  };
  var en_yml_default = data;

  // node_modules/@chiiya/haven/dist/esm/translations/de.yml.js
  var data2 = {
    notification: {
      message: "Wir verwenden Cookies, um Ihnen den bestm\xF6glichen Service auf unserer Website zu bieten.",
      policy: "Cookie-Einstellungen \xE4ndern",
      accept: "Annehmen",
      decline: "Ablehnen"
    },
    preferences: {description: "Diese Website setzt folgende Cookies ein:"},
    purposes: {
      functional: {
        name: "Funktionale Cookies",
        description: "Funktionale Cookies sind f\xFCr Kernfunktionen wie das Navigieren auf der Seite oder den Zugriff auf gesch\xFCtzte Bereiche zwingend erforderlich. Ohne diese Cookies kann die Website nicht richtig funktionieren.\n"
      },
      analytics: {
        name: "Analyse-Cookies",
        description: "Analyse-Cookies dienen dazu, die Leistung und Funktionalit\xE4t dieser Website zu verbessern, indem sie Informationen anonym sammeln und melden.\n"
      },
      marketing: {
        name: "Marketing-Cookies",
        description: "Marketing-Cookies werden verwendet, um Besucher auf Websites zu tracken. Ziel ist es, Anzeigen zu schalten, die f\xFCr den einzelnen Nutzer relevant und ansprechend sind und damit f\xFCr Publisher und Drittwerber wertvoller sind.\n"
      },
      preferences: {
        name: "Pr\xE4ferenz-Cookies",
        description: "Pr\xE4ferenz-Cookies werden verwendet, um Einstellungen und Anpassungen zu speichern, die das Verhalten oder das Aussehen der Website ver\xE4ndern.\n"
      }
    }
  };
  var de_yml_default = data2;

  // node_modules/@chiiya/haven/dist/esm/translations/index.js
  var translations = {
    en: en_yml_default,
    de: de_yml_default
  };
  var translations_default = translations;

  // node_modules/@chiiya/haven/dist/esm/store/index.js
  var store = {
    prefix: "cookies",
    cookieAttributes: {
      expires: 365
    },
    domains: [],
    cookies: {},
    lang: "en",
    type: "opt-in",
    services: [],
    notification: {
      position: "bottom",
      policyUrl: "/cookie-policy",
      styles: {
        background: "#3C366B",
        textColor: "#FFF",
        linkColor: "#F7FAFC",
        buttonBackgroundColor: "#F1D600",
        buttonBackgroundColorHover: "#F6E05E",
        buttonTextColor: "#1A202C"
      }
    },
    preferences: {
      styles: {
        textColor: "#666666",
        toggleBorder: "#666666",
        toggleBackground: "#9FD6AE"
      }
    },
    translations: translations_default
  };
  var store_default = store;

  // node_modules/@chiiya/haven/dist/esm/utils/index.js
  var trans = function trans2(key) {
    var translation = store_default.translations[store_default.lang];
    if (translation === void 0) {
      console.error("HAVEN: No translations found for language `".concat(store_default.lang, "`"));
      return void 0;
    }
    var partials = key.split(".");
    var result = translation;
    var _iterator = _createForOfIteratorHelper(partials), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var partial = _step.value;
        if (!result[partial]) {
          return void 0;
        }
        result = result[partial];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return result;
  };
  var getAllPurposes = function getAllPurposes2() {
    if (store_default.purposes) {
      return store_default.purposes;
    }
    var purposes = store_default.services.map(function(service) {
      return service.purposes || [];
    }).flat();
    return _toConsumableArray(new Set(_toConsumableArray(purposes)));
  };
  function isObject(item) {
    return item && _typeof(item) === "object" && !Array.isArray(item);
  }
  function mergeDeep(target, source) {
    var output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(function(key) {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, _defineProperty({}, key, source[key]));
          } else {
            output[key] = mergeDeep(target[key], source[key]);
          }
        } else {
          Object.assign(output, _defineProperty({}, key, source[key]));
        }
      });
    }
    return output;
  }
  function hasLoadedScript(src) {
    return document.querySelector('script[src="'.concat(src, '"]')) !== null;
  }

  // node_modules/@chiiya/haven/dist/esm/cookies/cookie-manager.js
  var CookieManager = /* @__PURE__ */ function() {
    function CookieManager2(prefix) {
      var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "opt-in";
      var attributes = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      _classCallCheck(this, CookieManager2);
      _defineProperty(this, "prefix", void 0);
      _defineProperty(this, "type", void 0);
      _defineProperty(this, "attributes", void 0);
      this.prefix = prefix;
      this.type = type;
      this.attributes = attributes;
    }
    _createClass(CookieManager2, [{
      key: "enableFunctionalCookie",
      value: function enableFunctionalCookie() {
        CookieManager2.setCookie("".concat(this.prefix, "-functional"), "true", this.attributes);
        event_bus_default.emit("functional-enabled");
      }
    }, {
      key: "hasFunctionalCookie",
      value: function hasFunctionalCookie() {
        return CookieManager2.cookieExists("".concat(this.prefix, "-functional"));
      }
    }, {
      key: "enableCookies",
      value: function enableCookies(purpose) {
        CookieManager2.setCookie("".concat(this.prefix, "-").concat(purpose), "true", this.attributes);
        event_bus_default.emit("".concat(purpose, "-enabled"));
      }
    }, {
      key: "disableCookies",
      value: function disableCookies(purpose) {
        CookieManager2.setCookie("".concat(this.prefix, "-").concat(purpose), "false", this.attributes);
        event_bus_default.emit("".concat(purpose, "-disabled"));
      }
    }, {
      key: "hasAllCookiesSet",
      value: function hasAllCookiesSet() {
        var purposes = getAllPurposes();
        var _iterator = _createForOfIteratorHelper(purposes), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var purpose = _step.value;
            if (!CookieManager2.cookieExists("".concat(this.prefix, "-").concat(purpose))) {
              return false;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return true;
      }
    }, {
      key: "hasCookiesEnabled",
      value: function hasCookiesEnabled(purpose) {
        var cookie = CookieManager2.getCookie("".concat(this.prefix, "-").concat(purpose));
        if (this.type === "opt-in") {
          return cookie === "true";
        }
        return cookie === void 0 || cookie === "true";
      }
    }, {
      key: "hasAllNecessaryCookiesEnabled",
      value: function hasAllNecessaryCookiesEnabled() {
        var purposes = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        var _iterator2 = _createForOfIteratorHelper(purposes), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var purpose = _step2.value;
            if (!this.hasCookiesEnabled(purpose)) {
              return false;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        return true;
      }
    }, {
      key: "enableAllCookies",
      value: function enableAllCookies() {
        var _this = this;
        var purposes = ["functional"].concat(_toConsumableArray(getAllPurposes()));
        purposes.map(function(purpose) {
          return _this.enableCookies(purpose);
        });
      }
    }, {
      key: "disableAllCookies",
      value: function disableAllCookies() {
        var _this2 = this;
        getAllPurposes().map(function(purpose) {
          return _this2.disableCookies(purpose);
        });
      }
    }], [{
      key: "getCookie",
      value: function getCookie(name) {
        return cookies_default.get(name);
      }
    }, {
      key: "setCookie",
      value: function setCookie(name, value, options) {
        cookies_default.set(name, value, options);
      }
    }, {
      key: "removeCookie",
      value: function removeCookie(name, options) {
        cookies_default.remove(name, options);
      }
    }, {
      key: "cookieExists",
      value: function cookieExists(name) {
        return cookies_default.get(name) !== void 0 && cookies_default.get(name) !== "";
      }
    }]);
    return CookieManager2;
  }();
  var cookie_manager_default = CookieManager;

  // node_modules/@chiiya/haven/dist/esm/store/configuration-resolver.js
  var ConfigurationResolver = /* @__PURE__ */ function() {
    function ConfigurationResolver2() {
      _classCallCheck(this, ConfigurationResolver2);
    }
    _createClass(ConfigurationResolver2, null, [{
      key: "resolve",
      value: function resolve(options) {
        if (options.domains && Array.isArray(options.domains)) {
          options.domains = this.normalizeDomains(options.domains);
        }
        this.resolveBaseConfiguration(options);
        store_default.notification = mergeDeep(store_default.notification, options.notification);
        store_default.translations = mergeDeep(store_default.translations, options.translations);
      }
    }, {
      key: "resolveBaseConfiguration",
      value: function resolveBaseConfiguration(options) {
        for (var _i = 0, _arr = ["prefix", "cookies", "type", "services", "purposes"]; _i < _arr.length; _i++) {
          var item = _arr[_i];
          if (options[item] !== void 0) {
            store_default[item] = options[item];
          }
        }
        var domains = options.domains || [];
        store_default.domains = domains.length > 0 ? domains : this.getDomains();
        store_default.lang = this.detectLanguage(options);
        if (options.cookieAttributes !== void 0) {
          store_default.cookieAttributes = Object.assign(store_default.cookieAttributes, options.cookieAttributes);
        }
      }
    }, {
      key: "detectLanguage",
      value: function detectLanguage(options) {
        var lang = (options.lang || document.documentElement.lang || "en").toLowerCase();
        var result = /^(\w{2})-(\w{2})$/.exec(lang);
        return result === null ? lang : result[1];
      }
    }, {
      key: "getDomains",
      value: function getDomains() {
        var domains = [];
        var host = window.location.hostname;
        var simple = host.match(/(?:[A-Za-z0-9-]+\.)*([A-Za-z0-9-]+\.co.uk|\.com.br|\.co.jp|\.com.au)\b/);
        if (simple !== null) {
          domains.push(simple[1]);
        }
        var matches = host.match(/(?:[A-Za-z0-9-]+\.)*([A-Za-z0-9-]+\.(?:[A-za-z]{2}|[A-Za-z]{3,}))\b/);
        if (matches !== null) {
          domains.push(matches[1]);
        }
        domains.push(host);
        return this.normalizeDomains(domains);
      }
    }, {
      key: "normalizeDomains",
      value: function normalizeDomains(domains) {
        return domains.map(function(domain) {
          return domain.startsWith(".") ? domain : ".".concat(domain);
        });
      }
    }]);
    return ConfigurationResolver2;
  }();
  var configuration_resolver_default = ConfigurationResolver;

  // node_modules/@chiiya/haven/dist/esm/notification/default-notification.js
  var fontStack = ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", "Oxygen", "Ubuntu", "Cantarell", '"Fira Sans"', '"Droid Sans"', '"Helvetica Neue"', "Arial", '"Noto Sans"', "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'];
  var createStyles = function createStyles2() {
    var options = store_default.notification.styles;
    return "\n    .hv-notification {\n      align-items: center;\n      background: ".concat(options.background, ";\n      box-sizing: border-box;\n      color: ").concat(options.textColor, ";\n      display: flex;\n      font-family: ").concat(fontStack.join(", "), ";\n      font-size: 16px;\n      justify-content: space-between;\n      left: 0;\n      line-height: 1.5;\n      opacity: 1;\n      overflow: hidden;\n      padding: 16px 32px;\n      position: fixed;\n      right: 0;\n      transition: opacity 1s ease;\n      width: 100%;\n      z-index: 9999;\n    }\n\n    .hv-notification--hidden {\n      opacity: 0;\n    }\n\n    .hv-notification--top {\n      top: 0;\n    }\n\n    .hv-notification--bottom {\n      bottom: 0;\n    }\n\n    .hv-notification__message {\n      margin: 0 16px 0 0;\n    }\n\n    .hv-notification__message a {\n      color: ").concat(options.linkColor, ";\n      text-decoration: underline;\n    }\n\n    .hv-notification__message a:hover {\n      color: ").concat(options.textColor, ";\n    }\n\n    .hv-notification-button {\n      align-items: center;\n      border: 0;\n      cursor: pointer;\n      display: inline-flex;\n      font-size: 14px;\n      font-weight: 500;\n      justify-content: center;\n      outline: 0;\n      padding: 8px 32px;\n      transition: background-color 0.2s ease, color 0.2s ease;\n    }\n\n    .hv-notification__decline {\n      background: transparent;\n      color: ").concat(options.textColor, ";\n    }\n\n    .hv-notification__decline:hover {\n      text-decoration: underline;\n    }\n\n    .hv-notification__accept {\n      background: ").concat(options.buttonBackgroundColor, ";\n      color: ").concat(options.buttonTextColor, ";\n    }\n\n    .hv-notification__accept:hover {\n      background: ").concat(options.buttonBackgroundColorHover, ";\n    }\n  ");
  };
  var createNotification = function createNotification2() {
    var options = store_default.notification;
    return '\n  <div id="cookie-notification" role="alert" class="hv-notification hv-notification--'.concat(options.position, '" data-display="flex" style="display: none;">\n    <p class="hv-notification__message">\n        ').concat(trans("notification.message"), ' <a href="').concat(options.policyUrl, '" target="_blank">').concat(trans("notification.policy"), '</a>\n    </p>\n    <div class="hv-notification__actions">\n        <button id="cookie-notification__decline" class="hv-notification-button hv-notification__decline">').concat(trans("notification.decline"), '</button>\n        <button id="cookie-notification__accept" class="hv-notification-button hv-notification__accept">').concat(trans("notification.accept"), "</button>\n    </div>\n  </div>\n  ");
  };
  var DefaultNotification = /* @__PURE__ */ function() {
    function DefaultNotification2() {
      _classCallCheck(this, DefaultNotification2);
    }
    _createClass(DefaultNotification2, null, [{
      key: "create",
      value: function create() {
        var style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(createStyles()));
        document.head.appendChild(style);
        var wrapper = document.createElement("div");
        wrapper.innerHTML = createNotification();
        document.body.appendChild(wrapper);
      }
    }]);
    return DefaultNotification2;
  }();
  var default_notification_default = DefaultNotification;

  // node_modules/@chiiya/haven/dist/esm/notification/index.js
  var Status = {
    ENABLED: true,
    DISABLED: false
  };
  var CookieNotification = /* @__PURE__ */ function() {
    function CookieNotification2() {
      _classCallCheck(this, CookieNotification2);
      _defineProperty(this, "cookieManager", void 0);
      _defineProperty(this, "cookieNotification", null);
      _defineProperty(this, "cookiesAccept", null);
      _defineProperty(this, "cookiesDecline", null);
      this.cookieManager = new cookie_manager_default(store_default.prefix, store_default.type, store_default.cookieAttributes);
    }
    _createClass(CookieNotification2, [{
      key: "init",
      value: function init() {
        var _this = this;
        this.cookieNotification = document.getElementById("cookie-notification");
        if (this.cookieNotification === null) {
          default_notification_default.create();
          this.cookieNotification = document.getElementById("cookie-notification");
        }
        this.cookiesAccept = document.getElementById("cookie-notification__accept");
        this.cookiesDecline = document.getElementById("cookie-notification__decline");
        if (this.cookieNotification !== null && !this.cookieManager.hasAllCookiesSet()) {
          this.showCookieNotification();
        }
        if (this.cookiesAccept !== null) {
          this.cookiesAccept.addEventListener("click", function(event2) {
            event2.preventDefault();
            _this.cookieManager.enableAllCookies();
            _this.hideCookieNotification();
            _this.togglePreferences(Status.ENABLED);
          });
        }
        if (this.cookiesDecline !== null) {
          this.cookiesDecline.addEventListener("click", function(event2) {
            event2.preventDefault();
            _this.cookieManager.disableAllCookies();
            _this.cookieManager.enableFunctionalCookie();
            _this.hideCookieNotification();
            _this.togglePreferences(Status.DISABLED);
          });
        }
      }
    }, {
      key: "showCookieNotification",
      value: function showCookieNotification() {
        if (this.cookieNotification !== null) {
          this.cookieNotification.style.display = this.cookieNotification.dataset.display || "block";
          this.cookieNotification.classList.remove("hv-notification--hidden");
        }
      }
    }, {
      key: "hideCookieNotification",
      value: function hideCookieNotification() {
        if (this.cookieNotification !== null) {
          this.cookieNotification.style.display = "none";
        }
      }
    }, {
      key: "togglePreferences",
      value: function togglePreferences(enabled) {
        var purposes = getAllPurposes();
        var _iterator = _createForOfIteratorHelper(purposes), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var purpose = _step.value;
            var checkbox = document.getElementById("cookie-preferences--".concat(purpose));
            if (checkbox) {
              checkbox.checked = enabled;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }]);
    return CookieNotification2;
  }();
  var notification_default = CookieNotification;

  // node_modules/@chiiya/haven/dist/esm/preferences/default-preferences.js
  var fontStack2 = ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", "Oxygen", "Ubuntu", "Cantarell", '"Fira Sans"', '"Droid Sans"', '"Helvetica Neue"', "Arial", '"Noto Sans"', "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'];
  var createStyles3 = function createStyles4() {
    var options = store_default.preferences.styles;
    return "\n    .hv-preference {\n      align-items: center;\n      box-sizing: border-box;\n      display: flex;\n      font-family: ".concat(fontStack2.join(", "), ";\n      font-size: 16px;\n      justify-content: space-between;\n      line-height: 1.5;\n      width: 100%;\n    }\n\n    .hv-preference__purpose {\n      font-size: 20px;\n      margin: 0;\n    }\n\n    .hv-preference__description {\n      margin-top: 10px;\n      width: 100%;\n    }\n\n    .hv-toggle {\n      display: none;\n    }\n\n    .hv-toggle:checked + label::before {\n      background: ").concat(options.toggleBackground, ";\n      left: auto;\n      right: 20px;\n      transform: translateX(16px);\n    }\n\n    .hv-toggle:disabled + label {\n      cursor: not-allowed;\n      opacity: .5;\n    }\n\n    .hv-toggle-label {\n      border: 1px solid ").concat(options.toggleBorder, ";\n      border-radius: 9999px;\n      cursor: pointer;\n      display: inline-block;\n      height: 24px;\n      margin: 0;\n      position: relative;\n      width: 48px;\n    }\n\n    .hv-toggle-label::before {\n      background: ").concat(options.toggleBorder, ';\n      border-radius: 9999px;\n      content: "";\n      height: 16px;\n      left: 4px;\n      position: absolute;\n      transition: transform .3s ease, background-color .3s ease;\n      top: 3px;\n      width: 16px;\n    }\n  ');
  };
  var createPreferences = function createPreferences2() {
    var purposes = ["functional"].concat(_toConsumableArray(getAllPurposes()));
    return "\n    <p>".concat(trans("preferences.description"), "</p>\n    ").concat(purposes.map(function(purpose) {
      return '\n        <div class="hv-preference">\n          <h3 class="hv-preference__purpose">'.concat(trans("purposes.".concat(purpose, ".name")), '</h3>\n          <input type="checkbox" class="hv-toggle" id="cookie-preferences--').concat(purpose, '" ').concat(purpose === "functional" ? "disabled checked" : "", '>\n          <label for="cookie-preferences--').concat(purpose, '" class="hv-toggle-label"></label>\n        </div>\n        <p class="hv-preference__description">').concat(trans("purposes.".concat(purpose, ".description")), "</p>\n      ");
    }).join(""), "\n  ");
  };
  var DefaultPreferences = /* @__PURE__ */ function() {
    function DefaultPreferences2() {
      _classCallCheck(this, DefaultPreferences2);
    }
    _createClass(DefaultPreferences2, null, [{
      key: "create",
      value: function create(container) {
        var style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(createStyles3()));
        document.head.appendChild(style);
        var wrapper = document.createElement("div");
        wrapper.innerHTML = createPreferences();
        container.appendChild(wrapper);
      }
    }]);
    return DefaultPreferences2;
  }();
  var default_preferences_default = DefaultPreferences;

  // node_modules/@chiiya/haven/dist/esm/preferences/index.js
  var CookiePreferences = /* @__PURE__ */ function() {
    function CookiePreferences2() {
      _classCallCheck(this, CookiePreferences2);
      _defineProperty(this, "cookieManager", void 0);
      _defineProperty(this, "saveButton", null);
      this.cookieManager = new cookie_manager_default(store_default.prefix, store_default.type, store_default.cookieAttributes);
    }
    _createClass(CookiePreferences2, [{
      key: "init",
      value: function init() {
        var wrapper = document.getElementById("cookie-preferences");
        if (wrapper !== null) {
          default_preferences_default.create(wrapper);
        }
        this.attachListeners();
      }
    }, {
      key: "attachListeners",
      value: function attachListeners() {
        var _this = this;
        var purposes = getAllPurposes();
        var checkboxes = {};
        var _iterator = _createForOfIteratorHelper(purposes), _step;
        try {
          var _loop = function _loop2() {
            var purpose = _step.value;
            var checkbox = document.getElementById("cookie-preferences--".concat(purpose));
            if (checkbox !== null) {
              checkboxes[purpose] = checkbox;
              checkbox.checked = _this.cookieManager.hasCookiesEnabled(purpose);
              checkbox.addEventListener("change", function() {
                _this.cookieManager.enableFunctionalCookie();
                if (checkbox.checked) {
                  _this.cookieManager.enableCookies(purpose);
                } else {
                  _this.cookieManager.disableCookies(purpose);
                }
              });
            }
          };
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            _loop();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        var saveButton = document.getElementById("cookie-preferences__save");
        if (saveButton !== null) {
          saveButton.addEventListener("click", function() {
            _this.cookieManager.enableFunctionalCookie();
            var _iterator2 = _createForOfIteratorHelper(purposes), _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                var _purpose = _step2.value;
                if (checkboxes[_purpose].checked) {
                  _this.cookieManager.enableCookies(_purpose);
                } else {
                  _this.cookieManager.disableCookies(_purpose);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
            var notification = document.getElementById("cookie-notification");
            if (notification !== null) {
              notification.style.display = "none";
            }
          });
        }
      }
    }]);
    return CookiePreferences2;
  }();
  var preferences_default = CookiePreferences;

  // node_modules/@chiiya/haven/dist/esm/services/facebook-pixel.js
  var injectFacebookPixel = function injectFacebookPixel2() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (options.id === void 0) {
      console.error("FACEBOOK_PIXEL: No ID specified. Please specify an ID using `options.id`.");
      return;
    }
    if (!hasLoadedScript("https://connect.facebook.net/en_US/fbevents.js")) {
      injectScript();
    }
    window.fbq("init", options.id);
    window.fbq("track", "PageView");
  };
  var injectScript = function injectScript2() {
    if (window.fbq) {
      return;
    }
    var fb = window.fbq = function() {
      fb.callMethod ? fb.callMethod.apply(fb, arguments) : fb.queue.push(arguments);
    };
    if (!window._fbq) {
      window._fbq = fb;
    }
    fb.push = fb;
    fb.loaded = true;
    fb.version = "2.0";
    fb.queue = [];
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    var firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  };

  // node_modules/@chiiya/haven/dist/esm/services/google-analytics.js
  var injectGoogleAnalytics = function injectGoogleAnalytics2() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (options.id === void 0) {
      console.error("GOOGLE_ANALYTICS: No ID specified. Please specify an ID using `options.id`.");
      return;
    }
    if (!hasLoadedScript("https://www.google-analytics.com/analytics.js")) {
      injectScript3();
    }
    if (options.name !== void 0) {
      createNamedTracker(options);
    } else {
      createDefaultTracker(options);
    }
  };
  var injectScript3 = function injectScript4() {
    window.ga = window.ga || function() {
      (window.ga.q = window.ga.q || []).push(arguments);
    };
    window.ga.l = +new Date();
    var firstScript = document.getElementsByTagName("script")[0];
    var script = document.createElement("script");
    script.src = "https://www.google-analytics.com/analytics.js";
    firstScript.parentNode.insertBefore(script, firstScript);
  };
  var createNamedTracker = function createNamedTracker2(options) {
    window.ga("create", options.id, "auto", options.name);
    if (options.anonymizeIp !== false) {
      window.ga("".concat(options.name, ".set"), "anonymizeIp", true);
    }
    window.ga("".concat(options.name, ".send"), "pageview");
  };
  var createDefaultTracker = function createDefaultTracker2(options) {
    window.ga("create", options.id, "auto");
    if (options.anonymizeIp !== false) {
      window.ga("set", "anonymizeIp", true);
    }
    window.ga("send", "pageview");
  };

  // node_modules/@chiiya/haven/dist/esm/services/google-tag-manager.js
  var injectGoogleTagManager = function injectGoogleTagManager2() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (options.id === void 0) {
      console.error("GOOGLE_TAG_MANAGER: No ID specified. Please specify an ID using `options.id`.");
      return;
    }
    if (hasLoadedScript("https://www.googletagmanager.com/gtm.js?id=".concat(options.id))) {
      return;
    }
    injectScript5(options);
  };
  var injectScript5 = function injectScript6(options) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "gtm.js",
      "gtm.start": new Date().getTime()
    });
    var firstScript = document.getElementsByTagName("script")[0];
    var script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtm.js?id=".concat(options.id);
    firstScript.parentNode.insertBefore(script, firstScript);
  };

  // node_modules/@chiiya/haven/dist/esm/services/service-loader.js
  var ServiceLoader = /* @__PURE__ */ function() {
    function ServiceLoader2() {
      _classCallCheck(this, ServiceLoader2);
      _defineProperty(this, "cookieManager", void 0);
      _defineProperty(this, "injected", {});
      this.cookieManager = new cookie_manager_default(store_default.prefix, store_default.type, store_default.cookieAttributes);
    }
    _createClass(ServiceLoader2, [{
      key: "injectServices",
      value: function injectServices() {
        var _iterator = _createForOfIteratorHelper(store_default.services), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var service = _step.value;
            this.injectService(service);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "injectService",
      value: function injectService(service) {
        if (!this.shouldBeInjected(service)) {
          return;
        }
        var injector = this.getInjectorFunction(service);
        if (injector !== void 0) {
          injector(service.options || {});
          event_bus_default.emit("service-loaded", service.name);
        }
        this.injected[service.name] = true;
      }
    }, {
      key: "shouldBeInjected",
      value: function shouldBeInjected(service) {
        return service.inject !== false && !this.injected[service.name] && (service.required || this.cookieManager.hasAllNecessaryCookiesEnabled(service.purposes));
      }
    }, {
      key: "getInjectorFunction",
      value: function getInjectorFunction(service) {
        var injector;
        if (service.inject === true) {
          var type = service.type || service.name;
          injector = this.getDefaultInjector(type);
          if (injector === void 0) {
            console.error("No default injector found for ".concat(type, ". Please specify your own implementation."));
            return;
          }
          return injector;
        } else if (service.inject) {
          return service.inject;
        }
      }
    }, {
      key: "getDefaultInjector",
      value: function getDefaultInjector(type) {
        switch (type) {
          case "google-analytics":
            return injectGoogleAnalytics;
          case "google-tag-manager":
            return injectGoogleTagManager;
          case "facebook-pixel":
            return injectFacebookPixel;
          default:
            return void 0;
        }
      }
    }, {
      key: "registerService",
      value: function registerService(name, purposes, inject) {
        var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        var service = _objectSpread2({
          name,
          purposes,
          inject
        }, options);
        store_default.services.push(service);
        this.injectService(service);
      }
    }]);
    return ServiceLoader2;
  }();
  var service_loader_default = ServiceLoader;

  // node_modules/@chiiya/haven/dist/esm/preferences/consent-revoke.js
  var ConsentRevoke = /* @__PURE__ */ function() {
    function ConsentRevoke2() {
      _classCallCheck(this, ConsentRevoke2);
    }
    _createClass(ConsentRevoke2, null, [{
      key: "removeCookies",
      value: function removeCookies() {
        var _this = this;
        var _iterator = _createForOfIteratorHelper(store_default.services), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var service = _step.value;
            this.removeCookiesSetByService(service);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (store_default.cookies) {
          Object.values(store_default.cookies).map(function(cookies) {
            return _this.removeSimpleCookies(cookies);
          });
        }
        window.location.reload();
      }
    }, {
      key: "removeCookiesForPurpose",
      value: function removeCookiesForPurpose(purpose) {
        var _iterator2 = _createForOfIteratorHelper(store_default.services), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var service = _step2.value;
            if (service.purposes.indexOf(purpose) === -1) {
              continue;
            }
            this.removeCookiesSetByService(service);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        if (store_default.cookies && store_default.cookies[purpose]) {
          this.removeSimpleCookies(store_default.cookies[purpose]);
        }
      }
    }, {
      key: "removeCookiesSetByService",
      value: function removeCookiesSetByService(service) {
        if (service.cookies && service.cookies.length) {
          this.removeSimpleCookies(service.cookies);
        }
        var type = service.type || service.name;
        if (type === "google-analytics") {
          this.removeGoogleAnalyticsCookies(service.options);
        }
        if (type === "facebook-pixel") {
          this.removeFacebookPixelCookies(service.options);
        }
      }
    }, {
      key: "removeGoogleAnalyticsCookies",
      value: function removeGoogleAnalyticsCookies() {
        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var simple = ["_ga", "_gid", "_gat", "AMP_TOKEN"];
        var composite = ["_dc_gtm_", "_gac_", "_gat_gtag_", "_gat_"];
        this.removeSimpleCookies(simple);
        if (options.id !== void 0) {
          this.removeCompositeCookies(composite, options.id);
        }
        if (options.name !== void 0) {
          this.removeCompositeCookies(composite, options.name);
        }
      }
    }, {
      key: "removeFacebookPixelCookies",
      value: function removeFacebookPixelCookies() {
        var simple = ["_fbp"];
        this.removeSimpleCookies(simple);
      }
    }, {
      key: "removeSimpleCookies",
      value: function removeSimpleCookies(cookies) {
        var _iterator3 = _createForOfIteratorHelper(cookies), _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
            var cookie = _step3.value;
            var _iterator4 = _createForOfIteratorHelper(store_default.domains), _step4;
            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
                var domain = _step4.value;
                cookie_manager_default.removeCookie(cookie, {
                  domain
                });
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
            cookie_manager_default.removeCookie(cookie);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }, {
      key: "removeCompositeCookies",
      value: function removeCompositeCookies(cookies, id) {
        var _iterator5 = _createForOfIteratorHelper(cookies), _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
            var cookie = _step5.value;
            var _iterator6 = _createForOfIteratorHelper(store_default.domains), _step6;
            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
                var domain = _step6.value;
                cookie_manager_default.removeCookie("".concat(cookie).concat(id), {
                  domain
                });
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
            cookie_manager_default.removeCookie("".concat(cookie).concat(id));
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
    }]);
    return ConsentRevoke2;
  }();
  var consent_revoke_default = ConsentRevoke;

  // node_modules/@chiiya/haven/dist/esm/haven.js
  var Haven = /* @__PURE__ */ function() {
    function Haven2(options) {
      _classCallCheck(this, Haven2);
      _defineProperty(this, "cookieNotification", void 0);
      _defineProperty(this, "cookiePreferences", void 0);
      _defineProperty(this, "cookieManager", void 0);
      _defineProperty(this, "serviceLoader", void 0);
      configuration_resolver_default.resolve(options);
      this.cookieNotification = new notification_default();
      this.cookiePreferences = new preferences_default();
      this.cookieManager = new cookie_manager_default(store_default.prefix, store_default.type, store_default.cookieAttributes);
      this.serviceLoader = new service_loader_default();
    }
    _createClass(Haven2, [{
      key: "init",
      value: function init() {
        var _this = this;
        if (/complete|interactive|loaded/.test(document.readyState)) {
          this.cookieNotification.init();
          this.cookiePreferences.init();
        } else {
          document.addEventListener("DOMContentLoaded", function() {
            _this.cookieNotification.init();
            _this.cookiePreferences.init();
          });
        }
        this.registerDefaultListeners();
        this.checkInitialState();
      }
    }, {
      key: "checkInitialState",
      value: function checkInitialState() {
        var purposes = getAllPurposes();
        var _iterator = _createForOfIteratorHelper(purposes), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var purpose = _step.value;
            if (this.cookieManager.hasCookiesEnabled(purpose)) {
              event_bus_default.emit("".concat(purpose, "-enabled"));
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "registerDefaultListeners",
      value: function registerDefaultListeners() {
        var _this2 = this;
        var purposes = getAllPurposes();
        var _iterator2 = _createForOfIteratorHelper(purposes), _step2;
        try {
          var _loop = function _loop2() {
            var purpose = _step2.value;
            event_bus_default.on("".concat(purpose, "-enabled"), function() {
              _this2.serviceLoader.injectServices();
            });
            event_bus_default.on("".concat(purpose, "-disabled"), function() {
              consent_revoke_default.removeCookiesForPurpose(purpose);
            });
          };
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            _loop();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }, {
      key: "registerService",
      value: function registerService(name, purposes, inject) {
        var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        this.serviceLoader.registerService(name, purposes, inject, options);
      }
    }], [{
      key: "on",
      value: function on(event2, callback) {
        return event_bus_default.on(event2, callback);
      }
    }, {
      key: "create",
      value: function create(options) {
        if (Haven2.instance) {
          console.warn("Replacing an existing Haven instance. Are you sure this behaviour is intended?");
        }
        Haven2.instance = new Haven2(options);
        Haven2.instance.init();
        return Haven2.instance;
      }
    }, {
      key: "getInstance",
      value: function getInstance() {
        if (Haven2.instance) {
          return Haven2.instance;
        }
        console.error("No Haven instance found. Make sure to create a Haven instance before attempting to access it.");
      }
    }, {
      key: "removeCookies",
      value: function removeCookies(cookies, options) {
        var _iterator3 = _createForOfIteratorHelper(cookies), _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
            var cookie = _step3.value;
            cookie_manager_default.removeCookie(cookie, options);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }]);
    return Haven2;
  }();
  _defineProperty(Haven, "instance", void 0);
  var haven_default = Haven;

  // ns-hugo:/home/runner/work/website/website/assets/js/consent.ts
  var requestConsent = () => {
    haven_default.create({
      notification: {
        position: "bottom",
        policyUrl: "https://policies.stenci.la/privacy",
        styles: {
          background: "#dbdbdb",
          linkColor: "#363636",
          textColor: "#363636",
          buttonBackgroundColor: "#2568ef",
          buttonBackgroundColorHover: "#1c4fb5",
          buttonTextColor: "#fff"
        }
      },
      services: [
        {
          name: "posthog",
          purposes: ["analytics"],
          inject: () => {
            const firstScript = document.getElementsByTagName("script")[0];
            const script = document.createElement("script");
            script.src = `/js/posthog.js`;
            firstScript.parentNode.insertBefore(script, firstScript);
          }
        }
      ]
    });
  };

  // <stdin>
  var onReady = (cb) => {
    if (document.readyState !== "loading") {
      cb(event);
    } else {
      document.addEventListener("DOMContentLoaded", cb);
    }
  };
  var toggleMobileMenu = () => {
    const toggle = document.getElementById("mobile-menu-toggle");
    const menu = document.getElementById("navbar-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        menu.classList.toggle("is-active");
      });
    }
  };
  onReady(() => {
    toggleMobileMenu();
    requestConsent();
  });
})();
