# BannerJS
This javascript library provides a simple API to retrieve information from Ellucian Banner. The library is designed to work both in browser and server environments (NodeJS).

BannerJS comes with various configurations for different universities (see the full list of supported universities [here](https://github.com/schedulemaker/bannerjs/wiki/Supported-Universities)). Submissions for new university configurations are always welcome. Please read the [config guidelines](https://github.com/schedulemaker/bannerjs/wiki/University-Config-Guidelines) and submit a pull request.

## Creating a new instance
When createing a new `Banner` instance, pass the name of [one of the supported universites](https://github.com/schedulemaker/bannerjs/wiki/Supported-Universities).
```
var Banner = require('banner');
var banner = new Banner('temple');
```

## Methods
**Note:** all methods are `async` and return Promises unless stated otherwise.
### getTerms()
Returns an array of terms.
```
let terms = await banner.getTerms();
{
  "code": <term code>,
  "description": <term name>
}
```
