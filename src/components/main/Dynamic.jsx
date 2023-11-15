import { createElement } from "react";

export default function Dynamic({ tag, children, ...props }) {
    return createElement(tag, props, children);
}
