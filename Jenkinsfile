pipeline {
    agent any

    environment {
        SONAR_HOST_URL = 'http://192.168.1.79:9000'
        NEXUS_URL = 'http://192.168.1.79:8081'
        NEXUS_REPOSITORY = 'ro-demoucron-releases'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment') {
            steps {
                sh '''
                    echo "Node:"
                    node --version

                    echo "NPM:"
                    npm --version

                    echo "Git:"
                    git --version

                    echo "SonarScanner:"
                    sonar-scanner --version
                '''
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

        stage('SonarQube') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'sonarqube-token',
                        variable: 'SONAR_TOKEN'
                    )
                ]) {
                    sh '''
                        sonar-scanner \
                          -Dsonar.host.url="$SONAR_HOST_URL" \
                          -Dsonar.token="$SONAR_TOKEN"
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts(
                    artifacts: 'dist/**',
                    fingerprint: true
                )
            }
        }

        stage('Publish to Nexus') {
            steps {
                sh 'zip -r react-app-ro-${BUILD_NUMBER}.zip dist/'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'nexus-credentials',
                        usernameVariable: 'NEXUS_USER',
                        passwordVariable: 'NEXUS_PASSWORD'
                    )
                ]) {
                    sh '''
                        curl -f \
                          -u "$NEXUS_USER:$NEXUS_PASSWORD" \
                          --upload-file "react-app-ro-${BUILD_NUMBER}.zip" \
                          "$NEXUS_URL/repository/$NEXUS_REPOSITORY/react-app-ro-${BUILD_NUMBER}.zip"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'CI React + SonarQube + Nexus réussie'
        }

        failure {
            echo 'Pipeline échouée'
        }
    }
}