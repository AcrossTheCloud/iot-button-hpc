# iot-button-hpc
HPC at the push of a button.

## Requirements:
1. Two [AWS IoT buttons](https://aws.amazon.com/iotbutton/).
1. [node.js](https://nodejs.org) 6.10 or later
3. [serverless](https://serverless.com), once node.js is installed run `npm install -g serverless` to install.
4. Copy of the Alces Flight template: download from the template URL in the AWS marketplace under Alces Flight Solo -> Personal HPC compute cluster, and save in an s3 bucket in your desired region (see notes).

## Notes:
* Everything (IoT, s3, lambdas) must be located in the same region and you need to specify the region in serverless.yml on the `region:` line.

## Steps:
1. Use the configuration wizard x2 at https://aws.amazon.com/iotbutton/getting-started/ to set up your buttons (if you haven't already).
1. Create and subscribe to an SNS topic for notifications about the HPC cluster startup.
2. Edit [policy.json](policy.json) and fill in the bucket in which you have the CLoudFormation template for Alces Flight Solo, and assign that policy to a role called *lambda-cloudformation* (or if different, modify [serverless.yml](serverless.yml)
3. Copy [env.yml.sample](env.yml.sample) to env.yml and edit, specifying full s3 path to that template and the other required details as required.
4. Run `serverless deploy` to deploy the lambda functions required
5. Press your start button.
6. Grab a coffee.
7. Check outputs in the AWS CloudFormation console under the "MYHPC" stack (unless you changed the name in serverless.yml) to find the IP address, the key and username are as you specified in env.yml.
8. Enjoy your [Alces Flight](http://alces-flight) High Performance Computing cluster.
9. When done, press your stop button.
