import type { Session } from '$services/types';
import { sessionKey } from '$services/keys';
import { client } from '$services/redis';

export const getSession = async (id: string) => {
	const session = await client.hGetAll(sessionKey(id));

	if (!Object.keys(session).length) {
		return null;
	}

	return deserialize(id, session);
};

export const saveSession = async (session: Session) => {};

const deserialize = (id: string, session: { [key: string]: string }) => {
	return {
		id,
		...session
	};
};
