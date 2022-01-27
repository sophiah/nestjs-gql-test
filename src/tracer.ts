import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { NodeSDK, NodeSDKConfiguration } from '@opentelemetry/sdk-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import * as process from 'process';
import { BatchSpanProcessor, ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPMetricExporter, OTLPTraceExporter } from '@opentelemetry/exporter-otlp-http';
import { MeterProvider, ConsoleMetricExporter } from '@opentelemetry/metrics';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { CollectorTraceExporter, CollectorMetricExporter } from '@opentelemetry/exporter-collector-grpc';

const traceCollectorOptions = { url:  process.env['OTLP_ENDPOINT'] || 'grpc://localhost:4317' };
const spanExporter = new BatchSpanProcessor(new CollectorTraceExporter(traceCollectorOptions));
// const spanExporter = new SimpleSpanProcessor(new OTLPTraceExporter());

const _config: Partial<NodeSDKConfiguration> = {
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'graphql-service',
  }),
  metricExporter: new PrometheusExporter({port: 9000}),
  spanProcessor: spanExporter,
  contextManager: new AsyncLocalStorageContextManager(),
}

if (process.env.enableTracing) {
  _config.instrumentations = [getNodeAutoInstrumentations()]
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

