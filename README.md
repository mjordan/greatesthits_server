# GreatestHits

## Overview

A simple proof-of-concept logging service for URLs. GreatesHits only provides storage (in a SQLite database) and a web server (in Express) for enabling inserts and reads on the database. It does not provide any analytics tools - third party applications need to provide those.

Why not use Matomo? While Matomo is awesome, it is focused on campaigns, SEO and analytics services. Greatest Hits does one thing: it stores records documenting when a resource at a URL was requested. Like Matomo, it does this by receiving a request at its own web server's endpoint. If you need Matomo's features, use it. If you only need what Greatest Hits does, you may want to consider using it instead.

## Requirements

* SQLite
* Node.js v11.x or higher
   * Express, SQLite. Both of these Node modules are installed automatically.

## Installation

1. Clone this GitHub repo
1. `npm install`
1. In the `greatesthits` directory, create the SQLite database: `sqlite3 hits.db "create table hits (id INTEGER PRIMARY KEY, time TEXT, url TEXT, type TEXT, source_ip TEXT);"`

## Running the web server

* To run the Greatest Hits web server, run `node GreatestHits.js`.
* To stop the Greatest Hits web server, hit ctrl-c.

## Inserting records

`curl -v "http://localhost:3000/insert?url=http%3A%2F%2Fexample.com%2Fnode%2F30&type=v&ip=142.45.345.56"`

Query parameters:

* `url`: the URL you wanto to record a hit on. Must be URL-encoded.
* `type`: `v` for view, `d` for a download.
* `ip`: IPV4 (for now) address of the requester.

## Important functionality missing (this is a proof of concept)

* authentication
* an API to query usage data on a give URL, for given range of dates, etc.
* a third-party application to do something useful with the collected data (but there is the [GreatestHits](https://github.com/mjordan/greatesthits) Drupal module, which could render some pretty reports)
* geolocation data, e.g., [IP2Location LITE](https://lite.ip2location.com/database/ip-country)

## Maintainer

Mark Jordan

## License

The Unlicense.
