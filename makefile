service_name:=cim-api
version:=1.0.1
project_id:=affin-assignment

docker-build:
	docker build -t ${service_name}:${version} . --build-arg ENVIRONMENT=productions
docker-run:
	docker run -p 8000:8000 ${service_name}:${version}
docker-tag:
	docker tag ${service_name}:${version} asia.gcr.io/${project_id}/${service_name}:${version}
gcp-push-registry:
	docker push asia.gcr.io/${project_id}/${service_name}:${version}
gcp-deploy-cloud-run:
	gcloud run deploy ${service_name} --image asia.gcr.io/${project_id}/${service_name}:${version} \
	 --platform managed --port 8000 --region=asia-southeast1 \
	--set-env-vars NODE_ENV=production