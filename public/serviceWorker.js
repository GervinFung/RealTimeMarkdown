const cacheName = 'cache';
const filesToCache = [
    '/',
    '.babelrc',
    'babel.config.js',
    'package-lock.json',
    'package.json',
    'public/favicon.ico',
    'public/img/logo128.png',
    'public/img/logo144.png',
    'public/img/logo152.png',
    'public/img/logo192.png',
    'public/img/logo256.png',
    'public/img/logo512.png',
    'public/img/thankyou.gif',
    'public/index.html',
    'public/manifest.json',
    'public/robots.txt',
    'public/serviceWorker.js',
    'src/css/App.css',
    'src/css/markdown/Markdown.css',
    'src/css/other/Footer.css',
    'src/css/other/Header.css',
    'src/css/other/index.css',
    'src/css/other/Popup.css',
    'src/index.tsx',
    'src/react-app-env.d.ts',
    'src/reportWebVitals.ts',
    'src/setupTests.ts',
    'src/ts/bold.ts',
    'src/ts/code.ts',
    'src/ts/discordSpoilerTag.ts',
    'src/ts/italic.ts',
    'src/ts/markdownConverter.ts',
    'src/ts/markdownUtil.ts',
    'src/ts/orderedList.ts',
    'src/ts/strikeThrough.ts',
    'src/ts/table.ts',
    'src/ts/underline.ts',
    'src/tsx/App.tsx',
    'src/tsx/interface/MarkdownInterface.tsx',
    'src/tsx/markdown/MarkdownEditor.tsx',
    'src/tsx/markdown/MarkdownPreview.tsx',
    'src/tsx/other/Footer.tsx',
    'src/tsx/other/Header.tsx',
    'src/tsx/other/Popup.tsx',
    'tsconfig.json'
];

const startService = () => {
    caches.delete(cacheName);
    this.addEventListener('install', (event) => {
        console.log('Service worker install event!');
        event.waitUntil(
            caches.open(cacheName).then(cache => {
                return cache.addAll(filesToCache);
            }).catch((err) => {
                console.error(err);
            })
        );
        this.skipWaiting();
    })
    this.addEventListener('activate', (event) => {
        console.log('Service worker activate event!');
        event.waitUntil(
            caches.keys().then((keyList) => {
                    return Promise.all(keyList.map((key) => {
                        if (filesToCache.indexOf(key) === -1) {
                            return caches.delete(key);
                        }
                    })
                );
            })
        );
    });
    this.addEventListener('fetch', (event) => {
        console.log('Fetch intercepted for:', event.request.url);
        event.respondWith(
            caches.match(event.request).then((resp) => {
                return resp || fetch(event.request).then(async (response) => {
                    const cache = await caches.open(cacheName);
                    cache.put(event.request, response.clone());
                    return response;
                }).catch((err) => {
                    console.log(err)
                });
            })
        );
    })
}

startService();