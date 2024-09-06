import BitmovinConfig from "../../../../FlowHelpers/1.0.0/bitmovinConfig";
import { IpluginDetails, IpluginInputArgs, IpluginOutputArgs } from "../../../../FlowHelpers/1.0.0/interfaces/interfaces";

const details = (): IpluginDetails => ({
    name: 'Start Bitmovin Encoding',
    description: '',
    style: {
        borderColor: 'blue',
    },
    tags: '',
    isStartPlugin: false,
    pType: '',
    requiresVersion: '2.24.05',
    sidebarPosition: -1,
    icon: 'faArrowRight',
    inputs: [],
    outputs: [
        {
            number: 1,
            tooltip: 'Continue to next plugin.',
        },
    ],
});

const plugin = async (args: IpluginInputArgs): Promise<IpluginOutputArgs> => {
    const lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
    const bitmovin = args.variables.bitmovinConfig;
    await bitmovin.addEncoding('test');
    await bitmovin.startEncoding();
    return {
        outputFileObj: args.inputFileObj,
        outputNumber: 1,
        variables: args.variables,
    }
}

export {
    details,
    plugin,
}