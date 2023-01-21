[jupiter-api](../README.md) / Jupiter

# Class: Jupiter

Entry-point for the third-party Jupiter API.

**`Remarks`**

Retrieves student grades, courses, and assignments. See [https://jupitered.com/](https://jupitered.com/) for more information about the JupiterEd platform. Based on the Puppeteer web-crawling library, found at [https://github.com/puppeteer/puppeteer](https://github.com/puppeteer/puppeteer).

**`Version`**

0.5.0

## Table of contents

### Methods

- [launch](Jupiter.md#launch)
- [connect](Jupiter.md#connect)
- [request](Jupiter.md#request)

## Methods

### launch

▸ `Static` **launch**(`options?`): `Promise`<[`Jupiter`](Jupiter.md)\>

Launches a Chromium instance and constructs a `Jupiter` object.

**`Example`**

```ts
Jupiter.launch().then(async (jupiter) => {
     // Perform requests
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `PuppeteerLaunchOptions` | Options to configure Puppeteer launching behavior |

#### Returns

`Promise`<[`Jupiter`](Jupiter.md)\>

Promise resolving to `Jupiter` object

#### Defined in

index.ts:39

___

### connect

▸ `Static` **connect**(`options`): `Promise`<[`Jupiter`](Jupiter.md)\>

Connects to an existing Chromium instance and constructs a `Jupiter` object.

**`Example`**

```ts
Jupiter.connect({...options}).then(async (jupiter) => {
     // Perform requests
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `ConnectOptions` | Options to configure Puppeteer browser behavior |

#### Returns

`Promise`<[`Jupiter`](Jupiter.md)\>

Promise resolving to `Jupiter` object

#### Defined in

index.ts:57

___

### request

▸ **request**(`request`): `Promise`<[`Scraper`](Scraper.md)\>

Creates a new Jupiter request and returns a `Scraper` object.

**`Example`**

```ts
jupiter.request({
     id: '#########',
     password: '#########',
     school: 'Bronx High School of Science',
     city: 'New York City',
     state: 'us_ny'
}).then(async (scraper) => {
     // Retrieve and parse data
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`JupiterRequest`](../interfaces/JupiterRequest.md) | Login details for [https://login.jupitered.com/login/](https://login.jupitered.com/login/) |

#### Returns

`Promise`<[`Scraper`](Scraper.md)\>

Promise resolving to `Scraper` object

#### Defined in

index.ts:81
