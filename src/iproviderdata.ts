export interface IProviderData {
    readonly search: {
        readonly uriRoot: string;
        readonly searchPath: string;
        readonly firstResultXpath?: string;
    };
    readonly root: IItemData;
}

export interface IItemData {
    readonly xpath: string;
    readonly repeat?: boolean;
    readonly items?: IItemData[];
    readonly value?: {
        readonly name: string;
        readonly type: string;
        readonly attr?: string;
    };
}
