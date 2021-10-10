export const toValidCAS = (CAS) => {
	return {
		id: CAS.Id,
		author: CAS.login,
		content: CAS.comment,
		mark: CAS.mark,
		likes: CAS.likes?.length ?? 0,
		dislikes: CAS.dislikes?.length ?? 0,
		users: [...(CAS.likes ?? []), ...(CAS.dislikes ?? [])],
	};
};
