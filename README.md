# Marko API Repository

![](./images/marko_serving_intelligence_800w.jpg)

This repository houses Aramark API Specs being used on the new Drupal 8 version of the Marko Developers Portal.

This Drupal 8 version of the Marko Developers Portal is [currently in development](https://dev-d8-developer-portal.pantheonsite.io/).

Expected go live date is May 15 at the same URL as the current [Drupal 7 production Marko Developers Portal](https://marko-developers.aramark.net/).

The Github "raw" URI for the JSON version of a particular API is placed in the Spec URI (machine name: field_spec) for the content-type "Api Doc".

A custom field template is used to wrap the URI in the [RapiDoc](https://mrin9.github.io/RapiDoc/) web component tag which invokes it and renders it in a compelling and easy to read way. It includes a well done "Try it out" functionality. It is compatible with Swagger 2.0 and OAS 3.0.

Both YAML and JSON version of the specs are housed in this repo. Typically the specs are developed in YAML and then converted to JSON. The RapiDoc renderer requires the JSON.

For question or concers you can use the Issue Queue here or contact Shai Gluskin directly at:

gluskin-samuel@aramark.com.
