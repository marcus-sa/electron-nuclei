import 'reflect-metadata'

import { Component, forwardRef, Inject } from '../../src'

import { Logger } from './Service'

@Component()
export class Test {

	constructor(
		@Injtc

		@Inject(forwardRef(() => Logger))
		private readonly service: Logger
	) { }

}