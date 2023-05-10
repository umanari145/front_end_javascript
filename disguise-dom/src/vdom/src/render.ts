function renderElement({ tagName, attrs, children }) {
  // ここがエントリーポイントのレンダリングになる
  const $el = document.createElement(tagName);
  for (const [k, v] of Object.entries(attrs)) {
    $el.setAttribute(k, v);
  }

  // 具体的な要素のDOMをここで作成する
  for (const child of children) {
    $el.appendChild(render(child));
  }

  return $el;
}
// 再起的な処理になる
export function render(vNode) {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }
  return renderElement(vNode);
}
  