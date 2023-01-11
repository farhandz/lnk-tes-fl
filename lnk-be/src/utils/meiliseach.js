const { MeiliSearch } = require('meilisearch');
require('dotenv').config()

module.exports = {
    client() {
        const client = new MeiliSearch({
            host: process.env.HOST_MELISEARCH,
            apiKey: process.env.API_KEY_MEILISEARCH,
        })
        return client
    }
}

