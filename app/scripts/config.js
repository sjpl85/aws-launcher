angular.module('appConfig', [])
    .constant('mainConfig', {
        'region': 'eu-west-2',
        // 'accessKeyId': 'AKIAJSCCYI62K3R3GURQ',
        // 'secretAccessKey': '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',
        'refreshTime': 5000,
        'imageId': 'ami-665b4f02',
        'instanceType': 't2.micro',
        'securityGroupIds': ['sg-8f71c7e6'],
        'keyName': undefined
    });
