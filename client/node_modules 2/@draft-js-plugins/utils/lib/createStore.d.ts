export interface SubscriptionCallback<T> {
    (item: T): void;
}
export interface Store<T extends object> {
    subscribeToItem<K extends keyof T>(key: K, callback: SubscriptionCallback<T[K]>): void;
    unsubscribeFromItem<K extends keyof T>(key: K, callback: SubscriptionCallback<T[K]>): void;
    updateItem<K extends keyof T>(key: K, item: T[K]): void;
    getItem<K extends keyof T>(key: K): T[K];
}
export declare function createStore<T extends object>(initialState?: T): Store<T>;
