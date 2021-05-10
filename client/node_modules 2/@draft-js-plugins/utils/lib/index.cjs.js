'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var draftJs = require('draft-js');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

// eslint-disable-next-line @typescript-eslint/ban-types
// eslint-disable-next-line @typescript-eslint/ban-types
function createStore(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var state = initialState;
  var listeners = {};
  return {
    subscribeToItem: function subscribeToItem(key, callback) {
      listeners[key] = listeners[key] || [];
      listeners[key].push(callback);
    },
    unsubscribeFromItem: function unsubscribeFromItem(key, callback) {
      var listener = listeners[key];

      if (listener) {
        listeners[key] = listener.filter(function (currentListener) {
          return currentListener !== callback;
        });
      }
    },
    updateItem: function updateItem(key, item) {
      var _extends2;

      state = _extends({}, state, (_extends2 = {}, _extends2[key] = item, _extends2));
      var listener = listeners[key];

      if (listener) {
        listener.forEach(function (currentListener) {
          return currentListener(state[key]);
        });
      }
    },
    getItem: function getItem(key) {
      return state[key];
    }
  };
}

var index = {
  decodeOffsetKey: function decodeOffsetKey(offsetKey) {
    var _offsetKey$split = offsetKey.split('-'),
        blockKey = _offsetKey$split[0],
        decoratorKey = _offsetKey$split[1],
        leafKey = _offsetKey$split[2];

    return {
      blockKey: blockKey,
      decoratorKey: parseInt(decoratorKey, 10),
      leafKey: parseInt(leafKey, 10)
    };
  },
  createLinkAtSelection: function createLinkAtSelection(editorState, url) {
    var contentState = editorState.getCurrentContent().createEntity('LINK', 'MUTABLE', {
      url: url
    });
    var entityKey = contentState.getLastCreatedEntityKey();
    var withLink = draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
    return draftJs.EditorState.forceSelection(withLink, editorState.getSelection());
  },
  removeLinkAtSelection: function removeLinkAtSelection(editorState) {
    var selection = editorState.getSelection();
    return draftJs.RichUtils.toggleLink(editorState, selection, null);
  },
  collapseToEnd: function collapseToEnd(editorState) {
    var selection = editorState.getSelection();
    return draftJs.EditorState.forceSelection(editorState, selection.merge({
      anchorKey: selection.getEndKey(),
      focusKey: selection.getEndKey(),
      anchorOffset: selection.getEndOffset(),
      focusOffset: selection.getEndOffset()
    }));
  },
  getCurrentEntityKey: function getCurrentEntityKey(editorState) {
    var selection = editorState.getSelection();
    var anchorKey = selection.getAnchorKey();
    var contentState = editorState.getCurrentContent();
    var anchorBlock = contentState.getBlockForKey(anchorKey);
    var offset = selection.getAnchorOffset();
    var index = selection.getIsBackward() ? offset - 1 : offset;
    return anchorBlock.getEntityAt(index);
  },
  getCurrentEntity: function getCurrentEntity(editorState) {
    var contentState = editorState.getCurrentContent();
    var entityKey = this.getCurrentEntityKey(editorState);
    return entityKey ? contentState.getEntity(entityKey) : null;
  },
  hasEntity: function hasEntity(editorState, entityType) {
    var entity = this.getCurrentEntity(editorState);
    return Boolean(entity && entity.getType() === entityType);
  }
};

exports.createStore = createStore;
exports.default = index;
