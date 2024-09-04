"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var details = function () { return ({
    name: 'Bitmovin Request',
    description: 'Send a request to the Bitmovin API.',
    style: {
        borderColor: 'green',
    },
    tags: '',
    isStartPlugin: false,
    pType: '',
    requiresVersion: '2.24.05',
    sidebarPosition: -1,
    icon: 'faArrowRight',
    inputs: [
        {
            label: 'API Key',
            name: 'apiKey',
            type: 'string',
            defaultValue: '',
            inputUI: {
                type: 'text',
            },
            tooltip: 'Enter your Bitmovin API key.',
        },
        {
            label: 'Method',
            name: 'method',
            type: 'string',
            defaultValue: 'post',
            inputUI: {
                type: 'dropdown',
                options: [
                    'get',
                    'post',
                    'delete',
                ],
            },
            tooltip: 'Select a request method.',
        },
        {
            label: 'Endpoint',
            name: 'endpoint',
            type: 'string',
            defaultValue: 'Create Encoding',
            inputUI: {
                type: 'dropdown',
                options: [
                    'Create Encoding',
                    'Create Codec Configuration',
                ],
                displayConditions: {
                    logic: 'AND',
                    sets: [
                        {
                            logic: 'AND',
                            inputs: [
                                {
                                    name: 'method',
                                    value: 'post',
                                    condition: '===',
                                },
                            ],
                        },
                    ],
                },
            },
            tooltip: 'Select an API endpoint to access.',
        },
        {
            label: 'Endpoint',
            name: 'endpoint',
            type: 'string',
            defaultValue: 'Get Encoding',
            tooltip: 'Select an API endpoint to access.',
            inputUI: {
                type: 'dropdown',
                options: [
                    'Get Encoding',
                    'Get Codec Configuration',
                ],
                displayConditions: {
                    logic: 'AND',
                    sets: [
                        {
                            logic: 'AND',
                            inputs: [
                                {
                                    name: 'method',
                                    value: 'get',
                                    condition: '===',
                                },
                            ],
                        },
                    ],
                },
            },
        },
    ],
    outputs: [
        {
            number: 1,
            tooltip: 'Continue to next plugin',
        },
    ],
}); };
