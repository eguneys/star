export function onInsert(f) {
  return { insert(vnode) { f(vnode.elm); } };
}
