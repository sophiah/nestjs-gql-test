#!/bin/bash
# Path to this plugin
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts_proto"
GRPC_FOLDER="./src/grpc"
INPUT="$GRPC_FOLDER/protos"
OUTPUT="$GRPC_FOLDER/typings"
mkdir -p $OUTPUT

printf "Protos: \n$PROTOS\n"
echo "Genearating proto typings..."

protoc --plugin="${PROTOC_GEN_TS_PATH}" \
       --proto_path=${INPUT} ${INPUT}/*.proto \
       --ts_proto_out=${OUTPUT} \
       --ts_proto_opt=nestJs=true \
       --ts_proto_opt=lowerCaseServiceMethods=true