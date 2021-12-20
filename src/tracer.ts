import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { NodeSDK, NodeSDKConfiguration } from '@opentelemetry/sdk-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import * as process from 'process';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPMetricExporter, OTLPTraceExporter } from '@opentelemetry/exporter-otlp-http';
import { MeterProvider, ConsoleMetricExporter } from '@opentelemetry/metrics';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const _config: Partial<NodeSDKConfiguration> = {
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'graphql-service',
  }),
  metricExporter: new PrometheusExporter({ port: 8081 }),
  metricInterval: 1000,
  contextManager: new AsyncLocalStorageContextManager(),
};

if (process.env.enableTracing) {
  _config.spanProcessor = new SimpleSpanProcessor(new OTLPTraceExporter())
}

const otelSDK = new NodeSDK(_config);

export default otelSDK;
// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err),
    )
    .finally(() => process.exit(0));
});