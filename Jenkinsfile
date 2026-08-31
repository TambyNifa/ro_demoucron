pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {

        stage('Environment') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'git --version'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'dist/**',
                                 fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'CI React réussie'
        }

        failure {
            echo 'CI React échouée'
        }
    }
}