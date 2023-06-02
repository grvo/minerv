// lets
let mockLoad = jest.fn();
let mockMetadata = jest.fn();

// exports
export const CubejsApi = jest.fn().mockImplementation(() => ({
    load: mockLoad,
    meta: mockMetadata
}));

export const HttpTransport = jest.fn();

export const GRANULARITIES = [
    {
        name: 'segundos',
        title: 'segundos'
    }
];

// eslint-disable-next-line no-underscore-dangle
export const __setMockLoad = (x) => {
    mockLoad = x;
};

// eslint-disable-next-line no-underscore-dangle
export const __setMockMetadata = (x) => {
    mockMetadata = x;
};