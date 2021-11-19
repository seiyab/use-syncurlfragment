declare type Options = {
    enabled: boolean;
    ids: string[];
    observerOption: ConstructorParameters<typeof IntersectionObserver>[1];
};
export default function useSyncUrlFragment(options?: Partial<Options>): () => void;
export {};
