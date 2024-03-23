import { itemKey, itemsByViewsKey } from '$services/keys';
import { client } from '$services/redis';
import { deserialize } from './deserialize';

export const itemsByViews = async (order: 'DESC' | 'ASC' = 'DESC', offset = 0, count = 10) => {
	let results: any = await client.sort(itemsByViewsKey(), {
		GET: [
			'#',
			`${itemKey('*')}->name`,
			`${itemKey('*')}->views`,
			`${itemKey('*')}->imageUrl`,
			`${itemKey('*')}->endingAt`,
			`${itemKey('*')}->price`
		],
		BY: 'nosort',
		DIRECTION: order,
		LIMIT: {
			count,
			offset
		}
	});

	const items = [];

	while (results.length) {
		const [id, name, views, imageUrl, endingAt, price, ...rest] = results;
		const item = deserialize(id, { name, views, imageUrl, endingAt, price });
		items.push(item);
		results = rest;
	}

	return items;
};
