#!/bin/sh

# Replace placeholders in JavaScript and CSS files with environment variables
echo "Replacing environment variables in JS and CSS files"

for file in /usr/share/nginx/html/assets/*.js /usr/share/nginx/html/assets/*.css
do
    if [ -f "$file" ]; then
        sed -i "s|VITE_API_URL_PLACEHOLDER|${VITE_API_URL}|g" "$file"
        sed -i "s|VITE_KEYCLOAK_URL_PLACEHOLDER|${VITE_KEYCLOAK_URL}|g" "$file"
        sed -i "s|VITE_KEYCLOAK_REALM_PLACEHOLDER|${VITE_KEYCLOAK_REALM}|g" "$file"
        sed -i "s|VITE_KEYCLOAK_CLIENT_PLACEHOLDER|${VITE_KEYCLOAK_CLIENT}|g" "$file"
    fi
done

exec "$@"