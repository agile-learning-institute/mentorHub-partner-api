# mentorhub-partner-api

This is repository contains the API for the Partner microservice.
- This uses the [mentorhub-mongodb](https://github.com/agile-learning-institute/mentorHub-mongodb) project for a database with test data
- This API supports the [mentorhub-partnerui](https://github.com/agile-learning-institute/mentorHub-partner-ui) front end.

## Prerequisites

- [mentorHub Developers Edition](https://github.com/agile-learning-institute/mentorHub/tree/main/mentorHub-developer-edition)
- NodeJS

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
