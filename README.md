# iot-button-hpc
HPC at the push of an IoT button.

## Requirements:
1. Two [AWS IoT buttons](https://aws.amazon.com/iotbutton/).
1. [node.js](https://nodejs.org) 6.10 or later
3. [serverless](https://serverless.com), once node.js is installed run `npm install -g serverless` to install.
4. Copy of the Alces Flight template: download from the template URL in the AWS marketplace under Alces Flight Solo -> Personal HPC compute cluster, and save in an s3 bucket in your desired region (see notes).

## Notes:
* Everything (IoT, s3, lambdas) must be located in the same region and you need to specify the region in serverless.yml on the `region:` line.

## Steps:
1. Use the configuration wizard x2 at https://aws.amazon.com/iotbutton/getting-started/ to set up your buttons (if you haven't already).
2. Optionally create and subscribe to an SNS topic for notifications about the HPC cluster startup (and uncomment code in serverless.yml)
3. Edit [policy.json](policy.json) and fill in the bucket in which you have the CLoudFormation template for Alces Flight Solo, and assign that policy in AWS IAM to a role called *lambda-cloudformation* (or if different, modify [serverless.yml](serverless.yml))
4. Copy [env.yml.sample](env.yml.sample) to env.yml and edit, specifying full s3 path to that template and the other required details as required.
5. Run `serverless deploy` to deploy the lambda functions required
6. Press your start button.
7. Grab a coffee.
8. Check outputs in the AWS CloudFormation console under the "MYHPC" stack (unless you changed the name in serverless.yml) to find the IP address, the key and username are as you specified in env.yml.
9. Enjoy your [Alces Flight](http://alces-flight) High Performance Computing cluster.
10. When done, press your stop button.

## Video
[![Video](https://img.youtube.com/vi/OhW8zVVyDiQ/0.jpg)](http://www.youtube.com/watch?v=OhW8zVVyDiQ "HPC at the push of an IoT button")
