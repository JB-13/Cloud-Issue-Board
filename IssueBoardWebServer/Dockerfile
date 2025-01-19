FROM openjdk:21-jdk
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} frontend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/frontend.jar"]