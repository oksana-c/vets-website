/* eslint-disable import/no-dynamic-require */

const fs = require('fs');
const path = require('path');

const transformedSchemasDir = path.join(__dirname, '../transformed');
const paragraphSchemas = fs
  .readdirSync(transformedSchemasDir)
  .filter(fileName => fileName.startsWith('paragraph'))
  .map(fileName => {
    const schema = require(`${transformedSchemasDir}/${fileName}`);
    return { $ref: schema.$id };
  });

module.exports = {
  $id: 'Paragraph',
  oneOf: paragraphSchemas,
};
