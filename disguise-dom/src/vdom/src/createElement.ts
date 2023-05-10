export default (tagName:string, { attrs = {}, children = [] }) => {
    const vElement = Object.create(null);

    Object.assign(vElement, {
      tagName,
      attrs,
      children,
    });

    return vElement;
};