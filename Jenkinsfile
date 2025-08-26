pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        FRONTEND_BUCKET = 'my-frontend-bucket'
        ADMIN_BUCKET = 'my-admin-bucket'
        EC2_USER = 'ec2-user'
        EC2_HOST = 'your-ec2-public-ip'
        EC2_PATH = '/home/ec2-user/backend-app'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your/repo.git'
            }
        }

        stage('Build Frontend Apps') {
            steps {
                dir('frontend-app') {
                    sh 'npm install && npm run build'
                    sh "aws s3 sync dist/ s3://$FRONTEND_BUCKET --delete"
                }
                dir('admin-app') {
                    sh 'npm install && npm run build'
                    sh "aws s3 sync dist/ s3://$ADMIN_BUCKET --delete"
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                dir('backend-app') {
                    sh 'npm install'
                    sh "tar -czf backend.tar.gz ."
                    sh "scp -o StrictHostKeyChecking=no backend.tar.gz $EC2_USER@$EC2_HOST:$EC2_PATH"
                    sh "ssh -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST 'cd $EC2_PATH && tar -xzf backend.tar.gz && npm install && pm2 restart all || pm2 start index.js'"
                }
            }
        }
    }
}
    