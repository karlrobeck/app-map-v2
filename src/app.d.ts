// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export interface GeoJsonGeometry {
	type: string
	coordinates: number[][][]
}

export interface GeoJsonProperties {
	name: string
	layer: string
	soprt: string
	height: string
	office: string
	osm_id: number
	amenity: string
	leisure: string
	building: string
	"addr:city": string
	"name:abbr": string
	"addr:street": string
	"addr:quarter": string
	events_venue: string
	"building:levels": number
	"addr:housenumber": string
}

export interface GeoJson {
	type: string
	features: GeoJsonFeature[]
}

export interface GeoJsonFeature {
	type: string
	geometry: GeoJsonGeometry
	id: string
	properties: GeoJsonProperties
}

export interface GeoJsonCoordinates {
	long: number
	lat: number
}

export type {
	GeoJsonGeometry,
	GeoJsonProperties,
	GeoJson,
	GeoJsonFeature,
	GeoJsonCoordinates
}
