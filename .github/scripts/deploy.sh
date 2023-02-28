cd out

# Sync bundles with strong cache
aws s3 sync ./_next s3://S3_ORIGIN_BUCKET/_next --exclude "data/*" --metadata-directive 'REPLACE' --cache-control max-age=31536000,public,immutable --delete
aws s3 sync ./common/assets s3://S3_ORIGIN_BUCKET/common/assets --metadata-directive 'REPLACE' --cache-control max-age=31536000,public,must-revalidate --delete

# Sync HTML and other files with no cache
aws s3 sync ./ s3://S3_ORIGIN_BUCKET --exclude "_next/*" --exclude "common/assets/*" --metadata-directive 'REPLACE' --cache-control no-cache,no-store,must-revalidate --delete

# Invalidate cache
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
