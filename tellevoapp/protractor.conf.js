exports.config = {
    framework: 'jasmine',
    specs: ['./e2e/**/*.e2e-spec.ts'],
    capabilities: {
      browserName: 'chrome',
    },
    baseUrl: 'http://localhost:8100/', // ajusta según tu configuración
  };