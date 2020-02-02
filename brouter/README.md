BRouter
=======

## Real-Time Rescue Fork
The purpose of Real-Time Rescue's fork of this project is to allow us to make a few small but critical changes to the core engine. The functional differences between this fork and the origial are as follows:
 * Add the `maxalt` query parameter. This parameter defines the maximum allowable altitude for a road sement to be on.
 * No-Go weighting in the calculate distance function. When a road is encounterd with nodes that are above the maximum altitude, the no-go cost is set and the road segment is avoided.
 * Support is available for higher resolution datasets. The OpenStreetMaps elevation data is limited, and better data is available thanks to efforts from Florida's Division of Disaster Management. Points can be selected to search for nearby higher altitude areas.


## Back to BRouter's README




BRouter is a configurable OSM offline router with elevation awareness, Java +
Android. Designed to be multi-modal with a particular emphasis on bicycle
and energy-based car routing.

For more infos see [http://brouter.de/brouter](http://brouter.de/brouter).


## BRouter on Android

You can install the BRouter app on your Android device from
[F-Droid](https://f-droid.org/packages/btools.routingapp) or [Google Play
Store](https://play.google.com/store/apps/details?id=btools.routingapp). You
can also [build BRouter](#build-and-install) yourself. You can find detailed
documentation of the BRouter Android app in
[`misc/readmes/readme.txt`](misc/readmes/readme.txt).

<a href="https://f-droid.org/packages/btools.routingapp" target="_blank">
<img src="https://f-droid.org/badge/get-it-on.png" alt="Get it on F-Droid" height="90"/></a>
<a href="https://play.google.com/store/apps/details?id=btools.routingapp" target="_blank">
<img src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png" alt="Get it on Google Play" height="90"/></a>

### Android with Locus

You can use BRouter as the offline routing engine for [Locus
Map](https://www.locusmap.eu/) on your Android device. This is currently the
most featureful and maintained solutions for using BRouter on your Android
device.

A full documentation on how to set this up is available at
[https://www.locusmap.eu/locus-map-can-navigate-offline/](https://www.locusmap.eu/locus-map-can-navigate-offline/).


### Android with OSMAnd

Alternatively, you can also use BRouter as the offline routing engine for
[OSMAnd](https://osmand.net/) on your Android device.

A full documentation on how to set this up is available at
[`misc/readmes/osmand/README.md`](misc/readmes/osmand/README.md).


## BRouter on Windows/Linux/Mac OS

### Build and Install

To compile BRouter (including the BRouter Android app), use

```
mvn clean install -Dandroid.sdk.path=<your-sdk-path>
```

If you only want to compile BRouter and the server part (skipping the Android
app), use

```
mvn clean install -pl '!brouter-routing-app'
```

You can use `-Dmaven.javadoc.skip=true` to skip the JavaDoc processing and
`-DskipTests` to skip running the unitary tests.


### Get the required segments (data) files

Routing data files are organised as 5*5 degree files,
with the filename containing the south-west corner
of the square, which means:

- You want to route near West48/North37 -> you need `W50_N35.rd5`
- You want to route near East7/North47 -> you need `E5_N45.rd5`

These data files, called "segments" across BRouter, are generated from
[OpenStreetMap](https://www.openstreetmap.org/) data and stored in a custom
binary format (rd5) for improved efficiency of BRouter routing.


#### Download them from brouter.de

Segments files from the whole planet are generated weekly at
[http://brouter.de/brouter/segments4/](http://brouter.de/brouter/segments4/).

You can download one or more segments files, covering the area of the planet
your want to route, into the `misc/segments4` directory.

#### Generate your own segments files

You can also generate the segments files you need directly from a planet dump
of OpenStreetMap data (or a [GeoFabrik extract](https://download.geofabrik.de/)).

More documentation of this is available in the
[`misc/readmes/mapcreation.md`](misc/readmes/mapcreation.md) file.


### (Optional) Generate profile variants

This repository holds examples of BRouter profiles for many different
transportation modes. Most of these can be easily customized by setting
variables in the first `global` context of the profiles files.

An helper script is available in `misc/scripts/generate_profile_variants.sh`
to help you quickly generate variants based on the default profiles, to create
a default set of profiles covering most of the basic use cases.

Have a look at the
[`misc/readmes/profile_developers_guide.txt`](misc/readmes/profile_developers_guide.txt)
for an in-depth guide on profiles edition and customization.


### Run the BRouter HTTP server

Helpers scripts are provided in `misc/scripts/standalone` to quickly spawn a
BRouter HTTP server for various platforms.

* Linux/Mac OS: `./misc/scripts/standalone/server.sh`
* Windows (using Bash): `./misc/scripts/standalone/server.sh`
* Windows (using CMD): `misc\scripts\standalone\server.cmd`

The API endpoints exposed by this HTTP server are documented in the
[`brouter-server/src/main/java/btools/server/request/ServerHandler.java`](brouter-server/src/main/java/btools/server/request/ServerHandler.java)
file.


## Documentation

More documentation is available in the [`misc/readmes`](misc/readmes) folder.


## Related Projects

* [nrenner/BRouter-web](https://github.com/nrenner/brouter-web), a web interface on
    top of the BRouter HTTP server. An online instance is available at
    [http://brouter.de/brouter-web/](http://brouter.de/brouter-web/).
* [poutnikl/Brouter-profiles](https://github.com/poutnikl/Brouter-profiles/wiki),
    a collection of BRouter profiles.
* [Phyks/BRouterTesting](https://github.com/Phyks/BrouterTesting), a
    collection of test cases for helping develop new BRouter profiles.


## License

BRouter is released under an [MIT License](LICENSE).