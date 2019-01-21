const kafka = require('kafka-node');

// const info = {
//     kafkaHost: '127.0.0.1:29092,127.0.0.1:39092,127.0.0.1:49092'
// }

// const client = new kafka.KafkaClient(info);

// let consumer = new kafka.Consumer(
//     client,
//     [
//         {topic: 'test-topic', partition: 0 }, 
//         {topic: 'test-topic', partition: 1 }
//     ],
//     {
//         groupId: 'test-consumer',
//         autoCommit: false,
//         fromOffset: false
//     }
// )

// consumer.on('message', function (message) {
//     console.log(message);
// });

const options = {
    // connect directly to kafka broker (instantiates a KafkaClient)
    kafkaHost: '127.0.0.1:29092,127.0.0.1:39092,127.0.0.1:49092',
    groupId: 'test-consumer',
    autoCommit: false,
    autoCommitIntervalMs: 5000,
    sessionTimeout: 15000,
    // fetchMaxBytes: 10 * 1024 * 1024, // 10 MB
    // An array of partition assignment protocols ordered by preference. 'roundrobin' or 'range' string for
    // built ins (see below to pass in custom assignment protocol)
    // protocol: ['roundrobin'],
    // Offsets to use for new groups other options could be 'earliest' or 'none'
    // (none will emit an error if no offsets were saved) equivalent to Java client's auto.offset.reset
    fromOffset: 'latest',
    // how to recover from OutOfRangeOffset error (where save offset is past server retention)
    // accepts same value as fromOffset
    outOfRangeOffset: 'earliest'
  };

  const consumerGroup = new kafka.ConsumerGroup(options, 'test-topic');

  consumerGroup.on('message', (message) => {
    console.log('Message: ' + message.value, message.key, message.partition, message.offset);
    // console.dir(message);
    //TODO: You can write your code or call messageProcesser function
  });

  consumerGroup.on('error', (error) => {
    console.error(error);
  });