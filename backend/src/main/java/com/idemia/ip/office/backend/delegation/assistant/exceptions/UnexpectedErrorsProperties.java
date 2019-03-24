package com.idemia.ip.office.backend.delegation.assistant.exceptions;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
@ConfigurationProperties(prefix = "exception.internal")
@Getter
@Setter
public class UnexpectedErrorsProperties {
    String monkeysRanOutOfBananas;
}
