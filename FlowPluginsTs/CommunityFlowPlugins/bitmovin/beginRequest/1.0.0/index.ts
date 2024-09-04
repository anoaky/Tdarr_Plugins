import {
    IpluginDetails,
    IpluginInputArgs,
    IpluginOutputArgs,
} from '../../../../FlowHelpers/1.0.0/interfaces/interfaces';

const details = (): IpluginDetails => ({
    name: 'Begin Bitmovin Request',
    description: 'Begin constructing a request to the Bitmovin API. Must be placed before any other Bitmovin plugins.',
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
            tooltip: 'Enter your Bitmovin API key.',
            inputUI: {
                type: 'text',
            },
        },
    ],
    outputs: [
        {
            number: 1,
            tooltip: 'Continue to next plugin',
        },
    ],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const plugin = async (args: IpluginInputArgs): Promise<IpluginOutputArgs> => {
    return {
        outputFileObj: args.inputFileObj,
        outputNumber: 1,
        variables: args.variables,
    };
};

export {
    details,
    plugin,
};