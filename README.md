# Serverless Image Analysis App

This project is an image analysis application built using the Serverless framework and AWS services. Users can upload images, which are then analyzed for labels, faces, and text using AWS Rekognition. The application is secured with AWS Cognito for user authentication.

## Overview

Components

- API Gateway: Provides RESTful endpoints for image uploads and analysis.
- AWS Lambda: Processes image uploads, calls Rekognition APIs, returns analysis results, and delete all S3 images in the bucket every 24 hours.
- Amazon S3: Stores uploaded images.
- AWS Rekognition: Analyzes images and returns results.
- AWS Cognito: Manages user authentication.

## Architecture

- User Authentication: AWS Cognito is used to authenticate users. Only authenticated users can upload images and request analysis.
- Image Upload: Users upload images via a RESTful API endpoint provided by API Gateway.
- Image Storage: Uploaded images are stored in an S3 bucket.
- Image Analysis: A Lambda function is triggered to analyze the images using AWS Rekognition.
- Results: The analysis results, including detected labels, faces, and text, are returned to the user.

## Setup and Deployment - Backend Service

Prerequisites

- Node.js and npm
- Serverless framework installed globally (npm install -g serverless)
- AWS CLI configured with appropriate IAM permissions

1. Clone the repository `git clone https://github.com/Bart-15/serverless-image-analysis.git`
1. `cd backend-service`
1. Run `npm install`
1. Run `cp serverless.template.yml serverless.yml`
1. Deploy the application to AWS using the Serverless framework: `serverless deploy`

## Setup and Deployment - Client App

Prerequisites

- Copy the AWS API Gateway URL after deploying the backend service.
- Go to the AWS Console, navigate to AWS Cognito, find the user pool, and copy the User Pool ID and User Pool Client ID.

1. `cd client`
1. Run `npm install`
1. Run `cp .env.template .env`
1. In .env file

- Add the api gateway url as the value for `VITE_BASE_URI`.
- Add the user pool id as the value for `VITE_USER_POOL_ID`
- Add the user pool client id as the value for `VITE_USER_POOL_CLIENT_ID`

## Running the Client App

Run `npm run dev`. The app will be found at [http://localhost:5173/](http://localhost:5173/)
