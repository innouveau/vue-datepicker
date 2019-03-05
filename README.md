# vue-datepicker

## Usage

- include `<div id="datepicker" action="/action.html" lang="nl" days="365" visible-months="2" minimal-period="3"></div>` on your page.
- include `<script src="datepicker.js"></script>` on bottom of page.
- include `<script> window.datePickerBlockedDates = [ '2019/3/20', '2019/4/17',];  </script>`
These are the dates that will be unavailable. This should be put before the `datepicker.js` script tag.


## Options

- `action`: The page were the start and end is sent to after submitting
- `lang`: Language used in user interface: `de`/`nl`
- `days`: Number of days in starting from 1st of this month
- `visible-months`:  Number of months that are visible
- `minimal-period`: Number of days a range should be


## Design context
- use of `fontawesome` is optional. The icons have html fallbacks.
- prefered font is `Montserrat`, but datepicker just inherits.