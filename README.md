mdgt.js
=======
**mdgt** is a microservice which parses microdata.  **mdgt.js** is a port
to the node ecosystem.

Although **mdgt.js** isn't quite usable yet, you can still give it a try
by running `node . [provider] [query]` from inside its directory. E.g.
`node . wp Node.js` will retrieve the title and synopsis of the Node.js
Wikipedia entry.

Providers
---------
Providers are entirely compatible with [**mdgt**](https://github.com/jjcamp/mdgt)
providers.  Providers that are currently available:
* `wp` (Wikipedia)
* `actor` (from IMDB)
* `movie` (from IMDB)
* `stock` (from Google)
