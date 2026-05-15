# ===== Build stage =====
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# ===== Run stage =====
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy file jar từ build stage
COPY --from=build /app/target/*.jar app.jar

# Port (Render sẽ inject PORT)
ENV PORT=8080

# Run app
CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]