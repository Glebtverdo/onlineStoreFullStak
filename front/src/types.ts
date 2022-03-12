
export type itemType  = {
	id: number,
	name: string,
	about: string,
	price: number,
	restCount: number,
	img: string
}

export type newItemType  = {
	name: string,
	about: string,
	price: number,
	restCount: number,
	img: File
}

export type fullUserType = {
	id: number,
	login: string,
	email: string,
	role: string
}

export type regUserType = {
	login: string,
	email: string,
	password: string,
}

export type logUserType = {
	email: string,
	password: string,
}

export type myInputPropType = {
	name: string,
	callback: React.Dispatch<React.SetStateAction<any>>,
	pattern: RegExp,
	type: string,
	id: string
} 

export type basketItemType = {
	id: number,
	name: string,
	cnt: number,
	price: number,
	img: string,
	ItemId: number
} 

export type itemComponentPropsType = {
	itemData: itemType,
	isInBasket: boolean,
	basketItemCnt: number,
	basketItemId: number | null
}

export type bodyForGetAllItemsType = {
	limit: number,
	page: number
}