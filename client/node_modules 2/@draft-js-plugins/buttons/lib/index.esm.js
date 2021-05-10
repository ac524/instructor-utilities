import React from 'react';
import { RichUtils } from 'draft-js';
import clsx from 'clsx';

/* eslint-disable react/no-children-prop */
function createBlockStyleButton(_ref) {
  var blockType = _ref.blockType,
      children = _ref.children;
  return function BlockStyleButton(props) {
    var toggleStyle = function toggleStyle(event) {
      event.preventDefault();
      props.setEditorState(RichUtils.toggleBlockType(props.getEditorState(), blockType));
    };

    var preventBubblingUp = function preventBubblingUp(event) {
      event.preventDefault();
    };

    var blockTypeIsActive = function blockTypeIsActive() {
      // if the button is rendered before the editor
      if (!props.getEditorState) {
        return false;
      }

      var editorState = props.getEditorState();
      var type = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType();
      return type === blockType;
    };

    var theme = props.theme;
    var className = blockTypeIsActive() ? clsx(theme.button, theme.active) : theme.button;
    return /*#__PURE__*/React.createElement("div", {
      className: theme.buttonWrapper,
      onMouseDown: preventBubblingUp
    }, /*#__PURE__*/React.createElement("button", {
      className: className,
      onClick: toggleStyle,
      type: "button",
      children: children
    }));
  };
}

/* eslint-disable react/no-children-prop */
function createInlineStyleButton(_ref) {
  var style = _ref.style,
      children = _ref.children;
  return function InlineStyleButton(props) {
    var toggleStyle = function toggleStyle(event) {
      event.preventDefault();
      props.setEditorState(RichUtils.toggleInlineStyle(props.getEditorState(), style));
    };

    var preventBubblingUp = function preventBubblingUp(event) {
      event.preventDefault();
    }; // we check if this.props.getEditorstate is undefined first in case the button is rendered before the editor


    var styleIsActive = function styleIsActive() {
      return props.getEditorState && props.getEditorState().getCurrentInlineStyle().has(style);
    };

    var theme = props.theme;
    var className = styleIsActive() ? clsx(theme.button, theme.active) : theme.button;
    return /*#__PURE__*/React.createElement("div", {
      className: theme.buttonWrapper,
      onMouseDown: preventBubblingUp
    }, /*#__PURE__*/React.createElement("button", {
      className: className,
      onClick: toggleStyle,
      type: "button",
      children: children
    }));
  };
}

/* eslint-disable react/no-children-prop */
function createBlockAlignmentButton(_ref) {
  var alignment = _ref.alignment,
      children = _ref.children;
  return function BlockAlignmentButton(props) {
    var activate = function activate(event) {
      event.preventDefault();
      props.setAlignment({
        alignment: alignment
      });
    };

    var preventBubblingUp = function preventBubblingUp(event) {
      event.preventDefault();
    };

    var isActive = function isActive() {
      return props.alignment === alignment;
    };

    var theme = props.theme;
    var className = isActive() ? clsx(theme.button, theme.active) : theme.button;
    return /*#__PURE__*/React.createElement("div", {
      className: theme.buttonWrapper,
      onMouseDown: preventBubblingUp
    }, /*#__PURE__*/React.createElement("button", {
      className: className,
      onClick: activate,
      type: "button",
      children: children
    }));
  };
}

var ItalicButton = createInlineStyleButton({
  style: 'ITALIC',
  children: /*#__PURE__*/React.createElement("svg", {
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"
  }))
});

var BoldButton = createInlineStyleButton({
  style: 'BOLD',
  children: /*#__PURE__*/React.createElement("svg", {
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }))
});

var CodeButton = createInlineStyleButton({
  style: 'CODE',
  children: /*#__PURE__*/React.createElement("svg", {
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
  }))
});

var UnderlineButton = createInlineStyleButton({
  style: 'UNDERLINE',
  children: /*#__PURE__*/React.createElement("svg", {
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"
  }))
});

var HeadlineOneButton = createBlockStyleButton({
  blockType: 'header-one',
  children: 'H1'
});

var HeadlineTwoButton = createBlockStyleButton({
  blockType: 'header-two',
  children: 'H2'
});

var HeadlineThreeButton = createBlockStyleButton({
  blockType: 'header-three',
  children: 'H3'
});

var UnorderedListButton = createBlockStyleButton({
  blockType: 'unordered-list-item',
  children: /*#__PURE__*/React.createElement("svg", {
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }))
});

var OrderedListButton = createBlockStyleButton({
  blockType: 'ordered-list-item',
  children: /*#__PURE__*/React.createElement("svg", {
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }))
});

var BlockquoteButton = createBlockStyleButton({
  blockType: 'blockquote',
  children: /*#__PURE__*/React.createElement("svg", {
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }))
});

var CodeBlockButton = createBlockStyleButton({
  blockType: 'code-block',
  children: /*#__PURE__*/React.createElement("svg", {
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
  }))
});

var AlignBlockDefaultButton = createBlockAlignmentButton({
  alignment: 'default',
  children: /*#__PURE__*/React.createElement("svg", {
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3,21 L21,21 L21,19 L3,19 L3,21 Z M3,3 L3,5 L21,5 L21,3 L3,3 Z M3,7 L3,17 L17,17 L17,7 L3,7 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }))
});

var AlignBlockCenterButton = createBlockAlignmentButton({
  alignment: 'center',
  children: /*#__PURE__*/React.createElement("svg", {
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3,21 L21,21 L21,19 L3,19 L3,21 Z M3,3 L3,5 L21,5 L21,3 L3,3 Z M5,7 L5,17 L19,17 L19,7 L5,7 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }))
});

var AlignBlockLeftButton = createBlockAlignmentButton({
  alignment: 'left',
  children: /*#__PURE__*/React.createElement("svg", {
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21,15 L15,15 L15,17 L21,17 L21,15 Z M21,7 L15,7 L15,9 L21,9 L21,7 Z M15,13 L21,13 L21,11 L15,11 L15,13 Z M3,21 L21,21 L21,19 L3,19 L3,21 Z M3,3 L3,5 L21,5 L21,3 L3,3 Z M3,7 L3,17 L13,17 L13,7 L3,7 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }))
});

var AlignBlockRightButton = createBlockAlignmentButton({
  alignment: 'right',
  children: /*#__PURE__*/React.createElement("svg", {
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9,15 L3,15 L3,17 L9,17 L9,15 Z M9,7 L3,7 L3,9 L9,9 L9,7 Z M3,13 L9,13 L9,11 L3,11 L3,13 Z M3,21 L21,21 L21,19 L3,19 L3,21 Z M3,3 L3,5 L21,5 L21,3 L3,3 Z M11,7 L11,17 L21,17 L21,7 L11,7 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }))
});

var SubButton = createInlineStyleButton({
  style: 'SUBSCRIPT',
  children: /*#__PURE__*/React.createElement("div", null, "x", /*#__PURE__*/React.createElement("sub", null, "2"))
});

var SupButton = createInlineStyleButton({
  style: 'SUPERSCRIPT',
  children: /*#__PURE__*/React.createElement("div", null, "x", /*#__PURE__*/React.createElement("sup", null, "2"))
});

export { AlignBlockCenterButton, AlignBlockDefaultButton, AlignBlockLeftButton, AlignBlockRightButton, BlockquoteButton, BoldButton, CodeBlockButton, CodeButton, HeadlineOneButton, HeadlineThreeButton, HeadlineTwoButton, ItalicButton, OrderedListButton, SubButton, SupButton, UnderlineButton, UnorderedListButton, createBlockAlignmentButton, createBlockStyleButton, createInlineStyleButton };
