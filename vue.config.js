const server = 'https://vue.pengblog.xyz/pengblog-SSM/'
const publicPath = 'https://vue.pengblog.xyz/'

module.exports = {

    pwa: {
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // 配置 workbox 插件
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            clientsClaim: true,
            exclude: [/\.map$/, /asset-manifest\.json$/],
            importWorkboxFrom: 'local',
            navigateFallback: publicPath + '/index.html',
            navigateFallbackBlacklist: [
                // Exclude URLs starting with /_, as they're likely an API call
                new RegExp('^/_'),
                // Exclude URLs containing a dot, as they're likely a resource in
                // public/ and not a SPA route
                new RegExp('/[^/]+\\.[^/]+$'),
            ],
            runtimeCaching: [{
                // Match any same-origin request that contains 'api'.
                urlPattern: new RegExp("^" + server),
                // Apply a network-first strategy.
                handler: 'networkFirst',
                options: {
                    // Fall back to the cache after 10 seconds.
                    networkTimeoutSeconds: 10,
                    // Use a custom cache name for this route.
                    cacheName: 'pengblog-SSM-cache',
                    // Configure custom cache expiration.
                    expiration: {
                        maxEntries: 100,
                        maxAgeSeconds: 60*60*24,
                    },
                    // Configure background sync.
                    backgroundSync: {
                        name: 'pengblog-SSM-queue',
                        options: {
                            maxRetentionTime: 60 * 60,
                        },
                    },
                    // Configure which responses are considered cacheable.
                    cacheableResponse: {
                        statuses: [0, 200],
                        headers: {'X-Is-Cacheable': 'true'},
                    },
                    // Configure the broadcast cache update plugin.
                    broadcastUpdate: {
                        channelName: 'pengblog-SSM-update-channel',
                    },
                    // Add in any additional plugin logic you need.
                    plugins: [
                        {cacheDidUpdate: () => {}/* custom plugin code */}
                    ],
                    matchOptions: {
                        ignoreSearch: false,
                    },
                },
            },
                {
                    urlPattern: server + 'favicon.ico',
                    handler: 'cacheFirst',
                    options: {
                        cacheName: 'favicon-ico-cache',
                        expiration: {
                            maxEntries: 1,
                            maxAgeSeconds: 60*60*24,
                        },
                    }
                }
            ]
        }
    }
}