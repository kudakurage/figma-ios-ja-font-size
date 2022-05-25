let selectedItems = figma.currentPage.selection;
if (selectedItems.length == 0) {
    figma.closePlugin('No object selected.');
}
let renameResult = renameTextLayer(selectedItems);
if (renameResult) {
    figma.closePlugin('Success!');
}
else {
    figma.closePlugin('No text object selected.');
}
function renameTextLayer(nodeObjectsArray) {
    let num = 0;
    for (let i = 0; i < nodeObjectsArray.length; i++) {
        if (nodeObjectsArray[i].type == 'TEXT') {
            let textEL = nodeObjectsArray[i];
            let fontSize = textEL.getRangeFontSize(0, 1);
            let layerName = textEL.name;
            let mark = "";
            if (layerName.match(/^\*/)) {
                layerName = layerName.replace(/^\*/, '');
                mark = "*";
            }
            else {
                if (figma.command == 'renameFloatSize') {
                    fontSize = Math.round(10.695 * fontSize) / 10;
                }
                else {
                    fontSize = Math.round(1.0695 * fontSize);
                }
            }
            layerName = layerName.replace(/^\[[0-9.]+pt\]\s/, '');
            textEL.name = mark + "[" + fontSize + "pt] " + layerName;
            num += 1;
        }
        else if (nodeObjectsArray[i].type == 'GROUP' || nodeObjectsArray[i].type == 'FRAME' || nodeObjectsArray[i].type == 'COMPONENT' || nodeObjectsArray[i].type == 'INSTANCE') {
            num += renameTextLayer(nodeObjectsArray[i].children);
        }
    }
    return num;
}
