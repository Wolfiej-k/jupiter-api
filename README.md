# Jupiter API

> This library is a third-party API to retrieve student grades, courses, and assignments from the [JupiterEd](https://jupitered.com/) education platform. Implemented using TypeScript, Node.js, and the [Puppeteer](https://github.com/puppeteer/puppeteer) web-crawling library. 

**`Contributors`**
 - Taj Jethwani-Keyser
 - Alex Pan

**`Version`**
0.5.1

## Installation

Install `jupiter-api` from the [npm](https://npmjs.com) package manager.
```bash
npm install --save-dev jupiter-api
```

## Usage

```ts
import { Jupiter } from "jupiter-api"

Jupiter.launch().then(async (jupiter) => {
    const request = {
        "id": "",
        "password": "",
        "school": "",
        "city": "",
        "state": ""
    }

    const scraper = await jupiter.request(request)
    const student = await scraper.data()
    console.log(JSON.stringify(student))
})
```

## Documentation

More detailed information about the API and its implementation may be found [here](docs/README.md).

## License

[MIT](https://choosealicense.com/licenses/mit/)
