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
            sh 'npm run build'
        }
      }

      stage ('Build new Docker image') {
         steps {
            sh 'docker build -t ${REGISTRY_NAME}/${FRONTEND_IMAGE_NAME}:${FRONTEND_IMAGE_TAG} .'
         }
      }

      stage ('Login to Dockerhub') {
          steps {
             sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
          }
      }
      stage ('Push new image to Dockerhub') {
         steps {
            sh 'docker push ${REGISTRY_NAME}/${FRONTEND_IMAGE_NAME}:${FRONTEND_IMAGE_TAG} .'
         }
      }
    }

}