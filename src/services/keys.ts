export const pageCacheKey = (id: string) => `pageCache#${id}`;
export const usersKey = (id: string) => `users#${id}`;
export const sessionKey = (id: string) => `sessions#${id}`;
export const usernameUniqueKey = () => 'username:unique';
export const userLikesKey = (id: string) => `user:likes#${id}`;
export const usernameKey = () => 'username';

export const itemKey = (id: string) => `items#${id}`;
export const itemsByViewsKey = () => 'items:views';
export const itemsByEndingAtKey = () => 'items:endingAt';
export const itemsViewsKey = (id: string) => `items:views#${id}`;
export const bidHistoryKey = (id: string) => `history#${id}`;
