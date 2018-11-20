# Changelog

## 0.1.5 (20 Nov 2018)

* Fixed **CRITICAL BUG**: Constructing multiple builders actually shared the same schema object

## 0.1.4 (22 Sep 2018)

* Added `is.datestring()` to allow for string fields that should represent dates

## 0.1.3 (04 Jul 2018)

* Allow `is.object()` to take no arguments in the case of generic objects
* Add support for `is.array()` to define generic arrays

## 0.1.2 (24 Jun 2018)

* Add support for `is.oneOf(values)` to define array of possible values in schema

## 0.1.1 (30 Mar 2018)

* Add support for `is.function()` to define functions in schema

## 0.1.0 (29 Mar 2018)

* Initial release