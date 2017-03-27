'use strict';

var appServices = angular.module('appServices', []);

appServices.factory('EC2', function ($http, mainConfig) {
    function EC2() {};
    EC2.prototype = {
        getInstances: function (success, fail) {
            var ec2 = new AWS.EC2();
            var params = {
                IncludeAllInstances: true
            };
            ec2.describeInstanceStatus(params, function (err, data) {
                if (err) fail(err);
                else success(data.InstanceStatuses);
            });
        },
        stopInstance: function (instance, success, fail) {
            var ec2 = new AWS.EC2();
            var params = {
                InstanceIds: [instance]
            };
            ec2.stopInstances(params, function (err, data) {
                if (err) fail(err);
                else success(data);
            });
        },
        startInstance: function (instance, success, fail) {
            var ec2 = new AWS.EC2();
            var params = {
                InstanceIds: [instance]
            };
            ec2.startInstances(params, function (err, data) {
                if (err) fail(err);
                else success(data);
            });
        },
        terminateInstance: function (instance, success, fail) {
            var ec2 = new AWS.EC2();
            var params = {
                InstanceIds: [instance]
            };
            ec2.terminateInstances(params, function (err, data) {
                if (err) fail(err);
                else success(data);
            });
        },
        launchInstance: function (success, fail) {
            var ec2 = new AWS.EC2();

            var params = {
                ImageId: mainConfig.imageId,
                InstanceType: mainConfig.instanceType,
                SecurityGroupIds: mainConfig.securityGroupIds,
                KeyName: mainConfig.keyName,
                MinCount: 1, MaxCount: 1
            };

            ec2.runInstances(params, function (err, data) {
                if (err) fail(err);
                else success(data);
            });
        },
        instanceDetail: function (instanceIds, success, fail) {
            var ec2 = new AWS.EC2();

            var params = {
                InstanceIds: instanceIds,
            };
            ec2.describeInstances(params, function (err, data) {
                if (err) fail(err);
                else success(data.Reservations);
            });
        }
    };
    return EC2;
})
