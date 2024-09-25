FROM openjdk:17-jdk-slim
WORKDIR .
COPY . .
RUN apt-get update && apt-get install -y maven
RUN mvn clean package
CMD ["java", "-jar", "target/*.jar"]