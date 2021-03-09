function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    //return html; returns html of the page we are viewing
    
    var endDoc = '';
    var n = html.search("$");
    //var r = html.match(/\$(([a-zA-z]|)*[a-zA-z]+)/g); //regex to filter through html for any words with $words
    var r2 = html.match(/\$([a-zA-Z]+)/g);
    for(i = 0; i < r2.length; ++i){

    r2[i] = r2[i].replace('$','');
    }//r2 = GME,GME,GME,GME,GME
    //let uniqueChars = [...new Set(r2)];
    for (j = 0; j < r2.length; ++j){
        document.write("<p>Link: " + r2[j].link("https://finance.yahoo.com/quote/" + r2[j]) + "</p>");
    }
    return document;

}


chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});