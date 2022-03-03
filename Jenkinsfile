pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS=credentials('dockerhub-access')
    }
    stages {
      stage ('Install node dependencies') {
        steps {
            sh 'npm install'
        }
      }

      stage ('Build react app') {
        steps {
            script {
              env.REACT_APP_BACKEND_URL = sh('kubectl get svc ${BACKEND_SERVICE_NAME} -o jsonpath=\'{.spec.clusterIP}\'')
            }
            sh 'npm run build'
        }
      }

      stage ('Build new Docker image') {
         steps {
            sh 'docker build -t ${REGISTRY_NAME}/${IMAGE_NAME}:${IMAGE_TAG} .'
         }
      }

      stage ('Login to Dockerhub') {
          steps {
             sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
          }
      }
      stage ('Push new image to Dockerhub') {
         steps {
            sh 'docker push ${REGISTRY_NAME}/${IMAGE_NAME}:${IMAGE_TAG} .'
         }
      }
    }

}