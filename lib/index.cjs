/** @type {import('@yarnpkg/core/lib/Plugin').Plugin<import('@yarnpkg/core/lib/Plugin').Hooks>} */
module.exports = {
	name: 'yarn-plugin-hooker',
	factory: (require) => {
		const { execute } = require('@yarnpkg/shell');

		/** @type {import('@yarnpkg/core/lib/Plugin').Plugin<import('@yarnpkg/core/lib/Plugin').Hooks>} */
		return ({
			hooks: {
				async wrapScriptExecution(_execute, project, _locator, scriptName, extra) {
					return async () => {
						const workspace = project.getWorkspaceByCwd(extra.cwd);

						const {
							script, args, stdin, stdout, stderr, cwd = process.cwd(), env,
						} = extra;
						const context = { cwd, env, stdin, stdout, stderr };
						const isHookerScript = scriptName.startsWith('pre:') || scriptName.startsWith('post:');
						const preScript = `pre:${scriptName}`;
						const postScript = `post:${scriptName}`;

						if (!isHookerScript && workspace.manifest.scripts.has(preScript)) {
							await execute(`yarn ${preScript}`, args, context);
						}

						await execute(script, args, context);

						if (!isHookerScript && workspace.manifest.scripts.has(postScript)) {
							await execute(`yarn ${postScript}`, args, context);
						}
					};
				},
			},
		});
	},
};
