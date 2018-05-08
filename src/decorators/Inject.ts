import { Token } from '../types'
import { Container } from '../injector/Container'
import { SELF_DECLARED_DEPS_METADATA } from '../constants'

// @Reference: <https://github.com/nestjs/nest/blob/master/packages/common/decorators/core/inject.decorator.ts>
export function Inject(token: Token): ParameterDecorator {
	return (target, key, index) => {
		const args = Reflect.getMetadata(SELF_DECLARED_DEPS_METADATA, target) || []
		const param = typeof token === 'function'
			? Container.getModuleName(token)
			: token

		args.push({ index, param })
		Reflect.defineMetadata(SELF_DECLARED_DEPS_METADATA, args, target)
	}
}