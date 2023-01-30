import type { NextApiRequest, NextApiResponse } from "next"

export type product = {
	name: string
	barcode: string
	category: string
	mass: string
}
export interface productStore extends product {
	productId?: bigint | string
	storeId?: bigint
	price: number
	location: string
	description?: string
}
export type user = {
	userName: string
	password: string
	storeId: string
}
export interface userData extends user {
	authorityId: number
	error?: string
}
export interface payload {
	data: {
		id: string
		authorityId: number
		storeId: number
		userName: string
	}
	cty: string
	iat: bigint
	exp: bigint
	error?: string
}

export type Invoice = {
	storeId: bigint
	installmentId?: bigint
	dateTime: Date
}
export type InvoicePurchase = {
	productStoreId: bigint | string
}

export interface userData extends user {
	authorityId: number
	error?: string
}

export type error = {
	error: string
}
export type productQuery = {
	isNew?: boolean
	isStoreNew?: boolean
	storeSearch?: boolean
	onlyStore?: boolean
	pId?: number | string
}
export type nextFunction = (
	req: NextApiRequest,
	res: NextApiResponse,
	credentials: payload,
	...others: any[]
) => any

export enum authority {
	guest = 1,
	registered = 2,
	storeOwner = 3,
	admin = 4,
}
