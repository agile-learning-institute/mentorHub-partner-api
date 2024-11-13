# mentorhub-partner-api

This is repository contains the API for the Partner microservice.
- This uses the [mentorhub-mongodb](https://github.com/agile-learning-institute/mentorHub-mongodb) project for a database with test data
- This API supports the [mentorhub-partnerui](https://github.com/agile-learning-institute/mentorHub-partner-ui) front end.

## Prerequisites

- [mentorHub Developers Edition](https://github.com/agile-learning-institute/mentorHub/tree/main/mentorHub-developer-edition)
- [NodeJS](https://nodejs.org/en/download)

### Optional

- [Mongo Compass](https://www.mongodb.com/try/download/compass) - to look into the database
- [Step CI](https://docs.stepci.com/guides/getting-started.html) - to run black-box testing

## Contributing

### Install dependencies
```bash
npm install
```

### Build Typescript for deployment
```bash
npm run build
```

### Run the API locally with Backing Services
```bash
npm run start
```
NOTE: This will also start the backing database and initlize test data

### Run the API locally
```bash
npm run local
```
NOTE: This command assumes that the backing services are already running

### Build and Test the API container locally
```bash
npm run container
```
NOTE: This will also start the backing database and initlize test data

## API Testing with StepCI
```bash
npm run stepci
```
REQUIRES Step CI

NOTE: Step CI tests expect to find the API running at localhost with test data loaded. To build and run the containers with fresh test data before running the StepCI tests use:
```bash
npm run blackbox
```

## API Testing with CURL
If you want to do more manual testing, here are the curl commands to use

### Test Health Endpoint

This endpoint supports the promethius monitoring standards for a healthcheck endpoint

```bash
curl http://localhost:8084/api/health/

```

### Test Config Endpoint

```bash
curl http://localhost:8084/api/config/
```

### Get Partner Names

```bash
curl http://localhost:8084/api/partner/
```

### Test get a partner

```bash
curl http://localhost:8084/api/partner/bbbb00000000000000000000
```

### Test add a partner

```bash
curl -X POST http://localhost:8084/api/partner/ \
     -H "Content-Type: application/json" \
     -d '{"name":"Foo", "description":"Some short description"}'

```

### Test update a partner

```bash
curl -X PATCH http://localhost:8084/api/partner/bbbb00000000000000000000 \
     -H "Content-Type: application/json" \
     -d '{"description":"Some long description"}'
```

### Test Add a contact to a partner

```bash
curl -X POST http://localhost:8084/api/partner/bbbb00000000000000000000/contact/AAAA00000000000000000000
```

### Test Remove a contct from a  partner

```bash
curl -X DELETE http://localhost:8084/api/partner/bbbb00000000000000000000contact/AAAA00000000000000000000
```

## Observability and Configuration

The ```api/config/``` endpoint will return a list of configuration values. These values are either "defaults" or loaded from an Environment Variable, or found in a singleton configuration file of the same name. Configuration files take precidence over environment variables. The variable "CONFIG_FOLDER" will change the location of configuration files from the default of ```./```

The ```api/health/``` endpoint is a Promethius Healthcheck endpoint.

A list of environment variables used by the API and their default values can be found in the [Dockerfile](./Dockerfile). It uses a 2-stage build, and supports both amd64 and arm64 architectures. 
