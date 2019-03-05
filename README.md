# vue-datepicker

## Usage

- include `<div id="datepicker" lang="nl" days="365" visible-months="2" minimal-period="3"></div>` on your page.
- include `<script src="datepicker.js"></script>` on bottom of page.

## Options

- `lang`: Language used in user interface: `de`/`nl`
- `days`: Number of days in starting from 1st of this month
- `visible-months`:  Number of months that are visible
- `minimal-period`: Number of days a range should be


## Design context
- use of `fontawesome` is optional. The icons have html fallbacks.
- prefered font is `Montserrat`, but datepicker just inherits.