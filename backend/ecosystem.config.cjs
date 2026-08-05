/** PM2 process file — run on VPS: pm2 start ecosystem.config.cjs */
module.exports = {
  apps: [
    {
      name: 'nightbound-api',
      script: 'dist/src/index.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 8787,
        HOST: '127.0.0.1',
      },
      max_memory_restart: '400M',
      time: true,
    },
  ],
};
