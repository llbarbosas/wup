import domElements from "./domElements";

function createElement(
  tagName: typeof domElements[number],
  attrs = {},
  ...children: any[]
): HTMLElement {
  const elem = Object.assign(document.createElement(tagName), attrs);
  children.forEach((child) =>
    Array.isArray(child) ? elem.append(...child) : elem.append(child)
  );
  return elem;
}

const wup: {
  [el in typeof domElements[number]]: (
    attrs: any,
    ...children: any[]
  ) => HTMLElement;
} = domElements.reduce(
  (obj: any, elName) => ({
    ...obj,
    [elName]: (attrs = {}, ...children: any[]) =>
      createElement(elName, attrs, ...children),
  }),
  {}
);

function render() {
  document.getElementById("root")?.appendChild(
    wup.div(
      {
        style: "background: red; height: 100px;",
        onclick: () => console.log("click!"),
      },
      wup.h1({}, "Hello world!")
    )
  );
}

render();
