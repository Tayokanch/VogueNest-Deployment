pipeline {
    agent any

    environment {
        STRIPE_SECRET   = credentials('STRIPE_SECRET')
        SECRET          = credentials('SECRET')
        MONGODB_URL     = credentials('MONGODB_URL')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Prepare .env') {
            steps {
                sh '''
                    cat > .env <<EOF
                    STRIPE_SECRET=${STRIPE_SECRET}
                    SECRET=${SECRET}
                    MONGODB_URL=${MONGODB_URL}
                    EOF
                '''
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker compose build --no-cache'
            }
        }

        stage('Debug Workspace') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Deploy Services') {
            steps {
            sh '''
                docker compose down
                docker compose build --no-cache
                docker compose up -d --scale voguenest-api=3
            '''
            }
        }

        stage('Verify') {
            steps {
                sh 'docker compose ps'
            }
        }

        stage('Cleanup .env') {
            steps {
                sh 'rm -f .env'
            }
        }
    }
}
