const AWS = require('aws-sdk');

exports.delete = function(event, context, callback) {
  const cloudformation = new AWS.CloudFormation();
  var params = {
    StackName: 'MY_HPC',
  ],
  RoleARN: 'arn:aws:iam::'+process.env.AWS_ACCOUNT_ID+':role/startHPC'
  };
  cloudformation.deleteStack(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
};
