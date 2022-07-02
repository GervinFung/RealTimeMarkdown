import { build } from 'esbuild';

const env = process.env.NODE_ENV;
(() =>
    build({
        entryPoints: ['src/index.tsx'],
        outfile: 'build/index.js',
        loader: {
            '.ts': 'tsx',
            '.png': 'binary',
        },
        bundle: true,
        minify: true,
        minifyWhitespace: true,
        platform: 'browser',
        logLevel: 'silent',
        sourcemap: env !== 'production',
        watch:
            env === 'production'
                ? undefined
                : {
                      onRebuild: (error, result) =>
                          console.log(error ?? result),
                  },
    })
        .then((r) => {
            console.dir(r);
            console.log('Build succeeded.');
        })
        .catch((e) => {
            console.log('Error building:', e.message);
            process.exit(1);
        }))();
