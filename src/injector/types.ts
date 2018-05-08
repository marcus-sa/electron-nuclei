import {NucleiType} from "../types";

export type ContainerInject = {
	inject: NucleiType[]
}

export type ContainerProvide = {
	provide: string | NucleiType
}

export type ContainerFactory = {
	useFactory: (...dependencies: any[]) => any,
} & ContainerProvide & ContainerInject

export type ContainerClass = {
	useClass: NucleiType
} & ContainerProvide & ContainerInject

export type ContainerModule = NucleiType | ContainerFactory | ContainerClass

export type BoundContainerModule = {
	name: Symbol,
	module: any//ContainerModule & Promise<any>
}

export const FACTORY = '__factory__'
export const CLASS = '__class__'