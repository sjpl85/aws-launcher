angular.module('appConfig', [])
    .constant('mainConfig', {
        'region': '',
        'refreshTime': 5000,
        'imageId': '',
        'instanceType': 't2.micro',
        'securityGroupIds': [''],
        'keyName': undefined
    });
