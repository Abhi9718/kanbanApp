package com.example.authenticationapplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class Authenticationapplication {

	public static void main(String[] args) {
		SpringApplication.run(Authenticationapplication.class, args);
	}

}
