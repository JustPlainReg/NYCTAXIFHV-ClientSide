const invertBy = require('lodash/invertBy')
const fs = require('fs-extra')
const logger = require('../lib/logger')
const reversePathToIdMapping = () => Promise.resolve()
  .then(() => logger.info('Started reverse mapping...'))
  .then(() => {
    let encompassFieldMapping =
    fs.readFileSync('./loan-app/src/common/utils/encompassMapping/EncompassFieldsMapping.json')
    encompassFieldMapping = JSON.parse(encompassFieldMapping)
    let PathToIdMapping = invertBy(encompassFieldMapping)
    let encompassIdMapping = JSON.stringify(PathToIdMapping)
    fs.writeFileSync('./main/src/common/utils/encompassMapping/EncompassIdsMapping.json', encompassIdMapping)
    logger.success(`Generated path to encompass id mapping file successfully`)
  })
  .catch((err) => logger.error('encountered errors during path to encompass id mapping.', err))

reversePathToIdMapping()
