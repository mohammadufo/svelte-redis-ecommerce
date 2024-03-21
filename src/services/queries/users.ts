import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';
import { client } from '$services/redis';
import { usersKey, usernameUniqueKey } from '$services/keys';

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {
	const user = await client.hGetAll(usersKey(id));

	return deserialize(id, user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
	const id = genId();

	const exist = await client.sIsMember(usernameUniqueKey(), attrs.username);

	if (exist) {
		throw new Error('This username is taken!');
	}

	await client.hSet(usersKey(id), serialize(attrs));
	await client.sAdd(usernameUniqueKey(), attrs.username);

	return id;
};

const serialize = (user: CreateUserAttrs) => {
	return {
		username: user.username,
		password: user.password
	};
};

const deserialize = (id: string, user: { [key: string]: string }) => {
	return {
		id,
		...user
	};
};
