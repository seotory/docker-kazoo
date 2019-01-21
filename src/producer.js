const kafka = require('kafka-node');

const info = {
    kafkaHost: '127.0.0.1:29092,127.0.0.1:39092,127.0.0.1:49092'
}

const options = {
    // Configuration for when to consider a message as acknowledged, default 1
    requireAcks: 1,
    // The amount of time in milliseconds to wait for all acks before considered, default 100ms
    ackTimeoutMs: 100,
    // Partitioner type (default = 0, random = 1, cyclic = 2, keyed = 3, custom = 4), default 0
    partitionerType: 3
}

const client = new kafka.KafkaClient(info);
const producer = new kafka.Producer(client, options);

let payloadWithKey = (key, message) => {
    return [{topic: 'test-topic', messages: new kafka.KeyedMessage(key, message), key: key}]
}

producer.on('ready', () => {
    Array(100).fill().map((v,i) => {
        let key = i % 2 == 0 ? '1' : '2';
        let message = 'i: ' + i + ', key: ' + key + ' [hi!!!222]';
        producer.send(payloadWithKey(key, message), function (err, data) {
            console.log(data);
        });
    });
});

producer.on('error', (err) => {
    console.log(err);
})