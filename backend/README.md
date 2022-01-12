# TOTA backend

## Dependencies:

- Ruby v3
- Rails v6.1
- PostgreSQL v11

## Local installation

These are the steps to run the project locally:

### Installing ruby dependencies

On the project's root run `bundle install`.

### Database

#### Create database schema

`bin/rails db:setup` to setup the database

#### Database seeds for development

Copy CSV files with indicators and other entities data into `app/db/csvs` and run all importers `bin/rails import:all`.

### Run the server

`bin/dev` and access the project on `http://localhost:4000`

If you want to debug rails app, running it through foreman could be not the best idea. In that case you can run css and js bundling
using foreman `bin/watch` and the server in the standard way in a separate terminal tab.

### Run the tests

`bundle exec rspec`

#### Full page screenshots

By default, whenever spec fails, screenshot of the viewport is taken. The same can be achieved by invoking `take_screenshot` method
in spec. It is also possible to take screenshot of the whole page, specs needs to be run with `FULL_SCREENSHOT=true` ENV variable.

To see details check `support/full_screenshot_extension.rb`

### Run linters

`bundle exec rubocop`

### Model annotations

To annotate models run

`bundle exec annotate --models`

## Themes and Widgets configuration

Themes and widgets configuration is held in both frontend and backend application.

Frontend keeps widget, indicators and data transformation configuration and Backend keeps all texts like titles, descriptions, notes, sources.

Backend initial configration is stored in `config/themes.yml`. After loading that to the database, the admin can manage those fields.

To sync themes&widgets with `themes.yml` definition file (add new, remove obsolete) run `bundle exec rails themes:update`. This task runs
after every deploy to sync production database. The sync will not update titles, description and any properties of already existing
themes and widgets. It will only add non-existing and remove those that were removed from configration file.

To sync ALL properties of ALL themes and widgets you need to run `bundle exec rails themes:reimport`. That will remove all Themes
from database and re-add from configuration file.

To run `reimport` task on production you need to append `FORCE=true` ENV variable (`bundle exec rails themes:reimport FORCE=true`)

## API docs

All API endpoints are prefixed by `/api/v1`.

Query parameters:

* `filter[field_name]` - filter by field name, exact match, example `filter[category_1]=category_1&filter[category_2]=category_2`
* `fields` - select fields to return, example `/organizations?fields=id,latitude,longitude` will return only those 3 attributes for each organization

### Regions

#### `GET /regions`

Returns all regions

#### `GET /regions?filter[region_type]=province,tourism_region`

Only provinces and tourism regions.

### Organizations

#### `GET /organizations`

#### `GET /organizations.geojson`

Return as geojson FeatureCollection

### Development funds

#### `GET /development_funds`

#### `GET /development_funds.geojson`

Return as geojson FeatureCollection

### Indicators

### `GET /indicators`

### Themes

### `GET /themes`

Returns all themes

### Widgets

### `GET /widgets`

Returns all widgets

### `GET /widgets?filter[theme.slug]=general_insights`

Returns all widgets for ex. `general_insights` theme
