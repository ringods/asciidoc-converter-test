import Processor from 'asciidoctor'
import * as react from "react";

const asciidoctor = Processor()

class CustomConverter {
  constructor() {
    this.baseConverter = asciidoctor.Html5Converter.create();
  }

  convert(node, transform) {
    const nodeName = transform || node.getNodeName();
    var transformed = (null);
    if (nodeName === "embedded") {
      transformed = (<div className="embedded">${node.getContent()}</div>);
    } else if (nodeName === "document") {
      transformed = (<div className="document">${node.getContent()}</div>);
    } else if (nodeName === "section") {
      transformed = (<div className="section">${node.getTitle()}</div>);
    }
    //console.log(nodeName + " -> " + transformed + "\n");
    return transformed;
  }
}

asciidoctor.ConverterFactory.register(new CustomConverter(), ["html5"]);

var html = asciidoctor.convert("Hello, _Asciidoctor_", {});
//console.log("Result: \n" + typeof(html));
