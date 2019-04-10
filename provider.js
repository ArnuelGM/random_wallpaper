const axios = require('axios');
const _ = require('lodash');

const getProvider = () => {
    const providers = [
        {
            name: 'pixabay',
            apiKey: 'YOUR_PIXABAY_APY_KEY',
            apiUrl: 'https://pixabay.com/api',
            fetchPhoto: async function(){
                return axios( this.getUrlFetch() );
            },
            getUrlFetch: function(){
                return `${ this.apiUrl }/?key=${ this.apiKey }&category=nature&per_page=200`;
            },
            getRandom: function(obj){
                return obj.hits[ _.random(0, obj.hits.length -1) ].largeImageURL;
            }
        },
        {
            name: 'unsplash',
            apiKey: 'YOUR_UNSPLASH_APY_KEY',
            apiUrl: 'https://api.unsplash.com',
            fetchPhoto: async function(){
                return axios( this.getUrlFetch(), { headers: this.getHeaders() } );
            },
            getUrlFetch: function(){
                const query = 'nature';
                return `${ this.apiUrl }/photos/random?query=${ query }`;
            },
            getHeaders: function(){
                return {
                    'Authorization': `Client-ID ${ this.apiKey }`
                };
            },
            getRandom: function(obj){
                return obj.urls.full;
            }
        },
        {
            name: 'pexels',
            apiKey: 'YOUR_PEXELS_APY_KEY',
            apiUrl: 'https://api.pexels.com',
            fetchPhoto: async function(){
                return axios( this.getUrlFetch(), { headers: this.getHeaders() });
            },
            getUrlFetch: function(){
                const per_page = 1;
                const page = _.random(1, 1000);
                const query = 'nature';
                return `${ this.apiUrl }/v1/search?query=${ query }&per_page=${ per_page }&page=${ page }`;
            },
            getHeaders: function(){
                return {
                    'Authorization': this.apiKey
                };
            },
            getRandom: function(obj){
                return obj.photos[0].src.large2x;
            }
        },
    ];
    return providers[ _.random(0, providers.length -1) ];
}

exports.getUrlPhoto = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const provider = getProvider();
            const fetch = await provider.fetchPhoto();
            const json = await fetch.data;
            const url = provider.getRandom(json);
            resolve({url, provider: provider.name});
        } catch (error) {
            console.log('error: ', error);
            return getUrlPhoto().then( resolve );
        }
    });
}