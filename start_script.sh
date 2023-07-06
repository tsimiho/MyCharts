#!/bin/bash

microservices_dir="./"

microservice_names=("BasicColumn-Create" "BasicColumn-Show" 
                    "DependencyWheel-Create" "DependencyWheel-Show" 
                    "Linechart-Create" "Linechart-Show" 
                    "LineWithAnnotations-Create" "LineWithAnnotations-Show" 
                    "NetworkGraph-Create" "NetworkGraph-Show" 
                    "Polarchart-Create" "Polarchart-Show"
                    "Orchestrator" "Users" "CSV-Downloader" "frontend/saas23-frontend")

cd "$microservices_dir" || exit 1

kafka_dir="Kafka"
if [[ -d "$kafka_dir" ]]; then
  echo "Starting Kafka"
  cd "$kafka_dir" || exit 1
  docker compose -f docker-compose-kafka.yml up -d
  cd ..
fi

sleep 30

for microservice_name in "${microservice_names[@]}"; do
  service_dir="${microservice_name}/"

  if [[ -d "$service_dir" ]]; then
    echo "Starting $service_dir"
    cd "$service_dir" || continue
    npm start &
    cd ..
  fi
done


