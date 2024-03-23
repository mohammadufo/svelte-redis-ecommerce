import { itemKey, itemsByViewsKey } from '$services/keys';
import { client } from '$services/redis';
import type { CreateItemAttrs } from '$services/types';
import { genId } from '$services/utils';
import { deserialize } from './deserialize';
import { serialize } from './serialize';

export const getItem = async (id: string) => {
	const item = await client.hGetAll(itemKey(id));

	if (!Object.keys(item).length) {
		return null;
	}

	return deserialize(id, item);
};

export const getItems = async (ids: string[]) => {
	const commands = ids.map((id) => {
		return client.hGetAll(itemKey(id));
	});

	const results = await Promise.all(commands);

	return results?.map((item, index) => {
		if (!Object?.keys(item)?.length) {
			return null;
		}

		return deserialize(ids[index], item);
	});
};

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
	const id = genId();

	Promise.all([
		client.hSet(itemKey(id), serialize(attrs)),
		client.zAdd(itemsByViewsKey(), {
			value: id,
			score: 0
		})
	]);

	return id;
};
