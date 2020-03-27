import "./src/styles/tailwind.css";
import "./src/styles/compiled-tailwind.min.css";
import "./src/styles/search.css";
import "./src/styles/markdown.css";
import "./src/styles/prism-material-light.css";

const ReactDOM = require('react-dom');

export function replaceHydrateFunction() {
    return (element, container, callback) => {
        ReactDOM.render(element, container, callback)
    }
}
