'use strict';

//Requiring dialogflow dependency
const dialogflow = require('dialogflow');

// Read in credentials from file. To get it, follow instructions here, but
// choose 'API Admin' instead of 'API Client':
// https://dialogflow.com/docs/reference/v2-auth-setup
const credentials = require('./credentials.json');

// Creating entities Client using credentials
const entitiesClient = new dialogflow.EntityTypesClient({
  credentials: credentials,
});

// Using the Agent in Project
const projectId = '<projectIDHere>';
const agentPath = entitiesClient.projectAgentPath(projectId);

// New entity with name - 'city' and entities as follows
const cityEntityType = {
  displayName: 'city',
  kind: 'KIND_MAP',
  entities: [
    {value: 'New York', synonyms: ['New York', 'NYC']},
    {value: 'Los Angeles', synonyms: ['Los Angeles', 'LA', 'L.A.']},
  ],
};

// Calling createEntityType and passing in cityRequest to create our EntityType for city
const cityRequest = {
  parent: agentPath,
  entityType: cityEntityType,
};

entitiesClient
  .createEntityType(cityRequest)
  .then((responses) => {
    console.log('Created new entity type:', JSON.stringify(responses[0]))})
      .catch((err) => {
        console.error('Error creating entity type:', err);
      });
