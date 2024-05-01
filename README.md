# mentorhub-partner-api

This is repository contains the API for the Partner microservice.
- This uses the [mentorhub-mongodb](https://github.com/agile-learning-institute/mentorHub-mongodb) project for a database with test data
- This API supports the [mentorhub-partnerui](https://github.com/agile-learning-institute/mentorHub-partner-ui) front end.

## Prerequisites

- [mentorHub Developers Edition](https://github.com/agile-learning-institute/mentorHub/tree/main/mentorHub-developer-edition)
- [NodeJS](https://nodejs.org/en/download)

## Contributing

### Install dependencies
```bash
npm install
```

### Build Typescript for deployment
```bash
npm run build
```

### Run the API locally
```bash
npm run start
```
NOTE: This will also start the backing database and initlize test data

### Build and Test the API container locally
```bash
npm run container
```
NOTE: This will also start the backing database and initlize test data

This will build the new container, and start the mongodb and API container ready for testing. 

## API Testing with CURL
If you want to do more manual testing, here are the curl commands to use

### Test Health Endpoint

This endpoint supports the promethius monitoring standards for a healthcheck endpoint

```bash
curl http://localhost:8084/api/health/

```
NOTE: Not Yet Functional

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

### Test add a person

```bash
curl -X POST http://localhost:8084/api/partner/ \
     -d '{"name":"Foo", "description":"Some short description"}'

```

### Test update a person

```bash
curl -X PATCH http://localhost:8084/api/person/aaaa00000000000000000021 \
     -d '{"description":"Some long description"}'

```

## Observability and Configuration

The ```api/config/``` endpoint will return a list of configuration values. These values are either "defaults" or loaded from an Environment Variable, or found in a singleton configuration file of the same name. Configuration files take precidence over environment variables. The variable "CONFIG_FOLDER" will change the location of configuration files from the default of ```./```

The ```api/health/``` endpoint is a Promethius Healthcheck endpoint.

The [Dockerfile](./Dockerfile) uses a 2-stage build, and supports both amd64 and arm64 architectures. 

