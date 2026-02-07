package com.demo.JiraClone.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI jiraCloneOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Jira Clone API")
                        .description("Jira-like Issue Tracking System")
                        .version("1.0.0"));
    }
}