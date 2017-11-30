'use strict';

const QueueManager = require('./../../core/queue/QueueManager'),
    QueueMessagesListXmlModel = require('./../../xml/queue/QueueMessageList').QueueMessageListXmlModel,
    QueueMessageXmlModel = require('./../../xml/queue/QueueMessageList').QueueMessageXmlModel,
    AzuriteQueueResponse = require('./../../model/queue/AzuriteQueueResponse');

class SetQueueACL {
    constructor() {
    }

    process(request, res) {
        //TODO: Implement handling of PUT Body
        
        const response = new AzuriteQueueResponse();
        res.set(response.httpProps);
        res.status(204).send(xmlBody);
    }
}

module.exports = new SetQueueACL();