export const getAlternativeName = (name, list) => {
	if (!list[name]) {
		console.log(`${name} no existe`);
		return null
	}
	return list[name].slug
}