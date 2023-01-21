[jupiter-api](../README.md) / Navigator

# Class: Navigator

Crawls the student front-end of Jupiter.

## Table of contents

### Constructors

- [constructor](Navigator.md#constructor)

### Methods

- [login](Navigator.md#login)
- [toggleNav](Navigator.md#togglenav)
- [goCourse](Navigator.md#gocourse)
- [fixCourses](Navigator.md#fixcourses)
- [getElement](Navigator.md#getelement)
- [getElements](Navigator.md#getelements)
- [getHtml](Navigator.md#gethtml)

## Constructors

### constructor

• **new Navigator**(`page`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `page` | `Page` | Puppeteer `Page` to navigate |

#### Defined in

[scraper/navigator.ts:14](https://github.com/Wolfiej-k/jupiter-api/blob/a3e10ae/lib/scraper/navigator.ts#L14)

## Methods

### login

▸ **login**(`request`): `Promise`<`boolean`\>

Logs in to the Jupiter web client.

**`Example`**

```ts
navigator.login({
     id: '#########',
     password: '#########',
     school: 'Bronx High School of Science',
     city: 'New York City',
     state: 'us_ny'
}).then((res) => {
     if (res) {
         console.log('Login successful')
     } else {
         console.log('Login failed')
     }
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`JupiterRequest`](../interfaces/JupiterRequest.md) | Login details for [https://login.jupitered.com/login/](https://login.jupitered.com/login/) |

#### Returns

`Promise`<`boolean`\>

Promise resolving to `true` if successful

#### Defined in

[scraper/navigator.ts:41](https://github.com/Wolfiej-k/jupiter-api/blob/a3e10ae/lib/scraper/navigator.ts#L41)

___

### toggleNav

▸ **toggleNav**(): `Promise`<`void`\>

Opens or closes the left navbar.

#### Returns

`Promise`<`void`\>

#### Defined in

[scraper/navigator.ts:58](https://github.com/Wolfiej-k/jupiter-api/blob/a3e10ae/lib/scraper/navigator.ts#L58)

___

### goCourse

▸ **goCourse**(`course`): `Promise`<`void`\>

Navigates to course information page.

**`Remarks`**

`goCourse()` searches for `div` elements with the course name as an attribute. Since Jupiter provides no indexable information by default, it is necessary to first call `fixCourses()` to set the attributes and add this functionality.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `course` | `string` | Exact name of the course to visit |

#### Returns

`Promise`<`void`\>

#### Defined in

[scraper/navigator.ts:70](https://github.com/Wolfiej-k/jupiter-api/blob/a3e10ae/lib/scraper/navigator.ts#L70)

___

### fixCourses

▸ **fixCourses**(): `Promise`<`void`\>

Sets the `classname` attribute to the course name for each course listed in the navbar.

**`See`**

[goCourse](Navigator.md#gocourse) for more information.

#### Returns

`Promise`<`void`\>

#### Defined in

[scraper/navigator.ts:85](https://github.com/Wolfiej-k/jupiter-api/blob/a3e10ae/lib/scraper/navigator.ts#L85)

___

### getElement

▸ **getElement**(`selector`): `Promise`<``null`` \| `ElementHandle`<`Element`\>\>

Retrieve the first HTML element on the page matching a query.

**`Example`**

```ts
navigator.getElement('.printmargin').then(async (handle) => {
     // Read or change HTML element
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selector` | `string` | Puppeteer search query |

#### Returns

`Promise`<``null`` \| `ElementHandle`<`Element`\>\>

Promise resolving to an `ElementHandle` or null if the target is not present

#### Defined in

[scraper/navigator.ts:109](https://github.com/Wolfiej-k/jupiter-api/blob/a3e10ae/lib/scraper/navigator.ts#L109)

___

### getElements

▸ **getElements**(`selector`): `Promise`<`ElementHandle`<`Element`\>[]\>

Retrieve all HTML elements on the page matching a query.

**`Example`**

```ts
navigator.getElements('div[iscourse=true]').then(async (handles) => {
     for (const handle of handles) {
         // Read or change HTML element
     }
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selector` | `string` | Puppeteer search query |

#### Returns

`Promise`<`ElementHandle`<`Element`\>[]\>

Promise resolving to an `ElementHandle` array

#### Defined in

[scraper/navigator.ts:126](https://github.com/Wolfiej-k/jupiter-api/blob/a3e10ae/lib/scraper/navigator.ts#L126)

___

### getHtml

▸ **getHtml**(`element`): `Promise`<`undefined` \| `string`\>

Retrieve raw HTML from an HTML `ElementHandle`.

**`Example`**

```ts
navigator.getHtml(handle).then(async (html) => {
     // Parse raw HTML tags
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | ``null`` \| `ElementHandle`<`Element`\> | Handle to HTML element, null-safe |

#### Returns

`Promise`<`undefined` \| `string`\>

Promise resolving to raw HTML string or `undefined` if not present

#### Defined in

[scraper/navigator.ts:141](https://github.com/Wolfiej-k/jupiter-api/blob/a3e10ae/lib/scraper/navigator.ts#L141)
