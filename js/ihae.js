/* <ihae.js>
 *   A textarea auto size adjustment helper.
 *
 * copyright 2016/12/08 by xNedKx@gmail.com
 *
 * functions:
 *   inputHeightAutoExpand(element),
 *   inputHeightAutoExpand.readPosition(element), 
 *   inputHeightAutoExpand.setHeight(element, height)
 *
 * Use inputHeightAutoExpand to adjsut the height of textarea fit it content.
 * Or you can read it for later to prevent the css recalculation in iteration.
 *
 */
(function (scope){

  function readPosition(dom){

    try{

      var oldStyle = getComputedStyle(dom);

      var hidden = document.createElement("div");

      hidden.style.opacity = 0;
      hidden.style.pointerEvents = "none";
      hidden.style.position = "absolute";
      hidden.style.overflow = "auto";
      hidden.style.height = "auto";
      hidden.style.width = oldStyle.width;
      hidden.style.padding = oldStyle.padding;
      hidden.style.paddingLeft = oldStyle.paddingLeft;
      hidden.style.paddingRight = oldStyle.paddingRight;
      hidden.style.paddingTop = oldStyle.paddingTop;
      hidden.style.paddingBottom = oldStyle.paddingBottom;
      hidden.style.border = oldStyle.border;
      hidden.style.borderWidth = oldStyle.borderWidth;
      hidden.style.borderStyle = oldStyle.borderStyle;
      hidden.style.borderLeft = oldStyle.borderLeft;
      hidden.style.borderRight = oldStyle.borderRight;
      hidden.style.borderTop = oldStyle.borderTop;
      hidden.style.borderBottom = oldStyle.borderBottom;
      hidden.style.boxSizing = oldStyle.boxSizing;
      hidden.style.fontFamily = oldStyle.fontFamily;
      hidden.style.fontSize = oldStyle.fontSize;
      hidden.style.fontWeight = oldStyle.fontWeight;
      hidden.style.lineHeight = oldStyle.lineHeight;
      hidden.style.whiteSpace = oldStyle.whiteSpace;
      hidden.style.wordWrap = oldStyle.wordWrap;

      hidden.innerHTML = dom.value.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
        return '&#' + i.charCodeAt(0) + ';';
      }).replace(/\n/g,"<br>") + "<br>";

      dom.parentNode.insertBefore(hidden, dom);

      var h = {
        height: hidden.offsetHeight,
        width: hidden.offsetWidth,
        top: hidden.offsetTop,
        left: hidden.offsetLeft
      };

      dom.parentNode.removeChild(hidden);

      return h;

    }catch(er){

      console.log(er)
      return null;

    }

  }

  function setHeight(dom, h){

    return dom.style.height = h + "px";

  }

  function inputHeightAutoExpand(dom){

    try{

    setHeight(dom, readPosition(dom).height)

    }catch(er){}

  };

  inputHeightAutoExpand.setHeight = setHeight;

  inputHeightAutoExpand.readPosition = readPosition;

  return scope.inputHeightAutoExpand = inputHeightAutoExpand;

})(this);