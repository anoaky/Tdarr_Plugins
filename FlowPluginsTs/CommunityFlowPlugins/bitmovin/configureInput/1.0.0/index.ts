import { Av1VideoConfiguration, OpusAudioConfiguration, PixelFormat, PixelFormatBitDepth } from "@bitmovin/api-sdk";
import { IpluginDetails, IpluginInputArgs, IpluginOutputArgs } from "../../../../FlowHelpers/1.0.0/interfaces/interfaces";

const details = (): IpluginDetails => ({
    name: 'Configure input',
    description: 'Configure the input.',
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
    ],
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
    const bitmovin = args.variables.bitmovinConfig!;

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