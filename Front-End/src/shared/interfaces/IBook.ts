export interface IBook {
    id: string
    title: string
    publishingDate: string
    author: string
    cover: string
    copysTotal: number
    availableCopys: number
    borrowedCopys: number
    available: boolean
}