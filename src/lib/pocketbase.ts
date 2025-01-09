/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Cluster = "cluster",
	Deceased = "deceased",
	Employees = "employees",
	FuneralService = "funeral_service",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type ClusterRecord = {
	address: HTMLString
	created?: IsoDateString
	id: string
	latitude?: number
	longtitude?: number
	name: string
	updated?: IsoDateString
}

export enum DeceasedWingOptions {
	"left" = "left",
	"right" = "right",
}

export enum DeceasedSexOptions {
	"MALE" = "MALE",
	"FEMALE" = "FEMALE",
}

export enum DeceasedCategoryOptions {
	"NEWBORN" = "NEWBORN",
	"CHILD" = "CHILD",
	"TEEN" = "TEEN",
	"ADULT" = "ADULT",
	"UNKNOWN" = "UNKNOWN",
}
export type DeceasedRecord = {
	barangay?: string
	birth_day: IsoDateString
	caretaker?: RecordIdString
	category?: DeceasedCategoryOptions
	cause_of_death?: HTMLString
	cluster?: RecordIdString
	created?: IsoDateString
	date_of_death: IsoDateString
	date_of_internment: IsoDateString
	district?: string
	first_name: string
	funeral_service?: RecordIdString
	id: string
	last_name: string
	level?: string
	middle_name?: string
	municipality?: string
	or_number?: string
	payment?: string
	place_of_death?: HTMLString
	registration_number: string
	sex?: DeceasedSexOptions
	street?: string
	updated?: IsoDateString
	wing?: DeceasedWingOptions
	zip_code?: number
}

export type EmployeesRecord = {
	created?: IsoDateString
	id: string
	name: string
	updated?: IsoDateString
}

export type FuneralServiceRecord = {
	address: HTMLString
	created?: IsoDateString
	description?: HTMLString
	id: string
	name: string
	updated?: IsoDateString
}

export enum UsersRoleOptions {
	"care_taker" = "care_taker",
	"staff" = "staff",
}
export type UsersRecord = {
	avatar?: string
	birth_day: IsoDateString
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	first_name: string
	id: string
	last_name: string
	middle_name?: string
	name?: string
	password: string
	role?: UsersRoleOptions
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type ClusterResponse<Texpand = unknown> = Required<ClusterRecord> & BaseSystemFields<Texpand>
export type DeceasedResponse<Texpand = unknown> = Required<DeceasedRecord> & BaseSystemFields<Texpand>
export type EmployeesResponse<Texpand = unknown> = Required<EmployeesRecord> & BaseSystemFields<Texpand>
export type FuneralServiceResponse<Texpand = unknown> = Required<FuneralServiceRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	cluster: ClusterRecord
	deceased: DeceasedRecord
	employees: EmployeesRecord
	funeral_service: FuneralServiceRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	cluster: ClusterResponse
	deceased: DeceasedResponse
	employees: EmployeesResponse
	funeral_service: FuneralServiceResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'cluster'): RecordService<ClusterResponse>
	collection(idOrName: 'deceased'): RecordService<DeceasedResponse>
	collection(idOrName: 'employees'): RecordService<EmployeesResponse>
	collection(idOrName: 'funeral_service'): RecordService<FuneralServiceResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
