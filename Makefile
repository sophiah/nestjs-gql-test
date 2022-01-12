docker-build:
	docker build -t nest-gql-test .

docker-build-dev:
	docker build -t nest-gql-dev -f dockerfile-dev .
	docker run -d --name gql-dev \
		--network dev \
		--env-file ../env.local \
		-p 18080:8080 \
		-v src:/app/src \
		nest-gql-dev
	
docker-build-amd64:
	docker buildx build \
		--platform linux/amd64 \
		-t nest-gql-test .

docker-push: docker-build
	docker tag nest-gql-test asia.gcr.io/gcp-test-project-335907/nest-gql-test
	docker push asia.gcr.io/gcp-test-project-335907/nest-gql-test

docker-clean:
	docker image prune --all --force