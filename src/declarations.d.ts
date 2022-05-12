export interface ConnectionOptions {
    socksProxy: {
        host: string;
        port: number;
        type?: 4 | 5 = 5;
    }
}