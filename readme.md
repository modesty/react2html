# react2html

React2Html is a component based web site starter kit and build tool, built with ReactJS, SASS, Babel, WebPack and Node.js.

[Component Based Web Application](http://www.codeproject.com/Articles/1045800/Component-Based-Web-Application) prompts data-driven reusable components for developing web applications. React2Html is a starter kit and build tool to enable component based development for web sites: [static web site or service oriented HTML application](http://www.codeproject.com/Articles/118683/SOHA-Service-Oriented-HTML-Application-Concepts-an) can utilize the same data driven reusable component model to improve the effectiveness of site development and updates.   

If you are facing some of the following challenges building a web site, React2Html is here to help:

* Multi-page static site needs to share common components, like header, menu, side bars, footers, analytics, etc.,
* Server-less static site needs SEO without special or additional process
* Ajax based mash-up web site with frequent content updates needs efficient and consistent update mechanism
* Consistent and effective way to minimizing, packaging and uglifying HTML, CSS and JavaScript
* Static web site development needs to apply "separation of concerns" and DRY (Don't Repeat Yourself) philosophies
* Architecturally, web site development needs to be data driven through reusable components' compositions

With React2Html, a multi-page static site can be built by composing reusable React components, and component generates HTML with data models through build process. Runtime model update (user interactions or Ajax) and rendering through Virtual DOM has been covered very well in [React.js](https://facebook.github.io/react/), it's optional with React2HTML: in addition to 'react to changes' at run time, React2Html focus on build-time component re-usability.    

React2Html prompts 'component thinking': the building blocks should be component, rather than actual HTML tags.

## How it works

With React2Html, [React component](https://facebook.github.io/react/docs/component-api.html) replaces [HTML template](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template), all HTML markups are generated from component. Style sheets are modularized by [SASS](http://sass-lang.com/), JavaScript is written in [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import), both SASS and ES6 code are compiled into single bundle separately through [babel](https://babeljs.io/) and [webpack](https://webpack.github.io/). Everything comes together when build script runs, it scans the source code tree per configurations, generating main index.html in the root, also creating sub-directories for each page files, copy over all assets files to the relative path, calling webpack and its plugins to bundle ES5 JavaScript and CSS, and put everything to `target` folder. (configurable)

For example, the source tree looks like this:


        +react2html
          +src
            +images
              -logo.png
            +scripts
              +client
                +util
                  -browser.uti.js
              +components
                -Footer.js
                -Head.js
                -Header.js
                -Main.js
                -Menu.js
              +model
                -footer.js
                -head.js
                -header.js
                -menu.js
              +pages
                -about.js
              -index.js
              -main.js
            +styles
              -_footer.scss
              -_header.scss
              -_layout.scss
              -_mixins.scss
              -_vars.scss
              -main.scss
            -apple-touch-icon.png
            -browserconfig.xml
            -crossdomain.xml
            -favicon.ico
            -humans.txt
            -robots.txt
            -tile.png
            -tile-wide.png				

After running React2Html build script `npm start`, the generated output directory would be:

        +react2html
          +target (Generated)
            +about (Generated) 
              -index.html (Generated)
            +images (Copied)
              -logo.png (Copied)
            +scripts (Generated) 
              -react2html-bundle.js  (Generated)
            +styles (Generated)
              -react2html-bundle.css (Generated)
            -apple-touch-icon.png (Copied)
            -browserconfig.xml (Copied)
            -crossdomain.xml (Copied)
            -favicon.ico (Copied)
            -humans.txt (Copied)
            -index.html (Generated)
            -robots.txt (Copied)
            -tile.png (Copied)
            -tile-wide.png (Copied)

Notice the root `index.js` becomes `index.html`, and all `[page_name].js` files under `pages` folder are compiled and output to `[page_name]_folder\index.html`, clean url is preserved.

All scripts under `model` are all JSON files in the starter kit, they can be replaced by API responses as needed. This separated build-time model approach makes updating web site component a trivial task.

All client side scripts reside in `scripts\client\` folder, the entry point is `scripts\main.js`, any scripts modules imported, directly or indirectly, will be compiled into `scripts\react2html-bundle.js`. Besides, all common JavaScript libraries, like `modernizr`, `jQuery`, etc., are not part of the bundle, they're configured to loaded from CDN.
 
Please note, by default, all scripts under `scripts\components\` are *build time* scripts. If imported through `scripts\main.js`, it'll be part of `scripts\react2html-bundle.js` and participate in client side rendering.

Similarly, all SASS files imported through `styles\main.scss` will be part of the final `target\styles\react2html-bundle.css`. 
 
All generated HTML, CSS and JavaScripts are uglified and minified to improve initial loading performance.  


## Benefits of React2Html

Here below are primary reasons for us to use React2Html for developing static web sites:

* Build-time component model provides reusable and sharable components for creating and updating web pages
* Data driven component becomes possible even for static web site development, no more error-prone copy & paste
* Promotes thinking in components and modules, rather than tags and elements, for productivity and compose-ability 
* Cleaner code, modular structure, fast build and easy deploy
* Leveraging latest technologies: babel for ES6 syntax, to make site JavaScript future-proof
* Better performance: common libraries loaded from CDN or browser cache, site specific JavaScript and CSS are bundled
* Flexible client side JavaScript: any client side JavaScript framework can work with React2Html, React, Polymer, Ember, to name a few if client side JavaScript framework is needed. On the flip side, React2Html can work without any client side JavaScript, jQuery can be removed if no client side scripts is needed
* No special process for SEO: no worry about search engine not loading client JavaScript as SPA does, no special tag and no server-pre-generated HTML content is needed
* Server-less and totally decoupled client code from server, easier develop, deploy and debug 

## Get Started

### Prerequisite

* [NodeJS](https://nodejs.org/en/) 
* [Git](https://git-scm.com/downloads)

### Clone and install dependencies:
    
        $ cd [your_site_dev_folder]
        $ git clone https://github.com/modesty/react2html
        $ npm i		
	
### Build & Run:

For development, auto-rebuilt and auto-reload:
 		
		$ npm start
	
All source code will be scanned and compiled, a simple HTTP server is started automatically, serving everything from `target` folder on port 8181.

Default browser is launched automatically, root `index.html` will automatically loaded.

For production build, run:

		$ npm build
		
### Debug & Develop on localhost

React2Html comes with two watchers built-in: one for static asset files and WebPack watcher for SASS and JavaScripts. Whenever assets files changes, it'll be reflected in `target` folder automatically; Whenever SCSS or JavaScript changes, corresponding component/pages/bundles will be rebuilt and re-deployed.

When site is rebuilt, browser will auto-reload the updated file. 

## Customization

When source tree structure or out put folder/file name needs customized, just update `tool\base.config.js`. Compiled bundle file name and CDN loaded libraries are also configured in the same file.

## Contribution

Participating in this project, you are expected to honor [open code of conduct](http://todogroup.org/opencodeofconduct/#Open+Code+of+Conduct/abuse@todogroup.org).

## License

Licensed under the [Apache License Version 2.0](https://github.com/modesty/react2html/LICENSE).

## Support

I'm currently running this project in my spare time. Thanks all for your [stars](https://github.com/modesty/react2html/stargazers) and [supports](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=modestyZ%40gmail%2ecom&lc=GB&item_name=modesty%20zhang&item_number=git%40github%2ecom%3amodesty%2fpdf2json%2egit&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted).
