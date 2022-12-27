package com.example.apigatewayservice.configuration;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfiguration {

    @Bean
    public RouteLocator getRoutes(RouteLocatorBuilder routeLocatorBuilder) {
        return routeLocatorBuilder.routes()
                .route(p -> p
                        .path("/authentication-app/auth/**")
                        .uri("http://localhost:9300/*"))
                .route(p -> p
                        .path("/Kanban-Service-Application/k1/**")
                        .uri("http://localhost:8888/*"))
                .build();
    }
}
