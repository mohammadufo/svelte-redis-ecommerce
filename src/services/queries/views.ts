import { itemKey, itemsByViewsKey } from '$services/keys';
import { client } from '$services/redis';

export const incrementView = async (itemId: string, userId: string) => {
	return Promise.all([
		client.hIncrBy(itemKey(itemId), 'views', 1),
		client.zIncrBy(itemsByViewsKey(), 1, itemId)
	]);
};
