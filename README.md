# Google Maps to Any bookmarklet

Opens the coordinates you are looking at on maps.google.com in several other map services. Currently supported are: map.geo.admin.ch, go.geodatenonline.ch, zugmap.ch.

## Usage

1. Create a new bookmark in your favorite browser and give it a name.
2. Copy and paste the following code snippet into the bookmark's address field:

```js
// build/bookmarklet.js
````

When you now go to maps.google.com and then click on the bookmark you just created, it will open the same place in the above mentioned map services.

> [!IMPORTANT]
> Since the bookmarklet opens multiple tabs uppon click, browsers will initiallly prevent all but 1 tabs from opening (popup blocker). Look for a warning or the corresponding icon in the address bar of your browser, then allow popups for maps.google.com permanently to fix this.