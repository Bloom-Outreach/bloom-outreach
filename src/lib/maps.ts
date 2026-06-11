export function getMapEmbedUrl(location: string) {
	return `https://maps.google.com/maps?q=${encodeURIComponent(location)}&hl=en&z=15&output=embed`;
}
