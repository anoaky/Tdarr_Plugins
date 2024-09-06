import { IpluginDetails } from "../../../../FlowHelpers/1.0.0/interfaces/interfaces";

const details = (): IpluginDetails => ({
    name: 'Configure Streams',
    description: 'Configure input streams to encode.',
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
        }
    ],
})