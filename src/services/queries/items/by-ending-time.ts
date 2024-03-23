import { itemKey, itemsByEndingAtKey } from '$services/keys';
import { client } from '$services/redis';
import { deserialize } from './deserialize';

export const itemsByEndingTime = async (order: 'DESC' | 'ASC' = 'DESC', offset = 0, count = 10) => {
	const ids = await client.zRange(itemsByEndingAtKey(), Date.now(), '+inf', {
		BY: 'SCORE',
		LIMIT: {
			offset,
			count
		}
	});

	const results = await Promise.all(ids.map((_id) => client.hGetAll(itemKey(_id))));

	return results.map((item, i) => deserialize(ids[i], item));
};
