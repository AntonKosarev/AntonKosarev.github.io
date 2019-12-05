function tree_toggle(event) {
    event = event || window.event;
    let clickedElem = event.target || event.srcElement;
    if (!hasClass(clickedElem, 'Expand')) {
        return; // клик не там
    }
    // Node, на который кликнули
    let node = clickedElem.parentNode;
    if (hasClass(node, 'ExpandLeaf')) {
        return; // клик на листе
    }
    // определить новый класс для узла
    let newClass = hasClass(node, 'ExpandOpen') ? 'ExpandClosed' : 'ExpandOpen';
    // заменить текущий класс на newClass
    // регексп находит отдельно стоящий open|close и меняет на newClass
    let re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/;
    node.className = node.className.replace(re, '$1'+newClass+'$3');
}
function hasClass(elem, className) {
    return new RegExp("(^|\\s)"+className+"(\\s|$)").test(elem.className);
}
//tree_toggle();