let host = "https://playsoju.netlify.app/?s=https://open.spotify.com";

function redirectSoju(url) {
    const path = url.pathname;
    if (path.endsWith('/')) {
        return `${host}${url.pathname}`;
    } else {
        return `${host}${url.pathname}/`;
    }
}

browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        console.debug(details);
        console.log(`Redirecting ${details.url}...`);
        const url = new URL(details.url);
        let redirect;
        redirect = { redirectUrl: redirectSoju(url) };
        if (redirect && redirect.redirectUrl) {
            console.info("Details", details);
        }
        return redirect;
    },
    {
        urls: [
          "*://open.spotify.com/*"
        ],
    },
    ["blocking"]
);
