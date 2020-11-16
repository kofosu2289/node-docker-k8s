project = advance-medium-295720
compute/zone = us-east1-b

project-config:
	gcloud config set project $(project) && gcloud config set compute/zone $(compute/zone)

create:
	gcloud container clusters create take-home 