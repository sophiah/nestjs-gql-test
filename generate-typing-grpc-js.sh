#!/bin/bash
# Path to this plugin
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
GRPC_FOLDER="./src/grpc"
GRPC_PROTO_FOLDER="${GRPC_FOLDER}/protos/"
PROTO_DIRS=$(find ${GRPC_PROTO_FOLDER} -type d)

echo "Genearating proto code..."

for PROTO_DIR in $PROTO_DIRS
do
    INPUT="${PROTO_DIR}"
    BASENAME="${PROTO_FILE/$GRPC_PROTO_FOLDER/}"  
    OUTPUT="$GRPC_FOLDER/serviceNew/$BASENAME"
    
    printf "Processing service [$INPUT]..."
    mkdir -p $OUTPUT
    
    ./node_modules/.bin/grpc_tools_node_protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUTPUT}" \
    --ts_out="grpc_js:${OUTPUT}" \
    --grpc_out="grpc_js:${OUTPUT}" \
    -I $INPUT \
    $INPUT/*.proto
    echo "Done."
done