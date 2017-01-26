var zooming = new Zooming({
    enableGrab: false,
    preloadImage: true,
    transitionDuration: 0.5,
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0, 1)',
    bgColor: 'white',
    bgOpacity: 0,
    scaleBase: 0.15,
    scaleExtra: 0.15,
    scrollThreshold: 40,
});

zooming.listen('.product__image-container .product__image')
