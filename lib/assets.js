// lib/assets.js
import getConfig from 'next/config';

export function getAssetPath(path) {
    const base = getConfig().publicRuntimeConfig?.basePath || '';
    return `${base}${path}`;
}
