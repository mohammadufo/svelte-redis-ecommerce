import { itemKey, itemsByViewsKey, itemsViewsKey } from '$services/keys';
import { client } from '$services/redis';

export const incrementView = async (itemId: string, userId: string) => {
	const inserted = await client.pfAdd(itemsViewsKey(itemId), userId);

	if (!inserted) {
		return;
	}

	return Promise.all([
		client.hIncrBy(itemKey(itemId), 'views', 1),
		client.zIncrBy(itemsByViewsKey(), 1, itemId)
	]);
};
