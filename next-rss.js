module.exports = {
    siteTitle: 'example web site',
    siteDescription: 'example web site rss feed',
    siteLanguage: 'en',
    siteCopyright: '©Tadashi Yamazaki',
    siteUrl: 'http://example.com',
    outDir: 'public',
    postsDir: '',
    createFeedItem: (pageProps) => ({
        title: pageProps.postData.title,
        id: `${config.siteUrl}/${config.postsDir}/${pageProps.postData.id}`,
        link: `${config.siteUrl}/${config.postsDir}/${pageProps.postData.id}`,
        date: new Date(pageProps.postData.date)
    }),
}
