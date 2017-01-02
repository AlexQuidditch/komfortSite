var zooming = new Zooming({
    defaultZoomable: 'img[class="product__image"]',
    enableGrab: true,
    preloadImage: true,
    transitionDuration: 0.5,
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0, 1)',
    bgColor: 'white',
    bgOpacity: 1,
    scaleBase: 0.1,
    scaleExtra: 0.1,
    scrollThreshold: 40,
    customSize: null,
    onOpen: null,
    onClose: null,
    onRelease: null,
    onBeforeOpen: null,
    onBeforeClose: null,
    onBeforeGrab: null,
    onBeforeMove: null,
    onBeforeRelease: null
});

zooming.listen('.product__image')
