# Random Wallpaper
Download and set random wallpaper from pixabay, unsplash or pexels for macOS 10.12+, Linux, and Windows 10+.

## Install
Clone this repository and then:
```
$ npm install
```

In file `providers.js` set your api key.

```javascript
const getProvider = () => {
    const providers = [{
        .
        .
        .
        apiKey: "YOU_PROVIDER_API_KEY",
        .
        .
        .
    },
    { ... }
```

## Usage
```
$ node index.js
or
$ npm start
```

## Related
- [wallpaper](https://github.com/sindresorhus/wallpaper)



