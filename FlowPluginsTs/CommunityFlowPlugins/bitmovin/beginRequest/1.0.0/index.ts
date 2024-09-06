import { Av1VideoConfiguration, OpusAudioConfiguration, PixelFormat } from '@bitmovin/api-sdk';
import BitmovinConfig from '../../../../FlowHelpers/1.0.0/bitmovinConfig';
import {
    IpluginDetails,
    IpluginInputArgs,
    IpluginOutputArgs,
} from '../../../../FlowHelpers/1.0.0/interfaces/interfaces';

const details = (): IpluginDetails => ({
    name: 'Begin Bitmovin Request',
    description: 'Begin constructing a request to the Bitmovin API. Must be placed before any other Bitmovin plugins, but does not need to be placed again in any of its descendants.',
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
            label: 'API Key',
            name: 'apiKey',
            type: 'string',
            defaultValue: '',
            tooltip: 'Enter your Bitmovin API key.',
            inputUI: {
                type: 'text',
            },
        },
        {
            label: 'Input storage device ID',
            name: 'inputID',
            type: 'string',
            defaultValue: '',
            tooltip: 'Enter the ID for the storage device.',
            inputUI: {
                type: 'text',
            },
        },
        {
            label: 'Video codec',
            name: 'vCodec',
            type: 'string',
            defaultValue: 'av1',
            tooltip: 'Select the codec to use for the video stream.',
            inputUI: {
                type: 'dropdown',
                options: [
                    'av1',
                ],
            },
        },
        {
            label: 'Pixel format',
            name: 'pixelFormat',
            type: 'string',
            defaultValue: 'YUV420P',
            tooltip: 'Select the pixel format.',
            inputUI: {
                type: 'dropdown',
                options: [
                    'YUV420P',
                    'YUV420P10LE',
                ],
            },
        },
        {
            label: 'Input path',
            name: 'inputPath',
            type: 'string',
            defaultValue: '',
            tooltip: 'Enter path to input file.',
            inputUI: {
                type: 'text',
            },
        },
        {
            label: 'Output storage device ID',
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
            tooltip: 'empty',
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
    const lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);

    const bitmovin = new BitmovinConfig(String(args.inputs.apiKey));

    // Configure inputs
    const videoConfig = new Av1VideoConfiguration({
        name: 'AV1 Batch',
        pixelFormat: PixelFormat.YUV420P10LE,
    });
    const audioConfig = new OpusAudioConfiguration({
        bitrate: 96000,
    });

    await bitmovin.addConfig(videoConfig);
    await bitmovin.addConfig(audioConfig);
    await bitmovin.setInput(String(args.inputs.inputID), String(args.inputs.inputPath));

    // Configure output
    bitmovin.setOutput(String(args.inputs.outputID), String(args.inputs.outputPath));

    // Start encoding
    await bitmovin.addEncoding('test');
    await bitmovin.startEncodings();

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