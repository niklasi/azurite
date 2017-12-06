'use strict';

const storageManager = require('./../../core/blob/StorageManager'),
    js2xmlparser = require("js2xmlparser");
    // model = require('./../../xml/blob/ContainerListXmlModel');

class GetBlobServiceProperties {
    constructor() {
    }

    process(request, res) {
        storageManager.getBlobServiceProperties()
            .then((response) => {
                response.addHttpProperty('content-type', 'application/xml');
                res.set(response.httpProps);
                let transformedModel = this._transformContainerList(response.payload);
                let xmlDoc = js2xmlparser.parse('StorageServiceProperties', transformedModel);
                xmlDoc = xmlDoc.replace(`<?xml version='1.0'?>`, `<?xml version="1.0" encoding="utf-8"?>`);
                xmlDoc = xmlDoc.replace(/\>[\s]+\</g, '><');
                // Forcing Express.js to not touch the charset of the buffer in order to remove charset=utf-8 as part of the content-type
                res.status(200).send(new Buffer(xmlDoc));
            });
    }

    _transformContainerList(properties) {
      return {
        Logging: {
          Version: '1,0',
          Read: false,
          Write: false,
          Delete: false,
          RetentionPolicy: {
            Enabled: false
          }
        },
        HourMetrics: {
          Version: '1,0',
          Enabled: false,
          RetentionPolicy: {
            Enabled: false
          }
        },
        MinuteMetrics: {
          Version: '1,0',
          Enabled: false,
          RetentionPolicy: {
            Enabled: false
          }
        },
        Cors: {}
      }
    }
}

module.exports = new GetBlobServiceProperties;
