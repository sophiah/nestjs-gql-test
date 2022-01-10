docker-build-local:
	docker build -t nest-gql-test .
	
docker-build:
	docker buildx build \
		--platform linux/amd64 \
		-t nest-gql-test .

docker-push: docker-build
	docker tag nest-gql-test asia.gcr.io/gcp-test-project-335907/nest-gql-test
	docker push asia.gcr.io/gcp-test-project-335907/nest-gql-test

docker-clean:
	docker image prune --all --force