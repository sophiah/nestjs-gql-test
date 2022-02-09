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
import { SpanPrometheusExporter } from './opentelemetry';

let spanExporter;
// const spanExporter = new SimpleSpanProcessor(new ConsoleSpanExporter());
if (process.env['SPAN_EXPORTER'] == 'OLTP') {
  const traceCollectorOptions = { url:  process.env['OTLP_ENDPOINT'] || 'grpc://localhost:4317' };
  spanExporter = new BatchSpanProcessor(new CollectorTraceExporter(traceCollectorOptions));
} else {
  spanExporter = new BatchSpanProcessor(
    new SpanPrometheusExporter({
      service: 'test-gql',
      histogramBoundries: [30, 50, 70, 100, 200, 300, 500, 750, 900, 1100, 1500, 1700, 2000, 2500, 3000, 3500],
      port: 9001,
    }),
  );
}

const _config: Partial<NodeSDKConfiguration> = {
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'graphql-service',
  }),
  spanProcessor: spanExporter,
  contextManager: new AsyncLocalStorageContextManager(),
  instrumentations: (process.env['AUTO_INTROMENT'] == 'on') ? [getNodeAutoInstrumentations()] : []
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

