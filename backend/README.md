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

`bin/rails s` and access the project on `http://localhost:4000`

### Run the tests

`bundle exec rspec`

### Run linters

`bundle exec rubocop`

### Model annotations

To annotate models run

`bundle exec annotate --models`

## API docs

All API endpoints are prefixed by /api/v1.

Query parameters:

* `filter[field_name]` - filter by field name, exact match, example `filter[category_1]=category_1&filter[category_2]=category_2`
* `fields` - select fields to return, example `/organizations?fields=id,latitude,longitude` will return only those 3 attributes for each organization

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
