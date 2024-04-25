import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

export default {
	input: 'src/index.ts',
	output: {
		file: 'build/bundle.js',
		format: 'iife',
        plugins: [terser()]
	},
    plugins: [typescript(), nodeResolve()]
};