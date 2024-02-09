/** @type {import('@yarnpkg/core/lib/Plugin').Plugin<import('@yarnpkg/core/lib/Plugin').Hooks>} */
module.exports = {
	name: 'yarn-plugin-hooker',
	factory: (require) => {
		const { execute } = require('@yarnpkg/shell');
		const fs = require('fs');
		const path = require('path');

		/** @type {import('@yarnpkg/core/lib/Plugin').Plugin<import('@yarnpkg/core/lib/Plugin').Hooks>} */
		return ({
			hooks: {
				async wrapScriptExecution(_execute, _project, _locator, scriptName, extra) {
					return async () => {
						const {
							script, args, stdin, stdout, stderr, cwd = process.cwd(), env,
						} = extra;
						const context = { cwd, env, stdin, stdout, stderr };
						const packageRow = fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8');
						const { scripts } = JSON.parse(packageRow);

						const isHookerScript = scriptName.startsWith('pre:') || scriptName.startsWith('post:');
						const preScript = `pre:${scriptName}`;
						const postScript = `post:${scriptName}`;

						if (!isHookerScript && preScript in scripts) {
							await execute(`yarn ${preScript}`, args, context);
						}

						await execute(script, args, context);

						if (!isHookerScript && postScript in scripts) {
							await execute(`yarn ${postScript}`, args, context);
						}
					};
				},
			},
		});
	},
};
