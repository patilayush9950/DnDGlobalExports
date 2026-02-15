package com.eximroyals;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class EximRoyalsApplication {

	public static void main(String[] args) {
		SpringApplication.run(EximRoyalsApplication.class, args);
	}

}
