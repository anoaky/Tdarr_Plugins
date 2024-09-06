import { IpluginDetails, IpluginInputArgs, IpluginOutputArgs } from "../../../../FlowHelpers/1.0.0/interfaces/interfaces";

const details = (): IpluginDetails => ({
    name: 'Configure Output',
    description: 'Configure output.',
    style: {
        borderColor: 'blue',
    },
    tags: '',
    isStartPlugin: false,
    pType: '',
    requiresVersion: '2.24.05',
    sidebarPosition: -1,
    icon: 'faArrowRight',
    inputs: [
        {
            label: 'Storage device ID',
            name: 'outputID',
            type: 'string',
            defaultValue: '',
            tooltip: 'Enter the ID for the storage device.',
            inputUI: {
                type: 'text',
            },
        },
        {
            label: 'Output Path',
            name: 'outputPath',
            type: 'string',
            defaultValue: '',
            tooltip: '',
            inputUI: {
                type: 'text',
            },
        },
    ],
    outputs: [
        {
            number: 1,
            tooltip: 'Continue to next plugin.',
        }
    ],
})

const plugin = async (args: IpluginInputArgs): Promise<IpluginOutputArgs> => {
    const lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);

    const bitmovin = args.variables.bitmovinConfig!;
    bitmovin.setOutput(String(args.inputs.outputID), String(args.inputs.outputPath));
    return {
        outputFileObj: args.inputFileObj,
        outputNumber: 1,
        variables: args.variables,
    }
}

export {
    details,
    plugin
}