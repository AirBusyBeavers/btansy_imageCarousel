const cassandra = require('cassandra-driver');

//Local Cassandra DB
// const client = new cassandra.Client({
//   contactPoints: ['127.0.0.1'],
//   localDataCenter: 'datacenter1',
//   keyspace: 'sdc_airbusybeavers'
// });

//EC2 Cassandra DB
const client = new cassandra.Client({
  contactPoints: ['18.144.166.104'],
  localDataCenter: 'datacenter1',
  keyspace: 'sdc'
});

module.exports = client;
