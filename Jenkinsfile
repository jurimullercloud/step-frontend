pipeline {
    agent any
    stages {
      stage ('Build react app') {
        steps {
            sh 'npm run build'
        }
      }

      stage ('Build new Docker image') {
         steps {
            sh 'docker build -t phonebookapp-frontend:v${build} .'
         }
      }

      stage ('Push new image to Dockerhub') {
         steps {
            sh 'docker push phonebookapp-frontend:v${build}'
         }
      }
    }

}