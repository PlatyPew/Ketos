#!/bin/bash
yes | docker-scan scan --login --token ${SNYK_API_KEY}
exec bash
