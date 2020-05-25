/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/wp-content/themes/freeflow/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/js/list-picker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/css/style.css":
/*!*********************************!*\
  !*** ./resources/css/style.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./resources/css/style.css?");

/***/ }),

/***/ "./resources/js/controllers/lists/list-controls.js":
/*!*********************************************************!*\
  !*** ./resources/js/controllers/lists/list-controls.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass ListControls {\n  /**\n   * @param {RandomListWalker} walker \n   */\n  constructor(walker) {\n    this.view = walker.view;\n    this.lists = walker.lists;\n    this.selectList = walker.selectList.bind(walker);\n    this.render = walker.render.bind(walker);\n    Object.defineProperty(this, 'currentList', {\n      get() {\n        return walker.currentList;\n      }\n\n    });\n    this.view.el.on('keyup', '.item-label', this.saveOnInputChange.bind(this)).on('change', '.toggle-select', this.onToggleSelect.bind(this)).on('click', '[data-action]', this.onButtonAction.bind(this));\n    this.view.addItemButtonEl.on('click', this.addItem.bind(this));\n    this.view.resetButtonEl.on('click', this.restartList.bind(this));\n    this.view.nextButtonEl.on('click', this.nextListItem.bind(this));\n    this.view.listOptionsEl.on('change', ({\n      currentTarget: {\n        value\n      }\n    }) => this.selectList(this.lists.get(value)));\n    this.view.deleteListButtonEl.on('click', () => {\n      this.lists.delete(this.currentList.key);\n      this.selectList(this.lists.getIndex(0));\n      this.view.displayListOptions(this.lists, this.currentList.key);\n    });\n  }\n  /**\n   * @param {ListModal} modal \n   */\n\n\n  setupModal(modal) {\n    modal.el.on('show.bs.modal', e => {\n      const actions = {\n        editList: () => modal.setList(this.currentList).render(),\n        newList: () => {\n          const newList = this.lists.new('List ' + (this.lists.all.length + 1));\n          modal.setList(newList).render();\n          this.selectList(newList);\n          this.view.displayListOptions(this.lists, this.currentList.key);\n        }\n      };\n      const action = e.relatedTarget.dataset.listAction;\n      if (action && actions[action]) actions[action]();\n    }).on('hide.bs.modal', e => this.view.displayListOptions(this.lists, this.currentList.key).displayListName(this.currentList));\n  }\n\n  saveOnInputChange(e) {\n    const inputEl = $(e.target);\n    const itemIndex = inputEl.closest('.input-group').data('index');\n    this.currentList.all[itemIndex].update({\n      label: inputEl.val()\n    });\n  }\n\n  onToggleSelect(e) {\n    const checkboxEl = $(e.target);\n    const itemIndex = checkboxEl.closest('.input-group').data('index');\n    this.currentList.isSelected(itemIndex) ? this.currentList.unselect(itemIndex) : this.currentList.select(itemIndex);\n    this.render();\n  }\n\n  onButtonAction(e) {\n    const buttonEl = $(e.currentTarget);\n    const itemIndex = buttonEl.closest('.input-group').data('index');\n    const action = buttonEl.data('action');\n\n    if (action === 'remove') {\n      this.currentList.remove(itemIndex);\n      this.restartList();\n    } else if (action === 'disable') {\n      this.currentList.all[itemIndex].toggleDisable();\n      this.render();\n    }\n  }\n\n  addItem() {\n    this.currentList.add('Item ' + (this.currentList.all.length + 1));\n    this.restartList();\n  }\n\n  nextListItem() {\n    if (this.currentList.isComplete) // Exit early if the list is already done. Nothing to do here!\n      return this;\n    this.currentList.selectRandom();\n    this.render();\n    return this;\n  }\n\n  restartList() {\n    this.currentList.resetSelected();\n    this.render();\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ListControls);\n\n//# sourceURL=webpack:///./resources/js/controllers/lists/list-controls.js?");

/***/ }),

/***/ "./resources/js/controllers/lists/list-modal.js":
/*!******************************************************!*\
  !*** ./resources/js/controllers/lists/list-modal.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass ListModal {\n  constructor() {\n    // Modal\n    this.el = $('#edit-list-modal'); // Inputs\n\n    this.listNameInputEl = $('#list-name-input');\n    /** @type {List} */\n\n    this.list;\n    this.data;\n    this.resetData();\n\n    const updateDataOnChange = ({\n      target: {\n        name,\n        value\n      }\n    }) => this.data[name] = value;\n\n    this.el.on('keyup', updateDataOnChange).on('click', '[data-modal-action]', ({\n      currentTarget\n    }) => {\n      const action = currentTarget.dataset.modalAction;\n      const actions = {\n        saveAndClose: () => {\n          this.save().close();\n        }\n      };\n      if (action && actions[action]) actions[action]();\n    }).on('show.bs.modal', e => this.render()) // Clear the displayed data after the modal has closed.\n    .on('hidden.bs.modal', e => this.resetData().render());\n  }\n\n  save() {\n    this.list.update(this.data);\n    return this;\n  }\n\n  close() {\n    this.el.modal('hide');\n    return this;\n  }\n\n  resetData() {\n    this.list = null;\n    this.data = {\n      name: ''\n    };\n    return this;\n  }\n  /**\n   * @param {List} list\n   */\n\n\n  setList(list) {\n    this.list = list;\n    this.data = { ...list\n    };\n    return this;\n  }\n\n  render() {\n    this.listNameInputEl.val(this.data.name);\n    return this;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ListModal);\n\n//# sourceURL=webpack:///./resources/js/controllers/lists/list-modal.js?");

/***/ }),

/***/ "./resources/js/controllers/lists/list-status.js":
/*!*******************************************************!*\
  !*** ./resources/js/controllers/lists/list-status.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass ListStatus {\n  constructor() {\n    this.el = $('#status-message');\n  }\n\n  get currentStatus() {\n    return this.el.data('status');\n  }\n\n  set(message, status = 'info') {\n    if (this.currentStatus && this.currentStatus !== status) // Remove the previous status class\n      this.el.removeClass('alert-' + this.currentStatus);\n    this.el.data('status', status).addClass('alert-' + status).text(message);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ListStatus);\n\n//# sourceURL=webpack:///./resources/js/controllers/lists/list-status.js?");

/***/ }),

/***/ "./resources/js/controllers/lists/list-view.js":
/*!*****************************************************!*\
  !*** ./resources/js/controllers/lists/list-view.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _list_status__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list-status */ \"./resources/js/controllers/lists/list-status.js\");\n\n\nclass ListView {\n  constructor() {\n    this.el = $('#list-items'); // List Containers\n\n    this.enabledEl = $('#list-enabled-items');\n    this.disabledEl = $('#list-disabled-items'); // List Selection Buttons\n\n    this.nextButtonEl = $('#next-group');\n    this.resetButtonEl = $('#reset-list'); // List Management Buttons\n\n    this.addItemButtonEl = $('#add-item'); // Current List Display\n\n    this.currentTitleEl = $('#current-list-title'); // Current List Selection Display\n\n    this.currentItemEl = $('#current-name'); // Available Lists\n\n    this.listOptionsEl = $('#list-options'); // List Collection Controls\n\n    this.newListButtonEl = $('#new-list');\n    this.deleteListButtonEl = $('#delete-list');\n    this.status = new _list_status__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n  /**\n   * @param {List} list \n   */\n\n\n  render(list) {\n    this.enabledEl.empty();\n    this.disabledEl.empty();\n    /**\n     * @param {ListItem} item \n     */\n\n    const createItem = item => {\n      const classModifiers = [];\n      const disableIcon = item.isDisabled ? 'fa-eye-slash' : 'fa-eye';\n      if (item.isCurrent) classModifiers.push('list-group-item-success');else if (item.isSelected) classModifiers.push('list-group-item-dark');\n      const itemEl = $(`<div class=\"input-group list-group-item col-12 col-sm-6 col-md-4 ${classModifiers.join(\" \")}\">\n                    <div class=\"input-group-prepend\">\n                        <div class=\"input-group-text\">\n                            <input class=\"toggle-select\" type=\"checkbox\" aria-label=\"Checkbox for toggling an item's selection\">\n                        </div>\n                    </div>\n                    <input type=\"text\" value=\"${item.label}\" class=\"form-control item-label\">\n                    <div class=\"input-group-append\">\n                        <button class=\"btn btn-outline-secondary\" data-action=\"disable\">\n                            <i class=\"fas ${disableIcon}\"></i>\n                        </button>\n                        <button class=\"btn btn-outline-danger\" data-action=\"remove\">\n                            <i class=\"fas fa-times\"></i>\n                        </span>\n                    </div>\n                </div>`);\n      itemEl // Set the data\n      .data('index', item.index) // Navigate to the selected checkbox\n      .find('.toggle-select') // Set the toggle state\n      .prop('checked', item.isSelected);\n      return itemEl;\n    };\n\n    list.enabled.forEach(item => this.enabledEl.append(createItem(item)));\n    list.disabled.forEach(item => this.disabledEl.append(createItem(item)));\n    this.displayStatus(list).manageControls(list).displayCurrentItem(list);\n    return this;\n  }\n\n  manageControls(list) {\n    list.isComplete ? this.nextButtonEl.prop('disabled', true) : this.nextButtonEl.prop('disabled', false);\n    return this;\n  }\n  /**\n   * @param {Lists} lists \n   * @param {string} currentKey\n   */\n\n\n  displayListOptions(lists, currentKey) {\n    this.listOptionsEl.empty();\n    lists.all.forEach(([key, list]) => {\n      this.listOptionsEl.append($(`<option value=\"${key}\">${list.name}</option>`).prop('selected', currentKey === key));\n    });\n    return this;\n  }\n\n  displayListName(list) {\n    this.currentTitleEl.text(list.name);\n    return this;\n  }\n\n  displayCurrentItem(list) {\n    if (list.isComplete) {\n      this.currentItemEl.text(list.current.label);\n    } else {\n      list.selected.length ? this.currentItemEl.text(list.current.label) : this.currentItemEl.text('No Selection');\n    }\n\n    return this;\n  }\n  /**\n   * @param {List} list \n   */\n\n\n  displayStatus(list) {\n    if (list.isComplete) {\n      this.status.set('List Complete', 'success');\n    } else {\n      let itemWord = 'item' + (list.enabled.length === 1 ? '' : 's');\n      this.status.set(`${list.selected.length} out of ${list.enabled.length} ${itemWord} selected.`);\n    }\n\n    return this;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ListView);\n\n//# sourceURL=webpack:///./resources/js/controllers/lists/list-view.js?");

/***/ }),

/***/ "./resources/js/list-picker.js":
/*!*************************************!*\
  !*** ./resources/js/list-picker.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_lists_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/lists/list */ \"./resources/js/models/lists/list.js\");\n/* harmony import */ var _models_lists_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/lists/lists */ \"./resources/js/models/lists/lists.js\");\n/* harmony import */ var _controllers_lists_list_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/lists/list-view */ \"./resources/js/controllers/lists/list-view.js\");\n/* harmony import */ var _controllers_lists_list_status__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controllers/lists/list-status */ \"./resources/js/controllers/lists/list-status.js\");\n/* harmony import */ var _controllers_lists_list_controls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controllers/lists/list-controls */ \"./resources/js/controllers/lists/list-controls.js\");\n/* harmony import */ var _controllers_lists_list_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controllers/lists/list-modal */ \"./resources/js/controllers/lists/list-modal.js\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../css/style.css */ \"./resources/css/style.css\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_css_style_css__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\n/**\n * RandomListWalker class constructor\n */\n\nclass RandomListWalker {\n  constructor() {\n    this.lists = new _models_lists_lists__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n    this.currentList;\n    this.importExport = new _models_lists_lists__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this);\n    this.view = new _controllers_lists_list_view__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    this.status = new _controllers_lists_list_status__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n    this.controls = new _controllers_lists_list_controls__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this);\n    this.modal = new _controllers_lists_list_modal__WEBPACK_IMPORTED_MODULE_5__[\"default\"]();\n    this.controls.setupModal(this.modal);\n    this.selectList(this.lists.getIndex(0) || this.lists.new());\n    this.view.displayListOptions(this.lists, this.currentList.key);\n  }\n  /**\n   * @param {List} list \n   */\n\n\n  selectList(list) {\n    this.currentList = list;\n    this.view.displayListName(this.currentList).render(this.currentList);\n  }\n\n  render() {\n    this.view.render(this.currentList);\n  }\n\n} // Create the app\n\n\nconst walker = new RandomListWalker(); // Start the list walk through\n\nwalker.render();\n\n//# sourceURL=webpack:///./resources/js/list-picker.js?");

/***/ }),

/***/ "./resources/js/models/lists/list-item.js":
/*!************************************************!*\
  !*** ./resources/js/models/lists/list-item.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list */ \"./resources/js/models/lists/list.js\");\n\n\nclass ListItem {\n  /**\n   * @param {string} label \n   * @param {boolean} isDisabled\n   * @param {List} list\n   */\n  constructor({\n    label,\n    isDisabled = false\n  }, list) {\n    this.label = label;\n    this.isDisabled = isDisabled;\n    Object.defineProperty(this, 'belongsTo', {\n      get: () => list\n    });\n  }\n  /**\n   * The item's position in the list it belongs to.\n   * @returns {number}\n   */\n\n\n  get index() {\n    return this.belongsTo.all.indexOf(this);\n  }\n  /**\n   * Flag for if this item's index exists in the list it belongs to.\n   * @returns {boolean}\n   */\n\n\n  get isSelected() {\n    return this.belongsTo.isSelected(this.index);\n  }\n  /**\n   * Flag for if this item's index is the last item selected.\n   * @returns {boolean}\n   */\n\n\n  get isCurrent() {\n    return this.index === this.belongsTo.currentIndex;\n  }\n  /**\n   * @param {string} label\n   * @returns {ListItem}\n   */\n\n\n  update({\n    label\n  }) {\n    if (label !== this.label) {\n      this.label = label;\n      this.belongsTo.save();\n    }\n\n    return this;\n  }\n  /**\n   * Modifies the item's disabled state and updates it's state in the list it belongs to.\n   * @returns {ListItem}\n   */\n\n\n  toggleDisable() {\n    this.isDisabled = !this.isDisabled;\n    if (this.isDisabled && this.isSelected) this.belongsTo.unselect(this.index);\n    this.belongsTo.save();\n    return this;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ListItem);\n\n//# sourceURL=webpack:///./resources/js/models/lists/list-item.js?");

/***/ }),

/***/ "./resources/js/models/lists/list.js":
/*!*******************************************!*\
  !*** ./resources/js/models/lists/list.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lists */ \"./resources/js/models/lists/lists.js\");\n/* harmony import */ var _list_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list-item */ \"./resources/js/models/lists/list-item.js\");\n\n\n\n/**\n * Collection class for managing the entries and selection state for a target list.\n */\n\nclass List {\n  /**\n   * List class constructor\n   * @param {string} key \n   * @param {string} name \n   * @param {Lists} collection \n   */\n  constructor(key, name = '', collection) {\n    this.name = name;\n    const storageKey = key + '-' + _lists__WEBPACK_IMPORTED_MODULE_0__[\"storageName\"];\n    const selectStorageKey = key + '-selected-' + _lists__WEBPACK_IMPORTED_MODULE_0__[\"storageName\"]; // Load or create the target list\n\n    let list = JSON.parse(localStorage.getItem(storageKey)) || [];\n    let selectList = JSON.parse(localStorage.getItem(selectStorageKey)) || []; // Migrate old data format if needed\n\n    if (list[0] && typeof list[0] === 'string') list = list.map(label => ({\n      label\n    }));\n    list = list.map(item => new _list_item__WEBPACK_IMPORTED_MODULE_1__[\"default\"](item, this));\n    Object.defineProperty(this, 'all', {\n      get: () => list,\n      set: function (value) {\n        list.length = 0;\n        list.push(...value);\n      }\n    });\n    Object.defineProperty(this, 'selected', {\n      get: () => selectList\n    });\n    Object.defineProperty(this, 'key', {\n      get: () => key\n    });\n    Object.defineProperty(this, 'storageKey', {\n      get: () => storageKey\n    });\n    Object.defineProperty(this, 'selectStorageKey', {\n      get: () => selectStorageKey\n    });\n    Object.defineProperty(this, 'belongsTo', {\n      get: () => collection\n    });\n  }\n\n  get enabled() {\n    return this.all.filter(item => !item.isDisabled);\n  }\n\n  get disabled() {\n    return this.all.filter(item => item.isDisabled);\n  }\n\n  get isComplete() {\n    return this.enabled.length && this.enabled.length === this.selected.length;\n  }\n\n  get currentIndex() {\n    return this.selected[this.selected.length - 1] >= 0 ? this.selected[this.selected.length - 1] : null;\n  }\n  /**\n   * @returns {ListItem}\n   */\n\n\n  get current() {\n    return this.all[this.currentIndex] || null;\n  }\n\n  update({\n    name\n  }) {\n    this.name = name;\n    this.belongsTo.save();\n    return this;\n  }\n  /**\n   * @returns {List}\n   */\n\n\n  resetSelected() {\n    this.selected.length = 0;\n    this.saveSelected();\n    return this;\n  }\n  /**\n   * @returns {List}\n   */\n\n\n  selectRandom() {\n    let unusedIndexes = this.enabled.map(({\n      index\n    }) => index).filter(i => !this.selected.includes(i));\n\n    if (unusedIndexes.length) {\n      let nextItemIndex = unusedIndexes[Math.floor(Math.random() * unusedIndexes.length)];\n      this.select(nextItemIndex);\n    }\n\n    return this;\n  }\n  /**\n   * @param {number} targetIndex\n   * @returns {List}\n   */\n\n\n  select(targetIndex) {\n    if (!this.isSelected(targetIndex)) {\n      this.selected.push(targetIndex);\n      this.saveSelected();\n    }\n\n    return this;\n  }\n  /**\n   * @param {number} targetIndex\n   * @returns {List}\n   */\n\n\n  unselect(targetIndex) {\n    const position = this.selected.indexOf(targetIndex);\n\n    if (position > -1) {\n      this.selected.splice(position, 1);\n      this.saveSelected();\n    }\n\n    return this;\n  }\n  /**\n   * @param {number} index\n   * @returns {boolean}\n   */\n\n\n  isSelected(index) {\n    return this.selected.includes(index);\n  }\n  /**\n   * @param {ListItem} item \n   */\n\n\n  indexOf(item) {\n    return this.all.indexOf(item);\n  }\n  /**\n   * @param {string} item\n   * @returns {List}\n   */\n\n\n  add(label) {\n    this.all.push(new _list_item__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      label\n    }, this));\n    this.save();\n    return this;\n  }\n  /**\n   * @param {number} index\n   * @returns {List}\n   */\n\n\n  remove(index) {\n    this.all.splice(index, 1);\n    this.save();\n    return this;\n  }\n  /**\n   * @returns {List}\n   */\n\n\n  save() {\n    localStorage.setItem(this.storageKey, JSON.stringify(this.all));\n    return this;\n  }\n  /**\n   * @returns {List}\n   */\n\n\n  saveSelected() {\n    localStorage.setItem(this.selectStorageKey, JSON.stringify(this.selected));\n    return this;\n  }\n\n  copy() {\n    return new List(this.key, this.name, this.belongsTo);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (List);\n\n//# sourceURL=webpack:///./resources/js/models/lists/list.js?");

/***/ }),

/***/ "./resources/js/models/lists/lists.js":
/*!********************************************!*\
  !*** ./resources/js/models/lists/lists.js ***!
  \********************************************/
/*! exports provided: storageName, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"storageName\", function() { return storageName; });\n/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list */ \"./resources/js/models/lists/list.js\");\n\nconst storageName = 'walker-lists';\n/**\n * Collection class for managing defined lists.\n */\n\nclass Lists {\n  /**\n   * Lists class constructor.\n   */\n  constructor() {\n    const deserialize = lists => Object.fromEntries(Object.entries(JSON.parse(lists)).map(([key, name]) => [key, new _list__WEBPACK_IMPORTED_MODULE_0__[\"default\"](key, name, this)]));\n\n    const serialize = lists => JSON.stringify(Object.fromEntries(Object.entries(lists).map(([key, value]) => [key, value.name])));\n\n    const lists = deserialize(localStorage.getItem(storageName) || '{}');\n    Object.defineProperty(this, 'lists', {\n      get: function () {\n        return lists;\n      }\n    });\n    Object.defineProperty(this, 'all', {\n      get: function () {\n        return Object.entries(lists);\n      }\n    });\n    Object.defineProperty(this, 'save', {\n      value: () => {\n        localStorage.setItem(storageName, serialize(lists));\n        return this;\n      },\n      writable: false\n    });\n  }\n  /**\n   * @param {number} index\n   * @returns {List}\n   */\n\n\n  getIndex(index) {\n    return this.all[index] ? this.all[index][1] : null;\n  }\n  /**\n   * @param {string} key\n   * @returns {List}\n   */\n\n\n  get(key) {\n    return this.lists[key] || false;\n  }\n  /**\n   * @param {string} name \n   * @returns {List}\n   */\n\n\n  new(name = 'Default') {\n    // Use the current time as a key\n    const key = Date.now().toString();\n    const newList = new _list__WEBPACK_IMPORTED_MODULE_0__[\"default\"](key, name, this);\n    this.lists[key] = newList;\n    this.save();\n    return newList;\n  }\n  /**\n   * @param {string} key\n   * @returns {Lists}\n   */\n\n\n  delete(key) {\n    delete this.lists[key];\n    this.save();\n    return this;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Lists);\n\n//# sourceURL=webpack:///./resources/js/models/lists/lists.js?");

/***/ })

/******/ });