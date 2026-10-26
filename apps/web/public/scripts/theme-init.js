/**
 * Anti-flicker theme bootstrap, run synchronously in <head> before first paint.
 *
 * Lives in a plain same-origin script (rather than inline) so the production
 * Content-Security-Policy (`script-src 'self'`) allows it without hashes or
 * nonces. See `resources/views/inertia_layout.edge`.
 */
(function () {
	const stored = localStorage.getItem('theme');
	const isDark = stored === 'dark' || (stored === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
	document.documentElement.classList.toggle('dark', isDark);
})();
