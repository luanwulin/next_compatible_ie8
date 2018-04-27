<img width="112" alt="screen shot 2016-10-25 at 2 37 27 pm" src="https://cloud.githubusercontent.com/assets/13041/19686250/971bf7f8-9ac0-11e6-975c-188defd82df1.png">

[![NPM version](https://img.shields.io/npm/v/next.svg)](https://www.npmjs.com/package/next)
[![Build Status](https://travis-ci.org/zeit/next.js.svg?branch=master)](https://travis-ci.org/zeit/next.js)
[![Build status](https://ci.appveyor.com/api/projects/status/gqp5hs71l3ebtx1r/branch/master?svg=true)](https://ci.appveyor.com/project/arunoda/next-js/branch/master)
[![Coverage Status](https://coveralls.io/repos/zeit/next.js/badge.svg?branch=master)](https://coveralls.io/r/zeit/next.js?branch=master)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/next-js)

Next.js is a minimalistic framework for server-rendered React applications.

**Visit [learnnextjs.com](https://learnnextjs.com) to get started with Next.js.**

---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- https://github.com/thlorenz/doctoc -->

- [How to use](#how-to-use)
  - [Setup](#setup)
  - [Automatic code splitting](#automatic-code-splitting)
  - [CSS](#css)
    - [Built-in CSS support](#built-in-css-support)
    - [CSS-in-JS](#css-in-js)
  - [Static file serving (e.g.: images)](#static-file-serving-eg-images)
  - [Populating `<head>`](#populating-head)
  - [Fetching data and component lifecycle](#fetching-data-and-component-lifecycle)
  - [Routing](#routing)
    - [With `<Link>`](#with-link)
    - [Imperatively](#imperatively)
      - [Router Events](#router-events)
      - [Shallow Routing](#shallow-routing)
    - [Using a Higher Order Component](#using-a-higher-order-component)
  - [Prefetching Pages](#prefetching-pages)
    - [With `<Link>`](#with-link-1)
    - [Imperatively](#imperatively-1)
  - [Custom server and routing](#custom-server-and-routing)
  - [Dynamic Import](#dynamic-import)
  - [Custom `<Document>`](#custom-document)
  - [Custom error handling](#custom-error-handling)
  - [Custom configuration](#custom-configuration)
  - [Customizing webpack config](#customizing-webpack-config)
  - [Customizing babel config](#customizing-babel-config)
  - [CDN support with Asset Prefix](#cdn-support-with-asset-prefix)
- [Production deployment](#production-deployment)
- [Static HTML export](#static-html-export)
- [Multi Zones](#multi-zones)
- [Recipes](#recipes)
- [FAQ](#faq)
- [Contributing](#contributing)
- [Authors](#authors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How to use

### Setup

Install it:

```bash
npm install --save next react react-dom
```

> Next.js only supports [React 16](https://reactjs.org/blog/2017/09/26/react-v16.0.html).<br/>
> We had to drop React 15 support due to the way React 16 works and how we use it.

and add a script to your package.json like this:

```json
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

After that, the file-system is the main API. Every `.js` file becomes a route that gets automatically processed and rendered.

Populate `./pages/index.js` inside your project:

```jsx
export default () => <div>Welcome to next.js!</div>
```

and then just run `npm run dev` and go to `http://localhost:3000`. To use another port, you can run `npm run dev -- -p <your port here>`.

So far, we get:

- Automatic transpilation and bundling (with webpack and babel)
- Hot code reloading
- Server rendering and indexing of `./pages`
- Static file serving. `./static/` is mapped to `/static/`

To see how simple this is, check out the [sample app - nextgram](https://github.com/zeit/nextgram)

### Automatic code splitting

Every `import` you declare gets bundled and served with each page. That means pages never load unnecessary code!

```jsx
import cowsay from 'cowsay-browser'

export default () =>
  <pre>
    {cowsay.say({ text: 'hi there!' })}
  </pre>
```

### CSS

#### Built-in CSS support

<p><details>
  <summary><b>Examples</b></summary>
  <ul><li><a href="./examples/basic-css">Basic css</a></li></ul>
</details></p>

We bundle [styled-jsx](https://github.com/zeit/styled-jsx) to provide support for isolated scoped CSS. The aim is to support "shadow CSS" similar to Web Components, which unfortunately [do not support server-rendering and are JS-only](https://github.com/w3c/webcomponents/issues/71).

```jsx
export default () =>
  <div>
    Hello world
    <p>scoped!</p>
    <style jsx>{`
      p {
        color: blue;
      }
      div {
        background: red;
      }
      @media (max-width: 600px) {
        div {
          background: blue;
        }
      }
    `}</style>
    <style global jsx>{`
      body {
        background: black;
      }
    `}</style>
  </div>
```

Please see the [styled-jsx documentation](https://www.npmjs.com/package/styled-jsx) for more examples.

#### CSS-in-JS

<p><details>
  <summary>
    <b>Examples</b>
    </summary>
  <ul><li><a href="./examples/with-styled-components">Styled components</a></li><li><a href="./examples/with-styletron">Styletron</a></li><li><a href="./examples/with-glamor">Glamor</a></li><li><a href="./examples/with-glamorous">Glamorous</a></li><li><a href="./examples/with-cxs">Cxs</a></li><li><a href="./examples/with-aphrodite">Aphrodite</a></li><li><a href="./examples/with-fela">Fela</a></li></ul>
</details></p>

It's possible to use any existing CSS-in-JS solution. The simplest one is inline styles:

```jsx
export default () => <p style={{ color: 'red' }}>hi there</p>
```

To use more sophisticated CSS-in-JS solutions, you typically have to implement style flushing for server-side rendering. We enable this by allowing you to define your own [custom `<Document>`](#user-content-custom-document) component that wraps each page.

#### Importing CSS / Sass / Less files

To support importing `.css` `.scss` or `.less` files you can use these modules, which configure sensible defaults for server rendered applications.

- [@zeit/next-css](https://github.com/zeit/next-plugins/tree/master/packages/next-css)
- [@zeit/next-sass](https://github.com/zeit/next-plugins/tree/master/packages/next-sass)
- [@zeit/next-less](https://github.com/zeit/next-plugins/tree/master/packages/next-less)

### Static file serving (e.g.: images)

Create a folder called `static` in your project root directory. From your code you can then reference those files with `/static/` URLs:

```jsx
export default () => <img src="/static/my-image.png" alt="my image" />
```

### Populating `<head>`

<p><details>
  <summary><b>Examples</b></summary>
  <ul>
    <li><a href="./examples/head-elements">Head elements</a></li>
    <li><a href="./examples/layout-component">Layout component</a></li>
  </ul>
</details></p>

We expose a built-in component for appending elements to the `<head>` of the page.

```jsx
import Head from 'next/head'

export default () =>
  <div>
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <p>Hello world!</p>
  </div>
```

To avoid duplicate tags in your `<head>` you can use the `key` property, which will make sure the tag is only rendered once:

```jsx
import Head from 'next/head'
export default () => (
  <div>
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
    </Head>
    <Head>
      <meta name="viewport" content="initial-scale=1.2, width=device-width" key="viewport" />
    </Head>
    <p>Hello world!</p>
  </div>
)
```

In this case only the second `<meta name="viewport" />` is rendered.

_Note: The contents of `<head>` get cleared upon unmounting the component, so make sure each page completely defines what it needs in `<head>`, without making assumptions about what other pages added_

### Fetching data and component lifecycle

<p><details>
  <summary><b>Examples</b></summary>
  <ul><li><a href="./examples/data-fetch">Data fetch</a></li></ul>
</details></p>

When you need state, lifecycle hooks or **initial data population** you can export a `React.Component` (instead of a stateless function, like shown above):

```jsx
import React from 'react'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
    return (
      <div>
        Hello World {this.props.userAgent}
      </div>
    )
  }
}
```

Notice that to load data when the page loads, we use `getInitialProps` which is an [`async`](https://zeit.co/blog/async-and-await) static method. It can asynchronously fetch anything that resolves to a JavaScript plain `Object`, which populates `props`.

Data returned from `getInitialProps` is serialized when server rendering, similar to a `JSON.stringify`. Make sure the returned object from `getInitialProps` is a plain `Object` and not using `Date`, `Map` or `Set`.

For the initial page load, `getInitialProps` will execute on the server only. `getInitialProps` will only be executed on the client when navigating to a different route via the `Link` component or using the routing APIs.

_Note: `getInitialProps` can **not** be used in children components. Only in `pages`._

<br/>

> If you are using some server only modules inside `getInitialProps`, make sure to [import them properly](https://arunoda.me/blog/ssr-and-server-only-modules).
> Otherwise, it'll slow down your app.

<br/>

You can also define the `getInitialProps` lifecycle method for stateless components:

```jsx
const Page = ({ stars }) =>
  <div>
    Next stars: {stars}
  </div>

Page.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page
```

`getInitialProps` receives a context object with the following properties:

- `pathname` - path section of URL
- `query` - query string section of URL parsed as an object
- `asPath` - `String` of the actual path (including the query) shows in the browser
- `req` - HTTP request object (server only)
- `res` - HTTP response object (server only)
- `jsonPageRes` - [Fetch Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object (client only)
- `err` - Error object if any error is encountered during the rendering

### Routing

#### With `<Link>`

<p><details>
  <summary><b>Examples</b></summary>
  <ul>
    <li><a href="./examples/hello-world">Hello World</a></li>
  </ul>
</details></p>

Client-side transitions between routes can be enabled via a `<Link>` component. Consider these two pages:

```jsx
// pages/index.js
import Link from 'next/link'

export default () =>
  <div>
    Click{' '}
    <Link href="/about">
      <a>here</a>
    </Link>{' '}
    to read more
  </div>
```

```jsx
// pages/about.js
export default () => <p>Welcome to About!</p>
```

__Note: use [`<Link prefetch>`](#prefetching-pages) for maximum performance, to link and prefetch in the background at the same time__

Client-side routing behaves exactly like the browser:

1. The component is fetched
2. If it defines `getInitialProps`, data is fetched. If an error occurs, `_error.js` is rendered
3. After 1 and 2 complete, `pushState` is performed and the new component is rendered

Each top-level component receives a `url` property with the following API:

- `pathname` - `String` of the current path excluding the query string
- `query` - `Object` with the parsed query string. Defaults to `{}`
- `asPath` - `String` of the actual path (including the query) shows in the browser
- `push(url, as=url)` - performs a `pushState` call with the given url
- `replace(url, as=url)` - performs a `replaceState` call with the given url

The second `as` parameter for `push` and `replace` is an optional _decoration_ of the URL. Useful if you configured custom routes on the server.

##### With URL object

<p><details>
  <summary><b>Examples</b></summary>
  <ul>
    <li><a href="./examples/with-url-object-routing">With URL Object Routing</a></li>
  </ul>
</details></p>

The component `<Link>` can also receive an URL object and it will automatically format it to create the URL string.

```jsx
// pages/index.js
import Link from 'next/link'

export default () =>
  <div>
    Click{' '}
    <Link href={{ pathname: '/about', query: { name: 'Zeit' } }}>
      <a>here</a>
    </Link>{' '}
    to read more
  </div>
```

That will generate the URL string `/about?name=Zeit`, you can use every property as defined in the [Node.js URL module documentation](https://nodejs.org/api/url.html#url_url_strings_and_url_objects).

##### Replace instead of push url

The default behaviour for the `<Link>` component is to `push` a new url into the stack. You can use the `replace` prop to prevent adding a new entry.

```jsx
// pages/index.js
import Link from 'next/link'

export default () =>
  <div>
    Click{' '}
    <Link href="/about" replace>
      <a>here</a>
    </Link>{' '}
    to read more
  </div>
```

##### Using a component that supports `onClick`

`<Link>` supports any component that supports the `onClick` event. In case you don't provide an `<a>` tag, it will only add the `onClick` event handler and won't pass the `href` property.

```jsx
// pages/index.js
import Link from 'next/link'

export default () =>
  <div>
    Click{' '}
    <Link href="/about">
      <img src="/static/image.png" alt="image" />
    </Link>
  </div>
```

##### Forcing the Link to expose `href` to its child

If child is an `<a>` tag and doesn't have a href attribute we specify it so that the repetition is not needed by the user. However, sometimes, you’ll want to pass an `<a>` tag inside of a wrapper and the `Link` won’t recognize it as a *hyperlink*, and, consequently, won’t transfer its `href` to the child. In cases like that, you should define a boolean `passHref` property to the `Link`, forcing it to expose its `href` property to the child.

**Please note**: using a tag other than `a` and failing to pass `passHref` may result in links that appear to navigate correctly, but, when being crawled by search engines, will not be recognized as links (owing to the lack of `href` attribute). This may result in negative effects on your sites SEO.

```jsx
import Link from 'next/link'
import Unexpected_A from 'third-library'

export default ({ href, name }) =>
  <Link href={href} passHref>
    <Unexpected_A>
      {name}
    </Unexpected_A>
  </Link>
```

##### Disabling the scroll changes to top on page

The default behaviour of `<Link>` is to scroll to the top of the page. When there is a hash defined it will scroll to the specific id, just like a normal `<a>` tag. To prevent scrolling to the top / hash `scroll={false}` can be added to `<Link>`:

```jsx
<Link scroll={false} href="/?counter=10"><a>Disables scrolling</a></Link>
<Link href="/?counter=10"><a>Changes with scrolling to top</a></Link>
```

#### Imperatively

<p><details>
  <summary><b>Examples</b></summary>
  <ul>
    <li><a href="./examples/using-router">Basic routing</a></li>
    <li><a href="./examples/with-loading">With a page loading indicator</a></li>
  </ul>
</details></p>

You can also do client-side page transitions using the `next/router`

```jsx
import Router from 'next/router'

export default () =>
  <div>
    Click <span onClick={() => Router.push('/about')}>here</span> to read more
  </div>
```

Above `Router` object comes with the following API:

- `route` - `String` of the current route
- `pathname` - `String` of the current path excluding the query string
- `query` - `Object` with the parsed query string. Defaults to `{}`
- `asPath` - `String` of the actual path (including the query) shows in the browser
- `push(url, as=url)` - performs a `pushState` call with the given url
- `replace(url, as=url)` - performs a `replaceState` call with the given url

The second `as` parameter for `push` and `replace` is an optional _decoration_ of the URL. Useful if you configured custom routes on the server.

_Note: in order to programmatically change the route without triggering navigation and component-fetching, use `props.url.push` and `props.url.replace` within a component_

##### With URL object
You can use an URL object the same way you use it in a `<Link>` component to `push` and `replace` an url.

```jsx
import Router from 'next/router'

const handler = () =>
  Router.push({
    pathname: '/about',
    query: { name: 'Zeit' }
  })

export default () =>
  <div>
    Click <span onClick={handler}>here</span> to read more
  </div>
```

This uses of the same exact parameters as in the `<Link>` component.

##### Router Events

You can also listen to different events happening inside the Router.
Here's a list of supported events:

- `onRouteChangeStart(url)` - Fires when a route starts to change
- `onRouteChangeComplete(url)` - Fires when a route changed completely
- `onRouteChangeError(err, url)` - Fires when there's an error when changing routes
- `onBeforeHistoryChange(url)` - Fires just before changing the browser's history

> Here `url` is the URL shown in the browser. If you call `Router.push(url, as)` (or similar), then the value of `url` will be `as`.

Here's how to properly listen to the router event `onRouteChangeStart`:

```js
Router.onRouteChangeStart = url => {
  console.log('App is changing to: ', url)
}
```

If you no longer want to listen to that event, you can simply unset the event listener like this:

```js
Router.onRouteChangeStart = null
```

If a route load is cancelled (for example by clicking two links rapidly in succession), `routeChangeError` will fire. The passed `err` will contain a `cancelled` property set to `true`.

```js
Router.onRouteChangeError = (err, url) => {
  if (err.cancelled) {
    console.log(`Route to ${url} was cancelled!`)
  }
}
```

##### Shallow Routing

<p><details>
  <summary><b>Examples</b></summary>
  <ul>
    <li><a href="./examples/with-shallow-routing">Shallow Routing</a></li>
  </ul>
</details></p>

Shallow routing allows you to change the URL without running `getInitialProps`. You'll receive the updated `pathname` and the `query` via the `url` prop of the same page that's loaded, without losing state.

You can do this by invoking either `Router.push` or `Router.replace` with the `shallow: true` option. Here's an example:

```js
// Current URL is "/"
const href = '/?counter=10'
const as = href
Router.push(href, as, { shallow: true })
```

Now, the URL is updated to `/?counter=10`. You can see the updated URL with `this.props.url` inside the `Component`.

You can watch for URL changes via [`componentWillReceiveProps`](https://facebook.github.io/react/docs/react-component.html#componentwillreceiveprops) hook as shown below:

```js
componentWillReceiveProps(nextProps) {
  const { pathname, query } = nextProps.url
  // fetch data based on the new query
}
```

> NOTES:
>
> Shallow routing works **only** for same page URL changes. For an example, let's assume we have another page called `about`, and you run this:
> ```js
> Router.push('/?counter=10', '/about?counter=10', { shallow: true })
> ```
> Since that's a new page, it'll unload the current page, load the new one and call `getInitialProps` even though we asked to do shallow routing.

#### Using a Higher Order Component

<p><details>
  <summary><b>Examples</b></summary>
  <ul>
    <li><a href="./examples/using-with-router">Using the `withRouter` utility</a></li>
  </ul>
</details></p>

If you want to access the `router` object inside any component in your app, you can use the `withRouter` Higher-Order Component. Here's how to use it:

```jsx
import { withRouter } from 'next/router'

const ActiveLink = ({ children, router, href }) => {
  const style = {
    marginRight: 10,
    color: router.pathname === href? 'red' : 'black'
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default withRouter(ActiveLink)
```

The above `router` object comes with an API similar to [`next/router`](#imperatively).

### Prefetching Pages

⚠️ This is a production only feature ⚠️

<p><details>
  <summary><b>Examples</b></summary>
  <ul><li><a href="./examples/with-prefetching">Prefetching</a></li></ul>
</details></p>

Next.js has an API which allows you to prefetch pages.

Since Next.js server-renders your pages, this allows all the future interaction paths of your app to be instant. Effectively Next.js gives you the great initial download performance of a _website_, with the ahead-of-time download capabilities of an _app_. [Read more](https://zeit.co/blog/next#anticipation-is-the-key-to-performance).

> With prefetching Next.js only downloads JS code. When the page is getting rendered, you may need to wait for the data.

#### With `<Link>`

You can add `prefetch` prop to any `<Link>` and Next.js will prefetch those pages in the background.

```jsx
import Link from 'next/link'

// example header component
export default () =>
  <nav>
    <ul>
      <li>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/about">
          <a>About</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/contact">
          <a>Contact</a>
        </Link>
      </li>
    </ul>
  </nav>
```

#### Imperatively

Most prefetching needs are addressed by `<Link />`, but we also expose an imperative API for advanced usage:

```jsx
import Router from 'next/router'

export default ({ url }) =>
  <div>
    <a onClick={() => setTimeout(() => url.pushTo('/dynamic'), 100)}>
      A route transition will happen after 100ms
    </a>
    {// but we can prefetch it!
    Router.prefetch('/dynamic')}
  </div>
```

### Custom server and routing

<p><details>
  <summary><b>Examples</b></summary>
  <ul>
    <li><a href="./examples/custom-server">Basic custom server</a></li>
    <li><a href="./examples/custom-server-express">Express integration</a></li>
    <li><a href="./examples/custom-server-hapi">Hapi integration</a></li>
    <li><a href="./examples/custom-server-koa">Koa integration</a></li>
    <li><a href="./examples/parameterized-routing">Parameterized routing</a></li>
    <li><a href="./examples/ssr-caching">SSR caching</a></li>
  </ul>
</details></p>

#### 项目介绍
{**以下是码云平台说明，您可以替换为您的项目简介**
码云是开源中国推出的基于 Git 的代码托管平台（同时支持 SVN）。专为开发者提供稳定、高效、安全的云端软件开发协作平台
无论是个人、团队、或是企业，都能够用码云实现代码托管、项目管理、协作开发。企业项目请看 [https://gitee.com/enterprises](https://gitee.com/enterprises)}

#### 软件架构
软件架构说明


#### 安装教程

1. xxxx
2. xxxx
3. xxxx

#### 使用说明

1. xxxx
2. xxxx
3. xxxx

#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


#### 码云特技

1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2. 码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5. 码云官方提供的使用手册 [http://git.mydoc.io/](http://git.mydoc.io/)
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
