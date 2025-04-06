# Tymout - Backend Deployment Guide

This guide explains how to deploy the Tymout backend services on Railway.app.

## Prerequisites

1. A Railway.app account
2. Railway CLI installed (optional)
3. MongoDB Atlas account (for database)
4. Google Cloud Console account (for OAuth)

## Environment Variables

The following environment variables need to be set in Railway.app:

```env
# Database
MONGO_URI=mongodb+srv://tymout:xShiTOyopWJvVYWn@tymout.2ovsdf2.mongodb.net/

# Authentication
JWT_SECRET=tymout_jwt_secret_key_change_in_production
COOKIE_KEY=tymout_cookie_secret_key_change_in_production

# Google OAuth
GOOGLE_CLIENT_ID=919446563884-1ak5704lr4op3m5urihhfn52bub9p53q.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# Frontend URL (Update this with your Vercel deployment URL)
FRONTEND_URL=https://your-frontend-url.vercel.app

# Service URLs (These will be automatically set by Railway)
USER_SERVICE_URL=https://your-user-service.railway.app
EVENT_SERVICE_URL=https://your-event-service.railway.app
DISCOVERY_SERVICE_URL=https://your-discovery-service.railway.app
REQUEST_SERVICE_URL=https://your-request-service.railway.app
NOTIFICATION_SERVICE_URL=https://your-notification-service.railway.app
FEEDBACK_SERVICE_URL=https://your-feedback-service.railway.app
SAFETY_SERVICE_URL=https://your-safety-service.railway.app
PAYMENT_SERVICE_URL=https://your-payment-service.railway.app
PARTNERSHIP_SERVICE_URL=https://your-partnership-service.railway.app
```

## Deployment Steps

1. **Create a new project on Railway.app**
   - Go to Railway.app and create a new project
   - Choose "Deploy from GitHub repo"
   - Select your repository

2. **Set up environment variables**
   - In your Railway project settings, go to the "Variables" tab
   - Add all the environment variables listed above
   - Make sure to update the `FRONTEND_URL` to match your Vercel deployment

3. **Deploy the API Gateway**
   - Railway will automatically detect the Node.js project
   - It will use the `railway.toml` configuration for build and deployment settings
   - The health check endpoint at `/health` will be used to monitor the service

4. **Deploy other services**
   - Create separate services for each microservice
   - Each service should have its own environment variables
   - Make sure to set the correct service URLs in the API Gateway's environment variables

5. **Update Google OAuth Configuration**
   - Go to Google Cloud Console
   - Add your Railway.app domain to the authorized domains
   - Add your Railway.app URLs to the authorized redirect URIs

## Important Notes

1. **CORS Configuration**
   - The API Gateway is configured to accept requests from your Vercel frontend
   - Make sure to update the `FRONTEND_URL` in the environment variables

2. **Cookie Settings**
   - Cookies are configured to work with cross-origin requests
   - The `sameSite` attribute is set to 'none' in production
   - Secure flag is enabled in production

3. **Health Checks**
   - Each service has a `/health` endpoint
   - Railway uses these endpoints to monitor service health
   - Failed health checks will trigger automatic restarts

4. **Database Connection**
   - MongoDB Atlas connection string is used
   - Make sure your IP address is whitelisted in MongoDB Atlas

## Troubleshooting

1. **Service Connection Issues**
   - Check if all service URLs are correctly set in the API Gateway
   - Verify that each service is running and accessible
   - Check the Railway logs for any connection errors

2. **Authentication Problems**
   - Verify Google OAuth credentials are correct
   - Check if the frontend URL is properly configured
   - Ensure cookie settings are correct for your domain

3. **Database Issues**
   - Verify MongoDB connection string is correct
   - Check if the database user has proper permissions
   - Ensure network access is properly configured

## Support

For any issues or questions, please refer to the project documentation or create an issue in the repository. 