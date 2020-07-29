importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

if (workbox) {
    console.log('Workbox berhasil dimuat...')
} else {
    console.log('Workbox gagal dimuat...');
}

//Precaching menggunakan workbox
workbox.precaching.precacheAndRoute([
    {url: 'index.html', revision: '1'},
    {url: 'nav.html', revision: '1'},
    {url: 'manifest.json', revision: '1'},
    {url: 'Icon.png', revision: '1'},
    {url: 'Icon - Copy.png', revision: '1'},
    {url: 'js/materialize.min.js', revision: '1'},
    {url: 'css/materialize.min.css', revision: '1'}
])

//Routing menggunakan workbox
workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages' //Nama tempat penyimpanan cache...
    })
);