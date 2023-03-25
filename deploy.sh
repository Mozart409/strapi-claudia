#!/bin/bash
# aws-vault exec claudia-root-user pnpm run sst:deploy

aws-vault exec claudia-admin-user pnpm run sst:deploy

# cdk bootstrap --profile claudia aws://576803782891/eu-central-1
# 
# aws-vault exec claudia-admin-user cdk bootstrap aws://576803782891/eu-central-1
# 
# aws sts get-caller-identity --profile claudia-admin-user --query 'Account' --output text
# 
# aws-vault exec claudia-admin-user aws sts get-caller-identity