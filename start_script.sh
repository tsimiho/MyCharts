#!/bin/bash

microservices_dir="./"

microservice_names=("BasicColumn-Create" "BasicColumn-Show" 
                    "DependencyWheel-Create" "DependencyWheel-Show" 
                    "Linechart-Create" "Linechart-Show" 
                    "LineWithAnnotations-Create" "LineWithAnnotations-Show" 
                    "NetworkGraph-Create" "NetworkGraph-Show" 
                    "Polarchart-Create" "Polarchart-Show")

cd "$microservices_dir" || exit 1

for microservice_name in "${microservice_names[@]}"; do
  service_dir="${microservice_name}/"

  if [[ -d "$service_dir" ]]; then
    echo "Starting $service_dir"
    cd "$service_dir" || continue
    npm start &
    cd ..
  fi
done
