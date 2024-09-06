import BitmovinApi, { Av1VideoConfiguration, BitmovinResponse, CodecConfiguration, Encoding, EncodingOutput, Fmp4Muxing, Input, MuxingStream, OpusAudioConfiguration, Stream, VideoConfiguration } from '@bitmovin/api-sdk';

export default class BitmovinConfig {
    private config: Record<string, string> = {};
    private api: BitmovinApi;
    private configs: Array<CodecConfiguration> = [];
    private input?: Input;
    private inputPath?: string;
    private output?: EncodingOutput;
    private outputPath?: string;
    private encodings: Array<Encoding> = [];

    constructor(apiKey: string) {
        this.config.apiKey = apiKey;
        this.api = new BitmovinApi({
            apiKey: apiKey,
        })
    }

    public getApiKey() {
        return this.config.apiKey;
    }

    public setApiKey(newKey: string) {
        this.config.apiKey = newKey;
        return this;
    }

    public async addConfig(config: CodecConfiguration) {
        this.configs.concat(config);
        return this;
    }

    public async addEncoding(name: string) {
        const newEncoding = await this.api.encoding.encodings.create({
            name: name
        });
        for (const config of this.configs) {
            const newStream = new Stream({
                inputStreams: [{
                    inputId: this.input!.id,
                    inputPath: this.inputPath!,
                }],
                codecConfigId: config.id,
            });
            const stream = await this.api.encoding.encodings.streams.create(newEncoding.id!, newStream);

            let muxOutPath: string;
            if (config instanceof VideoConfiguration) {
                muxOutPath = `${this.outputPath!}/video/${(config as VideoConfiguration).height}`;
            } else {
                muxOutPath = `${this.outputPath!}/audio/${(config as AudioConfiguration).bitrate! / 1000}`;
            }
            const muxStream = new MuxingStream({
                streamId: stream.id,
            });
            const muxing = new Fmp4Muxing({
                outputs: [this.output!],
                streams: [muxStream],
                segmentLength: 4,
            });
            await this.api.encoding.encodings.muxings.fmp4.create(newEncoding.id!, muxing);
        }
        return this;
    }

    public async startEncodings() {
        let jobs: Array<Promise<BitmovinResponse>> = [];
        for (const encoding of this.encodings) {
            jobs.concat(this.api.encoding.encodings.start(encoding.id!));
        }
        return Promise.all(jobs);
    }

    public async setInput(id: string, path: string) {
        this.input = await this.api.encoding.inputs.get(id);
        this.inputPath = path;
        return this;
    }

    public async setOutput(id: string, path: string) {
        const output = await this.api.encoding.outputs.get(id);
        this.output = new EncodingOutput({
            outputId: output.id,
            outputPath: path,
        });
        this.outputPath = path;
        return this;
    }
}