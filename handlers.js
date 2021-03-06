const AWS = require('aws-sdk');
const cloudformation = new AWS.CloudFormation();

const createStack = function(callback) {

  var params = {
    StackName: 'MYHPC', /* required */
    Capabilities: [
      'CAPABILITY_IAM'
    ],
    DisableRollback: false,
    /* optionally:
    NotificationARNs: [
      process.env.NOTIFICATION_ARN
    ], */
    Parameters: [
      {
        ParameterKey: 'ComputeInstanceType',
        ParameterValue: 'memory-32C-240GB.xlarge-r4.8xlarge',
        UsePreviousValue: false
      },
      {
        ParameterKey: 'ComputeInitialNodes',
        ParameterValue: '2',
        UsePreviousValue: false
      },
      {
        ParameterKey: 'ComputeMaxNodes',
        ParameterValue: '4',
        UsePreviousValue: false
      },
      {
        ParameterKey: 'AccessUsername',
        ParameterValue: 'alces',
        UsePreviousValue: false
      },
      {
        ParameterKey: 'AccessKeyName',
        ParameterValue: process.env.ACCESS_KEY_NAME,
        UsePreviousValue: false
      },
      {
        ParameterKey: 'AccessNetwork',
        ParameterValue: process.env.ACCESS_NETWORK,
        UsePreviousValue: false
      },
      {
        ParameterKey: 'PersonalityData',
        ParameterValue: '',
        UsePreviousValue: false
      },
      {
        ParameterKey: 'FlightFeatures',
        ParameterValue: 'configure-docker',
        UsePreviousValue: false
      },
      {
        ParameterKey: 'FlightProfileBucket',
        ParameterValue: '',
        UsePreviousValue: false
      },
      {
        ParameterKey: 'FlightProfiles',
        ParameterValue: '',
        UsePreviousValue: false
      },
      {
        ParameterKey: 'AutoscalingPolicy',
        ParameterValue: 'enabled',
        UsePreviousValue: false
      }
    ],
    Tags: [
      {
        Key: 'client',
        Value: 'awspsdemo'
      }
    ],
    TemplateURL: process.env.TEMPLATE_URL,
    TimeoutInMinutes: 30
  };
  cloudformation.createStack(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });

  callback(null, 'HPC started');

};

const deleteStack = function(callback) {
  const cloudformation = new AWS.CloudFormation();
  var params = {
    StackName: 'MYHPC',
  };
  cloudformation.deleteStack(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });

  callback(null, "HPC stopped");
};

module.exports.press = function (event, context, callback) {
  var params = { StackName: 'MYHPC' };
  cloudformation.describeStacks(params, function(err, data) {
    if (err && err.message.indexOf("does not exist") !== -1) {
      createStack(callback);
    } else {
      deleteStack(callback);
    }

  });
};
