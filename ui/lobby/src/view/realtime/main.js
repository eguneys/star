import * as list from './list';

export default function(ctrl) {
  let res, body;

  res = ctrl.stepHooks;
  body = list.render(ctrl, res);

  return [
    body
  ];

}
