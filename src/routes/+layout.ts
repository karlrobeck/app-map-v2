import type { TypedPocketBase } from '@/pocketbase';
import PocketBase from 'pocketbase';

export const prerender = true;

export const _pb = new PocketBase(import.meta.env.DEV ? 'http://localhost:8090' : '/') as TypedPocketBase;