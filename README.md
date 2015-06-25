# LNSD.es [![wercker status](https://app.wercker.com/status/ac150e65c3d7a4937a5b59f108747eae/s "wercker status")](https://app.wercker.com/project/bykey/ac150e65c3d7a4937a5b59f108747eae)

My internet website.

Made with [metalsmith][ms], [jade][jd], [sass][sa] & [coffee script][cf].
Built with [grunt.js](gr).
Deployed with [wercker][wr] & [docker][dk].
Hosted on [GitHub Pages][gh].

[ms]:http://metalsmith.io/
[jd]:http://jade-lang.com/
[sa]:http://sass-lang.com/
[cf]:http://coffeescript.org
[gr]:http://gruntjs.com/
[wr]:http://wercker.com/
[dk]:https://www.docker.com/
[gh]:http://pages.github.com/

## Website file structure
```
lnsd.es/
|
|-- index.html (main)		# Welcome page (main)
|-- resume/                 # Resume page
|   `-- index.html
|
|-- blog/
|	|-- index.html          # Blog index page
|	|-- archive.html
|	`-- ...
|
|-- contact/
|	`-- index.html          # Contact page
|
|-- 404.html 				# Custom '404 Page not found' page
|-- feed.xml				# Blog RSS feed file
|-- robots.txt
|
|-- styles/					# CSS styles folder
|-- js/						# Javascript scripts folder
`-- assets/					# Images and more
```