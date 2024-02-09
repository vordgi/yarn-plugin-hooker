/** @type {import('@yarnpkg/core/lib/Plugin').Plugin<import('@yarnpkg/core/lib/Plugin').Hooks>} */
module.exports = {
	name: 'yarn-plugin-hooker',
	factory: (require) => {
		const { execute } = require('@yarnpkg/shell');

		/** @type {import('@yarnpkg/core/lib/Plugin').Plugin<import('@yarnpkg/core/lib/Plugin').Hooks>} */
		return ({
			hooks: {
				async wrapScriptExecution(_execute, _project, _locator, scriptName, extra) {
					return async () => {
						const {
							script, args, stdin, stdout, stderr, cwd = process.cwd(), env,
						} = extra;
						const context = { cwd, env, stdin, stdout, stderr };

						await execute(`pre:${scriptName}`, args, context);

						await execute(script, args, context);

						await execute(`post:${scriptName}`, args, context);
					};
				},
			},
		});
	},
};
