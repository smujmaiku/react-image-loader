"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchReducer = patchReducer;
exports.imageReducer = imageReducer;
exports.useImages = useImages;
exports.useImagesFromMap = useImagesFromMap;
exports.useImagesFromContext = useImagesFromContext;
exports.ImagesProvider = ImagesProvider;
exports.imagesContext = exports.mutatePathNameWithDir = exports.mutatePathName = void 0;

var _path = require("path");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ERROR_IMAGE_SRC = '_';
var CHECKER_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAAAAADhZOFXAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAH0lEQVQI12NMY2BgSGNgYGBigAJMBuMZBgaGWfjVAABn6gJB1NL6yQAAAABJRU5ErkJggg==';

var mutatePathName = function mutatePathName(path) {
  return (0, _path.parse)(path).name;
};

exports.mutatePathName = mutatePathName;

var mutatePathNameWithDir = function mutatePathNameWithDir(path) {
  var _parsePath = (0, _path.parse)(path),
      dir = _parsePath.dir,
      name = _parsePath.name;

  return "".concat(dir, "/").concat(name);
};

exports.mutatePathNameWithDir = mutatePathNameWithDir;
var imagesContext = (0, _react.createContext)();
exports.imagesContext = imagesContext;

function patchReducer(state, _ref) {
  var src = _ref.src,
      image = _ref.image;
  return _objectSpread({}, state, _defineProperty({}, src, image));
}

function imageReducer(state, action) {
  var type = action.type,
      list = action.list,
      src = action.src,
      image = action.image;

  switch (type) {
    case 'INIT':
      return {
        list: list,
        images: {}
      };

    case 'SET':
      if (state.images[src]) return state;
      return _objectSpread({}, state, {
        images: _objectSpread({}, state.images, _defineProperty({}, src, image))
      });

    default:
  }

  return state;
}
/**
 *
 * @param {Array} list
 * @returns {Object}
 */


function useImages(list) {
  var globalReducer = (0, _react.useContext)(imagesContext);
  var localReducer = (0, _react.useReducer)(patchReducer, {});

  var _ref2 = globalReducer || localReducer,
      _ref3 = _slicedToArray(_ref2, 2),
      images = _ref3[0],
      addImage = _ref3[1];

  var errImage = images[ERROR_IMAGE_SRC];

  var _useReducer = (0, _react.useReducer)(imageReducer, {
    list: list,
    images: {}
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {
    dispatch({
      type: 'INIT',
      list: list
    });
  }, [list]);
  (0, _react.useEffect)(function () {
    var cleanup = [];

    var _iterator = _createForOfIteratorHelper(list),
        _step;

    try {
      var _loop = function _loop() {
        var src = _step.value;
        var image = images[src];

        if (!image) {
          var newImage = new Image();

          newImage.onload = function () {
            return addImage({
              src: src,
              image: newImage
            });
          };

          newImage.onerror = function () {
            return addImage({
              src: src,
              image: newImage
            });
          };

          newImage.src = src;
          addImage({
            src: src,
            image: newImage
          });
          cleanup.push(newImage);
        } else if (!image.complete) {
          image.onload = function () {
            return addImage({
              src: src,
              image: image
            });
          };

          image.onerror = function () {
            return addImage({
              src: src,
              image: image
            });
          };

          cleanup.push(image);
        } else if (image.naturalWidth > 0) {
          dispatch({
            type: 'SET',
            src: src,
            image: image
          });
        } else {
          dispatch({
            type: 'SET',
            src: src,
            image: errImage || image
          });
        }
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return function () {
      var _iterator2 = _createForOfIteratorHelper(cleanup),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var image = _step2.value;

          image.onload = function () {};

          image.onerror = function () {};
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    };
  }, [list, images, errImage]);
  return state.images;
}
/**
 *
 * @param {Object} map
 * @returns {Object}
 */


function useImagesFromMap(map) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      list = _useState2[0],
      setList = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      result = _useState4[0],
      setResult = _useState4[1];

  var images = useImages(list);
  (0, _react.useEffect)(function () {
    setList(Object.values(map));
  }, [map]);
  (0, _react.useEffect)(function () {
    var res = {};

    for (var _i2 = 0, _Object$entries = Object.entries(map); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
          name = _Object$entries$_i[0],
          path = _Object$entries$_i[1];

      res[name] = images[path];
    }

    setResult(res);
  }, [images]);
  return result;
}
/**
 * Use Images from an ImportAll
 * https://webpack.js.org/guides/dependency-management/#context-module-api
 * @param {Require.Context} ctx
 * @param {Array} list
 * @param {string?} type default|name|nameWithDir
 * @example
 * const assetContext = require.context('../assets/', false, /\.png$/);
 * export default function User() {
 *   const assets = useImagesFromContext(assetContext, ['favicon'], 'name');
 * }
 */


function useImagesFromContext(ctx, list) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';

  var _useState5 = (0, _react.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      map = _useState6[0],
      setMap = _useState6[1];

  (0, _react.useEffect)(function () {
    var pathMutate = function pathMutate(path) {
      return path;
    };

    switch (type) {
      case 'name':
        pathMutate = mutatePathName;
        break;

      case 'nameWithDir':
        pathMutate = mutatePathNameWithDir;
        break;
    }

    var res = {};

    var _iterator3 = _createForOfIteratorHelper(ctx.keys()),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var key = _step3.value;
        var path = pathMutate(key);
        if (list.includes(path)) res[path] = ctx(key);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    setMap(res);
  }, [ctx, list, type]);
  return useImagesFromMap(map);
}

function ImagesProvider(props) {
  var children = props.children,
      defaultCheckers = props.defaultCheckers;
  var Provider = imagesContext.Provider;
  var value = (0, _react.useReducer)(patchReducer, {});

  var _value = _slicedToArray(value, 2),
      setState = _value[1];

  (0, _react.useEffect)(function () {
    if (defaultCheckers) {
      var image = new Image();
      image.src = CHECKER_SRC;
      setState({
        src: ERROR_IMAGE_SRC,
        image: image
      });
    }
  }, []);
  return /*#__PURE__*/_react["default"].createElement(Provider, {
    value: value
  }, children);
}

ImagesProvider.defaultProps = {
  defaultCheckers: false
};
ImagesProvider.propTypes = {
  children: _propTypes["default"].node.isRequired,
  defaultCheckers: _propTypes["default"].bool
};
