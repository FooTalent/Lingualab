import catchAsync from './catchAsync.js';

const wrapRoutesWithCatchAsync = (router) => {
  router.stack.forEach((routeLayer) => {
    if (routeLayer.route) {
      routeLayer.route.stack.forEach((layer) => {
        if (layer.route) {
          layer.route.stack.forEach((handleLayer) => {
            handleLayer.handle = catchAsync(handleLayer.handle);
          });
        } else if (layer.handle) {
          layer.handle = catchAsync(layer.handle);
        }
      });
    } else if (routeLayer.name === 'router') {
      wrapRoutesWithCatchAsync(routeLayer.handle);
    }
  });
  return router;
};

export default wrapRoutesWithCatchAsync;